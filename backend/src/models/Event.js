const { Model, DataTypes } = require('sequelize');

class Event extends Model {
   static init(connection) {
      super.init(            {
         name: DataTypes.STRING,
         description: DataTypes.STRING,
         date: DataTypes.DATEONLY
      }, {
         sequelize: connection,
         singular: 'event',
         plural: 'events',
         tableName: 'event'
      })
   }
}

Event.associate = function(models) {
   Event.belongsTo(models.Class, {
    foreignKey: 'class_id',
    target: 'id'
   });
}

module.exports = Event;
