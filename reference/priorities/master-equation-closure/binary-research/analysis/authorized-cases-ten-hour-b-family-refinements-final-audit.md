# Skeptical proof audit of B's family density and speed refinements

**Derived audit disposition: no unsupported inequality found in the inspected family-wide refinements.** The complete finite phase derivative, parameter-window length bounds and both velocity-dependent sufficient tests are supported at their stated constants and domains. This is a known-conclusion proof inspection after the subject and independent assessments were available, not a blind discovery or a repetition of their exact coefficient/scalar computations. The scope remains the original compatible degree-five amplitude-gradient preparation with fixed cutoff and constant older tail, $K=c_f=1$, and $0<\epsilon\le\epsilon_0=2^{-200000}$.

The [earlier phase-consumer audit](authorized-cases-ten-hour-b-phase-consumer-audit.md) inspected the fixed-member bridge. This note reconstructs the additional uniform complex-domain, derivative, counting and positive-entry obligations. The [density assessment](authorized-cases-ten-hour-reference-b-phase-density-assessment.md), [interval assessment](authorized-cases-ten-hour-reference-b-positive-interval-assessment.md) and [uniform-speed assessment](authorized-cases-ten-hour-reference-b-uniform-speed-assessment.md) are compared with their subject and separately frozen reference proofs. Existing finite coefficient identities and actual-value remainder bounds remain explicit independently admitted inputs; no new algebraic or scalar target is run.

## 1. Uniform complex domain of the entire finite expression

Fix any real center $0<e\le\epsilon_0$ and the relative disk $|z-e|\le e/4$. The accepted initial coefficients give

$$
Q(z)=z^3Z(z),\quad \delta_0(z)=zd(z),\quad
A(z)=Z_r(z)^2+Z_i(z)^2,\quad I(z)=z^6A(z),\quad x(z)=z^2A(z)^{1/3}.
$$

Here $Z_r,Z_i$ are the polynomials formed from real and imaginary coefficients, evaluated at complex $z$. This is a bilinear continuation, not conjugation of $Z(z)$. The constant values are $Z(0)=-8i/3$, $A(0)=64/9$ and $d(0)=1$. The independent coefficient norm below $2^{4096}$ bounds every positive power uniformly. The vanishing quadratic coefficient in $\delta_0$ is part of the accepted initial audit, so $d-1$ starts at order two. No small numerical subtraction is being used to establish a nonzero seed.

The elementary disk bounds $3e/4\le|z|\le5e/4$, together with $|A-64/9|<1/1000$ and $|d-1|<1/1000$, imply the reference's $|I|>e^6$, $e/2<|\delta_0|<2e$, and $e^2<|x|<4e^2$. For example $(3/4)^6(64/9-1/1000)>1$ checks the first lower margin. The root of $A$ is the branch near $(64/9)^{1/3}$; $|\arg x|<3/5$ and $B=x^{-1}$ remains in a fixed right sector with $\Re B>(4/5)|B|$ and $|B|>10$. These margins improve as $e$ decreases.

On the [independent interval reference](authorized-cases-ten-hour-reference-b-positive-interval-blind.md)'s straight slow path $b(u)=1+u(B-1)$,

$$
|I b(u)^3|=|(1-u)x+u|^3\le1,\quad |b(u)|\ge1,
$$

$$
\int\frac{|db|}{|b|^2}
\le\frac{|B-1|}{\Re B}<2,\qquad
\int|b|^2|db|<2|B|^3.
$$

The first integral is obtained by integrating the squared reciprocal of $\Re b=1+u(\Re B-1)$; the second follows from $|b|\le|B|$ and $|B-1|<2|B|$. Thus no real ordering is imposed on a complex endpoint.

For the auxiliary parameter $|\zeta|\le\rho=2^{-10000}$, the retained slow equation is $k_b=(k/b)F(Ib^3,\zeta k/b)$, $k(1)=1$. Its denominator is $\Lambda/\delta^3=2+O(2^{4096}\delta)$, separated from zero on $|\delta|\le2\rho$. The leading cancellation $1+(3/2)(-4/3)/2=0$ in $F$ gives $|F|\le2^{4100}|\delta|$, and the same coefficient bounds give $|H|<2$. Under $|k-1|\le1/2$,

$$
|k-1|\le\frac94\,2^{4100}\rho\int\frac{|db|}{|b|^2}
<2^{4103}\rho<\frac14.
$$

This closes the whole path and its analytic parameter dependence. The normalized phase

$$
T(I,\zeta)=I\int_1^B\frac32b^2k^{-3}H\,db
$$

has modulus below $64$ because $|k|>3/4$ and $|I||B|^3=1$. Its Taylor coefficients in $\zeta$ are therefore bounded by $64\rho^{-n}$ uniformly on the entire relative input disk. The same argument bounds the endpoint multiplier and yields $|k_{13}-1|<1/4$ at $\delta_0(z)$, using the geometric sum in $|\delta_0|/\rho$.

The complete audited Laurent-logarithmic expressions are these Taylor polynomials, by their exact differential and endpoint identities. This preserves every logarithmic primitive and lower-endpoint constant. Holomorphy is asserted only on relative disks away from zero; logarithms need not extend holomorphically through zero. The prepared phase is the branch $\psi_0=-\pi/2+\arctan(Z_r/(-Z_i))$, of modulus below four. It correctly omits any artificial $3\arg z$: on the positive real parameter axis the factor $\epsilon^3$ has no argument, and this is the holomorphic continuation of that real phase formula.

These observations validate the full expression

$$
\Theta(z)=\psi_0(z)+\frac{T_{13}(I(z),\delta_0(z))}{I(z)\delta_0(z)^3}
+\frac5{8\delta_0(z)x(z)k_{13}(I(z),\delta_0(z))}-\pi.
\tag{1}
$$

Only this finite comparison is complexified. Neither an actual delayed history nor one of its sixth-derivative seams is analytically continued or differentiated in parameter by this construction.

## 2. Full remainder before its derivative

The exact auxiliary control $F=0$, $H=1/2$, $k=1$ gives $T_0=(1-I)/4$. This checks both endpoint constants and the leading coefficient $C=9/256$. Put $v=|\delta_0|/\rho\le2e/\rho$. The Cauchy sum gives

$$
|T_{13}-T_0|\le\frac{64v}{1-v}<2^{10008}e.
$$

The initial coefficient bounds give $|Ad^3|>1$ and $|Ad^3-64/9|<2^{4103}e$, while $|I|/4<8e^6$. Consequently $|T_{13}/(Ad^3)-9/256|<2^{10010}e$ has ample slack. Multiplying (1) by $z^9$ leaves that principal term, a prepared-phase term bounded by $64e^9$, and the reciprocal endpoint term bounded by $10e^6$. Thus the [density subject](authorized-cases-ten-hour-b-phase-density-candidate.md)'s full holomorphic remainder satisfies

$$
G(z)=z^9\Theta(z)-9/256,\qquad |G(z)|<2^{10012}e.
$$

This bound contains the reciprocal correction and all finite logarithmic terms; none is dropped because its unscaled size seems small. Cauchy on radius $e/4$ yields $|eG'(e)|<2^{10014}e$. Therefore

$$
\left|\epsilon^{10}\Theta'(\epsilon)+\frac{81}{256}\right|
\le|\epsilon G'|+9|G|<2^{10017}\epsilon<\frac1{256},
$$

which proves

$$
\frac14\epsilon^{-10}<-\Theta'(\epsilon)<\frac12\epsilon^{-10}
\quad(0<\epsilon\le\epsilon_0).
\tag{2}
$$

The [independent density reference](authorized-cases-ten-hour-reference-b-phase-density-blind.md) instead differentiates the unscaled remainder on the same disks and obtains a weaker sufficient constant. Its factor $(4/3)^8<16$ and Cauchy radius produce its stated $2^{11006}\epsilon^{-9}$ derivative error. Both proofs have the necessary margin; neither infers a derivative from a leading asymptotic or a sampled phase. The sign belongs to the complete finite $\Theta$, not to physical terminal speed.

The same complex disk also validates the earlier endpoint interval. Its bound $|\Theta|<2^{12}\epsilon_0^{-9}$ gives $|\Theta'|<2^{20}\epsilon_0^{-10}$ on the stated smaller real neighborhood. Over width $2^{-30}\epsilon_0^{10}$ the variation is below $2^{-10}$, so the inherited endpoint distance above $1.77$ remains above $1.7$. The interval is positive, closed and one-sided inside the admitted range. This checks the interval endpoint arithmetic without a new phase evaluation.

## 3. Integer-turn windows and ordinary parameter length

On $[a/2,a]$, integrate the upper derivative envelope in (2): the phase-image length is less than $(511/18)a^{-9}$. For windows of half-width $Ma^k<\pi$, $k=1$ or $2$, at most the image length divided by $2\pi$, plus two, can intersect it. This includes windows centered just outside either endpoint: enlarge the image by the half-width on each side, then count lattice points of spacing $2\pi$. Since $2\pi>6$ and $a<1$, their number is less than

$$
\frac{511}{108}a^{-9}+2<7a^{-9}.
$$

The inverse derivative is at most $4a^{10}$. Each full phase window has width $2Ma^k$, so its preimage has length at most $8Ma^{k+10}$. Monotonicity precludes repeated preimages. Enlarging the variable tolerance $M\epsilon^k$ to $Ma^k$ is an upper bound in the correct direction. The shell length is at most $56Ma^{k+1}$. Dyadic summation gives

$$
k=2:\quad 56M\sum_{j\ge0}(a2^{-j})^3=64Ma^3,
$$

$$
k=1:\quad 56M\sum_{j\ge0}(a2^{-j})^2=\frac{224}{3}Ma^2<128Ma^2.
\tag{3}
$$

Countably many shared shell endpoints have zero length, including the admitted upper endpoint. Equality in a phase tolerance remains in the unresolved set; only its strict complement is classified. These elementary inverse-image and geometric-series calculations check the constants independently of the scalar evaluator.

For $M=2^{191000}$ and $k=2$, (3) gives $|U\cap(0,a]|\le2^{191006}a^3$, with relative endpoint bound $2^{-208994}$. Doubling the phase tolerance doubles the length bound, giving relative bound $2^{191007}a^2$ and endpoint $2^{-208993}$. For $M=2^{150102}$ and $k=1$, the relative bound is below $2^{150109}a$, hence below $2^{-49891}$ at $a=\epsilon_0$. All half-widths are below $\pi$ even at the largest parameter, so the endpoint-window count remains applicable in every shell.

## 4. Uniform physical implication and finite positive-entry chart

The original quantitative theorem admits the entire real range with the same preparation rule. The compatible-jet, finite layer, original complex-input, weighted-value and common-amplitude bounds use the same constants throughout it. Initial amplitude lies between $\epsilon^3$ and $4\epsilon^3$; the state error divided by that nonzero seed has the admitted $O(\epsilon^{11})$ bound. The uniform [zero-branch consumer](authorized-cases-ten-hour-reference-b-positive-interval-assessment.md) includes the actual phase term $2^{175082}\epsilon^2$, grazing tail at most $2^{50014}\epsilon^3$, slow tail $2^{140022}\epsilon^5$, reciprocal tail $2^{140030}\epsilon^{11}$ and correlated grazing displacement $2^{225079}\epsilon^8$. Their ratios to $2^{191000}\epsilon^2$ are either a fixed small constant or positive powers of $\epsilon$. The endpoint verification therefore supplies their uniform smallness; no physical branch is differentiated in parameter.

Each speed test first exceeds that necessary zero-speed tolerance. The all-future dichotomy then supplies a positive member and an actual finite qualified entry $r_t\mathcal E_t=128$. Only after that existence step does the argument assume a small physical terminal speed $V$ for contradiction. The exact tail gives $\mathcal E_t<v_\infty^2$, where $v_\infty=V/\epsilon$. Account monotonicity is used only before entry, so $\mathcal E\le v_\infty^2$ on the pre-entry chart.

Under the common broader hypothesis $V\le\epsilon^7$, one has $v_\infty\le\epsilon^6$. Bootstrap normal amplitude $a<17/16$. The common-amplitude envelope gives $h\le32\epsilon^{-2}$ and $\delta\ge\epsilon^3/16$, hence $2h^2\mathcal E\le2^{11}\epsilon^8$. In

$$
|(w-1)+iu|^2=1+2h^2\mathcal E+\eta^2w^3+\frac83\eta^3uw^2,
\qquad \eta=\epsilon/h,
$$

the underlying pre-entry chart gives $w\le1024$, $|u|\le512$ and $\eta\le2\epsilon$. The remaining terms are below $2^{34}\epsilon^2$. The near-identity inverse map then improves the amplitude to $1+2^{50004}\epsilon^2<17/16$. This closes the bootstrap inside the map's domain; the coarse $w,u$ bounds are not used to extend that map to arbitrarily large amplitude. The other physical chart and complete-source premises come from the already admitted all-future passage and remain valid before entry.

At entry, $h_t^2\le1024\epsilon^{-4}$, $1/r_t<v_\infty^2/128$ and $r_t|v_t|^2<259$ give

$$
w_t\le8V^2\epsilon^{-6},\qquad
u_t^2<2^{12}V^2\epsilon^{-6},\qquad
|u_t|<64V\epsilon^{-3}.
\tag{4}
$$

Under $V\le\epsilon^7$, these imply $w_t\le8\epsilon^8$ and $|u_t|\le64\epsilon^4$. They remain inside the fixed analytic grazing neighborhood for every admitted parameter. All smallness inequalities strengthen toward zero. This is the separately required positive-entry chart, not a reuse of the zero-branch limiting chart beyond its physical domain.

## 5. Explicit check of the velocity-dependent phase allowance

The parameter-zero section control is $w=1+a\cos\psi$, $u=a\sin\psi$ at $\psi=\pi$, so $w_\psi=0$. The exact finite map starts at parameter degree two. The accepted derivative margins therefore give $w_\psi=O(\delta^2)$ on its perturbed $u=0$ section, not a generic order-one derivative. With the [independently assessed section constant](authorized-cases-ten-hour-reference-b-terminal-lower-adjudication.md) $C_2=2^{100020}$,

$$
|\psi-\psi_u|\le2|u|,\qquad
|a-a_g(\delta)|\le2|w|+C_2(\delta^2|u|+u^2).
\tag{5}
$$

The local lift includes the appropriate integer turn. This cancellation is essential: replacing $u^2$ by an unweighted $|u|$ would destroy the desired powers.

Here is an explicit check on the inherited generalized constant. Let $\delta_1=\delta_m(1)$. On $15/16\le a\le17/16$, the retained slow equation has $|d\log\delta_m/da|<1$. Its values along the section comparison are therefore between $\delta_1/2$ and $2\delta_1$; the tiny actual log-parameter discrepancy also gives $\delta_{\rm actual}\le2\delta_1$. The grazing equation derivative exceeds one half and its phase derivative is at most $32/\delta_1^3$. Consequently the new finite $w,u$ phase terms in (5), including the direct angle error, are bounded by

$$
128w_t\delta_1^{-3}
+64C_2u_t^2\delta_1^{-3}
+256C_2|u_t|\delta_1^{-1}+2|u_t|.
$$

Using (4) and $\delta_1\ge\epsilon^3/16$, the quadratic coefficient is below $2^{100051}$ multiplying $V^2\epsilon^{-15}$, and the linear coefficient below $2^{100039}$ multiplying $V\epsilon^{-6}$. Thus both fit strictly inside the retained $2^{150100}$ allowance. These smaller intermediate estimates only check slack in the frozen bound; no stronger scientific result is claimed.

The old parameter discrepancy remains separate: $L=2^{175063}\epsilon^{11}$ moves $a_g$ with its original derivative bound, not the larger $C_2$ used for finite transverse displacement. Bounding that displacement by $2^{50005}\delta_1^2L$ and multiplying by the phase slope, then adding the smaller direct section-parameter term, fits $2^{50012}L/\delta_1\le2^{225079}\epsilon^8$. All other old phase/truncation terms fit $M\epsilon^2$, $M=2^{191000}$. The full inspected inequality is therefore

$$
\operatorname{dist}(\Theta,2\pi\mathbb Z)
\le2^{150100}(V^2\epsilon^{-15}+V\epsilon^{-6})
+2^{225079}\epsilon^8+M\epsilon^2,
\tag{6}
$$

for positive members under $V\le\epsilon^7$. The physical-to-scaled conversion in (4) accounts for the two extra inverse powers in the quadratic term and the one in the linear term. The comparison ends at finite actual entry; the later exact tail supplies the terminal vector independently.

## 6. The two tests and their exact boundaries

For the [subject speed test](authorized-cases-ten-hour-b-uniform-speed-candidate.md), assume $V\le2^{20000}\epsilon^{17/2}$. Its ratio to $\epsilon^7$ is at most $2^{-280000}$, so the hypothesis of (6) holds. Dividing its right side by $M\epsilon^2$ gives

$$
2^{-900}+2^{-20900}\epsilon^{1/2}+2^{34079}\epsilon^6+1<2.
$$

Thus every member with phase distance strictly greater than $2M\epsilon^2$ has $V>2^{20000}\epsilon^{17/2}$. For the [independent stronger test](authorized-cases-ten-hour-reference-b-uniform-speed-blind.md), the threshold $\Gamma=2^{150102}\epsilon$ exceeds the necessary zero-speed tolerance by the factor $2^{-40898}/\epsilon\ge2^{159102}$. After positivity is established, the hypothesis $V\le\epsilon^8$ also implies $V\le\epsilon^7$. Dividing (6) by $\Gamma$ gives

$$
\frac14+\frac\epsilon4+2^{74977}\epsilon^7+2^{40898}\epsilon<\frac12,
$$

contradicting phase distance greater than $\Gamma$. This proves $V>\epsilon^8$ on that subset. At the upper parameter the last two terms are $2^{-1325023}$ and $2^{-159102}$, so the strict inequality has explicit room. Equality in a speed contradiction is excluded as well, yielding strict final lower bounds.

The stronger phase threshold selects a subset of the first test's complement because $\Gamma/(2M\epsilon^2)\ge2^{159101}$. Its speed lower bound is stronger by the factor $2^{-20000}\epsilon^{-1/2}\ge2^{80000}$. The length estimates in Section 3 apply independently to these two sufficient subsets. Each has one-sided density one as the parameter upper endpoint tends to zero. Neither is claimed to include every positive-speed member. Membership in either exceptional set proves neither zero speed nor failure of dispersal; no zero-speed member is constructed. There is no parameter-independent speed floor, common tail-entry time, probability distribution, terminal-speed monotonicity or arbitrary-history theorem. The sharper single-endpoint speed/time/rate results remain separately scoped.

## Reviewed identities and falsifiers

Scoped SHA-256 reads during this inspection matched the following frozen files. The hashes bind the inspected sources; they do not replace the analytical checks above or rerun any finite algebra.

| Source | SHA-256 |
| --- | --- |
| Density subject | `b8d5e6ed5360f21831ae3ea25d06d1600ab5eb2d818c550e6410f3df54a782bc` |
| Independent density reference | `ca0b3c9a19014a532f8002acaf4aa626f07787a23c6d9ec4a11c03559d229282` |
| Density assessment | `738d1c9560e707167869211ac30cf7b3ec1888e610287a6a77026d7a74f0930e` |
| Independent interval reference | `2419c423c1e067b8aa6452076ecd46edd4de74946fcbee0a3d8f836e19143351` |
| Uniform interval/physical assessment | `88548ea2d2ec73ade82c5e53db8d5b4c2a17de4f174b68be53fb3aabd040a496` |
| Uniform-speed subject | `86de0838070439a4b36ab580f44b478c2f1de414352fa56ca18c2b7c062e5384` |
| Independent uniform-speed reference | `65cade9f4a5bd1ca169c192981f124cfdfe7cde3c8edc624be820e54a0f81b27` |
| Uniform-speed assessment | `f5e1ff2004917442d25bc095e2f97aedb794b8065c509d76669a2bdadf493d09` |
| Original generalized finite-entry reference | `5c19184a4495ce3709e325b8f4d46a216d4f832aaad6130ab43827cdd17f88cd` |
| Finite-entry/section assessment | `18d4feb9677baf5160de949aa2ab2fb00452ccb06cd68b66675a116e5de65955` |
| Broader small-speed domain assessment | `245cc0e0ff189a47388eca51b4ec153421144cb5eef39ca3346c93ba42cd9f23` |

The exact finite coefficient identities, original actual-value bounds and all-future source/continuation theorem remain inherited admitted premises. No new missing premise was identified within the audited refinement. Concrete falsifiers are a failed bilinear/branch domain, omitted finite endpoint or logarithmic term, loss of the full-remainder bound before differentiation, missing endpoint window, incorrect inverse derivative or dyadic exponent, use of a finite tail entry before positivity is known, failure of the positive pre-entry amplitude bootstrap, loss of the quadratic section cancellation, or wrong physical velocity scaling. Any such defect reopens its dependent refinement without automatically overturning separately supported fixed-member results.

Only this audit note is new. No shared owner, frozen source, independent oracle or retained receipt was edited. No scalar evaluation, symbolic algebra target, numerical trajectory, Python process or scientific job was launched. The existing known-first document checker supplies TeX and local-link validation separately from the derived proof inspection.
