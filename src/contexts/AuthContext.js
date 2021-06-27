import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { auth } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function addUserDetails(name, email) {
  const sdata = {
    _id: email,
    displayName: name,
  };
  fetch("https://mailman-backend.herokuapp.com/users", {
    method: "POST",
    body: JSON.stringify(sdata),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.log(err);
  });
  return true;
}




export function AuthProvider({ children }) {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("")

  async function getusername(email){
    var response = await fetch(`https://mailman-backend.herokuapp.com/${email}`)
    var data = await response.json()
    setDisplayName(data.user.displayName)
  }
  

  function Gsignup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // console.log(provider)
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        setDisplayName(user.displayName)
        if (result.additionalUserInfo.isNewUser) {
          addUserDetails(user.displayName, user.email);
        }
      }).then(() => {
        setError("");
      });
  }

  function emailSignup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function emailLogin(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        getusername(email)
        setError("");
      })
      .catch((err) => {
        setError("Enter correct credentials");
      });
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
      setLoading(false);
      // if (user != null)
      //   console.log(user.additionalUserInfo)
    });

    return unsubscribe;
  }, []);
  console.log(displayName)
  const value = {
    currentUser,
    Gsignup,
    emailLogin,
    emailSignup,
    error,
    logout,
    displayName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
