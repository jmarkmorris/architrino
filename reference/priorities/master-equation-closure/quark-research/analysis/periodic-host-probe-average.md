# Periodic host fields at a stationary probe

## Scope

This calculation concerns a fixed virtual probe receiving from a prescribed, finite periodic host under the unchanged Master Equation. It establishes an exact cycle-average identity on a uniform subfield chart and derives a conditional fast-oscillation comparison. Neither calculation establishes accessory residence, mutual retention or a quark. All numerical preparations use $c_f=1$.

Grade: derived identities and formal perturbation equations, self-reviewed without independent adjudication. Host existence, a controlled slow-probe averaging theorem and application to quark seats remain unresolved. The [binary row estimate](../../binary-research/analysis/slow-binary-first-order-drift.md#a-local-row-estimate-with-an-acceleration-scale) supplies a separate local approximation and its acceleration-dependent remainder.

## Exact average from arrival times

Let a source path $X_s(S)$ be smooth, bounded and periodic with period $P$, and have speed at most $\nu c_f$ for a fixed $\nu<1$ throughout its complete past. Fix a probe position $x$ in an open region separated from every source path by positive clearance. Write

$$
r_s(S)=|x-X_s(S)|,\qquad n_s(S)=\frac{x-X_s(S)}{r_s(S)},\qquad
F_s(S)=S+\frac{r_s(S)}{c_f}.
$$

The reception time is $T=F_s(S)$. Since

$$
F_s'(S)=1-\frac{n_s(S)\cdot V_s(S)}{c_f}\ge1-\nu>0,
\qquad F_s(S+P)=F_s(S)+P,
$$

each reception has one ordinary positive-delay root. The [canonical transmitter weight](../../../../../content/markdown/aaa/dynamics/master-equation.md) is precisely $1/F_s'(S)$. For signed coupling $\sigma_sK_s$, with $K_s>0$ and $\sigma_s$ the source–probe polarity product, the row is

$$
A_s(x,T)=\frac{\sigma_sK_s n_s(S)}{r_s(S)^2F_s'(S)}.
$$

Changing variables over one reception cycle cancels the weight:

$$
\overline A_s(x)=\frac1P\int_{T_0}^{T_0+P}A_s(x,T)\,dT
=\frac{\sigma_sK_s}{P}\int_{S_0}^{S_0+P}
\frac{x-X_s(S)}{|x-X_s(S)|^3}\,dS.
$$

For a host with a common period, sum the rows. Define the acceleration potential, with units $L^2T^{-2}$ rather than an energy,

$$
\overline\Phi(x)=\sum_s\frac{\sigma_sK_s}{P}
\int_0^P\frac{dS}{|x-X_s(S)|}.
$$

Then $\overline A=-\nabla\overline\Phi$, $\Delta\overline\Phi=0$ away from the paths, and both $\nabla\cdot\overline A$ and $\nabla\times\overline A$ vanish. Positive clearance justifies differentiation under the cycle integral. The harmonic maximum principle excludes a strict local minimum of this potential. At a putative nondegenerate restoring point, the symmetric acceleration Jacobian has zero trace and cannot have all negative eigenvalues. A constant region supplies neutral directions, not strict restoring confinement.

This is exact on the stated periodic stationary-probe chart; it needs neither a slow-speed expansion nor a host equation-residual claim. The time-dependent field need not vanish or be curl-free. Moving probes, host backreaction, contacts, incomplete pasts, environmental rows and superfield multiple-root charts require separate treatment. Harmonicity of the average does not exclude dynamic trapping by the oscillating response.

## The supplied first-order identity

For a source's present position, put $d=x-X_s(T)$, $r=|d|$, $n=d/r$ and $u=V_s(T)/c_f$. The local comparison row is

$$
A_s^{(1)}=\frac{\sigma_sK_s}{r^2}
[n+u-2(n\cdot u)n].
$$

The velocity correction has the scalar representation

$$
\frac{u-2(n\cdot u)n}{r^2}
=\nabla_x\frac{u\cdot d}{r^2}
=-\frac1{c_f}\nabla_x\partial_T\log(r/r_*),
$$

where $r_*>0$ is a fixed length used only to make the logarithm dimensionless. Therefore

$$
\nabla\times A_s^{(1)}=0,\qquad
\nabla\cdot A_s^{(1)}
=-\frac{2\sigma_sK_s(n\cdot u)}{r^3}
=-\frac{\sigma_sK_s}{c_f}\partial_T(r^{-2}).
$$

Periodicity cancels the whole velocity correction at a stationary probe, not just its divergence. This agrees with the exact arrival-time calculation.

Small source speed alone does not justify an $O(v^2/c_f^2)$ row error. The binary estimate includes $\eta=A_*r/c_f^2$ as well as $\epsilon^2$, with $\epsilon$ a speed bound. To call that error second order requires $\eta=O(\epsilon^2)$ across the delay. Differentiating an amplitude remainder does not automatically bound its spatial derivatives. The exact average above avoids those approximation burdens within its narrower root chart.

## Conditional slow-probe response to fast oscillations

The following is a mathematical perturbation of the acceleration equation, not an imported electromagnetic trapping law. Write a smooth periodic prescribed field as

$$
A(x,T)=\overline A(x)+\sum_{m\ge1}
[a_m(x)\cos(m\omega T)+b_m(x)\sin(m\omega T)],
\qquad \omega=2\pi/P.
$$

Assume a separation between host and slow-probe time scales, small oscillatory displacement compared with the field's variation length, controlled Fourier sums, and no causal-root or contact boundary in the comparison region. Freeze a slow position $Y$ for one cycle. The zero-mean leading oscillatory displacement is

$$
\xi(Y,T)=-\sum_{m\ge1}
\frac{a_m(Y)\cos(m\omega T)+b_m(Y)\sin(m\omega T)}
{(m\omega)^2}.
$$

Expanding $A(Y+\xi,T)$ gives the formal mean correction

$$
A_{\rm corr}(Y)=-\frac12\sum_{m\ge1}
\frac{(a_m\cdot\nabla)a_m+(b_m\cdot\nabla)b_m}{(m\omega)^2}.
$$

If every Fourier coefficient is curl-free, as in the first-order field, this becomes $A_{\rm corr}=-\nabla Q$, where

$$
Q(Y)=\sum_{m\ge1}\frac{|a_m(Y)|^2+|b_m(Y)|^2}{4(m\omega)^2}.
$$

For a single harmonic this equals $\langle|\widetilde A|^2\rangle/(2\omega^2)$. A general periodic host requires the harmonic-dependent denominators. The exact instantaneous delayed field has not been shown curl-free here, so its intensity alone cannot replace the vector correction.

Reversing a nonbackreacting probe's polarity reverses every prescribed coefficient and the mean field. The quadratic correction is unchanged. This makes that correction polarity even; it does not make actual accessory seats polarity independent, because the mean term, mutual interactions and changed histories still matter.

A zero of all oscillatory coefficients minimizes $Q$, but may have flat directions. Nonzero local minima are also possible. A seat would need the combined mean equation and restoring behavior in all relevant directions; a node by itself is insufficient. Small displacement requires approximately $A_{\rm osc}/(\omega^2L)\ll1$, with $L$ the variation length. A self-bound host can have this ratio of order one. No error-controlled averaging theorem or trapping prediction is asserted for that regime.

## A valid symmetry control, and its limits

Take a prescribed regular six-ring with alternating polarities,

$$
X_k(S)=(R\cos(\omega S+k\pi/3),R\sin(\omega S+k\pi/3),0),
\qquad q_k=(-1)^k.
$$

At $x=(0,0,z)$, every source has the same range $\sqrt{R^2+z^2}$ and emission time. Also $n_k\cdot V_k=0$. The signed transverse vector sum and signed axial sum both vanish, so the exact probe acceleration is zero at every reception time. This supplies an analytical axis control for this ring, not for an arbitrary host or the polarity-decorated F6c geometry. Its entire axis is a line of zeros, which does not establish a discrete three-dimensional seat.

For a future separately authored evaluator, first check one stationary source: $\overline A=\sigma K n/r^2$ and $\widetilde A=0$. Then check the alternating-ring axis identity with $R=1$, $|\omega|=0.1$, $c_f=1$. Only after these controls should a declared host be evaluated on a clearance-valid spatial domain. Record both the mean and temporal Fourier coefficients; use $Q$ only on the curl-free controlled comparison and retain the vector correction otherwise. No evaluator was run here.

Falsifiers: a complete periodic subfield root ledger giving a cycle integral different from the static-source average overturns the exact identity; a sign error in the displayed gradients overturns the first-order calculation; a nonzero axis response with the stated alternating labels overturns that control. These checks concern prescribed fields. Capture additionally requires evolved receiver histories and, ultimately, full mutual response.
