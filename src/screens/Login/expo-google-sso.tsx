import React,{useEffect, useState } from 'react'
import { View, Text,StyleSheet,Image,Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { default_logo } from '../../utils/global'
import FeatherIcon from '@expo/vector-icons/Feather'
import * as GoogleSignIn from 'expo-google-sign-in';

const {width,height} = Dimensions.get('window')

const CLIENT_ID = '893087763166-g82ivr9d7cgvvlvstgj38rb28c2pp6e6.apps.googleusercontent.com'


const Login = () => {
  const [user,setUser] = useState<any>(null);


  useEffect(() => {
    initAsync();
  },[])

  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId:CLIENT_ID
    })
    _syncUserWithStateAsync();
  }

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user);
  }

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null);
  }

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const {type,user} = await GoogleSignIn.signInAsync()
      if(type==='success'){
        _syncUserWithStateAsync()
      }
    } catch({message}){
      alert('login: Error:' + message);
    }
  }


  const handleLogin = () => {
    if(user){
      signOutAsync();
    } else {
      signInAsync();
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{uri:default_logo}} style={styles.logo}/>
      </View>
      <View style={styles.btnContainer}>
        
        <TouchableOpacity onPress={handleLogin}>
        <View style={styles.ssoLoginContainer}>
          <FeatherIcon name='lock' size={80} color='#359DD4'/>
        </View>
        </TouchableOpacity>
        
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container :{
    flex:1
  },
  logoContainer:{
    flex:1/2,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center' 
  },
  btnContainer:{
    flex:1/2,
    backgroundColor:'#359DD4',
    borderTopLeftRadius:90,  
    borderTopRightRadius:90,  
    justifyContent:'center',
    alignItems:'center' 
  },
  logo:{
    width:'90%',
    height:'90%'
  },
  ssoLoginContainer:{
    width:width/2,
    height:height/4.5,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:1000,
    borderWidth:2,
    borderColor:'#333',
    borderStyle:'dashed' 
  },
  ssoText:{
    fontSize:40,
    fontWeight:'bold',
    
  }
})

export default Login
