import React, {useContext, Fragment, useEffect, useState} from 'react'
import MyQuestion from '../discussions/MyQuestion';
import MyDiscussion from '../discussions/MyDiscussion';
import DiscussionContext from '../../context/discussion/discussionContext';


function MyQuestions() {

   

    const discussionContext=useContext(DiscussionContext);
    const {getUserquestions, clearCurrent}=discussionContext;

    useEffect(()=>{
        
          //clear current question
          //get user questions     //set it in current questions itself
          clearCurrent();
         getUserquestions();
        
       
        
        

          

     },[]); 

     const { currentQuestion }=discussionContext;
        
    
       
 
        const disc=(

            <Fragment>
                   <MyDiscussion currentQuestion={currentQuestion}/>
            </Fragment>
        )

       
        const ask=(

            <Fragment>
                
            </Fragment>
        )
       


    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6" >

                    {

                    currentQuestion!=null ? disc :ask

                    }
                   
                
                </div>
                <div >
                <MyQuestion/>
                </div>
            </div>
        </div>
    )
}

export default MyQuestions
