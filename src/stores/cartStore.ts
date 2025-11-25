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

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items ?? [];
        const exist = items.find((i) => i.product._id === product._id);

        if (exist) {
          set({
            items: items.map((i) =>
              i.product._id === product._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity: 1 }],
          });
        }
      },

      removeItem: (id) => {
        set({
          items: (get().items ?? []).filter(
            (i) => i.product._id !== id
          ),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: (get().items ?? []).map((i) =>
            i.product._id === id ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      // ⭐ FIX: ทำเป็น getter ปลอดภัย 100%
      get totalItems() {
        return (get().items ?? []).reduce(
          (sum, i) => sum + i.quantity,
          0
        );
      },

      get totalPrice() {
        return (get().items ?? []).reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        );
      },
    }),
    {
      name: "mimicgg-cart",
      storage: createJSONStorage(() => localStorage),

      // ⭐ ป้องกันข้อมูลเสียจาก version เก่า จน crash หน้าเว็บ
      version: 2,
      migrate: (persistedState: any, version) => {
        if (!persistedState || version < 2) {
          return { items: [] };
        }
        return persistedState;
      },
    }
  )
);