import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyDhIWL8C9y4DEZQvRwqhxHy8LR4yP98-Vo",
    authDomain: "mailman-9a4f3.firebaseapp.com",
    projectId: "mailman-9a4f3",
    storageBucket: "mailman-9a4f3.appspot.com",
    messagingSenderId: "1019293022905",
    appId: "1:1019293022905:web:0c98719d1c4824e3173968",
    measurementId: "G-EHLE8GGH05"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  export const auth = app.auth()
  export default app;