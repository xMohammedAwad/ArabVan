import { useParams, Link, Outlet } from "react-router-dom";
import { getVan } from "../../api";
import Navigation from "../../components/Navigation";
import { useEffect, useState } from "react";

export default function HostVanDetail() {
  const [currentVan, setCurrentVan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const links = [
    { to: ".", end: true, children: "Details" },
    { to: "pricing", children: "Pricing" },
    { to: "photos", children: "Photos" },
  ];

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVan(id);
        setCurrentVan(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadVans();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      {currentVan && (
        <div className="host-van-detail-layout-container">
          <div className="host-van-detail">
            <img src={currentVan.imageUrl} />
            <div className="host-van-detail-info-text">
              <i className={`van-type van-type-${currentVan.type}`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4>${currentVan.price}/day</h4>
            </div>
          </div>

          <nav className="host-van-detail-nav">
            <Navigation links={links} />
          </nav>
          <Outlet context={{ currentVan }} />
        </div>
      )}
    </section>
  );
}
