import React, { useContext } from 'react'
import AuthContext from '../../auth/AuthContext'
import { ChatContext } from '../../context/chat/ChatContext'
import IncomingMsg from './components/IncomingMsg'
import OutgoingMsg from './components/OutgoingMsg'
import SendMsg from './components/SendMsg'

const Messages = () => {
    const { chatState } = useContext(ChatContext);
    const { auth } = useContext(AuthContext);
    return (
        <>
            {/* <!-- Chat inicio --> */}
            <div className="mesgs">

                {/* <!-- Historia inicio --> */}
                <div 
                id="messages"
                className="msg_history">

                    {chatState.messages.map(msg => (
                        (msg.to === auth.uid) ?
                            <IncomingMsg 
                            msg={msg}
                            key={msg._id} />
                            :
                            <OutgoingMsg 
                            msg={msg}
                            key={msg._id} />
                    ))}








                </div>
                {/* <!-- Historia Fin --> */}

                <SendMsg />

            </div>
            {/* <!-- Chat Fin --> */}
        </>
    )
}

export default Messages
