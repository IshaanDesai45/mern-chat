import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './ChannelContainer.css'
import {logout} from '../../redux/actions/authActions'
function ChannelContainer(){

    
    const dispatch = useDispatch();
    const username  =useSelector((state)=> state.auth.user.username)
    const hanldeLogout =(event)=>{
        event.preventDefault()
        dispatch(logout())
    }
    
    
    // console.log(user)
    return(
        <div className='channel-container'>
            <div className='server-name'>
                <h1 className='topic'>Default</h1>
            </div>
            <div className='channels-name'></div>
            <div className='profile'>
                <div className='username'><i className="user-icon fas fa-user"></i><p>{username}</p></div>
                <button onClick={hanldeLogout} className='logoutBtn btn-bluish'>Logout</button>
            </div>
        </div>
    )
}

export default ChannelContainer