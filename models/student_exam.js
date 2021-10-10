const { Model, DataTypes } = require('sequelize');

class Student_exam extends Model {
    static init(connection) {
        super.init(            {
         // class_id:DataTypes.INTEGER,
         // message_id:DataTypes.INTEGER
        }, {
            sequelize: connection
        })
    }
}

module.exports = Student_exam;
