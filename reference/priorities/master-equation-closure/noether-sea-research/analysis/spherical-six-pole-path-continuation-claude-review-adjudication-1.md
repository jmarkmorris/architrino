# Six-pole path continuation, review: adjudication 1 (design of the support's repaired end-instant cover, receval v5)

Written 2026-10-20 by the review role after my freeze ([reference](spherical-six-pole-path-continuation-claude-review-reference.md), sha256 `91751abc1c547a29f6bbe8d3f4d1562bc868162169f25b6d09e1355a843d69ea`, frozen 21:01:39 UTC). Code reading only; no Python run.

**Subject.** [receval v5](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v5.py), sha256 `2756db628afc892a857eee56d2e8d79858d137f4566c685a6fe7b397fdcc8acd` (read at 21:02:50 UTC). I diffed it against the frozen October receval v4 (`094cd08243d65bca6def3542958470b2c9fd2acfab9e3d3622312154348bd5ab`, verified). The diff matches the header's change list C1–C5; the rest is v4 byte for byte. The base chain it executes, `…-support-chain486-iv.py`, has sha256 `4d22a785fe85fe683f28c90050716f50ba3f6eec177048cacafc2f776b6caec8` and is executed without a hash pin; the receipt should record it.

## 1. Against my reference section 2 (derived from the code)

- **Outer edges exact, internal edges shared (2.1).** `cover_1d` sets the first edge to `lo(x)` and the last to `up(x)` and computes each internal edge once and uses it for both neighbours. This meets 2.1.
- **Explicit verifier.** `cover_ok` requires the first lower end to equal `lo(x)`, the last upper end to equal `up(x)`, every piece to be non-empty and inside `x`, and consecutive pieces to touch or overlap. Together these give union $=x$ (derived). A failed check refuses the evaluation rather than warning. A rounded internal edge that broke the order would make a piece empty, which is refused.
- **Product cover.** Covers of the $q$ box and the $w$ box give a cover of their product (derived).
- **Outward parsing (2.2, fourth bullet).** `box_out` and `end_time_out` read the decimal strings with floor and ceiling. They then check in exact rational arithmetic that the binary box contains the decimal box, and refuse otherwise. The end time's lower edge is $\underline t_{\mathrm{int}}+\min(\Delta,\lfloor0.01\rfloor)$, added as intervals. This closes the second one-ulp route, which I had flagged in the reference and which the October review had not named.
- **Root ranges per piece (2.2, fifth bullet).** The whole-box source range is proved first (`contractX` with its residual-sign straddle check on the recorded range). Each piece is then contracted from that range without a fresh check. That is valid by inclusion: each piece lies inside the box. The contraction $S\leftarrow(t_e-r_c(q,q(S)))\cap S$ keeps the root, and an empty result refuses.
- **The end time is whole.** It is not subdivided.

## 2. Controls (design read; outcomes not yet seen)

- **V0.** The outward reading contains five known decimals, with a nearest-rounded negative.
- **V1 (known).** Stationary partners give exact roots $t-r_c(q,0)$. The extremes sit at the corners by the monotonicity of each $r_c$ on $q\in[0.30,0.50]$; I checked the monotonicity by hand. The law $q+2w$ has the exact image $[0.7,1.02]$, whose upper end is attained only at the corner $(0.50,0.26)$. The control requires the hull to contain the image with an excess below $10^{-25}$, and each piece's contracted range to contain its exact root range. The $10^{-25}$ bound also has teeth for working precision: a low interval precision would fail it.
- **V2 (dropped edge).** A dropped top strip is refused. With the check bypassed, the same cover misses the exact image, so the check has teeth.
- **V3 (interior gap).** An interior gap is refused.
- **V4 (beyond the box).** A piece beyond the box is refused.

V1 uses an override law, so it qualifies the cover and root path but not the physical law. The law path is the October-qualified P1–P9, which v5 leaves unchanged. Together these meet the controls I asked for in reference section 2: a known exact image, a dropped edge with teeth, and the edge rules.

## 3. Ruling

**DESIGN ADMITTED.** The repaired cover of receval v5 satisfies my cover condition (reference 2.1) and closes both one-ulp routes: the rounded last edge, and the inward decimal reading.

Two conditions apply before the narrower bracket can be certified:
- **(a) Controls.** A saved controls record in which P1–P9 and V0–V4 all pass, made before any target row.
- **(b) Target rows.** Rows for steps 412 and 431 made by `end_instant` with no override, from the reconstructed records r1–r5 (`recon`). They must prove $\sup l'(t_{412})<0$ and $\inf l'(t_{431})>0$, and the per-row diagnostic must show the cover check passed.

The bracket ruling itself follows in a later adjudication.

**Note (inferred, harmless).** If the bypassed run in V2 returned `None` for a reason other than the cover, the "teeth" flag would be false and V2 would fail. Such a failure would be visible, never silent.

**Falsifiers.** A controls record in which any V or P control fails. A target row produced with `check_cover=False` or with an override law. A recorded end box whose decimal bounds are not contained in the binary box used.
