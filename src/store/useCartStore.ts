import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      totalPrice: 0,

      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item._id === product._id
          );
          let updatedCart;

          if (existingProduct) {
            updatedCart = state.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + product.quantity }
                : item
            );
          } else {
            updatedCart = [...state.cart, product];
          }

          const newTotal = updatedCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );

          return { cart: updatedCart, totalPrice: newTotal };
        }),

      removeProduct: (productId) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => item._id !== productId
          );
          const newTotal = updatedCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          return { cart: updatedCart, totalPrice: newTotal };
        }),

      clearCart: () => set({ cart: [], totalPrice: 0 }),
    }),
    { name: 'cartStorage' }
  )
);

export default useCartStore;
