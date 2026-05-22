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
\approx0.
$$

The diagnostic now emits this as `mean_split_certificate` with status `frozen-fixed-ledger-mean-obstruction`. The antipodal-partner positive mean is analytic on the certified partner root bracket:

$$
\left\langle f_{i,\mathrm{partner}}^1\right\rangle
=
\frac{\sin y_*}{y_*^3\left(1+\sin(y_*/2)\right)},
\qquad
2\cos\frac{y_*}{2}-y_*=0.
$$

The cross-binary contribution is sampled as pairwise mean cancellation, with its exact phase anti-periodicity proof route staged in the diagnostic packet. Thus the frozen cross-binary mean cancels in the current certificate row, while the antipodal-partner contribution leaves a positive drift. The valid conclusion is

$$
\texttt{sampled-speed-ode-zero-mean-failed}
$$

on the frozen source ledger, together with

$$
\texttt{bounded-speed-ledger-handoff-open}.
$$

This is not a no-go theorem for bounded speed factors. It is the source obstruction that any live correction row must overcome after the clocks, roots, Jacobians, force weights, support/action/event rows, and derivative columns are rebuilt on one ledger.

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
| `live-ledger-derivative-open` | $\mathcal{M}^\nu$ was evaluated but derivative columns omit live clock, root, Jacobian, force, support, action, or event terms |
| `correction-rank-open` | derivative columns exist, but no rank or range certificate has been emitted |
| `correction-obstruction-sampled` | sampled or interval data show $-\mathcal{M}^\nu$ outside the available derivative range |
| `correction-direction-found` | a first-order direction solves or encloses $B\alpha=-\mathcal{M}^\nu$ while ledger margins stay open |
| `speed-ode-zero-mean-corrected-candidate` | the corrected live ledger satisfies the zero-mean row and may proceed to primitive, speed-band, clock/length, normal reconstruction, and coupled fixed-point rows |

The last status is not retention. It is only permission for the scalar speed ODE to become a live row in the larger bounded-speed branch certificate.

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
\left\langle f_{i,\mathrm{cross}}^1\right\rangle\approx0
$$

does not decide which live channel works. It only identifies what the first live correction must change: either the antipodal-partner mean, the cross-binary mean, or an added same-ledger tangent contribution must offset the frozen positive drift.

---

## 6. Theorem Target

**Theorem target: speed-ODE zero-mean correction.** Fix a bounded-speed branch chart, a certified fixed-speed source ledger, one live all-pairs handoff convention, one period or winding convention, one support convention, and one action/event convention. Suppose a solver emits:

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
