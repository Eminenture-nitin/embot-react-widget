import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { customDehash } from "../utils/validations";

const AdminCredentialsContext = createContext();

export function useAdminCredentials() {
  return useContext(AdminCredentialsContext);
}

export const AdminCredentialsProvided = ({ children }) => {
  const [theme, setTheme] = useState(
    "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)"
  );
  const [adminEmail, setAdminEmail] = useState("");
  const [adminId, setAdminId] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [adminImageURL, setAdminImageURL] = useState("");

  useEffect(() => {
    var rootElement = document.getElementById("EMChatBotRoot");
    var adminId = rootElement.getAttribute("data-admin-id");
    const processedId = customDehash(adminId, "EMReact");

    const adminIdDefualtEminenture = "650d432aa0570859518c23a1";
    const adminIdDefualtEmTech = "668d138c1913cfd07ed4ba41";
    const adminIdTest = "66bf4ee45b2c3f693aba77b8";
    setAdminId(adminIdDefualtEminenture);
  }, []);
  const getAdminData = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/get-widegt-admin-data/${adminId}`
      )
      .then((res) => {
        setCompanyName(res.data.data.companyName);
        setTheme(res.data.data.theme);
        setAdminEmail(res.data.data.email);
        setAdminImageURL(res.data.data.userImage);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (adminId) {
      getAdminData();
    }
  }, [adminId]);

  return (
    <AdminCredentialsContext.Provider
      value={{ theme, adminId, adminEmail, adminImageURL, companyName }}
    >
      {children}
    </AdminCredentialsContext.Provider>
  );
};
