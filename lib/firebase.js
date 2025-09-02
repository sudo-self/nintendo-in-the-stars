// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCWMwzWwfYnNA1um3aEYcMgqDDBXLxJi9I",
  authDomain: "svetle-book.firebaseapp.com",
  databaseURL: "https://svetle-book-default-rtdb.firebaseio.com",
  projectId: "svetle-book",
  storageBucket: "svetle-book.appspot.com",
  messagingSenderId: "359911049668",
  appId: "1:359911049668:web:a8e02772de14910db17c91"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };


