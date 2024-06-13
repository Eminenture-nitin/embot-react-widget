import React from "react";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";

const ChatBotWidget = () => {
  return (
    <div>
      <div
        style={{
          boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
      >
        {/* Header */}
        <Header />
        {/* Chat Container */}
        <ChatContainer />
        {/* Input box  */}
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatBotWidget;
