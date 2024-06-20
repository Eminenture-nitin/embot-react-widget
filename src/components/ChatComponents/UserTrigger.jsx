import React from "react";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";

const UserTrigger = (props) => {
  const { theme } = useAdminCredentials();
  return (
    <div className="EMBOT-flex EMBOT-my-2 EMBOT-items-end EMBOT-just-end EMBOT-flex-col EMBOT-w-full EMBOT-leading-1.5">
      <p
        style={{
          backgroundImage: theme
            ? theme
            : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
          color: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,.12)",
        }}
        className="EMBOT-text-sm EMBOT-font-normal EMBOT-py-2.5 EMBOT-px-2 EMBOT-text-gray-900 EMBOT-rounded-s-xl EMBOT-rounded-ee-xl EMBOT-dark:text-white EMBOT-border-gray-200"
      >
        {props.userTrigger.userTrigger}
      </p>
    </div>
  );
};

export default UserTrigger;
