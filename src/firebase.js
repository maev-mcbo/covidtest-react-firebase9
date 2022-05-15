import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyCuwxO-3UXsbDew17mb-ioDOgw0BPOEIpc",
  authDomain: "covidtest-react.firebaseapp.com",
  projectId: "covidtest-react",
  storageBucket: "covidtest-react.appspot.com",
  messagingSenderId: "229934868674",
  appId: "1:229934868674:web:7a70c0ee633686e778b35b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db} ;