import { FlatList } from 'react-native';
import products from '@/assets/data/products';
import {ProductItem} from '@/components/ProductItem'



export default function HomeScreen() {
  return (
      <FlatList 
      contentContainerClassName='gap-4 py-10 bg-gray-200'
      data={products} 
      numColumns={2}
      renderItem={({item}) => <ProductItem product={item} />} />
  );
}