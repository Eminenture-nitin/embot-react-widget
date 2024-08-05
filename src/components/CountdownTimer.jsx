import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";
import { useSocket } from "../context/SocketContext";
import { useAdminCredentials } from "../context/AdminCredentialsContext";

const CountdownTimer = ({ initialMinutes, initialSeconds }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const { adminId } = useAdminCredentials();
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
        socket.current.emit("notificationsRingOffEvent", adminId);
      } else {
        socket.current.off("checkAssitJoinedStatus");
        setFullViewActiveEntity({ active: "assistantWaitingForm", data: {} });
        socket.current.emit("notificationsRingOffEvent", adminId);
        clearInterval(countdown);
        setAssitWaitingTimerData({ time: {}, status: false });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds, assitWaitingTimerData]);

  return (
    <div className="w-[80%] mb-2 ml-12 p-2 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-4">
      <div>
        <Icon />
      </div>
      <p className="mb-5 text-base text-gray-500 text-md">
        {assitWaitingTimerData?.time?.assistantWaitingMessage
          ? assitWaitingTimerData?.time?.assistantWaitingMessage
          : "Please wait, our assistant is joining the chat"}
      </p>

      <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
        <div className="bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg flex flex-col items-center justify-center px-4 py-2.5">
          <div className="text-left rtl:text-right">
            <div className="font-sans text-sm font-semibold text-center">
              {minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-center">min</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Icon icon="svg-spinners:clock" className="h-8 w-8 text-gray-500" />
        </div>
        <div className="bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg flex flex-col items-center justify-center px-4 py-2.5">
          <div className="text-left rtl:text-right">
            <div className="font-sans text-sm font-semibold text-center">
              {seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-center">sec</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
