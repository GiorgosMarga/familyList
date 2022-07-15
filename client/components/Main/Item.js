import React,{useState} from 'react'
import { View, Text } from 'react-native'
import styles from "./MainScreen.module.css"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ShowIcon } from './ShowIcon';
const Item = ({name,price,quantity,store}) => {
    const [showMore,setShowMore] = useState(false);
    const showMoreHandler = () => {
        setShowMore(prevState => !prevState);
    }

    return (
        <View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={styles.item}>{name}</Text>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.item}>{`P:${price}$`}</Text>
                    <Text style={styles.item}>{`Qnty:${quantity}`}</Text>
                    <ShowIcon trueIcon={"chevron-up"} falseIcon={"chevron-down"} styleIcon={styles.icon} handler={showMoreHandler} variable={showMore}/>
                </View>
            </View>
            {showMore && <View style={{maxHeight:180,height:180,width:"100%",paddingLeft:20}}>
                <Text style={{fontSize:15}}>{`Store: ${store}`}</Text>    
                <Text style={{fontSize:15}}>{`Image: No Image`}</Text>    
            </View>}
        </View>
  )
}

export default Item