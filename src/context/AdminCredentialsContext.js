import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { customDehash } from "../utils/validations";

const AdminCredentialsContext = createContext();

export function useAdminCredentials() {
  return useContext(AdminCredentialsContext);
}

export const AdminCredentialsProvided = ({ children }) => {
  const [theme, setTheme] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminId, setAdminId] = useState(null);

  const getAdminData = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/get-widegt-admin-data/${adminId}`
      )
      .then((res) => {
        setTheme(res.data.data.theme);
        setAdminEmail(res.data.data.email);
        // console.log(res);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    // Function to check for EMChatBotAdminId
    const checkForAdminId = () => {
      if (window.EMChatBotData && window.EMChatBotData.EMChatBotAdminId) {
        const dehashId = customDehash(
          window.EMChatBotData.EMChatBotAdminId,
          "EMReact"
        );
        setAdminId(dehashId);
        return true;
      }
      return false;
    };

    // Initial check
    if (!checkForAdminId()) {
      // Polling mechanism
      const intervalId = setInterval(() => {
        if (checkForAdminId()) {
          clearInterval(intervalId); // Stop checking once the value is found
        }
      }, 1000); // Check every second

      // Optional: Set a timeout to stop checking after a certain period
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId); // Stop checking after timeout
      }, 10000); // Stop checking after 10 seconds

      // Cleanup on component unmount
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, []);
  useEffect(() => {
    getAdminData();
  }, []);
  return (
    <AdminCredentialsContext.Provider value={{ theme, adminId, adminEmail }}>
      {children}
    </AdminCredentialsContext.Provider>
  );
};
