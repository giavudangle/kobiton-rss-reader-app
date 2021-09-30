import React, { useCallback, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'
import { IArticle } from '../../../types'
import * as rssParser from 'react-native-rss-parser';
import * as _ from 'lodash'
import { useNavigation } from '@react-navigation/core'
import ROUTES from '../../navigation/RouteConst'
import { default_logo } from '../../utils/global'


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
  return (
    <View style={styles.articleContainer} >  
     <View style={styles.articalContentContainer}>
        <Text onPress={() => onPressArticle(article.link)} style={styles.articleTitle}>{title}</Text>
        <Text style={styles.articleDescription}>{description.slice(0,60)} ...</Text>
      </View>
      <View style={styles.articalImageContainer}>
        <Image style={styles.articalImage} source={{uri: imageUrl == undefined ? default_logo : imageUrl}} />
      </View>    
    </View>
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
        const regexImgPattern = '/(?<=<img src=").*?(?=")/gm';
        const regexLinkPattern = '/(?<=<a href=").*?(?=")/gm';
        const regexTextPattern = '/<(?:.|\n)*?>/gm';

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
      });
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