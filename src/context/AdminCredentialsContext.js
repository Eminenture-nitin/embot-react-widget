import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AdminCredentialsContext = createContext();

export function useAdminCredentials() {
  return useContext(AdminCredentialsContext);
}

export const AdminCredentialsProvided = ({ children }) => {
  const [theme, setTheme] = useState("");

  const getAdminData = () => {
    const adminId = "650d432aa0570859518c23a1";
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/get-widegt-admin-data/${adminId}`
      )
      .then((res) => setTheme(res.data.data.theme))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getAdminData();
  }, []);
  return (
    <AdminCredentialsContext.Provider value={{ theme }}>
      {children}
    </AdminCredentialsContext.Provider>
  );
};
