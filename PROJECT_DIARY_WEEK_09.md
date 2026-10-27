# ICT2142 E-Business Systems
## Week 08 / Week 09: Testing & Bug Fixing (QA) – Project Diary & Test Report
**Project Name:** VehicleParadise – Sri Lanka's Modern Vehicle Marketplace  
**Module:** ICT2142 E-Business Systems  
**Academic Year:** 2025/2026  
**Document Type:** QA Testing Log, Bug Fixing Diary & Deliverables Report  

---

## 1. Executive Summary & Week 09 Deliverables Checklist

This report documents the Quality Assurance (QA) testing, scenario validation, responsive layout auditing, and bug fixes implemented for the **VehicleParadise** marketplace web platform in accordance with the **Week 08 & Week 09: Testing & Bug Fixing (QA)** curriculum.

| Deliverable | Status | Verification Summary |
| :--- | :---: | :--- |
| **1. Usability Verified** |  **PASSED** | Storefront navigation is smooth, all dead links eliminated, bold labels on top (≥ 16px), input heights (≥ 48px), and real-time visual validation with friendly alerts. |
| **2. Mobile Responsive Patches** |  **PASSED** | Zero horizontal/sideways scrolling on mobile viewports (375px+ tested on iPhone SE & iPhone 12). Touch targets and buttons meet the finger-friendly standard (≥ 44px). |
| **3. Cart & Checkout Tested** |  **PASSED** | Cart item counter updates immediately, cart persists across hard refreshes via `localStorage`, quantity math accurately calculates $\text{Price} \times \text{Quantity}$ without NaN, zero/negatives disallowed, and PayHere submit receives exact total with `.toFixed(2)`. |
| **4. Project Diary Entry** |  **PASSED** | Comprehensive bug log table completed with root cause analyses, code solutions, test evidence, and DevTools verification instructions. |

---

## 2. Bug Log Table (Project Diary Record)

As required by **Slide 10** (*"How to Record Bugs in Your Project Diary"*), the table below records every critical defect identified, diagnosed, and resolved during this QA cycle.

| # | Bug Title | Where It Happened | Root Cause | How You Fixed It |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Cart total showed `NaN`** | `CartPage.jsx` & Cart Summary | Quantity input was treated as text string, or empty/alphanumeric inputs caused arithmetic operations to yield `NaN`. | Sanitized quantity input with `parseInt(val, 10)` and wrapped vehicle prices in `parseFloat(price) \|\| 0`. Implemented fallback to 1 if input is invalid or non-numeric. |
| **2** | **Cart empties on refresh** | Storefront Navigation & `App.jsx` | Cart state was maintained strictly in memory (`useState([])`) without web storage persistence; on page reload or hard refresh (Ctrl + F5), all cart items were lost. | Persisted cart and favorites in `localStorage` (`vp_cart` & `vp_favorites`), loading from storage on initialization and syncing via `useEffect` hook. |
| **3** | **Zero & negative quantities allowed** | `CartPage.jsx` Quantity Stepper | Quantity input field lacked floor validation, allowing users to decrement to `0` or input negative values like `-5`. | Applied strict clamping `Math.max(1, parseInt(val, 10) \|\| 1)` on change and disabled the decrement button when quantity equals 1. |
| **4** | **PayHere amount error & decimal mismatch** | `BookingCheckoutPage.jsx` PayHere Gateway | Amount passed to PayHere and MD5 tamper-proof hash generation lacked two decimal places required by PayHere API standards. | Applied `Number(calculatedAmount).toFixed(2)` in JavaScript before hashing and injecting into the PayHere form submission payload. |
| **5** | **Undefined `isSaved` reference in vehicle cards** | `VehicleListingPage.jsx` (Line 298) | Vehicle listing cards attempted to read an undeclared local variable `isSaved`, preventing favorite status from displaying correctly. | Replaced with `Array.isArray(favorites) && favorites.includes(v.id)` and added a quick "Add to Cart" button for rapid user shopping. |
| **6** | **Checkout form inputs non-compliant with usability standards** | `BookingCheckoutPage.jsx` | Form inputs had insufficient height (< 40px), small text labels, and lacked real-time visual feedback, relying only on browser default validations. | Redesigned form according to Slide 5 standards: bold labels on top (≥ 16px), input height (≥ 48px), instant green checkmarks (`CheckCircle2`) as user types, and friendly helper alerts. |
| **7** | **Mobile viewport horizontal scroll bleed** | Mobile Phone View (375px – 414px) | Images and container widths could overflow viewport boundaries on smaller smartphone screens (iPhone SE / 12). | Added `html, body { overflow-x: hidden; max-width: 100vw; }` and `img, video { max-width: 100%; height: auto; }` in `index.css`, and ensured all buttons have `min-h-[44px]`. |

---

## 3. Detailed QA Task Walkthrough

### Task 1: Usability Testing (Is it Easy to Use?)
*Target: Slide 4 & Slide 5*

1. **Fast Navigation & No Dead Links:**
   - Every navigation item in the Navbar (`Browse`, `Sell`, `Dealers`, `Compare`, `Finance`, `Favorites`, `Cart`, `Profile`) has an active route handler in `App.jsx`.
   - The Footer links (`Browse vehicles`, `Sell a vehicle`, `Compare`, `Contact us`, `Finance calculator`) connect directly to their corresponding views with zero 404 errors or blank screens.
   - Searching and category filtering (Cars, SUVs, Vans, Motorcycles, Electric, Commercial) filter the catalog in real-time.

2. **Form Standards Compliance (Slide 5 Checklist):**
   - **Keep labels on top:** Field labels (`First Name`, `Last Name`, `Email Address`, `Phone Number`, `City`, `Delivery Address`, `Preferred Date`) are positioned strictly above input boxes.
   - **Make them bold:** All field labels utilize `text-base font-bold text-slate-800 dark:text-slate-100`.
   - **Label size:** Meets and exceeds the required standard ($\ge 16\text{px}$).
   - **Input Height:** Configured with `h-12 min-h-[48px] px-4 rounded-xl` satisfying the $48\text{px}$ touch-target standard.
   - **Do not use placeholders as labels:** Placeholders serve solely as sample guidance (e.g. `e.g. 077 123 4567`, `No. 45, Galle Road, Colombo 03`).
   - **Instant visual validation:** As the shopper types, correct fields immediately render a green `CheckCircle2` icon. Invalid inputs highlight with a soft red outline and display clear helper text (e.g. *"Please enter a valid 10-digit phone number (e.g., 077 123 4567)"*).

---

### Task 2: Mobile Responsive Testing (Phone View)
*Target: Slide 6 & Slide 7*

1. **Test Environment:**
   - Chrome / Edge DevTools Device Mode (`Ctrl + Shift + M`).
   - Tested Viewports: **iPhone SE (375px $\times$ 667px)** and **iPhone 12 / 14 Pro (390px $\times$ 844px)**.
2. **Results:**
   - **No Sideways Scrolling:** Container padding and grid configurations (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-...`) ensure elements fit within `375px` without horizontal scrollbars.
   - **Finger-Friendly Buttons:** All critical buttons (Cart buttons, Checkout submit, Navbar toggle, category pills) have minimum heights of $44\text{px}$ to $48\text{px}$.
   - **Collapsible Menus:** The mobile hamburger drawer expands smoothly with clean spacing and closes automatically upon route navigation.

---

### Task 3: Cart & Checkout Scenario Testing
*Target: Slide 8 & Slide 9*

1. **Add / Remove:**
   - Clicking **"Add to Cart"** from either the Vehicle Listing card or Vehicle Details view immediately increments the Navbar cart badge in real-time.
   - Removing an item via the trash icon immediately updates the item count and recalculates the subtotal.
2. **Math Accuracy:**
   - Line Total formula: $\text{Line Total} = \text{Price} \times \text{Quantity}$
   - Subtotal formula: $\text{Subtotal} = \sum (\text{Price}_i \times \text{Quantity}_i)$
   - Order Total formula: $\text{Total} = \text{Subtotal} + \text{Reservation Fee (Rs. 25,000)}$
   - All calculations use `parseFloat()` and `parseInt()`, preventing `NaN`.
3. **Zero & Negatives Prevention:**
   - Decrementing past 1 is disallowed (`disabled={qty <= 1}`).
   - Manually entering `0` or negative values like `-3` automatically clamps to `1`.
4. **PayHere Submit:**
   - The hidden PayHere checkout form dynamically receives the exact calculated deposit amount formatted as `Number(amount).toFixed(2)` (e.g., `25000.00`).
   - The MD5 signature hash matches PayHere's formula:
     $$\text{hash} = \text{MD5}(\text{merchant\_id} + \text{order\_id} + \text{amount.toFixed(2)} + \text{currency} + \text{MD5}(\text{merchant\_secret}))$$

---

## 4. How to Test and Capture Screenshots on Your Laptop

Follow these 3 steps to demonstrate evidence during your lab evaluation:

1. **Step 1: Open Localhost in Browser**
   - Frontend is running at: [http://localhost:3000/](http://localhost:3000/)
   - Backend API is running at: [http://localhost:5000/](http://localhost:5000/)
2. **Step 2: Inspect in DevTools & Mobile Mode**
   - Press **F12** (or Right-Click $\rightarrow$ **Inspect**).
   - Press **Ctrl + Shift + M** to toggle device toolbar.
   - Select **iPhone SE** or **iPhone 12 Pro** from the top dropdown.
   - Check that there is **zero horizontal scroll bar**.
3. **Step 3: Test Cart Persistence & Math**
   - Add a vehicle to the cart $\rightarrow$ Note that the Navbar badge increments to `1`.
   - Go to Cart $\rightarrow$ Increment quantity to `2`. Confirm item subtotal doubles accurately.
   - Press **Ctrl + F5** (Hard Refresh). Confirm the cart retains all items!
   - Proceed to Checkout $\rightarrow$ Type valid name, email, and phone. Observe the **instant green checkmarks**.
   - Check that the total displays formatted as `Rs. 50,000.00` ready for PayHere.

---

## 5. Summary of Modified Project Code

The following core files were modified and verified:

1. `frontend/src/App.jsx` — Implemented persistent `localStorage` cart & favorites state, quantity updater, and checkout data pipeline.
2. `frontend/src/components/Navbar.jsx` — Updated real-time cart badge counter (`cartCount`), added responsive logo container, and touch-target sizing.
3. `frontend/src/components/CartPage.jsx` — Overhauled quantity controls with NaN prevention, math accuracy, negative quantity blocking, and responsive summary card.
4. `frontend/src/components/BookingCheckoutPage.jsx` — Added bold labels (≥ 16px), input height (≥ 48px), instant visual validation checkmarks, friendly alerts, and PayHere `.toFixed(2)` calculation.
5. `frontend/src/components/VehicleListingPage.jsx` — Fixed undefined `isSaved` variable and integrated quick "Add to Cart" button.
6. `frontend/src/components/VehicleDetailsPage.jsx` — Disentangled "Save Favorite" and "Add to Cart", added active `isInCart` visual feedback.
7. `frontend/src/index.css` — Added global viewport overflow rules (`overflow-x: hidden`) and image responsiveness.
