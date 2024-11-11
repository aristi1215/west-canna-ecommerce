import { supabase } from "@/src/client/client"
import { useMutation } from "@tanstack/react-query"

export const useInsertOrderItems = () => {
    return useMutation({
        async mutationFn (data) {
            const {error, data: orderItems} = await supabase.from('order_items').insert(data).select()
            if(error){throw new Error(error.message)}
            return orderItems
        },
    })

}