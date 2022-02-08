import React from 'react'
import { horaMes } from '../../../helpers/horaMes'

const IncomingMsg = ({msg}) => {

    return (
        <>
        {/* <!-- Mensaje recibido Inicio --> */}
            <div className="incoming_msg">
                <div className="incoming_msg_img">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{msg.message}</p>
                        <span className="time_date"> {horaMes(msg.createdAt)}</span>
                    </div>
                </div>
            </div>
            {/* <!-- Mensaje recibido Fin --> */}
        </>
    )
}

export default IncomingMsg
