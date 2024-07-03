import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useTriggersContextData } from "../../context/TriggersDataContext";
import { useAdminCredentials } from "../../context/AdminCredentialsContext";
import { useLiveChatContext } from "../../context/LiveChatContext";
import Cookies from "js-cookie";
const FVAssistantWaitingForm = () => {
  const { handleCloseForm } = useTriggersContextData();
  const { theme } = useAdminCredentials();
  const { setChatMessages, addBotMsgs, addMsg } = useLiveChatContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "" || Cookies.get("widget_user_email"),
    phone: "",
    message: "",
  });

  const handleMultipleActionsCall = async () => {
    try {
      await Promise.all([
        handleCloseForm(false),
        addMsg("", formData),
        addBotMsgs(
          "Thank you for your interest! 🌟 We appreciate your input and will get back to you soon."
        ),
      ]);
      console.log("All functions completed successfully");
    } catch (error) {
      console.error("Error in one of the functions:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    setChatMessages((prevMsgs) => [
      ...prevMsgs,
      { assiUnavailableFromData: formData, myself: false },
      {
        responseText:
          "Thank you for your interest! 🌟 We appreciate your input and will get back to you soon.",
      },
    ]);
    handleMultipleActionsCall();

    console.log("Form Data:", formData);
  };

  return (
    <div className="EMBOT-p-6 EMBOT-relative EMBOT-h-[90%]  EMBOT-overflow-auto">
      <form onSubmit={handleSubmit} className="EMBOT-w-full EMBOT-max-w-sm">
        <label
          htmlFor="email-address-icon"
          className="EMBOT-block EMBOT-text-center EMBOT-mb-2 EMBOT-text-md EMBOT-font-medium EMBOT-text-gray-900 EMBOT-dark:text-white"
        >
          Assistant Unavailable – Leave Your Details, We'll Connect Soon?
        </label>
        <div className="EMBOT-relative EMBOT-py-4 EMBOT-border-b EMBOT-border-blue-500">
          <div className="EMBOT-mb-5">
            <label
              htmlFor="email"
              className="EMBOT-block EMBOT-mb-2 EMBOT-text-sm EMBOT-font-medium EMBOT-text-gray-900 dark:EMBOT-text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              className="EMBOT-bg-gray-50 EMBOT-border EMBOT-border-gray-300 EMBOT-text-gray-900 EMBOT-text-sm EMBOT-rounded-lg EMBOT-focus:EMBOT-ring-blue-500 EMBOT-focus:EMBOT-border-blue-500 EMBOT-block EMBOT-w-full EMBOT-p-2.5 dark:EMBOT-bg-gray-700 dark:EMBOT-border-gray-600 dark:EMBOT-placeholder-gray-400 dark:EMBOT-text-white dark:EMBOT-focus:EMBOT-ring-blue-500 dark:EMBOT-focus:EMBOT-border-blue-500"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="EMBOT-mb-5">
            <label
              htmlFor="phone"
              className="EMBOT-block EMBOT-mb-2 EMBOT-text-sm EMBOT-font-medium EMBOT-text-gray-900 dark:EMBOT-text-white"
            >
              Your phone
            </label>
            <input
              type="tel"
              name="phone"
              className="EMBOT-bg-gray-50 EMBOT-border EMBOT-border-gray-300 EMBOT-text-gray-900 EMBOT-text-sm EMBOT-rounded-lg EMBOT-focus:EMBOT-ring-blue-500 EMBOT-focus:EMBOT-border-blue-500 EMBOT-block EMBOT-w-full EMBOT-p-2.5 dark:EMBOT-bg-gray-700 dark:EMBOT-border-gray-600 dark:EMBOT-placeholder-gray-400 dark:EMBOT-text-white dark:EMBOT-focus:EMBOT-ring-blue-500 dark:EMBOT-focus:EMBOT-border-blue-500"
              placeholder="Your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="EMBOT-mb-5">
            <label
              htmlFor="message"
              className="EMBOT-block EMBOT-mb-2 EMBOT-text-sm EMBOT-font-medium EMBOT-text-gray-900 dark:EMBOT-text-white"
            >
              Your message
            </label>
            <textarea
              name="message"
              className="EMBOT-bg-gray-50 EMBOT-border EMBOT-border-gray-300 EMBOT-text-gray-900 EMBOT-text-sm EMBOT-rounded-lg EMBOT-focus:EMBOT-ring-blue-500 EMBOT-focus:EMBOT-border-blue-500 EMBOT-block EMBOT-w-full EMBOT-p-2.5 dark:EMBOT-bg-gray-700 dark:EMBOT-border-gray-600 dark:EMBOT-placeholder-gray-400 dark:EMBOT-text-white dark:EMBOT-focus:EMBOT-ring-blue-500 dark:EMBOT-focus:EMBOT-border-blue-500"
              placeholder="Your message"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            style={{
              backgroundImage: theme
                ? theme
                : "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
              color: "white",
            }}
            className="EMBOT-flex-shrink-0 EMBOT-w-full EMBOT-border-none EMBOT-text-sm EMBOT-border-4 EMBOT-text-white EMBOT-py-1 EMBOT-px-2 EMBOT-rounded"
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
        onClick={() => handleCloseForm(true)}
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

export default FVAssistantWaitingForm;
