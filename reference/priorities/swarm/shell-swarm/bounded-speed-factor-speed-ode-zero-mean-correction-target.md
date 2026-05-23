# Bounded Speed Factor Speed-ODE Zero-Mean Correction Target

Promotion status: `priority-only`. This packet refines [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), [bounded-speed-factor-all-pairs-ledger-handoff-contract.md](bounded-speed-factor-all-pairs-ledger-handoff-contract.md), [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md), [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md), [attraction-repulsion-force-moment-decomposition.md](attraction-repulsion-force-moment-decomposition.md), and the frozen octahedral diagnostic in [../neutral-swarm/octahedral-speed-ode-diagnostic.md](../neutral-swarm/octahedral-speed-ode-diagnostic.md).

It does not retain a branch and does not claim that the rigid octahedral source ledger has become a bounded-speed live ledger. Its purpose is narrower: after the frozen fixed-ledger speed primitive fails the zero-mean row, define the first live-ledger correction equation that a bounded-speed solve must pass before the scalar speed ODE can feed normal reconstruction, action/Noether closure, or a coupled Krawczyk proof.

---

## 1. Source Obstruction

On the frozen rigid octahedral all-pairs source ledger, the scalar speed forcing is

$$
f_i^1(\theta)
=
T_i(\theta)\cdot F_i^1(\theta).
$$

The executable diagnostic reports the frozen mean obstruction

$$
\int_0^{2\pi}f_i^1(\theta)\,d\theta
\approx
1.15740669293
$$

for every receiver site. Equivalently, the period mean is

$$
\frac{1}{2\pi}
\int_0^{2\pi}f_i^1(\theta)\,d\theta
\approx
0.18420699635.
$$

The class split is

$$
\left\langle f_{i,\mathrm{partner}}^1\right\rangle
\approx
0.18420699635,
\qquad
\left\langle f_{i,\mathrm{cross}}^1\right\rangle
=0.
$$

The diagnostic now emits this as `mean_split_certificate` with status `frozen-fixed-ledger-mean-obstruction`. The antipodal-partner positive mean is analytic on the certified partner root bracket:

$$
\left\langle f_{i,\mathrm{partner}}^1\right\rangle
=
\frac{\sin y_*}{y_*^3\left(1+\sin(y_*/2)\right)},
\qquad
2\cos\frac{y_*}{2}-y_*=0.
$$

The cross-binary contribution is certified by the phase anti-periodicity proof in the diagnostic packet. Thus the frozen cross-binary mean cancels exactly on the rigid ledger, while the antipodal-partner contribution leaves a positive drift. The valid conclusion is

$$
\texttt{sampled-speed-ode-zero-mean-failed}
$$

on the frozen source ledger, together with

$$
\texttt{bounded-speed-ledger-handoff-open}.
$$

This is not a no-go theorem for bounded speed factors. It is the source obstruction that any live correction row must overcome after the clocks, roots, Jacobians, force weights, support/action/event rows, and derivative columns are rebuilt on one ledger.

The zero-mean correction intake certificate normalizes this frozen diagnostic into the constant receiver vector

$$
\mathbf{m}_{\mathrm{frz}}
=
m_*\mathbf{1}_6,
\qquad
m_*=\int_0^{2\pi}f_i^1(\theta)\,d\theta
\approx 1.15740669293.
$$

It records the receiver ordering, the source diagnostic schema, the `mean_split_certificate`, and the period-integral normalization convention. It is source provenance for the correction problem, not a bounded-speed live-ledger row.

---

## 2. Live Zero-Mean Functional

Let

$$
z=(a,b,r,\gamma,s,e)
$$

denote the bounded-speed coupled variable blocks from the live-ledger theorem target: geometry coefficients $a$, speed coefficients $b$, active root or root-sheet variables $r$, scale variable $\gamma$, support variables $s$, and event variables $e$. On a common causal-time period $H_*$, define the speed-ODE mean functional

$$
\boxed{
\mathcal{M}_i^\nu(z)
=
\int_0^{H_*}
T_i(u;z)\cdot F_i^\nu(u;z)\,du.
}
$$

For a winding branch, replace $H_*$ by $H_{\mathrm{com}}$ and evaluate the integrand on the lifted periodic ledger.

The scalar speed ODE can have a periodic primitive only if

$$
\boxed{
\mathcal{M}_i^\nu(z)=0
\qquad
\text{for every receiver }i.
}
$$

This row is necessary, not sufficient. A speed-ODE candidate must still emit the primitive excursion $A_i$, the speed band, the clock/length return value, the normal reconstruction rows, and the same-ledger force/action/event checks.

---

## 3. First Correction Equation

Fix a live root-sign stratum and a bounded-speed chart point $z_0$. For a chart direction $v$, the first variation of the mean row is

$$
D_v\mathcal{M}_i^\nu
=
\int_0^{H_*}
\left(
D_vT_i\cdot F_i^\nu
+
T_i\cdot D_vF_i^\nu
\right)du
+
\mathcal{E}_{H,i}[v].
$$

Here $\mathcal{E}_{H,i}[v]$ is the endpoint or period-variation term. If the causal-time period and integration coordinate are fixed, $\mathcal{E}_{H,i}[v]=0$. If $H_*$, a winding relation, or the quadrature coordinate moves, the period multiplier or clock row must emit this term explicitly; it cannot be silently dropped.

For one retained root contribution

$$
\mathbf{f}_r^\nu
=
\frac{\sigma_i\sigma_j}
{\eta_r^2|J_r^\nu|}
\widehat{\mathbf{R}}_r,
$$

the tangent mean derivative consumes

$$
D_v
\left(
T_i\cdot\mathbf{f}_r^\nu
\right)
=
D_vT_i\cdot\mathbf{f}_r^\nu
+
T_i\cdot D_v\mathbf{f}_r^\nu,
$$

with

$$
D_v\mathbf{f}_r^\nu
=
\frac{\sigma_i\sigma_j}
{\eta_r^2|J_r^\nu|}
\left[
D_v\widehat{\mathbf{R}}_r
-
\left(
2\frac{D_v\eta_r}{\eta_r}
+
\frac{D_vJ_r^\nu}{J_r^\nu}
\right)
\widehat{\mathbf{R}}_r
\right]
$$

on a fixed Jacobian-sign stratum. The terms $D_v\eta_r$, $D_vJ_r^\nu$, $D_v\widehat{\mathbf{R}}_r$, and the clock-corrected $D_vT_i$ must be the bounded-speed root-sheet derivatives, not fixed-speed derivatives reused after $b$ becomes active.

Let $\{v_\ell\}$ be the declared active correction directions. Define the mean-row derivative matrix

$$
B_{i\ell}
=
D_{v_\ell}\mathcal{M}_i^\nu(z_0).
$$

The first-order correction equation is

$$
\boxed{
B\alpha
=
-\mathcal{M}^\nu(z_0).
}
$$

A reported correction direction is only a candidate if the same ledger also keeps delay floors, Jacobian floors, speed-band margins, support margins, action convention, and event convention valid to first order.

---

## 4. Rank And Residual Target

The executable target is the pair

$$
\left(
\mathcal{M}^\nu(z_0),
B
\right).
$$

At intake level, before any live derivative matrix has been assembled, the frozen source target is

$$
-\mathbf{m}_{\mathrm{frz}}\in\operatorname{Range}B,
\qquad
\delta_{\mathrm{intake}}
=
\operatorname{dist}(-\mathbf{m}_{\mathrm{frz}},\operatorname{Range}B).
$$

Since $m_*>0$, this is equivalent to requiring $\mathbf{1}_6\in\operatorname{Range}B$. In cokernel form, every left-null vector $w\in\ker B^T$ must obey

$$
w^T\mathbf{1}_6=0.
$$

Any left-null vector with nonzero receiver sum certifies a first-order zero-mean obstruction. This is still only a range target until $B$ is assembled from live bounded-speed derivative columns.

An intake artifact may optionally report a candidate range/cokernel checker for a declared diagnostic matrix $B_{\mathrm{cand}}$. It computes

$$
\delta_{\mathrm{cand}}
=
\operatorname{dist}(-\mathbf{m}_{\mathrm{frz}},\operatorname{Range}B_{\mathrm{cand}})
=
m_*\operatorname{dist}(\mathbf{1}_6,\operatorname{Range}B_{\mathrm{cand}}),
$$

and checks the equivalent augmented-rank condition

$$
\operatorname{rank}B_{\mathrm{cand}}
=
\operatorname{rank}[B_{\mathrm{cand}}\ \mathbf{1}_6].
$$

For an orthonormal cokernel basis $Q_{\mathrm{cand}}$ of $\ker B_{\mathrm{cand}}^T$, the same obstruction is

$$
c_{\mathrm{cand}}=Q_{\mathrm{cand}}^T\mathbf{1}_6.
$$

This is a candidate screen only. It does not certify the live derivative matrix $B$ unless every column of $B_{\mathrm{cand}}$ is emitted from the same live bounded-speed ledger with the clock, inverse-clock, root, Jacobian, force-weight, support, action, and event derivative terms required above.

### Live Derivative Column Audit Contract

The live derivative column audit is a specialization of the existing `zero_mean_correction_target` row, not another retained-branch gate. Its incremental value is to keep three payloads separate before any correction direction is consumed.

First, the frozen source provenance is

$$
\left(
\texttt{source\_diagnostic\_schema},
\texttt{receiver\_ordering},
\texttt{mean\_split\_certificate},
\texttt{normalization}
\right),
\qquad
\mathbf{m}_{\mathrm{frz}}=m_*\mathbf{1}_6.
$$

This payload records the rigid octahedral obstruction only. It cannot populate $B$.

Second, a live derivative column packet must identify each declared column

$$
B_{i\ell}
=
D_{v_\ell}\mathcal{M}_i^\nu(z_0)
$$

by `column_label`, `parameter_id`, `parameter_kind`, perturbation convention, baseline/plus/minus artifact identifiers when a finite-difference column is used, and the common `ledger_convention_id`. For a centered finite-difference column the audit value is

$$
B_{i\ell}^{(\varepsilon)}
=
\frac{
\mathcal{M}_i^\nu(z_0+\varepsilon v_\ell)
-
\mathcal{M}_i^\nu(z_0-\varepsilon v_\ell)
}{2\varepsilon},
$$

with a reported finite-difference residual. The packet must also report that the clock, inverse-clock, root, Jacobian, force-weight, support, action, event, force-checksum, and consumer-checksum guards are passed on the same live-ledger convention. If any guard is absent, the column is a candidate or diagnostic column only and the status remains `live-ledger-derivative-open`.

Third, a range screen may use the resulting column matrix as a preview, but it is not the certified matrix $B$ until the bounded-speed all-pairs handoff and this zero-mean correction row consume the same ledger identity. When the range/cokernel probe is derived from `live_derivative_column_intake.column_matrix_preview`, set

$$
B_{\mathrm{cand}}=B_{\mathrm{preview}}
$$

and treat it as a preview matrix. The probe may report `candidate_range_cokernel_check.provenance=live_derivative_column_intake.column_matrix_preview`, but the audit packet and preview probe must keep `certifies_live_derivative_matrix=false`, `certifies_correction_direction=false`, and `not_retained` until the rank/range certificate and correction verdict are emitted on the live ledger.

If the preview probe also emits a least-squares coefficient vector, it must be named as a preview object only:

$$
\alpha_{\mathrm{preview}}
=
\operatorname*{argmin}_{\alpha}
\left\|
B_{\mathrm{preview}}\alpha+\mathbf{m}_{\mathrm{frz}}
\right\|_2,
\qquad
r_{\mathrm{preview}}
=
B_{\mathrm{preview}}\alpha_{\mathrm{preview}}+\mathbf{m}_{\mathrm{frz}}.
$$

The vector $\alpha_{\mathrm{preview}}$ may be reported with $\|r_{\mathrm{preview}}\|_2$ and a reconstructed right-hand side, but it is not a correction direction for $B\alpha=-\mathcal{M}^\nu(z_0)$, must not populate `linear_system_intake.derivative_matrix`, `rank`, `range_residual`, `range_projection`, or `cokernel_projection`, and must keep `certifies_live_derivative_matrix=false`, `certifies_correction_direction=false`, `live-ledger-derivative-open`, `zero-mean-correction-open`, and `not_retained`.

When the preview right-hand side lies outside the preview range, the same preview probe may also emit a preview-only cokernel witness. Use the range-residual orientation

$$
\rho_{\mathrm{preview}}
=
-\mathbf{m}_{\mathrm{frz}}
-
\Pi_{\operatorname{Range}B_{\mathrm{preview}}}
\left(
-\mathbf{m}_{\mathrm{frz}}
\right),
\qquad
q_{\mathrm{preview}}
=
\frac{\rho_{\mathrm{preview}}}{\|\rho_{\mathrm{preview}}\|_2}.
$$

If the full-column-rank least-squares preview is also emitted, this orientation is $\rho_{\mathrm{preview}}=-r_{\mathrm{preview}}$. The diagnostic identities are

$$
B_{\mathrm{preview}}^Tq_{\mathrm{preview}}=0,
\qquad
q_{\mathrm{preview}}^T(-\mathbf{m}_{\mathrm{frz}})
=
\|\rho_{\mathrm{preview}}\|_2.
$$

This `preview_cokernel_witness` is a cokernel witness for $B_{\mathrm{preview}}$ only. It must keep `certifies_live_derivative_matrix=false`, `certifies_correction_direction=false`, `zero-mean-correction-open`, and `not_retained`; it cannot certify a live cokernel vector for $B$ until the certified derivative matrix, rank/range certificate, and same-ledger correction verdict are emitted.

### Certified Live Matrix Boundary

A provenance-checked preview may become the certified live derivative matrix only after the matrix ledger and the live mean-functional ledger agree:

$$
\mathsf{ledger}(B)
=
\mathsf{ledger}(\mathcal{M}^\nu(z_0))
=
\mathcal{L}_{\mathrm{live}}^\nu.
$$

Every clock, inverse-clock, root, Jacobian, force-weight, support, action, event, force-checksum, and consumer-checksum guard must pass on that same ledger. Only then may

$$
B_{i\ell}
=
D_{v_\ell}\mathcal{M}_i^\nu(z_0)
$$

populate `linear_system_intake.derivative_matrix`.

Let

$$
\mathbf{m}_0=\mathcal{M}^\nu(z_0),
\qquad
y=-\mathbf{m}_0,
\qquad
\widehat{y}
=
\Pi_{\operatorname{Range}B}y,
\qquad
\rho_B=y-\widehat{y},
\qquad
\delta_B=\|\rho_B\|_2.
$$

The `live_derivative_matrix_certificate` row must report the certified matrix source, same-ledger identifiers, `rank`, `range_projection`, `range_residual`, and `cokernel_projection`. Its range verdict is

$$
\delta_B\le\tau_{\mathrm{range}}
\quad\Longleftrightarrow\quad
\texttt{certified-live-rhs-in-range},
$$

while $\delta_B>\tau_{\mathrm{range}}$ emits `certified-live-rhs-out-of-range`. In the obstructed case the live cokernel witness is

$$
q_B=\frac{\rho_B}{\|\rho_B\|_2},
\qquad
B^Tq_B=0,
\qquad
q_B^T(-\mathbf{m}_0)=\delta_B.
$$

This certificate is stronger than a preview probe because it may populate the live matrix and range fields. It is still weaker than retention: it must keep `certifies_correction_direction=false`, `certifies_bounded_speed_live_ledger=false`, and `not_retained` until a correction direction, ledger margins, primitive excursion, speed band, normal reconstruction, action/Noether, event, stability, and observer-export rows close on the same ledger.

If $\delta_B\le\tau_{\mathrm{range}}$, the certified matrix may also emit a same-ledger coefficient vector

$$
\alpha_B\in\mathcal{S}_B,
\qquad
\mathcal{S}_B
=
\left\{
\alpha:
\left\|B\alpha+\mathbf{m}_0\right\|_2
\le
\tau_{\mathrm{solve}}
\right\}.
$$

When a canonical representative is needed and the certified matrix has full column rank, use the least-squares representative

$$
\alpha_B
=
\operatorname*{argmin}_{\alpha}
\left\|B\alpha+\mathbf{m}_0\right\|_2.
$$

The emitted correction displacement and residual are

$$
\delta z_B
=
\sum_\ell(\alpha_B)_\ell v_\ell,
\qquad
r_B
=
B\alpha_B+\mathbf{m}_0.
$$

This emission certifies only the linearized zero-mean solve on the same ledger:

$$
\mathsf{ledger}(\alpha_B)
=
\mathsf{ledger}(B)
=
\mathsf{ledger}(\mathcal{M}^\nu(z_0))
=
\mathcal{L}_{\mathrm{live}}^\nu.
$$

The status may advance to `correction-direction-found` only after the first-order ledger-margin row passes:

$$
g_k(z_0)+Dg_k(z_0)[\delta z_B]\ge\tau_{g,k}
$$

for every declared delay, Jacobian, speed-band, support, action/event, force-checksum, and consumer-checksum guard or margin on the same ledger. That status still does not retain a branch; it only permits the speed-ODE row to proceed to primitive excursion, speed band, clock/length, normal reconstruction, action/Noether, event, stability, observer-export, and coupled fixed-point tests.

It should report the least-squares obstruction

$$
\delta_{\mathcal{M}}
=
\operatorname{dist}
\left(
-\mathcal{M}^\nu(z_0),
\operatorname{Range}B
\right),
$$

or an interval enclosure for the same quantity. The useful statuses are:

| Status | Meaning |
| --- | --- |
| `zero-mean-correction-open` | the live correction matrix has not been assembled |
| `frozen-fixed-ledger-mean-obstruction` | only the frozen octahedral source mean has been measured |
| `candidate-range-cokernel-diagnostic` | a declared $B_{\mathrm{cand}}$ has been checked against $\mathbf{m}_{\mathrm{frz}}$, but it is not a certified live derivative matrix; the live derivative status remains `live-ledger-derivative-open` unless all required same-ledger derivative columns are certified |
| `live-ledger-derivative-open` | $\mathcal{M}^\nu$ was evaluated but derivative columns omit live clock, root, Jacobian, force, support, action, or event terms |
| `correction-rank-open` | derivative columns exist, but no rank or range certificate has been emitted |
| `certified-live-rhs-in-range` | the same-ledger matrix $B$ has certified $-\mathcal{M}^\nu(z_0)\in\operatorname{Range}B$ and may emit $\alpha_B$, but no correction direction or branch is retained until the ledger-margin row and downstream rows close |
| `correction-obstruction-sampled` | sampled or interval data show $-\mathcal{M}^\nu$ outside the available derivative range |
| `correction-direction-found` | $\alpha_B$ solves or encloses $B\alpha=-\mathcal{M}^\nu(z_0)$ and the first-order ledger-margin row passes; this is still not branch retention |
| `speed-ode-zero-mean-corrected-candidate` | the corrected live ledger satisfies the zero-mean row and may proceed to primitive, speed-band, clock/length, normal reconstruction, and coupled fixed-point rows |

The last status is not retention. It is only permission for the scalar speed ODE to become a live row in the larger bounded-speed branch certificate.

The next executable boundary after `correction-direction-found` is a post-correction primitive feasibility packet. It consumes the certified same-ledger $\alpha_B$ direction and checks supplied primitive return and speed-band rows without claiming the clock/length row. For each receiver it must name

$$
A_i(u;z_0+\delta z_B)
=
\Gamma
\int_0^u
T_i(s;z_0+\delta z_B)\cdot
F_i^\nu(s;z_0+\delta z_B)\,ds,
\qquad
\nu_i(u)=\nu_{i,0}+A_i(u;z_0+\delta z_B),
$$

and emit a return residual plus interval bounds

$$
|A_i(H_*)-A_i(0)|\le \tau_A,
\qquad
\nu_-\le
\nu_{i,0}+A_{i,\min}
\le
\nu_{i,0}+A_{i,\max}
\le
\nu_+.
$$

The current executable intake records this boundary as `speed_ode_primitive_feasibility_certificate` with schema `neutral-swarm-octahedral-zero-mean-speed-primitive-feasibility-certificate/v1`. A passing packet may set `speed-primitive-feasibility-certified` and advance the first failed row to `clock-length-return-open`. It must still keep `certifies_bounded_speed_live_ledger=false`, `retention=not_retained`, and `retained_branch=false` because the clock/length return, normal reconstruction, action/Noether, event, stability, observer-export, and coupled fixed-point rows remain open.

The next packet consumes the same primitive bounds and verifies the clock/length return row:

$$
R_{L,i}^{\nu}
=
\int_0^{H_*}
\left(\nu_{i,0}+A_i(u;z_0+\delta z_B)\right)\,du
-L_i.
$$

Equivalently, for a single-cover branch it may solve

$$
\nu_{i,0}^{\mathrm{clk}}
=
\frac{
L_i-\int_0^{H_*}A_i(u;z_0+\delta z_B)\,du
}{H_*},
\qquad
R_{L,i}^{\nu}
=
H_*
\left(
\nu_{i,0}-\nu_{i,0}^{\mathrm{clk}}
\right).
$$

For a winding branch, replace $H_*$ and $L_i$ by $H_{\mathrm{com}}$ and $m_iL_i$. The executable intake records this boundary as `speed_ode_clock_length_certificate` with schema `neutral-swarm-octahedral-zero-mean-speed-clock-length-certificate/v1`. A passing packet may set `speed-clock-length-return-certified` and advance the first failed row to `normal-reconstruction-open`. It must still keep `certifies_bounded_speed_live_ledger=false`, `retention=not_retained`, and `retained_branch=false` because normal reconstruction, action/Noether, event, stability, observer-export, and coupled fixed-point rows remain open.

After that boundary, the same intake may emit a downstream `normal_reconstruction_handoff` packet with schema `neutral-swarm-octahedral-zero-mean-normal-reconstruction-handoff/v1`. This packet is priority-only bridge data, not a normal reconstruction certificate. It transports the corrected speed profile

$$
\widehat{\nu}_i(u)
=
\nu_{i,0}
+
A_i(u;z_0+\delta z_B),
\qquad
\frac{d\Lambda_i}{du}
=
\widehat{\nu}_i(u),
\qquad
\nu_i(\lambda_i)
=
\widehat{\nu}_i(\chi_i(\lambda_i))
$$

and the receiver rows for normal residual, tangent holonomy, position closure, unit-tangent error, and support margin into the normal-reconstruction theorem target. It must consume the same `speed_ode_clock_length_certificate`, keep `certifies_normal_reconstruction=false`, keep `certifies_bounded_speed_live_ledger=false`, keep `retention=not_retained`, and report `normal-reconstruction-open` as the next failed row. A winding branch uses the same pullback after replacing the clock/length residual by

$$
R_{L,i}^{\nu,\mathrm{wind}}
=
\int_0^{H_{\mathrm{com}}}
\widehat{\nu}_i(u)\,du
-
m_iL_i.
$$

If the normal solver supplies same-ledger closure rows after this handoff, the intake may emit `bounded_speed_normal_reconstruction_candidate` with schema `neutral-swarm-octahedral-zero-mean-bounded-speed-normal-reconstruction-candidate/v1`. The candidate must close the normal equation, tangent holonomy, position closure, unit-tangent, support-margin, noncollision, root-persistence, and normal Krawczyk rows against the same bounded-speed ledger id, force checksum, and consumer checksum. Passing this packet may set `bounded-speed-normal-reconstruction-candidate`, but it must still keep `certifies_bounded_speed_live_ledger=false`, `retention=not_retained`, and `retained_branch=false`; the next open row remains bounded-speed live-ledger/action/Noether/stability closure rather than branch retention.

---

## 5. Allowed Correction Channels

A valid correction direction may use only variables that are present on the live ledger and in the derivative matrix. The main channels are:

1. speed coefficients $b$, through $\nu_i$, $\chi_i$, $\Lambda_i$, $G_r^\nu$, $J_r^\nu$, and $F_i^\nu$;
2. geometry and support variables $a$ and $s$, through $T_i$, support projection, root sheets, and support multiplier or variational-inequality rows;
3. retained root or tail variables $r$, only when they are active variables or are Schur-complemented with the root residual derivative;
4. event variables $e$, only when the endpoint/reset convention and conservation rows are part of the same ledger;
5. self, medium-response, fold-layer, support-work, or action-derived tangent rows, only when their force and derivative rows use the same causal-time convention and consumer checksum.

The rigid source split

$$
\left\langle f_{i,\mathrm{partner}}^1\right\rangle>0,
\qquad
\left\langle f_{i,\mathrm{cross}}^1\right\rangle=0
$$

is a certified frozen-ledger value. It does not decide which live channel works. It only identifies what the first live correction must change: either the antipodal-partner mean, a live cross-binary mean that no longer cancels after the ledger moves, or an added same-ledger tangent contribution must offset the frozen positive drift.

---

## 6. Theorem Target

**Theorem target: speed-ODE zero-mean correction.** Fix a bounded-speed branch chart, a certified fixed-speed source ledger, one live all-pairs handoff convention, one period or winding convention, one support convention, and one action/event convention. The intake certificate may supply $\mathbf{m}_{\mathrm{frz}}$ and the source split, but theorem status still requires the live objects below. Suppose a solver emits:

1. a live bounded-speed ledger $\mathcal{L}_{\mathrm{live}}^\nu$ with clock maps, active roots, inactive gaps, Jacobian floors, tail interface, force checksum, and consumer checksum;
2. the mean vector $\mathcal{M}^\nu$ on that ledger;
3. derivative columns for $\mathcal{M}^\nu$ with all bounded-speed clock, inverse-clock, root, Jacobian, force-weight, support, action, and event terms included or Schur-complemented;
4. a rank or interval-range certificate for $B$;
5. a correction direction or obstruction certificate that preserves the declared ledger margins.

Then the frozen fixed-ledger mean obstruction has been converted into a live bounded-speed zero-mean correction verdict. If the verdict is `correction-direction-found`, the speed-ODE row may advance to primitive excursion, speed-band, clock/length, normal reconstruction, and coupled fixed-point testing. If any row is missing, the current status remains before bounded-speed dynamics closure.

Current status:

$$
\texttt{zero-mean-correction-open}.
$$
