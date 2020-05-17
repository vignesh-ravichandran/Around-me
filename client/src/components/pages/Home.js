import React, {useContext, Fragment, useEffect, useState} from 'react'
import Questions from '../discussions/Questions';
import Discussion from '../discussions/Discussion';
import AskQuestion from '../discussions/AskQuestion';
import DiscussionContext from '../../context/discussion/discussionContext';


function Home() {

   

    const discussionContext=useContext(DiscussionContext);
    const {getQuestions,clearCurrent}=discussionContext;

    useEffect(()=>{
        // getContacts();
         //eslint-disable-next-line
         clearCurrent();
         navigator.geolocation.getCurrentPosition(function(position) {
            //console.log("Latitude is :", position.coords.latitude);
          //  console.log("Longitude is :", position.coords.longitude);

            

            getQuestions(position.coords.longitude,position.coords.latitude);
            
         

          });
        
       
        
        

          

     },[]); 

     const { currentQuestion ,location}=discussionContext;
        
    
       
 
        const disc=(

            <Fragment>
                   <Discussion currentQuestion={currentQuestion} userLocation={location}/>
            </Fragment>
        )

       
        const ask=(

            <Fragment>
                 <AskQuestion/>
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
                <Questions/>
                </div>
            </div>
        </div>
    )
}

export default Home
