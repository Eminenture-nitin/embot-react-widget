import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";

const Response = ({ response, index }) => {
  const { handleUserDecision, edges, setChatMessages } =
    useTriggersContextData();

  const findSubtriggerNode = (parentNodeId, triggerValue) => {
    const matchingEdge = edges.find(
      (edge) => edge.source == parentNodeId && edge.label == triggerValue
    );
    console.log("matchingEdge", matchingEdge);
    if (matchingEdge) {
      return matchingEdge.target;
    }

    return null;
  };

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
                  setChatMessages((prevMsgs) => [
                    ...prevMsgs,
                    { userTrigger: item.value, myself: false },
                  ]);
                  const targetNodeId = findSubtriggerNode(
                    response.nodeId,
                    item.value
                  );
                  handleUserDecision(targetNodeId);
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
      );
    } else if (response.imageURL) {
      return (
        <img
          loading="lazy"
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
          style={{ boxShadow: "0 2px 6px rgba(0,0,0,.12)" }}
          className="EMBOT-border EMBOT-w-full EMBOT-mb-2  EMBOT-border-[#006ae1] EMBOT-outline-none EMBOT-px-3 EMBOT-group EMBOT-py-2 EMBOT-rounded-md EMBOT-cursor-pointer EMBOT-leading-5 EMBOT-text-sm"
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
