
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Alert
} from "react-native";
import { useState } from "react";
import { PizzaSize } from "@/assets/types";
import { useCartContext } from "../context/CartProvider";
import { useProductById } from "../api/products";
import RemoteImage from "@/src/components/RemoteImage"


export const ProductDetails = ({ id: idString, admin = false }) => {
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const sizes = ["S", "M", "L", "XL"] as const;
  type Size = (typeof sizes)[number];

  const { addItem } = useCartContext();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const { data: product, error, isLoading } = useProductById(id);

  if (!product) {
    return <Text>Product not found</Text>;
  }
  if (error) {
    return <Text>And error has occurred</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize);
    Alert.alert("Item added to cart");
  };

  return admin ? (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold">{product?.name}</Text>
      <RemoteImage
        path={product.image}
        className="w-full aspect-square max-h-[50%]"
      />
      <Text className="mt-10 mb-5 text-start w-full ml-12 text-2xl font-bold  ">
        Price ${product.price}
      </Text>
    </View>
  ) : (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold">{product?.name}</Text>
      <RemoteImage
        path={product.image}
        className="w-full aspect-square max-h-[50%]"
      />
      <Text className="my-2">{product.description}</Text>
      <Text className="text-start w-full ml-3 mb-5 text-2xl">Select size</Text>
      <View className="flex-row justify-evenly w-full">
        {sizes.map((size, i) => (
          <Pressable key={i} onPress={() => setSelectedSize(size)}>
            <View
              className={`${
                selectedSize === size ? "bg-gray-200" : ""
              } w-14 rounded-full aspect-square items-center justify-center`}
            >
              <Text
                className={`${
                  selectedSize === size ? "font-bold" : ""
                } text-center text-xl`}
              >
                {size}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <Text className="mt-7 mb-5 text-start w-full ml-12 text-2xl font-bold  ">
        Price ${product.price}
      </Text>
      <TouchableOpacity
        onPress={handleAddToCart}
        className="bg-blue-400 w-[90%] rounded-full h-14 justify-center items-center "
      >
        <Text className="text-white">Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};
