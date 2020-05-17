import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/auth/authContext';




const PrivateRoute = ({component: Component, ...rest}) => {

    const authContext=useContext(AuthContext);
    const {isAuthenticated, loading}=authContext;

    //console.log(isAuthenticated);
    //console.log('then');
    //console.log(loading);
   // console.log(!isAuthenticated && !loading);
      

    return (
        <Route {...rest}  render = {props => !isAuthenticated && !loading
        ? ( <Redirect to='/login'/>)   : (<Component {...props} />)     } />
    )
}

export default PrivateRoute
