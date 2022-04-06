const { Model, DataTypes } = require("sequelize");
const AdminToken = require("../models/AdminToken");

class Admin extends Model {
  static init(connection) {
    super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: "admins",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.AdminToken);
  }

  static async authenticate(username, password) {
    const admin = await Admin.findOne({ where: { username } });

    if (password == admin.password) {
      return admin;
    }

    throw new Error("invalid password");
  }

  async authorize() {
    // const { AdminToken } = sequelize.models
    const admin = this;

    const token = await AdminToken.generate(this.id);

    await admin.addAdminToken(token);

    return { admin, token };
  }

  logout = async function (token) {
    AdminToken.destroy({ where: { token } });
  };

  async teste() {
    console.log("teste");
  }

  static async validate(req, res) {
    const bearer_token = req.headers.authorization;
    if (bearer_token == null) {
      return [res.status(401).send("No token provided."), null];
    }

    const token = bearer_token.substring(7);
    const admin_token = await AdminToken.findOne({ where: { token } });

    if (admin_token == null) {
      return [res.status(401).send("Auth token is not valid."), null];
    }

    const id = admin_token.admin_id;
    return [res.status(200), id];
  }
}

module.exports = Admin;
