import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDXuIyCe27jsGwCAzvWdMZTas_158XFFzU",
	authDomain: "lab3booktracker.firebaseapp.com",
	projectId: "lab3booktracker",
	storageBucket: "lab3booktracker.appspot.com",
	messagingSenderId: "711078122251",
	appId: "1:711078122251:web:7fb874145db14f249a880e",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
