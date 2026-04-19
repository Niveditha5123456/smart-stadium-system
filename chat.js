const chatBox = document.getElementById("chat-box");

function sendMessage() {
  let input = document.getElementById("userInput");
  let message = input.value.toLowerCase();

  if (message.trim() === "") return;

  // Show user message
  chatBox.innerHTML += `<div class="user">${message}</div>`;

  // Get bot reply
  let reply = getReply(message);

  setTimeout(() => {
    chatBox.innerHTML += `<div class="bot">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);

  input.value = "";
}

// 🔥 SIMPLE AI LOGIC
function getReply(msg) {

  // greetings
  if (msg.includes("hi") || msg.includes("hello")) {
    return "Hello 👋 Welcome to Smart Stadium!";
  }

  // washroom
  if (msg.includes("washroom")) {
    return "🚻 There are totally 5 Washrooms- 3 for women and 2 for men and all are located near Zone C.";
  }

  // food
  if (msg.includes("food")) {
    return "🍔 Food Court offers burgers, pizza, snacks, beverages, and more and is located near Zone B!";
  }

  // less crowded gate (random simulation)
  if (msg.includes("less crowded") || msg.includes("which gate")) {
    let gates = ["Gate 1", "Gate 2"];
    let randomGate = gates[Math.floor(Math.random() * gates.length)];
    return `🚪 ${randomGate} is currently less crowded.`;
  }

  // zones info
  if (msg.includes("zone") || msg.includes("gate")) {
    return "📍 Ther are only 2 Gates- Gate 1 and Gate 2 which are distributed across Zone A, Zone B, and Zone C.";
  }

  // seating
  if (msg.includes("seat")) {
    return "💺 Seating areas are located mainly in Zone B.";
  }

  // emergency
  if (msg.includes("emergency")) {
    return "🚨 Use the Emergency page for evacuation routes and SOS.";
  }

  // default reply
  return "🤖 Sorry, I didn't understand. Please ask about gates, food, or facilities.";
}