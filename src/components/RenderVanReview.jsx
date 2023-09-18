import React, { useEffect, useState } from "react";
import { getVanReviews } from "../api";
import { BsFillStarFill } from "react-icons/bs";

export default function RenderVanReview({ vanId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const unsubscribe = getVanReviews(vanId, setReviews);
    return () => unsubscribe();
  }, [vanId]);

  return (
    <>
      <h3 className="reviews-title">
        Reviews <span className="reviews-count">({reviews.length})</span>
      </h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <div className="reviews-list">
              {[...Array(Number(review.rating))].map((_, i) => (
                <BsFillStarFill className="review-star" key={i} />
              ))}
              <div className="info">
                <p className="name">{review.name}.</p>
                <p className="date">{review.date}</p>
              </div>
              <p>{review.review}</p>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <h2>Be the first one to review this van</h2>
      )}
    </>
  );
}
