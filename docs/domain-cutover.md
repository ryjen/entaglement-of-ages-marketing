# Domain Cutover — Entanglement of Ages

## Current canonical public domain

The current public-domain target for **Entanglement of Ages** is:

- `https://eoa.ryanjennin.gs/`

This replaces the older Fatherless-specific hostname as the series-level public identity.

## Future canonical domain

The intended later production-domain migration is:

- `https://entaglementofages.com/`

Treat that as a future cutover, not an alias that should be introduced into current canonical metadata before DNS, TLS, redirects, analytics, sitemap, and deployment checks are ready.

## Cutover rules

When moving from `eoa.ryanjennin.gs` to `entaglementofages.com`:

1. provision DNS and TLS first;
2. update GitHub Pages/custom-domain configuration;
3. update canonical URLs, sitemap and any absolute public links;
4. preserve redirects from `eoa.ryanjennin.gs`;
5. verify Cloudflare/GitHub Pages origin identity and HTTPS;
6. update repository homepage metadata and external profiles;
7. retain redirects long enough that existing public links and search indexing remain valid.

The content repository remains independent of the private authoring repository throughout either domain transition.
