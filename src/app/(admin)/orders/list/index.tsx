import { View, FlatList } from "react-native";
import { OrderComponent } from "@/src/components/OrderComponent";
import { useOrdersList } from "@/src/api/orders";
import { useInsertOrderSubscription } from '../../../../api/orders/subscriptions';

export default function OrderIndex() {
  const {data: orders} = useOrdersList({archived: false})
  useInsertOrderSubscription()

  return (
    <View className="flex-1 justify-center items-center bg-gray-200 px-10">
      <FlatList className="w-full" data={orders} renderItem={({item}) => <OrderComponent order={item} />} />
    </View>
  )
}