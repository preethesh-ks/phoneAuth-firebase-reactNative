import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useRef, useState ,useContext} from "react";
import firebase from '../firebase'
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { AuthContext } from "../authcontext/AuthContext";
import { useNavigation } from "@react-navigation/native";
import useAppStore from "../stores/app-stores";
import { shallow } from "zustand/shallow";
export default Login = ()=> {
const { login } = useContext(AuthContext);
    const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [results,setResults]=useState(null)
const navigation = useNavigation();

const { setUserInfo } = useAppStore(
   (state) => ({
     userInfo: state.userInfo,
     setUserInfo: state.setUserInfo,
   }),
  
 );

  const sendVerification = () => { 
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
  phoneProvider
    .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
    .then(setVerificationId); };
  const confirmCode = () => { 
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // Do something with the results here 
        // setResults(result.user.uid);
        const { user } = result;
        const stsTokenManager = result.user.toJSON().stsTokenManager;
        const userDetails = {
          access_token: stsTokenManager?.accessToken,
          refresh_token: stsTokenManager?.refreshToken,
          expiry_time: stsTokenManager?.expirationTime,
          user_id: user?.uid,
          phone_number: user?.phoneNumber,
        };

        setUserInfo(userDetails);
        navigation.navigate('LandingPage', {results:result});
      });
   };
  const styles = StyleSheet.create({
    text:{
      paddingTop:10
    }
  })
  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        attemptInvisibleVerification={true}
        androidHardwareAccelerationDisabled
        firebaseConfig={firebase.app().options}
      />
      {/* Phone Number Input */}

      <TextInput
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        style={styles.text}
      />
      <TouchableOpacity onPress={sendVerification}>
        <Text>Send Verification</Text>
      </TouchableOpacity>
      {/* Verification Code Input */}
      <TextInput
        placeholder="Confirmation Code"
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <TouchableOpacity onPress={()=>{confirmCode();login()}}>
        <Text>verify th codeee</Text>
      </TouchableOpacity>
    </View>
  );
}
