import { Stack, useLocalSearchParams } from "expo-router"
import { ProductDetails } from "@/components/ProductDetails"

const Product = () => {
  const {id} = useLocalSearchParams()
  return (
    <>
    <Stack.Screen options={{title: 'Details'}} />
    <ProductDetails id={id} />
    </>
  )
}

export default Product