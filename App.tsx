

import React,{useState,useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native"
import RootTabNavigator from './src/navigation/RootTabNavigator';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';

import firebase from 'firebase/app'
require('firebase/auth')

import { firebaseConfig } from './src/utils/config';


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app();
}

import {View,ActivityIndicator} from 'react-native'
import Loading from './src/components/common/Loading';


export default function App(){
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  

  // Handle user state changes
  function onAuthStateChanged(user : any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    //firebase.auth().signOut(); // signout current account
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <Loading/>;


  return(
    <NavigationContainer>
      {user ? <RootTabNavigator/> : <AuthStackNavigator/>  }
    </NavigationContainer>
  )


}
