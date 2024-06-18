import React, { useEffect, useState } from "react";
import Response from "./ChatComponents/Response";

const ChatContainer = () => {
  const [chattingData, setChattingData] = useState([]);
  const getTriggersData = async (userId, user__id) => {
    fetch(
      `http://localhost:8080/auth/getNodeAndEdgesWidget/650d432aa0570859518c23a1`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("res", res.data);
        console.log(data, "datawidget");
        processChatbotData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function processChatbotData(data) {
    // Helper function to find a node by ID
    function findNodeById(id) {
      return data.nodes.find((node) => node.id === id);
    }

    // Function to process a node
    function processNode(node) {
      const { triggerType, message, trigger_Name, decisiontrigger } = node.data;

      if (
        triggerType === "triggers" &&
        trigger_Name === "First visit on site"
      ) {
        console.log("First visit trigger activated");
        return getNextNodes(node.id);
      } else if (
        triggerType === "actions" &&
        trigger_Name == "Send a response"
      ) {
        console.log("Action:", message);
        const newArray = Object.values(message);
        setChattingData(newArray);
        return getNextNodes(node.id);
      } else if (triggerType === "actions" && decisiontrigger === "true") {
        console.log("Decision required");
        return getNextNodes(node.id);
      } else {
        console.warn("Unknown trigger type:", triggerType);
        return [];
      }
    }

    // Function to get nodes connected to a given node
    function getNextNodes(nodeId) {
      const connectedNodes = [];
      const edgesFromNode = data.edges.filter((edge) => edge.source === nodeId);
      edgesFromNode.forEach((edge) => {
        const targetNode = findNodeById(edge.target);
        if (targetNode) {
          connectedNodes.push(targetNode);
        }
      });
      return connectedNodes;
    }

    // Main function logic
    const initialTriggerNode = data.nodes.find(
      (node) =>
        node.data.triggerType === "triggers" &&
        node.data.trigger_Name === "First visit on site"
    );
    if (!initialTriggerNode) {
      console.error("Initial trigger node not found");
      return;
    }

    let currentNodes = [initialTriggerNode];
    while (currentNodes.length > 0) {
      const nextNodes = [];
      currentNodes.forEach((node) => {
        const nodesToProcess = processNode(node);
        nextNodes.push(...nodesToProcess);
      });
      currentNodes = nextNodes;
    }
  }
  useEffect(() => {
    getTriggersData();
  }, []);
  console.log(chattingData);
  return (
    <div
      style={{ height: "calc(100% - 160px)", maxHeight: "calc(100% - 160px)" }}
      className="EMBOT-pr-4 EMBOT-p-6 EMBOT-overflow-y-auto EMBOT-flex-1 EMBOT-min-h-[167px] scroll-smooth focus:scroll-auto"
    >
      {chattingData?.map((elem, index) => (
        <div key={index} className="EMBOT-w-full EMBOT-min-h-fit">
          <div>
            <Response response={elem} index={index} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
