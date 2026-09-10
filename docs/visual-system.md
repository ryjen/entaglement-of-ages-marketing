# Public visual system

This visual system is a public presentation layer. Mood guidance may reflect approved positioning, but styling must never encode, explain, or expose private plot, symbolic, editorial, or canon architecture.

## Foundations

The shared structural layer lives in `src/styles/base.v1.css`. Era-specific theme files inherit that structure without changing interaction patterns.

- **Age of Embers** — glacial, prehistoric, exposed, and migratory; polar-night surfaces, glacier and meltwater blues, red sky-fire as the primary dramatic accent, and ember orange used only as a secondary carried-light cue;
- **The Fatherless** — nocturnal, institutional, human, and politically tense; graphite and blue-black surfaces, cold stone text, oxidized teal accents, and restrained muted-wine atmospheric notes;
- **Neurion** — networked, plural, civic, and distributed; near-black indigo surfaces, signal cyan and blue, restrained violet variation, and limited warning tones for system stress;
- **The Age of Forms** — inherited, selective, comparative, and socially uneasy; advanced systems survive unevenly into a later civilization where visibility, ranking, reputation, desirability, and selection shape public life. A dedicated public palette is not yet locked; Book IV currently reuses shared/original site tokens as a provisional implementation and should not be treated as visually final.

The Fatherless must not default to sepia, parchment, brown-gold historical styling, devotional imagery, or familiar Biblical-poster composition. Its public visual tone should read as a contemporary prestige political drama photographed inside an ancient world rather than as religious illustration.

Age of Embers must not default to brown cave-museum styling, faux stone textures, or a generic shaman-at-fire identity. Its dominant impression is cold scale, dangerous sky, movement, and water, with fire retained as a small but consequential element.

Neurion must not default to neon cyberpunk, Matrix-like grids, glossy SaaS gradients, glowing robot faces, or a single luminous intelligence treated as the visual centre. Its dominant impression is many active centres sharing an unstable civic and technical environment.

The Age of Forms must not default to generic post-apocalypse, a medieval technological reset, floating reputation scores, social-media parody, or one conventionally attractive demographic presented as the objective human ideal. Its dominant impression is continuity without full context: sophisticated inherited capabilities operating inside a later social order built around selection and comparison.

The themes change atmosphere, not interaction patterns. Navigation, typography scale, spacing, controls, focus treatment, reading measure, and responsive behavior remain shared.

## Typography

Use resilient system stacks only until a public font license and performance case are approved.

- The Fatherless display/editorial headings may use the system sans stack to create a more contemporary, institutional voice;
- long-form prose remains readable through a resilient serif stack;
- navigation, controls, labels, and metadata use the system sans-serif stack;
- body copy: minimum 1rem with 1.65 line height;
- headings use `clamp()` rather than viewport-only sizing;
- prose measure targets 70 characters.

No page may require a custom font to remain readable or preserve layout.

## Palette and contrast

Theme tokens are declared as CSS custom properties. Normal text and interactive foreground/background combinations must meet WCAG AA. Hero copy is never placed directly on uncontrolled imagery: `.hero__panel` provides a high-opacity bounded surface with a solid-color fallback before enhancement.

The Fatherless palette should preserve separation from both neighboring eras:

- avoid Age of Embers' sky-fire red and glacial-blue balance;
- avoid Neurion's bright signal-cyan language;
- use oxidized teal as a restrained material color rather than a luminous technology cue;
- use muted wine only as secondary tension, never as a large red field;
- keep the primary impression graphite, cold stone, and controlled darkness.

The Age of Embers palette should remain cold-first:

- polar-night and deep-water surfaces carry most of the page;
- glacier/meltwater blue provides environmental depth;
- red sky-fire is the primary dramatic accent;
- ember orange is subordinate and should not turn the page brown.

The Neurion palette should remain distributed rather than monochrome-neon:

- near-black indigo and deep network blue carry most of the page;
- cyan and signal blue indicate active information/light;
- restrained violet introduces heterogeneous agency;
- warning rose/red is reserved for conflict or system stress, not ambient decoration.

The Age of Forms palette is intentionally unresolved until a dedicated Book IV visual-theme pass. Until then:

- preserve WCAG AA through the shared token system;
- do not infer a final Book IV palette from its temporary reuse of The Fatherless theme assets;
- avoid copying Neurion's bright signal language as though Book IV were a seamless continuation;
- avoid dust/brown ruin palettes that imply a complete technological collapse;
- treat any future dedicated theme as a versioned public styling change with the same fallback and cache-integrity constraints as the other books.

Translucency and `color-mix()` are enhancements only. The first declared background remains readable when those features are unavailable.

## Components

Shared primitives include:

- masthead and six-destination primary navigation;
- skip link;
- hero with bounded content surface;
- editorial section and asymmetric-ready grid;
- panels for short reader groupings;
- buttons and quiet actions;
- quotation treatment;
- theme marker;
- footer.

Cards may support navigation but must not become the only information structure.

## Accessibility baseline

- semantic `header`, `nav`, `main`, `section`, `article`, and `footer` landmarks;
- one primary heading per page;
- skip link targets `#main`;
- visible `:focus-visible` outline with theme-safe contrast;
- interactive targets are at least approximately 44 CSS pixels high;
- mobile navigation wraps into readable two- or three-column rows with no ellipsis truncation;
- no content depends on hover, animation, imagery, custom fonts, JavaScript, backdrop filters, or `color-mix()`;
- `prefers-reduced-motion: reduce` disables meaningful transition/animation duration and smooth scrolling;
- forced-colors mode restores explicit borders;
- print mode removes decorative backgrounds.

## Responsive behavior

The layout is content-first and fluid. Representative smoke widths are 375×812 and 1440×1000. Tests require no horizontal document overflow, readable navigation labels, visible hero text, focus visibility, and theme contrast at those widths.

## Imagery

Approved raster imagery should be processed with `scripts/generate-responsive-media.mjs` after its rights/provenance and metadata review is complete.

For The Fatherless, prefer imagery that feels observational and socially embedded rather than iconic or devotional:

- environmental scenes, civic architecture, thresholds, public space, groups, and asymmetric portraits;
- human subjects integrated into their surroundings rather than isolated as sacred icons;
- cool, controlled lighting and materially plausible stone, metal, fabric, water, and atmosphere;
- restrained celestial or environmental unease rather than divine beams, halos, stars, or overt religious shorthand;
- no sepia wash, faux parchment, gold-dominant grading, Renaissance devotional poses, or generic Biblical cover art.

For Age of Embers, prefer:

- glacial landscapes, exposed horizons, migration, animal movement, water, and dangerous sky;
- small human figures against environmental scale rather than heroic caveman portraiture;
- fire as carried survival or contested resource rather than a dominant ritual-object poster;
- cold-first grading with sky-fire red used as event/tension rather than as a warm overall wash.

For Neurion, prefer:

- civic infrastructure, partial darkness, distributed signals, crowds, and multiple centres of agency;
- humans and synthetic persons sharing environments rather than a single robot or holographic face;
- visual patterns that imply networks or shoals without turning into literal code rain or a glowing grid;
- technological presence embedded in lived public space rather than detached futuristic spectacle.

For The Age of Forms, prefer:

- environments where advanced inherited systems and later social life visibly coexist without a clean civilizational reset;
- selection, visibility, reputation, and comparative pressure communicated through space, access, crowds, queues, prominence, and human behavior rather than floating scores;
- contrast between a person's lived presence and the partial representation through which others evaluate them;
- both socially included and excluded people shown as subject to different costs of the same comparative order;
- beauty, polish, ruins, repair, and automation only where they remain consistent with the approved public premise and future visual-development decisions.

Production markup should use `<picture>` with:

1. AVIF `srcset`;
2. WebP `srcset`;
3. an appropriate original/fallback image;
4. intrinsic `width` and `height`;
5. a `sizes` expression matching layout intent;
6. `loading="lazy"` for below-the-fold images;
7. eager/high-priority loading only for a measured primary visual.

Generated derivatives remain governed public artifacts and require manifest entries before moving under `src/`.

## Sequential-art and illustrated derivatives

Approved panels, pages, or illustrations from a narrative edition are governed public artifacts when reused on the site. Narrative approval does not automatically grant marketing approval.

Before publication, apply `docs/series-visual-continuity.md` and the normal public-content policy: classify spoiler tier, approval state, rights/provenance, metadata disposition, alt text, responsive derivatives, and manifest coverage.

## Motion

Motion is optional enhancement, never a comprehension dependency. Prefer small opacity/transform transitions only when they remain calm and respect reduced-motion preferences. Avoid autoplay, parallax, continuously moving backgrounds, or motion that competes with reading.

## Cache integrity

Public stylesheets use explicit versioned filenames such as `base.v1.css`. Any byte-changing stylesheet release must increment the filename version before deployment when stale CDN/browser caches could mix incompatible HTML and CSS. HTML refers only to versioned public stylesheet paths.

The first era-specific reset after The Fatherless theme split uses `prequel.v2.css` and `sequel.v2.css`; the v1 files are removed from the deployable source rather than rewritten in place. Compatibility filenames may remain until a separate stable-title theme migration is explicitly performed.

## Performance budgets

`performance-budget.json` defines enforceable static budgets. The current baseline limits:

- individual HTML: 24 KiB;
- total shared/theme CSS: 33 KiB;
- initial page requests represented in markup: 12;
- external third-party requests: zero;
- render-blocking scripts: zero.

These are ceilings, not targets. Browser smoke is supplementary; pages must work fully as static HTML/CSS.
