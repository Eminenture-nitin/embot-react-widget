import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValueInCookies,
} from "../utils/validations";
import { useLiveChatContext } from "./LiveChatContext";
import { useGlobalStatesContext } from "./GlobalStatesContext";
import { useSocket } from "./SocketContext";
import Cookies from "js-cookie";
import { STConvertDataFormat } from "../utils/DataFormatConversionLogic";
import { useAdminCredentials } from "./AdminCredentialsContext";
// TriggersContext context
const TriggersContext = createContext();

// Custom hook to access the TriggersContext state
export function useTriggersContextData() {
  return useContext(TriggersContext);
}

// TriggersContext component
export function TriggersContextProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [outOfFlowData, setOutOfFlowData] = useState({});
  const { adminId } = useAdminCredentials();
  const { socket } = useSocket();
  const [validationFailedAttempt, setValidationFailedAttempt] = useState(0);
  const {
    setInputTagConfig,
    setAssitWaitingTimerData,
    inputTagConfig,
    setFullViewActiveEntity,
    setEnableTextInput,
  } = useGlobalStatesContext();

  const {
    getLocation,
    setChatMode,
    chatMessages,
    setChatMessages,
    addMsg,
    addBotMsgs,
  } = useLiveChatContext();
  // Function to get trigger data
  const getTriggersData = (adminId) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/getNodeAndEdgesWidget/${adminId}`
      )
      .then((res) => {
        //  console.log(res.data);
        setNodes(res.data.nodes);
        setEdges(res.data.edges);
        setOutOfFlowData(res.data.outOfFlowData);
        startChatbot(res.data.nodes, res.data.edges);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to start the chatbot
  const startChatbot = (nodes, edges) => {
    const visitedNodes = new Set();
    nodes.forEach((node) => {
      if (
        node.data.triggerType === "triggers" &&
        node.data.trigger_Name === "First visit on site"
      ) {
        Cookies.set("FirstVisitNodeID", node.id, { expires: 3 });

        activateNode(node, nodes, edges, visitedNodes);
      }
    });
  };

  // Function to activate a node
  const activateNode = (node, nodes, edges, visitedNodes) => {
    if (visitedNodes.has(node.id)) return;
    visitedNodes.add(node.id);
    // console.log("active", node);
    if (node.data.trigger_Name == "First visit on site") {
      // console.log("First visit on site", node.id);
    }
    if (node.data.trigger_Name == "Questionable Trigger") {
      const validationType = node.data.message.validationType;
      setInputTagConfig((prevConfig) => ({
        ...prevConfig,
        status: false,
        type: validationType == "Phone Number" ? "number" : "text",
        placeholder: `Enter Your ${validationType}`,
        trigger_Name: node?.data?.trigger_Name,
        ...node.data.message,
        nextNodeId: node?.data?.connections?.leftSource,
      }));
    } else {
      setInputTagConfig((prevConfig) => ({
        ...prevConfig,
        status: false,
        type: "text",
        placeholder: `Enter Your message here...`,
        trigger_Name: node?.data?.trigger_Name,
        ...node.data.message,
      }));
      setAssitWaitingTimerData({ time: {}, status: false });
      setChatMode("botChat");
      socket.current.off("checkAssitJoinedStatus");
    }

    console.log(`Activating node: ${node.data.trigger_Name}`);
    handleNodeTrigger(node, nodes, edges, visitedNodes);
  };

  // Function to check if the next node should be activated
  const checkActivationCondition = (node) => {
    // Add your condition logic here
    // Return true if the condition is met, otherwise return false
    return true; // By default, all nodes can be activated
  };

  // Function to handle node triggers
  const handleNodeTrigger = (node, nodes, edges, visitedNodes) => {
    switch (node.data.trigger_Name) {
      case "First visit on site":
        handleFirstVisit(node, nodes, edges, visitedNodes);
        break;
      case "Send a response":
        handleSendResponse(node);
        break;
      case "Decision (Buttons)":
        handleDecisionButtons(node, nodes, edges);
        break;
      case "Questionable Trigger":
        handleQuestionableTrigger(node, nodes, edges);
        break;
      case "Chat with Assistant":
        hadleChatWithAssistantTrigger(node, nodes, edges);
        break;
      case "Card Slider":
        handleCardSliderTrigger(node, nodes, edges);
        break;
      case "Custom Forms":
        handleCustomFormsTrigger(node, nodes, edges);
        break;
      case "Disable text input":
        handleDisableTextInputTrigger(node, nodes, edges);
        break;
      case "Enable text input":
        handleEnableTextInputTrigger(node, nodes, edges);
        break;
      // Add more cases for different trigger names
      default:
        console.log(`Unknown trigger: ${node.data.trigger_Name}`);
    }

    if (
      node.data.trigger_Name !== "Decision (Buttons)" &&
      node.data.trigger_Name !== "Questionable Trigger" &&
      node.data.trigger_Name !== "Card Slider"
    ) {
      const connectedNode = findConnectedNode(node, edges, nodes);
      if (connectedNode && checkActivationCondition(connectedNode)) {
        activateNode(connectedNode, nodes, edges, visitedNodes);
      }
    }
  };

  // Function to handle the "First visit on site" trigger
  const handleFirstVisit = (node, nodes, edges, visitedNodes) => {
    const connectedNode = findConnectedNode(node, edges, nodes);
    if (connectedNode) {
      activateNode(connectedNode, nodes, edges, visitedNodes);
    }
  };

  // Function to handle the "Send a response" trigger
  const handleSendResponse = (node) => {
    Object.values(node.data.message).map((msg) => {
      setChatMessages((prevMessages) => [...prevMessages, msg]);
      // if (
      //   node.data.connections.leftTarget != Cookies.get("FirstVisitNodeID") &&
      //   msg.responseText
      // ) {
      //   // addBotMsgs(msg.responseText);
      // } else {
      //   Cookies.set("SecondInitialNode", node.id, { expires: 3 });
      // }
    });
  };

  // Function to handle the "Decision (Buttons)" trigger
  const handleDecisionButtons = (node, nodes, edges) => {
    const decisionMessage = {
      ...node.data.message,
      nodeId: node.id,
    };
    // if (node.data.connections.leftTarget != Cookies.get("SecondInitialNode")) {
    //  addBotMsgs(node.data.message.responseText);
    // }
    setChatMessages((prevMessages) => [...prevMessages, decisionMessage]);

    // In this function, we do not activate connected nodes automatically
    // Instead, they are activated based on user decision
  };

  // this function is used for activate next node based of user inputs
  const handleUserDecision = (nextNodeId, userInputValue) => {
    setChatMessages((prevMsgs) => [
      ...prevMsgs,
      { userTrigger: userInputValue, myself: false },
    ]);
    // setTimeout(() => {
    //   addMsg(userInputValue);
    // }, 500);
    //console.log("nextNodeIdActivated", nextNodeId);
    // Find the connected node using the source ID
    const connectedNode = nodes.find((n) => n.id === nextNodeId);
    if (!connectedNode) {
      console.error(`Node with ID "${nextNodeId}" not found in nodes.`);
      return;
    }
    // console.log(connectedNode);
    // Activate the connected node
    activateNode(connectedNode, nodes, edges, new Set());
  };

  // Function to handle "Questionable Trigger"
  const handleQuestionableTrigger = (node, nodes, edges) => {
    // console.log(node.data.message.validationType);
    if (
      node.data.message.validationType == "Email" &&
      isValueInCookies("widget_user_email")
    ) {
      const email = Cookies.get("widget_user_email");
      setChatMessages((prevMsgs) => [
        ...prevMsgs,
        {
          responseText:
            "📧 We have your email on file. Connecting you now. Please wait",
          myself: true,
        },
      ]);

      handleUserDecision(node?.data?.connections?.leftSource, email);
    } else {
      const questionableMessage = {
        ...node.data.message,
        nodeId: node.id,
      };

      // console.log("questionableMessage", questionableMessage);
      setChatMessages((prevMessages) => [...prevMessages, questionableMessage]);
    }
  };

  const questionableTUserInteraction = (value) => {
    if (inputTagConfig.validationType == "Email" && isValidEmail(value)) {
      // console.log("email is verify");
      Cookies.set("widget_user_email", value, { expires: 3 });
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else if (inputTagConfig.validationType == "Name" && isValidName(value)) {
      // console.log("Name is correct");
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else if (
      inputTagConfig.validationType == "Phone Number" &&
      isValidPhoneNumber(value)
    ) {
      console.log("Phone number is valid");
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else {
      if (validationFailedAttempt == inputTagConfig?.retryAttempts - 1) {
        setFullViewActiveEntity({ active: "validationForm", data: {} });
      }

      setValidationFailedAttempt((prevVFA) => prevVFA + 1);
      setChatMessages((prevMsgs) => [
        ...prevMsgs,
        { userTrigger: value, myself: false },
        { responseText: inputTagConfig.errorMessage },
      ]);
    }
  };

  //handle Chat With Assistant Trigger Logic
  const hadleChatWithAssistantTrigger = (node, nodes, edges) => {
    // const userExists = Cookies.get("widget_user_email");
    // console.log("userExists", userExists);

    setAssitWaitingTimerData((prevAWTD) => ({
      ...prevAWTD,
      time: node.data.message,
      status: true,
    }));
    setChatMode("liveChat");
    const userEmailId = Cookies.get("widget_user_email");
    if (userEmailId) {
      //this function is initiate live chat process like get user location and check user is already there or not and then continue chat
      getLocation(userEmailId, "live");
    }
  };

  // handle Card Slider trigger
  const handleCardSliderTrigger = (node, nodes, edges) => {
    const response = STConvertDataFormat(node?.data?.message);
    // console.log(response);
    setChatMessages((prevMsgs) => [
      ...prevMsgs,
      { ...response, nodeId: node?.id },
    ]);
  };

  //handle custom form trigger
  const handleCustomFormsTrigger = (node, nodes, edges) => {
    setFullViewActiveEntity({
      active: "customForms",
      data: node?.data?.message,
    });
  };

  //handle disable text input
  const handleDisableTextInputTrigger = (node, nodes, edges) => {
    setEnableTextInput(false);
  };

  //handle enable text input
  const handleEnableTextInputTrigger = (node, nodes, edges) => {
    setEnableTextInput(true);
  };

  //handle for find connected node to subtrigger
  const findSubtriggerConnectedNode = (parentNodeId, triggerValue) => {
    const matchingEdge = edges.find(
      (edge) => edge.source == parentNodeId && edge.label == triggerValue
    );
    //console.log("matchingEdge", matchingEdge);
    if (matchingEdge) {
      return matchingEdge.target;
    }

    return null;
  };

  // handle User
  // Function to find a connected node
  const findConnectedNode = (node, edges, nodes) => {
    const edge = edges.find((e) => e.source === node.id);
    return edge ? nodes.find((n) => n.id === edge.target) : null;
  };

  const handleCloseForm = (closeBtn) => {
    setInputTagConfig((prevITC) => ({
      ...prevITC,
      status: false,
      type: "text",
      placeholder: "Type your message",
      trigger_Name: "",
      validationType: "",
    }));
    setValidationFailedAttempt(0);
    setFullViewActiveEntity({ active: "chatsAndForm", data: {} });
    setChatMode("botChat");
    if (closeBtn) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          myself: false,
          userTrigger: "Form submission canceled.",
        },
        {
          myself: true,
          responseText:
            "Thank you for your interest! 🌟 Feel free to continue the conversation.",
        },
      ]);

      setTimeout(() => {
        addMsg("Form submission canceled.");
        addBotMsgs(
          "Thank you for your interest! 🌟 Feel free to continue the conversation."
        );
      }, 500);
    }
  };

  useEffect(() => {
    if (adminId) {
      getTriggersData(adminId);
    }
  }, [adminId]);

  // useEffect(() => {
  //   console.log("chatMessages", chatMessages);
  // }, [chatMessages]);

  return (
    <TriggersContext.Provider
      value={{
        handleUserDecision,
        nodes,
        edges,
        questionableTUserInteraction,
        handleCloseForm,
        findSubtriggerConnectedNode,
        outOfFlowData,
      }}
    >
      {children}
    </TriggersContext.Provider>
  );
}
