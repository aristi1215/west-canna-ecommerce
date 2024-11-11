import { View, Text, Image, Pressable } from "react-native"
import { Plus,Minus } from "@/assets/icons/icons"
import { useCartContext } from "../context/CartProvider"
import RemoteImage from "./RemoteImage"


export const CartItemComponent = ({item}) => {
  if(!item) return <Text className="text-center">Item not found</Text>

  const { updateQuantity } = useCartContext()

  const handleMinus = () => {
    updateQuantity(item.id, -1)
  }
  const handlePlus = () => {
    updateQuantity(item.id, 1)
  }

  return (
    <View className="flex-row h-[6rem] shadow-sm rounded-lg justify-between  p-2 mx-4 bg-white">
        <RemoteImage path={item.product.image}  className="max-w-[4rem] h-full aspect-square" resizeMode="contain" />
        <View className="flex-1 items-center justify-between flex-row gap-4 h-full">
        <View className="items-start justify-center h-full ml-3">
          <Text className="text-xl">{item.product.name}</Text>
          <Text className="text-blue-500 font-bold">{item.product.price}$ <Text className="text-black font-normal">Sizea: {item.size}</Text> </Text>
        </View>
        <View className="jusitfy-center items-center flex-row gap-4">
        <Pressable onPress={handleMinus} className="h-6 w-6 items-center justify-center">
            <Minus color={'gray'} size={12} />
          </Pressable>
          <Text>{item.quantity}</Text>
          <Pressable onPress={handlePlus} className="h-6 w-6 items-center justify-center">
            <Plus color={'gray'} size={12} />
          </Pressable>
        </View>
        </View>
    </View>
  )
}
