import React from "react";

export function useFetchData(url) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.vans))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);
  return data;
}
