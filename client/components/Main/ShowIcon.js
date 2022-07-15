import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';

export const ShowIcon = ({trueIcon,falseIcon,styleIcon,handler,variable}) => {
  return (
    <TouchableOpacity style={styleIcon} onPress={handler}>
        {variable && <Icon  name={trueIcon} size={30} color="black" />}
        {!variable && <Icon  name={falseIcon} size={30} color="black" />}
    </TouchableOpacity>
  )
}
