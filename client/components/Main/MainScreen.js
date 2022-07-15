import React, {useContext, useEffect, useState} from "react";
import styles from "./MainScreen.module.css"
import {View , Text, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView} from 'react-native'
import MyContext from "../../context/context";
import jwt_decode from "jwt-decode";
import { ShowIcon } from "./ShowIcon";
import Loading from "../Loading/Loading";
import fetchLists from "../../requests/fetchLists";
import createList from "../../requests/createList";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchAllItems from "../../requests/fetchAllItems";
import joinList from "../../requests/joinList";
import Item from "./Item";
import AddItem from "./AddItem";
// Error if jwt not valid and user not found
export const MainScreen = ({navigation}) => {
    const {jwt,setJWT,socket,setSocket} = useContext(MyContext);
    const [showLists,setShowLists] = useState(false);
    const [lists,setLists] = useState([]);
    const [loadingOnCreateItem, setLoadingOnCreateItem] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [listName,setListName] = useState("");
    const [listId,setListId] = useState("");
    const [currentList, setCurrentList] = useState("");
    const [items,setItems] = useState([]);
    const decoded = jwt ? jwt_decode(jwt) : null;
    
    const [itemName,setItemName] = useState("");
    const [itemPrice,setItemPrice] = useState("");
    const [itemQuantity,setItemQuantity] = useState("");

    const [showAddItem, setShowAddItem] = useState(false);
    const [itemStore,setItemStore] = useState("")
    
    const onListNameHandler = (value) => {
        setListName(value);
    }
    
    const onListIdHandler = (value) => {
        setListId(value);
    }
    
    useEffect(() => {
        fetchLists(jwt,setLists,setCurrentList,setLoading,setError);
    },[])
    
    useEffect(() => {
        fetchAllItems(jwt,setItems,currentList.split("-")[1],setError,setLoading)
    },[currentList])
    
    useEffect(() => {
        if(currentList){
            socket.emit("joinList",currentList.split("-")[1]);
        }
        () => {console.log("cleared")}
    },[currentList])
    
    useEffect(() => {
        socket.on("newItem", (item) => {
            setItemName("")
            setItemPrice("")
            setItemQuantity("")
            setLoadingOnCreateItem(false)
            setError("");
            setItems((prevState) => [...prevState,item])
        })
    },[socket])

    const showListsHandler = () => {
        setShowLists((prev) => !prev);
    }

    const createListHandler = () => {
        createList(listName,setLoading,jwt,setLists,setError,setListName);
    }

    const logoutHandler = async () => {
        // disconnect from socket room
        try {
            await AsyncStorage.removeItem('@jwt')
            setJWT(null);
            navigation.navigate("Login")
        } catch (e) {
            console.error(e);
        }

    }

    const createItemHandler = () => {
        if(itemName.length === 0 || itemPrice.length === 0 || itemQuantity.length === 0){
            setError("Please provide: Name, Price and Quantity")
            return;
        }
        setLoadingOnCreateItem(true)
        const item = {
            name:itemName,
            price: parseFloat(itemPrice),
            quantity: parseInt(itemQuantity),
            listId: currentList.split("-")[1],
            user: decoded.id,
            token:jwt,
            market: itemStore ? itemStore : ""
        }
        socket.emit("createItem",item);
    }
    const onJoinListHandler = () => {
        joinList(listId,setLoading,jwt,setLists,setError,setListId);
    }
    const addItemHandler = () => {
        setShowAddItem(prev => !prev);
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 50}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>{`Hello, ${decoded?.name}`}</Text>
                    <TouchableOpacity onPress={logoutHandler}><Icon  name="logout" size={30} color="black" style={{alignSelf:"flex-start",marginRight:18}}/></TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                        <Text style={styles.listHeader}>Check My Lists</Text>
                        <ShowIcon trueIcon={"chevron-up"} falseIcon={"chevron-down"} styleIcon={styles.icon} handler={showListsHandler} variable={showLists}/>
                </View>
                    {showLists && 
                        <FlatList 
                            ListHeaderComponent={loading && <Loading/>}
                            removeClippedSubviews={false}
                            ListFooterComponent={
                            <View>
                                <View style={styles.footer}>
                                    <TouchableOpacity onPress={createListHandler}><Text style={{fontSize:30, fontWeight:"bold",marginLeft:30}}>+</Text></TouchableOpacity>
                                    <TextInput style={styles.input} placeholder="New List Name" value={listName} onChangeText={onListNameHandler}/>
                                </View>
                                <View style={styles.footer}>
                                    <TouchableOpacity onPress={onJoinListHandler}><Text style={{fontSize:30, fontWeight:"bold",marginLeft:30}}>+</Text></TouchableOpacity>
                                    <TextInput style={styles.input} placeholder="Join List by ID" value={listId} onChangeText={onListIdHandler}/>
                                </View>
                            </View>}
                            extraData={lists}
                            style={[{elevation: 20,shadowColor: '#52006A'},styles.listsContainer]}
                            data={lists}
                            renderItem={({item,index}) => <TouchableOpacity onPress={() => {
                            
                                socket.emit("leaveList",currentList.split("-")[1]);
                        
                                setCurrentList(item)
                            }} key={index}><Text style={styles.listName}>{item.split("-")[0]}</Text></TouchableOpacity>}>
                        </FlatList>
                    }
                <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%",paddingRight:20,alignItems:"flex-end"}}><Text style={styles.currentListHeader}>{`Currect List: ${currentList.split("-")[0]}`}</Text><Text>{`Id: ${currentList.split('-')[1] ?currentList.split('-')[1]:"" }`}</Text></View>
                <View style={styles.listWrapper}>
                    <FlatList
                        removeClippedSubviews={false}
                        keyboardDismissMode="none"
                        style={[{borderWidth:2,borderTopLeftRadius:10,borderTopRightRadius:10},styles.list]} 
                        data={items}
                        renderItem={({index,item}) => <Item name={item.name} price={item.price} quantity={item.quantity} key={index} store={"Lidl"}/>}
                        extraData={items}
                    />
                </View>
                {loadingOnCreateItem && <View style={styles.loading}><Text style={styles.loadingText}>Adding Item</Text><Loading/></View>}
                {error !== "" && <Text style={{color:"red",width:"100%",paddingLeft:20,fontSize:18}}>{`${error}`}</Text>}
                {!showAddItem && <TouchableOpacity onPress={() => {
        setShowLists(false)
        setShowAddItem(true)}} style={{backgroundColor:"black",marginBottom:10,padding:7,borderRadius:5}}><Text style={{color:"white"}}>Add Item</Text></TouchableOpacity>}
                {showAddItem && <AddItem itemName={itemName} itemPrice={itemPrice} itemQuantity={itemQuantity} itemStore={itemStore} setItemName={setItemName} setItemPrice={setItemPrice} setItemQuantity={setItemQuantity} setItemStore={setItemStore} createItemHandler={createItemHandler} showAddItemHandler={addItemHandler}/>}
                

        </KeyboardAvoidingView>
        
    )
}