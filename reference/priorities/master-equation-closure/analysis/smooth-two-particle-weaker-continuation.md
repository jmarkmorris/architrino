# Continuous velocity at the first wake-speed event

## Scope and claim level

The [accepted first-event certificate](../lattice-research/analysis/smooth-two-particle-next-event-independent-adjudication.md) gives an actual first global wake-speed event at $87/16<t_*\le351/64$ for the supplied two-target lattice history, with coupling $g=16$ and normalized wake speed $c_f=1$. Both selected targets are still rising, every two distinct identities remain separated, and every possible first-event identity has $v_*\cdot a_*>1.4630814180$. The earlier [curved-path theorem](smooth-two-particle-next-event-root-birth.md) excludes a $C^3$ continuation of that solution.

**Claim grade: derived and [independently accepted](smooth-two-particle-weaker-continuation-independent-adjudication.md).** The obstruction also excludes a continuation with continuously differentiable position and velocity absolutely continuous on every compact interval strictly after the event, satisfying the complete unchanged causal-root acceleration equation almost everywhere. Acceleration need not be bounded, continuous or assumed integrable at the endpoint. This includes, and is stronger than, exclusion of velocity absolutely continuous across the event. The population application retains a local uniform displacement neighborhood and the accepted stationary summation prescription. It does not cover arbitrary pointwise continuations of infinitely many paths that abandon every uniform neighborhood, discontinuous velocity updates, or an unspecified distributional replacement for the causal-root equation.

The argument has two parts. The equation first forces a simple positive-delay root emitted before the event, even without a future acceleration limit. A positive projection of its acceleration then has an infinite integral. Integrating the equation away from the endpoint and taking a continuous velocity limit would instead make that integral finite. No Taylor expansion of the future trajectory is used.

## 1. The precise weaker solution class

Translate the event to time zero and focus on any one identity first reaching wake speed. Write $X$ for its position, $v=X'$ for its velocity, and $e=v(0)$ for its unit endpoint velocity. The incoming history is fixed. It satisfies

$$
|e|=1,\qquad |v(s)|<1\quad(s<0),
\qquad \lim_{s\uparrow0}v'(s)=a_*,
\qquad e\cdot a_*=\alpha>0.
\tag{1}
$$

The sufficiently distant incoming past is stationary. The established incoming solution supplies the one-sided acceleration limit in (1); the hypothetical outgoing path is not assumed to have one.

Consider an extension to $[0,h]$ satisfying the following conditions:

1. $X$ is $C^1$ across zero, and $v$ is absolutely continuous on every $[a,b]\subset(0,h]$. Thus $v(t)\to e$ as $t\downarrow0$, and $v(b)-v(a)=\int_a^b v'(u)\,du$ for $0<a<b\le h$. No integrability at zero is assumed. Absolute continuity on all of $[0,h]$ is a sufficient stronger hypothesis.
2. The sum $R(t)$ of all cross-identity acceleration contributions is continuous at zero and on a sufficiently small right interval, with $e\cdot R(0)=\alpha>0$. It is the actual cross contribution of the same equation, not an independently adjustable remainder.
3. Almost everywhere on that interval, every admitted positive self root is retained with the canonical row, and the complete equation is defined as a finite vector acceleration:

$$
a(t)=R(t)+S(t),\qquad
S(t)=\sum_{s<t:\,|X(t)-X(s)|=t-s}
\frac{g\,n(t,s)}{(t-s)^2|1-n(t,s)\cdot v(s)|},
\qquad
n(t,s)=\frac{X(t)-X(s)}{t-s}.
\tag{2}
$$

Equation (2) uses the [canonical per-hit acceleration and full root sum](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) where its roots and row sum have their ordinary meaning. The diagonal $s=t$ remains excluded. A non-simple root at an exceptional reception is not assigned a new finite value. A continuation satisfying the ordinary equation almost everywhere may omit that null set from its equality requirement; it may not discard a simple positive root on an interval. If a positive-measure set of receptions has no defined full row sum, condition 3 already fails.

For an infinite collection of simple self roots, condition 3 requires an actual convergent row sum, or equivalently for the argument below its ordinary positive projected sum. No finite root-count bound, common transmitter-denominator floor, or assumption that every other recent root stays simple at every reception is used.

## 2. All possible self rows point forward

Define the self residual

$$
F(t,s)=|X(t)-X(s)|-(t-s),\qquad s<t.
\tag{3}
$$

At the event, every earlier chord is strictly subunit:

$$
F(0,s)\le\int_s^0|v(u)|\,du+s<0
\qquad(s<0).
\tag{4}
$$

For any fixed $\eta>0$, the compact part of the past bounded away from zero therefore has a strictly negative residual margin. Since the remote past is stationary and $X(t)$ stays bounded near zero, $F(t,s)$ is uniformly negative for all sufficiently negative $s$. Continuity preserves the compact negative margin for small positive $t$. Consequently every positive self root at sufficiently small receptions has its emission time $s> -\eta$. This statement covers all self roots, including possible roots emitted after zero.

Choose $\eta$ and then the reception interval so that $|v(u)-e|<1/2$ on every possible self chord. At a root, the range equals the delay, so

$$
n(t,s)=\frac1{t-s}\int_s^t v(u)\,du,
\qquad
e\cdot n(t,s)>\frac12.
\tag{5}
$$

The same-label polarity is positive. Every defined self row therefore has a positive component along $e$. Any ordinary convergent sum retains the inequality for each individual term; an infinite positive projection cannot be cancelled by rearranging those rows. If it diverges on a set of positive measure, it is incompatible with condition 3 directly.

## 3. The equation forces a pre-event emission root

Shrink the interval so that $e\cdot R(t)\ge\alpha/2$. Projecting (2) and using (5) gives

$$
e\cdot a(t)\ge\frac\alpha2
\quad\hbox{almost everywhere}.
\tag{6}
$$

For $0<a<t$, integrate (6) on $[a,t]$, where absolute continuity is assumed. Taking $a\downarrow0$ and using $v(a)\to e$ gives the first inequality below. Integrating that inequality for the continuous position derivative gives the second:

$$
e\cdot v(t)\ge1+\frac\alpha2t,
\qquad
e\cdot[X(t)-X(0)]\ge t+\frac\alpha4t^2.
\tag{7}
$$

Thus $F(t,0)>0$ for every sufficiently small $t>0$. On the other hand, choose one fixed $s_0<0$ close to zero. Equation (4) and continuity give $F(t,s_0)<0$ on a sufficiently small reception interval. There is a root with $s_0<s(t)<0$.

It is the unique root with negative emission time. Indeed, for $s_1<s_2\le0$, the reverse triangle inequality gives

$$
F(t,s_2)-F(t,s_1)
\ge(s_2-s_1)-\int_{s_1}^{s_2}|v(u)|\,du>0.
\tag{8}
$$

At this root the range is positive and

$$
D(t)=1-n(t,s(t))\cdot v(s(t))
\ge1-|v(s(t))|>0.
\tag{9}
$$

The implicit-function theorem applies on each compact subinterval of positive reception times. Uniqueness joins these local graphs into one $C^1$ graph $s(t)<0$. Localization from §2 gives $s(t)\to0$ as $t\downarrow0$. Its positive delay

$$
\delta(t)=t-s(t)
\tag{10}
$$

therefore tends to zero. This root exists on every sufficiently small positive reception, whether or not the outgoing path has other self roots. Its transmitter velocity belongs to the already fixed smooth incoming history.

## 4. Contradiction from reciprocal-delay variation

Differentiate (3) on the selected simple graph. At a root,

$$
F_s=D,
\qquad F_t=n\cdot v(t)-1,
\qquad
\delta'(t)=\frac{n\cdot[v(t)-v(s(t))]}{D}.
\tag{11}
$$

Choose a finite bound $M$ for $|v|$ on the short chord neighborhood; $C^1$ continuity supplies it. The selected row has magnitude $g/(\delta^2D)$, so

$$
\left|\frac{d}{dt}\frac1\delta\right|
=\frac{|n\cdot[v(t)-v(s(t))]|}{\delta^2D}
\le\frac{2M}{g}\left|A_{\rm selected}(t)\right|.
\tag{12}
$$

By (5), every other defined self row has nonnegative $e$ projection. At almost every reception,

$$
\frac12|A_{\rm selected}(t)|
\le e\cdot S(t)
=e\cdot a(t)-e\cdot R(t).
\tag{13}
$$

Fix $b>0$ in the interval. Absolute continuity is available on every $[t,b]$ with $t>0$, so (12)–(13) give

$$
\left|\frac1{\delta(t)}-\frac1{\delta(b)}\right|
\le\frac{4M}{g}\left[
e\cdot v(b)-e\cdot v(t)-\int_t^b e\cdot R(u)\,du
\right]
\le C_b<\infty.
\tag{14}
$$

The bracket is nonnegative by (13) and has a finite limit as $t\downarrow0$, because velocity is continuous and $R$ is bounded. But $\delta(t)\to0$, so the left side is unbounded. This contradiction proves nonexistence in the stated class. No sign of $\delta'$ is assumed; the variation estimate includes delay reversals. No future Taylor expansion, acceleration bound, endpoint integrability or uniform root-count assumption enters the proof.

In fact the positive cone would force endpoint integrability if a solution existed. Summing (5) gives $|S|\le\sum|A_s|\le2e\cdot S$. The integral of $e\cdot S$ on $[t,b]$ is the finite bracket in (14), uniformly as $t\downarrow0$. Hence $S$ and then $a=R+S$ would belong to $L^1([0,b])$, and the continuous limit of the integrated equation would make $v$ absolutely continuous across zero. This consequence is not an extra premise of the contradiction.

The exact identity and one-graph estimate in (11)–(14) are also independently derived in the [accepted self-delay assessment](mec-008-self-delay-independent-adjudication.md#independent-reciprocal-delay-derivation). That assessment's additional hypotheses for a uniform floor across arbitrary different branches are unnecessary here: §3 constructs one particular graph connecting every small positive reception to the zero-delay endpoint.

## 5. A direct nonintegrable lower bound

For the present incoming history, a second derivation gives an explicit lower growth rate without differentiating the root graph. The one-sided expansion in (1) implies

$$
|X(0)-X(-u)|
=u-\frac\alpha2u^2+o(u^2)
\le u-cu^2
\qquad(0<u<u_0)
\tag{15}
$$

for some fixed $c>0$. This expansion uses only the already established incoming acceleration limit. Choose $M>1$ bounding the candidate's outgoing speed. At the selected root $s=-u(t)<0$, the triangle inequality and (15) give

$$
t+u=|X(t)-X(-u)|
\le Mt+u-cu^2,
\qquad
u^2\le\frac{M-1}{c}\,t.
\tag{16}
$$

For $0<t\le h$ it follows that

$$
\delta(t)^2=(t+u)^2
\le2t^2+2u^2
\le C t,
\qquad C=2h+\frac{2(M-1)}c.
\tag{17}
$$

The source is pre-event and strictly subunit, so $0<D<2$. Together with $e\cdot n>1/2$,

$$
e\cdot A_{\rm selected}(t)
=\frac{g\,e\cdot n}{\delta(t)^2D(t)}
\ge\frac{g}{4Ct}.
\tag{18}
$$

Its integral diverges logarithmically. All other self rows point into the same cone and the cross term is bounded. Integrating (18) on $[a,b]$ would make the projected velocity change grow at least as $[g/(4C)]\log(b/a)$, whereas the continuous endpoint velocity gives a finite limit as $a\downarrow0$. This is the same contradiction without differentiating the root graph. The estimate is deliberately weaker than the former $t^{-3}$ asymptotic: it applies without prescribing any outgoing acceleration regularity at the event.

### A non-smooth comparison that distinguishes the arguments

Consider a local collinear prescribed path, solely as an algebraic control,

$$
X(t)=\begin{cases}
(t+t^2)e,&t\le0,\\
(t+t^{3/2})e,&t\ge0.
\end{cases}
\tag{19}
$$

It has continuous velocity and integrable outgoing acceleration $3e/(4\sqrt t)$, but no finite outgoing acceleration limit. Its pre-event root is exactly $s=-t^{3/4}$ for small $t>0$. Thus

$$
\delta=t+t^{3/4},\qquad
D=2t^{3/4},\qquad
A_{\rm selected}=\frac{g\,e}{2t^{3/4}(t+t^{3/4})^2}.
\tag{20}
$$

The root does not have the smooth-extension scaling $\delta\sim2t$. Its acceleration row is nevertheless nonintegrable, with leading size $g t^{-9/4}/2$. Hence (19) cannot satisfy the unchanged equation with a bounded cross contribution. This example checks the logical distinction between a weak candidate trajectory and a solution; it is not a new preparation or a trajectory of the lattice experiment.

## 6. Application to the certified lattice endpoint

The incoming certificate proves that every label has speed below one before $t_*$ and that each possible first-event identity satisfies $v_*\cdot a_*>1.4630814180$. Before the event its positive self-root set is empty. The full incoming acceleration equals the cross field there, so $e\cdot R(0)=\alpha>0$ for every possible first identity. The argument does not require selecting which of the twelve candidate identities arrives first, and simultaneous first arrivals cause no additional term in the proof.

The population has an infinite stationary background. To obtain condition 2 for a proposed continuation, retain the same grouped stationary sum and require local uniform continuity of its displacements in the supremum norm. The endpoint bound $\sup_i|y_i(t_*)|<0.265391$ then supplies a right neighborhood with

$$
\sup_i|y_i(t)|<B=\frac7{20}<\frac12.
\tag{21}
$$

The whole accepted earlier history also lies inside this ball. For different lattice anchors $i\ne j$, every candidate cross range involving these histories is at least $1-2B=3/10$. Receptions within $3/20$ of $t_*$ therefore cannot sample any emission later than $t_*-3/20$. All cross contributions use fixed pre-event histories. On their finite nonstationary support, strict subunit speed and compactness give a common transmitter margin. The unchanged grouped stationary contribution is regular in the ball (21). Consequently $R(t,X_i(t))$ is continuous and bounded, and its projection remains positive after shrinking the interval.

This argument needs no uniform outgoing velocity bound over infinitely many identities and does not assume a future finite disturbed population. It does need a common local position neighborhood; continuity of each individual path, without a uniform topology, does not imply (21). An alleged continuation that sends more distant labels arbitrarily far in every positive time interval falls outside this application and has not been shown to define the same convergent population equation.

Thus no continuation in this uniform population neighborhood can preserve continuously differentiable positions, velocities absolutely continuous on compact intervals after the event, and the literal full causal-root equation almost everywhere. The former $C^3$ assumption is not responsible for the obstruction. Allowing unbounded acceleration, with or without assumed endpoint integrability, does not remove it while velocity retains a finite continuous endpoint. The supplied complete past, coupling, polarity, wake speed, causal-root weights and stationary summation are unchanged.

## 7. An everywhere classical corollary without absolute continuity

There is a second exclusion class that need not assume absolute continuity. Suppose $X$ is $C^1$ across the endpoint, twice differentiable at every positive reception, and satisfies the complete ordinary equation (2) at every such reception in a right interval. Retain the same cross-field and incoming-history assumptions.

Writing $p=e\cdot v$, the cone argument gives $p'(t)\ge\alpha/2$ everywhere. The mean value theorem applied to $p(t)-\alpha t/2$ on compact positive intervals, followed by the continuous endpoint limit, proves (7). Sections 3 and 5 therefore again provide the selected root and its bound $p'(t)\ge k/t$ for some $k>0$. Apply the mean value theorem to $p(t)-k\log t$ to obtain

$$
p(b)-p(a)\ge k\log(b/a),\qquad 0<a<b.
\tag{22}
$$

This contradicts the finite velocity limit as $a\downarrow0$. The proof uses an everywhere derivative inequality, not an unjustified integration of an arbitrary derivative. It therefore excludes such an everywhere classical outgoing solution even if absolute continuity was not part of its definition. An equation imposed only almost everywhere cannot use this corollary without a regularity condition such as that in §1.

## 8. What is not selected by this result

An ordinary integral solution with continuous velocity and an $L^1$ acceleration already has absolutely continuous velocity, and is excluded by the theorem. A velocity jump would add a singular acceleration measure and cannot be generated by an integrable ordinary acceleration row. A merely continuous velocity whose derivative exists almost everywhere need not equal the integral of that derivative; the omitted singular part would require its own equation. Imposing the ordinary row formula only on that derivative does not by itself specify a distributional dynamics.

A measure-valued or distributional formulation must define the singular causal-root contribution, its summation, and the event matching rule. No such formulation is adopted here. An arbitrary cancellation or deletion of the selected positive row would change the equation being investigated. Conversely, nonexistence in the stated class is not a proof that every conceivable generalized formulation is inconsistent.

## Review boundary and falsifiers

The theorem is a mathematical derivation from the canonical positive self-row weight, not a new numerical evolution or a constitutive approximation. The independent assessment checks localization of every self root, the positivity of the actual cross projection, the existence and simplicity of the selected pre-event graph, both integral contradictions, the population neighborhood and the everywhere classical corollary. The canonical source, earlier event certificate and self-delay references remain unchanged by this work.

An operator-checkable falsifier would be a joined path satisfying conditions 1–3 with the fixed incoming history, while its complete projected row sum is integrable and the selected root from §3 approaches zero delay. Such a path must violate either the exact identity (11), the cone estimate (13), or the incoming triangle estimate (16); it is not enough to display a different prescribed curve or to omit a row. For the lattice application, a missing cross source, loss of the prescribed stationary sum, or failure of the uniform position neighborhood would invalidate applicability rather than refute the single-path theorem.

## Development evidence

The analytical reference is the separately authored weaker-continuation adjudication linked above, together with the accepted one-graph reciprocal-delay identity. A new exact-rational geometry instrument, `weak_root_control.py`, first passed the known smooth control $X(t)=(t+t^2)e$, whose root $s=-t$ has exact delay $2t$, denominator $2t$ and row magnitude $2/t^3$ at $g=16$. Only then did it check (19)–(20) at four dyadic values $t=u^4$. The root, canonical row and reciprocal-delay derivative all matched their separately displayed formulas. This is an algebraic control on prescribed paths, not evidence that either path solves the lattice equation.

The instrument, known/target receipts and input manifest are retained under `.local-data/master-equation-closure/weaker-continuation/continuation/`. Its reproduction commands use the shared project venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-weaker/hale/weak_root_control.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-weaker/hale/weak_root_control.py target
```

No trajectory integration or long-running scientific computation was needed. The existing KaTeX/link checker passed its known controls before this document's target check. The current canonical Master Equation was read in its existing modified working state and was not edited; the input manifest identifies those consumed bytes separately from the frozen earlier event and self-delay proofs.
