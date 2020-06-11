import React from 'react'
import './Message.css'

function Message (props) {
    return(
        <div className='message-container'>
            <div className='avatar'><i className="user-icon fas fa-user"></i></div>
            <div className='message-info'>
                    <span className='author'>{props.username}</span>
    <span className='timestamp'>- {props.date}</span>
                    <div className='message'>
                        <p>{props.msg}</p>
                    </div>
            </div>
            
        </div>
    )
}

export default Message