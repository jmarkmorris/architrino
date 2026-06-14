# First Prototype Priorities

## Prototype Target

The first videos prototype should be a short YouTube 4K HD landscape pilot.

Default target:

- format: 16:9, 3840 x 2160;
- duration: 60 to 90 seconds;
- audience: first-time Architrino viewer with general STEAM background;
- structure: one hook, one core explanation, one visual demonstration, one closing pointer;
- cast: the three fictional STEAM-undergrad characters;
- media mix: dialogue, narration, one concept animation, one chart or formula overlay, and one app or theory visual;
- release state: internal review asset, not public release until the quality-control checklist passes.

## Decision Queue

1. `pilot_topic` - Choose the first prototype topic. Recommended default: a YouTube landscape explainer that introduces Architrino through one visual concept and one app-navigation moment rather than trying to summarize the whole theory. Status: `active`. Depends on: none.
2. `character_identity_sheets` - Draft character sheets now exist in [character-development.md](character-development.md); approve or revise first-pass names, roles, appearances, voice directions, and boundaries. Status: `active`. Depends on: none.
3. `visual_style_lock` - Choose the first prototype style. Recommended default: lifelike animated characters with consistent model sheets, not full photoreal video, until the toolchain proves character continuity across shots. Status: `active`. Depends on: `character_identity_sheets`.
4. `voice_style_lock` - Choose provisional voice directions and pronunciation rules before generating any test narration. Status: `active`. Depends on: `character_identity_sheets`.
5. `script_outline` - Produce a reviewed 60 to 90 second outline with lines assigned to characters, narrator beats, on-screen text, and visual beats. Status: `next`. Depends on: `pilot_topic`, `visual_style_lock`, and `voice_style_lock`.
6. `asset_storage_contract` - Decide where scripts, prompts, character references, generated stills, voices, captions, and exported prototype files live in the repo or adjacent artifact storage. Status: `next`. Depends on: `script_outline`.
7. `prototype_qc_gate` - Define the pass/fail checklist for factual accuracy, character consistency, voice quality, captions, mobile legibility, and YouTube 4K landscape export. Status: `next`. Depends on: `script_outline`.
8. `toolchain_trial` - Run the smallest toolchain test that proves one character still, one voice sample, one formula/chart overlay, and one 4K landscape export path. Status: `pending`. Depends on: `asset_storage_contract` and `prototype_qc_gate`.

## First-Pass Character Ensemble

These are draft fictional identities for prototype planning. They are not final public character sheets.

| Character | Prototype role | Appearance direction | Voice direction | Boundary |
| --- | --- | --- | --- | --- |
| Mira Halenko | Physics and engineering explainer who turns the abstract mechanism into a concrete diagram. | Auburn-haired straight woman, Ukrainian design influence, clean technical wardrobe, camera-ready but not celebrity-like. | Warm alto, calm pace, precise technical diction. | Do not imitate a real Ukrainian person or use accent as a gimmick. |
| Lena Vale | Arts-and-mathematics bridge who makes visuals, diagrams, and formulas readable. | Blonde lesbian woman, contemporary studio style, visually expressive but practical. | Bright mezzo, confident, quick but clear. | Orientation is identity context, not a joke, plot device, or teaching credential. |
| Julian Brooks | Technology and systems guide who connects the app, code-like workflows, and viewer navigation. | Light-skinned Black gay man, polished casual style, friendly screen-presenter presence. | Smooth tenor-baritone, direct, encouraging without hype. | Do not let identity traits substitute for technical competence or personality. |

## Character Development Checklist

- [ ] Approve or rename the three draft characters.
- [x] Define each character's STEAM emphasis, speaking style, and recurring job in a video. See [character-development.md](character-development.md).
- [x] Create a one-paragraph public-safe biography for each character. See [character-development.md](character-development.md).
- [x] Create a visual prompt sheet for each character, including face, hair, wardrobe, posture, lighting, and negative likeness constraints. See [character-development.md](character-development.md).
- [x] Create a voice prompt sheet for each character, including pace, tone, pronunciation, and forbidden real-person imitation. See [character-development.md](character-development.md).
- [x] Create continuity rules for hair, wardrobe, color palette, posture, and camera framing. See [character-development.md](character-development.md).
- [ ] Decide whether the first prototype includes only the three students or also one `Educator`.

## Pilot Script Shape

The first script should stay narrow:

1. Hook: one character names the practical question.
2. Setup: another character states the simplest context needed to understand the visual.
3. Demonstration: the app or concept animation shows the point.
4. Clarification: a chart, formula, or paragraph appears only if it improves the explanation.
5. Close: one clear next action or next video path.

Avoid:

- a full theory overview;
- unsourced claims beyond the current repo source of truth;
- too many formulas for a first viewer;
- identity exposition that competes with the educational purpose;
- and toolchain complexity that blocks the first prototype.

## Prototype Done Criteria

The first prototype is ready for operator review when it has:

- one reviewed script;
- one complete shot list;
- three draft character sheets;
- one dry-run narration track or read-through;
- one visual proof of character style;
- one chart, formula overlay, or app-navigation visual;
- captions or transcript draft;
- a 16:9, 3840 x 2160 export;
- and retained source artifacts for review.
