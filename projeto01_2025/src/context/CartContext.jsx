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

function chaveItem(item) {
  return `${item.id}::${item.tamanho || ''}`;
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (produto) => {
    setCartItems((prevItems) => {
      const chaveNova = chaveItem(produto);
      const itemExistente = prevItems.find((item) => chaveItem(item) === chaveNova);

      if (itemExistente) {
        return prevItems.map((item) =>
          chaveItem(item) === chaveNova
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...produto, quantity: 1 }];
    });
  };

  const removeFromCart = (chave) => {
    setCartItems((prev) => prev.filter((item) => chaveItem(item) !== chave));
  };

  const removeOneFromCart = (chave) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          chaveItem(item) === chave
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
    () => ({ cartItems, addToCart, removeFromCart, removeOneFromCart, clearCart, chaveItem }),
    [cartItems]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
