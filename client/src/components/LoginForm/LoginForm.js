import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {login} from '../../redux/actions/authActions'
import './LoginForm.css'
function LoginForm (props) {

    const dispatch = useDispatch();
    const error = useSelector (state => state.error)
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleLogin =  ()=>{
        
        const credentials = {
            email,
            password
        }

    
     dispatch(login(credentials))
    //  history.push('/dashboard')
    

    clearInputFields()
    }

    const clearInputFields = ()=>{
        setPassword('');
        setEmail('')
    }
    
    return(
        <div className='formContainer'>
        <i onClick={props.goBack} className='arrowLeft fas fa-arrow-left'></i>
        <h2 className='bulishColor'>Login Account</h2>
        {
            error.id === 'LOGIN_FAIL'?
                <p className='alert'>{error.msg}</p>:
                null
        }
        <div className='inputContainer'>
            <input value={email} onChange={(event)=> setEmail(event.target.value)} type='text' required />
            <span className='form-span'>email</span>
        </div>
        <div className='inputContainer'>
            <input
            value={password} onChange={(event)=> setPassword(event.target.value)} type='password' required />
            <span className='form-span'>password</span>
        </div>
        <div>
            <button onClick={handleLogin} className='submitBtn btn-bluish'>Submit</button>
        </div>
    </div>
    )
}

export default LoginForm