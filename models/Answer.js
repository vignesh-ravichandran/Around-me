const mongoose = require('mongoose');


const AnswerSchema=mongoose.Schema({
    text: String, 
    author:{

        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
  
      }
});

module.exports=mongoose.model('answer',AnswerSchema);