import { createContext, ReactNode, useContext, useState } from "react";

interface ICartProps {
  children: ReactNode;
}

interface ICartProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface ICartData {
  cart: ICartProduct[];
  addToCart: (product: ICartProduct) => void;
  removeFromCart: (product: ICartProduct) => void;
  increaseQuantity: (product: ICartProduct) => void;
  decreaseQuantity: (product: ICartProduct) => void;
  cartTotal: () => number;
  clearCart: () => void;
}

const CartContext = createContext<ICartData>({} as ICartData);

export const CartProvider = ({ children }: ICartProps) => {
  const [cart, setCart] = useState<ICartProduct[]>([]);

  const addToCart = (product: ICartProduct) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product: ICartProduct) => {
    const newCart = cart.filter((item) => item.id !== product.id);

    setCart(newCart);
  };

  const increaseQuantity = (product: ICartProduct) => {
    const newCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCart(newCart);
  };

  const decreaseQuantity = (product: ICartProduct) => {
    const newCart = cart.map((item) =>
      item.id === product.id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCart(newCart);
  };

  const cartTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
