import { ActivityIndicator, Alert, FlatList, ScrollView, VirtualizedList } from 'react-native';
import {ProductItem} from '@/components/ProductItem'
import { useProductList } from '@/src/api/products';
import products from '@/assets/data/products';



export default function HomeScreen() {

  // const {data: products, error, isLoading} = useProductList()

  // if(isLoading) return <ActivityIndicator />

  // if(error) throw new Error('An error has occurred while fetching the data')


  return (
    <ScrollView nestedScrollEnabled={true}>    
    <FlatList 
    contentContainerClassName='gap-4 py-10 bg-gray-200 flex-1'
    data={products} 
    numColumns={2}
    renderItem={({item}) => <ProductItem product={item} />} />
    </ScrollView>
  );
}