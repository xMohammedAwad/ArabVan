import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import VanElement from "../components/VanElement";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  const { data: vans, loading, error } = useFetchData("api/vans");
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => (
    <VanElement
      key={van.id}
      searchParams={searchParams}
      typeFilter={typeFilter}
      van={van}
    />
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>there is an Error: <br/> {error.message}</h2>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }


  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
