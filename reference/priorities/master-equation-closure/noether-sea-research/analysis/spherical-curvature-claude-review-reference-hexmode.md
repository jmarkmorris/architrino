# Spherical curvature investigation: review reference for the symmetric latitude mode of the stationary alternating hexagon (linearized delayed equation), frozen before reading symmetry wave 3

Role: review (`ramon-e-moore` lens). Owner: the review role only. Derived from the canonical per-hit law and the selected surface law alone, before reading `spherical-curvature-claude-symmetry-wave3.md` or its evidence. Units $R=c_f=1$, coupling $K=g$. Instrument: [spherical-curvature-claude-review-hexmode.py](../evidence/spherical-curvature-claude-review-hexmode.py), output [spherical-curvature-claude-review-hexmode-output.json](../evidence/spherical-curvature-claude-review-hexmode-output.json). Correction 1 read at 2026-10-11 00:03 UTC.

## Mode and first-order geometry

Sites at azimuths $\phi_k=k\pi/3$, polarity $\sigma$-sign $s_k=(-1)^k$ ($k$ even positrino). The symmetric latitude mode moves every positrino to latitude $+\lambda(T)$ and every electrino to $-\lambda(T)$ with azimuths fixed; it is invariant under the hexagon's rotation-with-swap and vertical reflections, so by uniqueness it is a consistent one-degree-of-freedom reduction while the continuation is unique. Receiver: the positrino at $\mathbf x=(\cos\lambda,0,\sin\lambda)$, pole-ward tangent $\mathbf e_\alpha=(-\sin\lambda,0,\cos\lambda)$. Source $k$ at its emission time $T-\tau_k$: $\mathbf s_k=(\cos\lambda_k\cos\phi_k,\cos\lambda_k\sin\phi_k,s_k\sin\lambda_k)$ with $\lambda_k=\lambda(T-\tau_k)$.

Exact projection: $(\mathbf x-\mathbf s_k)\cdot\mathbf e_\alpha=\sin\lambda\cos\lambda_k\cos\phi_k-s_k\sin\lambda_k\cos\lambda$, whose first-order part is $\lambda\cos\phi_k-s_k\lambda_k$. Chord: $r_k^2=2-2\cos\lambda\cos\lambda_k\cos\phi_k-2s_k\sin\lambda\sin\lambda_k=2-2\cos\phi_k+O(\lambda^2)$, so chords, and hence the delays $\tau_k=r_k$, are unchanged at first order: $\tau=1,1,\sqrt3,\sqrt3,2$. Transmitter factor: the source velocity is $O(\lambda')$ and purely along $\hat{\mathbf z}$ at zeroth order while $\hat{\mathbf r}_k$ has no $z$ component at zeroth order, so $\mathbf V_k\cdot\hat{\mathbf r}_k=O(\lambda\lambda')$ and $W_k=1+O(\lambda^2)$: no first-order transmitter-factor variation and no first-order velocity coupling. No self root (speed small). Claim grade: derived. Falsifier: a first-order term in $r_k$ or in $W_k$, which the displayed expansions exclude.

## Linearized equation

With the surface law $\ddot{\mathbf X}=P\mathbf A-|\mathbf v|^2\mathbf n$ and motion along the meridian, $\lambda''=\mathbf e_\alpha\cdot\mathbf A=g\sum_{k=1}^5\sigma_k(\mathbf x-\mathbf s_k)\cdot\mathbf e_\alpha/r_k^3$ with $\sigma_k=(-1)^k$ (like for even $k$). Using $\sigma_ks_k=+1$:

$$
\lambda''(t)=g\Big[a_0\lambda(t)+a_1\lambda(t-1)+a_2\lambda(t-\sqrt3)+a_3\lambda(t-2)\Big],\qquad a_0=\sum_k\frac{\sigma_k\cos\phi_k}{r_k^3},\quad a_{1,2,3}=-\sum_{k:\tau_k=1,\sqrt3,2}\frac1{r_k^3}.
$$

Values: $k=1,5$ ($\cos\phi=\tfrac12$, $r=1$, $\sigma=-1$): $-\tfrac12$ each; $k=2,4$ ($\cos\phi=-\tfrac12$, $r^3=3\sqrt3$, $\sigma=+1$): $-\tfrac1{6\sqrt3}$ each; $k=3$ ($\cos\phi=-1$, $r^3=8$, $\sigma=-1$): $+\tfrac18$. Hence

$$
a_0=-\frac78-\frac{\sqrt3}9=-1.067450,\qquad a_1=-2,\qquad a_2=-\frac{2}{3\sqrt3}=-0.384900,\qquad a_3=-\frac18 .
$$

Static slope (all $\lambda_k=\lambda$): $a_0+a_1+a_2+a_3=-3-\tfrac{\sqrt3}3=-3.577350$, which is the Family A slope $f'(0)=dF/d\alpha|_{\pi/2}$ of adjudication-2 B.5 (independent route: differentiating the closed form $F(\alpha)$ of reference 4.4), and $a_0=J_{zz}-B_n$ of adjudication-2 B.3. Characteristic equation for $\lambda=e^{\Lambda t}$: $\Lambda^2=g\,[a_0+a_1e^{-\Lambda}+a_2e^{-\sqrt3\Lambda}+a_3e^{-2\Lambda}]$. No-delay limit: $\Lambda^2=-g(3+1/\sqrt3)$, purely imaginary roots $\pm i\sqrt{g(3+1/\sqrt3)}$ (neutral oscillation at the static-slope frequency, $1.891385\sqrt g$). Small-$g$ asymptote: expanding $e^{-\Lambda\tau}\approx1-\Lambda\tau$ with $\sum a_k\tau_k=-2-\tfrac23-\tfrac14=-\tfrac{35}{12}$ gives $\Lambda^2\approx gS+\tfrac{35}{12}g\Lambda$, so $\Lambda=\tfrac{35}{24}g\pm i\sqrt{g(3+1/\sqrt3)}+O(g^{3/2})$ in the imaginary part and $O(g^2)$ in the real part: the delayed restoring terms lag and act as negative damping at leading order. Claim grade: derived. Falsifier: a coefficient differing from the displayed five-source sums; a no-delay root with nonzero real part.

## Instrument controls and targets

Controls (order in `_order`, before targets): K1 the no-delay limit returns a purely imaginary root $1.891388i$ at $g=1$ and $S=-3-1/\sqrt3$ exactly; K2 at $g=10^{-3}$ the Newton root $0.00145420+0.0597388i$ matches the asymptote $0.00145833+0.0598110i$ within $O(g^2)$ (real) and $O(g^{3/2})$ (imaginary); a first run at 00:47:23 UTC failed this control through an over-tight tolerance of the instrument ($50g^2$ on the modulus), corrected to the right orders and rerun at 00:47:43 UTC; N1 flipping the sign of $a_1$ moves the root ($0.5147+1.2558i\to0.3171+0i$). Targets (Newton sweep from a $13\times25$ grid in $\mathrm{Re}\,\Lambda\in[-3,3]$, $\mathrm{Im}\,\Lambda\in[0,12]$, residual below $10^{-18}$): root with the largest real part found $g=0.1$: $0.116177+0.543816i$; $g=1$: $0.514706+1.255779i$; $g=4$: $0.846736+1.877180i$; the next roots found have real parts $-3.31$, $-2.22$, $-1.29$ respectively. Sweep $g\in\{10^{-3},3\times10^{-3},10^{-2},0.03,0.1,0.3,1,3,10\}$: largest real part found positive at every value ($0.001454$ to $0.955895$), tracking the asymptote $\tfrac{35}{24}g$ for $g\le0.01$ and falling below it beyond. Scope of the instrument: a Newton sweep in a box is not a complete root count; roots outside the box with large imaginary part have real parts tending to $-\infty$ for this retarded equation, so dominance is inferred, not certified by an argument-principle count. Claim grade: measured (roots and residuals), inferred (dominance and positivity between sweep values). Falsifier: a root of the characteristic equation with real part above the listed one at the same $g$, or a sign change of the largest real part between sweep values.

## What this reference does and does not establish

It establishes the linearized delayed equation of one symmetric mode about a lawful equilibrium (the stationary hexagon, reference 4.4), so a linear stability statement for this mode is lawful. It does not establish nonlinear motion, other modes (azimuthal, mixed, asymmetric), a complete spectrum, or any physical meaning of the growth; the linearization is about the equilibrium with its identically stationary history, and a real perturbation must be supplied as a complete history.

Frozen: 2026-10-11 00:48:39 UTC. sha256 over all bytes preceding this line (`head -n 34 <file> | shasum -a 256`): 491f02d0f7443bbe267f590b033d31bc876f87c4709a4ac531268b926df31f5e. Instrument sha256 06fa9fbfb4d6084ed4acceb597aa8b3f1f4c1e7ca8ede6dd65086c09029be603, output sha256 fcc17dd6babf22a32641744734008f0a008f9c757801d8b3fa882e0668f47c32. Frozen before reading symmetry wave 3 or its evidence.
