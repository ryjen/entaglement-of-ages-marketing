# Public media delivery

The public site is deployed behind GitHub Pages and may be proxied by Cloudflare. Stable asset filenames are therefore not sufficient evidence that a browser is receiving the newest bytes.

## Contract

- `public-manifest.json` remains the authority for approved media paths and SHA-256 checksums.
- `mise run build` first creates an exact manifest-backed `dist/` artifact.
- `mise run validate`, HTML validation, and CSS validation run against that exact artifact.
- The final `package` stage then emits a hero copy named `<stem>.<first-12-hex-of-sha256>.webp` and rewrites every built hero reference to that immutable filename.
- The rewrite applies to visible `<img>` references as well as Open Graph, Twitter, and JSON-LD URLs.
- Built `<img>` width and height attributes are rewritten to the raster's actual intrinsic dimensions.
- Final packaging fails if a hero reference is bare, carries a stale fingerprint, points at missing/different bytes, or declares dimensions that disagree with the source raster.
- Chromium smoke runs against the packaged artifact that is subsequently uploaded to Pages.
- Source HTML may retain stable logical paths; only packaged `dist/` is deployment authority.

A media-byte change therefore produces a different browser-visible filename automatically. This does not depend on CSS freshness, query-string cache-key behavior, or a manual purge for the changed image URL.

## Current limitation

The current hero masters are 1672×941 and the covers are 1024×1536. The homepage compatibility layer prevents the hero from being enlarged beyond native raster width. Issue #108 still owns the move to true 4K hero masters, higher-resolution cover masters, and responsive derivatives; immutable hero filenames are delivered by this contract.
