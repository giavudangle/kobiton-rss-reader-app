import React, { useCallback, useRef, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'
import { IArticle } from '../../../types'
import * as rssParser from 'react-native-rss-parser';
import * as _ from 'lodash'
import { useNavigation } from '@react-navigation/core'
import {ROUTES} from '../../navigation/RouteConst'
import Swipeable from "react-native-gesture-handler/Swipeable";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Article from '../../components/Article'




interface IRSSPlaceHolder {
  searchTerm: string,
  setSetTerm: any,
  onTermSubmit: any
}

const RSSPlaceHolder = ({ searchTerm, setSetTerm, onTermSubmit }: IRSSPlaceHolder) => {
  return (
    <View style={styles.placeholderContainer}>
      <Ionicons style={styles.iconContainer} name='search' color='white' size={28} />
      <TextInput
        style={styles.txtContainer}
        placeholder="Push RSI link here "
        placeholderTextColor='white'
        onChangeText={t => setSetTerm(t)}
        onEndEditing={onTermSubmit}
        value={searchTerm}
      />
      <Ionicons
        onPress={() => setSetTerm('')}
        style={{
          display: searchTerm.length > 0 ? 'flex' : 'none',
          position: 'absolute',
          right: 34,
          zIndex: 999
        }} name='backspace' color='white' size={24} />
    </View>
  )
}




export default RSSPlaceHolder

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
    backgroundColor: '#4a4e4e',
    marginVertical: -10,
    paddingVertical: 10,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 100,
    color: 'white',
    paddingLeft: 60,
    paddingRight:60

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
    borderRadius: 10,
    zIndex: -99
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
  closeIconContainer: {
    position: 'absolute',
    right: 34,
    zIndex: 99
  }
})

const stylesDiff = StyleSheet.create({
  itemContainer: {
    height: 100,
    flexDirection: "row",
    backgroundColor: '#2a2a2a',
    marginTop: 0,
    borderRadius: 0,
    alignItems: "center",
    marginBottom: 2
  },
  info: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 10,
    width: "75%",
    marginLeft: 16

  },
  title: {
    fontSize: 16,
    width: 200
  },
  subText: {
    fontSize: 13,
    paddingVertical: 2,
    color: '#2a2a2a',
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginVertical: 4

  },
  rate: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: '#2a2a2a',
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    color: '#2a2a2a',
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  rightAction: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 100,
    margin: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  actionText: {
    color: "white",
    fontSize: 11,
    backgroundColor: "transparent",
    padding: 5,
  },
});