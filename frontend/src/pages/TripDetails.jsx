import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./TripDetails.css";
import defaultImage from "../images/default.png";

const TripDetails = ({ isLoggedIn }) => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrip = async () => {
      console.log("tripId", tripId);
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/trips/${tripId}`);
        const trip = await response.json();
        setTrip(trip.data);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrip();
  }, [tripId]);

  const imageUrl = trip?.gallery?.length > 0 && trip.gallery[0].url ? trip.gallery[0].url : defaultImage;

  const handleDeleteTrip = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        const response = await fetch(`http://localhost:4000/trips/${tripId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Trip deleted successfully.");
          navigate("/");
        } else {
          const data = await response.json();
          console.error("Error deleting trip:", data.message);
          alert("Failed to delete trip: " + data.message);
        }
      } catch (error) {
        console.error("Error deleting trip:", error);
        alert("An error occurred while deleting the trip.");
      }
    }
  };

  if (isLoading) return <div>Loading trip details...</div>;
  if (!trip) return <div>No trip details found</div>;

  return (
      <div className="container">
        <div className="content">
          <div>
            <img
                src={imageUrl}
                alt={trip?.country || "No Country"}
                width="600"
                height="400"
            />
          </div>

          <div>
            <h1>{trip?.country}</h1>
            <p>
              <span>Airport:</span> {trip?.airport}
            </p>
            <p>
              <span>Hotel:</span> {trip?.hotel}
            </p>

            {/* Show the Edit Trip button only if the user is logged in */}
            {isLoggedIn && (
                <>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/edit-trip/${tripId}`}
                        sx={{ mt: 2 }}
                    >
                      Edit Trip
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/add-gallery/${tripId}`}
                        sx={{ mt: 2 }}
                    >
                      Add Gallery
                    </Button>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteTrip}
                        sx={{ mt: 2 }}
                    >
                      Delete Trip
                    </Button>
                  </div>
                </>
            )}
          </div>
        </div>

        <div className="gallery">
          {trip?.gallery?.length > 0 ? (
              trip.gallery.map((galleryItem, index) => (
                  <img
                      key={index}
                      src={galleryItem?.url || defaultImage}
                      alt={`Gallery Image ${index + 1}`}
                      width={300}
                      height={200}
                  />
              ))
          ) : (
              <p>No gallery images available.</p>
          )}
        </div>
      </div>
  );
};

export default TripDetails;
