import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {decode, encode} from 'base-64';

import HomeScreen from './screens/HomeScreen';
import DonateScreen from './screens/DonateScreen';
import JourneyScreen from './screens/JourneyScreen';
import ProfileScreen from './screens/ProfileScreen';
import JourneyEndScreen from './screens/JourneyEndScreen';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();

const Ops = {
  headerTitle: '',
  headerTransparent: true
}

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

console.disableYellowBox = true;

function ModalStackScreen() {
  return(
    <ModalStack.Navigator>
      <ModalStack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
    </ModalStack.Navigator>
  );
}

function MainStackScreen() {
  return(
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}  />
      <MainStack.Screen name="Journey" component={JourneyScreen} options={{headerShown: false}} />
      <MainStack.Screen name="JourneyEnd" component={JourneyEndScreen} options={{headerShown: false}} />
    </MainStack.Navigator>
  );
}

function App() {
  return(
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="Main" component={MainStackScreen} options={{headerShown: false}}  />
        <RootStack.Screen name="Modal" component={ModalStackScreen} options={{headerShown: false}} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// Define navigation paths
// const MainNav = createStackNavigator({
//   Home: HomeScreen,
//   Donate: DonateScreen
// }, {
//   headerMode: 'none'
// });

export default App;