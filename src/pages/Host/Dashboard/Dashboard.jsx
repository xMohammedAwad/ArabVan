import "./Dashboard.css";
import React from "react";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { FetchHostVans } from "../../../components";

export default function Dashboard() {
  return (
    <>
      <div className="dash-container">
        <section className="host-dashboard-earnings">
          <div className="info">
            <h1>Welcome!</h1>
            <p>
              Income last <span>30 days</span>
            </p>
            <h2>$2,260</h2>
          </div>
          <Link to="vans">Details</Link>
        </section>
        <section className="host-dashboard-reviews">
          <h2>Review score</h2>
          <div className="star-container">
            <BsStarFill className="star" />

            <p>
              <span>5.0</span>/5
            </p>
          </div>

          <Link to="reviews">Details</Link>
        </section>
      </div>

      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link className="top-link-button" to="vans">
            View all
          </Link>
        </div>
        <FetchHostVans />
      </section>
    </>
  );
}
