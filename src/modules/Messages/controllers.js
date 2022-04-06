const { Class } = require("../Class/models");
const { Message, Label } = require("./models");
const { Admin } = require("../Admin/models");

const { Op } = require("sequelize");

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

    start_date = req.query.start_date ? req.query.start_date : "2000-01-01";
    end_date = req.query.end_date ? req.query.end_date : "3000-01-01";

    var where = {
      created_at: { [Op.between]: [start_date, end_date] },
    };

    if (req.query.label_id) where.label_id = req.query.label_id;
    var inner_where = {}
    if (req.query.class_id) inner_where.id = req.query.class_id;

    const messages = await Message.findAll({
      include: {association: "classes", where: inner_where, attributes: []},
      where: where,
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
