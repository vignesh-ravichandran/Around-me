import React from 'react'
import {Link} from 'react-router-dom'

function About() {
    return (
        <div className="mt-4"> <div className="jumbotron">
        <h1 className="display-4">Around-Me</h1>
        <p className="lead">This is a platform where you can take part in discussions, and get to know what is happening around you .</p>
        <hr className="my-4" />
        <p>version : 1.0 </p>
        <div>
          <ul>
            <li> Discussions around 5kms alone are shown</li>
            
            <li> Please enable location access </li>
          </ul>
          <p>Next updates : </p>
          <ul>
            <li>
              Users can select the range of location for the discussions
            </li>
            
          </ul>
        </div>
        
        <Link className="btn btn-primary btn-lg" to="/register" role="button">Register Now</Link>
      </div></div>
       
    )
}

export default About
