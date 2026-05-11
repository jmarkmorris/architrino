# $A_0$ Branch Certificate Protocol

This protocol defines the simulation-facing handoff for the $A_0$ reference attractor described in [Particle Masses](../../assemblies/particle-masses.md#reference-attractor-gate), [Tri-Binary Dynamics](../../dynamics/tri-binary-dynamics.md), and [Energy](../../dynamics/energy.md). It specializes the general [Simulation Run Protocols](run-protocols.md) to the first neutral rest-branch tri-binary mass-map target.

The protocol does not treat $A_0$ as a particle label. It treats $A_0$ as a calibration-free branch certificate problem: find a finite, stable, multi-scale causal-root ledger before energy, shielding, medium response, or mass comparisons enter.

## Tier 0: Algebraic Branch Search

Tier 0 is a reduced branch-search pass. It samples diagnostic carrier charts, solves delayed root equations on those charts, classifies internal terms, and emits candidate rows. It does not claim a physical attractor.

Required inputs:

- homogeneous Noether-Sea cell with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and primitive wake speed $c_f$;
- layer labels $\ell\in\{I,M,O\}$ and polarity labels $\sigma\in\{+,-\}$;
- scale ratios $\varepsilon_{IM}=R_I/R_M$ and $\varepsilon_{MO}=R_M/R_O$;
- speed offsets enforcing $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$;
- candidate handedness tuple and carrier ellipticity;
- $\eta>0$, sampling resolution, and history-window rule.

Required outputs:

| Output | Meaning |
| --- | --- |
| `branch_label` | layer windings, inter-layer closure integers, handedness, and active root-branch summary |
| `closure_labels` | declared $T_{\mathbf{k}}$, winding integers, inter-layer closure integers, and active root classes |
| `state_vector` | reduced geometry, frequencies, phase offsets, carrier chart, and center gauge |
| `root_ledger` | active and raw partner, self, and inter-layer root counts with delays, branch Jacobians, separator flags, and excluded near-zero self roots separated |
| `term_classification` | terms assigned to averaging, locking, and leakage channels |
| `residuals` | $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, and $\mathcal{R}_{\text{Floquet}}$, each with value, tolerance, status, role, and note fields |
| `certificate_gates` | pass/fail promotion gates for speed ordering, phase closure, bounded carrier residuals, active root defects, active root-ledger completeness, active separator-root handling, near-zero self-root handling, residual semantics, and Tier 0 continuation |
| `failure_code` | reason the row failed, or `candidate` if it survives Tier 0 |

Tier 0 passes only if at least one row has a finite causal-root ledger, correct speed ordering, bounded carrier residuals, no unclassified separator term, and a complete residual vector. Passing Tier 0 only authorizes Tier 1 continuation.

### Near-Zero Self Roots

Tier 0 must distinguish raw self-root sightings from active self-hit branches. A self root at the configured near-zero delay threshold is recorded in the raw ledger but excluded from the active ledger as an instantaneous self-kick artifact under the convention $H(0)=0$.

Such a root may not count as self-hit closure unless a later regularized fold-layer model explicitly accepts it with a named branch condition, tolerance, and promotion rule. Until that model exists, near-zero self roots block Tier 0 promotion rather than satisfying the self-hit branch requirement.

The reader-facing interpretation of these rows is in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md).

## Tier 1: $\eta>0$ Continuation

Tier 1 promotes a surviving Tier 0 row into direct delayed dynamics with the regularized wake kernel still active. It must preserve the absolute-frame logging standard.

Required checks:

1. direct evolution over at least one declared $T_{\mathbf{k}}$;
2. root-ledger stability under $\Delta t$ and history-window refinement;
3. persistence of averaging, locking, and leakage classifications;
4. no secular center drift after symmetry modes are removed;
5. monodromy or finite-difference return-map estimate with symmetry modes quotiented;
6. positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$;
7. convergence under the standards in [Convergence Tests](convergence-tests.md).

Tier 1 passes only if the same branch remains stable before any $\eta\to0^+$ extrapolation.

## Tier 2: Energy and Shielding

Tier 2 begins only after Tier 1 passes. It computes the internal-energy ledger and far-field shielding extraction described in [Energy](../../dynamics/energy.md). The required outputs are:

- $E_I$, $E_M$, $E_O$, and $E_{\text{internal}}(A_0)$;
- interaction and wake/history bookkeeping with no double counting;
- far-field wake coefficients over extraction radii and angular grids;
- $\zeta(A_0)$ from the leading isotropic projection;
- anisotropic leakage retained as a separate tensor or channel list.

Tier 2 fails if particle masses, charged-lepton ratios, electron radius, or measured $\alpha$ enter as inputs.

## Tier 3: Medium-Response Probe

Tier 3 begins only after Tier 2 passes. It applies small acceleration and gradient probes to the accepted branch and extracts the homogeneous baseline for $\mathcal{M}_{\text{sea}}^{ab}$. The probe must report whether the acceleration and gradient channels share the same shielded-energy coefficient to first order.

## Runtime Artifact

The first reduced Tier 0 artifact is `scripts/mass-map/a0-tier0-branch-search.mjs`, with default grid `scripts/mass-map/a0-tier0-default-grid.json`. It is an algebraic branch-search scaffold, not a production simulator. Its required role is to emit candidate rows with parameter choices, carrier diagnostics, root ledgers, term classifications, leakage placeholders, and failure codes matching this protocol.

The companion audit is `scripts/audit-a0-mass-map-promotion.mjs`. It scans AAA and mass-map priority prose for premature statements that treat $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted before the Tier gates pass.

## Acceptance Boundary

The $A_0$ branch is not an attractor until Tier 1 passes. It is not a mass-map result until Tier 2 passes. It is not an inertial-response result until Tier 3 passes.
