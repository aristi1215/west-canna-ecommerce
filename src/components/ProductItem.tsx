import { View, Image, Text, Pressable } from 'react-native';
import { Product } from "@/assets/types"
import { Link } from 'expo-router';


export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductItemProps = {
  product: Product
}

export const ProductItem = ( {product} : ProductItemProps ) => {
    return(
      <Link href={`/menu/${product.id}`} asChild>
        <Pressable className='flex-1 max-w-[50%] bg-white mx-2 rounded-lg p-2'>
        <Image source={{uri: product.image || defaultImage}} resizeMode='contain' className='aspect-[1/1] w-full' />
        <Text className='text-black text-xl font-bold'>{product.name}</Text>
        <Text className='text-blue-400 text-lg font-bold'>{product.price}$</Text>
        </Pressable>
      </Link>
    )
  }