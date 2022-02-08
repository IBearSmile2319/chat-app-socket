import { useContext } from 'react'
import ChatSelect from '../components/ChatSelect'
import InboxPeople from '../components/inbox/InboxPeople'
import Messages from '../components/Messages/Messages'
import { ChatContext } from '../context/chat/ChatContext'
import '../css/Chat.css'
const ChatPages = () => {
    const {chatState} = useContext(ChatContext);
    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />
                {
                    chatState.chatActive ?
                        <Messages />
                        :
                        <ChatSelect />

                }

            </div>


        </div>
    )
}
export default ChatPages
