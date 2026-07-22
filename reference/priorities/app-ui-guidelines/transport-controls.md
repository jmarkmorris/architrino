# Transport Controls

## Accepted Standard

The canonical transport-control set is `Play`, `Pause`, `First frame`, `Rewind`, `Reset`, and `Stop`. All web apps obtain these icons from [../../../src/runtime/TransportControlIcons.js](../../../src/runtime/TransportControlIcons.js).

The runtime owns:

- the six 24x24 SVG definitions;
- the 18x18-compatible monoline rendering contract: `currentColor`, 2px stroke, rounded caps and joins, no fill;
- icon replacement inside icon-only or icon-and-label buttons;
- synchronized `aria-label`, `title`, tooltip, and `aria-pressed` presentation.

App runtimes own only the action semantics, placement, enabled state, and any app-specific accessible-name suffix such as `Play replay`.

## Semantic Contract

| Control | Required behavior |
| --- | --- |
| `Play` | Start or resume from the current playhead. |
| `Pause` | Hold at the current playhead. |
| `First frame` | Move to the earliest available frame and remain paused. |
| `Rewind` | Move backward without restoring unrelated runtime state. |
| `Reset` | Restore the named simulation or replay scope to its defined initial state; the accessible or visible label identifies narrower scope such as `Reset time`. |
| `Stop` | End an active run or playback operation whose stopped state is distinct from Pause. |

Play/Pause toggles stay in one location and show the action that clicking will perform. While movement is active, the button displays `Pause` and exposes `aria-pressed="true"`; while movement is held, it displays `Play` and exposes `aria-pressed="false"`.

## Glyph Contract

| Control | SVG geometry |
| --- | --- |
| `Play` | Right-pointing triangle. |
| `Pause` | Two independent vertical strokes at x=8 and x=16. |
| `First frame` | Vertical start bar plus left-pointing triangle. |
| `Rewind` | Two left-pointing triangles. |
| `Reset` | Counterclockwise circular arrow. |
| `Stop` | 10x10 square with a small corner radius. |

Unicode media characters, `||`, CSS pseudo-element drawings, app-local SVG path constants, and duplicated inline transport SVG are non-conforming.

## Migrated Surfaces

| Surface | Controls on the shared path | Notes |
| --- | --- | --- |
| Borg | Play/Pause toggle, First frame | Reset View remains a camera action, not a transport control. |
| Animator | Play/Pause toggle, First frame | The former `Restart` label was the First-frame action: it moves to the scene start and remains paused. |
| Causal Delay Feedback | Play/Pause toggle, Reset | The former separate Play and Pause buttons are one fixed-location toggle. |
| Ideal Braid | Play/Pause toggle | Reset View remains a camera action. |
| Photon | Play/Pause toggle, Play result, Reset time | Reset all and Reset preset remain parameter actions. |

## Verification

- `node --test tests/transport-control-icons.test.js`
- focused runtime tests for each migrated app;
- browser interaction checks that compare the visible icon, accessible name, and actual run state before and after each click;
- repository searches showing no migrated app-local transport paths, CSS glyphs, or Unicode/text media symbols remain.
