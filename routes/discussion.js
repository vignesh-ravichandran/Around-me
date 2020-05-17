const express=require('express');
const { check, validationResult } = require('express-validator');
const Question   =require('../models/Question');
const User       =require('../models/User');
const auth   =require('../middleware/auth');
const Answer =require('../models/Answer');


const router =express.Router();

// get    /api/discussions/
//get all the discussion around that location
router.get('/',auth, async (req,res)=>{


    
   

    //const { location}=req.body;


   const location=[req.query.longitude, req.query.latitude];


   // console.log(location);

    try {
        
        const questions= await Question.find({
            location: {
                $nearSphere: {
                  $geometry: {
                    type: 'Point',
                    coordinates: location
                  },
                  $maxDistance: 5000
                }
              }
            });
    //max distance should be in meters , to convert it to mile to meter use multiplier of 1609.34
    res.json(questions);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

      
  
});

//post  /api/discussions/
//add a new discussion to that location 

router.post('/',[auth,[
    check('question','Question is Required').not().isEmpty() , 
    check('location','Location data is Required').not().isEmpty()
  

]], async (req, res)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {question, location}=req.body;

      try {
          

        const loc= { type: 'Point', coordinates: location };
        const authorname=await User.findById(req.user.id);
        const author ={
            id: req.user.id, 
            username: authorname.name
        }

         const newQuestion=new Question({
             text:question,
             author:author,
             location:loc
         });

         const savedquestion=await newQuestion.save();
       res.json(savedquestion);


      } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
      }

});

//get  /api/discussion/:discussionid
//show one discussion with all the answers

router.get('/:discussionid',auth, async (req,res)=>{


    
    try {
       /*
        Question.findById(req.params.discussionid).populate('answers').exec((err,f)=>{
          
            if(err){console.log(err)}else{
                console.log(f);
                res.json(f);
            }

            
        });
       */
     const question= await Question.findById(req.params.discussionid).populate('answers').exec();

    //one question with all the answers
    res.json(question);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

      
  
});

//put   /api/discussions/:discussionid/answer
//adding answers for a discussion

router.post('/:discussionid/answer',[auth,[
    check('answer','Answer is Required').not().isEmpty() , 
   
  

]],async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {answer}=req.body;

    
    try {
         
        const authorname=await User.findById(req.user.id);
        const author ={
            id: req.user.id, 
            username: authorname.name
        }

        const newAnswer=new Answer({
            text:answer,
            author:author
        });
          
        const savedAnswer=await newAnswer.save();
        
        const question=await Question.findById(req.params.discussionid);
        question.answers.push(savedAnswer);
        const savedQuestion=await question.save();
        savedques=await savedQuestion.populate('answers').execPopulate();
        res.json(savedques);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }

});


// get  /// /api/discussions/:username/questions
//to get all the questions of a user
//req.user.id

router.get('/:username/questions',auth,async (req,res)=>{

    const id=req.user.id;
    console.log(id);

    try {

        const questions= await Question.find({'author.id':id});

      
        res.json(questions);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }


});


//delte  /api/discussions/:username/:discussionid
//delete questions of a user

router.delete('/:username/:discussionid',auth,async(req,res)=>{


  const id=req.params.discussionid;

  try {

    const question= await Question.findByIdAndDelete(id);

     console.log("deleted");
    res.json(question);
    
} catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
}


});



module.exports=router;