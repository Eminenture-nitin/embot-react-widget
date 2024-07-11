import React from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";
import Carousel from "./Carousel";

const SliderTriggerComponent = ({ data }) => {
  const { handleUserDecision, findSubtriggerConnectedNode } =
    useTriggersContextData();
  return (
    <div
      className={`w-full h-auto text-center m-auto max-w-[18rem] rounded-lg bg-white text-surface flex flex-col`}
    >
      <div
        style={{
          boxShadow: "rgb(182, 190, 252) 0px 0px 13px",
        }}
      >
        <Carousel pagination={false} className={`flex-grow`}>
          {data?.slides?.map((item, index) => (
            <div
              className={`w-full h-full text-center flex flex-col justify-between`}
              key={index}
            >
              <div
                className={`relative overflow-hidden bg-cover bg-no-repeat w-full h-auto`}
              >
                <img
                  className={`rounded-t-lg w-full h-auto`}
                  src={item?.imageURL}
                  alt={item?.imageId}
                />
              </div>
              <div className={`p-6 flex-grow`}>
                <h5
                  className={`mb-2 text-[18px] font-medium leading-tight truncate`}
                >
                  {item?.title}
                </h5>
                <p className={`text-base text-text`}>{item?.responseText}</p>
              </div>
              <ul
                className={`w-full cursor-pointer border-t border-neutral-100`}
              >
                {item?.subTriggers?.map((link, idx) => (
                  <li
                    key={idx}
                    onClick={() => window.open(link?.url, "_blank")}
                    title="button"
                    className={`w-full text-blue-600 hover:text-blue-800 hover:underline hover:bg-gray-50 focus:ring-4 focus:ring-blue-200 border-t border-gray-200 px-6 py-3 transition-all duration-300 ease-in-out`}
                  >
                    {link?.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Carousel>
      </div>

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
            style={{ boxShadow: "0 2px 6px rgba(0,0,0,.12)" }}
            className="border text-[#006ae1] hover:bg-[#006ae1] hover:text-white w-full mt-2 border-[#006ae1] outline-none px-3 group py-2 rounded-md cursor-pointer leading-5 text-sm"
          >
            {btn?.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderTriggerComponent;
