import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { IArticle } from '../../../types'
import * as _ from 'lodash'
import * as Linking from 'expo-linking'
import { ASYNC_STORAGE_KEY, DEFAULT_LOGO } from '../../utils/global'
import ArticleRowArchive from './ArticleRowArchive'
import {ROUTES} from '../../navigation/RouteConst'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native';




const Archive = () => {

  const [data, setData] = useState<IArticle[]>([]);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const syncDataFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
      if (value !== null) {
        setData(JSON.parse(value))
      } else {
        return;
      }
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    //AsyncStorage.clear();
  },[])

  if (isFocused) {
    syncDataFromAsyncStorage()
  }



  const _onPressArticle = (articleId: string) => {
    navigation.navigate(ROUTES.ARTICLE, { articleId })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: DEFAULT_LOGO }} style={styles.appLogo} />
      <Text style={styles.title}>Archive Articles</Text>

      {
        data.length > 0
          ? (
            <ScrollView>
              {data.map((el, idx) => {
                return (
                  <ArticleRowArchive
                    article={el}
                    onPressArticle={_onPressArticle}
                  />
                )
              })}
            </ScrollView>
          )
          : <Text style={{marginHorizontal:10,fontStyle:'italic'}}> Nothing here. Let's add new article</Text>
      }


    </SafeAreaView>
  )
}

export default Archive

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  placeholderContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtContainer: {
    backgroundColor: '#5a5e5e',
    marginVertical: -10,
    paddingVertical: 10,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 100,
    color: 'white',
    paddingLeft: 60

  },
  iconContainer: {
    position: 'absolute',
    left: 40,
    zIndex: 99
  },
  txtTitle: {
    fontSize: 30,
    fontFamily: 'Roboto',
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10
  },
  articalImage: {
    width: '100%',
    height: '50%',
    borderRadius: 10
  },
  articleTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  articleLink: {
    color: '#333'

  },
  articleDescription: {
    color: '#333',
    width: '100%',
    height: '100%'

  },
  articleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 18,
    margin: 8,


  },
  articalContentContainer: {
    width: '65%',
  },
  articalImageContainer: {
    width: '35%',

  },
  appLogo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: -10
  },
  title: {
    fontWeight: "bold",
    fontSize: 38,
    marginHorizontal: 10
  },
})