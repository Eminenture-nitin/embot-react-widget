import React, { useEffect } from "react";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";
import FVAssistantWaitingForm from "./fullViewForms/FVAssistantWaitingForm";
import FVValidationForm from "./fullViewForms/FVValidationForm";
import FVCustomeForm from "./fullViewForms/FVCustomeForm";

const ChatBotWidget = () => {
  const { fullViewActiveEntity, enableTextInput } = useGlobalStatesContext();

  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        height: "calc(100% - 100px)",
      }}
      className="EMBOT-fixed EMBOT-bottom-[calc(4rem+1.5rem)] EMBOT-right-0 EMBOT-mr-4 EMBOT-bg-white EMBOT-rounded-lg EMBOT-w-[400px] EMBOT-overflow-hidden"
    >
      <div className="EMBOT-h-full" style={{ height: "100%" }}>
        <Header />

        {fullViewActiveEntity?.active == "assistantWaitingForm" ? (
          <FVAssistantWaitingForm />
        ) : fullViewActiveEntity?.active == "validationForm" ? (
          <FVValidationForm />
        ) : fullViewActiveEntity?.active == "customForms" ? (
          <FVCustomeForm data={fullViewActiveEntity?.data} />
        ) : (
          <>
            <ChatContainer />
            {enableTextInput && <ChatForm />}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBotWidget;
