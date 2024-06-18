// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";

// // TriggersContext context
// const TriggersContext = createContext();

// //custom hook to access the TriggersContext state
// export function useTriggersContextData() {
//   return useContext(TriggersContext);
// }

// // TriggersContext component
// export function TriggersContextProvider({ children }) {
//   const [triggersData, setTriggersData] = useState([]);
//   const [chatMessages, setChatMessages] = useState([]);

//   //getTriggersData function
//   const getTriggersData = (adminId) => {
//     axios
//       .get(
//         `http://localhost:8080/auth/getNodeAndEdgesWidget/650d432aa0570859518c23a1`
//       )
//       .then((res) => {
//         console.log(res, "res context");
//         setTriggersData(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // Sample User ID Check Function
//   function isFirstVisit(userId) {
//     // Logic to check if user ID exists
//     // Return true if it's the first visit, false otherwise
//     // For example, let's assume a function checkUserId(userId) that returns a boolean
//     return !checkUserId(userId);
//   }

//   // Function to Activate Node
//   function activateNode(nodeId) {
//     let node = getNodeById(nodeId); // Function to get node by ID
//     if (!node) return;

//     switch (node.type) {
//       case "triggerComponent":
//         if (
//           node.data.triggerType === "triggers" &&
//           node.data.trigger_Name === "First visit on site"
//         ) {
//           handleFirstVisitTrigger(node);
//         } else {
//           handleTrigger(node);
//         }
//         break;
//       case "actionComponent":
//         if (
//           node.data.triggerType === "actions" &&
//           node.data.trigger_Name === "Send Message"
//         ) {
//           handleSendMessageAction(node);
//         } else {
//           handleAction(node);
//         }
//         break;
//       case "decisionComponent":
//         if (
//           node.data.triggerType === "actions" &&
//           node.data.trigger_Name === "Decision (Buttons)"
//         ) {
//           handleDecisionButtons(node);
//         } else {
//           handleDecision(node);
//         }
//         break;
//       default:
//         console.log("Unknown node type");
//     }
//   }

//   // Handle First Visit Trigger Node
//   function handleFirstVisitTrigger(node) {
//     // Add message to chat
//     chatMessages.push({ text: "First visit on site" });

//     // Activate connected node
//     let nextNodeId = node.data.connections.leftSource;
//     activateNode(nextNodeId);
//   }

//   // Handle Send Message Action Node
//   function handleSendMessageAction(node) {
//     if (node.data.message) {
//       // Add response text to chat
//       for (let key in node.data.message) {
//         if (node.data.message[key].responseText) {
//           chatMessages.push({ text: node.data.message[key].responseText });
//         }
//         if (node.data.message[key].imageURL) {
//           chatMessages.push({ imageUrl: node.data.message[key].imageURL });
//         }
//         if (node.data.message[key].label && node.data.message[key].url) {
//           chatMessages.push({
//             label: node.data.message[key].label,
//             url: node.data.message[key].url,
//           });
//         }
//       }
//     }

//     // Activate connected node
//     let nextNodeId = node.data.connections.leftSource;
//     activateNode(nextNodeId);
//   }

//   // Handle Decision Buttons Node
//   function handleDecisionButtons(node) {
//     // Add decision message to chat
//     chatMessages.push({
//       text: node.data.message.responseText,
//       buttons: node.data.message.subTriggers,
//     });

//     // Based on user input, activate next node
//     let userResponse = getUserResponse(); // Assume function to get user response
//     if (userResponse === "Yes please, connect") {
//       let nextNodeId = node.data.connections.rightSource;
//       activateNode(nextNodeId);
//     } else {
//       let nextNodeId = node.data.connections.leftSource;
//       activateNode(nextNodeId);
//     }
//   }

//   // Handle Other Trigger Nodes
//   function handleTrigger(node) {
//     // Logic for other trigger nodes
//   }

//   // Handle Other Action Nodes
//   function handleAction(node) {
//     // Logic for other action nodes
//   }

//   // Handle Other Decision Nodes
//   function handleDecision(node) {
//     // Logic for other decision nodes
//   }

//   // Sample Function to Get Node by ID
//   function getNodeById(nodeId) {
//     // Logic to get node by ID from the data structure
//     return nodes.find((node) => node.id === nodeId);
//   }

//   // Sample Function to Check User ID
//   function checkUserId(userId) {
//     // Logic to check if user ID exists
//     // For this example, assume it returns false (i.e., user is visiting for the first time)
//     return false;
//   }

//   // Sample Function to Get User Response (Simulated)
//   function getUserResponse() {
//     // Simulated user response for the example
//     return "Yes please, connect"; // or 'Not Yet'
//   }

//   // Initial Node Activation Function
//   function startChatbot(userId, nodesArray, edgesArray) {
//     // Set global nodes and edges
//     nodes = nodesArray;
//     edges = edgesArray;

//     // Check if it's the first visit
//     if (isFirstVisit(userId)) {
//       activateNode("06787fc5-7a23-4811-be5b-cae72a1c2c4c"); // ID of the first trigger node
//     }
//   }

//   // Example usage of startChatbot function
//   let userId = "someUserId"; // Assume this is provided
//   startChatbot(userId, nodes, edges);

//   useEffect(() => {
//     getTriggersData();
//   }, []);
//   return (
//     <TriggersContext.Provider value={{ triggersData }}>
//       {children}
//     </TriggersContext.Provider>
//   );
// }
