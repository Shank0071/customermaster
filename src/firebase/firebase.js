import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBa1GFEZbX7XS3RW2JVuwXP3Jg2WqUHHWY",
    authDomain: "customermaster-c22c1.firebaseapp.com",
    projectId: "customermaster-c22c1",
    storageBucket: "customermaster-c22c1.appspot.com",
    messagingSenderId: "159671204644",
    appId: "1:159671204644:web:75dff2b5078aa8f11511b1",
    measurementId: "G-Z73MH1FZKZ"
  };



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {db}
