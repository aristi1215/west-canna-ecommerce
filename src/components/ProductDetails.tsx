import { View, Text, Image } from "react-native"
import products from "@/assets/data/products"

export const ProductDetails = ({ id }) => {

    const [product] = products.filter(product => product.id == id)

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-xl font-bold">{product.name}</Text>
            <Image source={{uri: product.image}} className="w-full aspect-[2/1]" />
            <Text className="text-xl font-bold">{product.price} $</Text>
        </View>
    )
}
