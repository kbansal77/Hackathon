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
  const [tokenId, setTokenId] = useState("")
  const [userId, setUserId] = useState("")  
  // const [userDetails, setUserDetails] = useState({
  //   uid: "",
  //   token: "",
  //   phoneNum:"",
  //   userName:""
  // })

  function Gsignup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // console.log(provider)
     return  firebase.auth().signInWithPopup(provider).then((result)=>{
      const User = result.user
      User.getIdToken(true).then((token)=>{
          
          // setUserDetails({
          //   uid: User.uid,
          //   token: token,
          //   phoneNum:"",
          //   userName:User.displayName
          // }
          setTokenId(token)
          setUserId(User.uid)


          
        })
    //   if(result.additionalUserInfo.isNewUser){
        
        
    //       // console.log(id_token)
    //       axios({
    //         url: `https://healings-backend.herokuapp.com/user/${User.uid}/add`,
    //         method:'post',
    //         data:{
    //          name: User.displayName,
    //          email: User.email,
    //          avatar: User.photoURL,
    //          joined: new Date()
    //         },
    //         headers: {
    //          "Content-Type": "application/json",
    //          "uid": User.uid,
    //          "token": tokenId
    //        }
    //       }).then((res)=>{
    //         console.log(res.headers)
    //       })
        
    //     // console.log(User.uid,User.displayName,User.email,User.photoURL,User.refreshToken)
    //     .catch((error)=>{
    //        console.log(error)
    //      })
    //    }
     })
  }

  function logout(){
    return auth.signOut()
  }

//   function  pSignUp(id, code){
//     var credential = firebase.auth.PhoneAuthProvider.credential(id, code);
//     firebase.auth().signInWithCredential(credential).then(function (result) {
//       // User signed in successfully.
//       var user = result.user;
//       console.log(user);
      
  
//       alert('Successfully logged in')
//       // ...
//       }).catch(function (error) {
//       // User couldn't sign in (bad verification code?)
//       // ...
//       console.log(error.message);
//       });
//   }
 
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
    tokenId,
    userId,
    Gsignup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
