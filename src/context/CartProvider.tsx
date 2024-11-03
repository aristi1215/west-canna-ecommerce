import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from '../../assets/types';
import { randomUUID } from "expo-crypto"


type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (product: Product, amount:1|-1) => void,
    total: Number
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0
})

export const useCartContext = () => useContext(CartContext)



export const CartContextProvider = ({ children }: PropsWithChildren ) => {

    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, size: CartItem['size']) => {


        const existingItem = items.find(item => item.product === product && item.size === size)

        if(existingItem) {
             updateQuantity(existingItem.id, 1)
             return
        }

        const newCartItem = {
            product,
            id: randomUUID(),
            product_id: product.id,
            size,
            quantity: 1
        }
        setItems([newCartItem, ...items])
    }

    const updateQuantity = (itemId, amount) => {
        setItems(prevItems => {
            // Find the index of the element
            const index = prevItems.findIndex(item => item.id === itemId);
            if (index === -1) return prevItems; // if element does not exists
    
            // Copy of the array
            const newItems = [...prevItems];
            const newQuantity = newItems[index].quantity + amount;
            
            // Avoid negative quantities
            if (newQuantity < 1){
                const filteredItems = newItems.filter(item => item.id !== itemId)
                return filteredItems
            };
    
            // Update the state
            newItems[index] = { ...newItems[index], quantity: newQuantity };
            return newItems;
        });
    }

    const total = parseFloat(items.reduce((sum, item) => sum += item.product.price * item.quantity, 0).toFixed(2))

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
            {children}
        </CartContext.Provider>
    )
}