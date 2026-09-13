# CRW-005 Signals From Earlier review — 2026-09-13

## Scope and disposition

Full five-line [comic leaf](../../../../content/markdown/aaa/archie/comics/signals-from-earlier.md) read and [original artwork](../../../../content/assets/images/comics/present-has-an-inbox.png) visually inspected with `view_image`. The linked [Path History and Non-Markovian Memory](../../../../content/markdown/aaa/foundations/absolute-time.md#path-history-and-non-markovian-memory) section was read in the live owner. Scoped `git --no-optional-locks status --short -- <leaf>` showed no pre-existing modification. **Unchanged pass:** source and artwork need no warranted repair. Own leaf plus this receipt only; no hub/neighbor, artwork-generation, runtime/generated, or Git publication changes.

Source SHA-256 by `shasum -a 256`: `fa4a52ac5dbf3e6626b9fdcf5ea4a172cc1399cc4f1d87659ce8eeca2f8dd414`.

Artwork SHA-256 by `shasum -a 256`: `a13bccf6db7223dfded4fb6e610adb33f69e3d05c0c2903b32d3ff01dc9c06c2`.

## Observations and findings

| ID | Disposition | Observation and reasoning |
| --- | --- | --- |
| SFE-P1 | Retained | Caption explains path history as the past trajectory record consulted by delayed dynamics. Live absolute-time owner, lines 365–373, states prior emissions, causal wake receptions, acceleration-first interaction, and non-Markovian dependence relative to instantaneous-state descriptions. The caption makes no stronger claim about arbitrary inaccessible future history. |
| SFE-P2 | Retained | Original artwork depicts a train of earlier time labels, envelopes sent earlier/in transit/arriving now, and an inbox carriage. Dialogue notes that some mail remains in transit, while an instant-shortcut character expected same-day delivery. The analogy clearly conveys causal delay. |
| SFE-P3 | Retained | Board rules concern earlier-to-later dependence, paths, and delivery delays. Decorative route branches and time subscripts do not assert a numerical trajectory, integration method, probability sum, or ordering convention requiring correction. No literal all-path quantum amplitude claim is inferred from the joke. |
| SFE-P4 | Retained | The caption's link resolves to the actual path-history heading. The owner distinguishes retained history required by the admitted root domain from an unrestricted finite-memory approximation, consistent with the caption's concise wording. |
| SFE-P5 | Retained | Main title, dialogue, causal rules, and envelope labels were readable in `view_image`. `sips -g pixelWidth -g pixelHeight` measured 1254×1254 pixels. Title/alt text agree; both image links retain the same original target. |

## Checks and limits

A bounded Node link extractor first passed a known linked-image example with both targets `x.png`, then verified all three leaf target paths exist and the two original image targets match. A literal plain-heading slug known case passed before confirming the linked anchor in the actual owner's headings. This plain heading contains no special renderer-dependent math or formatting. `git diff --check HEAD -- <leaf>` passed without source changes; receipt whitespace was checked using `git diff --no-index --check /dev/null <receipt>`.

No mathematical derivation appears in the leaf; no KaTeX, numerical simulation, or external literature check is needed for the analogy. The inspection does not prove delayed-law well-posedness, global history sufficiency, or deployed-browser rendering. The original art and source remain unchanged. No prior-editor attribution was attempted.

**SFE-O1:** Coordinator integrates the unchanged disposition and verifies hashes. Changed owner semantics, heading routing, artwork bytes, or stronger later explanatory claims would invalidate this bounded pass. No further leaf edit is proposed.
