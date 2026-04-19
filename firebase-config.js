// Firebase configuration - Your actual project credentials
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-ec1LP3M04-diwcNijQV2W4dbSecYwnw",
  authDomain: "prompt-wars-65644.firebaseapp.com",
  databaseURL: "https://prompt-wars-65644-default-rtdb.firebaseio.com",
  projectId: "prompt-wars-65644",
  storageBucket: "prompt-wars-65644.firebasestorage.app",
  messagingSenderId: "213086307782",
  appId: "1:213086307782:web:d01e102101fca2dd451ec7",
  measurementId: "G-L6S38E0L5N"
};

// Handle async response errors from extensions (suppress non-critical errors)
window.addEventListener('error', (e) => {
  if (e.message && e.message.includes('listener indicated an asynchronous response')) {
    e.preventDefault();
    return false;
  }
});

// Initialize Firebase with error handling
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.database();
    window.firestore = firebase.firestore();
    console.log('✅ Firebase initialized successfully with project:', firebaseConfig.projectId);
  } else {
    console.warn('⚠️ Firebase SDK not loaded. Check network connection.');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // Set dummy objects so app doesn't crash
  window.db = null;
  window.firestore = null;
}