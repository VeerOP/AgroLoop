# AgroLoop Master Demo Walkthrough Script

Follow this step-by-step manual or automated walkthrough to demonstrate the complete circular loop between city waste collection and rural farm inputs in Mumbai.

---

### Step 1: Household Pickup Booking (`household@agroloop.demo`)
1. Open `/login` and select **Household (Priya Sharma)**.
2. Click **Schedule Waste Pickup**.
3. Select date, time window (`08:30 - 10:00 AM`), and estimated weight (`4.2 kg`).
4. Click **Confirm Pickup Booking**. Notice the pickup status enters `1. Scheduled`.

---

### Step 2: Logistics Collection (`collector@agroloop.demo`)
1. Open `/login` and select **Collector (Suresh Gaikwad)**.
2. View **Today's Collection Route**.
3. Locate Priya Sharma's pickup and click **Record Weight**.
4. Input `4.2 kg`, select `0% Contamination`, and click **Save & Complete Pickup**.
5. Observe the completed count increments.

---

### Step 3: Admin Operations & Processing Batch (`admin@agroloop.demo`)
1. Open `/login` and select **Ops Admin (Vikramaditya Deshmukh)**.
2. Observe total waste collected increases by 4.2 kg in the Command Center.
3. Navigate to **Batch Processing** (`/dashboard/admin/processing`).
4. Click **Create New Batch**, select `Vermicomposting`, input `600 kg`, and click **Start Processing Batch**.
5. Click **Advance to Completed** on the batch card.
6. Navigate to **Inventory Stock** (`/dashboard/admin/inventory`) and verify Vermicompost stock increases automatically!

---

### Step 4: Farmer Order Placement (`farmer@agroloop.demo`)
1. Open `/login` and select **Farmer (Ramkisan Patil)**.
2. Browse the **Organic Inputs Storefront**.
3. Click **Order Demo** on **AgroLoop Organic Vermicompost**, input `25 kg`, and confirm order.
4. Return to Admin Inventory and observe Vermicompost stock decreases by 25 kg!

---

### Step 5: AI Agronomist Consultation
1. On the Farmer Dashboard, click **Ask AI Agronomist**.
2. Select target crop `Tomato`, soil `Black Cotton Soil`, and question `"How should I apply vermicompost to my tomatoes?"`.
3. Click **Generate Structured Advice**.
4. Inspect the structured prescription (Recommended product, dosage, application timing, precautions, and mandatory educational disclaimer).

---

### Step 6: Verify Impact & Circular Operations View
1. Navigate to `/impact` and verify total waste diverted, CO₂e emissions avoided, and farmer cost savings.
2. Navigate to `/dashboard/admin/circular-flow` to review the end-to-end connected pipeline.
