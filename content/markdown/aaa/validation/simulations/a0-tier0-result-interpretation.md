# $A_0$ Tier 0 Result Interpretation

This note explains how to read the first reduced $A_0$ branch-search artifact. It is a companion to the [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), the general [Simulation Run Protocols](run-protocols.md), and the convergence standards in [Convergence Tests](convergence-tests.md).

The Tier 0 artifact is not an attractor proof. It is a certificate-facing filter that decides whether a reduced carrier chart is disciplined enough to seed Tier 1 $\eta>0$ continuation. Its output should be read together with the mass thesis in [Particle Masses](../../assemblies/particle-masses.md), the energy ledger definitions in [Energy](../../dynamics/energy.md), the dynamics baseline in [Tri-Binary Dynamics](../../dynamics/tri-binary-dynamics.md), and the closure bookkeeping in [Parameter Ledger](../parameter-ledger.md).

## Output Status

The runtime artifact is `scripts/mass-map/a0-tier0-branch-search.mjs`. It emits rows with three separate layers of interpretation:

| Output layer | Meaning | Promotion role |
| --- | --- | --- |
| `root_ledger` | Active and raw causal-root counts by source relation, with excluded instantaneous self-root counts separated from active roots | Decides whether the carrier chart has a finite active partner, self, and inter-layer ledger |
| `residuals` | A residual vector whose entries carry value, tolerance, status, role, and explanatory note | Prevents a numerical value, a diagnostic placeholder, and a later-tier obligation from being confused |
| `certificate_gates` | Pass/fail status for the Tier 0 promotion checks | Decides whether the row may seed Tier 1 continuation |

A row with status `tier0_continuation_ready` may seed Tier 1. A row with status `tier0_rejected` does not seed Tier 1 until the failing gate is resolved. Neither status accepts an attractor, computes $\zeta(A_0)$, validates $E_{\text{internal}}(A_0)$, or derives $\mathcal{M}_{\text{sea}}^{ab}$.

## Near-Zero Self-Root Policy

The Tier 0 scanner distinguishes raw self-root sightings from active self-hit branches. A raw self root whose delay lies at the configured near-zero threshold is recorded but excluded from the active ledger as `excluded_instantaneous_self_kick`.

This policy follows the canonical convention $H(0)=0$: an instantaneous self-kick is not an active causal hit. The exclusion is conservative. It does not prove that no nearby regularized fold-layer branch exists; it says only that the diagnostic carrier has not yet supplied a positive-delay self-root branch that can be promoted.

If later work introduces a regularized fold-layer model that accepts such roots, that model must name its branch condition, tolerance, and promotion rule. Until then, near-zero self roots block Tier 0 promotion rather than counting as self-hit closure.

## Residual Semantics

The Tier 0 residual vector deliberately includes entries that are not computed at Tier 0:

| Residual | Tier 0 interpretation |
| --- | --- |
| $\mathcal{R}_{\text{state}}$ | Carrier-chart return mismatch over one declared period |
| $\mathcal{R}_{\text{root}}$ | Active root defect on retained causal-root branches |
| $\mathcal{R}_{\text{phase}}$ | Integer layer-winding mismatch |
| $\mathcal{R}_{E}$ | Not computed at Tier 0; Tier 1 or Tier 2 must supply a regularized energy/history functional |
| $\mathcal{R}_{\text{drift}}$ | Centering check for the diagnostic chart; Tier 1 must retest under direct delayed dynamics |
| $\mathcal{R}_{\text{speed}}$ | Sign-aware violation of the intended $s_I > c_f$, $s_M \approx c_f$, $s_O < c_f$ ordering |
| $\mathcal{R}_{\text{avg}}$ | Diagnostic size of terms claimed to average out |
| $\mathcal{R}_{\text{lock}}$ | Diagnostic fraction or defect of retained locking terms |
| $\mathcal{R}_{\text{leak}}$ | Far-field leakage placeholder, not a shielding extraction |
| $\mathcal{R}_{\text{Floquet}}$ | Not computed at Tier 0; Tier 1 must construct the monodromy diagnostic |

This makes the residual vector complete as an audit surface without pretending that Tier 0 has done Tier 1 or Tier 2 work.

## Promotion Boundary

Tier 0 can only answer a finite branch-search question: does this reduced carrier chart have an active root ledger, controlled chart residuals, and no unresolved near-zero self-root obstruction?

It cannot answer the attractor question, because that requires Tier 1 direct delayed dynamics and a positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$. It cannot answer the mass-map question, because that requires Tier 2 energy and shielding extraction. It cannot answer the inertial-response question, because that requires Tier 3 acceleration and gradient probes for $\mathcal{M}_{\text{sea}}^{ab}$.

The safe reading is therefore:

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{eligible for Tier 1 continuation},
$$

not

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{accepted } A_0 \text{ attractor}.
$$

This boundary is the main protection against premature mass-map promotion.
