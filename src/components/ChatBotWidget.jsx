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
      className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white rounded-lg border border-[#e5e7eb] w-[425px] h-[634px]"
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
