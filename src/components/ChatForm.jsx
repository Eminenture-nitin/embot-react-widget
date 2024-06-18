import React from "react";

const ChatForm = () => {
  return (
    <div className="EMBOT-p-6 EMBOT-absolute EMBOT-bottom-0 EMBOT-w-full EMBOT-bg-white EMBOT-pt-5">
      <form className="EMBOT-flex EMBOT-items-center EMBOT-justify-center EMBOT-w-full EMBOT-space-x-2 ">
        <input
          className="EMBOT-flex EMBOT-h-10 EMBOT-w-full EMBOT-rounded-md EMBOT-border EMBOT-border-[#e5e7eb] EMBOT-px-3 EMBOT-py-2 EMBOT-text-sm EMBOT-placeholder-[#6b7280] EMBOT-focus:outline-none EMBOT-focus:ring-2 EMBOT-focus:ring-[#9ca3af] EMBOT-disabled:cursor-not-allowed EMBOT-disabled:opacity-50 EMBOT-text-[#030712] EMBOT-focus-visible:ring-offset-2"
          placeholder="Type your message"
          defaultValue=""
        />
        <button className="EMBOT-inline-flex EMBOT-items-center EMBOT-justify-center EMBOT-rounded-md EMBOT-text-sm EMBOT-font-medium EMBOT-text-[#f9fafb] EMBOT-disabled:pointer-events-none EMBOT-disabled:opacity-50 EMBOT-bg-black EMBOT-hover:bg-[#111827E6] EMBOT-h-10 EMBOT-px-4 EMBOT-py-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
