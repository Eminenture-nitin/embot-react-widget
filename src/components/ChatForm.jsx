import React, { useEffect, useState } from "react";
import { useAdminCredentials } from "../context/AdminCredentialsContext";
import { useTriggersContextData } from "../context/TriggersDataContext";
import { useLiveChatContext } from "../context/LiveChatContext";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";
import { handleNLPOutput } from "../utils/NLPLogic";
import { isValidEmail, isValueInCookies } from "../utils/validations";

import Cookies from "js-cookie";
import { useSocket } from "../context/SocketContext";
const ChatForm = () => {
  const { theme } = useAdminCredentials();
  const [value, setValue] = useState("");

  const { questionableTUserInteraction, outOfFlowData, setOutOfFlowData } =
    useTriggersContextData();
  const {
    inputTagConfig,
    setAssitWaitingTimerData,
    userRegistered,
    takingEmailId,
    setTakingEmailId,
  } = useGlobalStatesContext();
  const {
    chatMode,
    setChatMode,
    addMsg,
    getLocation,
    setChatMessages,
    chatMessages,
    addBotMsgs,
    goForLiveChatOFF,
    setGoForLiveChatOFF,
  } = useLiveChatContext();

  const handleMultipleActionsCall = (input, output) => {
    setTimeout(() => {
      addMsg(input);
    }, 100);
    setTimeout(() => {
      addBotMsgs(output);
    }, 200);
  };

  function isObjectNotEmpty(obj) {
    if (obj === undefined || obj === null) {
      return false;
    }
    return Object.keys(obj).length > 0;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim()?.length > 0) {
      if (inputTagConfig.trigger_Name == "Questionable Trigger") {
        questionableTUserInteraction(value.trim());
      } else if (chatMode == "liveChat") {
        setChatMessages((prevMsgs) => [
          ...prevMsgs,
          { userTrigger: value, myself: false },
        ]);
        addMsg(value);
      } else if (takingEmailId) {
        if (!isValidEmail(value.trim())) {
          setChatMessages((prevMsgs) => [
            ...prevMsgs,
            { userTrigger: value, myself: false },
            {
              responseText: "Please enter a valid email address.",
              myself: true,
            },
          ]);
        } else {
          setTakingEmailId(false);
          setChatMessages((prevMsgs) => [
            ...prevMsgs,
            { userTrigger: value, myself: false },
          ]);
          Object.values(outOfFlowData).map((msg) => {
            setChatMessages((prevMessages) => [...prevMessages, msg]);
          });
          setOutOfFlowData({});
          Cookies.set("widget_user_email", value, { expires: 3 });
          setAssitWaitingTimerData((prevAWTD) => ({
            ...prevAWTD,
            time: outOfFlowData?.assiWaitingTimeAndMessage,
            status: true,
          }));
          setChatMode("liveChat");
          getLocation(value, "live");
        }
      } else {
        const output = handleNLPOutput(value.trim());
        setChatMessages((prevMsgs) => [
          ...prevMsgs,
          { userTrigger: value, myself: false },
        ]);
        if (output == false) {
          setChatMessages((prevMsgs) => [
            ...prevMsgs,
            {
              responseText: "Would you like to chat with our assistant?",
              subTriggers: [
                {
                  type: "action",
                  value: "Yes, please connect",
                  role: "custom",
                },
                { type: "action", value: "Not yet", role: "custom" },
              ],
              myself: true,
            },
          ]);
          handleMultipleActionsCall(
            value,
            "Out-of-flow query detected. If important, please connect! 💬🤝"
          );
        } else {
          setChatMessages((prevMsgs) => [
            ...prevMsgs,
            { responseText: output, myself: true },
          ]);
          handleMultipleActionsCall(value, output);
        }
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
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Powered by
        </span>
        <img
          src="https://embot-react-widget.vercel.app/images/EM-logo-black-full.png"
          width="70px"
          height="auto"
        />
      </div>
    </div>
  );
};

export default ChatForm;
