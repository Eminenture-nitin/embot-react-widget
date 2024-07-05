import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";
import { useLiveChatContext } from "../../context/LiveChatContext";

const FVCustomeForm = () => {
  const data = {
    titleText: "Service Inquiry Form",
    inputTags: [
      {
        id: "fa325a58-f7b2-4e97-92e2-b22d3d507eed",
        inputType: "Text",
        inputTagType: "text",
        required: true,
        placeholder: "Enter Name",
      },
      {
        id: "07d4c77f-4a58-4be0-b34b-f84645525599",
        inputType: "Email",
        inputTagType: "email",
        required: true,
        placeholder: "Enter Email...",
      },
      {
        id: "01c7d079-ca39-432a-b1eb-dc650255a1a4",
        inputType: "Number",
        inputTagType: "number",
        required: true,
        placeholder: "Enter Number",
      },
      {
        id: "229e79a8-5e46-46c2-ae28-e96a9d982d40",
        inputType: "Long Text",
        inputTagType: "text",
        required: true,
        placeholder: "Enter Service Inquiry Message",
      },
    ],
  };
  const [formValues, setFormValues] = useState({});
  const { handleCloseForm } = useTriggersContextData();
  const { theme } = useAdminCredentials();
  const { setChatMessages, addBotMsgs, addMsg } = useLiveChatContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      formTitle: data?.titleText,
      [name]: value,
    });
  };

  const handleMultipleActionsCall = async () => {
    try {
      await Promise.all([
        handleCloseForm(false),
        addMsg("", null, formValues),
        addBotMsgs(
          "Thank you for your interest! 🌟 We appreciate your input and will get back to you soon."
        ),
      ]);
      console.log("All functions completed successfully");
    } catch (error) {
      console.error("Error in one of the functions:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatMessages((prevMsgs) => [
      ...prevMsgs,
      { customFormsData: formValues, myself: false },
      {
        responseText:
          "Thank you for your interest! 🌟 We appreciate your input and will get back to you soon.",
      },
    ]);
    handleMultipleActionsCall();
  };

  return (
    <div
      className="EMBOT-max-w-lg EMBOT-mx-auto EMBOT-p-4 EMBOT-bg-white EMBOT-overflow-y-auto"
      style={{ height: "calc(100% - 100px)" }}
    >
      <h2 className="EMBOT-block EMBOT-text-center EMBOT-mb-2 EMBOT-text-md EMBOT-font-medium EMBOT-text-gray-900 EMBOT-dark:text-white">
        {data?.titleText}
      </h2>
      <form onSubmit={handleSubmit}>
        {data?.inputTags.map((inputTag) => (
          <div key={inputTag.id} className="EMBOT-mb-4">
            {inputTag.inputTagType === "text" &&
            inputTag.inputType === "Long Text" ? (
              <textarea
                name={inputTag.inputType}
                placeholder={inputTag.placeholder}
                required={inputTag.required}
                onChange={handleChange}
                className="EMBOT-bg-gray-50 EMBOT-border EMBOT-border-blue-500 EMBOT-text-gray-900 EMBOT-text-sm EMBOT-rounded-lg focus:EMBOT-ring-blue-500 focus:EMBOT-border-blue-500 EMBOT-block EMBOT-w-full EMBOT-p-2.5 dark:EMBOT-placeholder-gray-400 dark:EMBOT-text-white EMBOT-outline-none"
              />
            ) : (
              <input
                type={inputTag.inputTagType}
                name={inputTag.inputType}
                placeholder={inputTag.placeholder}
                required={inputTag.required}
                onChange={handleChange}
                className="EMBOT-bg-gray-50 EMBOT-border EMBOT-border-blue-500 EMBOT-text-gray-900 EMBOT-text-sm EMBOT-rounded-lg focus:EMBOT-ring-blue-500 focus:EMBOT-border-blue-500 EMBOT-block EMBOT-w-full EMBOT-p-2.5 dark:EMBOT-placeholder-gray-400 dark:EMBOT-text-white dark:focus:EMBOT-ring-blue-500 EMBOT-outline-none"
              />
            )}
          </div>
        ))}

        <button
          style={{
            backgroundImage: theme
              ? theme
              : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
            color: "white",
          }}
          type="submit"
          className="EMBOT-bg-blue-500 EMBOT-w-full EMBOT-text-white EMBOT-py-2 EMBOT-px-4 EMBOT-rounded"
        >
          Submit
        </button>
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

export default FVCustomeForm;
