import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
  const { data } = useOutletContext();

  return (
    <section className="host-van-detail-info">
      <h4>
        Name: <span>{data.name}</span>
      </h4>
      <h4>
        Category: <span>{data.type}</span>
      </h4>
      <h4>
        Description: <span>{data.description}</span>
      </h4>
      <h4>
        Visibility: <span>Public</span>
      </h4>
    </section>
  );
}
