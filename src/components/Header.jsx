import React from "react";
import { useAdminCredentials } from "../context/AdminCredentialsContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";

const Header = () => {
  const { theme, adminImageURL, companyName } = useAdminCredentials();
  const { showWidget, setShowWidget } = useGlobalStatesContext();
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
      className="flex justify-between align-middle space-y-1.5 px-6 py-4 rounded-t-md"
    >
      <div className="flex items-center gap-3">
        <div
          className={
            adminImageURL?.length > 0 ? "w-[52px] h-[52px]" : "w-24 h-auto"
          }
        >
          <img
            style={{ borderRadius: "50%" }}
            src={adminImageURL?.length > 0 ? adminImageURL : defaultURL}
            className="w-full h-auto object-cover"
            alt="Admin"
          />
        </div>
        {adminImageURL?.length > 0 && companyName?.length > 0 && (
          <span className="text-lg font-semibold">{companyName}</span>
        )}
      </div>
      <div
        className="grid place-items-center"
        title="minimize"
        onClick={() => setShowWidget(false)}
      >
        <svg
          className="text-white w-7 h-7 relative transition-all duration-300 transform hover:scale-110 hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:bg-black hover:before:opacity-30 hover:before:rounded-full hover:before:-z-10 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M36 18L24 30L12 18"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Header;
