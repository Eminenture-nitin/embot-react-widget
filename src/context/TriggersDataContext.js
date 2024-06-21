import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [waitingForDecision, setWaitingForDecision] = useState(null);

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
      // Add more cases for different trigger names
      default:
        console.log(`Unknown trigger: ${node.data.trigger_Name}`);
    }

    // Automatically activate connected nodes for all triggers except "Decision (Buttons)"
    if (node.data.trigger_Name !== "Decision (Buttons)") {
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
    setWaitingForDecision(node);

    // In this function, we do not activate connected nodes automatically
    // Instead, they are activated based on user decision
  };
  const handleUserDecision = (nextNodeId) => {
    console.log(nextNodeId);
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

  // Function to find a connected node
  const findConnectedNode = (node, edges, nodes) => {
    const edge = edges.find((e) => e.source === node.id);
    return edge ? nodes.find((n) => n.id === edge.target) : null;
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
      }}
    >
      {children}
    </TriggersContext.Provider>
  );
}
