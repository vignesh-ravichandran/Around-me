import React, {useContext, useState} from 'react';
import DiscussionContext from '../../context/discussion/discussionContext';

const AskQuestion=() => {

    const [askquestion, setAskquestion]=useState(
        {
            question:'',
            location:[]
        }
    );

     const discussionContext = useContext(DiscussionContext);
     const {location , postQuestion} =discussionContext;
     const {question}=askquestion;

         
    const onChange=(e)=> setAskquestion({location:location, [e.target.name]:e.target.value});
      
    const onSubmit=(e)=>{
        e.preventDefault();
      //  console.log(askquestion);
       postQuestion(askquestion);


    }


    return (
        <div className="mt-4">
            <form onSubmit={onSubmit}>

            <div className="form-group">
            <label for="exampleFormControlTextarea1">Ask a question to be answere by this locality </label>
         <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="question" value={question} onChange={onChange}></textarea>
          </div>
          <button type="submit" className="btn btn-dark">Ask ?</button>
            </form>
        </div>
    )
}

export default AskQuestion
