"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/app/shop/data";
import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
  iconOnly?: boolean;
};

export default function AddToCartButton({
  product,
  className,
  iconOnly = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [didAdd, setDidAdd] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setDidAdd(true);
    window.setTimeout(() => setDidAdd(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      aria-label={`Add ${product.name} to cart`}
      className={className}
    >
      <ShoppingCart className="h-4 w-4" />
      {iconOnly ? null : didAdd ? "Added" : "Add to Cart"}
    </button>
  );
}
