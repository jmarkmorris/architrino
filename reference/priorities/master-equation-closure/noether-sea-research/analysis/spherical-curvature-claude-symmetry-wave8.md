# Symmetry wave 8: the twisted-hexagon reduction on its stationary-source window, and the character of the census stall point

## Status, checkpoint record and compute receipt

Legend: ✓ Done, ◐ Partial, ○ Not done. Role: symmetry (Specialist lens `emmy-noether`, launch name "spherical-curvature symmetry"), wave 8 of the [spherical curvature investigation](spherical-curvature-configuration-space-plan.md). Waves 1–7 are frozen and cited, not edited ([wave 7](spherical-curvature-claude-symmetry-wave7.md) 7d8c2a53…). Units: unit sphere, $c_f=1$, $g=K/(Rc_f^2)$; grades and falsifiers at each claim. Item (3), the D4 five-hit closed form, waits for the reviewer's frozen reference and is ○ Not started.

Checkpoint log (actual `date -u` read immediately before each save):

- 2026-10-11 01:24:58 UTC — single save: (1) and (2) complete; (3) pending the reviewer's signal.

**Compute receipt (slot with coverage; limit 30 s, one thread, PID captured).** All runs with `OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1`, single foreground-waited process under `/usr/bin/time -p`, Python PID reported from inside (wrapper PID is the `time` process): `twist` start 01:22:45 UTC, end 01:22:45, 0.53 s, PIDs 90287/90288; `polish` run 1 start 01:22:45, end 01:22:46, 0.66 s, PIDs 90292/90293, **control failed, no target ran** (the objective had been given the census polarity vector $(+,+,+,-,-,-)$ for the hexagon control instead of the alternating pattern; the control returned $F=8.53$ at the hexagon and the script exited; output retained as `*-polish-run1-control-failed.json`); `polish` run 2 (revision 2 of the instrument, objective takes the polarity vector as an argument) start 01:23:36, end 01:23:37, 1.19 s, PIDs 90758/90759, control passed ($F=2.6\times10^{-30}$ at the hexagon, no displacement). Instrument: [spherical-curvature-claude-symmetry-wave8-instrument.py](../evidence/spherical-curvature-claude-symmetry-wave8-instrument.py); outputs `*-wave8-twist.json`, `*-wave8-polish.json`.

## (1) The twisted hexagon released from rest: exact reduction on the stationary-source window

### Convention and the reduction

Cell D1 of wave 7: positrinos $P_k$ at azimuth $120k^\circ+\psi(t)$, electrinos $E_k$ at $50^\circ+120k^\circ-\psi(t)$, all on the equator, at rest for all $s\le0$, $\psi(0)=0$, $\psi'(0)=0$. The twist is $\Phi(t)=50^\circ-2\psi(t)$, the azimuthal separation from a positrino to its nearer electrino, counterclockwise; the symmetry group of wave 7 (order 12, transitive) keeps the motion in this one-parameter family. On the stationary-source window every root of every member reads an emission from $s\le0$, where every source sits at its initial site; so the receiver $P_0$, at azimuth $\psi$, is accelerated by the fixed images of the five partners at their initial azimuths $50^\circ,170^\circ,290^\circ$ (electrinos) and $120^\circ,240^\circ$ (positrinos), with $D_t=1$. This is the essential point and the reason the reduction is not the quasi-static "$\psi''=gS(\Phi)$" with the current twist: the law reads the partners where they were, and on this window that is where they started. With the per-hit azimuthal kernel of wave 5, $-\sigma G(\delta)$ for a source at relative azimuth $\delta$ and $G(\delta)=\cos(\delta/2)/(4\sin^2(\delta/2))$, the exact equation on the window is the autonomous ordinary differential equation

$$
\psi''=g\,f(\psi),\qquad f(\psi)=\sum_{a\in\{50^\circ,170^\circ,290^\circ\}}G(a-\psi)-\sum_{a\in\{120^\circ,240^\circ\}}G(a-\psi),
$$

with $f(0)=S(50^\circ)=0.668065$ (the release value of wave 7). Since $G(\delta)=\tfrac{d}{d\delta}\big[-1/(2\sin(\delta/2))\big]=\tfrac{d}{d\delta}[-1/\mathrm{chord}(\delta)]$, $f$ is the derivative of $W(\psi)=\sum_e1/\mathrm{chord}(a_e-\psi)-\sum_p1/\mathrm{chord}(a_p-\psi)$, minus the fixed-source generating function at the receiver's position, and the first integral of the reduction is

$$
\tfrac12\psi'^2=g\,[W(\psi)-W(0)],
$$

an identity of this static reduction (a consequence of the kernel being a gradient on the window), not a physical energy. $f(\psi)>0$ on $[0,25^\circ]$ (checked on 2001 points; the nearest-electrino term $G(50^\circ-\psi)$ dominates and grows), so $\psi$ increases monotonically, there is no turning point before $\psi=25^\circ$ (twist zero), and the time to reach $\psi_1$ is the quadrature

$$
t(\psi_1)=\int_0^{\psi_1}\frac{d\psi}{\sqrt{2g\,[W(\psi)-W(0)]}},
$$

convergent at $0$ because $W-W(0)\approx f(0)\psi$. Scaling: $\psi(t;g)=\psi(\sqrt g\,t;1)$, so every time scales as $g^{-1/2}$. Claim grade: derived (kernel, gradient identity, first integral, monotonicity on the sampled interval). Falsifier: a root of some member reading an emission with $s>0$ inside the window (the window end below is where that first happens), or $f(\psi)\le0$ somewhere on $[0,25^\circ]$.

### The window end is a hard boundary

The window ends when the first root reads a post-release emission. The shortest delay is the chord from $P_0$ at azimuth $\psi$ to the fixed image of $E_0$ at $50^\circ$, $\mathrm{chord}(50^\circ-\psi)=2\sin((50^\circ-\psi)/2)$, and that root reads the stationary past iff $T\le\mathrm{chord}(50^\circ-\psi(T))$; by the symmetry every member's shortest root is of this class. So $T_w$ solves $T_w=2\sin\big((50^\circ-\psi(T_w))/2\big)$. Beyond $T_w$ the equation above is no longer the law; nothing after $T_w$ is derived here, and in particular the quadrature times below that exceed $T_w$ are properties of the reduction, not of the motion.

### Numbers (measured by the instrument; controls recorded first, all passed)

Controls: initial twist $60^\circ$ gives $f(0)=1.4\times10^{-15}$ (the stationary hexagon); $G(\Phi)\Phi^2\to1$ ($0.9999958$, $0.99999996$, $0.9999999996$ at $\Phi=10^{-2},10^{-3},10^{-4}$); $f=dW/d\psi$ at $\psi=0.3$ to $3\times10^{-10}$; the quadrature time to $\psi=15^\circ$ equals the direct `solve_ivp` integration to $2\times10^{-12}$.

| twist $\Phi$ | $\psi$ | $W(\psi)-W(0)$ | $t$ at $g=1$ | speed on arrival ($g=1$) | $t$ at $g=1/10$ | speed ($g=1/10$) | chord to nearest fixed image |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $40^\circ$ | $5^\circ$ | $0.0737$ | $0.4915$ | $0.384$ | $1.5544$ | $0.121$ | $0.765$ |
| $30^\circ$ | $10^\circ$ | $0.1834$ | $0.6705$ | $0.606$ | $2.1202$ | $0.192$ | $0.684$ |
| $20^\circ$ | $15^\circ$ | $0.3415$ | $0.7935$ | $0.826$ | $2.5092$ | $0.261$ | $0.601$ |
| $10^\circ$ | $20^\circ$ | $0.5698$ | $0.8864$ | $1.067$ | $2.8029$ | $0.338$ | $0.518$ |
| $0^\circ$ | $25^\circ$ | $0.9081$ | $0.9592$ | $1.348$ | $3.0333$ | $0.426$ | $0.433$ |

Window end: at $g=1$, $T_w=0.6791$, where $\psi=10.30^\circ$, twist $29.40^\circ$, speed $0.619$; at $g=1/10$, $T_w=0.8242$, where $\psi=1.33^\circ$, twist $47.34^\circ$, speed $0.057$. So at neither coupling does the twist reach $40^\circ$ or less before the window ends at $g=1/10$, and at $g=1$ the window ends between twist $30^\circ$ and $20^\circ$; twist zero is not reached within the window at either coupling (the reduction would reach it at $t=0.959$ and $3.033$ respectively, both beyond $T_w$). The speeds on the window stay below $c_f$ ($0.62$ at the $g=1$ window end), so the sub-wake root census holds throughout the window; the reduction alone would exceed wake speed at $g=1$ near twist $12^\circ$ ($t\approx0.86$), which is outside the window and is not a statement about the motion.

What the law does at twist zero. In the actual motion twist zero is the coincidence of each positrino with its nearer electrino. That coincidence is a singular endpoint of the law: as the present separation $d$ of an unlike pair tends to zero with sub-wake relative motion, the pair's mutual root has delay at most $d/(1-\beta_{\max})\to0$ (the chord to the partner's recent position is at most $d$ plus the path length), so a positive-separation root with separation tending to zero appears and its per-hit magnitude $\sim1/d^2$ diverges; the canonical law supplies no zero-separation rule and no event law, so the motion is not continued there. On the stationary-source window this does not arise, because every root still reads the initial sites, whose chords are at least $0.43$; the reduction's own value at $\psi=25^\circ$ (twist zero) is finite for exactly that reason, which is another sign that the reduction must not be read past $T_w$. Claim grade: derived for the singular-endpoint statement (chord-versus-path estimate) and measured for every number above. Falsifiers: a quadrature value differing from direct integration (the control bounds this at $10^{-11}$); a $T_w$ not solving the displayed equation; a root with emission $s>0$ before $T_w$.

## (2) Character of the census stall point after a Newton polish

From the recorded seed 1450560595 the wave-7 endpoint was polished by minimizing $F=\tfrac12|T|^2$ over the twelve tangent coordinates (BFGS with finite-difference gradients, then the Hessian of $F$ by central differences of the gradient). Control first: the same polish at the exact hexagon keeps $F=2.6\times10^{-30}$ with no displacement (run 2; run 1's control failed for the polarity-vector defect and no target ran). Result: $F$ moves from $0.4752912005$ to $0.4752912002$, the gradient norm from $2.5\times10^{-5}$ to $1.3\times10^{-7}$, the displacement is $8.9\times10^{-5}$, the residual norm stays $0.97498$, the chord set is unchanged to $10^{-5}$. Hessian eigenvalues of $F$ on the tangent coordinates: $-1\times10^{-6},\ 0,\ +1\times10^{-6}$ (the three rotation zero modes at finite-difference noise), then $0.0530,\ 0.760,\ 1.329,\ 2.631,\ 2.718,\ 3.944,\ 4.833,\ 19.68,\ 37.39$, all positive and the smallest separated from the noise by four orders of magnitude. The instrument's automatic verdict string reads "saddle" because its $\pm10^{-6}$ threshold classified the $-10^{-6}$ rotation mode as negative; that string is an artifact and the correct reading is: **the stall point is a local minimum of the least-squares objective with nonzero residual, up to the three rotations.** Exact symmetry after polish: order $2$ at tolerances $10^{-6},10^{-4},10^{-3}$ and $1$ at $10^{-8}$; the nontrivial element is a reflection (determinant $-1$, no polarity swap) with label permutation $(0)(1\,2)(3\,5)(4)$, a mirror plane containing members $0$ and $4$. So the stall point has $C_s$ symmetry to the polish precision (the gradient is $10^{-7}$ and the symmetry fails only at $10^{-8}$), consistent with an exactly $C_s$-symmetric critical point; the per-member residual norms $0.0737,\ 0.1787,\ 0.1787,\ 0.6613,\ 0.0811,\ 0.6613$ carry the same pairing. Interpretation: random-seed descent on $|P\mathbf A|^2$ is attracted to a genuine local minimum of the objective at which the tangent field is not zero, which is why two thirds of the seeds stalled there; such a point is not an equilibrium of the law and has no dynamical meaning. Claim grade: measured (finite-difference gradient and Hessian, symmetry counts); the "local minimum" reading is inferred from nine positive eigenvalues against three noise-level zero modes. Falsifier: a negative Hessian eigenvalue beyond the finite-difference noise after a tighter polish, or a symmetry element missed at tolerance $10^{-3}$ (the finder is exhaustive over member-pair frames).

## Evidence record

Files written in wave 8 (new, untracked; waves 1–7 untouched): this report; the instrument (revision 2); `*-wave8-twist.json`; `*-wave8-polish.json` (run 2); `*-wave8-polish-run1-control-failed.json` (retained). All runs under 30 s, pinned, PIDs recorded above. No background job, build, EOM run or git write; coverage's files were not read. Item (3) not started.
