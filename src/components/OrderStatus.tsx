import { Text, View, Pressable } from 'react-native'   
 import { OrderStatusList } from '@/assets/types';
 import { useUpdateOrders } from '@/src/api/orders';
import { notifyUserAboutOrderUpdate } from '../lib/notifications';



export const OrderStatus = ({orderStatus, id, order}) => {

    const { mutate: updateOrder } = useUpdateOrders()  
    
    const handleUpdate = async (status) => {
      updateOrder({id, status})

      if(order){
        await notifyUserAboutOrderUpdate(order)
      }

    }
    
    return (
      <View className='flex-row gap-4 mt-10 '>
        {OrderStatusList.map((status, i) => (
          <Pressable onPress={() => handleUpdate(status)} key={i} className={`border border-blue-600 rounded-lg p-2 ${orderStatus === status ? 'bg-blue-600' : ''}`}>
            <Text className={`${orderStatus === status ? 'text-white' : ''}`}>{status}</Text>
          </Pressable>
        ))
        }
      </View>
    )
}