import { useEffect, useMemo, useState } from 'react';
import { CartContext } from './cart-context';

const CART_STORAGE_KEY = 'femanic_cart';

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (produto) => {
    setCartItems((prevItems) => {
      const itemExistente = prevItems.find((item) => item.id === produto.id);

      if (itemExistente) {
        return prevItems.map((item) =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...produto, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeOneFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, removeOneFromCart, clearCart }),
    [cartItems]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
