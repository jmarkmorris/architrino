# Receiver-Normal Ratchet: Diagnostic Packet

Dated 2026-07-08. Claim level: exact algebra for parts A-C; numerical diagnostic
for parts D-E. Parts A-C are promoted to
[Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md)
under `Receiver-Velocity Affine Form and the Branch Resistance Tensor` and
`Separator Taxonomy`. Part D is the original partner-only single-root diagnostic.
Part E is the self-hit-inclusive, all-roots, dual-mollified successor; it stays
here as priority evidence until the origin-layer finite-impulse obligation
(part E, obligations) is discharged.

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

## E. Self-hit-inclusive diagnostic (dual-mollified, all retained roots)

This is the promoted successor to part D. Method: same reflection-symmetric
pair, but the sharp branch sum is replaced by the dual-mollified integral. The
key identity is $dg/ds = D_s$ with $g(s)=|X(t)-X_{\mathrm{src}}(s)|-c_f(t-s)$,
so the sharp sum $\sum_{\mathrm{roots}} f/|D_s|$ is exactly $\int f\,\delta(g)\,ds$.
Mollifying $\delta$ with shell width $\eta$ regularizes the $D_s\to0$ caustic
automatically (the finite-impulse mechanism), and

$$
\Gamma_{\mathrm{moll}}
=
\sum_{\mathrm{kind}}\sigma_{\mathrm{kind}}\,\kappa\epsilon^2
\int \frac{\delta_\eta(g)}{r^2+\epsilon_c^2}\,ds,
\qquad
a = c_f\,\Xi_{\mathrm{moll}} - V\,\Gamma_{\mathrm{moll}}
$$

with $\delta_\eta$ a normalized cosine bump. Both kinds' roots are summed; the
self kind excludes the diagonal collar $t-s\le\eta$. Scripts:
[diagnostics/breather_moll.py](diagnostics/breather_moll.py),
[breather_char.py](diagnostics/breather_char.py),
[transit.py](diagnostics/transit.py).

**E1. $\Gamma$ changes sign, monotonically in radius (robust).** Binning
$\Gamma$ by $|X|$ over the infall ($\lambda=0.5$–$1.0$, $\epsilon_c=0.3$,
$\eta=0.05$):

| $\lvert X\rvert$ band | $\Gamma_{\mathrm{net}}$ | $\Gamma_{\mathrm{partner}}$ | $\Gamma_{\mathrm{self}}$ |
| --- | --- | --- | --- |
| $[0.9,1.0]$ | $-0.23$ | $-0.27$ | $+0.04$ |
| $[0.7,0.9]$ | $+0.95$ | $-0.39$ | $+1.34$ |
| $[0.5,0.7]$ | $+15.1$ | $-0.67$ | $+15.8$ |
| $[0.0,0.1]$ | $+38.9$ | $-12.2$ | $+51.1$ |

Partner is anti-damping ($\Gamma_p<0$) everywhere, as the polarity sign demands;
self is damping ($\Gamma_s>0$) everywhere. The **net** sign flips at
$\lvert X\rvert\approx0.85$: partner-dominated anti-damping on the outer leg,
self-dominated damping inside. This crossover is stable across couplings and
regularization. So the necessary ingredient for a limit cycle — a drain region
to offset the injection region — is present.

**E2. No bound cycle at any tested parameter.** Sweeping
$\lambda\in\{0.3,0.6,1.0,1.5\}$, $\epsilon_c\in\{0.5,1.0\}$: every run collapses
to the origin and escapes on the first far-side leg; no second apocenter appears.
The far-side return kinetic energy is positive (net energy gained across the
transit), i.e. runaway. This corroborates, numerically and at these parameters,
the "failed stabilization test" reading already in
[collinear-breather.md](../../../../../content/markdown/aaa/proof-programs/collinear-breather.md).

**E3. The decision lives at the origin self-caustic, and this integrator cannot
resolve it.** Instrumenting the transit: partner acceleration is correctly inward
and restoring throughout; at the origin the self term spikes (e.g.
$a_{\mathrm{self}}\approx-23$ at $X=0.29$) and drives the receiver **super-field**
($\lvert\beta\rvert>1$) in essentially every resolvable case. The post-origin
overshoot grows as $\eta\to0$ (apocenter radius $1.8\to2.3\to3.0$ under
$\eta=0.08\to0.05\to0.03$), so the origin-layer impulse is regularization-sensitive
and stiff. The infall itself converges (first-crossing time $2.016\to2.000\to1.986$).

## What this does and does not establish

Establishes, robustly and in its domain of validity ($\lvert\beta\rvert<1$, away
from the origin layer):

1. The redrive is not cosmetic. The receiver-normal factor is the entire
   velocity-dependent force, and it is a polarity-signed damping law.
2. $\Gamma$ changes sign in radius: partner anti-damping outside
   $\lvert X\rvert\approx0.85$, self damping inside. The limit-cycle ingredient
   exists.
3. Away from the origin, partner attraction is anti-damping and a partner-only
   collinear reduction is a strict runaway (confirmed by the single-root control
   in part D: $W=1$ binds, $W=|D_T/D_s|$ escapes).

Does **not** establish existence or nonexistence of the breather. At every tested
parameter the reduced two-body collinear model runs away, but the decision is
made at the origin-crossing self-caustic, where the sub-field affine/damping
picture does not extend and the impulse is regularization-sensitive. That impulse
is exactly the finite-impulse-lemma quantity the proof program must certify with
the dual-mollified law; a crude fixed-$\eta$ integrator cannot settle it.

**Relocated obstruction.** The open question is no longer the field-speed
threshold (not a branch event; resolved) or the outer partner floor (holds with
$\Theta_-$; resolved). It is the **origin-crossing self-caustic impulse**: does a
certified finite impulse there admit a return that closes, or does it necessarily
drive the receiver super-field into runaway? This is the one place the collinear
program must invoke the finite-impulse lemma rather than the branch-sum reduction.

## Obligations before promoting E as a nonexistence result

1. Resolve the origin layer with the finite-impulse lemma, not a fixed-$\eta$
   integrator; confirm the far-side return KE converges to a positive floor.
2. Handle the super-field arc explicitly (the receiver-normal null is crossed;
   $W^{\mathrm{rec}}$ and the diagonal collar change there).
3. Sweep $(\eta,\epsilon_c,\lambda)$ for any admissible sub-field transit, if one
   exists, before claiming the collinear breather cannot close.
4. Test whether held-release dephasing or curvature (the mechanisms
   `collinear-breather.md` already flags for the field-speed head-on seed) changes
   the origin-transit verdict.

## Consumers

- [collinear-breather.md](../../../../../content/markdown/aaa/proof-programs/collinear-breather.md)
  `Receiver-normal weight conversion`, Lemmas 20, 21, 22.
- [closed-form-collinear-breather-ansatz.md](../../../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md)
  signed partner branch table, parity ledger.
- [master-equation-breather.md](../../../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
  deep-past ceilings, Type II fold hyperedge.
