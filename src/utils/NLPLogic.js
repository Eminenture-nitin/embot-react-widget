const triggerResponses = [
  {
    responseMsg: "Hello 👋 how can I assist you?",
    triggerText: [
      "hi",
      "hello",
      "hi there",
      "hey",
      "hey there",
      "can you assist me?",
      "need help",
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
    return "I'm sorry, I didn't quite catch that. Could you please rephrase?";
  }
};
