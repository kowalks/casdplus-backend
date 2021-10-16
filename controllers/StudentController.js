const Student = require("../models/Student");
const Class = require("../models/Class");
const StudentToken = require("../models/StudentToken");
const Message = require("../models/Message");

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

  async store(req, res) {
    const {
      class_id,
      first_name,
      last_name,
      birthday,
      password,
      email,
      username,
    } = req.body;

    console.log("class_id: ", class_id);
    const class_ = await Class.findByPk(class_id);

    if (!class_) {
      return res.status(406).json({ error: "Class not found" });
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

    return res.status(406).json({ error: "email already existis" });
  },

  async info(req, res) {
    [res, id] = await Student.validate(req, res);

    if (id) {
      const student = await Student.findOne({ where: { id } });
      res = res.json(student);
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
          attributes: {exclude:["id","admin_id","updatedAt"]},
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
};
