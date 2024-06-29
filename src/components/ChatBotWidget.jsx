import React, { useEffect } from "react";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";
import FVAssistantWaitingForm from "./fullViewForms/FVAssistantWaitingForm";
import FVValidationForm from "./fullViewForms/FVValidationForm";

const ChatBotWidget = () => {
  const { fullViewActiveEntity } = useGlobalStatesContext();

  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        height: "calc(100% - 100px)",
      }}
      className="EMBOT-fixed EMBOT-bottom-[calc(4rem+1.5rem)] EMBOT-right-0 EMBOT-mr-4 EMBOT-bg-white EMBOT-rounded-lg EMBOT-border EMBOT-border-[#e5e7eb] EMBOT-w-[400px] EMBOT-overflow-hidden"
    >
      <div
        className="flex EMBOT-h-full flex-col EMBOT-justify-between"
        style={{ height: "100%" }}
      >
        <Header />

        {fullViewActiveEntity == "assistantWaitingForm" ? (
          <FVAssistantWaitingForm />
        ) : fullViewActiveEntity == "validationForm" ? (
          <FVValidationForm />
        ) : (
          <>
            <ChatContainer />
            <ChatForm />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBotWidget;
