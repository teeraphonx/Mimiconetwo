import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ApiProduct } from "@/lib/api";

export interface CartItem {
  product: ApiProduct;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (product: ApiProduct) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  totalItems: number;
  totalPrice: number;
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items ?? [];
        const exist = items.find((i) => i.product._id === product._id);

        let updatedItems;

        if (exist) {
          updatedItems = items.map((i) =>
            i.product._id === product._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          updatedItems = [...items, { product, quantity: 1 }];
        }

        const totals = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          totalItems: totals.totalItems,
          totalPrice: totals.totalPrice,
        });
      },

      removeItem: (id) => {
        const updatedItems = (get().items ?? []).filter(
          (i) => i.product._id !== id
        );

        const totals = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          totalItems: totals.totalItems,
          totalPrice: totals.totalPrice,
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          return get().removeItem(id);
        }

        const updatedItems = (get().items ?? []).map((i) =>
          i.product._id === id ? { ...i, quantity } : i
        );

        const totals = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          totalItems: totals.totalItems,
          totalPrice: totals.totalPrice,
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      totalItems: 0,
      totalPrice: 0,
    }),
    {
      name: "mimicgg-cart",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persisted: any, version) => {
        if (!persisted || version < 2) return { items: [], totalItems: 0, totalPrice: 0 };
        return persisted;
      },
    }
  )
);
