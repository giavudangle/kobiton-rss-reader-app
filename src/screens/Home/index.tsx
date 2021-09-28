import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'


interface IArticle {
  title: string,
  link: string,
  publishDate: string,
  description: string,
  imageUrl: string
}

const mockObject: IArticle = {
  title: 'Từ 1-10, TP.HCM mở cửa những gì?',
  description: 'TTO - Trong dự thảo chỉ thị về điều chỉnh các biện pháp thích ứng an toàn',
  publishDate: 'Tue, 28 Sep 2021 11:34:15 GMT+7',
  imageUrl: 'https://cdn1.tuoitre.vn/zoom/80_50/2021/9/28/img2508-16328012953171948904823-crop-1632801367177199287417.jpg',
  link: 'https://tuoitre.vn/tu-1-10-tp-hcm-mo-cua-nhung-gi-20210928084737269.htm'
}

const Article = ({ title, publishDate, description, imageUrl }: IArticle) => {
  return (
    <View style={styles.articleContainer}>

      <View style={styles.articalContentContainer}>
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.articleDescription}>{description}</Text>
      </View>
      <View style={styles.articalImageContainer}>
        <Image style={styles.articalImage} source={{ uri: imageUrl }} />
      </View>
    </View>
  )
}

const RSSPlaceHolder = (props: any) => {
  return (
    <View style={styles.placeholderContainer}>
      <Ionicons style={styles.iconContainer} name='search' color='white' size={28} />
      <TextInput
        style={styles.txtContainer}
        placeholder="Push RSI link here "
        placeholderTextColor='white'
      />

    </View>
  )
}

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtTitle}>RSI READER</Text>
      <RSSPlaceHolder />
      <Article
        title={mockObject.title}
        link={mockObject.link}
        publishDate={mockObject.publishDate}
        description={mockObject.description}
        imageUrl={mockObject.imageUrl}
      />
      <Article
        title={mockObject.title}
        link={mockObject.link}
        publishDate={mockObject.publishDate}
        description={mockObject.description}
        imageUrl={mockObject.imageUrl}
      />
      <Article
        title={mockObject.title}
        link={mockObject.link}
        publishDate={mockObject.publishDate}
        description={mockObject.description}
        imageUrl={mockObject.imageUrl}
      />


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
    marginVertical: 10,
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
    width: 100,
    height: 100,
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
    alignItems: 'flex-start',
    padding: 20,

  },
  articalContentContainer: {
    width: '70%'
  },
  articalImageContainer: {
    width: '30%'

  },
})