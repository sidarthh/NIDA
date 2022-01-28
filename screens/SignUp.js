import React from 'react'
import { useState } from 'react'
import { Formik } from 'formik'
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType'
import { StyledContainer,InnerContainer,PageLogo,PageTitle,SubTitle,StyledFormArea,StyledTextInput,StyledInputLabel,LeftIcon,RightIcon,StyledButton,ButtonText,Colors,Line,MsgBox,ExtraText,ExtraView,TextLink,TextLinkContent } from '../components/Styles'
import { View,ActivityIndicator } from 'react-native'
import {Octicons,Fontisto} from '@expo/vector-icons'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
//import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import axios from 'axios';





const {brand,darklight,primary} = Colors;


const SignUp = ({navigation}) => {

    const [message,setMessage] = useState();
    const [messageType,setmessageType] = useState();

    const handleSignUp =(credentials,setSubmitting)=>{
        handleMessage(null);
        const url = "https://nodejs-nida-website.herokuapp.com/user/register";
        /*axios({
            method:'post',
            url:url,
            data:credentials,

        }).then(function (response){
            console.log(response);

        }).catch(err=>{
            console.log(err);
            handleMessage('An error occured!Please check your network and try again!')

        })*/
        /*fetch(url,{
            method:"POST",
            body:credentials,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }.then(response=>response.JSON()).then(json=>console.log(json))
                

        })*/
        
        axios.post(url,credentials).then((response)=>{
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);
            const result = response.data;
            const {message,status,data} = result;
            if(status!=='SUCCESS'){
                handleMessage(message,status);

            }else{
                navigation.navigate("SignUp");
                handleMessage("User Successfully Registered!You may Login Now!")
            }
            setSubmitting(false);



        }).catch(err=>{
            setSubmitting(false);
            console.log(credentials);
            console.log(err);
            handleMessage('There was a network error!Please check again!')
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
                <PageTitle>NIDA</PageTitle>
                <SubTitle>Account Sign Up</SubTitle>
                <Formik
                    initialValues={{name:"",email:"",password:"",confirmPassword:""}}
                    onSubmit={(values,{setSubmitting}) =>{
                        
                        //values.dateofBirth = values.dateofBirth;
                        if(values.email=="" ||values.name==""||values.password==""||values.confirmPassword==""){
                            handleMessage("Please fill all the fields!");
                            setSubmitting(false);
                        }
                        
                        else if(values.password !== values.confirmPassword){
                            handleMessage("Passwords do not match!");
                            setSubmitting(false);

                        }
                        else{
                            
                            handleSignUp(values,setSubmitting);
                        }
                    }}
                >{({handleChange,handleBlur,handleSubmit,values,isSubmitting}) =>(<StyledFormArea>
                    <TextInput 
                    label="Name"
                    icon="person"
                    placeholder="Sidarth Saikumar"
                    placeholderTextColor={darklight}
                    onChangeText ={handleChange('name')}
                    onBlur ={handleBlur('name')}
                    value = {values.name}
                    

                    />
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
                    
                    <TextInput 
                    label="Confirm Password"
                    icon="lock"
                    placeholder="********"
                    placeholderTextColor={darklight}
                    onChangeText ={handleChange('confirmPassword')}
                    onBlur ={handleBlur('confirmPassword')}
                    value = {values.confirmPassword}
                    secureTextEntry={true}

                    />
                    <MsgBox type={messageType}>{message}</MsgBox>
                    {!isSubmitting && (
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>SignUp</ButtonText>
                        </StyledButton>
                    )}
                    {isSubmitting && (
                        <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color="#fff" />
                        </StyledButton>
                    )}
                    
                    <Line />
                    
                    <ExtraView>
                        <ExtraText>Have An account already?</ExtraText>
                        <View>
                            <TextLink>
                                <TextLinkContent onPress={()=>navigation.navigate("Login")}>Login</TextLinkContent>
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

export default SignUp