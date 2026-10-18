import {
  Profile,
  HouseholdProfile,
  RestaurantProfile,
  FarmerProfile,
  CollectorProfile,
  PickupRequest,
  ProcessingBatch,
  Product,
  Order,
  AppNotification,
  AdvisoryRequest,
  Certificate,
  UserRole,
  BatchStatus,
  ContaminationLevel,
  OrderStatus,
} from '@/types';
import {
  SEED_PROFILES,
  SEED_PRODUCTS,
  SEED_BATCHES,
  SEED_PICKUPS,
  SEED_ORDERS,
  SEED_NOTIFICATIONS,
} from '@/lib/seed-data';
import { calculateWasteImpact, calculateAggregateImpact } from '@/lib/impact/calculator';

const STORAGE_KEY = 'agroloop_demo_store_v2';

export interface AgroLoopStoreState {
  profiles: Profile[];
  pickups: PickupRequest[];
  batches: ProcessingBatch[];
  products: Product[];
  orders: Order[];
  notifications: AppNotification[];
  advisories: AdvisoryRequest[];
  certificates: Certificate[];
  rewardPoints: Record<string, number>;
}

function getInitialState(): AgroLoopStoreState {
  if (typeof window === 'undefined') {
    return {
      profiles: SEED_PROFILES,
      pickups: SEED_PICKUPS,
      batches: SEED_BATCHES,
      products: SEED_PRODUCTS,
      orders: SEED_ORDERS,
      notifications: SEED_NOTIFICATIONS,
      advisories: [],
      certificates: [
        {
          id: 'cert-01',
          customer_id: 'user-restaurant-01',
          certificate_type: 'Certified Zero Food Waste Restaurant',
          period: 'January 2025',
          waste_diverted_kg: 1284.0,
          generated_at: '2025-02-01T00:00:00Z',
        },
        {
          id: 'cert-soc-01',
          customer_id: 'user-society-01',
          certificate_type: 'BMC Bulk Waste Generator Compliance (Green Star CHS)',
          period: 'January 2025',
          waste_diverted_kg: 5640.0,
          generated_at: '2025-02-01T00:00:00Z',
        },
      ],
      rewardPoints: { 'user-household-01': 420, 'user-society-01': 2850 },
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse AgroLoop store from localStorage', e);
  }

  const defaultState: AgroLoopStoreState = {
    profiles: SEED_PROFILES,
    pickups: SEED_PICKUPS,
    batches: SEED_BATCHES,
    products: SEED_PRODUCTS,
    orders: SEED_ORDERS,
    notifications: SEED_NOTIFICATIONS,
    advisories: [],
    certificates: [
      {
        id: 'cert-01',
        customer_id: 'user-restaurant-01',
        certificate_type: 'Certified Zero Food Waste Restaurant',
        period: 'January 2025',
        waste_diverted_kg: 1284.0,
        generated_at: '2025-02-01T00:00:00Z',
      },
      {
        id: 'cert-soc-01',
        customer_id: 'user-society-01',
        certificate_type: 'BMC Bulk Waste Generator Compliance (Green Star CHS)',
        period: 'January 2025',
        waste_diverted_kg: 5640.0,
        generated_at: '2025-02-01T00:00:00Z',
      },
    ],
    rewardPoints: { 'user-household-01': 420, 'user-society-01': 2850 },
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  } catch (e) {
    console.error('Failed to initialize AgroLoop localStorage', e);
  }

  return defaultState;
}

export class AgroLoopStore {
  private static state: AgroLoopStoreState = getInitialState();

  private static persist() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(AgroLoopStore.state));
      } catch (e) {
        console.error('Persist error', e);
      }
    }
  }

  public static resetDemoData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    AgroLoopStore.state = {
      profiles: SEED_PROFILES,
      pickups: SEED_PICKUPS,
      batches: SEED_BATCHES,
      products: SEED_PRODUCTS,
      orders: SEED_ORDERS,
      notifications: SEED_NOTIFICATIONS,
      advisories: [],
      certificates: [
        {
          id: 'cert-01',
          customer_id: 'user-restaurant-01',
          certificate_type: 'Certified Zero Food Waste Restaurant',
          period: 'January 2025',
          waste_diverted_kg: 1284.0,
          generated_at: '2025-02-01T00:00:00Z',
        },
      ],
      rewardPoints: { 'user-household-01': 420 },
    };
    AgroLoopStore.persist();
  }

  // --- Auth / Profile Data Layer ---
  public static getProfiles(): Profile[] {
    return AgroLoopStore.state.profiles;
  }

  public static getCurrentUser(role: UserRole): Profile {
    const state = AgroLoopStore.state;
    const found = state.profiles.find((p) => p.role === role);
    return (
      found || {
        id: `user-${role}-demo`,
        role,
        full_name: `Demo ${role.toUpperCase()} User`,
        email: `${role}@agroloop.demo`,
        phone: '+91 98220 00000',
        address: 'Mumbai Demo Location',
        city: 'Mumbai',
        state: 'Maharashtra',
        postal_code: '400001',
        latitude: 19.0760,
        longitude: 72.8777,
        created_at: new Date().toISOString(),
      }
    );
  }

  // --- Pickup Data Layer ---
  public static getPickups(): PickupRequest[] {
    return AgroLoopStore.state.pickups;
  }

  public static getPickupById(id: string): PickupRequest | undefined {
    return AgroLoopStore.state.pickups.find((p) => p.id === id);
  }

  public static schedulePickup(pickup: Omit<PickupRequest, 'id' | 'created_at' | 'status'>): PickupRequest {
    const newPickup: PickupRequest = {
      ...pickup,
      id: `pickup-${Date.now()}`,
      status: 'scheduled',
      created_at: new Date().toISOString(),
    };

    AgroLoopStore.state.pickups.unshift(newPickup);

    // Notifications
    AgroLoopStore.addNotification({
      user_id: pickup.customer_id,
      title: 'Pickup Scheduled 📅',
      message: `Your kitchen scraps pickup has been booked for ${pickup.scheduled_date} (${pickup.time_window}).`,
      type: 'info',
    });

    AgroLoopStore.addNotification({
      user_id: 'user-admin-01',
      title: 'New Waste Pickup Request',
      message: `Pickup scheduled by ${pickup.customer_name || 'Customer'} (${pickup.estimated_weight_kg} kg estimated).`,
      type: 'info',
    });

    AgroLoopStore.persist();
    return newPickup;
  }

  public static completeCollectorPickup(pickupId: string, actualWeightKg: number, contamination: ContaminationLevel = 'none', notes?: string) {
    const idx = AgroLoopStore.state.pickups.findIndex((p) => p.id === pickupId);
    if (idx !== -1) {
      const p = AgroLoopStore.state.pickups[idx];
      p.status = 'completed';
      p.actual_weight_kg = actualWeightKg;
      p.contamination_level = contamination;
      p.notes = notes;
      p.completed_at = new Date().toISOString();

      // Add reward points for household
      const { rewardPoints } = calculateWasteImpact(actualWeightKg);
      const currentPts = AgroLoopStore.state.rewardPoints[p.customer_id] || 0;
      AgroLoopStore.state.rewardPoints[p.customer_id] = currentPts + rewardPoints;

      // System Notifications
      AgroLoopStore.addNotification({
        user_id: p.customer_id,
        title: 'Waste Collected Successfully! 🌱',
        message: `${actualWeightKg} kg of kitchen waste collected. Earned +${rewardPoints} AgroLoop Green Points!`,
        type: 'success',
      });

      AgroLoopStore.addNotification({
        user_id: 'user-admin-01',
        title: 'Pickup Completed',
        message: `Collector recorded ${actualWeightKg} kg kitchen waste from ${p.customer_name || 'Customer'}.`,
        type: 'success',
      });

      AgroLoopStore.persist();
    }
  }

  // --- Processing Batches Data Layer ---
  public static getBatches(): ProcessingBatch[] {
    return AgroLoopStore.state.batches;
  }

  public static getProcessingBatchById(id: string): ProcessingBatch | undefined {
    return AgroLoopStore.state.batches.find((b) => b.id === id);
  }

  public static createBatch(batchData: Omit<ProcessingBatch, 'id' | 'created_at'>): ProcessingBatch {
    const newBatch: ProcessingBatch = {
      ...batchData,
      id: `batch-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    AgroLoopStore.state.batches.unshift(newBatch);

    AgroLoopStore.addNotification({
      user_id: 'user-admin-01',
      title: 'New Processing Batch Created',
      message: `Batch ${newBatch.batch_code} (${newBatch.processing_method}) initialized with ${newBatch.input_waste_kg} kg waste.`,
      type: 'info',
    });

    AgroLoopStore.persist();
    return newBatch;
  }

  public static advanceBatchStage(batchId: string, nextStatus: BatchStatus, qualityStatus?: ProcessingBatch['quality_status']) {
    const idx = AgroLoopStore.state.batches.findIndex((b) => b.id === batchId);
    if (idx !== -1) {
      const batch = AgroLoopStore.state.batches[idx];
      batch.status = nextStatus;
      if (qualityStatus) batch.quality_status = qualityStatus;

      // Automatically inject output stock into Product Inventory when batch completed!
      if (nextStatus === 'completed') {
        batch.actual_completion_date = new Date().toISOString().split('T')[0];

        const product = AgroLoopStore.state.products.find((p) => p.processing_method === batch.processing_method);
        if (product) {
          product.stock_quantity = Number((product.stock_quantity + batch.output_estimate_kg).toFixed(1));

          AgroLoopStore.addNotification({
            user_id: 'user-admin-01',
            title: 'Inventory Stock Increased! 📦',
            message: `Batch ${batch.batch_code} completed. Injected +${batch.output_estimate_kg} ${product.unit} into ${product.name} inventory.`,
            type: 'success',
          });
        }
      }
      AgroLoopStore.persist();
    }
  }

  // --- Products Data Layer ---
  public static getProducts(): Product[] {
    return AgroLoopStore.state.products;
  }

  public static getProductById(id: string): Product | undefined {
    return AgroLoopStore.state.products.find((p) => p.id === id);
  }

  // --- Orders Data Layer ---
  public static getOrders(): Order[] {
    return AgroLoopStore.state.orders;
  }

  public static getOrderById(id: string): Order | undefined {
    return AgroLoopStore.state.orders.find((o) => o.id === id);
  }

  public static placeFarmerOrder(farmerId: string, items: Array<{ productId: string; quantity: number }>, deliveryAddress: string): Order {
    let subtotal = 0;
    const orderItems = items.map((item) => {
      const prod = AgroLoopStore.state.products.find((p) => p.id === item.productId);
      if (!prod) throw new Error(`Product not found: ${item.productId}`);

      if (prod.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${prod.name}. Available: ${prod.stock_quantity} ${prod.unit}`);
      }

      // Deduct product stock quantity in real-time
      prod.stock_quantity = Number((prod.stock_quantity - item.quantity).toFixed(1));

      const itemPrice = prod.price * item.quantity;
      subtotal += itemPrice;

      return {
        id: `oi-${Date.now()}-${item.productId}`,
        order_id: '',
        product_id: prod.id,
        product_name: prod.name,
        quantity: item.quantity,
        unit_price: prod.price,
      };
    });

    const deliveryFee = subtotal > 2000 ? 0 : 150;
    const total = subtotal + deliveryFee;

    const farmerProfile = AgroLoopStore.state.profiles.find((p) => p.id === farmerId);

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      farmer_id: farmerId,
      farmer_name: farmerProfile?.full_name || 'Ramkisan Patil',
      status: 'placed',
      subtotal,
      delivery_fee: deliveryFee,
      total,
      delivery_address: deliveryAddress,
      items: orderItems,
      created_at: new Date().toISOString(),
    };

    newOrder.items.forEach((item) => (item.order_id = newOrder.id));
    AgroLoopStore.state.orders.unshift(newOrder);

    // Notifications
    AgroLoopStore.addNotification({
      user_id: farmerId,
      title: 'Order Placed Successfully! 🌾',
      message: `Your order #${newOrder.id.slice(-6)} total ₹${total} is confirmed. Inventory updated.`,
      type: 'success',
    });

    AgroLoopStore.addNotification({
      user_id: 'user-admin-01',
      title: 'New Farmer Input Order',
      message: `Order #${newOrder.id.slice(-6)} placed by ${farmerProfile?.full_name || 'Farmer'} (₹${total}).`,
      type: 'info',
    });

    AgroLoopStore.persist();
    return newOrder;
  }

  public static updateOrderStatus(orderId: string, status: OrderStatus) {
    const idx = AgroLoopStore.state.orders.findIndex((o) => o.id === orderId);
    if (idx !== -1) {
      const order = AgroLoopStore.state.orders[idx];
      order.status = status;

      AgroLoopStore.addNotification({
        user_id: order.farmer_id,
        title: `Order Status: ${status.toUpperCase()}`,
        message: `Your order #${order.id.slice(-6)} status changed to ${status.replace('_', ' ')}.`,
        type: 'info',
      });
      AgroLoopStore.persist();
    }
  }

  // --- Notifications Data Layer ---
  public static getNotifications(userId: string): AppNotification[] {
    return AgroLoopStore.state.notifications.filter((n) => n.user_id === userId || n.user_id === 'user-admin-01');
  }

  public static addNotification(notif: Omit<AppNotification, 'id' | 'read' | 'created_at'>) {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      read: false,
      created_at: new Date().toISOString(),
    };
    AgroLoopStore.state.notifications.unshift(newNotif);
    AgroLoopStore.persist();
  }

  public static markNotificationRead(notifId: string) {
    const notif = AgroLoopStore.state.notifications.find((n) => n.id === notifId);
    if (notif) {
      notif.read = true;
      AgroLoopStore.persist();
    }
  }

  // --- Impact Calculations ---
  public static getCalculatedImpact() {
    return calculateAggregateImpact(AgroLoopStore.state.pickups, AgroLoopStore.state.orders);
  }

  public static getRewardPoints(userId: string): number {
    return AgroLoopStore.state.rewardPoints[userId] || 420;
  }
}
