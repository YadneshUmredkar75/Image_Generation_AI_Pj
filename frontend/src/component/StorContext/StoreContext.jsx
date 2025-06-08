import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext({
  showLogin: false,
  setShowLogin: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  token: null,
  setToken: () => {},
});

const StoreProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setTokenState] = useState(
    localStorage.getItem("token") || null
  );

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      console.log("StoreProvider: Found token in localStorage:", savedToken);
      setIsLoggedIn(true);
      // Optional: Validate token (e.g., decode JWT or API call)
      // Example: if (isTokenValid(savedToken)) { setIsLoggedIn(true); }
    } else {
      console.log("StoreProvider: No token found in localStorage");
    }
  }, []);

  const setToken = (newToken) => {
    console.log("StoreProvider: Setting token:", newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
    setTokenState(newToken);
  };

  return (
    <StoreContext.Provider
      value={{
        showLogin,
        setShowLogin,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
