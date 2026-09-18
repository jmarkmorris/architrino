# Independent assessment after the complete-population restart

## Scope and frozen inputs

**Accepted: actual complete-population continuation and strictly rising common target height through $33/8$. The next vertical maximum has not been reached.** The [preceding assessment](smooth-two-particle-population-restart-independent-adjudication.md) supplied the accepted result through $15/4$. The new finite extension retains the complete supplied past, $g=16$, $c_f=1$, alternating cubic lattice, original comparison class and fixed eight-source stationary block sum. The accumulated rise at the new endpoint exceeds 4752 times the preceding completed fall; this does not complete the upward excursion or imply that a later maximum exists.

The complete population archive through $13/4$ and its accepted residual and state bounds are frozen inputs. The source cut available there is sufficient for a prospective target extension: with receiver radius $B=1/64$ and complete source radius $b_s=1/2000$,

$$
33/8-1+B+b_s=3.141125<13/4.
$$

Thus the new extension queries actual already-certified source histories; no extrapolated future is required. The complete-population continuation bound, target residual and signed-velocity enclosure are separate obligations, all discharged below. The following stationary-field derivation was written before reading any new contributor or parent stationary-field subject.

## 1. Independent cubic stationary-field expansion

Let $K(x)=x/|x|^3$ and let $S_0(y)$ denote the accepted fixed-block stationary sum at an even anchor, including the receiver polarity and omitting its own source. Its value, first derivative and second derivative at zero vanish in the accepted equilibrium calculation. Its individual-source third derivative series is absolutely convergent. Consequently all subsequent differentiations and symmetry arguments can be made in that absolutely convergent series and then integrated using those fixed initial values. This preserves the declared eight-source prescription; it does not presume arbitrary partition invariance of a conditionally convergent field.

Inversion symmetry makes $S_0$ odd, and cubic coordinate symmetries constrain its cubic term. Since every individual kernel has zero divergence away from its source, the homogeneous cubic has the form

$$
S_{0,i}(y)=a\left[y_i^3-\frac32y_i\sum_{j\ne i}y_j^2\right]+R_i(y),
\qquad i=1,2,3.
\tag{1}
$$

Differentiating one kernel, or differentiating the fourth-degree term of its inverse-distance generating function, gives the absolutely convergent scalar coefficient

$$
a=-\frac12\sum_{k\in\mathbb Z^3\setminus\{0\}}
(-1)^{k_1+k_2+k_3}
\frac{35k_1^4-30k_1^2|k|^2+3|k|^4}{|k|^9}.
\tag{2}
$$

The sign convention is fixed by a known reference: the two negative-polarity sources on the first coordinate axis contribute $+8y_1^3$ to the first component. All six nearest neighbors together contribute $a=14$.

For the cubic vector $T$ in brackets in (1), $|T(y)|\le|y|^3$. To verify this without a directional sample, put $q_i=y_i^2/|y|^2$, $e_2=\sum_{i<j}q_iq_j$ and $e_3=q_1q_2q_3$. Then

$$
\frac{|T(y)|^2}{|y|^6}=1-\frac{15}{4}e_2+\frac{75}{4}e_3\le1,
$$

because $e_2\ge9e_3$ in the simplex, including its boundary.

### 1.1. A rigorous coefficient tail

Let $a_N$ be (2) summed over $|k|_\infty\le N$. The numerator divided by $8|k|^4$ is the fourth Legendre polynomial evaluated at $k_1/|k|$, whose absolute value is at most one. Hence an individual coefficient is at most $4|k|^{-5}$. The cubic shell $|k|_\infty=m$ has $24m^2+2\le26m^2$ points. Therefore

$$
|a-a_N|\le104\sum_{m=N+1}^{\infty}m^{-3}\le\frac{52}{N^2}.
\tag{3}
$$

The finite sum can be grouped exactly by integer $|k|^2$ before outward-enclosing its one square root per group. This is an independently authored coefficient instrument, separate from any field evaluator under review.

### 1.2. Fifth-order field remainder

The inverse-distance generating series is $|k-y|^{-1}=\sum_{l\ge0}|y|^lP_l(\widehat k\cdot\widehat y)/|k|^{l+1}$ for $|y|<|k|$. The elementary bounds $|P_l|\le1$ and $|P_l'|\le l(l+1)/2$ give

$$
\left|\nabla\bigl(|y|^lP_l(\widehat k\cdot\widehat y)\bigr)\right|
\le\frac{l(l+3)}2|y|^{l-1}.
$$

For example, the derivative bound follows by expanding $P_l'$ as the sum of lower Legendre polynomials of opposite parity with coefficients $2j+1$, whose sum is $l(l+1)/2$. Oddness cancels the even-degree field terms. The terms after the cubic field begin at potential degree six. For $|y|\le B<1$ this yields the explicit uniform remainder

$$
|R(y)|\le C_5(B)|y|^5,\qquad
C_5(B)=\frac{65}{2}\sum_{j\ge0}\frac{(6+2j)(9+2j)}2B^{2j}.
\tag{4}
$$

Here $\sum_{k\ne0}|k|^{-7}\le26\sum_{m\ge1}m^{-5}\le65/2$. The geometric-power sum in (4) has a rational closed form for rational $B$. Equations (1)–(4) retain the exact stationary field with an explicit remainder; using the cubic term with this bound changes no equation.

The independently authored integer-shell and rational-root instrument `stationary.py` passed the exact six-neighbor coefficient $14$, rational square-root brackets, the zero-radius geometric remainder and exact cubic-vector norm controls before its target. With $N=64$ it encloses all 2,146,688 finite nonzero lattice points and gives

$$
a\in[14.301634301781185,14.327024926809749],\qquad
C_5(1/64)<877.849248.
$$

Consequently $|S_0(y)|<14.541344|y|^3<15|y|^3$ on $|y|\le1/64$. This improves the accepted norm enclosure without changing the field or extrapolating any history.

### 1.3. A derivative enclosure

For the solid polynomial $h_l(y)=|y|^lP_l(\widehat k\cdot\widehat y)$, write $u=\widehat y$, $z=\widehat k\cdot u$ and

$$
\nabla h_l=|y|^{l-1}\big[(lP_l-zP_l')u+P_l'\widehat k\big].
$$

Differentiating this formula, using $|Du|\le1/|y|$, $|Dz|\le1/|y|$, and $|P_l''|\le(l-1)l(l+1)(l+2)/8$, gives

$$
\|D^2h_l(y)\|\le H_l|y|^{l-2},\quad
H_l=l^2+(3l-2)\frac{l(l+1)}2+\frac{(l-1)l(l+1)(l+2)}4.
$$

The second Legendre derivative bound follows by applying the same positive-coefficient derivative expansion twice. Thus $\|DR(y)\|\le C_D(B)|y|^4$, where

$$
C_D(B)=\frac{65}{2}\sum_{j\ge0}(792+891j+365j^2+64j^3+4j^4)B^{2j}.
$$

The cubic derivative is $DT=(15/2)\operatorname{diag}(y_i^2)-(3/2)|y|^2I-3yy^\top$. Its symmetric Rayleigh quotients lie between $-(9/2)|y|^2$ and $6|y|^2$, so $\|DT\|\le6|y|^2$. The same known-controlled instrument evaluates the rational geometric-power sums and establishes the convenient bound

$$
\|DS_0(y)\|<93|y|^2\qquad(|y|\le1/64).
$$

This derivative enclosure can reduce the receiver error-growth constant; it does not assume linear stability or replace the nonlinear stationary contribution.

The same formulas hold for larger radii below one. A separate exact-rational radius evaluator, preserving the frozen coefficient reference, gives

| Radius | Cubic norm coefficient | Quadratic derivative coefficient |
|---|---:|---:|
| $1/64$ | $<14.541344$ | $<92.250431$ |
| $1/32$ | $<15.185325$ | $<111.164593$ |
| $1/20$ | $<16.529746$ | $<150.744315$ |
| $1/16$ | $<17.776706$ | $<187.567369$ |

The known zero-radius coefficient case precedes these arithmetic runs. These estimates may be used if a larger auxiliary population ball is required, provided the original history-class, root and uniqueness conditions are rechecked rather than inferred from the earlier smaller ball.

## 2. Independent candidate-horizon census

Under the provisional population radius $1/64$, the exact first-excitation rule gives $m_i\le30$ at $H=33/8$, because $H+11/8=11/2$. The independent known-controlled census counts 834 environmental labels and both targets, for 836 affected identities. It also counts 1464 old pulse channels and 28112 generated channels. The possible and definite generated sets agree with the two signs of the receiver displacement margin at this candidate horizon. The received futures all belong to the accepted 506 histories through $13/4$.

Each target has 97 generated source identities, with multiplicities $6,12,8,6,24,24,4,9,4$ at squared anchor ranges $1,2,3,4,5,6,8,9,10$. This census is conditional on closing the proposed population radius; it does not itself establish a continuation. Cross-root uniqueness and absence of positive self roots follow from the same positive speed margin once a subunit speed bound has been closed.

The successful continuation below uses the larger auxiliary radius $1/20$, still inside the original environmental radius $1/16$. The affected identities are unchanged, because a first-excitation receiver is still at its anchor. Directed receptions into receivers already moving do require a new margin census. The separate `large_census.py`, after known controls, gives 1368 certainly admitted and 1464 possible old channels, and 27008 certainly admitted and 29936 possible generated channels. The undecided difference remains part of the full equations. Both bounds concern admission by the endpoint, not existence or multiplicity of the complete-history cross root. Each target still has the same unambiguous 97 generated identities. There are at most 304 generated shell positions at any receiver, plus the two old pulse corrections.

## 3. Independent source-resolved continuation

Restart the estimate at $c=13/4$, where the entire actual affected population has position below $p_0=1/2000$ and speed below $v_0=1/1000$. The complete incoming history has the same position and speed ceilings through $c$, and acceleration below $1/100$. Other labels have zero restart state. Retaining the entire supplied and evolved past makes this an estimate restarted at $c$, not an initial-value replacement of a history-dependent law.

For each of the 506 incoming identities, the new `continuation.py` independently constructs Bernstein norm bounds from the accepted nodal archive at every cut $n/32$ through $13/4$. It adds the accepted independent solution-error profile at that cut; before $73/32$ it conservatively uses the common error bound at $73/32$. A bound at the right endpoint supplies a constant upper envelope on the preceding source-time interval. Thus the source envelopes $b_j(s)$ retain which environmental labels actually have the largest displacement. Their uniform maxima are below

$$
P_s=0.000418435,
\qquad V_s=0.000983849,
\qquad A_s=0.004632235.
$$

The full source archive is authenticated against SHA-256 `c9dcef9578f2cc3a745dc9c258b20317d327e40c642b2aec1fcf48a371def8fb`. The independent piecewise-constant primitive and quadratic-polynomial controls pass before the real data are used. An initially incorrect expected constant in the primitive control was corrected from $1/256$ to its exact integral $5/1024$ before any target run.

Use the bootstrap

$$
B=1/20,\quad V=1/8,\quad A=1/2,\quad
Y(c+u)=1/2000+u/20,\quad0\le u\le7/8.
$$

For a source-receiver anchor distance with rational brackets $d\le r\le\bar d$, set $S^+(t)=t-d+B+b_s$, $S^-=c-\bar d-B-b_s$, $b_s=1/2000$, and use the already independently derived vector-row coefficients $J,D$. If $B_{1,j},B_{2,j}$ are the first and second primitives of $b_j$, a generated row contributes at most

$$
\begin{aligned}
P_j={}&gJ[B_{2,j}(S^+(H))-B_{2,j}(S^+(c))-(H-c)B_{1,j}(S^-)]\\
&+gD[B_{1,j}(S^+(H))-B_{1,j}(S^+(c))+(H-c)b_j(S^+(c))],\\
V_j={}&gJ[B_{1,j}(S^+(H))-B_{1,j}(S^-)]+gD[b_j(S^+(H))+b_j(S^+(c))].
\end{aligned}
$$

Both endpoint terms and the lower emission primitive are retained. The instrument bounds these quantities for each source and distance shell, then sums the appropriate source identities for each of the 836 receivers. Self channels are absent. Every shell through squared range 17 is retained; more distant future sources are sampled before zero. This is stronger than selecting only the certainly active channels from the coarse census.

With the independently validated stationary bound $|S_0(y)|<50|y|^3$ on this larger ball, the resulting strict margins are:

| Quantity | Independent enclosure |
|---|---:|
| Largest generated displacement integral | $<0.025714239$ |
| Largest generated velocity integral | $<0.077826124$ |
| Largest generated point acceleration | $<0.147374854$ |
| Position-slope margin | $>0.016494418$ |
| Speed margin | $>0.030822222$ |
| Acceleration margin below $1/2$ | $>0.252377800$ |
| Radius margin at $H$ | $0.00575$ |

The old pulse integrals use their late range floor four; the stationary integrals use the exact cubic polynomial $Y(c+u)^3$. Monotonicity of the source envelopes makes the displacement integral divided by elapsed time nondecreasing, so its endpoint comparison controls every possible earlier first exit. The point-acceleration comparison uses the individual source speed envelopes as well as displacement envelopes.

All required source times are below $H-1+B+b_s=3.1755<c$, so this closes an actual continuation with previously certified sources. The auxiliary radius has changed; the supplied history, equation, coupling, stationary block sum and original class have not. Complete cross ranges exceed $9/10$ and complete speeds remain below $1/8$, giving one positive cross root, no positive self root, and transmitter floor $7/8$. Original root-tube and complement margins persist. At most 306 changed rows and the inherited per-row derivative bound six give jerk below $(306\cdot6+1)g=29392$, within the original 65536 ceiling. The stationary derivative term is below one before multiplying by $g$, using the independent larger-radius derivative estimate. The received source acceleration remains below $3/8$, including the supplied pulse; the receiver's new acceleration ceiling does not enter that row derivative estimate.

Uniqueness in the enlarged comparison ball follows directly by causal steps of length less than $9/10$. Two candidate continuations with the same complete past and the stated radius and subunit-speed bound first satisfy the same fixed-past receiver equations, then the same already-agreed source histories on each successive step. Local receiver uniqueness propagates their agreement. This avoids presuming that a competitor in the larger ball automatically satisfies an earlier smaller-ball hypothesis.

## 4. Independent target error and polynomial compatibility

The new target archive is frozen with SHA-256 `42a16db9065950150c2365d4c767b9a5f0c071f6a1069d7485e5637308107393`. The separate `signs.py` verifies all 505 source copies exactly, all 3841 target prefix nodes exactly, and the 384 new quintic cells with one preceding guard cell. Exact rational Bernstein endpoint formulas give 6930 endpoint equalities and 3456 $C^2$ join equalities. Known quadratic, exact endpoint and ratio controls precede the target. No finite-difference tolerance is substituted for a join identity.

The target comparison uses radius $1/200$, source bounds $1/2000$, $1/1000$, $1/100$, and the 97 complete generated channels. Its receiver Lipschitz coefficient, including $g\|DS_0\|\le1600|y|^2$, is below $8.262846<9$. The independent `errors.py` retains the accepted source error as a function of emission time, using upper mesh endpoints of width $1/2048$. It starts at $15/4$ from the preceding independent target errors and applies the new continuous residual budget $1/40000$. Known outward arithmetic and positive hyperbolic-kernel controls pass before the target. The resulting uniform bounds are

$$
\varepsilon_P<0.000113091,\qquad
\varepsilon_V<0.000451476,\qquad
\varepsilon_A<0.001747807.
$$

These are smaller than the subject's proposed allowances $0.0004$, $0.0017$, $0.0072$. The independent continuous polynomial norm is below $0.003906612$; adding even the larger position allowance closes the target radius $1/200$. The source-time ceiling is below $33/8-1+1/200+1/2000<13/4$.

With the larger allowances, direct Bernstein derivative bounds and an exact rational shared-trough ratio give

$$
\begin{aligned}
z'(t)&>0.0029853735957663\quad(15/4\le t\le33/8),\\
z(33/8)&\in[0.0035066091258119172,\ 0.004306609125811918],\\
z'(33/8)&\in[0.006495740336166549,\ 0.009895740336166550],\\
\frac{z(33/8)-m}{M-m}&\in[4752.039465516103,\ 7291.794247841176].
\end{aligned}
$$

Here $m$ and $M$ are the accepted fourth trough and its preceding maximum. The ratio preserves the same trough variable in numerator and denominator. This is an accumulated rise, not a completed upward excursion. Its strict velocity sign excludes a next maximum in the new interval, with the residual and continuation premises accepted in the final review below.

## 5. Final adjudication of the frozen subjects

The [stationary subject](smooth-two-particle-post-restart-stationary.md) was inspected only after the independent coefficient, remainder and derivative reference above had been written and frozen. Its alternative tensor calculation has contraction counts $1,15,45,15$ in the sixth derivative of $1/r$, giving $10395+15(945)+45(105)+15(15)=29520$. The fifth-order Taylor and fourth-order derivative remainders $7995(1-B)^{-7}|y|^5$ and $39975(1-B)^{-7}|y|^4$ follow. Its outward cube-24 coefficient interval contains the independent sharper cube-64 enclosure. The known coefficient $14$ precedes the target finite sum. Its constants $25$ and $100$ on radius $1/64$ are accepted, as is the larger-ball constant $50$ after using the independently proved sharp cubic norm.

The [continuation subject](smooth-two-particle-post-restart-continuation.md) retains the same complete histories and proves sufficient source-resolved first-exit inequalities on radius $1/20$. Its more conservative source-envelope errors give weaker margins than the independent calculation in Section 3, and those margins still remain strict. The independent enlarged-radius census agrees with every claimed certain/possible channel count. A further exact enumeration finds maximum generated degree 99, agreeing with the subject; its sharper differentiated-row bound gives jerk below $2012.250<2013$, also independently checked. The broader shellwise jerk estimate in Section 3 is already sufficient for the original class. Neither argument changes the law or history preparation.

The frozen continuous target residual receipt is `.local-data/master-equation-closure/post-restart/check/target-residual.json`, SHA-256 `f9f3e0c22f4b884b266ba1d3693fb52f7ea373961a96d1bbc42a01f8faa62620`. It bounds the full-law residual by $2.384854\times10^{-5}<1/40000$ on all 1536 continuous subcells; the stationary contribution is retained using the accepted norm enclosure. The latest source emission is below $3.129049<13/4$. The independent reconciliation checks all twelve time bins for gap-free coverage and the residual budget, authenticates the archive and matches all 97 emitted-source identities against both independent target censuses.

The final sign receipt is `.local-data/master-equation-closure/post-restart/check/signs.json`, SHA-256 `f7921aceeee2b6073e4a0e33616c9448a9d672e63d6bad7307a9d08c14cadb92`. It records continuous positive target vertical velocity, endpoint height in $[0.0035066091258119133,0.004306609125811922]$, and accumulated-rise ratio in $[4752.0394655,7291.7942479]$ after outward rounding. The independently derived error bound and Bernstein calculation in Section 4 support those conclusions. Exact source/prefix copies and quintic joins also pass independently.

**Final disposition: accepted through $33/8$ for this fixed supplied-history problem.** The accepted scope includes the full 836-identity affected population, complete causal equations with undecided endpoint-admission channels retained, actual continuation, original history-class margins, continuous full-law target residual, strictly rising common height, and the accumulated-rise comparison. No acceptance blocker remains for this finite extension. All source paths used by the target are genuine previously evolved histories; the archive does not purport to store all 836 future trajectories through the new endpoint. The requested next maximum, later motion, a completed later rise, and typical populated-universe behavior remain unresolved.

## Evidence and open conditions

The cubic coefficient, stationary remainder and continuation are derived statements; the finite arithmetic, archive compatibility, residual enclosures and continuous signs are measured by the named known-controlled instruments. The final independent reconciliation receipt is `.tmp/mec-008-post-restart/moore/review-target.json`. A sign, derivative or polarity error in (2), a tail exceeding (3), failure of the absolute-convergence argument, an omitted identity, an uncovered source time, a changed inherited history, a residual above its budget, or a failed strict first-exit/sign margin would overturn the corresponding conclusion. The displayed formulas and named receipts make those falsifiers operator-checkable. A failed sufficient bound would not establish an obstruction in the Master Equation.
