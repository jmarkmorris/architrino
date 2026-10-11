# Spherical curvature investigation: review moving-source reference (uniform rigid rotation on the sphere), frozen before reading any rotating or H2 subject

Role: review (`ramon-e-moore` lens). Owner: the review role only. This instantiates recipe 3.4 of the [frozen review reference](spherical-curvature-claude-review-reference.md) for a uniformly rotating on-sphere source, in the review role's own derivation, before reading the rotating-hexagon, G3 rigid-rotation or Deliverable 5 sections of the symmetry subject, any H2 or rotating cell of the coverage subject, or any wave-2 file. Instrument: [spherical-curvature-claude-review-moving.py](../evidence/spherical-curvature-claude-review-moving.py), output [spherical-curvature-claude-review-moving-output.json](../evidence/spherical-curvature-claude-review-moving-output.json). Units $R=c_f=K=1$; $\beta=v/c_f$. Correction 1 read at 2026-10-11 00:03 UTC.

## Root equation for a rigidly rotating equatorial pair

Receiver $i$ and source $j$ on the equator in rigid rotation about $\hat{\mathbf z}$ at angular rate $\Omega=\beta$ (speed $\beta$): $\theta_i(T)=\beta T+\phi_i$, $\theta_j(T)=\beta T+\phi_j$. The lag $\Delta=\theta_i(T)-\theta_j(T-\tau)=\phi_{ij}+\beta\tau$ with $\phi_{ij}=\phi_i-\phi_j$ taken in $(0,2\pi)$. Chord $=2\sin(\Delta/2)$ for $\Delta\in(0,2\pi)$. The causal constraint $\tau=\text{chord}$ becomes the scalar lag equation

$$
\Delta-\phi_{ij}=2\beta\sin(\Delta/2),\qquad \tau=\frac{\Delta-\phi_{ij}}{\beta}=2\sin\frac{\Delta}2 .
$$

For $0\le\beta\le1$ the function $g(\Delta)=\Delta-\phi_{ij}-2\beta\sin(\Delta/2)$ has $g'=1-\beta\cos(\Delta/2)\ge0$, strictly positive except at $\Delta=0$ when $\beta=1$, with $g(\phi_{ij})<0$ and $g(\phi_{ij}+2\beta)\ge0$: exactly one root in $(\phi_{ij},\phi_{ij}+2\beta]$, which is the sphere certificate (adjudication-1 A.2) in closed scalar form. Self root: none for $\beta\le1$ (on-sphere path, speed at most $c_f$). Claim grade: derived. Falsifier: a second root of $g$ on $(\phi_{ij},\phi_{ij}+2\beta]$ at some $\beta\le1$.

## Transmitter factor, weight and per-hit components

With $\hat{\boldsymbol\phi}_j=(-\sin\theta_j,\cos\theta_j,0)$ the source velocity is $\beta\hat{\boldsymbol\phi}_j$, and $(\mathbf X_i-\mathbf X_j)\cdot\hat{\boldsymbol\phi}_j=\sin\Delta$, so $\mathbf V_j\cdot\hat{\mathbf r}=\beta\sin\Delta/(2\sin(\Delta/2))=\beta\cos(\Delta/2)$ and

$$
D_t=1-\beta\cos\frac{\Delta}2,\qquad W=\frac1{|1-\beta\cos(\Delta/2)|},\qquad \hat{\mathbf r}\cdot\hat{\boldsymbol\phi}_i=\cos\frac{\Delta}2,\qquad \hat{\mathbf r}\cdot\mathbf n_i=\sin\frac{\Delta}2,\qquad \hat{\mathbf r}\cdot\hat{\mathbf z}=0 .
$$

This is the equality case of the sphere bound $D_t\ge1-\beta\sqrt{1-\tau^2/4}$, because for equatorial rigid rotation the source velocity is exactly along the tangent projection of the chord. Per hit: azimuthal (along-velocity) component $\sigma W\cos(\Delta/2)/(4\sin^2(\Delta/2))$, radial $\sigma W/(4\sin(\Delta/2))$, polar $0$. Claim grade: derived. Falsifier: a Cartesian evaluation of $D_t$ or of the components differing from these at a solved lag (control K2 below is one).

## The alternating hexagon in rigid rotation: azimuthal condition

Receiver at azimuth $0$ (positrino), sources at $k\pi/3$ with $\sigma_k=(-1)^k$, so $\phi_{ij}=(6-k)\pi/3$. By the six-fold rotation-with-polarity-swap symmetry every member sees the same sums; by the reflection $z\to-z$ the polar component vanishes. Hence a rigid rotation at constant speed $\beta$ solves the selected law exactly if and only if the azimuthal sum vanishes,

$$
B_\phi(\beta)=\sum_{k=1}^{5}\sigma_k\,\frac{W_k\cos(\Delta_k/2)}{4\sin^2(\Delta_k/2)}=0,
$$

the normal part being supplied by the curvature term and the radial sum $B_r(\beta)$ being discarded. $B_\phi(0)=0$ (stationary hexagon). Claim grade: derived. Falsifier: a nonzero polar component or a member-dependent sum at the same $\beta$.

## Instrument controls (run before targets, order in `_order`) and results

K1 known case: $\beta=0$ reproduces the stationary hexagon, $B_\phi=1.1\times10^{-16}$, $B_r=-5/4+\sqrt3/3$ exactly, delays $\{1,1,\sqrt3,\sqrt3,2\}$. K2 known case: $\beta=1/2$, antipodal source ($\phi_{ij}=\pi$): the lag root gives $\tau=1.8007344451794944$ and $D_t=1.2175654295183547$, and a direct Cartesian evaluation of the rotating pair returns the same chord and $D_t$ to $10^{-12}$. N1 negative control: $\beta=1.5$ refused (no uniqueness certificate). Controls completed 2026-10-11 00:33:11 UTC before the targets.

Targets (measured by this instrument, domain: equatorial rigid rotation, $\beta\le1$):

| $\beta$ | $B_\phi$ | $B_r$ (discarded) | $\min D_t$ | $\max D_t$ | delays $k=1..5$ |
| --- | --- | --- | --- | --- | --- |
| $1/4$ | $+0.398552$ | $-0.669496$ | $0.8058$ | $1.2281$ | $0.8180,1.5131,1.9414,1.9201,1.2591$ |
| $1/2$ | $+0.807163$ | $-0.642717$ | $0.6979$ | $1.4694$ | $0.6885,1.3160,1.8007,1.9994,1.5936$ |
| $3/4$ | $+1.178427$ | $-0.568486$ | $0.7498$ | $1.7162$ | $0.5932,1.1534,1.6355,1.9561,1.8854$ |
| $1$ | $+1.459312$ | $-0.495229$ | $0.9517$ | $1.9655$ | $0.5206,1.0219,1.4782,1.8435,1.9977$ |

A $1000$-point scan of $B_\phi$ on $(0,1]$ finds no sign change; $B_\phi(\beta)/\beta\to1.583333$ as $\beta\to0$ (measured at $\beta=10^{-3}$; equal to $19/12$ to seven digits, exactness not proved). Consequence: no uniformly rotating alternating hexagon at constant speed is an exact solution of the selected law for any $\beta\in(0,1]$ (derived from the sign of $B_\phi$ on the grid together with its continuity in $\beta$, which follows from the unique smooth lag root; a sign change between grid points would require $B_\phi$ to dip below zero between samples spaced $10^{-3}$ apart while its measured values exceed $0.15$ for $\beta\ge0.1$ and its slope near $0$ is positive; grade: measured on the grid, inferred between grid points). Positive $B_\phi$ means a prescribed rigid rotation has a residual that would raise the speed, consistent in sign with the stationary-source second-order law of the hexagon ($d^2|\mathbf v|/dT^2=29/8-5\sqrt3/18>0$ at release). Claim grade: measured (instrument, domain as stated); the no-solution conclusion is inferred between grid points. Falsifier: a $\beta\in(0,1]$ at which an exact evaluation of the five lag roots gives $B_\phi(\beta)\le0$.

Scope: this reference covers only the equatorial rigid-rotation family and sub-wake-or-equal speeds; latitude rings, rigid rotation of the six poles about the diagonal, and super-wake rotation are not covered and would need their own lag equations (for a latitude ring the chord is $2\sin\alpha\,\sin(\Delta/2)$ in the polar-angle notation of reference 4.4 and the velocity is not along the chord's tangent projection, so $D_t$ needs the full dot product).

Frozen: 2026-10-11 00:35:01 UTC. sha256 over all bytes preceding this line (`head -n       51 <file> | shasum -a 256`): 96b87609f8a17b3f091e40bf7f7caeb126303a0b552e010ebc210f105723d357. Instrument sha256 01dab55eeaa4dfdf3aad93408758d0c1e68777778bed4c2d762a4fea1860632f, output sha256 690495604bec76d47926b510daf30fccc3d7a763bc025febc8aa700b5120ab6d. Frozen before reading any rotating or H2 subject section or any wave-2 file.
