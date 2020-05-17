const express  =require('express');
const connectDB=require('./config/db');
const app      =express();
const path     =require('path');
//connect database
connectDB();

//init middleware -> since body parser is inbuilt now
app.use(express.json({extended:false}));




//define routes
app.use('/api/user', require('./routes/user'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/discussions',require('./routes/discussion'));


// server static assets in production 
if(process.env.NODE_ENV ==='production'){

//set static folder 
app.use(express.static('client/build'));

app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname,'client','build','index.html')));


}


const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>console.log(`server started at port ${PORT}`));