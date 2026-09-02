# Branding and Marketing

Architrino presents an independent fundamental-physics research program whose public identity should make difficult ideas inviting without making them look more established than their evidence permits. The brand therefore combines a distinctive purple visual field with disciplined claims, inspectable sources, and direct paths into the work.

## Purpose and Ownership

This guide is the canonical reader-facing source for Architrino brand identity and public marketing presentation. It selects the favored colors, establishes logo and imagery treatment, defines the public voice, specifies the contact card, and sets the review standard for the project's public presence.

[UI Guidelines](ui-guidelines.md) owns the application of this identity inside controls, panels, navigation, focus states, data displays, and accessibility behavior. Brand assets implement this guide; they do not independently redefine it.

The [Brand Visual Identity Reference](../../../../brand-visual-identity.html) is the supporting visual reference for these decisions. It demonstrates the palette, marks, fades, and public-facing examples while this guide remains the authority for brand identity and marketing presentation.

## Brand Position

Architrino is an open, inspectable research environment for the Architrino Assembly Architecture. Its public presentation should communicate five qualities:

- intellectually ambitious,
- mathematically serious,
- visually distinctive,
- open to inspection and criticism,
- and understandable without inflated promises.

Marketing may invite readers into a question, explanation, visualization, source, or result. It must not turn a prescribed configuration into a discovered physical object, a visual analogy into evidence, a bounded calculation into a global theorem, or a theory claim into scientific acceptance.

## Favored Color Palette

Purple is the favored Architrino brand color. The palette uses a saturated primary purple over deep purple-black foundations, with lighter violet and lilac for accents and actionable light. Red and blue retain their established polarity and path/wake roles; they are supporting identity colors rather than replacements for the primary purple. Every color outside the red-to-blue spectrum and its purple blends is grayscale.

| Role | Color | Value | Use |
| --- | --- | --- | --- |
| Primary purple | Purple | `#6A0DAD` | Principal brand field, scene background, large identity surfaces, and the dominant purple in public compositions |
| Deep foundation | Purple-black | `#0D0A17` | Dark background, surrounding field, and high-contrast foundation |
| Accent purple | Violet | `#8873DD` | Selected controls, borders, highlights, and secondary branded emphasis |
| Soft accent | Light violet | `#BDAEFF` | Labels, quiet highlights, and secondary emphasis on dark surfaces |
| Action halo | Lilac | `#D8C6FF` | Actionable-sphere rings, premium highlights, and restrained glow |
| Electric purple | Electric violet | `#8F00FF` | Sparse high-energy emphasis and explicitly assigned technical states; not a general-purpose body or panel color |
| Polarity blue | Blue | `#2563EB` | Blue polarity, blue path/wake identity, and semantically blue data |
| Polarity red | Red | `#DC2626` | Red polarity, red path/wake identity, and semantically red data |
| Neutral white | White | `#F5F5F5` | Essential text and marks on dark brand fields |
| Neutral gray | Gray | `#A3A3A3` | Quiet information, unavailable states, and grayscale structure |

Plainly: `#6A0DAD` is the main Architrino purple. `#0D0A17` gives it a dark foundation, while `#8873DD`, `#BDAEFF`, and `#D8C6FF` provide progressively lighter emphasis. Electric purple is deliberately rare. Red and blue keep their specific explanatory jobs; all remaining structure is neutral gray, white, or black.

### Palette Discipline

- Let primary purple and the deep foundation establish recognition before adding secondary colors.
- Use action halo lilac for interactive light, not as decoration around inactive objects.
- Keep ordinary reading surfaces dark and calm enough for sustained reading; a large saturated purple field is a brand surface, not the default answer to every panel.
- Preserve red and blue whenever they encode polarity or path/wake identity. Do not swap them for campaign aesthetics, and do not introduce green, yellow, orange, cyan, or another hue for an ordinary interface state.
- Do not use color alone to communicate action, selection, state, or evidence grade. Pair it with shape, text, iconography, or another accessible signal.
- Check contrast in the final context, including hover, focus, disabled, selected, and reduced-motion states.

### Polarity-Symmetric Preferred Set

The preferred hue set contains seven swatches: the fixed center `#6A0DAD` and three matched pairs at equal blend distances toward application red `#DC2626` and application blue `#2563EB`. The colors are interpolated channel by channel in sRGB as a reproducible rendering contract; that interpolation does not encode physical or theoretical structure.

| Pair | Red-side blend | Distance from center | Blue-side blend |
| --- | --- | --- | --- |
| 1 | `#901580` | `1/3` | `#532AC2` |
| 2 | `#B61E53` | `2/3` | `#3C46D6` |
| 3 | `#DC2626` | `3/3` | `#2563EB` |

Red-side and blue-side are equal-status labels. A presentation may mirror the two sides without changing meaning. Do not describe the set with start/end, forward/reverse, positive/negative, pure-color, or degree-coordinate language. Use these seven colors when a design needs a controlled polarity blend; otherwise use the named brand tokens or grayscale.

Plainly: the central purple has three equally spaced partners on each side. Swapping the red and blue sides changes no meaning and signals no preference.

### Fades, Transparency, and Glow

Brand color fades toward transparency over the receiving background rather than toward white, gray, or a new hue. The standard visual fade ladder is `100%`, `72%`, `40%`, `16%`, and `0%`. Use the full ladder for path/wake fields and long gradients; shorter UI fades may use only the steps needed for a clear state transition.

Purple, red, and blue keep their hue identity while their opacity falls. When paths cross or overlap, preserve enough separation to read each color before allowing the fields to blend. Avoid muddy intermediate browns, white-hot centers, rainbow ramps, and equal-strength glow around every object.

Action halos use the light lilac with approximately `30%` ring opacity and a restrained `22%` outer glow. A halo marks an available action; it is not a general decoration. Deep glass surfaces retain more of the purple-black foundation: strong panels are approximately `98%` opaque, ordinary panels approximately `88%`, and compact controls approximately `82%`.

Plainly: the color stays red, blue, or purple while it disappears. A fade should look like the same light becoming less present, not like the color is being mixed with white paint.

## Logo and Mark Treatment

The Noether Braid mark is the principal compact visual mark used in the current public identity. It preserves red and blue architrino markers, three orbit ellipses, and the ribbon-like braid treatment. Use the mark as a profile image, app icon, or compact identity anchor without redrawing its geometry or changing its polarity colors for individual campaigns.

On social banners, the profile mark and banner should cooperate rather than repeat one another. The selected Crossing Wake Sheets direction uses red, purple, and blue path/wake fields behind the separate profile mark. Keep banners free of competing logos, embedded QR codes, dense equations, and small text that becomes unreadable after platform cropping.

The Architrino logo-and-QR lockup is appropriate where a physical or displayed surface needs a direct route to the website. Preserve a clear quiet zone, confirm the destination before publication, and include a visible text URL when the medium permits it.

## Typography and Composition

Use `Helvetica Neue`, with `Arial, sans-serif` as the fallback, for the shared web identity. Technical documents may use the established mathematical and monospace treatments defined by the UI and mathematics guides, but marketing surfaces should remain legible at thumbnail and mobile sizes.

Prefer one strong focal object, a clear title or invitation, and enough negative space for platform crops. Avoid generic science imagery, ornamental equations, excessive glow, crowded particle fields, and visual spectacle that obscures the actual subject.

## Public Voice

The public voice is direct, curious, serious, and welcoming. It should explain what a reader can inspect and why that object matters. Prefer concrete invitations such as `Explore the geometry`, `Read the derivation`, `Inspect the evidence`, or `Open the visualization` over prestige language, urgency theater, or unsupported claims of breakthrough.

Public copy follows the same claim boundary as the underlying source. A marketing summary may simplify an explanation, but it may not strengthen the result. When a claim is measured, inferred, or speculative, the surrounding presentation must not erase that distinction.

## Contact Card

The standard public contact card is a compact dark card built from the favored palette. It includes:

- the current Architrino mark,
- `Architrino` as the primary name,
- a short descriptor such as `Independent fundamental-physics research`,
- [architrino.com](https://www.architrino.com),
- [architrino@gmail.com](mailto:architrino@gmail.com),
- the current website QR code when the medium supports scanning,
- and one context-appropriate action such as `Explore the research` or `Support the research`.

Use the deep foundation for the card surface, primary purple for its identity field or principal border, action halo lilac for interactive emphasis, and neutral white for essential text. Keep the email and URL selectable and visible; a QR code is an additional route, not a replacement. Do not place private phone numbers, home addresses, personal accounts, or unpublished contact details on the public card.

## Public Presence

Architrino's market presence includes the website and every public profile, repository, community, media, or support surface the project actually operates. Presence is judged as one connected system: names, descriptions, links, contact routes, logos, banners, and claims should agree across surfaces while respecting each platform's format.

A platform-sized asset does not prove that an official account is active. Public guidance should identify a channel as current only after the live destination, ownership, profile content, and outbound links have been checked.

## Monthly Market-Presence Review

Review the public presence once each month. The review covers:

- live website availability and current landing presentation,
- official profile discovery and ownership confidence,
- name, description, logo, banner, and favored-purple consistency,
- working links among the website, repository, contact, support, and community surfaces,
- mobile crops, image clarity, alt text, and contrast,
- stale descriptions, abandoned profiles, outdated campaign material, and broken destinations,
- search-result titles, summaries, and obvious discoverability problems,
- public messaging and claim discipline,
- and measurable audience or conversion signals when an authorized analytics source is available.

Each review distinguishes measured facts from inference. Visual consistency can be inspected directly; audience growth, trust, conversion, and marketing effectiveness require analytics or another declared instrument. Compare with the previous month, identify improvements and regressions, and rank the next actions by expected impact and implementation effort.

Plainly: the monthly review asks whether every public doorway still looks like Architrino, says the same honest thing, leads somewhere useful, and works for the reader. It does not treat a polished profile as proof that the profile is attracting or persuading people.

## Related Guides

- [Brand Visual Identity Reference](../../../../brand-visual-identity.html)
- [UI Guidelines](ui-guidelines.md)
- [About the Webapp](about-the-webapp.md)
- [About Architrino](about-architrino.md)
- [Values](values.md)
- [GitHub Presence and Community](github-presence-and-community.md)
- [Support Architrino Research](support-architrino-research.md)
