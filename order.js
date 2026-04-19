let cart = JSON.parse(localStorage.getItem("cart")) || {};
const data = JSON.parse(localStorage.getItem("order")) || {};
const summary = document.getElementById("summary");
let isOrdering = false;

const prices = {
  "Cold Coffee": 100,
  "Iced  Tea": 80,
  "Strawberry Smoothie": 60,
  "Lassi": 30,
  "ABC Juice": 45,
  "7 Up": 25,
  "Coca Cola": 25,
  "Mango Juice": 35,
  "Chicken Zinger Wrap": 150,
  "BBQ Chicken Wrap": 140,
  "Paneer Wrap": 110,
  "Egg Wrap": 120,
  "Smashed Chicken Burger": 150,
  "Chicken Zinger Burger": 170,
  "Smashed Beef Burger": 150,
  "Veg Burger": 100,
  "Onion Pizza": 200,
  "Sweetcorn Pizza": 220,
  "Paneer Tikka Pizza": 210,
  "BBQ Chicken Pizza": 300,
  "Pepperoni Pizza": 320,
  "White Sauce Pasta": 170,
  "Red Sauce Pasta": 170,
  "Pani Puri": 60,
  "Sev Puri": 60,
  "Pav Bhaji": 90,
  "Chicken Loaded Fries": 200,
  "Donuts": 130,
  "Cream Bun": 32,
  "Chicken Puff Pastry": 25,
  "Chicken Samosa": 20,
  "Veg Momos": 70
};

function displaySummary() {
  const summary = document.getElementById("summary");
  summary.innerHTML = "";

  let total = 0;

  for (let item in cart) {
    let qty = cart[item];
    let price = prices[item];
    let itemTotal = price * qty;
    total += itemTotal;

    summary.innerHTML += `<div class="item"> <span>${item}</span> <div class="controls"> <button onclick="decrease('${item}')">-</button> <span>${qty}</span> <button onclick="increase('${item}')">+</button> </div> <span>₹${itemTotal}</span> </div>`;
  }
  summary.innerHTML += `<h3>Total: ₹${total}</h3>`;
}
   
function increase(item) {
  cart[item]++;
  localStorage.setItem("cart", JSON.stringify(cart));
  displaySummary();
}

function decrease(item) {
  if (cart[item] > 1) {
    cart[item]--;
  } else {
    delete cart[item];
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displaySummary();
}

function clearCart() {
  if (isOrdering) {
    alert("Please wait for the current order to complete.");
    return;
  }
  cart = {};
  localStorage.removeItem("cart");
  displaySummary();
}
// CONFIRM ORDER
function confirmOrder() {
  alert("Confirm order called");
  console.log("confirmOrder called");
  if (isOrdering) {
    alert("Please wait for the current order to complete before placing a new one.");
    return;
  }

  let delivery = document.getElementById("delivery").value;
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  let seat = document.getElementById("seat").value.toUpperCase().trim();
  let payment = document.querySelector('input[name="payment"]:checked');
  if (!payment) {
    alert("Please select a payment method");
    return;
  }
  let paymentValue = payment.value;

  // Removed cart empty check for testing

  if (delivery === "seat") {
    if (seat === "") {
      alert("Please fill out this field");
      return;
    }

    if (!validateSeat(seat)) {
      alert("Please enter a valid seat number (Example: 120A)");
      return;
    }
  }

  isOrdering = true;
  disableOrderControls();

  if (paymentValue === "upi") {
    showModal();
    return;
  }

  // For COD, proceed directly
  finalizeOrder(delivery, seat);
}

function finalizeOrder(delivery, seat) {
  console.log("finalizeOrder called");
  let orderNo = Math.floor(Math.random() * 900) + 100;
  let orderData = {
    orderNo: orderNo,
    delivery: delivery,
    seat: seat,
    items: cart,
    status: 'preparing',
    timestamp: new Date()
  };

  // Show confirmation alert immediately
  if (delivery === "pickup") {
    alert("Order Confirmed 👍\nYour Order No: " + orderNo);
  } else {
    alert("Order Confirmed 👍\nDelivering to seat: " + seat);
  }

  addOrder(orderData).then((docRef) => {
    orderData.id = docRef.id;
    startProgress(delivery === "pickup" ? "pickup" : "seat", docRef.id);
  }).catch((error) => {
    console.error("Error saving order:", error);
    startProgress(delivery === "pickup" ? "pickup" : "seat", "test-id");
    isOrdering = false;
    enableOrderControls();
  });
}

// ADD MORE ITEMS
function addMore() {
  if (isOrdering) {
    alert("Please wait for the current order to complete.");
    return;
  }
  window.location.href = "food.html";
}

function goBack() {
  window.location.href = "food.html";
}

function goToFood() {
  window.location.href = "food.html";
}

function goToIndex() {
  window.location.href = "index.html";
}

function toggleSeat(){
 let delivery=document.getElementById("delivery").value;
 let seatInput=document.getElementById("seat");
 if (delivery==="seat"){
   seatInput.disabled=false;
 } else {
   seatInput.disabled=true;
   seatInput.value="";
 }
}

function validateSeat(seat){
 let number = parseInt(seat);
 let zone = seat.slice(-1);
 if(isNaN(number)) return false;

 if(zone==="A" && number>=1 && number<=500) return true;
 if(zone==="B" && number>=1 && number<=500) return true;
 if(zone==="C" && number>=1 && number<=200) return true;

 return false;
}



function startProgress(type, orderId) {
  // Initialize progress based on type
  startTracking(type, orderId);
}



// 🚚 TRACKING SYSTEM

function startTracking(type, orderId) {

  console.log("Tracking started for", type);

  // Ensure tracker is visible
  document.querySelector('.tracker').style.display = "flex";

  // Scroll to tracker
  setTimeout(() => {
    document.querySelector('.tracker').scrollIntoView({ behavior: 'smooth' });
  }, 100);

  let stages;
  if (type === 'pickup') {
    stages = [
      { id: 'stage1', text: 'Ordered', time: 0, status: 'preparing' },
      { id: 'stage2', text: 'Being Prepared', time: 2, status: 'preparing' },
      { id: 'stage3', text: 'Ready for Pickup', time: 4, status: 'ready' },
      { id: 'stage4', text: 'Delivered', time: 8, status: 'delivered' }
    ];
  } else {
    stages = [
      { id: 'stage1', text: 'Ordered', time: 0, status: 'preparing' },
      { id: 'stage2', text: 'Being Prepared', time: 2, status: 'preparing' },
      { id: 'stage3', text: 'Ready for Pickup', time: 4, status: 'ready' },
      { id: 'stage4', text: 'Our partner is on the way', time: 6, status: 'delivering' },
      { id: 'stage5', text: 'Delivered', time: 10, status: 'delivered' }
    ];
  }

  let currentStage = 0;
  let elapsed = 0;

  // Initialize first stage
  document.getElementById("eta").innerText = stages[0].text;
  document.getElementById(stages[0].id).classList.add("active");

  // Adjust stage labels and visibility for pickup
  if (type === 'pickup') {
    const stage4Label = document.querySelector('#stage4 p');
    if (stage4Label) stage4Label.innerText = 'Delivered';
    document.getElementById('stage5').style.display = 'none';
  } else {
    const stage4Label = document.querySelector('#stage4 p');
    if (stage4Label) stage4Label.innerText = 'On the Way';
    document.getElementById('stage5').style.display = '';
  }

  let interval = setInterval(() => {
    elapsed++;

    // Move rider
    let totalTime = stages[stages.length - 1].time;
    let progress = (elapsed / totalTime) * 100;
    let trackerWidth = document.querySelector('.tracker').offsetWidth;
    if (!trackerWidth) trackerWidth = 500;
    let riderPos = (progress / 100) * trackerWidth;
    const rider = document.getElementById('rider');
    if (rider) {
      rider.style.left = riderPos + 'px';
      console.log('Elapsed:', elapsed, 'Progress:', progress + '%', 'RiderPos:', riderPos + 'px', 'TotalTime:', totalTime);
    }

    // Check for stage advancement
    if (currentStage < stages.length - 1 && elapsed >= stages[currentStage + 1].time) {
      currentStage++;
      const stageElement = document.getElementById(stages[currentStage].id);
      if (stageElement) {
        stageElement.classList.add("active");
        console.log('Stage advanced to:', stages[currentStage].text);
      }
      document.getElementById("eta").innerText = stages[currentStage].text;
      // Update status in Firebase
      updateOrderStatus(orderId, stages[currentStage].status);

      if (currentStage === stages.length - 1) {
        clearInterval(interval);
        document.getElementById("summary").innerHTML = "";
        document.getElementById("total").innerText = "Total: ₹0";
        finishOrder();
      }
    }
  }, 1000);
}
function finishOrder(){
  isOrdering = false;
  enableOrderControls();

  setTimeout(()=>{
    // Hide the tracker or reset
    document.querySelector('.tracker').style.display = "none";
    localStorage.removeItem("cart"); // clear items
    cart = {};
    displaySummary();
  }, 3000);
}

function disableOrderControls() {
  document.getElementById("confirm-btn").disabled = true;
  document.getElementById("add-more-btn").disabled = true;
  document.getElementById("clear-btn").disabled = true;
  document.getElementById("delivery").disabled = true;
  document.getElementById("seat").disabled = true;
  let paymentRadios = document.querySelectorAll('input[name="payment"]');
  paymentRadios.forEach(radio => radio.disabled = true);
}

function enableOrderControls() {
  document.getElementById("confirm-btn").disabled = false;
  document.getElementById("add-more-btn").disabled = false;
  document.getElementById("clear-btn").disabled = false;
  document.getElementById("delivery").disabled = false;
  document.getElementById("seat").disabled = false;
  let paymentRadios = document.querySelectorAll('input[name="payment"]');
  paymentRadios.forEach(radio => radio.disabled = false);
}

function showModal() {
  document.getElementById("upi-modal").style.display = "block";
  document.getElementById("payment-status").innerText = "";
  document.getElementById("upi-id").value = "abcde@oksbi";
  document.getElementById("confirm-payment-btn").disabled = false;
}

function closeModal() {
  document.getElementById("upi-modal").style.display = "none";
}

function confirmPayment() {
  let upiId = document.getElementById("upi-id").value.trim();
  let statusDiv = document.getElementById("payment-status");
  let btn = document.getElementById("confirm-payment-btn");

  // Validate UPI ID
  let regex = /^[a-z]{5}@oksbi$/;
  if (!regex.test(upiId)) {
    statusDiv.innerText = "Invalid UPI ID. Must be 5 lowercase letters followed by @oksbi";
    isOrdering = false;
    enableOrderControls();
    return;
  }

  // Processing
  statusDiv.innerText = "Processing payment...";
  btn.disabled = true;

  // After 2 seconds, success
  setTimeout(() => {
    statusDiv.innerText = "Payment successful ✓";
    setTimeout(() => {
      closeModal();
      // Now finalize order
      let delivery = document.getElementById("delivery").value;
      let seat = document.getElementById("seat").value.toUpperCase().trim();
      finalizeOrder(delivery, seat);
    }, 2000); // Show success for 2 seconds
  }, 2000);
}

displaySummary();