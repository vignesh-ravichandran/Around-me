import React, {useContext, Fragment, useEffect} from 'react'
import QuestionItem from './QuestionItem';
import DiscussionContext from '../../context/discussion/discussionContext'




const Questions=()=> {

   

    const discussionContext=useContext(DiscussionContext);

    const { questions, location}=discussionContext;

    

    useEffect(()=>{
       // getContacts();
        //eslint-disable-next-line
    },[]); 

   

    if(questions !== null && questions.length===0 ){
        return <h4>Please add a question</h4>
    }


    return (
        <div>
        
          

           <Fragment>

           { questions!=null &&

           questions.map((question)=>(
               <QuestionItem key={question._id} question={question} userLocation={location}/>
           ))

           }

           </Fragment>

        </div>
    )
}

export default Questions
