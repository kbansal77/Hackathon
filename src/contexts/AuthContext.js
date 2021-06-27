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
     return  firebase.auth().signInWithPopup(provider)
  }
  function emailSignup(email,password){
     return auth.createUserWithEmailAndPassword(email, password)
  }

  function emailLogin(email,password){
    return auth.signInWithEmailAndPassword(email, password)
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
