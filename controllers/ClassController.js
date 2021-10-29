const Class = require("../models/Class");
const Admin = require("../models/Admin");
const { classes } = require("./StudentController");

module.exports = {
  async store(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const { name, schedule } = req.body;

    if (!name || !schedule)
      return res.status(406).send('Please provide complete information.')

    const class_ = await Class.create({ name, schedule });

    return res.json(class_);
  },

  async classes(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const classes = await Class.findAll();
    return res.status(200).json(classes)
  }
};
