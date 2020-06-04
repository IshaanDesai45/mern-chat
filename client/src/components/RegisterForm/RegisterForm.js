import React,{useState} from 'react'
import './RegisterForm.css'
import {register} from '../../redux/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'

function RegisterForm (props) {
    const [username,setUsername] = useState('');
    const [email,setEmail]       = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch()
    const error = useSelector (state => state.error)

    const handleRegister = ()=>{
        const newUser = { 
            username,
            email,
            password
        }
        
        dispatch(register(newUser));
        clearInputFields()
    }

    const clearInputFields = ()=>{
        setUsername('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className='formContainer'>
            <i onClick={props.goBack}  className=" arrowLeft fas fa-arrow-left"></i>
            <h2 className='bulishColor'>Create Account</h2>
            {
                 error.id === 'REGISTER_FAIL'?
                 <p className='alert'>{error.msg.msg}</p>:
                 null
            }
            <div className='inputContainer'>
                <input value={username} onChange={(event)=>setUsername(event.target.value)} type='text' required/>
                <span>Username</span>
            </div>
            <div className='inputContainer'>
                <input value={email} onChange={(event)=>setEmail(event.target.value)} type='text' required />
                <span>email</span>
            </div>
            <div className='inputContainer'>
                <input value={password} onChange={(event)=>setPassword(event.target.value)} type='password' required />
                <span>password</span>
            </div>
            <div>
                <button onClick={handleRegister} className='submitBtn btn-bluish'>Submit</button>
            </div>
        </div>
    )
}

export default RegisterForm