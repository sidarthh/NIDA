import { View, Text,SafeAreaView,StyleSheet,Button,TouchableOpacity,ScrollView,FlatList, Dimensions,Image } from 'react-native';

import React from 'react';
import { StyledButton,ButtonText, StyledContainer, InnerContainer,SubTitle,PageTitle } from '../components/Styles'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import players from './../constants/players'
import COLORS from '../constants/Colors';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get("screen");
const Cardwidth = width/1.8;
const Profile = ({navigation,route}) => {
  const Card = ({players,item})=>{
    return(
      <View style={{...style.card}}>
        

        <Image source={players.image} style={style.cardImage}/>
        <View style={style.cardDetails}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
              <Text style={{fontWeight:'bold',fontSize:17}}>{players.name}</Text>
              <Text style={{color:'grey',fontSize:12}}>{players.age}</Text>
            </View>
            <Icon name="badminton" size={26}  />
          </View>
          <View style={{flexDirection:'row'}}>
            <Icon name="star" size={15} color={COLORS.orange}/>
            <Icon name="star" size={15} color={COLORS.orange}/>
            <Icon name="star" size={15} color={COLORS.orange}/>
            <Icon name="star" size={15} color={COLORS.orange}/>
            <Icon name="star" size={15} color={COLORS.grey}/>
            <Text style={{fontSize:10,color:'grey',paddingLeft:50}}>Player Rating</Text>

          </View>
          
          
          

        </View>
        


      </View>
    )
  }
  
  //const {name} = route.params;
  const {user} = route.params;
  return (
    <SafeAreaView style={{paddingTop:10, flex:1,backgroundColor:"#ffffff"}}>
      
      
      <View style={style.header}>
        <View style={{paddingBottom:40}}>
          <Text style ={{fontSize:26,fontWeight:'bold'}}>
            Welcome to NIDA 
          </Text>
          <Text style={{fontWeight:'bold',color:'purple' ,fontSize:20}}>
            {user}
          </Text>
          <Text style={{paddingTop:30,fontSize:25,fontFamily:'serif'}}>
            Check out our sponsored Players!
          </Text>
        </View>
        <TouchableOpacity id="log" onPress={()=>navigation.navigate('Login')}>
        <Text style={{color:'red',fontSize:15,fontWeight:'bold'}}>Logout</Text>

      </TouchableOpacity>


      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <FlatList data={players} horizontal
           contentContainerStyle={{paddingVertical:30,paddingLeft:20}}
           showsHorizontalScrollIndicator={false}
           renderItem={({item,index})=><Card players={item} index={index}/>} />
        </View>
        
      </ScrollView>
      
    
    </SafeAreaView>
    /*<StyledContainer>
            <InnerContainer>
                <SubTitle>WELCOME {user}!</SubTitle>

                <StyledButton onPress={()=>navigation.navigate("Login")}>
                    <ButtonText>
                        LOGOUT
                    </ButtonText>


                </StyledButton>
            </InnerContainer>
    </StyledContainer>*/
    
  );
};

const style = StyleSheet.create({
  header:{
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20
  },
  card:{
    height:440,
    width:Cardwidth,
    backgroundColor:COLORS.white,
    elevation:15,
    marginRight:20,
    borderRadius:15


  },
  cardImage:{
    height:340,
    width:'100%',
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  cardDetails:{
    height:100,
    borderRadius:15,
    position:'absolute',
    bottom:0,
    padding:20,
    width:'100%'

  }
})

export default Profile;
