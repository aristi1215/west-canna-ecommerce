import { supabase } from "@/src/client/client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("products")
        .insert({
          name: data.name,
          price: data.price,
          image: data.image,
        })
        .select();

      if (error) throw new Error("Error creating the product");
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedProduct } = await supabase
        .from("products")
        .update({
          name: data.name,
          price: data.price,
          image: data.image,
        })
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error("Error creating the products " + error.message);
      return updatedProduct;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries(["products"]);
      await queryClient.invalidateQueries(["products", data.id]);
    },
  });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn (id) {
            const {error} = await supabase.from('products').delete().eq('id', id)
            if(error) throw new Error('Error deleting product ' + error.message)
        },
        async onSuccess () {
            await queryClient.invalidateQueries(["products"])
        } 
    })
}
