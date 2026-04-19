// Firebase Functions for Crowd Data (Realtime Database)
function updateCrowdData(zone, count) {
  window.db.ref('crowd/' + zone).set(count);
}

function getCrowdData(callback) {
  window.db.ref('crowd').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

// Orders in Firestore
function addOrder(orderData) {
  try {
    if (window.firestore) {
      return window.firestore.collection('orders').add(orderData);
    } else {
      console.warn('Firestore not initialized');
      return Promise.resolve({ id: 'test-id-' + Date.now() });
    }
  } catch (error) {
    console.error('Error in addOrder:', error);
    return Promise.resolve({ id: 'test-id-' + Date.now() });
  }
}

function updateOrderStatus(orderId, status) {
  try {
    if (window.firestore && orderId !== 'test-id' && !orderId.includes('test-id')) {
      return window.firestore.collection('orders').doc(orderId).update({ status: status });
    } else {
      console.log('Order status update (test mode):', orderId, status);
      return Promise.resolve();
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    return Promise.resolve();
  }
}

function getOrders(callback) {
  window.firestore.collection('orders').onSnapshot((querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    callback(orders);
  });
}

// Friend Coordinates (Realtime Database)
function updateFriendLocation(userId, lat, lng) {
  window.db.ref('friends/' + userId + '/location').set({ lat: lat, lng });
}

function getFriendLocations(callback) {
  window.db.ref('friends').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

// SOS Alerts (Firestore)
function addSOSAlert(alertData) {
  return window.firestore.collection('sos').add(alertData);
}

function getSOSAlerts(callback) {
  window.firestore.collection('sos').onSnapshot((querySnapshot) => {
    const alerts = [];
    querySnapshot.forEach((doc) => {
      alerts.push({ id: doc.id, ...doc.data() });
    });
    callback(alerts);
  });
}

// AI Assistant: Read past + current data for predictions
function getDataForAI(callback) {
  const data = {};
  // Get crowd data
  window.db.ref('crowd').once('value').then((crowdSnap) => {
    data.crowd = crowdSnap.val();
    // Get orders
    window.firestore.collection('orders').get().then((orderSnap) => {
      data.orders = [];
      orderSnap.forEach((doc) => {
        data.orders.push({ id: doc.id, ...doc.data() });
      });
      // Get SOS
      window.firestore.collection('sos').get().then((sosSnap) => {
        data.sos = [];
        sosSnap.forEach((doc) => {
          data.sos.push({ id: doc.id, ...doc.data() });
        });
        // Get friends
        window.db.ref('friends').once('value').then((friendSnap) => {
          data.friends = friendSnap.val();
          callback(data);
        });
      });
    });
  });
}

// Example prediction function (simple, can be enhanced)
function predictCrowd(zone) {
  // Placeholder: Use data to predict
  // For now, just return current
  return new Promise((resolve) => {
    window.db.ref('crowd/' + zone).once('value').then((snap) => {
      resolve(snap.val() || 0);
    });
  });
}

