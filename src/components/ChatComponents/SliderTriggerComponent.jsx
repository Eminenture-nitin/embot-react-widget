import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useTriggersContextData } from "../../context/TriggersDataContext";

const SliderTriggerComponent = ({ data }) => {
  const { handleUserDecision, findSubtriggerConnectedNode } =
    useTriggersContextData();
  return (
    <div
      style={{
        boxShadow: "rgb(182, 190, 252) 0px 0px 13px",
      }}
      className="EMBOT-w-full EMBOT-h-auto EMBOT-text-center EMBOT-m-auto EMBOT-block EMBOT-max-w-[18rem] EMBOT-rounded-lg EMBOT-bg-white EMBOT-text-surface EMBOT-shadow-blue-1 dark:EMBOT-bg-surface-dark dark:EMBOT-text-white"
    >
      <Splide
        options={{
          perPage: 1,
          gap: "2rem",
          pagination: false,
          arrows: true,
        }}
      >
        {data?.slides?.map((item, index) => (
          <React.Fragment key={index}>
            <SplideSlide>
              <div
                key={index}
                className="EMBOT-relative EMBOT-overflow-hidden EMBOT-bg-cover EMBOT-bg-no-repeat"
              >
                <img
                  className="EMBOT-rounded-t-lg"
                  src={item?.imageURL}
                  alt={item?.imageId}
                />
              </div>
              <div className="EMBOT-p-6">
                <h5 className="EMBOT-mb-2 EMBOT-text-[18px] EMBOT-font-medium EMBOT-leading-tight EMBOT-truncate">
                  {item?.title}
                </h5>
                <p className="EMBOT-text-base EMBOT-text-text">
                  {item?.responseText}
                </p>
              </div>
              <ul className="EMBOT-w-full EMBOT-cursor-pointer EMBOT-border-y-2 EMBOT-border-neutral-100">
                {item?.subTriggers?.map((link, idx) => (
                  <li
                    key={idx}
                    onClick={() => window.open(link?.url, "_blank")}
                    title="button"
                    className="EMBOT-w-full EMBOT-text-blue-600 hover:EMBOT-underline EMBOT-border-opacity-100 EMBOT-px-6 EMBOT-py-3 dark:EMBOT-border-white/10"
                  >
                    {link?.label}
                  </li>
                ))}
              </ul>
            </SplideSlide>
          </React.Fragment>
        ))}
      </Splide>
      <ul className="EMBOT-w-full EMBOT-cursor-pointer EMBOT-border-y-2 EMBOT-border-neutral-100">
        {data?.subTriggers?.map((btn, index) => (
          <li
            key={index}
            onClick={() => {
              const targetNodeId = findSubtriggerConnectedNode(
                data.nodeId,
                btn.value
              );
              handleUserDecision(targetNodeId, btn.value);
            }}
            title="button"
            className="EMBOT-w-full hover:EMBOT-text-blue-600 hover:EMBOT-bg-gray-100 focus:EMBOT-ring-4 focus:EMBOT-ring-gray-100 dark:EMBOT-focus:ring-gray-700 EMBOT-border-opacity-100 EMBOT-px-6 EMBOT-py-3 dark:EMBOT-border-white/10"
          >
            {btn?.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderTriggerComponent;
