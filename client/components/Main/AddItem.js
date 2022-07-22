import React from 'react'
import styles from "./MainScreen.module.css"
import { View,Text,TouchableOpacity, TextInput } from 'react-native'
const AddItem = ({itemName,itemPrice,itemQuantity,itemStore,setItemName,setItemPrice,setItemQuantity,setItemStore,createItemHandler,showAddItemHandler,setShowCamera,imageURL,uploadingImage}) => {
  return (
    <View style={{backgroundColor: "#FFFFFF",borderRadius:10,width:"100%",flexDirection:"row"}}>
        <View style={[{backgroundColor: "#FFFFFF",borderRadius:10},styles.inputWrappers]}>
            <TextInput value={itemName} onChangeText={(text) => setItemName(text)} placeholder="Name" placeholderTextColor="grey" style={{fontWeight:'bold',marginTop:10}}/>
            <TextInput value={itemPrice} onChangeText={(text) => setItemPrice(text)} placeholder="Price" placeholderTextColor="grey" style={{fontWeight:'bold',marginTop:10}} keyboardType="numeric" />
            <TextInput value={itemQuantity} onChangeText={(text) => setItemQuantity(text)} placeholder="Quantity" placeholderTextColor="grey" style={{fontWeight:'bold',marginTop:10}} keyboardType="numeric" />
            <TextInput value={itemStore} onChangeText={(text) => setItemStore(text)} placeholder="Store (opt)" placeholderTextColor="grey" style={{fontWeight:'bold',marginTop:10}} />
            <TouchableOpacity accessible={!uploadingImage} onPress={() => {setShowCamera(true)}} style={{fontWeight:'bold',marginTop:10}}><Text style={{color:"grey",fontWeight:"bold"}}>{uploadingImage ? "Uploading image..." : (imageURL ? "Image Uploaded" : "Add Image")}</Text></TouchableOpacity>
        </View>
        <View style={{justifyContent:"center"}}>
          <TouchableOpacity onPress={showAddItemHandler} style={{margin:10,backgroundColor:'white',padding:10,borderRadius:5}}><Text style={{textAlign:"center", color:"black",fontWeight:"900"}}>Close</Text></TouchableOpacity>
          <TouchableOpacity onPress={createItemHandler} style={{margin:10,backgroundColor:'black',padding:10,borderRadius:5}}><Text style={{color:"white"}}>Add Item</Text></TouchableOpacity>  
        </View>
    </View>
  )
}

export default AddItem