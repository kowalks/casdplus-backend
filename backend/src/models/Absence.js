const { Model, DataTypes } = require('sequelize');

class Absence extends Model {
   static init(connection) {
      super.init(            {
            date: DataTypes.DATEONLY,
            justification: DataTypes.STRING
      }, {
            sequelize: connection,
            singular: 'event',
            plural: 'events',
            tableName: 'event'
      })
   }
}

Absence.associate = function(models) {
   Absence.belongsTo(models.Student, {
    foreignKey: 'student_id',
    target: 'id'
   });
}

module.exports = Absence;
