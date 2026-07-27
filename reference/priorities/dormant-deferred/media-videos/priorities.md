# Media Videos

## Workstream Metadata

- Kind: `priority`
- Rank: `29`
- Value: `0.56`
- Cost: `3.7`
- ROI: `0.15`
- Status: `active`

## Purpose

The media-videos workstream owns AI-assisted media production for Architrino apps, theory explanation, tutorials, and public platform delivery.

Its job is to turn reviewed scripts and visual plans into generated or assembled media such as characters, voices, narration, app walkthroughs, charts, formulas, images, animations, and videos.

## Current State

- This workstream starts from operator brainstorming rather than an existing production pipeline.
- No canonical video-generation, voice-generation, editing, or publishing toolchain has been selected yet.
- The initial direction is a recurring group of fictional AI characters who can appear in lifelike, illustrated, animated, or cosplay-style media.
- The first priority media platform is YouTube 4K HD landscape. TikTok and the Architrino webapp remain later platform profiles.

## Current Blocker And Next Action

- Blocker: no first prototype can start until the pilot topic, 60-90 second script outline, visual style lock, voice/toolchain trial path, asset storage contract, and QC gate are selected.
- Next action: choose the first YouTube 4K HD landscape pilot topic and draft the reviewed outline using the flexible character cast in [character-development.md](character-development.md).

## Task Queue

1. `first_prototype_decision_stack` - Resolve the first YouTube 4K HD landscape prototype blockers: pilot topic, character identity sheets, visual style, voice style, script outline, asset storage, QC gate, and smallest toolchain trial. Status: `active`. Depends on: none.
2. `character_ensemble` - Promote the draft STEAM-aligned ensemble into approved character sheets with names, roles, appearances, voice directions, visual references, and cross-media continuity rules. Status: `active`. Depends on: `first_prototype_decision_stack`.
3. `script_pipeline` - Create a repeatable path where AI drafts scripts, the operator reviews them, dry runs identify weak sections, and the final script becomes the source for narration, visuals, charts, formulas, and app walkthroughs. Status: `next`. Depends on: `character_ensemble`.
4. `quality_control_method` - Define the review checklist for factual accuracy, visual consistency, voice quality, accessibility, YouTube 4K landscape export, platform fit, and safe use of fictional generated characters. Status: `next`. Depends on: `script_pipeline`.
5. `production_methodology` - Choose the simplest repeatable method for making reviewed video assets, including one-shot production, dry-run production, and possible live-streaming workflow. Status: `pending`. Depends on: `quality_control_method`.
6. `media_asset_pipeline` - Establish how AI-generated characters, voices, visages, narration, web navigation tutorials, videos, charts, markdown formulas or paragraphs, images, and concept animations are produced, named, reviewed, and stored. Status: `pending`. Depends on: `production_methodology`.
7. `platform_profiles` - Finish YouTube 4K HD landscape first, then TikTok and Architrino webapp output profiles, including aspect ratios, clip duration, captions, thumbnails, navigation embeds, and source-artifact retention. Status: `pending`. Depends on: `media_asset_pipeline`.

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [first-prototype-priorities.md](first-prototype-priorities.md) | Concrete pre-prototype decision queue, first-pass character ensemble, pilot script shape, and prototype done criteria. | First YouTube 4K HD landscape prototype script, shot list, character sheets, and toolchain trial. |
| [character-development.md](character-development.md) | Draft character bible seed with biographies, visual prompts, voice prompts, continuity rules, dialogue roles, and open operator decisions. | Character sheets, prompt packets, voice trials, shot continuity checks, and first prototype script assignments. |
| [videos-requirements.md](videos-requirements.md) | Stable requirements for generated-video scope, fictional character design, media types, production workflow, quality control, and platform targets. | Future video tooling, character bibles, script templates, app tutorial embeds, and public release checklists. |

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `first_prototype_decision_stack` | [first-prototype-priorities.md](first-prototype-priorities.md) | First prototype plan and dry-run asset packet. | The first prototype has a topic, draft character sheets, script shape, QC gate, asset storage decision, and smallest toolchain trial target. |
| `character_ensemble` | [character-development.md](character-development.md), [first-prototype-priorities.md](first-prototype-priorities.md), and [videos-requirements.md](videos-requirements.md) | Character bible and reusable prompt/style assets. | Mia, Sophia, Julian, and Rachel have stable fictional identities, appearances, voices, and allowed-use boundaries across video, image, and animation. |
| `script_pipeline` | [first-prototype-priorities.md](first-prototype-priorities.md) and [videos-requirements.md](videos-requirements.md) | Script template and review workflow. | AI-authored scripts can be reviewed, revised, dry-run, and tied to shot plans before media generation. |
| `quality_control_method` | [first-prototype-priorities.md](first-prototype-priorities.md) and [videos-requirements.md](videos-requirements.md) | Release checklist for public videos and app-embedded media. | Every generated clip has factual, visual, audio, accessibility, platform, and safety review before publication. |
| `production_methodology` | [videos-requirements.md](videos-requirements.md) | Video production playbook and toolchain scripts. | A repeatable dry-run-to-final workflow can produce at least one short reviewed clip with retained source artifacts. |
| `media_asset_pipeline` | [videos-requirements.md](videos-requirements.md) | Asset directory plan and media-generation workflow. | Generated characters, voices, narration, charts, formulas, images, animations, and videos can be traced back to scripts, prompts, review notes, and final outputs. |
| `platform_profiles` | [videos-requirements.md](videos-requirements.md) | YouTube 4K HD landscape first, then TikTok and Architrino webapp publishing profiles. | Each target platform has a declared output format, caption policy, thumbnail policy, and retention policy. |

## Notes

- `STEAM` expands `STEM` with the arts: Science, Technology, Engineering, Arts, and Mathematics.
- `Educators` is the current term for recurring instructional characters.
- Character identity details are design inputs for fictional characters, not instructions to imitate real people or reduce characters to demographic traits.
