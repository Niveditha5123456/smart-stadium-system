

// SELECT ALL ZONES
const zones = document.querySelectorAll(".zone");

// 🔊 ALERT SOUND
const alertSound = new Audio("https://www.soundjay.com/button/beep-07.wav");


// =========================
// CREATE PERSON
// =========================
function createPerson(zone) {
  const person = document.createElement("div");
  person.className = "person";

  person.style.top = Math.random() * 90 + "%";
  person.style.left = Math.random() * 90 + "%";

  zone.appendChild(person);

  movePerson(person);
}


// =========================
// MOVE PERSON
// =========================
function movePerson(person) {
  setInterval(() => {
    person.style.top = Math.random() * 90 + "%";
    person.style.left = Math.random() * 90 + "%";
  }, 2000);
}


// =========================
// INITIAL POPULATION
// =========================
zones.forEach(zone => {
  for (let i = 0; i < 10; i++) {
    createPerson(zone);
  }

  // CLICK → SHOW COUNT
  zone.addEventListener("click", () => {
    let count = zone.querySelectorAll(".person").length;
    alert(zone.querySelector("h3").innerText + " Crowd: " + count);
  });
});


// =========================
// UPDATE SYSTEM (MAIN LOGIC)
// =========================
setInterval(() => {

  zones.forEach(zone => {

    let people = zone.querySelectorAll(".person");
    let count = people.length;
    let countBox = zone.querySelector(".count");
    countBox.innerText = count + " people";

    // CHECK PREVIOUS STATE
    let wasRed = zone.classList.contains("red");

    // REMOVE OLD COLORS
    zone.classList.remove("green", "yellow", "red", "high");

    // APPLY NEW COLORS
    if (count < 8) {
      zone.classList.add("green");
    } 
    else if (count < 15) {
      zone.classList.add("yellow");
    } 
    else {
      zone.classList.add("red");
      zone.classList.add("high"); // 🔥 ICON GLOW

      // 🔊 PLAY SOUND ONLY WHEN TURNING RED
      if (!wasRed) {
        alertSound.play();
      }
    }

    // =========================
    // ADD / REMOVE PEOPLE
    // =========================
    if (Math.random() > 0.5) {
      createPerson(zone);
    } else {
      if (people.length > 0) {
        people[0].remove();
      }
    }

  });

}, 3000);


// =========================
// FIX: ENABLE SOUND (BROWSER POLICY)
// =========================
document.body.addEventListener("click", () => {
  alertSound.play().catch(() => {});
}, { once: true });