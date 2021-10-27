const Student = require("../models/Student");
const Class = require("../models/Class");
const StudentToken = require("../models/StudentToken");
const Message = require("../models/Message");
const Event = require("../models/Event");
const Admin = require("../models/Admin");

const csv = require("fast-csv");

module.exports = {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  },

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

    return res.status(200).send('OK');
  },

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

    if (!first_name || !last_name || !birthday || !class_id || !password || !email || !username)
      return res.status(406).send("Please provide full information.")

    const class_ = await Class.findByPk(class_id);

    if (!class_) {
      return res.status(406).send("Class not found");
    }

    const student_found = await Student.findOne({ where: { email: email } });
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

    return res.status(406).send("email already existis");
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

    if (id) {
      console.log("hello");
      const student = await Student.findByPk(id, {
        include: {
          association: "classes",
        },
      });

      const class_ = await Class.findByPk(student.classes[0].id, {
        include: {
          association: "messages",
          attributes: { exclude: ["id", "admin_id", "updatedAt"] },
          through: {
            attributes: [],
          },
          include: {
            association: "author",
            attributes: ["first_name", "last_name"],
          },
        },
        order: [["messages", "created_at", "DESC"]],
      });
      res = res.json(class_.messages);
    }
    return res;
  },

  async bulk_store(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const fileRows = [];
    // const fileObjects = [];
    var errors = [];
    var success = 0;

    csv
      .parseFile(req.file.path)
      .on("data", function (data) {
        if (data.length) {
          fileRows.push(data);
        }
      })
      .on("end", async function () {
        // console.log(fileRows);
        // fs.unlinkSync(req.file.path);   // remove temp file

        a = fileRows[0];
        for (var k = 1; k < fileRows.length; k++) {
          b = fileRows[k];
          c = a.map(function (e, i) {
            return [e, b[i]];
          });
          // fileObjects.push(Object.fromEntries(c));
          obj = Object.fromEntries(c);

          try {
            const class_ = await Class.findByPk(obj.class_id);

            if (!class_) throw "Erro";

            const student = await Student.create(obj);
            await class_.addStudent(student);
            success++;
          } catch (err) {
            console.log(err)
            errors.push(k);
          }
        }

        // const resp = await Student.bulkCreate(fileObjects);
        // console.log(resp)
      });
    // TODO: print success and errors
    return res.status(200).json({ success: success, errors: errors });
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

    return res.json(student.classes)
  },

  async students(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const students = await Student.findAll();
    return res.status(200).json(students)
  }
};
