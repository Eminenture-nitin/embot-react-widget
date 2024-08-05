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
        height: "calc(100% - 50px)",
        maxHeight: "980px",
      }}
      className="fixed bottom-[calc(1rem+1rem)] right-0 mr-4 bg-white rounded-lg w-full max-w-xs sm:max-w-[400px] lg:max-w-[400px] overflow-hidden"
    >
      <div className="h-full" style={{ height: "100%" }}>
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
