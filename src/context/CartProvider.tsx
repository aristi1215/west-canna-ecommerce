import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from '../../assets/types';
import { randomUUID } from "expo-crypto";
import { useInsertOrders } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from '../api/order-items/index';
import { initializePaymentSheet, openPaymentSheet } from '../lib/stripe';


type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (product: Product, amount: 1 | -1) => void;
  total: Number;
  checkOut: () => void
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkOut: () => {}
});

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrders()
  const {mutate: insertOrderItems} = useInsertOrderItems()
  const router = useRouter()

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem = {
      product,
      id: randomUUID(),
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId, amount) => {
    setItems((prevItems) => {
      // Find the index of the element
      const index = prevItems.findIndex((item) => item.id === itemId);
      if (index === -1) return prevItems; // if element does not exists

      // Copy of the array
      const newItems = [...prevItems];
      const newQuantity = newItems[index].quantity + amount;

      // Avoid negative quantities
      if (newQuantity < 1) {
        const filteredItems = newItems.filter((item) => item.id !== itemId);
        return filteredItems;
      }

      // Update the state
      newItems[index] = { ...newItems[index], quantity: newQuantity };
      return newItems;
    });
  };

  const total = parseFloat(
    items
      .reduce((sum, item) => (sum += item.product.price * item.quantity), 0)
      .toFixed(2)
  );

  const checkOut = async () => {
    try {
        await initializePaymentSheet(Math.floor(total * 100))

        const payed = await openPaymentSheet()
        if (!payed) {
            console.log('Payment was not completed')
            return
        }

        insertOrder({ total }, { onSuccess: saveOrderItems })
    } catch (error) {
        console.error('Checkout error:', error.message)
        alert('Failed to complete payment')
    }
}

  const saveOrderItems = (data) => {

    const cartItems = items.map(items => {
      return {
        order_id: data.id,
        product_id: items.product_id,
        quantity: items.quantity,
        size: items.size
      }
    }
    )

    insertOrderItems(cartItems, {
      async onSuccess () {
        clearCart()
        router.push(`/(user)/orders/${data?.id}`)
      }
    })
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkOut }}>
      {children}
    </CartContext.Provider>
  );
};
