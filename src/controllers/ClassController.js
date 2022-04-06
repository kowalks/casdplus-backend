const Class = require("../models/Class");
const Admin = require("../models/Admin");
const { classes } = require("./StudentController");

module.exports = {
  async store(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const { name, schedule } = req.body;

    if (!name || !schedule)
      return res.status(406).send("Please provide complete information.");

    const class_ = await Class.create({ name, schedule });

    return res.json(class_);
  },

  async classes(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const classes = await Class.findAll();
    return res.status(200).json(classes);
  },

  async newSchedule(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const { class_id } = req.params;
    if (!class_id) return res.status(406).send("Missing class.");
    if (!req.file) return res.status(406).send("Missing file.");

    var class_ = await Class.findByPk(class_id);
    if (!class_) return res.status(400).send("Bad request! Class not found.");

    class_ = await class_.update({ schedule: req.file.path });
    return res.status(200).send(class_);
  },

  async schedule(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const { class_id } = req.params;
    const class_ = await Class.findByPk(class_id);

    if (!class_) return res.status(400).send("Bad request! Class not found.");
    if (!class_.schedule) return res.status(204).send('');

    res.sendFile(class_.schedule, { root: process.cwd() });
  },
};
