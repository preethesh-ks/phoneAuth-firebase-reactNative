import React,{useContext} from 'react'
import {Button, Text,View} from 'react-native'
import { AuthContext } from '../authcontext/AuthContext'
import {
  useNavigation,
  StackActions,
  useRoute,
} from "@react-navigation/native";
const LandingPage = ({route}) => {
  const {test,logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const results = route.params?.results;

  return (
    <View>
        <Text>
            
            hello
        </Text>
        <Button title="signout" onPress={logout}/>
    </View>
  )
}

export default LandingPage
