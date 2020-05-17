import React,  {Fragment, useContext} from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'
import DiscussionContext from '../../context/discussion/discussionContext'

function Navbar() {



    const authContext = useContext(AuthContext);
    const discussionContext = useContext(DiscussionContext);
    const {isAuthenticated, logout, user}=authContext;
    const {clearAll} = discussionContext;

   const onLogout=()=>{
      
    logout();
    clearAll();
  
}

const authLinks =(
    <Fragment>

<li className="nav-item active"><div className="nav-link"> Hi {user && user.name} !</div></li>
<li className="nav-item active">
            <Link to='/' className="nav-link">Home</Link>
            </li>
<li className="nav-item active">
            <Link to='/myquestions' className="nav-link">My Questions</Link>
            </li>
 <li className="nav-item active">
     <a onClick={onLogout} href="#!" className="nav-link">
         <i className="fa fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
     </a>
 </li>


    </Fragment>
)
const guestLinks =(
    <Fragment>


            <li className="nav-item active">
            <Link to='/about' className="nav-link">About</Link>
            </li>
            <li className="nav-item active">
            <Link to='/register' className="nav-link">Register</Link>
            </li>
            <li className="nav-item active">
            <Link to='/login' className="nav-link">Login</Link>
            </li>


    </Fragment>
)



    return (  
        
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Around-Me</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
    {isAuthenticated ? authLinks: guestLinks}
   
        </ul>
    </div>
      
   
  </nav>
    )
}

export default Navbar
