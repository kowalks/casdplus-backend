const { Model, DataTypes } = require("sequelize");

class StudentToken extends Model {
  static init(connection) {
    super.init(
      {
        student_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
      },
      {
        sequelize: connection,
        timestamps: true,
        underscored: true,
        tableName: "student_tokens",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student);
  }

  // generate random access token
  static async generate(studentId) {
    if (!studentId) {
      throw new Error("AuthToken requires a user ID");
    }

    let token = "";

    const str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++) {
      token += str.charAt(Math.floor(Math.random() * str.length));
    }

    return await StudentToken.create({ token, student_id: studentId });
  }
}

module.exports = StudentToken;
