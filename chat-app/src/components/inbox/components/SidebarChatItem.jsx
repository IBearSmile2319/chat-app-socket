import React,{ useContext } from "react"

import { ChatContext } from "../../../context/chat/ChatContext"
import { fetchToken } from "../../../helpers/fetch"
import { scrollToBottom } from "../../../helpers/scrollToBottom"
import { types } from "../../../types/types"

const SidebarChatItem = ({ user }) => {
    const { dispatch, chatState } = useContext(ChatContext)
    const { chatActive } = chatState
    const onClick = async() => {
        dispatch({
            type: types.activeChat,
            payload: user.uid
        })
        // cargar los mensajes del chat
        const res=await fetchToken(`messages/${user.uid}`)
        dispatch({
            type: types.loadMsgs,
            payload: res.messages
        })
        scrollToBottom('messages')
    }
    return (
        <>
            {/* <!-- conversación activa inicio --> */}
            <div
                onClick={onClick}
                className={`chat_list ${(user.uid === chatActive) ? 'active_chat': ""}`}>
                <div className="chat_people">
                    <div className="chat_img">
                        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                    </div>
                    <div className="chat_ib">
                        <h5>{user.name}</h5>
                        {user.online ?
                            <span className="text-success">Online</span>
                            :
                            <span className="text-danger">Offline</span>
                        }
                    </div>
                </div>
            </div>
            {/* <!-- conversación activa Fin --> */}
        </>
    )
}

export default SidebarChatItem
