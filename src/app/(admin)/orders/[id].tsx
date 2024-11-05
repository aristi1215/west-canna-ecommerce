import { View, Text, Image, FlatList } from 'react-native';
import React from 'react'
import { defaultImage } from '@/src/components/ProductItem'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import { OrderComponent } from '@/src/components/OrderComponent';

export default function OrderDetails() {

    const {id} = useLocalSearchParams()
    
    const [order] = orders.filter(order => order.id == id)

  return (
    <View className='flex-1 bg-gray-200 px-7'>
      <Stack.Screen options={{title: `Order #${order.id.toString()}`, headerShown: true, headerTitleAlign: 'center'}} />
      <OrderComponent order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({item}) => ( <View className="h-[5rem] bg-white w-full flex-row mt-4 rounded-lg items-center justify-between px-2">
          <Image source={{uri: defaultImage}} className='h-full aspect-square' />
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