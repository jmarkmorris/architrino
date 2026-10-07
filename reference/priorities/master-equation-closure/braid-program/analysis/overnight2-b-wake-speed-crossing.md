# A wake-speed crossing obstruction from recent self roots

## Statement

Select the canonical acceleration equation with positive kernel coefficient and wake speed normalized to one. Include every ordinary positive-delay root, including self roots, with the canonical positive self polarity and absolute source divisor. Consider finitely many complete $C^2$ paths whose positions remain bounded over the past needed by the causal equation. Suppose the paths are collision-free at each reception, every positive-delay causal root is ordinary, and the canonical sum is a well-defined finite vector equal to the prescribed acceleration at every reception in a connected time interval.

**Derived proposal, pending independent review:** no member can have speed below one at one reception and above one at another reception in that interval. A member may touch speed one without crossing; neither strict separation from one nor continuation through a nonordinary event is concluded. The result excludes smooth mixed-speed prescribed families as exact histories on the everywhere-ordinary canonical domain. It does not select a ceiling, prohibit an entirely above-wake-speed history, or modify the equation.

The bounded-past hypothesis can be replaced by a locally uniform finite upper bound on causal delays together with regularity on the resulting compact lookback interval. Bounded relative-periodic radius/phase/height histories satisfy it. The argument is local around a possible crossing and applies separately at every fixed positive spatial scale.

## The finite acceleration equation creates a recent-root gap

Fix a reception $t_0$ at which one member has unit speed, and write $\mathbf e=\dot{\mathbf X}_i(t_0)$. Then $|\mathbf e|=1$. For a positive self delay $d$, set

$$
\mathbf Q(t,d)=\mathbf X_i(t)-\mathbf X_i(t-d),\qquad
D(t,d)=1-\frac{\mathbf Q(t,d)}d\cdot\dot{\mathbf X}_i(t-d)
$$

on the causal root $|\mathbf Q|=d$. The self acceleration contribution is

$$
\mathbf a_{\mathrm{self},d}=K\frac{\mathbf Q(t,d)}{d^3|D(t,d)|},\qquad K>0.
$$

Continuity of velocity supplies a reception neighborhood and a recent-delay interval in which $\mathbf e\cdot\mathbf Q(t,d)\ge d/2$. Let $V$ bound source speed on their compact lookback interval. On every recent self root, $|D|\le1+V$, so

$$
\mathbf e\cdot\mathbf a_{\mathrm{self},d}\ge\frac{K}{2(1+V)d^2}>0. \tag{1}
$$

The use of the absolute divisor matters: all sufficiently recent self roots project positively in the same fixed direction, irrespective of the sign of their source divisor. Their divergences cannot cancel each other.

Present separation and a local source-speed bound exclude recent partner roots. Bounded positions exclude all sufficiently remote roots. On any compact delay interval away from zero, ordinary roots are isolated and hence finite: an infinite sequence would have an accumulation root where the nonzero delay derivative contradicts isolation. Their contributions are finite. Equation (1) then rules out an infinite sequence of self roots approaching zero at $t_0$, because the projected series could not define a finite acceleration. Thus there is a positive recent-delay gap at $t_0$.

Choose a cutoff $\eta$ inside that gap, small enough for (1), and choose a remote cutoff beyond every possible root. Every root in the compact interval $[\eta,d_+]$ at $t_0$ is ordinary. The implicit function theorem continues those finitely many roots to nearby receptions. Compactness of their complement excludes any additional roots there, and their source divisors remain bounded away from zero. Consequently their entire acceleration sum, including all partners, is locally bounded by some constant $B_{\mathrm{far}}$. Prescribed acceleration is also locally bounded, by $B_{\mathrm{kin}}$.

At a nearby reception, all roots below $\eta$ are self roots and have positive projection. Exact balance and (1) therefore imply, for each such root,

$$
\frac{K}{2(1+V)d^2}\le B_{\mathrm{kin}}+B_{\mathrm{far}}.
$$

Taking a slightly larger positive bound on the right shows that no causal root can approach zero at nearby receptions. In particular there is a single $\eta_*>0$ such that the entire punctured interval $0<d\le\eta_*$ has no root for all receptions in a neighborhood of $t_0$. This is a consequence of finite exact acceleration and ordinary compact complements; it is not an assumed memory truncation.

## A root-free recent interval fixes the speed side

Define the normalized self gap

$$
F(t,d)=\frac{|\mathbf X_i(t)-\mathbf X_i(t-d)|^2}{d^2}-1,\qquad d>0.
$$

Its continuous extension at $d=0$ is $F(t,0)=|\dot{\mathbf X}_i(t)|^2-1$. Since $F(t,\eta_*)\ne0$ for every nearby reception, its sign is constant on a connected reception neighborhood. Since no positive recent root exists, $F(t,d)$ has that same sign for every $0<d\le\eta_*$. Taking $d\downarrow0$ shows that the speed is everywhere at least one in that neighborhood or everywhere at most one. A unit-speed reception therefore cannot have both strict speed sides arbitrarily near it.

The sign construction is local at every reception, not only at a putative direct crossing. Where speed differs from one, continuity of velocity already supplies a uniform recent-root gap and fixes the sign. At a unit-speed reception the preceding finite-acceleration argument supplies that gap. Define the recent-gap sign at each reception by taking any sufficiently small positive delay. It is well-defined because a continuous nonzero gap cannot change sign as delay varies inside the root-free interval. It is locally constant in reception time because a common positive delay works throughout each of the constructed neighborhoods. A locally constant map from a connected time interval to the two signs is constant. Therefore all strict speed values on that interval lie on the same side of one. This also handles unit-speed plateaus or more complicated closed sets of unit-speed receptions without a separate crossing or differentiability assumption.

## A periodic nine-parameter family

The recent-gap sign theorem applies directly to the following periodic-speed family.

Use the six-member paths and scale from [the current account](overnight2-b-followup-and-research-2026-10-07.md), with

$$
\rho=1+a\cos2\phi+b\sin2\phi,\quad p=c\cos2\phi+d\sin2\phi,\quad z=H\cos\phi+e\cos3\phi+f\sin3\phi.
$$

Take the closed parameter region

$$
|a|,|b|,|c|,|d|,|e|,|f|\le\frac1{200},\quad
\frac34\le H\le\frac{17}{20},\quad
\frac45\le\beta\le\frac{17}{20},\quad
1\le\kappa\le\frac{11}{10}.
$$

All new numerical constants use $K=c_f=1$. Positive radius is uniform, $\rho\ge99/100$, so simultaneous members cannot collide. At phase zero,

$$
|\mathbf V(0)|^2\le\left(\frac{11}{1000}\right)^2+
\left[\frac{201}{200}\left(\frac{17}{20}+\frac{11}{1000}\right)\right]^2+
\left(\frac{33}{2000}\right)^2<\frac{81}{100}.
$$

At phase $\pi/2$, the tangential speed is at least $(199/200)(4/5-11/1000)$, and the axial speed magnitude is at least $3/4-3/200=147/200$. Thus

$$
|\mathbf V(\pi/2)|^2\ge
\left[\frac{199}{200}\left(\frac45-\frac{11}{1000}\right)\right]^2+
\left(\frac{147}{200}\right)^2>\frac{23}{20}>1.
$$

Every member of this coefficient box has periodic speed on both sides of the wake speed. Hence none is an exact bounded, collision-free, everywhere-ordinary canonical history at any $R>0$. It may already fail ordinariness at a positive-delay fold; if not, the recent-self acceleration argument supplies the obstruction. No numerical root census or optimizer failure is used.

## Review and falsifier

This is an analytical subject, not yet an accepted result. No new numerical target has run. The decisive issues for independent review are the projected positivity of all recent self terms, local boundedness of the complete nonrecent sum, the compact-complement continuation, and the topology of the asserted speed-side restriction. A bounded exact ordinary mixed-speed periodic history, a cancellation of recent self divergences within the canonical signs, or a defect in any of those steps would falsify the periodic corollary. The parent will integrate the independently adjudicated scope into the current research account.
