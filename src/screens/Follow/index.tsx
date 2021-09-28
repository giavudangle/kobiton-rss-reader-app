import React from 'react'
import { View, Text,Image } from 'react-native'

const Follow = () => {
  return (
    <View>
      <Text>Follow Screen</Text>
      <Text>Follow Screen</Text>

      <Image 
        style={{flex:1,width:100,height:100}}
        source={require('../../assets/tiny_logo.png')}/>
        <Image source={{ uri: 'http://i.imgur.com/vKRaKDX.png', width: 32, height: 32, }} /> 

    </View>
  )
}

export default Follow
