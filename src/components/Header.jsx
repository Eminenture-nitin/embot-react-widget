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
      className="EMBOT-flex EMBOT-space-y-1.5 EMBOT-px-6 EMBOT-py-4 EMBOT-rounded-t-md"
    >
      <div className="EMBOT-w-24 EMBOT-w-h-auto EMBOT-object-cover">
        <img
          src="https://www.eminenture.tech/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FembotLogo.e7ce9467.png&w=128&q=75"
          className="EMBOT-w-full EMBOT-h-full"
        />
      </div>
    </div>
  );
};

export default Header;
