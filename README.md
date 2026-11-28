# MealMate

MealMate is a React/Vite meal-planning and food-organization app. It supports Supabase email/password accounts and cloud workspace sync when configured; without Supabase settings, it runs as a local-only app. Payments, donations, and ads remain disabled during beta.

Run `npm install`, `npm run dev`, `npm run lint`, `npm run test:nutrition`, and `npm run build` from the repository root. See [LAUNCH.md](LAUNCH.md) for deployment steps and launch prerequisites.

## Supabase authentication and cloud sync

Configure these Vite environment variables locally in `.env.local` and in Vercel's project environment settings:

- `VITE_SUPABASE_URL`
- Either `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY`

`VITE_SUPABASE_URL` must be the project base URL (for example, `https://<project-ref>.supabase.co`), not an `/auth/v1` or `/rest/v1` endpoint. With a valid URL and public anon/publishable key, sign-in and registration are available. Apply `supabase_schema.sql` in the Supabase SQL Editor, apply the migrations, and configure email confirmation and allowed redirect URLs. The workspace policies restrict reads and writes to the authenticated owner, and authenticated browser clients cannot update the workspace plan column. Never put a Supabase service-role key or Razorpay secret in a frontend `VITE_` variable.

Without these values, Login/Register still opens and explains the missing configuration; workspace data remains in browser storage.

## Payments and donations during beta

Subscription checkout and donation UI are disabled in the application during beta. Setting an environment variable does not enable them. Keep Razorpay secrets server-side; any future payment release requires reviewed server-side order creation, signature verification, and payment/legal testing.

## Enabling secure Pro subscriptions

Pro access is read from the server-side `pro_subscriptions` records; browser storage and client payment callbacks do not grant entitlements. To enable checkout:

1. Apply the Supabase migrations with `supabase db push`.
2. Set the Edge Function secrets `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` with `supabase secrets set RAZORPAY_KEY_ID=<key-id> RAZORPAY_KEY_SECRET=<key-secret>`. Keep the Razorpay secret and Supabase service-role key out of frontend variables.
3. Deploy the function with `supabase functions deploy subscriptions`.
4. Configure the frontend with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Authentication remains available during beta; payments remain disabled in the application until separately reviewed.

The function creates orders at server-defined prices and verifies the Razorpay signature and captured payment before activating Pro. The current beta UI remains hard-disabled; future activation requires an explicit reviewed code change in addition to the server setup described above.

## Smart Nutrition Calculator

The calculator estimates adult basal metabolic rate with the Mifflin–St Jeor equation and estimated maintenance calories by multiplying BMR by an activity factor (1.20–1.90). Optional goal estimates use maintenance, −10% for fat loss, +5% for muscle building, or +10% for bulking. Adult protein references use 0.8, 1.2, 1.4, or 1.6 g/kg/day according to the selected factor and profile. These are estimates, not medical advice; users explicitly choose whether to use a result as a food-log reference.

People under 18 are not shown adult calorie or sports-protein targets. Pregnancy, breastfeeding, or a relevant medical condition also suppresses generic targets and recommends individualized professional guidance. Food logging remains available without targets.

Recipe calculations use edible ingredient grams and divide the ingredient totals by recipe servings. The built-in, source-linked records in `src/constants/foodCompositionData.js` are from USDA FoodData Central, SR Legacy; raw and cooked records must not be interchanged. Foods outside this small local dataset can be entered from a label or as a clearly user-entered estimate. No external nutrition API is currently configured, and user-entered values are not independently verified. Unknown food calories or protein remain blank and are excluded from the respective totals rather than being fabricated. Recipe suggestions require an explicit user-verified dietary tag when a dietary preference is selected and can favor ingredients already on the grocery list; the user should still inspect every recipe. Planned meals are excluded from intake until marked eaten; duplicate recipe logs for a meal are prevented.

Run the calculator formula and safety tests with `npm.cmd run test:nutrition`, the app checks with `npm.cmd run lint`, and the production build with `npm.cmd run build`. Start the local site with `npm.cmd run dev`, then open the URL printed by Vite and choose **Smart Nutrition Calculator** from the app navigation.

See [LAUNCH.md](LAUNCH.md) for the Vercel deployment checklist, current production prerequisites, and legal/consumer-launch review checklist.
