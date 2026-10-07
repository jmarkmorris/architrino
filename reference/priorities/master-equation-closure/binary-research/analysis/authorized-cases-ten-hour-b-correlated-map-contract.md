# The finite correlated-map calculation and its decision contract

**Status: derived next-step specification with conditional quantitative bounds; unreviewed.** Keep the exact member $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$ and the entire fixed [case history](authorized-cases-ten-hour-b-case.md). The terminal branch is unresolved. No scalar phase or trajectory is evaluated in this document. This makes the strongest remaining B route concrete enough for a separately controlled subject/reference calculation after the protected later packages.

The construction uses the [finite polynomial angle field and initial-layer derivative inventory](authorized-cases-ten-hour-b-finite-phase-reduction.md). Those structural claims remain subject to independent review. The actual value remainder, compact seed and first initial-layer kick have separate accepted scopes; none alone supplies the map described here.

## 1. Exact finite algebra to be constructed

Use the angle variables $x=w-1$, $u=hp$, $\eta=\epsilon/h$ and write $z=(x,u)$. The central vector field is $V_0=(-u,x,0)$. Regard a parameter-degree-$n$ vector field as

$$
\eta^n\bigl(f_n(z),\;\eta b_n(z)\bigr),
\tag{1}
$$

where the last component is the equation for $\eta$. The functions are rational-coefficient polynomials. The vector coefficient has state degree at most $n+1$, and the logarithmic parameter coefficient has degree at most $n$. The Lie bracket preserves this parameter grading: the factor $\eta\partial_\eta$ only multiplies a degree by its integer exponent.

First construct $F_6,\ldots,F_{16}$ by the already defined eight-step autonomous source substitution, retaining the exact receiver gradient before source substitution. The known $F_0,\ldots,F_5$ supply controls; no coefficient from a fitted orbit is used. Convert these rows to (1) using the polynomial rule in the finite-phase reduction.

Next perform fifteen exact finite normal-form steps, at degrees $n=2,\ldots,16$. Let $R_\theta$ be the central rotation. For a two-component vector polynomial and a scalar logarithmic coefficient define

$$
\begin{aligned}
\mathfrak A f(z)&=\frac1{2\pi}\int_0^{2\pi}
R_{-\theta}f(R_\theta z)\,d\theta,\\
\mathfrak A b(z)&=\frac1{2\pi}\int_0^{2\pi}
b(R_\theta z)\,d\theta.
\end{aligned}
\tag{2}
$$

At step $n$, take the degree-$n$ coefficient of the current finite field, retain its group average, and invert the zero-mean part using the same integrals with an additional factor $\theta$. The homological operator on a vector is $Df\,V_0-DV_0\,f$; on the scalar it is ordinary differentiation along rotation. The resulting polynomial generator $P_n$ solves that homological equation. Pull back the current field by the time-one flow of $\eta^n(P_n,\eta p_n)$ and retain parameter degrees through sixteen. The pullback convention subtracts the displayed homological term, so the chosen zero-mean coefficient is removed. Fix the kernel by requiring zero group average of every generator.

All operations are finite rational algebra. The averages of monomials under rotation are rational after division by $2\pi$, and the nonzero Fourier divisors are nonzero integers. No unknown orbital period or small amplitude divides a coefficient. The resulting field has the form

$$
\begin{aligned}
z_\phi&=\{\Lambda(I,\delta)\operatorname{Id}
+\Omega(I,\delta)J\}z+\mathfrak r_z,\\
(\log\delta)_\phi&=B(I,\delta)+\mathfrak r_b,
\qquad I=|z|^2,
\end{aligned}
\tag{3}
$$

where $J(x,u)=(-u,x)$, the new $\delta$ is the transformed parameter, and $\Omega$ includes its constant term one. This $\delta$ is a finite normal-form coordinate; its map to the earlier $\epsilon/H$ is part of the constructed transformation, not silently identified with it.

At each degree $n$, $\Lambda_n,\Omega_n,B_n$ are polynomials in $I$ of degree at most $\lfloor n/2\rfloor$. Thus an upper inventory is 79 scalar coefficients in each of three families through degree sixteen, before parity or other zeros are used. The coordinate generators and their inverse series must be retained as well: the averaged coefficients alone cannot map the original preparation or the final section.

## 2. Analytical controls before any target coefficient evaluation

The zero-parameter field is exactly rotation. At quadratic order the mean radial and mean logarithmic-parameter coefficients vanish, and the angular frequency coefficient is $1/2$. At cubic order the known controls are

$$
\Lambda_3=2,\qquad B_3=-\frac43,\qquad \Omega_3=0.
\tag{4}
$$

For example, before averaging the cubic radial squared-amplitude derivative is

$$
2g\{2x(1+x)^2-u^2(1+x)\},\qquad g=4/3.
$$

Its rotational mean is $3gI=4I$, giving $\Lambda_3=2$. The scalar mean is $-g\langle1+x\rangle=-g$. Direct averaging of the quadratic angular numerator gives $1/2$. These checks also fix rotation signs and parameter conventions.

Further controls are the independently checked full polar $F_4,F_5$, their reversible account/angular primitives, the signed fifth-order cycle coefficient, and the first-layer integral $8/21$. The normal-form output must be transformed back to those fixed conventions before comparison. A separately authored reference must test the coefficient rule; replaying a saved output from the same constructor is not independence. No new target constructor is run before its chosen known cases pass and those results are recorded.

## 3. A concrete normal-form remainder budget

The polynomial angle coefficient bound from the finite-phase reduction supplies an analytic field on $|z|<3/2$ and a small parameter disk. Set the working radius

$$
R=2^{-10000}.
$$

Start the fifteen transformations on parameter radius $2^{16}R$ and halve the radius after each step, leaving radius $2R$. Initially the noncentral field norm is below $2^{-9800}$: its quadratic bound is at most $2^{10110}(2^{16}R)^2=2^{-9858}$ and the higher terms are smaller. Reserve a total of 1024 state-width losses of $2^{-16}$, less than the gap between radii $3/2$ and $5/4$.

The group-average and zero-mean inverse cost less than $2^6$ in analytic supremum norm. A state derivative, component sums, and a graded parameter derivative cost less than $2^{24}$ on the reserved domains. A unit auxiliary flow generated by a norm below $2^{-9000}$ moves the state and its logarithmic parameter by much less than a reserved width loss, with Jacobian and inverse Jacobian below two. A factor $2^{40}$ per normal-form step consequently covers coefficient extraction on the halved disk, inversion and pullback. Fifteen such factors leave the noncentral field below $2^{-9200}$, so the small-generator assumption is maintained. These inequalities must be checked against the exact implementation convention; they are the proposed operation-level budget, not a measured cost claim.

The full transformed analytic field is bounded by sixteen on the final disk. Its degree-sixteen Taylor truncation therefore has a remainder below $2^{170010}|\delta|^{17}$. The actual angle remainder has its already admitted coefficient below $2^{86060}|\delta|^{17}$ after the bounded coordinate Jacobians. A safe common proposed bound is

$$
|\mathfrak r_z|+|\mathfrak r_b|
\le2^{175000}|\delta|^{17}.
\tag{5}
$$

This is a finite analytic-coordinate construction applied to a value remainder. It differentiates no actual sixth seam. The proposed budget is independently checkable from the exact generators, domains and pullback convention; increasing an exponent without those checks would not establish (5).

## 4. Exact preparation input through the required order

Use $\sigma=s/\epsilon$ on the same original interval ending at $200\epsilon$. Expand the compatible jets $J_m(\epsilon)$ through parameter degrees $14-m$, for $m=2,3,4,5$; those maximum degrees are respectively 12, 11, 10 and 9. Expand the given $h_0$ to the corresponding order. These coefficients come from the original finite compatibility equations, not from the autonomous comparison jets.

Construct the scaled position coefficients $Y_0,\ldots,Y_{14}$ by the exact triangular recurrence

$$
Y_n''(\sigma)
=[\epsilon^{n-2}]\,\mathcal R\bigl(Y,Y_\sigma,Y_{\sigma\sigma};\sigma_d\bigr),
\qquad \sigma_d=\sigma-L,
\tag{6}
$$

where $\mathcal R$ is the braces and denominator of the exact scaled row, including the factor $-4$ but excluding its outer $\epsilon^2$. At degree $n$, only lower coefficients through $n-2$ occur on the right. Use the exact negative-time polynomial coefficients and integrate twice with the prescribed release data. Expand the implicit range consistently; its first correction has degree two.

Each coefficient is piecewise polynomial of degree at most its parameter degree. Through degree fourteen the only possible leading seam locations are $0,2,4,6,8$: the first omitted sixth coefficient appears at zero, and each neutral transmission costs two degrees. Thus the finite interval has six polynomial pieces, including the negative one and the final interval from eight to 200. The derivative inventory in the finite-phase reduction permits every delay Taylor term required here. The known first kick and compatible-jet differences in the initial-layer subject are required controls for this recurrence.

The needed output is an interval for the actual state at $200\epsilon$, with a proof of

$$
|y-y^{[14]}|+|y'-(y')^{[13]}|
\le2^{50000}\epsilon^{14}.
\tag{7}
$$

The number $2^{50000}$ is an explicit admission target for the finite coefficient/residual calculation, not an already proved layer constant. The current layer theorem only supplies its first nonzero correction. A value-defect contraction with the exact original boundary input must certify (7) before the phase bound below is used. This is the first presently missing quantitative input of the proposed completed map.

Evaluate the retained normal-form coordinate series on that state enclosure. The protected cubic seed should then give $\epsilon^3<a_a<4\epsilon^3$, where $a_a=|z_a|$, and $\epsilon/2<\delta_a<2\epsilon$. The relative uncertainty in $a_a$ is of order $2^{50020}\epsilon^{11}$. The initial normal-form phase is part of the enclosure; it is not reset to a convenient value.

## 5. Conditional phase sensitivity over the many cycles

The averaged equations contain no fast angle on their right. They reduce to

$$
\frac{d\log\delta}{d\log a}
=\frac{B(a^2,\delta)}{\Lambda(a^2,\delta)},
\qquad
\frac{d\psi}{da}
=\frac{\Omega(a^2,\delta)}{a\Lambda(a^2,\delta)}.
\tag{8}
$$

These are the two scalar quantities to carry with correlated intervals. They are not replaced by the leading power law. Their exact finite coefficients may also be integrated by a finite expansion, retaining the slow resonances and logarithms identified in the finite-phase reduction.

The controls (4) give $\delta a^{2/3}$ nearly constant and $\Lambda\sim2\delta^3$. On the fixed parameter the higher coefficient bounds keep the relative corrections and their state derivatives below fixed small margins. In particular one can use

$$
\tfrac12\delta_a(a/a_a)^{-2/3}
<\delta(a)<2\delta_a(a/a_a)^{-2/3}
\tag{9}
$$

up to $a=9/8$, with a separate perturbation estimate for (5). The remainder's relative contribution to the slow relation is bounded by a multiple of $2^{175000}\delta^{14}/a$. Its integral is of order $2^{175000}\epsilon^{11}$, dominated near the initial cubic seed. The accumulated angle itself has order $\epsilon^{-9}$. Multiplying these correlated slow errors yields order $2^{175000}\epsilon^2$ in the final angle. The direct angular remainder is smaller, of order $2^{175000}\epsilon^8$.

This gives the following concrete conditional phase target, with room for the finite interval factors and (7):

$$
|\psi_{\rm actual}-\psi_{\rm map}|
\le2^{190000}\epsilon^2
\tag{10}
$$

at the matched near-parabolic amplitude/section. Equation (10) is not an achieved estimate. It requires (5), (7), the explicit coefficient derivative margins in (8)–(9), and a section-matching proof. The leading slow coefficients are independent of $a$, so the stability argument does not require a Gronwall exponential in the number of fast cycles. The higher derivatives are multiplied by integrable positive powers of $\delta$. That is the reason this finite reduction is credible despite the leading $\epsilon^{-9}$ angle count.

## 6. The last-section decision must be signed

Retain the inverse normal-form transformation. The original grazing point $w=u=0$ maps to an analytic curve $(a_g(\delta),\psi_g(\delta))$ near $(1,\pi)$, with the phase orientation fixed by the actual transformation. It cannot be replaced by the uncorrected central point. Matching (8) to this curve determines the candidate critical angle and the two adjacent near-apocenter sections.

For an actual physical section $u=0$ near $w=0$, the sign of its minimum $w$ has three meanings. A positive minimum is a finite outer turn and permits the next cycle. A negative minimum in the rigorously controlled extended comparison, with an error smaller than its margin and all preceding minima positive, forces an earlier transverse approach to $w=0$ at a finite limiting angle with $u>0$. That boundary is infinite physical radius, not a finite-time point on the actual path. The finite positive limiting angular scale then gives a positive limiting radial speed; equivalently the account becomes positive at some earlier finite time, where the admitted tail theorem applies. Exact zero corresponds to the grazing possibility and requires an exact argument to certify zero terminal speed.

The output contract is therefore an interval for the preceding candidate minimum and an interval for the following candidate minimum, with all earlier minima excluded from grazing by a proved margin. A strictly positive preceding interval and strictly negative following interval certify the positive branch. An interval meeting zero does not permit skipping to a later comparison cycle: the actual history may already end at parabolic infinity. In that case the result is unresolved and the calculation must tighten its finite errors or derive an exact critical identity. A small numerical account or long finite tail never proves the zero branch.

No scalar target evaluation is authorized by this specification. After the map theorem, preparation enclosure and decision contract are independently admitted, an exact/interval coefficient instrument and scalar evaluator may be proposed with separately recorded known controls. The complete source history remains the one fixed at launch throughout.

## Current missing inventory and handoff

The uncomputed objects are the eleven full rows $F_6$ through $F_{16}$; the fifteen rational rotation generators and inverse map; the three families of averaged coefficient polynomials; the original compatible-jet expansions and six-piece initial layer through degree fourteen; and the correlated slow solution with its grazing-section intervals. The exact recursion, domains, known controls and error targets above specify their consumer and acceptance meaning. None is a request to evolve $\epsilon^{-9}$ physical cycles.

The first falsifiers are failure of graded polynomial closure, a rotation-normal-form sign error, a generator leaving its domain, loss of the actual cubic seed in coordinate matching, an initial-layer residual exceeding (7), or an omitted slow resonance or final grazing ambiguity. No target computation, large scalar evaluation, changed preparation, smoother history, physical-energy premise, Python process, detached job or Git mutation was used. The actual terminal branch remains open until the signed output contract is met.
