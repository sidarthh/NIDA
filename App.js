import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login'
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome';

import RootStack from './navigators/RootStack';


export default function App() {
  return (
    <RootStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
