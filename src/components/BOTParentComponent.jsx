import { useEffect, useState } from "react";
import ChatBotWidget from "../components/ChatBotWidget";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAdminCredentials } from "../context/AdminCredentialsContext";
import { useGlobalStatesContext } from "../context/GlobalStatesContext";

function BOTParentComponent() {
  const { showWidget, setShowWidget } = useGlobalStatesContext();
  const { theme } = useAdminCredentials();

  return (
    <div>
      {!showWidget && (
        <button
          style={{
            backgroundImage: theme
              ? theme
              : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          }}
          onClick={() => setShowWidget(!showWidget)}
          className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          data-state="closed"
        >
          <Icon
            icon="fluent:chat-empty-24-regular"
            className="w-9 h-9 text-white block border-gray-200 align-middle"
          />
        </button>
      )}

      {showWidget && <ChatBotWidget />}
    </div>
  );
}

export default BOTParentComponent;
