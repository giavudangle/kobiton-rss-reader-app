import React, { useRef } from 'react'
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import { IArticle } from '../../../types'
import * as _ from 'lodash'
import { DEFAULT_LOGO,ASYNC_STORAGE_KEY } from '../../utils/global'
import Swipeable from "react-native-gesture-handler/Swipeable";
import AsyncStorage from '@react-native-async-storage/async-storage'



interface IArticleProps {
  article: IArticle,
  onPressArticle: (articleLink: string) => any,
  
}


const ArticleRowArchive = ({ article, onPressArticle }: IArticleProps) => {
  const { title, description, imageUrl } = article
  const swipeableRef = useRef<null | any>(null);

  const renderLeftActions = (text: any, color: any, action: any, x: any, progress: any) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <TouchableOpacity
          style={[stylesDiff.rightAction, { backgroundColor: color }]}
          onPress={action}
        >
          <Text style={stylesDiff.actionText}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const SwipeableRightActions = (progress: any) => {
    return (
      <View style={{ width: 220, height: 300 }}>
        {renderLeftActions(
          "Unarchive",
          "tomato",
          handleRemoveArticleFromArchive,
          10,
          progress
        )}
      </View>
    )
  }

  const closeSwipeable = () => {
    swipeableRef.current.close();
  }



  const handleRemoveArticleFromArchive = async () => {
    try {
      const data = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
      let arr :IArticle[] = JSON.parse(data as any)
      const newArr =  arr.filter((item) => item.id !== article.id)
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY,JSON.stringify(newArr))
      
     } catch(e){
       alert(e)
     }

    closeSwipeable()
  }

  return (
    <Swipeable
      friction={2}
      rightThreshold={20}
      renderLeftActions={SwipeableRightActions}
      ref={swipeableRef}
    >
      <View style={styles.articleContainer} >
        <View style={styles.articalContentContainer}>
          <Text onPress={() => onPressArticle(article.link)} style={styles.articleTitle}>{title}</Text>
          {/* <Text style={styles.articleDescription}>{description.slice(0, 60)} ...</Text> */}
        </View>
        <View style={styles.articalImageContainer}>
          <Image style={styles.articalImage} source={{ uri: imageUrl == undefined ? DEFAULT_LOGO  : imageUrl }} />
        </View>
      </View>
    </Swipeable>
  )
}





export default ArticleRowArchive

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
    height: '100%',
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