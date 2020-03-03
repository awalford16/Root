import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import DonateScreen from './screens/DonateScreen';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();

const Ops = {
  headerTitle: '',
  headerTransparent: true
}

function ModalStackScreen() {
  return(
    <ModalStack.Navigator>
      <ModalStack.Screen name="Donate" component={DonateScreen} />
    </ModalStack.Navigator>
  );
}

function MainStackScreen() {
  return(
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}  />
    </MainStack.Navigator>
  );
}

function App() {
  return(
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="Main" component={MainStackScreen} options={{headerShown: false}}  />
        <RootStack.Screen name="Donate" component={DonateScreen} options={{headerShown: false}} />
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