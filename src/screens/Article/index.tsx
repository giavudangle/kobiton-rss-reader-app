import { NavigationContainerProps, NavigationProp } from '@react-navigation/core'
import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import WebView from 'react-native-webview'



const Article = (props : any) => {
  const articleId = props.route.params.articleId
  return (
    <SafeAreaView style={{ flex: 1 }}
    >
      <WebView
        source={{ uri: articleId}}
      />
    </SafeAreaView>

  )

}

export default Article
