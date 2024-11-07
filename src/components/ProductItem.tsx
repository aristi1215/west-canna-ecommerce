import { Image, Text, Pressable } from 'react-native';
import { Product } from "@/assets/types"
import { Link, useSegments } from 'expo-router';
import { WeedLeaf } from '@/assets/icons/icons';

export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

type ProductItemProps = {
  product: Product
}


export const ProductItem = ( {product} : ProductItemProps ) => {
  const segments = useSegments()
    return(
      <Link href={`${segments[0]}/menu/${product.id}`} asChild>
        <Pressable className='flex-1 max-w-[50%] bg-white mx-2 rounded-lg p-2'>
          {/* <Image source={product.image ? product.image : require('../../assets/images/products/default.jpg')} resizeMode='contain' className='w-full h-[6rem]' /> */}
          <Image source={product.image ? product.image : require('../../assets/images/products/default.jpg')} resizeMode='contain' className='w-full h-[6rem]' />
        <Text className='text-black text-xl font-bold'>{product.name}</Text>
        <Text className='text-blue-400 text-lg font-bold'>{product.price}$</Text>
        </Pressable>
      </Link>
    )
  }
// import { Image, Text, Pressable } from 'react-native';
// import { Product } from "@/assets/types"
// import { Link, useSegments } from 'expo-router';
// import { WeedLeaf } from '@/assets/icons/icons';

// export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

// type ProductItemProps = {
//   product: Product
// }


// export const ProductItem = ( {product} : ProductItemProps ) => {
//   const segments = useSegments()
//     return(
//       <Link href={`${segments[0]}/menu/${product.id}`} asChild>
//         <Pressable className='flex-1 max-w-[50%] bg-white mx-2 rounded-lg p-2'>
//           {/* <Image source={product.image ? product.image : require('../../assets/images/products/default.jpg')} resizeMode='contain' className='w-full h-[6rem]' /> */}
//           <Image source={product.image ? {uri: product.image} : require('../../assets/images/products/default.jpg')} resizeMode='contain' className='w-full h-[6rem]' />
//         <Text className='text-black text-xl font-bold'>{product.name}</Text>
//         <Text className='text-blue-400 text-lg font-bold'>{product.price}$</Text>
//         </Pressable>
//       </Link>
//     )
//   }