const Student = require('../models/Student');

module.exports = {
    async index(req, res) {
        const students = await Student.findAll();

        return res.json(students);
    },

    async store(req, res) {
        const {class_id, first_name, last_name, birthday, password } = req.body;

        const student = await Student.create({class_id, first_name, last_name, birthday, password });

        return res.json(student);
    }
}