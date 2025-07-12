import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKx6JHPUuwkpbeQnkhuKC3BXnJjxk-vEc",
  authDomain: "planero-trello-clone.firebaseapp.com",
  projectId: "planero-trello-clone",
  storageBucket: "planero-trello-clone.firebasestorage.app",
  messagingSenderId: "253180350493",
  appId: "1:253180350493:web:2c5684cf3bcc87312476f4",
  measurementId: "G-HP3STWYHB5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
