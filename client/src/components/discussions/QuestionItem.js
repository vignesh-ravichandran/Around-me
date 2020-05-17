import React, {useContext, useEffect, useState} from 'react'
import DiscussionContext from '../../context/discussion/discussionContext'

const QuestionItem=({question, userLocation}) =>{

  
  
    const { text, author}=question;
    const discussionContext = useContext(DiscussionContext);
     const {getCurrent} =discussionContext;
    
    
    
   const view=()=>{
       getCurrent(question);
    }
  



    //location calculation start
    function degreesToRadians(degrees){
      return degrees * Math.PI / 180;
  }

  function getDistanceBetweenPoints(lat1, lng1, lat2, lng2){
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
}
  
//populate distance
const popuplateDistance=()=>{
  if(userLocation!=null){
          
    const dist=   getDistanceBetweenPoints(userLocation[1], userLocation[0], question.location.coordinates[1], question.location.coordinates[0])

   return dist.toFixed(1);
     }
 }

    //location calculation  end


  
     
    useEffect(()=>{
    
     // popuplateDistance();
    
      //eslint-disable-next-line
     
     //const dist=getDistanceBetweenPoints(location[1], location[0], question.location[1], question.location[0]);
     
    // setDistance({meters:dist});
 
    },[]); 
    
    
    return (
        <div className="mt-2">
            <div className="card" style={{width: '30rem'}}>
       
        <div className="card-body">
    <h5 className="card-title">{author.username}</h5>
    <p className="card-text">{text}</p>
    <a href="#" className="btn btn-secondary btn-sm" onClick={view}>View</a>  <a href="#" className="btn btn-secondary btn-sm" >{popuplateDistance()} m</a>
        </div>
      </div>
        </div>
    )
}

export default QuestionItem
