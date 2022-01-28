import React from 'react'
import { useState } from 'react'
import {useFormik} from 'formik';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType'
import { StyledContainer,InnerContainer,PageLogo,PageTitle,SubTitle,StyledFormArea,StyledTextInput,StyledInputLabel,LeftIcon,RightIcon,StyledButton,ButtonText,Colors,Line,MsgBox,ExtraText,ExtraView,TextLink,TextLinkContent } from '../components/Styles'
import { View,ActivityIndicator,StyleSheet,Alert } from 'react-native'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import COLORS from '../constants/Colors'
import { Button, Title, RadioButton,TextInput } from 'react-native-paper';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    
    
    Text,
    
  } from 'react-native';

const {brand,darklight,primary} = Colors;
const BookSlots = ({navigation,route}) => {
    console.log(route.params);
    const court_name = route.params;
    const formik = useFormik({
        initialValues: {email:'',day: '',courtno:'',timings:''},
        onSubmit: (values,{setSubmitting}) => {
            if(values.email=="" || values.day=='' || values.courtno=='' || values.timings==''){
                handleMessage("Please fill all the fields!");
                setSubmitting(false);
            }
            else{
                axios({
                    method: 'post',
                    url: 'https://nodejs-nida-website.herokuapp.com/slot/check',
                    data: {
                      'email':values.email,
                      'courtNo':values.courtno,
                      'court_name':court_name,
                      'day':values.day,
                      'timings':values.timings

                    },
                    
                    })
                    .then(response => {
                        const result = response.data;
                        const {message,status,data} = result;
                        if(status!=='SUCCESS'){
                            handleMessage(message,status);
                        }
                        else{
                            const{timings,id,court_name} = {...data[0]};
                            console.log(timings,id,court_name);
                            navigation.navigate("BookSlots");
                            handleMessage(`Slot Successfully Booked!`)

                        }

                        //console.log(response);
                    })
                    .catch(err => {
                        setSubmitting(false);
                        console.log(err);
                        handleMessage('An error occured!Please check your network and try again!')
                    })
            }

          //console.log(values);
        }})
    //const {user} = route.params;
    const [message,setMessage] = useState();
    const [messageType,setmessageType] = useState();/*

    const handleLogin =(credentials,setSubmitting)=>{
        handleMessage(null);
        const url = "https://nodejs-nida-website.herokuapp.com/user/signin";
        axios.post(url,credentials).then((response)=>{
            
            const result = response.data;
            
            const {message,status,data} = result;
            
            
            
            if(status!=='SUCCESS'){
                handleMessage(message,status);

            }else{
                const send = {...data[0]};
                const n = credentials.email;
                console.log(n);
                navigation.navigate("Home",{screen:'Profile',params:{user:n}});
            }
            setSubmitting(false);



        }).catch(err=>{
            setSubmitting(false);
            console.log(err);
            handleMessage('An error occured!Please check your network and try again!')
        })
    }*/

    const handleMessage =(message,type='Failed')=>{
        setMessage(message);
        setmessageType(type);
    }
    return (
        
        <KeyboardAvoidingWrapper>
            <ScrollView>
                <View>
        
                    <View style={style.header}>
                        <Icon
                            name="arrow-back-ios"
                            size={28}
                            color='red'
                            onPress={navigation.goBack}
                        />
                    
                    </View>
                    <PageTitle>Book Slots at {court_name}</PageTitle>
                
                
                    </View>
                    <View>
                        
                        
                        <Text style={{fontSize:15,padding:10,textAlign:'center',fontWeight:'bold'}}>Enter email here!</Text>
                        <View>
                            <TextInput label="Email" value={formik.values.email} onChangeText={formik.handleChange('email')} onBlur ={formik.handleBlur('email')}></TextInput>
                        </View>
                        
                        <Text style={{fontSize:15,padding:10,textAlign:'center',fontWeight:'bold'}}>Choose Day here!</Text>
                        <View>
                        <RadioButton.Group style={style.Container}
                                onValueChange={formik.handleChange('day')}
                                value={formik.values.day}
                                >
                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                    <Text style={{padding:5}}>27-01-2022</Text>
                                    <RadioButton style={{padding:5}} value='27-01-2022'></RadioButton>
                                
                                    <Text>28-01-2022</Text>
                                    <RadioButton value='28-01-2022'></RadioButton>
                                </View>
                            
                        </RadioButton.Group>
                        </View>
                        <Text style={{fontSize:15,padding:10,textAlign:'center',fontWeight:'bold'}}>Choose CourtNo here!</Text>
                        <View>
                        <RadioButton.Group style={style.Container}
                                onValueChange={formik.handleChange('courtno')}
                                value={formik.values.courtno}
                                >

                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                    <Text>Court1</Text>
                                    <RadioButton value='Court1'></RadioButton>
                                
                                    <Text>Court2</Text>
                                    <RadioButton value='Court2'></RadioButton>
                                </View>
                            
                        </RadioButton.Group>
                        </View>
                        <Text style={{fontSize:15,padding:10,textAlign:'center',fontWeight:'bold'}}>Choose Timings here!</Text>
                        <View>
                        <RadioButton.Group style={style.Container}
                                onValueChange={formik.handleChange('timings')}
                                value={formik.values.timings}
                                >

                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                    <Text>1pm-2pm</Text>
                                    <RadioButton value='1-2'></RadioButton>
                                
                                    <Text>2pm-3pm</Text>
                                    <RadioButton value='2-3'></RadioButton>
                                    <Text>4pm-5pm</Text>
                                    <RadioButton value='4-5'></RadioButton>
                                
                                    <Text>5pm-6pm</Text>
                                    <RadioButton value='5-6'></RadioButton>
                                </View>
                            
                        </RadioButton.Group>
                        </View>
                        
                    </View>
                    <Button mode="contained" title='submit' onPress={formik.handleSubmit} >Submit</Button>
                    <MsgBox type={messageType}>{message}</MsgBox>
            </ScrollView>     
        </KeyboardAvoidingWrapper>
        
    )
}




const style = StyleSheet.create({
    header: {
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        justifyContent: 'space-between',
      },
      Container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})



export default BookSlots