# Equation Closure Pass 2026-06-23 V

## Scope

- `S_eq` retained-domain fiber-product checker hardening.
- `EQ-24` acoustic/elastic same-window diagnostic hardening.
- `EQ-31` finite-window first-exit, null-separatrix, and refinement diagnostics.

## Result

This pass turns three review-derived mathematical obligations into score-neutral executable diagnostics. It does not change any equation score, because every tested lane still lacks accepted retained evidence.

| Lane | New executable diagnostic | Current result |
| --- | --- | --- |
| `S_eq` retained domain | `commonCarrierId`, `fiberProductCarrierPass`, and per-leg carrier statuses in [check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs). | The attempt fixture now has one shared carrier and reports `fiberProductCarrierPass: true`, but still blocks at `missing_accepted_raw_labeled_rows_preserved_on_retained_history`. |
| `EQ-24` density-compression | Provenance-aware `acousticElasticAgreement` output in [noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs). | The retained attempt has `numericAgreementStatus: passed` but `acousticElasticAgreementStatus: attempt_numeric_passed`; first blocker remains `missing_accepted_theta_sea_rho_NS`. |
| `EQ-31` finite-window statistics | `corridorDiagnostics` for first-exit corridor semantics, null-separatrix mass, and refinement cocycle defect in [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs). | The toy has first-exit corridor semantics but remains `toy_structure_only`; first blocker remains `missing_accepted_W`. |

## `S_eq` Fiber-Product Carrier Guard

The retained-domain packet now declares a common carrier id for the attempted $\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$ row family. Accepted future rows and witnesses must match that `commonCarrierId` as well as the same `domainId`.

The checker reports this as a structural diagnostic, separate from accepted evidence:

```text
commonCarrierId: C_02-04_bin_u_attempt_0001
fiberProductCarrierPass: true
fiberProductCarrierReason: accepted
nextBlocker: missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

That separation matters. A packet may have the right fiber-product carrier shape and still be score-neutral if the row bindings are only `attempt`. Conversely, a future accepted-looking packet cannot pass by sharing row labels if its legs do not also share the same common carrier.

## `EQ-24` Acoustic/Elastic Diagnostic

The density-compression runner now distinguishes arithmetic consistency from accepted retained evidence. For one channel $X$ it computes

$$
c_{X,\mathrm{el}}^2=\frac{C_{1111}^X}{\rho_{\text{NS}}},
\qquad
\Delta_{\mathrm{ac/el}}
=
\left|c_{X,\mathrm{disp}}^2-c_{X,\mathrm{el}}^2\right|.
$$

The numeric diagnostic passes when

$$
\Delta_{\mathrm{ac/el}}\le\varepsilon_{\mathrm{ref}}.
$$

The accepted diagnostic passes only when the agreement row is itself accepted, source-backed, and bound to the same window, $\ell$, channel, response kernel, speed row, stress/strain row, $\rho_{\text{NS}}$ row, refinement family, and zero-retune witness.

The current retained attempt intentionally demonstrates the distinction:

```text
numericAgreementStatus: passed
acousticElasticAgreementStatus: attempt_numeric_passed
nextBlocker: missing_accepted_theta_sea_rho_NS
```

## Finite-Window Corridor Diagnostics

The statistical carrier runner now reports the minimal executable form of the finite-window obligations:

- `corridorDiagnostics.firstExit`: corridors must be first-exit boundary components before detector readout; detector kernels enter later as post-escape pushforwards.
- `corridorDiagnostics.nullSeparatrix`: a finite estimate or bound for $\mu_{*,T}(N_\epsilon(\partial\mathcal B))$ must be below tolerance.
- `corridorDiagnostics.refinementCompatibility`: the cocycle defect for restriction/coarse-graining compatibility must be below tolerance.

The current `EQ-31` toy remains useful only as a structure-faithful input shape. It reports first-exit corridor semantics but keeps the separatrix and refinement rows failing, and the score-moving blocker remains accepted retained carrier evidence:

```text
status: toy_structure_only
firstExitCorridorsDeclared: true
nullSeparatrixPassed: false
refinementCompatibilityPassed: false
nextBlocker: missing_accepted_W
```

## Score Disposition

No score changes. This pass is executable burden hardening only:

- `EQ-02`, `EQ-03`, and `EQ-04` remain at `4`.
- `EQ-24` remains at `3`.
- `EQ-31` remains at `2`.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promote only after the same executable diagnostics pass on accepted retained evidence, not on attempt or toy rows.
