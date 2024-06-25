import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from "../utils/validations";

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
  const [chatMessages, setChatMessages] = useState([]);
  const [validationFailedAttempt, setValidationFailedAttempt] = useState({
    status: false,
    count: 0,
  });
  const [inputTagConfig, setInputTagConfig] = useState({
    status: false,
    type: "text",
    placeholder: "Type your message",
    trigger_Name: "",
    validationType: "",
    nextNodeId: "",
  });

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

  // Function to start the chatbot
  const startChatbot = (nodes, edges) => {
    const visitedNodes = new Set();
    nodes.forEach((node) => {
      if (
        node.data.triggerType === "triggers" &&
        node.data.trigger_Name === "First visit on site"
      ) {
        activateNode(node, nodes, edges, visitedNodes);
      }
    });
  };

  // Function to activate a node
  const activateNode = (node, nodes, edges, visitedNodes) => {
    if (visitedNodes.has(node.id)) return;
    visitedNodes.add(node.id);
    console.log("active", node);
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
    const connectedNode = findConnectedNode(node, edges, nodes);
    if (connectedNode) {
      activateNode(connectedNode, nodes, edges, visitedNodes);
    }
  };

  // Function to handle the "Send a response" trigger
  const handleSendResponse = (node) => {
    const messages = Object.values(node.data.message).map((msg) => msg);
    setChatMessages((prevMessages) => [...prevMessages, ...messages]);
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
    const questionableMessage = {
      ...node.data.message,
      nodeId: node.id,
    };
    setChatMessages((prevMessages) => [...prevMessages, questionableMessage]);
  };

  const questionableTUserInteraction = (value) => {
    
    if (inputTagConfig.validationType == "Email" && isValidEmail(value)) {
      console.log("email is verify");
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
      setValidationFailedAttempt((prevVFA) => ({
        ...prevVFA,
        count: prevVFA.count + 1,
        status:
          prevVFA.count == inputTagConfig?.retryAttempts - 1 ? true : false,
      }));
      console.log(inputTagConfig.errorMessage);
      setChatMessages((prevMsgs) => [
        ...prevMsgs,
        { responseText: inputTagConfig.errorMessage },
      ]);
    }
  };

  //hadle Chat With Assistant Trigger Logic
  const hadleChatWithAssistantTrigger = (node, nodes, edges) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { responseText: "Please wait, our assistant is joining the chat" },
    ]);
  };

  // handle User
  // Function to find a connected node
  const findConnectedNode = (node, edges, nodes) => {
    const edge = edges.find((e) => e.source === node.id);
    return edge ? nodes.find((n) => n.id === edge.target) : null;
  };

  const handleCloseForm = () => {
    setInputTagConfig((prevITC) => ({
      ...prevITC,
      status: false,
      type: "text",
      placeholder: "Type your message",
      trigger_Name: "",
      validationType: "",
    }));
    setValidationFailedAttempt({
      status: false,
      count: 0,
    });
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
        chatMessages,
        setChatMessages,
        handleUserDecision,
        nodes,
        edges,
        inputTagConfig,
        setInputTagConfig,
        questionableTUserInteraction,
        validationFailedAttempt,
        setValidationFailedAttempt,
        handleCloseForm,
      }}
    >
      {children}
    </TriggersContext.Provider>
  );
}
