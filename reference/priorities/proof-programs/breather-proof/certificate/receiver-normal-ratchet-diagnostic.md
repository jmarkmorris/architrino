# Receiver-Normal Ratchet: Diagnostic Packet

Dated 2026-07-08. Claim level: exact algebra for parts A-C; numerical diagnostic
only for part D. Intended corpus destination: parts A-C are promoted to
[Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md)
under `Receiver-Velocity Affine Form and the Branch Resistance Tensor` and
`Separator Taxonomy`. Part D stays here until an independent multi-root,
self-hit-inclusive integration reproduces it.

## Why this packet exists

Three proof-program documents (`collinear-breather.md`,
`master-equation-breather.md`, `closed-form-collinear-breather-ansatz.md`)
carried force bounds weighted by the source-normal-only factor
$1/|J| = c_f/|D_s|$ rather than the canonical $W^{\mathrm{rec}} = |D_T/D_s|$.
Each document also stated, in its own restart notice, that such rows were
"restart-only". This packet records what the correct weight changes and what it
does not.

## A. The exact affine form (algebra, verified in sympy)

On the sub-field-speed receiver chart $\|\mathbf V_i(T)\| < c_f$ every active
branch has $D_{T,\ell} = c_f - \mathbf V_i(T)\cdot\hat{\mathbf r}_\ell > 0$, so
the modulus resolves and the per-hit term is
$w_\ell(c_f - \mathbf V_i\cdot\hat{\mathbf r}_\ell)\hat{\mathbf r}_\ell$ with
$w_\ell = \kappa\sigma_{ij}|q_iq_j|/(r_\ell^2|D_{s,\ell}|)$ independent of
$\mathbf V_i(T)$. Hence

$$
\frac{d^2\mathbf X_i}{dT^2}
=
c_f\,\boldsymbol{\Xi}_i - \mathsf{M}_i\mathbf V_i(T),
\qquad
\boldsymbol{\Xi}_i=\sum_\ell w_\ell\hat{\mathbf r}_\ell,
\qquad
\mathsf{M}_i=\sum_\ell w_\ell\,\hat{\mathbf r}_\ell\otimes\hat{\mathbf r}_\ell
$$

The Master Equation is exactly affine in the receiver's instantaneous velocity.
$\mathsf{M}_i$ is symmetric, so no antisymmetric magnetic-like term exists in the
instantaneous kernel.

## B. Polarity-signed damping (algebra)

Contracting with $\mathbf V_i$, and writing $s_\ell=\mathbf V_i\cdot\hat{\mathbf r}_\ell$:

$$
\frac{d}{dT}\left(\tfrac12\|\mathbf V_i\|^2\right)
=
c_f\,\boldsymbol{\Xi}_i\cdot\mathbf V_i - \sum_\ell w_\ell s_\ell^2
$$

The first term is odd in $s_\ell$. The second is even, and carries the polarity
sign. Attraction injects at rate $|w_\ell|s_\ell^2$ in both directions of radial
motion; repulsion drains at the same rate. Since $\sigma_{ii}=+1$, self-hits
always drain.

The stale weight $c_f/|D_s|$ gives power $\propto \sigma_\ell s_\ell$, odd in
$s_\ell$ and therefore work-symmetric. The difference between the two laws is
exactly the even term $-w_\ell s_\ell^2$. A calculation on the stale weight has
$\Gamma\equiv0$ and cannot see the damping question at all.

## C. Separator taxonomy (algebra)

- $D_s=0$ is the source-normal caustic. Source velocity, emission time. Fold,
  $\Delta N=\pm2$, $\Delta D=0$. $W^{\mathrm{rec}}\to\infty$.
- $D_T=0$ is the receiver-normal null. Receiver velocity, reception time. No
  root change. $W^{\mathrm{rec}}\to0$.
- Delay $\to h$ is memory-boundary exit. Odd jumps admissible.

$\|\mathbf V_i\|=c_f$ is none of these by itself. Freezing the source velocity
equal to the receiver's on a locally affine window forces the first two to
coincide there, manufacturing a caustic the exact law does not have. This is the
origin of the "no finite-radius field-speed separator" claim previously carried
by the ansatz note.

Corollary (field-speed barrier): as $\mathbf V_i\cdot\hat{\mathbf r}_\ell\to c_f^-$
branch $\ell$ contributes nothing. Only a source ahead of the receiver can carry
it through field speed. Self-repulsion never can.

## D. Numerical diagnostic (NOT a proof; partner-only, single root)

Reflection-symmetric collinear pair, $X_2=X$, $X_1=-X$, held at $\pm X_0$ and
released at $T=0$. Exact causal root by bisection on the stored history, smallest
positive delay only, no self-hits, core mollifier $\epsilon_c$. Units $c_f=X_0=1$,
$\lambda\equiv\kappa\epsilon^2/(c_f^2X_0)$.

**D1. Inbound field speed is reached at finite radius, with no caustic.**
At $\beta=-1$: $\lambda=2$ gives $X=+0.528$, exact $D_s=1.000$; $\lambda=6$ gives
$X=+0.813$, exact $D_s=1.000$. The affine-frozen prediction is $D_s=0$ at the
same instant. The affine barrier is an artifact.

**D2. Held-release threshold.** With $\epsilon_c\to0$ the held chart reaches
$\beta=-1$ before its validity window closes for $\lambda\gtrsim1.6$; below that
the moving-partner chart takes over and still reaches it (e.g. $\lambda=0.5$ at
$T=3.05$, $X=0.156$, $D_s=0.604$).

**D3. Outbound receiver-normal null is an attracting invariant manifold.**
Post-crossing, the receiver decelerates only until $|\beta|=1$ and then coasts:
max outbound $|\beta|$ was $1.0037$ ($\lambda=2$) and $1.0001$ ($\lambda=6$) at
$\epsilon_c=0.15$. The decelerating partner image lies behind the receiver, so
its branch strength carries $c_f-|\dot X|$ and vanishes at the null.

**D4. Weight comparison (the decisive control).** $\lambda=0.3$, $\epsilon_c=1.0$,
released from rest, integrated to $T=40$:

| law | max $|\beta|$ | $\beta$ at origin | recaptured? |
| --- | --- | --- | --- |
| instantaneous Coulomb, $W=1$ | 0.577 | $-0.576$ | yes, turns at $X=-1.001$ (periodic) |
| delayed, $W=1$ | 0.529 | $-0.529$ | yes, turns at $X=-0.567$ |
| delayed, $W=c_f/|D_s|$ (stale) | 0.633 | $-0.633$ | no (slowly decelerating at $X=-5.96$) |
| delayed, $W=|D_T/D_s|$ (canonical) | 0.787 | $-0.787$ | no, escapes ($v=-0.71$ at $X=-20$) |

The instantaneous-Coulomb row is the integrator control and is periodic to
$10^{-3}$, so the escape is not a discretization artifact.

## What this does and does not establish

Establishes: the redrive is not cosmetic. The receiver-normal factor is the
entire velocity-dependent force, and it is anti-damping for attraction.

Does **not** establish that the collinear breather fails. The diagnostic is
partner-only with a single retained root. Self-hits are the only damping channel
(part B), and they are omitted. The correct reading is that the outer-turn
theorem target in `collinear-breather.md` now has a sharp statement of what it
must prove: that the retained self drain $\sum w_s s_s^2$ balances the partner
injection $\sum|w_p|s_p^2$ over a period.

## Obligations before promotion of part D

1. Re-run with all retained roots, not the smallest-delay root only.
2. Include self-hit rows with the excluded diagonal and shell mollifier.
3. Confirm $\Gamma$ changes sign somewhere on the cycle, or exhibit the escape
   with self-hits present.
4. Sweep $(\eta,\epsilon_c,\lambda)$ for an admissible region, if one exists.

## Consumers

- [collinear-breather.md](../../../../../content/markdown/aaa/proof-programs/collinear-breather.md)
  `Receiver-normal weight conversion`, Lemmas 20, 21, 22.
- [closed-form-collinear-breather-ansatz.md](../../../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md)
  signed partner branch table, parity ledger.
- [master-equation-breather.md](../../../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
  deep-past ceilings, Type II fold hyperedge.
