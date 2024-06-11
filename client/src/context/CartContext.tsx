import { ReactNode, createContext, useContext, useState } from "react";

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: string;
  quantity: number;
};

type CartContextType = {
  getItemQuantity: (id: string) => number;
  incrementCartQuantity: (id: string) => void;
  decrementCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext({} as CartContextType);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: string) {
    let item = cartItems.find((i) => i.id === id);
    return item !== undefined ? item.quantity : 0;
  }

  function incrementCartQuantity(id: string) {
    setCartItems((currentItems) => {
      let item = cartItems.find((i) => i.id === id);

      // Item is not in the cart (add to cart)
      if (item === undefined) {
        return [...currentItems, { id, quantity: 1 }];
      }

      // Item is in the cart (increment quantity of item in cart)
      else {
        return currentItems.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity + 1 };
          } else {
            return i;
          }
        });
      }
    });
  }

  function decrementCartQuantity(id: string) {
    setCartItems((currentItems) => {
      let item = cartItems.find((i) => i.id === id);
      let quantity = item != undefined ? item.quantity : 0;

      // Item is not found in cart
      if (quantity === 0) {
        return currentItems;
      }
      // Only one of the item left in cart
      if (quantity === 1) {
        return currentItems.filter((i) => i.id !== id);
      }
      // Two or more of the item in cart
      else {
        return currentItems.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity - 1 };
          } else {
            return i;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currentItems) => {
      return currentItems.filter((i) => i.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        incrementCartQuantity,
        decrementCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
