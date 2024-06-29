import React, { useState } from "react";
import { useAdminCredentials } from "../context/AdminCredentialsContext";
import { useTriggersContextData } from "../context/TriggersDataContext";
import { useLiveChatContext } from "../context/LiveChatContext";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";
import { handleNLPOutput } from "../utils/NLPLogic";

const ChatForm = () => {
  const { theme } = useAdminCredentials();
  const [value, setValue] = useState("");
  const { questionableTUserInteraction } = useTriggersContextData();
  const { inputTagConfig } = useGlobalStatesContext();
  const { chatMode, addMsg, setChatMessages } = useLiveChatContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value?.length > 0) {
      if (inputTagConfig.trigger_Name == "Questionable Trigger") {
        questionableTUserInteraction(value);
      } else if (chatMode == "liveChat") {
        setChatMessages((prevMsgs) => [
          ...prevMsgs,
          { userTrigger: value, myself: false },
        ]);
        addMsg(value);
      } else {
        const output = handleNLPOutput(value);
        setChatMessages((prevMsgs) => [
          ...prevMsgs,
          { userTrigger: value, myself: false },
          { responseText: output, myself: true },
        ]);
      }
      setValue("");
    }
  };
  return (
    <div className="EMBOT-p-6 EMBOT-absolute EMBOT-bottom-0 EMBOT-w-full EMBOT-bg-white EMBOT-pt-5 EMBOT-border EMBOT-border-t-gray-500">
      <form
        onSubmit={handleSubmit}
        className="EMBOT-flex EMBOT-items-center EMBOT-justify-center EMBOT-w-full EMBOT-space-x-2 "
      >
        <input
          onChange={(e) => setValue(e.target.value)}
          disabled={inputTagConfig?.status}
          type={inputTagConfig?.type}
          value={value}
          placeholder={inputTagConfig?.placeholder}
          name="userInput"
          className="EMBOT-flex focus:EMBOT-border focus:EMBOT-border-blue-500 EMBOT-outline-none EMBOT-h-10 EMBOT-w-full EMBOT-rounded-md EMBOT-border EMBOT-border-[#e5e7eb] EMBOT-px-3 EMBOT-py-2 EMBOT-text-sm EMBOT-placeholder-[#6b7280] EMBOT-focus:outline-none EMBOT-focus:ring-2 EMBOT-focus:ring-[#9ca3af] EMBOT-disabled:cursor-not-allowed EMBOT-disabled:opacity-50 EMBOT-text-[#030712] EMBOT-focus-visible:ring-offset-2"
        />
        <button
          style={{
            backgroundImage: theme
              ? theme
              : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
          }}
          className="EMBOT-inline-flex EMBOT-items-center EMBOT-justify-center EMBOT-rounded-md EMBOT-text-sm EMBOT-font-medium EMBOT-text-[#f9fafb] EMBOT-disabled:pointer-events-none EMBOT-disabled:opacity-50 EMBOT-bg-black EMBOT-hover:bg-[#111827E6] EMBOT-h-10 EMBOT-px-4 EMBOT-py-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
