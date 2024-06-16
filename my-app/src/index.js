import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ReactShadowRoot from "react-shadow-root";
import { useEffect, useState } from "react";
import ChatBotWidget from "./components/ChatBotWidget";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("EMChatBotRoot"));
root.render(<App />);

reportWebVitals();
