import { Text, View, Pressable } from 'react-native'   
 import { OrderStatusList } from '@/assets/types';



export const OrderStatus = ({orderStatus}) => {
    return (
      <View className='flex-row gap-4 mt-10 '>
        {OrderStatusList.map((status, i) => (
          <Pressable key={i} className={`border border-blue-600 rounded-lg p-2 ${orderStatus === status ? 'bg-blue-600' : ''}`}>
            <Text className={`${orderStatus === status ? 'text-white' : ''}`}>{status}</Text>
          </Pressable>
        ))
        }
      </View>
    )
}