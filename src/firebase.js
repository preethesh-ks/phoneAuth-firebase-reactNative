import * as firebase from "firebase";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHIxHTAd01QdxyxO53luMQKupcOAcBmvg",
  authDomain: "test-auth-cdbe2.firebaseapp.com",
  projectId: "test-auth-cdbe2",
  storageBucket: "test-auth-cdbe2.appspot.com",
  messagingSenderId: "402026757869",
  appId: "1:402026757869:web:5e31a47fd2b4add0fc56e4",
};
firebase.initializeApp(firebaseConfig);
export default firebase;