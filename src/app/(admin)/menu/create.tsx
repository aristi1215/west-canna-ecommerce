import { defaultImage } from "@/src/components/ProductItem";
import { useState } from "react";
import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

function CreateScreen() {
  const inputStyle = "border border-gray-500 rounded-lg p-1 w-full my-2";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string>(defaultImage);
  const { id } = useLocalSearchParams();

  const isUpdating = !!id;

  const validateFields = () => {
    if (!name) {
      setError("Name must be filled");
      return false;
    }

    if (!price) {
      setError("Price must be filled");
      return false;
    }

    if (isNaN(parseInt(price))) {
      setError("Price must be a valid number");
      return false;
    }

    setName("");
    setPrice("");
    setImage(defaultImage);
    setError("");
    return true;
  };

  const handleCreateProduct = () => {
    if (!validateFields()) return;
    console.log("creating product");
  };

  const handleUpdateProduct = () => {
    if (!validateFields()) return;
    console.log("update product");
  };

  const confirmDelete = () => {
    Alert.alert("confirm", "Are you sure ?", [
      {
        text: "cancel",
      },
      {
        text: "delete",
        style: "destructive",
        onPress: handleDelete,
      },
    ]);
  };

  const handleDelete = () => {
    console.log("Deleteado, gg chavales");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center items-center px-[10%]">
      <Stack.Screen
        options={{
          title: isUpdating ? "Update Products" : "Create Products",
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />

      <Image source={{ uri: image }} className="w-1/2 aspect-square" />
      <Text onPress={pickImage} className="font-bold text-xl mb-10">
        Select image
      </Text>

      <Text className="text-start w-full">Product name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Pizza 6 chesses"
        className={inputStyle}
      />

      <Text className="text-start w-full">Product price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99$"
        className={inputStyle}
        keyboardType="numeric"
      />

      <Pressable
        onPress={isUpdating ? handleUpdateProduct : handleCreateProduct}
        className="bg-blue-500 rounded-full w-full h-[3rem] justify-center mt-10"
      >
        <Text className="text-white text-center">
          {isUpdating ? "Update Product" : "Create Product"}
        </Text>
      </Pressable>
      {isUpdating && (
        <Pressable
          onPress={confirmDelete}
          className="bg-white rounded-full w-full h-[3rem] justify-center mt-10"
        >
          <Text className="text-blue-500 font-bold text-center">
            Delete product
          </Text>
        </Pressable>
      )}
      <Text className="text-red-500 text-start w-full mt-3">{error}</Text>
    </View>
  );
}
export default CreateScreen;
