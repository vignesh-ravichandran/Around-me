import React, {useReducer,useContext} from 'react';
import AuthContext from '../auth/authContext';
import axiox from 'axios'
import discussionContext from './discussionContext';
import discussionReducer from './discussionReducer';

import {
  
    POST_QUESTION,
    ANSWER_QUESTION,
    GET_QUESTIONS,
    GET_MYQUESTIONS,
    QUESTION_ERROR,
    SET_LOCATION,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_QUESTIONS,
    DELETE_QUESTION
} from '../Types'


const DiscussionState = props =>{
  
    const initialState={
        questions:null,
        currentQuestion:null,
        myQuestions:null,
        myCurrent:null,
        location:null,
        error:null

    }

    const [state, dispatch] = useReducer(discussionReducer, initialState);
    const authContext = useContext(AuthContext);
    const {user}=authContext;

//get questions

const getQuestions=async (longitude, latitude)=>{

   
 //console.log(longitude);
 //console.log(latitude);
    
  

try {
   const res= await axiox.get('/api/discussions/',{params:{longitude:longitude ,latitude:latitude }});
   dispatch({type:GET_QUESTIONS,payload:res.data});

} catch (err) {

  //  console.log(err.response.msg);

 dispatch({type: QUESTION_ERROR, payload: err.response});
   
}

  setLocation(longitude, latitude);

}

//setLocation
const setLocation=(longitude, latitude)=>{

    const location=[longitude, latitude]
   // console.log(location);
   
  dispatch({type: SET_LOCATION, payload:location})

}


//get current question
const getCurrent=async (question)=>{

 //axios get request, dispatch to reducer
 //getcurrent type
  const res= await axiox.get(`/api/discussions/${question._id}`);

  dispatch({type:SET_CURRENT,payload:res.data});
 

}

//answer a question
const postAnswer=async (currentQuestion,answerdata)=>{


    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }


    try {
        const res= await axiox.post(`/api/discussions/${currentQuestion._id}/answer`,answerdata,config);
        dispatch({type:ANSWER_QUESTION,payload:res.data});
  
    } catch (err) {
  
      dispatch({type: QUESTION_ERROR, payload: err.response.msg});
        
    }

}

//post a question
const postQuestion=async (askquestion)=>{

    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
 
   try {
       const res= await axiox.post('/api/discussions',askquestion,config);
       dispatch({type:POST_QUESTION,payload:res.data});
 
   } catch (err) {
 
     dispatch({type: QUESTION_ERROR, payload: err.response.msg});
       
   }
    
   getQuestions(state.location[0],state.location[1]);

}


//clear current discussion
const clearCurrent=()=>{
   
 dispatch({type:CLEAR_CURRENT});

}

//get questionsof user

const getUserquestions= async ()=>{

      
  

try {
    const res= await axiox.get(`/api/discussions/${user.name}/questions`);
    dispatch({type:GET_MYQUESTIONS,payload:res.data});
 
 } catch (err) {
 
   //  console.log(err.response.msg);
 
  dispatch({type: QUESTION_ERROR, payload: err.response.msg});
    
 }
 
  
 
 }
 
 //delete question of a user
 const deleteDiscussion=async (question)=>{

      
       try {
        const res=await axiox.delete(`/api/discussions/${user.name}/${question._id}`);
        dispatch({type:DELETE_QUESTION,payload:res.data});
     
     } catch (err) {
     
       //  console.log(err.response.msg);
     
      dispatch({type: QUESTION_ERROR, payload: err.response.msg});
        
     }

 }



//clear questions
//set all null in discussion state
const clearAll=()=>{

    dispatch({type:CLEAR_QUESTIONS});
}




return(
    <discussionContext.Provider
     value ={
         {
             questions:state.questions,
             currentQuestion:state.currentQuestion,
             location:state.location,
             myQuestions:state.myQuestions,
             postQuestion,
             clearCurrent,
             getCurrent,
             getQuestions,
             postAnswer,
             getUserquestions,
             clearAll,
             deleteDiscussion
             
         }
     }
    
    >
        {props.children}
    </discussionContext.Provider>
)


}

export default DiscussionState;