# Chapter Authoring and Legacy Recovery

## Workstream Metadata

- Kind: `priority`
- Rank: `10`
- Value: `3`
- Cost: `5`
- ROI: `0.60`
- Status: `queued`

## Task Queue

1. `fill_thin_chapters` — Fill empty or thin chapters with formal minimums. Status: `next`. Depends on: none.
2. `deepen_drafted_chapters` — Deepen the current drafted philosophy and history chapters. Status: `pending`. Depends on: `fill_thin_chapters`.
3. `recover_legacy_material` — Mine legacy material only where it materially saves time. Status: `pending`. Depends on: `fill_thin_chapters`.

## Scope

This is the ranked queue for chapter-writing work and legacy-material recovery. It is the main coverage bucket and should be used to fill thin chapters with formal minimums rather than ornamental prose.

## Fast Lift

- Add definitions, governing equations, closure targets, and falsification gates to empty or thin chapters.
- Recover useful material from WordPress or old presentations only where it saves real time.
- Deepen the current drafted philosophy/history chapters in ranked order.
