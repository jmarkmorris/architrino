# Observer Export And Mass-Map Targets For Same-Level Tri-Binary Branches

This priority note converts the same-level tri-binary observer-facing claims into export rows that a retained branch packet must compute before any downstream promotion. It is a priority-only theorem-target document. It does not authorize migration into `content/markdown/aaa`, scene assets, simulation defaults, or end-user language.

Promotion status: `priority-only`. The material below becomes promotion-ready only after a same-level branch certificate supplies active causal roots, positive Jacobian floors, finite memory depth, same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$ rows for every force/action or mass-response contribution, fixed-speed tangent closure or bounded-speed speed-ODE closure, a history-dressed energy/action ledger, exposure and Noether sea response rows, and observer exports marked `passed`, `failed`, or `not_computed`.

If the branch uses the bounded speed factor in [variable-speed-factor-extension.md](variable-speed-factor-extension.md), every observer export below must be recomputed on the bounded-speed ledger. In particular, the moving-assembly clock/ruler row must replace the fixed-speed condition by

$$
\|\mathbf{v}+\mathbf{u}_{\perp}^{(\mathbf{v})}\|
=
c_f\nu_{\perp}^{(\mathbf{v})},
$$

so Lorentz recovery becomes a theorem target about speed-factor retuning rather than a direct consequence of strict fixed speed. The mass map must likewise include the kinetic contribution proportional to $c_f^2\nu_i^2$ and any speed-factor storage or exchange.

Claim discipline:

| Claim family | Status here | Required closure object |
| --- | --- | --- |
| Moving-branch export | theorem target | retained moving branch row with drift, carrier, clock, ruler, and preferred-frame leakage diagnostics |
| Lorentz recovery | theorem target | derivation from branch existence, carrier retuning, clock extraction, shape extraction, two-way synchronization, and leakage bounds |
| Photon transition | branch-transition target | planar limit row matching the coaxial contra-rotating pro/anti planar pair requirement |
| Mass map | theorem target | history-dressed energy, receiver-normal exposure tensor, scalar exposure quotient, and Noether sea medium-response tensor on the same branch |
| Generation hierarchy | theorem target | branch-family rows whose mass ratios come from exposure-dressed energy, not from topological labels alone |
| Color / $SU(3)$ | theorem target | continuous phase-bundle connection and generators; $\mathcal{S}_3$ remains a discrete scaffold |
| Strong-field continuation | speculative comparison target | finite-boundary continuation, event-ledger closure, and observer-level recovery residuals |

---

## 1. Moving-Branch Export Definition

Let $q$ be a retained shell braid branch candidate over a window $W$, and let $\mathbf{C}^{(\mathbf{v})}(t)$ be the branch center in a moving row with constant drift velocity

$$
\dot{\mathbf{C}}^{(\mathbf{v})}(t)=\mathbf{v},
\qquad
v=\|\mathbf{v}\|,
\qquad
\beta=\frac{v}{c_f},
\qquad
\gamma=(1-\beta^2)^{-1/2}.
$$

For each constituent architrino define the center-relative internal carrier velocity and absolute constituent velocity by

$$
\mathbf{u}_i^{(\mathbf{v})}(t)
=
\dot{\mathbf{x}}_i^{(\mathbf{v})}(t)-\mathbf{v},
\qquad
\mathbf{U}_i^{(\mathbf{v})}(t)
=
\dot{\mathbf{x}}_i^{(\mathbf{v})}(t)
=
\mathbf{v}+\mathbf{u}_i^{(\mathbf{v})}(t).
$$

The moving-branch observer export is the tuple

$$
\mathcal{O}_q(\mathbf{v};W)
=
\left(
X_q^{(\mathbf{v})},
\mathcal{A}_q^{(\mathbf{v})},
J_{\min}^{(q)}(\mathbf{v}),
h_{\mathrm{mem}}^{(q)}(\mathbf{v}),
\mathbf{u}^{(\mathbf{v})},
\mathbf{U}^{(\mathbf{v})},
T_q(\mathbf{v}),
\Theta_{\mathrm{clk}}^{(q)}(\mathbf{v}),
R_{\parallel}^{(q)}(\mathbf{v}),
R_{\perp}^{(q)}(\mathbf{v}),
\xi_q(\mathbf{v}),
\lambda_q(\mathbf{v}),
\Delta_{\mathrm{tw}}^{(q)}(\mathbf{v}),
\mathcal{A}_{\mathrm{pf}}^{(q)}(\mathbf{v}),
\mathcal{R}_{\mathrm{obs}}^{(q)}(\mathbf{v})
\right),
$$

where

$$
\Theta_{\mathrm{clk}}^{(q)}(\mathbf{v})
=
\frac{T_q(\mathbf{0})}{T_q(\mathbf{v})},
\qquad
\xi_q(\mathbf{v})
=
\frac{R_{\parallel}^{(q)}(\mathbf{v})}{R_{\perp}^{(q)}(\mathbf{v})},
\qquad
\lambda_q(\mathbf{v})
=
\frac{R_{\perp}^{(q)}(\mathbf{v})}{R_{\perp}^{(q)}(\mathbf{0})}.
$$

Here $T_q(\mathbf{v})$ is the extracted internal clock period from the retained moving branch, $R_{\parallel}^{(q)}$ and $R_{\perp}^{(q)}$ are envelope or invariant-measure radii parallel and transverse to $\mathbf{v}$, $\Delta_{\mathrm{tw}}^{(q)}$ is the two-way signal anisotropy mismatch, and $\mathcal{A}_{\mathrm{pf}}^{(q)}$ is the preferred-frame leakage diagnostic.

The observer residual row is

$$
\mathcal{R}_{\mathrm{obs}}^{(q)}
=
\left(
\mathcal{R}_{\mathrm{ret}},
\mathcal{R}_{\mathrm{carrier}},
\mathcal{R}_{\mathrm{clk}},
\mathcal{R}_{\mathrm{shape}},
\mathcal{R}_{\mathrm{ruler}},
\mathcal{R}_{\mathrm{tw}},
\mathcal{R}_{\mathrm{pf}}
\right),
$$

with target components

$$
\mathcal{R}_{\mathrm{clk}}
=
\Theta_{\mathrm{clk}}^{(q)}-\gamma^{-1},
\qquad
\mathcal{R}_{\mathrm{shape}}
=
\xi_q-\gamma^{-1},
\qquad
\mathcal{R}_{\mathrm{ruler}}
=
\lambda_q-1,
\qquad
\mathcal{R}_{\mathrm{tw}}
=
\Delta_{\mathrm{tw}}^{(q)}.
$$

The leakage term must bound orientation and phase dependence rather than merely report a favorable run. A usable target is

$$
\mathcal{A}_{\mathrm{pf}}^{(q)}(\beta)
=
\sup_{G\in SO(3)}
\left|
\Theta_{\mathrm{clk}}^{(Gq)}(\mathbf{v})
-\Theta_{\mathrm{clk}}^{(q)}(\mathbf{v})
\right|
+
\sup_{\hat{\mathbf{n}},\hat{\mathbf{m}}}
\left|
\frac{c_{2\mathrm{w}}^{(q)}(\hat{\mathbf{n}};\mathbf{v})
-c_{2\mathrm{w}}^{(q)}(\hat{\mathbf{m}};\mathbf{v})}
{c_f}
\right|.
$$

A moving branch export passes only if it is computed on the same retained active-root row as the energy, exposure, receiver-normal branch-strength, and event ledgers. A clock ratio measured on a different branch, different endpoint convention, or different root-selection rule is not an observer export.

Receiver-normal export blocker. Observer exports that feed mass response,
energy/action comparison, or wake-history accounting must carry
$$
D_{s,\rho},
\qquad
D_{T,\rho},
\qquad
W_{\rho}^{\mathrm{rec}}=\left|D_{T,\rho}/D_{s,\rho}\right|
$$
on the same retained root row as the exported branch contribution. If the
export consumes a derivative-sensitive row, it must also carry
$D_vD_{s,\rho}$, $D_vD_{T,\rho}$, and reconstructed
$D_vW_{\rho}^{\mathrm{rec}}$ with the same branch-family checksum. H39/theta3minus
quotient diagnostics, source-normal denominators, old shell-braid force
residues, and terminal aggregates may remain provider-boundary or
root-geometry diagnostics, but they are not observer-export or mass-map
evidence.

---

## 2. Lorentz Theorem-Target Derivation Route

The source signal behind the same-level architecture is the elementary transverse carrier calculation. If a clock carrier in the moving branch satisfies

$$
\left\|\mathbf{v}+\mathbf{u}_{\perp}^{(\mathbf{v})}\right\|=c_f,
\qquad
\mathbf{v}\cdot\mathbf{u}_{\perp}^{(\mathbf{v})}=0,
$$

then

$$
\left\|\mathbf{u}_{\perp}^{(\mathbf{v})}\right\|^2
=
c_f^2-v^2
=
c_f^2(1-\beta^2),
\qquad
\frac{\left\|\mathbf{u}_{\perp}^{(\mathbf{v})}\right\|}{c_f}
=
\gamma^{-1}.
$$

This proves only a local speed-ratio identity for a transverse carrier. It becomes a clock theorem only after the moving branch also proves that the extracted clock period is controlled by that carrier without an unresolved radius or phase retuning:

$$
\Theta_{\mathrm{clk}}^{(q)}(\mathbf{v})
=
\frac{\omega_q(\mathbf{v})}{\omega_q(\mathbf{0})}
=
\frac{\left\|\mathbf{u}_{\perp}^{(\mathbf{v})}\right\|}{c_f}
\frac{R_{\perp}^{(q)}(\mathbf{0})}{R_{\perp}^{(q)}(\mathbf{v})}
+\mathcal{E}_{\mathrm{phase}}^{(q)}(\mathbf{v}).
$$

Thus $\Theta_{\mathrm{clk}}^{(q)}=\gamma^{-1}$ follows only under the additional closure conditions

$$
\lambda_q(\mathbf{v})=1,
\qquad
\mathcal{E}_{\mathrm{phase}}^{(q)}(\mathbf{v})=0,
\qquad
\mathcal{R}_{\mathrm{ret}}=\mathcal{R}_{\mathrm{carrier}}=0
\quad
\text{within tolerance}.
$$

The Lorentz theorem target is therefore a ladder:

1. Retained moving branch existence: $X_q^{(\mathbf{v})}$ has finite active causal roots, $J_{\min}^{(q)}(\mathbf{v})>\epsilon_J$, finite $h_{\mathrm{mem}}^{(q)}(\mathbf{v})$, and fixed-speed tangent closure or bounded-speed speed-ODE closure.
2. Carrier retuning: the absolute constituent speed row and transverse carrier row explain the $\gamma^{-1}$ speed ratio without assuming it.
3. Clock extraction: $T_q(\mathbf{v})$ is measured from the retained internal phase or invariant measure and gives $\Theta_{\mathrm{clk}}^{(q)}-\gamma^{-1}$ below tolerance.
4. Ruler extraction: the moving branch envelope gives $\xi_q-\gamma^{-1}$ and $\lambda_q-1$ below tolerance.
5. Two-way synchronization: $c_{2\mathrm{w}}^{(q)}(\hat{\mathbf{n}};\mathbf{v})$ is direction-independent within tolerance after clock/ruler retuning.
6. Preferred-frame leakage bound: $\mathcal{A}_{\mathrm{pf}}^{(q)}(\beta)$ remains below the declared leakage tolerance across phase, orientation, and branch-refinement sweeps.

What remains to prove is not the algebraic identity above. The open work is proving that the same-level delay dynamics actually produce the retained moving branch and the coupled clock/ruler/signal rows over a useful $\beta$ interval.

---

## 3. Photon Branch-Transition Target

The photon limit is a branch-transition target, not a label inherited from a boosted massive branch. Let $\hat{\mathbf{n}}=\mathbf{v}/v$ and let $\mathcal{P}_{\perp}$ be projection onto the plane orthogonal to $\hat{\mathbf{n}}$. A candidate transition row is

$$
\Pi_{\gamma}(q)
=
\lim_{\beta\to1^-}
\mathcal{P}_{\perp}X_q^{(\mathbf{v})},
$$

if the limit exists in the retained branch topology and in the event ledger.

To match the canonical free-photon requirement, the limit must resolve into a coaxial contra-rotating pro/anti planar pair. A transition packet must therefore emit

$$
\mathcal{P}_{\gamma}
=
\left(
\hat{\mathbf{n}},
\mathcal{P}_{+},
\mathcal{P}_{-},
\omega_{+},
\omega_{-},
\Delta_{\parallel},
c_{\gamma},
\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{\gamma}
\right),
$$

with residuals

$$
\mathcal{R}_{\gamma}
=
\left(
\frac{\Delta_{\parallel}}{R_{\perp}},
\|\hat{\mathbf{n}}_{+}\times\hat{\mathbf{n}}_{-}\|,
\frac{|\omega_{+}+\omega_{-}|}{\max(|\omega_{+}|,|\omega_{-}|)},
\mathcal{R}_{\mathrm{pro/anti}},
\mathcal{R}_{\mathrm{speed}},
\mathcal{R}_{\mathrm{ledger}}
\right).
$$

The entries mean:

| Residual | Target |
| --- | --- |
| $\Delta_{\parallel}/R_{\perp}$ | planar thickness vanishes or is below tolerance |
| $\|\hat{\mathbf{n}}_{+}\times\hat{\mathbf{n}}_{-}\|$ | the pro and anti planar components are coaxial |
| $|\omega_{+}+\omega_{-}|/\max(|\omega_{+}|,|\omega_{-}|)$ | the two planar components are contra-rotating |
| $\mathcal{R}_{\mathrm{pro/anti}}$ | pro/anti inventory, polarity, and chirality ledgers close |
| $\mathcal{R}_{\mathrm{speed}}$ | photon-channel speed row passes the declared Gate A target |
| $\mathcal{R}_{\mathrm{ledger}}$ | $E$, $\mathbf{p}$, $\mathbf{J}$, and $Q$ close through the transition |

The same-level branch may supply a route into this planar row, but the photon claim fails unless the coaxial contra-rotating pro/anti planar pair is explicitly recovered.

---

## 4. Mass Formula Route

Topological branch labels may index branch families, but they are not a mass formula. For a retained branch $A$, the mass route begins with the history-dressed energy row $E_{\mathrm{hist}}^{(A)}(t)$ computed on the same active roots as the force residuals. Define the window-averaged branch energy by

$$
\overline{E}_{\mathrm{hist}}^{(A)}
=
\frac{1}{|W|}
\int_W E_{\mathrm{hist}}^{(A)}(t)\,dt,
$$

provided the energy residual satisfies

$$
\mathcal{R}_{E}^{(A)}
=
\sup_{t\in W}
\frac{|E_{\mathrm{hist}}^{(A)}(t)-E_{\mathrm{hist}}^{(A)}(t_0)|}{\epsilon_E}
\le1.
$$

Let $\mathcal{Z}_A^{ab}$ be the exposed history-energy tensor extracted from the branch response to external probe, drift, or medium-gradient perturbations. It must be symmetric in $a,b$ and computed by a declared extraction map $\mathfrak{E}$:

$$
\mathcal{Z}_A^{ab}
=
\mathfrak{E}^{ab}
\left[
X_A,\mathcal{H}_A,\mathcal{A}_A,E_{\mathrm{hist}}^{(A)}
\right].
$$

The scalar exposure quotient is

$$
\zeta_A
=
\frac{h_{ab}\mathcal{Z}_A^{ab}}
{3\overline{E}_{\mathrm{hist}}^{(A)}}.
$$

Let $\mathcal{M}_{\mathrm{sea},A}^{ab}$ be the Noether sea medium-response tensor, with the same tensor units as $\mathcal{Z}_A^{ab}$. It records the coherent medium update that accompanies the exposed branch response and is not ordinary dissipative drag.

The candidate inertial exposure tensor is

$$
\mathsf{I}_A^{ab}
=
\frac{1}{c_f^2}
\left(
\mathcal{Z}_A^{ab}
+
\mathcal{M}_{\mathrm{sea},A}^{ab}
\right),
$$

and the scalar translational mass target is

$$
m_{\mathrm{tr}}(A)
=
\frac{1}{3}h_{ab}\mathsf{I}_A^{ab}
=
\frac{\overline{E}_{\mathrm{hist}}^{(A)}}{c_f^2}
\left(
\zeta_A
+
\frac{h_{ab}\mathcal{M}_{\mathrm{sea},A}^{ab}}
{3\overline{E}_{\mathrm{hist}}^{(A)}}
\right).
$$

The mass residual row is

$$
\mathcal{R}_{m}^{(A)}
=
\left(
\mathcal{R}_{E},
\mathcal{R}_{\mathcal{Z}},
\mathcal{R}_{\zeta},
\mathcal{R}_{\mathrm{sea}},
\mathcal{R}_{\mathrm{tensor}},
\mathcal{R}_{\mathrm{refine}},
\mathcal{R}_{\mathrm{ratio}}
\right).
$$

The row fails if $m_{\mathrm{tr}}$ is replaced by a standalone topological law such as $m\propto\ln(\lambda_\phi)$ without showing how $\lambda_\phi$ changes $E_{\mathrm{hist}}$, $\mathcal{Z}^{ab}$, $\zeta$, or $\mathcal{M}_{\mathrm{sea}}^{ab}$.

---

## 5. Generation, Color, And Strong-Field Export Rows

The same branch packet should carry observer export rows for generation, color, and strong-field continuation, but their claim levels differ.

| Export row | Claim status | Required residuals |
| --- | --- | --- |
| `generation_family` | theorem target | retained branch-family labels $A_1,A_2,A_3$; $m_{\mathrm{tr}}(A_k)$ from the mass formula above; energy/exposure rows stable under branch refinement; empirical-ratio residuals reported as targets, not assumed wins |
| `phase_shielding` | theorem target | far-wake cancellation tensor, scalar exposure quotient changes, and event-ledger rows showing how phase slip increases exposed response without changing charge inventory |
| `color_connection` | theorem target | continuous phase-bundle connection $\nabla_\mu^{\mathrm{color}}=\partial_\mu+A_\mu^AT_A$, generator algebra $[T_A,T_B]=\mathrm{i}f_{AB}{}^CT_C$, curvature, transport, and confinement residuals; $\mathcal{S}_3$ alone is `not_computed` for continuous $SU(3)$ |
| `strong_field_continuation` | speculative comparison target | finite-boundary continuation, closed event ledger, effective observer-variable recovery, and no promotion of black-hole or inflation-like claims without finite residuals |
| `cosmology_export` | speculative comparison target | Euclidean void remains fixed; $a(t)$, $H(t)$, redshift, temperature, and horizon language must be translated into Noether sea evolution, transport, and clock-rate comparison |

For strong fields, a compact region $\Omega$ has a minimum export row

$$
\mathcal{S}_{H}(\Omega)
=
\left(
F_H,
\mathcal{R}_H(\Omega),
\mathcal{B}_H,
\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{\Omega},
\mathcal{R}_{\mathrm{obs}}^{\Omega},
\mathcal{R}_{\mathrm{sea}}^{\Omega}
\right),
$$

with the speculative comparison target

$$
F_H=0,
\qquad
\mathcal{R}_H(\Omega)<\infty,
\qquad
0<|\mathcal{B}_H|<\infty,
\qquad
\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{\Omega}=0
\quad
\text{within tolerance}.
$$

A planar-at-boundary to spherical-interior story is not a proof unless the branch packet supplies the finite continuation map and shows that observer exports remain ledger-closed through the transition.

---

## 6. Failure Modes

Reserved failure codes for this lane:

| Failure code | Trigger |
| --- | --- |
| `moving-branch-not-retained` | the drifted row loses active-root finiteness, positive Jacobian floor, finite memory depth, or tangential closure |
| `carrier-speed-overclaim` | $\gamma^{-1}$ is asserted from the transverse algebra without proving branch carrier retuning |
| `clock-radius-confound` | clock ratio mixes carrier-speed change with unresolved radius or phase retuning |
| `shape-ruler-open` | $\xi_q-\gamma^{-1}$ or $\lambda_q-1$ is not below tolerance |
| `preferred-frame-leakage-open` | orientation, phase, or two-way signal anisotropy exceeds leakage tolerance |
| `photon-pair-mismatch` | planar limit does not recover a coaxial contra-rotating pro/anti planar pair |
| `photon-ledger-open` | photon transition does not close $E$, $\mathbf{p}$, $\mathbf{J}$, or $Q$ |
| `topology-mass-shortcut` | generation mass is assigned directly to a mapping-class label without exposure-dressed energy extraction |
| `exposure-refinement-open` | $\mathcal{Z}^{ab}$, $\zeta$, or $\mathcal{M}_{\mathrm{sea}}^{ab}$ changes under extraction or branch refinement beyond tolerance |
| `sea-response-as-drag` | Noether sea medium response is treated as ordinary dissipative drag rather than a coherent response tensor |
| `generation-ratio-fail` | branch-family masses do not reproduce the declared ratio targets within uncertainty |
| `color-slot-overclaim` | $\mathcal{S}_3$ slots are promoted to continuous $SU(3)$ without connection, generator, and curvature rows |
| `strong-field-boundary-open` | finite-boundary continuation or event-ledger closure is missing in a strong-field claim |
| `cosmology-ontology-leak` | effective expansion variables are stated as expansion of the Euclidean void |

---

## 7. Simulation Observables

A simulation packet intended to advance this lane should emit the following observables for each branch, each drift value, and each refinement level:

1. `moving_branch`: branch id, $\mathbf{v}$, $\beta$, $\gamma$, endpoint convention, root-selection rule, and status.
2. `root_retention`: active roots, delays, $J_{\min}$, memory depth, near-zero self-root status, and tangential residuals.
3. `carrier_kinematics`: $\mathbf{u}_i^{(\mathbf{v})}$, $\mathbf{U}_i^{(\mathbf{v})}$, transverse and longitudinal decompositions, and carrier-speed residuals.
4. `clock_export`: $T_q(\mathbf{0})$, $T_q(\mathbf{v})$, $\Theta_{\mathrm{clk}}$, phase residual, and extraction method.
5. `ruler_export`: $R_{\parallel}$, $R_{\perp}$, $\xi_q$, $\lambda_q$, envelope or invariant-measure extraction method, and refinement residuals.
6. `signal_export`: two-way signal rows $c_{2\mathrm{w}}(\hat{\mathbf{n}};\mathbf{v})$, synchronization convention, and $\Delta_{\mathrm{tw}}$.
7. `preferred_frame`: orientation and phase sweep of $\mathcal{A}_{\mathrm{pf}}$, with max, mean, and worst-case branch identifiers.
8. `photon_transition`: planar thickness, coaxial residual, contra-rotation residual, pro/anti inventory, photon-channel speed row, and event ledger.
9. `energy_exposure_mass`: $E_{\mathrm{hist}}$, $\mathcal{Z}^{ab}$, $\zeta$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, $\mathsf{I}^{ab}$, $m_{\mathrm{tr}}$, and refinement residuals.
10. `generation_color_strong_field`: generation-family mass ratios, color-connection rows, strong-field finite-boundary rows, and speculative comparison status.
11. `stability`: Lyapunov spectrum, NHIM domination row, return-map gap, and branch survival over the declared window.
12. `failure_codes`: every open row above marked as `passed`, `failed`, or `not_computed`, with tolerance and provenance.

The minimum useful run is a $\beta$ sweep on one retained branch with all rows emitted as data, even if several rows are `not_computed`. A single favorable $\beta$ sample cannot certify Lorentz recovery, photon transition, or mass extraction.

---

## 8. Priority Outcome

This document stages the observer-export and mass-map target surface for the same-level tri-binary architecture. It does not decide the architecture. The next mathematical closure object is a retained moving branch packet that computes $\mathcal{O}_q(\mathbf{v};W)$, $\mathcal{R}_{\gamma}$, and $\mathcal{R}_m^{(A)}$ on the same active-root and event-ledger convention.
