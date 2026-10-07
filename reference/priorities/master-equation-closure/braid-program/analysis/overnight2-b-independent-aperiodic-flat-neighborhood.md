# Independent aperiodic flat-neighborhood review

## Disposition and precise hypotheses

**Accepted as a derived analytical extension, conditional on the frozen exact-reference and interval premises.** The whole-real-line conclusion is $z\equiv0$ for an exact complete history satisfying the stated uniform absolute-time neighborhood bounds. The future-only conclusion is $z,z',z''\to0$ as $t\to+\infty$, provided the complete prescribed history remains in that same neighborhood and the canonical equation holds on the unbounded future. Neither conclusion assumes that $z$ is initially square-integrable, and neither requires periodic radius, phase correction or height. No mathematical repair is required.

The paths are

$$
X_j(t)=\left(r(t)\cos[\Omega t+j\pi/3+p(t)],r(t)\sin[\Omega t+j\pi/3+p(t)],(-1)^jz(t)\right).
$$

Here $r,p,z$ are real $C^2$ functions on $\mathbb R$, $\Omega$ is constant, and either admitted T02 or T04 reference $(R_0,\Omega_0)$ is selected. With $\epsilon=2^{-20}$, the assumptions at every real time are

$$
|r-R_0|,|r'|,|r''|,|p'|,|p''|,|\Omega-\Omega_0|\le\epsilon,
\qquad |z|\le h,\quad |z'|\le4h,\quad |z''|\le16h,
$$

where $h=1/32$ for T02 and $h=1/128$ for T04. There is no bound on the amplitude of $p$. These are absolute-time bounds around the admitted physical radius and angular rate; no rescaling of time or reinterpretation as normalized profile derivatives is made. The canonical law remains $K=c_f=1$, with every ordinary positive-delay self and partner root and the absolute source divisor. No external physical-law premise is used.

The Ramon E. Moore role is an analytical lens rather than acceptance authority. This report independently reconstructs the extension of the [frozen anisotropic review](overnight-b-independent-anisotropic.md), without rerunning or upgrading its numerical evidence. The parent owns integration into [the receiving account](overnight2-b-followup-and-research-2026-10-07.md).

## Why the admitted chart survives removal of periodicity

The frozen anisotropic instrument and report were inspected in full. Their gap, derivative, reception derivative, near-delay and remote bounds are pointwise bounds for an arbitrary complete history. For example,

$$
|p(t-d)-p(t)|\le\epsilon d,
\qquad
|[(\Omega-\Omega_0)d]+p(t)-p(t-d)|\le2\epsilon d.
$$

This uses the derivative bound and no period or phase amplitude bound. In the reception frame the planar position error is bounded by $q_p=2\epsilon+2R_0\epsilon d$. The vertical squared separation belongs to $[0,4h^2]$, and its source dot-product magnitude is at most $2h(4h)$. The bounds on planar velocity errors and the reception-derivative numerator likewise use only the displayed suprema. The latter numerator is $Q\cdot(V_r-V_s)$; the flat value is zero, so its error bound gives the reported $|d_b'|\le\eta_b<1$ independently of repetition in time.

The recent self guard uses lower tangential speed and upper acceleration, the partner guard uses simultaneous separation and upper source speed, and the remote guard uses bounded positions. Unbounded $p(t)$ does not destroy bounded positions: it changes an angle, while $r$ and $z$ remain bounded. The compact protected brackets and root-free complements therefore apply uniformly at every reception of an aperiodic history. Each fixed source bracket contains precisely one ordinary root. The implicit-function theorem gives its $C^1$ reception dependence, and bracket identity gives a consistent global label. No periodic relabeling, root wrapping, or assumption about an exact dynamical solution is needed to obtain this geometric chart.

Thus the frozen bounds give eight roots per receiver for T02 and twelve for T04, one self root in each case, with

$$
0<d_b(t)<D_*=4,\qquad |d_b'(t)|\le\eta_b<1,
\qquad |d_b(t)-d_b^0|\le\Delta_b,
$$

$$
a_b(t)=\frac1{d_b(t)^3|D_b(t)|}>0,
\qquad |a_b(t)-a_b^0|\le\varepsilon_b,
\qquad a_b(t)\le\bar a_b=a_b^0+\varepsilon_b.
$$

All roots, including negative signed divisors, remain present in these positive coefficient magnitudes. The exact reference coefficients and delays are the authenticated values enclosed by the frozen proof, not rounded displayed decimal approximations. The present review inherits its measured bounds

$$
E=\sum_b\varepsilon_b,\qquad
B=\sum_b\frac{\bar a_b\Delta_b}{\sqrt{1-\eta_b}},\qquad
q=2C_0E+C_1B<1.
$$

For T02, $(C_0,C_1)=(1/4,4/5)$ and $q<0.203077066$; for T04, $(C_0,C_1)=(1/40,3/10)$ and $q<0.086153942$. The earlier certificate covers continuous real frequency intervals and their infinite tails, rather than only harmonics of any period. These inherited numerical premises are sufficient for the following new analytical argument.

## Whole-line estimate with the actual coefficients frozen

Set $\sigma_b=(-1)^{j_b}$, $W_0=\sum_b\sigma_ba_b^0$, and

$$
L_0u=u''-W_0u+\sum_ba_b^0u(t-d_b^0).
$$

For the Fourier transform convention whose derivative multiplier is $i\omega$, this operator has multiplier

$$
H(i\omega)=-\omega^2-W_0+\sum_ba_b^0e^{-i\omega d_b^0}.
$$

The inherited inequalities $1/|H(i\omega)|\le C_0$ and $|\omega|/|H(i\omega)|\le C_1$ hold at every real frequency. Pointwise multiplication and Plancherel therefore give, for every $u\in H^2(\mathbb R)$,

$$
\|u\|_2\le C_0\|L_0u\|_2,
\qquad
\|u'\|_2\le C_1\|L_0u\|_2.
$$

One may first prove this for smooth compactly supported functions and pass by $H^2$ density, since differentiation and fixed translations are continuous into $L^2$. An inverse evolution, causal resolvent, stable semigroup or spectral stability assertion is unnecessary. The estimates are coercive inequalities on whole-line test functions.

Fix one admissible actual history once and for all. Its functions $a_b(t),d_b(t)$ are now fixed when acting on a test function $u$. Define

$$
Nu=\sum_b(a_b-a_b^0)[\sigma_bu(t)-u(t-d_b^0)]
+\sum_ba_b[u(t-d_b^0)-u(t-d_b(t))].
$$

This does not assert that the original state-dependent operator is linear in its history. In particular, cutting off $z$ does not trigger a new root calculation or new coefficients. All test-function estimates below use the coefficients of the original actual history.

For $0\le\theta\le1$, define

$$
T_{b,\theta}(t)=t-d_b^0-\theta(d_b(t)-d_b^0).
$$

Its derivative obeys $T_{b,\theta}'=1-\theta d_b'\ge1-\eta_b>0$. Its displacement from the identity is bounded, so it tends to $\pm\infty$ with $t$. Consequently it is a globally bijective $C^1$ change of variable with inverse Jacobian at most $(1-\eta_b)^{-1}$. In particular,

$$
\|u'\circ T_{b,\theta}\|_2\le(1-\eta_b)^{-1/2}\|u'\|_2.
$$

The fundamental theorem of calculus gives

$$
u(t-d_b^0)-u(t-d_b(t))
=(d_b(t)-d_b^0)\int_0^1u'(T_{b,\theta}(t))\,d\theta.
$$

Taking the $L^2$ norm and using the integral triangle inequality proves the stated delay-shift bound, with factor $\Delta_b/\sqrt{1-\eta_b}$. Constant translations have norm one on $L^2$, while multiplication by $a_b-a_b^0$ has norm at most $\varepsilon_b$. Hence

$$
\|Nu\|_2\le2E\|u\|_2+B\|u'\|_2
\le q\|L_0u\|_2.
$$

The argument extends from smooth functions by Sobolev approximation and the bounded composition estimate. It requires no derivative of $a_b$ and no second derivative of $d_b$.

## Axial sign and the uniformly supported cutoff error

The receiver-zero axial row is

$$
\frac{\sigma_b[z(t)-\sigma_bz(t-d_b(t))]}{d_b(t)^3|D_b(t)|}
=a_b(t)[\sigma_bz(t)-z(t-d_b(t))].
$$

Therefore exactness implies $L_0z=Nz$. Writing $Q=L_0-N$, direct cancellation gives

$$
Qu=u''-\sum_b\sigma_ba_bu(t)+\sum_ba_bu(t-d_b(t)).
$$

For a scalar $C^2$ compactly supported cutoff $\psi$, the exact product identity is

$$
Q(\psi z)=\psi Qz+\mathcal C_\psi,
$$

$$
\mathcal C_\psi=2\psi'z'+\psi''z+
\sum_ba_b(t)[\psi(t-d_b(t))-\psi(t)]z(t-d_b(t)).
$$

This calculation differentiates only the local product; it does not differentiate the delayed product in the acceleration sum. The delayed coefficient is evaluated at reception time throughout, as required by the canonical equation.

Choose a fixed $C^2$ transition $\chi$ from zero to one on $[0,1]$, constant outside that interval, with $0\le\chi\le1$. Such a function is obtained, for example, from $10s^3-15s^4+6s^5$ on $[0,1]$. Let $M_1=\|\chi'\|_\infty$ and $M_2=\|\chi''\|_\infty$. For $T>D_*+2$, choose $\psi_T=1$ on $[-T,T]$ and zero outside $[-T-1,T+1]$, with these fixed transitions on its edges.

The derivatives have support of total measure two. A delayed cutoff difference can be nonzero only if the interval $[t-d_b(t),t]$ meets an edge. Thus its support lies in

$$
[-T-1,-T+D_*]\ \cup\ [T,T+1+D_*],
$$

whose total measure is at most $2(D_*+1)$. This is a bound on reception-time support itself and does not presume that the variable-delay map preserves measure. Moreover $|\psi_T(t-d_b)-\psi_T(t)|\le1$. With $v=4h$ and $\bar A=\sum_b\bar a_b$, the integral triangle inequality yields

$$
\|\mathcal C_{\psi_T}\|_2
\le2\sqrt2M_1v+\sqrt2M_2h+h\bar A\sqrt{2(D_*+1)}=:C_*.
$$

The constant is finite and independent of $T$. Uniform boundedness, rather than prior decay or square integrability, supplies this estimate. All source channels share the same bounded support union, so summing their magnitudes introduces only $\bar A$, not a factor growing with the central interval length.

## First obtaining integrability, then applying contraction

If exactness holds on all of $\mathbb R$, set $u_T=\psi_Tz$. This compactly supported $C^2$ function belongs to $H^2$. Since $Qz=0$, the preceding estimates give

$$
(1-q)\|L_0u_T\|_2\le C_*,
\qquad
\|u_T\|_2\le\frac{C_0C_*}{1-q},
\qquad
\|u_T'\|_2\le\frac{C_1C_*}{1-q}.
$$

On $[-T,T]$, $u_T=z$ and $u_T'=z'$. The central integrals of $|z|^2$ and $|z'|^2$ are thus bounded uniformly as $T\to\infty$. Monotone convergence of these central integrals proves $z,z'\in L^2(\mathbb R)$; no monotonicity of the cutoff family itself is required.

The map $t\mapsto t-d_b(t)$ is the preceding change of variable at $\theta=1$. Accordingly,

$$
\|z(t-d_b(t))\|_2\le(1-\eta_b)^{-1/2}\|z\|_2.
$$

The finite axial sum with bounded coefficients now implies $z''\in L^2$. Since $z$ is $C^2$, its classical derivatives are its distributional derivatives, and $z\in H^2(\mathbb R)$. Only at this point is the global contraction applied to $z$ itself:

$$
\|L_0z\|_2=\|Nz\|_2\le q\|L_0z\|_2.
$$

Strict $q<1$ forces $L_0z=0$, then the inverse inequality forces $z=0$ almost everywhere. Continuity yields $z\equiv0$ pointwise. The proof is not circular: the cutoff argument establishes membership in the functional space before its zero-kernel conclusion is used for the complete profile.

The result excludes nonzero bounded complete axial pulses and recurrent or periodic heights within this precise neighborhood. It leaves the planar radius and phase unconstrained beyond the original hypotheses and exact equation; it does not identify them with the reference.

## Future-only exactness and conditional decay

Assume instead that $Qz=0$ for $t\ge t_0$, retaining all neighborhood bounds for the complete real-line history. Choose a cutoff zero on $(-\infty,t_0]$, one on $[t_0+1,T]$, and zero on $[T+1,\infty)$, with the same transitions and $T$ sufficiently large. Then $\psi Qz=0$ everywhere: where exactness is unavailable the cutoff vanishes. The delayed boundary terms outside the support are already included in $\mathcal C_\psi$; they cannot be silently discarded, and the displayed commutator accounts for them.

The two reception-time boundary regions still have uniformly bounded lengths, now with a fixed left region and a moving right region. The same estimate gives $z,z'\in L^2([t_0+1,\infty))$. The bound on $z'$ makes $z$ uniformly Lipschitz, and the bound on $z''$ makes $z'$ uniformly Lipschitz. Each is therefore uniformly continuous. A uniformly continuous square-integrable function on a half-line tends to zero: otherwise values of absolute magnitude at least some fixed $\delta>0$ occur arbitrarily far out, uniform continuity supplies fixed-width neighborhoods where the magnitude is at least $\delta/2$, and an infinite disjoint subsequence of those neighborhoods contradicts integrability. Consequently $z,z'\to0$.

For late times the finite exact axial sum and bounded delays imply

$$
|z''(t)|\le\bar A\left(|z(t)|+\sup_{s\in[t-D_*,t]}|z(s)|\right)\longrightarrow0.
$$

This last step requires neither uniform continuity of $z''$ nor a third derivative. The established pointwise limit of $z$ controls its entire late bounded-delay window. No convergence rate follows from the argument.

Retention in the neighborhood is an assumption, not a consequence. No initial history is proved to remain nearby, no existence or uniqueness of a future evolution is established, and no planar convergence or stability verdict follows. Future-decaying histories supported by an earlier nonexact preparation are compatible with the stronger rigidity statement for histories exact on the whole line.

## Provenance, validation, falsifiers and preservation

Native `shasum -a 256` verifies these frozen identities in this review:

| Read-only input | SHA-256 |
| --- | --- |
| [Aperiodic subject](overnight2-b-aperiodic-flat-neighborhood.md) | `7ce03846c34c29c0d765c0596bce15d3076355b81e8532c08c2d2c8af2eb6f1f` |
| [Independent anisotropic premise](overnight-b-independent-anisotropic.md) | `d9d27f1b3dc776fc90c55172a0194b17885e54ed720ecb218a40f60950be350a` |
| [Its frozen numerical instrument](overnight-b-independent-anisotropic.py) | `a07a1c4ded3ba0d8304f433b5768b93ef6cc2a25db98c6290a4d83f7a3447253` |

The original numerical admissions, exact-reference authentication, continuous-frequency certificates, local receipts and shared-mpmath arithmetic boundary remain owned by the frozen anisotropic report. This review reads their mathematical contract and instrument, but does not independently rerun those premises. Its new contribution is an analytical proof of the aperiodic extension under those premises. No new numerical instrument, target, resource lease, timing claim or numerical receipt is needed or created; the parent's numerical slot remains untouched.

Falsifiers are explicit: an invalid inherited exact-reference admission or interval bound defeats its corresponding application; a root omitted by the purported complete chart defeats the coefficient sum; loss of $\eta_b<1$ defeats the stated composition estimate; an imaginary-axis zero or failed multiplier bound defeats the coercive inequalities; incorrect axial polarity or recomputation of coefficients after cutoff defeats the operator identity; boundary-error support growing with $T$ defeats the integrability step. A nonzero whole-line exact height satisfying every displayed bound would contradict the proved rigidity. A future-exact height satisfying all complete-history bounds but failing axial decay would contradict the half-line argument. A history that leaves the neighborhood does not test that conditional conclusion.

Only this new report was written. The subject, all frozen reports, numerical sources and receipts, parent account, corpus and shared owners remain untouched by this review. Scoped `git diff --no-index --check /dev/null` validation is applied only to this new Markdown file; no regular test, generator, Git mutation, publication, numerical computation, recursive delegation or sidebar action is part of the review. There is no analytical blocker under the stated inherited premises. The bounded review stops here; the parent owns integration and the ongoing research allocation.
