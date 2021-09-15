const { Model, DataTypes } = require('sequelize');

class Class extends Model {
   static init(connection) {
      super.init(            {
         name: DataTypes.STRING,
         schedule: DataTypes.STRING
      }, {
         sequelize: connection,
         timestamps: true,
         underscored: true
      })
   }

   static associate(models) {
      this.belongsToMany(models.Message, {foreignKey: 'message_id', through: 'message_class'})
   } 

}

module.exports = Class;
