function sendMessage() {
    const input = document.getElementById("messageInput");
    const chatBox = document.getElementById("chatBox");
    const message = input.value.trim();

    if (message !== "") {
        // User message
        const userMsgDiv = document.createElement("div");
        userMsgDiv.classList.add("message", "sent");
        userMsgDiv.textContent = message;
        chatBox.appendChild(userMsgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        input.value = "";

        // Bot reply after 1 second
        setTimeout(() => {
            const botReply = getBotReply(message); // dynamic reply
            const botMsgDiv = document.createElement("div");
            botMsgDiv.classList.add("message", "received");
            botMsgDiv.textContent = botReply;
            chatBox.appendChild(botMsgDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    }
}

// Basic bot replies
function getBotReply(userMessage) {
    const msg = userMessage.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello! How can I help you?";
    } else if (msg.includes("your name")) {
        return "I'm ChatBot 🤖 , your name";
    } else if (msg.includes("where are you from") || msg.includes("kha s ho")) {
        return "I'm from Lucknow and you 😊";
    } else if (msg.includes("my name is ...")) {
        return "ok cool!";
    } else if (msg.includes("how are you")) {
        return "I'm good! Thanks for asking 😊";
    } else if (msg.includes("bye")) {
        return "Goodbye! Take care.";
    } else if (msg.includes("who makes you")) {
        return "Mahi Soni! Thanks for asking 😊";
    } else {
        return "I'm still learning! Can you try something else?";
    }
}

const form = document.getElementById("form");
const input = document.getElementById("input");
const chatBox = document.getElementById("chatBox");

const botResponses = {
  "hello": "Hi there! 👋 How can I help you today?",
  "where are you from": "I am from Lucknow and you?" ,
  "tell me something about you": "ok sure ,Hey there! I’m a chatbot — kind of like a super helpful virtual buddy. I’m here to answer your questions, give you info, or just chat if you’re bored. The more you talk to me, the smarter I get!",
  "hi": "Hello! 😊 What would you like to talk about?",
  "how are you": "I'm just a bunch of code, but I'm running smoothly! 😄",
  "what is your name": "I'm your personal chatbot 🤖 built with JavaScript.",
  "who made you": "I was created by Mahi Soni ✨",
  "creator": "Mahi Soni is my creator! 💻",
  "what can you do": "I can reply to your messages, save chats, and make your day better! ☀",
  "thank you": "You're most welcome! 💙",
  "bye": "Goodbye! Take care 😊",
};

// 🔁 Default fallback responses to avoid repetition
const defaultReplies = [
  "Interesting! Tell me more...",
  "That's cool! 😄",
  "I see! Let's continue...",
  "Can you explain that again?",
  "I'm still learning... but I'm listening 👂",
];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userInput = input.value.trim();
  if (userInput === "") return;

  addMessage(userInput, "sent");
  input.value = "";

  // Add chatbot response with delay
  setTimeout(() => {
    const botReply = getBotReply(userInput.toLowerCase());
    addMessage(botReply, "received");
  }, 600);
});

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  saveMessage({ text, type });
}

function getBotReply(userText) {
  for (let key in botResponses) {
    if (userText.includes(key)) {
      return botResponses[key];
    }
  }

  // If no match, return a random generic reply
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

// 🧠 LocalStorage Functions
function saveMessage(messageObj) {
  let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  messages.push(messageObj);
  localStorage.setItem("chatMessages", JSON.stringify(messages));
}

function loadMessages() {
  let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("message", msg.type);
    div.innerText = msg.text;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

window.onload = function () {
  loadMessages();
};
