import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";
import { useLiveChatContext } from "../../context/LiveChatContext";
import Cookies from "js-cookie";
import { useGlobalStatesContext } from "../../context/GlobalStatesContext";
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
  const { setChatMessages, addBotMsgs, addMsg, getLocation } =
    useLiveChatContext();

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
    // let userExists = Cookies.get("widget_user_email");
    // console.log("userExists", userExists);

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
      className="max-w-lg mx-auto p-4 bg-white overflow-y-auto"
      style={{ height: "calc(100% - 100px)" }}
    >
      <h2 className="block text-center mb-2 text-md font-medium text-gray-900">
        {data?.titleText}
      </h2>
      <form onSubmit={handleSubmit}>
        {data?.inputTags.map((inputTag) => (
          <div key={inputTag.id} className="mb-4">
            {inputTag.inputTagType === "text" &&
            inputTag.inputType === "Long Text" ? (
              <textarea
                name={inputTag.inputType}
                placeholder={inputTag.placeholder}
                required={inputTag.required}
                onChange={handleChange}
                className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              />
            ) : (
              <input
                type={inputTag.inputTagType}
                name={inputTag.inputType}
                placeholder={inputTag.placeholder}
                required={inputTag.required}
                onChange={handleChange}
                className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
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
          className="bg-blue-500 w-full text-white py-2 px-4 rounded"
        >
          Submit
        </button>
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

export default FVCustomeForm;
