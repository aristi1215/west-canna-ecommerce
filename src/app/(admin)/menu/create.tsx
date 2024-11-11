import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useCreateProduct, useDeleteProduct, useProductById, useUpdateProduct } from "@/src/api/products";
import * as FileSystem from 'expo-file-system'
import { randomUUID } from "expo-crypto";
import { supabase } from "@/src/client/client";
import {decode} from 'base64-arraybuffer'

function CreateScreen() {
  const inputStyle = "border border-gray-500 rounded-lg p-1 w-full my-2";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useLocalSearchParams();

  const isUpdating = !!id;

  const { mutate: insertProduct } = useCreateProduct()
  const { mutate: updateProduct } = useUpdateProduct()
  const { mutate: deleteProduct } = useDeleteProduct()
  
  const {data: currentProduct} = useProductById(id)

  

    useEffect(() => {
      if(isUpdating && currentProduct){

          setName(currentProduct.name)
          setPrice(currentProduct.price.toString())
          setImage(currentProduct.image)
      }
    },[currentProduct])



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
    setImage(null);
    setError("");
    return true;
  };

  const handleCreateProduct = async () => {

    if (!validateFields()) return;

    const bucketImage = await uploadImage()

    insertProduct({name, price: parseFloat(price), image: bucketImage},
    {
      onSuccess: async () => {
        router.back()

      }
    })
  };

  const handleUpdateProduct = async () => {
    if (!validateFields()) return;
    const newImage = await uploadImage()
    console.log(newImage)
    updateProduct({name, price: parseFloat(price) , image: newImage, id}, {
      onSuccess: () => {
        router.back()
      }
    })
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
    deleteProduct(id, {
      onSuccess: () => {
        router.replace('/(admin)/menu')
      }
    })
  };


  const uploadImage = async () => {
    if (!image?.startsWith('file://')){
      return
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64'
    });

    const filePath = `${randomUUID()}.png`
    const contentType = 'image/png'

    const {data, error} = await supabase.storage
    .from('product-images')
    .upload(filePath, decode(base64), {contentType})

    if(error){alert('An error has occurred uploading the file')}


    if(data) {
      return data.path
    }

  }

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


      <Image source={ image ? { uri: image } : require('../../../../assets/images/products/default.jpg') } className=" h-[20rem] aspect-square mt-10" />
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
