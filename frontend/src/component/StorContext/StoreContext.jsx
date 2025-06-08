import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setTokenState] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setIsLoggedIn(true);
      setTokenState(savedToken);
    }
  }, []);

  const setToken = (newToken) => {
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
