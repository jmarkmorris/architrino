# First received environmental feedback in the fixed smooth lattice control

## Result and scope

For the unchanged smooth two-target complete past and $0<g=G/\ell\le16$, the infinite population continues under the Master Equation through $T=17\ell/16$. This interval includes the first received emissions from nonstationary environmental futures. Both targets begin moving at the exact dimensionless time $\beta=\sqrt2-3/8$. Their common leading displacement is sixth order in time after that onset; their separation first changes at tenth order and initially increases.

This is a delayed coupling between EOM-generated histories. A method-of-steps argument proves that every received generated source segment still belongs to the already accepted prefix through $113\ell/128$. Those source segments are therefore known solutions, not prescribed environmental replacements. The equation on the new interval can again be solved as a finite family of receiver ordinary differential equations, now driven partly by previously evolved environmental paths. The original complete-history class, block prescription and coupling range are preserved.

Claim grade: derived, submitted for independent reconstruction. The [distance-two continuation and adjudication](smooth-two-particle-distance-two-independent-adjudication.md) supply the accepted prefix. The [first-response adjudication](smooth-two-particle-first-response-independent-adjudication.md) supplies the first 24 environmental motions. This result concerns that fixed input and its stated bounded comparison class. It establishes neither arbitrary-history invariance, global existence, contact under other histories nor a physical selection of the population domain.

## 1. Unchanged input and the new causal step

Set $c_f=1$, anchors $\mathbf z_i=\ell i$ for $i\in\mathbb Z^3$, polarities $\sigma_i=(-1)^{i_1+i_2+i_3}$, and $G=\kappa q_0^2>0$. The targets are $E=\{0,e_1\}$, where $e_1=(1,0,0)$, and $\mathbf e=e_3=(0,0,1)$ is the supplied displacement direction. Only the two target pasts differ from their anchors:

$$
\mathbf X_j(s)=\ell j+2^{-16}\ell\mathbf e\,
\psi\big(8(s/\ell+5/4)\big),\qquad j\in E,\quad s\le0,
$$

where $\psi(v)=v(1-v^2)^4$ for $|v|<1$ and zero outside. Every environmental past is stationary. The supplied pulse has support $[-11\ell/8,-9\ell/8]$, endpoint derivatives through third order zero, displacement at most $\varepsilon\ell$ with $\varepsilon=2^{-16}$, speed at most $\nu=1/8192$, acceleration at most $3/(8\ell)$ and jerk at most $27/(2\ell^2)$. Supplied pasts are not asserted to solve the past EOM.

Write $t=T/\ell$, $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\ell i)/\ell$ and retain the accepted solution through $h=113/128$. Its displacement is below $1/1024$, speed below $1/400$, and dimensionless acceleration below $g/6400$. The complete population is stationary from release to

$$
\alpha=\sqrt2-11/8.
$$

The first environmental responders are the 24 labels $\mathcal S=\mathcal S_0\cup\mathcal S_{e_1}$, where $\mathcal S_c=\{j:\|j-c\|^2=2\}$. All other environmental futures remain stationary until at least $\sqrt3-11/8$.

For the new continuation use

$$
H=17/16,\qquad B=1/512,\qquad r_0=1-2B=255/256,
\qquad S=H-r_0=17/256<h.
$$

The larger proof ball $B$ is still far inside the [original class](population-history-class.md); it changes no class ceiling or input. On this ball every cross range is at least $r_0\ell$. Thus every received nonnegative emission satisfies $s/\ell\le S$. Since $S<\sqrt3-11/8$, only the 24 paths in $\mathcal S$ can supply a nonstationary generated correction. Moreover $H+2B=273/256<\sqrt2$, so such a correction is possible only for $\|i-j\|=1$. Emissions from stationary postrelease histories can also arrive; they equal their stationary reference rows and are not counted as generated-motion corrections.

This reduction can be constructed before assuming the new solution. Use the accepted source histories only through $h$. At source cut $h$, the delay-minus-range residual is negative because $H-h<1-B-1/1024$. Toward the remote past it increases with delay at least at rate $1-1/400$ and eventually becomes positive. Hence each source function has a unique root below the cut, and the preceding range bound places any nonnegative root below $S$. No extension of an unknown source future is sampled.

## 2. Exact equation and a continuation estimate

Let $\mathbf K(\mathbf x)=\mathbf x/\|\mathbf x\|^3$. The unchanged stationary eight-source block sum, with the receiver's own source omitted, defines $\mathbf S_0(\mathbf y)$, with accepted bounds

$$
\|\mathbf S_0(\mathbf y)\|\le C_B\|\mathbf y\|^3,
\quad \|D\mathbf S_0(\mathbf y)\|\le3C_B\|\mathbf y\|^2,
\qquad C_B=1309/(1-B)^5<1400.
$$

The subscript distinguishes this stationary acceleration sum from the scalar source-time bound $S$. Its cubic behavior follows from exact equilibrium and cube symmetry. No stability conclusion is inferred from it.

For a source with known dimensionless displacement $\mathbf U_j(s)$ and velocity $\mathbf V_j(s)$, define its correction at the actual root

$$
\begin{gathered}
t-s=\|\mathbf k+\mathbf y-\mathbf U_j(s)\|=r,
\quad \mathbf k=i-j,\quad
\mathbf n=(\mathbf k+\mathbf y-\mathbf U_j(s))/r,\\
D=1-\mathbf n\cdot\mathbf V_j(s),\qquad
\mathbf Q_{ij}(t,\mathbf y)=
\frac{\mathbf K(\mathbf k+\mathbf y-\mathbf U_j(s))}D
-\mathbf K(\mathbf k+\mathbf y).
\end{gathered}
$$

Here and below source time inside dimensionless equations is measured in units of $\ell$. For $j\in E$, $\mathbf U_j$ is the supplied old pulse followed by its accepted stationary target prefix; call the correction $\mathbf Q^{\rm old}_{ij}$. For $j\in\mathcal S$, it is the stationary supplied past joined to its accepted EOM future; call it $\mathbf Q^{\rm gen}_{ij}$. These source sets are disjoint. The exact new receiver equation is

$$
\mathbf y_i''=g\left[
\mathbf S_0(\mathbf y_i)
+\sum_{j\in E\setminus\{i\}}\sigma_i\sigma_j\mathbf Q^{\rm old}_{ij}
+\sum_{\substack{j\in\mathcal S\\\|i-j\|=1}}
\sigma_i\sigma_j\mathbf Q^{\rm gen}_{ij}
\right].
$$

There are at most two old and six generated corrections per receiver. Self rows are not inserted into these sums; their complete exclusion is proved below. This is the [canonical transmitter-weighted acceleration](../../../../content/markdown/aaa/dynamics/master-equation.md). Receiver playback does not multiply a row. The infinite tail is unchanged because only finitely many source corrections are active.

Distance-one old pulses have finished before release, and every possibly active old row has subtraction-segment range greater than $\sqrt2-B-\varepsilon>7/5$. Thus

$$
Q_o=\frac{2\varepsilon(5/7)^3+\nu(5/7)^2}{1-\nu},
\qquad C_BB^3+2Q_o<1/6000.
$$

For a generated source, integration from its exact resting onset $\alpha$ uses the accepted prefix acceleration, giving $\|\mathbf U_j(s)\|\le g(s-\alpha)^2/12800$ and $\|\mathbf V_j(s)\|\le g(s-\alpha)/6400$. Since $\sqrt2>361/256$, one has $\alpha>9/256$ and $S-\alpha<1/32$. On every received generated segment,

$$
\|\mathbf U_j\|\le P=1/819200,
\quad \|\mathbf V_j\|\le V=1/12800,
\quad \|\mathbf U_j''\|\le g/6400\le1/400.
$$

The actual range and subtraction segment exceed $7/8$, so

$$
Q_g=\frac{2P(8/7)^3+V(8/7)^2}{1-V}<1/9000.
$$

These are exact rational comparisons. Generated corrections vanish until after $L=33/32$: before then any received source time is at most $L-r_0=9/256<\alpha$. The total acceleration therefore satisfies the piecewise bound

$$
\|\mathbf y_i''(t)\|
\le\frac g{6000}+\frac g{1500}\,\mathbf 1_{\{t>L\}}.
$$

The indicator is only a bound, not a discontinuity in the equation. Integrating, including the accepted prefix, gives

$$
\begin{aligned}
\|\mathbf y_i(t)\|&\le\frac{gt^2}{12000}
+\frac{g(t-L)_+^2}{3000},\\
\|\mathbf y_i'(t)\|&\le\frac{gt}{6000}
+\frac{g(t-L)_+}{1500}.
\end{aligned}
$$

At $g=16$ and $t=H$, these are respectively $29/19200<B$ and $19/6000<1/256$. Also $\|\mathbf y_i''\|\le g/1200\le1/75$. Local existence on the regular source-root chart, followed by the strict first-exit contradiction and bounded velocity, continues the finite receiver system through $H$. Source histories on the new step are accepted EOM outputs, so this ordinary-differential-equation construction implements the delayed coupling across steps.

For regularity and uniqueness, the source velocity and acceleration bounds and $r>7/8$ give a uniform receiver-position Lipschitz bound. In particular, with $W_*\le1/4$ and $A_*\le3/8$ bounding the sampled source velocity and acceleration, implicit differentiation bounds $\|s_{\mathbf y}\|\le4/3$, $\|\mathbf R_{\mathbf y}\|\le4/3$ and $\|D_{\mathbf y}\|\le(4/3)(W_*/r+A_*)$. Differentiating both terms of $\mathbf Q$ then bounds its receiver derivative by

$$
2(8/7)^3(4/3)^2
+(8/7)^2(4/3)^3\big((1/4)(8/7)+3/8\big)
+2(8/7)^3<11.
$$

Thus a uniform acceleration Lipschitz constant $89g$ suffices for at most eight rows plus $3C_BB^2<1/32$. The exact value is not a class parameter.

To bound jerk, differentiate the actual root using receiver velocity $\mathbf v$, source velocity $\mathbf W$ and source acceleration $\mathbf A$:

$$
s'=\frac{1-\mathbf n\cdot\mathbf v}{D},\quad
\mathbf R'=\mathbf v-\mathbf W s',\quad
\mathbf n'=\frac{(I-\mathbf n\mathbf n^{\mathsf T})\mathbf R'}r,
\quad D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,s'.
$$

The conservative bounds $\|\mathbf v\|,\|\mathbf W\|\le1/4$, $\|\mathbf A\|\le3/8$, $r>7/8$ give $|s'|\le5/3$, $\|\mathbf R'\|\le2/3$, $\|\mathbf n'\|\le16/21$ and $|D'|\le137/168<1$. Including the stationary subtraction derivative yields

$$
\|\mathbf Q'\|<8192/3087+1024/441+256/343<6.
$$

Eight corrections and the background give $\|\mathbf y_i'''\|<49g\le784$. Known source paths are $C^3$, their first generated onset has vanishing jets through third order, and the equation agrees with the accepted prefix on a neighborhood of the step cut. Hence the histories join as $C^3$ paths at that cut and at every new arrival. No source acceleration term is omitted from the jerk calculation.

## 3. Complete receiving geometry

The old-pulse receiving set remains

$$
\mathcal A=\bigcup_{c\in E}\{i:\|i-c\|^2\in\{2,3,4,5\}\},
\qquad |\mathcal A|=76.
$$

The strict inequalities $H<\sqrt6-11/8-B$ and $H<\sqrt5-9/8-B$ exclude distance-$\sqrt6$ entries and keep distance-$\sqrt5$ pulses unfinished. The earlier 52 complete and 48 entered but unfinished old-pulse pairs are retained.

The generated receiving set is $\mathcal R=N(\mathcal S)$, the nearest neighbors of the first 24 responders. For one center $c$,

$$
N(\mathcal S_c)=\{i:\|i-c\|^2\in\{1,3,5\}\}.
$$

| Squared distance from $c$ | Receivers per center | Sources in $\mathcal S_c$ per receiver | Ordered channels |
| --- | ---: | ---: | ---: |
| $1$ | $6$ | $4$ | $24$ |
| $3$ | $8$ | $3$ | $24$ |
| $5$ | $24$ | $1$ | $24$ |

The counts follow by adding or removing one unit coordinate from a signed permutation of $(1,1,0)$. A unit vector admits four completions, a signed $(1,1,1)$ three, and a signed permutation of $(2,1,0)$ one. The two centers' receiver sets have opposite absolute lattice parity and are disjoint. Thus there are 144 generated ordered channels and 76 receiving labels: 12 receive four sources, 16 receive three, and 48 receive one. Moreover $\mathcal R\setminus\mathcal A=E$ and $|\mathcal R\cap\mathcal A|=74$. The union $\mathcal M=\mathcal A\cup E$ has 78 labels. No new environmental label beyond $\mathcal A$ is needed on this step. The zero path solves the equation at every label outside $\mathcal M$ and is unique there.

The onset of a generated source history is emitted at $\alpha$, when that source is still at its anchor. For each nearest-neighbor generated channel the actual arrival solves

$$
F_{ij}(t)=t-\alpha-\|i-j+\mathbf y_i(t)\|=0.
$$

Its derivative is at least $255/256$ and it differs from $t-\beta$ by at most $B$, where $\beta=\alpha+1=\sqrt2-3/8$. Every one of the 144 roots therefore lies in $[\beta-B,\beta+B]\subset(0,H)$. The source time increases along reception because $(1-\mathbf n\cdot\mathbf y_i')/(1-\mathbf n\cdot\mathbf y_j')>0$, so later emitted interior points cannot precede their onset boundary. This is an actual moving-receiver census, not an assignment of anchor times to moving receivers.

The global first boundary is the minimum of those 144 zeros. Section 4 proves that the target boundaries are exactly $\beta$, giving

$$
t_{\min}\in[\beta-B,\beta].
$$

The present bounds do not identify the minimizing already-moving receiver or show a strict inequality $t_{\min}<\beta$. Reception counts alone do not establish nonzero summed acceleration at every receiving label.

## 4. Actual target motion and the first separation change

Target 0 has four generated source neighbors $\pm e_2,\pm e_3$, all in $\mathcal S_{e_1}$. Target $e_1$ has $e_1\pm e_2,e_1\pm e_3$, all in $\mathcal S_0$. Each target/source polarity product is $-1$. The old target-to-target pulse has already passed. The constant target path solves the receiver equation through $\beta$, so local uniqueness makes the target onset exactly $\beta$. Earlier feedback at other moving receivers cannot arrive at the targets on this step: all sampled source segments end before $S<h$.

Let $\delta=t-\beta>0$. For the two vertical sources write their offsets from their original exciting target as $\mathbf k=(a,0,z)$ with $z=\pm1$, where $a=-1$ for target 0's neighbors and $a=+1$ for target $e_1$'s neighbors. Their accepted first motion, in source time $\alpha+u$, is

$$
\mathbf U_j(\alpha+u)=-\frac g{20}\mathbf k z\,u^5+O_g(u^6),
\qquad
\mathbf V_j(\alpha+u)=-\frac g4\mathbf k z\,u^4+O_g(u^5).
$$

For a unit target/source direction $\mathbf n$, the correction linear in generated source displacement and velocity, including the negative polarity product, is

$$
gD\mathbf K(\mathbf n)\mathbf U_j-g\mathbf n(\mathbf n\cdot\mathbf V_j),
\qquad D\mathbf K(\mathbf n)=I-3\mathbf n\mathbf n^{\mathsf T}.
$$

Both vertical source velocities have third component $-gu^4/4$, so their target contributions add. The two transverse sources start at sixth-order displacement and do not change the leading coefficient. The zero-data integral equation and receiver Lipschitz control therefore give

$$
\mathbf y_0(\beta+\delta)=\frac{g^2}{60}\mathbf e\,\delta^6+O_g(\delta^7),
\qquad
\mathbf y_{e_1}(\beta+\delta)=\frac{g^2}{60}\mathbf e\,\delta^6+O_g(\delta^7).
$$

This nonzero coefficient proves actual target motion for each $g>0$. It is identical at both targets and cancels in relative displacement. The first relative term requires the next signed cancellation calculation rather than a conclusion from common motion.

To obtain it, expand the vertical sources' original exciting correction. For $d=\sqrt2$, pulse $p(u)=(-1+8u)u^4(1-4u)^4$, and old emission variable $u$ near zero,

$$
\frac{Q_x}{k_x}=d^{-3}\left[
\frac{k_3}{d}p'(u)+\frac{3k_3}{d^2}p(u)
+\frac{k_3^2}{d^2}p'(u)^2\right]+O(u^7).
$$

The old emission variable differs from its source-receiver onset offset $\theta$ by $u=\theta+(k_3/d)p(\theta)+O(\theta^7)$. All first-component terms below sixth order are odd in $k_3$ and cancel between the vertical sources. The first even term has two contributions: $p''(\theta)p(\theta)=12\theta^6+O(\theta^7)$ from moving the old root, and $p'(\theta)^2=16\theta^6+O(\theta^7)$ from the transmitter denominator. Therefore

$$
Q_x^{\rm even}=\frac{28k_xk_3^2}{d^5}\theta^6+O(\theta^7)
=\frac{7k_x}{\sqrt2}\theta^6+O(\theta^7).
$$

The original source-receiver correction has receiver derivative $O(\theta^2)$ and source displacement $O_g(\theta^5)$, so its own EOM feedback changes acceleration only at order seven or later; the stationary cubic background is still higher order. Two integrations and addition of the vertical pair give

$$
U_{j_+,x}(\alpha+u)+U_{j_-,x}(\alpha+u)
=\frac{ga}{4\sqrt2}u^8+O_g(u^9).
$$

At the target, the linear source-velocity correction has no first component for a vertical unit direction. Its nonlinear first-component contributions are order nine or later, since source displacement is order five and velocity order four. The linear displacement contribution is $g$ times the preceding pair sum. The transverse source pair first has first-component displacement at order nine. Moving the target source roots changes a fifth-order source displacement by order nine, since $u-\delta=O_g(\delta^5)$; target receiver feedback is also order nine in acceleration, from source acceleration of order three and target displacement of order six. Consequently

$$
\begin{aligned}
y_{0,x}(\beta+\delta)&=-\frac{g^2}{360\sqrt2}\delta^{10}+O_g(\delta^{11}),\\
y_{e_1,x}(\beta+\delta)&=+\frac{g^2}{360\sqrt2}\delta^{10}+O_g(\delta^{11}).
\end{aligned}
$$

Reflection across $x_1=1/2$ exchanges targets and globally reverses polarity without changing any polarity product. It preserves the input and fixed block partition. Reflection in $x_2=0$ also preserves the input and the stationary sum: its absolutely convergent sum of third kernel derivatives is equivariant under the lattice reflection, and integrating that identity with the accepted vanishing stationary value, first derivative and second derivative at the anchor gives the same reflected sum. This does not assume arbitrary partition independence. The finite corrections transform with their sources. Equivariance and regular uniqueness thus give equal third components, opposite first displacements and zero second components. The physical separation has the expansion

$$
\|\mathbf X_{e_1}-\mathbf X_0\|
=\ell\left[1+\frac{g^2}{180\sqrt2}\delta^{10}+O_g(\delta^{11})\right].
$$

It increases for a sufficiently small positive interval after onset for each fixed $g>0$. The remainders are local as $\delta\downarrow0$; their sign is not controlled through the full horizon by this expansion. All 76 environmental histories were already nonconstant in the accepted prefix; the two newly nonconstant targets and stationary complement therefore give exactly 78 nonconstant future histories on $[0,H]$.

## 5. Complete roots, bounded uniqueness and original class

Join the constructed new interval to the accepted prefix and the original supplied past. Complete displacement is below $B\ell$ and speed at most $1/256$. Hence every cross range is at least $255\ell/256$, and its global positive-delay residual increases at least $255/256$ times the delay increment. Opposite endpoint signs give exactly one cross root. Each original half-width $w=\ell/256$ tube lies in positive delay, with range at least $255\ell/256$, transmitter floor $255/256$ and complement gap at least $255w/256>w/4$.

Self residuals satisfy $f_{ii,T}(\tau)\ge255\tau/256$, excluding all positive self roots and preserving both the normalized near-diagonal floor and the ordinary complement for $\tau\ge2w$. The exact zero-delay diagonal remains unevaluated. Every cross root satisfies $s/\ell\le S=17/256<h$, which proves identification of the finite method-of-steps equations with the full EOM, including generated-source rows.

Uniqueness is among classical continuations with the identical original complete past and block prescription, displacement at most $B\ell$ and speed at most $1/4$. A competitor first matches the accepted prefix: throughout $t\le h$, its cross emissions are negative because $h<1-2B$, and its speed bound excludes positive self roots. Thus every label satisfies the same locally Lipschitz fixed-past receiver equation, giving equality with the accepted prefix even though $B$ is larger than the earlier proof ball. On $[h,H]$, the same displacement bound forces all emitted source times below $S<h$. Every competitor then samples the identical accepted prefix and satisfies the same new receiver equations. Ordinary uniqueness at each label completes the comparison. This is a two-stage delayed argument, not a claim across unbounded or singular continuations.

Complete acceleration is at most $3/(8\ell)$ and complete jerk at most $784/\ell^2$, below the original class ceilings $256/\ell$ and $65536/\ell^2$. The displacement and speed bounds retain both original envelopes and speed ceiling. Equal-time separation exceeds $255\ell/256>\ell/8$, and the unchanged anchor-cube volume estimate preserves the infinite density constants. The joined histories remain $C^3$. Thus the original class is preserved at every cut through $17\ell/16$ for this control. In particular there is no coordinate coincidence on the proved interval, independently of the local separation-increase expansion.

Falsifiers include a failed prefix source-time bound; an active nonnearest generated row; a missed signed neighbor contribution; failure of either rational acceleration estimate or the strict integrated displacement bound; a missing source-acceleration term in the derivative; a root contradicting complete monotonicity; a lower-order uncancelled target first component or incorrect $12+16$ coefficient; or a violated original class ceiling. A different history, summation rule, coupling range or comparison class changes the theorem's premises. The identity of the globally earliest moving receiver and long-time target separation remain unresolved.

## Development and validation record

The operator approved continuation through first received EOM-generated environmental motion. Eleven scientific references were frozen with shasum -a 256 in .tmp/smooth-two-particle-generated-feedback/frozen-inputs.sha256 before development. Earlier subjects and independent references are not edit targets. Existing manuscript coverage snapshots remain historical. An exact-name rg search under scripts, tests, src, .github, .githooks, this workstream's evidence directory and reference/op/skills returned no matching distance-two-subject or manuscript-path binder; this is not an absence claim about all consumers. No generated write is in scope.

The coordinator derived the continuation estimates while the fresh-context read-only mec-008 generated-feedback geometry worker independently derived the neighbor census and target coefficients, conditional on the new continuation. Its derivation agrees on the common sixth-order motion and tenth-order separation increase. A separate reviewer must reconstruct this combined frozen subject before mathematical acceptance. The arithmetic/lattice instrument .tmp/smooth-two-particle-generated-feedback/check.mjs passed known rational and six-neighbor controls before target use, then checked the exact continuation constants and 144-channel/76-receiver/78-label census. These are supplementary measured arithmetic checks, not an EOM simulation or independent theorem acceptance.
