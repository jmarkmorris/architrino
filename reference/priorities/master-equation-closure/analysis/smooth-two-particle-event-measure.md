# Does the history integral determine an instantaneous velocity change?

## Scope and present conclusion

The question concerns the [certified first global wake-speed event](../lattice-research/analysis/smooth-two-particle-next-event-independent-adjudication.md) of the same supplied two-target lattice history. The coupling remains $g=16$, the wake speed is $c_f=1$, and the stationary infinite sum keeps its original prescription. The event lies in $87/16<t_*\le351/64$, both targets are still rising, and the first identity remains unresolved among twelve possibilities. Every possible first identity has a unit incoming velocity $e$ and positive incoming acceleration projection $\alpha=e\cdot a_->1.4630814180$.

**Claim grade: derived and [independently accepted](smooth-two-particle-event-measure-independent-adjudication.md).** A direct positive-delay measure interpretation of the canonical history integral supplies no finite nonzero acceleration atom at this event. More strongly, no continuation with locally bounded-variation velocity satisfies the corresponding reception-time measure balance in the stated uniform lattice-position neighborhood. The obstruction includes a finite velocity jump and singular continuous velocity variation within that interpretation. It does not establish that the formal causal delta already defines a measure on every irregular path, and it does not rule out every varying-history regulator limit or every possible added event law.

The distinction is essential. The integral notation gives the ordinary canonical acceleration on simple positive-delay roots. Extending it by a positive measure carried by those same roots is one precise interpretation that can be tested. Obtaining a boundary atom from a sequence of different regulated paths is a different mathematical question. Neither a finite impulse nor its direction and magnitude follows merely from writing a Dirac delta in the history integral.

## 1. The canonical integral and its regular measure meaning

Translate the event to time zero. For one persistent identity define

$$
r(t,s)=|X(t)-X(s)|,\qquad F(t,s)=r(t,s)-(t-s),\qquad
\Omega=\{(t,s):s<t,\ r(t,s)>0\},
\qquad
\Gamma=\{(t,s)\in\Omega:F(t,s)=0\}.
\tag{1}
$$

Wherever $r>0$, define the geometric direction by the first equality below. Every point of $\Gamma$ has positive range $r=t-s$, giving the second equality on the root set:

$$
n(t,s)=\frac{X(t)-X(s)}{r(t,s)}
=\frac{X(t)-X(s)}{t-s}\quad\text{on }\Gamma.
\tag{2}
$$

The [canonical history integral](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation), in normalized units and restricted here to the same identity, formally reads

$$
A_{\rm self}(t)
=g\int_{s<t}\frac{n(t,s)}{r(t,s)^2}\,\delta\big(F(t,s)\big)\,ds.
\tag{3}
$$

On a smooth regular level-set chart, the two-time scalar measure corresponding to (3) is

$$
d\nu(t,s)=\frac{g}{r(t,s)^2}\,\delta(F(t,s))\,dt\,ds.
\tag{4}
$$

This formula means integration using arclength along the level set, divided by $|\nabla F|$ and multiplied by $g/r^2$. This is the regular coarea weight. On a chart with $F_s=D_t\ne0$, it has the unambiguous equivalent form

$$
d\nu(t,s(t))
=\frac{g}{(t-s(t))^2|D_t(t,s(t))|}\,dt,
\qquad D_t=1-n\cdot v(s(t)).
\tag{5}
$$

Integrating $n$ against this nonnegative scalar measure and mapping each pair $(t,s)$ to its reception time $t$ recovers the canonical vector acceleration measure. Positivity in (4) is specific to the same-identity polarity; the cross contribution retains its signed polarities.

The source-variable collapse (5) also applies when the receiver path is only Lipschitz and the selected source segment is smooth, with continuous nonzero $F_s$ on the chart. For each fixed reception the source root is simple, and integrating its canonical source weight in reception time gives (5). No global $C^1$ dependence on reception time is required for this chart agreement. These are the locally Lipschitz graphs used in the bounded-variation argument below.

At a point where the requisite level-set regularity fails, the symbolic expression $\delta(F)$ is not by itself a proved pullback distribution or a measure. The factor $r^{-2}$ introduces an additional problem as the excluded diagonal is approached. The following theorem therefore states its proposed interpretation explicitly, rather than assuming that (4) exists for arbitrary irregular histories.

## 2. A direct positive-delay measure class

Consider a hypothetical extension with continuous position $X$ and a possibly discontinuous velocity $v$ of bounded variation on a compact interval containing zero. Bounded variation means that the sum of velocity changes over arbitrary finite time partitions is bounded; its distributional derivative $Dv$ is a finite vector measure. This class permits ordinary acceleration, finite jumps and singular continuous changes. The position obeys

$$
X(t)-X(a)=\int_a^t v(u)\,du.
\tag{6}
$$

A bounded-variation velocity is bounded and has left and right traces, so $X$ is locally Lipschitz. Values assigned to $v$ at isolated points do not change (6). Let the incoming trace be $v(0-)=e$, where $|e|=1$, and retain the complete accepted past.

A **direct positive-delay interpretation** in this note means a nonnegative scalar Borel measure $\nu$ on $\Omega$ with the following properties:

1. It is carried by the exact incidence set $\Gamma$. The diagonal $(t,t)$ is outside its domain. There is no added measure on the diagonal or on an ideal boundary point representing vanishing delay.
2. On every simple chart whose emissions lie strictly in the fixed smooth pre-event history, it agrees with (5). In particular it retains every such positive root with its canonical weight.
3. Its vector direction is the geometric $n$ of (2), and its reception measure is

$$
\mu_{\rm self}(E)
=\int_{\Gamma\cap\{t\in E\}}n(t,s)\,d\nu(t,s).
\tag{7}
$$

The integral in (7) is an ordinary measure integral. Require finite positive scalar mass over compact reception windows near zero:

$$
\nu\big(\Gamma\cap\{t\in K\}\big)<\infty
\quad\text{for compact }K\text{ in the event neighborhood}.
\tag{8}
$$

Condition (8) gives locally finite reception-time total variation. Local finiteness only on compact subsets of the open two-time domain $\Omega$ would be insufficient: such sets stay away from the diagonal and can miss infinite mass accumulating toward it. Once the forward cone below has been proved, finite scalar mass and finite projected self mass are equivalent up to a fixed factor; cancellation cannot weaken (8) there.

Keep the actual complete cross contribution in the form $R(t)\,dt$, with $R$ bounded and continuous near zero and $e\cdot R(0)=\alpha>0$. The proposed measure equation is

$$
Dv=R(t)\,dt+\mu_{\rm self}.
\tag{9}
$$

These are interpretation hypotheses, not extra physical terms. The theorem tests whether even such an extension of the ordinary canonical integral can continue the certified history. It does not assign arbitrary weights to singular charts or claim uniqueness of a measure extension there.

## 3. The event fiber carries no direct atom

The incoming history is strictly subunit at every earlier time and stationary sufficiently far in the past. For every $s<0$,

$$
|X(0)-X(s)|\le\int_s^0|v(u)|\,du<-s.
\tag{10}
$$

Thus $\Gamma\cap\{t=0\}$ is empty. The definition (7) immediately gives

$$
\mu_{\rm self}(\{0\})=0.
\tag{11}
$$

The cross measure $R(t)\,dt$ also has zero atom. For a bounded-variation velocity, the atom of its derivative is its jump:

$$
Dv(\{0\})=v(0+)-v(0-).
\tag{12}
$$

Consequently (9) forces $v(0+)=v(0-)=e$. A direct positive-delay measure therefore cannot itself provide a finite nonzero instantaneous velocity change at the event, whatever finite outgoing velocity was proposed. This is a statement about the full measure equation, not merely about an equality of ordinary derivatives almost everywhere.

Equation (11) does not follow from the assertion that an acceleration density happens to vanish at one time. Densities can have zero value at a point while their weak limits acquire an atom there. Here the stronger fact is used: the measure lives on the strict positive-delay incidence set, and that set has an empty entire reception fiber at the event. A boundary measure not carried by that set would be additional data.

## 4. No direct measure continuation with bounded-variation velocity

### 4.1. All local self directions have one positive projection

Compact portions of the fixed incoming past bounded away from zero have a strictly negative residual margin in (10). The stationary remote past excludes arbitrarily old self roots uniformly for nearby receptions. Continuity of $X$ therefore confines every possible self root at sufficiently small positive receptions to emission times approaching zero.

By (12), both velocity traces at zero equal $e$. The defining trace property of bounded-variation functions implies that, after choosing an appropriate representative, $|v(u)-e|<1/2$ for all sufficiently small nonzero $u$; an almost-everywhere version suffices for the chord integral. On a self root,

$$
n(t,s)=\frac1{t-s}\int_s^t v(u)\,du,
\qquad e\cdot n(t,s)\ge\frac12.
\tag{13}
$$

Hence the projected self measure $e\cdot\mu_{\rm self}$ is nonnegative and dominates one half of the scalar reception pushforward of $\nu$. This conclusion is established after the event atom has forced matching traces; no forward-cone assumption is silently imposed on an arbitrary jump.

### 4.2. The measure equation forces an earlier-emission root

Shorten the interval so that $e\cdot R(t)\ge\alpha/2$. With $p=e\cdot v$, equation (9) gives the measure inequality

$$
Dp\ge\frac\alpha2\,dt.
\tag{14}
$$

It follows that the representative $p(t)-\alpha t/2$ is nondecreasing. Its right trace at zero is one, so $p(t)\ge1+\alpha t/2$ almost everywhere. Integrating (6) yields

$$
e\cdot[X(t)-X(0)]\ge t+\frac\alpha4t^2>t
\qquad(t>0).
\tag{15}
$$

Thus $F(t,0)>0$. For one fixed $s_0<0$, continuity preserves $F(t,s_0)<0$ at small receptions. Strictly subunit pre-event speed makes $F(t,s)$ strictly increasing for $s<0$, by the reverse triangle inequality. There is exactly one negative-emission root $s(t)\in(s_0,0)$, and

$$
D_t(t,s(t))\ge1-|v(s(t))|>0.
\tag{16}
$$

Its delay $\delta(t)=t-s(t)$ tends to zero. This root samples only the fixed smooth past. The outgoing velocity need not be continuous away from zero, and additional roots need not be classified to retain this one.

### 4.3. Lipschitz root geometry forces infinite positive mass

On every compact reception interval $[a,b]\subset(0,h)$ the selected root stays in a compact negative-emission interval and has a positive transmitter margin. The receiver position is Lipschitz. The implicit root is therefore locally Lipschitz: changing reception time changes $F$ by at most a constant times that change, while changing its source variable changes $F$ at a strictly positive rate. This elementary estimate bounds $|s(t_2)-s(t_1)|$ by a constant times $|t_2-t_1|$.

At almost every reception where these Lipschitz functions are differentiable, the causal equality gives

$$
\delta'(t)=\frac{n\cdot[v(t)-v(s(t))]}{D_t},
\qquad
\left|\left(\delta^{-1}\right)'\right|
\le\frac{2M}{g}\,\frac{g}{\delta^2D_t},
\tag{17}
$$

where $M$ bounds the incoming and outgoing velocities near zero. Agreement with the canonical simple chart, together with positivity of every other self contribution, now implies

$$
e\cdot\mu_{\rm self}([a,b])
\ge\frac12\int_a^b\frac{g}{\delta(t)^2D_t(t)}\,dt
\ge\frac{g}{4M}
\left|\frac1{\delta(a)}-\frac1{\delta(b)}\right|.
\tag{18}
$$

Hold $b>0$ fixed and let $a\downarrow0$. The right side diverges because $\delta(a)\to0$. The left side is bounded by the finite reception mass on $[0,b]$, contradicting (8). Equivalently, the finite measure $Dp-R(t)\,dt$ cannot have this infinite positive component.

**Derived conclusion.** No bounded-variation velocity continuation satisfies (6)–(9) with the fixed incoming history and positive continuous cross trace. The proof permits singular continuous velocity variation and arbitrary finite jumps before it derives their incompatibility. It does not use the outgoing Taylor expansion of the older $C^3$ theorem or assume that the outgoing acceleration has a Lebesgue density.

The [weaker-continuation theorem](smooth-two-particle-weaker-continuation.md) excludes the ordinary almost-everywhere equation with punctured absolute continuity. The present theorem is a different extension: its extra measure balance controls singular parts that an almost-everywhere derivative equality leaves undetermined. The [domain audit](smooth-two-particle-weaker-continuation-domain.md) explains that distinction and the separate ordinary-row obstruction to a finite strictly superunit right jump.

## 5. The lattice cross measure remains regular

The accepted endpoint has $\sup_i|y_i(t_*)|<0.265391$. As in the accepted weaker-continuation application, retain the same grouped stationary sum and a common local position neighborhood

$$
\sup_i|y_i(t)|<\frac7{20}.
\tag{19}
$$

Local continuity of the population displacement in the supremum norm supplies this neighborhood. The entire accepted earlier history also satisfies it. Different lattice anchors therefore have causal ranges at least $1-2(7/20)=3/10$. Receptions within $3/20$ after the event sample cross emissions at least $3/20$ before it. Those emissions belong to fixed earlier smooth, strictly subunit histories. Their nonstationary support is finite and their transmitter denominators retain positive margins; the stationary remainder is regular under its unchanged block prescription.

The complete cross contribution is consequently the continuous bounded density $R(t)\,dt$ used above, with trace equal to the incoming acceleration. This also covers simultaneous first-event labels. No uniform outgoing speed bound for the whole infinite population is required. Coordinatewise continuity without a common position neighborhood does not establish the conclusion, and no arbitrary infinite-population extension is claimed.

## 6. Fixed-path cutoffs do not manufacture a finite atom

Fix one proposed joined path and one direct nonnegative measure $\nu$ on its positive-delay incidence set. Removing a delay cutoff means restricting that same measure to larger subsets,

$$
\nu_\varepsilon
=\mathbf1_{\{t-s\ge\varepsilon\}}\nu,
\qquad \varepsilon\downarrow0.
\tag{20}
$$

These scalar measures increase setwise to $\nu$. Near the continuous event trace, the projected self measures also increase because of the cone (13). Each gives zero mass to the event fiber. There are two possibilities:

1. **The reception mass stays locally finite.** Monotone convergence gives the direct limit measure, whose event atom remains zero. The limit cannot instead acquire a nonzero atom merely because delay cutoffs were removed.
2. **The positive mass diverges in every sufficiently small fixed reception window.** The family has no finite positive Radon limit there. A compactly supported nonnegative test function equal to one on a smaller such window has integrals tending to infinity. Calling that divergence a finite impulse would require a subtraction, rescaling or changed interpretation.

If local finiteness fails, the empty fiber still does not turn the infinite neighborhood mass into a finite nonzero point mass. The obstruction in (18) is of this second kind for a purported measure-equation continuation. A bounded cross density cannot cancel its infinite positive projection.

This is a statement about nested restrictions of one fixed path measure. A numerical cutoff that changes the evolved history, the amplitude, the sign or the singular support is not (20). Nor is a signed finite-part subtraction of divergent self mass a positive cutoff exhaustion of the original measure.

For an explicit fixed-branch control, the local prescribed path $X(t)=(t+t^2)e$ has the simple self root $s=-t$, delay $2t$ and row magnitude $2/t^3$ when $g=16$. On that branch a delay cutoff $\delta\ge\varepsilon$ leaves the reception integral

$$
\int_{\varepsilon/2}^{b}\frac2{t^3}\,dt
=\frac4{\varepsilon^2}-\frac1{b^2}.
\tag{21}
$$

It diverges, rather than approaching a finite atom. This prescribed polynomial is a control of the one-branch integration formula, not the supplied lattice path or a solution of the full equation.

## 7. Varying-history limits are a separate problem

For contrast, even elementary nonnegative densities can converge weakly to an atom:

$$
\lambda_\varepsilon(dt)
=\frac1\varepsilon\mathbf1_{(0,\varepsilon)}(t)\,dt
\rightharpoonup\delta_0.
\tag{22}
$$

Every $\lambda_\varepsilon$ has zero mass at $\{0\}$, but for every continuous test function $\varphi$,

$$
\int\varphi\,d\lambda_\varepsilon
=\frac1\varepsilon\int_0^\varepsilon\varphi(t)\,dt
\longrightarrow\varphi(0).
\tag{23}
$$

The family changes its density and is not an increasing restriction of one fixed measure. This example shows why an argument using zero atoms separately at each cutoff does not settle every weak-limit question. It is a measure-theory control, not an Architrino trajectory or an adopted regulator.

A sequence of different regulated histories could in principle create a boundary defect measure in a weak limit even when their ordinary positive-delay measures have no individual atom. To establish a canonical finite jump that way, a new theorem would have to specify the approximating equations and histories, prove compactness and local mass control, identify the atom and its direction, show independence from the admissible approximation choices, and prove the limiting paths satisfy a declared event balance. No such sequence or limit is constructed here. The direct theorem neither supplies its atom nor rules it out solely because the direct event fiber is empty.

The canonical positive-range fold estimate is different again. With a fixed positive range floor, its local acceleration behaves at worst as $|t-t_c|^{-1/2}$, whose shrinking-window integral tends to zero. That finite integral allows continuous velocity; it does not furnish a nonzero atom. The range floor also fails at the self diagonal considered here.

## 8. Interpretation and falsifiers

Within the direct positive-delay measure class, the answer is definite: the history integral does not determine a finite instantaneous velocity change that continues the certified trajectory. Its event atom is zero, and imposing the full measure equation produces an infinite positive outgoing self contribution incompatible with finite velocity variation. This preserves the same history, coupling, polarity, geometric direction and positive transmitter weight.

The result is conditional on the explicit measure interpretation. It does not assert that every generalized distributional product is defined, that every varying-history regulator fails, or that every possible event law is impossible. Adding a diagonal measure, choosing a finite-part cancellation, or taking a history-changing weak limit requires a separate derivation and cannot be described as the already established direct integral without proving that identification.

The direct atom statement would be falsified by a nonzero pushforward mass at zero from a measure carried on the strict incidence set even though that set has an empty zero-time fiber. The continuation theorem would be falsified by a complete bounded-variation candidate satisfying (6)–(9) whose canonical pre-event-emission branch both approaches zero delay and has finite mass, contradicting (17)–(18). A counterexample to the cutoff claim must be nested positive restrictions of one fixed measure with locally finite reception mass; the varying-density family (22) deliberately does not satisfy that premise. A failure of the uniform lattice neighborhood or cross-field continuity invalidates the stated population application rather than establishing an atom.

## Development boundary

This investigation derives and tests a measure interpretation; it performs no physical simulation, chooses no regulator and adds no event update. The canonical history integral and the accepted event, weaker-continuation, domain and independent-assessment inputs remain frozen. The independent assessment verifies the empty-fiber argument, the precise reception-mass condition, the Lipschitz selected-root calculation, and the distinction between monotone fixed-path exhaustion and weak limits of changing measures.

The exact-rational instrument `measure_controls.py` passed two polynomial-integral known controls before its target use. It then checked (21), the first three moments of the changing-density family (22), and the vanishing shrinking-window mass of the positive-range fold control at six dyadic cutoffs. These checks distinguish their arithmetic behaviors; the analytical arguments establish their different limit meanings. The instrument and known/target receipts are retained under `.local-data/master-equation-closure/event-measure/continuation/` with an input manifest. Reproduction uses the shared project venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-event-measure/continuation/measure_controls.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-event-measure/continuation/measure_controls.py target
```

The current canonical integral was read without changing its existing working-tree edits. Previous theorem and reference bytes are consumed as inputs; no frozen proof, history, residual or numerical trajectory is modified by this measure investigation.
