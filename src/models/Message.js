const { Model, DataTypes } = require("sequelize");

class Message extends Model {
  static init(connection) {
    super.init(
      {
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        admin_id: DataTypes.INTEGER,
        label_id: DataTypes.INTEGER,
        pin: DataTypes.BOOLEAN
      },
      {
        sequelize: connection,
        timestamps: true,
        underscored: true,
        tableName: "messages",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Admin, {
      foreignKey: "admin_id",
      target: "id",
      as: "author"
    });
    this.belongsToMany(models.Class, {
      foreignKey: "message_id",
      through: "message_class",
      as: "classes"
    });
  }
}

module.exports = Message;
