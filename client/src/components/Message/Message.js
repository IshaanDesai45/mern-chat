import React, { useState, useRef } from 'react'
import './Message.css'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
function Message (props) {

    const [messageImageZoom,setMessageImageZoom] = useState(false)
    const imageRef = useRef(null)
    const cancelRef = useRef(null)
    const zoomify= ()=>{
        setMessageImageZoom(true)
        imageRef.current.style.maxWidth = '70vw';
        cancelRef.current.style.display = 'block'
    }

    const normalify = ()=>{
        setMessageImageZoom(false)
        imageRef.current.style.maxWidth = '250px';
        cancelRef.current.style.display = 'none'
    }

    function classList(classes) {
        return Object
          .entries(classes)
          .filter(entry => entry[1])
          .map(entry => entry[0])
          .join(' ');
      }
    return(
        <div className='message-container'>
            <div className='avatar'><i className="user-icon fas fa-user"></i></div>
            <div className='message-info'>
                    <span className='author'>{props.message.username}</span>
    <span className='timestamp'>- {props.message.date}</span>
                    <div  className={
                        classList({
                            'message': true,
                            'messageImage': messageImageZoom === true,
                          })
                    }>  
                        
                        <i onClick={normalify} ref={cancelRef} className="cancel-icon fas fa-times" style={{display:"none"}}></i>
                       {
                           props.message.type === 'text'?
                                <p>{props.message.msg}</p>:
                                <img ref={imageRef} onClick={zoomify} style={{maxWidth : "250px"}} src={`http://localhost:5000/${props.message.msg}`} alt='image' />
                       }
                    </div>
            </div>
            
        </div>
    )
}

export default Message