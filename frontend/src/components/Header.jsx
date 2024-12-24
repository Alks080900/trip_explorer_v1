import React from "react";
import {Link} from "react-router-dom";
import {Box, Typography} from "@mui/material";

const Header = ({isLoggedIn, username}) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(); // Refresh to reflect changes
    };

    return (
        <Box
            component="header"
            sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2
            }}
        >
            <div className="header-content">
                <Typography variant="h6">Trip Explorer</Typography>
                <div className="menu">
                    <Link to="/">Home</Link>
                    {isLoggedIn ? (
                        <>
                            <Link>Welcome, {username}!</Link>
                            <Link to="/add-trip">Add Trip</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </Box>
    );
};

export default Header;
