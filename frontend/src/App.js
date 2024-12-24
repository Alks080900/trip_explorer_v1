import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import TripDetails from "./pages/TripDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTrip from "./pages/AddTrip";
import EditTrip from "./pages/EditTrip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useState, useEffect} from "react";
import PrivateRoute from "./components/PrivateRoute";
import "./components/Header.css";
import AddGallery from "./pages/AddGallery";
import useSession from "./components/useSession"; // Import the custom hook


function App() {
    // Manage login state in App component
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useSession(isLoggedIn, setIsLoggedIn); // Use the custom hook

    const [username, setUsername] = useState(localStorage.getItem("username"));

    // Check if the user is logged in when the app loads
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        const savedUsername = localStorage.getItem("username");
        if (token && savedUsername) {
            setIsLoggedIn(true);
            setUsername(savedUsername);
        }
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername("");
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/trip/:tripId" element={<TripDetails isLoggedIn={isLoggedIn} />}/>
                <Route path="/edit-trip/:tripId" element={<PrivateRoute isLoggedIn={isLoggedIn}>
                    <EditTrip/>
                </PrivateRoute>}/>

                {/* Public Routes */}
                <Route
                    path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}/>}
                />
                <Route path="/register" element={<Register/>}/>

                {/* Protected Routes */}
                <Route
                    path="/add-trip"
                    element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <AddTrip/>
                        </PrivateRoute>
                    }
                />

                <Route path="/add-gallery/:tripId" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <AddGallery/>
                    </PrivateRoute>
                }/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
