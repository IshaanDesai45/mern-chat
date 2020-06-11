import React from 'react'
import './ActiveUsers.css'
function ActiveUsers(){
    return(
        <div className='users-container'>
            <div className='users-title'>
                <h1 className='topic'>Active Users</h1>
            </div>
            <div className='users-list'></div>
        </div>
    )
}

export default ActiveUsers