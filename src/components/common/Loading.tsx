import React from "react"
import { View,ActivityIndicator } from "react-native"

const Loading = () => {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <ActivityIndicator
        size="large"
        color="#359DD4"
      />
    </View>
  )
}

export default Loading