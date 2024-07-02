import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";
import { useSocket } from "../context/SocketContext";

const CountdownTimer = ({ initialMinutes, initialSeconds }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const { socket } = useSocket();
  const {
    assitWaitingTimerData,
    setAssitWaitingTimerData,
    setFullViewActiveEntity,
  } = useGlobalStatesContext();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (assitWaitingTimerData?.status == false) {
        clearInterval(countdown);
      } else {
        socket.current.off("checkAssitJoinedStatus");
        setFullViewActiveEntity("assistantWaitingForm");
        clearInterval(countdown);
        setAssitWaitingTimerData({ time: {}, status: false });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds, assitWaitingTimerData]);

  return (
    <div className="EMBOT-w-full EMBOT-p-4 EMBOT-text-center EMBOT-bg-white EMBOT-border EMBOT-border-gray-200 EMBOT-rounded-lg EMBOT-shadow sm:EMBOT-p-8 dark:EMBOT-bg-gray-800 dark:EMBOT-border-gray-700">
      <div>
        <Icon />
      </div>
      <p className="EMBOT-mb-5 EMBOT-text-base EMBOT-text-gray-500 sm:EMBOT-text-lg dark:EMBOT-text-gray-400">
        Please wait, our assistant is joining the chat
      </p>

      <div className="EMBOT-flex EMBOT-items-center EMBOT-justify-center EMBOT-space-y-4 sm:EMBOT-flex sm:EMBOT-space-y-0 sm:EMBOT-space-x-4 rtl:EMBOT-space-x-reverse">
        <div className="EMBOT-w-full sm:EMBOT-w-auto EMBOT-bg-gray-800 hover:EMBOT-bg-gray-700 focus:EMBOT-ring-4 focus:EMBOT-outline-none focus:EMBOT-ring-gray-300 EMBOT-text-white EMBOT-rounded-lg EMBOT-grid EMBOT-items-center EMBOT-justify-center EMBOT-px-4 EMBOT-py-2.5 dark:EMBOT-bg-gray-700 dark:EMBOT-hover:bg-gray-600 dark:EMBOT-focus:ring-gray-700">
          <div className="EMBOT-text-left rtl:EMBOT-text-right">
            <div className="EMBOT-font-sans EMBOT-text-sm EMBOT-font-semibold EMBOT-text-center">
              {minutes.toString().padStart(2, "0")}
            </div>
            <div className="EMBOT-text-xs EMBOT-text-center"> min</div>
          </div>
        </div>
        <div className="EMBOT-flex EMBOT-items-center EMBOT-justify-center EMBOT-space-x-2 EMBOT-mb-5">
          <Icon
            icon="svg-spinners:clock"
            className="EMBOT-h-8 EMBOT-w-8 EMBOT-text-gray-500"
          />
        </div>
        <div className="EMBOT-w-full sm:EMBOT-w-auto EMBOT-bg-gray-800 hover:EMBOT-bg-gray-700 focus:EMBOT-ring-4 focus:EMBOT-outline-none focus:EMBOT-ring-gray-300 EMBOT-text-white EMBOT-rounded-lg EMBOT-grid EMBOT-items-center EMBOT-justify-center EMBOT-px-4 EMBOT-py-2.5 dark:EMBOT-bg-gray-700 dark:EMBOT-hover:bg-gray-600 dark:EMBOT-focus:ring-gray-700">
          <div className="EMBOT-text-left rtl:EMBOT-text-right">
            <div className="EMBOT-font-sans EMBOT-text-sm EMBOT-font-semibold EMBOT-text-center">
              {seconds.toString().padStart(2, "0")}
            </div>
            <div className="EMBOT-text-xs EMBOT-text-center">sec</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
