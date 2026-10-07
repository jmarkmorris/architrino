# Delayed range and present separation near an approaching pair

## Question and preparation boundary

The original balance-0 endpoint observations concern pair 3,4 for seed 1 and pair 2,5 for seed 2. The [earlier approaching-pair account](overnight-d-ceiling-eight-member-2026-10-06.md#bounding-the-other-six-members-near-each-approaching-pair) bounds the other six acceleration contributions conditionally over a short interval. It leaves the close pair's own delayed geometry uncontrolled. This note isolates one necessary distinction: a small present separation and the unit-speed ceiling do not, by themselves, put a uniform upper bound on delayed range divided by present separation.

The derivations below use only Euclidean causal geometry with $c_f=1$, continuous positions and absolutely continuous source motion of speed at most one. They do not select another physical preparation or reuse a contact theorem from a different release. The exact one-dimensional paths below are controls for a geometric implication, not proposed solutions of the master equation. No new balance-0 trajectory has been evolved, and no actual coincidence or ordinary continuation is established. The [independent review](overnight2-d-approach-delay-independent-review.md) accepts this conditional component after the limiting-root endpoint qualification below.

## An exact identity and a sufficient directional condition

At reception time $t$, let an ordinary or geometric causal root have emission $s=t-R$, delayed range $R>0$ and delayed unit direction $n$ from source to receiver. Thus

$$
X_i(t)-X_j(s)=Rn,\qquad |n|=1.
$$

Write the present displacement and separation as $d=X_i(t)-X_j(t)$ and $r=|d|$. The source displacement over the delay gives the exact vector identity

$$
d=Rn-\int_s^t V_j(u)\,du.
$$

Taking the scalar product with the fixed delayed direction defines a mean directional deficit,

$$
\eta=\frac1R\int_s^t\bigl(1-n\cdot V_j(u)\bigr)\,du,
\qquad n\cdot d=R\eta.
$$

The direction $n$ is fixed at this root while the integral ranges over the source path. Since $|V_j|\le1$, the integrand is nonnegative and $0\le\eta\le2$. In particular $n\cdot d\ge0$. A verified lower bound $\eta\ge\eta_*>0$ implies

$$
R\le\frac{r}{\eta_*}.
$$

This is a sufficient history-dependent condition for the desired range comparison. A uniform source-speed bound $|V_j|\le1-\delta$ is one way to obtain $\eta_* =\delta$, but it is unnecessary: a unit-speed source whose direction stays uniformly away from $n$ also has positive deficit. It is the complete average over $[s,t]$, rather than speed saturation alone, that enters the identity.

For reference, Cauchy–Schwarz and $|n-V_j|^2\le2(1-n\cdot V_j)$ also give

$$
r^2\le R\int_s^t|n-V_j(u)|^2\,du\le2R^2\eta.
$$

This lower bound on $\eta$ still contains $r/R$ and therefore cannot supply an independent positive constant. Conversely $r\le2R$ gives the universal lower bound $R\ge r/2$. Neither inequality reverses into a uniform upper bound for $R/r$.

The ordinary transmitter factor at emission is $D_s=1-n\cdot V_j(s)$. It is a pointwise value, not this average. If a separately established source-velocity Lipschitz constant $M$ holds on the whole delay interval, then

$$
\eta\ge D_s-\frac{MR}{2}.
$$

Indeed $n\cdot[V_j(u)-V_j(s)]\le M(u-s)$ and integration gives the expression. This sufficient bound is useful only when its right side is strictly positive. Substituting a sampled acceleration maximum, omitting part of the delay interval, or replacing $\eta$ by $D_s$ without a variation allowance would leave the implication unjustified.

## Exact failure of an upper range bound from the ceiling alone

Fix $a>0$. Let a source have complete position $X_j(u)=0$ for $u\le0$ and $X_j(u)=u$ for $u\ge0$. Let the receiver position be $X_i(t)=a-t$ for $0\le t<a/2$. Both paths satisfy the unit-speed bound and their positions are continuous. Their present separation is $r=a-2t>0$.

A nonnegative source time would require

$$
t-s=|a-t-s|.
$$

For $0\le s\le t<a/2$, the expression inside the absolute value is positive, so this equation would require $2t=a$, which is false. The complete root instead lies in the stationary negative branch:

$$
s=2t-a=-r<0,\qquad R=t-s=a-t.
$$

It is ordinary there, with source factor $D_s=1$, and unique. As $t$ approaches $a/2$ from below,

$$
\frac{R}{r}=\frac{a-t}{a-2t}\longrightarrow\infty.
$$

Thus the speed ceiling, decreasing present separation, uniqueness and even a positive pointwise transmitter factor do not imply a preparation-independent finite upper bound for $R/r$. The exact mean deficit is $\eta=r/R$, since only the negative stationary part of the source interval contributes. At $t=a/2$, every $0<s<t$ is a positive-delay root on the unit-speed positive branch, with $D_s=0$. The scalar causal equality also holds at $s=0$, the original velocity-jump trace point, and at $s=t$, where $R=0$ lies outside the present positive-range direction chart. This last geometric observation does not prescribe passage through the resulting nonordinary set.

For a rational known case, choose $a=2$, $t=3/4$. Then $r=1/2$, $s=-1/2$, $R=5/4$, $D_s=1$, $\eta=2/5$ and $R/r=5/2$. More generally $t=1-1/n$ for integer $n>1$ gives $r=2/n$, $R=1+1/n$ and $R/r=(n+1)/2$. These exact values test the implication directly; they are not measurements of an original release.

## What the retained original endpoints do and do not show

A native JSON inspection of the retained independent snapshot outputs, after a known ordered-pair selection control, gives the following nominal observations. Delayed ranges equal delays because $c_f=1$.

| Original preparation and direction | Present separation | Delayed range | Ratio $R/r$ | Emission factor $D_s$ |
| --- | ---: | ---: | ---: | ---: |
| Balance 0 seed 1, receiver 3 from 4 | 0.0019901226754228726 | 0.0025778351963055 | 1.2953147201127926 | 0.8812072062889691 |
| Balance 0 seed 1, receiver 4 from 3 | 0.0019901226754228726 | 0.002528717194728358 | 1.2706338287367345 | 0.9083494394796271 |
| Balance 0 seed 2, receiver 2 from 5 | 0.001990936473342663 | 0.0025791344214667333 | 1.2954378283785828 | 0.8812149887107343 |
| Balance 0 seed 2, receiver 5 from 2 | 0.001990936473342663 | 0.002529160869226388 | 1.27033730261623 | 0.9087526372951681 |

The sources are the existing `snapshot-independent/b0-s1.json` and `snapshot-independent/b0-s2.json` under `.local-data/master-equation-closure/overnight-d/`; no new root evaluation was performed. Their listed source speeds exceed one by small interpolation errors, already identified in the earlier report. These rows are therefore floating observations of the retained numerical references, not certified instances of the unit-speed theorem. They show finite ratios at those particular endpoints. They establish neither a uniform ratio along a future approach nor a lower bound for the complete mean deficit. The counterexample does not show that these original preparations have divergent ratios.

The preparation-specific open obligation is to control the source direction over each actual delay interval, or to find another bound that directly controls the pair's mutual acceleration and projected response. The conditional external-six estimate does not supply that missing pair geometry. A demonstrated complete positive lower bound for $\eta$, or a different independently checked approach argument, would change this disposition. No physical conclusion follows from the geometric control alone.

## Falsifiers and validation boundary

An absolutely continuous unit-speed source violating the vector identity, a verified $\eta\ge\eta_*>0$ with $R>r/\eta_*$, or an incorrect root in the explicit rational example would refute the corresponding mathematical claim. A complete-delay Lipschitz bound with $\eta<D_s-MR/2$ would refute that sufficient estimate. Any claim about the original releases additionally requires an admitted trajectory and complete history enclosures. Shared-venv exact-rational controls passed the named case, 99 members of the approaching-delay family, equality in the constant-direction bound and equality in the affine-velocity Lipschitz estimate. The retained receipt is `approach-delay-controls.json` under the task runtime owner. These are geometric controls only. Independent review also passed separate vector, affine-velocity and rational-family controls, verified the four retained snapshot rows, and preserved their numerical limitations. No evolution or new regular test suite is part of this component.
