import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity,TextInput } from 'react-native'
import { DEFAULT_LOGO } from '../../utils/global'
import FeatherIcon from '@expo/vector-icons/Feather'
import * as GoogleSignIn from 'expo-google-sign-in';
import { useNavigation } from '@react-navigation/core';
import {ROUTES} from '../../navigation/RouteConst';
import firebase from 'firebase/app'
import Loading from '../../components/Common/Loading';

const { width, height } = Dimensions.get('window')

interface IFormHolder {
  placeholder: string,
  onChangeText: any,
  keyboardType: any,
  isSecurity: boolean
}

const FormHolder = ({ placeholder, onChangeText, keyboardType,isSecurity }: IFormHolder) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      style={formStyles.formContainer}
      placeholder={placeholder}
      onChangeText={(text) => onChangeText(text)}
      secureTextEntry={isSecurity ? true : false}
    />

  )
}

interface ICustomButton {
  title: string,
  onPress: () => any,
}


const btnStyles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#fff',
    width: 200,
    height: 60,
    top:80,
    borderRadius:90,
    justifyContent:'center',
    alignItems:'center'   ,
    borderWidth:1,
    borderColor:'#2A2A2A'
  },
  btnText:{
    fontSize:20,
    fontWeight:'bold',
    color:'#359DD4',
  
  }
})

const CustomButton = ({title,onPress} : ICustomButton) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={btnStyles.btnContainer}>
        <Text style={btnStyles.btnText}>LOGIN</Text>
      </View>
    </TouchableOpacity>
  )
}




const Login = () => {
  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const navigation = useNavigation<any>()


  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email,password);
    } catch(e){
      alert(e)
    }
  }

  const handleSignup = () => {
    navigation.navigate(ROUTES.SIGNUP)
  }

 

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: DEFAULT_LOGO }} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.ssoText}>SSO LOGIN</Text>
        <FormHolder
          placeholder="Enter your email "
          onChangeText={setEmail}
          keyboardType="email-address"
          isSecurity={false}
        />
        <FormHolder
          placeholder="Enter your password "
          onChangeText={setPassword}
          keyboardType="password"
          isSecurity={true}
        />
        <CustomButton
          title="Login"
          onPress={handleLogin}
        />
        <TouchableOpacity onPress={handleSignup}>
        <Text style={styles.signupText}>Create an account ?</Text>

        </TouchableOpacity>

      </View>
      

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  logoContainer: {
    flex: 1 / 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 2 / 3,
    backgroundColor: '#359DD4',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: '90%'
  },
  ssoLoginContainer: {
    width: width / 2,
    height: height / 4.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed'
  },
  ssoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,

  },
  btnContainer:{

  },
  signupText:{
    top:110,
    fontSize:18,
    fontWeight:'300',
    color:'#fff',
    fontStyle:'italic'
  }

})

const formStyles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    width: '90%',
    height: '10%',
    marginVertical: 20,
    borderRadius: 90,
    padding: 20,
    top: 50
  }
})

export default Login
