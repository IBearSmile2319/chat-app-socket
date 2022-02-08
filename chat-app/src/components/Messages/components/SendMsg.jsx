import React, { useContext, useState } from 'react'
import AuthContext from '../../../auth/AuthContext';
import { ChatContext } from '../../../context/chat/ChatContext';
import { SocketContext } from '../../../context/SocketContext';

const SendMsg = () => {
    const [msg, setMsg] = useState("");
    const {socket}=useContext(SocketContext)
    const {auth}=useContext(AuthContext)
    const {chatState}=useContext(ChatContext)
    const onChange = ({ target }) => {
        setMsg(target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(msg.length===0) return;
        setMsg("")
        // TODO: emitir evento de socket para enviar mensaje
        // {
            // de: UID del usuario logueado 
            // para: UID del usuario seleccionado
            // msg: mensaje
        // }
        socket.emit('msg-personal',{
            from: auth.uid,
            to: chatState.chatActive,
            message: msg
        })
        // TODO: hacer el dispatch del mensaje en el reducer
        
    }
    return (
        <form onSubmit={onSubmit}>
            {/* <!-- Enviar mensaje Inicio --> */}
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        value={msg}
                        onChange={onChange}
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..." />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
            {/* <!-- Enviar mensaje Fin --> */}
        </form>
    )
}

export default SendMsg
