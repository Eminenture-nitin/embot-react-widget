import React, { createContext, useContext, useEffect, useState } from "react";
import { isValueInCookies } from "../utils/validations";

const GlobalStatesContext = createContext();

export function useGlobalStatesContext() {
  return useContext(GlobalStatesContext);
}

// GlobalStatesContext component
export function GlobalStatesProvider({ children }) {
  const [fullViewActiveEntity, setFullViewActiveEntity] = useState({
    active: "chatsAndForm",
    data: {},
  });
  //chatsAndForm
  //assistantWaitingForm
  //validationForm
  //customForms
  const [enableTextInput, setEnableTextInput] = useState(true);
  const [takingEmailId, setTakingEmailId] = useState(false);

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

  const [userRegistered, setUserRegistered] = useState(false);

  useEffect(() => {
    if (isValueInCookies("widget_user_email")) {
      setUserRegistered(true);
    }
  }, [userRegistered]);

  return (
    <GlobalStatesContext.Provider
      value={{
        assitWaitingTimerData,
        setAssitWaitingTimerData,
        inputTagConfig,
        setInputTagConfig,
        fullViewActiveEntity,
        setFullViewActiveEntity,
        enableTextInput,
        setEnableTextInput,
        userRegistered,
        setUserRegistered,
        takingEmailId,
        setTakingEmailId,
      }}
    >
      {children}
    </GlobalStatesContext.Provider>
  );
}
