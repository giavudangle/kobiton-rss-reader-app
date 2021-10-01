import React from 'react';
import { BottomTabNavigationOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native';
import {ROUTES,TAB_ROUTES} from './RouteConst'

import Ionicons from '@expo/vector-icons/Ionicons'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'


import HomeStack from './StackOfScreens/HomeStack';
import ArchiveStack from './StackOfScreens/ArchiveStack';


const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>HELLO</Text>
    </View>
  )
}

export default function RootTabNavigator() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={TAB_ROUTES.ROOT_TAB}   
      barStyle={{
        backgroundColor:'#664B9D',
        margin:-10
      }}
    >
      <Tab.Screen
        options={() => ({
          tabBarLabel: 'Home',
          tabBarIcon: () => <Ionicons name='md-home' color='white' size={24} />
        })}
        name={TAB_ROUTES.HOME_TAB} component={HomeStack} />
      <Tab.Screen
        options={() => ({
          tabBarLabel: 'Archive',
          tabBarIcon: () => <Ionicons name='arrow-down-circle' color='white' size={24} />
        })}
        name={TAB_ROUTES.ARCHIVE_TAB} component={ArchiveStack} />

    </Tab.Navigator>
  )
}