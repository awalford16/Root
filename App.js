import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';

// Define navigation paths
const MainNav = createStackNavigator({
  Home: HomeScreen
}, {
  headerMode: 'none'
});

export default createAppContainer(MainNav);