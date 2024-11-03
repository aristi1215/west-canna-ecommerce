import { Stack, useLocalSearchParams } from "expo-router"
import { ProductDetails } from "@/components/ProductDetails"

const Product = () => {
  const {id} = useLocalSearchParams()
  return (
    <>
    {/* Se esta llamando el stack screen aqui simplemente para cambiar el titulo */}
    <Stack.Screen options={{title: 'Details', presentation:'modal'}} />
    <ProductDetails id={id} />
    </>
  )
}

export default Product