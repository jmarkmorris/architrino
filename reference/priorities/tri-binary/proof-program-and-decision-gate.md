# Tri-Binary Proof Program And Decision Gate

Promotion status: `priority-only`. This document coordinates the same-level tri-binary mathematics developed in this directory. It does not authorize migration into `content/markdown/aaa` until a retained branch packet satisfies the decision gate in [tri-binary-architecture.md](tri-binary-architecture.md).

The same-level architecture replaces radial nesting with a common support band, phase-locked choreography, central inventory accounting, and branch-certificate data. The proof burden is therefore not a single visual construction. It is a coupled certificate showing that one retained branch simultaneously closes its causal-root ledger, fixed-speed residuals, noncollision gates, energy/action ledger, inventory ledger, exposure map, and observer-export rows.

For deformed support-band rows, the preferred dynamics chart is now the arclength chart: fixed speed is encoded by the curve clock, and the remaining carrier equation is force-versus-curvature closure. Thus a deformed retained branch must close $\mathcal{R}_{L}$, $\mathcal{R}_{T}$, $\mathcal{R}_{\mathrm{tan}}$, and $\mathcal{R}_{\mathrm{curv}}$ on the same active-root ledger, not only an angle-clock speed residual.

---

## 1. Claim Map

The architecture must keep the following levels separate.

| Claim | Level | Current status | Required mathematical object |
| --- | --- | --- | --- |
| Architrinos move in absolute time through the Euclidean void and interact through causal wakes. | ontology | inherited from the canonical dynamics | no new tri-binary proof needed |
| A same-level six-architrino Noether-core branch can remain noncolliding in one support band. | derivation/closure target | open | retained carrier row with $d_{\min}>\epsilon_x$ and finite active causal roots |
| A twelve-architrino charged fermion can be represented by a central-inventory ledger plus neutral same-level choreography. | derivation/closure target | open | integer inventory row plus noncollision/regularization representative |
| The choreography can recover spinor $2\pi/4\pi$ behavior. | derivation/closure target | open | framed-wake parity row and angular-momentum residuals |
| The moving branch can export Lorentz clock/ruler behavior. | derivation/closure target | open | moving-branch export with bounded preferred-frame leakage |
| Topological complexity may index generations. | speculation until computed | constrained | mass map must pass through energy, exposure, and Noether-Sea response, not a standalone topology law |
| Strong-field and cosmology claims may be cleaner in the same-level architecture. | speculative comparison target | open | finite-boundary continuation and observer-level recovery rows |

---

## 2. Proof Dependency Graph

The minimal proof stack is:

1. **Branch definition.** Define $X_q$, $\mathcal{H}_q$, $\mathcal{I}_q$, $\Phi_q$, $\mathcal{K}_q$, and $\mathcal{A}_q$ on one time window $W$.
2. **Root regularity.** Prove every retained causal root is isolated, finite in number, and has $|J_{ij}|>\epsilon_J$.
3. **Carrier closure.** Prove the support-band, fixed-speed, phase-lock, and noncollision residuals stay below tolerance.
4. **Event and action closure.** Prove $Q$, $E$, $\mathbf{p}$, $\mathbf{J}$, source provenance, recoil, and medium-update rows close on the same retained branch.
5. **Stability.** Prove a return-map gap, NHIM domination row, stable limit cycle, quasiperiodic carrier, or SRB target, with the claim type determined by the measured Lyapunov spectrum.
6. **Observer exports.** Compute Lorentz, photon, mass, color, and strong-field rows as `passed`, `failed`, or `not_computed`.
7. **NTB comparison.** Compare the retained branch against the nested tri-binary causal-closure packet set before migration.

The sequence is strict in one direction: observer exports cannot promote a theorem target if root regularity, carrier closure, and event/action closure were computed on a different branch or were not computed.

---

## 3. Retained Branch Packet

For a branch class $q$ over $W=[t_0,t_1]$, the retained packet should be written as

$$
\mathsf{B}_q(W)
=
\left(
\mathcal{C}_{\mathrm{tri}}^{(q)}(W),
\mathsf{P}_{\mathrm{root}},
\mathsf{P}_{\mathrm{carrier}},
\mathsf{P}_{\mathrm{event}},
\mathsf{P}_{\mathrm{stab}},
\mathsf{P}_{\mathrm{export}},
\mathsf{P}_{\mathrm{compare}}
\right).
$$

The packet is retained only if each row is attached to the same state history $\mathcal{H}_q$ and the same active causal-root ledger $\mathcal{A}_q$.

| Row | Required payload | Reject if |
| --- | --- | --- |
| $\mathsf{P}_{\mathrm{root}}$ | active root list, delays, Jacobians, memory depth, root status | any required root is absent, tangent without a regularized rule, or $J_{\min}\le\epsilon_J$ |
| $\mathsf{P}_{\mathrm{carrier}}$ | support band, speed or arclength residuals, phase residuals, $d_{\min}$, tangential closure, and curvature closure for deformed curves | fixed-speed motion is asserted without $\mathcal{R}_{\mathrm{tan}}$, or a deformed curve is retained without $\mathcal{R}_{\mathrm{curv}}$ |
| $\mathsf{P}_{\mathrm{event}}$ | $Q$, $E$, $\mathbf{p}$, $\mathbf{J}$, source provenance, recoil, Noether-Sea update | any ledger closes only after an untracked channel is inserted |
| $\mathsf{P}_{\mathrm{stab}}$ | return map, Lyapunov spectrum, NHIM or attractor classification | the branch type is stronger than the computed spectrum supports |
| $\mathsf{P}_{\mathrm{export}}$ | Lorentz, photon, mass, color, strong-field rows | an export row is promoted by implication rather than computed or marked `not_computed` |
| $\mathsf{P}_{\mathrm{compare}}$ | replaced/preserved/fallback NTB assumptions | same-level migration starts without an explicit fallback comparison |

---

## 4. Core Theorem Targets

### 4.1 Regularized Branch Existence

Let $\eta>0$ mollify each causal wake and let the state history lie in

$$
\mathcal{X}_h
=
C^1([-h,0],(\mathbb{R}^3\times\mathbb{R}^3)^N)
\times \{\pm\epsilon\}^N
\times \mathcal{I}.
$$

The first theorem target is:

**Theorem target A.** If a candidate same-level branch has finite active causal roots, $J_{\min}>\epsilon_J$, noncollision $d_{\min}>\epsilon_x$, and locally Lipschitz mollified force kernels, then the regularized dynamics generate a unique branch segment on $W$ from the admissible history, and active roots continue smoothly until a listed failure code is triggered.

Proof route:

1. Use the implicit function theorem on
   $$
   G_{ij}(t,s)=\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s)
   $$
   with $\partial_sG_{ij}=c_fJ_{ij}$ up to sign convention.
2. Use $|J_{ij}|>\epsilon_J$ to continue the active root chart.
3. Use $\eta>0$ and $d_{\min}>\epsilon_x$ to obtain local Lipschitz force functionals on the retained chart.
4. Apply the method of steps to the finite-memory delayed system.
5. Stop the branch at the first failure event: collision, Jacobian-floor violation, root bifurcation without regularization, or residual exit.

This theorem target proves only the regularized branch segment. The $\eta\to0$ statement remains a weak-limit obligation.

### 4.2 Fixed-Speed Carrier Closure

For the branch center $\mathbf{C}(t)$, define

$$
\mathbf{u}_i(t)=\dot{\mathbf{x}}_i(t)-\dot{\mathbf{C}}(t).
$$

The ideal same-level row imposes $\|\mathbf{u}_i(t)\|=c_f$ on the carrier interval. Differentiating gives the necessary orthogonality condition

$$
\mathbf{u}_i(t)\cdot\dot{\mathbf{u}}_i(t)=0.
$$

Because the master equation supplies a sum of radial causal-wake hits, this becomes the branch residual

$$
\mathcal{R}_{\mathrm{tan},i}(t)
=
\mathbf{u}_i(t)\cdot
\left[
\sum_{(j,s)\in\mathcal{A}_i(t)}
\mathbf{F}_{ij}(t,s)
-
\ddot{\mathbf{C}}(t)
\right].
$$

**Theorem target B.** A fixed-speed same-level carrier is dynamically admissible only if $\sup_{i,t\in W}|\mathcal{R}_{\mathrm{tan},i}(t)|\le\epsilon_{\mathrm{tan}}$ and the radial support residual remains below tolerance.

This is a necessary condition. It is not sufficient until phase, root, energy/action, and stability rows also close.

### 4.3 Noncollision And Phase Clearance

Let the branch use phase coordinates $\theta_a(t)=\omega t+\phi_a(t)$ for three binary slots $a\in\{1,2,3\}$, with antipodal partners $\theta_{a,-}=\theta_{a,+}+\pi$ when that row is declared. Define

$$
D_{ab}^{\sigma\sigma'}(t)
=
\left\|
\mathbf{x}_{a,\sigma}(t)-\mathbf{x}_{b,\sigma'}(t)
\right\|,
\qquad
d_{\min}^{(q)}
=
\inf_{a,b,\sigma,\sigma',t}D_{ab}^{\sigma\sigma'}(t).
$$

**Theorem target C.** A phase-lock row is admissible only if $d_{\min}^{(q)}>\epsilon_x$ and the phase return map

$$
P_q:\Phi_q(t)\mapsto\Phi_q(t+T_q)
$$

has a retained fixed point, invariant curve, or attractor compatible with the claimed stability class.

This target prevents a construction-space braid from replacing the Euclidean noncollision proof.

### 4.4 History-Dressed Energy Closure

The action row must use the same active roots as the force row. Write

$$
\mathcal{R}_{E}^{(q)}
=
\sup_{t\in W}
\frac{|E_{\mathrm{hist}}^{(q)}(t)-E_{\mathrm{hist}}^{(q)}(t_0)|}{\epsilon_E}.
$$

**Theorem target D.** A branch cannot promote any mass, Lorentz, photon, color, or strong-field export unless $\mathcal{R}_{E}^{(q)}\le1$ or the event ledger explicitly records the missing energy/action channel with provenance.

This row is the guard against treating an attractive topological carrier as physical while conservation remains open.

---

## 5. Observer-Export Dependency

The observer-export rows inherit the branch packet; they do not define it.

| Export | Branch data it must consume | Minimal residual |
| --- | --- | --- |
| Lorentz clock/ruler | periods, moving carrier deformation, signal synchronization, leakage row | $\mathcal{R}_{\mathrm{Lorentz}}^{(q)}$ |
| Photon transition | planar branch transition, event ledger, speed row, transverse/longitudinal split | $\mathcal{R}_{\gamma}$ |
| Mass map | $E_{\mathrm{hist}}$, $\mathcal{Z}^{ab}$, $\zeta$, $\mathcal{M}_{\mathrm{sea}}^{ab}$ | $\mathcal{R}_{\mathrm{exposure}}$ plus $\mathcal{R}_E$ |
| Color | $\mathcal{S}_3$ slots plus continuous phase connection | `color-connection-missing` until generators and curvature are supplied |
| Strong-field | finite boundary, event-ledger closure, observer-level translation | $\mathcal{R}_H(\Omega)$ |

The current same-level architecture may improve Lorentz isotropy because an isotropic carrier can reduce rest-frame orientation leakage. That is a proof route, not a result. The retained branch must still compute the preferred-frame leakage diagnostic $\mathcal{A}_{\mathrm{pf}}^{(q)}$.

---

## 6. Decision-Gate Matrix

| Gate from architecture draft | Priority-side proof object | Current state |
| --- | --- | --- |
| Branch existence | Theorem targets A, B, C plus explicit root ledger | open |
| Inventory replacement | central-inventory ledger and event-ledger rows | open |
| Energy and exposure | theorem target D plus exposure/medium extraction | open |
| Observer exports | export dependency rows with `passed`, `failed`, or `not_computed` | open |
| NTB comparison | retained comparison packet against nested causal-closure source | open |
| Migration batch plan | reviewable sequence after all earlier gates | deferred |

The decision gate should remain `open` until one concrete branch packet is populated. A document that only names a promising topology, symmetry, or construction chart is not enough to pass any row.

---

## 7. Current Proof Packet Status

The first proof-packet layer is now staged:

| Packet | Status |
| --- | --- |
| Current dynamics synthesis | integrated conclusion staged; next solve target is intrinsic finite-mode curve dynamics |
| Branch mathematics | theorem targets stated; no retained branch yet |
| Carrier/topology/spin | theorem targets stated; no retained framed-wake row yet |
| Octahedral carrier example | exact noncollision floor and first root/Jacobian screening supplied; rigid neutral row fails tangential and radial/support screens; deformed-carrier search required |
| Rigid carrier dynamics | phase offsets reduce tangential RMS but do not close force balance |
| Polarity-phase rigid screen | neutral polarity reassignment slightly improves rigid tangential RMS but remains `tangential-residual-open` |
| Force-balance reduction | necessary tangential and radial/support projection equations stated |
| Deformed carrier ansatz | low-order deformation variables and linearized root/force rows stated |
| Low-order deformation search | common radial breathing improves tangential RMS but fails speed and radial/support closure |
| Pair-specific deformation search | speed and root conditioning improve, but tangential closure remains dominant and radial/support closure remains open |
| Arclength dynamics reduction | fixed speed moved into the deformed-curve clock; curvature closure identified as the correct vector dynamics row |
| Arclength deformation search | common breathing improves tangential RMS under arclength time but still fails force-versus-curvature closure |
| Intrinsic curve dynamics | delayed curve equation and curve-level residual vector stated; no solution proved |
| Plane-normal precession ansatz | nonplanar deformation chart and projection mechanism stated; no branch retained |
| Plane-normal precession search | curvature mismatch improves under common nonplanar mode, but tangential and Jacobian rows remain open |
| Binary-specific plane-normal search | loose binary-specific normal modes fail period compatibility and refinement; full collocation constraints required |
| Finite-mode rank screen | common six-variable radial-plus-normal Jacobian is full rank but predicts only small residual reduction; higher-dimensional collocation required |
| Intrinsic $M=2$ collocation rank | exact-antipodal vector Fourier basis has full local rank and useful clipped descent directions; constrained nonlinear solve still open |
| Intrinsic $M=2$ nonlinear solve | training-grid residuals descend strongly, root floors survive, but refinement shows off-grid peaks and open period/unit rows |
| Intrinsic $M=2$ refined solve | denser-grid force residuals improve while period-length closure becomes the dominant blocker |
| Period closure and winding targets | equal-length and rational-winding theorem targets stated; force-improving unequal-length rows remain unretained |
| Equal-period projection | length spread can be closed by a small projection while preserving root floors and most force progress; force and unit rows still open |
| Equal-period constraint qualification | length row converted into a local codimension-$2$ manifold target; restricted dynamics rank/range test on $\ker D\mathbf{L}$ remains open |
| Rational-winding screen | low-integer winding data prefer $(1,1,1)$; nontrivial winding row is unsupported for the current refined $M=2$ candidate |
| Unit-speed chart reparameterization | construction-speed spread identified as a finite Fourier chart row; arclength-inverse chart still must close root, tangential, and curvature rows |
| Arclength-inverse rescore | projected row passes speed-floor and root-count screens, but $K=18$ force peaks persist and $\Gamma_K$ convention gives a harder curvature residual |
| Arclength-inverse restricted rank screen | equal-period tangent matrix has full rank and descent directions; nonlinear trust-region acceptance remains open |
| Arclength-inverse trust-region screen | restricted nonlinear descent survives through $K=18$ and $\rho=0.8$; root-count loss at $\rho=1.2$ and support-band growth keep the row unretained |
| Antipodal relaxation ansatz | pair-midpoint chart and certificate rows stated; spin/topology risks identified |
| Retained branch dynamics protocol | staged retained-branch search algorithm and acceptance thresholds stated |
| Intrinsic curve solver protocol | Fourier/collocation variables, gauges, root solve, barriers, rank checks, and output schema stated |
| Linearized dynamics matrix | finite-mode rank/solvability target stated around the rigid octahedral row |
| Minimal dynamics closure theorem | arclength-clock theorem target and transverse-zero continuation route stated; existence remains open |
| Root/Jacobian barrier lemma | sufficient perturbation and barrier conditions stated for preserving active root labels, Jacobian floor, and finite memory |
| Gamma scale/action row | dimensional scale row and action/inertia obligations stated; fitted $\Gamma$ remains diagnostic only |
| Central inventory/event ledgers | ledger equations stated; no retained event packet yet |
| Observer exports/mass map | residuals stated; no moving-branch export computed yet |
| Source triage | converted targets and overclaims classified |

The next mathematical closure object is one retained branch packet using a single active causal-root convention. Until that object exists, same-level tri-binary remains an architecture-development candidate rather than the accepted replacement for nested tri-binary material.
