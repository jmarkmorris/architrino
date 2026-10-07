# A vanishing source denominator requires an intermediate near-unit radial arc

## Sharper inward budget and degeneration theorem

Claim grade: derived candidate, pending independent assessment. On any all-future strict-subfield continuation of the admitted logarithmic family, the inward speed budget strengthens to

$$
1-|v(t)|^2\ge\frac{p_-^2(t)}{128}
\left(\frac{r(t)}{R(t)}\right)^2,
\qquad p_-=\max(0,-r'),
\tag{1}
$$

where $R(t)=t-s(t)$ is the actual current source delay. This replaces elapsed time in the [earlier budget](authorized-cases-ten-hour-c-spiral-inward-budget.md) by the smaller, dynamically determined causal span. The corresponding strict violation is an open sufficient finite-unit-event criterion, with the same upper time increment $p_-r/8$.

If there are late receptions $t_j$ with $D(t_j)\to0$, write

$$
a_j=s(t_j),\qquad b_j=s(a_j),\qquad L_j=a_j-b_j.
$$

Then necessarily

$$
\frac{r(a_j)}{L_j}\to0,\qquad
\frac{r(b_j)}{L_j}\to1,\qquad
L_j\to\infty,\qquad
\frac{L_j}{a_j-s_0}\to0.
\tag{2}
$$

On the complete preceding causal interval $[b_j,a_j]$, the path, scaled by $L_j$, converges after rotation to a straight unit-speed inward segment ending at zero scaled radius. Its velocity converges to that segment's unit velocity in the mean-square sense specified below. Thus this possible denominator degeneration is concentrated on a causal span that diverges physically but is sublinear in elapsed time. It is not a regular compact similarity limit.

No such sequence is constructed for an actual member. The theorem identifies necessary geometry if the remaining noncompact alternative occurs. The same complete family, coefficient-one logarithmic law, all ordinary roots, unchanged self treatment, and strict/inclusive distinction are retained from the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md).

## Use the actual delay throughout the inward interval

The exact source derivative is positive, so

$$
R'=1-s'\le1.
\tag{3}
$$

At a generated time with $p=-u<0$, set $r_0=r(t)$, $R_0=R(t)$, and $\ell=ur_0/8$. If the strict continuation persists through $t+\ell$, its unit speed bound and the radial inequality $p'\le1/r$ give $r\ge r_0/2$ and $p\le-u/2$ throughout, exactly as in the earlier budget. The acute geometry gives $R_0\ge r_0$. Formula (3) therefore gives $R\le R_0+\ell\le2R_0$ throughout this same interval.

The response yields $E'\ge(-p)r/R^2$ for $p\le0$, because $D\le2$ and the tangential acceleration is positive. Consequently

$$
E(t+\ell)-E(t)\ge\frac{u^2r_0^2}{128R_0^2}.
\tag{4}
$$

The all-future strict speed bound proves (1). If its right side strictly exceeds the current speed deficit, continuation through this interval is impossible. The accepted finite-maximal-endpoint alternative then gives unit arrival by $t+\ell$. This remains a criterion for an actual generated history, with no demonstrated entry by the departing family.

The source-coordinate inequality $D\ge1+p_s$ when $p_s<0$ is unchanged. Applying (1) at the generated source therefore also strengthens the denominator bound to

$$
D(t)\ge1-\sqrt{\frac{128}{128+[r(s(t))/R(s(t))]^2}}.
\tag{5}
$$

A uniform positive ratio between source radius and its own causal span protects a uniform positive denominator. No speed-limit hypothesis is needed.

## The preceding causal arc becomes almost a unit straight segment

Suppose $D(t_j)\to0$. The earlier budget argument gives $p(a_j)\to-1$, $|v(a_j)|\to1$, and $h(a_j)/r(a_j)\to0$. Applying (1) at $a_j$ gives $r(a_j)/L_j\to0$. The root equation and the reverse triangle inequality give

$$
\left|\frac{r(b_j)}{L_j}-1\right|
\le\frac{r(a_j)}{L_j}\to0.
\tag{6}
$$

Since the physical source radius tends to infinity, $L_j\to\infty$ as well.

Let

$$
d_j=|x(a_j)-x(b_j)|,\qquad
e_j=\frac{x(a_j)-x(b_j)}{d_j}.
$$

For large $j$, $d_j>0$. Unit speed and the causal chord imply

$$
L_j-2r(a_j)\le d_j<L_j.
\tag{7}
$$

The lower bound follows by comparing $x(a_j)-x(b_j)$ with the opposite sign of $x(a_j)+x(b_j)$. The average velocity is $(d_j/L_j)e_j$. Therefore

$$
\frac1{L_j}\int_{b_j}^{a_j}|v(u)-e_j|^2\,du
\le 2\left(1-\frac{d_j}{L_j}\right)
\le\frac{4r(a_j)}{L_j}\longrightarrow0.
\tag{8}
$$

This uses only $|v|\le1$ and the exact displacement integral. Define the scaled whole arc by

$$
Y_j(\xi)=\frac{x(b_j+\xi L_j)}{L_j},
\qquad 0\le\xi\le1.
$$

Cauchy–Schwarz in (8), together with $Y_j(1)\to0$, gives

$$
\sup_{0\le\xi\le1}
|Y_j(\xi)-(\xi-1)e_j|\longrightarrow0.
\tag{9}
$$

After rotating $e_j$ to a fixed unit vector, (9) is uniform convergence to one inward radial unit segment. Formula (8) supplies mean-square velocity convergence. It does not supply uniform endpoint derivative or acceleration convergence; short intervals with rapid velocity change are not excluded.

## This near-unit arc must be sublinear in elapsed time

Suppose on a subsequence that $L_j/(a_j-s_0)\ge c>0$. On the middle part $\xi\in[1/4,3/4]$, (9) makes $r(b_j+\xi L_j)\ge L_j/8$ for all sufficiently large $j$. Equation (8) allows selection of a point in that middle part with $v-e_j\to0$. At that point the radial direction tends to $-e_j$, so $p\to-1$ and $E\to1$. But its elapsed time is at most $a_j-s_0$, so

$$
\frac{r}{t-s_0}\ge\frac c8.
$$

The already accepted elapsed-time inward budget would then keep $1-E$ bounded below by a positive number. This contradicts $E\to1$. Hence $L_j/(a_j-s_0)\to0$, proving the last statement of (2).

In particular the source's own clock ratio tends to one,

$$
\frac{b_j-s_0}{a_j-s_0}\longrightarrow1,
$$

while both endpoint radii divided by their elapsed times tend to zero. The entire intermediate arc is generated at late positive times. It is not the old held tail or the fixed preparation patch reappearing in the limit.

## Exact remaining obstruction

The uniform-margin theorem gives a precompact normalized-history regime when $|v|\le\beta<1$. The present theorem identifies a specific way that ordinary-clock compactness could fail without such a margin: almost unit inward travel on physically long but relatively collapsing causal arcs, with no uniform derivative control at the arc endpoints. The accepted scalar-speed-limit theorem excludes an all-future speed limit equal to one, but it does not exclude these recurrent localized arcs within a nonconvergent speed history.

Ruling out this alternative requires an additional estimate controlling these intermediate scales or the accumulated effect of their endpoint acceleration. The current bounds do not provide it. One cannot replace (8) by a regular exact unit-speed solution: mean-square velocity convergence permits narrow regions of rapid change, and the root denominator is precisely the quantity losing its margin. Applying the regular unit-tail obstruction to this limit would therefore omit a load-bearing hypothesis.

The exact admitted spiral is a known consistency case for (1) and (5): its radial speed is positive and its denominator exceeds one. It has no sequence of the kind assumed in (2). All calculations are analytical; no trajectory, amplitude, new exponent, response modification or auxiliary numerical instrument is selected.

Falsifiers are a failure of $s'>0$ in the regular strict domain; a sign or coverage error in the finite inward interval; loss of the actual generated-source hypothesis in (5); an invalid displacement integral across the complete causal arc; or a failure to select an interior point satisfying the mean-square consequence in (8). The physical divergence and elapsed-time collapse of $L_j$ are distinct claims, both proved explicitly in (2).

Only this new subject is written. Frozen earlier subjects and reference derivations, complete histories and shared owners remain unchanged. No owned computation is active. Independent assessment is required before integration.
