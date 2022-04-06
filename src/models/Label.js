const { Model, DataTypes } = require("sequelize");

class Label extends Model {
  static init(connection) {
    super.init(
      {
        label: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: "labels",
        freezeTableName: true,
      }
    );
  }
}


module.exports = Label;
