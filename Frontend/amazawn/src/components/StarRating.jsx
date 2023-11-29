// src/components/StarRating.js
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../styling/RatingPage.css";

const StarRating = ({ title, onRatingChange }) => {
  const [hover, setHover] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    onRatingChange && onRatingChange(rating);
  };

  return (
    <div>
      <label
        className="form-label"
        style={{
          fontSize: "larger",
          color: "#016846",
          fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        }}
      >
        {title}
      </label>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <FaStar
            key={index}
            className="star"
            color={
              ratingValue <= (hover || selectedRating) ? "#016846" : "#e4e5e9"
            }
            size={30}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleStarClick(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
