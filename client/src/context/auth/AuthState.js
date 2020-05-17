import React, {useReducer, useContext} from 'react';
import axios from 'axios'
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../Types'


const AuthState = props =>{
  
    const initialState={
        token: localStorage.getItem('token'),
        isAuthenticated:false,
        loading: false, 
        user:null,
        error: null

    }

    const [state, dispatch] = useReducer(authReducer, initialState);

  

//load user
const loadUser=async ()=> {
// put the token in a global header instead of  a cofig obj in utils folder
//setting the auth toke to the header
if(localStorage.token){
    setAuthToken(localStorage.token);
}
try {
    const res=await axios.get('/api/auth');
  
    dispatch({type:USER_LOADED, payload:res.data});


} catch (err) {
    
    dispatch({type:AUTH_ERROR});

}


}

//register user
const register = async formData =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        console.log("api");
        const res = await axios.post('/api/user',formData, config);
        
        dispatch({type:REGISTER_SUCCESS, payload: res.data});

        loadUser();


    } catch (err) {
        console.log("error tri");
        dispatch({type:REGISTER_FAIL,
        payload: err.response.data.msg
        });
    }

}
//login user
const login = async formData =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        console.log("api");
        const res = await axios.post('/api/auth',formData, config);
       
        dispatch({type:LOGIN_SUCCESS, payload: res.data});

        loadUser();


    } catch (err) {
        console.log("error tri");
        dispatch({type:LOGIN_FAIL,
        payload: err.response.data.msg
        });
    }

}
//logout
const logout=()=>{

   
    dispatch({type:LOGOUT});

}
//clear errors
const clearErrors=()=> dispatch({type: CLEAR_ERRORS});


return(
    <AuthContext.Provider
     value ={
         {
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login, 
            logout, 
            clearErrors

         }
     }
    
    >
        {props.children}
    </AuthContext.Provider>
)


}

export default AuthState;