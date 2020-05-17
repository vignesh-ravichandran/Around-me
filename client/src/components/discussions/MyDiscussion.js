import React , {useContext, useState, Fragment, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import DiscussionContext from '../../context/discussion/discussionContext';

const MyDiscussion=({currentQuestion})=> {

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
      const {clearCurrent, postAnswer, deleteDiscussion}=discussionContext;
      const {user}=authContext;

      const onChange=(e)=> setAnswer({ [e.target.name]:e.target.value});
      const deleteit=()=>{


        deleteDiscussion(currentQuestion);
        clearCurrent();
      

      }

      const onSubmit=(e)=>{
        e.preventDefault();
         
        if(answer!=''){
                postAnswer(currentQuestion,answerdata);
        }
        setAnswer({ answer:''});

      }
          
    return (
        <div>
          <div class="alert alert-dark mt-4" role="alert">
           <button  class="btn btn-secondary btn-sm float-right" onClick={clearCurrent}>Close</button>
           <button  class="btn btn-secondary btn-sm float-right mr-1" onClick={deleteit}>Delete</button>
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

export default MyDiscussion
