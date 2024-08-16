import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { useGlobalStatesContext } from "./GlobalStatesContext";
import { useAdminCredentials } from "./AdminCredentialsContext";
import Cookies from "js-cookie";
import { AutoGeneratedMessage } from "../utils/ActionsAutoGeneratedMessage";

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
  const { setAssitWaitingTimerData, setTakingEmailId } =
    useGlobalStatesContext();
  const { adminId, adminEmail } = useAdminCredentials();

  const getLocation = (email, mode) => {
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
          //  console.log("payload", payload);
          if (mode == "live") {
            registerUser(payload);
          } else {
            onlyRegisterUser(payload);
          }
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
        //   console.log("res", data);
        // saving Register user Id and Email to the Cookies

        Cookies.set("widget_user_id", data?.user?._id, { expires: 3 });
        // adding user to map
        socket.current.emit("addUser", data?.user?._id);

        setTimeout(() => {
          //sending notification to admin user is joined

          // console.log("notification", adminId);
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
            Cookies.set(
              "joinedAssistantId",
              data?.user?.joinedExecutive?.executive?._id,
              { expires: 1 }
            );
          }
        });
        // adding user to map
        socket.current.emit("addUser", data?.user?._id);
      })
      .catch((err) => console.log("err", err));
  };

  const onlyRegisterUser = (payload) => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/live/create-user/${adminId}`,
      method: "POST",
      data: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        const data = res.data;
        //   console.log("res", data);
        // saving Register user Id and Email to the Cookies

        Cookies.set("widget_user_id", data?.user?._id, { expires: 3 });
        // adding user to map
        socket.current.emit("addUser", data?.user?._id);

        setTimeout(() => {
          //sending notification to admin user is joined

          // console.log("notification", adminId);
          const NotifyData = {
            userInfo: {
              userName: data?.user?.userName,
              userEmail: data?.user?.userEmail,
              _id: data?.user?._id,
              visitedPage: data?.user?.visitedPage,
              type: "isRegistered",
            },
            adminId: adminId,
          };
          socket.current.emit("notifications", NotifyData);
        }, 2000);

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
          //    console.log("not joined");
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

  async function addMsg(TextMsgdata, assiUnavailableFromData, customFormsData) {
    const widgetUserId = Cookies.get("widget_user_id");

    if (!widgetUserId) {
      //  console.log("user id not available");
      return; //
    }

    setTimeout(() => {
      socket.current.emit("sendMsg", {
        to: Cookies.get("joinedAssistantId") || adminId,
        from: widgetUserId,
        message: TextMsgdata,
        assiUnavailableFromData: assiUnavailableFromData
          ? assiUnavailableFromData
          : null,
        customFormsData: customFormsData ? customFormsData : null,
      });
    }, 1000);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/live/addmsg`,
        method: "POST",
        data: JSON.stringify({
          to: Cookies.get("joinedAssistantId") || adminId,
          from: widgetUserId,
          message: TextMsgdata,
          type: Cookies.get("joinedAssistantId") ? "livechat" : "bot",
          assiUnavailableFromData: assiUnavailableFromData
            ? assiUnavailableFromData
            : null,
          customFormsData: customFormsData ? customFormsData : null,
        }),
        headers: { "Content-Type": "application/json" },
      });
      //   console.log(response.data);
    } catch (error) {
      console.error("Error adding message:", error);
    }

    // mainChatData.push({ replaytext: TextMsgdata });
  }

  async function addBotMsgs(TextMsgdata, assiMsgData, assiUnavailableFromData) {
    const widgetUserId = Cookies.get("widget_user_id");

    if (!widgetUserId) {
      //  console.log("widget_user_id cookie is not available.");
      return; // Exit early if widget_user_id cookie is not available
    }

    try {
      // Emit message via socket
      socket.current.emit("sendMsg", {
        to: widgetUserId,
        from: Cookies.get("joinedAssistantId") || adminId,
        message: TextMsgdata,
        assiMsgData: assiMsgData ? assiMsgData : null,
        assiUnavailableFromData: assiUnavailableFromData
          ? assiUnavailableFromData
          : null,
      });

      // Add message to database via axios
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/live/addmsg`,
        {
          to: widgetUserId,
          from: Cookies.get("joinedAssistantId") || adminId,
          message: TextMsgdata,
          assiMsgData: assiMsgData ? JSON.stringify(assiMsgData) : null,
          assiUnavailableFromData: assiUnavailableFromData
            ? assiUnavailableFromData
            : null,
        }
      );

      if (response.data.status === "success") {
        // toast.success(response.data.message);
        // console.log(response.data.message);
      } else {
        // toast.error(response.data.message);
      //  console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error adding bot message:", error);
    }
  }

  const performAction = (action, myself) => {
    const autoGeneratedMessage = AutoGeneratedMessage(action);
    setChatMessages((prevMsgs) => [
      ...prevMsgs,
      {
        responseText: autoGeneratedMessage,
        myself,
      },
    ]);
    myself ? addBotMsgs() : addMsg();
  };

  useEffect(() => {
    let timeout;
    if (adminId) {
      timeout = setTimeout(() => {
        socket.current.on(
          "AssistantLogoutSuccessfully",
          (data) => {
            setChatMessages((prevMsgs) => [
              ...prevMsgs,
              {
                responseText: `${data?.Assi_userName} is left live chat`,
                myself: true,
              },
            ]);
            Cookies.remove("joinedAssistantId");
            Cookies.remove("joinedAssistantEmail");
            setChatMode("botChat");
            setTakingEmailId(false);
          },
          5000
        );
        //checking if asssistant is joine directly or not
        socket.current.on("AssistantJoined", (data) => {
          setChatMode("liveChat");
          setChatMessages((prevMsgs) => [
            ...prevMsgs,
            {
              responseText: `${data?.Assi_userName} is joined`,
              assiMsgData: data,
              myself: true,
            },
          ]);
          Cookies.set("joinedAssistantId", data?.Assi__id, { expires: 1 });
          Cookies.set("joinedAssistantEmail", data?.Assi_userEmail, {
            expires: 1,
          });
          socket.current.emit("addUser", Cookies.get("widget_user_id"));
          setAssitWaitingTimerData({ time: {}, status: false });
        });
      });
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [socket, adminId]);

  // useEffect(() => {
  //   console.log(chatMessages);
  // }, [chatMessages]);
  return (
    <LiveChatContext.Provider
      value={{
        setChatMode,
        chatMode,
        getLocation,
        addMsg,
        chatMessages,
        setChatMessages,
        addBotMsgs,
        performAction,
      }}
    >
      {children}
    </LiveChatContext.Provider>
  );
}
