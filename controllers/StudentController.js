const Student = require("../models/Student");
const Class = require("../models/Class");
const StudentToken = require("../models/StudentToken");
const Message = require("../models/Message");
const Event = require("../models/Event");
const Admin = require("../models/Admin");
const Absence = require("../models/Absence");
const sgMail = require('@sendgrid/mail')

const { Op } = require("sequelize");

const { parseFile } = require("fast-csv");

module.exports = {
  // Student requests

  async store(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const {
      class_id,
      first_name,
      last_name,
      birthday,
      password,
      email,
      username,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !birthday ||
      !class_id ||
      !password ||
      !email ||
      !username
    )
      return res.status(406).send("Please provide full information.");
      
    if (!Student.validate_age(birthday)){
      return res.status(406).send("birthday not valid!");
    }

    const class_ = await Class.findByPk(class_id);

    if (!class_) {
      return res.status(406).send("Class not found");
    }
    
    let query = {
      [Op.or] : [{ email: email }, { username: username}]
    }
    const student_found = await Student.findOne({ where: query });


    if (student_found == null) {
      const student = await Student.create({
        first_name,
        last_name,
        birthday,
        password,
        email,
        username,
      });
      class_.addStudent(student);
      return res.json(student);
    }

    if (student_found.username == username)
    {
      return res.status(406).send("username already existis");
    }

    return res.status(406).send("email already existis");
  },

  async bulk_store(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    let promises = [];
    var errors = [];
    var success = 0;

    const stream = parseFile(req.file.path, {
      headers: true,
      strictColumnHandling: true,
      ignoreEmpty: true,
    })
      .transform(async (data, next) => {
        try {
          data.class = await Class.findByPk(data.class_id);
        } catch (err) {
          data.class = null;
        }

        let query = {
          [Op.or] : [{ email: data.email }, { username: data.username}]
        }

        data.student_found = await Student.findOne({ where: query });

        return next(null, data);
      })
      .validate((data, next) => {
        if (data.class == null || data.class == undefined) {
          return next(null, false, "Class doesn't exist.");
        }
        if (
          !data.first_name ||
          !data.last_name ||
          !data.birthday ||
          !data.password ||
          !data.email ||
          !data.username
        )
          return next(null, false, "Missing information.");
        if (new Date(data.birthday).toString() === "Invalid Date")
          return next(null, false, "Wrong birthday date format.");
        if (!Student.validate_age(data.birthday))
          return next(null, false, "Invalid birthday date.");
        if (data.student_found){
          if (data.student_found.email == data.email)
            return next(null, false, "Email already exists.");
          return next(null, false, "Username already exists.");
        }
          
        return next(null, true);
      })
      .on("error", (error) => console.log(error))
      .on("data", (data) => promises.push(parseRow(data)))
      .on("data-invalid", (row, rowNumber, reason) => {
        console.log(`Invalid [rowNumber=${rowNumber}] [reason=${reason}]`);
        errors.push({ row: rowNumber, reason: reason });
      })
      .on("end", async (rowCount) => {
        await Promise.all(promises);
        console.log(`Parsed ${rowCount} rows`);
        res.json({ parsed: rowCount, success: success, errors: errors });
      });

    async function parseRow(data) {
      const student = await Student.create(data);
      data.class.addStudent(student);
      success = success + 1;
    }

    // console.log(stream);
    return res;
  },

  async destroy(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const { student_id } = req.params;
    const student = await Student.findByPk(student_id);

    if (!student)
      return res.status(404).send("Bad request: student_id not found.");

    student.destroy();

    return res.status(200).send("Deleted.");
  },

  async students(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    class_id = req.query.class_id

    let class_ = null
    if(class_id){
      class_ = await Class.findByPk(class_id,{
        include: {
          association: "students",
          attributes: {exclude: ["password"]},
          through: {
            attributes: [],
          },
        },
      });
    }

    let students = null

    if(!class_){
      students = await Student.findAll({attributes: {exclude: ["password"]}});
    }
    else{
      students = await class_.students
      students = students[0]
    }

    return res.status(200).json(students);
  },

  // Student requests

  async login(req, res) {
    const { username, password } = req.body;

    // sanity check
    if (!username || !password) {
      return res.status(400).send("Bad Request! Missing username or password.");
    }

    try {
      let student = await Student.authenticate(username, password);
      student = await student.authorize();
      return res.json({ token: student.token.token });
    } catch (err) {
      console.log(err);
      return res.status(406).json({ error: "Invalid username or password" });
    }
  },

  async logout(req, res) {
    [res, id] = await Student.validate(req, res);

    if (!id) return res;

    const token = req.headers.authorization.substring(7);

    StudentToken.destroy({ where: { token } });

    return res.status(200).send("OK");
  },

  async info(req, res) {
    [res, id] = await Student.validate(req, res);

    if (id) {
      const student = await Student.findByPk(id, {
        attributes: ["first_name", "last_name"],
        include: {
          association: "classes",
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
      });

      is_casdinho = false;

      for (var i = 0; i < student.classes.length; i++) {
        if (student.classes[i].name === "CASDinho") {
          is_casdinho = true;
          break;
        }
      }

      res = res.json({
        first_name: student.first_name,
        last_name: student.last_name,
        is_casdinho: is_casdinho,
      });
    }

    return res;
  },

  async messages(req, res) {
    [res, id] = await Student.validate(req, res);

    if (!id) return res;

    const student = await Student.findByPk(id, {
      include: {
        association: "classes",
      },
    });

    start_date = req.query.start_date ? req.query.start_date : "2000-01-01";
    end_date = req.query.end_date ? req.query.end_date : "3000-01-01";

    var where = {
      created_at: { [Op.between]: [start_date, end_date] },
    };

    if (req.query.label_id) where.label_id = req.query.label_id;

    const class_ = await Class.findByPk(student.classes[0].id, {
      include: {
        association: "messages",
        attributes: { exclude: ["admin_id", "updatedAt"] },
        through: {
          attributes: [],
        },
        include: {
          association: "author",
          attributes: ["first_name", "last_name"],
        },
        where: where,
      },
      order: [["messages", "pin", "DESC"], ["messages", "created_at", "DESC"]],
    });

    return res.json(class_ ? class_.messages : []);
  },

  async events(req, res) {
    [res, id] = await Student.validate(req, res);

    if (!id) return res;

    const student = await Student.findByPk(id, {
      include: {
        association: "classes",
      },
    });

    const class_ = await Class.findByPk(student.classes[0].id);

    const events = await Event.findAll({ where: { class_id: class_.id } });

    return res.json(events);
  },

  async classes(req, res) {
    [res, id] = await Student.validate(req, res);
    if (!id) return res;

    const student = await Student.findByPk(id, {
      attributes: [],
      include: {
        association: "classes",
        attributes: ["id", "name", "schedule"],
        through: {
          attributes: [],
        },
      },
    });

    return res.json(student.classes);
  },

  async absence(req, res) {
    [res, id] = await Student.validate(req, res);

    if (!id) return res;

    const student = await Student.findByPk(id);

    const { date, justification } = req.body;

    const absence = await Absence.create({ student_id: id, date, justification });
    const date_msg = new Date(date + 'T03:00:00Z').toLocaleDateString("pt-BR")

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: 'casdplus@gmail.com', // Change to your recipient
      from: 'casdplus@gmail.com', // Change to your verified sender
      subject: 'Justificativa de Falta - ' + date_msg,
      html: "<b>Aluno:</b> " + student.first_name + ' ' + student.last_name + "<br>" +
            "<b>Data:</b> " + date_msg + "<br>" +
            justification
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })

    return res.status(200).json(absence);
  },
  
  async schedule(req, res) {
    [res, id] = await Student.validate(req, res);
    if (!id) return res;

    const student = await Student.findByPk(id, {
      attributes: [],
      include: {
        association: "classes",
        attributes: ["id", "name", "schedule"],
        through: {
          attributes: [],
        },
      },
    });
  
    if (!student.classes[0].schedule) return res.status(204).send('');

    return res.sendFile(student.classes[0].schedule, { root: process.cwd() });
  },
};
