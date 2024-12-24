// useSession.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSession = (isLoggedIn, setIsLoggedIn) => {
    const navigate = useNavigate();
    const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes

    useEffect(() => {
        const checkSession = () => {
            const loginTime = localStorage.getItem("loginTime");
            if (loginTime) {
                const currentTime = Date.now();
                const elapsedTime = currentTime - loginTime;

                // Auto-logout if elapsed time exceeds the limit
                if (elapsedTime > AUTO_LOGOUT_TIME) {
                    setIsLoggedIn(false);
                    localStorage.removeItem("token");
                    localStorage.removeItem("loginTime");
                    navigate("/login");
                } else {
                    // Refresh login time on activity
                    localStorage.setItem("loginTime", Date.now());
                }
            }
        };

        // Check session periodically
        const interval = setInterval(checkSession, 1000); // Check every second

        // Reset login time on user interaction
        const resetTimer = () => {
            if (isLoggedIn) {
                localStorage.setItem("loginTime", Date.now());
            }
        };

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("click", resetTimer);
        window.addEventListener("scroll", resetTimer);

        return () => {
            clearInterval(interval); // Cleanup on unmount
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("click", resetTimer);
            window.removeEventListener("scroll", resetTimer);
        };
    }, [isLoggedIn, navigate, setIsLoggedIn]);
};

export default useSession;
