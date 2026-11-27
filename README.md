# MealMate

MealMate is a React/Vite meal-planning and food-organization app. Its public beta is designed to run as a static site: workspace data stays in browser storage, while cloud accounts, registrations, payments, donations, and ads are disabled by default.

Run `npm install`, `npm run dev`, `npm run lint`, `npm run test:nutrition`, and `npm run build` from the repository root. See [LAUNCH.md](LAUNCH.md) for deployment steps and launch prerequisites.

## Beta feature gates

All gates are off unless explicitly set to the exact string `true`:

- `VITE_CLOUD_ACCOUNTS_ENABLED` enables configured Supabase account access and workspace sync.
- `VITE_ACCOUNT_CREATION_ENABLED` enables new registrations only when cloud accounts are also enabled.
- `VITE_PAYMENTS_ENABLED` enables subscription and donation UI flows.

Do not enable these flags until the applicable privacy, child-safety, legal, account-deletion, and provider requirements are implemented and reviewed. Never put Supabase service-role or Razorpay secret keys in frontend `VITE_` variables.

## Enabling donations

The pricing page can display the server-confirmed donation total and open a one-time Razorpay checkout. Keep payments disabled (`VITE_PAYMENTS_ENABLED=false`) until the backend, legal disclosures, refund/support process, and payment-provider review are complete:

1. Apply `supabase/migrations/202611270001_create_donations.sql` with `supabase db push`.
2. Set the Supabase Edge Function secrets `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` with `supabase secrets set RAZORPAY_KEY_ID=<key-id> RAZORPAY_KEY_SECRET=<key-secret>`.
3. Deploy the function with `supabase functions deploy donations`.
4. Configure the frontend with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Keep `VITE_PAYMENTS_ENABLED=false` until payment/legal review, then enable it only for the approved release.

Never put the Razorpay secret or Supabase service-role key in frontend environment variables. The donation counter includes only payments confirmed as captured by Razorpay and verified by the Edge Function.

## Enabling secure Pro subscriptions

Pro access is read from the server-side `pro_subscriptions` records; browser storage and client payment callbacks do not grant entitlements. To enable checkout:

1. Apply the Supabase migrations with `supabase db push`.
2. Set the Edge Function secrets `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` with `supabase secrets set RAZORPAY_KEY_ID=<key-id> RAZORPAY_KEY_SECRET=<key-secret>`. Keep the Razorpay secret and Supabase service-role key out of frontend variables.
3. Deploy the function with `supabase functions deploy subscriptions`.
4. Configure the frontend with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Keep cloud accounts disabled until reviewed; customers must have a verified Supabase Auth session to create an order or access Pro.

The function creates orders at server-defined prices and verifies the Razorpay signature and captured payment before activating Pro. The pricing UI remains fail-closed when Supabase or the subscription service is unavailable. Keep `VITE_PAYMENTS_ENABLED=false` until legal review, payment-provider setup, cancellation/refund support, and test transactions are complete; enable it only for the reviewed release.

## Smart Nutrition Calculator

The calculator estimates adult basal metabolic rate with the Mifflin–St Jeor equation and estimated maintenance calories by multiplying BMR by an activity factor (1.20–1.90). Optional goal estimates use maintenance, −10% for fat loss, +5% for muscle building, or +10% for bulking. Adult protein references use 0.8, 1.2, 1.4, or 1.6 g/kg/day according to the selected factor and profile. These are estimates, not medical advice; users explicitly choose whether to use a result as a food-log reference.

People under 18 are not shown adult calorie or sports-protein targets. Pregnancy, breastfeeding, or a relevant medical condition also suppresses generic targets and recommends individualized professional guidance. Food logging remains available without targets.

Recipe calculations use edible ingredient grams and divide the ingredient totals by recipe servings. The built-in, source-linked records in `src/constants/foodCompositionData.js` are from USDA FoodData Central, SR Legacy; raw and cooked records must not be interchanged. Foods outside this small local dataset can be entered from a label or as a clearly user-entered estimate. No external nutrition API is currently configured, and user-entered values are not independently verified. Unknown food calories or protein remain blank and are excluded from the respective totals rather than being fabricated. Recipe suggestions require an explicit user-verified dietary tag when a dietary preference is selected and can favor ingredients already on the grocery list; the user should still inspect every recipe. Planned meals are excluded from intake until marked eaten; duplicate recipe logs for a meal are prevented.

Run the calculator formula and safety tests with `npm.cmd run test:nutrition`, the app checks with `npm.cmd run lint`, and the production build with `npm.cmd run build`. Start the local site with `npm.cmd run dev`, then open the URL printed by Vite and choose **Smart Nutrition Calculator** from the app navigation.

See [LAUNCH.md](LAUNCH.md) for the Vercel deployment checklist, current production prerequisites, and legal/consumer-launch review checklist.
