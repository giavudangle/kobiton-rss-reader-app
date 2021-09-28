import React from 'react';
import {createDrawerNavigator,DrawerContentComponentProps,DrawerContentScrollView,DrawerItem,DrawerNavigationOptions} from '@react-navigation/drawer'
import ROUTES_ENUM from './RouteConst'
import {Ionicons} from '@expo/vector-icons'
import { View } from 'react-native';
import RootStackNavigator from './RootStackNavigator';

const DrawerContent = (props: DrawerContentComponentProps) => {
  return(
    <View style={{flex:1}}>

    </View>
  )
}

export default function RootDrawerNavigator(){
  const Drawer = createDrawerNavigator();
  return(
    <Drawer.Navigator initialRouteName="RootDrawer" drawerContent={DrawerContent}>
      <Drawer.Screen name="RootStack" component={RootStackNavigator}/>
    </Drawer.Navigator>
  )
  
  
}