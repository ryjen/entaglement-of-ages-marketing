# Domain Migration Checklist

## Current cutover: `eoa.ryanjennin.gs`

- DNS: point `eoa.ryanjennin.gs` at the validated GitHub Pages deployment.
- GitHub Pages: set the custom domain to `eoa.ryanjennin.gs` and require HTTPS.
- Deployment verification: confirm the Pages artifact is current, the custom-domain edge resolves to it, and HTTPS succeeds.
- Public metadata: new absolute links and external profiles should prefer `https://eoa.ryanjennin.gs/`.
- Legacy: preserve the older Fatherless hostname as a redirect where practical rather than allowing existing links to fail.

## Later cutover: `entaglementofages.com`

Repeat the same sequence only after DNS/TLS and redirects are ready. The `.com` should then replace the `eoa.ryanjennin.gs` hostname as canonical while keeping the subdomain as a redirect.
