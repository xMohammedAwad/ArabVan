export default function FilterButtons({ typeFilter, setSearchParams }) {
  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const types = ["simple", "luxury", "rugged", null];

  return (
    <div className="van-list-filter-buttons">
      {types.map((type, i) => (
        <button
          key={i}
          onClick={() => handleFilterChange("type", type)}
          className={` van-type ${type} ${
            typeFilter === type ? "selected" : ""
          } ${type == null ? "clear-filters" : ""}`}
        >
          {typeFilter && type == null ? "Clear filter" : type}
        </button>
      ))}
    </div>
  );
}
