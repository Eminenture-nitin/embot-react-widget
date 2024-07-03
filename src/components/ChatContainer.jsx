import React, { useEffect, useRef, useState } from "react";
import Response from "./ChatComponents/Response";
import UserTrigger from "./ChatComponents/UserTrigger";
import CountdownTimer from "./CountdownTimer";
import { useSocket } from "../context/SocketContext";
import { useLiveChatContext } from "../context/LiveChatContext";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";
import SliderTriggerComponent from "./ChatComponents/SliderTriggerComponent";

const ChatContainer = () => {
  const { assitWaitingTimerData } = useGlobalStatesContext();
  const { chatMessages, setChatMessages } = useLiveChatContext();
  const { socket } = useSocket();
  const chatContainerRef = useRef(null);
  const [arrivalMsg, setArrivalMsg] = useState(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMsg(msg);
      });
    }
  }, [socket, arrivalMsg]);

  useEffect(() => {
    if (arrivalMsg) {
      const { attachmentFile, message, assiMsgData } = arrivalMsg;
      const conditions = [
        {
          check: attachmentFile && attachmentFile.length > 0,
          addMessage: {
            myself: true,
            imageURL: attachmentFile,
            imageId: "test",
          },
        },
        {
          check: message && message.length > 0,
          addMessage: {
            myself: true,
            responseText: message,
            assiMsgData: assiMsgData,
          },
        },
      ];

      conditions.forEach((condition) => {
        if (condition.check) {
          setChatMessages((prevMsgs) => [...prevMsgs, condition.addMessage]);
        }
      });
    }
  }, [arrivalMsg]);

  return (
    <div
      ref={chatContainerRef}
      style={{ height: "calc(100% - 160px)", maxHeight: "calc(100% - 160px)" }}
      className="EMBOT-chat-container EMBOT-pr-4 EMBOT-p-6 EMBOT-overflow-y-auto EMBOT-flex-1 EMBOT-min-h-[167px] scroll-smooth focus:scroll-auto"
    >
      {chatMessages?.map((msgData, index) => (
        <div key={index} className="EMBOT-w-full EMBOT-min-h-fit">
          {msgData?.myself != false ? (
            <>
              <Response response={msgData} index={index} />
            </>
          ) : (
            <UserTrigger userTrigger={msgData} index={index} />
          )}
          {msgData?.format == "slider" && (
            <SliderTriggerComponent data={msgData} />
          )}
        </div>
      ))}

      {assitWaitingTimerData?.status && (
        <CountdownTimer
          initialMinutes={assitWaitingTimerData?.time?.min}
          initialSeconds={assitWaitingTimerData?.time?.sec}
          assitWaitingTimerData={assitWaitingTimerData}
        />
      )}
    </div>
  );
};

export default ChatContainer;
