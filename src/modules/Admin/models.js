const { Model, DataTypes } = require("sequelize");

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

class AdminToken extends Model {
  static init(connection) {
    super.init(
      {
        admin_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
      },
      {
        sequelize: connection,
        timestamps: true,
        underscored: true,
        tableName: 'admin_tokens',
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Admin);
  }

  // generate random access token
  static async generate(adminId) {
    if (!adminId) {
      throw new Error("AuthToken requires a user ID");
    }

    let token = "";

    const str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++) {
      token += str.charAt(Math.floor(Math.random() * str.length));
    }

    return await AdminToken.create({ token, admin_id: adminId });
  }
}

module.exports = { 
  Admin,
  AdminToken,
};