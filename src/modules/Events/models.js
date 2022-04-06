class Event extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.DATEONLY,
      },
      {
        sequelize: connection,
        tableName: "events",
        freezeTableName: true,
      }
    );
  }
}

Event.associate = function (models) {
  Event.belongsTo(models.Class, {
    foreignKey: "class_id",
    target: "id",
  });
};

module.exports = {
  Event,
};
