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
const checkForAdminId = () => {
const id = Cookies.get("EMChatBotAdminId");
return id || false; // Return the id or false if not found
};

useEffect(() => {
let intervalId;

    const handleAdminIdCheck = () => {
      const tempId = checkForAdminId();
      console.log(tempId, "tempId");
      if (tempId) {
        const processedId = customDehash(tempId, "EMReact");
        setAdminId(processedId);
        clearInterval(intervalId); // Stop checking once admin ID is found
      }
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

    // Cleanup function on adminId change (optional)
    return () => {
      // Optional cleanup if needed
    };

}, [adminId]);

return (
<AdminCredentialsContext.Provider value={{ theme, adminId, adminEmail }}>
{children}
</AdminCredentialsContext.Provider>
);
};

// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const AdminCredentialsContext = createContext();

// export function useAdminCredentials() {
// return useContext(AdminCredentialsContext);
// }

// export const AdminCredentialsProvided = ({ children }) => {
// const [theme, setTheme] = useState("");
// const [adminEmail, setAdminEmail] = useState("");
// const adminId = "650d432aa0570859518c23a1";
// const getAdminData = () => {
// axios
// .get(
// `${process.env.REACT_APP_API_URL}/auth/get-widegt-admin-data/${adminId}`
// )
// .then((res) => {
// setTheme(res.data.data.theme);
// setAdminEmail(res.data.data.email);
// // console.log(res);
// })
// .catch((e) => console.log(e));
// };
// useEffect(() => {
// getAdminData();
// }, []);
// return (
// <AdminCredentialsContext.Provider value={{ theme, adminId, adminEmail }}>
// {children}
// </AdminCredentialsContext.Provider>
// );
// };
