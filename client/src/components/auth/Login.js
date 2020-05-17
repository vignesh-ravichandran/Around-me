import React, {useState, useContext, useEffect} from 'react';  
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {

    const alertContext=useContext(AlertContext);
    const authContext=useContext(AuthContext);
    const {setAlert} =alertContext;
    const {login,error,clearErrors, isAuthenticated} =authContext;


    useEffect(() => {
        
        if(isAuthenticated){
            props.history.push('/');
        }
 
         if(error==='invalid credentials'){
        
             setAlert(error, 'danger');
             clearErrors();
         }
         //eslint-disable-next-line
     }, [error,isAuthenticated,props.history]);

  const [user, setUser]=useState({
     
      email:'',
      password:''
    
  });

  const {email, password}= user;

  const onChange = e =>{
      setUser({...user,[e.target.name]:e.target.value});
  }
  
  const onSubmit = e =>{
      e.preventDefault();
      if(email===''||password===''){
          setAlert('Please fill in all fields','danger');
      }else{
          login({
              email,
              password
          });
      }
  }

    return (
        <div className="container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                
                <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" value={email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange}  class="form-control" id="exampleInputPassword1"/>
                </div>
                
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
            
        </div>
    )
}

export default Login;
