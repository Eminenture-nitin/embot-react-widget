import React, { useEffect, useState } from "react";
import Response from "./ChatComponents/Response";
import { useTriggersContextData } from "../context/TriggersDataContext";

const ChatContainer = () => {
  const { chatMessages } = useTriggersContextData();
  return (
    <div
      style={{ height: "calc(100% - 160px)", maxHeight: "calc(100% - 160px)" }}
      className="EMBOT-pr-4 EMBOT-p-6 EMBOT-overflow-y-auto EMBOT-flex-1 EMBOT-min-h-[167px] scroll-smooth focus:scroll-auto"
    >
      {chatMessages?.map((elem, index) => (
        <div key={index} className="EMBOT-w-full EMBOT-min-h-fit">
          <div>
            <Response response={elem} index={index} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
