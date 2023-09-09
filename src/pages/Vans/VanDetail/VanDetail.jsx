import BackButton from "../../../components/BackButton";
import { FetchVan } from "../../../components/index";
import "./VanDetail.css";
export default function VanDetail() {
  return (
    <div className="van-detail-container">
      <BackButton />
      <FetchVan />
    </div>
  );
}
