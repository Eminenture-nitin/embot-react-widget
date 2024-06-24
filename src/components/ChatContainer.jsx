import React, { useEffect, useRef } from "react";
import Response from "./ChatComponents/Response";
import { useTriggersContextData } from "../context/TriggersDataContext";
import UserTrigger from "./ChatComponents/UserTrigger";

const ChatContainer = () => {
  const { chatMessages } = useTriggersContextData();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  return (
    <div
      ref={chatContainerRef}
      style={{ height: "calc(100% - 160px)", maxHeight: "calc(100% - 160px)" }}
      className="EMBOT-chat-container EMBOT-pr-4 EMBOT-p-6 EMBOT-overflow-y-auto EMBOT-flex-1 EMBOT-min-h-[167px] scroll-smooth focus:scroll-auto"
    >
      {chatMessages?.map((msgData, index) => (
        <div key={index} className="EMBOT-w-full EMBOT-min-h-fit">
          {msgData?.myself !== false ? (
            <Response response={msgData} index={index} />
          ) : (
            <UserTrigger userTrigger={msgData} index={index} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
