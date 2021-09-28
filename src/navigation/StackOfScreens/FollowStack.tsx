import React from 'react';
import ROUTES_ENUM from '../RouteConst';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import FollowScreen from '../../screens/Follow'
type FollowStackParamsList = {
  [ROUTES_ENUM.FOLLOW]: undefined
}

export default function HomeStack() {
  const Stack = createNativeStackNavigator<FollowStackParamsList>()
  return(
    <Stack.Navigator initialRouteName={ROUTES_ENUM.FOLLOW}>
      <Stack.Screen name={ROUTES_ENUM.FOLLOW} component={FollowScreen}/>
    </Stack.Navigator>
  )
}