const mongoose=require('mongoose');


const QuestionSchema=mongoose.Schema({

     text: String , 
     author:{

        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
  
      },
    answers : [
        {
           type: mongoose.Schema.Types.ObjectId,
            ref: "answer"
        }
    ],
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
     


});


QuestionSchema.index({ location: '2dsphere' });

module.exports=mongoose.model('question',QuestionSchema);