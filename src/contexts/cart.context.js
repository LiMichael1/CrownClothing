import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  // Find if Cart contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  // Return new Array with modified cart items/ new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find if Cart contains itemToRemove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // If found & quantity is one, remove the item from Cart
  if (existingCartItem.quantity === 1) {
    // Returns an array without that cart item
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // If found & quantity > 1, decrement quantity
  return cartItems.map((cartItem) => {
    return cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

// Return Cart (new Array) without itemToClear
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  // initial state
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Add to Cart Item Count
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    // Add up the Price
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemFromCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

  const clearItemFromCart = (cartItemToClear) =>
    setCartItems(clearCartItem(cartItems, cartItemToClear));

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/*
product
[
  id,
  name,
  price,
  imageUrl
]

*/

/*
Cart Item
[
  id,
  name,
  price,
  imageUrl,
  quantity
]

*/
