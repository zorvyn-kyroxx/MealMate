# MealMate public launch checklist

This guide is operational guidance, not legal advice. Laws depend on the operator's location, the countries served, the audience's age, and which account/payment features are enabled. Have a qualified lawyer and tax professional review the launch for those jurisdictions.

## Current launch status

- A public Vercel deployment exists at <https://meal-mate-myrn.vercel.app/>.
- The initial intended launch country is India. Operator name and public support/grievance contact details remain intentionally unfilled.
- The deployed site was compared with this worktree on 2026-11-27 and is behind it: the live dashboard counts unconsumed planned meals as calories, live recipes show unsupported calorie values without protein, and the landing page includes unsupported social-proof and cloud-sync claims. This worktree contains corrections and default-off account/payment/advertising gates, but its changes have not been pushed or deployed.
- A live HTTP-header check found HSTS, but did not find Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, or Permissions-Policy. This worktree's `vercel.json` configures those headers; confirm they appear on the next production deployment.
- The live recipe page had 21 broken images among 105 image elements during browser inspection; failures were concentrated in two repeated Unsplash URLs. The updated local recipe set loaded all 115 image elements during its browser check.
- The app can run as a local-storage-only beta or use Supabase email/password accounts and cloud sync when valid public Supabase configuration is supplied. No custom domain was provided.
- The operator's country and intended launch countries were not provided, so the legal checklist below remains general and needs jurisdiction-specific review.
- The GitHub repository is public.
- The Vite production build, lint, and nutrition-calculation tests run locally.
- No Vercel project/domain or Supabase project credentials are configured in this repository. A GitHub Actions CI workflow (`.github/workflows/ci.yml`) now runs lint, nutrition tests, and a production build on pushes and pull requests; it must run successfully on GitHub after these changes are pushed.
- The app can be hosted as a static site without Supabase. In that mode, workspace data stays in the user's browser; sign-in and cloud sync become available when `VITE_SUPABASE_URL` and a public anon/publishable key are configured. Subscriptions and donations remain disabled during beta. No ad or analytics SDK is included. Recipe images and Google Fonts still make third-party browser requests.
- The legal center is explicitly a draft and must not be presented as legal approval.

## Deploy a free static beta on Vercel

1. Push the reviewed release branch to GitHub. Do not deploy the current feature branch until its changes have been reviewed and merged into the intended release branch.
2. Sign in to Vercel, choose **Add New → Project**, and import `zorvyn-kyroxx/MealMate`.
3. Use the repository root as the project root, choose the Vite preset, set the build command to `npm run build`, and the output directory to `dist`. The repository's `vercel.json` supplies the SPA rewrite and response security headers.
4. For a local-only beta, deploy without Supabase environment variables. If account access is needed, configure `VITE_SUPABASE_URL` and either `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel, then redeploy. Confirm the deployment works on its Vercel HTTPS URL before adding a custom domain.
5. Add the custom domain in Vercel, follow its DNS instructions at the domain registrar, and wait for Vercel to issue TLS. Test the HTTPS site, security headers, mobile layout, and browser storage after DNS is active.
6. To enable accounts, create a Supabase production project, apply the migrations in `supabase/migrations`, configure Auth email/redirect settings for the final HTTPS domain, and add `VITE_SUPABASE_URL` and either `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel's environment settings. Account access and registration are enabled by valid Supabase configuration; there are no separate account feature flags. These frontend keys are public identifiers; never add a service-role key or Razorpay secret as a `VITE_` variable.
7. Keep payments and donations disabled during beta. Future payment activation requires a deliberate reviewed code change, server-side Supabase Edge Functions, and completion of operator, consumer disclosure, tax/payment, support, cancellation, refund, and provider onboarding requirements. Keep `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` only as server-side Supabase secrets. Test with Razorpay test credentials before any future release. `supabase/config.toml` deliberately leaves the donation function's gateway JWT check off because donations are public; the function itself verifies each payment server-side. Subscription JWT verification remains enabled.
8. Configure Supabase Auth's allowed redirect URLs for the exact production domain; test sign-up, email confirmation, sign-in, sign-out, workspace isolation, and sync failure. Account recovery and in-app account deletion are not currently implemented; add and test those flows before inviting account users or promising them in legal notices.
9. Keep production and preview environments separate. Do not put live Razorpay keys in preview builds. Check Vercel and Supabase logs/alerts and ensure no personal data, passwords, access tokens, or payment secrets are written to client-visible logs.

## Legal and consumer launch checklist

Before publicly inviting users or accepting money:

1. Identify the legal operator (person/entity), business address/contact, support email, and the countries where the service will be offered. Register the business and obtain any local tax/business registrations that apply; ask local counsel/accounting support to confirm.
2. Replace the legal-center drafts with reviewed Terms of Service and a Privacy Notice that accurately identify the operator, purposes, data categories, retention/deletion, processors and international transfers, user rights and how to exercise them, security contact, governing law, and effective date. Do not claim compliance or security certifications you have not obtained.
3. Map what the app actually stores and sends. Explain browser local storage and its limits, optional Supabase account/workspace sync, hosting and payment processors, any analytics/cookies, and how users can export, correct, or delete their data. Implement a working contact/request and account-deletion process before promising those rights in a notice.
4. Because MealMate collects food and nutrition information and may be used by teenagers, get jurisdiction-specific advice on privacy, sensitive/health-related data, age limits/parental consent, and marketing. Keep the calculator's safety notices visible; do not market its estimates as medical advice or treatment.
5. If selling subscriptions, show the full price, currency, billing interval, taxes/fees, renewal behavior, cancellation path, refund policy, and customer-support contact before checkout. Make the actual Razorpay product behavior match those disclosures and local consumer/payment rules. Do not enable payments until test transactions, receipts, refunds, and support escalation have been tested.
6. Confirm rights/licenses for the MealMate name/logo, recipe text, photographs, icons, fonts, and any third-party datasets. Keep required image/data attributions and comply with each asset's license. Do not imply recipes, nutrition values, or endorsements are independently verified when they are not.
7. Publish the privacy notice and terms as stable, directly accessible HTTPS pages, provide a working support contact, and make the disclosures easy to find before account creation or payment.
8. Keep a dated release record, incident-response contact/process, backup/export procedure, and a way to receive and respond to privacy, safety, and payment complaints.

For India, have Indian counsel review applicable privacy/data-protection, consumer-protection/e-commerce, advertising, tax/GST, and payment rules for the specific business model and audience. This list is a prompt for professional review, not a determination that a particular registration or rule applies.

The DPDP Act, 2023 commencement is provision-specific, and the 2025 Rules also contain phased commencement. Check the latest Gazette notifications and MeitY material immediately before launch; do not infer that all obligations began on enactment or on the Rules' publication date. The official MeitY Rules page is [Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDoxUjMtQWa). This checklist does not determine which obligations apply to MealMate on a particular date; obtain current Indian legal advice.

## Release checks

From the repository root, run:

```powershell
npm ci
npm.cmd run lint
npm.cmd run test:nutrition
npm.cmd run build
```

Then test the deployed HTTPS URL in a clean browser profile: landing page, navigation, recipe/meal/grocery/budget flows, data export/import, mobile sizing, and the disclosed unavailable/enabled state of accounts and payments.
