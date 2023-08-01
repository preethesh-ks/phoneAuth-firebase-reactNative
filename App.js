import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, {useRef,useState} from 'react';

import AppNav from "./src/navigation/AppNav";
import { AuthProvider } from "./src/authcontext/AuthContext";



export default App = () => {
return (
  <AuthProvider>
    <AppNav/>
  </AuthProvider>
);
  
}