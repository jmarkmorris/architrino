# phase-varying display representative Independent Interpolation Enclosure

Status: **accepted independent enclosure** for the exact operator-approved phase-varying display representative prescribed row. This packet closes only the analytic-to-cubic uncertainty widths required by the clean `H3` restart predeclaration.

## Frozen identity

- Approved phase-varying display representative source: `reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json`, SHA-256 `e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb`.
- `H3` restart predeclaration: `reference/priorities/braid-program/evidence/2026-08-26-f5-enclosed-root-restart-predeclaration.md`, SHA-256 `1bc458d0b80c0a4f9e5b5c22e83d7e360306f020526296a937ae26742a6296e5`.
- Independent guard instrument: `scripts/eom/analyze-f5-phase-varying-guard-margin.mjs`, SHA-256 `aab128d5abbd248fb1879ad6dba71844951593b3ef636d67742729bbff886dfd`.
- Production prescribed-worldline operator: `src/prescribed-geometry/PrescribedWorldlineOperators.mjs`, SHA-256 `f641daba8184c7e997478494d1642291d40fd6a6d365c289c6ee8b6637ef0a01`.
- Independent enclosure instrument: `scripts/eom/derive-f5-independent-interpolation-enclosure.mjs`, SHA-256 `c59190e94c196e78b5f4e53ee0cca7f4e8395fedf66e92d0c5dd4efb544d95f1`.
- Deterministic full report SHA-256: `2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9`.

Plainly: these hashes bind the approved geometry, the earlier restart contract, and an independently authored enclosure calculation. A change to any bound file invalidates this acceptance until the enclosure is rerun and reviewed.

## Derived result

The instrument covers all twelve members and all three Cartesian coordinates on `[-1,19.63359163663986]`, a strict superset of the serialized display interval. It partitions the interval into 1,032 uniform segments of width `0.01999379034558126`, encloses factorial-normalized derivatives through order four with outward-rounded interval arithmetic, and obtains the global coordinate fourth-derivative bound

$$
M_4=0.286965499706333.
$$

Using the predeclared divisors and the sixty-four-unit binary64 roundoff reserve, the accepted per-coordinate cubic-Hermite widths are

$$
\varepsilon_x=1.528724905003159\times10^{-10},
\qquad
\varepsilon_v=2.866983034112353\times10^{-7}.
$$

Plainly: every stored cubic segment may differ from the exact analytic phase-varying display representative path by at most these declared position and velocity widths under this instrument. These widths are the uncertainty inputs for the separately authored root adapter; they are not zero-width nominal-copy tolerances.

All six primitive controls—constant, polynomial, sine, cosine, reciprocal, and positive square root—passed with zero failures. The enclosure made 24,769 positive-square-root interval calls; the smallest input lower bound was `0.028432685765938433`, so no square-root domain boundary was contacted. The dense bug check evaluated 65,536 samples per member, totaling 786,432 member evaluations and 2,359,296 scalar residuals per quantity. Its largest position residual was `8.107559068548653e-11`, its largest velocity residual was `1.2485302874898352e-8`, and neither quantity escaped its interval width.

Plainly: the primitive mathematics passed its known controls, and a much denser direct comparison stayed inside the proved widths. The dense samples are a bug detector; the interval derivative calculation supplies the enclosure authority.

## Falsifiers and boundary

The declared falsifiers are source mismatch, primitive-control failure, a nonpositive square-root interval, a nonfinite interval, dense position escape, or dense velocity escape. All were false in two byte-identical reproductions of the final instrument.

This packet establishes an independent analytic-to-cubic interpolation enclosure for the frozen prescribed phase-varying display representative row. It does not establish complete causal-root accounting, `H3`, ordinary EOM evolution, binding, retention, stability, candidate promotion, score change, particle identity, or physical realization.

## Reproduction and next action

Run the instrument with a new output path:

```bash
node scripts/eom/derive-f5-independent-interpolation-enclosure.mjs \
  --out .local-data/braid-analysis/f5-independent-enclosure/<new-run-id>.json
```

The output is create-exclusive. A separately authored clean root adapter may now bind the two accepted widths and execute the unchanged 8/32/128 complete-root ladder. The adapter must not import this independent instrument, accept caller-supplied hash tokens, or alter the frozen scientific row or root protocol.

Plainly: the enclosure prerequisite is closed. The next engineering task is to connect these fixed widths to a clean adapter; the next scientific task is still the predeclared `H3` root audit.

Closure goal: preserve the exact enclosure and use it unchanged in the separately authored phase-varying display representative `H3` adapter.
