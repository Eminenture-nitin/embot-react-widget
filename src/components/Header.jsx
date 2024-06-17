import React from "react";

const Header = () => {
  return (
    <div className="flex space-y-1.5 px-6 py-4 bg-gray-900">
      <div className="w-24 w-h-auto object-cover">
        <img src="/images/embotLogo.webp" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Header;
