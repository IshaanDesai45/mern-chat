import React from 'react'
import './Message.css'

function Message (props) {
    return(
        <div className='message-container'>
            <div className='avatar'><i className="user-icon fas fa-user"></i></div>
            <div className='message-info'>
                    <span className='author'>{props.message.username}</span>
    <span className='timestamp'>- {props.message.date}</span>
                    <div className='message'>
                       {
                           props.message.type === 'text'?
                                <p>{props.message.msg}</p>:
                                <img style={{maxWidth : "250px"}} src={`http://localhost:5000/${props.message.msg}`} alt='image' />
                       }
                    </div>
            </div>
            
        </div>
    )
}

export default Message