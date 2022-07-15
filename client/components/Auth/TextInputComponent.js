import React from 'react'
import styles from "./Auth.module.css"
import { TextInput } from 'react-native';
const TextInputComponent = ({placeholder,onChange,secure,value}) => {
  return (
    <TextInput value={value} onChangeText={onChange} secureTextEntry={secure} style={styles.input} placeholder={placeholder} placeholderTextColor={"grey"} selectionColor={"black"} underlineColorAndroid="transparent"/>
  )
}

export default TextInputComponent