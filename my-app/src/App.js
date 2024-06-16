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
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          width={30}
          height={40}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>
      {showWidget && <ChatBotWidget adminId={adminId} />}
    </div>
  );
}

export default App;
