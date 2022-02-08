const mongoose = require('mongoose')

const dbConnection = async () => {
    await mongoose.connect(process.env.DB_CNN_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((e) => {
        console.log(`MongoDB connected: ${e.connection.host}`)
    }).catch((err) => {
        console.log(`[!] Error while trying to connect to MongoDB: ${err}`)
    })
}


module.exports = {
    dbConnection
}