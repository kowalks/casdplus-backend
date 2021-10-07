const Exam =  require('../models/Exam');

module.exports = {
    async index(req, res) {
        const students = await Student.findAll();

        return res.json(students);
    },

    async store(req, res) {
        const {name, date, published} = req.body;

        const exam = await Student.create({name, date, published});

        return res.json(exam);
    }
}