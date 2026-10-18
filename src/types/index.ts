export type UserRole = 'admin' | 'household' | 'restaurant' | 'society' | 'farmer' | 'collector' | 'processing_operator';

export interface Profile {
  id: string;
  auth_user_id?: string;
  role: UserRole;
  full_name: string;
  phone: string;
  email: string;
  avatar_url?: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface HouseholdProfile {
  id: string;
  profile_id: string;
  household_size: number;
  pickup_plan: string;
  monthly_fee: number;
  waste_estimate_kg: number;
  active: boolean;
}

export interface SocietyProfile {
  id: string;
  profile_id: string;
  society_name: string;
  total_flats: number;
  wings: number;
  daily_waste_estimate_kg: number;
  pickup_frequency: string;
  monthly_fee: number;
  compliance_status: 'certified' | 'pending' | 'review_required';
  segregation_rate_percent: number;
  active: boolean;
}

export interface RestaurantProfile {
  id: string;
  profile_id: string;
  business_name: string;
  business_type: string;
  daily_waste_estimate_kg: number;
  pickup_frequency: string;
  monthly_fee: number;
  compliance_status: 'certified' | 'pending' | 'review_required';
  active: boolean;
}

export interface FarmerProfile {
  id: string;
  profile_id: string;
  farm_name: string;
  farm_size_acres: number;
  location: string;
  soil_type: string;
  crops: string[];
  farming_method: string;
  fpo_name: string;
}

export interface CollectorProfile {
  id: string;
  profile_id: string;
  vehicle_type: string;
  vehicle_identifier: string;
  active: boolean;
  current_latitude: number;
  current_longitude: number;
}

export type PickupStatus = 'scheduled' | 'assigned' | 'on_the_way' | 'completed' | 'cancelled';
export type ContaminationLevel = 'none' | 'low' | 'medium' | 'high';

export interface PickupRequest {
  id: string;
  customer_id: string;
  customer_name?: string;
  customer_address?: string;
  customer_type: 'household' | 'restaurant' | 'society';
  scheduled_date: string;
  time_window: string;
  status: PickupStatus;
  assigned_collector_id?: string;
  collector_name?: string;
  estimated_weight_kg: number;
  actual_weight_kg?: number;
  contamination_level?: ContaminationLevel;
  notes?: string;
  completed_at?: string;
  created_at: string;
}

export type BatchStatus = 'pre_processing' | 'bedding' | 'active_processing' | 'maturation' | 'quality_check' | 'completed';
export type ProcessingMethod = 'Vermicomposting' | 'Biochar Pyrolysis' | 'Liquid Bio-Fertiliser' | 'Bokashi Fermentation';

export interface ProcessingBatch {
  id: string;
  batch_code: string;
  input_waste_kg: number;
  waste_type: string;
  processing_method: ProcessingMethod;
  start_date: string;
  expected_completion_date: string;
  actual_completion_date?: string;
  status: BatchStatus;
  output_estimate_kg: number;
  quality_status: 'pending' | 'passed' | 'premium_grade' | 'rejected';
  notes?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  unit: string;
  price: number;
  mrp: number;
  stock_quantity: number;
  minimum_order_quantity: number;
  processing_method: ProcessingMethod;
  application_guidance: string;
  active: boolean;
  image_url: string;
}

export type OrderStatus = 'placed' | 'confirmed' | 'processing' | 'packed' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name?: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: string;
  farmer_id: string;
  farmer_name?: string;
  status: OrderStatus;
  subtotal: number;
  delivery_fee: number;
  total: number;
  delivery_address: string;
  items: OrderItem[];
  created_at: string;
}

export interface AdvisoryRequest {
  id: string;
  farmer_id: string;
  crop: string;
  farm_size: string;
  soil_type: string;
  question: string;
  response: AdvisoryResponse;
  source_type: 'gemini_ai' | 'deterministic_fallback';
  created_at: string;
}

export interface AdvisoryResponse {
  crop: string;
  farmSize: string;
  recommendedProduct: string;
  recommendedQuantity: string;
  applicationMethod: string;
  timing: string;
  precautions: string;
  reasoning: string;
  disclaimer: string;
}

export interface ImpactEvent {
  id: string;
  event_type: 'pickup_completed' | 'batch_produced' | 'farmer_applied' | 'carbon_offset';
  waste_kg: number;
  co2e_kg: number;
  farmer_savings: number;
  farmer_id?: string;
  customer_id?: string;
  created_at: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}

export interface RewardTransaction {
  id: string;
  user_id: string;
  points: number;
  reason: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  customer_id: string;
  certificate_type: string;
  period: string;
  waste_diverted_kg: number;
  generated_at: string;
  document_url?: string;
}
