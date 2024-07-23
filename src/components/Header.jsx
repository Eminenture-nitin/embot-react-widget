import React from "react";
import { useAdminCredentials } from "../context/AdminCredentialsContext";

const Header = () => {
  const { theme, adminImageURL, companyName } = useAdminCredentials();
  const defaultURL =
    "https://www.eminenture.tech/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FembotLogo.e7ce9467.png&w=128&q=75";
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
      <div className="flex items-center gap-3">
        <div
          className={
            adminImageURL?.length > 0 ? "w-[52px] h-[52px]" : "w-24 h-auto"
          }
        >
          <img
            src={adminImageURL?.length > 0 ? adminImageURL : defaultURL}
            className="w-full h-auto object-cover"
            alt="Admin"
          />
        </div>
        {adminImageURL?.length > 0 && companyName?.length > 0 && (
          <span className="text-lg font-semibold">{companyName}</span>
        )}
      </div>
    </div>
  );
};

export default Header;
