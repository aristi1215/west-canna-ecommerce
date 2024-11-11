import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { OrderComponent } from '@/src/components/OrderComponent';
import { useOrderById } from '@/src/api/orders';
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions';
import RemoteImage from '@/src/components/RemoteImage';

export default function OrderDetails() {

    const {id} = useLocalSearchParams()
    const stringId = typeof id === 'string' ? id : id[0]
    const idNumber = parseInt(stringId)
    const {data: order, isLoading, error} = useOrderById(idNumber)  
    useUpdateOrderSubscription(idNumber)
    if(isLoading) return <ActivityIndicator />
    if(error || !order) return <Text>{error?.message}</Text>


  return (
    <View className='flex-1 bg-gray-200 px-7'>
      <Stack.Screen options={{title: `Order #${order.id.toString()}`, headerShown: true, headerTitleAlign: 'center'}} />
      <OrderComponent order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({item}) => ( <View className="h-[5rem] bg-white w-full flex-row mt-4 rounded-lg items-center justify-between px-2">
          <RemoteImage path={item.products.image} className='h-[80%] aspect-square' />
              <View className='flex-1 items-start ml-3'>
                  <Text className="text-black font-bold">{item?.products.name}</Text>
                  <Text className="text-gray-500">{item?.products.price} size: {item?.size}</Text>
              </View>
              <Text className="text-black font-bold">{order?.order_items?.length}</Text>
          </View>)}
      />
    </View>
  )
}