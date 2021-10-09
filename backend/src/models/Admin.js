const { Model, DataTypes } = require('sequelize');

class Admin extends Model {
   static init(connection) {
      super.init(            {
         first_name: DataTypes.STRING,
         last_name: DataTypes.STRING,
         username: DataTypes.STRING,
         password: DataTypes.STRING
      }, {
         sequelize: connection,
      })
   };

   static associate(models) {
      this.hasMany(models.AuthToken);
   }

   authenticate = async function (username, password) {
      const admin = await Admin.findOne({ where: { username } });
      
      if (password == admin.password) {
         return true;
      }

      throw new Error('invalid password');
   };

}

module.exports = Admin;


