import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { app } from "../firebase";
import { getHostReviews } from "../api";
import ReviewsHtml from "./reviewsHtml";

export default function RenderHostReview() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const unsubscribe = getHostReviews(setReviews);
    return () => unsubscribe();
  }, []);

  return (
    <div className="host-reviews">
      <div className="top-text">
        <h2>Your reviews</h2>
        <p>
          Last <span>30 days</span>
        </p>
      </div>

      <ReviewsHtml reviews={reviews} />
    </div>
  );
}
