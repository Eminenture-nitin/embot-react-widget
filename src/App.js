// src/App.js
import { useEffect, useState } from "react";
import ChatBotWidget from "./components/ChatBotWidget";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAdminCredentials } from "./context/AdminCredentialsContext";

function App() {
  const [showWidget, setShowWidget] = useState(false);
  const { theme } = useAdminCredentials();

 

  return (
    <div>
      <button
        style={{
          backgroundImage: theme
            ? theme
            : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
        onClick={() => setShowWidget(!showWidget)}
        className="EMBOT-fixed EMBOT-bottom-4 EMBOT-right-4 EMBOT-inline-flex EMBOT-items-center EMBOT-justify-center EMBOT-text-sm EMBOT-font-medium EMBOT-disabled:pointer-events-none EMBOT-disabled:opacity-50 EMBOT-border EMBOT-rounded-full EMBOT-w-16 EMBOT-h-16 EMBOT-bg-black EMBOT-hover:bg-gray-700 EMBOT-m-0 EMBOT-cursor-pointer EMBOT-border-gray-200 EMBOT-bg-none EMBOT-p-0 EMBOT-normal-case EMBOT-leading-5 EMBOT-hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
      >
        <Icon
          icon="fluent:chat-empty-24-regular"
          className="EMBOT-w-9 EMBOT-h-9 EMBOT-text-white EMBOT-block EMBOT-border-gray-200 EMBOT-align-middle"
        />
      </button>

      {showWidget && <ChatBotWidget />}
    </div>
  );
}

export default App;
