import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,USER_LOADED,USER_LOADING,AUTH_ERROR } from '../actions/types'
import {history} from '../../helpers/history'
import {returnErrors} from './errorActions'
// import {  } from '../../../../../Reac/t-learning/mern-exercise-tracker/src/redux/actions/types'


export const loadUser =()=>(dispatch,getState)=>{
    //User Loading
    dispatch({type:USER_LOADING})

    const token = getState().auth.token;

    //headers

    const config ={
        headers:{
            "Content-type" :  "application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    axios.get('http://localhost:5000/login/user',config)
        .then(user => {
            dispatch({
                type:USER_LOADED,
                payload:user.data
            })
        })
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({
                type :AUTH_ERROR
            })
        })
}

//action creator for registeration
export const register  = ({username,email,password})=> async (dispatch,getState) =>{

    const registerSuccess = (data) => ({type : REGISTER_SUCCESS,payload  : data})
    const registerFail = () => ({type : REGISTER_FAIL})
    //setting up header on body for register http request
    const config = { 
        headers : {
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({username,email,password})

    axios.post('http://localhost:5000/register',body,config)
        .then(res =>{
            dispatch(registerSuccess(res.data))
            history.push('/dashboard')
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
            dispatch(registerFail())
        })
}


//action creator for login
export const login = ({email,password}) => (dispatch,getState)=>{
    
    const loginSuccess = (data) => ({type : LOGIN_SUCCESS,payload  : data})

    //setting up body and header for http request
    const config = {
        headers : {
            "Content-Type" : "application/json"
        }
    }

    const body =  JSON.stringify({email,password});

    axios.post('http://localhost:5000/login',body,config)
        .then(res => {
            dispatch(loginSuccess(res.data))
            history.push('/dashboard')
        }
        )
        .catch (err=> {
            dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
            dispatch({
                type : LOGIN_FAIL
            })
        })
}


export const logout = ()=>(dispatch) =>{

    const logoutcreator = ()=>({type:LOGOUT_SUCCESS})
    dispatch(logoutcreator())

    history.push('/login')
}