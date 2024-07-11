import React, { useState } from "react";
import { useAdminCredentials } from "../context/AdminCredentialsContext";
import { useTriggersContextData } from "../context/TriggersDataContext";
import { useLiveChatContext } from "../context/LiveChatContext";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";
import { handleNLPOutput } from "../utils/NLPLogic";

const ChatForm = () => {
  const { theme } = useAdminCredentials();
  const [value, setValue] = useState("");
  const { questionableTUserInteraction, handleUserInput } =
    useTriggersContextData();
  const { inputTagConfig } = useGlobalStatesContext();
  const { chatMode, addMsg, setChatMessages, addBotMsgs } =
    useLiveChatContext();

  const handleMultipleActionsCall = async (input, output) => {
    try {
      await Promise.all([
        // handleUserInput(input),
        // addMsg(input),
        // addBotMsgs(output),
      ]);
      console.log("All functions completed successfully");
    } catch (error) {
      console.error("Error in one of the functions:", error);
    }
  };

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
        ]);
        setChatMessages((prevMsgs) => [
          ...prevMsgs,
          { responseText: output, myself: true },
        ]);
        handleMultipleActionsCall(value, output);
      }
      setValue("");
    }
  };
  return (
    <div className="p-6 pb-3 absolute bottom-0 w-full bg-white pt-5 border border-t-gray-500">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center w-full space-x-2 "
      >
        <input
          onChange={(e) => setValue(e.target.value)}
          disabled={inputTagConfig?.status}
          type={inputTagConfig?.type}
          value={value}
          placeholder={inputTagConfig?.placeholder}
          name="userInput"
          className="flex focus:border focus:border-blue-500 outline-none h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
        />
        <button
          style={{
            backgroundImage: theme
              ? theme
              : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
        >
          Send
        </button>
      </form>
      <div className="flex items-center w-full justify-center mt-2 m-0 gap-2">
        <span class="text-xs text-gray-500 dark:text-gray-400">Powered by</span>
        <img src="images/EM-logo-black-full.png" width="70px" height="auto" />
      </div>
    </div>
  );
};

export default ChatForm;
