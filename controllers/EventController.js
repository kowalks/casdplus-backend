const Class = require("../models/Class");
const Event = require("../models/Event");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

module.exports = {
  async store(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const { class_id } = req.params;
    const { name, description, date } = req.body;

    if (!name || !description || !date)
      return res.status(406).send("Please provide full information.");

    const class_ = await Class.findByPk(class_id);

    if (!class_) {
      return res.status(406).json({ error: "Class not found" });
    }

    const event = await Event.create({ name, description, date, class_id });

    return res.json(event);
  },
};
