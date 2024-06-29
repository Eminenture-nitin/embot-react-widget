import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { useGlobalStatesContext } from "./GlobalStatesContext";
import { useAdminCredentials } from "./AdminCredentialsContext";

// Live Chat context
const LiveChatContext = createContext();

// Custom hook to access the Live Chat context
export function useLiveChatContext() {
  return useContext(LiveChatContext);
}

// LiveChatProvider component
export function LiveChatProvider({ children }) {
  const { socket } = useSocket();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMode, setChatMode] = useState("botChat");
  const { setAssitWaitingTimerData } = useGlobalStatesContext();
  const { adminId } = useAdminCredentials();

  const getLocation = (email) => {
    axios
      .get(`https://ipapi.co/json`)
      .then((res) => {
        const data = res?.data;
        if (data) {
          const payload = {
            userName: email.split("@")[0],
            userEmail: email,
            uniqueIpAddress: data?.ip,
            location: {
              country_code: data?.country_code,
              ip: data?.ip,
              country_name: data?.country_name,
              region: data?.region,
              timezone: data?.timezone,
              longitude: data?.longitude,
              latitude: data?.latitude,
              city: data?.city,
            },
            visitedPage: window.location.href,
          };
          console.log("payload", payload);
          registerUser(payload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerUser = (payload) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/live/create-user/${adminId}`,
      method: "POST",
      data: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        const data = res.data;
        getParticularUser(data?.user?._id);
        console.log("res", data);
        // saving Register user Id and Email to the localStorage
        localStorage.setItem("widget_user_id", data?.user?._id);
        // adding user to map
        socket.current.emit("addUser", data?.user?._id);

        setTimeout(() => {
          //sending notification to admin user is joined
          const NotifyData = {
            userInfo: {
              userName: data?.user?.userName,
              userEmail: data?.user?.userEmail,
              _id: data?.user?._id,
              visitedPage: data?.user?.visitedPage,
              type: "seekingAssistant",
            },
            adminId: adminId,
          };
          socket.current.emit("notifications", NotifyData);
        }, 2000);
        // checking asssistant is joine or not
        socket.current.on("checkAssitJoinedStatus", (data) => {
          if (data.status == false) {
            getParticularUser(data?.user?._id);
          } else {
            localStorage.setItem(
              "joinedAssistantId",
              data?.user?.joinedExecutive?.executive?._id
            );
          }
        });
        // adding user to map
        socket.current.emit("addUser", data?.user?._id);
      })
      .catch((err) => console.log("err", err));
  };

  //get particular user
  async function getParticularUser(userId) {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/live/get-puser/${userId}`
      );
      const data = await res.json();
      //console.log(data);
      setTimeout(() => {
        if (data.data.joinedExecutive.status == false) {
          console.log("not joined");
          socket.current.emit("updateUserAssistantStatus", userId);
        } else {
          setChatMessages((prevMsgs) => [
            ...prevMsgs,
            {
              myself: true,
              responseText: `${data.data.joinedExecutive.executive.userName} is joined`,
              assiMsgData: data.data.joinedExecutive.executive,
            },
          ]);
          setAssitWaitingTimerData({ time: {}, status: false });
          console.log("Live Chat Activated.....");
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  //send msg
  async function addMsg(
    TextMsgdata,
    assiUnavailableFromData,
    quickInquiryFromData
  ) {
    // console.log(TextMsgdata, "TextMsgdata");
    setTimeout(() => {
      socket.current.emit("sendMsg", {
        to: localStorage.getItem("joinedAssistantId") || adminId,
        from: localStorage.getItem("widget_user_id"),
        message: TextMsgdata,
        assiUnavailableFromData: assiUnavailableFromData
          ? assiUnavailableFromData
          : null,
        quickInquiryFromData: quickInquiryFromData
          ? quickInquiryFromData
          : null,
      });
    }, 1000);
    axios({
      url: `${process.env.REACT_APP_API_URL}/live/addmsg`,
      method: "POST",
      data: JSON.stringify({
        to: localStorage.getItem("joinedAssistantId") || adminId,
        from: localStorage.getItem("widget_user_id"),
        message: TextMsgdata,
        type: localStorage.getItem("joinedAssistantId") ? "livechat" : "bot",
        assiUnavailableFromData: assiUnavailableFromData
          ? assiUnavailableFromData
          : null,
        quickInquiryFromData: quickInquiryFromData
          ? quickInquiryFromData
          : null,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
      });

    //   mainChatData.push({ replaytext: TextMsgdata });
  }
  useEffect(() => {
    console.log("socket", socket.current);

    //   getLocation("nitin@gmail.com");
  }, [socket]);

  return (
    <LiveChatContext.Provider
      value={{
        setChatMode,
        chatMode,
        getLocation,
        addMsg,
        chatMessages,
        setChatMessages,
      }}
    >
      {children}
    </LiveChatContext.Provider>
  );
}
