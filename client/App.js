import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import io from "socket.io-client";
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyContext from "./context/context";
import {MainScreen} from './components/Main/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket_io = io.connect("http://192.168.31.208:3002",
{ transports: ['websocket'],
reconnectionAttempts: 15})  

export default function App() {
  const [jwt, setJWT] = useState(null);
  const [socket,setSocket] = useState(socket_io);
  
  useEffect(() => {
    const storeData = async (jwt) => {
      try {
        await AsyncStorage.setItem('@jwt', jwt);
      } catch (e) {
        console.log(e);
      }
    }
    if(jwt){
      storeData(jwt).catch(err => console.log(err));
    }
    () => {}
  },[jwt])

  useEffect(() => {
    const getJWT = async () => {
      try {
        const value = await AsyncStorage.getItem('@jwt')
        if(value !== null) {
          setJWT(value);
          return;
        }
        return null;
      } catch(e) {
        console.error("JWT not found");
      }
    };
    getJWT().catch((err) => console.log(err));
  },[])

  const Stack = createNativeStackNavigator();

  return (
    <MyContext.Provider value={{jwt,setJWT,socket,setSocket}}>
      <NavigationContainer>
            {jwt  && <Stack.Navigator><Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown:false}} /></Stack.Navigator>}
            {jwt === null && 
              <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="MainScreenUser" component={MainScreen} options={{headerShown:false}} />
                <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
              </Stack.Navigator>
            }
      </NavigationContainer>
    </MyContext.Provider>
   
  );
}

