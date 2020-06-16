import React,{useState,useRef, useEffect} from 'react'
import './SendMessage.css'
import { useSelector } from 'react-redux'
// import Dropzone from 'react-dropzone'
import axios from 'axios'
function SendMessage (props){
    const textareaRef = useRef(null)
    const sendmessageRef = useRef(null)
    const username           = useSelector(state => state.auth.user.username)
    const activeChannel        = useSelector(state => state.chat.activeChannel)
    //local state to control the input 
    const [message,setMessage] = useState('');
    // const [selectedFile,setSelectedFile] = useState(null)

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
        const type = 'text'
        if(formattedMessage !== '' ){
            console.log(formattedMessage);
            props.socket.emit('simple-input-message',{message,username,activeChannel,type})
            setMessage('')
        }
        
    }

    const handleKeyPress= (event)=>{
       if(event.key === 'Enter')
       {
           handleOnSubmit()
       }
    }

    const fileSelectedHandler = (event)=>{
        // setSelectedFile(event.target.files[0])
        let file = event.target.files[0]
        let formData = new FormData();
        const config = { 
            header : {"Content-Type" : "multipart/form-data" }
        }
        formData.append("file",file);
        console.log(formData.get('file'))
        console.log(formData)
        axios.post('http://localhost:5000/upload',formData,config)
            .then(res=>
                {
                   const type= 'image';
                   
                   if(res.data.success){
                       console.log(res.data.url)
                    props.socket.emit('simple-input-message',{message:res.data.url,username,activeChannel,type})
                   }
                })
            .catch(err=>console.log(err))
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
                
                {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
                </Dropzone> */}

                <label className='attachment-icon'>
                    <i className="fas fa-paperclip"></i>
                    <input onChange={fileSelectedHandler} className='attachment' type='file' />
                </label>
                
            </form>
        </div>
    )
}

export default SendMessage