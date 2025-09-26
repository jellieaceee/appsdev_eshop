import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [purchased, setPurchased] = useState([]);

  const addToCart = (product) => {
    if (cart.find(p => p.id === product.id)) return false;
    setCart([...cart, product]);
    return true;
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(p => p.id !== id));
  };

  const purchaseProduct = (product) => {
    // Add to purchased array if not already there
    if (!purchased.find(p => p.id === product.id)) {
      setPurchased(prev => [...prev, product]);
    }
    // Remove from cart
    setCart(prev => prev.filter(p => p.id !== product.id));
  };

  const purchaseMultipleProducts = (products) => {
    // Add all selected products to purchased
    const newPurchased = products.filter(
      p => !purchased.find(x => x.id === p.id)
    );
    if (newPurchased.length > 0) {
      setPurchased(prev => [...prev, ...newPurchased]);
    }
    // Remove all selected products from cart
    const remainingCart = cart.filter(p => !products.find(x => x.id === p.id));
    setCart(remainingCart);
  };

  const isInCart = (id) => cart.some(p => p.id === id);
  const isPurchased = (id) => purchased.some(p => p.id === id);

  return (
    <CartContext.Provider value={{
      cart,
      purchased,
      addToCart,
      removeFromCart,
      purchaseProduct,
      purchaseMultipleProducts,
      isInCart,
      isPurchased
    }}>
      {children}
    </CartContext.Provider>
  );
};
