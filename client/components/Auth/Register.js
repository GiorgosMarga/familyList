import React from 'react'
import { View , Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import styles from "./Auth.module.css"
import TextInputComponent from './TextInputComponent';
import MyContext from '../../context/context';
import Loading from '../Loading/Loading';
import register from '../../requests/register';

// Implement show password

export const Register = ({navigation}) => {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const {jwt, setJWT} = React.useContext(MyContext);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const createAccountHandler = () => {
      register(password,confirmPassword,name,email,setJWT,setError,setLoading);
      setEmail("");
      setConfirmPassword("");
      setName("");
      setPassword("");
    }
    const nameChangeHandler = (value) => {
      setName(value.trim())
    } 
    const emailChangeHandler = (value) => {
      setEmail(value.trim())
    }
    const passwordChangeHandler = (value) => {
      setPassword(value)
    }
    const confirmPasswordChangeHandler = (value) => {
      setConfirmPassword(value)
    }
    const loginHandler = () => {
      navigation.navigate('Login')
    }
    if(loading){
      return <Loading text={'Creating Account...'}/>
    }
    return (
    <View style={styles.container}>
        <Text style={styles.title}>familyList</Text>
        <TextInputComponent value={name} placeholder={"Username"} onChange={nameChangeHandler}/>
        <TextInputComponent value={email} placeholder={"Email"} onChange={emailChangeHandler}/>
        <TextInputComponent value={password} placeholder={"Password"} onChange={passwordChangeHandler} secure={true} />
        <TextInputComponent value={confirmPassword} placeholder={"Confirm Password"} onChange={confirmPasswordChangeHandler} secure={true}/>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={loginHandler}><Text style={styles.text}>Already Have an Account? Sign in</Text></TouchableOpacity>
        
        <TouchableOpacity style={styles.loginBtn} onPress={createAccountHandler}>
          <Text style={{color: "white", textAlign:"center", fontSize: 15, fontWeight:"bold"}}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  )
}
