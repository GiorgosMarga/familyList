import React from 'react'
import { View , Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import styles from "./Auth.module.css"
import TextInputComponent from './TextInputComponent';
import MyContext from '../../context/context';
import Loading from "../Loading/Loading";
import login from '../../requests/login';
import * as Linking from 'expo-linking';
import LOCALHOST from "../../env";



export const Login = ({navigation}) => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const {jwt,setJWT} = React.useContext(MyContext);
    
    const handleOpenWithLinking = () => {
      Linking.openURL(`${LOCALHOST}:5050/`);
    };

    const signInHandler = () => {
      login(password,email,setLoading,setError,setJWT,setEmail,setPassword);
    }
    
    const emailChangeHandler = (value) => {
      setEmail(value.trim())
    }
    const passwordChangeHandler = (value) => {
      setPassword(value)
    }
    const registerHandler = () => {
      navigation.navigate("Register")
    }
    if(loading){
      return <Loading text={"Loging in..."}/>
    }
    return (
    <View style={styles.container}>
        <Text style={styles.title}>familyList</Text>
        <TextInputComponent placeholder={"Email"} onChange={emailChangeHandler} value={email}/>
        <TextInputComponent placeholder={"Password"} secure={true} onChange={passwordChangeHandler} value={password}/>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={registerHandler}><Text style={styles.text}>Don't Have an Account? Sign up.</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleOpenWithLinking}><Text style={styles.text}>Forgot Password?</Text></TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={signInHandler}>
          <Text style={{color: "white", textAlign:"center", fontSize: 15, fontWeight:"bold"}}>Sign In</Text>
        </TouchableOpacity>
    </View>
  )
}

