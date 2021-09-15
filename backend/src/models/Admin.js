const { Model, DataTypes } = require('sequelize');

class Admin extends Model {
   static init(connection) {
      super.init(            {
         first_name: DataTypes.STRING,
         last_name: DataTypes.STRING,
         password: DataTypes.STRING
      }, {
         sequelize: connection,
      })
   }
}

module.exports = Admin;


