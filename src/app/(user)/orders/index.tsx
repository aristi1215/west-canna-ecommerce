import { View, FlatList, Text } from "react-native";
import { OrderComponent } from "@/src/components/OrderComponent";
import orders from "@/assets/data/orders";

export default function OrderIndex() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-200 px-10">
      <FlatList className="w-full" data={orders} renderItem={({item}) => <OrderComponent order={item}/>} />
    </View>
  )
}