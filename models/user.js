const { Schema, model } = require('mongoose')

const userSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    online: {
        type: Boolean,
        default: false
    }
})
userSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject()
    object.uid = _id
    return object
})

module.exports= model('User', userSchema)