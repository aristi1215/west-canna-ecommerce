import { View, Text, Pressable  } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "expo-router";
import { useSegments } from "expo-router";

dayjs.extend(relativeTime);

export const OrderComponent = ({order}) => {

    const timefromNow = dayjs(order.created_at).fromNow()

    const segments = useSegments()

    if(!order) return <Text className="text-black text-center">Order not found</Text>
    
    return (
    <Link href={`${segments[0]}/orders/${order.id}`} asChild>
        <Pressable>
            <View className="h-[5rem] bg-white w-full flex-row mt-4 rounded-lg items-center justify-between px-2">
                <View>
                    <Text className="text-black font-bold">Order #{order.id}</Text>
                    <Text className="text-gray-500">{timefromNow}</Text>
                </View>
                <Text className="text-black font-bold">{order.status}</Text>
            </View>
        </Pressable>
    </Link>
    )
}

