import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library"
import Loading from '../Loading/Loading';
import Icon from "react-native-vector-icons/Entypo";

export default function TestCamera({setShowCamera,setImage}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo,setPhoto] = useState();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const  cameraPermission  = await Camera.requestCameraPermissionsAsync();
      const  mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission === 'granted');
    })();
  }, []);
  const takePic = async () => {
    const options = {
        base64: true,
        exif: false,
        skipProcessing:true,
    }
    try{
        const newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    }catch(err){
        console.log(err)
    }
  }

  if(loading && photo !== null){
    return <Loading/>
  }
  if(photo){
    const savePic = () => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() =>{
            setImage(photo);
            setPhoto(null);
            
            setShowCamera(false);
        })
    }
    const discardPic = () => {
        setPhoto(null)   
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.preview} source={{uri:"data:image/jpg;base64,"+ photo.base64}}/>
            <View style={{backgroundColor:"lightgrey",width:"100%",borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <TouchableOpacity style={{alignItems:"center",margin:10}} onPress={savePic}><Text style={{color:"black",fontWeight:"bold",fontSize:18}}>Continue</Text></TouchableOpacity>
                <TouchableOpacity style={{alignItems:"center",margin:10}} onPress={discardPic}><Text style={{color:"black",fontWeight:"bold",fontSize:18}}>Discard</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
  }

  return (
      <Camera style={styles.camera} ref={cameraRef} pictureSize={"320x240"} type={type} ratio={"4:3"}>
        <View style={styles.buttonContainer}>
            <View style={styles.secondaryButton}>
                <Icon name='cross' size={50} color={"white"} onPress={() => setShowCamera(false)}/>
            </View>
            <View style={styles.button}>
                <Icon name='camera' size={40}  onPress={() => takePic()} color={"white"}/>
            </View>
            <View style={styles.secondaryButton}>
                <Icon name='cycle' size={40} color={"white"} onPress={() => {
                    setType(type === CameraType.back ? CameraType.front : CameraType.back);
                }}/>
            </View>

        </View>
      </Camera>
  );
}

const styles = StyleSheet.create({
    camera: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    buttonContainer: {
        width: "100%",
        height: 100,
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center"
    },
    button: {
        width:80,
        height:80,
        borderRadius:200,
        marginBottom: 30,
        marginRight: 30,
        marginLeft: 30,
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        borderColor:"white",
        borderWidth:4,
    },
    secondaryButton:{
        width:50,
        height: 50,
        borderRadius:100,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    text: {
        color: "red"
    },
    preview: {
        flex:1,
        alignSelf:'stretch'
    },
    previewContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    container: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
})