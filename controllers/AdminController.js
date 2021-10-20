const Admin = require("../models/Admin");
const AdminToken = require("../models/AdminToken");
const csv = require("fast-csv");

module.exports = {
  async store(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (id) {
      const { first_name, last_name, password, username } = req.body;
      const admin = await Admin.create({ first_name, last_name, password, username });
      res = res.json(admin);
    }

    return res;
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

  async info(req, res) {
    [res, id] = await Admin.validate(req, res);

    if (id) {
      const admin = await Admin.findOne({ where: { id } });
      res = res.json(admin)
    }

    return res;
  }
};
