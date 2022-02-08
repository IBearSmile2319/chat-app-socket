import React from 'react'
import SearchBox from './components/SearchBox'
import Sidebar from './components/Sidebar'

const InboxPeople = () => {
    return (
        <>
            {/* <!-- Inbox people inicio --> */}
            <div className="inbox_people">

               <SearchBox/>


               <Sidebar/>

            </div>
            {/* <!-- Inbox people Fin --> */}
        </>
    )
}

export default InboxPeople
