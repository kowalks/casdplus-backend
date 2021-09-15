const { Model, DataTypes } = require('sequelize');

class Question extends Model {
   static init(connection) {
      super.init(            {
         answer: DataTypes.STRING
      }, {
         sequelize: connection
      })
   }
}

Question.associate = function(models) {
Question.belongsTo(models.Exam, {
 foreignKey: 'exam_id',
 target: 'id'
});


}

module.exports = Question;

