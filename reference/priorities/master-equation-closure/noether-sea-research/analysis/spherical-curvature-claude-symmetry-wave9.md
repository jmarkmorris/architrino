# Symmetry wave 9: release-from-rest reductions on the stationary-source window for six poles, the antiprism family and twisted hexagons, and the D4 release

## Status, checkpoint record and compute receipt

Legend: ✓ Done, ◐ Partial, ○ Not done. Role: symmetry (Specialist lens `emmy-noether`, launch name "spherical-curvature symmetry"), wave 9 of the [spherical curvature investigation](spherical-curvature-configuration-space-plan.md). Waves 1–8 are frozen and cited, not edited ([wave 8](spherical-curvature-claude-symmetry-wave8.md) 8f365611…). Units: unit sphere, $c_f=1$, $g=K/(Rc_f^2)$; grades and falsifiers at each claim. **Every result of items (a)–(c) is motion on the stationary-source window only**, the interval from release until the first reception of a moving emission, and the hard boundary stated for each case is a boundary of the derivation, not a property of later motion.

Checkpoint log (actual `date -u` read immediately before each save):

- 2026-10-11 01:33:20 UTC — single save: (a), (b), (c) and the D4 release (wave-8 item 3, freeze signal received) complete.

**Compute receipt (slot with coverage; limit 30 s, one thread, PID captured).** All runs with `OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1`, single foreground-waited process under `/usr/bin/time -p`, Python PID reported from inside (wrapper PID = `time`, Python PID one higher). Instrument [spherical-curvature-claude-symmetry-wave9-instrument.py](../evidence/spherical-curvature-claude-symmetry-wave9-instrument.py), revision 4. Runs of the `all` part: run 1 start 01:28:54 UTC, 5.43 s, wrapper PID 92652, exited on a `TypeError` (a `None` landmark entry) after a divide-by-zero when the scan reached a fixed image, no output; run 2 start 01:29:26, 9.21 s, wrapper PID 93035, **controls failed** (the wave-8 reproduction control; landmark angles in degrees had been passed to the radian quadrature), output retained in scratch as not evidence; run 3 start 01:30:31, 0.02 s, wrapper PID 93951, `SyntaxError` from a misplaced `else` in the revision-3 patch; run 4 start 01:31:35, end 01:31:39, 3.56 s, PIDs 94380/94381, all controls passed, this is the evidence run; `d4` part start 01:31:39, end 01:31:39, 0.71 s, PIDs 94397/94398, controls passed. Outputs `*-wave9-all.json`, `*-wave9-d4.json`. Three failed revisions in a row are recorded as such; each failure was caught by an exception or a control before any number was used.

## The window reduction and its controls (common to (a)–(c))

A symmetric release from rest keeps every root at the partners' initial sites until the first moving-emission reception, so on that window the representative receiver moves on a fixed great circle $\mathbf x(q)$ (arc length $q$ from its initial site, unit tangent $\mathbf t=d\mathbf x/dq$) under the static field of the fixed images $\mathbf s_j$:

$$
q''=g\,f(q),\quad f(q)=\mathbf t(q)\cdot\sum_j\sigma_j\frac{\mathbf x(q)-\mathbf s_j}{|\mathbf x(q)-\mathbf s_j|^3},\qquad
\tfrac12q'^2=g\,[W(q)-W(0)],\quad W(q)=\sum_{\text{unlike}}\frac1{|\mathbf x(q)-\mathbf s_j|}-\sum_{\text{like}}\frac1{|\mathbf x(q)-\mathbf s_j|},
$$

the first integral being the identity $f=dW/dq$ (the kernel is a gradient), not a physical energy; $t(q_1)=\int_0^{q_1}dq/\sqrt{2g(W-W(0))}$; every time scales as $g^{-1/2}$. Two boundaries end the derivation: the window end $T_w$, solved self-consistently from $T_w=\min_j|\mathbf x(q(T_w))-\mathbf s_j|$ (the shortest root reads a moving emission), and the wake-speed crossing $t_c$ at which $|q'|=1$, which is an ordinary-chart boundary by the wave-2 theorem (self-hit onset; the sub-wake root census also ends there); the hard boundary is $\min(T_w,t_c)$. Controls recorded before the targets, all passed in the evidence run: the alternating hexagon (twist $60^\circ$) gives $f(0)=0$ on the equatorial path; $G(\delta)\delta^2\to1$; $f=dW/dq$ at a test point in every case (difference $0$ to machine precision); the quadrature equals an independent `solve_ivp` integration at the test point in every case at $g=1$; the twist-$50^\circ$ case reproduces wave 8 ($T_w=0.679077$, $t(\text{twist }0)=0.959209$). Claim grade: derived for the reduction, first integral and boundaries; measured for every number below.

## (a) Six poles released from rest

Receiver $P_x$ on the great circle through $\mathbf e_x$ and the diagonal $\mathbf w$, moving away from the $+\mathbf w$ cap (direction $-\mathbf c_x$ of wave 1), $q$ the arc from $\mathbf e_x$; by the order-12 transitive symmetry all six share $q(t)$ (electrinos by inversion). Fixed images: $\mathbf e_y,\mathbf e_z$ (like), $-\mathbf e_x,-\mathbf e_y,-\mathbf e_z$ (unlike). $f(0)=1$ (the wave-1 release magnitude $K/R^2$); $f>0$ until its first zero at $q=97.6^\circ$, far beyond any window, so there is no turning point on the window and the motion is monotone. Landmarks on the path: the great circle perpendicular to $\mathbf w$, where the six members simultaneously form the alternating hexagon configuration, at $q=35.26^\circ$; the $-\mathbf w$ point at $125.26^\circ$; the fixed image of $E_x$ at $180^\circ$ (the only image on the path). No actual unlike coincidence occurs on the path (shown in the wave-7 design: the $P_x$ and $E_y$ paths never meet), and the hexagon configuration is crossed with nonzero speed, not approached as an equilibrium.

| $g$ | $T_w$ | $q$, speed at $T_w$ | $t_c$ (speed $=1$) | $q$ at $t_c$ | hard boundary | hexagon circle reached at |
| --- | --- | --- | --- | --- | --- | --- |
| $1$ | $1.0913$ | $34.90^\circ$, $1.152$ | $0.9631$ | $27.00^\circ$ | $0.9631$ (wake crossing) | $t=1.097$, speed $1.159$: outside |
| $1/10$ | $1.3667$ | $5.36^\circ$, $0.137$ | $7.659$ | $169.2^\circ$ | $1.3667$ ($T_w$) | $t=3.469$: outside |

At $g=1$ the released six poles reach wake speed at $t=0.963$ ($27^\circ$ along the path) before the window ends; the derivation stops there with the members still $8^\circ$ short of the hexagon configuration. At $g=1/10$ the window ends at $t=1.37$ with the members only $5.4^\circ$ from their poles at speed $0.14$. Claim grade: measured. Falsifier: a root of some member reading an emission with $s>0$ before $\min(T_w,t_c)$.

## (b) Polarity-segregated antiprism released from rest at colatitudes $30^\circ$, $45^\circ$, $60^\circ$

Receiver $P_0$ at colatitude $\theta_0$ on the azimuth-$0$ meridian, $q$ the increase of its polar angle (southward); images: positrinos at $(\theta_0;120^\circ,240^\circ)$, electrinos at $(180^\circ-\theta_0;60^\circ,180^\circ,300^\circ)$; Family A symmetry (order 12, transitive) keeps all six on their meridians with the common $q$. $f(0)=2.222,\ 1.196,\ 0.946$ (the last is the wave-2 value for $\lambda_0=30^\circ$), equator-ward in every case; first zeros of $f$ at $q=139.8^\circ,\ 115.9^\circ,\ 86.4^\circ$, all beyond the windows, so no turning point on any window. The equator, where the configuration is the alternating hexagon, lies at $q=90^\circ-\theta_0$; the antipodal electrino image is never approached (antipodal for all $q$), and the nearest actual unlike distance on the path is $1$ (at the hexagon crossing), so there is no singular endpoint.

| $\theta_0$ | $g$ | $T_w$ | $q$, speed at $T_w$ | $t_c$, $q$ at $t_c$ | hard boundary | equator reached at |
| --- | --- | --- | --- | --- | --- | --- |
| $30^\circ$ | $1$ | $1.1261$ | $67.9^\circ$, $1.933$ | $0.4969$, $14.9^\circ$ | $0.4969$ (wake) | $1.053$, speed $1.81$: inside $T_w$, beyond $t_c$ |
| $30^\circ$ | $1/10$ | $0.9381$ | $5.5^\circ$, $0.200$ | $4.844$ | $0.9381$ ($T_w$) | $3.330$: outside |
| $45^\circ$ | $1$ | $1.1447$ | $44.3^\circ$, $1.368$ | $0.8529$, $24.6^\circ$ | $0.8529$ (wake) | $1.154$: outside |
| $45^\circ$ | $1/10$ | $1.2843$ | $5.6^\circ$, $0.152$ | $6.853$ | $1.2843$ ($T_w$) | $3.648$: outside |
| $60^\circ$ | $1$ | $1.0564$ | $31.0^\circ$, $1.054$ | $1.0070$, $28.1^\circ$ | $1.0070$ (wake) | $1.039$, speed $1.035$: inside $T_w$, beyond $t_c$ |
| $60^\circ$ | $1/10$ | $1.2842$ | $4.5^\circ$, $0.122$ | $8.240$ | $1.2842$ ($T_w$) | $3.286$: outside |

At $g=1$ every antiprism release crosses wake speed before its window ends (the higher the initial latitude, the sooner: $0.50$, $0.85$, $1.01$), and the derivation stops there; at $g=1/10$ the windows end at $t\approx0.94$ to $1.28$ with the members $4.5^\circ$ to $5.6^\circ$ from their sites at speeds $0.12$ to $0.20$. Claim grade: measured. Falsifier: as in (a).

## (c) Twisted planar hexagon released from rest at twists $40^\circ$, $50^\circ$ and $70^\circ$

Receiver $P_0$ at azimuth $q=\psi$; electrino images at $\phi_0+120k^\circ$, positrino images at $120^\circ,240^\circ$; actual twist $\Phi=\phi_0-2\psi$. $f(0)=S(\phi_0)$: $+1.590$ ($40^\circ$), $+0.668$ ($50^\circ$), $-0.668$ ($70^\circ$); the sign change beyond $60^\circ$ sends the $70^\circ$ case the other way, toward the electrino at relative azimuth $-50^\circ$, and by the reflection $\phi\to120^\circ-\phi$ the $70^\circ$ case is the exact mirror of the $50^\circ$ case: identical times, with "twist $80^\circ,90^\circ,\dots,120^\circ$" in place of "$40^\circ,30^\circ,\dots,0^\circ$", the actual unlike coincidence being at twist $120^\circ$ ($\psi=-25^\circ$). $f$ has no zero before the image on the path in any case: monotone, no turning point.

| $\phi_0$ | $g$ | $T_w$ | $\psi$, twist, speed at $T_w$ | $t_c$ ($\psi$ at $t_c$) | hard boundary | landmarks inside the hard boundary |
| --- | --- | --- | --- | --- | --- | --- |
| $40^\circ$ | $1$ | $0.4812$ | $12.16^\circ$, $15.7^\circ$, $1.034$ | $0.4722$ ($11.63^\circ$, twist $16.7^\circ$) | $0.4722$ (wake) | twist $30^\circ$ at $0.322$ (speed $0.58$), twist $20^\circ$ at $0.442$ ($0.90$); twist $10^\circ$ ($0.525$) and $0^\circ$ ($0.588$) outside |
| $40^\circ$ | $1/10$ | $0.6515$ | $1.98^\circ$, $36.0^\circ$, $0.108$ | $2.149$ | $0.6515$ ($T_w$) | none (twist $30^\circ$ at $1.018$) |
| $50^\circ$ | $1$ | $0.6791$ | $10.30^\circ$, $29.4^\circ$, $0.619$ | $0.8638$ ($18.7^\circ$) | $0.6791$ ($T_w$) | twist $40^\circ$ at $0.492$, $30^\circ$ at $0.670$ |
| $50^\circ$ | $1/10$ | $0.8242$ | $1.33^\circ$, $47.3^\circ$, $0.057$ | $3.494$ | $0.8242$ ($T_w$) | none |
| $70^\circ$ | $1$ | $0.6791$ | $-10.30^\circ$, $90.6^\circ$, $0.619$ | $0.8638$ ($-18.7^\circ$) | $0.6791$ ($T_w$) | twist $80^\circ$ at $0.492$, $90^\circ$ at $0.670$ |
| $70^\circ$ | $1/10$ | $0.8242$ | $-1.33^\circ$, $72.7^\circ$, $0.057$ | $3.494$ | $0.8242$ ($T_w$) | none |

The $40^\circ$ release at $g=1$ is the fastest case: it reaches wake speed at $t=0.472$ with the twist at $16.7^\circ$, ten milliseconds of dimensionless time before its window would end, and the derivation stops there; twist zero (the singular endpoint, an actual unlike coincidence) is not reached inside any window or hard boundary in any case. Claim grade: measured; the mirror identity of the $70^\circ$ and $50^\circ$ cases is derived (reflection symmetry of $S$) and confirmed to all printed digits.

## Summary across (a)–(c)

On its stationary-source window every release from rest examined here is monotone (no turning point: the first zero of the window field lies far beyond every window), reaches no singular endpoint, and scales in time as $g^{-1/2}$ (checked: twist $50^\circ$, $0.9592\times\sqrt{10}=3.0333$). At $g=1$ the hard boundary is the wake-speed crossing in six of the seven cases (six poles at $0.963$; antiprism $0.497$, $0.853$, $1.007$; twist $40^\circ$ at $0.472$), the twist-$50^\circ$/$70^\circ$ pair being the exception ($T_w=0.679$ before $t_c=0.864$); at $g=1/10$ the hard boundary is always the window end, at $t\approx0.65$ to $1.37$, with the members a few degrees from their sites at speeds $0.06$ to $0.20$. The released six poles and antiprisms head for the alternating-hexagon configuration and, at $g=1$, would cross it at speeds above $c_f$ ($1.16$, $1.81$, $1.38$, $1.04$); in every such case the derivation ends at the wake crossing before the crossing of the configuration, so what happens at the hexagon configuration is not derived. Claim grade: measured summary of derived-scope results. Falsifier: any case's root reading a moving emission, or a member's speed reaching $c_f$, before the stated hard boundary.

## The D4 release (wave-8 item 3, after the freeze signal)

Cell D4 of wave 7: six poles with the H2 history $\mathbf x_i(s)=\sigma_i[\cos(\beta s)\mathbf e_a+\sin(\beta s)\mathbf d_a]$ for all $s\le0$, $\beta=1/4$, release at the poles with velocity $\beta\mathbf d_a$. Instrument part `d4` (controls first, all passed: $\beta\to0$ reproduces the static field $-\mathbf e_x/4-\mathbf h$ to $10^{-5}$; the five delays at $P_x$ solve the wave-7 one-variable equations to $10^{-10}$; the omitted-root negative control). For every member the five partner roots are unique on $(0,2.6]$ (one sign change each; the sub-wake bound certifies uniqueness), with delays and transmitter factors (receiver $P_x$): $P_y,E_z$ at $\tau=1.25096$, $D_t=1.13446$; $P_z,E_y$ at $\tau=1.59677$, $D_t=0.89800$; $E_x$ at $\tau=1.94140$, $D_t=1.06007$. Release values, identical for all six members to $10^{-10}$ (the $\mathbb Z_6$ symmetry): tangent acceleration $P\mathbf A=(0,-0.81107,-0.54985)$ at $P_x$ (and its symmetry images), magnitude $0.97988$; discarded radial part $-0.24295$; tangent work $\mathbf v\cdot\mathbf A=-0.046176$; speed derivative $d|\mathbf v|/dT=-0.184706$, sign negative for all six. Comparison with the stationary-past release (wave 1, V1 at the same state): $|P\mathbf A|=1$, radial $-0.25$, tangent work exactly $0$. The moving past therefore rotates the release tangent acceleration out of the cap-direction plane (the component along the velocity direction $\mathbf d_x$ is $-0.1847$ against $0$ for H1) and makes the six speeds decrease at first order, where under H1 they are stationary at release and rise at second order. Claim grade: measured (five-hit sum with certified unique roots); derived for the equality of the six values. Falsifiers: a second root for some pair on $(0,2.6]$ (the scan records exactly one sign change per pair), a delay not solving its stated equation, or a reviewer reference value differing from the ones listed.

## Evidence record

Files written in wave 9 (new, untracked; waves 1–8 untouched): this report; the instrument (revision 4); `*-wave9-all.json` (run 4); `*-wave9-d4.json`. The failed runs 1–3 left no evidence output (run 2's control-failed output and all stderr captures are in the scratchpad only). All runs under 30 s, pinned, PIDs recorded above. No background job, build, EOM run or git write; coverage's and review's files were not read.
