# Independent assessment of the fixed-memory zero-speed coefficient

## Verdict and fixed domain

**Derived verdict: the exact radius, radial-speed, total-speed and remaining-angle equivalents are valid for every admitted zero-terminal-speed member of the fixed uniform-memory preparation.** The factor $2/3$ follows from the exact acceleration convolution and its finite iteration, including the supplied acceleration history. No load-bearing gap was found. The conclusion retains the existential smallness and preparation scope of the memory global and selection theorems.

The [reviewed source](alternatives-screen-2026-10-05-memory-zero-speed-asymptotics.md) was measured by `shasum -a 256` as `951b93e827d25bfef8d861647412de11ec2bd18682b715ab8b8c56cb8e3d8b6d`. This review began only after the [radial zero-speed assessment](alternatives-screen-2026-10-05-radial-zero-speed-asymptotics-adjudication.md) was frozen. That radial result is not used as a premise. The law-specific memory inversion and the subsequent physical coefficients are reconstructed below. The analytical role supplies a review lens, not theory or acceptance authority.

The exact selected equation is

$$
q''(T)=F(T)-\int_0^1[q'(T)-q'(T-\vartheta)]\,d\vartheta,
\qquad K=c_f=\lambda=\tau=1.
$$

Here $q(T)$ is one member of the opposite-polarity mirror planar pair, $-q(T)$ is its partner, and $F$ is the full ordinary-root canonical acceleration, with its original transmitter factor and self/partner convention. The integration variable $\vartheta$ is a physical time delay in the fixed unit memory interval. It is distinct from the polar angle $\theta(T)$. The old circle and compatibility patch remain supplied history; they need not solve this equation before release.

## Inherited physical hypotheses

The [memory global theorem](alternatives-screen-2026-10-05-memory-global-dispersal.md) and its [independent reconstruction](../../analysis/alternatives-screen-2026-10-05-memory-adjudication.md) establish the relevant properties for every sufficiently small fixed launch parameter in the [complete compatible preparation](alternatives-screen-2026-10-05-memory-formulation.md). They retain the memory equation in their estimates and do not transfer a radial-law torque theorem to a nonradial response. For a member selecting the zero-speed endpoint, those properties are

$$
r(T):=|q(T)|\asymp T^{2/3},\qquad q'(T)\to0,
\qquad r'(T)>0\text{ eventually},\qquad \theta(T)\to\theta_\infty.
$$

Their scaled areal rate $h=Y\times Y_s$ tends to a finite positive limit. Since $q=r_0Y$, $s=\epsilon T/r_0$ and $r_0=(6\epsilon^2)^{-1}$, the physical areal rate is

$$
H(T):=q(T)\times q'(T)=\epsilon r_0h(s)
\longrightarrow H_\infty=\epsilon r_0h_\infty\in(0,\infty).
$$

This conversion is required for the angular coefficient. No physical angular-momentum conservation is implied by the finite limit. The global proof gives one common speed bound $b<1$ on the entire supplied and generated history, separation at all finite physical times, one ordinary partner root and no positive-delay self root. The [terminal-selection assessment](alternatives-screen-2026-10-05-terminal-speed-adjudication.md) separately establishes zero-speed parameters accumulating at zero for this same memory family. It supplies neither a located parameter nor a numerical admission threshold.

The asymptotic argument below uses these memory-specific inherited hypotheses, together with the exact memory equation. It does not independently re-prove the global transition or the terminal-selection theorem.

## Canonical input on the actual late source interval

Let $S(T)$ be the unique partner source time, $R=T-S=|q(T)+q(S)|$ its delay and range, $N=(q(T)+q(S))/R$ its direction, and $n=q/r$ the current radial unit vector. The complete speed bound gives both range estimates

$$
\frac{2r(T)}{1+b}\le R\le\frac{2r(T)}{1-b}.
$$

For the upper estimate use $R\le2r+|q(S)-q(T)|\le2r+bR$; for the lower use $2r\le R+|q(S)-q(T)|\le(1+b)R$. These estimates concern the complete root, including any old source interval still sampled.

Since $q'\to0$, integration gives $r(T)/T\to0$. Hence $R/T\to0$, $S/T\to1$ and $S\to\infty$. The speed supremum on $[S(T),T]$ therefore tends to zero. If that supremum is $m(T)$, then

$$
\frac{|q(S)-q(T)|}{r(T)}
\le\frac{m(T)R}{r(T)}\le\frac{2m(T)}{1-b}\to0.
$$

It follows that $R/(2r)\to1$, $N-n\to0$, and $D=1+N\cdot q'(S)\to1$. The inherited angle limit gives $n\to n_\infty$, so the physical canonical input has the exact leading form

$$
F(T)=-\frac{N}{R^2D}=-f(T)[n_\infty+o(1)],
\qquad f(T)=\frac{1}{4r(T)^2}.
$$

The inherited two-sided radius comparison implies $cT^{-4/3}\le f(T)\le CT^{-4/3}$ at sufficiently late times, with positive constants for this fixed member. These bounds do not yet assert the desired exact coefficient, and therefore introduce no circularity.

For a fixed $L>0$, the radius difference over $[T-L,T]$ is at most $L$ times its velocity supremum. The latter tends to zero, while $r(T)\to\infty$. Thus $r(T-s)/r(T)\to1$ uniformly for $s\in[0,L]$, and likewise $f(T-s)/f(T)\to1$. The already established limit of $F/f$ is uniform on a moving interval whose left endpoint tends to infinity. Combining them gives

$$
\frac{F(T-s)}{f(T)}\longrightarrow-n_\infty
\quad\text{uniformly for }0\le s\le L.
$$

Only fixed shifts are used here. A uniform approximation over all shifts up to $T/2$ is not assumed; the longer interval is controlled separately by polynomial bounds below.

## Exact memory identity and bounded acceleration

Put $A(T)=q''(T)$. Compatibility and the supplied local $C^{2,1}$ regularity permit the fundamental theorem of calculus on every unit interval, including intervals crossing release. Interchanging the integrals over $0\le s\le\vartheta\le1$ yields

$$
\int_0^1[q'(T)-q'(T-\vartheta)]\,d\vartheta
=\int_0^1\int_0^\vartheta A(T-s)\,ds\,d\vartheta
=\int_0^1(1-s)A(T-s)\,ds.
$$

Define $k(s)=1-s$ on $[0,1]$ and zero otherwise, with $(k*A)(T)=\int_0^1k(s)A(T-s)\,ds$. Then the exact generated-time equation is $A+k*A=F$. The kernel is nonnegative and its integral is $1/2$. Constant velocity makes the original memory term zero; constant acceleration makes it one-half the acceleration in this positive integral convention. These direct algebraic controls verify the sign and mass before the late-response calculation. They are not substituted for the actual evolving history.

There is one finite global bound for $F$: the global continuation is separated, radius tends to infinity, and continuity gives a positive radius minimum on the remaining compact initial interval. The lower range bound above and $D\ge1-b$ therefore bound $|F|$ uniformly. Acceleration is bounded on the compact supplied interval $[-1,0]$. For any finite $T>0$, write

$$
M_T=\sup_{-1\le t\le T}|A(t)|,\quad
M_-=\sup_{-1\le t\le0}|A(t)|,\quad
B_T=\sup_{0\le t\le T}|F(t)|.
$$

If $M_T>M_-$, continuity supplies an attained generated-time maximum, where $|A|\le B_T+M_T/2$. Thus

$$
M_T\le\max(M_-,2B_T).
$$

Taking the global forcing bound gives a finite constant $M$ bounding $A$ for every supplied time in $[-1,0]$ and all generated times. The argument retains old acceleration in the initial unit window; no homogeneous response has been set to zero by declaration.

## Finite convolution iteration and the response factor

For large physical $T$, choose the integer $N_T=\lfloor T/2\rfloor$. Substitution of $A=F-k*A$ into itself exactly $N_T$ times gives

$$
A(T)=\sum_{j=0}^{N_T-1}(-1)^j(k^{*j}*F)(T)
+(-1)^{N_T}(k^{*N_T}*A)(T).
$$

Here $k^{*0}$ is the unit point mass at zero. Convolution preserves positivity, adds supports, and multiplies total integrals, so $k^{*j}$ is supported in $[0,j]$ and has mass $2^{-j}$. Every substitution uses an equation evaluated at a time at least $T-N_T\ge T/2>0$. The identity does not extend the generated-time equation into the supplied past. The last acceleration term retains the exact earlier solution and bounds all remaining memory dependence.

The last term divided by $f(T)$ has norm at most $M2^{-N_T}/f(T)\le CMT^{4/3}2^{-N_T}$, which tends to zero. For each fixed $j$, the fixed-shift limit already proved gives

$$
\frac{(k^{*j}*F)(T)}{f(T)}\longrightarrow-2^{-j}n_\infty.
$$

To control the growing number of terms, observe that every convolution argument for $j<N_T$ lies in $[T/2,T]$. On that interval the polynomial bounds give $f(t)/f(T)\le(C/c)2^{4/3}$, and $|F(t)|\le C_1f(t)$ for all sufficiently late $t$. Consequently

$$
\left|\frac{(k^{*j}*F)(T)}{f(T)}\right|\le C_2 2^{-j},
\qquad 0\le j<N_T,
$$

with $C_2$ independent of $T$ and $j$. For any fixed cutoff $J$, first take the limit of the first $J$ terms. The sum of all subsequent terms is uniformly bounded by $C_2\sum_{j\ge J}2^{-j}$, and the remainder already tends to zero. Taking $J\to\infty$ therefore proves

$$
\frac{A(T)}{f(T)}\longrightarrow
-n_\infty\sum_{j=0}^\infty(-1/2)^j
=-\frac23n_\infty.
$$

This proves the factor by a finite identity and a controlled limit. It requires neither a differentiated remainder, a jerk estimate, an infinite-history inverse imposed at release, nor an assumption that memory is instantaneously proportional to present acceleration. The $2/3$ is specific to the selected kernel and admitted slow tail.

## Physical radius, speed and angle

The exact polar identity is $r''=H^2/r^3+n\cdot A$. Since $n\to n_\infty$, $H\to H_\infty$ and $r\to\infty$, the preceding vector limit yields

$$
r''=-\frac{1}{6r^2}[1+o(1)].
$$

The geometric transverse term $H^2/r^3$ is lower order than $r^{-2}$. With inherited eventual $u=r'>0$ and $u\to0$, radius is an invertible late time coordinate and $d(u^2)/dr=2r''$. Sandwiching $-r''$ between $(1\pm\eta)/(6r^2)$ on a whole late tail and integrating to infinity gives

$$
u^2\sim\frac{1}{3r}.
$$

Therefore $(r^{3/2})'=(3/2)\sqrt r\,u\to\sqrt3/2$. Integration and substitution back into the speed relation prove

$$
r(T)\sim C_MT^{2/3},\qquad
u(T)\sim\frac23C_MT^{-1/3},\qquad
C_M=\left(\frac34\right)^{1/3}.
$$

The transverse speed $H/r=O(r^{-1})$ is smaller than $u\asymp r^{-1/2}$, so $|q'|\sim u$. The member-radius coefficient is $C_M$; the separation coefficient is $2C_M$.

Finally the exact identity $\theta'=H/r^2$ gives $\theta'\sim H_\infty C_M^{-2}T^{-4/3}$. Its positive tail is integrable, and the same two-sided tail argument gives

$$
\theta_\infty-\theta(T)\sim\frac{3H_\infty}{C_M^2}T^{-1/3}.
$$

The angular coefficient retains the history-dependent physical $H_\infty$. Both integrations apply to the actual memory-law solution; their shared kinematic form with other scenarios transfers no law or existence claim.

## Falsifiers, limitations and validation record

The result would fail if the memory global theorem did not supply the stated complete speed margin, radius comparison or areal-rate limit; if the source window failed to move into the zero-speed tail; if the acceleration convolution omitted supplied data or had a different sign or mass; if $A$ were unbounded despite the exact maximum inequality; or if the polynomial forcing bounds failed to dominate the growing convolution sum. Each possible failure is identified by an explicit inequality above. No such defect was found.

No numerical launch threshold, located zero-speed parameter, positive-speed member, uniqueness or discreteness of the zero set, convergence rate uniform in launch parameter, alternative memory kernel, nonmirror stability, binding or boundary continuation is established. The exact response factor is a conclusion for this fixed law and admitted zero-speed tail, not a universal constitutive postulate.

Dependency identities were measured by `shasum -a 256` on their exact paths during this review:

| Dependency | SHA-256 |
| --- | --- |
| Memory preparation | `e77ae06dccda7f06f0f11302d0d50dd270be5192b88f989d3e3cfa3424103d3a` |
| Memory global theorem | `b8066d75120561fe0ded282d6ccc34a9f525d7e526dd1073696b0f13d2936a71` |
| Memory trilogy assessment | `a21180e917b6eb7034abbcc951067997f60085a7e6a86c3293e4b6b13f90ee16` |
| Terminal-selection assessment | `747a6a263ce9f8f07478cb4b593ea4d6f8099d8227bd1fbc6b274a2daabd2797` |

Validation is analytical: full-source range bounds, the physical areal-rate conversion, exact acceleration convolution, its constant-input algebraic controls, the global maximum estimate, finite iteration with support and mass accounting, the dominated geometric sum, and the radial/angular tail integrations. No new executable instrument, numerical target, Python process or background computation was used. Only this new assessment was authored for the third subject. The reviewed source, antecedents and shared integration owners were preserved. Whitespace validation and final source identities are checked after creation; integration remains with the coordinating investigation.
