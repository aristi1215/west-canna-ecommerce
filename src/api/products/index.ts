import { supabase } from '@/src/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const {data, error} = await supabase.from('products').select('*')
          if(error) throw new Error(error.message)
          return data
        }
      })
}

export const useProductById = (id:number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const {data, error} = await supabase.from('products').select('*').eq('id', id).single()
            if(error) throw new Error(error.message)
            return data
        }
    })
}

export const useCreateProduct = () => {

    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn (data: any) {
           const {error, data: newProduct} = await supabase.from('products').insert({
                name: data.name,
                price: data.price,
                image: data.image
            }).select()

            if(error) throw new Error('Error creating the product')
            return newProduct
        },
        async onSuccess () {
            await queryClient.invalidateQueries(['products'])
        }
    })
}