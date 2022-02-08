import React from 'react'
import { horaMes } from '../../../helpers/horaMes'

const OutgoingMsg = ({msg}) => {
    return (
        <>
        {/* <!-- Mensaje enviado inicio --> */}
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{msg.message}</p>
                    <span className="time_date"> {horaMes(msg.createdAt)}</span>
                </div>
            </div>
            {/* <!-- Mensaje enviado inicio --> */}
        </>
    )
}

export default OutgoingMsg
