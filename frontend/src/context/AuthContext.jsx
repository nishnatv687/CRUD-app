import React, { createContext, useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null)
  const [loading, setloading] = useState(null)
  const refreshStarted = useRef(false);


  const refreshAuth = async () => {
    try {
      console.log("Refreshing token...");

      const response = await axios.post(
        "/api/auth/refresh-token",
        {},
        {
          withCredentials: true,
        }
      );
      const newAccessToken = response.data.data.accessToken;

      setAccessToken(newAccessToken);
      const userResponse = await axios.get("/api/auth/getMe", {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });

      setUser(userResponse.data.data.user);
    } catch (error) {
      console.log("Refresh error:", error.response?.data);
    } finally {
      setloading(false);
    }
  };
  // Run refresh once when app starts
  useEffect(() => {
    if (refreshStarted.current) return;

    refreshStarted.current = true;

    refreshAuth();
  }, []);
  // Only for checking whether state updated
  useEffect(() => {
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken ,user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;