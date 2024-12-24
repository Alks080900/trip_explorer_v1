import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Paper
} from "@mui/material";

const countries = [
  "Austria",
  "Belgium",
  "Czech Republic",
  "Denmark",
  "Luxembourg",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom"
];

const AddTrip = () => {
  const [country, setCountry] = useState("");
  const [airport, setAirport] = useState("");
  const [hotel, setHotel] = useState("");
  const [message, setMessage] = useState("");

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
  };

  const handleAddTrip = async (e) => {
    e.preventDefault();

    const tripData = {
      country,
      airport,
      hotel
    };

    const response = await fetch("http://localhost:4000/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripData)
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Trip added successfully");
      setCountry("");
      setAirport("");
      setHotel("");
    } else {
      setMessage(data.message || "Failed to add trip");
    }
  };

  return (
    <div className="container">
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
          <Typography variant="h5" gutterBottom>
            Add New Trip
          </Typography>
          <form onSubmit={handleAddTrip}>
            <Box sx={{ mb: 2 }}>
              <Select
                value={country}
                onChange={handleCountryChange}
                displayEmpty
                fullWidth
                required>
                <MenuItem value="">Select a country</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Airport"
                value={airport}
                onChange={(e) => setAirport(e.target.value)}
                fullWidth
                required
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Hotel"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                fullWidth
                required
              />
            </Box>

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Trip
            </Button>
          </form>
          {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
        </Paper>
      </Box>
    </div>
  );
};

export default AddTrip;
