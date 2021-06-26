import React, { useContext, useState, useEffect } from "react"
import firebase from 'firebase/app'
import  {auth} from "../firebase"
import axios from 'axios'


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)  
    
  

  function Gsignup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // console.log(provider)
     return  firebase.auth().signInWithPopup(provider).then((result)=>{
      const User = result.user
          
    
     })
  }
  function emailSignup(email,password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  }

  function emailLogin(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  function logout(){
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log(user)
      setLoading(false)
      // if (user != null)
      //   console.log(user.additionalUserInfo)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    Gsignup,
    emailLogin,
    emailSignup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
