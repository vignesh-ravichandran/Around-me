import React , {useContext, useState, Fragment, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import DiscussionContext from '../../context/discussion/discussionContext';

const Discussion=({currentQuestion, userLocation})=> {

        const [answerdata, setAnswer]=useState(
                {
                   answer:''
                }
            );


   // console.log(question);
      const {author, answers, text}=currentQuestion;
      const {answer}=answerdata;
      const authContext=useContext(AuthContext);
      const discussionContext = useContext(DiscussionContext);
      const {clearCurrent, postAnswer}=discussionContext;
      const {user}=authContext;

      const onChange=(e)=> setAnswer({ [e.target.name]:e.target.value});

      const onSubmit=(e)=>{
        e.preventDefault();
         
        if(answer!=''){
                postAnswer(currentQuestion,answerdata);
        }
        setAnswer({ answer:''});

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
            
      const dist=   getDistanceBetweenPoints(userLocation[1], userLocation[0], currentQuestion.location.coordinates[1], currentQuestion.location.coordinates[0])
  
     return dist.toFixed(1);
       }
   }
  
      //location calculation  end
  
          
    return (
        <div>
          <div class="alert alert-dark mt-4" role="alert">
           <button  class="btn btn-secondary btn-sm float-right" onClick={clearCurrent}>Close</button>
           <button  class="btn btn-secondary btn-sm float-right mr-1" >{popuplateDistance()} m</button>
          <p> {text} </p>
          <span class="badge badge-dark">{author.username}</span> 
</div>
        <hr className="my-4" />

        {answers!=null && answers.map((answer)=>(

<div class="alert alert-secondary" role="alert">
        <span class="badge badge-secondary">{answer.author.username}</span> {answer.text} 
</div>

        ))}

       
<div class="alert alert-secondary" role="alert">

<div>
<form onSubmit={onSubmit}>
<div class="form-group">
    <label for="exampleFormControlTextarea1">Add an answer</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="answer" value={answer} onChange={onChange}></textarea>
    <button type="submit" class="btn btn-dark btn-sm float-right mt-1">Post</button>
  </div>
</form>
<span class="badge badge-secondary"> {user && user.name}</span>
</div>


</div>

        </div>
    )
}

export default Discussion
