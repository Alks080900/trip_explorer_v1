import React, { useState } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: usernameInput, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful");
        setIsSuccess(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem('loginTime', Date.now());
        localStorage.setItem("username", usernameInput);
        setIsLoggedIn(true);
        setUsername(usernameInput); // Update the parent state with the logged-in username
        navigate("/");
      } else {
        setMessage(data.message || "Login failed");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred during login");
      setIsSuccess(false);
    }
  };

  return (
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh"
          }}

          className="container"
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Box sx={{ mb: 2 }}>
              <TextField
                  label="Username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  fullWidth
                  required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
              />
            </Box>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </form>
          {message && (
              <Typography
                  sx={{ mt: 2 }}
                  color={isSuccess ? "success.main" : "error.main"}
              >
                {message}
              </Typography>
          )}
        </Paper>
      </Box>
  );
};

export default Login;
