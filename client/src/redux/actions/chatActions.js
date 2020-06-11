import io from 'socket.io-client'

// let socket = io('http://localhost:5000/')

export const sendMessageActionCreator = (socket,message)=>{
    socket.emit('simple-input-message',message)
}