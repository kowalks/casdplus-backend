const { Model, DataTypes } = require('sequelize');

class Message extends Model {
   static init(connection) {
      super.init(            {
         title: DataTypes.STRING,
         body: DataTypes.STRING,
         // admin_id: DataTypes.INTEGER
      }, {
         sequelize: connection,
         timestamps: true,
         underscored: true
      })
   }
   
   static associate(models) {
      this.belongsTo(models.Admin, { 
      foreignKey: 'admin_id',
      target: 'id'});
      this.belongsToMany(models.Class, {foreignKey: 'class_id', through: 'message_class'});
   } 

}

module.exports = Message;
