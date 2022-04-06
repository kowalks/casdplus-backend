const Exam = require('../models/Exam');
const Class = require('../models/Class');
const { findByPk } = require('../models/Exam');

module.exports = {
    async index(req, res) {
        const students = await Student.findAll();

        return res.json(students);
    },

    async store(req, res) {
        const { class_id, name, date, published, url } = req.body;

        const class_found = findByPk(class_id)

        if (!class_found) {
            return res.status(406).json({ error: 'Class not found' });
        }

        const exam = await Exam.create({ name, date, published, url });

        await class_found.addExam(exam)

        return res.json(exam);
    }
}
