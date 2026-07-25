# Same-Record Energy-Ledger Methodology

Status: priority-only energy methodology, version `v0.5`, 2026-07-22. The complete-cycle normal causal-wake flux diagnostic developed in Section 5.9 and its frequency-resolved extension in Section 5.10 are promoted into the prescribed-record analytical methodology and implemented in the B1 streaming reducer. Section 15 records the ordered future-consideration sequence. The remaining energy methodology stays priority-only and authorizes no escaping-energy or total-braid-energy fraction.

Promotion classification: `mixed`. The complete-cycle normal causal-wake flux diagnostic is `promote now` as an analytical wake measure. The energy construction remains `priority-only`, blocked by the missing accepted delayed action for the canonical Master Equation, missing receiver-side and realized-work entries in current analytical packets, missing spatial localization of the action-level Noether charge, missing prescribed-drive work, and missing Noether-sea exchange.

## 1. Plain-language verdict

The proposed concept is mathematically definable as a **candidate same-record program**, but not as a currently evaluable braid-energy fraction.

The current prescribed-path evaluator can derive causal roots, $D_t$, $W^{\mathrm{acc}}$, wake exposure, and virtual-probe acceleration response from exact imposed paths. Those rows are not energy. The canonical result packet does not contain $D_r$, moving-receiver root playback, realized receiver power, external drive work, an action-boundary energy, a spatial energy-boundary functional, or a Noether-sea response. The complete-cycle surface packet adds acceleration-exposure, angular, spectral, and radial reductions, but it explicitly excludes energy.

A prescribed repeating path is maintained kinematically. If its causal interactions export energy while the path repeats, the balance requires the missing external prescription to supply the exported energy unless a same-record environment row supplies it. That export cannot be called spontaneous braid loss.

The strongest currently legitimate split is therefore:

1. retain the existing wake and acceleration-exposure measures exactly as diagnostics;
2. add, if independently checked, a separate normal-projected causal-wake flux diagnostic whose raw cycle denominator is fixed by the declared source normalization;
3. permit a separate prescribed-path **work and drive diagnostic** after moving receiver rows are added; and
4. reserve total energy, wake-history energy, surface energy transport, and intrinsic leakage for a realized branch whose acceleration, action, boundary, and Noether-sea rows close on one record.

The proposed enclosing-surface idea has one crucial correction. The plain surface integral of the scalar wake $\mathcal W$ is not generally invariant: it omits the outward-normal projection, and the region between two surfaces can hold a time-varying amount of wake measure. On a complete return cycle, however, a normal-projected, transmitter-tagged raw flux has a candidate surface-independent integral when the source paths stay inside both fixed convex surfaces and the stored wake measure returns to the same state. Its signed or cancellation-reduced companion need not be independent of radius. This creates a useful linear wake-cancellation diagnostic, not an energy or potential measure.

The recommended program choice is **open a realized-branch energy program tied to the delayed action**. A prescribed-path work diagnostic is a useful prerequisite, but it is not the energy program and cannot support an escaping-energy fraction.

Falsifier: this verdict is overturned if a current authoritative packet is shown to contain, on one source and protocol identity, the moving-receiver $D_r$ rows, realized power, drive work, action-derived Noether charge, spatial boundary term, and any required Noether-sea exchange, with an accepted same-action identity connecting them. The inspected V1 packets do not contain those rows.

## 2. Claim map

| Grade | Claim | Scope and authority | Falsifier |
| --- | --- | --- | --- |
| Derived | On a simple causal root, $dT_t/dT_r=D_r/D_t$ and $W^{\mathrm{acc}}=c_f/|D_t|$ are different objects. | Algebraic consequence of the causal-root condition on the canonical branch chart. | A retained simple root violating the differentiated causal constraint. |
| Derived | After a kinetic scalar $K(s)$ is declared, realized per-hit power is $P=\mu_K(s)\mathbf A\cdot\mathbf V$, with $\mu_K(s)=K'(s)/s$. | Same receiver path, same hit, same absolute time. | Direct differentiation of $K(\|\mathbf V\|)$ disagrees on a differentiable receiver path. |
| Derived | For an imposed path, the drive-power row is fixed by the prescribed acceleration minus all retained interaction and environment accelerations. | Bookkeeping identity after the complete acceleration inventory and kinetic convention are declared. | The complete same-record kinetic-energy rate fails to equal interaction plus drive plus environment power. |
| Measured implementation fact | Canonical `result-packet.v1` roots contain transmitter velocity, $D_t$, $W^{\mathrm{acc}}$, wake rows, and stationary-probe acceleration rows, but no receiver velocity, $D_r$, root playback, realized power, drive work, action charge, or sea exchange. | Direct inspection of `AnalyticalBraidEvaluator.mjs` and the checked small fixture on 2026-07-22. | Any named field is found in the canonical V1 root or reduced-measure schema under the same semantics. |
| Measured implementation fact | The complete-cycle reduction reports exposure, complete-cycle normal causal-wake flux, angular `power` in the signal-processing sense, spectra, and radial scaling while excluding energy. | Direct inspection and tests of `B1StreamingReductions.mjs` on 2026-07-22. | The reducer emits an energy-dimensioned entry derived from the delayed action or omits the declared wake-flux entries. |
| Candidate definition | A same-action time-cut charge may define wake-history energy in flight. | Requires one time-translation-invariant delayed action whose Euler variation yields the accepted acceleration row. | The Euler residual, endpoint residual, or time-translation charge fails under refinement. |
| Candidate definition | A localized time-cut charge and its boundary variation may define energy inside $V_R$ and transport through $S_R$. | Requires a spatial localization derived from the same nonlocal action; wake amplitude is not a substitute. | The proposed localization changes the total charge, violates the shell identity, or produces radius-dependent imbalance after in-flight storage is included. |
| Derived | The source-normalized causal-wake distribution admits a normal-projected transport identity away from causal-root folds. | Distributional differentiation of the already-declared $\mathcal W$ kernel; this is a wake-measure identity, not an energy law. | An independently evaluated static-source case fails the closed-surface identity, or the shell-storage balance fails under refinement. |
| Candidate diagnostic | Over a complete periodic return cycle, the transmitter-tagged raw causal-wake flux through any fixed convex enclosing surface equals the cycle duration times the summed absolute source normalization when the shell storage is periodic. | Requires complete history, complete roots, fixed surfaces containing every source path, and declared fold handling. | The raw cycle integral changes with enclosing radius after quadrature, history, and root refinements, or the shell storage does not return to its initial value. |
| Inferred | A residual-to-raw normal-flux ratio can measure signed wake cancellation without becoming an energy fraction. | Triangle inequality and the transmitter-tagged raw denominator; radius invariance of the residual is not assumed. | The ratio leaves $[0,1]$ with a valid denominator, or a result is interpreted as energy, realized work, or intrinsic leakage. |
| Inferred | Complete-cycle scalar cancellation can hide frequency-selective cancellation, so the normal wake-flux diagnostic requires transmitter-tagged complex coefficients before superposition. | A phase-preserving Fourier reduction over the same complete return cycle, resolved jointly by temporal harmonic, angular mode, and radius. | The frequency-resolved rows fail to reconstruct the signed time-and-surface samples, fail refinement, or are interpreted as emitted energy. |
| Inferred | Frequency-resolved wake coefficients may index an action-derived braid-energy decomposition, but they do not determine potential-like or kinetic-like storage without the same-action modal kernel and internal-state observability. | Candidate bridge from the periodic retained branch to an action-derived Noether charge; external wake coefficients are output coordinates, not the charge itself. | Two admitted branches have the same external coefficient ledger but different action-derived charges, or no kernel derived from the accepted action reproduces the same-record balance. |
| Inferred | Gross outward transport, signed net transport, outside storage, and eventual receiver work are inequivalent. | Follows from allowing simultaneous inward/outward transport, finite in-flight storage, and actual receiver paths. | A same-action theorem proves the quantities identical under explicitly stated restrictions. |
| Inferred | An intrinsic leakage ratio requires an unforced realized branch or an explicit subtraction of same-record drive and environment work. | Balance-law consequence; recommendation rather than completed branch result. | A driven prescribed cycle closes with nonzero export and zero drive/environment work under an accepted same-record ledger. |
| Unresolved closure target | The normalized characteristic-tail action candidate yields the canonical Master Equation and a lower-bounded Noether energy on a retained braid branch. | Current corpus action program. | A nonzero irreducible Euler residual or unbounded energy on an admitted chart rejects the candidate. |
| Unresolved closure target | Noether-sea energy and exchange can be read from the same branch response record as the braid ledger. | Required only for an embedded branch. | Independent tuning or incompatible sea records are required to close the balance. |

No numerical energy result was measured in this exploration.

## 3. Same-record dependency diagram

```text
exact source and receiver paths on one record
  |-- positions, velocities, prescribed accelerations, polarities
  v
complete causal-root ledger
  |-- partner hits and self-hits
  |-- retained history, inactive gaps, regulator, boundary convention
  v
D_t -----------------------> W^acc ---------------------> per-hit acceleration
  |                                                        |
  |                                                        +-- receiver velocity + K
  |                                                            -> realized receiver power
  v
D_r / D_t -> signed root playback                              -> receiver work
  |
  +------------------------------------------------------------+
                                                               |
prescribed acceleration - interaction acceleration - environment acceleration
  -> external drive acceleration -> external drive power ------+
                                                               |
time-translation-invariant delayed action on the same roots ----+
  -> Euler/action residual
  -> Noether time-cut charge
  -> wake-history storage in flight
  -> action-derived spatial boundary term
  -> outward, inward, and signed net surface transport ---------+
                                                               |
declared Noether-sea response record                            |
  -> sea energy + sea exchange --------------------------------+
                                                               v
same-record total ledger + balance residual + lower bound
  -> only then: candidate intrinsic depletion or leakage ratio
```

The acceleration branch depends on $D_t$. Root playback depends on both $D_t$ and $D_r$. Receiver power additionally depends on the actual receiver velocity and a declared kinetic-energy convention. Surface energy transport additionally depends on a same-action spatial boundary derivation. None of those dependencies can be replaced by $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, $\|\mathbf A_p\|^2$, $\mathcal L_{\mathrm{ext}}$, $\mathcal L_{\mathrm{raw}}$, or $\eta_{\mathrm{ext}}$.

## 4. Units and sign conventions

Let $[L]$, $[T]$, $[Q]$, and $[E]$ denote length, absolute time, polarity, and energy units.

| Quantity | Units | Sign convention |
| --- | --- | --- |
| $D_t,D_r$ | $L/T$ | Positive on the present strictly sub-field-speed simple-root chart. |
| $W^{\mathrm{acc}}=c_f/|D_t|$ | $1$ | Nonnegative acceleration weight. |
| $\mathbf A$ | $L/T^2$ | Vector sign and direction follow polarity and line of action. |
| $K(s)$ | $E$ | Kinetic scalar, with a separately fixed zero. |
| $\mu_K(s)=K'(s)/s$ or $\mu_{\mathrm{arch}}$ | $ET^2/L^2$ | Positive on an admitted kinetic chart. |
| $P=\mu_K\mathbf A\cdot\mathbf V$ | $E/T$ | Positive when the row increases receiver kinetic energy. |
| $E_{\mathrm{wake}}$, $E_{\mathrm{sea}}$, $E_{\mathrm{braid}}$ | $E$ | Gauge and partition must be fixed on the same record. |
| Local oriented boundary density $\varphi_E$ | $E/(TL^2)$ | Positive in the outward normal direction. |
| Integrated surface transport $\Phi_E$ | $E/T$ | Positive net transport out of $V_R$. |
| Cycle-integrated transport | $E$ | Positive according to the corresponding outward, inward, or net definition. |
| $\mathcal W$ | $QT/L^3$ under the declared normalization | Polarity-signed exposure, not energy. |
| $\mathbf J_{\mathcal W}$ | $Q/L^2$ under the declared normalization | Normal-projected causal-wake transport measure, not energy transport. |
| $\Phi_{\mathcal W}$ | $Q$ | Signed closed-surface wake-measure crossing rate. |
| Cycle-integrated raw wake flux $F_{\mathrm{raw}}$ | $QT$ | Nonnegative after source/root tags are retained before absolute aggregation. |
| $\mathcal L_{\mathrm{ext}}$, $\mathcal L_{\mathrm{raw}}$ | $L^4/T^4$ for acceleration-squared surface averages | Nonnegative exposure norms, not energy. |
| $\eta_{\mathrm{ext}}$ | $1$ | Geometry-response cancellation fraction, not an energy fraction. |

The `power` rows in the complete-cycle angular and spectral reductions mean squared coefficient magnitude. They are signal-processing power and do not have energy-per-time units.

## 5. Candidate same-record definitions

Every definition in this section is either already an algebraic consequence of declared paths and acceleration rows or is explicitly marked as a candidate requiring a delayed-action derivation.

### 5.1 Receiver power and work

For receiver $i$ on an actual or imposed differentiable path, speed $s_i=\|\mathbf V_i\|$, and retained hit $(i\leftarrow j,T_t)$, define

$$
P_{i\leftarrow j,T_t}(T)
=
\mu_K(s_i(T))
\mathbf A_{i\leftarrow j}(T;T_t)
\cdot
\mathbf V_i(T)
$$

with $\mu_K(s)=K'(s)/s$. The optional quadratic proxy uses $\mu_K=\mu_{\mathrm{arch}}$.

The same-record received-power row is

$$
P_{\mathrm{int}}(T)
=
\sum_i\sum_j\sum_{T_t\in\mathcal C_{ij}(T)}
P_{i\leftarrow j,T_t}(T)
$$

and realized receiver work over $W=[T_a,T_b]$ is

$$
W_{\mathrm{int}}(W)
=
\int_{T_a}^{T_b}P_{\mathrm{int}}(T)\,dT
$$

This is computable from prescribed paths only after the packet supplies the moving receiver path, $D_r$, the complete partner/self root rows, the receiver velocity, and the kinetic convention. On a prescribed path it is a work diagnostic, not proof of a conserved total energy.

Falsifier: reject the power row if it is evaluated at a virtual stationary coordinate probe but interpreted as work on a moving braid constituent, if it omits a retained hit, or if direct differentiation of $K(s_i)$ disagrees with the summed row on the same path.

### 5.2 External prescription work

Let

$$
\mathbf A_i^{\mathrm{req}}(T)
=
\frac{d^2\mathbf X_i^{\mathrm{pres}}}{dT^2}
$$

be the acceleration required by the exact prescribed path. Split the complete retained acceleration inventory as

$$
\mathbf A_i^{\mathrm{req}}
=
\mathbf A_i^{\mathrm{int}}
+
\mathbf A_i^{\mathrm{environment}}
+
\mathbf A_i^{\mathrm{drive}}
$$

This defines the missing prescription acceleration

$$
\mathbf A_i^{\mathrm{drive}}
=
\mathbf A_i^{\mathrm{req}}
-
\mathbf A_i^{\mathrm{int}}
-
\mathbf A_i^{\mathrm{environment}}
$$

and the associated power

$$
P_{\mathrm{drive}}(T)
=
\sum_i
\mu_K(s_i(T))
\mathbf A_i^{\mathrm{drive}}(T)
\cdot
\mathbf V_i(T)
$$

This row is the minimum guard against calling drive-supplied energy intrinsic braid loss. It is unavailable when self-hits, environment accelerations, or other declared interaction rows are absent; in that case the packet must report a partial residual rather than silently assign the remainder to the drive.

Falsifier: reject the row if the same prescribed trajectory fails

$$
\frac{d}{dT}\sum_i K(s_i)
=
P_{\mathrm{int}}
+P_{\mathrm{environment}}
+P_{\mathrm{drive}}
$$

within the declared numerical tolerance and complete acceleration inventory.

### 5.3 Action-level wake-history energy

Candidate definition: for one symmetry-preserving delayed action with kernel $\mathcal K_{ij}^{E,\eta}(T_1,T_t)$, branch chart $\mathfrak B$, regulator $\eta$, core convention, and time cut $T$, define

$$
E_{\mathrm{wake},\mathfrak B}^{(\eta)}(T)
=
\frac{1}{2}
\sum_{i,j}
\int_{-\infty}^{T}dT_t
\int_T^{\infty}dT_1\,
\partial_{T_1}
\mathcal K_{ij,\mathfrak B}^{E,\eta}(T_1,T_t)
$$

with trivial self-coincidence excluded and nontrivial self-hits retained. This is a time-cut interaction-link charge. It is not the signed wake amplitude and not the integral of $\|\mathbf A\|^2$.

Current status: candidate definition. The characteristic-tail action supplies a concrete route, but its Euler residual, endpoint convention, finite-memory limit, lower bound, and branch pullback must close for the same acceleration rows before the charge becomes theorem-level.

Falsifier: reject the charge if the action variation does not yield the accepted Master Equation on the same branch, if the endpoint or period-cut residual survives refinement, if the charge changes under an allowed normalization gauge, or if an isolated exact toy solution does not conserve the total Noether charge.

### 5.4 Total braid energy

In a massless, acceleration-first substrate theory, total braid energy cannot mean a sum of constituent masses or an acceleration norm. The candidate same-record meaning is the time-translation charge assigned to one retained braid branch and its declared dressing:

$$
E_{\mathrm{braid},\mathfrak B}(T;R)
=
E_{\mathrm{arch},\mathfrak B}(T)
+
U_{\mathrm{int},\mathfrak B}(T;R)
+
E_{\mathrm{wake},\mathfrak B}(T;R)
+
E_{\mathrm{sea},\mathfrak B}(T;R)
$$

where

$$
E_{\mathrm{arch},\mathfrak B}(T)
=
\sum_{i\in\mathfrak B}K(\|\mathbf V_i(T)\|)
$$

uses a declared primitive kinetic scalar or an explicitly diagnostic quadratic proxy. $U_{\mathrm{int}}$ is optional and must be a partition of the same action charge rather than a second copy of its near-field content. $E_{\mathrm{wake}}$ is the action-level time-cut charge restricted by an accepted branch/spatial allocation. $E_{\mathrm{sea}}$ is the associated Noether-sea dressing from the same response record.

For an isolated branch, a radius-independent total would require the convergent limit

$$
E_{\mathrm{braid},\mathfrak B}(T)
=
\lim_{R\to\infty}
E_{\mathrm{braid},\mathfrak B}(T;R)
$$

after energy in flight and all boundary terms are retained. For an embedded branch, the finite $R$ ledger and its environment exchange are the primary objects; the braid/sea association rule cannot be chosen after viewing the result.

This gives the requested decomposition

$$
E_{\mathrm{total}}
=
E_{\mathrm{arch}}
+
U_{\mathrm{int}}
+
E_{\mathrm{wake}}
+
E_{\mathrm{sea}}
$$

only as a closure target until all four terms are derived from one action and one branch/sea record.

Falsifier: reject a total-braid-energy definition if it changes when the enclosing radius is moved after shell storage and boundary exchange are included, if near-field content is counted in both $U_{\mathrm{int}}$ and $E_{\mathrm{wake}}$, if the braid dressing cannot be separated from the background by a predeclared response rule, or if a common energy-gauge shift changes a claimed physical fraction.

### 5.5 Energy inside a control volume

Let

$$
V_R=\{\mathbf X\in\Sigma_T:\|\mathbf X-\mathbf X_0\|<R\},
\qquad
S_R=\partial V_R
$$

on one constant-absolute-time leaf. A candidate inside ledger is

$$
E_{\mathrm{inside}}(R,T)
=
K_R(T)
+U_{\mathrm{int},R}(T)
+E_{\mathrm{wake},R}(T)
+E_{\mathrm{sea},R}(T)
$$

The optional $U_{\mathrm{int},R}$ may be retained only when the same near-field content is removed from $E_{\mathrm{wake},R}$. For a braid in isolation, $E_{\mathrm{sea},R}=0$ only if the record actually excludes Noether-sea degrees of freedom.

The missing mathematical object is $E_{\mathrm{wake},R}$. The time-cut Noether charge is nonlocal in its two worldline endpoints and does not automatically define a spatial density. A candidate localization must be derived from the same action. Schematically, it would require an action-determined allocation factor $\Lambda_R$:

$$
E_{\mathrm{wake},R}(T)
=
\frac{1}{2}
\sum_{i,j}
\int_{T_t\le T<T_1}
\Lambda_R(i,j,T_1,T_t;T)
\partial_{T_1}\mathcal K_{ij}^{E,\eta}(T_1,T_t)
\,dT_t\,dT_1
$$

with a complementary outside allocation and an exact whole-space partition. $\Lambda_R$ may not be chosen by fitting the desired flux or by treating the geometric wake surface as an energy shell.

Falsifier: reject a localization if inside plus outside does not reproduce the whole-space time-cut charge, if nested radii fail the shell-difference identity, if Euclidean translation or rotation changes the answer beyond the declared coordinate transformation, or if different arbitrary link allocations produce different leakage ratios.

### 5.6 Surface transport

Candidate definition: if the localized delayed action yields an oriented boundary density $\varphi_E(R,\Omega,T)$, outward positive, define

$$
\Phi_E^{\mathrm{out}}(R,T)
=
\int_{S_R}[\varphi_E(R,\Omega,T)]_+\,dA
$$

$$
\Phi_E^{\mathrm{in}}(R,T)
=
\int_{S_R}[-\varphi_E(R,\Omega,T)]_+\,dA
$$

$$
\Phi_E^{\mathrm{net}}(R,T)
=
\Phi_E^{\mathrm{out}}(R,T)
-
\Phi_E^{\mathrm{in}}(R,T)
$$

Gross outward transport cannot be defined as $[\Phi_E^{\mathrm{net}}]_+$ when different surface regions carry simultaneous inward and outward rows. If the delayed action yields only a whole-boundary functional and no local angular density, only signed net transport is available.

The cycle rows are

$$
E_{\mathrm{out}}(R;W)
=
\int_W\Phi_E^{\mathrm{out}}(R,T)\,dT
$$

$$
E_{\mathrm{in}}(R;W)
=
\int_W\Phi_E^{\mathrm{in}}(R,T)\,dT
$$

$$
E_{\mathrm{net}}(R;W)
=
E_{\mathrm{out}}(R;W)-E_{\mathrm{in}}(R;W)
$$

Current status: unavailable. No current packet contains $\varphi_E$ or an action-derived whole-boundary energy functional.

Falsifier: reject the transport definition if a static time-independent control volume produces nonzero transport without a crossing, receiver, drive, environment, or changing in-flight action link; or if the balance between two radii fails after shell storage is included.

### 5.7 Outside storage and eventual receiver work

Energy remaining outside $V_R$ is a storage row,

$$
E_{\mathrm{outside}}(R,T)
=
E_{\mathrm{total}}(T)-E_{\mathrm{inside}}(R,T)
$$

only when both terms use the same action, gauge, partition, and Noether-sea record. It is not the time integral of gross outward transport when inward return or outside receiver work occurs.

Work eventually delivered to actual external receivers is

$$
W_{\mathrm{rec,out}}(W)
=
\int_W
\sum_{i:\mathbf X_i(T)\notin V_R}
\sum_j\sum_{T_t\in\mathcal C_{ij}(T)}
P_{i\leftarrow j,T_t}(T)\,dT
$$

This requires actual receiver paths. A coordinate probe's potential to experience acceleration is not realized work.

Falsifier: reject an outside-storage or eventual-work equivalence if energy remains in flight at the window endpoint, returns inward, is exchanged with the Noether sea, or is delivered to a receiver outside the chosen receiver inventory.

### 5.8 Same-record balance law

The candidate control-volume balance is

$$
\frac{dE_{\mathrm{inside}}(R,T)}{dT}
+
\Phi_E^{\mathrm{net}}(R,T)
=
P_{\mathrm{drive}}(T)
+
P_{\mathrm{environment}}(R,T)
+
\mathcal R_E(R,T)
$$

Every term must come from the same source/branch identity, root policy, regulator, history window, kinetic convention, delayed action, spatial window, endpoint convention, and Noether-sea response record. The residual must include finite-memory truncation, unresolved self-hits, omitted roots, period cuts, action Euler mismatch, and numerical error.

Falsifier: reject the balance if it closes only after changing the action, window, regulator, energy gauge, or sea record between terms, or if $\mathcal R_E$ does not converge toward zero under the predeclared refinement ladder.

### 5.9 Separate normal-projected causal-wake flux diagnostic

This subsection defines a candidate analytical diagnostic from the already-declared causal-wake distribution. It is separate from the action-derived energy transport in Section 5.6.

For transmitter $j$, define the root-resolved transport of its source-normalized wake measure by

$$
\mathbf J_{\mathcal W,j}(T,\mathbf X)
=
q_j
\int_{T_{\min}}^T
\frac{
c_f\widehat{\mathbf r}_j(T,\mathbf X;T_t)
\delta\!\left(g_j(T,\mathbf X;T_t)\right)
}{4\pi r_j^2(T,\mathbf X;T_t)}
\,dT_t.
$$

Distributional differentiation of each expanding causal surface gives

$$
\partial_T\mathcal W_j
+
\nabla_{\mathbf X}\cdot\mathbf J_{\mathcal W,j}
=
q_j\delta^{(3)}\!\left(\mathbf X-\mathbf X_j(T)\right).
$$

This identity follows from the kinematics of the declared wake kernel. It does not assert energy conservation and does not turn $\mathcal W$ into potential.

For a fixed volume $V$ with outward normal $\widehat{\mathbf n}$, define

$$
N_{\mathcal W}(V,T)
=
\int_V\mathcal W(T,\mathbf X)\,dV
$$

and

$$
\Phi_{\mathcal W}(\partial V,T)
=
\int_{\partial V}
\left(
\sum_j\mathbf J_{\mathcal W,j}
\right)
\cdot\widehat{\mathbf n}\,dA.
$$

When all source positions lie inside $V$,

$$
\frac{dN_{\mathcal W}(V,T)}{dT}
+
\Phi_{\mathcal W}(\partial V,T)
=
\sum_j q_j.
$$

Therefore the instantaneous surface flux is not generally identical for two enclosing volumes. For nested fixed volumes $V_1\subset V_2$ containing the same sources,

$$
\Phi_{\mathcal W}(\partial V_2,T)
-
\Phi_{\mathcal W}(\partial V_1,T)
=
-\frac{d}{dT}
\left[
N_{\mathcal W}(V_2,T)-N_{\mathcal W}(V_1,T)
\right].
$$

In plain language, simultaneous readings on the two surfaces sample wake surfaces emitted at different transmitter phases. No individual wake front stalls. A difference between the readings changes the integrated wake measure currently in transit between the surfaces.

Replacing each $q_j$ by $|q_j|$ before summation defines the corresponding raw storage and transport rows. Their volume balance has $\sum_j|q_j|$ on the right-hand side. This transmitter-tagged replacement must occur before any signed superposition; taking the absolute value only after summation would discard the raw emission ledger.

For cancellation analysis, retain source and root tags before taking absolute values. On a simple-root chart, the cycle-integrated raw and residual rows are

$$
F_{\mathrm{raw}}(S;W)
=
\int_W\int_S
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\left|
\frac{
q_jc_f
}{4\pi r_j^2|D_{t,j}|}
\widehat{\mathbf r}_j\cdot\widehat{\mathbf n}
\right|
\,dA\,dT
$$

and

$$
F_{\mathrm{res}}(S;W)
=
\int_W\int_S
\left|
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\frac{
q_jc_f
}{4\pi r_j^2|D_{t,j}|}
\widehat{\mathbf r}_j\cdot\widehat{\mathbf n}
\right|
\,dA\,dT.
$$

For one complete return cycle $W=[T_0,T_0+T_{\mathrm{ret}}]$, fixed convex enclosing surfaces, complete retained history, complete roots, and periodic wake storage,

$$
F_{\mathrm{raw}}(S;W)
=
T_{\mathrm{ret}}\sum_j|q_j|
$$

for every admissible $S$. The corresponding signed cycle flux equals $T_{\mathrm{ret}}\sum_jq_j$ and is identically zero for a polarity-neutral assembly, so that signed global scalar is too coarse to resolve local external cancellation.

When $F_{\mathrm{raw}}>F_{\mathrm{floor}}>0$ is predeclared, define the candidate cancellation diagnostic

$$
\eta_{\mathcal W,\mathrm{flux}}(S;W)
=
\frac{F_{\mathrm{res}}(S;W)}{F_{\mathrm{raw}}(S;W)}.
$$

The triangle inequality gives $0\le\eta_{\mathcal W,\mathrm{flux}}\le1$. The raw denominator is the surface-invariant row under the stated conditions. The residual numerator, and therefore the ratio, may depend on radius because different signed source fronts superimpose differently as they propagate. Radius dependence is a result to measure, not an error to remove; a far-field plateau may be claimed only after a declared radius sequence demonstrates it.

Current status: implemented analytical diagnostic. It is added alongside $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, and $\eta_{\mathrm{ext}}$ rather than replacing those measures. It is linear in the causal-wake contributions and normalized by declared emission measure, whereas $\eta_{\mathrm{ext}}$ is built from squared acceleration-exposure norms. Neither is energy.

Falsifiers: reject surface invariance if the raw cycle row changes across enclosing radii after root, history, time, and surface-quadrature refinement; reject the shell identity if the measured two-surface difference disagrees with the independently integrated shell-storage derivative; do not advance when a source crosses a surface, the surface moves, retained history is incomplete, a root or fold is unresolved, or a nonconvex surface lacks an oriented multiple-crossing policy.

### 5.10 Frequency-resolved causal-wake cancellation

The complete-cycle scalars $F_{\mathrm{raw}}$ and $F_{\mathrm{res}}$ do not state which braid frequencies survive cancellation. Opposite-polarity contributions can cancel strongly in one temporal harmonic and weakly in another, while the integration over the complete cycle reports only their aggregate. The frequency ledger must preserve complex phase because phase is what permits or prevents superposition cancellation.

For each retained transmitter-root branch $a$, real angular basis function $Y_{\ell m}$, enclosing radius $R$, and complete-cycle harmonic $n$, define the transmitter-tagged complex normal-flux coefficient

$$
\widetilde f_{a,\ell mn}(R)
=
\frac{1}{T_{\mathrm{ret}}}
\int_{T_0}^{T_0+T_{\mathrm{ret}}}
e^{-in\Omega_0(T-T_0)}
\int_{S_R}
f_a(T,\mathbf X)Y_{\ell m}(\widehat{\mathbf X})
\,dA\,dT,
\qquad
\Omega_0=\frac{2\pi}{T_{\mathrm{ret}}}.
$$

Retain the transmitter-root tags until both the raw and net rows are formed:

$$
A_{\mathrm{raw},\ell mn}(R)
=
\sum_a\left|\widetilde f_{a,\ell mn}(R)\right|,
\qquad
A_{\mathrm{net},\ell mn}(R)
=
\left|\sum_a\widetilde f_{a,\ell mn}(R)\right|.
$$

For every coefficient whose raw row exceeds a predeclared floor, define

$$
\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)
=
\frac{A_{\mathrm{net},\ell mn}(R)}
{A_{\mathrm{raw},\ell mn}(R)}.
$$

The triangle inequality again gives a value in $[0,1]$. This coefficient-level ratio measures phase-resolved signed-wake cancellation at one temporal harmonic and angular mode. It is not spectral energy. A separate Fourier transform of the rectified trace $\int_{S_R}|\sum_a f_a|\,dA$ may be reported as a **rectified-residual spectrum**, but the absolute value creates new sum, difference, and multiple frequencies. Those components must not be misidentified as the frequencies emitted by the source paths.

Current status: implemented analytical diagnostic. The streaming reducer retains transmitter-root-tagged complex normal-flux coefficients, net and raw coefficient magnitudes, $\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)$, per-harmonic angular-mode norms, radial-scaling rows, retained-band coverage, and primary-versus-refined convergence entries. A relative coefficient floor prevents numerical-zero channels from receiving cancellation ratios or logarithmic radial exponents. A separately authored two-source fixture fixes one harmonic at $\eta=1/3$ and another at $\eta=1$, while an untagged sample does not advance. The result remains a wake-frequency diagnostic and not spectral energy.

Falsifiers: reject a frequency row if inverse reconstruction does not recover the sampled signed normal-flux field within the declared retained-band residual, if primary and refined time grids disagree beyond tolerance, if transmitter-root tags are discarded before the raw coefficient is formed, or if a rectification-created harmonic is reported as a transmitter-emission harmonic.

### 5.11 Candidate spectral bridge to braid energy

The frequency-resolved wake ledger and a future braid-energy ledger are expected to be related because both depend on the same periodic paths, velocities, causal roots, phases, and delayed interaction history. That shared dependency does not make the wake coefficients energy coordinates automatically. The raw full-cycle wake flux is fixed by $T_{\mathrm{ret}}\sum_j|q_j|$ under the Section 5.9 conditions, so it contains no braid-specific potential-like or kinetic-like discrimination by itself. The surviving complex coefficients do carry geometry and phase information, but an external surface projection can have a nontrivial null space: distinct internal braid states can produce the same exterior coefficient ledger.

If an accepted delayed action supplies a periodic-branch Noether charge and its second variation is meaningful on a declared chart, a candidate modal representation has the schematic form

$$
E_{\mathfrak B}^{(2)}
=
\sum_{n,\ell,m}
\sum_{a,b}
\widetilde z_{a,\ell mn}^{*}
K^{E}_{ab,\ell mn}[\mathfrak B]
\widetilde z_{b,\ell mn}
+E_{\mathrm{endpoint}}+E_{\mathrm{core}}+E_{\mathrm{sea}},
$$

where $\widetilde z_{a,\ell mn}$ denotes the action's internal branch variables rather than the measured surface coefficients, and $K^{E}$ is derived from the same action and Noether construction. The normal wake-flux coefficients are then candidate observations $\widetilde f=C\widetilde z$. Recovering energy from $\widetilde f$ requires both the action-derived kernel $K^{E}$ and an observability result showing which internal modes the map $C$ preserves. Choosing $K^{E}=I$, summing coefficient magnitudes squared, or calling Parseval `power` energy is barred.

Potential-like storage would reside in delayed interaction and wake-history cross terms of the accepted charge. Kinetic-like storage would require the actual branch velocities and an $\mathbb{A}\mathbb{A}\mathbb{A}$-derived kinetic convention; it cannot be imported as $\tfrac12mv^2$ for massless architrinos. Frequency-selective cancellation may therefore identify exterior-bright and exterior-dark wake channels, but a dark exterior channel can still carry internal action charge. The spectrum can organize a future energy decomposition and test its balance; it cannot supply the decomposition before the action does.

First test: construct two prescribed periodic records with nearly identical accepted exterior $\widetilde f_{\ell mn}(R)$ rows but different internal path-speed or delayed-link ledgers. If a future same-action charge distinguishes them, the exterior spectrum is not energy-complete. Conversely, any proposed spectral energy kernel must reproduce the independently derived same-record Noether charge, drive work, endpoint storage, and radius balance without retuning between records.

## 6. What the external quantity means

| Quantity | Meaning | Can it be negative? | Requires actual receivers? | Current status |
| --- | --- | ---: | ---: | --- |
| Gross outward transport $E_{\mathrm{out}}$ | All outward-oriented action-derived boundary transport, before inward cancellation. | No | No, if the action itself supplies the boundary term. | Undefined. |
| Inward transport $E_{\mathrm{in}}$ | All inward-oriented action-derived boundary transport. | No | No, if the action itself supplies the boundary term. | Undefined. |
| Signed net transport $E_{\mathrm{net}}$ | Outward minus inward transport through $S_R$. | Yes | No, if the action itself supplies the boundary term. | Undefined. |
| Outside storage $E_{\mathrm{outside}}$ | Same-record energy stored outside $V_R$ at a time cut. | Depends on the accepted charge and gauge | No | Undefined. |
| Eventual receiver work $W_{\mathrm{rec,out}}$ | Energy actually delivered along declared external receiver paths. | Yes | Yes | Unavailable in current packets. |
| External acceleration exposure | How strongly virtual probes could accelerate under the prescribed source. | Norm rows are nonnegative | No | Computable now; explicitly not energy. |
| Raw causal-wake flux $F_{\mathrm{raw}}$ | Total transmitter-tagged wake-measure crossing over the selected surface and window. | No | No | Candidate analytical row; surface invariant over a complete periodic cycle only under the Section 5.9 conditions. |
| Residual causal-wake flux $F_{\mathrm{res}}$ | Signed superposition remaining after local cancellation, aggregated in absolute value over surface and time. | No | No | Candidate analytical row; radius dependence is allowed. |
| $\eta_{\mathcal W,\mathrm{flux}}$ | Residual causal-wake flux relative to the raw emission-normalized flux. | No | No | Candidate cancellation diagnostic, not energy, potential, work, or leakage. |

No single row should be called `escaping energy` until the program specifies which meaning is intended. Intrinsic loss is most closely related to same-record depletion or signed net nonreturning transport on an unforced realized branch, not to gross outward exposure.

## 7. Denominators and candidate fractions

The originally suggested denominator $E_{\mathrm{braid}}(T_0)+\varepsilon_E$ is not yet acceptable. An additive energy gauge changes the ratio, and an epsilon floor can turn an undefined or zero denominator into a plausible number.

For a retained branch $\mathfrak B$, define a candidate available-energy denominator only after a same-record lower bound has been derived:

$$
E_{\mathrm{avail},\mathfrak B}(T_0)
=
E_{\mathrm{braid},\mathfrak B}(T_0)
-
E_{\min,\mathfrak B}
$$

with

$$
E_{\mathrm{avail},\mathfrak B}(T_0)>E_{\mathrm{floor}}>0
$$

predeclared as an admissibility condition. This difference is invariant under a common additive energy-gauge shift.

For an unforced realized branch with negligible environment exchange and converged residual, a candidate depletion fraction is

$$
\eta_{\mathrm{dep}}(R;W)
=
\frac{
[-\Delta_W E_{\mathrm{inside}}(R)]_+
}{
E_{\mathrm{avail},\mathfrak B}(T_0)
}
$$

The balance law may identify this with a net outward loss only when $P_{\mathrm{drive}}=0$, $P_{\mathrm{environment}}=0$, inward return and endpoint in-flight storage are accounted for, and $\mathcal R_E\to0$.

A gross transport loading

$$
\eta_{\mathrm{out,load}}(R;W)
=
\frac{E_{\mathrm{out}}(R;W)}{E_{\mathrm{avail},\mathfrak B}(T_0)}
$$

is not a loss fraction and may exceed one when energy crosses outward repeatedly. For a driven periodic prescribed source, an export-to-drive ratio may be useful,

$$
\eta_{\mathrm{drive\to out}}(R;W)
=
\frac{E_{\mathrm{out}}(R;W)}{W_{\mathrm{drive}}^+(W)}
$$

but it is a driven transfer diagnostic, not intrinsic braid leakage.

Falsifiers:

- reject any denominator whose value changes under an allowed common energy-zero shift;
- reject any fraction when the lower bound or positive available-energy floor is absent;
- reject the word `loss` when gross outward and inward transport both occur but only gross outward transport is counted;
- reject intrinsic leakage when same-record drive or environment work is nonzero or unresolved;
- reject a ratio that hides an unavailable denominator behind $\varepsilon_E$.

## 8. Balance-ledger requirements

| Required term | Exact source record | Derivation authority | Current implementation status | Condition required for advancement |
| --- | --- | --- | --- | --- |
| Source paths, velocities, polarities | Exact prescribed source or retained EOM-solver branch | Source schema or EOM-solver record | Present for prescribed sources. | Missing identity, path interval, or polarity. |
| Receiver paths and velocities | Moving receiver record on the same identity | Source or retained branch record | Absent from canonical stationary-probe packet. | Coordinate probe substituted for an actual receiver. |
| Partner causal roots | Complete root ledger | Causal constraint and certified root policy | Present only in the current strictly sub-field-speed stationary-probe domain. | Missing root, unresolved fold, or insufficient history. |
| Self-hit roots | Same-transmitter retained ledger | Causal constraint plus self-hit policy | Absent from current canonical analytical packet. | Self-hits assumed absent from a speed label or present history. |
| $D_t$ and $W^{\mathrm{acc}}$ | Per root | Master Equation | Present. | $D_t$ floor fails or row is mismatched. |
| $D_r$ and $D_r/D_t$ | Same per root and receiver event | Differentiated causal constraint | Absent. | Receiver velocity missing or from another record. |
| Per-hit acceleration | Same root row | Master Equation | Present for virtual probes. | Missing polarity, line of action, or coupling convention. |
| Receiver power | Same hit plus receiver $\mathbf V$ and $K$ | Work-energy identity | Absent. | $\mathbf A$ and $\mathbf V$ are not evaluated at the same receiver event. |
| Prescribed acceleration | Exact moving source/receiver path | Path differentiation | Not emitted in canonical result packet. | Numerical derivative lacks declared error or source path is incomplete. |
| External drive work | Required minus internal/environment acceleration | Same-record bookkeeping identity | Absent. | Incomplete interaction inventory. |
| Kinetic energy | Receiver speeds plus $K$ or quadratic proxy | Declared primitive kinetic scalar | No energy convention in packet. | $K$ or $\mu_{\mathrm{arch}}$ chosen after viewing the result. |
| Action Euler residual | Same paths, roots, regulator, and action | Delayed-action variation | Absent; action closure remains open. | Action does not yield the accepted acceleration row. |
| Wake-history time-cut charge | Same delayed action | Time-translation Noether derivation | Absent. | Endpoint leakage, gauge ambiguity, or nonconservation persists. |
| Spatially localized wake storage | Same action plus $V_R$ | Localized nonlocal Noether derivation | Undefined. | Arbitrary link allocation or failed whole-space partition. |
| Surface transport | Same action plus $S_R$ orientation | Action boundary term | Undefined. | Wake amplitude or acceleration norm relabeled as flux. |
| Energy in flight between radii | Difference of compatible localized charges | Same-action shell identity | Undefined. | Radius balance fails after shell storage is included. |
| Near-field $U_{\mathrm{int}}$ | Same branch partition | Effective decomposition with crosswalk | Optional and absent. | Double counted with $E_{\mathrm{wake}}$. |
| Noether-sea energy and exchange | Declared sea response record | Same constitutive action/response record | Absent. | Separate fitted sea records are used. |
| Total ledger and residual | All rows above | Same-record balance identity | Unavailable. | Any row changes identity, action, regulator, window, or gauge. |
| Available-energy lower bound | Same retained branch and action | Proof or certified interval | Unavailable. | No positive lower-bounded denominator. |

## 9. Record-level adjudication

| Record level | Computable | Candidate bookkeeping only | Unavailable | Barred interpretation |
| --- | --- | --- | --- | --- |
| 1. Exact prescribed source record | Paths, velocities, prescribed accelerations, period closure, separation, and any chosen kinematic $K(s)$ values. | Kinematic energy under a declared $K$; it is not a conserved braid energy. | Causal-root response, received work, action charge, surface transport, drive balance. | Retention, intrinsic leakage, spontaneous energy loss. |
| 2. Prescribed source plus complete causal-root ledger | $D_t$, $W^{\mathrm{acc}}$, wake exposure, acceleration response, root topology; $D_r$ only if the receiver path is explicitly bound to each row. | Prescribed interaction response and partial equation mismatch. | Realized work if receiver paths/power rows are absent; action and total energy. | Calling wake or acceleration exposure energy. |
| 3. Prescribed source plus receiver paths and realized $\mathbf A\cdot\mathbf V$ rows | Per-hit power, received work, required path acceleration, and drive-power diagnostic when the acceleration inventory is complete. | Work-integral interaction reconstruction and driven-cycle balance. | Off-shell Noether charge, intrinsic surface flux, conservation theorem, stability. | Calling drive-supplied export spontaneous braid loss. |
| 4. Retained branch generated by the EOM solver | Realized paths, roots, accelerations, kinetic changes, receiver power, work reconstruction, and branch return diagnostics. | Trajectory-local interaction energy under a declared gauge. | Theorem-level energy without an accepted action and Noether pullback; sea exchange if absent. | Promoting solver self-replay as independent correctness or energy conservation. |
| 5. Retained branch plus delayed action and Noether pullback | Same-action kinetic plus wake-history charge, Euler residual, endpoint terms, and conservation residual; surface transport only if the action localization is derived. | Finite-window rows while regulator and history limits are still open. | Noether-sea contribution when the branch is physically embedded but no sea record exists. | Total physical braid energy if required sea dressing is omitted. |
| 6. Branch embedded in a declared Noether-sea response record | Full candidate inside, wake, sea, drive/environment, and boundary ledger with crosswalks and residuals. | Effective assembly partitions until their coarse-graining map is independently validated. | Only rows whose lower bound, convergence, or observer export remains open. | Intrinsic leakage unless drive/environment work vanishes or is explicitly separated. |

The current canonical prescribed packet is below level 3. Its probes are stationary coordinate instruments. For those instruments $\mathbf V_p=0$ would make realized probe work zero, but the packet does not turn those instruments into actual receivers and does not evaluate internal braid receiver power.

## 10. Current-packet gap analysis

### 10.1 Canonical `result-packet.v1`

Present per retained root:

- transmitter identity and polarity;
- emission and reception time;
- transmitter position and velocity;
- displacement, distance, line-of-action direction, residual, and root bracket;
- transmitter radial speed, `transmitterSideFactorDt`, root-transversality margin, and `accelerationWeight`;
- signed and unsigned wake contributions; and
- acceleration contributions for declared stationary probe polarities.

Absent:

- actual receiver identity and path;
- receiver position as a time-dependent path object;
- receiver velocity and acceleration;
- $D_r$ and $D_r/D_t$ root playback;
- internal moving-endpoint receiver rows;
- self-hit roots and self-hit policy;
- a complete internal partner/self acceleration inventory;
- realized $\mathbf A\cdot\mathbf V$ and per-hit power;
- primitive $K(s)$ or the normalization $\mu_{\mathrm{arch}}$;
- prescribed-path required acceleration and external drive acceleration/power;
- mollifier $\eta$, core cutoff $\epsilon_c$, and their refinement ladder;
- action-kernel identity, action Euler residual, or characteristic-tail endpoint convention;
- future-reception link data needed by the time-cut action charge;
- wake-history energy, kinetic energy, near-field partition, or lower bound;
- spatial control-volume identity, oriented energy-boundary row, or energy in flight between radii;
- Noether-sea state, energy, or exchange; and
- a total-energy balance residual or crosswalk.

The packet's `claimGrade: derived` applies to analytical consequences of the exact prescribed source and protocol. Its explicit `excludedClaims` include `energy`.

### 10.2 Complete-cycle streaming reduction

Present:

- enclosing radii and surface quadrature;
- $\mathcal L_{\mathrm{ext}}$, $\mathcal L_{\mathrm{raw}}$, and $\eta_{\mathrm{ext}}$;
- complete-cycle $F_{\mathrm{signed}}$, $F_{\mathrm{raw}}$, $F_{\mathrm{res}}$, and $\eta_{\mathcal W,\mathrm{flux}}$;
- the raw emission-reference residual against $T_{\mathrm{ret}}\sum_j|q_j|$;
- transmitter-root-tagged complex normal wake-flux coefficients, per-$(\ell,m,n)$ cancellation ratios, per-harmonic angular-mode norms, retained-band coverage, and radial scaling;
- angular coefficient magnitude-squared rows called `power`;
- anisotropy, spectra, radial scaling, hashes, and quadrature convergence.

Absent:

- every energy-specific field listed above;
- an oriented action-derived surface-energy density or whole-boundary functional;
- inward/outward separation;
- action-derived in-flight storage between sampled radii; and
- drive or environment work.

The surface geometry is therefore useful for a future action-derived energy boundary, but the current numerical integrands are acceleration-exposure integrands and cannot be reused by renaming them.

## 11. Regulator, memory, self-hit, and radius requirements

Any future energy implementation must retain these limits on one record:

1. **Causal-surface regulator:** the same $\eta$ used by the acceleration and action rows, with a predeclared refinement ladder.
2. **Core convention:** the same $\epsilon_c$ or no-core rule, including excluded-coincidence treatment.
3. **Finite memory:** history depth $h$, endpoint leakage, and proof that increasing $h$ does not change the admitted cycle ledger beyond tolerance.
4. **Self-hits:** all nontrivial same-transmitter roots with the same action and boundary convention; the trivial $T_t=T_r$ coincidence remains excluded.
5. **Cross-hits:** every retained ordered receiver/transmitter pair before aggregation.
6. **Energy in flight:** shell storage between $R_1$ and $R_2$ so a delayed radius shift is not misread as nonconservation.
7. **Noether-sea exchange:** zero only on a genuinely isolated record; otherwise supplied by the declared sea response.
8. **Lower bound:** a same-action lower bound on the admitted branch before any no-runaway or fractional-loss interpretation.

Falsifier: any apparent conservation or leakage result that disappears when $\eta$, $\epsilon_c$, $h$, root completeness, or radius is refined is rejected rather than reinterpreted.

## 12. Minimum independent-test program

| Test | Independent construction | Required result | Failure meaning |
| --- | --- | --- | --- |
| Static source and static actual receiver | Closed-form root plus zero receiver velocity, authored outside the production reducer | Realized receiver work is exactly zero even when acceleration exposure is nonzero. | Exposure was mislabeled as work or receiver state was mishandled. |
| Static/time-independent control volume | Analytic no-crossing record | No invented outward energy transport. | Boundary transport was inferred from wake amplitude rather than the action boundary. |
| Known delayed-action toy model | Separately authored model with a closed-form Noether invariant | Production charge reproduces the invariant and its time derivative vanishes. | Action charge or endpoint signs are wrong. |
| Driven periodic source | Prescribed path with analytically known required acceleration and drive work | Cycle export is balanced by drive/environment work plus storage change; no spontaneous loss label. | Drive work was omitted or double counted. |
| Symmetry-protected cancellation | Coincident opposite-polarity sources with retained raw rows | Signed wake may vanish while raw wake-history rows remain nonzero; no energy conclusion follows from cancellation alone. | Signed projection destroyed the raw ledger. |
| Centered static-source wake flux | Closed-form causal-wake distribution evaluated outside the production reducer | Every enclosing sphere gives $\Phi_{\mathcal W}=q_j$ and the raw row gives $|q_j|$. | Normal projection, normalization, or surface quadrature is wrong. |
| Two-radius wake shell balance | Independently integrated $N_{\mathcal W}(V_2\setminus V_1,T)$ plus production surface rows | The instantaneous flux difference equals minus the shell-storage derivative. | A surface row, storage row, root, or time derivative is wrong. |
| Periodic raw wake-flux invariance | Complete-cycle calculation on at least three enclosing radii | $F_{\mathrm{raw}}=T_{\mathrm{ret}}\sum_j|q_j|$ within the predeclared convergence tolerance. | History is incomplete, storage is not periodic, or root/surface/time reduction is inaccurate. |
| Coincident opposite-polarity wake control | Independently authored paired-source case | $F_{\mathrm{res}}=0$ while $F_{\mathrm{raw}}>0$. | Transmitter tags were discarded before the raw reduction or signed cancellation is wrong. |
| Two-radius delayed balance | Same action and branch evaluated at $R_1<R_2$ | Difference in boundary timing is balanced by energy stored in the shell. | In-flight storage or radius synchronization is missing. |
| Inward/outward angular split | Authored surface case with simultaneous opposite oriented sectors | Gross out and in remain nonzero while net may vanish. | $[\Phi_{\mathrm{net}}]_+$ was incorrectly used as gross transport. |
| Self-hit case | Analytically controlled nontrivial self-root toy history | Self-hit power and action rows appear once; trivial coincidence appears zero times. | Self-interaction policy is incomplete or double counted. |
| Missing-field negatives | Remove $D_r$, action identity, drive work, sea term, or lower bound one at a time | The corresponding power, conservation, embedded-energy, or fraction row does not advance. | Schema permits unsupported promotion. |
| Gauge-shift test | Add a common constant to every allowed energy charge | Available-energy ratios remain unchanged; absolute-denominator ratios are rejected. | Fraction depends on arbitrary energy zero. |
| Replay negative control | Replay production output through its own reducer | Reproducibility only; no correctness promotion. | Self-agreement was mistaken for independent evidence. |

The delayed-action toy model must be authored independently of the implementation it checks. If the reference model and production reducer change together, parity checks only the two implementations of a shared unchecked rule.

## 13. Recommendation and smallest next implementation step

### Recommendation

Open a realized-branch energy program tied to the delayed action. As a separate analytical improvement, add the normal-projected causal-wake flux diagnostic beside the current wake and acceleration-exposure rows, then test its raw cycle invariance across radii. Do not switch exclusively to it: the invariant raw denominator contains no braid-cancellation geometry, while the informative residual may remain radius-dependent. Until the action program supplies a same-action Noether charge and spatial boundary derivation, retain the flux ratio only as wake cancellation and retain the separately labeled work/drive diagnostic. Do not define $\eta_E$, apparent-energy fractions, escaping-wake-energy fractions, or total-braid-energy fractions.

This recommendation is inferred from the dependency analysis, not a measured physical result. It would be falsified by a complete current same-record action/energy packet that passes the independent tests above.

The enclosing-surface analytical step is implemented in the existing sibling streaming reducer. It accumulates $F_{\mathrm{raw}}$, $F_{\mathrm{res}}$, and $F_{\mathrm{signed}}$ without changing the accepted meanings of $\mathcal W$, $\eta_{\mathrm{ext}}$, or any energy entry. The independent static-source fixture checks complete-cycle raw-flux agreement across four enclosing radii and preserves `energy` in the excluded-claims set. The two-radius shell-storage derivative remains a separate future diagnostic because the accepted metrics are intentionally complete-cycle only.

### Smallest next implementation step — not implemented here

Specify and independently test one **prescribed-path work-and-drive row** without modifying the existing exposure measures:

1. use exact moving braid endpoints as receivers over a very small deterministic fixture;
2. retain every partner root, declared self-hit status, $D_t$, $D_r$, $D_r/D_t$, $W^{\mathrm{acc}}$, line of action, and per-hit acceleration;
3. declare one kinetic convention before evaluation;
4. emit per-hit $\mu_K\mathbf A\cdot\mathbf V$, summed interaction power, prescribed required acceleration, incomplete-inventory status, and drive power;
5. do not advance when any receiver, root, self-hit, environment, or kinetic row is absent; and
6. verify the static-receiver zero-work and driven-periodic balance cases with separately authored closed-form calculations.

This step protects a live mathematical distinction that existing exposure gates do not test: whether an imposed path's exported work is supplied by its external prescription. It should be implemented as a separate diagnostic consumer or sibling packet so the accepted `result-packet.v1` exposure contract is not silently redefined. It still must exclude total energy, conservation, surface transport, intrinsic leakage, stability, retention, and physical realization.

The next theory step after that diagnostic is not another exposure reducer. It is the independently checked delayed-action toy model and localized Noether-boundary derivation needed to define $E_{\mathrm{wake},R}$ and $\Phi_E$.

## 14. Durable-capture decision

The energy portion of this packet remains `priority-only` because it supplies a structured candidate methodology and falsifiers but not a complete AAA-native energy derivation. Sections 5.9 and 5.10 have been promoted separately as non-energy prescribed-record analytical diagnostics. The energy blockers are explicit:

- the delayed action is not yet accepted as the exact action for the canonical Master Equation on a retained braid branch;
- current packets omit $D_r$, root playback, realized power, drive work, and action rows;
- the time-cut Noether charge has no accepted spatial localization or surface transport derivation;
- the lower bound and regulator/history limits are open; and
- no same-record Noether-sea exchange exists.

Promotion target, only after those blockers close: the energy-construction standard in `content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md`, followed by a consistent update to `content/markdown/aaa/dynamics/energy.md` and the braid analysis claim boundary. No promotion is authorized by this packet.

## 15. Ordered future-consideration sequence

The following items preserve the dependency order from wake transport to a possible total-energy ledger. They are future considerations, not current implementation authority. Each item must retain one source/protocol/branch identity and not advance when its required rows are absent. Completion of an earlier item does not promote any later item automatically.

### 15.1 Instantaneous two-radius causal-wake shell balance

**Grade:** candidate non-energy diagnostic.

Define the transmitter-tagged wake measure stored in the shell $V_{R_2}\setminus V_{R_1}$ and test the instantaneous identity

$$
\frac{dN_{\mathcal W}(V_{R_2}\setminus V_{R_1},T)}{dT}
+\Phi_{\mathcal W}(R_2,T)
-\Phi_{\mathcal W}(R_1,T)
=0,
$$

with $R_1<R_2$, fixed enclosing surfaces, complete causal roots, the same history window, and the same transmitter tags on every term. The implementation artifact is an independently integrated shell-storage row compared with the existing surface-flux rows before cycle integration. This diagnostic tests whether instantaneous differences between enclosing radii are explained by wake measure in flight; it remains distinct from energy storage or energy transport.

**Acceptance condition:** the residual converges to the declared tolerance under time, surface-quadrature, root, and history refinement for separately authored static and periodic cases.

**Falsifier:** the residual persists after refinement, or agreement requires a radius-dependent normalization or an unrecorded retardation shift.

**Possible promotion destination after acceptance:** `content/markdown/aaa/noether-braid/braid-analysis-methodology.md` as a causal-wake diagnostic only.

### 15.2 Prescribed-path work-and-drive row

**Grade:** candidate work diagnostic; unavailable in current packets.

Implement the Section 13 work-and-drive row in a separate diagnostic consumer or sibling packet. Exact moving braid endpoints act as receivers; every row retains receiver identity, partner and declared self-hit status, $D_t$, $D_r$, $D_r/D_t$, $W^{\mathrm{acc}}$, line of action, per-hit acceleration, receiver velocity, the declared kinetic convention, summed interaction power, required prescribed acceleration, inventory-completeness status, and external drive power.

**Acceptance condition:** independently authored static-receiver and driven-periodic calculations respectively give zero realized receiver work and a closed drive/work/storage balance within declared tolerance.

**Falsifier:** a stationary actual receiver accumulates nonzero work, a driven periodic fixture exports work without booking its external prescription, or any missing receiver/root/self-hit/environment row still permits an accepted result.

**Possible promotion destination after acceptance:** the prescribed-path analytical methodology and `content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md`, while continuing to exclude total energy, conservation, intrinsic leakage, stability, retention, and physical realization.

### 15.3 Action-derived energy construction

**Grade:** unresolved derivation/closure target.

Author a delayed-action toy model independently of the production implementation, derive its time-translation Noether charge in closed form, and reproduce that invariant with a separate evaluator. Then derive, rather than assume, the action-level kinetic, delayed interaction, characteristic-tail endpoint, core, and spatial-boundary terms needed to define $E_{\mathrm{wake},R}$ and $\Phi_E$. Any modal energy kernel must come from this same action and must state which internal modes are observable in the exterior wake coefficients.

**Acceptance condition:** the independently derived charge is invariant on the closed toy solution, its Euler variation reproduces the declared toy dynamics, its localized boundary identity closes, and the production implementation agrees without the oracle being modified in the same change.

**Falsifier:** a nonzero irreducible Euler residual remains, the charge is unbounded on the admitted chart, the boundary localization fails, or agreement exists only through a shared implementation assumption.

**Possible promotion destination after acceptance:** `content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md` and then `content/markdown/aaa/dynamics/energy.md`.

### 15.4 Realized-branch same-record energy ledger

**Grade:** unresolved derivation/closure target dependent on Section 15.3.

Pull the accepted delayed action and Noether construction back onto a retained branch generated by the EOM solver. The same record must bind realized paths, complete partner and nontrivial self-hit roots, accelerations, receiver power, drive and environment work, kinetic and delayed-history terms, characteristic-tail endpoints, spatial boundary terms, energy in flight between radii, regulator and core conventions, and finite-memory refinement. EOM-solver replay is trajectory evidence only; correctness still requires the independent action checks from Section 15.3.

**Acceptance condition:** the same-record balance residual converges under regulator, core, history, root, temporal, and radius refinement, and an unforced branch separates intrinsic storage change from all declared drive and environment work.

**Falsifier:** balance closure depends on mixing records, omitting self-hits or endpoint terms, retuning partitions between branches, or treating solver self-replay as an independent energy proof.

**Possible promotion destination after acceptance:** `content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md`, `content/markdown/aaa/dynamics/energy.md`, `content/markdown/aaa/noether-braid/braid-analysis-methodology.md`, and `content/markdown/aaa/noether-braid/braid-recovery-requirements.md`.

### 15.5 Noether-sea exchange, lower bound, and fraction authorization

**Grade:** unresolved derivation/closure target dependent on Sections 15.3 and 15.4.

Embed the retained branch in a declared same-record Noether-sea response and derive the exchange term that closes the branch, wake-history, boundary, drive, and environment ledger. Establish a same-action lower bound or available-energy denominator that is invariant under an allowed common energy-zero shift. Only after those results close may the program reconsider an escaping-energy or total-braid-energy fraction; an arbitrary absolute-energy denominator or a hidden $\varepsilon_E$ remains barred.

**Acceptance condition:** the Noether-sea exchange and the rest of the ledger close on one record across the declared refinements, the denominator remains meaningful under allowed gauge shifts, and the ratio distinguishes unforced intrinsic leakage from drive- or environment-supplied transport.

**Falsifier:** the sea term is inferred from a residual rather than supplied by a declared response record, the lower bound changes under an allowed energy-zero shift, or the fraction changes when the enclosing radius is moved after in-flight storage is accounted for.

**Possible promotion destination after acceptance:** `content/markdown/aaa/dynamics/energy.md`, `content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md`, and the relevant Noether-sea response treatment under `content/markdown/aaa/spacetime/`.
