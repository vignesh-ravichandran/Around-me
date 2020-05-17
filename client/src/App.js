import React, {Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './components/pages/About';
import Home from './components/pages/Home';
import MyQuestions from './components/pages/MyQuestions';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import DiscussionState from './context/discussion/DiscussionState';



if(localStorage.token){
  setAuthToken(localStorage.token);
}



const App=()=> {
  return (
      <AuthState>
        <DiscussionState>
        <AlertState>
        <Router>
          <Fragment>
             <Navbar/>
             <div className="container" >
             <Alerts/>
               <Switch>
               <PrivateRoute exact path='/' component={Home} />
               <PrivateRoute exact path='/myquestions' component={MyQuestions} />
                 <Route exact path="/about" component={About}/>
                 <Route exact path='/register' component={Register}/>
                 <Route exact path='/login' component={Login} />

               </Switch>
             </div>
          </Fragment>
        </Router>
        </AlertState>
        </DiscussionState>
      </AuthState>
    

  );
}

export default App;
