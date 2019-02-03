/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


//components
import Home from './containers/Home/Home.js'
import Detail from './containers/Detail/Detail'

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Detail: Detail,
  },
  {
    initialRouteName: "Home"
  }
);

AppNavigator.navigationOptions =({ navigation }) => {
  let navigationOptions = {};
  navigationOptions.tabBarIcon = ({ focused }) => <Icon name="home" size={22}></Icon>;
  return navigationOptions;
}

const AppContainerTab = createAppContainer(createBottomTabNavigator(
  {
    Home: AppNavigator,
  }
));

export default class App extends Component {
  render() {
    return (
      <AppContainerTab />
    );
  }
}