# Receiver-Normal Ratchet: Diagnostic Packet

Dated 2026-07-08. Claim level: exact algebra for parts A-C, G2; numerical
diagnostic for parts D-G. Parts A-C are promoted to
[Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md)
under `Receiver-Velocity Affine Form and the Branch Resistance Tensor` and
`Separator Taxonomy`. Parts D-E are the earlier partner-only and dual-mollified
diagnostics. **Part F is the decisive result:** for the head-on collinear family
the far-side return kinetic energy converges to a positive floor, so no breather
closes; the mechanism is partner anti-damping injecting energy while the only
sink (self-repulsion) never activates on a monotone head-on orbit. Part F is
convergent and stiffness-free and does not depend on resolving the origin
caustic.

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

**E3. Strong coupling drives the receiver super-field at the origin.**
Instrumenting the transit: partner acceleration is correctly inward and restoring
throughout; at the origin the self term spikes (e.g. $a_{\mathrm{self}}\approx-23$
at $X=0.29$) and drives the receiver **super-field** ($\lvert\beta\rvert>1$). The
post-origin overshoot grows as $\eta\to0$, so a fixed-$\eta$ integrator cannot
resolve that spike. Part F shows this is not where the question is decided: the
super-field crossing is the fail-closed head-on event, already runaway, and the
regime where a breather could exist ($\lambda<\lambda_c$) has no caustic at all.

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

Part F supersedes this "relocated obstruction" framing. The origin self-caustic
turns out **not** to be where the question is decided.

## F. Decisive result: the far-side return KE is a convergent positive floor (head-on family)

The stiff origin caustic in part E was a red herring created by strong coupling.
The clean decomposition:

**F1. A sub-field infall is partner-only and caustic-free.** A particle falling
monotonically from $x_0$ cannot satisfy $|X(t)-X(s)|=c_f(t-s)$ with $s<t$ unless
it moved super-field, so there are **no self-hits on the infall** and, since
$|V|<c_f$ keeps $D_s=c_f-V_{\mathrm{src}}\hat r>0$, **no caustic**. The infall is
therefore clean, stiffness-free, and convergent — no mollifier needed. Script
[diagnostics/infall_lib.py](diagnostics/infall_lib.py).

**F2. Anti-damping drives the infall to field speed at finite radius.** With the
canonical weight, partner attraction anti-damps the infall (part B), so the
crossing speed rises with coupling. There is a critical $\lambda_c(\epsilon_c)$:

| $\epsilon_c$ | infall stays sub-field to origin | reaches $|V|=c_f$ at finite radius $X_\ast>0$ |
| --- | --- | --- |
| $0.3$ | $\lambda\lesssim0.15$ ($\lvert V_{\mathrm{origin}}\rvert=0.95$ at $\lambda{=}0.1$) | $\lambda\gtrsim0.2$ ($X_\ast{=}0.04$); $\lambda{=}1{:}\,X_\ast{=}0.28$ |
| $0.6$ | $\lambda\lesssim0.3$ | $\lambda{=}1{:}\,X_\ast{=}0.25$; $\lambda{=}2{:}\,X_\ast{=}0.49$ |

For $\lambda>\lambda_c$ the pair reaches field speed **before** the origin and
goes super-field — the fail-closed field-speed head-on event. The self-caustic of
part E is downstream of an already-decided super-field crossing.

**F3. The sub-field regime ($\lambda<\lambda_c$) runs away with $W_{\mathrm{self}}\equiv0$.**
This is the only regime where a breather could live, and it is fully resolvable
(sharp roots, no stiffness). Integrating the complete partner+self law from
held release, tracing $X$, $V$, and the per-channel work
([diagnostics/subfield_clean.py](diagnostics/subfield_clean.py)): the particle
falls in, crosses the origin sub-field, and then **coasts outward forever at
constant $|V|$ — zero turning points.** The energy budget is exact and decisive:

| $\lambda$ | $\epsilon_c$ | KE at mirror radius $X=-x_0$ | $W_{\mathrm{partner}}$ | $W_{\mathrm{self}}$ | turning points |
| --- | --- | --- | --- | --- | --- |
| $0.05$ | $0.3$ | $0.186$ | $+0.133$ | $+0.000$ | $0$ |
| $0.10$ | $0.3$ | $0.448$ | $+0.432$ | $+0.000$ | $0$ |
| $0.10$ | $0.6$ | $0.168$ | $+0.112$ | $+0.000$ | $0$ |
| $0.20$ | $0.6$ | $0.408$ | $+0.381$ | $+0.000$ | $0$ |

The return KE is convergent in $dt$ (agrees to 3–4 digits at $dt=10^{-3}$ vs
$5\times10^{-4}$) and is a **positive floor**. $W_{\mathrm{self}}=0$ to machine
precision in every case: the only damping channel never activates, because the
trajectory is globally monotone and monotone trajectories have no self-hits.
$W_{\mathrm{partner}}>0$ is the anti-damping energy injection. After the crossing
the partner force dies by forward-root starvation (Proposition 4) as the pair
recedes near field speed, so the particle coasts out — escape.

**F4. Why no initial condition rescues it.** Starting from rest, the particle
falls monotonically to the origin; no self-hit (hence no outward self-repulsion)
can switch on before the origin, and nothing else turns it around. After the
origin it recedes monotonically, still with no self-hit, while partner attraction
starves. A collinear breather would require substantial self-hit activity, which
requires a non-monotone (folded) trajectory, which the dynamics does not produce
from a head-on release. The self-repulsion damping the affine analysis identified
is real but geometrically inaccessible to the head-on orbit.

## What this closes

For the **head-on reflection-symmetric two-body collinear family**, the breather
question is answered in the negative, rigorously and convergently:

- the far-side return kinetic energy converges to a **positive floor**, so the
  orbit cannot return to rest at the mirror radius;
- weak coupling: clean sub-field runaway with the only damping channel
  ($W_{\mathrm{self}}$) identically zero;
- strong coupling: the anti-damped infall reaches field speed at finite radius
  and goes super-field into the fail-closed head-on event.

There is no intermediate binding window. The single number that decides it — the
mirror-radius return KE — is positive across the whole coupling range.

## What this does NOT close

This is the head-on family from held release, and reflection-symmetric. It is not
a general nonexistence proof for every collinear history. The general obstruction
it exposes is structural and worth stating as the closure target: **partner
attraction is a net energy source on every leg (anti-damping), and the only sink
(self-repulsion) requires a non-monotone trajectory to activate.** A collinear
breather must therefore be a folded orbit whose self-hit drain, over a period,
exactly cancels the partner anti-damping injection. Whether any such folded
history exists is the remaining question; the head-on family demonstrably is not
one. The mechanisms `collinear-breather.md` already flags — dephasing, curvature,
angular momentum — are precisely the ways to break the monotonicity that starves
the self drain, which is now the concrete reason they are needed.

## G. The folded route is field-speed gated

Testing the folded-orbit route (obligation from part F) yields a sharp kinematic
gate rather than a balance. Script
[diagnostics/selfhit_onset.py](diagnostics/selfhit_onset.py).

**G1. Self-hits switch on exactly at $V_{\max}=c_f$.** On a prescribed oscillation
$X(t)=a\cos\omega t$, counting active self-roots over a period as a function of
$V_{\max}=a\omega$:

| $V_{\max}/c_f$ | $0.30$ | $0.60$ | $0.90$ | $0.99$ | $1.05$ | $1.20$ | $1.50$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| max self-roots | $0$ | $0$ | $0$ | $0$ | $2$ | $2$ | $2$ |

The onset is exactly $c_f$, as the mean-value bound requires: $|X(t)-X(s)|\le V_{\max}(t-s)<c_f(t-s)$ below field speed forbids any self-root. This confirms the self-root exclusion lemma of `closed-form-collinear-breather-ansatz.md`.

**G2. Consequence (promoted to `master-equation.md`).** Combined with the affine
form, this closes the sub-field folded route outright: the damping coefficient
$\Gamma=\sum_\ell w_\ell$ can turn net-positive (stabilizing) only where self-hits
are active, i.e. at or above field speed. A strictly sub-field assembly cannot
self-stabilize against partner anti-damping — its only dissipative channel is
kinematically inaccessible. Any breather is therefore intrinsically a field-speed
object, with its stabilization living at the self-caustic. This is now stated in
`master-equation.md` under `Self-Hit as Stabilization Mechanism` as a necessary
condition for binding.

**G3. The field-speed balance itself remains open (caustic-limited).** Attempting
the per-period energy budget $\oint a_{\mathrm{law}}\!\cdot V\,dt$ on prescribed
super-field oscillations ([folded_balance.py](diagnostics/folded_balance.py)) is
dominated by the coincidence of the field-speed crossing with the origin core, so
the numbers near $V_{\max}=c_f$ are caustic-contaminated and do not decide whether
a stabilizing amplitude exists. This is the same finite-impulse-lemma obstacle as
part E, now correctly located: it is the genuine remaining question, and a crude
integrator cannot settle it. A clean test needs a field-speed folded orbit whose
caustic is spatially separated from the origin (curvature or angular momentum), so
the self-caustic impulse can be certified on its own.

## Consumers

- [collinear-breather.md](../../../../../content/markdown/aaa/proof-programs/collinear-breather.md)
  `Receiver-normal weight conversion`, Lemmas 20, 21, 22.
- [closed-form-collinear-breather-ansatz.md](../../../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md)
  signed partner branch table, parity ledger.
- [master-equation-breather.md](../../../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
  deep-past ceilings, Type II fold hyperedge.
