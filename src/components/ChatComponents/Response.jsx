import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Response = ({ response, index }) => {
  const renderContent = () => {
    if (response.responseText) {
      return (
        <p
          style={{ backgroundColor: "rgb(240, 242, 247)" }}
          className="EMBOT-text-sm EMBOT-font-normal EMBOT-py-2.5 EMBOT-px-2 EMBOT-text-gray-900 EMBOT-dark:text-white EMBOT-border-gray-200 EMBOT-rounded-e-xl EMBOT-rounded-es-xl"
        >
          {response.responseText}
        </p>
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
        <div>
          <a
            href={response.url}
            target="_blank"
            className="EMBOT-inline-flex EMBOT-items-center EMBOT-px-5 EMBOT-py-2.5 EMBOT-text-sm EMBOT-font-medium EMBOT-text-center EMBOT-text-white EMBOT-bg-blue-700 EMBOT-rounded-lg EMBOT-hover:bg-blue-800 EMBOT-focus:ring-4 EMBOT-focus:outline-none EMBOT-focus:ring-blue-300 EMBOT-dark:bg-blue-600 EMBOT-dark:hover:bg-blue-700 EMBOT-dark:focus:ring-blue-800"
          >
            {response.label}
            <Icon
              icon="gravity-ui:arrow-right"
              className="EMBOT-w-4 EMBOT-h-4 EMBOT-ms-2 EMBOT-rtl:rotate-180"
            />
          </a>
        </div>
      );
    }
    return null;
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
          className="EMBOT-inline-flex EMBOT-self-center EMBOT-items-center EMBOT-p-2 EMBOT-text-sm EMBOT-font-medium EMBOT-text-center EMBOT-text-gray-900 EMBOT-bg-white EMBOT-rounded-lg EMBOT-hover:bg-gray-100 EMBOT-focus:ring-4 EMBOT-focus:outline-none EMBOT-dark:text-white EMBOT-focus:ring-gray-50 EMBOT-dark:bg-gray-900 EMBOT-dark:hover:bg-gray-800 EMBOT-dark:focus:ring-gray-600"
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
