import React from "react";
import { ActivityIndicator,Text, View } from "react-native";
import styles from "./Loading.module.css"

const Loading = ({text}) => {
  return (<View style={[styles.container]}>
    {text && <Text style={styles.text}>{text}</Text>}
    <ActivityIndicator size="large" color={"black"} />
  </View>)
};


export default Loading;