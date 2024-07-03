import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";
import SliderTriggerComponent from "./SliderTriggerComponent";
import { isImageFileName } from "../../utils/validations";

const Response = ({ response, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleUserDecision, findSubtriggerConnectedNode } =
    useTriggersContextData();
  const { theme } = useAdminCredentials();

  const renderContent = () => {
    if (response.responseText) {
      return (
        <div className="EMBOT-mb-1 EMBOT-flex EMBOT-w-full EMBOT-gap-2">
          <div className="">
            <button
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                background: response?.assiMsgData?.assistantImage
                  ? `url(https://res.cloudinary.com/ddi0whlck/image/upload/v1719482498/jcyokrr3fnu3xq69qig6.jpg)`
                  : theme
                  ? theme
                  : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
              }}
              className="EMBOT-mainForImageProperty EMBOT-inline-flex EMBOT-items-center EMBOT-justify-center EMBOT-bg-center EMBOT-bg-cover EMBOT-bg-no-repeat EMBOT-text-sm EMBOT-font-medium EMBOT-disabled:pointer-events-none EMBOT-disabled:opacity-50 EMBOT-border EMBOT-rounded-full EMBOT-w-10 EMBOT-h-10 EMBOT-bg-black EMBOT-hover:bg-gray-700 EMBOT-m-0 EMBOT-cursor-pointer EMBOT-border-gray-200 EMBOT-bg-none EMBOT-p-0 EMBOT-normal-case EMBOT-leading-5 EMBOT-hover:text-gray-900"
            >
              {!response?.assiMsgData?.assistantImage && (
                <svg
                  className="EMBOT-w-7 EMBOT-h-7 EMBOT-text-white EMBOT-block EMBOT-border-gray-200 EMBOT-align-middle"
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
          <div className="EMBOT-mb-1 EMBOT-w-full">
            <p
              style={{ backgroundColor: "rgb(240, 242, 247)" }}
              className="EMBOT-text-sm EMBOT-font-normal EMBOT-py-2.5 EMBOT-px-2 EMBOT-text-gray-900 EMBOT-dark:text-white EMBOT-border-gray-200 EMBOT-rounded-e-xl EMBOT-rounded-es-xl"
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
                  className="EMBOT-border EMBOT-text-[#006ae1] hover:EMBOT-bg-[#006ae1] hover:EMBOT-text-white EMBOT-w-full EMBOT-mt-2 EMBOT-border-[#006ae1] EMBOT-outline-none EMBOT-px-3 EMBOT-group EMBOT-py-2 EMBOT-rounded-md EMBOT-cursor-pointer EMBOT-leading-5 EMBOT-text-sm"
                >
                  {item.value}
                </button>
              ) : (
                <button
                  key={index}
                  title={item.url}
                  onClick={() => window.open(item.url, "_blank")}
                  style={{ boxShadow: "0 2px 6px rgba(0,0,0,.12)" }}
                  className="EMBOT-border EMBOT-w-full EMBOT-mt-2 EMBOT-border-[#006ae1] EMBOT-outline-none EMBOT-px-3 EMBOT-group EMBOT-py-2 EMBOT-rounded-md EMBOT-cursor-pointer EMBOT-leading-5 EMBOT-text-sm"
                >
                  <span className="EMBOT-text-[#006ae1] EMBOT-bg-[#ffffff] EMBOT-border-[#006ae1] group-hover:EMBOT-underline">
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
            className="EMBOT-w-[80%] EMBOT-grid EMBOT-justify-end EMBOT-h-auto EMBOT-border-gray-200 EMBOT-rounded-e-xl EMBOT-rounded-es-xl"
            src={response.imageURL}
            alt={response.imageId}
          />
        );
      } else {
        return (
          <iframe
            src={response.imageURL}
            className="EMBOT-w-[80%] EMBOT-h-auto"
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
          className="EMBOT-border EMBOT-w-[80%] EMBOT-items-end EMBOT-mb-2  EMBOT-border-[#006ae1] EMBOT-outline-none EMBOT-px-3 EMBOT-group EMBOT-py-2 EMBOT-rounded-md EMBOT-cursor-pointer EMBOT-leading-5 EMBOT-text-sm"
        >
          <span className="EMBOT-text-[#006ae1] EMBOT-bg-[#ffffff] EMBOT-border-[#006ae1] group-hover:EMBOT-underline">
            {response.label}
          </span>
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="EMBOT-flex EMBOT-items-start EMBOT-gap-2.5 EMBOT-mb-1">
      <div className="EMBOT-flex EMBOT-flex-col EMBOT-items-end EMBOT-w-full EMBOT-max-w-[70%] EMBOT-leading-1.5  EMBOT-dark:bg-gray-700">
        {isLoading ? "loading..." : renderContent()}
      </div>

      {response.imageURL && (
        <button
          id="EMBOT-dropdownMenuIconButton"
          data-dropdown-toggle="EMBOT-dropdownDots"
          data-dropdown-placement="EMBOT-bottom-start"
          className="EMBOT-inline-flex EMBOT-self-center EMBOT-items-center EMBOT-p-2 EMBOT-text-sm EMBOT-font-medium EMBOT-text-center EMBOT-text-gray-900 EMBOT-bg-white EMBOT-rounded-lg hover:EMBOT-bg-gray-100 EMBOT-focus:ring-4 EMBOT-focus:outline-none EMBOT-dark:text-white EMBOT-focus:ring-gray-50 EMBOT-dark:bg-gray-900 EMBOT-dark:hover:bg-gray-800 EMBOT-dark:focus:ring-gray-600"
          type="button"
          onClick={() => {
            window.open(response.imageURL, "_blank", "noopener noreferrer");
          }}
        >
          <Icon
            icon="tabler:external-link"
            className="EMBOT-w-5 EMBOT-h-5 EMBOT-text-gray-500 EMBOT-dark:text-gray-400"
          />
        </button>
      )}
    </div>
  );
};

export default Response;
