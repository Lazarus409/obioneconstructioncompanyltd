"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/app/shop/data";

type CartItem = Product & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = "obi-one-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getStoredCartItems);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + getPriceValue(item.price) * item.quantity,
      0,
    );

    return {
      items,
      itemCount,
      subtotal,
      addItem: (product) => {
        setItems((currentItems) => {
          const existingItem = currentItems.find(
            (item) => item.slug === product.slug,
          );

          if (existingItem) {
            return currentItems.map((item) =>
              item.slug === product.slug
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }

          return [...currentItems, { ...product, quantity: 1 }];
        });
      },
      removeItem: (slug) => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.slug !== slug),
        );
      },
      updateQuantity: (slug, quantity) => {
        setItems((currentItems) =>
          currentItems
            .map((item) =>
              item.slug === slug
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      clearCart: () => {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

function getPriceValue(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

function getStoredCartItems() {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as CartItem[];
  } catch {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}
