# Final audit of unequal-weight local periodic exclusion

**Claim grade: derived.** For each fixed positive-speed, strictly subfield equal-half circle of the Section 14 radial comparison, and each fixed nominated positive integer multiple of its period, one full Cartesian profile/period neighborhood excludes every periodic solution with a common fixed weight $\alpha\ne1/2$. The neighborhood can be chosen independently of $\alpha$. The source-clock pairing, moment sign, periodic integration, and continuity needed for this result survive the reconstruction below. No decisive gap was found.

This is a post-disclosure analytical audit of the [inverse-clock source](alternatives-screen-2026-10-05-time-asymmetric-circle-obstruction-hale-independent.md), the [complete-root integral reference](alternatives-screen-2026-10-05-time-symmetric-weight-coordinator-reference.md), and their [joint assessment](alternatives-screen-2026-10-05-time-symmetric-cartesian-weight-adjudication.md). Both derivations were read before this reconstruction. No new blind-independence claim, numerical target, spectrum calculation, or equation extension is made. The separate [final periodic-branch audit](alternatives-screen-2026-10-05-final-periodic-branch-audit.md) is preserved unchanged; its nonlinear existence theorem is not a premise for the present exclusion.

## 1. Exact law and domain

Use the [Section 14 comparison](../../equation-variants/manuscript.md#14-time-symmetric-direct-interaction), with $K=c_f=1$, opposite polarities, and the same fixed future weight $\alpha\in[0,1]$ for both labels:

$$
X_i''(t)=(1-\alpha)A_i^-(t)+\alpha A_i^+(t).
$$

Here $A_i^-$ and $A_i^+$ are the unweighted complete past and future radial acceleration inputs. At a source event with receiver $i$ at $t$ and source $j\ne i$ at $S$, let $r=X_i(t)-X_j(S)$, $\ell=|r|=|t-S|$, and $n=r/\ell$. The past input is $-n/[\ell^2(1-n\cdot V_j(S))]$ and the future input is $-n/[\ell^2(1+n\cdot V_j(S))]$, where $V_j=X_j'$. Positive denominators on the domain below agree with the absolute transmitter factors in the selected law. The zero-age endpoint is excluded by that law.

Let $X_1,X_2$ be complete $C^2$ Cartesian paths with a common labeled period $P>0$, a positive instantaneous separation floor $r_0$, and a complete speed bound $|V_i(t)|\le b<1$. No plane, midpoint, antipodal relation, reversal symmetry, or equation of motion is initially imposed. Periodic positions are bounded.

The root function for a past age $\tau$ is $\tau-|X_i(t)-X_j(t-\tau)|$. The chord inequality makes its increment at least $(1-b)$ times every positive increment of age. It starts negative and tends to positive infinity. The same argument applies to future ages, including all repeated periods. There is exactly one positive partner root in each direction for each receiver. Their ranges are at least $r_0/(1+b)$, and every transmitter denominator is at least $1-b$. A positive-age self root would require $|t-S|\le b|t-S|$, which is impossible. Thus the partner events used below are the complete ordinary-root census.

## 2. Reversal and the source-clock Jacobian

For the past event from label $j$ to receiver $i$, write $s=s_{ij}^-(t)<t$ and

$$
r=X_i(t)-X_j(s),\quad \ell=t-s,\quad n=r/\ell,
\quad D_i=1-n\cdot V_i(t),\quad D_j=1-n\cdot V_j(s).
$$

Differentiating $t-s-|X_i(t)-X_j(s)|=0$ gives

$$
1-s'-n\cdot(V_i-V_js')=D_i-D_js'=0,
\qquad
s'(t)=\frac{D_i}{D_j}>0.
$$

Both $D_i$ and $D_j$ lie between $1-b$ and $1+b$. The source clock therefore has a positive derivative bounded away from zero. At reception time $s$ on label $j$, time $t$ on label $i$ satisfies the future root equation. Its ray direction is $-n$ and its future transmitter denominator is $1+(-n)\cdot V_i(t)=D_i$. Complete root uniqueness identifies this event as the unique future source for receiver $j$.

Periodicity gives the exact shift identity $s(t+P)=s(t)+P$, because translating both event times by $P$ preserves the root equation and its unique solution. This identity and strict monotonicity make $s$ a global increasing bijection of the real line. Its inverse is precisely the reversed future source map. In particular $[0,P]$ maps to $[s(0),s(0)+P]$, not necessarily to $[0,P]$; the shifted integration cell must be handled explicitly.

For the opposite-polarity coefficient $-1$, the paired rows are

$$
A_{i\leftarrow j}^-(t)=-\frac{n}{\ell^2D_j},
\qquad
A_{j\leftarrow i}^+(s)=\frac{n}{\ell^2D_i}.
$$

The clock derivative cancels the second transmitter denominator exactly:

$$
\begin{aligned}
X_i(t)\times A_{i\leftarrow j}^-(t)\,dt
&+X_j(s)\times A_{j\leftarrow i}^+(s)\,ds\\
&=\frac{[-X_i(t)+X_j(s)]\times n}{\ell^2D_j}\,dt=0.
\end{aligned}
$$

The last equality uses $X_i(t)-X_j(s)=\ell n$. This pairs different receiver times. A same-time pairing, omission of the source-clock factor, or replacement of one transmitter denominator by the other would not prove the identity.

Define the integrated acceleration moments

$$
M_\pm[X,P]=\sum_{i=1}^2\int_0^P X_i(t)\times A_i^\pm(t)\,dt.
$$

The complete source maps shift by $P$, so the acceleration inputs and their moment integrands are periodic with $P$. The transformed future integral over $[s(0),s(0)+P]$ therefore equals its integral over $[0,P]$. Summing the pairing over the two ordered partner labels counts each future row exactly once and proves

$$
M_+[X,P]=-M_-[X,P].
$$

This identity holds before imposing the equation of motion. It uses ordinary Euclidean cross products as mathematical moments of acceleration, with no primitive mass or physical conservation premise.

## 3. Independent check of the complete-root integral formulation

The integral reference writes the same inputs as

$$
A_i^-(t)=-\int_{\mathbb R}\delta(t-s-\ell(t,s))\frac{r(t,s)}{\ell(t,s)^3}\,ds,
\qquad
A_i^+(t)=-\int_{\mathbb R}\delta(s-t-\ell(t,s))\frac{r(t,s)}{\ell(t,s)^3}\,ds.
$$

Here $\delta$ denotes the mathematical simple-root evaluation measure. For the past constraint its derivative in $s$ is $-(1-n\cdot V_j)$; for the future constraint it is $1+n\cdot V_j$. The absolute derivative in the root evaluation formula produces exactly the required transmitter denominator on each side. The measure is supported on the positive, separated roots. An unrelated off-root coincidence of two positions does not license evaluating $r/\ell^3$ at zero range: the coarea expression is defined on the regular root support, where the uniform positive range bound applies. This support interpretation is explicitly permitted by the integral source and avoids an artificial off-support singular product.

For the moment integrand, simultaneous translation $(t,s)\mapsto(t+P,s+P)$ preserves positions, constraints, and root measure. Its support lies in a bounded strip $|t-s|\le C$, since positions are bounded and $|t-s|=\ell$ on support. The denominator and range floors give finite absolute moment integrals on one receiver period. Thus the integration cell can be transferred:

$$
\int_{0\le t<P}\int_{s\in\mathbb R}f(t,s)\,ds\,dt
=\int_{0\le s<P}\int_{t\in\mathbb R}f(t,s)\,dt\,ds.
$$

To verify this equality, partition the unrestricted $s$ axis into the cells $[nP,(n+1)P)$, and translate both variables in each cell by $-nP$. The transformed $s$ cell is $[0,P)$ and the transformed $t$ cells partition the entire real axis. Only finitely many cells meet the root strip when the other variable is in one period. Endpoint choices have zero root-measure contribution because the source clocks are regular. There is therefore no unproved infinite conditional rearrangement.

Apply the transfer to the future moment, exchange the receiver/source labels and times, and note that the future constraint becomes the past constraint while $r$ changes sign. The sum with the original past moment has integrand proportional to

$$
-[X_i(t)-X_j(s)]\times r(t,s)=-r(t,s)\times r(t,s)=0.
$$

This reproduces the sign $M_+=-M_-$ and the source-position factor in the direct clock argument. The two representations check the same underlying complete-root identity; their agreement is not counted as a new numerical certificate or an imported action principle.

## 4. Necessary condition for a periodic solution

If the complete profiles also solve the selected mixed equation, their velocities share the period and

$$
\sum_i\int_0^P X_i\times X_i''\,dt
=\sum_i[X_i\times X_i']_0^P=0.
$$

The equality follows by differentiating $X_i\times X_i'$ and using $X_i'\times X_i'=0$. It is a period-integrated kinematic identity, not an assertion that the moment is conserved at each instant. Substituting the acceleration law and the root pairing yields

$$
(1-\alpha)M_-+\alpha M_+=(1-2\alpha)M_-=0.
$$

For every fixed common $\alpha\ne1/2$, an actual periodic solution must therefore have $M_-=0$. The step depends on using the same constant coefficient for both labels. A time-dependent or label-dependent weight cannot be removed from the period integrals in this way and is outside the theorem.

## 5. The circular axial moment has the stated positive sign

Fix a balanced equal-half reference circle with $X_1(t)=R e_R(\omega t)$, $X_2=-X_1$, $\beta=R\omega\in(0,1)$, and

$$
x=\beta\cos x,\qquad c=\cos x,\qquad D=1+\beta\sin x,
\qquad R=(4\beta^2cD)^{-1}.
$$

For receiver 1 at angle $\theta=\omega t$, the past source lies at angle $\theta-2x$ on the opposite label. The chord identity is

$$
X_1(t)-X_2(t-2x/\omega)=2Rc\,e_R(\theta-x).
$$

The source velocity is $-\beta e_T(\theta-2x)$, whose dot product with the ray $e_R(\theta-x)$ is $-\beta\sin x$. Thus the past denominator is $D$, and

$$
A_1^-(t)=-\frac{e_R(\theta-x)}{4R^2c^2D},
\qquad
X_1(t)\times A_1^-(t)=\frac{\sin x}{4Rc^2D}\,e_N.
$$

The unit vector $e_N$ is the oriented normal of the circle. The sign is positive because $e_R(\theta)\times e_R(\theta-x)=-\sin x\,e_N$ and the attractive acceleration has an additional minus sign. Label 2 reverses both position and acceleration, giving the same moment. For any fixed nominated integer multiple $P_0$ of the circular period,

$$
M_-[X_{\rm circ},P_0]=\frac{P_0\sin x}{2Rc^2D}\,e_N,
\qquad
m_0:=e_N\cdot M_-[X_{\rm circ},P_0]>0.
$$

All factors are strictly positive for the chosen positive subfield speed. The future circle moment has the opposite sign, agreeing with the general pairing. A fixed spatial translation of the circle leaves this value unchanged because its two past accelerations sum to zero; small center-displaced perturbations also lie within the continuity argument below.

## 6. A common neighborhood for all unequal fixed weights

Use fixed phase $\theta=2\pi t/P$ and write $Z_i(\theta)=X_i(P\theta/(2\pi))$. The profile space is the unrestricted periodic Cartesian $C^1$ space, together with the positive period parameter $P$. Physical velocity is $(2\pi/P)Z_i'$. A sufficiently small neighborhood of the reference profile and $P_0$ retains positive separation, bounded positions, and a common physical speed ceiling $b<1$.

The complete phase age solves

$$
\delta_\varepsilon=\nu|Z_i(\theta)-Z_j(\theta+\varepsilon\delta_\varepsilon)|,
\qquad \nu=2\pi/P.
$$

The same strict root slope makes $\delta_\varepsilon$ continuous in the uniform profile norm and $P$, uniformly in phase. For example, compare the two root equations at one old root; the difference of their right sides is bounded by position differences and the frequency difference, while the common lower slope converts that bound to a root displacement. Root ages stay in one compact interval on the neighborhood.

Sampled velocities are continuous in the $C^1$ profile topology: split a difference into the uniform difference of two derivatives at one source phase and a shift of the fixed derivative. The latter tends uniformly to zero by that fixed continuous derivative's modulus of continuity. This requires no second derivative bound for the candidate profiles. Positive range and denominator floors then give convergence of the acceleration inputs in the uniform norm. Consequently

$$
M_-[Z,P]=\frac{P}{2\pi}\sum_i\int_0^{2\pi}
Z_i(\theta)\times A_i^-[Z,P](\theta)\,d\theta
$$

is continuous in the full $C^1$ profile/period topology. Choose one open neighborhood $U$ so that $e_N\cdot M_-[Z,P]>m_0/2$ for every $(Z,P)\in U$. This neighborhood is defined entirely by the unweighted past input. It is independent of $\alpha$.

Every classical periodic solution in $U$ would have to satisfy $(1-2\alpha)M_-=0$. Its nonzero axial component forces $\alpha=1/2$. The contradiction holds for every nonzero departure from equal weighting, however small: the coefficient may approach zero but cannot equal zero at an unequal fixed weight. No uniform lower bound on $|1-2\alpha|$ is required. The neighborhood contains nonmirror, nonplanar, and periodically moving-midpoint profiles; none was excluded before the necessary condition was applied.

## 7. Scope, provenance, validation, and falsifiers

The theorem is local around each selected circle and each fixed nominated period multiple. It does not provide a common neighborhood across different base speeds or arbitrarily large multiples. It does not exclude distant periodic profiles with zero past moment, relative-periodic translational drift, nonperiodic histories, unequal directed couplings, external sources, superfield root domains, time-dependent or label-dependent weights, or nonclassical continuations. It supplies no causal initial-value theorem or stability conclusion. Any equal-half noncircular branch segment lying inside the same neighborhood inherits this unequal-weight exclusion, but branch existence is not needed for the proof.

Measured by `shasum -a 256` over the exact files read, the audit antecedents have the following identities.

| Source | SHA-256 |
| --- | --- |
| Inverse-clock source | `a8dfa2ce36d58dd5a2f16e48eac8fc59bdc57448caedbd0bdefdb909d5e24511` |
| Complete-root integral reference | `914f214c5297b19fe328475ec805eb187e7b7625ad348fd7091a1cc80f553616` |
| Joint Cartesian/weight assessment | `57a8886d8deef529d8620f6ffda5abd8fd34224e8bafd2339d18dedc88285873` |
| Preserved final periodic-branch audit | `125615a01737de0a826754e1c652321e51dc31d9707ef4b211fd29815929d765` |

No arithmetic enclosure is needed for this theorem. Its controls are exact: the event inverse and derivative, the sign of the paired acceleration rows, the period shift, the collinear cross-product cancellation, and the explicit positive circular moment. No new checker or regular test was built. Measured by `node .tmp/maxwell-shaped-overnight/check-documents.mjs` on this file alone, all 5 local links/fragments and 124 mathematical expressions passed with zero failures. The existing checker uses the parent campaign's recorded known-case pass and validates local links and strict KaTeX syntax, not the mathematical proof. `git diff --no-index --check /dev/null` on this file emitted no whitespace diagnostics; exit status 1 records its expected new-file difference. Only this new audit source is written, and this worker starts no numerical or background job.

Falsifiers are a missing ordinary source within the stated complete subfield domain; a failure of the global clock inverse or its period shift; an incorrect transmitter denominator or Jacobian cancellation; a nonzero paired cross product; failure of the bounded-strip cell transfer under its stated measures; a zero or oppositely signed circular axial moment in the chosen orientation; loss of moment continuity in the declared topology; or an actual unequal-fixed-weight periodic solution inside the neighborhood defined by $e_N\cdot M_->m_0/2$. Such a solution would contradict the exact necessary condition. No such gap was found in the reconstructed proof.
