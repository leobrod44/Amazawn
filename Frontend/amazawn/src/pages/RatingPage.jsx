// src/pages/RatingPage.js
import React, { useState } from 'react';
import StarRating from '../components/StarRating';
import Header from '../components/Header';
import '../styling/RatingPage.css'
import Footer from "../components/Footer";
import ConfirmationPage from '../components/ConfirmationPage';
import '../styling/CustomerSupport.css'
import axios from 'axios';

const RatingPage = () => {
  const [ratings, setRatings] = useState({
   
    delivery: null,
    supportTeam: null,
    packageDropOff: null,
    trackingUpdates: null,
  });
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (category, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = async () => {
    
    console.log('Selected Ratings:', ratings);
    console.log('Additional Comments:', comments);
    setSubmitted(true);
    try {


      const reviewData = {

        //shipmentID: TODO get this from the url redirect ex: http://localhost:3000/review/3c9cb147-5c7d-44eb-8622-b7fa728f8b20
        deliveryRating: ratings.delivery,
        supportRating: ratings.supportTeam,
        dropOffRating: ratings.packageDropOff,
        trackingRating: ratings.trackingUpdates,
        comment: comments,
        

      };
      
      const response = await axios.post('http://localhost:8080/support/addReview', reviewData, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      console.log(response.data);
  } catch (error) {
      console.error('Error:', error);
      // Handle errors if the request fails
  }
  };

  return (
    <div>
      <Header />
      <div className="container-raiting">
      {submitted ? (
        
          <ConfirmationPage />
        ) : (
          
          <>
      <h3 style={{ textAlign: "center" }}>Rate Your Experience</h3>
      <StarRating title="Delivery" onRatingChange={(rating) => handleRatingChange('delivery', rating)} />
      <StarRating title="Drop Off" onRatingChange={(rating) => handleRatingChange('packageDropOff', rating)} />
      <StarRating title="Tracking Updates" onRatingChange={(rating) => handleRatingChange('trackingUpdates', rating)} />
      <StarRating title="Support" onRatingChange={(rating) => handleRatingChange('supportTeam', rating)} />
      <div>
        <br></br>
        <label className="form-label" 
        style={{ 
        fontSize:"larger",
        color:" #016846",
        fontFamily: "Roboto,Arial, Helvetica, sans-serif"
        }} >Additional Comments</label>
       
        <textarea 
        className='message-box'
        rows="4" 
        cols="50" 
        value={comments} 
        onChange={handleCommentsChange}
        style={{height:"150px"}}
        />

      
      
      </div>
      <button className="btn"
      style={{
        backgroundColor: '#016846',
        color: 'white',
        transition: 'box-shadow 0.3s ease', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
         }}
        onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0px 16px 16px rgba(0, 0, 0, 0.5)')} // Box shadow on hover
          onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)')} // Reset box shadow when not hovering
       onClick={handleSubmit}>Submit
    
      </button>
      </>
       )}
      </div>
      <Footer/>
   
    </div>
  );
};

export default RatingPage;
