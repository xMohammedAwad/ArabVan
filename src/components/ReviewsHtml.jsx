import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ReviewsHtml({ reviews }) {
  return (
    <>
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
        <h3>
          There's no reviews yet.
          <br /> try to add one or you can see some reviews in
          <Link className="review-link" to={"/vans/2/reviews"}>
            this van
          </Link>
        </h3>
      )}
    </>
  );
}
