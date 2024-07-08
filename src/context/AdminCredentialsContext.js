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

  useEffect(() => {
    var rootElement = document.getElementById("EMChatBotRoot");
    var adminId = rootElement.getAttribute("data-admin-id");
    const processedId = customDehash(adminId, "EMReact");
    setAdminId(processedId);
  }, []);
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
