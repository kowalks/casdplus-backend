const Admin = require('../models/Admin');

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
            return res.json(admin);

        } catch (err) {
            console.log(err)
            return res.status(406).json({ error: 'Invalid username or password' })
        }
    }

}