const triggerResponses = [
  {
    responseMsg: "Hello 👋 how can I assist you?",
    triggerText: [
      "hi",
      "hello",
      "hi there",
      "hey",
      "hey there",
    ],
  },
];

export const handleNLPOutput = (message) => {
  const foundResponse = triggerResponses.find((response) =>
    response.triggerText.includes(message.toLowerCase())
  );

  if (foundResponse) {
    return foundResponse.responseMsg;
  } else {
    return false;
  }
};
