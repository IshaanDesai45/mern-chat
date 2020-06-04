import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
}   from '../actions/types'

const initialState = { 
    token  :localStorage.getItem('token'),
    isAuthenticated :false,
    user  :null,
    isLoading : false
}

function authReducers ( state = initialState , action){

    switch(action.type) {
        case USER_LOADING  : return {
            ...state,
            isLoading :true
        }
        case USER_LOADED   : return{
            ...state,
            ...action.payload,
            isAuthenticated :true,
            isLoading :false,
        }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS : 
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false
            }
        case AUTH_ERROR : 
        case REGISTER_FAIL : 
        case LOGIN_FAIL :
        case LOGOUT_SUCCESS : 
            localStorage.removeItem('token');
            return {
                isAuthenticated:false,
                isLoading:false,
                user:null,
                token: null
            }
        default : return state;
    }


}

export default authReducers
