const Admin = require("../models/Admin");
const AdminToken = require("../models/AdminToken");
const csv = require("fast-csv");
const Label = require("../models/Label");
const Message = require("../models/Message");

module.exports = {
  async store(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (!id) return res;

    const { first_name, last_name, password, username } = req.body;

    if (!first_name || !last_name || !password || !username)
      return res.status(406).send("Please provide full information.");

    const admin = await Admin.create({
      first_name,
      last_name,
      password,
      username,
    });
    return res.json(admin);
  },

  async login(req, res) {
    const { username, password } = req.body;

    // sanity check
    if (!username || !password) {
      return res.status(400).send("Bad Request! Missing username or password.");
    }

    try {
      let admin = await Admin.authenticate(username, password);
      admin = await admin.authorize();
      return res.json({ token: admin.token.token });
    } catch (err) {
      return res.status(406).json({ error: "Invalid username or password" });
    }
  },

  async logout(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (!id) return res;

    const token = req.headers.authorization.substring(7);

    AdminToken.destroy({ where: { token } });

    return res.status(200).send("OK");
  },

  async info(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (id) {
      const admin = await Admin.findOne({ where: { id } });
      res = res.json(admin);
    }

    return res;
  },

  async labels(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (!id) return res;

    const labels = await Label.findAll({
      attributes: ["id", "label"],
    });

    return res.status(200).json(labels);
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

    return res.status(200).send({success: worked});
  },
};
