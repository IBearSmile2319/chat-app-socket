const User = require('../models/user')
const Message = require('../models/message')
exports.userConnected = async (uid) => {
    const user = await User.findById(uid)
    user.online = true
    await user.save()
    return user
}
exports.userDisconnected = async (uid) => {
    const user = await User.findById(uid)
    user.online = false
    await user.save()
    return user
}


exports.getUsers = async () => {
    const users = await User.find()
        .sort('-online')
    return users
}

exports.saveMsg = async (payload) => {
    try {
        const msg = new Message(payload)
        await msg.save()
        return msg
    } catch (error) {
        console.log(error)
        return false
    }
}