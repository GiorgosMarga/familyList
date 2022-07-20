import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library"
import Loading from '../Loading/Loading';
export default function TestCamera({setShowCamera,setImage}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photo,setPhoto] = useState();
  const [loading, setLoading] = useState(false);
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
        skipProcessing:true
    }
    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
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
      <Camera style={styles.camera} ref={cameraRef} ratio={"16:9"} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={ () => {
            // Calling takePic like this, makes it way faster
            takePic()
        } }/>
        </View>
      </Camera>
  );
}

const styles = StyleSheet.create({
    camera: {
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    buttonContainer: {
        width: 70,
        height: 70,
        borderRadius: 140,
        backgroundColor: "#fff"
    },
    button: {
        width:70,
        height:70,
        borderRadius:200
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