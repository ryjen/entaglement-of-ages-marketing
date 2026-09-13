# Public media delivery

The public site is deployed behind GitHub Pages and may be proxied by Cloudflare. Stable asset filenames are therefore not sufficient evidence that a browser is receiving the newest bytes.

## Contract

- `public-manifest.json` remains the authority for approved media paths and SHA-256 checksums.
- `mise run build` copies manifest-backed source into `dist/`, then rewrites every hero reference in built HTML to `?v=<first-12-hex-of-sha256>`.
- The rewrite applies to visible `<img>` references as well as Open Graph, Twitter, and JSON-LD URLs.
- Built `<img>` width and height attributes are rewritten to the raster's actual intrinsic dimensions.
- `mise run validate` fails if a built hero reference is unversioned, carries a stale fingerprint, or declares dimensions that disagree with the source raster.
- Source HTML may retain stable logical paths; only `dist/` is deployment authority.

This makes a media-byte change produce a different browser-visible URL automatically, without requiring a CSS change or a manual cache purge for the changed image path.

## Current limitation

The current hero masters are 1672×941 and the covers are 1024×1536. The homepage compatibility layer prevents the hero from being enlarged beyond native raster width. Issue #108 owns the move to true 4K hero masters, higher-resolution cover masters, responsive derivatives, and immutable fingerprinted filenames.
