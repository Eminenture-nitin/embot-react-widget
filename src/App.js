import React, { useEffect, useRef } from "react";
import { twind, cssom, observe } from "@twind/core";
import "construct-style-sheets-polyfill";
import config from "./twind.config"; // Ensure correct path
import ReactDOM from "react-dom";
import BOTParentComponent from "./components/BOTParentComponent";
import { AdminCredentialsProvided } from "./context/AdminCredentialsContext";
import { GlobalStatesProvider } from "./context/GlobalStatesContext";
import { SocketProvider } from "./context/SocketContext";
import { LiveChatProvider } from "./context/LiveChatContext";
import { TriggersContextProvider } from "./context/TriggersDataContext";

const App = () => {
  const shadowHostRef = useRef(null);

  useEffect(() => {
    const shadowRoot = shadowHostRef.current.attachShadow({ mode: "open" });

    // Create a separate CSSStyleSheet
    const sheet = cssom(new CSSStyleSheet());

    // Use sheet and config to create a twind instance
    const tw = twind(config, sheet);

    // Link the sheet target to the shadow root
    shadowRoot.adoptedStyleSheets = [sheet.target];

    // Apply styles with observe function
    observe(tw, shadowRoot);

    // Render components inside shadow DOM
    const div = document.createElement("div");
    shadowRoot.appendChild(div);

    ReactDOM.render(
      <AdminCredentialsProvided>
        <GlobalStatesProvider>
          <SocketProvider>
            <LiveChatProvider>
              <TriggersContextProvider>
                <BOTParentComponent />
              </TriggersContextProvider>
            </LiveChatProvider>
          </SocketProvider>
        </GlobalStatesProvider>
      </AdminCredentialsProvided>,
      div
    );

    // Cleanup on component unmount
    return () => {
      ReactDOM.unmountComponentAtNode(div);
    };
  }, []);

  return <div ref={shadowHostRef}></div>;
};

export default App;
