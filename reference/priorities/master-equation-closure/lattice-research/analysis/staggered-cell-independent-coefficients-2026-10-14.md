# Independent staggered cells: signed receiver and source-error coefficients

Date: 2026-10-14. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`), under Codex's release of coefficient preparation at 12:13:21.664Z in the [staggered-cells conversation](../../../../op/agent-chats/2026-10-14-residuals-staggered-cells/chat.md). Status: derived and known-controlled, **pending Codex review**. No propagation target was evaluated, and the component is not used by any instrument yet.

## 1. Object

For the scalar error $h=q-Q$ between the actual branch $q$ and the comparison $Q$, $h''=\mathcal F[Q+h]-\mathcal F[Q]-\rho$. The difference is the integral over $\theta\in[0,1]$ of the first variation of $\mathcal F$ along $Q+\theta h$. This document derives that variation for one source row, its zero-history subtraction and the bounds it needs, from the causal root and the canonical row. It does not use the original subject's enclosures, propagated errors or event margins.

## 2. Derivation

**Row.** Take an even receiver at vertical displacement $q(t)$ and a source at offset $(d_1,d_2,m)$, with $p=d_1^2+d_2^2$ and $\sigma=(-1)^{m+p}$. The source's vertical displacement is $\sigma q(s)$. Put

$$
z=q(t)-m-\sigma q(s),\qquad r=t-s=\sqrt{p+z^2},\qquad n=z/r,\qquad D=1-\sigma nq'(s).
$$

With $f(z)=z(p+z^2)^{-3/2}$ and $H=f'=(p-2z^2)(p+z^2)^{-5/2}$, the vertical row is $\sigma f(z)/D$. This is the convention of the reviewed evaluator, equivalent to the first-event document's by $m\to-m$, which the group table contains in both signs.

**Variation.** Vary the whole path by $h$, both the receiver and every source on its sublattice.

- From $r\,\delta r=z\,\delta z$ and $\delta r=-\delta s$: $\delta s=-n\,\delta z$.
- The source term then gives $\delta z=h(t)-\sigma[h(s)+q'(s)\delta s]$, so

$$
\delta z=\frac{h(t)-\sigma h(s)}D .
$$

- With $\delta n=(p/r^3)\delta z$ and $\delta q'(s)=h'(s)+q''(s)\delta s$:

$$
\delta D=-\sigma\Big[\Big(\frac{pv_s}{r^3}-n^2a_s\Big)\delta z+n\,h'(s)\Big],\qquad v_s=q'(s),\ a_s=q''(s).
$$

Collecting terms,

$$
\delta\Big(\frac{\sigma f(z)}D\Big)=K_dh(t)-\sigma K_dh(s)+B_dh'(s),
\qquad
K_d=\frac{\sigma H}{D^2}+\frac{np\,v_s}{r^5D^3}-\frac{n^3a_s}{r^2D^3},\qquad B_d=\frac{n^2}{r^2D^2}.
$$

**Agreement with equation (14).** $\sigma K_d$ is the first-event document's unsigned $J_d$. Over $r^3D^3$, using $H=(1-3n^2)/r^3$ and $p/r^2=1-n^2$:

$$
(1-3n^2)(1-\sigma nv_s)+\sigma nv_s(1-n^2)-r\sigma n^3a_s=1-3n^2+2\sigma n^3v_s-r\sigma n^3a_s .
$$

Equation (14)'s numerator, $D^2+2\sigma v_snD+n^2(v_s^2+2\sigma v_sn-3)-r\sigma n^3a_s$, expands to the same expression. The document's equations (15) and (16) are $\sigma$ times the variation and difference derived here: they vary the unsigned row and multiply by $\sigma_d$ in the full sum.

**Zero-history subtraction.** At $q\equiv0$: $s_0=t-|d|$, $n_0=-m/|d|$ and $D=1$, so $K_*=\sigma H_*$ with $H_*=H(-m)$, and $B_*=m^2/|d|^4$. The static row $\sigma f(z_0)$, with $z_0=q(t)-m$, varies by $\sigma H_0h(t)$, $H_0=H(z_0)$. The changed row's variation minus its zero-history value is

$$
(K_d-\sigma H_0)h(t)-\sigma(K_d-\sigma H_*)h(s)+(B_d-B_*)h'(s)-H_*[h(s)-h(s_0)]+B_*[h'(s)-h'(s_0)] .
$$

The zero-history part, $-H_*h(s_0)+B_*h'(s_0)$, depends on $d$ only through its shell. Over a shell $\sum H(-m)=0$ and $\sum m^2=N|d|^2/3$, so the linear operator is exactly $(g/3)\sum_dh'(t-|d|)/|d|^2$, equation (13). It must be kept as this signed shell sum and not bounded row by row.

**Cancellation-preserving receiver coefficient.** In $K_d-\sigma H_0$ the leading terms nearly cancel at small amplitude. With $u=q(s)$,

$$
K_d-\sigma H_0=\sigma\big[(H(z)-H(z_0))+H(z)(D^{-2}-1)\big]+\frac{np\,v_s}{r^5D^3}-\frac{n^3a_s}{r^2D^3},
$$

where

$$
H(z)-H(z_0)=-\sigma u\cdot\overline{H'},\qquad H'(z)=\frac{3z(2z^2-3p)}{(p+z^2)^{7/2}},\qquad D^{-2}-1=\frac{\sigma nv_s(2-\sigma nv_s)}{D^2}.
$$

Here $\overline{H'}$ is the mean of $H'$ over the segment $[z_0,z_0-\sigma u]$, enclosed by its hull after asserting positive range on the whole segment.

**Root shift.** $|s-s_0|=\big||d|-r\big|\le|q(t)-\sigma q(s)|\le|q(t)|+|q(s)|$, by the triangle inequality on the vertical component.

**Incoming error for $s\le0$** (shared premise: the accepted incoming theorem and the certified $\lambda$). The actual branch is $ae^{\lambda s}+w(s)$ with $|w^{(k)}|\le(2\lambda)^kK_0a^2e^{2\lambda s}$ and $K_0=150000$. The comparison is $ae^{\lambda_cs}$. On $[-64,0]$:

$$
|h^{(k)}(s)|\le(2\lambda_+)^kK_0a^2e^{2\lambda_-s}+a\,|\lambda-\lambda_c|_+\big(k\mu_+^{k-1}+64\mu_+^k\big)e^{\mu_-s}.
$$

Here $\lambda_\pm$ are the certified enclosure's ends and $\mu_\pm$ the ends of the hull of $\lambda$ and $\lambda_c$. The second term is the first-event document's equation (21).

## 3. Instrument and controls

`lattice-research/evidence/staggered-cell-independent-2026-10-14/staggered_signed_coefficients.py` implements `coefficients` (returns $K_d-\sigma H_0$, $K_d$, $B_d$, $H_0$, $D$, $r$ as outward intervals), `zero_history` ($H_*$, $B_*$), `root_shift_bound` and `incoming_error`. It loads accepted driver v6 by hash, and through it the pinned interval class; nothing is modified. The controls and their results are in Section 4.

## 4. Known controls

Run after packet C's compute had ended, in the fresh owner `claude-coefficients/`; 6 of 6 on run 2 (`coef-known-run2.json`). File SHA-256 `8302bf971953f5136dadfb0f7341719eb87c8b0babec99ce5d0e0827233bb9f4`.

| Control | Result |
| --- | --- |
| C1 Curved-source analytic differentiation | Receiver and source both follow $q(\tau)=1/10+\tau/7+\tau^2/40$, with source acceleration $1/20$; $p=9$, $m=4$, $\sigma=-1$, $t=1$; perturbation $h=1/3+\tau/5$. The row along $q+\varepsilon h$ is computed in 60 digits by solving its causal root (root $s=-3.85056$), differentiated by a symmetric difference with $\varepsilon=10^{-25}$, and compared with $K_dh(t)-\sigma K_dh(s)+B_dh'(s)$. They agree to $10^{-30}$ relative (both $0.0056299861790854$). The interval $K_d$ and $B_d$, from outward enclosures of the exact inputs, contain their 60-digit values |
| C2 Static source, exact | $p=9$, $m=4$, $q=0$: $K_d=\sigma(-23/3125)$, $B_d=16/625$, $K_d-\sigma H_0=0$, $H_*=-23/3125$, $B_*=16/625$, all enclosed |
| C3 Moving source, exact | The reviewed linear source $(s+5)/8$ ($v_s=1/8$, $a_s=0$; root $-5$, $n=-4/5$, $D=9/10$). $K_d$ encloses $\sigma$ times equation (14)'s form, an independent closed form, $0.0086913580\ldots$; $B_d$ encloses $64/2025$ |
| C4 Exact signed group cancellation | Over all 346 shells of the radius-14 cube, in integers: $\sum\text{mult}\,(p-2m^2)=0$, so $\sum H(-m)=0$, and $3\sum\text{mult}\,m^2=N|d|^2$, which gives the linear operator (13) |
| C5 Refusals and root shift | Refused for their reasons: vanishing transmitter factor, zero-range segment, incoming error outside $[-64,0]$, order 3, nonpositive exponent. On C1's geometry $\big||d|-r\big|=0.1494$ against the bound $0.3473$ |
| C6 Incoming error | At $s=-1$ and $-20$, orders 0 to 2: at least, and within $10^{-12}$ relative of, a 60-digit evaluation of the same formula with the certified $\lambda$ enclosure and the saved $\lambda_c$ |

Run 1 stopped in my own control helper, which indexed a 0-dimensional interval returned for scalar inputs. The helpers now accept either shape and nothing else changed; both runs are retained with sources.

C1's agreement is a check of the algebra by an independent route (root solving and numerical differentiation at 60 digits), not of an implementation against itself. C6 checks the implementation of the stated bound, not the incoming theorem, which is a shared premise.

## 5. Not built

1. **Assembly of $L_j$.** The receiver coefficient is $g\,[S'(q)+\sum_d\text{mult}\,(K_d-\sigma H_0)]$ over the trial tube, summed with signs before the absolute value. It needs:
   - root boxes over the tube;
   - the source boxes from the early method and Q2 v2, plus $P$, $V$, $A$ error padding;
   - $S'$ from the pinned coefficients with the fourth-power Jacobian tail (built in v6) over the full tube radius;
   - the remote receiver-derivative tail, equation (19), with both exponentials, including the actual correction and the characteristic uncertainty.
2. **$Q_j$.** The non-receiver terms: $|K_d-\sigma H_*|P(s)$, $|B_d-B_*|V(s)$, $|H_*|\,|h(s)-h(s_0)|$ and $|B_*|\,|h'(s)-h'(s_0)|$. The last two are bounded through the root shift and the $V$, $A$ tables over the interval joining $s$ and $s_0$, with $J_0$ from Q2 v2 added across zero. Then the linear term $(g/3)\sum V(t-|d|)/|d|^2$, the defect $\rho$ from coverage, and the tails (18) and (19).
3. **The majorant step and strict tube closure per cell**, with strictly past lookups only.

None of these is run. No stability of this nonstationary branch is claimed.
