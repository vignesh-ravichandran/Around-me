import { 
    POST_QUESTION,
    GET_QUESTIONS,
    QUESTION_ERROR,
    SET_LOCATION,
    CLEAR_CURRENT,
    SET_CURRENT,
    GET_MYQUESTIONS,
    ANSWER_QUESTION,
    CLEAR_QUESTIONS,
    DELETE_QUESTION
} from '../Types';


export default (state, action)=>{

 switch(action.type){

    case GET_QUESTIONS:
        return{
            ...state,
            questions:action.payload,
            loading:false
        }


    case QUESTION_ERROR:
        return{
            ...state,
            error:action.payload
        }    
    case SET_LOCATION:
        return{
            ...state,
            location:action.payload
        }    
    case POST_QUESTION:
        return{
            ...state,
            currentQuestion:action.payload
        }    
    case CLEAR_CURRENT:
        return{
            ...state,
            currentQuestion:null
        }    
    case SET_CURRENT:
        return{
            ...state,
            currentQuestion:action.payload
        }   
    case ANSWER_QUESTION:
        return{
            ...state,
            currentQuestion:action.payload
        }    
    case GET_MYQUESTIONS:
        return{
            ...state,
            myQuestions:action.payload
        }     
    case CLEAR_QUESTIONS:
        return {
            ...state,
            questions:null,
            currentQuestion:null,
            myQuestions:null,
            myCurrent:null,
            location:null,
            error:null
        }    
    case DELETE_QUESTION:
        return{
            ...state,
            myQuestions:state.myQuestions.filter(question => {
                console.log(question._id!==action.payload._id);
                return question._id!==action.payload._id} ),
            loading:false
        }    
 }



}