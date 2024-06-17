import React from "react";

const ChatForm = () => {
  return (
    <div className="flex items-center pt-0 p-6">
      <form className="flex items-center justify-center w-full space-x-2">
        <input
          className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
          placeholder="Type your message"
          defaultValue=""
        />
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
