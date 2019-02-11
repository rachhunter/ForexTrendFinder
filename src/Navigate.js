//Sets up navigation in the App - in this case tabs
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Register from './screens/Register';
import Daily from './screens/Daily';

//Tab navigation for Daily.js & Logout.js (when 'user' state exists)
export const Pages = createBottomTabNavigator({
  Daily: {
    screen: Daily,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon name="list" size={35} color={tintColor} />
    },
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon name="sign-out" size={35} color={tintColor} />
    },
  },
},
  {
    animationEnabled: true,
    tabBarOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#33ccff',
            inactiveTintColor: '#33ccff',
            inactiveBackgroundColor: '#fff',
            showLabel: false,
    }
});

//Tab navigation for Login.js & Register.js (when no 'user' state)
export const AuthTabs = createBottomTabNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon name="sign-in" size={35} color={tintColor} />
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) =>
        <Icon name="user-plus" size={35} color={tintColor} />
    },
  },
},
  {
    animationEnabled: true,
    tabBarOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#33ccff',
            inactiveTintColor: '#33ccff',
            inactiveBackgroundColor: '#fff',
            showLabel: false,
    }
});
