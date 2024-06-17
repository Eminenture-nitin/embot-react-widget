import React from "react";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";

const ChatBotWidget = () => {
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
      className="EMBOT-fixed EMBOT-bottom-[calc(4rem+1.5rem)] EMBOT-right-0 EMBOT-mr-4 EMBOT-bg-white EMBOT-rounded-lg EMBOT-border EMBOT-border-[#e5e7eb] EMBOT-w-[425px] EMBOT-h-[634px]"
    >
      {/* Header */}
      <Header />
      {/* Chat Container */}
      <ChatContainer />
      {/* Input box  */}
      <ChatForm />
    </div>
  );
};

export default ChatBotWidget;
