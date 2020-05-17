import React, {useState, useContext, useEffect} from 'react';  
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {

    const alertContext=useContext(AlertContext);
    const authContext=useContext(AuthContext);

    const {setAlert} =alertContext;
    const {register,error,clearErrors, isAuthenticated} =authContext;


    useEffect(() => {
        
       if(isAuthenticated){
           props.history.push('/');
       }

        if(error==='User already exists'){
       
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error,isAuthenticated,props.history]);

  const [user, setUser]=useState({
      name:'',
      email:'',
      password:'',
      password2:''
  });

  const {name, email, password, password2}= user;

  const onChange = e =>{
      setUser({...user,[e.target.name]:e.target.value});
  }
  
  const onSubmit = e =>{
      e.preventDefault();
    if(name ==='' || email ==='' || password === '' ){
             setAlert('Please enter all the fields','danger');
    }else if(password !== password2){
        setAlert('Passwords should match !','danger')
    }else{

        register({
            name, 
            email,
            password
        });
    }


      
  }

    return (
        <div className="container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
               
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} class="form-control"/>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                   <label htmlFor="exampleInputPassword1">Password</label>
                   
                    <input type="password" name="password" value={password} onChange={onChange}
                    required
                    minLength="6"
                    
                    class="form-control" id="exampleInputPassword1"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} class="form-control" id="exampleInputPassword1"/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
            
        </div>
    )
}

export default Register;
