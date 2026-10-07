# Independent review of wake-speed tangency

## Verdict and premises

**Derived and accepted without mathematical repair.** The [frozen tangency subject](overnight2-b-wake-speed-tangency.md) correctly derives the recent-gap Taylor coefficient, the necessary curvature inequality at an above-wake unit-speed contact, the plateau exclusion, the stated constant-radius restrictions and the closed cosine equality exclusion. In the final equality case, the sixth-order coefficient simplifies exactly to $-1/126000$.

The accepted premise is the [independently reconstructed wake-speed sign theorem](overnight2-b-independent-wake-speed-crossing.md). For each member on a connected exact reception interval, that theorem supplies a locally uniform recent-self-root gap and a constant sign $\sigma\in\{-1,+1\}$ of the gap at sufficiently small positive delay. At strict speeds above or below one, the sign equals the strict speed side. The theorem requires complete paths, finitely many members, collision-free simultaneous positions, a locally uniform finite complete-past causal-delay bound, every positive-delay root ordinary, inclusion of all self and partner roots, positive self polarity, the absolute source divisor and a well-defined finite exact canonical acceleration sum. Here $K=c_f=1$. No event prescription, speed ceiling, omitted-root rule or regularized divergent sum is introduced.

The derivative argument additionally requires $C^3$ path regularity locally at the contact and on the short past segment used in Taylor's theorem. The underlying exact-history theorem retains its complete-history and interval assumptions. Bounded complete past positions are sufficient for the remote-root hypothesis. A finite inspected lookback without a complete-past exclusion would not be sufficient. This tangency argument does not use the stronger negative-remote-gap premise needed for parity formulas; the accepted recent-gap sign theorem and its locally uniform cutoff are its relevant dependencies.

The Ramon E. Moore role is an analytical lens under the Specialist charter, not mathematical authority. All conclusions below are necessary conditions or exclusions within the selected ordinary canonical domain, not exact-solution or stability claims.

## Independent short-delay expansion

Use physical absolute time in this general calculation. At a fixed reception $t_0$, let $v=\dot X(t_0)$, $a=\ddot X(t_0)$, $j=X^{(3)}(t_0)$ and $S(t)=|\dot X(t)|^2$. For physical delay $\delta>0$, $C^3$ Taylor expansion gives

$$
X(t_0)-X(t_0-\delta)
=\delta v-\frac{\delta^2}{2}a+\frac{\delta^3}{6}j+o(\delta^3).
$$

Dividing by $\delta$ and squaring yields

$$
\frac{|X(t_0)-X(t_0-\delta)|^2}{\delta^2}-1
=|v|^2-1-\delta\,v\cdot a
+\delta^2\left(\frac{|a|^2}{4}+\frac{v\cdot j}{3}\right)+o(\delta^2).
$$

The remainder remains $o(\delta^2)$ because the constant, linear and quadratic vector coefficients are bounded at the fixed reception. Since

$$
S'=2v\cdot a,\qquad S''=2|a|^2+2v\cdot j,
$$

the quadratic coefficient is

$$
\frac{|a|^2}{4}+\frac{v\cdot j}{3}
=\frac{S''}{6}-\frac{|a|^2}{12}
=\frac{2S''-|a|^2}{12}.
$$

Thus the stated normalized recent gap is

$$
F(t_0,\delta)=S-1-\frac{S'}2\delta
+\frac{2S''-|a|^2}{12}\delta^2+o(\delta^2).
$$

The derivative order, signs and coefficient follow directly from the past-directed chord. Reversing that time direction would change the linear term, so it must not be inferred from a forward chord without this check.

## Contact inequality and plateau

Suppose $t_0$ is an interior reception with $S(t_0)=1$ and the same connected exact interval contains some strict above-wake reception. The accepted sign theorem gives $\sigma=+1$ throughout and rules out every strict below-wake speed there. Hence $S\ge1$ in the interval, $S$ has a local minimum at $t_0$, and $S'(t_0)=0$. At that reception $F(t_0,\delta)>0$ for every sufficiently small positive $\delta$. Dividing the expansion by $\delta^2$ and taking the limit gives

$$
2S''(t_0)-|a(t_0)|^2\ge0.
$$

The weak inequality is necessary: a positive function divided by $\delta^2$ can tend to zero. Equality therefore cannot be treated as acceptance or as a strict exclusion without additional information. Higher-order behavior must still agree with the required positive recent-gap sign.

If the connected interval instead contains a strict below-wake reception, the contact is a local maximum, $S'=0$, $S''\le0$, and $\sigma=-1$. The same expansion gives $2S''-|a|^2\le0$, already implied by $S''\le0$. No symmetric lower bound on contact acceleration follows from this leading coefficient.

A connected exact interval containing a strict above-wake reception cannot contain an open unit-speed plateau. Choose a reception in the plateau with a sufficiently short past segment lying wholly in it. Triangle inequality gives

$$
|X(t)-X(t-\delta)|
\le\int_{t-\delta}^t|\dot X(s)|\,ds=\delta,
$$

so $F(t,\delta)\le0$. This contradicts the positive recent-gap sign. Equality would also be a root inside the accepted root-free recent interval. The argument does not need a nonzero Taylor coefficient and excludes even a locally straight unit-speed plateau. It does not exclude isolated contacts or arbitrary closed contact sets. An entirely unit-speed exact interval with no strict above-wake reception is not covered by this plateau conclusion merely by being a plateau.

The interior-contact condition matters: at an endpoint of an exact interval, $S'=0$ need not follow from a one-sided speed constraint. No endpoint curvature statement is inferred without the corresponding additional hypothesis.

## Constant-radius six-member consequences and time scaling

Now use normalized time $\tau=t/R$ for the selected six-member paths

$$
X_\ell(t)=R\bigl(\cos(\tau+\ell\pi/3),\sin(\tau+\ell\pi/3),(-1)^\ell z(\tau)\bigr),\qquad R>0.
$$

Dots on $z$ in this section mean normalized-time derivatives. Physical velocity is the normalized path derivative, so $S=1+\dot z^2$. Physical acceleration is the second normalized derivative divided by $R$, giving

$$
|a|^2=\frac{1+\ddot z^2}{R^2},\qquad
\frac{dS}{dt}=\frac{2\dot z\ddot z}{R},\qquad
\frac{d^2S}{dt^2}=\frac{2\ddot z^2+2\dot z z^{(3)}}{R^2}.
$$

If $z$ is nonconstant on the same connected interval, the mean-value theorem supplies a reception with $\dot z\ne0$, hence a strict above-wake reception. At an interior axial turn $\dot z=0$,

$$
2S''-|a|^2=\frac{3\ddot z^2-1}{R^2}.
$$

The necessary contact inequality is therefore exactly

$$
|\ddot z|\ge\frac1{\sqrt3}.
$$

All factors of $R$ cancel correctly. In particular, an axial turn with both $\dot z=0$ and $\ddot z=0$ is excluded. The test is tied to unit normalized radius and planar rate $\beta=1$; it cannot be transferred unchanged to another radius or rate.

A complete periodic nonconstant $C^3$ height has a maximum and minimum, and therefore turning receptions. If its whole history is required exact and ordinary, those turns and a strict above-wake reception lie in the same connected exact interval. A uniform bound $\|\ddot z\|_\infty<1/\sqrt3$ then excludes it at every scale. More generally one interior turn violating the bound suffices. Nonconstancy only outside the exact interval would not supply the required above-wake reception within that interval. A constant height is outside this nonconstant-profile inference.

For constant planar rate $0<\beta<1$, still at unit normalized radius, physical speed satisfies $S=\beta^2+\dot z^2$. A complete periodic nonconstant height has a turn with speed $\beta<1$. If the entire history is ordinary and exact on a connected reception interval containing that turn and all receptions under consideration, the accepted sign theorem prohibits any strict speed above one. Thus

$$
\beta^2+\dot z(\tau)^2\le1,\qquad
\|\dot z\|_\infty\le\sqrt{1-\beta^2}
$$

for the whole-history application. Equality is allowed by this particular necessary condition. This is a derived restriction for this constant-radius class with an axial turn, not a ceiling postulated for the canonical law or for arbitrary coupled profiles.

## Independent cosine equality calculation

Take $z(\tau)=H\cos(\kappa\tau)$ with $H,\kappa>0$ and $\beta=1$. These complete paths are bounded and simultaneously collision-free at every fixed $R>0$. Axial turns have $|\ddot z|=H\kappa^2$, so a strict inequality $H\kappa^2<1/\sqrt3$ excludes every scale under the ordinary exactness hypotheses. Nonconstant height supplies strict above-wake receptions elsewhere.

At a height maximum, use normalized delay $d=\delta/R$. The self chord has planar squared length $2(1-\cos d)$ and axial difference $H(1-\cos\kappa d)$. Hence

$$
F(d)=\frac{2(1-\cos d)+H^2(1-\cos\kappa d)^2}{d^2}-1.
$$

This expression equals the physical normalized gap; only its delay coordinate has been rescaled. Direct even-power multiplication gives

$$
2(1-\cos d)=d^2-\frac{d^4}{12}+\frac{d^6}{360}-\frac{d^8}{20160}+O(d^{10}),
$$

$$
(1-\cos x)^2
=\frac{x^4}{4}-\frac{x^6}{24}
+\left(\frac1{576}+\frac1{720}\right)x^8+O(x^{10})
=\frac{x^4}{4}-\frac{x^6}{24}+\frac{x^8}{320}+O(x^{10}).
$$

After substitution and division by $d^2$,

$$
F(d)=\left(-\frac1{12}+\frac{H^2\kappa^4}{4}\right)d^2
+\left(\frac1{360}-\frac{H^2\kappa^6}{24}\right)d^4
+\left(-\frac1{20160}+\frac{H^2\kappa^8}{320}\right)d^6+O(d^8).
$$

On $H^2\kappa^4=1/3$, the quadratic coefficient vanishes and the quartic coefficient is $(1-5\kappa^2)/360$. If $\kappa^2>1/5$, it is strictly negative and dominates the higher-order terms at sufficiently small positive delay, contradicting the required positive recent-gap sign.

At $\kappa^2=1/5$, the quartic term also vanishes. The sixth-order coefficient becomes

$$
-\frac1{20160}+\frac1{24000}
=-\frac1{126000}<0.
$$

For example, the common denominator $504000$ gives $(-25+21)/504000=-1/126000$. The analytic cosine remainder is $O(d^8)$, so the negative sixth-order coefficient rigorously gives $F(d)<0$ for all sufficiently small positive $d$. The endpoint is excluded, not unresolved.

Consequently the entire closed equality portion

$$
H\kappa^2=1/\sqrt3,\qquad \kappa\ge1/\sqrt5
$$

is excluded at every positive scale. At a height minimum the axial chord changes sign but has the same square, so the same expansion applies. When equality holds with $\kappa<1/\sqrt5$, the quartic coefficient is positive; when $H\kappa^2>1/\sqrt3$, the quadratic coefficient is positive. In either case this specific local turning test is consistent with the necessary recent-gap sign and gives no existence, complete-chart, balance or stability result.

## Scope, falsifiers and preservation

The contact inequality would be refuted by an everywhere-ordinary finite exact history satisfying all complete-history assumptions, containing a strict above-wake reception and an interior unit-speed contact on the same connected interval, but with $2S''<|a|^2$ there. A negative or vanishing recent gap in such an above-wake exact component would refute the accepted sign dependency. A wrong time-scaling factor would defeat the normalized turning threshold. An incorrect even-power coefficient or remainder order would defeat the cosine equality exclusion; the explicit multiplication and endpoint rational simplification above expose those checks.

Loss of ordinariness, omitted roots, a divergent sum, collision, absent complete-past cutoff, insufficient $C^3$ regularity for the derivative claim, or separation of the contact and strict speed into different exact intervals leaves the theorem's stated domain. No singular continuation is selected to handle those cases. No claim is made that the remaining parameters have an exact solution or a stable history, and no numerical root coverage is inferred from this local sign calculation.

Scoped validation consists of reading the frozen subject in full and independently deriving every Taylor coefficient, derivative identity, scaling factor, sign implication and rational equality above against the accepted unchanged recent-gap theorem. This is analytical evidence; no numerical instrument, target, CPU allocation or new runtime receipt was needed. Native `shasum -a 256` identifies the frozen subject as `1466f72e85fbd1372b43f9f41f62eba52a65cb91927c788249ab93051997a070`; final hashing confirms that identity and identifies this report. Native `git diff --no-index --check /dev/null` is the scoped whitespace check on this new file; exit one without diagnostics denotes the new-file difference.

Only this new report was authored. The subject, accepted dependencies, prior reports, instruments, receipts, shared owners, corpus and parent account remain unchanged by this review. No Git mutation, generator, delegation, other-chat message, evidence deletion or relocation occurred. Retained local evidence remains in place; no archive-recovery or remote-backup claim is made. Parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md) is the remaining disposition step. This bounded review is complete.
