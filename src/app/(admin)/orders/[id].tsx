import { View, Text, Image, FlatList, Pressable, ActivityIndicator } from 'react-native';
import React from 'react'
import { defaultImage } from '@/src/components/ProductItem'
import { Stack, useLocalSearchParams } from 'expo-router'
import { OrderComponent } from '@/src/components/OrderComponent';
import { OrderStatus } from '@/src/components/OrderStatus';
import { useOrderById } from '@/src/api/orders';
import RemoteImage from '@/src/components/RemoteImage';
import products from '@/assets/data/products';


export default function OrderDetails() {

    const {id} = useLocalSearchParams()
    const stringId = typeof id === 'string' ? id : id[0]
    const idNumber = parseInt(stringId)
    const {data: order, error, isLoading} = useOrderById(idNumber)  

    if(error) return <Text>An error has occurred</Text>
    if(isLoading) return <ActivityIndicator />


  return (
    <View className='flex-1 bg-gray-200 px-7'>
      <Stack.Screen options={{title: `Order #${order.id.toString()}`, headerShown: true, headerTitleAlign: 'center'}} />
      <OrderComponent order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({item}) => ( <View className="h-[5rem] bg-white w-full flex-row mt-4 rounded-lg items-center justify-between px-2">
          <RemoteImage path={item.products.image} className='h-full aspect-square' />
              <View className='flex-1 items-start ml-3'>
                  <Text className="text-black font-bold">{item?.products.name}</Text>
                  <Text className="text-gray-500">{item?.products.price} size: {item?.size}</Text>
              </View>
              <Text className="text-black font-bold">{order?.order_items?.length}</Text>
          </View>)
        }
        ListFooterComponent={() => ( <OrderStatus orderStatus={order.status} id={id} order={order} />)}
      />
    </View>
  )
}