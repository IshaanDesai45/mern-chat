import React,{useEffect} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import MessageList from '../MessageList/MessageList'
import SendMessage from '../Input/SendMessage'
import ActiveUsers from '../ActiveUsers/ActiveUsers'
import io from 'socket.io-client'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'

function Dashboard () {

    let socket ;
    let ENDPOINT = 'http://localhost:5000/';
    socket = io(ENDPOINT);
    const dispatch = useDispatch()
    const activeChannel = useSelector(state => state.chat.activeChannel)
    // const messages = useSelector(state => state.chat.messages)


    //join the socket server
    socket.emit('join',activeChannel)

    useEffect(()=>{
      socket.on('update',(action)=>{
        console.log('to update')
        dispatch(action)
      })
    },[])

    // console.log('dashboard')

    return (
      <div className='grid-container'>
          <Sidebar />
          <MessageList />
          <SendMessage socket={socket} />
          <ActiveUsers />
      </div>
    )
}

export default Dashboard;