# AGROLOOP — Database Schema & Data Models
**Vertical**: Entrepreneurship | **Component**: Supabase PostgreSQL Schema Specification  
**Project**: AgroLoop (Circular Bio-Economy Platform)  
**Author**: Veer Nagda (B.Tech Computer Engineering) | **Mentor**: Prof. Deepali A. Maste  

---

## 1. Relational Database Schema Overview

AgroLoop uses a PostgreSQL database hosted on Supabase, secured with Row Level Security (RLS) policies.

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      users       │       │     pickups      │       │processing_batches│
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK, UUID)    │1     *│ id (PK, UUID)    │1     *│ id (PK, UUID)    │
│ email (Text)     ├───────┤ user_id (FK)     ├───────┤ batch_code (Text)│
│ role (Enum)      │       │ collector_id (FK)│       │ process_type(Enum│
│ name (Text)      │       │ weight_kg (Float)│       │ start_date (Date)│
│ address (Text)   │       │ contam_pct (Int) │       │ end_date (Date)  │
│ ward (Text)      │       │ status (Enum)    │       │ status (Enum)    │
│ green_points(Int)│       │ scheduled_at (TS)│       │ yield_kg (Float) │
└────────┬─────────┘       └──────────────────┘       └────────┬─────────┘
         │                                                     │
         │1                                                    │1
         │                                                     │
         │*                                                    │*
┌────────┴─────────┐       ┌──────────────────┐       ┌────────┴─────────┐
│      orders      │       │   order_items    │       │    inventory     │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK, UUID)    │1     *│ id (PK, UUID)    │*     1│ id (PK, UUID)    │
│ farmer_id (FK)   ├───────┤ order_id (FK)    ├───────┤ product_name(Text│
│ total_amount(Num)│       │ product_id (FK)  │       │ category (Text)  │
│ status (Enum)    │       │ quantity (Int)   │       │ price_per_unit   │
│ delivery_addr    │       │ unit_price (Num) │       │ stock_quantity   │
└──────────────────┘       └──────────────────┘       └──────────────────┘
```

---

## 2. Table Definitions & Constraints

### 1. `users`
- `id` (UUID, Primary Key)
- `email` (TEXT, Unique, Not Null)
- `role` (TEXT, CHECK role IN ('household', 'restaurant', 'collector', 'farmer', 'admin'))
- `name` (TEXT, Not Null)
- `phone` (TEXT)
- `ward` (TEXT, e.g., 'Ward H/West - Bandra')
- `green_points` (INTEGER, Default 0)
- `created_at` (TIMESTAMP WITH TIME ZONE, Default now())

### 2. `pickups`
- `id` (UUID, Primary Key)
- `user_id` (UUID, References `users(id)`)
- `collector_id` (UUID, References `users(id)`)
- `weight_kg` (NUMERIC(6,2))
- `contamination_pct` (INTEGER, CHECK contamination_pct BETWEEN 0 AND 100)
- `status` (TEXT, CHECK status IN ('scheduled', 'in_transit', 'completed', 'rejected'))
- `scheduled_date` (DATE)
- `notes` (TEXT)

### 3. `processing_batches`
- `id` (UUID, Primary Key)
- `batch_code` (TEXT, Unique, e.g., 'BAT-2026-088')
- `process_type` (TEXT, CHECK process_type IN ('bokashi', 'vermicompost', 'biochar', 'liquid'))
- `input_weight_kg` (NUMERIC(8,2))
- `output_weight_kg` (NUMERIC(8,2))
- `status` (TEXT, CHECK status IN ('fermenting', 'curing', 'tested', 'packaged'))
- `npk_ratio` (TEXT, e.g., '1.8-1.2-1.5')

### 4. `inventory`
- `id` (UUID, Primary Key)
- `product_code` (TEXT, Unique)
- `name` (TEXT, Not Null)
- `category` (TEXT)
- `unit` (TEXT, e.g., '50kg bag', '25kg bag', '5L carboy')
- `price_inr` (NUMERIC(8,2))
- `stock_level` (INTEGER)

### 5. `orders` & `order_items`
- Tracks smallholder farmer purchases, delivery statuses, payment confirmations, and automated stock decrements.

---

## 3. Row Level Security (RLS) Implementation
All tables have RLS enabled:
- **Households / Restaurants**: Can only select and insert their own pickups and view their own compliance certificates.
- **Collectors**: Can update pickups assigned to their route.
- **Farmers**: Can select catalog products and manage their own orders.
- **Admins**: Full read/write access across all tables.
