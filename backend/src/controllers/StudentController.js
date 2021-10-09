const Student = require('../models/Student');
const Class = require('../models/Class');

module.exports = {
    async index(req, res) {
        const students = await Student.findAll();

        return res.json(students);
    },

    async login(req, res) {
        const  {email, password} = req.body;
        const student = await Student.findOne({ where: { email: email} });

        if(student == null || student.password != password)
            return res.status(406).json({error: 'user/email invalid'})
        
       student.password = null;
        return res.json(student);
    },

    async store(req, res) {
        const {class_id, first_name, last_name, birthday, password, email} = req.body;

        console.log("class_id: ", class_id)
        const class_ = await Class.findByPk(class_id);

        if(!class_){
            return res.status(406).json({error: 'Class not found'});
         }

        const student_found = await Student.findOne({ where: { email: email} });
        if(student_found == null){
            const student = await Student.create({first_name, last_name, birthday, password, email});
            class_.addStudent(student);
            console.log("done")
            return res.json(student);
        }


        return res.status(406).json({error: 'email already existis'});
    }
}
