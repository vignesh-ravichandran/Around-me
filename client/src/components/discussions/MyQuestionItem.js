import React, {useContext} from 'react'
import DiscussionContext from '../../context/discussion/discussionContext'

const MyQuestionItem=({question}) =>{
  
    const { text, author}=question;
    const discussionContext = useContext(DiscussionContext);
     const {getCurrent, deleteDiscussion} =discussionContext;

   const view=()=>{
       getCurrent(question);
    }
    const deleteit=()=>{
          
      deleteDiscussion(question);
   
    }
    
    
    return (
        <div className="mt-2">
            <div className="card" style={{width: '30rem'}}>
       
        <div className="card-body">
    <h5 className="card-title">{author.username}</h5>
    <p className="card-text">{text}</p>
          <a href="#" className="btn btn-secondary btn-sm" onClick={view}>View</a> <a href="#" className="btn btn-secondary btn-sm" onClick={deleteit}>Delete</a>
        </div>
      </div>
        </div>
    )
}

export default MyQuestionItem
