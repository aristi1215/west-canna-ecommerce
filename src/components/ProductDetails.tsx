import { View, Text, Image, TouchableOpacity, Pressable  } from "react-native"
import products from "@/assets/data/products"
import { useState } from "react"
import { PizzaSize } from "@/assets/types"
import { useCartContext } from "../context/CartProvider"


export const ProductDetails = ({ id }) => {

    const sizes = ['S', 'M', 'L', 'XL'] as const
    type Size = typeof sizes[number]

    const {addItem} = useCartContext()
    
    const product = products.find(product => product.id == id)

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

    
    if(!product){
        return <Text>Product not found</Text>
    }
    
    const handleAddToCart = () => {
        addItem(product, selectedSize)
        alert('Item added')
    }

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-3xl font-bold">{product?.name}</Text>
            <Image source={{uri: product?.image}} className="w-full aspect-square" />
            <Text className="text-start w-full ml-3 mb-5 text-2xl">Select size</Text>
            <View className="flex-row justify-evenly w-full">
                {sizes.map((size, i) => (
                    <Pressable key={i} onPress={() => setSelectedSize(size)}>
                        <View className={`${selectedSize === size ? 'bg-gray-200' : ''} w-14 rounded-full aspect-square items-center justify-center`}>
                            <Text className={`${selectedSize === size ? 'font-bold' : ''} text-center text-xl`}>{size}</Text>
                        </View>
                    </Pressable>
                    ))}
            </View>
            <Text className="mt-10 mb-5 text-start w-full ml-12 text-2xl font-bold  ">Price ${product.price}</Text>
            <TouchableOpacity onPress={handleAddToCart} className="bg-blue-400 w-[90%] rounded-full h-14 justify-center items-center ">
                <Text className="text-white">Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}
