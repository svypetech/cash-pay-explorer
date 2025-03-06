// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAzyQNGrf0Lj-z7pMfkHzP-fUAgCzS2Uvg",
    authDomain: "vupop-405a2.firebaseapp.com",
    projectId: "vupop-405a2",
    storageBucket: "vupop-405a2.appspot.com",
    messagingSenderId: "1075035781172",
    appId: "1:1075035781172:web:611fa05714370ad8633261",
    measurementId: "G-TR1JMYTBSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, addDoc, collection };
