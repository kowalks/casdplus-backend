const Admin = require('../models/Admin');

module.exports = {
   async store(req, res) {
        const {first_name, last_name, password } = req.body;

        console.log({first_name, last_name, password })

        const admin = await Admin.create({first_name, last_name, password });

        return res.json(admin);
    }
}