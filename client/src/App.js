import React from 'react';
import {Router,Route,Redirect} from 'react-router-dom'
import RegisterForm from './components/RegisterForm/RegisterForm'
import LoginForm from './components/LoginForm/LoginForm'
import {clearErrors} from './redux/actions/errorActions'
import Auth from './components/Auth/Auth'

import Dashboard from './components/Dashboard/Dashboard';

import {history} from './helpers/history'
import { useDispatch, useSelector } from 'react-redux';
function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // const history  = useHistory();
  const dispatch = useDispatch()
  const goBack = (event)=>{
      history.push('/')
  }

  history.listen((location, action) => {
    // clear alert on location change
    dispatch(clearErrors())
});

  console.log('re rendered')

  return (
    <div className="App">
      
      <Router history={history}>
          <Route exact path='/'>
              <Auth />
          </Route>
          <Route  path='/register'>
              <RegisterForm goBack={goBack} />
          </Route>
          <Route path='/login'>
              <LoginForm goBack={goBack} />
          </Route>
          <Route path='/dashboard'>
            {
              isAuthenticated?
                <Dashboard />:
                <Redirect to='/login' />
            }
          </Route>
      </Router>
    </div>
  );
}

export default App;
