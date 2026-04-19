// import { saveOrder } from './firebase-functions.js';

const menuItems = [
  { name: "Cold Coffee", price: 100, category: "beverages", type: "Veg",img: "https://i.postimg.cc/qBYRdJvs/21667-easy-iced-coffee-ddmfs-4x3-0093-7becf3932bd64ed7b594d46c02d0889f.jpg" },
  { name: "Iced Tea", price: 80, category: "beverages", type: "Veg",img: "https://i.postimg.cc/6610JvZv/Iced-Tea.webp" },
  { name: "Strawberry Smoothie", price: 60, category: "beverages", type: "Veg",img: "https://i.postimg.cc/br2LFy3R/20792-b-and-ls-strawberry-smoothie-ddmfs-0321-3x4-hero-f9aad20d876448a49a3561bec1da6363.jpg" },
  { name: "Lassi", price: 30, category: "beverages", type: "Veg",img: "https://i.postimg.cc/q7y3YtTD/Lassi-2021-05-11-06-06-25.jpg" },
  { name: "ABC Juice", price: 45, category: "beverages", type: "Veg",img: "https://i.postimg.cc/6pLKmwPf/ABC-Juice-LGH-3fc22e6d-2105-4eb5-9371-af781fddcc4b-0-1400x919.jpg" },
  { name: "7 Up", price: 25, category: "beverages", type: "Veg",img: "https://i.postimg.cc/PJtVNsyk/7up-1.jpg" },
  { name: "Coca Cola", price: 25, category: "beverages", type: "Veg",img: "https://i.postimg.cc/66gM4m0K/i-Stock-487787108-3f77e523663f73c106cbcb81834a4248.webp" },
  
  { name: "Mango Juice", price: 35, category: "beverages", type: "Veg",img: "https://i.postimg.cc/tJ3yGjgv/carrot-mango-juice-in-two-glasses-copy.jpg" },
  { name: "Chicken Zinger Wrap", price: 150, category: "wraps", type: "Non-Veg", img: "https://i.postimg.cc/xT7VC5kx/zinger-wrap.avif" },
  { name: "BBQ Chicken Wrap", price: 140, category: "wraps", type: "Non-Veg", img: "https://i.postimg.cc/m2W66nHf/bbq-chicken-wrap-500x375.jpg" },
  { name: "Paneer Wrap", price: 110, category: "wraps", type: "Veg", img: "https://i.postimg.cc/rFbzkSqc/paneer-frankie.webp" },
  { name: "Egg Wrap", price: 120, category: "wraps", type: "Non-Veg", img: "https://i.postimg.cc/GhrnstzQ/kolkata-famous-egg-rolls-marripalem-visakhapatnam-frankie-outlets-n3fqq8fdpn.avif" },

  { name: "Smashed Chicken Burger", price: 150, category: "burger", type: "Non-Veg", img: "https://i.postimg.cc/W1C9gfj7/yf-chicken-burgers-three-By-Two-Medium-At2X.jpg" },
  { name: "Chicken Zinger Burger", price: 170, category: "burger", type: "Non-Veg", img: "https://i.postimg.cc/TwYWwfFX/chicken-zinger-burger-scaled.webp" },
  { name: "Smashed Beef Burger", price: 150, category: "burger", type: "Non-Veg", img: "https://i.postimg.cc/L8xJbrnd/20211013012331-covernew.webp" },
  { name: "Veg Burger", price: 100, category: "burger", type: "Veg", img: "https://i.postimg.cc/qM9bC5pm/image-5179-1775226675.jpg" },
  { name: "Onion Pizza", price: 200, category: "pizza", type: "Veg", img: "https://i.postimg.cc/MZfrKwS1/93901cc2c94eb573b71564b69bf204b2.jpg" },
  { name: "Sweetcorn Pizza", price: 220, category: "pizza", type: "Veg", img: "https://i.postimg.cc/Y9Mq2R4w/corn-cheese-2d0ca196e3f309375afeeb35a7ff565b-1.jpg" },
  { name: "Paneer Tikka Pizza", price: 210, category: "pizza", type: "Veg", img: "https://i.postimg.cc/9ftCk9x5/Paneer-Tikka.webp" },
  { name: "BBQ Chicken Pizza", price: 300, category: "pizza", type: "Non-Veg", img: "https://i.postimg.cc/br17GcKq/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg" },
  { name: "Pepperoni Pizza", price: 320, category: "pizza", type: "Non-Veg", img: "https://i.postimg.cc/nrnk1yXz/210391000-Bonici-DB-16oz-Pepperoni-Vodka-96494-1-horiz-4x3.jpg" },
  
  { name: "White Sauce Pasta", price: 170, category: "pasta", type: "Veg", img: "https://i.postimg.cc/rFBdXS9m/white-sauce-pasta-500x375.jpg" },
  { name: "Red Sauce Pasta", price: 170, category: "pasta", type: "Veg", img: "https://i.postimg.cc/B6jLfNRv/IMG-0246-1024x682.webp" },

  { name: "Pani Puri", price: 60, category: "chat", type: "Veg", img: "https://i.postimg.cc/XNDL5zVJ/Pani-Puri1.jpg" },
  { name: "Sev Puri", price: 60, category: "chat", type: "Veg", img: "https://i.postimg.cc/yxSZcnP7/IMG-20200106-183552.jpg" },
  { name: "Pav Bhaji", price: 90, category: "chat", type: "Veg", img: "https://i.postimg.cc/vHZRYj3q/Pav-Bhaji.jpg" },
  { name: "Chicken Loaded Fries", price: 200, category: "snacks", type: "Non-Veg", img: "https://i.postimg.cc/X7PnT44k/Chicken-Loaded-Fries.webp" },
  { name: "Donuts", price: 130, category: "snacks", type: "Veg", img: "https://i.postimg.cc/MKmFQYrf/Baked-Doughnuts-thumbnail-scaled.jpg" },
  { name: "Cream Bun", price: 32, category: "snacks", type: "Veg", img: "https://i.postimg.cc/x1bNZsDd/IMG-8916-scaled.jpg" },
  { name: "Chicken Puff Pastry", price: 25, category: "snacks", type: "Non-Veg", img: "https://i.postimg.cc/ryrmMDZJ/chicken-puff.jpg" },
  { name: "Chicken Samosa", price: 20, category: "snacks", type: "Non-Veg", img: "https://i.postimg.cc/Vv12xZV5/images.jpg" },
  { name: "Veg Momos", price: 70, category: "snacks", type: "Veg", img: "https://i.postimg.cc/cHVQ96X6/cheesy-spicy-veg-momos-10pcs-2227012532-kcdqxk2d.avif" }
  
];


let cart = JSON.parse(localStorage.getItem("cart")) || {};
let currentCategory = "all";
let currentType = "all";

const menuDiv = document.getElementById("menu");

// SHOW ITEMS
function showItems() {
  menuDiv.innerHTML = "";

  const filteredItems = menuItems
    .filter(item => currentCategory === "all" || item.category === currentCategory)
    .filter(item => currentType === "all" || item.type === currentType);

  filteredItems.forEach(item => {
    let qty = cart[item.name] || 0;

    let div = document.createElement("div");
    div.className = "food-card";

  div.innerHTML = `
    <img src="${item.img}" class="food-img">
    <h3 style="color:black;">${item.name}</h3>
    <p style="color:black;">₹${item.price}</p>

    <div class="controls">
      <button onclick="removeItem('${item.name}')">-</button>
      <span class="qty" style="color:black;">${qty}</span>
      <button onclick="addItem('${item.name}')">+</button>
    </div>
  `;
    menuDiv.appendChild(div);
  });
}

// FILTERS
function filterCategory(cat) {
  currentCategory = cat;
  showItems();
}

function filterType(type) {
  currentType = type;
  showItems();
}

// CART
function addItem(name) {
  cart[name] = (cart[name] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  showItems();
}

function removeItem(name) {
  if (!cart[name]) {
    cart[name]--;
    if (cart[name] === 0) delete cart[name];
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Nothing to delete");
    return;
  }
  cart[name]--;
  showItems();
}

// ORDER
function placeOrder() {
  localStorage.setItem("order", JSON.stringify(cart));
  window.location.href = "order.html";
}
console.log(menuItems);
showItems();

// Make functions global for onclick
window.filterCategory = filterCategory;
window.filterType = filterType;
window.addItem = addItem;
window.removeItem = removeItem;
window.placeOrder = placeOrder;