import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAdminCredentials } from "./AdminCredentialsContext";

// Live Chat Socket context
const SocketContext = createContext();

// Custom hook to access the chat Socket
export function useSocket() {
  return useContext(SocketContext);
}

// SocketProvider component
export function SocketProvider({ children }) {
  const socket = useRef(null);
  const { adminId } = useAdminCredentials();

  useEffect(() => {
    if (adminId) {
      // Initialize socket connection with reconnection options
      socket.current = io(`${process.env.REACT_APP_API_URL}`, {
        reconnection: true, // Enable reconnection
        reconnectionAttempts: Infinity, // Maximum number of reconnection attempts
        reconnectionDelay: 1000, // Time delay in milliseconds between reconnection attempts
        reconnectionDelayMax: 5000, // Maximum time delay in milliseconds between reconnection attempts
        randomizationFactor: 0.5, // Randomization factor for reconnection delay
      });
      socket.current.on("connect", () => {
        // console.log("Socket connected", socket.current);
      });

      // Listen for reconnection attempts
      socket.current.on("reconnect_attempt", () => {
        // console.log("Reconnecting...");
      });

      // Listen for successful reconnection
      socket.current.on("reconnect", (attemptNumber) => {
        //console.log("Reconnected successfully on attempt", attemptNumber);
      });

      // Listen for reconnection errors
      socket.current.on("reconnect_error", (error) => {
        console.error("Reconnection error", error);
      });
    }

    // Clean up on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, [adminId]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
