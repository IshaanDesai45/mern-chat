import {combineReducers,applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import authReducers from './reducers/authReducers'
import errorReducers from './reducers/errorReducers'
import chatReducers from './reducers/chatReducers'
const rootReducer = combineReducers({
    auth :authReducers,
    error :errorReducers,
    chat : chatReducers
});

const store = createStore(rootReducer,applyMiddleware(thunk));
store.subscribe(() => {
    console.log(store.getState())
})

export default store;