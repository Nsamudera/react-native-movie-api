/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
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
    initialRouteName: "Home",
  }
);

AppNavigator.navigationOptions =({ navigation }) => {
  let navigationOptions = {};
  navigationOptions.tabBarIcon = ({ focused }) => <Icon name="home" size={22} color='#00e378'></Icon>;
  return navigationOptions;
}

const AppContainerTab = createAppContainer(createBottomTabNavigator(
  {
    Home: AppNavigator,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#091A21',
        
      },
      activeTintColor: '#00e378'
    }
  }
));

export default class App extends Component {
  render() {
    return (
      <AppContainerTab />
    );
  }
}