import React from 'react'
import {Link} from 'react-router-dom'
import './Auth.css'
import {logout} from '../../redux/actions/authActions'
import {useDispatch} from 'react-redux'
function Auth () {

    const dispatch = useDispatch()
    const handleLogout =()=>{
        dispatch(logout())
    }
   

    return (
        <div className="formContainer auth">
                <h2 className='bulishColor'>Create Account or,Sign In</h2>
                <div className='authContainer'>
                    <Link to='/register' className='authCard'>
                        <h2 className='cardHead bulishColor'>Create</h2>
                        <p className='cardDescp'>Create a new account</p>
                        <p><i className="fas fa-user-plus"></i></p>
                        <Link to='/register' className='submitBtn btn-bluish'>Create</Link>
                        <button onClick={handleLogout} className='submitBtn btn-bluish'>Logout</button>
                    </Link >
                    <Link to='/login' className="authCard">
                        <h2 className='cardHead greenColor'>Login</h2>
                        <p className='cardDescp'>Sign in to an existing account</p>
                        <p><i className="fas fa-user"></i></p>
                        <Link to='/login' className='submitBtn btn-green'>Login</Link>

                    </Link>

                </div>
              
        </div>
    )
}

export default Auth