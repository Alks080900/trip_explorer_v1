import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "../components/Card";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrips = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/trips");
      const trips = await response.json();
      setTrips(trips.data);
      setIsLoading(false);
    };

    getTrips();
  }, []);

  const handleCardClick = (tripId) => {
    navigate(`/trip/${tripId}`);
  };

  if (isLoading) <div>Loading trips...</div>;

  return (
    <Box display="flex" flexWrap="wrap" gap={3} m={3} className="container">
      {trips.map((trip) => (
        <Box
          key={trip.id}
          flexBasis="calc(33.333% - 16px)"
          onClick={() => handleCardClick(trip.id)}>
          <Card country={trip?.country} gallery={trip?.gallery} />
        </Box>
      ))}
    </Box>
  );
};

export default Home;
