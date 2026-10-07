# Bounded aperiodic heights near the exact flat references

## Result and hypotheses

Claim grade: derived subject, pending independent analytical reconstruction. The [independently accepted anisotropic neighborhood](overnight-b-independent-anisotropic.md) excludes every nonzero periodic alternating height near the exact T02 and T04 references. Its pointwise geometry bounds and strict operator comparison also imply the following stronger statements.

1. Every complete exact history in the same neighborhood that is uniformly bounded there for all real times has identically zero alternating height. The radius and phase profiles need not be periodic.
2. If exactness is required only for $t\ge t_0$, while the complete prescribed history stays in that neighborhood for all real times, then $z(t)$, $z'(t)$ and $z''(t)$ tend to zero as $t\to+\infty$. This is conditional on staying in the neighborhood; it does not prove that an initial preparation stays there.

Use the same canonical $K=c_f=1$ equation, every ordinary positive-delay self and partner root and absolute source divisors. The complete paths are

$$
X_j(t)=\left(r(t)\cos[\Omega t+j\pi/3+p(t)],r(t)\sin[\Omega t+j\pi/3+p(t)],(-1)^jz(t)\right).
$$

Let $(R_0,\Omega_0)$ be either independently admitted exact flat reference, and set $\epsilon=2^{-20}$. The real $C^2$ profiles satisfy, at every real time,

$$
|r-R_0|,\ |r'|,\ |r''|,\ |p'|,\ |p''|,\ |\Omega-\Omega_0|\le\epsilon,
$$

$$
|z|\le h,\qquad |z'|\le4h,\qquad |z''|\le16h,
$$

where $h=1/32$ for T02 and $h=1/128$ for T04. No amplitude bound on $p$ and no period are imposed. The phase differences entering a causal chord obey $|p(t-d)-p(t)|\le\epsilon d$, even when $p$ itself is unbounded.

No stability assertion follows. In particular an unstable exact reference can still have the stated rigidity among complete bounded nearby histories and conditional axial decay among those future histories that remain nearby.

## Inherited bounds do not require periodic geometry

The frozen independent proof encloses the full squared causal gap, its delay derivative, source divisor, root displacement and reception derivative using only the displayed absolute-time bounds. Its recent guards use bounded speed and acceleration. Its remote guard uses bounded positions. Its compact complement and ordinary brackets hold uniformly for every reception. None of those steps requires repeating a period.

Consequently the same finite roots can be labeled globally by source and ordered delay, with $C^1$ delays $d_b(t)$ satisfying

$$
0<d_b(t)<D_*,\qquad |d_b'(t)|\le\eta_b<1,
\qquad D_*=4.
$$

There are eight roots per receiver for T02 and twelve for T04, including one positive-delay self root in each case. Every root retains its actual signed source divisor in

$$
a_b(t)=\frac{1}{d_b(t)^3|D_b(t)|}>0.
$$

The index $b$ labels a causal root, and $\sigma_b=(-1)^{j_b}$ is its source polarity. The frozen proof provides constants

$$
|a_b(t)-a_b^0|\le\varepsilon_b,\qquad
|d_b(t)-d_b^0|\le\Delta_b,
\qquad
a_b(t)\le\bar a_b:=a_b^0+\varepsilon_b.
$$

Here $a_b^0,d_b^0$ are the exact constant reference values, not their rounded printed approximations. Put

$$
E=\sum_b\varepsilon_b,\qquad
B=\sum_b\frac{\bar a_b\Delta_b}{\sqrt{1-\eta_b}},
\qquad W_0=\sum_b\sigma_ba_b^0.
$$

The independently verified Fourier inverse constants are $(C_0,C_1)=(1/4,4/5)$ for T02 and $(1/40,3/10)$ for T04. The same report certifies

$$
q:=2C_0E+C_1B<1,
$$

with upper bounds $0.203077066$ and $0.086153942$, respectively. These numerical bounds are inherited measured premises. They are not rerun or inferred from an agreement with a subject instrument.

## The comparison operator on the real line

Define the constant-delay operator

$$
L_0u=u''-W_0u+\sum_ba_b^0u(t-d_b^0).
$$

Its Fourier multiplier is

$$
H(i\omega)=-\omega^2-W_0+\sum_ba_b^0e^{-i\omega d_b^0}.
$$

The frozen continuous-frequency certificate proves $|H(i\omega)|^{-1}\le C_0$ and $|\omega|\,|H(i\omega)|^{-1}\le C_1$ for all real $\omega$. Those are frequency inequalities, not merely values on the harmonics of one period. Plancherel's identity therefore gives, for every $u\in H^2(\mathbb R)$,

$$
\|u\|_2\le C_0\|L_0u\|_2,\qquad
\|u'\|_2\le C_1\|L_0u\|_2.
$$

All norms here use Lebesgue measure on the whole real line. The statements follow first for smooth compactly supported functions by Fourier transformation and then for $H^2$ functions by approximation. No construction of an evolution semigroup or stability of that evolution is required.

For a fixed actual history, regard its coefficients and delays as fixed functions of reception time. Define the linear comparison remainder acting on any test function $u$ by

$$
Nu=\sum_b(a_b-a_b^0)\,[\sigma_bu(t)-u(t-d_b^0)]
+\sum_ba_b\,[u(t-d_b^0)-u(t-d_b(t))].
$$

The underlying dependence of those coefficients on the actual history is not removed; freezing them only permits the following estimate on test functions.

For $0\le\theta\le1$, the map

$$
T_{b,\theta}(t)=t-d_b^0-\theta[d_b(t)-d_b^0]
$$

has derivative at least $1-\eta_b>0$ and differs from $t$ by a bounded amount. It is therefore a bijection of the real line onto itself. Change of variables gives

$$
\|u'\circ T_{b,\theta}\|_2
\le(1-\eta_b)^{-1/2}\|u'\|_2.
$$

Integrating the fundamental theorem of calculus along the delay segment and applying the integral triangle inequality yields

$$
\|u(t-d_b^0)-u(t-d_b(t))\|_2
\le\frac{\Delta_b}{\sqrt{1-\eta_b}}\|u'\|_2.
$$

Constant translations preserve the $L^2$ norm. Thus

$$
\|Nu\|_2\le2E\|u\|_2+B\|u'\|_2
\le q\|L_0u\|_2
\quad (u\in H^2(\mathbb R)).
$$

The inequality uses every root, including the negative-divisor row through its absolute denominator.

## Exact axial equation and cutoff error

The actual alternating-height equation is

$$
z''=\sum_ba_b(t)[\sigma_bz(t)-z(t-d_b(t))].
$$

Indeed the original signed acceleration row is $\sigma_ba_b[z(t)-\sigma_bz(t-d_b)]$, and $\sigma_b^2=1$. This identity gives $L_0z=Nz$ wherever the actual history is exact.

Write $Q=L_0-N$, so

$$
Qu=u''-\sum_b\sigma_ba_bu(t)+\sum_ba_bu(t-d_b(t)).
$$

For a compactly supported $C^2$ cutoff $\psi$, direct differentiation gives the exact identity

$$
Q(\psi z)=\psi Qz+\mathcal C_\psi,
$$

$$
\mathcal C_\psi=
2\psi'z'+\psi''z+
\sum_ba_b(t)[\psi(t-d_b(t))-\psi(t)]z(t-d_b(t)).
$$

This is the boundary error that periodic integration does not have. Its norm can be controlled uniformly while the central interval becomes arbitrarily long.

Choose a fixed $C^2$ function $\chi$ with values in $[0,1]$, equal to zero on $(-\infty,0]$ and one on $[1,\infty)$. Let $M_1=\|\chi'\|_\infty$ and $M_2=\|\chi''\|_\infty$. For $T>D_*+2$, choose $\psi_T$ equal to one on $[-T,T]$, zero outside $[-T-1,T+1]$, with each edge a translate or reflection of $\chi$.

Derivative terms occur on two intervals of length one. A delayed cutoff difference can be nonzero only within the two edges enlarged forward by $D_*$. Their total length is at most $2(D_*+1)$. Hence, with $v=4h$ and $\bar A=\sum_b\bar a_b$,

$$
\|\mathcal C_{\psi_T}\|_2
\le
2\sqrt2M_1v+\sqrt2M_2h+
h\bar A\sqrt{2(D_*+1)}
=:C_*.
$$

The finite constant $C_*$ is independent of $T$. This estimate requires no decay of $z$ and no periodicity; only its inherited uniform bounds are used.

## Complete bounded exact histories are planar in this height sector

Assume $Qz=0$ for all real times, and set $u_T=\psi_Tz$. This is a compactly supported $H^2$ function. The comparison inequality and cutoff identity give

$$
\|L_0u_T\|_2
\le\|Nu_T\|_2+\|\mathcal C_{\psi_T}\|_2
\le q\|L_0u_T\|_2+C_*.
$$

Therefore

$$
\|u_T\|_2\le\frac{C_0C_*}{1-q},\qquad
\|u_T'\|_2\le\frac{C_1C_*}{1-q}.
$$

Since $\psi_T=1$ on $[-T,T]$, the integrals of $|z|^2$ and $|z'|^2$ on those increasing central intervals are uniformly bounded. Thus $z,z'\in L^2(\mathbb R)$. Each map $t\mapsto t-d_b(t)$ has derivative at least $1-\eta_b$, so the exact equation and bounded coefficients imply $z''\in L^2(\mathbb R)$ as well. Hence $z\in H^2(\mathbb R)$.

The global inverse and comparison inequalities can now be applied to $z$ itself:

$$
\|L_0z\|_2=\|Nz\|_2\le q\|L_0z\|_2.
$$

Since $q<1$, this forces $L_0z=0$ and then $z=0$. Continuity upgrades equality almost everywhere to equality at every real time. There is no nonzero bounded complete alternating-height pulse, recurrent profile or periodic profile within these precise neighborhoods. The conclusion concerns the alternating-height component; it does not assert that the planar radius and phase are exactly those of the reference.

## Conditional future axial decay

Suppose instead that $Qz=0$ only for $t\ge t_0$. Use cutoffs equal to one on $[t_0+1,T]$, vanishing for $t\le t_0$ and $t\ge T+1$, with the same fixed edge shape. Wherever the cutoff is nonzero, exactness holds. The same commutator estimate is uniform in $T$, because its left edge is fixed and its right edge merely moves later.

Consequently $z,z'\in L^2([t_0+1,\infty))$. The inherited bounds on $z'$ and $z''$ make $z$ and $z'$ uniformly continuous. A uniformly continuous square-integrable function on a half-line tends to zero: otherwise a sequence of values bounded away from zero supplies disjoint intervals of a fixed positive width with a divergent squared integral. Therefore

$$
z(t)\longrightarrow0,\qquad z'(t)\longrightarrow0.
$$

Finally, all delays are at most $D_*$ and the coefficients have finite total upper bound $\bar A$. The exact equation gives

$$
|z''(t)|\le\bar A\left(|z(t)|+\sup_{s\in[t-D_*,t]}|z(s)|\right)\longrightarrow0.
$$

This establishes conditional axial decay, with no rate. It does not show that any given initial history remains in the neighborhood, nor that its planar motion converges. It permits future-decaying heights supplied by an earlier nonexact history; those do not contradict the complete-exact-history result.

## Verification and remaining boundary

This is an analytical extension of frozen, independently checked numerical premises. No new numerical instrument, eigenvalue calculation or fit is introduced. The main new obligations are the real-line multiplier estimate, variable-delay change of variables, uniform cutoff commutator and the passage from boundedness to square integrability. Each has been displayed explicitly for separate review.

The frozen independent anisotropic report owns the exact reference authentication, root bounds, coefficient deviations, delay derivatives, continuous-frequency constants and contraction margins. Its original periodic conclusion remains unchanged. The present subject does not claim new numerical evidence or an independent implementation of its shared interval arithmetic.

An invalid inherited reference or bound, failure of the complete aperiodic chart extension, a wrong comparison sign, a nonbijective delay interpolation, a cutoff error growing with $T$, or a nonzero complete exact height satisfying all displayed bounds would falsify the affected conclusion. A future exact history that leaves the neighborhood does not test the conditional decay statement. The [receiving account](overnight2-b-followup-and-research-2026-10-07.md) owns integration and independent-review status.
