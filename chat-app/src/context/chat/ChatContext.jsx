import { createContext, useReducer } from "react";
import ChatReducer from "./ChatReducer";



export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActive: null, // id del usuario con el que se esta hablando
    users: [], // Todos los usuarios de la base de datos.
    messages: [], // el chat seleccionado
}

export const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(ChatReducer, initialState)


    return <ChatContext.Provider value={{
        chatState,
        dispatch
    }}>
        {children}
    </ChatContext.Provider >

}
