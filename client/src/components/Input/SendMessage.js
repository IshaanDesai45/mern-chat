import React,{useState,useRef, useEffect} from 'react'
import './SendMessage.css'
import { useSelector } from 'react-redux'

function SendMessage (props){

    const textareaRef = useRef(null)
    const sendmessageRef = useRef(null)
    const username           = useSelector(state => state.auth.user.username)
    const activeChannel        = useSelector(state => state.chat.activeChannel)
    //local state to control the input 
    const [message,setMessage] = useState('');


    //using useEffect to autoSize the textArea

    useEffect(()=>{
        textareaRef.current.style.height = "inherit";
        const newHeight = Math.max(Math.min(textareaRef.current.scrollHeight -40, 75), 18);
        // console.log(newHeight,textareaRef.current.height)
        if(newHeight !== textareaRef.current.height){
            const containerNewHeight = newHeight+10;
            sendmessageRef.current.style.height = containerNewHeight + "px";
        }
        // console.log(scrollHeight)
        textareaRef.current.style.height = newHeight + "px";
        
    },[message])

    
    
    //onChange handler
    const handleOnChange = (event)=>{
        setMessage(event.target.value)
    }

    //onSubmit Handler
    const handleOnSubmit = ()=>{
        // event.preventDefault();
        const formattedMessage = message.trim()

        if(formattedMessage !== '' ){
            console.log(formattedMessage);
            props.socket.emit('simple-input-message',{message,username,activeChannel})
            setMessage('')
        }
        
    }

    const handleKeyPress= (event)=>{
       if(event.key === 'Enter')
       {
           handleOnSubmit()
       }
    }


    

    return(
        <div ref={sendmessageRef} className='sendmessage-container'>
            {/* <h1>SendMessage</h1> */}
            <form onSubmit={handleOnSubmit}>
                <textarea
                    className='send-input'
                    type='text'
                    ref={textareaRef}
                    value={message}
                    onChange={handleOnChange}
                    onKeyUp={ handleKeyPress}
                    placeholder='#Message'
                />
            </form>
        </div>
    )
}

export default SendMessage