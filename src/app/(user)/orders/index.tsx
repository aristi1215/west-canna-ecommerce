import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { OrderComponent } from "@/src/components/OrderComponent";
import { useOrdersList } from "@/src/api/orders";

export default function OrderIndex() {

  const {data: orders, isLoading, error} = useOrdersList({archived: false})

  if(isLoading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>An error has occurred</Text>
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-200 px-10">
      <FlatList className="w-full" data={orders} renderItem={({item}) => <OrderComponent order={item}/>} />
    </View>
  )
}