ASSILO — Netlify + ZR Express integration starter

What's included:
- Existing ASSILO storefront and admin demo, preserved.
- Netlify Functions using the official community TypeScript SDK for the NEW ZR Express API.
- GET /.netlify/functions/zr-profile : securely tests API credentials.
- GET /.netlify/functions/zr-territories?level=wilaya|commune : retrieves territory records.

IMPORTANT DEPLOYMENT REQUIREMENT:
Netlify Drop static uploads do not build/deploy serverless functions. This package must be deployed through a Git-connected Netlify project or Netlify CLI. package.json installs the SDK and netlify.toml configures functions.

Netlify environment variables (already configured by store owner):
ZR_API_KEY
ZR_TENANT_ID

Keep these secrets private. Never place them in index.html/admin.html or send them to customers.

After deployment, test:
https://YOUR-SITE/.netlify/functions/zr-profile
https://YOUR-SITE/.netlify/functions/zr-territories?level=wilaya

This is the secure API connection foundation, not yet the completed order-to-parcel workflow. Parcel creation requires mapping the store's order fields to the tenant's real customer/product/territory IDs and confirming delivery options. Do not send live customer orders until this mapping is completed and tested.
