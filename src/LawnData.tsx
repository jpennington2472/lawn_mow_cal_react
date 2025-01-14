import { useState, useEffect } from "react";
import { Lawn } from "./types";

const LawnData = () => {
  const [lawnData, setLawnData] = useState<Lawn[]>([]);
  console.log(import.meta.env.VITE_REACT_APP_BASE_URL);
// TODO: Avoid using useEffect where possible. Remove the no-cors policy. Fix .env variable not working.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/lawn_data`, {
          mode: "no-cors",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLawnData(data);
      } catch (error) {
        console.error("There was an error fetching the lawn data!", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Lawn Data</h1>
      <ul>
        {lawnData.map((lawn, index) => (
          <li key={index}>
            Size: {lawn.lawn_size}, Terrain: {lawn.terrain}, Grass Height:{" "}
            {lawn.grass_height}, Location: {lawn.location}, Cost:{" "}
            {lawn.mowing_cost}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LawnData;
