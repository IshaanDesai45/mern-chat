import {chatActions} from '../actions/types'

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

        default : return state
    }

} 

export default chatReducers