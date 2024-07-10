import React from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";
import Carousel from "./Carousel";

const SliderTriggerComponent = ({ data }) => {
  const { handleUserDecision, findSubtriggerConnectedNode } =
    useTriggersContextData();
  return (
    <div
      style={{
        boxShadow: "rgb(182, 190, 252) 0px 0px 13px",
      }}
      className="w-full h-auto text-center m-auto block max-w-[18rem] rounded-lg bg-white text-surface shadow-blue-1 dark:bg-surface-dark dark:text-white"
    >
      <Carousel pagination={false}>
        {data?.slides?.map((item, index) => (
          <div
            className="w-full h-auto text-center grid place-items-center"
            key={index}
          >
            <div
              key={index}
              className="relative overflow-hidden bg-cover bg-no-repeat w-full h-auto"
            >
              <img
                className="rounded-t-lg w-full h-auto"
                src={item?.imageURL}
                alt={item?.imageId}
              />
            </div>
            <div className="p-6">
              <h5 className="mb-2 text-[18px] font-medium leading-tight truncate">
                {item?.title}
              </h5>
              <p className="text-base text-text">{item?.responseText}</p>
            </div>
            <ul className="w-full cursor-pointer border-y-2 border-neutral-100">
              {item?.subTriggers?.map((link, idx) => (
                <li
                  key={idx}
                  onClick={() => window.open(link?.url, "_blank")}
                  title="button"
                  className="w-full text-blue-600 hover:underline border-opacity-100 px-6 py-3 dark:border-white/10"
                >
                  {link?.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Carousel>

      <ul className="w-full cursor-pointer border-y-2 border-neutral-100">
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
            className="w-full hover:text-blue-600 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 border-opacity-100 px-6 py-3 dark:border-white/10"
          >
            {btn?.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderTriggerComponent;
