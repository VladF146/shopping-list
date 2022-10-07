import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let response = await fetch(url);
    response = await response.json();
    setData(response.data);
  }

  return [data, fetchData];
}
