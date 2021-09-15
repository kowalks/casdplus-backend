const Class = require('../models/Class');
const Message = require('../models/Message');

module.exports = {

    async store(req, res) {
       const { class_id } = req.params;
       const  {title, body, admin_id} = req.body;


       console.log(class_id)
       const class_ = await Class.findByPk(class_id);

       if(!class_){
        return res.status(400).json({error: 'Class not found'});
        }
        console.log({admin_id,title, body})
        const message = await Message.create({admin_id,title, body});
        console.log("parte 1")
        await class_.addMessage(message)

        return res.json(message);
    }

}