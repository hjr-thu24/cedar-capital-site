# Cedar Capital LLC Website Deployment

Domain: cedarcapitalconsulting.com

## Fastest Launch Option

Use Netlify for hosting and a domain registrar such as Cloudflare Registrar, Namecheap, GoDaddy, or Squarespace Domains for buying the domain.

## Step 1: Register the Domain

Register:

```text
cedarcapitalconsulting.com
```

WHOIS check on June 30, 2026 showed no existing registration for this domain, but final availability must be confirmed at checkout.

## Step 2: Deploy the Website on Netlify

1. Go to https://app.netlify.com/drop
2. Drag the whole `cedar-capital-site` folder into the upload area.
3. After upload, Netlify will create a temporary site URL.
4. Open Site configuration > Domain management.
5. Add custom domain: `cedarcapitalconsulting.com`

## Step 3: Add DNS Records

At the company where the domain is registered, add these records:

```text
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: cedarcapitalconsulting.com
```

If Netlify shows different DNS instructions for the site, use Netlify's displayed values.

## Step 4: Enable HTTPS

In Netlify, open Domain management > HTTPS and enable the free SSL certificate.

DNS can take several minutes to 48 hours to fully propagate, though it often works much faster.
