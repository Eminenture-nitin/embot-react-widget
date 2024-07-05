import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { customDehash } from "../utils/validations";
import Cookies from "js-cookie";

const AdminCredentialsContext = createContext();

export function useAdminCredentials() {
  return useContext(AdminCredentialsContext);
}

export const AdminCredentialsProvided = ({ children }) => {
  const [theme, setTheme] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminId, setAdminId] = useState(null);

  // Function to check for admin ID in cookies

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/read-cookie`,
        {
          withCredentials: true, // Include cookies in the request
        }
      );

      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Ensure errors are propagated for proper debugging
    }
  };

  useEffect(() => {
    let intervalId;

    const handleAdminIdCheck = () => {
      const tempId = fetchData()
        .then((res) => {
          const tempId = res.data.EMChatBotAdminId;
          if (tempId) {
            const processedId = customDehash(tempId, "EMReact");
            setAdminId(processedId);
            clearInterval(intervalId); // Stop checking once admin ID is found
          }
        })
        .catch((err) => console.log(err));
    };

    // Start interval to check for admin ID
    intervalId = setInterval(handleAdminIdCheck, 1000);

    // Cleanup function to clear interval on unmount or when adminId is found
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this runs only once on mount
  const getAdminData = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/get-widegt-admin-data/${adminId}`
      )
      .then((res) => {
        setTheme(res.data.data.theme);
        setAdminEmail(res.data.data.email);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (adminId) {
      getAdminData();
    }
  }, [adminId]);

  return (
    <AdminCredentialsContext.Provider value={{ theme, adminId, adminEmail }}>
      {children}
    </AdminCredentialsContext.Provider>
  );
};
