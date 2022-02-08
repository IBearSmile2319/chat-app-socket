const Message = require('../models/message')

exports.getChat = async (req, res) => {
    const { uid } = req
    const { to } = req.params

    const last30 = await Message.find({
        $or: [
            { to: uid, from:to }, 
            { to: to, from:uid }
        ]
    }).sort({ createdAt: 'asc' }).limit(30)

    res.json({
        ok: true,
        msg: 'getChat',
        messages: last30
    })

}