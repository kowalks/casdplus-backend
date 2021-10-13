const Student = require('../models/Student');
const Class = require('../models/Class');
const StudentToken = require('../models/StudentToken')

module.exports = {
    async index(req, res) {
        const students = await Student.findAll();

        return res.json(students);
    },

    async login(req, res) {
        const { username, password } = req.body;

        // sanity check
        if (!username || !password) {
            return res.status(400).send('Bad Request! Missing username or password.');
        }

        try {
            let student = await Student.authenticate(username, password);
            student = await student.authorize();
            return res.json({ token: student.token.token });

        } catch (err) {
            console.log(err)
            return res.status(406).json({ error: 'Invalid username or password' })
        }
    },

    async store(req, res) {
        const { class_id, first_name, last_name, birthday, password, email, username } = req.body;

        console.log("class_id: ", class_id)
        const class_ = await Class.findByPk(class_id);

        if (!class_) {
            return res.status(406).json({ error: 'Class not found' });
        }

        const student_found = await Student.findOne({ where: { email: email } });
        if (student_found == null) {
            const student = await Student.create({ first_name, last_name, birthday, password, email, username });
            class_.addStudent(student);
            return res.json(student);
        }


        return res.status(406).json({ error: 'email already existis' });
    },

    async info(req, res) {
        const bearer_token = req.headers.authorization
        if (bearer_token == null) {
            return res.status(401).send('No token provided.')
        }

        const token = bearer_token.substring(7);
        const student_token = await StudentToken.findOne({ where: { token } });

        if (student_token == null) {
            return res.status(401).send('Auth token is not valid.')
        }

        const id = student_token.student_id
        const student = await Student.findOne({where: {id}})

        return res.status(200).json(student)
        // 
    }
}
