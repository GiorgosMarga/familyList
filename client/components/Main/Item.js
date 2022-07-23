import React, { useState, useContext } from "react";
import { View, Text, Image } from "react-native";
import styles from "./MainScreen.module.css";
import IoIcon from "react-native-vector-icons/Ionicons";
import { ShowIcon } from "./ShowIcon";
import MyContext from "../../context/context";

const Item = ({ name, price, quantity, store, itemId, userName, imageUrl }) => {
  const { socket, jwt } = useContext(MyContext);
  const [showMore, setShowMore] = useState(false);
  const [check, setCheck] = useState(false);
 
  const showMoreHandler = () => {
    setShowMore((prevState) => !prevState);
  };

  const checkItemHandler = () => {
    setCheck((prev) => !prev);
    socket.emit("deleteItem", {
      token: jwt,
      itemId,
    });
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={
            check
              ? [styles.item, { textDecorationLine: "line-through" }]
              : styles.item
          }
        >
          {name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={
              check
                ? [styles.item, { textDecorationLine: "line-through" }]
                : styles.item
            }
          >{`P:${price}$`}</Text>
          <Text
            style={
              check
                ? [styles.item, { textDecorationLine: "line-through" }]
                : styles.item
            }
          >{`Qnty:${quantity}`}</Text>
          <ShowIcon
            trueIcon={"chevron-up"}
            falseIcon={"chevron-down"}
            styleIcon={styles.icon}
            handler={showMoreHandler}
            variable={showMore}
          />
          <IoIcon
            onPress={checkItemHandler}
            size={30}
            name="checkmark-circle-outline"
          />
        </View>
      </View>
      {showMore && (
        <View
          style={{
            maxHeight: 180,
            height: 180,
            width: "100%",
            paddingLeft: 20,
          }}
        >
          <Text style={{ fontSize: 15 }}>{`Store: ${store}`}</Text>
          {!imageUrl &&
            <Text style={{ fontSize: 15 }}>{`Image: Not uploaded`}</Text>
          }
          {imageUrl !== "" && <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: imageUrl }}
            />}
          <Text style={{ fontSize: 15 }}>{`By: ${userName}`}</Text>
        </View>
      )}
    </View>
  );
};

export default Item;
