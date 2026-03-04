# Hyde Periodic: Left-Right 1->119 Walk Ideas

## Goal
Make keyboard traversal deterministic and instructional: `ArrowLeft` goes to `Z-1`, `ArrowRight` goes to `Z+1`, from Hydrogen (`1`) through Ununennium (`119`).

## Navigation Model
- Primary index: atomic number (`Z`), not hotspot/circle number.
- Build a focus map once at Hyde overlay init:
  - `Z 1..118` -> existing circle hotspot node
  - `Z 119` -> supplemental Uue tile node
- Key behavior:
  - `ArrowRight`: focus next atomic number if present.
  - `ArrowLeft`: focus previous atomic number if present.
  - `Enter`/`Space`: open element atom scene.
- Edge behavior:
  - At `Z=1`, left does nothing (or optional wrap to `119`).
  - At `Z=119`, right does nothing (or optional wrap to `1`).

## UX Details
- Hover/focus lozenge format: `"<number> <symbol>"` (already used).
- Keep focus visible for keyboard users.
- Preserve current behavior where hover/focus updates the detail panel.
- Keep traversal independent of geometric spiral ordering.

## Pedagogy Modes
- `Explore` mode (default): free clicking, arrows still work.
- `Walk` mode: emphasizes sequential progression; optional step counter (`23 / 119`).
- `Quiz` mode (future):
  - Prompt: "Name element 42"
  - Prompt: "What comes after Krypton?"
  - Prompt: "Find the next alkali metal"

## Why This Helps
- Accessibility: full keyboard path across all elements.
- Instruction: reinforces atomic number ordering and neighbor relationships.
- Consistency: same control pattern across standard periodic and Hyde views.

## Implementation Notes
- Keep two maps in runtime:
  - `atomicNumber -> hotspotDisplayNumber` (existing for 1..118)
  - `atomicNumber -> focusableNode` (built at render time, includes 119 tile)
- Attach one shared key handler that reads `event.currentTarget.dataset.number`.
- For 119, keep tile anchored near 118 but logically indexed as `Z=119`.
