import type { Product } from "./Product";

const cartItems: Product[] = [];

export const cartRepository = {
  all(): Product[] {
    return cartItems;
  },
  insert(item: Product) {
    cartItems.push(item);
  },
  count() {
    return cartItems.length;
  },
};
