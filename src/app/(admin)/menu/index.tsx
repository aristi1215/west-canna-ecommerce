import { FlatList, ScrollView } from 'react-native';
import {ProductItem} from '@/components/ProductItem'
import { ActivityIndicator } from 'react-native';
import { useProductList } from '@/src/api/products';



export default function HomeScreen() {
  const {data: products, error, isLoading} = useProductList()

  if(isLoading) return <ActivityIndicator />

  if(error) throw new Error('An error has occurred while fetching the data')


  return (
    <FlatList 
    contentContainerClassName='gap-4 py-10 bg-gray-200 flex-1'
    data={products} 
    numColumns={2}
    renderItem={({item}) => <ProductItem product={item} />} />
  )
}