const { Model, DataTypes } = require('sequelize');

class Message_class extends Model {
    static init(connection) {
        super.init(            {
         // class_id:DataTypes.INTEGER,
         // message_id:DataTypes.INTEGER
        }, {
            sequelize: connection,
            timestamps: true,
         underscored: true
        })
    }
}

module.exports = Message_class;
