const you = document.getElementById("you");
const map = document.getElementById("emap");
const routeInfo = document.getElementById("routeInfo");
const statusText = document.getElementById("status");

const totalPeopleEl = document.getElementById("totalPeople");
const g1El = document.getElementById("g1");
const g2El = document.getElementById("g2");
const bestExitEl = document.getElementById("bestExit");
const statusDash = document.getElementById("statusDash");
// USER POSITION
let userX = Math.random() * 80 + 10;
let userY = Math.random() * 80 + 10;

you.style.left = userX + "%";
you.style.top = userY + "%";

// EXITS
const exits = [
  { name: "Gate 1", x: 20, y: 5 },
  { name: "Gate 2", x: 80, y: 5 }
];

// 🔥 MULTIPLE PEOPLE
function createPeople() {
  for (let i = 0; i < 15; i++) {
    let p = document.createElement("div");
    p.className = "evac-person";

    let x = Math.random() * 90;
    let y = Math.random() * 90;

    p.style.left = x + "%";
    p.style.top = y + "%";

    map.appendChild(p);
  }
}
createPeople();

// 🎯 CROWD HEATMAP
function updateHeatmap() {
  let zones = map.querySelectorAll(".heat");

  zones.forEach(z => z.remove());

  for (let i = 0; i < 5; i++) {
    let heat = document.createElement("div");
    heat.className = "heat";

    let x = Math.random() * 90;
    let y = Math.random() * 90;

    heat.style.left = x + "%";
    heat.style.top = y + "%";

    map.appendChild(heat);
  }
}

// CROWD VALUE
function getCrowd() {
  return Math.floor(Math.random() * 30);
}

// BEST EXIT
function findBestExit() {
  let best = null;
  let minScore = Infinity;

  exits.forEach(exit => {
    let dist = Math.sqrt(
      Math.pow(userX - exit.x, 2) +
      Math.pow(userY - exit.y, 2)
    );

    let crowd = getCrowd();

    let score = dist + crowd;

    if (score < minScore) {
      minScore = score;
      best = { ...exit, crowd };
    }
  });

  return best;
}

// 🔥 ARROW ROUTE
function drawArrow(exit) {
  let arrow = document.getElementById("arrow");

  if (!arrow) {
    arrow = document.createElement("div");
    arrow.id = "arrow";
    arrow.innerHTML = "➡️➡️➡️";
    map.appendChild(arrow);
  }

  arrow.style.left = userX + "%";
  arrow.style.top = userY + "%";

  let angle = Math.atan2(exit.y - userY, exit.x - userX) * (180 / Math.PI);
  arrow.style.transform = `rotate(${angle}deg)`;
}

// 🔊 VOICE ALERT
function speak(text) {
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

// UPDATE SYSTEM
function updateSystem() {

  // 🔹 RANDOM CROWD VALUES
  let g1 = Math.floor(Math.random() * 30);
  let g2 = Math.floor(Math.random() * 30);

  // 🔹 TOTAL PEOPLE
  let total = g1 + g2 + 100;

  // 🔹 UPDATE DASHBOARD
  totalPeopleEl.innerText = total;
  g1El.innerText = g1;
  g2El.innerText = g2;

  // 🔹 FIND BEST EXIT
  let best = findBestExit();
  if (best) {
    bestExitEl.innerText = best.name;
  }

  // 🔹 UPDATE ROUTE + HEATMAP
  drawArrow(best);
  updateHeatmap();

  routeInfo.innerText = `Best Exit: ${best.name} (Crowd: ${best.crowd})`;

  // 🔹 STATUS
  if (best.crowd > 20) {
    statusText.innerText = "⚠️ High Crowd! Evacuate!";
    statusDash.innerText = "CRITICAL ⚠️";
    document.body.classList.add("alert");

    speak(`Evacuate via ${best.name}`);
  } else {
    statusText.innerText = "✅ Safe";
    statusDash.innerText = "SAFE ✅";
    document.body.classList.remove("alert");
  }
}
updateSystem();
setInterval(updateSystem, 4000);
  
// 🚨 SOS
function sendSOS() {
  alert(`🚨 SOS SENT!\nLocation: (${userX.toFixed(1)}%, ${userY.toFixed(1)}%)`);

  speak("Emergency alert sent. Help is on the way.");
}