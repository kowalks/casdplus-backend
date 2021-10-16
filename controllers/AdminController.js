const Admin = require('../models/Admin');
const AdminToken = require('../models/AdminToken')
const csv = require('fast-csv');

module.exports = {
    async store(req, res) {
        const { first_name, last_name, password } = req.body;

        console.log({ first_name, last_name, password })

        const admin = await Admin.create({ first_name, last_name, password });

        return res.json(admin);
    },

    async login(req, res) {
        const { username, password } = req.body;

        // sanity check
        if (!username || !password) {
            return res.status(400).send('Bad Request! Missing username or password.');
        }

        try {
            let admin = await Admin.authenticate(username, password);
            admin = await admin.authorize();
            return res.json({ token: admin.token.token });

        } catch (err) {
            console.log(err)
            return res.status(406).json({ error: 'Invalid username or password' })
        }
    },

    async info(req, res) {
        const bearer_token = req.headers.authorization
        if (bearer_token == null) {
            return res.status(401).send('No token provided.')
        }

        const token = bearer_token.substring(7);
        console.log(token)
        const admin_token = await AdminToken.findOne({ where: { token } });

        if (admin_token == null) {
            return res.status(401).send('Auth token is not valid.')
        }

        const id = admin_token.admin_id
        const admin = await Admin.findOne({where: {id}})

        return res.status(200).json(admin)
        // 
    }

}