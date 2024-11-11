import { supabase } from "@/src/client/client"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"


export const useInsertOrderSubscription = () => {
    
    const queryClient = useQueryClient()

  useEffect(() => {
    const channels = supabase.channel('custom-insert-channel')
    .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'orders' },
    (payload) => {
        queryClient.invalidateQueries(['orders'])
    }
    )
    .subscribe()
    
    return () => {channels.unsubscribe()}

  },[])
}

export const useUpdateOrderSubscription = (id:number) => {
    const queryClient = useQueryClient()
    useEffect(() => {
        const channels = supabase.channel('custom-update-channel')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${id}` },
          (payload) => {
              queryClient.invalidateQueries(['orders', id])
          }
        )
        .subscribe()

        return () => {channels.unsubscribe()}

    },[])
}