import { useState, useEffect } from "react";
import type { Response } from "./types";

const domain = "http://localhost:3000";

const useData = () => {
  const [data, setData] = useState<Response>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect is used to trigger the fetchData function when the component mounts.
  // The empty dependency array ([]) ensures that fetchData is only called once,
  // preventing multiple fetches and unnecessary re-renders.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate delay with setTimeout
        setTimeout(async () => {
          const response = await fetch(`${domain}/data.json`);
          const jsonData = await response.json();
          setData(jsonData);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};

export default useData;
