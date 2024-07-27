import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";
import { isImageFileName } from "../../utils/validations";

const Response = ({ response, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleUserDecision, findSubtriggerConnectedNode } =
    useTriggersContextData();
  const { theme, adminImageURL } = useAdminCredentials();

  const renderContent = () => {
    if (response.responseText) {
      // console.log(
      //   response?.assiMsgData?.assistantImage,
      //   "response?.assiMsgData?.assistantImage"
      // );
      return (
        <div className="mb-1 flex w-full gap-2">
          <div className="">
            <button
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                background: response?.assiMsgData?.assistantImage
                  ? `url(${response?.assiMsgData?.assistantImage})`
                  : adminImageURL?.length > 0
                  ? `url(${adminImageURL})`
                  : theme
                  ? theme
                  : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="mainForImageProperty inline-flex items-center justify-center bg-center bg-cover bg-no-repeat text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-10 h-10 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
            >
              {!response?.assiMsgData?.assistantImage &&
                !adminImageURL?.length > 0 && (
                  <svg
                    className="w-7 h-7 text-white block border-gray-200 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="512"
                    height="512"
                    x="0"
                    y="0"
                    viewBox="0 0 512 512"
                  >
                    <g transform="matrix(1,0,0,1,0,0)">
                      <path
                        d="M467 151.06h-31.421C408.855 87.606 350.01 41.493 282.265 32.686c-67.134-8.95-133.096 16.89-176.25 68.906-12.686 15.293-22.749 31.919-30.117 49.468H45c-24.814 0-45 20.186-45 45v60c0 24.814 20.186 45 45 45h61.601l-6.445-19.673c-18.765-57.305-8.203-115.855 28.96-160.635 36.519-44.019 92.285-65.801 149.253-58.33 60.247 7.848 112.542 50.455 133.262 108.574l.126.337a129.933 129.933 0 0 1 7.031 27.393c4.497 28.052 1.934 56.484-7.397 82.222l-.066.179C388.164 346.886 325.87 391.06 256.293 391.06c-24.976 0-45.293 20.186-45.293 45s20.186 45 45 45 45-20.186 45-45v-20.23c59.894-14.236 110.202-56.693 134.383-114.771H467c24.814 0 45-20.186 45-45v-60c0-24.814-20.186-44.999-45-44.999z"
                        fill="#ffffff"
                        opacity="1"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M121 331.06v30h135c74.443 0 135-60.557 135-135s-60.557-135-135-135-135 60.557-135 135a134.921 134.921 0 0 0 28.828 83.394C146.21 322.095 134.667 331.06 121 331.06zm180-120h30v30h-30zm-60 0h30v30h-30zm-60 0h30v30h-30z"
                        fill="#ffffff"
                        opacity="1"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                )}
            </button>
          </div>
          <div className="mb-1 w-full">
            <p
              style={{ backgroundColor: "rgb(240, 242, 247)" }}
              className="text-[15px] font-normal py-2.5 px-2 text-gray-900 border-gray-200 rounded-md"
            >
              {response.responseText}
            </p>

            {response?.subTriggers?.map((item, index) =>
              item.type == "action" ? (
                <button
                  key={index}
                  onClick={() => {
                    const targetNodeId = findSubtriggerConnectedNode(
                      response.nodeId,
                      item.value
                    );
                    handleUserDecision(targetNodeId, item.value);
                  }}
                  style={{ boxShadow: "0 2px 6px rgba(0,0,0,.12)" }}
                  className="border text-[#006ae1] hover:bg-[#006ae1] hover:text-white w-full mt-2 border-[#006ae1] outline-none px-3 group py-2 rounded-md cursor-pointer leading-5 text-sm"
                >
                  {item.value}
                </button>
              ) : (
                <button
                  key={index}
                  title={item.url}
                  onClick={() => window.open(item.url, "_blank")}
                  style={{ boxShadow: "0 2px 6px rgba(0,0,0,.12)" }}
                  className="border w-full mt-2 border-[#006ae1] outline-none px-3 group py-2 rounded-md cursor-pointer leading-5 text-sm"
                >
                  <span className="text-[#006ae1] bg-[#ffffff] border-[#006ae1] group-hover:underline">
                    {item.label}
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      );
    } else if (response.imageURL) {
      if (isImageFileName(response.imageURL)) {
        return (
          <img
            className="w-[80%] grid mb-1 justify-end h-auto border-gray-200 rounded-md"
            src={response.imageURL}
            alt={response.imageId}
          />
        );
      } else {
        return (
          <iframe
            src={response.imageURL}
            className="w-[80%] h-auto"
            width="125px"
            height="125px"
            style={{ overflow: "hidden" }}
          ></iframe>
        );
      }
    } else if (response.label && response.url) {
      return (
        <button
          title={response.url}
          onClick={() => window.open(response.url, "_blank")}
          style={{ boxShadow: "0 2px 6px rgba(0,0,0,.12)" }}
          className="border w-[80%] items-end mb-2  border-[#006ae1] outline-none px-3 group py-2 rounded-md cursor-pointer leading-5 text-sm"
        >
          <span className="text-[#006ae1] bg-[#ffffff] border-[#006ae1] group-hover:underline">
            {response.label}
          </span>
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex items-start gap-2.5 mb-1">
      <div className="flex flex-col items-end w-full max-w-[85%] leading-1.5">
        {isLoading ? "loading..." : renderContent()}
      </div>

      {response.imageURL && (
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          data-dropdown-placement="bottom-start"
          className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
          type="button"
          onClick={() => {
            window.open(response.imageURL, "_blank", "noopener noreferrer");
          }}
        >
          <Icon icon="tabler:external-link" className="w-5 h-5 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default Response;
