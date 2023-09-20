import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { data } = useOutletContext();
  console.log(data)
  return (
    <h3 className="host-van-price">
      ${data.price}
      <span>/day</span>
    </h3>
  );
}
