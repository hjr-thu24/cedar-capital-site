# Cedar Capital LLC Website Deployment

Domain: cedarcapitalconsulting.com

## Current Status

The website has been published to GitHub:

```text
https://github.com/hjr-thu24/cedar-capital-site
```

GitHub Pages is configured from the `main` branch and the custom domain is set to:

```text
cedarcapitalconsulting.com
```

Domain registration and DNS setup were completed on June 30, 2026.

Working site:

```text
http://cedarcapitalconsulting.com/
```

HTTPS is pending GitHub's certificate issuance. After the certificate is available, enable `Enforce HTTPS` in GitHub Pages settings.

## Completed Namecheap DNS Records

```text
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: hjr-thu24.github.io
```

## Original Setup Notes

### Step 1: Register the Domain Name

Register:

```text
cedarcapitalconsulting.com
```

WHOIS check on June 30, 2026 showed no existing registration for this domain, but final availability must be confirmed at checkout.

Recommended registrars:

- Cloudflare Registrar
- Namecheap
- GoDaddy
- Squarespace Domains

### Step 2: Add DNS Records

At the registrar where the domain is purchased, add these DNS records:

```text
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: AAAA
Name: @
Value: 2606:50c0:8000::153

Type: AAAA
Name: @
Value: 2606:50c0:8001::153

Type: AAAA
Name: @
Value: 2606:50c0:8002::153

Type: AAAA
Name: @
Value: 2606:50c0:8003::153

Type: CNAME
Name: www
Value: hjr-thu24.github.io
```

Remove any default parked-domain A records that the registrar creates automatically.

### Step 3: Enable HTTPS

After DNS propagates, open:

```text
https://github.com/hjr-thu24/cedar-capital-site/settings/pages
```

Then enable `Enforce HTTPS`.

DNS can take several minutes to 24 hours to propagate.
