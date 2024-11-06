import { useState } from "react";
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useCartContext } from "../context/CartProvider";
import { CartItemComponent } from "./CartItemComponent";

export const ModalExample = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { items, total } = useCartContext();
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="bg-gray-200 h-[95%] absolute bottom-0 right-0 w-full">
          <FlatList
            contentContainerClassName="text-white pt-4 gap-4"
            data={items}
            renderItem={({ item }) => <CartItemComponent item={item} />}
          />
          <Pressable className="mb-3 w-[80%] rounded-full bg-[#087c6c] h-[4rem] items-center justify-center mx-auto">
            <Text className="text-white">total: {`${total}`}</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="shopping-cart" />
      </Pressable>
    </>
  );
};

{
  /* <View style={styles.modalView}>
<Text style={styles.modalText}>Hello World!</Text>
<Pressable
  style={[styles.button, styles.buttonClose]}
  onPress={() => setModalVisible(!modalVisible)}
>
  <Text style={styles.textStyle}>Hide Modal</Text>
</Pressable>
</View> */
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
