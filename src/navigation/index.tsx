import React,{useState,useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native"
import RootDrawerNavigator from "./RootDrawerNavigator"
import RootTabNavigator from './RootTabNavigator';
import AuthStackNavigator from './AuthStackNavigator';

import firebase from 'firebase/app'
import { firebaseConfig } from '../utils/config';


const app = firebase.initializeApp(firebaseConfig);

export default function MainNavigation(){
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Handle user state changes
  function onAuthStateChanged(user : any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = app.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;


  return(
    <NavigationContainer>
      {user ? <RootTabNavigator/> : <AuthStackNavigator/>  }
    </NavigationContainer>
  )
}