import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TriggersContextProvider } from "./context/TriggersDataContext";
import { AdminCredentialsProvided } from "./context/AdminCredentialsContext";
import { SocketProvider } from "./context/SocketContext";
import { LiveChatProvider } from "./context/LiveChatContext";
import { GlobalStatesProvider } from "./context/GlobalStatesContext";
const root = ReactDOM.createRoot(document.getElementById("EMChatBotRoot"));
root.render(
  <AdminCredentialsProvided>
    <GlobalStatesProvider>
      <SocketProvider>
        <LiveChatProvider>
          <TriggersContextProvider>
            <App />
          </TriggersContextProvider>
        </LiveChatProvider>
      </SocketProvider>
    </GlobalStatesProvider>
  </AdminCredentialsProvided>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
