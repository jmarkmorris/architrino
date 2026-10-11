# Symmetry wave 3: the Family A latitude mode about the stationary hexagon, its delayed characteristic equation, and the antiprism azimuthal margins

## Status and checkpoint record

Legend: ✓ Done, ◐ Partial, ○ Not done. Role: symmetry (Specialist lens `emmy-noether`, launch name "spherical-curvature symmetry"), wave 3 of the [spherical curvature investigation](spherical-curvature-configuration-space-plan.md). Waves 1 and 2 ([scaling and classes](spherical-curvature-claude-symmetry-scaling-and-classes.md), sha256 40f0abe6…; [wave 2](spherical-curvature-claude-symmetry-wave2.md), sha256 d7f4e29a…) are frozen and cited, not edited. Units: unit sphere, $c_f=1$, coupling $g=K/(Rc_f^2)$ the only parameter; physical time is $T=Rt/c_f$. Acceleration language only; every claim carries its grade and falsifier.

What this file is and is not. Item (2) is the linear stability of one symmetric mode (the common-latitude mode of Family A) about a lawful equilibrium of the delayed law, the stationary alternating hexagon with identically stationary history. It is not a periodic orbit, not a six-member frequency claim, and not a statement about the other tangent modes, which the coverage role is computing numerically; a frequency reported here is the imaginary part of a characteristic root of a linearized delay equation.

Checkpoint log (actual `date -u` read immediately before each save):

- 2026-10-11 between 00:39:54 and 00:41:34 UTC (the two `date -u` readings bracketing the save; the exact reading was not taken immediately before this first save) — items (1) and the analytic derivation of (2) saved; instrument for the roots of (2) ○ Not run at this checkpoint; item (3) ○ Not done.
- 2026-10-11 00:42:54 UTC (`date -u` read immediately before saving) — item (2) roots measured (instrument run 00:41:53 UTC, controls passed before target), item (3) margins derived, evidence record saved; wave-3 report returned to the PI. All wave-3 items ✓ at their stated grades.

## (1) Closed form of the Family A static slope at the hexagon

Family A (wave 2, item v): positrinos at azimuths $\phi_k=2\pi k/3$ and common latitude $\lambda$, electrinos at their antipodes (latitude $-\lambda$, azimuths $\phi_k+\pi$); at $\lambda=0$ it is the alternating equatorial hexagon. With stationary sources the pole-ward acceleration of the receiver positrino at azimuth $0$ is $f(\lambda)=\mathbf e_\alpha\cdot\mathbf B$, $\mathbf e_\alpha=(-\sin\lambda,0,\cos\lambda)$. One sympy differentiation of the full five-source static field along the family gives

$$
f(0)=0,\qquad f'(0)=-3-\frac{\sqrt3}{3}=-\Big(3+\frac1{\sqrt3}\Big)=-3.57735\ldots ,
$$

which is the closed form guessed in wave 2 from the finite difference $-3.577$; it also equals $a_0+\sum_ka_k$ of the linearization below, a second route to the same number. Claim grade: derived (symbolic differentiation; command text in the PI report). Falsifier: a sympy evaluation of $d(\mathbf e_\alpha\cdot\mathbf B)/d\lambda$ at $\lambda=0$ differing from $-3-\sqrt3/3$.

## (2) Linearized delayed dynamics of the Family A mode about the stationary hexagon

### Geometry of the perturbation

Let the common latitude be $\lambda(t)$, small, with the complete history $\lambda(t)=\varepsilon e^{\Lambda t}$ for all $t$ (the linearization asks for exponential solutions on the whole line; the stationary hexagon is the $\varepsilon=0$ solution). The receiver is the positrino at azimuth $0$: $\mathbf x(t)=(\cos\lambda,0,\sin\lambda)=\mathbf x_0+\lambda(t)\hat{\mathbf z}+O(\varepsilon^2)$, $\mathbf x_0=(1,0,0)$, with pole-ward unit tangent $\mathbf e_\alpha=\hat{\mathbf z}-\lambda(t)\hat{\mathbf x}+O(\varepsilon^2)$. Its acceleration along $\mathbf e_\alpha$ is exactly $\mathbf e_\alpha\cdot\ddot{\mathbf x}=\lambda''$ (from $\ddot{\mathbf x}=(-\cos\lambda\,\lambda'^2-\sin\lambda\,\lambda'',0,-\sin\lambda\,\lambda'^2+\cos\lambda\,\lambda'')$), and the selected law projected on the tangent $\mathbf e_\alpha$ reads $\lambda''=g\,\mathbf e_\alpha\cdot\mathbf B$, the geometric turning term being normal and the speed-squared terms second order. The five transmitters seen from this receiver, with polarity sign $\sigma_j$ (product sign), latitude sign $\eta_j$ ($+1$ positrino at $+\lambda$, $-1$ electrino at $-\lambda$), unperturbed azimuth $\phi_j$ and unperturbed chord (hence delay) $\tau_j$:

| transmitter | $\sigma_j$ | $\eta_j$ | $\phi_j$ | $\tau_j$ |
| --- | --- | --- | --- | --- |
| electrino at $60^\circ$ | $-1$ | $-1$ | $\pi/3$ | $1$ |
| electrino at $300^\circ$ | $-1$ | $-1$ | $5\pi/3$ | $1$ |
| positrino at $120^\circ$ | $+1$ | $+1$ | $2\pi/3$ | $\sqrt3$ |
| positrino at $240^\circ$ | $+1$ | $+1$ | $4\pi/3$ | $\sqrt3$ |
| electrino at $180^\circ$ | $-1$ | $-1$ | $\pi$ | $2$ |

Transmitter $j$ at its emission time $t-u$ sits at $\mathbf s_j=\mathbf s_j^0+\eta_j\lambda(t-u)\hat{\mathbf z}+O(\varepsilon^2)$ with $\mathbf s_j^0=(\cos\phi_j,\sin\phi_j,0)$, and moves with velocity $\mathbf v_j=\eta_j\lambda'(t-u)\hat{\mathbf z}+O(\varepsilon^2)$ (its horizontal velocity component is $O(\varepsilon\lambda')$, second order).

### The three first-order facts that fix the form of the equation

**Root-time shift is second order.** The line of action is $\mathbf r_j=\mathbf x(t)-\mathbf s_j(t-u)=\mathbf r_j^0+\Delta_j\hat{\mathbf z}$ with $\mathbf r_j^0=\mathbf x_0-\mathbf s_j^0$ horizontal and $\Delta_j=\lambda(t)-\eta_j\lambda(t-u)$ first order. Since $\hat{\mathbf z}\perp\mathbf r_j^0$, $|\mathbf r_j|=\sqrt{|\mathbf r_j^0|^2+\Delta_j^2}=\tau_j+O(\varepsilon^2)$, and the root condition $|\mathbf r_j|=u$ is solved by $u=\tau_j+O(\varepsilon^2)$. The delays are therefore exactly $1,\sqrt3,2$ at first order, and no root-shift term appears.

**The transmitter-factor variation is second order.** $D_t=1-\mathbf v_j\cdot\hat{\mathbf r}_j$ with $\mathbf v_j$ vertical to first order and $\hat{\mathbf r}_j=\mathbf r_j^0/\tau_j+O(\varepsilon)\hat{\mathbf z}$, so $\mathbf v_j\cdot\hat{\mathbf r}_j=O(\varepsilon^2)$ and $W_j=1+O(\varepsilon^2)$. This is why the coefficients $b_k$ requested by the PI vanish identically for this mode: the perturbation is transverse to every line of action. A mode with in-plane displacement would have nonzero $b_k$; this one does not.

**The projected direction is first order.** $\mathbf e_\alpha\cdot\hat{\mathbf r}_j=\big[\hat{\mathbf z}\cdot\mathbf r_j^0+\Delta_j-\lambda(t)\,\hat{\mathbf x}\cdot\mathbf r_j^0\big]/\tau_j=\big[\lambda(t)\cos\phi_j-\eta_j\lambda(t-\tau_j)\big]/\tau_j$, using $\hat{\mathbf x}\cdot\mathbf r_j^0=1-\cos\phi_j$.

### The characteristic equation

Summing the five hits, $\mathbf e_\alpha\cdot\mathbf B=\sum_j\sigma_j\,\mathbf e_\alpha\cdot\hat{\mathbf r}_j/\tau_j^2$, so to first order

$$
\lambda''(t)=g\Big[a_0\,\lambda(t)+a_1\lambda(t-1)+a_2\lambda(t-\sqrt3)+a_3\lambda(t-2)\Big],
$$

$$
a_0=\sum_j\frac{\sigma_j\cos\phi_j}{\tau_j^3}=-\frac78-\frac{\sqrt3}{9},\qquad
a_1=-\sum_{\tau_j=1}\frac{\sigma_j\eta_j}{1}=-2,\qquad
a_2=-\sum_{\tau_j=\sqrt3}\frac{\sigma_j\eta_j}{3\sqrt3}=-\frac{2}{3\sqrt3},\qquad
a_3=-\frac{\sigma\eta}{8}=-\frac18 ,
$$

since $\sigma_j\eta_j=+1$ for every transmitter (like-polarity partners are lifted with the receiver, unlike-polarity partners are lowered against it, and both act to restore). Substituting $\lambda=\varepsilon e^{\Lambda t}$:

$$
\boxed{\;\Lambda^2=g\Big[a_0+a_1e^{-\Lambda}+a_2e^{-\sqrt3\Lambda}+a_3e^{-2\Lambda}\Big],\qquad b_k\equiv0 .\;}
$$

In words: the receiver's own tilt and lift against the fixed partners give the instantaneous coefficient $a_0$, which coincides with the single-member $z$ coefficient $J_{zz}-B_n=-7/8-\sqrt3/9$ of wave 2 (as it must, the receiver term being the same calculation); each partner's own displacement, read at its delayed emission, gives a delayed restoring term. Checks: at $\Lambda=0$ the bracket is $a_0+a_1+a_2+a_3=-3-\sqrt3/3$, the static slope of item (1); with the delays removed ($e^{-\Lambda\tau}\to1$) the equation is $\Lambda^2=-g(3+\sqrt3/3)$, a pure oscillation at $\hat\omega_{\rm inst}=\sqrt{g(3+\sqrt3/3)}$.

**Small-$g$ asymptotics (derived).** Expanding $e^{-\Lambda\tau}\approx1-\Lambda\tau$ for $|\Lambda|\tau\ll1$ gives $\Lambda^2-g\,\mu\,\Lambda+gC=0$ with $C=3+\sqrt3/3$ and $\mu=-\sum_ka_k\tau_k=2+\tfrac23+\tfrac14=\tfrac{35}{12}$, so

$$
\Lambda\approx\frac{35}{24}\,g\ \pm\ i\sqrt{gC}\qquad(g\to0):
$$

the delays turn the restoring sum into negative damping of strength $\tfrac{35}{24}g$. The mechanism is the usual one for delayed restoring terms: each partner restores toward where the receiver's partners were, not where they are, and that lag feeds energy into the oscillation. The sign is a derived consequence of $\sigma_j\eta_j>0$ for every partner together with positive delays.

Claim grade: derived for every displayed step (the three first-order facts are one-line geometry; the coefficients are five-term sums). Falsifiers: a nonzero $O(\varepsilon)$ change of a delay or of $D_t$ for a vertical perturbation (contradicted by $\hat{\mathbf z}\perp\mathbf r_j^0$); a coefficient differing from the stated sums (each is checkable from the table); a static limit not equal to $-3-\sqrt3/3$.

### Roots of the characteristic equation (measured)

Instrument: [spherical-curvature-claude-symmetry-wave3-instrument.py](../evidence/spherical-curvature-claude-symmetry-wave3-instrument.py) (venv Python, numpy; Newton iteration from a grid of starting points in $\mathrm{Re}\,\Lambda\in[-6,6]$, $\mathrm{Im}\,\Lambda\in[0,60]$, residual below $10^{-12}$, deduplicated, with a once-widened grid check; 1.4 s wall; run 00:41:53 UTC after a first run at 00:41:34 UTC that failed on JSON serialization before writing any target; output [spherical-curvature-claude-symmetry-wave3-results.json](../evidence/spherical-curvature-claude-symmetry-wave3-results.json)). Controls recorded before the target, all passed: known case $g=10^{-4}$, rightmost root $1.4579\times10^{-4}+0.018912\,i$ against the derived asymptote $(35/24)g+i\sqrt{gC}=1.4583\times10^{-4}+0.018914\,i$; known static bracket $a_0+\sum a_k=-3.5773502692$ equal to $-(3+\sqrt3/3)$ and to the wave-2 measured slope $-3.57735$; known no-delay limit at $g=1$ giving exactly $\pm i\sqrt C=\pm1.8914\,i$ with zero real part; negative control omitting the $\tau=1$ term, which changes $h$ at a test point and changes the small-$g$ growth rate to $(11/24)g$ (measured $4.5826\times10^{-5}$ at $g=10^{-4}$ against $4.5833\times10^{-5}$).

Target, the rightmost root at each coupling of the radius sweep ($K=c_f=1$, $R=1/g$); $\hat\omega$ is the dimensionless angular frequency, the physical frequency is $f=(c_f/2\pi R)\hat\omega$, and the growth rate per physical time is $\mathrm{Re}\,\Lambda\cdot c_f/R$:

| $g$ | $R$ | $\mathrm{Re}\,\Lambda$ | $\hat\omega$ | $\hat\omega_{\rm inst}=\sqrt{gC}$ | small-$g$ asymptote $\mathrm{Re}$ | physical growth rate | physical $f$ | e-folding time $T$ | next roots $(\mathrm{Re},\mathrm{Im})$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $4$ | $1/4$ | $+0.8467$ | $1.877$ | $3.783$ | $5.83$ | $3.387$ | $1.195$ | $0.295$ | $(-1.29,6.24)$, $(-1.85,3.50)$ |
| $2$ | $1/2$ | $+0.6866$ | $1.545$ | $2.675$ | $2.92$ | $1.373$ | $0.4917$ | $0.728$ | $(-1.90,6.21)$, $(-2.00,3.31)$ |
| $1$ | $1$ | $+0.5147$ | $1.256$ | $1.891$ | $1.46$ | $0.5147$ | $0.1999$ | $1.943$ | $(-2.22,3.12)$, $(-2.43,6.19)$ |
| $1/2$ | $2$ | $+0.3583$ | $1.004$ | $1.337$ | $0.729$ | $0.1791$ | $0.07987$ | $5.58$ | $(-2.49,2.94)$, $(-2.91,6.16)$ |
| $1/4$ | $4$ | $+0.2314$ | $0.7842$ | $0.9457$ | $0.365$ | $0.05784$ | $0.03120$ | $17.3$ | $(-2.82,2.76)$, $(-3.36,6.11)$ |
| $1/10$ | $10$ | $+0.1162$ | $0.5438$ | $0.5981$ | $0.146$ | $0.01162$ | $0.008655$ | $86.1$ | $(-3.31,2.55)$, $(-3.93,6.04)$ |

No root was found on the imaginary axis at any listed $g$, and a scan of the dominant root over $g\in[10^{-3},10]$ (60 points) finds $\mathrm{Re}\,\Lambda>0$ throughout, decreasing to $1.45\times10^{-3}$ at $g=10^{-3}$ in agreement with $(35/24)g$. All other roots found have negative real parts (the equation has infinitely many; the grid captures those with $|\mathrm{Im}|\le60$, and the widened grid changes neither the count near the axis nor the rightmost root).

Reading. The Family A latitude mode about the stationary hexagon is a growing oscillation at every coupling in the sweep: a lifted positrino triangle and lowered electrino triangle oscillate about the equator at angular frequency $\hat\omega(g)$ with amplitude growing as $e^{\mathrm{Re}\Lambda\,t}$. The delay reduces the frequency below the instantaneous value $\sqrt{gC}$ (by $0.9$ at $g=0.1$, by $0.5$ at $g=4$) and supplies the growth; at small $g$ the growth rate is the derived $\tfrac{35}{24}g$, at larger $g$ it grows more slowly than that. In physical units at $K=1$ the e-folding time is $0.3$ at $R=1/4$ and $86$ at $R=10$: on the large sphere the instability is slow on the scale of the kinematic delay $2R$, on the small sphere it is fast. The physical frequency falls faster than $1/R$ along the fixed-$K$ sweep because $\hat\omega$ itself falls with $g$, which is the dimensionless signature of the fixed-$K$ obstruction of wave 1: at fixed $g$ (similarity) $f\propto1/R$ exactly, at fixed $K$ it does not.

What this establishes and what it does not. Derived: the linearized delay equation for this one mode and its small-$g$ asymptotics. Measured: its characteristic roots. Inferred: the stationary alternating hexagon, the only lawful equilibrium in the atlas, is linearly unstable to the D$_{3d}$-symmetric latitude perturbation under the selected law at every coupling in the sweep, with growth rate $\mathrm{Re}\,\Lambda(g)$ as tabulated; the inference from the characteristic roots of the linearized delay equation to "linearly unstable" is the standard one for linear autonomous delay equations with finitely many delays and is not re-proved here. Not established: anything nonlinear (saturation, a periodic orbit emerging from the growth, collapse, or escape from the family), the behaviour of other tangent modes (coverage's full characteristic matrix), or a physical interpretation. The frequency $\hat\omega(g)$ is a property of a linear mode about an equilibrium, not of any periodic motion of six members. Falsifiers: a root of $h$ with real part larger than the tabulated dominant one (the grid search would have missed it only outside $|\mathrm{Im}|\le120$, $|\mathrm{Re}|\le12$; an argument-principle count is the next check); a sign error in $a_k$ (each coefficient is a five-term sum from the table); an $O(\varepsilon)$ delay or weight variation for the vertical perturbation.

## (3) Antiprism azimuthal-release margins for the theorem (iv) transfer

The wave-2 theorem transfers to a cell when (a) its H1 profile is the standard one (per member along its own great circle, so the preparation path bounds are unchanged), (b) its release values are $\beta'(0^+)=0$ with $\beta''(0^+)>0$, or $\beta'(0^+)>0$, and (c) its partner chords allow the stationary-root and partner-sum bounds under the theorem's thresholds. For the $\pi/6$ antiprism with azimuthal release (every positrino along $+\mathbf e_\phi$, every electrino by inversion, which is a rigid rotation about $z$; order-12 transitive group) at $\beta=1$: (b) holds by wave-2 item (ii), $\beta'=0$, $\beta''=0.8950g^2+0.3316g>0$. (c): the five chords from the receiver are $1.3229$ (two nearest electrinos), $1.5$ (two positrinos), $2$ (antipode). Branch-1 window: member-to-member chord at least $1.3229-0.0528-2t>t+1/4$ for $t<0.34$, so the stationary-source reduction holds there. Branch 2 with $L(t)\le0.11$: member chords at least $1.3229-0.0528-0.22=1.050>0.35$, so partner roots remain stationary-site roots; receiver-to-site chords at least $1.213$, $1.39$, $1.89$; partner sum at most $2/1.213^2+2/1.39^2+1/1.89^2=2.68<3.5$. Every other step of the theorem is cell-independent. Hence the theorem applies with the constant $3.5$ unchanged: no uniformly bounded-acceleration continuation (O1–O3) of the azimuthal antiprism release at $\beta=1$ exists from the release instant. Claim grade: derived (the three margins are the displayed arithmetic). Falsifier: a chord or release value differing from those listed.

## Evidence record and boundaries

Files written in wave 3 (new, untracked; waves 1 and 2 untouched): this report; [spherical-curvature-claude-symmetry-wave3-instrument.py](../evidence/spherical-curvature-claude-symmetry-wave3-instrument.py); [spherical-curvature-claude-symmetry-wave3-results.json](../evidence/spherical-curvature-claude-symmetry-wave3-results.json). The sympy slope computation of item (1) was a one-off foreground command (text in the PI report). No background job, build, EOM run or git write. Boundaries: one symmetric linear mode about a lawful equilibrium; no periodic orbit, no nonlinear statement, no other modes, no physical interpretation, no sea.
