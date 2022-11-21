import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

(function () {
  // Your web app's Firebase configuration, get it from your firebase project settings page on the General tab.
  const firebaseConfig = {
    apiKey: "AIzaSyCT8Lw0_zOYQaaMUwUNB8OEXVX1Ta74Nb4",
    authDomain: "courso-6cbce.firebaseapp.com",
    databaseURL: "https://courso-6cbce-default-rtdb.firebaseio.com",
    projectId: "courso-6cbce",
    storageBucket: "courso-6cbce.appspot.com",
    messagingSenderId: "652981200904",
    appId: "1:652981200904:web:3ec4b6610e5847621d89bd"
  };
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  // TODO: initialize provider for google auth
  const provider = new GoogleAuthProvider();

  console.log("app initialized...");

  // get elements
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const login = document.getElementById("login");
  const signup = document.getElementById("signup");
  const logout = document.getElementById("logout");
  const loggedInStatus = document.getElementById("loggedInStatus");
  const googlelogin = document.getElementById("googlelogin");

  // login
  login.addEventListener("click", (e) => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // signup
  signup.addEventListener("click", (e) => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //TODO: Add Google Sign in
  googlelogin.addEventListener("click", (e) => {
    console.log("google sign in clicked");

    // TODO: Use signInWithPopup to implement Google sign in
    // Hint: refer to instructions in the official google documentation: https://firebase.google.com/docs/auth/web/google-signin
  
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  
  });


  // logout
  logout.addEventListener("click", (e) => {
    auth.signOut();
  });

  // login state
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      loggedInStatus.innerText = `You are logged in using the following email: ${firebaseUser.email}`;
      logout.style.display = "inline";
      login.style.display = "none";
      signup.style.display = "none";
      email.style.display = "none";
      password.style.display = "none";
      googlelogin.style.display = "none";
    } else {
      console.log("User is not logged in");
      loggedInStatus.innerText = "You are not yet logged in";
      login.style.display = "inline";
      signup.style.display = "inline";
      email.style.display = "inline";
      googlelogin.style.display = "inline";
      password.style.display = "inline";
      logout.style.display = "none";
    }
  });
})();
