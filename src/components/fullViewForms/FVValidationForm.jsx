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
import { useLiveChatContext } from "../../context/LiveChatContext";

const FVValidationForm = () => {
  const { handleCloseForm, handleUserDecision } = useTriggersContextData();
  const { inputTagConfig, setUserRegistered } = useGlobalStatesContext();
  const { getLocation } = useLiveChatContext();
  const { theme } = useAdminCredentials();
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTagConfig.validationType == "Email" && isValidEmail(inputValue)) {
      Cookies.set("widget_user_email", inputValue, { expires: 3 });
      setUserRegistered(true);
      handleUserDecision(inputTagConfig.nextNodeId, inputValue);
      handleCloseForm();
      getLocation(inputValue, "register");
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
    <div className="p-6 relative">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <label
          htmlFor="email-address-icon"
          className="block text-center mb-2 text-md font-medium text-gray-900"
        >
          Please introduce yourself by providing your
          {inputTagConfig?.validationType}
        </label>
        <div className="w-full h-auto my-2">
          <img
            loading="lazy"
            className="w-full h-auto rounded-sm"
            src="https://img.freepik.com/premium-photo/closeup-successful-business-people-handshake-office-business-negotiations-concept_151013-20340.jpg?w=900"
          />
        </div>
        <div className="flex relative py-4 items-center border-b border-blue-500">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {inputTagConfig?.validationType == "Email" ? (
              <Icon
                icon="ic:baseline-email"
                className="w-4 h-4 text-gray-500"
              />
            ) : inputTagConfig?.validationType == "Name" ? (
              <Icon icon="ep:user-filled" className="w-4 h-4 text-gray-500" />
            ) : (
              <Icon icon="vaadin:phone" className="w-4 h-4 text-gray-500" />
            )}
          </div>
          <input
            onChange={(e) => {
              setInputValue(e.target.value);
              setErrorMsg("");
            }}
            className="appearance-none outline-none ml-8 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
            className="flex-shrink-0 border-none text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
        {errorMsg.length > 0 && (
          <p className="mt-2 text-sm text-red-600">
            <span className="font-medium">Oops!</span> {errorMsg}
          </p>
        )}
      </form>
      <br />
      <div onClick={handleCloseForm} className="w-full grid justify-center">
        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 rounded">
          Close Form
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
            data-dismiss-target="#badge-dismiss-red"
            aria-label="Remove"
          >
            <Icon icon="ion:close" className="w-5 h-5" />
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default FVValidationForm;
