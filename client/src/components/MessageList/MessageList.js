import React, { useEffect, useRef } from 'react'
import Message from '../Message/Message'
import {useSelector} from 'react-redux'
import './MessageList.css'
function MessageList (){

    const messages = useSelector(state => state.chat.messages)
    const messagesClassRef = useRef(null)

    useEffect(()=>{
        messagesClassRef.current.scrollTop = messagesClassRef.current.scrollHeight
    },[messages])
    // const {messagesList} = messages.map((message)=> {return <h1>Hello</h1>})
    // console.log(messages)
    return(
        <div className='messages-container'>
            <div className='room-heading'>
                <h1 className='topic'>Message List</h1>
            </div>
            <div ref={messagesClassRef} className='messages'>
                {messages.map((message,i)=> {return <Message key={i} msg={message.msg} username={message.username} date={message.date} />})}
            </div>
        </div>
    )
}

export default MessageList