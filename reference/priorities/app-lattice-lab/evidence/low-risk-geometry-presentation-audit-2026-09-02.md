# Lattice Lab Low-Risk Geometry and Presentation Audit

Date: 2026-09-02

## Scope and authority

This audit closes LAT-017, LAT-027, LAT-028, LAT-030, and LAT-066 without changing lattice coordinates, relationship enumeration, polarity assignment, cameras, calculation paths, certificates, or evidence authority. The only executable-source change is independent test coverage in `tests/lattice-lab-runtime.test.js`; the app runtime and case data are unchanged.

The checks establish coordinate geometry, display identity partitioning, orthographic projection behavior, and synchronized interaction behavior. They do not establish motion, stability, retention, conservation, energy, or any broader physical claim.

## LAT-027 and LAT-028 — Highlight identity partition

Fresh browser inspection at the `1280 × 720` operator viewport used the default Simple Cubic case. With `Highlight repeat cell` off, the main display exposed `144` ordinary relationship identities, `0` suppressed identities, and the unchanged canonical set of `15` repeat-highlight identities. With the control on, the display exposed `129` ordinary identities and suppressed exactly the `15` canonical highlighted main-edge identities. The sets satisfied all three exact conditions:

- the off-state ordinary set equals the disjoint union of the on-state ordinary set and suppressed set;
- the on-state ordinary and suppressed sets are disjoint;
- the suppressed set equals the canonical highlighted main-edge set.

The live overlap counter remained `0`. Visual inspection confirmed that the violet selected edges had no thin ordinary center stroke, while ordinary light-purple relationships remained visible elsewhere. The checkbox remained accessible and defaulted off after reload. No geometry or edge identity changed.

The exact selected/suppressed identity set was:

```text
site-2-3-4|site-3-3-4
site-3-2-4|site-3-3-4
site-3-2-4|site-4-2-4
site-3-3-3|site-3-3-4
site-3-3-3|site-4-3-3
site-3-3-4|site-3-3-5
site-3-3-4|site-3-4-4
site-3-3-4|site-4-3-4
site-3-3-5|site-4-3-5
site-3-4-4|site-4-4-4
site-4-2-4|site-4-3-4
site-4-3-3|site-4-3-4
site-4-3-4|site-4-3-5
site-4-3-4|site-4-4-4
site-4-3-4|site-5-3-4
```

## LAT-030 — Full three-dimensional synchronized rotation

The focused trackball test constructs two non-collinear drags, requires a unit quaternion with a nonzero roll component, and proves that the projected Y axis can acquire a horizontal component. Source-contract checks require the main, unpolarized, and polarized-repeat roots to consume the same main quaternion on every render and require both case entry and reset to restore the same default orientation and orthographic half-height.

In the fresh browser pass, a curved drag changed the exposed Euler summary from `-0.77453,-0.00000,0.91597` to `-1.19460,0.27765,0.83702`. The projected X, Y, and Z axes then had horizontal spans of `54.10px`, `60.00px`, and `23.02px`; every label remained `10px` beyond its positive endpoint. A wheel gesture changed the main orthographic half-height from `3.72308` to `4.02092`, and the highlight state remained enabled through the interaction. The selected-site accessible label remained intact. Visual inspection confirmed matching orientation among the main lattice, unpolarized companion, polarized repeat view, and lower-left key.

## LAT-017 — Diamond coordinate and projection audit

An independently written pairwise enumerator reconstructed all `79` displayed Diamond nearest-neighbor identities and matched the runtime's canonical main-edge set exactly. For each of the eight conventional-cell basis orbits, a representative ideal interior site had exactly four neighbors at distance $d$ and twelve next-shell sites at distance $4d/\sqrt{6}$. Every nearest neighbor had the opposite declared polarity. The periodic two-site owned cell produced eight directed nearest-neighbor relationships, four from each owned site, all at distance $d$ and all to the opposite polarity. Its rendered repeat graph contained seven unique undirected edges. The unpolarized conventional-cell presentation contained sixteen relationship segments, each at distance $d$.

No $4d/\sqrt{6}$ next-shell relationship entered any nearest-neighbor graph. The apparent length difference is therefore a projection effect: an orthographic camera preserves scale at depth, but the screen receives only the rotated edge's X/Y components, so differently oriented equal world-space edges can have different projected lengths.

## LAT-066 — Default/reset/reload screen-spacing audit

All deterministic cases use exact world-space nearest-neighbor distance $d$. At the fresh `1280 × 720` viewport, the main canvas was `866.61 × 720px`, each repeat canvas was `190 × 190px`, every case-entry and reload state used rotation `-0.77453,-0.00000,0.91597`, orthographic half-height `3.72308`, and deformation factor `1`. The source contract gives reset the same values. At that shared orientation, independent projection of the exact displayed edge identities produced these center-to-center pixel ranges:

| Case | Main edges | Main projected range | Repeat edges | Repeat projected range |
| --- | ---: | ---: | ---: | ---: |
| Simple Cubic | 144 | `67.626–87.484px` | 15 | `35.255–45.607px` |
| Body-Centered Cubic | 311 | `19.785–95.548px` | 15 | `10.314–49.811px` |
| Face-Centered Cubic | 515 | `42.615–96.292px` | 63 | `22.216–50.199px` |
| Hexagonal Close-Packed | 509 | `17.278–96.288px` | 63 | `9.361–52.166px` |
| Simple Cubic Alternating Planes | 144 | `67.626–87.484px` | 15 | `35.255–45.607px` |
| Diamond Cubic | 79 | `19.785–95.548px` | 7 | `12.295–59.378px` |

These ranges are expected orientation-dependent foreshortening, not unequal world-space spacing, perspective scaling, or a geometry defect. Clipping shortens visible line segments at their fixed-size marker endpoints but does not change center spacing or canonical edge length. Random 50/50 shares the same exact simple-cubic world spacing and main-view projection contract, but has no applicable repeat panel.

## Validation receipt

- `node --test tests/lattice-lab-ledger-presentation.test.js tests/lattice-lab-runtime.test.js tests/lattice-lab-bcc-neighbor-graph.test.js tests/lattice-lab-random-finite.test.js tests/lattice-lab-periodic-gallery.test.js` passed `75/75`.
- Fresh browser checks covered highlight off/on identity partitioning, selected-edge precedence, all seven case-entry/reload states, full-3D drag, Y-axis tilt, synchronized rendered consumers, wheel zoom, selected-site accessibility, responsive layout at `1280 × 720`, and visual inspection of the highlighted and rotated states.
- The fresh browser warning/error log was empty.
- `git diff --check` passed after queue and work-log reconciliation.

## Queue provenance finding

The number `72` was a status census, not evidence of seventy-two separate operator requests. It was computed as `66` queued/requested + `4` in progress + `1` awaiting verification + `1` deferred/blocked.

Git history shows that the queue began with LAT-001 in commit `aa451b8c3` and expanded in large batches through commits including `5147ef77b`, `61aaa41d9`, `1afa9b748`, and especially `036e613bc`. Those bulk commits are authored by `Receipt Test <receipt-test@example.invalid>`. Pull request 233 later squash-merged the assembled work under the operator's GitHub identity, with `Receipt Test` recorded as co-author. The merged queue already contained `96` unique LAT identifiers. Later bookkeeping, closures, supersessions, and additions produced the `72` unresolved snapshot.

Therefore the ledger rows should be understood as agent-authored decomposition and acceptance bookkeeping accumulated during the Lattice Lab implementation. Some rows quote or summarize operator feedback, but the ledger itself does not prove that the operator originated every row or its detailed acceptance expansion.
