import React, { useEffect, useState } from "react";
import { getVanReviews } from "../api";
import { BsFillStarFill } from "react-icons/bs";
import ReviewsHtml from "./reviewsHtml";

export default function RenderVanReview({ vanId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const unsubscribe = getVanReviews(vanId, setReviews);
    return () => unsubscribe();
  }, [vanId]);

  return (
    <div className="host-reviews">
      <h3 className="reviews-title">
        Reviews <span className="reviews-count">({reviews.length})</span>
      </h3>
      <ReviewsHtml reviews={reviews} />
    </div>
  );
}
