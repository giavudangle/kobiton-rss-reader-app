import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import RootDrawerNavigator from "./RootDrawerNavigator"
import RootTabNavigator from './RootTabNavigator';

export default function MainNavigation(){
  return(
    <NavigationContainer>
      <RootTabNavigator/>
    </NavigationContainer>
  )
}