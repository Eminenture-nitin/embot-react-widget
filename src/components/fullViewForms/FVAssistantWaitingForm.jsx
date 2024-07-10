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

    //  console.log("Form Data:", formData);
  };

  return (
    <div className="p-6 relative h-[90%]  overflow-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <label
          htmlFor="email-address-icon"
          className="block text-center mb-2 text-md font-medium text-gray-900 dark:text-white"
        >
          Assistant Unavailable – Leave Your Details, We'll Connect Soon?
        </label>
        <div className="relative py-4 border-b border-blue-500">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your phone
            </label>
            <input
              type="tel"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              name="message"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="flex-shrink-0 w-full border-none text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
        {errorMsg.length > 0 && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oops!</span> {errorMsg}
          </p>
        )}
      </form>
      <br />
      <div
        onClick={() => handleCloseForm(true)}
        className="w-full grid justify-center"
      >
        <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300">
          Close Form
          <button
            type="button"
            className="inline-flex items-center p-1 ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
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

export default FVAssistantWaitingForm;
