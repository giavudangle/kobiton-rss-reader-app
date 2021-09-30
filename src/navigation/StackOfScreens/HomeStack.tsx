import React from 'react';
import ROUTES_ENUM from '../RouteConst';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../../screens/Home'
import ArticleScreen from '../../screens/Article'
type HomeStackParamsList = {
  [ROUTES_ENUM.HOME]: undefined,
  [ROUTES_ENUM.ARTICLE]: undefined,

}

export default function HomeStack() {
  const Stack = createNativeStackNavigator<HomeStackParamsList>()
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} initialRouteName={ROUTES_ENUM.HOME}>
      <Stack.Screen name={ROUTES_ENUM.HOME} component={HomeScreen}/>
      <Stack.Screen name={ROUTES_ENUM.ARTICLE} component={ArticleScreen}/>

    </Stack.Navigator>
  )
}