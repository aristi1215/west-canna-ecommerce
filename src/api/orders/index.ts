import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../client/client';
import { useAuthContext } from '@/src/context/AuthContext';


export const useOrdersList = ({archived=false}) => {
    const statuses = archived ? ['Delivered'] :['New', 'Cooking', 'Delivering']
    return useQuery({
        queryKey: ['orders', archived],
        queryFn: async () => {
          const { error, data: orders } =  await supabase.from('orders').select('*').in('status', statuses).order('created_at', {ascending: false})
          if(error) throw new Error(error.message)
            return orders
        }
    })
}

export const useOrderById = (id:number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const {error, data: orders} = await supabase.from('orders').select('*, order_items(*, products(*))').eq('id', id).single()
            if(error) throw new Error(error.message)
            return orders
        }
    })
}


export const useInsertOrders = () => {
    const queryClient = useQueryClient()
    const {session} = useAuthContext()
    const userId = session?.user.id

    return useMutation({
        async mutationFn (data) {
            const {error, data: newOrder} = await supabase.from('orders').insert({user_id: userId, ...data}).select().single()
            if(error) throw new Error(error.message)
            return newOrder
        },
        async onSuccess () {
            queryClient.invalidateQueries(['orders'])
        }
    })
}

export const useUpdateOrders = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn ({id,status}) {
            const {error, data: updatedOrder} = await supabase.from('orders')
            .update({status})
            .eq('id', id)
            .select()
            .single()
            if(error) throw new Error(error?.message)
            return updatedOrder
        },
        async onSuccess () {
            queryClient.invalidateQueries(['orders'])
            queryClient.invalidateQueries(['orders', id])
        }
    })
}