const { Class } = require("../Class/models");
const { Event } = require("./models");
const { Admin } = require("../Admin/models");

module.exports = {
  async store(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const { name, description, date, class_id } = req.body;

    if (!name || !description || !date)
      return res.status(406).send("Please provide full information.");

    const class_ = await Class.findByPk(class_id);

    if (!class_) {
      return res.status(406).json({ error: "Class not found" });
    }

    const event = await Event.create({ name, description, date, class_id });

    return res.json(event);
  },

  async events(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const events = await Event.findAll();

    return res.status(200).json(events);
  },

  async destroy(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    var { event_id } = req.params;
    const event = await Event.findByPk(event_id);

    if (!event)
      return res.status(404).send("Bad request: event_id not found.");

    event.destroy();
    return res.status(200).send("Deleted.");
  },
};
