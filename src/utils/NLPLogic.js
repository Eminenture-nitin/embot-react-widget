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
      "good morning",
      "good afternoon",
      "good evening",
    ],
  },
  {
    responseMsg:
      "Hi there! 👋 I'm here to help you out. What can I do for you today?",
    triggerText: [
      "how are you?",
      "what's up?",
      "how's it going?",
      "are you there?",
      "how do you do?",
      "how's everything?",
      "what's going on?",
      "how's life?",
      "how have you been?",
      "you there?",
      "how's your day?",
      "how's it going bot?",
      "are you a bot?",
    ],
  },
  {
    responseMsg: "You're welcome! If you need anything else, feel free to ask.",
    triggerText: [
      "thank you",
      "thanks",
      "thanks a lot",
      "thank you so much",
      "appreciate it",
    ],
  },
  {
    responseMsg: "bye, Have a great day!",
    triggerText: [
      "bye",
      "goodbye",
      "see you later",
      "talk to you later",
      "see you",
    ],
  },
  {
    responseMsg: "I understand. Let me know if you change your mind.",
    triggerText: ["no", "nope", "not really", "nah", "not sure"],
  },
  {
    responseMsg: "Got it! I'm on it.",
    triggerText: ["yes", "yeah", "yup", "absolutely", "definitely"],
  },
  {
    responseMsg: "Alright!",
    triggerText: ["okay", "ok", "alright", "fine", "hmn"],
  },
  {
    responseMsg:
      "I apologize for any inconvenience. Please let me know how I can assist you further.",
    triggerText: [
      "sorry",
      "apologies",
      "my bad",
      "oops",
      "didn't mean to",
      "my mistake",
      "I apologize",
      "regret",
      "sorry about that",
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
