const map = document.getElementById("map");

let colors = ["glow1", "glow2", "glow3", "glow4"];

function addFriend() {
  let name = document.getElementById("friendName").value.trim();
  if (name === "") {
    alert("Enter friend name");
    return;
  }

  let x = Math.random() * 90;
  let y = Math.random() * 90;

  let colorClass = colors[Math.floor(Math.random() * colors.length)];

  let friend = document.createElement("div");
  friend.className = "friend";

  friend.innerHTML = `
    <div class="friend-icon ${colorClass}">👤</div>
    <div class="friend-name">${name}</div>
  `;

  friend.style.left = x + "%";
  friend.style.top = y + "%";

  friend.dataset.x = x;
  friend.dataset.y = y;


  map.appendChild(friend);

  moveFriend(friend);

  friend.addEventListener("click", () => {
    let currentX = parseFloat(friend.dataset.x);
    let currentY = parseFloat(friend.dataset.y);
    let zone = getZone(currentX, currentY);
    alert(`${name} is near ${zone}`);
  });

  document.getElementById("friendName").value = "";
}

// MOVE FRIEND
function moveFriend(friend) {
  setInterval(() => {
    let x = Math.random() * 90;
    let y = Math.random() * 90;

    friend.style.left = x + "%";
    friend.style.top = y + "%";

    friend.dataset.x = x;
    friend.dataset.y = y;
  }, 3000);
}

// DETECT ZONE
function getZone(x, y) {

  // TOP AREA (GATES)
  if (y < 20) {
    if (x < 50) return "🚪 Gate 1";
    else return "🚪 Gate 2";
  }

  // LEFT SIDE
  if (x < 20 && y >= 20 && y <= 70) {
    return "🚻 Washroom";
  }

  // RIGHT SIDE
  if (x > 80 && y >= 20 && y <= 70) {
    return "🍔 Food Court";
  }

  // BOTTOM AREA
  if (y > 70) {
    if (x < 50) return "👥 Zone A";
    else return "👥 Zone C";
  }

  // LOWER MIDDLE
  if (y > 50 && y <= 70) {
    if (x < 50) return "👥 Zone B";
    else return "👥 Zone C";
  }

  // CENTER
  return "🎯 Main Arena";
}