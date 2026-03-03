# Periodic Table Navigation Design

Yes, this is a strong UX direction.

No arrow-key conflicts today:
- In app/runtime code, arrow keys are not bound.
- Current keyboard handling is only:
1. `Escape` / `Enter` in search input (`src/runtime/SceneSearchUiRuntime.js`)
2. `Cmd/Ctrl+K` and `Escape` globally for search panel (`src/runtime/SceneSearchUiRuntime.js`)
- `Arrow*` only appears in minified vendor libs, not app logic.

## Recommended UX

1. Keyboard arrows on element scenes
- Only active when current scene is `content/scenes/elements/*`.
- Use periodic coordinates (`xpos`, `ypos`) from `content/scenes/chemistry/periodic_table.json`.
- Direction rule:
1. `Left/Right`: nearest element on the same row (`y`), lower/higher `x`.
2. `Up/Down`: nearest element on the same column (`x`), lower/higher `y`.
- Ignore when typing in `input`, `textarea`, or `[contenteditable]`, or while transitions are active.
- Navigate with existing `jumpToScene(...)` path.

2. On-screen arrows (lower-right)
- Four buttons in a diamond layout (rotated 2x2 visual), no grid lines.
- Solid white triangular arrows.
- Uses the same resolver as keyboard arrows.

3. Mini periodic HUD
- Tiny 18-column table in a corner.
- Highlight current element.
- Optional hover/target highlights for immediate neighbors.
- Updates after every element-to-element move.

## Wrap Behavior

### Horizontal Wrap
- `ArrowRight`: if no element exists to the right in the same row, wrap to the leftmost occupied tile in that row.
- `ArrowLeft`: if no element exists to the left in the same row, wrap to the rightmost occupied tile in that row.

### Vertical Wrap
- `ArrowDown`: if no element exists below in same column, wrap to the topmost occupied tile in that column.
- `ArrowUp`: if no element exists above in same column, wrap to the bottommost occupied tile in that column.

### Sparse Row/Column Rule
- Empty cells are skipped.
- Search proceeds cell-by-cell in the requested direction (with wrap) until an occupied tile is found.
- If no occupied tile exists in that row/column, no movement occurs.

## Special-Series (Lanthanides/Actinides) Handling

Data already includes f-block rows as regular positions:
- Lanthanides: `ypos = 9`
- Actinides: `ypos = 10`

Behavior:
- Treat rows 9 and 10 as first-class rows for all arrow movement.
- Horizontal wrap works inside each of these rows exactly like main rows.
- Vertical movement naturally bridges group-3 progression by column:
1. `Sc (x=3,y=4)` <-> `Y (x=3,y=5)` <-> `La (x=3,y=9)` <-> `Ac (x=3,y=10)` (with wrap).

Result:
- Navigation remains spatially consistent with the rendered periodic layout.
- No custom hardcoded exceptions are required for most moves.

## Implementation Notes

1. Build symbol/scene maps once from periodic data + manifest routes.
2. Keep an occupancy index:
- `row -> sorted occupied x values`
- `column -> sorted occupied y values`
3. Resolve neighbor in O(log n) using sorted arrays.
4. Hook into one shared `navigateElement(direction)` used by:
- keyboard listener
- diamond buttons
- HUD click/drag affordances (future)
