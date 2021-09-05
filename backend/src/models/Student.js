const { Model, DataTypes } = require('sequelize');

class Student extends Model {
    static init(connection) {
        super.init(            {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING
        }, {
            sequelize: connection
        })
    }
}

module.exports = Student;