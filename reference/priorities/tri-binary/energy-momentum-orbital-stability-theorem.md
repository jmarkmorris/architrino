# Energy-Momentum Orbital Stability Theorem

Promotion status: `priority-only`. This packet refines [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md), [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md), [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md), [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md), and [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md). It states the conservative orbital-stability test on a fixed energy-momentum leaf.

The theorem is local to one support-complete conservative branch, one root ledger, one total action, one Noether current map, one neutral-mode quotient, and one boundary two-form.

---

## 1. Conserved Current Leaf

Let $B$ be a support-complete dynamics/action branch with history state $Z_B$. Let

$$
\mathcal{I}_B(Z)
=
\left(
E(Z),
\mathbf{p}(Z),
\mathbf{J}(Z),
Q(Z),
\mathcal{R}_{\mathrm{src}}(Z)
\right)
$$

denote the declared conserved current map on the event interval. The retained conservative stability problem is not posed on the full history neighborhood. It is posed on the fixed leaf

$$
\mathcal{C}_{\mu_B}
=
\left\{
Z\in\mathscr{M}_B\cap\Sigma_B:
\mathcal{I}_B(Z)=\mu_B
\right\}.
$$

where

$$
\mu_B=\mathcal{I}_B(Z_B).
$$

The tangent space is

$$
T_{Z_B}\mathcal{C}_{\mu_B}
=
\ker D\mathcal{I}_B
\cap
T_{Z_B}\mathscr{M}_B
\cap
T_{Z_B}\Sigma_B.
$$

If the branch packet does not specify which current components are fixed during the perturbation test, the stability packet exits with

$$
\texttt{energy-momentum-current-open}.
$$

---

## 2. Augmented Action Functional

Let $\xi_B\in\mathfrak{g}_{\mu_B}$ be the generator of the branch motion relative to the chosen return section. It may include phase speed, rotation rate, or a declared internal symmetry drift. Define the augmented energy

$$
\mathscr{H}_{\xi_B}(Z)
=
E(Z)
-
\langle \xi_B,\mathcal{J}_{\mathrm{mom}}(Z)\rangle,
$$

where $\mathcal{J}_{\mathrm{mom}}$ contains the momentum-map components for translations, rotations, phase, and declared internal or provenance symmetries. The criticality row is

$$
D\mathscr{H}_{\xi_B}(Z_B)[\delta Z]=0
$$

for all

$$
\delta Z\in T_{Z_B}\mathcal{C}_{\mu_B}.
$$

Equivalently, there are Lagrange multipliers $\Lambda$ for the current leaf such that

$$
D
\left(
\mathcal{S}_{\mathrm{tot}}
-
\langle \Lambda,\mathcal{I}_B\rangle
\right)(Z_B)=0.
$$

The constrained Hessian is

$$
Q_{\mathrm{EM},B}[\xi,\zeta]
=
D^2
\left(
\mathcal{S}_{\mathrm{tot}}
-
\langle \Lambda,\mathcal{I}_B\rangle
\right)_{Z_B}
[\xi,\zeta].
$$

This is the Hessian that must be tested for orbital stability, not the unconstrained sampled residual Hessian.

---

## 3. Symplectic Slice

Let $\mathfrak{g}_{\mu_B}$ be the isotropy algebra of the fixed current value:

$$
\mathfrak{g}_{\mu_B}
=
\left\{
\xi\in\mathfrak{g}_{\mathrm{sym}}:
\operatorname{ad}_{\xi}^{*}\mu_B=0
\right\}.
$$

Let

$$
\mathcal{O}_B
=
\{\delta_{\xi}Z_B:\xi\in\mathfrak{g}_{\mu_B}\}
$$

be the group-orbit tangent at fixed current. The symplectic slice is

$$
\mathcal{S}_B
=
T_{Z_B}\mathcal{C}_{\mu_B}
/
\left(
\mathfrak{g}_{\mu_B}\cdot Z_B
+
\mathcal{G}_B
+
\mathcal{T}_B
\right),
$$

with reduced two-form

$$
\omega_{\mathcal{S}}([\eta],[\zeta])
=
\Omega_B(\eta,\zeta).
$$

Equivalently, in an explicit transverse construction one may use

$$
\left(
\ker D\mathcal{I}_B
\cap
\mathcal{O}_B^{\Omega}
\right)
/
\left(
\mathcal{O}_B\cap\ker D\mathcal{I}_B
\right),
$$

where $\mathcal{O}_B^{\Omega}$ is the $\Omega_B$-orthogonal complement of the group orbit. This slice removes pure group motion while keeping physical perturbations that preserve the event currents. The slice construction is valid only if $\omega_{\mathcal{S}}$ is nondegenerate and only after [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md) supplies the gauge, branch-family, physical-neutral, and conserved-level projectors.

---

## 4. Coercive Energy-Momentum Row

The conservative orbital-stability test is coercivity of the augmented Hessian on the slice:

$$
Q_{\mathrm{EM},B}[\eta,\eta]
\ge
c_B\|[\eta]\|_{H^1_{\eta}}^2
$$

for every

$$
[\eta]\in\mathcal{S}_B,
$$

with

$$
c_B>0.
$$

If this row passes, then perturbations that remain on the same current leaf stay close to the group orbit of $B$ for the certified time class of the conservative return map. The conclusion is orbital:

$$
\operatorname{dist}
\left(
P_B^n(Z_B+\delta Z),
G_{\mu_B}\cdot Z_B
\right)
\le
C\|\delta Z\|
$$

for perturbations inside the certified root-regular neighborhood and for the declared iteration/time range. This is not asymptotic attraction.

Equivalently, in flow language the candidate statement is

$$
\forall \varepsilon>0\ \exists\delta>0:
\operatorname{dist}_{\mathcal{S}}(Z(0),G_{\mu_B}\cdot Z_B)<\delta
\Longrightarrow
\sup_{\lambda}
\operatorname{dist}_{\mathcal{S}}(Z(\lambda),G_{\mu_B}\cdot Z_B)<\varepsilon
$$

for the root-ledger-valid interval, up to the certified conservation, tail, curl, endpoint, and discretization error envelope.

If $Q_{\mathrm{EM},B}$ has a negative direction on the slice, the status is

$$
\texttt{energy-momentum-saddle}.
$$

If it has extra nullity on the slice, the status is

$$
\texttt{energy-momentum-extra-nullity}.
$$

---

## 5. Relation To Krein Stability

The energy-momentum Hessian supplies the local quadratic invariant. The Krein row supplies the unit-circle spectral audit. A clean conservative stability packet should satisfy:

$$
Q_{\mathrm{EM},B}>0
\quad
\text{on }\mathcal{S}_B,
$$

and every non-gauge unit multiplier should pass the definite-sign Krein test from [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md).

If the Hessian is positive but the monodromy has a mixed-sign Krein collision, report

$$
\texttt{krein-collision-instability-candidate}.
$$

If the Krein audit is clean but the energy-momentum Hessian is indefinite on the slice, report

$$
\texttt{energy-momentum-saddle}.
$$

If both pass, the conservative stability status is

$$
\texttt{conservative-orbital-stable-candidate}.
$$

The word `candidate` remains mandatory until the nonlinear perturbation-recovery row verifies that the root, memory, support, action, and event ledgers persist in the claimed neighborhood.

---

## 6. Theorem Target

**Theorem target: energy-momentum orbital stability.** Suppose a same-level branch packet passes support-complete dynamics/action closure, Noether conservation closure, neutral-mode reduction, conservative boundary two-form audit, and root-ledger perturbation recovery. Suppose the fixed-current leaf and symplectic slice are declared, and suppose the augmented action-energy Hessian $Q_{\mathrm{EM},B}$ is coercive on that slice.

Then $B$ is an orbitally stable conservative branch candidate modulo the declared symmetry group and branch-family neutral directions, on the fixed current leaf and within the certified root-regular neighborhood. The conclusion is orbital boundedness, not attracting contraction. Any claim of contraction still requires the dissipative or exchange row in [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md).

Proof route:

1. Noether closure identifies the conserved current map and fixed leaf;
2. neutral-mode reduction separates group orbit, branch-family, and physical neutral directions;
3. the boundary two-form supplies the symplectic slice;
4. constrained second variation gives a positive quadratic invariant on the slice;
5. root-ledger perturbation recovery keeps nearby histories inside the same chart;
6. the quadratic invariant bounds distance to the group orbit.

---

## 7. Output Schema And Current Reading

Future conservative stability packets should emit:

| Field | Required content |
| --- | --- |
| `conserved_current_map` | $\mathcal{I}_B$, fixed components, and tolerances |
| `augmented_generator` | $\xi_B$ or multiplier vector $\Lambda$ used in the augmented functional |
| `energy_momentum_hessian` | $Q_{\mathrm{EM},B}$ on the fixed root/action ledger |
| `group_orbit_tangent` | $\mathcal{O}_B$, $G_{\mu_B}$, and isotropy algebra $\mathfrak{g}_{\mu_B}$ |
| `symplectic_slice` | basis, rank, and quotient audit for $\mathcal{S}_B$ |
| `slice_coercivity` | $c_B$, norm, and interval/spectral proof |
| `krein_compatibility` | unit-circle signature and collision scan from the same quotient |
| `orbital_stability_decision` | first passing or failing status |

Failure/status codes:

$$
\texttt{energy-momentum-current-open},
\qquad
\texttt{augmented-generator-undetermined},
\qquad
\texttt{noether-level-not-reduced},
$$

$$
\texttt{group-orbit-quotient-open},
\qquad
\texttt{symplectic-slice-degenerate},
\qquad
\texttt{augmented-hessian-not-defined},
$$

$$
\texttt{constrained-hessian-not-coercive},
\qquad
\texttt{energy-momentum-saddle},
\qquad
\texttt{morse-krein-slice-mismatch},
$$

$$
\texttt{conservative-orbital-stable-candidate},
\qquad
\texttt{nonlinear-recovery-required},
\qquad
\texttt{not-retained}.
$$

Current $M=3$ rows have no retained action branch, conserved-current map, monodromy, or symplectic slice. Their status remains

$$
\texttt{energy-momentum-current-open},
\qquad
\texttt{root-ledger-floquet-stability-open},
\qquad
\texttt{not-retained}.
$$
