import { Product } from '@/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'agroloop_cart_session_v1';

export class CartStore {
  private static items: CartItem[] = CartStore.getInitialItems();

  private static getInitialItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse cart state', e);
    }
    return [];
  }

  private static persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(CartStore.items));
      } catch (e) {
        console.error('Cart persist error', e);
      }
    }
  }

  public static getItems(): CartItem[] {
    return CartStore.items;
  }

  public static addItem(product: Product, quantity: number = 10) {
    const existingIndex = CartStore.items.findIndex((item) => item.product.id === product.id);
    if (existingIndex !== -1) {
      CartStore.items[existingIndex].quantity += quantity;
    } else {
      CartStore.items.push({ product, quantity });
    }
    CartStore.persist();
  }

  public static updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      CartStore.removeItem(productId);
      return;
    }
    const item = CartStore.items.find((i) => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      CartStore.persist();
    }
  }

  public static removeItem(productId: string) {
    CartStore.items = CartStore.items.filter((i) => i.product.id !== productId);
    CartStore.persist();
  }

  public static clearCart() {
    CartStore.items = [];
    CartStore.persist();
  }

  public static getSubtotal(): number {
    return CartStore.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  public static getDeliveryFee(): number {
    const subtotal = CartStore.getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal > 2000 ? 0 : 150;
  }

  public static getTotal(): number {
    return CartStore.getSubtotal() + CartStore.getDeliveryFee();
  }
}
