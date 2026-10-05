# A wider all-future slow-binary dispersal regime

The signed polar argument can be widened from $\epsilon\le10^{-16}$ to $\epsilon\le1/2000$. The improvement comes from bounding the actual delayed acceleration components before integrating them, and from testing the scalar-amplitude cancellation by a polynomial residual. The resulting accumulated error is at most $800\epsilon^2$ around a free eccentricity seed of size approximately $\epsilon$. That error cannot erase the seed in the stated wider regime. The same geometric contradiction that excludes indefinite revolutions then proves dispersal for all future time.

**Grade:** derived, author-checked, awaiting independent adjudication of this new subject. The accepted [signed polar subject](slow-binary-polar-remainder-and-fate.md) and its [independent adjudication](slow-binary-polar-independent-adjudication.md) are inputs, preserved unchanged. This document sharpens their constants and replaces their restricted finite-theorem launch with a direct release-layer construction. It does not borrow the $10^{-9}$ ceiling of the [finite secular theorem](slow-binary-controlled-secular-comparison.md). All numerical instantiations use $c_f=1$; there is no ceiling response, receiver multiplier, event impulse, root exclusion, physical mass or imported physical-energy law.

## Preparation and theorem

Let $K=\kappa|q_+q_-|>0$, choose $R_0>0$, set $v_0^2=K/(4R_0)$ and $\epsilon=v_0/c_f$. Use scaled member position $\mathbf Y=\mathbf X_+/R_0$ and time $s=v_0T/R_0$. Retain the original complete supplied planar mirror past: $\mathbf X_-=-\mathbf X_+$, continuous positions and velocities, and scaled past speed at most two for every $s\le0$. On $[-7\epsilon,0]$ require $W^{2,\infty}$ data with $3/4\le|\mathbf Y|\le5/4$, $|\mathbf Y'|\le2$ and $|\mathbf Y''|\le8$. At release require $|h_0-1|\le\epsilon$ and $|\mathbf e_0|\le\epsilon$, with the following definitions:

$$
r=|\mathbf Y|,\quad \mathbf n=\mathbf Y/r,\quad \mathbf t=\hat{\mathbf z}\times\mathbf n,\quad
h=(\mathbf Y\times\mathbf Y')\cdot\hat{\mathbf z},\quad
\mathbf e=\mathbf Y'\times(h\hat{\mathbf z})-\mathbf n.
$$

Here $h$ is the scalar measure of angular motion and $\mathbf e$ is an algebraic eccentricity coordinate. These are geometric coordinates, not physical accounts. With $p=\mathbf Y'\cdot\mathbf n$, $q=\mathbf Y'\cdot\mathbf t=h/r$, and $e_n=\mathbf e\cdot\mathbf n$, $e_t=\mathbf e\cdot\mathbf t$, their exact identities are $hp=-e_t$ and $hq=1+e_n$. Choose the continuous angle with $\theta(0)=0$ and $\theta'=h/r^2$.

**Theorem.** For this unchanged preparation and

$$
0<\epsilon\le\frac1{2000},
$$

the unchanged inverse-square Master Equation has a unique planar mirror ordinary-root continuation for all $T\ge0$. Each member has exactly one partner root and no positive-delay self root. Physical member speed is less than $4.01v_0<c_f$, and both normalized root factors exceed $1-4.01\epsilon$. The member radius tends to infinity, total angle is finite, and velocity converges to a radial outward limit with nonnegative speed. Quantitatively,

$$
r(s)\to\infty,\qquad
\theta_\infty<\frac8{\epsilon^2},\qquad
\mathbf Y'(s)\to p_\infty\mathbf n_\infty,\quad p_\infty\ge0.
$$

Zero terminal speed is permitted. A strictly positive limiting speed, a pointwise outward radial sign, asymmetric preparations and campaign fate remain separate questions. The speed range includes $100/299792.458\simeq3.33564\times10^{-4}$, the historical run's speed ratio reported in the [local comparison](slow-binary-first-order-drift.md). This is a derived range inclusion, not a new measurement or validation of that run's history, trajectory errors or tiny radial dip. A complete circular supplied preparation at that ratio satisfies the theorem's hypotheses; membership of another historical source record must be checked against every preparation condition.

## 1. Exact row, complete roots and the release layer

The [canonical acceleration](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration), specialized to opposite mirror polarity, is

$$
\mathbf Y''=-\frac{4\mathbf N}{R_d^2D},\qquad
\mathbf S=\mathbf Y(s)+\mathbf Y(\sigma),\quad R_d=|\mathbf S|,\quad
\mathbf N=\mathbf S/R_d,\quad
D=1+\epsilon\mathbf N\cdot\mathbf Y'(\sigma),\quad
u=s-\sigma=\epsilon R_d.
$$

If the entire supplied and constructed history has physical speed ratio at most $\beta<1$, the partner causal gap increases with delay at rate at least $1-\beta$, is negative at zero and tends to positive infinity. It therefore has exactly one zero. The strict chord inequality excludes every positive-delay self zero. Both root factors exceed $1-\beta$, and

$$
\frac{2\epsilon r}{1+\beta}\le u\le\frac{2\epsilon r}{1-\beta},\qquad
|\mathbf Y''|\le\frac{(1+\beta)^2}{1-\beta}\frac1{r^2}.
$$

These assertions retain the remote supplied past; they do not truncate it or suppress an interaction channel. On a short step whose sources are already retained, positive separation, positive root-factor floors and Lipschitz source velocity make the row locally Lipschitz in receiver position. The position–velocity integral map is a contraction for a sufficiently short step, giving local existence, uniqueness and continuation on this ordinary chart. Plane and mirror symmetry follow from uniqueness. This is the same ordinary method-of-steps argument used in the finite theorem; the argument itself has no $10^{-9}$ smallness assumption.

Construct the release interval directly up to $s_*=10\epsilon$. Temporarily take $0.99\le r\le1.01$, $|\mathbf Y'|\le1.01$. Combining with past speed two gives $\beta=2\epsilon$. The root delay is below $2.03\epsilon$, so any negative-time source lies in the declared recent past. The acceleration bound above is less than $1.03$. The initial algebraic identities give $0.998<r_0<1.002$ and $|\mathbf Y'_0|\le(1+\epsilon)/(1-\epsilon)<1.00101$. Integration through $10\epsilon\le0.005$ gives radius in $(0.9929,1.0071)$ and speed below $1.0062$, strictly within the temporary tube. Thus the construction reaches $s_*$.

Angular motion is already positive in the relevant supplied past. Indeed $|h(a)-h_0|\le70\epsilon$ on $[-7\epsilon,0]$, by $|h'|=|\mathbf Y\times\mathbf Y''|\le10$ there, and hence $h(a)>0.964$. The angle swept over an initial causal window is positive and below $6\epsilon<\pi$, since its angular rate is at most $2/(3/4)$ in the past and $1.01/0.99$ in the future. The exact torque identity

$$
h'=\frac{4rr_\sigma\sin(\theta-\theta_\sigma)}{R_d^3D}
$$

is therefore positive. A first loss of positive $h$ is impossible. The same bounds give $h'<4\epsilon$ on this release interval, so $h_0\le h\le1+\epsilon+40\epsilon^2<1.001$.

The independently accepted [first-order local row](slow-binary-independent-adjudication-2026-10-03.md) applies across an acceleration step, because its velocity remainder is integrated. The recent acceleration bound eight and $r\in[0.99,1.01]$ give

$$
\mathbf Y''=-\frac{\mathbf n}{r^2}
+\frac\epsilon{r^2}(\mathbf Y'-2p\mathbf n)+\mathbf Q_0,
\qquad |\mathbf Q_0|\le6000\epsilon^2,
$$

since $256(4+16\cdot1.01)/0.99^2<6000$. Its exact eccentricity identity gives $|\mathbf e'|\le2.1\epsilon+12200\epsilon^2$ here. Consequently

$$
|\mathbf e|\le\epsilon+21\epsilon^2+122000\epsilon^3\le1.041\epsilon,
\qquad \theta_*<12\epsilon.
$$

At $s_*$ the partner source and that source's own partner source are positive: each delay is below $2.1\epsilon$, so the second source exceeds $5.8\epsilon$. Emission time has positive derivative, the receiver root factor divided by the transmitter root factor. Both source times stay positive thereafter. The component estimates below therefore concern EOM-constructed future accelerations. The supplied past is used in this initial layer, without a jerk or acceleration-continuity premise, and is never replaced by a renewed circle.

## 2. Future windows with constants that survive the larger speed

Work provisionally in $h\ge0.99$, $|\mathbf e|\le3$. Algebra gives $r\ge h^2/4$ and $|\mathbf Y'|\le4/h$. Combining with the supplied past gives $\beta\le4.05\epsilon$. Thus $u<2.01\epsilon r$ and $|\mathbf Y''|<1.01/r^2$. Define the dimensionless window variables

$$
\alpha=\epsilon/h,\qquad P=hp=-e_t,\qquad Q=hq=1+e_n=h^2/r.
$$

Throughout this provisional class, $|P|\le3$, $0<Q\le4$ and $\alpha<0.000506<1/1000$. The wider auxiliary ceiling $\alpha\le1/1000$ is used only for the algebraic residual bounds below.

The preliminary speed bound gives $|r(a)/r-1|<9\epsilon$ on the current source interval. Integrating $|h'|\le1.01/r$ there gives $|h(a)-h|<2.1\epsilon$. It follows that the window angle lies in $(0,\pi)$, with upper bound $8.3\epsilon/h$. Torque is positive, so $h(a)\le h$, while the lower bound $h(a)\ge h-2.1\epsilon$ gives source speed below $4.01/h$. Reintegrating velocity and angle gives

$$
\left|\frac{r(a)}r-1\right|\le9\alpha,\qquad
0\le\theta(s)-\theta(a)\le2.04\epsilon\frac h r.
$$

For the angle bound use $2.01/(1-9\alpha)^2<2.04$ at the actual ceiling $\alpha<0.000506$. In the exact torque product, $R_d/(2r)\in[1-4.1\alpha,1+4.1\alpha]$, $D\ge1-4.01\alpha$, $r_\sigma/r\le1+9\alpha$, and the window average of $[h(a)/h][r/r(a)]^2$ is at most $(1-9\alpha)^{-2}$. Their product is less than two. Therefore

$$
0<h'\le\frac{2\epsilon h}{r^2},\qquad
\left|\frac{h(a)}h-1\right|\le20\alpha^2.
$$

For the second bound, integration gives at most $4.02\epsilon^2/[r(1-9\alpha)^2]<17\alpha^2$. All estimates concern the actual causal interval, regardless of how large $r$ becomes; no upper-radius estimate is used.

In the fixed axes at reception the future acceleration components obey

$$
\left|\mathbf Y''(a)\cdot\mathbf n+\frac1{r^2}\right|
\le\frac{40\alpha}{r^2},\qquad
|\mathbf Y''(a)\cdot\mathbf t|\le\frac{6\epsilon q}{r^2}.
$$

Here is a direct closure of these constants. On the source point's own future window, the exact amplitude $L_a^{-2}D_a^{-1}$ differs from one by at most $13\alpha_a$, using $|L_a-1|\le4.1\alpha_a$ and $|D_a-1|\le4.01\alpha_a$. The radial direction changes its radial component only quadratically; a bound $14\alpha_a/r(a)^2$ includes it. The present-to-source radius change costs at most $19\alpha/r^2$, and the remaining rotation costs less than $\alpha/r^2$, so forty suffices. For the transverse component the source-frame torque gives $2\epsilon h(a)/r(a)^3$. Rotating its radial acceleration through at most $2.04\epsilon h/r$ adds less than $2.1\epsilon q/r^2$; the torque term is also less than $2.1\epsilon q/r^2$. Six suffices. The earlier positive second-source coverage justifies both uses of the actual equation. This bound retains the factor $q$ as $q\downarrow0$ at large radius.

## 3. An implicit-root residual and the signed cubic constants

Integration of the preceding component estimates, once for velocity and twice for position, gives

$$
\begin{aligned}
S_r&=2r-up-u^2/(2r^2)+\eta_r,&|\eta_r|&\le20u^2\alpha/r^2,\\
S_t&=-uq+\eta_t,&|\eta_t|&\le3u^2\epsilon q/r^2,\\
V_{\sigma,r}&=p+u/r^2+\xi_r,&|\xi_r|&\le40u\alpha/r^2,\\
V_{\sigma,t}&=q+\xi_t,&|\xi_t|&\le6u\epsilon q/r^2.
\end{aligned}
$$

Put $L=R_d/(2r)=u/(2\epsilon r)$, $x=S_r/(2r)$ and $y=S_t/(2r)$. The normalized inequalities, using $u<2.01\epsilon r$ and $Q\le4$, are

$$
\begin{aligned}
x&=1-\alpha LP-\alpha^2L^2Q+\rho_r,&|\rho_r|&\le170\alpha^3,\\
y&=-\alpha LQ+\rho_t,&|\rho_t|&\le25\alpha^3Q,\\
\epsilon V_{\sigma,r}&=\alpha P+2\alpha^2LQ+\chi_r,&|\chi_r|&\le330\alpha^3,\\
\epsilon V_{\sigma,t}&=\alpha Q+\chi_t,&|\chi_t|&\le50\alpha^3Q.
\end{aligned}
$$

For example the radial displacement coefficient is $10(2.01)^2Q<162$, and the radial velocity coefficient is $40(2.01)Q<322$. These bounds come from integral acceleration estimates, requiring no derivative of acceleration.

Division by $L$ gives the exact first-order transverse-direction cancellation:

$$
N_t=-\alpha Q+\rho_t/L,\qquad
|N_t+\alpha Q|\le26\alpha^3Q.
$$

Since $S_r>0$, $N_r=\sqrt{1-N_t^2}$. The elementary identity for the square root, or its fourth-order remainder, gives

$$
\left|N_r-1+\frac{\alpha^2Q^2}{2}\right|\le\alpha^3.
$$

For explicit margin, the squared-direction perturbation contributes at most $416\alpha^4+O(\alpha^6)$ and the square-root remainder at most $34\alpha^4$, together below $\alpha^3$ when $\alpha\le1/1000$.

The implicit norm equation can now be written without expanding an independently chosen delay:

$$
L(N_r+\alpha P)+\alpha^2L^2Q=1+\rho_r.
$$

Take $L_0=1-\alpha P+\alpha^2C$, $C=P^2-Q+Q^2/2$, with $|C|\le21$. Its polynomial residual through cubic order has cubic coefficient $P(P^2-3Q+Q^2)$, bounded by $111$. The terms of degree four and higher cost less than $\alpha^3$ at the auxiliary ceiling; the direction error adds less than $1.01\alpha^3$. Including $|\rho_r|\le170\alpha^3$ and dividing by the derivative $N_r+\alpha P+2\alpha^2LQ>0.996$ proves

$$
|L-L_0|\le300\alpha^3.
$$

This is an actual implicit-root bound. The division is a monotonic polynomial subtraction at the observed $N_r$, and does not assume that $L$ and $N_r$ are independent physical variables.

Substitution in $D=1+N_r\epsilon V_{\sigma,r}+N_t\epsilon V_{\sigma,t}$ gives

$$
D_0=1+\alpha P+\alpha^2(2Q-Q^2),\qquad |D-D_0|\le400\alpha^3.
$$

The separate cubic costs are at most $24$ from $N_r\alpha P$, $25$ from replacing $L$ by one in $2\alpha^2LQ$, $330$ from $\chi_r$, and less than three from the remaining direction and transverse-velocity products, in units of $\alpha^3$. Thus four hundred has explicit margin.

Write $H=L^{-2}D^{-1}$ and $H_0=1+\alpha P$. The quadratic coefficient in $H_0L_0^2D_0-1$ vanishes exactly; its cubic coefficient is $2P(P^2-2Q+Q^2)$, bounded by $198$. The higher-degree absolute-coefficient bounds are $2208$, $6012$, $10521$, $10584$ at degrees four through seven. At $\alpha\le1/1000$ their contribution, divided by $\alpha^3$, is below three. Replacing $L_0$ by $L$ and $D_0$ by $D$ costs less than $1010\alpha^3$. Finally $L^2D\ge(1-4.1\alpha)^2(1-4.01\alpha)$. These elementary bounds give

$$
|H-H_0|\le1300\alpha^3.
$$

The exact rational evaluation of this upper bound is below $1225\alpha^3$; the proof retains 1300. The cancellation of the quadratic amplitude term is therefore bounded rather than simply asserted in big-O notation.

Multiplying the amplitude by direction proves the signed row

$$
\begin{aligned}
A_r&=-\frac{1+\epsilon p-\epsilon^2q^2/2}{r^2}+Q_r,
&|Q_r|&\le1400\frac{\epsilon^3}{r^2h^3},\\
A_t&=\frac{\epsilon q+\epsilon^2pq}{r^2}+Q_t,
&|Q_t|&\le30\frac{\epsilon^3q}{r^2h^2}.
\end{aligned}
$$

The radial multiplication adds at most $24\alpha^3$ and the direction error to the amplitude bound. Transversely, the amplitude error is multiplied by $\alpha Q$, and the direction error already contains $Q$, so the coefficient is below thirty. The radial and transverse constants are intentionally different. Replacing the second line by an absolute isotropic error would destroy the ensuing uniform elongated-history estimate.

## 4. Survival of the signed seed, including the original history seam

Direct polar differentiation yields

$$
h_\theta=\epsilon+\epsilon^2p+R_h,\qquad |R_h|\le30\epsilon^3/h^2,
$$

$$
\mathbf e_\theta=\frac{2\epsilon}{h}(1+e_n)\mathbf n
+\epsilon^2\{2pq\mathbf n-(p^2+q^2/2)\mathbf t\}+\mathbf R_e,
\qquad |\mathbf R_e|\le1600\epsilon^3/h^3.
$$

The remainder components are $2r^2Q_t$ radially and $-r^2Q_r-r^3pQ_t/h$ transversely. Their coefficients are at most $240$ and $1490$ respectively, so 1600 suffices in Euclidean norm. In particular $0.99\epsilon<h_\theta<1.01\epsilon$; this also proves that $h$ increases.

Let $\mathbf c=\mathbf e/h$, $A=2\mathbf n\mathbf n^{\mathsf T}-I$, and use the two correctors

$$
\mathbf a=\mathbf c+\frac{2\epsilon}{h^2}\mathbf t,\qquad
\mathbf b=\mathbf a+\frac{5\epsilon^2}{2h^3}\mathbf n.
$$

For $\mathbf c$, the signed second-order polynomial is

$$
\mathcal P=-e_t(2+e_n)\mathbf n-\tfrac12(1+e_n)^2\mathbf t.
$$

It obeys $|\mathcal P+\mathbf t/2|\le8|\mathbf e|$ on $|\mathbf e|\le3$. Differentiating the first corrector adds $-2\epsilon^2\mathbf t/h^3$ to its constant part, and the second corrector cancels the combined $-(5/2)\epsilon^2\mathbf t/h^3$. The eccentricity and angular remainders in $\mathbf c_\theta$ have total coefficient at most $1600+3\cdot30=1690$ at scale $\epsilon^3/h^4$. The further costs are at most $12.12$ from $-4\epsilon(h_\theta-\epsilon)\mathbf t/h^3$, $10.08$ from the second-corrector derivative and its matrix coefficient, and $16.02$ from substituting $\mathbf c=\mathbf b-2\epsilon\mathbf t/h^2-(5/2)\epsilon^2\mathbf n/h^3$ in $\mathcal P+\mathbf t/2$. Hence

$$
\left|\mathbf b_\theta-\frac\epsilon h A\mathbf b\right|
\le8\frac{\epsilon^2}{h^2}|\mathbf b|+1800\frac{\epsilon^3}{h^4}.
$$

Use the bounded primitive

$$
B=\frac12\begin{pmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{pmatrix},\quad
B_\theta=A,\quad |B|=\tfrac12,\qquad
\mathbf z=(I-\epsilon B/h)\mathbf b.
$$

The inverse norm is at most $(1-\alpha/2)^{-1}$. Differentiation cancels the leading oscillatory coefficient. The remaining coefficient, before this inverse, is bounded by $(1/2+1.01/2+8(1+\alpha/2))\epsilon^2/h^2$; after inversion it is below ten at $\alpha\le1/1000$. Thus

$$
|\mathbf z_\theta|\le10\frac{\epsilon^2}{h^2}|\mathbf z|
+1900\frac{\epsilon^3}{h^4}.
$$

The starting value is computed from the original release history, using its first-order bound only. Put

$$
\mathbf c_*:=\frac{\mathbf e_0}{h_0}+\frac{2\epsilon}{h_0^2}\mathbf t_0.
$$

On $[0,s_*]$, the preceding bounds give $|\mathbf a_\theta|<15000\epsilon^2$. To check this number, the first-order polar eccentricity remainder is below $14000\epsilon^2$, using $|p|\le1.043\epsilon$ from $|\mathbf e|\le1.041\epsilon$; the angular remainder is below $6200\epsilon^2$. In $\mathbf a_\theta$, the central rotating drive cancels exactly. Its remaining leading terms, the angular-remainder terms and the factor $h^{-1}$ cost less than $1000\epsilon^2$ beyond that eccentricity bound. Integration over $\theta_*<12\epsilon$ costs $180000\epsilon^3\le90\epsilon^2$. The second corrector and initial matrix conversion cost less than $5\epsilon^2$. Therefore

$$
|\mathbf z(\theta_*)-\mathbf c_*|\le100\epsilon^2.
$$

This bound admits an acceleration jump at release and uses no newly supplied circle or jerk condition. It is evaluated at the widened $1/2000$ ceiling, rather than inherited from a smaller-speed theorem.

Since $h\ge h_0\ge1999/2000$ and $h_\theta\ge0.99\epsilon$, the future integrals obey

$$
\int_{\theta_*}^{\theta}\frac{\epsilon^2}{h^2}\,d\vartheta
\le\frac\epsilon{0.99h_0},\qquad
\int_{\theta_*}^{\theta}\frac{\epsilon^3}{h^4}\,d\vartheta
\le\frac{\epsilon^2}{2.97h_0^3}.
$$

The seed satisfies $|\mathbf c_*|<3.005\epsilon$, so $|\mathbf z(\theta_*)|<3.055\epsilon$. Let $a=10/(0.99h_0)$ and $b=1900/(2.97h_0^3)$. The elementary integrating-factor bound, with $e^{a\epsilon}\le(1-a\epsilon)^{-1}$, gives

$$
|\mathbf z(\theta)-\mathbf c_*|
\le\left[100+\frac{3.055a+b}{1-a/2000}\right]\epsilon^2
<800\epsilon^2.
$$

The worst-case bracket at $h_0=1999/2000$ is less than $775$, checked by exact rational arithmetic. At the maximal admitted speed the error is therefore below $0.4\epsilon$, while

$$
|\mathbf c_*|\ge\epsilon\frac{2-h_0}{h_0^2}>0.998\epsilon.
$$

After undoing the bounded matrix and the correctors, the resulting uniform statements are

$$
|\mathbf e/h|<6\epsilon,\qquad
|\mathbf e/h|>\epsilon/3\quad\text{when }h\ge4.
$$

For the lower bound, $|\mathbf z|>0.598\epsilon$, the first corrector costs at most $\epsilon/8$, the second less than $0.00002\epsilon$, and the matrix conversion less than $0.00022\epsilon$ at $h\ge4$. Their sum leaves more than $\epsilon/3$. This quantitative inequality is the decisive survival result. The signed seed persists even when the instantaneous eccentricity becomes order one.

## 5. The all-future angle and fate bridge

The lower-$h$ provisional boundary cannot occur because $h$ increases from $h_0$. If a first $|\mathbf e|=2$ event occurs, the upper seed bound gives $h>1/(3\epsilon)$. On the next $2\pi$ of possible angle, while $|\mathbf e|\le3$, the polar equation bounds $|\mathbf e_\theta|<25\epsilon^2$: the leading term is at most $8\epsilon/h$, the second polynomial has norm below $41\epsilon^2/h^2$, and the cubic term has the stated 1600 bound. Thus the eccentricity vector changes by less than $160\epsilon^2<0.00004$. A norm-three exit would require a unit change, and cannot occur on that interval. Completing the interval is also impossible: it includes a direction opposite the eccentricity vector at the event, where $1+\mathbf e\cdot\mathbf n<1-2+0.00004<0$, contradicting $1+e_n=h^2/r>0$.

Consequently the solution remains in the provisional class throughout its physical future. This is not a claim of a finite-time $r=\infty$ event. Indeed speed is bounded and radius has a positive floor. The exact torque bound implies

$$
0<(h^4)'\le128\epsilon.
$$

Hence $h$ and $r$ cannot diverge at finite $s$. On every finite physical interval, separation, delay and both root factors have positive floors, and the retained source velocity is locally Lipschitz. The ordinary method-of-steps contraction continues uniquely across a closed finite endpoint. This establishes all-future continuation with the original complete past.

If angle were unbounded, $h_\theta\ge0.99\epsilon$ would force $h\to\infty$. The lower seed bound would then force $|\mathbf e|$ past two, after which the previous contradiction prohibits another complete revolution. Angle is therefore finite. If the first norm-two event has not already occurred, reaching $h=6/\epsilon$ forces it by $|\mathbf e|>h\epsilon/3$. Combining the corresponding angular bound with one revolution and the release layer gives $\theta_\infty<8/\epsilon^2$. Also $h$ has a finite positive limit, below $10/\epsilon$.

Finite angle gives the actual-time integral

$$
\int_0^\infty\frac{ds}{r(s)^2}
=\int_0^{\theta_\infty}\frac{d\theta}{h(\theta)}<\infty.
$$

Radius is uniformly Lipschitz, since $|r'|\le4/h_0<4.01$. If it returned below a fixed $L$ infinitely often, this speed bound would provide disjoint intervals of fixed positive length on which $r\le2L$. Each would contribute a fixed positive amount to the displayed integral, a contradiction. Thus $r\to\infty$, not merely an unbounded sequence of excursions.

The acceleration bound $|\mathbf Y''|<1.01/r^2$ is integrable, so velocity converges. Since $h$ has a finite limit and $q=h/r\to0$, the limiting velocity is radial in the limiting direction. A strictly negative radial limit would eventually reduce radius at a fixed rate, contradicting $r\to\infty$. This proves the nonnegative outward limit. It does not exclude zero, and no outgoing-impulse criterion or physical energy account is needed for this dispersal conclusion.

## Boundaries, falsifiers and validation record

The requested quantitative widening is completed at derived subject grade: the original complete supplied-history class is admitted through $\epsilon=1/2000$, with explicit ordinary-root margins, a signed anisotropic cubic remainder, release-seam enclosure, surviving seed and an all-future dispersal bridge. Independent mathematical acceptance remains pending. The historical speed is inside the range; the historical trajectory receipt is not revalidated. To certify that particular source record, compare its complete-history preparation with the hypotheses above. A positive terminal speed and the tiny radial sign remain unproved.

The load-bearing falsifiers are a failure of the direct release-layer tube at the wider speed, a source window violating the component bounds, a missing second-order amplitude coefficient, a polynomial residual exceeding its stated constant, a missing corrector term, or an admissible exact solution violating the seed enclosure or staying bounded. A zero terminal speed does not refute the theorem. Inspect the displayed exact row, normalized integral identities, polynomial coefficients and the $800\epsilon^2$ integrating-factor bracket to localize a failure.

The sources inspected are the canonical per-hit row, the accepted local kernel and its independent reconstruction, the finite secular subject and its launch argument, the changing-scale subject, the accepted signed-polar subject and its adjudication, and their cited scientific references. The earlier first-order, finite and changing-scale claims are preserved at their existing grades. Germund Dahlquist is the assigned analytical lens and supplies no acceptance authority.

`node .tmp/binary-wider-regime/check-constants.mjs known` passed the exact controls $1/2+1/3=5/6$, $(1/2)^3=1/8$ and SHA-256 of `abc` before the target constants or input inventory were evaluated. Its target invocation used exact BigInt rational arithmetic to check the amplitude polynomial-tail bound, the residual after division, the release-layer eccentricity and corrector budgets, and the worst-case seed bracket. These checks establish the arithmetic inequalities, not the whole dynamical theorem. The recorded worst-case amplitude coefficient is below 1225 and the seed coefficient below 775. No target trajectory, production solver or Python interpreter was run.

The scientific input digests were inventoried before this new subject was written in `.tmp/binary-wider-regime/input-inventory.json`. Only this subject and `.tmp/binary-wider-regime/` are authored here; no previous subject, independent reference, queue, log, shared synthesis, canonical equation, acceptance gate, Git state or generated target is edited. `node .tmp/binary-wider-regime/validate.mjs` passed known SHA, fenced-link exclusion, mathematical-span extraction and valid/invalid KaTeX cases before its target checks. Its target run rendered all 291 mathematical spans, resolved six relative links and their anchors, and confirmed all ten inventoried scientific inputs unchanged by SHA-256 comparison. `git diff --no-index --check /dev/null` produced no whitespace diagnostics for this new subject; its exit one records the file's difference from the empty baseline. These are document and preservation checks, not independent acceptance of the theorem. The frozen subject digest and final validation receipt are retained in `.tmp/binary-wider-regime/validation.json` for the independent reviewer.
