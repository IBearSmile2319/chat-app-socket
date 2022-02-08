import { createContext, useContext, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import { scrollToBottomAnimation } from "../helpers/scrollToBottom";
import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import {ChatContext} from "./chat/ChatContext";

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const { socket, online,connectSocket,disconnectSocket } = useSocket('http://localhost:8080')

    const {auth}= useContext(AuthContext)

    const {dispatch} = useContext(ChatContext)

    useEffect(() => {
        if (auth.logged) {
            connectSocket()
        }
    }, [auth,connectSocket]);
    useEffect(() => {
        if (!auth.logged) {
            disconnectSocket()
        }
    }, [auth,disconnectSocket]);
    // escuchar el evento de cambio de estado
    useEffect(() => {
        socket?.on('list-connected', (users) => {
           dispatch({
               type: types.usuariosCargados,
               payload: users
           })
        })
    }, [socket,dispatch]);

    useEffect(() => {
        socket?.on('msg-personal', (msg) => {
            
            // TODO: hacer el dispatch del mensaje en el reducer
            dispatch({
                type: types.newMsg,
                payload: msg
            })

            // mover Scroll al final del chat
            scrollToBottomAnimation('messages')
        })
    }, [socket,dispatch]);
    

    return <SocketContext.Provider value={{ socket, online }}>
        {children}
    </SocketContext.Provider>

}

