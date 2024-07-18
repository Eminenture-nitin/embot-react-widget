import React from "react";
import { useAdminCredentials } from "../context/AdminCredentialsContext";

const Header = () => {
  const { theme } = useAdminCredentials();

  return (
    <div
      style={{
        backgroundImage: theme
          ? theme
          : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
        color: "white",
      }}
      className="flex space-y-1.5 px-6 py-4 rounded-t-md"
    >
      <div className="w-24 w-h-auto object-cover">
        <img src="/images/embotLogo.webp" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Header;
