# Quantitative dispersal and advancing source times without a uniform speed margin

## Statement for the admitted family

Claim grade: derived candidate, awaiting independent assessment. For every sufficiently small member of the admitted logarithmic departing family, write $s_0<0$ for its exact release source time, $w=t-s_0$, $w_0=-s_0$, $r=|x|$ and $h=x\times x'$. Throughout its actual regular strict-subfield continuation,

$$
r(t)<\frac{19}{20}w.
\tag{1}
$$

Once $w\ge39w_0$, the actual source time obeys

$$
s(t)\ge0,\qquad \frac{s(t)-s_0}{t-s_0}\ge\frac1{39}.
\tag{2}
$$

The angular momentum and radius then have a power lower bound,

$$
h(t)\ge h(0)\left(\frac{w}{39w_0}\right)^{1/12},
\qquad r(t)>h(t),
\tag{3}
$$

and an all-future continuation has at least a fixed positive angular advance over each fixed multiplicative interval of $w$. Thus the all-future branch enters an explicitly controlled dispersing regime even if its speed has no uniform margin below one. This does not select the all-future branch or assert that radial velocity is eventually positive. A finite maximal endpoint remains an arrival at unit speed under the accepted incoming classification.

The case is the [fixed complete family](authorized-cases-ten-hour-c-spiral-method-admission.md), and the [pointwise-fate theorem](authorized-cases-ten-hour-c-spiral-pointwise-fate.md) supplies its exact torque estimate and orientation. The only further initial restriction is $r(0)<9w_0/10$, an open restriction satisfied by the original spiral and hence every sufficiently small member of the same family. At the exact spiral, the accepted rational bounds $a<279/1000$ and $\lambda<616/1000$ give $r(0)/w_0=a/(1-\lambda)<279/384<9/10$. The simple source clock and complete $C^2$ convergence preserve this strict inequality. No new past or selected numerical amplitude is introduced.

## A radius bound strictly below unit ballistic expansion

At an actual reception set $R=t-s$, $n=[x(t)+x(s)]/R$ and $D=1+n\cdot v(s)$. The unchanged acceleration is $A=-n/(RD)$. The positive acute lag gives

$$
e\cdot n=\frac{r+r_s\cos\delta}{R}\ge\frac rR,
\qquad e=x/r.
$$

Since $0<D<2$ and the increasing clock gives $R\le w$, the radial velocity $p=r'$ satisfies

$$
p'=\frac{|v|^2-p^2}{r}+e\cdot A
\le\frac{1-p^2}{r}-\frac r{2w^2}.
\tag{4}
$$

This inequality uses the actual delayed direction. Its negative term prevents the radius from expanding almost at unit rate for an entire proportional time interval. The exact spiral is an analytical control: substituting $r=a(1+t)$ and $p=a$ into the identity preceding (4) returns its admitted radial balance, with no new numerical evaluation.

First, for $w_0\le w\le2w_0$, the speed bound gives

$$
r(w)\le r(0)+w-w_0
<w-\frac{w_0}{10}\le\frac{19}{20}w.
$$

Suppose (1) has a first later equality at $w=W>2w_0$. Put $\varepsilon=1/20$. At that crossing $r(W)=(1-\varepsilon)W$ and $p(W)\ge1-\varepsilon$. For $W/2\le u\le W$, the same speed bound in reverse gives

$$
r(u)\ge r(W)-(W-u)=u-\varepsilon W
\ge(1-2\varepsilon)u.
\tag{5}
$$

Also $r(W/2)\le W/2$, because $r(0)<w_0$ and $|p|<1$. Therefore

$$
\int_{W/2}^W(1-p(u))\,du
=\frac W2-r(W)+r(W/2)\le\varepsilon W.
\tag{6}
$$

Since $-1<p<1$, one has $1-p^2\le2(1-p)$. Integrating (4), using (5)–(6), yields

$$
p(W)-p(W/2)
\le\frac{4\varepsilon}{1-2\varepsilon}
-\frac{1-2\varepsilon}{2}\log2
=\frac29-\frac9{20}\log2
<-\frac7{90}.
\tag{7}
$$

The elementary inequality $\log2>2/3$ follows, for example, by the strict midpoint lower bound for the integral of the convex function $1/u$ on $[1,2]$. But $p(W)\ge19/20$ and $p(W/2)<1$ imply $p(W)-p(W/2)>-1/20$, contradicting (7). Hence the first crossing cannot occur. This proves (1) on every finite regular continuation interval and consequently on an all-future one.

## The delayed source advances at a definite scale ratio

Let $w_s=s-s_0$. If the source still lies in $[s_0,0]$, its supplied subfield path satisfies

$$
r(s)\le r(0)-s=r(0)+w_0-w_s.
$$

Using the root equation and (1),

$$
w-w_s\le r(t)+r(s)
<\frac{19}{20}w+r(0)+w_0-w_s.
$$

It follows that $w<20[r(0)+w_0]<38w_0$. Thus every reception with $w\ge39w_0$ has a generated source $s>0$. Both endpoints then satisfy (1), and

$$
w-w_s=R\le r(t)+r(s)
<\frac{19}{20}(w+w_s).
$$

Rearranging gives $w_s>w/39$. This is (2). In logarithmic time $\log w$, the source delay is consequently bounded by $\log39$ once these sources are generated. The shift $w=t-s_0$ is a coordinate choice made separately for each actual member; it changes neither its physical history nor its equation.

## Power growth of angular momentum and radius

When $s\ge0$, the accepted positive torque makes $h(u)\ge h(s)$ throughout $[s,t]$. The two-endpoint integral in the pointwise-fate theorem therefore gives the stronger local form

$$
h'(t)\ge\frac{h(s)}{2\pi R}
\ge\frac{h(s)}{2\pi w}.
\tag{8}
$$

Define $H(w)=h(w+s_0)$. For $w\ge39w_0$, (2), monotonicity and (8) imply

$$
H'(w)\ge\frac{H(w/39)}{2\pi w}.
\tag{9}
$$

Compare this actual function with $P(w)=h(0)[w/(39w_0)]^{1/12}$. On $[w_0,39w_0]$, $H\ge h(0)\ge P$. Also

$$
P'(w)=\frac{P(w)}{12w}
<\frac{P(w/39)}{2\pi w}.
\tag{10}
$$

To check the strict constant, $39^{1/12}<\sqrt2<3/2$ because $39<64$, and $\pi<4$; hence $2\pi39^{1/12}<12$. A first later crossing of $H-P$ from nonnegative to negative would have derivative nonpositive, whereas (9)–(10) and the already earlier value at $w/39$ make that derivative strictly positive. This proves (3). Equivalently, the same comparison can be performed successively on intervals whose endpoints differ by a factor of 39.

The exponent $1/12$ is a convenient proved lower rate, not an asymptotic exponent or an optimized value. The initial scale and coefficient are the actual member's exact release quantities. Their existence follows from the family theorem; this source does not provide a numerically certified member.

## A quantitative positive winding bound

Let $\Theta(w)=\theta(w+s_0)$ and put $Q=39e^9$. For every $b\ge w_0$ on an all-future continuation,

$$
\Theta(Qb)-\Theta(b)\ge\frac\pi3.
\tag{11}
$$

Suppose instead that the angular advance is smaller than $\pi/3$. For receiving times $w\in[39b,Qb]$, (2) places the source between $b$ and $Qb$. Both endpoint directions therefore lie in one cone of width less than $\pi/3$. Their positively weighted sum lies in that cone, so its unit chord direction has projection greater than $1/2$ on the cone's fixed central axis $e$. The actual equation then gives

$$
\frac{d}{dw}(e\cdot v)\le-\frac1{4w}.
$$

Integrating from $39b$ to $Qb=39e^9b$ decreases that velocity component by at least $9/4$, impossible when both endpoint speeds are less than one. This proves (11). Iterating gives the explicit lower bound

$$
\Theta(w)-\Theta(w_0)
\ge\frac\pi3\left\lfloor\frac{\log(w/w_0)}{\log39+9}\right\rfloor,
\qquad w\ge w_0.
\tag{12}
$$

This strengthens the qualitative angle conclusion using the newly proved source-time ratio. It does not assert monotone radial motion or an asymptotic angular frequency.

## Evidence boundary and falsifiers

Every estimate applies to the actual small compatible departing family during its ordinary strict-subfield interval. If that interval is finite, estimates requiring a later reception simply have no conclusion beyond its endpoint. If it is infinite, (1)–(3) and (12) supply a controlled dispersing regime without an all-future speed margin. The unresolved branch decision is whether a selected family member has such an infinite interval or instead arrives at unit speed at finite time, and in the latter case whether its projected incoming acceleration is positive or grazing.

Falsifiers are failure of the initial open ratio under the asserted small-family restriction; an incorrect sign in (4); a first-crossing path satisfying (5)–(6) but violating (7); a source remaining before release when $w\ge39w_0$; failure of the monotone delayed comparison (9)–(10); or a narrow-cone interval with a bounded velocity component despite the stated harmonic decrement. Each would invalidate the corresponding implication. A finite unit-speed endpoint does not falsify an all-future conditional estimate.

All validation is explicit algebra and inequality proof, with the exact spiral radial identity as a known-case check before the new estimates. No new numerical instrument, external mathematical theorem, production solver or target trajectory is used. This new file is frozen for independent assessment; prior subjects and references remain unchanged, shared integration remains with the coordinator, and no owned computation is active.
