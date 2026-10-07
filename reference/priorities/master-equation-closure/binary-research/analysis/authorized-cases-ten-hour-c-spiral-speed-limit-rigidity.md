# Any limiting speed of the departing family equals the exact spiral speed

## Result and significance

Claim grade: derived candidate, awaiting independent assessment. If an all-future regular strict-subfield continuation of a sufficiently small member of the admitted logarithmic departing family has a limit of its physical speed magnitude, that limit is the speed of the uniquely admitted expanding spiral,

$$
\lim_{t\to\infty}|v(t)|
=a\sqrt{1+\omega^2}=:\nu_*.
\tag{1}
$$

The parameters in (1) are the exact certified balance zero, not its printed decimals. In particular speed cannot converge to one, to zero, or to another subfield value. This does not prove that the speed limit exists or that the actual perturbed trajectory approaches a spiral. An all-future member can still have no speed limit, and the present theorem does not exclude unit-speed approach along a sequence.

The fixed law, preparation and perturbation family remain those in the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The proof uses the accepted [pointwise-subfield fate](authorized-cases-ten-hour-c-spiral-pointwise-fate.md), [quantitative radius and source bounds](authorized-cases-ten-hour-c-spiral-quantitative-dispersal.md), and [constant-speed tail identities](authorized-cases-ten-hour-c-spiral-constant-speed-obstruction.md). The new work supplies the compactness and ordinary-root margins needed to use a constant-speed limiting trajectory. They are derived below, not assumed.

## Recurrent radius proportional to time

Retain $w=t-s_0$, $w_0=-s_0>0$, $H(w)=h(t)$ and $r(t)=|x(t)|$. The exact two-endpoint torque estimate gives

$$
h'(t)\ge\frac{h(s(t))}{2\pi R(t)}
\tag{2}
$$

whenever the sampled source is generated. The source tends to infinity on the all-future branch. The following recurrent lower scale therefore holds:

$$
\limsup_{t\to\infty}\frac{r(t)}{t-s_0}
\ge c_*:=\frac1{1+4\pi}>0.
\tag{3}
$$

To prove it, suppose instead that $r(t)\le c(t-s_0)$ eventually for some $0<c<c_*$. At sufficiently late receptions the same bound holds at the source. The root equation implies

$$
w_s:=s-s_0\ge\kappa w,\qquad
\kappa=\frac{1-c}{1+c},\qquad
R=w-w_s\le\frac{2c}{1+c}w.
$$

Using monotone $h$ in (2),

$$
H'(w)\ge A\frac{H(\kappa w)}w,
\qquad A=\frac{1+c}{4\pi c}.
\tag{4}
$$

Here $A\kappa=(1-c)/(4\pi c)>1$. By continuity there exists an exponent $\alpha>1$ with $\alpha<A\kappa^\alpha$. Choose a late $L$ after which (4) holds and a positive coefficient $B$ so small that $Bw^\alpha\le H(w)$ on $[\kappa L,L]$. A first-crossing argument gives $H(w)\ge Bw^\alpha$ thereafter: at a first downward crossing, (4) makes its derivative strictly larger than that of $Bw^\alpha$. This contradicts $H(w)<r(w)\le cw$. Thus (3) follows. It asserts recurrent macroscopic radius, not a uniform positive lower bound for $r/w$.

## Convergent speed excludes inward motion at macroscopic radius

Now assume that $|v(t)|\to\nu\in[0,1]$ on the all-future branch. Put $E=|v|^2$, let $p=r'$ be radial velocity, and let $z=h/r>0$ be tangential velocity. The positive acute lag gives an inward radial acceleration and positive tangential acceleration. The actual radial and speed identities imply

$$
p'\le\frac1r,
\qquad
E'\ge\frac{(-p)r}{w^2}\quad\hbox{whenever }p\le0.
\tag{5}
$$

For the second inequality, $e\cdot A\le-r/(2w^2)$ follows from $e\cdot n\ge r/R$, $D\le2$ and $R\le w$. In $E'=2p(e\cdot A)+2z(J e\cdot A)$ the second term is nonnegative, and multiplying the first bound by negative $p$ reverses its inequality. No lower bound on the transmitter factor is used.

For every $c\in(0,1)$ and every $\varepsilon\in(0,1)$, (5) implies

$$
r(t)\ge cw\quad\Longrightarrow\quad p(t)>-\varepsilon
\quad\hbox{at all sufficiently late times.}
\tag{6}
$$

Suppose a late time has $r\ge cw$ and $p\le-\varepsilon$. Consider the following interval of length $\ell=\varepsilon cw/8$. The unit speed bound keeps $r\ge cw/2$ there, and $w$ increases by less than a factor of two. Since $p'\le2/(cw)$, radial velocity stays below $-\varepsilon/2$ throughout that interval. Formula (5) consequently gives

$$
E(t+\ell)-E(t)\ge\frac{\varepsilon^2c^2}{128}.
\tag{7}
$$

Both terms on the left tend to the same assumed limit $\nu^2$ as $t\to\infty$. Their difference cannot retain the fixed positive lower bound. This contradiction proves (6). Its content is that convergence of speed prevents a substantial inward passage at a radius proportional to elapsed time.

## A rescaled limit retains positive radius for all later scaled time

By (3), choose $W_j\to\infty$ with $r(s_0+W_j)/W_j\ge c_*/2$. Define actual rescaled trajectories and source clocks by

$$
q_j(u)=\frac{x(s_0+W_ju)}{W_j},\qquad
\sigma_j(u)=\frac{s(s_0+W_ju)-s_0}{W_j}.
\tag{8}
$$

Each $q_j$ is defined for $u\ge w_0/W_j$. Its derivative is the actual physical velocity, so it is 1-Lipschitz, and the accepted radius bound gives $|q_j(u)|<19u/20$. The elementary compactness theorem for uniformly bounded equicontinuous functions, followed by a diagonal subsequence over compact positive $u$ intervals, gives locally uniform convergence to a Lipschitz curve $q$. Write $r_\infty=|q|$. At $u=1$, $r_\infty(1)\ge c_*/2$.

On any compact interval where $r_\infty>0$, locally uniform convergence and (6) give $d|q_j|/du\ge-\varepsilon$ for all sufficiently large $j$, for each fixed $\varepsilon>0$. Integrating and then taking the limits proves that $r_\infty$ is nondecreasing on every positive-radius component. The component containing one cannot terminate to the right at zero. Therefore

$$
r_\infty(u)\ge c_*/2\qquad(u\ge1).
\tag{9}
$$

This is the missing noncollapse property. It follows from speed convergence and the recurrent large-radius sequence. It is not inferred from the weaker power lower bound alone.

## Source denominators become regular in that same limit

For each compact receiving interval $[a,b]$ with $a>39$, the accepted source ratio gives $\sigma_j(u)\ge u/39>1$ for all large $j$. Both receiving and source points lie in the region (9). Uniform convergence makes their scaled radii uniformly positive. Applying (6) on the corresponding compact source region gives $p(s)\ge-\varepsilon$ uniformly as $j\to\infty$.

Resolve the source velocity in its own radial and positive tangential axes. The chord has positive projections on both axes:

$$
n\cdot e_s=\frac{r_s+r\cos\delta}{R}>0,
\qquad n\cdot J e_s=\frac{r\sin\delta}{R}>0.
$$

Since its tangential velocity is positive, $n\cdot v(s)\ge-\varepsilon$. Thus $D_j\ge1-\varepsilon$, while the scaled range $R_j=u-\sigma_j\ge|q_j(u)|$ is uniformly positive. In particular,

$$
q_j''(u)=-\frac{n_j(u)}{R_j(u)D_j(u)}
$$

is uniformly bounded on compact intervals with $u>39$. A further diagonal subsequence therefore gives $C^1$ convergence there, with $|q'(u)|=\nu$. The source clocks are also equicontinuous on those intervals because $0<\sigma_j'=(1-n_j\cdot q_j')/D_j\le4$ for large $j$.

For receiving times $u>39^2$, every source lies above 39, where the source velocities already converge. Passing to a subsequence of the clocks, the exact root and response pass to the limit:

$$
u-\sigma(u)=|q(u)+q(\sigma(u))|>0,
$$

$$
q''(u)=-\frac{n(u)}{[u-\sigma(u)]D(u)},\qquad
D(u)=1+n(u)\cdot q'(\sigma(u))\ge1.
\tag{10}
$$

The position and velocity convergence, positive range and denominator make the right sides converge uniformly on compact subintervals, which supplies $C^2$ regularity of $q$ there. The limiting source satisfies $\sigma(u)\ge u/39$ and therefore tends to infinity. Equation (10) is the unchanged coefficient-one logarithmic row. No projected response, missing source or new physical history has entered the passage to the limit.

## Classification of the limiting constant-speed trajectory

If $\nu=0$, the constant zero derivative of $q$ contradicts the nonzero right side of (10). Hence $\nu>0$. Constant speed in (10) gives $n\cdot q'=0$. The limit has nonnegative geometric angular momentum, while $q\cdot n>0$. Therefore the perpendicular branch is $q'=\nu Jn$, giving strictly positive angular momentum and rotating normal on the regular tail.

At sufficiently late reception and source times, the positive angle lift and acute lag required in the constant-speed argument hold. They pass from the original curves with lag in $(0,\pi/2)$; strictness follows on the limiting tail because its normal rotates and hence its unit-speed chord inequality is strict when $\nu=1$, while the ordinary strict speed inequality suffices when $\nu<1$.

The [constant-speed normal and clock calculation](authorized-cases-ten-hour-c-spiral-constant-speed-obstruction.md#constant-speed-fixes-the-normal-geometry) consequently applies. If $\nu=1$, its exact identities require both $\gamma=3\pi/4$ and $\gamma=\sqrt2\log(1+1/\sqrt2)<2$, a contradiction. Thus $0<\nu<1$.

For $0<\nu<1$, those same identities force a self-similar spiral tail. Its exact parameters satisfy the two balance equations and the acute-lag clock relation. The accepted [analytic uniqueness of that balance triple](alternatives-screen-2026-10-05-logarithmic-spiral-classification-adjudication.md#independent-scalar-count) identifies it with the admitted $(a,\omega,\lambda)$. This use is of the algebraic parameter classification, not a claim that the limiting curve itself has a newly chosen complete negative-time preparation. It gives $\nu=\nu_*$ and proves (1).

The exact admitted spiral is a known consistency case for the whole implication: it has constant speed $\nu_*$, radius proportional to time, generated source ratio $\lambda$, and transmitter factor $1/\lambda>1$. Its phase can be chosen along a convergent subsequence of rescalings. The new conclusion concerns which limits are possible for the actual departing family, not renewed certification of that base.

## Remaining branch question, falsifiers and disposition

The actual family can still reach unit speed at a finite maximal strict-domain endpoint. On an infinite branch it disperses with endless winding. If its speed magnitude converges, only $\nu_*$ is possible; the [no-capture theorem](authorized-cases-ten-hour-c-spiral-constant-speed-obstruction.md) says a nonzero sufficiently small member cannot become an exact constant-speed spiral after a finite time. Asymptotic approach to that speed, oscillatory speed without a limit, and unit-speed approach along subsequences remain unresolved. No claim of attraction or nonlinear return to the base is made.

Falsifiers are a missing generated-source hypothesis in (4); failure of the delayed power comparison; an inward passage satisfying the declared radius and velocity bounds but evading (7); an error in the nondecreasing positive-radius limit argument; loss of source coverage above 39; failure of the lower transmitter estimate from nonnegative radial and tangential source projections; or a constant-speed limiting parameter triple outside the accepted analytic count. The limit equation is used only after its positive radius, source range, source velocity convergence and denominator have been proved.

Validation is analytical, with the exact spiral as the known case. No numerical amplitude, computational instrument or trajectory is introduced. Only this new subject is written. Prior subjects, references and shared owners are preserved; no owned computation is active. The source is frozen before disclosure of a separately derived asymptotic reference, and independent assessment remains required.
