import React from 'react';
import {ROUTES} from '../RouteConst';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../../screens/Home'
import ArticleScreen from '../../screens/Article'
type HomeStackParamsList = {
  [ROUTES.HOME]: undefined,
  [ROUTES.ARTICLE]: undefined,

}

export default function HomeStack() {
  const Stack = createNativeStackNavigator<HomeStackParamsList>()
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen}/>
      <Stack.Screen name={ROUTES.ARTICLE} component={ArticleScreen}/>

    </Stack.Navigator>
  )
}