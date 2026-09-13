# Story-driven public image direction

This document defines the production image briefs for the public *Entanglement of Ages* site. It is a **presentation specification**, not a canon document. The public repository must not reproduce private manuscript text, hidden symbolic mechanics, source paths, editorial notes, or scene-level spoilers.

The visual goal is cinematic environmental storytelling: people exist inside systems, landscapes, crowds, and infrastructure rather than appearing as sacred icons or isolated promotional portraits.

## Shared cinematic grammar

The series overview and four book hero assets should feel like frames from one prestige dramatic series photographed across radically different eras.

Shared rules:

- landscape-first composition with human scale visible but not iconized;
- asymmetric framing and strong environmental geometry;
- controlled darkness with readable local contrast rather than a brown/black wash;
- one clear source of visual tension per image;
- physically plausible materials, atmosphere, scale, and lighting;
- room for responsive cropping without removing the image's narrative subject;
- no baked-in typography, logos, zodiac glyphs, religious symbols, scores, or UI text;
- no halo-like backlighting, divine rays, cruciform framing, saint poses, Madonna-and-child composition, or Biblical-poster staging;
- no generic fantasy, caveman-museum, cyberpunk, post-apocalypse, superhero, or devotional-cover language;
- no image should be necessary to understand the page copy.

Recommended source master: at least **2400 × 1350 (16:9)**. Preserve a safe central 70% for responsive crops. Generate 480/960/1440 AVIF and WebP derivatives through `scripts/generate-responsive-media.mjs` only after rights/provenance approval.

## Homepage — the series across four ages

**Compatibility asset key:** `trilogy-overview-hero`

The existing asset key remains a compatibility name until a separately reviewed asset/manifest migration. New documentation and reader-facing copy should call the work a **series**, not a trilogy.

### Narrative job

Introduce the series as changing forms of the same struggle over power, legitimacy, visibility, and human value without explaining hidden architecture. It should feel like one visual sentence rather than a collage of book covers.

### Composition

A wide, cinematic landscape whose visual language changes gradually from left to right:

1. exposed ice, dark water, distant migration and a small carried flame;
2. cold monumental civic stone, a public threshold and compressed human crowd geometry;
3. partially dark future civic infrastructure with many small independent signal/light sources;
4. a later inhabited environment where advanced inherited systems remain visible but social attention, selection, and access produce a quieter comparative pressure.

The transitions should be atmospheric, architectural, and material rather than separated by hard panels. No single person dominates the frame. Water, paths, thresholds, horizon lines, or changes in human scale can provide continuity across eras without exposing why those repetitions matter privately.

### Palette

- Age of Embers: polar blue, charcoal, glacial white, restrained sky-fire red;
- The Fatherless: graphite, cold stone, blue-black, oxidized teal, muted-wine tension;
- Neurion: indigo-black, deep network blue, restrained cyan/violet points;
- The Age of Forms: do not lock a final palette yet; preserve material continuity with advanced infrastructure while separating the era from both Neurion's signal language and The Fatherless' institutional stone treatment.

### Avoid

Triptych/quadrant poster layout, religious iconography, a central saviour silhouette, literal fish/ram/Aquarius/Capricorn glyphs, timeline labels, glowing portals, fantasy montage effects, floating rank numbers, or a single bright beam connecting the ages.

### Public-safe alt intent

`Four eras transition from an icy migration landscape, through monumental civic architecture and a networked city, into a later society living among inherited advanced systems.`

## Book I — *Age of Embers*

**Asset key:** `age-of-embers-hero`

### Narrative job

Show that survival is dominated by cold, migration, guarded resources, and a changing sky. Fire matters because it is small and vulnerable, not because the image is a ritual scene.

### Composition

A vast late-Pleistocene glacial valley near polar twilight. A small group of migrating humans crosses wind-cut snow and dark meltwater while distant animals move away from the valley. The sun sits unnaturally low near the horizon. Red auroral sky-fire develops high above, reflected faintly in black water. One person carries a small protected ember/flame near the group; it must remain subordinate to the landscape.

People should be too distant for definitive character casting. Clothing and tools should feel materially plausible, worn, practical, and non-costume-like.

### Palette

Polar-night navy, glacial blue, cold grey-white, black water, red aurora. Ember orange only as a tiny secondary cue.

### Avoid

Heroic caveman close-up, fur-bikini stereotype, shaman circle, dominant campfire, cave painting collage, brown stone-age grading, fantasy mammoth charge, ram-horn costume, literal fish symbolism, or supernatural god imagery.

### Public-safe alt intent

`A small migrating group crosses a glacial valley beneath a low sun and red aurora, carrying a protected ember through the cold.`

## Book II — *The Fatherless*

**Asset key:** `fatherless-original-hero`

### Narrative job

Make the Republic itself visually powerful: civilization, law, wealth, hierarchy, and public order can look impressive while human vulnerability is compressed inside them. The image should read as political drama, not religious epic.

### Composition

A cold monumental civic threshold in the Aurelian Republic at blue-hour or controlled overcast light. Massive stone stairs, columns, arches, bronze/iron details, banners or civic fabric without readable emblems, and a disciplined crowd create geometric authority. A small vulnerable family or pair is partially separated from the crowd at an edge/threshold—not centred, posed, or illuminated as sacred figures. Officials, guards, elites, workers, and enslaved people may share the public space through differing posture, access, or elevation rather than explicit spectacle.

The camera should feel observational: slightly elevated or oblique, like witnessing an institution functioning. Human faces need not be identifiable enough to lock public character casting.

### Palette

Graphite, cold limestone, blue-black shadow, desaturated fabric, oxidized teal material accents, restrained muted-wine tension. Natural skin tones should remain visible and not be sepia-shifted.

### Avoid

Jesus-like central male figure, halo/sunburst, mother-and-child devotional pose, crucifix silhouettes, candles/crowns/olive branches, gold wash, parchment texture, ancient-city tourist postcard, gladiator-poster action, triumphal ruler portrait, or generic Biblical-film composition.

### Public-safe alt intent

`People gather beneath massive civic architecture while a small vulnerable group stands at the edge of the Republic's ordered public space.`

## Book III — *Neurion*

**Asset key:** `neurion-hero`

### Narrative job

Show a civilization whose infrastructure is failing unevenly while many human and synthetic centres of agency continue acting. The visual centre is plurality, not a glowing artificial supermind.

### Composition

A future civic transit/data/public-services district during partial power loss after a solar/infrastructure disturbance. Some structures are dark, some emergency systems remain active, and many independent signal sources are scattered through the frame. Humans and clearly non-human synthetic persons share the space: helping, waiting, observing, repairing, disagreeing, or moving independently. No one entity occupies the visual centre.

Network/distributed-intelligence ideas may appear through repeated light nodes, reflections, routing patterns, moving groups, or layered civic infrastructure—not floating code. The sky can carry restrained residual solar disturbance without becoming a cosmic portal.

### Palette

Near-black indigo, deep network blue, controlled cyan, restrained violet variation, limited warning rose/red. Keep skin, concrete, glass, metal, textiles, and machine surfaces materially plausible.

### Avoid

Glowing robot face, chrome humanoid hero, Matrix code rain, neon cyberpunk alley, holographic deity, giant central AI orb, blue hologram saviour, one luminous figure controlling a crowd, generic server-rack stock art, or sterile SaaS-gradient futurism.

### Public-safe alt intent

`Humans and synthetic persons move through a partially dark future civic district lit by many independent signals during an infrastructure disruption.`

## Book IV — *The Age of Forms*

**Asset key:** `age-of-forms-hero`

The approved production asset is manifest-backed and follows this public-safe visual direction.

### Narrative job

Show a later civilization living among advanced inherited systems after a catastrophic break in institutional continuity. The image should communicate selection and comparative pressure without reducing the premise to a glowing social score or a simplistic beauty hierarchy.

### Composition

An inhabited public or semi-public environment where sophisticated surviving infrastructure is visibly integrated with later repair, adaptation, or social use. Several people occupy the same space, but attention and access are distributed unevenly: one route, venue, service, gathering, or opportunity visibly attracts people while another person or small group remains peripheral without an explicit guard forcing the separation.

A reflective surface, framed representation, queue, invitation boundary, viewing platform, display surface without readable text, or difference in prominence may suggest that people are being evaluated through partial visible forms. The system should be inferred from what the environment produces rather than represented as floating numbers above bodies.

The world should contain both continuity and discontinuity. It must not look like pristine Neurion one day later, nor like a complete technological reset centuries after an apocalypse.

### Palette

Do not lock the palette until Book IV receives a dedicated public visual-theme pass. For concept evaluation:

- preserve believable materials and human skin tones;
- distinguish surviving technology from Neurion's active signal-cyan identity;
- avoid default rust/brown ruin grading;
- allow contrast between polished inherited mechanisms and repaired or reinterpreted surroundings;
- use light and prominence to imply attention without turning high visibility into moral beauty.

### Avoid

Floating attractiveness/reputation scores, smartphone-feed parody, influencer poster imagery, one universally beautiful hero, incel/gender-war visual shorthand, medieval villagers worshipping a machine, desert wasteland apocalypse, pristine utopia, generic Black Mirror clone, or a single villainous algorithm represented as a glowing eye.

### Public-safe alt intent

`People share a later public space where advanced inherited systems remain in use while attention and access are distributed unevenly.`

## Cross-series continuity review

Before approving new series art, compare it with `docs/series-visual-continuity.md`.

Look for visible, public-safe continuity through:

- human scale inside larger systems;
- routes and thresholds;
- environmental or civic geometry;
- distributed versus concentrated attention;
- representations that remain visibly partial;
- materially plausible evolution rather than literal symbolic repetition.

Do not copy private motif explanations into asset descriptions or alt text.

## Asset approval checklist

Before any image enters deployable `src/`:

1. record source/provenance and rights classification;
2. record whether the source is commissioned, generated, licensed stock, or public domain;
3. confirm no private source material or private metadata is embedded in the asset record;
4. review the source visually for story fit, unwanted religious shorthand, stereotypes, accidental text/logos, and spoiler risk;
5. strip unnecessary embedded metadata and retain only justified public metadata;
6. approve public-safe alt text based on what is actually visible;
7. generate responsive AVIF/WebP derivatives with intrinsic dimensions;
8. add every deployable source/derivative to the public manifest as required by publication policy;
9. use `<picture>` markup and a bounded text panel so readability does not depend on the image;
10. verify 375 px and 1440 px crops, 200% text zoom, reduced motion, no-image behavior, and performance budgets.

## Review standard

Reject an otherwise attractive asset if it makes the story look like a devotional retelling, a sepia historical epic, generic prehistoric fantasy, generic cyberpunk, generic post-apocalypse, or a ranking-dystopia cliché. The image must communicate the **kind of power each era lives inside** before it communicates a genre label.
