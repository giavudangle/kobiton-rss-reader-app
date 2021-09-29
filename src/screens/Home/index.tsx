import React, { useCallback, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'
import { IArticle } from '../../../types'
import * as rssParser from 'react-native-rss-parser';
import * as _ from 'lodash'
import * as Linking from 'expo-linking'

const default_img = "https://cdn.jobhopin.com/avatars/08e0929c-36d9-4401-819c-bfa935b6e8df.png"

const rss_url = "https://tuoitre.vn/rss/tin-moi-nhat.rss"

const mockObject: IArticle = {
  title: 'Từ 1-10, TP.HCM mở cửa những gì?',
  description: 'TTO - Trong dự thảo chỉ thị về điều chỉnh các biện pháp thích ứng an toàn',
  published: 'Tue, 28 Sep 2021 11:34:15 GMT+7',
  imageUrl: 'https://cdn1.tuoitre.vn/zoom/80_50/2021/9/28/img2508-16328012953171948904823-crop-1632801367177199287417.jpg',
  link: 'https://tuoitre.vn/tu-1-10-tp-hcm-mo-cua-nhung-gi-20210928084737269.htm',
  id: "testid"

}


const Article = ({ title, description,link,imageUrl }: IArticle) => {
  const handlePressArticle = () => {
    Linking.openURL(link)
  }

  return (
    <TouchableOpacity style={styles.articleContainer} onPress={handlePressArticle}>  
     <View style={styles.articalContentContainer}>
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.articleDescription}>{description.slice(0,100)}</Text>
      </View>
      <View style={styles.articalImageContainer}>
        <Image style={styles.articalImage} source={{uri: imageUrl == undefined ? default_img : imageUrl}} />
      </View>    
    </TouchableOpacity>
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
interface IFeedActicle {
  items: IArticle[]
}

const Home = () => {
  const [data, setData] = useState<IArticle[]>([]);


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

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: default_img }} style={styles.appLogo} />
      <RSSPlaceHolder bullTrap={bullTrap} />
      <ScrollView>
        {data.map((el, idx) => {
          return (
            <Article
              id={el.id}
              published={el.published}
              link={el.link}
              title={el.title}
              description={el.description}
              imageUrl={el.imageUrl}
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