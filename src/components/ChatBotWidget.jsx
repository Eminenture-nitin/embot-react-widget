import React, { useEffect } from "react";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";
import { useTriggersContextData } from "../context/TriggersDataContext";
import FullViewValidationForm from "./FullViewValidationForm";

const ChatBotWidget = () => {
  const { validationFailedAttempt, inputTagConfigm } = useTriggersContextData();
  useEffect(() => {
    console.log("validationFailedAttempt", validationFailedAttempt);
  }, [validationFailedAttempt]);
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        height: "calc(100% - 100px)",
      }}
      className="EMBOT-fixed EMBOT-bottom-[calc(4rem+1.5rem)] EMBOT-right-0 EMBOT-mr-4 EMBOT-bg-white EMBOT-rounded-lg EMBOT-border EMBOT-border-[#e5e7eb] EMBOT-w-[400px] EMBOT-overflow-hidden"
    >
      <div
        className="flex flex-col EMBOT-justify-between"
        style={{ height: "100%" }}
      >
        <Header />
        {validationFailedAttempt?.status !== true ? (
          <>
            <ChatContainer />
            <ChatForm />
          </>
        ) : (
          <FullViewValidationForm />
        )}
      </div>
    </div>
  );
};

export default ChatBotWidget;
