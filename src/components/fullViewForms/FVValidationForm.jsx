import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";
import Cookies from "js-cookie";

import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from "../../utils/validations";
import { useGlobalStatesContext } from "../../context/GlobalStatesContext";

const FVValidationForm = () => {
  const { handleCloseForm, handleUserDecision } = useTriggersContextData();
  const { inputTagConfig } = useGlobalStatesContext();
  const { theme } = useAdminCredentials();
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTagConfig.validationType == "Email" && isValidEmail(inputValue)) {
      Cookies.set("widget_user_email", inputValue, { expires: 3 });
      handleUserDecision(inputTagConfig.nextNodeId, inputValue);
      handleCloseForm();
    } else if (
      inputTagConfig.validationType == "Name" &&
      isValidName(inputValue)
    ) {
      handleUserDecision(inputTagConfig.nextNodeId, inputValue);

      handleCloseForm();
    } else if (
      inputTagConfig.validationType == "Phone Number" &&
      isValidPhoneNumber(inputValue)
    ) {
      handleUserDecision(inputTagConfig.nextNodeId, inputValue);

      handleCloseForm();
    } else {
      setErrorMsg(inputTagConfig.errorMessage);
    }
  };

  return (
    <div className="EMBOT-p-6 EMBOT-relative">
      <form onSubmit={handleSubmit} className="EMBOT-w-full EMBOT-max-w-sm">
        <label
          htmlFor="email-address-icon"
          className="EMBOT-block EMBOT-text-center EMBOT-mb-2 EMBOT-text-md EMBOT-font-medium EMBOT-text-gray-900 EMBOT-dark:text-white"
        >
          Please introduce yourself by providing your{" "}
          {inputTagConfig?.validationType}
        </label>
        <div className="EMBOT-w-full EMBOT-h-auto EMBOT-my-2">
          <img
            loading="lazy"
            className="EMBOT-w-full EMBOT-h-auto EMBOT-rounded-sm"
            src="https://img.freepik.com/premium-photo/closeup-successful-business-people-handshake-office-business-negotiations-concept_151013-20340.jpg?w=900"
          />
        </div>
        <div className="EMBOT-flex EMBOT-relative EMBOT-py-4 EMBOT-items-center EMBOT-border-b EMBOT-border-blue-500">
          <div className="EMBOT-absolute EMBOT-inset-y-0 EMBOT-start-0 EMBOT-flex EMBOT-items-center EMBOT-ps-3.5 EMBOT-pointer-events-none">
            {inputTagConfig?.validationType == "Email" ? (
              <Icon
                icon="ic:baseline-email"
                className="EMBOT-w-4 EMBOT-h-4 EMBOT-text-gray-500 EMBOT-dark:text-gray-400"
              />
            ) : inputTagConfig?.validationType == "Name" ? (
              <Icon
                icon="ep:user-filled"
                className="EMBOT-w-4 EMBOT-h-4 EMBOT-text-gray-500 EMBOT-dark:text-gray-400"
              />
            ) : (
              <Icon
                icon="vaadin:phone"
                className="EMBOT-w-4 EMBOT-h-4 EMBOT-text-gray-500 EMBOT-dark:text-gray-400"
              />
            )}
          </div>
          <input
            onChange={(e) => {
              setInputValue(e.target.value);
              setErrorMsg("");
            }}
            className="EMBOT-appearance-none EMBOT-outline-none EMBOT-ml-8 EMBOT-bg-transparent EMBOT-border-none EMBOT-w-full EMBOT-text-gray-700 EMBOT-mr-3 EMBOT-py-1 EMBOT-px-2 EMBOT-leading-tight focus:EMBOT-outline-none"
            type={inputTagConfig?.type}
            placeholder={inputTagConfig?.placeholder}
            name="userInput"
          />
          <button
            style={{
              backgroundImage: theme
                ? theme
                : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
              color: "white",
            }}
            className="EMBOT-flex-shrink-0 EMBOT-border-none EMBOT-text-sm EMBOT-border-4 EMBOT-text-white EMBOT-py-1 EMBOT-px-2 EMBOT-rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
        {errorMsg.length > 0 && (
          <p className="EMBOT-mt-2 EMBOT-text-sm EMBOT-text-red-600 dark:EMBOT-text-red-500">
            <span className="EMBOT-font-medium">Oops!</span> {errorMsg}
          </p>
        )}
      </form>
      <br />
      <div
        onClick={handleCloseForm}
        className="EMBOT-w-full EMBOT-grid EMBOT-justify-center"
      >
        <span className="EMBOT-inline-flex EMBOT-items-center EMBOT-px-2 EMBOT-py-1 EMBOT-me-2 EMBOT-text-sm EMBOT-font-medium EMBOT-text-red-800 EMBOT-bg-red-100 EMBOT-rounded EMBOT-dark:bg-red-900 EMBOT-dark:text-red-300">
          Close Form
          <button
            type="button"
            className="EMBOT-inline-flex EMBOT-items-center EMBOT-p-1 EMBOT-ms-2 EMBOT-text-sm EMBOT-text-red-400 EMBOT-bg-transparent EMBOT-rounded-sm hover:EMBOT-bg-red-200 hover:EMBOT-text-red-900 EMBOT-dark:hover:bg-red-800 EMBOT-dark:hover:text-red-300"
            data-dismiss-target="#EMBOT-badge-dismiss-red"
            aria-label="Remove"
          >
            <Icon icon="ion:close" className="EMBOT-w-5 EMBOT-h-5" />
            <span className="EMBOT-sr-only">Remove badge</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default FVValidationForm;
