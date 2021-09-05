const Student = require('../models/Student');

module.exports = {
    async index(req, res) {
        const students = await Student.findAll();

        return res.json(students);
    },

    async store(req, res) {
        const { firstName, lastName, email } = req.body;

        const student = await Student.create({firstName, lastName, email});

        return res.json(student);
    }
}