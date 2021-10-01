import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ROUTES} from './RouteConst';
import HomeStack from './StackOfScreens/HomeStack'
export default function RootStackNavigator() {
  const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator  initialRouteName="Main">
      <RootStack.Screen name={ROUTES.HOME} component={HomeStack}/>
    </RootStack.Navigator>
  )
}