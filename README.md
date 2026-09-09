# Entanglement of Ages — Public Site

Public, reader-facing repository for the **Entanglement of Ages** book series.

Canonical repository: `ryjen/entaglement-of-ages-marketing`.

The public series currently covers:

1. **Book I — The Fatherless: Age of Embers**
2. **Book II — The Fatherless**
3. **Book III — The Fatherless II: Neurion**
4. **Book IV — The Age of Forms**

This repository contains only material intentionally approved for public release. Canonical manuscripts, drafts, story foundations, editorial notes, private publishing records, and unreleased creative assets do not belong here.

## Repository boundary

- Public website source, approved excerpts, approved artwork, press material, release information, and deployment configuration live here.
- Private authoring and canon development remain outside this repository in `ryjen/entaglement-of-ages`.
- This repository must build and deploy without access to any private repository, private token, or cross-repository secret.
- Public history must remain clean: do not mirror, subtree, or transplant private Git history.
- The public repository remains an independently reviewed derivative of the private series workspace; there is no automatic private-to-public synchronization.

## Stable book routes

Reader-facing routes use title-based identities rather than relative `prequel` / `sequel` terminology:

- `/books/age-of-embers/`
- `/books/the-fatherless/`
- `/books/neurion/`
- `/books/age-of-forms/`

Legacy public paths may remain temporarily for compatibility, but new links and metadata should use the stable routes.

## Design reference

The landing-page composition target is preserved in [`docs/site-concept-reference.md`](docs/site-concept-reference.md). The shared visual contract is documented in [`docs/visual-system.md`](docs/visual-system.md). Book II's public-safe **Institutional Eclipse** direction is documented in [`docs/original-visual-direction.md`](docs/original-visual-direction.md).

Some filenames and CSS identifiers still contain `trilogy`, `prequel`, `original`, or `sequel`. During this migration these are implementation compatibility names, not current series terminology. Rename them only as a separate validated tooling/asset migration.

## Development

The site is static HTML/CSS with a manifest-authoritative publication boundary. **JavaScript is the only custom scripting language.**

- **mise** is the local/CI task front door.
- **Node 24** runs publication, build, performance, deployment-diagnostic, and contract logic.
- **Sharp** owns responsive raster generation.
- **Playwright** owns browser smoke tests.
- `tools/site.mjs` is the single project-tool command surface.

Run the complete local validation path:

```sh
mise run check
```

Useful narrower tasks:

```sh
mise run source
mise run contracts
mise run build
mise run validate
mise run browser
```

Generated output is written to `dist/` and must be reproducible from committed public source files. See [`docs/visual-system.md`](docs/visual-system.md) for visual, accessibility, media, cache, and performance conventions.

## Deployment

CI validates every pull request and push to `main`. Successful `main` runs upload the validated `dist/` artifact and deploy it through GitHub Pages using GitHub Actions as the only publishing source. The production custom domain is then probed through Cloudflare for origin identity, current assets, HTTPS, and edge behavior.

Pages must remain configured as **Settings → Pages → Source: GitHub Actions**. Do not switch to branch publishing; that bypasses the validated `dist/` artifact. Cutover, verification, cache, and rollback procedures are documented in [`docs/deployment.md`](docs/deployment.md).

## Rights

Repository code is covered by `LICENSE`. Story text, excerpts, artwork, logos, names, and other creative assets are governed separately by `RIGHTS.md` unless an individual asset states otherwise.
