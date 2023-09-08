import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDRNORl1pZl4yltgWjVG2DeXYFTda1eGmY",
  authDomain: "vanlife-6e5e4.firebaseapp.com",
  projectId: "vanlife-6e5e4",
  storageBucket: "vanlife-6e5e4.appspot.com",
  messagingSenderId: "415807554181",
  appId: "1:415807554181:web:cf1789fff800adfefd9fec",
};

export const app = initializeApp(firebaseConfig);
