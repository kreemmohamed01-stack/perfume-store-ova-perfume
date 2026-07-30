# OVA External Admin Setup

This project now includes a first real admin foundation:

- `admin.html`
- `js/admin-dashboard.js`
- `netlify/functions/admin-login.js`
- `netlify/functions/admin-session.js`
- `netlify/functions/admin-logout.js`
- `netlify/functions/admin-products.js`
- `netlify/functions/catalog-products.js`
- `supabase/admin-foundation.sql`

## What this gives you now

- A cleaner external admin page for the perfume shop owner
- Login-protected catalog management
- Add / edit / delete perfumes from Supabase
- Live dashboard metrics using the existing site tracker
- A public catalog API ready for the storefront migration

## What is still next

The storefront still reads products from the current HTML/JS arrays.
That means:

- the new admin works
- the new catalog table works
- but the visible site will not fully switch to this table until we do the next migration step

That next step is to make homepage sections and product pages read from `catalog_products`.

## What you need to do now

### 1. Create the Supabase tables

Open your Supabase project and run the SQL file:

- [admin-foundation.sql](/c:/Users/admin/Desktop/ova.perfume/supabase/admin-foundation.sql)

Use the SQL editor in Supabase and paste the whole file.

### 2. Add Netlify environment variables

In Netlify site settings add:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Recommended:

- `ADMIN_EMAIL`: the client or your admin email
- `ADMIN_PASSWORD`: a strong password only for the admin panel
- `ADMIN_SESSION_SECRET`: a long random string, at least 32 characters

## Example `ADMIN_SESSION_SECRET`

Use a long random value like:

`ova-admin-2026-very-long-secret-change-this-now-4f9d2a7b`

Do not keep the example value.

### 3. Redeploy the site

After adding the env vars and running the SQL:

- redeploy the Netlify site

### 4. Open the admin panel

Visit:

- `/admin.html`

Then sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

### 5. Sync the current catalog

Inside the admin panel click:

- `Sync current site catalog`

This imports the current perfumes already inside your existing site into `catalog_products` so you do not need to add them manually one by one.

## Recommended workflow from now on

### Use code for:

- layout
- design
- animations
- special homepage behavior
- search behavior
- checkout logic

### Use admin panel for:

- adding perfumes
- deleting perfumes
- editing price
- changing best seller flag
- hiding products
- updating product images

## Important note

Right now this is the correct foundation, but not the final migration.
If you add a perfume in the admin panel today, it goes into Supabase successfully, but the public storefront still needs the next step to read from that table.

## Best next step after this

After you finish the setup above, the next workflow should be:

1. click `Sync current site catalog`
2. verify `index`, `all-perfume`, and brand pages are showing the remote catalog
3. start managing perfumes from the admin panel instead of editing every product manually in HTML
4. later move homepage banners and best seller settings into `site_settings`

## Files you should care about

- [admin.html](/c:/Users/admin/Desktop/ova.perfume/admin.html)
- [js/admin-dashboard.js](/c:/Users/admin/Desktop/ova.perfume/js/admin-dashboard.js)
- [admin-foundation.sql](/c:/Users/admin/Desktop/ova.perfume/supabase/admin-foundation.sql)
- [admin-products.js](/c:/Users/admin/Desktop/ova.perfume/netlify/functions/admin-products.js)
- [catalog-products.js](/c:/Users/admin/Desktop/ova.perfume/netlify/functions/catalog-products.js)
