# A1.1 Outer-Radius One-Band Expansion Diagnostic

Date: `2026-07-28`

Status: `evaluated-diagnostic`, `complete-36-channel-accounting`, `continuous-projection-monotonicity-certified`, `null-score`, `prescribed-path-only`, `diagnostic-only`, and `priority-only`.

## Scope and predeclaration

This receipt records the first controlled radius-box expansion from the certified A1.1 baseline. The exact baseline is

$$
\frac{7}{8}\le\alpha_1\le\frac{15}{16},
\qquad
\alpha_2=1,
\qquad
\frac{17}{16}\le\alpha_3\le\frac{9}{8}.
$$

Only the adjacent outer-radius band

$$
\frac{9}{8}\le\alpha_3\le\frac{19}{16}
$$

was added. The executed combined box is therefore

$$
\frac{7}{8}\le\alpha_1\le\frac{15}{16},
\qquad
\alpha_2=1,
\qquad
\frac{17}{16}\le\alpha_3\le\frac{19}{16}.
$$

The relative phases remain exactly $(0,2\pi/3,4\pi/3)$, the middle radius remains the normalized field-speed pin, and the history reach remains $\chi=9/4$. The original numerical floors, subdivision depth, per-channel and packet resource ceilings, endpoint ownership, fold visibility, null score, and verification/advancement dispositions remain unchanged. No inner-radius expansion, relative-phase variation, second outer band, EOM evolution, energy or action calculation, GR calculation, or candidate selection was authorized.

Plainly: one new strip was appended to the top of the old outer-radius range. Every other coordinate and every old gate stayed fixed, and the run stopped after that strip.

The diagnostic owner is the [expansion protocol](../../../../src/prescribed-path-analysis/protocols/a1-1-outer-radius-band-expansion-protocol.v1.json) executed by the prescribed-only [expansion diagnostic](../../../../src/prescribed-path-analysis/A11OuterRadiusBandExpansionDiagnostic.mjs). The instrument reuses the canonical root-sheet enclosure implementation rather than introducing a second interval root finder.

## Exact baseline control

The original radius box was re-executed as an exact control before the expanded box was adjudicated. All sealed identities reproduced:

| Baseline artifact | Reproduced hash |
| --- | --- |
| Root-sheet result | `7d930245906fef42966a883d93e8afddb57b7d4320acd1d5c1be25f776d45e1e` |
| Root-sheet summary | `d43a763f11198a0bb2d1ce29eed8462ae08576980a739fecd72788d2c5b2a74a` |
| Structural-ledger result | `e0fb41da7fa55f3ee73cd41e00aa8c66232b071415db122f5395a0f691c2b316` |
| Structural-ledger summary | `8293182ca383dd9414de1a01b42945da937b9ce904bf91e20d74324cc4c27474` |
| Structural raw ledger | `e28835c1df045bfbbbbc3f419b7a31b1474d0bc51e99381a0bd54e75fa4be4b4` |
| Projection result | `75de3038ee36b4058ae86a44f1045b421a344f4cd3c91cb1cf080ba00758a447` |
| Projection summary | `15a8c88c64792797f6b4bae16cd9876ad1cde4a3a56bac7133a09382fa9152df` |

Plainly: the control did not merely resemble the earlier baseline. It reproduced the exact retained hashes before the added strip was considered.

## Complete expanded root inventory

All $36$ ordered channels received continuous diagnostic dispositions over the combined box:

| Channel class | Ordered channels | Continuous disposition |
| --- | ---: | --- |
| Same-transmitter self | $6$ | Four no-root rows; two outer one-root rows |
| Same-binary opposite endpoint | $6$ | One root on every row |
| Inter-binary representatives | $12$ | One root on every representative |
| Exact endpoint-inversion reuse | $12$ | One root on every paired row |
| Unresolved | $0$ | None |

The outer self-root remains unique over $17/16\le\alpha_3\le19/16$. At the new upper boundary its independently recomputed point root is $\delta=1.9957843567706544$, and the uniform history-edge residual upper bound remains negative at `-0.10711446401464908`. The eight sampled same/partner roots had maximum independently recomputed normalized residual $5.614171478762693\times10^{-16}$.

Plainly: the radius-sensitive outer self root moved later in the retained history, as expected, but it did not reach the history edge, disappear, split, or become unresolved anywhere in this band.

The twelve inter-binary representatives used the same exact sub-field charts and interval fold-exclusion rules as the baseline treatment. The run evaluated $6{,}124$ fold boxes and $384$ anchor boxes, reached maximum depth $12$, and left no unresolved box. The endpoint proof at the history edge retained the strict squared-residual margin

$$
\left(\frac{35}{16}\right)^2-\left(\frac94\right)^2
=-\frac{71}{256}<0.
$$

The synthetic exact fold remained unresolved, and the deliberate one-box resource exhaustion returned `drawn-not-evaluated` with null score and visible unresolved boxes.

Plainly: every possible inter-binary root remains before the old history edge, and the interval treatment finished without raising a cap. The negative controls still stop rather than manufacturing an answer.

## Continuous phase-projection monotonicity

The exact shared-coordinate polynomial bound remains positive for the outer-transmitter class:

$$
P\ge\frac{1023}{16384}>0.
$$

The middle-transmitter projection enclosure remains unchanged. For the expanded outer-transmitter interval, conservative continuous bounds are

$$
-\frac{1023}{106112}
\ge
\left.\partial_\delta G\right|_\theta,
\qquad
-\frac1{64}
\ge
\left.\partial_\delta G\right|_\epsilon,
$$

and therefore

$$
\frac{33}{28186}
\le
\frac{d\theta}{d\epsilon}
\le
\frac{829}{2}.
$$

All six emission-fixed ordered channels retain one root and a strictly positive receiver-phase projection derivative over the full combined radius box and phase circle. Endpoint inversion produced zero enclosure difference across $324$ comparisons. The $36$ phase-seam replays differed by at most $1.9984014443252818\times10^{-14}$ against the unchanged $10^{-12}$ tolerance.

Plainly: reception phase still advances continuously with emission phase; it does not reverse or double back anywhere in the added strip.

Twelve independently recomputed boundary witnesses covered the old/new seam $\alpha_3=9/8$ and the new upper boundary $\alpha_3=19/16$. Their largest normalized residual was $6.139621386711707\times10^{-16}$. The largest finite-difference differences from the primary reception-fixed and emission-fixed squared derivatives were respectively $6.369695881858206\times10^{-10}$ and $2.7829294424464024\times10^{-10}$, both below the unchanged $10^{-6}$ tolerance.

Plainly: a separate coordinate residual and finite-difference derivative check agreed at the expansion boundaries. This is diagnostic implementation cross-checking, not independent physical acceptance.

## Evidence identity and stop boundary

The protocol hash is `ba964f401401b36a46e96683e7329fa21ac13ce04331d1c909648a6df237b8bd`. The result hash is `389fe1a37065198fe4f6c5139b9359c733b22a08dd5f800c2e7d66703977bc57`. The [durable summary](a1-1-outer-radius-band-expansion-summary.v1.json) hash is `a8c789f826ff286ef01f02f0a9aacc6faa72991e5e8535a436bc0531027eb23a`. The ignored complete ledger is `.local-data/braid-program/a1-1/a1-1-outer-radius-band-expansion.v1.json.gz`. The replay command is:

```bash
node scripts/prescribed-path-analysis/run-a1-1-outer-radius-band-expansion.mjs --check
```

The predeclared one-band execution stopped after $\alpha_3=19/16$. The first uncertified boundary is therefore

$$
\alpha_3>\frac{19}{16}.
$$

No conclusion is made beyond that boundary, and no second band was executed.

Plainly: the first expansion succeeded, but the result ends exactly at $19/16$. Nothing here says what happens at a larger outer radius.

## Claim boundary

This is a null-score prescribed-path diagnostic result for imposed circular geometry. It does not establish retention, stability, binding, physical superluminal transport, physical realization, energy, action, angular-momentum dynamics, radiation, pressure, GR recovery, or physical candidate selection.

Plainly: the calculation certifies root bookkeeping and chart monotonicity for a wider drawing family. It does not show that the EOM solver or nature follows any of those paths.
