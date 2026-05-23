# Bounded Speed Factor Speed-ODE Solvability

Promotion status: `priority-only`. This packet isolates the scalar solvability row implied by the tangential bounded speed factor equation. It refines [bounded-speed-factor-center-time-dynamics.md](bounded-speed-factor-center-time-dynamics.md), [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md), [bounded-speed-factor-action-stability-closure.md](bounded-speed-factor-action-stability-closure.md), [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md), [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md), and [current-dynamics-synthesis.md](current-dynamics-synthesis.md).

It does not retain a branch. It states the closed-period compatibility and speed-band feasibility tests that must accompany any claim that tangential force leakage has been absorbed into a bounded speed factor.

The live-ledger correction target after a frozen zero-mean failure is staged in [bounded-speed-factor-speed-ode-zero-mean-correction-target.md](bounded-speed-factor-speed-ode-zero-mean-correction-target.md).

---

## 1. Center-Time Speed ODE

Let the support curves be closed and arclength-parametrized:

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda_i)\|=1,
\qquad
\mathbf{T}_i=\mathbf{Y}_i'.
$$

Let the bounded speed factor satisfy

$$
0<\nu_-\le\nu_i(\lambda_i)\le\nu_+<\infty,
$$

with center-time clock

$$
\chi_i(\lambda_i)
=
\int_0^{\lambda_i}\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i(u)=\chi_i^{-1}(u),
\qquad
\frac{d\Lambda_i}{du}
=
\nu_i(\Lambda_i(u)).
$$

The center-time trajectory is

$$
\mathbf{X}_i(u)
=
\mathbf{Y}_i(\Lambda_i(u)).
$$

On one retained bounded speed factor root ledger $\mathcal{A}_i^\nu(u)$, define

$$
\widetilde{\mathbf{F}}_i^\nu(u)
=
\sum_{r\in\mathcal{A}_i^\nu(u)}
\sigma_i\sigma_j
\frac{\widehat{\mathbf{R}}_r(u)}
{\eta_r(u)^2|J_r^\nu(u)|}
+
\widetilde{\mathbf{F}}_{i,\mathrm{self}}^\nu(u)
+
\widetilde{\mathbf{F}}_{i,\mathrm{med}}^\nu(u),
$$

with self and medium-response terms included only when their ledgers use the same event-time convention.

If the support descriptor has active multiplier force, replace $\widetilde{\mathbf{F}}_i^\nu$ everywhere in this packet by the total ledger force

$$
\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu
=
\widetilde{\mathbf{F}}_i^\nu
+
\widetilde{\mathbf{F}}_{i,\mathrm{supp}}^\nu,
$$

or declare the corresponding variational-inequality support row. The speed-ODE, normal reconstruction, and action exchange rows must use the same force convention.

The tangential bounded speed factor row is

$$
\nu_i\nu_i'
=
\Gamma\mathbf{T}_i\cdot
\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu,
$$

where $\nu_i'=d\nu_i/d\lambda_i$ and all right-hand quantities are evaluated at $\lambda_i=\Lambda_i(u)$. Since

$$
\frac{d\nu_i}{du}
=
\nu_i'\frac{d\Lambda_i}{du}
=
\nu_i\nu_i',
$$

the equivalent center-time speed ODE is

$$
\boxed{
\frac{d\nu_i}{du}
=
\Gamma T_i(u)\cdot F_i^\nu(u)
}
$$

where

$$
T_i(u)=\mathbf{T}_i(\Lambda_i(u)),
\qquad
F_i^\nu(u)=\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu(u).
$$

Thus the scalar forcing for the speed ODE is

$$
f_i^\nu(u)
=
T_i(u)\cdot F_i^\nu(u).
$$

The speed ODE is not an optional diagnostic. It is the tangential projection of the same center-time dynamics residual whose normal projection is

$$
\nu_i^2\mathbf{K}_i
=
\Gamma P_i^\perp\widetilde{\mathbf{F}}_{i,\mathrm{tot}}^\nu.
$$

---

## 2. Frozen Root/Force Ledger Primitive

For a frozen root/force ledger, treat the curve, source-pair policy, root labels, root signs, Jacobian signs, self-hit convention, medium-response convention, and force samples as fixed functions of $u$ on a common center-time period $H_*$. Then

$$
f_i^\nu(u)
=
T_i(u)\cdot F_i^\nu(u)
$$

is a known scalar function on $[0,H_*]$. The speed ODE has the primitive solution

$$
\nu_i(u)
=
\nu_{i,0}
+
\Gamma
\int_0^u f_i^\nu(s)\,ds.
$$

Define the primitive excursion

$$
A_i(u)
=
\Gamma
\int_0^u f_i^\nu(s)\,ds,
\qquad
A_i(0)=0.
$$

Then

$$
\nu_i(u)=\nu_{i,0}+A_i(u).
$$

The closed-period ODE compatibility condition is

$$
\nu_i(H_*)=\nu_i(0),
$$

hence

$$
\boxed{
\Gamma\int_0^{H_*}f_i^\nu(u)\,du=0.
}
$$

When $\Gamma\ne0$, this is the zero-mean tangential work condition

$$
\int_0^{H_*}
T_i(u)\cdot F_i^\nu(u)\,du
=0.
$$

For a winding branch with site return period $H_i$ and common period $H_{\mathrm{com}}=m_iH_i$, the corresponding row is

$$
\int_0^{H_{\mathrm{com}}}
T_i(u)\cdot F_i^\nu(u)\,du
=0,
$$

with the integrand evaluated on the lifted periodic ledger.

The clock/length return row is separate. For a single-cover return it is

$$
\int_0^{H_*}\nu_i(u)\,du=L_i,
$$

and for winding number $m_i$ it is

$$
\int_0^{H_{\mathrm{com}}}\nu_i(u)\,du=m_iL_i.
$$

Therefore a frozen ledger cannot claim speed-ODE closure from the zero-mean row alone. It must also satisfy the clock/length return row and the bounded-speed band.

---

## 3. Speed-Band Feasibility Inequalities

Let

$$
A_{i,\min}=\min_{0\le u\le H_*}A_i(u),
\qquad
A_{i,\max}=\max_{0\le u\le H_*}A_i(u).
$$

The speed band requires

$$
\nu_-
\le
\nu_{i,0}+A_i(u)
\le
\nu_+
\qquad
\text{for every }u.
$$

Equivalently, the initial speed must lie in the interval

$$
\boxed{
\nu_- - A_{i,\min}
\le
\nu_{i,0}
\le
\nu_+ - A_{i,\max}.
}
$$

This interval is nonempty if and only if

$$
\boxed{
A_{i,\max}-A_{i,\min}
\le
\nu_+-\nu_-.
}
$$

If the clock/length row is also imposed, then

$$
L_i
=
\int_0^{H_*}
\left(\nu_{i,0}+A_i(u)\right)du
=
H_*\nu_{i,0}
+
\int_0^{H_*}A_i(u)\,du,
$$

so the initial speed is fixed by

$$
\boxed{
\nu_{i,0}
=
\frac{L_i-\int_0^{H_*}A_i(u)\,du}{H_*}.
}
$$

The combined speed-band and clock feasibility row is therefore

$$
\boxed{
\nu_- - A_{i,\min}
\le
\frac{L_i-\int_0^{H_*}A_i(u)\,du}{H_*}
\le
\nu_+ - A_{i,\max}.
}
$$

For a winding branch, replace $L_i$ and $H_*$ by $m_iL_i$ and $H_{\mathrm{com}}$.

If the forcing is not frozen because roots, Jacobians, or self-hit terms depend on the speed factor, the same inequalities remain the first feasibility envelope, but the final certificate must solve the coupled fixed-point problem

$$
\nu_i(u)
=
\nu_{i,0}
+
\Gamma
\int_0^u
T_i(s)\cdot F_i^{\nu,\mathrm{op}}(\nu;s)\,ds
$$

on the same root-regular stratum.

---

## 4. Change From Fixed-Speed Tangent Closure

In the fixed-speed subcase,

$$
\nu_i\equiv1,
\qquad
\frac{d\nu_i}{du}=0.
$$

The speed ODE becomes

$$
0
=
\Gamma T_i(u)\cdot F_i^1(u).
$$

When $\Gamma\ne0$, the old fixed-speed tangent closure is the pointwise row

$$
T_i(u)\cdot F_i^1(u)=0
\qquad
\text{for every }u.
$$

In the bounded speed factor row, this pointwise condition is replaced by the coupled requirements

$$
\int_0^{H_*}
T_i(u)\cdot F_i^\nu(u)\,du
=0,
$$

and

$$
\nu_-
\le
\nu_{i,0}
+
\Gamma\int_0^u
T_i(s)\cdot F_i^\nu(s)\,ds
\le
\nu_+
\qquad
\text{for every }u,
$$

together with the clock/length return row. Thus bounded speed factor dynamics allow nonzero pointwise tangent projection only when that projection integrates to a closed, positive, band-limited speed factor on the same force ledger.

This is a strict weakening of the old tangent row, not a deletion of tangential dynamics. The old row is recovered by adding the constraint

$$
\nu_i'( \lambda_i )\equiv0,
$$

or equivalently

$$
\frac{d\nu_i}{du}\equiv0.
$$

If a solver reports a smaller tangential residual but does not emit the primitive $A_i$, the zero-mean integral, the speed-band interval, and the clock/length row, its status is

$$
\texttt{speed-ode-solvability-not-certified}.
$$

### 4.1 Frozen Octahedral Ledger Diagnostic

The rigid octahedral all-pairs source ledger now has a frozen-ledger speed-ODE diagnostic in [../neutral-swarm/octahedral-speed-ode-diagnostic.md](../neutral-swarm/octahedral-speed-ode-diagnostic.md). It deliberately stays on the fixed-speed source ledger and therefore reports

$$
\texttt{bounded-speed-ledger-handoff-open}.
$$

On that frozen ledger, the sampled tangent forcing has the same nonzero period mean for every receiver site:

$$
\frac{1}{2\pi}
\int_0^{2\pi}
T_i(\theta)\cdot F_i^1(\theta)\,d\theta
\approx
0.18420699635,
$$

so

$$
\int_0^{2\pi}
T_i(\theta)\cdot F_i^1(\theta)\,d\theta
\approx
1.15740669293.
$$

The mean-split certificate row identifies

$$
\langle f_{i,\mathrm{partner}}^1\rangle
\approx0.18420699635,
\qquad
\langle f_{i,\mathrm{cross}}^1\rangle
=0.
$$

The partner contribution is positive by the analytic formula

$$
\left\langle f_{i,\mathrm{partner}}^1\right\rangle
=
\frac{\sin y_*}{y_*^3\left(1+\sin(y_*/2)\right)}
$$

on the certified constant partner root $2\cos(y_*/2)-y_*=0$. The cross-binary aggregate is certified by the phase anti-periodicity proof $C_i(\theta+\pi/2)=-C_i(\theta)$ in the diagnostic packet. Thus the frozen rigid ledger fails the zero-mean row by certified partner obstruction before speed-band or clock/length rescue can retain it:

$$
\texttt{sampled-speed-ode-zero-mean-failed}.
$$

This is a diagnostic rejection of the frozen fixed-ledger primitive, not a rejection of bounded-speed continuation. Once $\nu$ becomes an active variable, the clocks, roots, Jacobians, force weights, derivative columns, tail cover, action rows, and event rows must be recomputed on the same live ledger.

The direct successor is the zero-mean correction target in [bounded-speed-factor-speed-ode-zero-mean-correction-target.md](bounded-speed-factor-speed-ode-zero-mean-correction-target.md). It packages the frozen obstruction as a live mean functional

$$
\mathcal{M}_i^\nu(z)
=
\int_0^{H_*}T_i(u;z)\cdot F_i^\nu(u;z)\,du
$$

and requires derivative columns $D_v\mathcal{M}_i^\nu$ through clock, root, Jacobian, force, support, action, and event terms before a correction direction can be consumed by a bounded-speed solver.

---

## 5. Exact-Antipodal Parity Implications

Let $\iota$ be the exact-antipodal involution. Under exact antipodality,

$$
\mathbf{Y}_{\iota i}=-\mathbf{Y}_i,
\qquad
\mathbf{T}_{\iota i}=-\mathbf{T}_i,
\qquad
\widetilde{\mathbf{F}}_{\iota i}^\nu
=
-\widetilde{\mathbf{F}}_i^\nu
$$

provided the polarity row, source-pair policy, memory depth, root ledger, and speed factor are all closed under $\iota$. The bounded speed factor parity row additionally requires

$$
\nu_{\iota i}(\lambda)=\nu_i(\lambda),
\qquad
\chi_{\iota i}(\lambda)=\chi_i(\lambda),
\qquad
\Lambda_{\iota i}(u)=\Lambda_i(u).
$$

Then the scalar speed forcing is pair-even:

$$
f_{\iota i}^\nu(u)
=
T_{\iota i}(u)\cdot F_{\iota i}^\nu(u)
=
T_i(u)\cdot F_i^\nu(u)
=
f_i^\nu(u).
$$

Consequently

$$
A_{\iota i}(u)=A_i(u),
$$

and equal initial speeds

$$
\nu_{\iota i,0}=\nu_{i,0}
$$

imply

$$
\nu_{\iota i}(u)=\nu_i(u)
$$

for the full primitive solution.

The zero-mean compatibility row is also pair-even:

$$
\int_0^{H_*}f_{\iota i}^\nu(u)\,du
=
\int_0^{H_*}f_i^\nu(u)\,du.
$$

Thus exact-antipodal bounded-speed closure does not require the pair-even tangential forcing to vanish pointwise. It requires the pair-even forcing to have a closed primitive that remains speed-even and band-feasible.

If $\nu_{\iota i}\ne\nu_i$, the parity proof fails before the scalar ODE is evaluated because the paired inverse clocks no longer agree. The required status is

$$
\texttt{antipodal-speed-pair-failure}.
$$

If the speed-even row holds but the zero-mean integral fails, the correct status is

$$
\texttt{pair-even-speed-ode-mean-obstruction}.
$$

This is not by itself an antipodal-relaxation trigger. It must still pass the support-complete obstruction, tail, action, and refinement checks before any branch-class expansion is justified.

---

## 6. Self-Hit Excursion Compatibility

When a bounded speed factor branch enters a same-source self-hit excursion, the speed ODE must be solved on the self-hit ledger, not on the pre-hit ordinary ledger. Let

$$
\mathcal{H}_i=[u_-,u_+]
$$

be a certified self-hit interval and write

$$
f_{i,\mathrm{hit}}^\nu(u)
=
T_i(u)\cdot F_{i,\mathrm{hit}}^\nu(u),
\qquad
u\in\mathcal{H}_i.
$$

The excursion primitive is

$$
\nu_i(u)
=
\nu_i(u_-)
+
\Gamma
\int_{u_-}^{u}
f_{i,\mathrm{hit}}^\nu(s)\,ds.
$$

The speed-band excursion row is

$$
\nu_-
\le
\nu_i(u_-)
+
\Gamma
\int_{u_-}^{u}
f_{i,\mathrm{hit}}^\nu(s)\,ds
\le
\nu_+
\qquad
\text{for every }u\in\mathcal{H}_i.
$$

The endpoint speed jump is not free:

$$
\boxed{
\nu_i(u_+)-\nu_i(u_-)
=
\Gamma
\int_{u_-}^{u_+}
f_{i,\mathrm{hit}}^\nu(s)\,ds.
}
$$

If the event convention requires return to the same ordinary ledger speed at exit, then this integral must vanish. If the convention permits an event exchange, the nonzero endpoint jump must be carried by the speed-factor storage/exchange row from the action packet.

The overspeed budget must be evaluated in the same variable. Since $d\lambda_i=\nu_i(u)\,du$, the arclength overspeed budget over the hit interval is

$$
\int_{\lambda_i(u_-)}^{\lambda_i(u_+)}
\left(\nu_i(\lambda)-1\right)_+
d\lambda
=
\int_{u_-}^{u_+}
\left(\nu_i(u)-1\right)_+
\nu_i(u)\,du.
$$

Thus a self-hit excursion is compatible with the speed ODE only if it emits:

$$
\int_{u_-}^{u_+}
\left(\nu_i(u)-1\right)_+
\nu_i(u)\,du
\le
B_{\mathrm{hit}},
$$

the return-crossing row

$$
z(u_-)=0,
\qquad
\dot z(u_-)\ge v_{\mathrm{in},0},
\qquad
z(u_+)=0,
\qquad
\dot z(u_+)\le -v_{\mathrm{out},0},
$$

the dwell-time row

$$
u_+-u_-
\le
\frac{2V_{\mathrm{hit},+}}{a_{\mathrm{return}}},
$$

and the penetration row

$$
\max_{\mathcal{H}_i}z
\le
\frac{V_{\mathrm{hit},+}^2}{2a_{\mathrm{return}}}
\le
z_{\mathrm{col}}.
$$

If any of these rows is missing, the correct status is

$$
\texttt{self-hit-speed-excursion-open}.
$$

---

## 7. Theorem Target

**Theorem target: bounded speed factor speed-ODE solvability.** Fix a center-time period, a bounded speed factor root ledger, source-pair policy, self-hit policy, action scale convention, and speed band. Suppose the scalar forcing

$$
f_i^\nu(u)=T_i(u)\cdot F_i^\nu(u)
$$

is continuous on each ledger segment, has matching endpoint conventions at ledger events, and satisfies the closed-period compatibility integral. Suppose further that the primitive excursion $A_i$ obeys the speed-band feasibility inequalities and the clock/length return row. Then the tangential bounded speed factor equation admits a positive closed speed factor on that ledger. If the force ledger depends on $\nu$, the same statement becomes a coupled fixed-point target on the root-regular bounded-speed stratum and requires the Krawczyk or Newton proof budget from the executable solver protocol.

This theorem target solves only the tangential speed row. It does not solve the curve-normal dynamics row, support-band row, action-derived scale row, Noether row, tail row, or stability row.

---

## 8. Output Schema And Status List

A bounded speed factor speed-ODE packet must emit:

| Field | Required payload |
| --- | --- |
| `solver_space` | `bounded-speed-factor` or `fixed-speed-special-case` |
| `center_time_period` | $H_*$ or $H_{\mathrm{com}}$, winding data, and endpoint convention |
| `force_ledger_status` | frozen ledger, coupled speed-dependent ledger, or ledger-event split |
| `speed_forcing` | $f_i^\nu(u)=T_i(u)\cdot F_i^\nu(u)$ for every site and ledger segment |
| `mean_integral` | $\int f_i^\nu\,du$ and the pass/fail zero-mean row |
| `primitive_excursion` | $A_i(u)=\Gamma\int_0^u f_i^\nu(s)\,ds$ with $A_{i,\min}$ and $A_{i,\max}$ |
| `initial_speed_interval` | $[\nu_- - A_{i,\min},\nu_+ - A_{i,\max}]$ |
| `clock_length_speed` | $\nu_{i,0}=(L_i-\int A_i\,du)/H_*$ or winding analogue |
| `speed_band_feasibility` | combined inequality against $\nu_-$ and $\nu_+$ |
| `fixed_speed_relation` | whether the old pointwise tangent row is active or replaced by zero-mean plus primitive feasibility |
| `antipodal_speed_parity` | speed-even row, paired primitive equality, and parity status |
| `self_hit_excursion` | absent, compatible primitive, exchange-carried jump, or open |
| `action_exchange_status` | action-derived scale, speed-factor exchange row, support-work exchange if active, or `gamma-fitted-not-derived` |
| `status` | first failed row or `speed-ode-solvability-certified` |

The zero-mean correction intake may separately emit `speed-primitive-feasibility-certified` when the post-correction primitive return and speed-band interval pass for a certified $\alpha_B$ direction. It may then emit `speed-clock-length-return-certified` when the same primitive also satisfies the clock/length return residual. These statuses close the scalar speed-ODE row only up to its declared boundary; they remain below retained bounded-speed branch status unless normal reconstruction and the downstream same-ledger rows also close.

Status codes:

$$
\texttt{speed-ode-solvability-certified},
\qquad
\texttt{speed-ode-mean-fails},
\qquad
\texttt{speed-primitive-band-fails},
$$

$$
\texttt{speed-clock-length-fails},
\qquad
\texttt{speed-ode-coupled-fixed-point-open},
\qquad
\texttt{speed-ode-solvability-not-certified},
$$

$$
\texttt{antipodal-speed-pair-failure},
\qquad
\texttt{pair-even-speed-ode-mean-obstruction},
\qquad
\texttt{self-hit-speed-excursion-open},
$$

$$
\texttt{self-hit-speed-exchange-open},
\qquad
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{not-retained}.
$$

Current status:

$$
\texttt{bounded-speed-factor-speed-ode-solvability-open}.
$$
