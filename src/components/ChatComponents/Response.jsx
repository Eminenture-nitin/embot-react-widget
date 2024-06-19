import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";

const Response = ({ response, index }) => {
  const { handleUserDecision } = useTriggersContextData();
  const renderContent = () => {
    if (response.responseText) {
      return (
        <div className="EMBOT-mb-1">
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
                  let newConnection = {};
                  if (index === 0) {
                    newConnection = {
                      value: response.subTriggers[0].value,
                      source: response.connections.leftSource,
                      parentNode: response.nodeId,
                    };
                  } else {
                    newConnection = {
                      value: response.subTriggers[index].value,
                      source: response.connections.rightSource,
                      parentNode: response.nodeId,
                    };
                  }

                  handleUserDecision(newConnection);
                }}
                className="EMBOT-w-full EMBOT-mt-1 EMBOT-relative EMBOT-inline-flex EMBOT-items-center EMBOT-justify-center EMBOT-p-0.5 EMBOT-me-2 EMBOT-overflow-hidden EMBOT-text-sm EMBOT-font-medium EMBOT-text-gray-900 EMBOT-rounded-lg EMBOT-group EMBOT-bg-gradient-to-br EMBOT-from-blue-500 EMBOT-to-blue-500 group-hover:EMBOT-from-blue-500 group-hover:EMBOT-to-blue-500 hover:EMBOT-text-white dark:EMBOT-text-white focus:EMBOT-ring-4 focus:EMBOT-outline-none focus:EMBOT-ring-blue-200 dark:EMBOT-focus:ring-blue-800"
              >
                <span className="EMBOT-relative EMBOT-w-full EMBOT-px-5 EMBOT-py-2.5 EMBOT-transition-all EMBOT-ease-in EMBOT-duration-75 EMBOT-bg-white dark:EMBOT-bg-gray-900 EMBOT-rounded-md group-hover:EMBOT-bg-opacity-0">
                  {item.value}
                </span>
              </button>
            ) : (
              <a
                key={index}
                href={item.url}
                target="_blank"
                className="EMBOT-inline-flex EMBOT-w-full EMBOT-group"
              >
                <span className="EMBOT-h-10 EMBOT-underline EMBOT-rounded-l-md EMBOT-w-full EMBOT-text-blue-600 EMBOT-text-sm EMBOT-flex EMBOT-items-center EMBOT-justify-center EMBOT-uppercase EMBOT-font-semibold EMBOT-px-8 EMBOT-border EMBOT-border-blue-500 EMBOT-transition EMBOT-duration-500 EMBOT-ease-in-out">
                  {item.label}
                </span>
                <span className="EMBOT-h-10 EMBOT-rounded-r-md EMBOT-text-blue-600 EMBOT-w-12 EMBOT-flex-shrink-0 EMBOT-flex EMBOT-items-center EMBOT-justify-center EMBOT-border EMBOT-border-l-0 EMBOT-border-blue-500 group-hover:EMBOT-bg-blue-500 group-hover:EMBOT-text-white EMBOT-transition EMBOT-duration-500 EMBOT-ease-in-out">
                  <Icon
                    icon="mdi:keyboard-arrow-right"
                    className="EMBOT-h-5 EMBOT-w-5"
                  />
                </span>
              </a>
            )
          )}
        </div>
      );
    } else if (response.imageURL) {
      return (
        <img
          className="EMBOT-w-full EMBOT-h-auto EMBOT-border-gray-200 EMBOT-rounded-e-xl EMBOT-rounded-es-xl"
          src={response.imageURL}
          alt={response.imageId}
        />
      );
    } else if (response.label && response.url) {
      return (
        <button
          title={response.url}
          onClick={() => window.open(response.url, "_blank")}
          className="EMBOT-w-full EMBOT-border-2 EMBOT-group EMBOT-border-blue-500 EMBOT-relative EMBOT-inline-flex EMBOT-items-center EMBOT-justify-center EMBOT-p-0.5 EMBOT-me-2 EMBOT-overflow-hidden EMBOT-text-sm EMBOT-font-medium EMBOT-text-gray-900 EMBOT-rounded-lg"
        >
          <span className="EMBOT-relative EMBOT-text-blue-500 group-hover:EMBOT-underline  EMBOT-w-full EMBOT-px-5 EMBOT-py-2.5 EMBOT-transition-all EMBOT-ease-in EMBOT-duration-75 EMBOT-bg-white dark:EMBOT-bg-gray-900 EMBOT-rounded-md group-hover:EMBOT-bg-opacity-0">
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
      <div className="EMBOT-flex EMBOT-flex-col EMBOT-w-full EMBOT-max-w-[70%] EMBOT-leading-1.5  EMBOT-dark:bg-gray-700">
        {renderContent()}
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
