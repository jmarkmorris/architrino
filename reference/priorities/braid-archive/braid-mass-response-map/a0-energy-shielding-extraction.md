# $A_0$ Energy and Shielding Extraction Packet

## Purpose

This packet defines the Tier 2 handoff after a reduced $A_0$ branch certificate passes closure and stability. It ties the branch output to the energy ledger and shielding definitions owned by [Energy](../../../../content/markdown/aaa/dynamics/energy.md).

Tier 2 must not run before Tier 1 produces a stable $\eta>0$ branch with residuals below tolerance and $\Delta_{\mathbf{k}}>0$.

## Inputs

Required inputs from [$A_0$ Reduced Branch Certificate Packet](a0-reduced-branch-certificate.md):

- full branch label $\Lambda$;
- finite causal-root ledger $\mathcal{G}_{A_0}$;
- state vector and history segment over $T_{\mathbf{k}}$;
- residual vector $\mathcal{R}_{A_0}$;
- stability gap $\Delta_{\mathbf{k}}$;
- averaging, locking, and leakage classification;
- refinement schedule for $\Delta t$, history depth, angular sampling, and $\eta$.

## Energy Ledger

The energy packet must report sign-resolved layer and interaction content:

| Quantity | Required data |
| --- | --- |
| Layer kinetic content | $E_{k,I}$, $E_{k,M}$, $E_{k,O}$ by constituent and by cycle average |
| Pair interaction content | partner, self, and inter-layer interaction terms, with active root labels |
| Wake/history content | regularized history term and convergence behavior under $\eta$ and history refinement |
| Self-hit bound diagnostic | retained-history energy-like functional across active self-hit or separator crossings, with variation under $\Delta t$, $\eta$, and history-window refinement |
| Total internal ledger | $E_I$, $E_M$, $E_O$, and $E_{\text{internal}}(A_0)$ |
| Cycle action | action per closed cycle, with branch label $\Lambda$ and period $T_{\mathbf{k}}$ |

The packet must state whether the interaction content is represented through $E_{\text{wake}}$ alone or through a pairwise decomposition plus an explicitly non-overlapping wake term. Mixing both without a non-overlap rule is a double-counting failure.

Cycle action is downstream of the self-hit bound diagnostic. A packet may compare action spacing across the branch family only after the same retained branch keeps its energy-like functional bounded under the declared refinement schedule. If the bound disappears under refinement, the branch remains a well-posedness failure rather than an action-spacing candidate.

## Shielding Extraction

Shielding is extracted only from the accepted branch, not fitted to a particle benchmark. The far-field calculation must report:

$$
\mathcal{L}(\hat{\mathbf{R}})
=
\left\langle
\sum_{a\in A_0}
q_a W_a(t,\hat{\mathbf{R}})
\right\rangle_{T_{\mathbf{k}}},
$$

with angular grid, far-field radii, selected wake channel, and refinement status.

Before reducing this ledger to a scalar coefficient, the packet should also
report the layer-resolved cancellation pattern. For
$\ell\in\{I,M,O\}$, define the instantaneous layer contribution

$$
\mathcal{L}_{\ell}(t,\hat{\mathbf{R}})
=
\sum_{\sigma\in\{+,-\}}
q_{\ell,\sigma}W_{\ell,\sigma}(t,\hat{\mathbf{R}}),
\qquad
\mathcal{L}_{\ell}(\hat{\mathbf{R}})
=
\left\langle
\mathcal{L}_{\ell}(t,\hat{\mathbf{R}})
\right\rangle_{T_{\mathbf{k}}}.
$$

The accepted branch must then satisfy

$$
\mathcal{L}(\hat{\mathbf{R}})
=
\mathcal{L}_{I}(\hat{\mathbf{R}})
+
\mathcal{L}_{M}(\hat{\mathbf{R}})
+
\mathcal{L}_{O}(\hat{\mathbf{R}})
$$

on the same extraction radius, angular grid, wake channel, and cycle window.
The useful synchronization readout is the dimensionless cancellation ratio

$$
\mathcal{R}_{\mathrm{cancel}}
=
\frac{
\left\|
\Pi_0
\left(
\mathcal{L}_{I}
+
\mathcal{L}_{M}
+
\mathcal{L}_{O}
\right)
\right\|
}{
\left\|\Pi_0\mathcal{L}_{I}\right\|
+
\left\|\Pi_0\mathcal{L}_{M}\right\|
+
\left\|\Pi_0\mathcal{L}_{O}\right\|
+
\varepsilon_{\mathcal{L}}
},
\qquad
\varepsilon_{\mathcal{L}}>0.
$$

This ratio is a reporting diagnostic for shielding by destructive
superposition. A small value means the layer components are individually
visible in the extraction channel but cancel strongly in the accepted branch.
It may explain why a stable branch has a small exposed scalar response, but it
must not choose the branch representative, tune phase offsets, choose the
far-field radius, change the angular grid, or select a normalization. It is
also upstream of any charged-lepton Koide residual: Koide remains a downstream
benchmark only after the branch-derived mass triplet has already been fixed by
the shared mass-response map.

### Two-Binary Shielding Precursor

A reduced two-binary experiment can test the source-mined intuition that an
outer orbit may suppress the exposed wake of a fixed inner orbit before the
full three-layer $A_0$ branch is available. This is a priority-only solver
precursor, not a Tier 2 shielding output and not a branch-selection rule.
First fix the inner-binary ledger and extraction convention

$$
\Theta_I
=
\left(
\mathcal{G}_I,
\mathcal{L}_I,
R_{\mathrm{ext}},
\Omega_{\mathrm{grid}},
W_{\mathrm{cycle}},
\chi_{\mathrm{wake}},
\Pi_0
\right),
$$

where $\mathcal{G}_I$ is the retained inner root ledger and
$\mathcal{L}_I$ is the fixed inner far-field wake record on the declared
extraction radius, angular grid, cycle window, wake channel, and isotropic
projection. Let the admissible outer-binary family be declared before
evaluation as

$$
\theta_O
=
\left(
R_O,\omega_O,\phi_O,\mathcal{B}_O,\lambda_O,\sigma_O
\right)
\in
\mathcal{A}_{2B}(\Theta_I),
$$

with the admissibility constraints carrying only closure, noncollision,
bounded-root, and same-extraction requirements. For each candidate, compute the
combined two-binary leakage record

$$
\mathcal{L}_{2B}(\theta_O;\Theta_I)
=
\mathcal{L}_I
+
\mathcal{L}_O(\theta_O)
+
\mathcal{L}_{IO}(\theta_O;\Theta_I),
$$

where $\mathcal{L}_{IO}$ records inter-binary wake terms when they are retained
rather than absorbed into the separate layer records. The precursor leakage
functional is

$$
S_{2B}(\theta_O\mid\Theta_I)
=
w_0
\frac{
\left\|\Pi_0\mathcal{L}_{2B}(\theta_O;\Theta_I)\right\|
}{
\left\|\Pi_0\mathcal{L}_I\right\|
+
\left\|\Pi_0\mathcal{L}_O(\theta_O)\right\|
+
\varepsilon_{\mathcal{L}}
}
+
w_{\mathrm{tf}}
\frac{
\left\|(1-\Pi_0)\mathcal{L}_{2B}(\theta_O;\Theta_I)\right\|
}{
\left\|\mathcal{L}_I\right\|
+
\left\|\mathcal{L}_O(\theta_O)\right\|
+
\varepsilon_{\mathcal{L}}
},
\qquad
w_0,w_{\mathrm{tf}}\ge0.
$$

A local minimizer

$$
\theta_O^\star
\in
\operatorname*{arg\,min}_{\theta_O\in\mathcal{A}_{2B}(\Theta_I)}
S_{2B}(\theta_O\mid\Theta_I)
$$

may seed an outer-layer initial condition for a full $I/M/O$ branch search.
It does not supply $\zeta(A_0)$, does not replace the middle hinge, and cannot
use observed particle masses, charged-lepton ratios, electron radius, or a
measured $\alpha$ value as inputs. If the minimum disappears under fixed
extraction refinements or requires changing $\Theta_I$, the result is a failed
two-binary shielding precursor rather than evidence against the full nested
shell braid class.

The related survival question is whether the accepted branch is also a local
minimum of exposed leakage among nearby admissible branches. This is a
priority-only comparison target, not a branch-selection rule. After Tier 1 has
already accepted a predeclared same-basin candidate family
$\mathcal{N}_{\Lambda}$ with shared root-ledger conventions, extraction
radius, angular grid, wake channel, cycle window, and normalization, report the
leakage score

$$
S_{\mathrm{leak}}(\Lambda)
=
w_0
\frac{\left\|\Pi_0\mathcal{L}_{\Lambda}\right\|}
{\left\|\mathcal{L}_{\mathrm{naive},\Lambda}\right\|+\varepsilon_{\mathcal{L}}}
+
w_{\mathrm{tf}}
\frac{\left\|\mathcal{L}_{\mathrm{aniso},\Lambda}\right\|}
{\left\|\mathcal{L}_{\mathrm{naive},\Lambda}\right\|+\varepsilon_{\mathcal{L}}},
\qquad
w_0,w_{\mathrm{tf}}\ge0.
$$

The local leakage-minimum readout for the accepted branch $\Lambda_\ast$ is

$$
\Delta_{\mathrm{leak}}(\Lambda_\ast)
=
\min_{\Lambda\in\mathcal{N}_{\Lambda_\ast}}
\left[
S_{\mathrm{leak}}(\Lambda)-S_{\mathrm{leak}}(\Lambda_\ast)
\right].
$$

If $\Delta_{\mathrm{leak}}(\Lambda_\ast)\ge0$, the accepted branch is locally
least-exposed within the declared comparison family. If it is negative, the
packet should report the lower-leakage competitor as a stability or selection
pressure, not repair the accepted branch by retuning phases, changing the
extraction prescription, or fitting $\zeta$ to a particle benchmark. This
captures the "lowest external emission" intuition only after closure,
stability, and same-family provenance are already fixed.

The same extraction should report a branch-preserving
geometry-to-shielding sensitivity readout. Let

$$
Y_{\zeta}^{\mathrm{geom}}
=
\left(
G_{IM},G_{IO},G_{MO},
\lambda_I,\lambda_M,\lambda_O,
\Phi_{\mathrm{rel}}
\right),
\qquad
G_{\ell m}
\equiv
\mathcal{B}_{\ell}\cdot\mathcal{B}_{m}.
$$

Here $\mathcal{B}_{\ell}$ are the layer plane bivectors already used by
the branch geometry ledger, $\lambda_\ell$ records the accepted layer
ellipticity parameter, and $\Phi_{\mathrm{rel}}$ records branch-internal
relative phase offsets. For any accepted same-basin perturbation $u$ that
preserves the branch label, root ledger, extraction radius, angular grid,
wake channel, and normalization, report

$$
S_{\zeta,k}^{(u)}
=
\frac{
\Delta_u\zeta(A_0)
}{
\Delta_u Y_{\zeta,k}^{\mathrm{geom}}
+
\varepsilon_{Y,k}
},
\qquad
\varepsilon_{Y,k}>0,
$$

and the aggregate finite-difference response

$$
\mathcal{R}_{\zeta,\mathrm{geom}}^{(u)}
=
\frac{
\left|\Delta_u\zeta(A_0)\right|
}{
\left\|\Delta_u Y_{\zeta}^{\mathrm{geom}}\right\|
+
\varepsilon_Y
},
\qquad
\varepsilon_Y>0.
$$

This readout asks which accepted geometry variables actually move the scalar
shielding coefficient. It may explain how plane-angle, ellipticity, or
relative-phase changes alter $\zeta(A_0)$ inside one branch basin, but it
must not tune Gram entries, ellipticity parameters, phase offsets, branch
representative, extraction radius, angular grid, wake channel, or
normalization to improve any mass or Koide agreement. If the perturbation
changes the branch label, active root ledger, or extraction convention, the
packet records that case as branch-transition evidence rather than shielding
sensitivity.

The scalar coefficient is accepted only as the leading isotropic projection:

$$
\zeta(A_0)
=
\frac{\|\Pi_0\mathcal{L}\|}
{\|\mathcal{L}_{\text{naive}}\|}.
$$

This packet is the first worked scalar case for the shared [exposure-quotient theorem](exposure-quotient-theorem.md). It owns the $A_0$ extraction protocol, convergence checks, and leakage diagnostics; the shared packet owns the general projection/quotient grammar for sector-visible response.

The anisotropic residue is retained as

$$
\mathcal{L}_{\text{aniso}}
=
(1-\Pi_0)\mathcal{L}.
$$

## Scalar Exposure Contract

The Tier 2 output must instantiate the scalar worked case in the shared exposure-quotient packet. The extraction row therefore carries both the retained continuous far-field ledger and the discarded exact labels:

$$
\mathcal{L}_{A_0}^{\mathrm{row}}
=
\left(
\mathcal{L},
D_{0,\mathrm{hid}},
\Pi_0,
Q_0
\right).
$$

The discarded label set $D_{0,\mathrm{hid}}$ may include phase origin, constituent ordering, branch-preserving root names, global rotations, and pro/anti cancellation labels only when restoring any such label cannot change the mass-facing scalar beyond tolerance. For each restored label $d\in D_{0,\mathrm{hid}}$, the packet must compute or bound

$$
\zeta_d(A_0)
=
\frac{\|\Pi_0\mathcal{L}[d]\|}
{\|\mathcal{L}_{\text{naive}}[d]\|},
\qquad
M_{0,d}^{\mathrm{src}}
=
\zeta_d(A_0)E_{\text{internal}}[d].
$$

The hidden-label acceptance equations are

$$
\sup_{d_1,d_2\in D_{0,\mathrm{hid}}}
\left|
\zeta_{d_1}(A_0)-\zeta_{d_2}(A_0)
\right|
\le
\epsilon_{0,\mathrm{disc}},
$$

and

$$
\sup_{d_1,d_2\in D_{0,\mathrm{hid}}}
\frac{
\left|
M_{0,d_1}^{\mathrm{src}}
-
M_{0,d_2}^{\mathrm{src}}
\right|
}{
E_{\text{internal}}(A_0)+\varepsilon_E
}
\le
\epsilon_{0,\mathrm{handle}}.
$$

Here $\varepsilon_E>0$ is a declared numerical floor used only to avoid division by zero in failed or degenerate runs. A passing row must also report the refinement drift

$$
\epsilon_{0,\mathrm{ref}}
\ge
\sup_{\nu}
\left|
\zeta^{(\nu+1)}(A_0)
-
\zeta^{(\nu)}(A_0)
\right|
$$

for the declared refinement index $\nu$ over extraction radius, angular resolution, $\Delta t$, history depth, and $\eta$. The scalar exposure error contract is

$$
\epsilon_{0,\mathrm{tot}}
=
\epsilon_{\text{aniso}}
+\epsilon_{0,\mathrm{ref}}
+\epsilon_{0,\mathrm{disc}}
+\epsilon_{0,\mathrm{handle}}.
$$

These diagnostics are validation outputs, not construction inputs. They may reject $\zeta(A_0)$ after the extraction, but they may not select a branch representative, angular window, far-field radius, or normalization to improve agreement with an observed mass.

## Exposed-Energy Partition

The Tier 2 packet must also split the exposed ledger before any mass or medium-response consumer uses it. On the accepted branch,

$$
\zeta(A_0)E_{\text{internal}}(A_0)
=
E_{\text{probe}}(A_0)
+
E_{\text{sea-coupled}}(A_0)
+
E_{\text{unresolved}}(A_0).
$$

Here $E_{\text{probe}}$ is the distant-probe channel used by the mass map, while $E_{\text{sea-coupled}}$ is the source channel for Noether sea retuning. The closure residual is

$$
\mathcal R_{\text{part}}(A_0)
=
\frac{
\left|
\zeta(A_0)E_{\text{internal}}(A_0)
-
E_{\text{probe}}(A_0)
-
E_{\text{sea-coupled}}(A_0)
-
E_{\text{unresolved}}(A_0)
\right|
}{
\left|\zeta(A_0)E_{\text{internal}}(A_0)\right|
+
\varepsilon_{\text{part}}
}.
$$

A Tier 2 packet that uses raw $\zeta E_{\text{internal}}$ as both direct probe readout and sea-retuning source remains open even if the scalar far-field coefficient itself converges.

## Acceptance Gates

Tier 2 passes only if:

1. $E_{\text{internal}}(A_0)$ converges under $\Delta t$, history, and $\eta$ refinement;
2. the far-field leading channel is stable under extraction radius and angular resolution;
3. $\zeta(A_0)$ is computed from the accepted branch without observed particle masses, electron radius, charged-lepton ratios, or measured $\alpha$ as inputs;
4. $\mathcal{L}_{\text{aniso}}$ is reported rather than hidden;
5. every discarded exact label satisfies the hidden-label acceptance equations above;
6. the exposed-energy partition reports $E_{\text{probe}}$, $E_{\text{sea-coupled}}$, $E_{\text{unresolved}}$, and $\mathcal R_{\text{part}}$ on the same retained record;
7. the output preserves enough state to rerun the extraction from the branch packet.

## Failure Codes

| Failure code | Meaning |
| --- | --- |
| `energy-double-count` | pairwise interaction and wake/history terms overlap without a non-overlap rule |
| `energy-nonconvergent` | internal energy ledger changes under refinement |
| `shielding-radius-drift` | far-field coefficient changes with extraction radius |
| `shielding-angular-drift` | far-field coefficient changes with angular resolution |
| `leakage-unreported` | anisotropic leakage exists but is not emitted |
| `exposed-partition-open` | $\zeta E_{\text{internal}}$ is consumed as both probe readout and sea-retuning source without a closed partition residual |
| `hidden-branch-mass-handle` | a discarded branch label changes $\zeta(A_0)E_{\text{internal}}(A_0)$ beyond $\epsilon_{0,\mathrm{handle}}$ |
| `benchmark-contaminated` | observed mass or hierarchy data entered before extraction |

## Promotion Rule

Only a Tier 2 packet passing these gates may promote `derive_first_attractor_family` toward `derive_zeta`. A failed Tier 2 packet remains a branch-analysis result, not a mass-map result.
