/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation'

import SplashScreen from './Components/SplashScreen'
import LoginScreen from './Components/LoginScreen'
import CryptoCoinDashboard from './Components/CryptoCoinDashboard'
import CryptoCoinDetails from './Components/CryptoCoinDetails'

import FlexBoxTutorial from './Utils/RxTestModules/FlexBoxTutorial'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const NavigationStack = StackNavigator(
 {
   SplashScreen: {
     screen: SplashScreen,
   },
   LoginScreen:{
    screen: LoginScreen,
   },
   CryptoCoinDashboard :{
    screen : CryptoCoinDashboard
   },
   CryptoCoinDetails:{
     screen:CryptoCoinDetails,
     
   },
   FlexBoxTutorial:{
     screen:FlexBoxTutorial
   }

},
{initialRouteName:"SplashScreen"}
//{initialRouteName:"CryptoCoinDetails"}

);


export default class App extends Component {
  render() {
    return (
     <NavigationStack/>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
