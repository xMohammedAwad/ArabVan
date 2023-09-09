import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const { data } = useOutletContext();
  return <img src={data.imageUrl} className="host-van-detail-image" />;
}
