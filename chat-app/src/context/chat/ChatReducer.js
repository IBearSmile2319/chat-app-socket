import { types } from "../../types/types"


const chatReducer = (state, action) => {
    switch (action.type) {
        case types.DropData:
            return {
                uid: '',
                chatActive: null, 
                users:[],
                messages:[]
            }
        case types.usuariosCargados:
            return {
                ...state,
                users: action.payload
            }
        case types.activeChat:
            if (state.chatActive === action.payload) return state;
            return {
                ...state,
                chatActive: action.payload,
                messages: []
            }
        case types.newMsg:
            if (state.chatActive === action.payload.from
                || state.chatActive === action.payload.to) {
                return {
                    ...state,
                    messages: [...state.messages, action.payload]
                }
            } else {
                return state;
            }
        case types.loadMsgs:
            return {
                ...state,
                messages: [...action.payload]
            }

        default:
            return state

    }
}

export default chatReducer