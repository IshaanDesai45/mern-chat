import React from 'react'
import './Sidebar.css'
import ChannelContainer from '../ChannelContainer/ChannelContainer'
import ServerContainer from '../serverContainer/ServerContainer'
function Sidebar (){
    return (
        <div className='sidebar-container'>
            <ChannelContainer />
            <ServerContainer />
        </div>
        
    )
}

export default Sidebar