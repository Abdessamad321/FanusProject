import React, { useState, useEffect } from "react";
import { StarFilled } from "@ant-design/icons";
import FanousButton from "../Button/Button";
import { TextInput, TextAreaInput } from "../inputs/inputs";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    calculateStatistics();
  }, [reviews]);

  const calculateStatistics = () => {
    const statistics = {};
    reviews.forEach((review) => {
      const globalRating = Math.floor(review.rating);
      if (!statistics[globalRating]) {
        statistics[globalRating] = 1;
      } else {
        statistics[globalRating]++;
      }
    });
    setStatistics(statistics);
  };

  const [statistics, setStatistics] = useState({});

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      rating,
      title: reviewTitle,
      content: reviewContent,
    };
    setReviews([...reviews, newReview]);
    setRating(0);
    setReviewTitle("");
    setReviewContent("");
  };

  const renderReviews = () => {
    if (reviews.length === 0) {
      return <p>No reviews available yet.</p>;
    }

    const maxReviews = 3;
    return reviews.slice(0, maxReviews).map((review) => {
      const createdAtDate = new Date(review.createdAt);
      const now = new Date();
      const timeDifference = Math.floor(
        (now - createdAtDate) / (1000 * 3600 * 24)
      );
      const timeAgo = `${timeDifference} day${
        timeDifference !== 1 ? "s" : ""
      } ago`;
      console.log("createdAtDate:", createdAtDate);
      console.log("now:", now);
      console.log("timeDifference:", timeDifference);

      return (
        <div key={review.id} className="submitted-review">
          <div className="rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarFilled
                key={index}
                style={{ color: index < review.rating ? "#FFD700" : "#ccc" }}
              />
            ))}
          </div>
          <h3>{review.title}</h3>
          <p>{review.content}</p>
          <p>{timeAgo}</p>
        </div>
      );
    });
  };

  const ProgressBar = ({ percentage }) => {
    return (
      <>
        <div className="flex items-center gap-2 mb-2">
          <div className="progress w-full h-1 bg-[#e3e3e3] rounded-md overflow-hidden">
            <div
              className="progress-bar text-transparent bg-[#161c2d]"
              role="progressbar"
              style={{ width: `${percentage}%` }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {percentage}
            </div>
          </div>

          {Array.from({ length: 5 }).map((index) => (
            <StarFilled key={index} style={{ color: "#FFD700" }} />
          ))}
          {percentage}%
        </div>
      </>
    );
  };

  const renderStatistics = () => {
    return Object.keys(statistics).map((rating) => (
      <div key={rating}>
        {/* {rating} Stars:{" "} */}
        <ProgressBar
          percentage={((statistics[rating] / reviews.length) * 100).toFixed(0)}
        />
      </div>
    ));
  };

  const getNoteFromPercentage = (percentage) => {
    if (percentage >= 95) return "5.0";
    else if (percentage >= 90) return "4.9";
    else if (percentage >= 85) return "4.8";
    else if (percentage >= 80) return "4.7";
    // Add more conditions as needed for other notes
    else return "N/A";
  };
  return (
    <div className="reviews">
      <div className="flex gap-4">
        <div className="flex flex-col items-center bg-[#f8f9fa] p-10 rounded-md">
          <span className="font-bold text-[#161c2d] text-6xl">4.5</span>
          <div className="flex gap-2 mb-2">
            {Array.from({ length: 5 }).map((index) => (
              <StarFilled key={index} style={{ color: "#FFD700", fontSize:"14px" }} />
            ))}
          </div>
          <div>Event Review</div>
        </div>
        <div className="statistics w-1/3 bg-[#f8f9fa] p-2 rounded-md">
          {renderStatistics()}
        </div>
      </div>

      <div>
        <div className="font-bold py-8 text-xl">Reviews</div>
        {renderReviews()}
      </div>
      {reviews.length > 3 && (
        <button
          onClick={() => alert("View All Reviews")}
          className="view-all-btn"
        >
          View All Reviews
        </button>
      )}
      <div className="font-bold py-8 text-xl">Write a Review</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <span className="mb-1">What is it like to Product?</span>
          <div  className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarFilled
                key={index}
                style={{
                  color: index < rating ? "#FFD700" : "#ccc",
                  cursor: "pointer",
                }}
                onClick={() => handleRatingChange(index + 1)}
              />
            ))}
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="reviewTitle">Review Title</label>
          <TextInput
            className="rounded-md text-gray-800"
            type="text"
            placeholder="Enter your text here"
            id="reviewTitle"
            value={reviewTitle}
            onChange={setReviewTitle}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="reviewContent">Review Content</label>
          <TextAreaInput
            className="rounded-md text-gray-800 "
            type="text"
            id="reviewContent"
            placeholder="Enter your text here"
            value={reviewContent}
            onChange={setReviewContent}
            required
          />
        </div>
        <FanousButton type="submit">Submit</FanousButton>
      </form>
    </div>
  );
};

export default Reviews;
