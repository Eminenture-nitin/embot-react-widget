import React from "react";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";

const UserTrigger = (props) => {
  const { theme } = useAdminCredentials();

  return (
    <div className="flex my-2 items-end just-end flex-col w-full leading-1.5">
      {props.userTrigger.userTrigger && (
        <p
          style={{
            backgroundImage: theme
              ? theme
              : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
            color: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,.12)",
          }}
          className="text-sm font-normal py-2.5 px-2 text-gray-900 rounded-s-xl rounded-ee-xl dark:text-white border-gray-200"
        >
          {props.userTrigger.userTrigger}
        </p>
      )}
      {props?.userTrigger?.assiUnavailableFromData && (
        <div className="flex flex-col items-start border rounded-s-xl rounded-ee-xl w-[75%] p-2">
          <h3 className="font-semibold mb-2">
            Assistant Unavailable – Contact Details
          </h3>
          <hr className="w-full border-t border-gray-300 mb-2" />
          <h3 className="font-semibold mb-2">
            {props?.userTrigger?.assiUnavailableFromData?.email}
          </h3>
          <hr className="w-full border-t border-gray-300 mb-2" />
          <h3 className="font-semibold mb-2">
            {props?.userTrigger?.assiUnavailableFromData?.phone}
          </h3>
          <hr className="w-full border-t border-gray-300 mb-2" />
          <p>{props?.userTrigger?.assiUnavailableFromData?.message}</p>
        </div>
      )}
      {props?.userTrigger?.customFormsData && (
        <div className="flex flex-col items-start border rounded-s-xl rounded-ee-xl w-[75%] p-2">
          {Object.entries(props?.userTrigger?.customFormsData).map(
            ([key, value]) => (
              <div key={key} className="w-full">
                {key !== "Long Text" ? (
                  <>
                    <h3 className="font-semibold mb-2">{value}</h3>
                    <hr className="w-full border-t border-gray-300 mb-2" />
                  </>
                ) : (
                  <>
                    <p>{value}</p>
                  </>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UserTrigger;
