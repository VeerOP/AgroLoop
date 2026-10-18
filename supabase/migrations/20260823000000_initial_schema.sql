-- AgroLoop Master Database Schema Migration
-- Geographic focus: Mumbai, Maharashtra, India

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'household', 'restaurant', 'farmer', 'collector', 'processing_operator')),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) DEFAULT 'Mumbai',
    state VARCHAR(100) DEFAULT 'Maharashtra',
    postal_code VARCHAR(20),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HOUSEHOLD PROFILES
CREATE TABLE IF NOT EXISTS public.household_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    household_size INT DEFAULT 4,
    pickup_plan VARCHAR(50) DEFAULT 'weekly',
    monthly_fee NUMERIC(10, 2) DEFAULT 199.00,
    waste_estimate_kg NUMERIC(6, 2) DEFAULT 15.00,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RESTAURANT PROFILES
CREATE TABLE IF NOT EXISTS public.restaurant_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100) DEFAULT 'Restaurant',
    daily_waste_estimate_kg NUMERIC(8, 2) DEFAULT 45.00,
    pickup_frequency VARCHAR(50) DEFAULT 'daily',
    monthly_fee NUMERIC(10, 2) DEFAULT 1499.00,
    compliance_status VARCHAR(50) DEFAULT 'certified',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FARMER PROFILES
CREATE TABLE IF NOT EXISTS public.farmer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    farm_name VARCHAR(255) NOT NULL,
    farm_size_acres NUMERIC(6, 2) NOT NULL,
    location VARCHAR(255) DEFAULT 'Palghar, Maharashtra',
    soil_type VARCHAR(100) DEFAULT 'Black Cotton Soil',
    crops TEXT[] DEFAULT ARRAY['Onion', 'Tomato'],
    farming_method VARCHAR(100) DEFAULT 'Organic / Natural',
    fpo_name VARCHAR(255) DEFAULT 'Sahyadri Farmers Producer Co.',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COLLECTOR PROFILES
CREATE TABLE IF NOT EXISTS public.collector_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vehicle_type VARCHAR(100) DEFAULT 'Electric E-Rickshaw Loader',
    vehicle_identifier VARCHAR(50) DEFAULT 'MH-01-EV-4829',
    active BOOLEAN DEFAULT TRUE,
    current_latitude NUMERIC(10, 7) DEFAULT 19.0760,
    current_longitude NUMERIC(10, 7) DEFAULT 72.8777,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PICKUP REQUESTS
CREATE TABLE IF NOT EXISTS public.pickup_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    customer_type VARCHAR(50) NOT NULL CHECK (customer_type IN ('household', 'restaurant')),
    scheduled_date DATE NOT NULL,
    time_window VARCHAR(50) DEFAULT '08:00 - 11:00 AM',
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'assigned', 'on_the_way', 'completed', 'cancelled')),
    assigned_collector_id UUID REFERENCES public.profiles(id),
    estimated_weight_kg NUMERIC(6, 2) DEFAULT 3.5,
    actual_weight_kg NUMERIC(6, 2),
    contamination_level VARCHAR(50) DEFAULT 'low' CHECK (contamination_level IN ('none', 'low', 'medium', 'high')),
    notes TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PICKUP ITEMS
CREATE TABLE IF NOT EXISTS public.pickup_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pickup_id UUID NOT NULL REFERENCES public.pickup_requests(id) ON DELETE CASCADE,
    waste_type VARCHAR(100) NOT NULL,
    weight_kg NUMERIC(6, 2) NOT NULL
);

-- 8. COLLECTION ROUTES
CREATE TABLE IF NOT EXISTS public.collection_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collector_id UUID NOT NULL REFERENCES public.profiles(id),
    route_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN ('pending', 'in_progress', 'completed')),
    total_pickups INT DEFAULT 0,
    completed_pickups INT DEFAULT 0,
    estimated_distance_km NUMERIC(6, 2) DEFAULT 14.5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. PROCESSING BATCHES
CREATE TABLE IF NOT EXISTS public.processing_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_code VARCHAR(50) UNIQUE NOT NULL,
    input_waste_kg NUMERIC(10, 2) NOT NULL,
    waste_type VARCHAR(100) NOT NULL DEFAULT 'Mixed Segregated Kitchen Waste',
    processing_method VARCHAR(100) NOT NULL CHECK (processing_method IN ('Vermicomposting', 'Biochar Pyrolysis', 'Liquid Bio-Fertiliser', 'Bokashi Fermentation')),
    start_date DATE NOT NULL,
    expected_completion_date DATE NOT NULL,
    actual_completion_date DATE,
    status VARCHAR(50) DEFAULT 'pre_processing' CHECK (status IN ('pre_processing', 'bedding', 'active_processing', 'maturation', 'quality_check', 'completed')),
    output_estimate_kg NUMERIC(10, 2) NOT NULL,
    quality_status VARCHAR(50) DEFAULT 'pending' CHECK (quality_status IN ('pending', 'passed', 'premium_grade', 'rejected')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    unit VARCHAR(50) NOT NULL DEFAULT 'kg',
    price NUMERIC(10, 2) NOT NULL,
    mrp NUMERIC(10, 2) NOT NULL,
    stock_quantity NUMERIC(10, 2) DEFAULT 0,
    minimum_order_quantity NUMERIC(10, 2) DEFAULT 5,
    processing_method VARCHAR(100) NOT NULL,
    application_guidance TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. INVENTORY MOVEMENTS
CREATE TABLE IF NOT EXISTS public.inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    movement_type VARCHAR(50) NOT NULL CHECK (movement_type IN ('batch_production', 'farmer_order', 'manual_adjustment', 'spoilage')),
    quantity NUMERIC(10, 2) NOT NULL,
    reference_type VARCHAR(50),
    reference_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL REFERENCES public.profiles(id),
    status VARCHAR(50) DEFAULT 'placed' CHECK (status IN ('placed', 'confirmed', 'processing', 'packed', 'out_for_delivery', 'delivered', 'cancelled')),
    subtotal NUMERIC(10, 2) NOT NULL,
    delivery_fee NUMERIC(10, 2) DEFAULT 0,
    total NUMERIC(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity NUMERIC(10, 2) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL
);

-- 14. ADVISORY REQUESTS
CREATE TABLE IF NOT EXISTS public.advisory_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL REFERENCES public.profiles(id),
    crop VARCHAR(100) NOT NULL,
    farm_size VARCHAR(50) NOT NULL,
    soil_type VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    response JSONB NOT NULL,
    source_type VARCHAR(50) DEFAULT 'deterministic_fallback' CHECK (source_type IN ('gemini_ai', 'deterministic_fallback')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id),
    customer_type VARCHAR(50) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    monthly_price NUMERIC(10, 2) NOT NULL,
    pickup_frequency VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    next_billing_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id),
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    payment_method VARCHAR(50) DEFAULT 'UPI / Razorpay Demo',
    reference VARCHAR(255) DEFAULT 'PAY-AGROLOOP-DEMO',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. IMPACT EVENTS
CREATE TABLE IF NOT EXISTS public.impact_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100) NOT NULL CHECK (event_type IN ('pickup_completed', 'batch_produced', 'farmer_applied', 'carbon_offset')),
    waste_kg NUMERIC(10, 2) DEFAULT 0,
    co2e_kg NUMERIC(10, 2) DEFAULT 0,
    farmer_savings NUMERIC(10, 2) DEFAULT 0,
    farmer_id UUID REFERENCES public.profiles(id),
    customer_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. REWARD TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.reward_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    points INT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. CERTIFICATES
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    certificate_type VARCHAR(100) DEFAULT 'Monthly Waste Diversion',
    period VARCHAR(50) NOT NULL,
    waste_diverted_kg NUMERIC(10, 2) NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    document_url TEXT
);

-- 21. SYSTEM SETTINGS
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processing_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (active = true);
