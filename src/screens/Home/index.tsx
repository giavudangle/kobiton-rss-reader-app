import React, { useCallback, useRef, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'
import { IArticle } from '../../../types'
import * as rssParser from 'react-native-rss-parser';
import * as _ from 'lodash'
import { useNavigation } from '@react-navigation/core'
import ROUTES from '../../navigation/RouteConst'
import { default_logo } from '../../utils/global'
import Swipeable from "react-native-gesture-handler/Swipeable";


type HomeStackParamsList = {
  [ROUTES.HOME]: undefined,
  [ROUTES.ARTICLE]: undefined,

}

interface IArticleProps  {
  article : IArticle,
  onPressArticle : (articleLink : string) => any,

}



const Article = ({article,onPressArticle }: IArticleProps) => {
  const {title,description,imageUrl} = article
  const swipeableRef = useRef(null);


  const renderLeftActions = (text : any, color : any, action : any, x : any, progress : any) => {
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

  const SwipeableRightActions = (progress : any) => {
    return (
      <View style={{ width: 300,height:300}}>
       {renderLeftActions(
          "Watch Later",
          "#888c8a",
          handleAddArticleToArchive,
          10,
          progress
        )}
      </View>
    )
    
  }

  const closeSwipeable = () => {
    swipeableRef.current.close();
  }

  const handleAddArticleToArchive=() => {
    console.log(article)
    closeSwipeable()
    // Save to storage here.
    //
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
        <Text style={styles.articleDescription}>{description.slice(0,60)} ...</Text>
      </View>
      <View style={styles.articalImageContainer}>
        <Image style={styles.articalImage} source={{uri: imageUrl == undefined ? default_logo : imageUrl}} />
      </View>    
    </View>
    </Swipeable>

  )
}

const RSSPlaceHolder = ({ bullTrap }: any) => {
  return (
    <View style={styles.placeholderContainer}>
      <Ionicons style={styles.iconContainer} name='search' color='white' size={28} />
      <TextInput
        style={styles.txtContainer}
        placeholder="Push RSI link here "
        placeholderTextColor='white'
        onChangeText={bullTrap}
      />

    </View>
  )
}


const Home = () => {
  const [data, setData] = useState<IArticle[]>([]);
  const navigation = useNavigation<any>();

  const handleFeedRSS = (rss: string): Promise<any> => {
    return fetch(rss)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        console.log(rss)
        console.log(rss.title);
        console.log(rss.items.length);
        let articles: IArticle[] = [];
        let items = rss.items;
        const rssLength = rss.items.length;
        // const regexImgPattern = '/(?<=<img src=").*?(?=")/gm';
        // const regexLinkPattern = '/(?<=<a href=").*?(?=")/gm';
        // const regexTextPattern = '/<(?:.|\n)*?>/gm';

        for (let i = 0; i < rssLength; i++) {
          let item = items[i];
          articles.push({
            title: item.title,
            link: item.links[0].url,
            published: item.published,
            description: item.description.replace(/<(?:.|\n)*?>/gm, ''),
            id: item.id,
            imageUrl: item.description.match(/(?<=<img src=").*?(?=")/gm)?.toString() 
            
          })
        }
        setData(articles);
      })
      .catch(e =>console.log(e))

  }




  const handlerDebounce = useCallback(_.debounce(handleFeedRSS, 2000), []);

  const bullTrap = (term: string) => {

    handlerDebounce(term);
  }

  const _onPressArticle = (articleId : string) => {
    navigation.navigate(ROUTES.ARTICLE,{articleId})
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{zIndex:999}}>
      <Image source={{ uri: default_logo }} style={styles.appLogo} />
      <RSSPlaceHolder bullTrap={bullTrap} />
      </View>
      
      <ScrollView>
        {data.map((el, idx) => {
          return (
            <Article
              article={el}
              onPressArticle={_onPressArticle}
            />
          )
        })}

      </ScrollView>

    </SafeAreaView>
  )
}

export default Home

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
    height: '50%',
    borderRadius: 10,
    zIndex:-99
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
    margin:8,
    

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
    marginBottom:2
  },
  info: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 10,
    width: "75%",
    marginLeft:16

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
    marginVertical:4

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
    margin:20,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
  },
  actionText: {
    color: "white",
    fontSize: 11,
    backgroundColor: "transparent",
    padding: 5,
  },
});