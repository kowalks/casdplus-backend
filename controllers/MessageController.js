const Class = require("../models/Class");
const Message = require("../models/Message");
const Admin = require("../models/Admin");

module.exports = {
  async store(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (!id) return res;

    var { class_id } = req.params;
    var { title, body, label_id } = req.body;


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
};
