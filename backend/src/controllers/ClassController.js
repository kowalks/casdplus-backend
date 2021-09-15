const Class = require('../models/Class');

module.exports = {
    async store(req, res) {
        const {name, schedule } = req.body;

        const class_ = await Class.create({name, schedule });

        return res.json(class_);
    }
}