import { Link, Stack, useLocalSearchParams } from "expo-router"
import { ProductDetails } from "@/components/ProductDetails"
import { Pressable } from "react-native"
import { PencilSquare } from "@/assets/icons/icons"

const Product = () => {
  const {id} = useLocalSearchParams()
  return (
    <>
    <Stack.Screen options={{title: 'Details', presentation:'modal', headerRight: () => (
      <Link href={`/(admin)/menu/create?id=${id}`} asChild >
          <Pressable>
              <PencilSquare/>
          </Pressable>
      </Link>
      )}}/>
    <ProductDetails id={id} admin={true} />
    </>
  )
}

export default Product