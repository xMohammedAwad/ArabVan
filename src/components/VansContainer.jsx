import { useSearchParams } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import FetchVans from "./FetchVans";

export default function VansContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  return (
    <>
      <FilterButtons
        setSearchParams={setSearchParams}
        typeFilter={typeFilter}
      />
      <div className="van-list">
        <FetchVans typeFilter={typeFilter} searchParams={searchParams} />
      </div>
    </>
  );
}
