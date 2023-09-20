import { useOutletContext } from "react-router-dom";
import "./VanReviews.css";
import AddReview from "../../../components/AddReview";
import RenderVanReview from "../../../components/RenderVanReview";
import BackButton from "../../../components/BackButton";
export default function VanReviews() {
  const { data, vanId } = useOutletContext();

  return (
    <>
      <div className="review-page">
        <div className="review-form">
          <AddReview vanId={vanId} hostId={data.hostId} />
        </div>
        <div className="reviews">
          <RenderVanReview vanId={vanId} />
        </div>
      </div>
    </>
  );
}
