import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col space-y-1.5 pb-6 p-6 bg-gray-900" >
      <div className="w-20 h-auto object-cover">
        <img
          src={require("../images/embotLogo.webp")}
          className="w-full h-full"
        />
      </div>

      <p className="text-sm text-gray-200 leading-3">
        Ennovation driven Organization
      </p>
    </div>
  );
};

export default Header;
