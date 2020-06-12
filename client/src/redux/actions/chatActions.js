import axios from 'axios'
import { GET_CHATS } from './types';


//GET_CHATS action creator
export const getChats = ( )=>(dispatch,getState)=>{

    const loadChats =(chats)=> { return {type:GET_CHATS,payload:chats}}

    //getting the activeChannel
    const activeChannel = getState().chat.activeChannel;
    // console.log(activeChannel)
    const body = JSON.stringify({channel : activeChannel})
    //sending a get request to get all the chats of a particular channel
    axios.get('http://localhost:5000/getChats',body)
        .then(response=>{
            dispatch(loadChats(response.data.chats))
            // console.log(response.data.chats)
        })
        .catch(err=>{
            console.log(err)
        })

}