const { Model, DataTypes } = require('sequelize');

class AdminToken extends Model {
   static init(connection) {
      super.init({
         admin_id: DataTypes.INTEGER,
         token: DataTypes.STRING
      }, {
         sequelize: connection,
         timestamps: true,
         underscored: true
      })
   };

   static associate(models) {
      this.belongsTo(models.Admin)
   };

   // generate random access token
   static async generate (adminId) {
      if (!adminId) {
         throw new Error('AuthToken requires a user ID')
      }

      let token = '';

      const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 15; i++) {
         token += str.charAt(Math.floor(Math.random() * str.length));
      }

      return await AdminToken.create({token, admin_id: adminId});
   }

}

module.exports = AdminToken;
