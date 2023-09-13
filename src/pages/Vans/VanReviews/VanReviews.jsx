import { useOutletContext } from "react-router-dom";
import "./VanReviews.css";
import AddReview from "../../../components/AddReview";
export default function VanReviews() {
  const { data } = useOutletContext();

  return (
    <div className="">
      <AddReview />
    </div>
  );
}
