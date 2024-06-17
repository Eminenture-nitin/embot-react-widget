// src/App.js
import { useEffect, useState } from "react";
import ChatBotWidget from "./components/ChatBotWidget";

function App() {
  const [showWidget, setShowWidget] = useState(false);
  const adminId = "admin123"; // Hardcoded adminId, in reality, you may fetch this from an API or use props

  useEffect(() => {
    // Initialize chatbot with the adminId
    console.log(`Initializing chatbot for admin: ${adminId}`);
    // Fetch and setup chatbot data based on adminId (if necessary)
  }, [adminId]);

  return (
    <div>
      <button
        onClick={() => setShowWidget(!showWidget)}
        className="EMBOT-fixed EMBOT-bottom-4 EMBOT-right-4 EMBOT-inline-flex EMBOT-items-center EMBOT-justify-center EMBOT-text-sm EMBOT-font-medium EMBOT-disabled:pointer-events-none EMBOT-disabled:opacity-50 EMBOT-border EMBOT-rounded-full EMBOT-w-16 EMBOT-h-16 EMBOT-bg-black EMBOT-hover:bg-gray-700 EMBOT-m-0 EMBOT-cursor-pointer EMBOT-border-gray-200 EMBOT-bg-none EMBOT-p-0 EMBOT-normal-case EMBOT-leading-5 EMBOT-hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={40}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="EMBOT-text-white EMBOT-block EMBOT-border-gray-200 EMBOT-align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="EMBOT-border-gray-200"
          ></path>
        </svg>
      </button>
      {showWidget && <ChatBotWidget adminId={adminId} />}
    </div>
  );
}

export default App;
