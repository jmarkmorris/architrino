# Noether Neutral Mode Reduction Theorem

Promotion status: `priority-only`. This packet refines [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md), [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md), [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md), [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md), and [energy-momentum-orbital-stability-theorem.md](energy-momentum-orbital-stability-theorem.md). It states which unit multipliers and Hessian null directions are expected from symmetry, gauge, and branch-family freedom, and which ones are extra physical degeneracies.

The reduction is local to one support-complete dynamics/action branch, one root ledger, one endpoint convention, one total action, one return section, and one inventory/event ledger.

---

## 1. Generator-Induced Variations

Let $B$ be a support-complete branch with history state $Z_B$ and total action $\mathcal{S}_{\mathrm{tot}}$. Let $\mathfrak{g}_{\mathrm{sym}}$ be the declared Lie algebra of continuous transformations preserving the branch equations and event ledger:

$$
\mathfrak{g}_{\mathrm{sym}}
=
\mathfrak{g}_{\mathrm{time}}
\oplus
\mathfrak{g}_{\mathrm{trans}}
\oplus
\mathfrak{g}_{\mathrm{rot}}
\oplus
\mathfrak{g}_{\mathrm{phase}}
\oplus
\mathfrak{g}_{\mathrm{int}},
$$

where only the summands actually declared by the branch packet are included. For $\xi\in\mathfrak{g}_{\mathrm{sym}}$, write the induced branch variation as

$$
v_{\xi}
=
\delta_{\xi}Z_B.
$$

If the action and endpoint convention are invariant under $\xi$, then

$$
\mathcal{L}_B v_{\xi}=0
$$

for the root-dependent variational operator, and

$$
Q_B[v_{\xi},\zeta]=0
\qquad
\text{for every admissible }\zeta,
$$

where $Q_B$ is the action Hessian on the fixed root stratum. Thus $v_{\xi}$ is both a Jacobi field and a Hessian null vector before quotienting.

---

## 2. Return-Map Unit Multipliers

Let $P_B$ be the root-ledger-preserving return map and

$$
M_B
=
\Pi_{\mathrm{ng}}DP_B(Z_B)\Pi_{\Sigma}
$$

be its reduced monodromy after inserting the return-section projection. A symmetry generator that preserves the return section up to a compensating phase or gauge shift gives a unit multiplier:

$$
M_B[v_{\xi}]
=
v_{\xi}
$$

in the unquotiented section tangent space.

Equivalently,

$$
v_{\xi}\in\ker(M_B-I).
$$

The expected neutral subspace is

$$
\mathcal{N}_{\mathrm{exp}}
=
\operatorname{span}
\left\{
v_{\xi}:
\xi\in\mathfrak{g}_{\mathrm{sym}},
\ v_{\xi}\ \text{preserves the declared branch packet}
\right\}
\oplus
\mathcal{T}_{\mathrm{branch}},
$$

where $\mathcal{T}_{\mathrm{branch}}$ contains declared branch-family, torus, or parameter-continuation directions that are not gauge.

---

## 3. Gauge Versus Physical Neutral Modes

The neutral space must be split before stability is classified:

$$
\mathcal{U}_B
=
\mathcal{G}_B
\oplus
\mathcal{T}_B
\oplus
\mathcal{P}_B.
$$

Here:

1. $\mathcal{G}_B$ is pure gauge: translation of an already quotient-fixed center, rigid coordinate rotation when orientation is declared gauge, phase-section freedom, and coefficient-chart redundancy;
2. $\mathcal{T}_B$ is physical tangent freedom of a declared branch family, invariant torus, or continuation parameter;
3. $\mathcal{P}_B$ is a physical neutral mode that is not gauge but is required by a conservation law or exact symmetry.

The stability quotient used by the Floquet row is

$$
\mathcal{Q}_{\mathrm{stab}}
=
T_{Z_B}\Sigma_B
/
\left(
\mathcal{G}_B\oplus\mathcal{T}_B
\right).
$$

Physical neutral modes in $\mathcal{P}_B$ are not removed unless the branch claim declares the corresponding conserved quantity or orbit family as part of the retained stability class.

Let $W_B$ be the weighted inner product matrix used by the stability row, and let $U_B$ be a basis matrix for

$$
\mathcal{U}_B
=
\mathcal{G}_B\oplus\mathcal{T}_B\oplus\mathcal{P}_B.
$$

The weighted neutral projector is

$$
P_{\mathcal{U}}
=
U_B
\left(U_B^*W_BU_B\right)^{-1}
U_B^*W_B,
$$

and the raw transverse projector is

$$
\Pi_{\perp}=I-P_{\mathcal{U}}.
$$

If $U_B^*W_BU_B$ is singular after declared duplicate generators are removed, the gauge/physical neutral split is not usable and the packet exits with

$$
\texttt{gauge-physical-neutral-split-open}.
$$

---

## 4. Expected Nullity Count

Let

$$
n_{\mathrm{g}}=\dim\mathcal{G}_B,
\qquad
n_{\mathrm{t}}=\dim\mathcal{T}_B,
\qquad
n_{\mathrm{p}}=\dim\mathcal{P}_B.
$$

The Hessian and monodromy audits must satisfy

$$
\dim\ker Q_B
=
n_{\mathrm{g}}+n_{\mathrm{t}}+n_{\mathrm{p}}
$$

before quotienting, and

$$
\dim\ker(M_B-I)
=
n_{\mathrm{g}}+n_{\mathrm{t}}+n_{\mathrm{p}}
$$

up to tolerance and semisimplicity conditions. After quotienting gauge and declared tangent directions, the expected unit-multiplier count is

$$
n_{\mathrm{p}}
$$

unless the physical neutral direction is converted into a constrained energy-momentum level set.

If

$$
\dim\ker(M_B-I)>
n_{\mathrm{g}}+n_{\mathrm{t}}+n_{\mathrm{p}},
$$

the branch has extra unit-multiplier degeneracy. If

$$
\dim\ker Q_B>
n_{\mathrm{g}}+n_{\mathrm{t}}+n_{\mathrm{p}},
$$

the action Hessian has extra nullity. Both cases block a clean stability classification until a branch-switch, missing constraint, or missing quotient row is resolved.

---

## 5. Energy-Momentum Level Reduction

For a conservative action/Noether branch, the symmetry generators have moment map components

$$
J_{\xi}(Z)
$$

whose event residuals are controlled by [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md). Stability on a fixed conserved level should use the constrained tangent space

$$
T_{Z_B}\Sigma_{J}
=
\left\{
\delta Z\in T_{Z_B}\Sigma_B:
DJ_{\xi}[\delta Z]=0
\ \text{for every declared fixed current }J_{\xi}
\right\}.
$$

Then the reduced stability quotient is

$$
\mathcal{Q}_{J}
=
T_{Z_B}\Sigma_{J}
/
\left(
\mathcal{G}_B\oplus\mathcal{T}_B
\right).
$$

This prevents a variation that changes total energy, momentum, angular momentum, charge, or source provenance from being counted as a same-event perturbation of the branch. If the packet tests stability without fixing the conserved level, the status is

$$
\texttt{noether-level-not-reduced}.
$$

In finite coordinates, collect the fixed conservation rows as

$$
\mathcal{I}_B
=
\left(
E,
\mathbf{p},
\mathbf{J},
Q,
\mathcal{R}_{\mathrm{src}}
\right).
$$

The weighted projector to the conservation leaf is

$$
\Pi_{\ker D\mathcal{I}}
=
I
-
W_B^{-1}D\mathcal{I}_B^*
\left(
D\mathcal{I}_BW_B^{-1}D\mathcal{I}_B^*
\right)^{-1}
D\mathcal{I}_B.
$$

The final reduced transverse projector is

$$
\Pi_{\mathrm{red}}
=
\Pi_{\ker D\mathcal{I}}
\Pi_{\perp}
\Pi_{\ker D\mathcal{I}}.
$$

If the conservation-leaf matrix is singular because the event packet did not declare which currents are fixed, the status is

$$
\texttt{conservation-leaf-projector-open}.
$$

---

## 6. Theorem Target

**Theorem target: Noether neutral-mode reduction.** Suppose a same-level branch packet passes support-complete dynamics closure, action exactness, Noether conservation closure, and root-ledger variational differentiability on one event interval. Then every declared continuous symmetry generator produces a Jacobi field, Hessian null vector, and unit return-map multiplier on the unquotiented root-regular chart. After quotienting pure gauge and declared tangent-family directions, the remaining unit multipliers must match the physical neutral modes and conserved-level constraints declared by the packet.

If the measured Hessian nullity or monodromy unit-multiplier count exceeds the expected count, the branch has an unresolved neutral degeneracy. If it falls short, the claimed symmetry is not represented on the retained root/action ledger.

Proof route:

1. differentiate the invariant action along a symmetry generator;
2. use the Euler-Lagrange row to identify $v_{\xi}$ as a variational solution;
3. take the second variation to identify a Hessian null direction;
4. use equivariance of the return map to obtain a unit multiplier;
5. impose the return section, gauge quotient, branch-family quotient, and conserved-level constraints;
6. compare expected and measured nullity.

---

## 7. Output Schema And Current Reading

Future stability packets should emit:

| Field | Required content |
| --- | --- |
| `symmetry_generators` | declared continuous generators and whether they preserve the root/action/event ledger |
| `generator_variations` | $v_{\xi}$ in the history chart and coefficient chart |
| `gauge_tangent_physical_split` | $\mathcal{G}_B$, $\mathcal{T}_B$, $\mathcal{P}_B$ and their dimensions |
| `neutral_projector` | $P_{\mathcal{U}}$, $\Pi_{\perp}$, weights, and rank audit |
| `conserved_level_constraints` | $D\mathcal{I}_B$ rows fixed in the stability test |
| `conservation_leaf_projector` | $\Pi_{\ker D\mathcal{I}}$ and $\Pi_{\mathrm{red}}$ with rank/nullity audit |
| `expected_nullity` | $n_{\mathrm{g}}$, $n_{\mathrm{t}}$, $n_{\mathrm{p}}$, and post-quotient unit count |
| `hessian_nullity_audit` | $\dim\ker Q_B$ before and after quotienting |
| `monodromy_unit_audit` | $\dim\ker(M_B-I)$, Jordan/semisimplicity status, and quotient count |
| `neutral_reduction_decision` | first passing or failing status |

Failure/status codes:

$$
\texttt{noether-neutral-mode-reduction-open},
\qquad
\texttt{symmetry-generator-ledger-mismatch},
\qquad
\texttt{conservation-leaf-projector-open},
$$

$$
\texttt{noether-level-not-reduced},
\qquad
\texttt{expected-unit-multiplier-missing},
\qquad
\texttt{extra-unit-multiplier-degeneracy},
$$

$$
\texttt{extra-action-nullity},
\qquad
\texttt{expected-nullity-mismatch},
\qquad
\texttt{conservation-constraint-drift},
$$

$$
\texttt{gauge-physical-neutral-split-open},
\qquad
\texttt{morse-floquet-neutral-mismatch},
\qquad
\texttt{neutral-jordan-growth-open},
$$

$$
\texttt{not-retained}.
$$

Current $M=3$ rows do not yet have a support-complete dynamics/action branch, Noether conservation closure, or monodromy. Their status is

$$
\texttt{noether-neutral-mode-reduction-open},
\qquad
\texttt{root-ledger-floquet-stability-open},
\qquad
\texttt{not-retained}.
$$
