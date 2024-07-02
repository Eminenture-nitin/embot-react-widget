

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
  const [firstVisitNodeId, setFirstVisiteNodeId] = useState("");
  const { socket } = useSocket();
  const [validationFailedAttempt, setValidationFailedAttempt] = useState(0);
  const {
    setInputTagConfig,
    setAssitWaitingTimerData,
    inputTagConfig,
    setFullViewActiveEntity,
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
        console.log(res.data);
        setNodes(res.data.nodes);
        setEdges(res.data.edges);
        startChatbot(res.data.nodes, res.data.edges);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to get old messages
  const getOldMessages = async () => {
    try {
      // Add message to database via axios
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/live/getmsg`,
        {
          to: Cookies.get("widget_user_id"),
        }
      );
      if (response.data.status === "success") {
        console.log(response.data);
        response.data.projectMessages.map((msg) => {
          if (msg.myself == false) {
            setChatMessages((prevMsgs) => [
              ...prevMsgs,
              {
                userTrigger: msg.message,
                myself: msg.myself,
                quickInquiryFromData: msg.quickInquiryFromData,
                responsesData: msg.responsesData,
                type: msg.type,
                imageURL: msg.attachmentFile,
              },
            ]);
          } else {
            setChatMessages((prevMsgs) => [
              ...prevMsgs,
              {
                responseText: msg.message,
                myself: msg.myself,
                quickInquiryFromData: msg.quickInquiryFromData,
                responsesData: msg.responsesData,
                type: msg.type,
                imageURL: msg.attachmentFile,
              },
            ]);
          }
        });
      } else {
        // toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error adding bot message:", error);
    }
  };

  // Function to start the chatbot
  const startChatbot = (nodes, edges) => {
    const userId = Cookies.get("widget_user_id");
    if (userId) {
      // User is already registered, get old messages
      getOldMessages(userId);
    } else {
      // User is not registered, proceed with initial triggers
      const visitedNodes = new Set();
      nodes.forEach((node) => {
        if (
          node.data.triggerType === "triggers" &&
          node.data.trigger_Name === "First visit on site"
        ) {
          activateNode(node, nodes, edges, visitedNodes);
        }
      });
    }
  };

  // Function to activate a node
  const activateNode = (node, nodes, edges, visitedNodes) => {
    if (visitedNodes.has(node.id)) return;
    visitedNodes.add(node.id);
    // console.log("active", node);
    if (node.data.trigger_Name == "First visit on site") {
      setFirstVisiteNodeId(node.id);
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
      // Add more cases for different trigger names
      default:
        console.log(`Unknown trigger: ${node.data.trigger_Name}`);
    }

    if (
      node.data.trigger_Name !== "Decision (Buttons)" &&
      node.data.trigger_Name !== "Questionable Trigger"
    ) {
      const connectedNode = findConnectedNode(node, edges, nodes);
      if (connectedNode && checkActivationCondition(connectedNode)) {
        activateNode(connectedNode, nodes, edges, visitedNodes);
      }
    }
  };

  // Function to handle the "First visit on site" trigger
  const handleFirstVisit = (node, nodes, edges, visitedNodes) => {
    setFirstVisiteNodeId(node.id);
    const connectedNode = findConnectedNode(node, edges, nodes);
    if (connectedNode) {
      activateNode(connectedNode, nodes, edges, visitedNodes);
    }
  };

  // Function to handle the "Send a response" trigger
  const handleSendResponse = (node) => {
    const messages = Object.values(node.data.message).map((msg) => msg);
    setChatMessages((prevMessages) => [...prevMessages, ...messages]);

    if (node.data.connections.leftTarget == firstVisitNodeId) {
      console.log("Yes");
    }
  };

  // Function to handle the "Decision (Buttons)" trigger
  const handleDecisionButtons = (node, nodes, edges) => {
    const decisionMessage = {
      ...node.data.message,
      nodeId: node.id,
    };
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
    setTimeout(() => {
      addMsg(userInputValue);
    }, 500);
    console.log("nextNodeIdActivated", nextNodeId);
    // Find the connected node using the source ID
    const connectedNode = nodes.find((n) => n.id === nextNodeId);
    if (!connectedNode) {
      console.error(`Node with ID "${nextNodeId}" not found in nodes.`);
      return;
    }
    console.log(connectedNode);
    // Activate the connected node
    activateNode(connectedNode, nodes, edges, new Set());
  };

  // Function to handle "Questionable Trigger"
  const handleQuestionableTrigger = (node, nodes, edges) => {
    console.log(node.data.message.validationType);
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
      setTimeout(() => {
        addBotMsgs(
          "📧 We have your email on file. Connecting you now. Please wait"
        );
      }, 500);
      handleUserDecision(node?.data?.connections?.leftSource, email);
    } else {
      const questionableMessage = {
        ...node.data.message,
        nodeId: node.id,
      };

      console.log("questionableMessage", questionableMessage);
      setChatMessages((prevMessages) => [...prevMessages, questionableMessage]);
    }
  };

  const questionableTUserInteraction = (value) => {
    if (inputTagConfig.validationType == "Email" && isValidEmail(value)) {
      console.log("email is verify");
      Cookies.set("widget_user_email", value, { expires: 3 });
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else if (inputTagConfig.validationType == "Name" && isValidName(value)) {
      console.log("Name is correct");
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else if (
      inputTagConfig.validationType == "Phone Number" &&
      isValidPhoneNumber(value)
    ) {
      console.log("Phone number is valid");
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else {
      if (validationFailedAttempt == inputTagConfig?.retryAttempts - 1) {
        setFullViewActiveEntity("validationForm");
      }
      setValidationFailedAttempt((prevVFA) => prevVFA + 1);
      setChatMessages((prevMsgs) => [
        ...prevMsgs,
        { userTrigger: value, myself: false },
      ]);

      setChatMessages((prevMsgs) => [
        ...prevMsgs,
        { responseText: inputTagConfig.errorMessage },
      ]);
    }
  };

  //hadle Chat With Assistant Trigger Logic
  const hadleChatWithAssistantTrigger = (node, nodes, edges) => {
    setAssitWaitingTimerData((prevAWTD) => ({
      ...prevAWTD,
      time: node.data.message,
      status: true,
    }));
    setChatMode("liveChat");

    const userEmailId = Cookies.get("widget_user_email");
    if (userEmailId) {
      //this function is initiate live chat process like get user location and check user is already there or not and then continue chat
      getLocation(userEmailId);
    }
  };

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
    setFullViewActiveEntity("chatsAndForm");
    setChatMode("botChat");
    if (closeBtn) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          myself: false,
          userTrigger: "Form submission canceled.",
        },
        {
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
    getTriggersData("650d432aa0570859518c23a1");
  }, []);

  useEffect(() => {
    console.log("chatMessages", chatMessages);
  }, [chatMessages]);

  return (
    <TriggersContext.Provider
      value={{
        handleUserDecision,
        nodes,
        edges,
        questionableTUserInteraction,
        handleCloseForm,
      }}
    >
      {children}
    </TriggersContext.Provider>
  );
}
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

// TriggersContext context
const TriggersContext = createContext();

// Custom hook to access the TriggersContext state
export function useTriggersContextData() {
  return useContext(TriggersContext);
}

// List of trigger phrases
const triggerText = [
  "chat",
  "live chat",
  "live",
  "chat with assistant",
  "assistant",
  "contact",
  "want to connect with person",
  "want to connect live assistant",
  "Want to connect with us?",
  "Live support",
  "Get assistance",
  "Live help",
  "Alternatively, you can reach out to us via live chat.",
  "Need help? Chat",
];

// TriggersContext component
export function TriggersContextProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [firstVisitNodeId, setFirstVisiteNodeId] = useState("");
  const { socket } = useSocket();
  const [validationFailedAttempt, setValidationFailedAttempt] = useState(0);
  const {
    setInputTagConfig,
    setAssitWaitingTimerData,
    inputTagConfig,
    setFullViewActiveEntity,
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
        console.log(res.data);
        setNodes(res.data.nodes);
        setEdges(res.data.edges);
        startChatbot(res.data.nodes, res.data.edges);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to get old messages
  const getOldMessages = async () => {
    try {
      // Add message to database via axios
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/live/getmsg`,
        {
          to: Cookies.get("widget_user_id"),
        }
      );
      if (response.data.status === "success") {
        console.log(response.data);
        response.data.projectMessages.map((msg) => {
          if (msg.myself == false) {
            setChatMessages((prevMsgs) => [
              ...prevMsgs,
              {
                userTrigger: msg.message,
                myself: msg.myself,
                quickInquiryFromData: msg.quickInquiryFromData,
                responsesData: msg.responsesData,
                type: msg.type,
                imageURL: msg.attachmentFile,
              },
            ]);
          } else {
            setChatMessages((prevMsgs) => [
              ...prevMsgs,
              {
                responseText: msg.message,
                myself: msg.myself,
                quickInquiryFromData: msg.quickInquiryFromData,
                responsesData: msg.responsesData,
                type: msg.type,
                imageURL: msg.attachmentFile,
              },
            ]);
          }
        });
      } else {
        // toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error adding bot message:", error);
    }
  };

  // Function to start the chatbot
  const startChatbot = (nodes, edges) => {
    const userId = Cookies.get("widget_user_id");
    if (userId) {
      // User is already registered, get old messages
      getOldMessages(userId);
    } else {
      // User is not registered, proceed with initial triggers
      const visitedNodes = new Set();
      nodes.forEach((node) => {
        if (
          node.data.triggerType === "triggers" &&
          node.data.trigger_Name === "First visit on site"
        ) {
          activateNode(node, nodes, edges, visitedNodes);
        }
      });
    }
  };

  // Function to activate a node
  const activateNode = (node, nodes, edges, visitedNodes) => {
    if (visitedNodes.has(node.id)) return;
    visitedNodes.add(node.id);
    // console.log("active", node);
    if (node.data.trigger_Name == "First visit on site") {
      setFirstVisiteNodeId(node.id);
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
      // Add more cases for different trigger names
      default:
        console.log(`Unknown trigger: ${node.data.trigger_Name}`);
    }

    if (
      node.data.trigger_Name !== "Decision (Buttons)" &&
      node.data.trigger_Name !== "Questionable Trigger"
    ) {
      const connectedNode = findConnectedNode(node, edges, nodes);
      if (connectedNode && checkActivationCondition(connectedNode)) {
        activateNode(connectedNode, nodes, edges, visitedNodes);
      }
    }
  };

  // Function to handle the "First visit on site" trigger
  const handleFirstVisit = (node, nodes, edges, visitedNodes) => {
    setFirstVisiteNodeId(node.id);
    const connectedNode = findConnectedNode(node, edges, nodes);
    if (connectedNode) {
      activateNode(connectedNode, nodes, edges, visitedNodes);
    }
  };

  // Function to handle the "Send a response" trigger
  const handleSendResponse = (node) => {
    const messages = Object.values(node.data.message).map((msg) => msg);
    setChatMessages((prevMessages) => [...prevMessages, ...messages]);

    if (node.data.connections.leftTarget == firstVisitNodeId) {
      console.log("Yes");
    }
  };

  // Function to handle the "Decision (Buttons)" trigger
  const handleDecisionButtons = (node, nodes, edges) => {
    const decisionMessage = {
      ...node.data.message,
      nodeId: node.id,
    };
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
    setTimeout(() => {
      addMsg(userInputValue);
    }, 500);
    console.log("nextNodeIdActivated", nextNodeId);
    // Find the connected node using the source ID
    const connectedNode = nodes.find((n) => n.id === nextNodeId);
    if (!connectedNode) {
      console.error(`Node with ID "${nextNodeId}" not found in nodes.`);
      return;
    }
    console.log(connectedNode);
    // Activate the connected node
    activateNode(connectedNode, nodes, edges, new Set());
  };

  // Function to handle "Questionable Trigger"
  const handleQuestionableTrigger = (node, nodes, edges) => {
    console.log(node.data.message.validationType);
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
      setTimeout(() => {
        addBotMsgs(
          "📧 We have your email on file. Connecting you now. Please wait"
        );
      }, 500);
      handleUserDecision(node?.data?.connections?.leftSource, email);
    } else {
      const questionableMessage = {
        ...node.data.message,
        nodeId: node.id,
      };

      console.log("questionableMessage", questionableMessage);
      setChatMessages((prevMessages) => [...prevMessages, questionableMessage]);
    }
  };

  const questionableTUserInteraction = (value) => {
    if (inputTagConfig.validationType == "Email" && isValidEmail(value)) {
      console.log("email is verify");
      Cookies.set("widget_user_email", value, { expires: 3 });
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else if (inputTagConfig.validationType == "Name" && isValidName(value)) {
      console.log("Name is correct");
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else if (
      inputTagConfig.validationType == "Phone Number" &&
      isValidPhoneNumber(value)
    ) {
      console.log("Phone number is valid");
      handleUserDecision(inputTagConfig.nextNodeId, value);
    } else {
      if (validationFailedAttempt == inputTagConfig?.retryAttempts - 1) {
        setFullViewActiveEntity("validationForm");
      }
      setValidationFailedAttempt((prevVFA) => prevVFA + 1);
      setChatMessages((prevMsgs) => [
        ...prevMsgs,
        { userTrigger: value, myself: false },
      ]);

      setChatMessages((prevMsgs) => [
        ...prevMsgs,
        { responseText: inputTagConfig.errorMessage },
      ]);
    }
  };

  //hadle Chat With Assistant Trigger Logic
  const hadleChatWithAssistantTrigger = (node, nodes, edges) => {
    setAssitWaitingTimerData((prevAWTD) => ({
      ...prevAWTD,
      time: node.data.message,
      status: true,
    }));
    setChatMode("liveChat");

    const userEmailId = Cookies.get("widget_user_email");
    if (userEmailId) {
      //this function is initiate live chat process like get user location and check user is already there or not and then continue chat
      getLocation(userEmailId);
    }
  };

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
    setFullViewActiveEntity("chatsAndForm");
    setChatMode("botChat");
    if (closeBtn) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          myself: false,
          userTrigger: "Form submission canceled.",
        },
        {
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
  // Function to handle user input and activate triggers based on intent
  const handleUserInput = (userInput) => {
    const lowerCasedInput = userInput.toLowerCase();

    // Intent keywords mapping
    const intentKeywords = {
      "Chat with Assistant": [
        "chat",
        "live chat",
        "live",
        "assistant",
        "contact",
        "connect with us",
        "live support",
        "get assistance",
        "live help",
        "need help",
      ],
      // Add more intents and keywords as needed
    };

    // Function to match user input with intents
    const matchIntent = (input, keywords) => {
      return keywords.some((keyword) => input.includes(keyword));
    };

    // Find matching node based on user input
    const matchingNode = nodes.find((node) => {
      if (node.data && node.data.message && node.data.message.responseText) {
        const intent = node.data.message.responseText.trim();
        if (intentKeywords[intent]) {
          return matchIntent(lowerCasedInput, intentKeywords[intent]);
        }
      }
      return false;
    });

    // Activate matching node if found
    if (matchingNode) {
      activateNode(matchingNode, nodes, edges, new Set());
    } else {
      // Handle default 'not understood' response if no intent matches
      console.log("No matching intent found for user input:", userInput);
      // setChatMessages((prevMsgs) => [
      //   ...prevMsgs,
      //   { responseText: "Sorry, I didn't understand that." },
      // ]);
    }
  };
  useEffect(() => {
    getTriggersData("650d432aa0570859518c23a1");
  }, []);

  useEffect(() => {
    console.log("chatMessages", chatMessages);
  }, [chatMessages]);

  return (
    <TriggersContext.Provider
      value={{
        handleUserDecision,
        nodes,
        edges,
        questionableTUserInteraction,
        handleCloseForm,
        handleUserInput, // Expose handleUserInput in context
      }}
    >
      {children}
    </TriggersContext.Provider>
  );
}
