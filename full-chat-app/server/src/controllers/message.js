
const Message = require('../models/message');

const getChat = async(req, res) => {

    const miId = req.uid;
    const mensajesDe = req.params.to;

    const last30 = await Message.find({
        $or: [{ from: miId, to: mensajesDe }, { to: mensajesDe, from: miId } ]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    res.json({
        ok: true,
        messages: last30
    })

}


module.exports = {
    getChat
}