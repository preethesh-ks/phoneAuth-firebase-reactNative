import React,{useContext} from 'react'
import Login from "../AuthProvider/Login";
import LandingPage from "../components/LandingPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../authcontext/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();
const AppNav = () => {
    const {isLoading,userToken} =useContext(AuthContext)
        if(isLoading){
            return(
            <View style={{flex:1,justifyContent:'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
            )
        }


  return (
    <NavigationContainer>
      <Stack.Navigator>
      {userToken !== null ?
        <Stack.Screen name="LandingPage" component={LandingPage} />:
        <Stack.Screen name="Login" component={Login} /> }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNav;