import { Stack, useLocalSearchParams } from "expo-router"
import { ProductDetails } from "@/components/ProductDetails"
import { useProductById } from "@/src/api/products"

const Product = () => {
  const {id} = useLocalSearchParams()
  return (
    <>
    {/* Se esta llamando el stack screen aqui simplemente para cambiar el titulo */}
    <Stack.Screen options={{title: 'Details', presentation:'modal', headerStyle: {backgroundColor: '#087c6c' } }} />
    <ProductDetails id={id} />
    </>
  )
}

export default Product