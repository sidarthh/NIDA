import { View, Text,SafeAreaView,StyleSheet,Button,TouchableOpacity,ScrollView,FlatList, Dimensions,Image,TextInput, Touchable } from 'react-native';
import { useState,useRef } from 'react';
import React from 'react';
import { StyledButton,ButtonText, StyledContainer, InnerContainer,SubTitle,PageTitle } from '../components/Styles'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import courts from './../constants/courts'
import COLORS from '../constants/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
const {width} = Dimensions.get("screen");
const Cardwidth = width/1.8;

const Venues = ({navigation}) => {
  const ScrollX = useRef(new Animated.Value(0)).current;
  const categories = ['All','Featured','Nearby','Ambience']
  const[selectedCategoryIndex,setSelectedCategoryIndex] = useState(0);
  const CategoryList = ({navigation}) => {
      return (
        <View style={style.categoryListContainer}>
          {categories.map((item, index) => (
            <TouchableOpacity 
              key={index}
              activeOpacity={0.8}
              onPress={() => setSelectedCategoryIndex(index)}>
              <View>
                <Text
                  style={{
                    ...style.categoryListText,
                    color:
                      selectedCategoryIndex == index
                        ? COLORS.primary
                        : COLORS.grey,
                  }}>
                  {item}
                </Text>
                {selectedCategoryIndex == index && (
                  <View
                    style={{
                      height: 3,
                      width: 30,
                      backgroundColor: COLORS.primary,
                      marginTop: 2,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    };
    const Card = ({courts,item})=>{
      return(
        <TouchableOpacity onPress={()=>navigation.navigate("DetailsScreen",courts)}>
        <View style={{...style.card}}>
          <View style={{...style.cardOverLay,opacity:0}} />
          
  
          <Image source={courts.image} style={style.cardImage}/>
          <View style={style.cardDetails}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View>
                <Text style={{fontWeight:'bold',fontSize:17}}>{courts.name}</Text>
                <Text style={{color:'grey',fontSize:12}}>{courts.location}</Text>
              </View>
              <Icon name="place" size={26}  />
            </View>
            <View style={{flexDirection:'row'}}>
              <Icon name="star" size={15} color={COLORS.orange}/>
              <Icon name="star" size={15} color={COLORS.orange}/>
              <Icon name="star" size={15} color={COLORS.orange}/>
              <Icon name="star" size={15} color={COLORS.orange}/>
              <Icon name="star" size={15} color={COLORS.grey}/>
              <Text style={{fontSize:10,color:'grey',paddingLeft:50}}>365 reviews</Text>
  
            </View>
            
            
            
  
          </View>
          
  
  
        </View>
        </TouchableOpacity>
      )
    }
  return (
  <SafeAreaView style={{paddingTop:10, flex:1,backgroundColor:"#ffffff"}}>
    <View style={style.header}>
      <View style={{paddingBottom:40}}>
        <Text style ={{fontSize:26,fontWeight:'bold'}}>
            Venues
        </Text>
        
      </View>
      <Icon name="place" size={30}/>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.searchInputContainer}>
        <Icon name="search" size={30} style={{marginLeft:20}}/>
        <TextInput placeholder='Search' style={{fontSize:20,marginLeft:20}}/>
      </View>
      <CategoryList />
      <View>
      <FlatList data={courts} horizontal
           contentContainerStyle={{paddingVertical:30,paddingLeft:20}}
           showsHorizontalScrollIndicator={false}
           renderItem={({item,index})=><Card courts={item} index={index}/>} />
      </View>

    </ScrollView>
    

  </SafeAreaView>
    
  );
};

const style = StyleSheet.create({
  header:{
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 370,
    width: Cardwidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 180,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardDetails: {
    height: 150,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },

  
  searchInputContainer: {
    height: 50,
    width:380,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardOverLay: {
    height: 370,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: Cardwidth,
    borderRadius: 15,
  },
  
  
})


export default Venues;
