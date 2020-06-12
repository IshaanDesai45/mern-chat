import {GET_CHATS} from '../actions/types'

const initialState = {
    messages : [],
    activeChannel  : 'default'
}


function chatReducers (state=initialState,action){

    switch(action.type){
        case 'UPDATE' : return {
            ...state,
            messages : [...state.messages,action.payload]
        }

        case GET_CHATS : return{
            ...state,
            messages : action.payload
        }
        default : return state
    }

} 

export default chatReducers