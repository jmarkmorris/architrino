# First Prototype Priorities

## Prototype Target

The first videos prototype should be a short YouTube 4K HD landscape pilot.

Default target:

- format: 16:9, 3840 x 2160;
- duration: 60 to 90 seconds;
- audience: first-time Architrino viewer with general STEAM background;
- structure: one hook, one core explanation, one visual demonstration, one closing pointer;
- cast: any one character, pair, subset, or full ensemble, chosen by what the pilot needs;
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
| Mia Quinn | Conceptual physics lead who defines the key idea, names the moving parts, and gives viewers a clean mental model. | Auburn-haired woman, Ukrainian design influence, thin fit athletic build, clean well-fitted technical wardrobe, camera-ready but not celebrity-like. | Warm alto, calm pace, polished technical diction. | Do not imitate a real Ukrainian person or use accent as a gimmick. |
| Sophia Calder | Visual mathematics lead who translates equations into geometric pictures and helps viewers see what the math means. | Blonde woman, thin fit athletic build, contemporary well-fitted studio style, visually expressive but practical. | Bright mezzo, confident, articulate, quick but clear. | Do not reduce her to presentation cleanup; she owns mathematical intuition. |
| Julian Brooks | Software systems guide who connects the idea to the app, workflow, source artifact, or next action. | Light-skinned Black man, thin fit athletic build, polished well-fitted casual style, friendly screen-presenter presence. | Smooth tenor-baritone, direct, well spoken, encouraging without hype. | Do not let demographic or appearance traits substitute for technical competence or personality. |
| Rachel Stone | Experimentalist skeptic who asks hard questions, requests evidence, challenges assumptions, and forces definitions. | Blonde woman, thin fit athletic build, composed well-fitted experimentalist style, focused and credible. | Clear mezzo-alto, measured, exact, evidence-centered. | Do not make her a generic contrarian; her skepticism should improve the explanation. |

## Character Development Checklist

- [x] Names approved for `Mia Quinn`, `Sophia Calder`, `Julian Brooks`, and `Rachel Stone`.
- [x] Define each character's STEAM emphasis, speaking style, and recurring job in a video. See [character-development.md](character-development.md).
- [x] Create a one-paragraph public-safe biography for each character. See [character-development.md](character-development.md).
- [x] Create a visual prompt sheet for each character, including face, hair, wardrobe, posture, lighting, and negative likeness constraints. See [character-development.md](character-development.md).
- [x] Create a voice prompt sheet for each character, including pace, tone, pronunciation, and forbidden real-person imitation. See [character-development.md](character-development.md).
- [x] Create continuity rules for hair, wardrobe, color palette, posture, and camera framing. See [character-development.md](character-development.md).
- [x] Casting is flexible: any character may appear alone or with any subset of the ensemble.

## Pilot Script Shape

The first script should stay narrow:

1. Hook: one character names the practical question.
2. Setup: another character states the simplest context needed to understand the visual or math.
3. Evidence pressure: Rachel asks the hard question the viewer is likely to have.
4. Demonstration: the app or concept animation shows the point.
5. Clarification: a chart, formula, or paragraph appears only if it improves the explanation.
6. Close: one clear next action or next video path.

Avoid:

- a full theory overview;
- unsourced claims beyond the current repo source of truth;
- too many formulas for a first viewer;
- personal-life exposition that competes with the educational purpose;
- and toolchain complexity that blocks the first prototype.

## Prototype Done Criteria

The first prototype is ready for operator review when it has:

- one reviewed script;
- one complete shot list;
- four draft character sheets;
- one dry-run narration track or read-through;
- one visual proof of character style;
- one chart, formula overlay, or app-navigation visual;
- captions or transcript draft;
- a 16:9, 3840 x 2160 export;
- and retained source artifacts for review.
