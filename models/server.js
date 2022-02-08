// Servidor de Express
const express = require('express')

// Servidor de sockets
const http = require('http')

// configuración de sockets	server
const socketIo = require('socket.io')

// cors
const cors = require('cors')


const path = require('path')

const Sockets = require('./sockets')
const { dbConnection } = require('../database/config')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000

        // Connect to db
        dbConnection()

        // HTTP server
        this.server = http.createServer(this.app)
        // Config sockets
        this.io = socketIo(this.server, {/*opciones*/ })

    }
    middlewares() {
        // Desplegar el directiorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')))
        // TODO: cors
        this.app.use(cors())

        // parseo del body
        this.app.use(express.json())

        // API ENDPoints
        this.app.use('/api',require('../router/auth'))
        this.app.use('/api/messages',require('../router/messages'))

    }

    configSockets() {
        new Sockets(this.io);
    }
    execute() {
        // start Middlewares
        this.middlewares()
        // start config sockets
        this.configSockets()
        // start server
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`)
        })

    }
}

module.exports = Server