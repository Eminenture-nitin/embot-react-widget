import React from "react";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";

const UserTrigger = (props) => {
  const { theme } = useAdminCredentials();
  return (
    <div className="EMBOT-flex EMBOT-my-2 EMBOT-items-end EMBOT-just-end EMBOT-flex-col EMBOT-w-full EMBOT-leading-1.5">
      {props.userTrigger.userTrigger && (
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
      )}
      {props.userTrigger.assiUnavailableFromData && (
        <div className="EMBOT-flex EMBOT-flex-col EMBOT-items-start EMBOT-border EMBOT-rounded-s-xl EMBOT-rounded-ee-xl EMBOT-w-[75%] EMBOT-p-2">
          <h3 className="EMBOT-font-semibold EMBOT-mb-2">
            Assistant Unavailable – Contact Details
          </h3>
          <hr className="EMBOT-w-full EMBOT-border-t EMBOT-border-gray-300 EMBOT-mb-2" />
          <h3 className="EMBOT-font-semibold EMBOT-mb-2">
            {props?.userTrigger?.assiUnavailableFromData?.email}
          </h3>
          <hr className="EMBOT-w-full EMBOT-border-t EMBOT-border-gray-300 EMBOT-mb-2" />
          <h3 className="EMBOT-font-semibold EMBOT-mb-2">
            {props?.userTrigger?.assiUnavailableFromData?.phone}
          </h3>
          <hr className="EMBOT-w-full EMBOT-border-t EMBOT-border-gray-300 EMBOT-mb-2" />
          <p>{props?.userTrigger?.assiUnavailableFromData?.message}</p>
        </div>
      )}
    </div>
  );
};

export default UserTrigger;
