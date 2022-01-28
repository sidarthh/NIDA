import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackRouter } from "react-navigation";
import { Colors } from './../components/Styles';
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Welcome from "../screens/Welcome";
import Profile from "../screens/Profile";
import Venues from "../screens/Venues";
import ContactUs from "../screens/ContactUs";
import DetailsScreen from "../screens/DetailsScreen"
import BookSlots from "../screens/BookSlots";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const Home=() =>{
    return (
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="Profile" component={Profile}/>
        <Tab.Screen name="Venues" component={Venues} />
        <Tab.Screen name="ContactUs" component={ContactUs} />
      </Tab.Navigator>
    );
  }

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
             screenOptions={{
                headerStyle:{
                    backgroundColor:"#ffffff",
                },
                headerTitle:'',
                headerTintColor:"#1F2937",
                headerTransparent:true,
                headerLeftContainerStyle:{
                    padding:20
                },
                headerShown:false,
            }}
             initialRouteName="Login">
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Home" component={Home} options={{headerLeft:null}}/>
                <Stack.Screen name="DetailsScreen" component={DetailsScreen}/>
                <Stack.Screen name="BookSlots" component={BookSlots} />
                
                


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack
