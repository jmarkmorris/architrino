# EQ-02 Through EQ-04 Lorentz-Energy Closure Packet

## Workstream Metadata

- Kind: `priority`
- Status: `priority-only`
- Assigned IDs: `EQ-02`, `EQ-03`, `EQ-04`
- Scope: Lorentz factor, moving-clock/ruler retuning, oblate spheroidal envelope, and energy-momentum/rest-energy closure.
- Edit boundary: this packet only. Do not update `equation.md` from this worker packet.

## Standard Equation And Regime

The standard observer-level target is the weak homogeneous Lorentz and mass-shell regime. Work in a local Noether sea cell with declared assembly drift

$$
\mathbf{w}
=
\mathbf{V}_{\mathrm{cm}}-\mathbf{u}_{\mathrm{sea}},
\qquad
\beta_{\star}
=
\frac{\|\mathbf{w}\|}{c_{\star}},
\qquad
\gamma_{\star}
=
\frac{1}{\sqrt{1-\beta_{\star}^{2}}}.
$$

For primitive branch tests use $c_{\star}=c_f$. For dressed observer clock/ruler and energy-momentum comparisons use $c_{\star}=c_{\text{eff}}$ after the Noether sea cell has declared $c_{\text{eff}}=c_f/\chi_{\text{sea}}$.

The clock and ruler targets are

$$
\frac{d\tau}{dt}
=
\frac{1}{\gamma_{\star}},
\qquad
L_{\parallel}
=
\frac{L_0}{\gamma_{\star}},
\qquad
L_{\perp}=L_{\perp,0}.
$$

The oblate spheroidal envelope target is

$$
\xi(v)
\equiv
\frac{R_{\parallel}(v)}{R_{\perp}(v)}
\to
\frac{1}{\gamma_{\text{eff}}(v)}.
$$

The effective energy-momentum and rest-energy target is

$$
E_{\mathrm{CM}}^2
=
p_{\mathrm{CM}}^2c_{\text{eff}}^2
+
M_0^2c_{\text{eff}}^4,
\qquad
E_{\mathrm{CM}}
=
\gamma_{\text{eff}}M_0c_{\text{eff}}^2.
$$

This is not a substrate metric claim. It is an observer-level recovery target for a stable translating Noether braid assembly in a weak homogeneous Noether sea cell. Outside that cell, any deviation must be routed through declared Noether sea density, cadence, delay, flow, stress, orientation, branch-transition, or residual rows.

## Packet Attack Card

- Current score snapshot: `EQ-02`, `EQ-03`, and `EQ-04` are each recommended at score `4` in this packet. This pass does not update [equation.md](equation.md).
- Closure driver: one retained branch record must produce the same Lorentz factor in clock phase, ruler/envelope geometry, two-way signal behavior, energy-momentum response, rest-invariance, and Noether sea response.
- Exact first blocker: the solver-facing route is now source-backed retained support plus the Cartan witness split $W_{\mathrm{supp}}/W_{\mathrm{hol}}$; the live same-branch check blocks at `missing_accepted_raw_labeled_rows_preserved_on_retained_history`, and the coframe source attempt remains blocked by source status until accepted retained support exists.
- First implementation target for this packet: priority packet refinement only, making the Direct Geometry Layer explicit while leaving accepted-support construction to the translating-binary and coframe checker lane.
- Smallest later score-moving target: one source-backed retained support carrying raw labeled rows, same-branch chart identity, extracted coframe legs, holonomy witness, clock/envelope rows, energy-momentum rows, rest-invariance row, and Noether sea response row on one branch record.

## Direct Geometry Layer

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Lorentz clock-rate factor $d\tau/dt=1/\gamma_\star$ | Branch clock phase, cycle period, local Noether sea delay/cadence, and retained drift vector read from $B_q(\mathbf w,\mathcal N)$. | Accepted translating-binary retained branch record with clock row and same-branch chart identity. | Clock phase must share branch id, Noether sea cell, drift vector, root ledger, and support window with ruler, signal, and energy rows. | Same-branch identity failure, support-id mismatch, row-binding split, and raw labeled rows missing from retained history. | Source-backed retained support with raw labeled rows preserved and a clock row extracted on the same branch chart. |
| Ruler contraction and oblate envelope ratio $\xi\to1/\gamma_{\mathrm{eff}}$ | Parallel/perpendicular branch-envelope radii, all-layer loop state, wake-return geometry, and refinement-compatible coframe legs. | Accepted envelope/coframe extraction under the same $W_{\mathrm{supp}}/W_{\mathrm{hol}}$ witness. | $R_{\parallel}$, $R_{\perp}$, extracted coframe legs, branch labels, and holonomy witness must come from the same retained support. | Declared coframe legs without extraction, extraction-basis gamma control, connection/torsion/phase/transport holonomy controls, and refinement-step mismatch. | Retained coframe extraction certificate whose source-backed support and holonomy witness pass before $\xi$ is interpreted. |
| Two-way signal and preferred-frame leakage | Two-way synchronization residual $\Delta_{\mathrm{tw}}$, signal-speed rows, and leakage budget projected from the same local Noether sea cell. | Accepted signal-speed/leakage row under the retained branch record. | Clock, ruler, signal, photon-channel when invoked, and energy rows must share $c_{\star}$, $c_{\mathrm{eff}}$, $\chi_{\text{sea}}$, and $\epsilon_{\mathrm{LV}}$ provenance. | Clock/signal split, hidden speed retune, and preferred-frame leakage beyond the declared bound. | Same-branch retained support with accepted two-way signal row and no hidden retune against clock/ruler rows. |
| Energy-momentum mass shell | Moving energy, center-of-mass momentum, wake energy, boundary flux, exposure, internal energy, and event-ledger rows. | Accepted energy-momentum event ledger on $B_q(\mathbf w,\mathcal N)$. | $E_{\mathrm{CM}}$, $p_{\mathrm{CM}}$, $M_0$, $c_{\mathrm{eff}}$, wake ledger, event row, and source/remnant rows must bind to the same branch and event support. | Energy/momentum closure as a fitted center-of-mass label, wake/history bypass, and source shell without retained evidence. | Source-backed retained event ledger proving energy, momentum, wake, boundary, source, recoil, and remnant rows on one support. |
| Rest-energy and rest-invariance row | $E_{\mathrm{internal}}$, $\zeta(A_q)$, $M_0^{\mathrm{src}}$, $M_0$, hidden-label check, and $R_{M_0}^{(q)}$. | Accepted rest-energy/mass-map row under the same branch support. | Rest mass, exposure, internal energy, Noether sea response, and moving energy rows cannot change with $\mathbf w$ or line up through a fitted particle parameter. | Velocity-dependent rest mass, exposed-energy double count, and mass-shell carrier sourced only to priority material. | Accepted retained mass-shell evidence object whose rest-energy and exposed-energy partition rows share the retained branch record. |
| Noether sea response tensor $\mathcal M_{\text{sea}}^{ab}$ | Reversible symmetric medium-response tensor, trace/trace-free residuals, source loading, and momentum/acceleration response. | Accepted Noether sea response row tied to the branch and local Noether sea cell. | Momentum, acceleration, clock/ruler, weak-gravity, and mass-map consumers must cite the same response tensor or a declared transformation row. | Private response tensor per observable, scalar-only mass map, and hidden retune across clock/ruler/energy rows. | Source-backed retained response-tensor row with provenance from the same branch support and sea cell. |

## Current Mapped Form

The live map is strong at equation level: one retained Noether braid branch must produce the same Lorentz factor in clock phase, ruler/envelope geometry, two-way signal behavior, and moving energy-momentum response.

For a branch class $q$, define the retained branch state as

$$
B_q(\mathbf{w},\mathcal{N})
=
\left(
R_I,R_M,R_O;\,
\omega_I,\omega_M,\omega_O;\,
\mathcal{L}_{\mathrm{root}};\,
\mathcal{L}_{\mathrm{wake}};\,
\mathcal{L}_{E\mathbf{p}\mathbf{J}};\,
\mathcal{Z}^{ab};\,
\mathcal{M}_{\text{sea}}^{ab}
\right)_q,
$$

where $\mathcal{N}$ is the declared local Noether sea cell. The current closure target is the common residual vector

$$
\mathcal{R}_{02-04}^{(q)}(\mathbf{w},\mathcal{N})
=
\left(
R_T^{(q)},
R_{\xi}^{(q)},
R_{\mathrm{tw}}^{(q)},
R_E^{(q)},
R_p^{(q)},
R_{M_0}^{(q)},
R_{\mathcal{M}}^{(q)}
\right).
$$

The clock and envelope residuals are

$$
R_T^{(q)}
=
\frac{T_q(\mathbf{w},\mathcal{N})}{T_q(\mathbf{0},\mathcal{N})}
-
\gamma_{\star}(\mathbf{w},\mathcal{N}),
$$

$$
R_{\xi}^{(q)}
=
\frac{R_{\parallel,q}(\mathbf{w},\mathcal{N})}{R_{\perp,q}(\mathbf{w},\mathcal{N})}
-
\frac{1}{\gamma_{\star}(\mathbf{w},\mathcal{N})}.
$$

The two-way synchronization residual is the preferred-frame leakage row

$$
R_{\mathrm{tw}}^{(q)}
=
\Delta_{\mathrm{tw}}^{(q)}(\beta_{\star},\theta),
\qquad
\left|R_{\mathrm{tw}}^{(q)}\right|
\le
\epsilon_{\mathrm{LV}}.
$$

The rest source remains branch-internal:

$$
M_0^{\mathrm{src}}(A_q)
=
\zeta(A_q)E_{\text{internal}}(A_q),
$$

with scalar readout, in the homogeneous isotropic limit,

$$
M_0(A_q)
\approx
\alpha_{\mathrm{m}}
\frac{\zeta(A_q)E_{\text{internal}}(A_q)}{c_{\text{eff}}^2}.
$$

The resolved response target is tensorial:

$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\zeta(A_q)E_{\text{internal}}(A_q)
\mathcal{M}_{\text{sea}}^{ab}V_{\mathrm{cm},b},
\qquad
\mathcal{M}_{\text{sea}}^{ab}
\to
\frac{h^{ab}}{c_{\text{eff}}^2}.
$$

The energy and momentum residuals are therefore

$$
R_E^{(q)}
=
\frac{E_{\mathrm{CM},q}}
{M_0(A_q)c_{\text{eff}}^2}
-
\gamma_{\star},
$$

$$
R_p^{(q),a}
=
\frac{p_{\mathrm{CM},q}^{a}}{M_0(A_q)c_{\text{eff}}}
-
\gamma_{\star}\frac{w^a}{c_{\text{eff}}},
$$

and the mass-shell scalar residual is

$$
R_{\mathrm{shell}}^{(q)}
=
\frac{
E_{\mathrm{CM},q}^{2}
-
c_{\text{eff}}^2h_{ab}p_{\mathrm{CM},q}^{a}p_{\mathrm{CM},q}^{b}
-
M_0^2(A_q)c_{\text{eff}}^4
}{
M_0^2(A_q)c_{\text{eff}}^4+\varepsilon_{\mathrm{shell}}
}.
$$

The rest-invariance residual forbids velocity-dependent rest mass:

$$
R_{M_0}^{(q)}
=
\frac{
M_0(A_q;\mathbf{w},\mathcal{N})
-
M_0(A_q;\mathbf{0},\mathcal{N})
}{
M_0(A_q;\mathbf{0},\mathcal{N})+\varepsilon_{M}
}.
$$

The Noether sea response residual is

$$
R_{\mathcal{M}}^{(q),ab}
=
c_{\text{eff},0}^{2}
\left(
\mathcal{M}_{\text{sea}}^{ab}
-
\frac{h^{ab}}{c_{\text{eff},0}^{2}}
\right)
$$

with trace and trace-free parts reported separately as $\delta\mathcal{M}_0$ and $\delta\mathcal{M}_{\mathrm{tf}}^{ab}$.

The combined pass condition for this packet is not that every residual vanish identically. It is that every nonzero residual be branch-sourced:

$$
\left\|\mathcal{R}_{02-04}^{(q)}\right\|
\le
\epsilon_{\mathrm{LV}}
+
\epsilon_{\mathrm{mass}}
+
\epsilon_{\mathrm{sea}},
$$

with the error budget allocated to named causal-root features, Noether sea dressing rows, finite-memory cutoff, branch transition, shape-mode excitation, or reported unresolved residue.

## Required Noether Braid Variables

| Variable or row | Required content | Consumed by |
| --- | --- | --- |
| Branch label $q$ | Stable admissible causal-root ledger class for the translating Noether braid. | Prevents clock, ruler, and mass rows from using separate hidden branches. |
| Layer geometry | $R_I,R_M,R_O$, layer axes, handedness, phase offsets, winding rows, and inter-layer closure integers. | Establishes the retained branch and separates all-layer retuning from outer-envelope projection. |
| Root ledger $\mathcal{L}_{\mathrm{root}}$ | Partner-hit and self-hit counts, active root sheets, causal emission times, Jacobian floors, and transversality margins. | Supplies the delayed branch basis for $T_q$, $\xi_q$, and stability. |
| Wake ledger $\mathcal{L}_{\mathrm{wake}}$ | Causal-wake exchanges, wake energy, boundary flux, finite-memory cutoff, and unresolved wake rows. | Prevents energy-momentum closure from bypassing causal wake provenance. |
| Clock row | Counted phase or period $T_q$, clock frequency $\omega_{\text{clk},q}$, rest reference $T_q(\mathbf{0})$, and branch phase closure. | Supplies $R_T^{(q)}$ and $d\tau/dt$. |
| Envelope row | $R_{\parallel,q}$, $R_{\perp,q}$, $\xi_q$, separate scale channel $\lambda(v,E,n)$, and oblate spheroidal envelope fit residual. | Supplies $R_{\xi}^{(q)}$ without defining $\xi$ as $1/\gamma$. |
| Energy/action row | $E_I,E_M,E_O$, interaction terms, wake terms, $E_{\text{internal}}(A_q)$, action per cycle, and energy partition. | Supplies rest-energy and moving-energy ledgers. |
| Exposure row | Far-field wake coefficients, naive constituent sum, $\zeta(A_q)$, trace-free exposure $\mathcal{Z}_{\mathrm{tf}}^{ab}$, and hidden-label checks. | Supplies $M_0^{\mathrm{src}}$ and blocks hidden mass handles. |
| Stability row | Closure residuals, return-map residuals, non-symmetry Floquet gap, and basin-retention diagnostics. | Ensures the branch is a stable assembly, not a fitted kinematic sketch. |
| Momentum/angular-momentum row | $p_{\mathrm{CM},q}^{a}$, angular-momentum ledger, recoil/boundary exchange, and branch-event provenance. | Supplies $R_p^{(q)}$ and mass-shell closure. |

## Required Noether Sea Variables

| Variable or row | Required content | Consumed by |
| --- | --- | --- |
| Local sea cell $\mathcal{N}$ | Declared weak homogeneous cell or reported gradients. | Defines the regime of the packet. |
| $\rho_{\text{NS}}(\mathbf{x},t)$ | Physical Noether braid density. | Carries physical medium state. |
| $n(\mathbf{x},t)$ | Normalized Noether braid density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$. | Feeds $\lambda(v,E,n)$ and constitutive response. |
| $\chi_{\text{sea}}(\mathbf{x},t)$ | Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$. | Declares $c_{\text{eff}}$ without confusing density with delay. |
| $\Gamma_N$ | Noether sea cadence-stretch diagnostic, $\Gamma_N=\Omega_{N0}/\Omega_N$. | Connects clock-rate extraction to sea cadence. |
| $\mathbf{u}_{\mathrm{sea}}$ | Local Noether sea drift. | Defines $\mathbf{w}=\mathbf{V}_{\mathrm{cm}}-\mathbf{u}_{\mathrm{sea}}$. |
| $\mathcal{M}_{\text{sea}}^{ab}$ | Reversible symmetric medium-response tensor, plus trace and trace-free residuals. | Converts shielded internal energy into momentum, acceleration, and gradient response. |
| $\delta\mathcal{M}_{0}$ | Trace response perturbation. | Enters scalar mass trace. |
| $\delta\mathcal{M}_{\mathrm{tf}}^{ab}$ | Trace-free response perturbation. | Couples only through response-visible trace-free exposure. |
| Signal-speed rows | $c_{\text{eff}}$, photon-channel $c_{\gamma}$ when invoked, and leakage budget $\epsilon_{\mathrm{LV}}$. | Prevents separate clock, ruler, photon, and energy speeds. |

## Event, Wake, Branch, Record, And Residual Rows Needed

| Row family | Minimal row to add or consume | Failure if absent |
| --- | --- | --- |
| Branch row | One retained $B_q(\mathbf{w},\mathcal{N})$ with root ledger, phase, wake, energy, exposure, and sea-response entries. | `equation_map.no_braid_carrier` |
| Event row | Branch update $B_q\to B_{q'}$ for drift or energy transfer, with source event, receiver event, recoil, and boundary exchange. | Energy/momentum response becomes a fitted center-of-mass label. |
| Wake row | $\mathcal{L}_{\mathrm{wake}}$ with wake energy, finite-memory cutoff, boundary flux, and unresolved wake residual. | Internal energy double-counts or omits wake/history terms. |
| Clock record | $T_q/T_0$ or $\omega_{\text{clk},q}/\omega_0$ extracted from the same branch. | Moving-clock law is assigned independently. |
| Ruler record | $R_{\parallel,q}$, $R_{\perp,q}$, $\xi_q$, and oblate spheroidal envelope residual. | Envelope is only a visual match. |
| Two-way signal record | $\Delta_{\mathrm{tw}}(\beta_{\star},\theta)$ with preferred-frame leakage budget. | One-way preferred-frame anisotropy leaks into operational observables. |
| Rest-energy record | $E_{\text{internal}}$, $\zeta$, $M_0^{\mathrm{src}}$, $M_0$, and hidden-label checks. | Rest mass becomes a fitted particle parameter. |
| Exposed-energy partition | $E_{\text{probe}}$, $E_{\text{sea-coupled}}$, $E_{\text{unresolved}}$, and $\mathcal{R}_{\text{part}}$. | The same $\zeta E_{\text{internal}}$ is reused as direct probe energy and sea-retuning source. |
| Medium-response record | $\mathcal{M}_{\text{sea}}^{ab}$, $\mathcal{M}_{+}^{ab}$, $\mathcal{M}_{-}^{ab}$, $\delta\mathcal{M}_0$, and $\delta\mathcal{M}_{\mathrm{tf}}^{ab}$. | Mass map collapses into shielding-only or dissipative-drag language. |
| Mass-shell residual | $R_E$, $R_p$, $R_{\mathrm{shell}}$, and $R_{M_0}$ on the same branch. | Energy-momentum closure is not tied to clock/ruler Lorentz closure. |

## `6/23 b` Score Recommendation

| ID | `6/23 b` recommendation | Justification |
| --- | --- | --- |
| `EQ-02` | `4` | The clock-rate and Lorentz-factor map has canonical variables and explicit residuals, but no retained branch ledger has yet derived $T_q/T_0=\gamma_{\star}$ across the required drift range. |
| `EQ-03` | `4` | The oblate spheroidal envelope map $\xi\to1/\gamma_{\text{eff}}$ has a strong closed-return derivation and canonical terminology, but still needs the all-layer branch ledger to prove the envelope ratio rather than assign it. |
| `EQ-04` | `4` | Upgrade from the first-round `3` is justified once this packet is accepted as the shared residual grammar: the canonical variables, tensor response, rest-invariance row, and mass-shell residuals are now explicit. It is not a `5` because $E_{\text{internal}}$, $\zeta(A)$, $\mathcal{M}_{\text{sea}}^{ab}$, and $M_0$ remain uncomputed for an accepted branch. |

## First Mathematical Object To Add Next

Current supersession note: the residual vector below remains useful grammar, but it is no longer the next acceptance object by itself. The current solver-facing boundary is source-backed retained support plus the Cartan witness split $W_{\mathrm{supp}}/W_{\mathrm{hol}}$. A common residual vector can become score-moving only after the rows are extracted on the same source-backed support and the holonomy witness rules out row-by-row retuning.

Add the residual definition `lorentz_mass_shell_common_branch_residual` as a priority-side theorem target:

$$
\mathcal{R}_{02-04}^{(q)}(\mathbf{w},\mathcal{N})
=
\left(
R_T^{(q)},
R_{\xi}^{(q)},
R_{\mathrm{tw}}^{(q)},
R_E^{(q)},
R_p^{(q)},
R_{\mathrm{shell}}^{(q)},
R_{M_0}^{(q)},
R_{\mathcal{M}}^{(q)}
\right),
$$

with the theorem target:

> For every stable admissible clock/ruler branch $q$ in a weak homogeneous Noether sea cell, the same retained branch ledger that produces $R_T^{(q)}$ and $R_{\xi}^{(q)}$ must also produce $R_E^{(q)}$, $R_p^{(q)}$, $R_{\mathrm{shell}}^{(q)}$, and $R_{M_0}^{(q)}$ within the declared leakage and mass-map residual budgets.

The first executable version should be a translating maximum-curvature binary simulation target before nested shell braid averaging is invoked. It should output $T_q/T_0$, $\xi_q$, $E_{\text{internal}}$, preliminary $\zeta$ or a declared absence of shielding extraction, $p_{\mathrm{CM}}^a$, $E_{\mathrm{CM}}$, $\Delta_{\mathrm{tw}}$, and a branch-sourced residual label for every nonzero row.

## Failure Mode Or Falsifier

This packet fails if any one of these conditions occurs on the declared branch family:

1. $R_T^{(q)}$ and $R_{\xi}^{(q)}$ require different branch ledgers, speed conventions, or Noether sea cells.
2. $R_E^{(q)}$, $R_p^{(q)}$, or $R_{\mathrm{shell}}^{(q)}$ can be reduced only by changing $M_0$, $\zeta$, $\mathcal{M}_{\text{sea}}^{ab}$, or $c_{\text{eff}}$ separately from the clock/ruler rows.
3. $R_{M_0}^{(q)}$ is nonzero beyond tolerance, meaning the packet has introduced velocity-dependent rest mass rather than moving center-of-mass response.
4. The scalar mass trace depends on a discarded branch label, producing a hidden mass handle.
5. The exposed-energy partition double-counts $\zeta E_{\text{internal}}$ as both direct probe energy and Noether sea retuning source.
6. The required response is ordinary dissipative drag in a stable bound state rather than reversible branch retuning plus reported transport or transition residuals.
7. Preferred-frame leakage $\Delta_{\mathrm{tw}}$ exceeds the declared bound after the clock, ruler, signal, and energy rows are all projected to observer records.

## Candidate Promotion Targets

This packet remains priority-only until the common residual has an accepted branch calculation or a worked theorem route. If it matures, candidate promotion targets are:

- `content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md` - bridge commitment and side-by-side map.
- `content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md` - return-cycle branch-indexed Lorentz response.
- `content/markdown/aaa/spacetime/lorentz-kinematics.md` - theorem targets and preferred-frame residuals.
- `content/markdown/aaa/spacetime/proper-time-and-time-dilation.md` - derived clock time and moving-clock extraction.
- `content/markdown/aaa/assemblies/particle-masses.md` - rest-energy, mass trace, and medium-response mass map.
- `content/markdown/aaa/dynamics/energy.md` - effective energy-momentum closure, once the event and wake ledgers are explicit.
- `content/markdown/aaa/spacetime/emergent-metric.md` - only after the same Noether sea response rows also support clock, ruler, signal, and weak-field metric projection.

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: the packet has a shared residual grammar, but no accepted branch calculation has yet populated the translating-binary retained record, same-root conservation residual, Lorentz clock/envelope rows, energy-momentum rows, rest-invariance row, and Noether sea response row on one branch. The newer translating-binary instantiation is the solver-facing blocker document.

## Worker Handoff

This packet is a priority-side closure object. It does not claim derivation closure. The translating-binary instantiation is now staged in [EQ-02 Through EQ-04 Translating Binary Shared-Record Instantiation](eq-02-04-translating-binary-shared-record-instantiation.md). The useful next pass is to populate the source-backed retained support and the $W_{\mathrm{hol}}$ transport witness in the solver, then decide which residual rows can survive into the nested shell braid branch without independent retuning.
