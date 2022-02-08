const { userConnected, userDisconnected, getUsers, saveMsg } = require("../controller/sockets")
const { compareJWT } = require("../helpers/jwt")

class Sockets {

    constructor(io) {
        this.io = io

        this.socketEvents()

    }
    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            
            //TODO: Validar el JWT
            const [valido,uid]=compareJWT(socket.handshake.query['x-token'])
            // si el token no es valido, se desconecta
            if(!valido){
                console.error('No se pudo validar el token')
                return socket.disconnect()
            }
            // saber que usuario esta activo mediante el UID
            await userConnected(uid)

            // emitir un evento para que el cliente sepa que usuario esta conectado
            this.io.emit('list-connected',await getUsers())
            
            // socket join, uid
            socket.join(uid);

            // escuchar cuando el cliente envie un mensaje
            socket.on('msg-personal',async(payload)=>{
                    const message=await saveMsg(payload)
                    this.io.to(payload.to).emit('msg-personal',message)
                    this.io.to(payload.from).emit('msg-personal',message)
            })
            // disconnect
            // marcar en la db que el usuario se desconecto

            // emitir todos los usuarios conectados
            socket.on('disconnect',async ()=>{
                await userDisconnected(uid)
                this.io.emit('list-connected',await getUsers())
                
            })
        })
    }
}

module.exports = Sockets