import React from 'react';
import {ROUTES} from '../RouteConst';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ArchiveScreen from '../../screens/Archive'
type FollowStackParamsList = {
  [ROUTES.ARCHIVE]: undefined
}

export default function HomeStack() {
  const Stack = createNativeStackNavigator<FollowStackParamsList>()
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} initialRouteName={ROUTES.ARCHIVE}>
      <Stack.Screen name={ROUTES.ARCHIVE} component={ArchiveScreen}/>
    </Stack.Navigator>
  )
}