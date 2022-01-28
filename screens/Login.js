import React from 'react'
import { useState } from 'react'
import { Formik } from 'formik'
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType'
import { StyledContainer,InnerContainer,PageLogo,PageTitle,SubTitle,StyledFormArea,StyledTextInput,StyledInputLabel,LeftIcon,RightIcon,StyledButton,ButtonText,Colors,Line,MsgBox,ExtraText,ExtraView,TextLink,TextLinkContent } from '../components/Styles'
import { View,ActivityIndicator } from 'react-native'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import {Octicons,Fontisto} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';



const {brand,darklight,primary} = Colors;
const Login = ({navigation}) => {
    const [message,setMessage] = useState();
    const [messageType,setmessageType] = useState();

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
    }

    const handleMessage =(message,type='Failed')=>{
        setMessage(message);
        setmessageType(type);
    }
    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <InnerContainer>
                
                <PageLogo resizemode = "cover" source = {require("./../assets/imgs/logo.jpeg")}/>
                <PageTitle>NIDA</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{email:"",password:""}}
                    onSubmit={(values,{setSubmitting}) =>{
                        if(values.email=="" || values.password==""){
                            handleMessage("Please fill all the fields!");
                            setSubmitting(false);
                        }
                        else{
                            handleLogin(values,setSubmitting);
                        }
                        
                    }}
                >{({handleChange,handleBlur,handleSubmit,values,isSubmitting}) =>(<StyledFormArea>
                    <TextInput 
                    label="Email address"
                    icon="mail"
                    placeholder="abc@gmail.com"
                    placeholderTextColor={darklight}
                    onChangeText ={handleChange('email')}
                    onBlur ={handleBlur('email')}
                    value = {values.email}
                    keyboardType="email-address"

                    />
                    <TextInput 
                    label="Password"
                    icon="lock"
                    placeholder="********"
                    placeholderTextColor={darklight}
                    onChangeText ={handleChange('password')}
                    onBlur ={handleBlur('password')}
                    value = {values.password}
                    secureTextEntry={true}

                    />
                    <MsgBox type={messageType}>{message}</MsgBox>
                    
                    {!isSubmitting && (
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>
                    )}
                    {isSubmitting && (
                        <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color="#fff" />
                        </StyledButton>
                    )}
                    
                    
                    <Line />

                    <StyledButton google={true} onPress={handleSubmit}>
                        <Fontisto name="google" color={primary} size={25} />
                        <ButtonText google={true}>Sign In With Google</ButtonText>
                    </StyledButton>
                    <ExtraView>
                        <ExtraText>Dont have an account already?</ExtraText>
                        <View>
                            <TextLink>
                                <TextLinkContent onPress={()=>navigation.navigate("SignUp")}>SignUp</TextLinkContent>
                            </TextLink>
                        </View>
                    </ExtraView>
                </StyledFormArea>
                )}

                </Formik>
                
            </InnerContainer>
        </StyledContainer>
    </KeyboardAvoidingWrapper>
        
    )
}

const TextInput = ({label,icon,...props})=>{
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />

        </View>
    )

}

export default Login
