import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import RootDrawerNavigator from "./RootDrawerNavigator"
import RootTabNavigator from './RootTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';
export default function MainNavigation(){
  const flag = false;
  return(
    <NavigationContainer>
      {flag as any === true ? <RootTabNavigator/> : <AuthStackNavigator/>  }
    </NavigationContainer>
  )
}