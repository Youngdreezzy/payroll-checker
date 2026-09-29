# Payroll checker

Workers enter their account number at `/`; you upload each month's Excel file at `/admin.html`.

## Deploy (free)
1. Push this folder to a GitHub repo and import it on vercel.com (Framework: Other, Output directory: `public`).
2. In the Vercel project: Storage / Marketplace -> add **Upstash Redis** (free plan) and connect it to the project.
3. Project Settings -> Environment Variables -> add `ADMIN_PASSWORD` (your own strong password).
4. Redeploy. Open `/admin.html` to upload a month.

## Excel format
Headers may sit on any row, in any order: NAMES, DESIGNATION, BANK NAME, A/C N0, Arrears, Monthly Pay,
Working Day, Present @ Work, Absent, Amount Payable, PAYE, Fine, Monday Meeting, Absent, Lateness, Debt, Net Pay.
The first "Absent" is days absent; the second is the deduction.
