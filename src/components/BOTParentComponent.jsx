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
        <div>
          <span
            className="fixed bottom-7 right-24 z-50 py-1 px-2 rounded-md text-nowrap whitespace-nowrap truncate text-[15px]"
            style={{
              color: "#3c4859",
              boxShadow: "rgb(182, 190, 252) 0px 0px 13px",
            }}
          >
            Hey there 👋
          </span>
          <button
            style={{
              backgroundImage: theme
                ? theme
                : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
            onClick={() => setShowWidget(!showWidget)}
            className="EMBOT-ripple-effect fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900 ripple"
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

          <style jsx>{`
            .EMBOT-ripple-effect {
              animation-name: ripple !important;
              animation-duration: 1.5s !important;
              animation-iteration-count: infinite !important;
              border-radius: 50% !important;
            }
            .EMBOT-ripple-effect .icon {
              transform: rotate(-60deg);
              animation: rotate 0.2s ease forwards;
            }
            @keyframes rotate {
              from {
                transform: rotate(-60deg);
              }
              to {
                transform: rotate(0deg);
              }
            }
            @keyframes ripple {
              0% {
                box-shadow: 0 0 0 0 green, 0 0 0 0 #fff4;
              }

              80% {
                box-shadow: 0 0 0 20px #fff0, 0 0 0 40px #fff0;
              }

              100% {
                box-shadow: 0 0 0 0 #fff0, 0 0 0 0 #fff0;
              }
            }
          `}</style>
        </div>
      )}

      {showWidget && <ChatBotWidget />}
    </div>
  );
}

export default BOTParentComponent;
