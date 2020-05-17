import React, {useContext, Fragment, useEffect} from 'react'
import MyQuestionItem from './MyQuestionItem';
import DiscussionContext from '../../context/discussion/discussionContext'




const MyQuestion=()=> {


    const discussionContext=useContext(DiscussionContext);

    useEffect(()=>{
       // getContacts();
        //eslint-disable-next-line
    },[]); 

    const { myQuestions}=discussionContext;

    if(myQuestions !== null && myQuestions.length===0 ){
        return <h4>You haven't asked any questions yet</h4>
    }


    return (
        <div>
        
          

           <Fragment>

           { myQuestions!=null &&

myQuestions.map((question)=>(
               <MyQuestionItem key={question._id} question={question}/>
           ))

           }

           </Fragment>

        </div>
    )
}

export default MyQuestion
