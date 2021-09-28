import React from 'react';
import ROUTES_ENUM from '../RouteConst';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../../screens/Home'
type HomeStackParamsList = {
  [ROUTES_ENUM.HOME]: undefined
}

export default function HomeStack() {
  const Stack = createNativeStackNavigator<HomeStackParamsList>()
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} initialRouteName={ROUTES_ENUM.HOME}>
      <Stack.Screen name={ROUTES_ENUM.HOME} component={HomeScreen}/>
    </Stack.Navigator>
  )
}