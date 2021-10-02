import React, { useCallback, useState } from 'react'
import { View, SafeAreaView, StyleSheet, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { IArticle } from '../../../types'
import * as rssParser from 'react-native-rss-parser';
import * as _ from 'lodash'
import { useNavigation } from '@react-navigation/core'
import {ROUTES} from '../../navigation/RouteConst'
import { DEFAULT_LOGO } from '../../utils/global'
import ArticleRow from './ArticleRow'
import RSSPlaceHolder from '../../components/RSSPlaceholder'
import uuid from 'react-native-uuid';

const Home = () => {
  const [data, setData] = useState<IArticle[]>([]);
  const [term, setTerm] = useState<string>('');
  const navigation = useNavigation<any>();

  // Function that handle feed RSS from url
  const handleFeedRSS = async (): Promise<any> => {
    if(term == '') return;
    try {
      const response = await fetch(term)
      const responseData = await response.text()
      const json = await rssParser.parse(responseData)
      console.log(json)

      let articles: IArticle[] = []
      let items = json.items
      for (let i = 0; i < json.items.length; i++) {
        let item = items[i]
        let temp = item.description.trim().replace(/["']/g, "\"")
        console.log(temp.match(/(src=").*?(?=")/gm)?.toString())

        articles.push({
          title: item.title,
          link: item.links[0].url.trim(),
          published: item.published,
          description: temp.replace(/<(?:.|\n)*?>/gm,'')?.toString() as any,
          id: uuid.v4().toString(),
          imageUrl:  temp.match(/(src=").*?(?=")/gm)?.toString().replace(`src=\"`,'')

        })
      }
      setData(articles)
    } catch (e) {
      return alert(e)
    }
  }

  // Debounce user
  const handlerDebounce = useCallback(_.debounce(handleFeedRSS, 500), []);


  const _onPressArticle = (articleId: string) => {
    navigation.navigate(ROUTES.ARTICLE, { articleId })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ zIndex: 999 }}>
        <Image source={{ uri: DEFAULT_LOGO }} style={styles.appLogo} />
        <RSSPlaceHolder
          onTermSubmit={handleFeedRSS}
          searchTerm={term}
          setSetTerm={setTerm}
        />
      </View>
      <ScrollView>
        {data.map((el, idx) => {
          return (
            <ArticleRow
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
  appLogo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: -10
  },
})
