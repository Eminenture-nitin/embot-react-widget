import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalStatesContext = createContext();

export function useGlobalStatesContext() {
  return useContext(GlobalStatesContext);
}

// GlobalStatesContext component
export function GlobalStatesProvider({ children }) {
  const [fullViewActiveEntity, setFullViewActiveEntity] =
    useState("chatsAndForm");
  //chatsAndForm
  //assistantWaitingForm
  //validationForm

  const [assitWaitingTimerData, setAssitWaitingTimerData] = useState({
    time: {},
    status: false,
  });
  const [inputTagConfig, setInputTagConfig] = useState({
    status: false,
    type: "text",
    placeholder: "Type your message",
    trigger_Name: "",
    validationType: "",
    nextNodeId: "",
  });

  return (
    <GlobalStatesContext.Provider
      value={{
        assitWaitingTimerData,
        setAssitWaitingTimerData,
        inputTagConfig,
        setInputTagConfig,
        fullViewActiveEntity,
        setFullViewActiveEntity,
      }}
    >
      {children}
    </GlobalStatesContext.Provider>
  );
}
