const Class = require("../models/Class");
const Message = require("../models/Message");
const Admin = require("../models/Admin");
const Label = require("../models/Label");

module.exports = {
  async store(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    var { title, body, label_id, class_id } = req.body;

    if (!title || !body)
      return res
        .status(406)
        .json({ error: "Incomplete message. Please provide title and body." });

    // maybe we should be able to pass admin_id in request.
    admin_id = id;

    const class_ = await Class.findByPk(class_id);

    if (!class_) {
      return res.status(406).json({ error: "Class not found" });
    }

    const message = await Message.create({ admin_id, title, body, label_id });

    await class_.addMessage(message);

    return res.json(message);
  },

  async messages(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (!id) return res;

    const messages = await Message.findAll({
      attributes: ["id", "title", "pin"],
      order: [
        ['id', 'DESC'],
       ['created_at', 'DESC'] 
      ]
    });

    return res.status(200).json(messages);
  },

  async destroy(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    var { message_id } = req.params;
    const message = await Message.findByPk(message_id);

    if (!message)
      return res.status(404).send("Bad request: message_id not found.");

    message.destroy();
    return res.status(200).send("Deleted.");
  },

  async labels(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (!id) return res;

    const labels = await Label.findAll({
      attributes: ["id", "label"],
    });

    return res.status(200).json(labels);
  },

  async pin(req, res) {
    [res, id] = await Admin.validate(req, res);
    if (!id) return res;

    const { message_id } = req.params;
    const message = await Message.findByPk(message_id);

    if (!message) return res.status(406).send("Invalid message id");

    const worked = await Message.update(
      {
        pin: !message.pin,
      },
      { where: { id: message_id } }
    );

    return res.status(200).send({ success: worked });
  },
};
