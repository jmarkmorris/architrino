# Independent reconstruction of the binary value-regularity bridge

**Frozen reconstruction before reading the two prior adjudications.** This is a skeptical mathematical audit of the existing fixed member, not a new evolution or terminal-fate calculation. The member remains $\epsilon=2^{-200000}$, $K=c_f=1$, with the complete [case history](authorized-cases-ten-hour-b-case.md), its compatible degree-five release polynomial and its propagated sixth-derivative seams. The subject sources inspected were the [value estimate](authorized-cases-ten-hour-b-seam-aware-value-closure.md), [finite normal-coordinate remainder](authorized-cases-ten-hour-b-normal-form-remainder.md), [coordinate protocol](authorized-cases-ten-hour-b-normal-form-protocol.md), [row and derivative bounds](authorized-cases-ten-hour-b-majorant-addendum.md), [coefficient protocol](authorized-cases-ten-hour-b-autonomous-coefficient-protocol.md), and [radius-weighted extension](authorized-cases-ten-hour-b-phase-map-route.md). The exact selected row was also checked against its [definition owner](../../analysis/amplitude-gradient-regular-pair-investigation.md). No earlier subject, reference or shared owner is changed.

## Exact controls before judging the target bridge

These are local mathematical controls of defect transport and the selected row. They are not asserted to be coupled solutions or replacement pasts. No numerical instrument or trajectory is used.

For a smooth control take comparison field $F=0$, comparison path $W(t)=e_1$, and actual test path $Z(t)=(1+at^2/2)e_1$ for $t\le0$, with $a>0$. Both reception position and velocity agree. The defect is exactly $R=a e_1$, while the differences are $at^2/2$ and $a|t|$. At a positive root with delay $u$, the mirror clock is

$$
u=\lambda(2+au^2/2),\qquad
u=\frac{1-\sqrt{1-4a\lambda^2}}{a\lambda}.
$$

For $a\lambda^2\le1/16$, evaluation of the clock gap at $2\lambda$ and $3\lambda$ brackets this smaller root. Hence $u-2\lambda=a\lambda u^2/2\le(9/2)a\lambda^3$. The sampled velocity and acceleration are $b=-au e_1$ and $A=a e_1$. With $L=u/\lambda$, $n=e_1$ and $D=1-a\lambda u>0$, direct substitution into the selected normalized row gives

$$
\mathcal T_\lambda[Z]
=-\frac4{L^2D^2}e_1+
\frac{4\lambda^2a}{LD^3}e_1.
$$

This independently checks the cubic clock-shift scale and the quadratic delayed-acceleration weight, including its sign. Dropping that second term would fail this control.

For a seam control put $c=1/720$, $\lambda=1/16$, $\alpha=\lambda$, and

$$
Z(t)=\{1+c(-t-\alpha)_+^6\}e_1,
\qquad W(t)=e_1,\qquad -4\lambda\le t\le0.
$$

The notation $x_+=\max(x,0)$ makes this path $C^{5,1}$. Its sixth derivative jumps by one at $-\alpha$; its seventh distributional derivative contains a point measure. The actual acceleration is nevertheless continuous and is exactly $30c(-t-\alpha)_+^4e_1$. Thus the defect for $F=0$ is an ordinary continuous value, with

$$
S=30c(3\lambda)^4,
\quad |Z(-t)-W(-t)|\le S t^2/30,
\quad |Z'(-t)-W'(-t)|\le S t/5.
$$

The actual root satisfies $u=\lambda\{2+c(u-\alpha)_+^6\}$. Its gap is negative at $2\lambda$ and positive at $3\lambda$: the latter follows from $c(2\lambda)^6<1$. Its derivative is $1-6\lambda c(u-\alpha)_+^5>1/2$ on that bracket. In particular the source root lies beyond the sixth seam. The root shift is exactly $u-2\lambda=\lambda c(u-\alpha)^6$, bounded by $\lambda$ times the same-time position discrepancy. At this root,

$$
b=-6c(u-\alpha)^5e_1,\quad
A=30c(u-\alpha)^4e_1,\quad
\mathcal T_\lambda[Z]=
-\frac4{L^2D^2}e_1+
\frac{4\lambda^2A}{LD^3}.
$$

Every quantity exists across the seam and the acceleration contribution remains explicit. These exact identities establish the intended control before the following target-proof assessment. They also falsify any argument that a bounded seventh actual derivative is necessary for this particular value comparison.

## Integral defect transport reconstructed from the row

Let $F$ be a finite analytic comparison field, with Lipschitz constant $L_F$ on a common position/velocity buffer. At one reception freeze the scale and parameter, let $W''=F(W,W')$ backward from the actual current $(Z,Z')$, and define $R=Z''-F(Z,Z')$ on the actual source window. This definition applies to supplied history without requiring it to solve the delayed equation. Only $Z'$ absolutely continuous with bounded acceleration is needed for the following integrations; the admitted $C^{5,1}$ history is stronger.

Write $E=Z-W$ and $S=\sup|R|$ on the whole local window. For $0\le t\le h$, the two zero terminal conditions give the exact integral identities

$$
E'(-t)=-\int_{-t}^{0}\{F(Z,Z')-F(W,W')+R\}\,dv,
$$

$$
E(-t)=\int_{-t}^{0}(v+t)
\{F(Z,Z')-F(W,W')+R\}\,dv.
$$

For $h\le1$ and $L_F(h+h^2)\le1/4$, taking the position/velocity suprema and absorbing their feedback yields $|E'(-t)|\le2tS$ and $|E(-t)|\le2t^2S$. The same-time acceleration discrepancy is bounded by $S+L_F(|E|+|E'|)\le2S$ after the same smallness condition. There is no derivative of $R$ in these identities.

The mirror clock has gap $g_W(u)=u-\lambda|Z(0)+W(-u)|$. On its strict-speed interval, $g'_W\ge1/2$. At the actual root, its residual is at most $\lambda|E(-u)|$. Therefore

$$
|u-\widetilde u|\le2\lambda |E(-u)|.
$$

For the actual compact chart, both roots are at most $10\lambda$; the larger $20\lambda$ window provides coverage. Consequently $|u-\widetilde u|\le400\lambda^3S$. Transport only the analytic comparison path from $-u$ to $-\widetilde u$. Its velocity, acceleration and jerk bound the respective transport errors. This gives the subject's safe orders

$$
|\Delta Z_d|\le2^9\lambda^2S,\qquad
|\Delta V_d|\le2^5\lambda S,\qquad
|\Delta A_d|\le3S.
$$

The actual acceleration is evaluated at its own root and compared at a common time first. It is never Taylor-expanded across a seam or differentiated to transport it. This ordering is essential.

To check the row weights independently, introduce $z=\lambda b$ and $c=\lambda^2A$. The row becomes the finite-dimensional function

$$
\mathcal F(q,z,c)=
-\frac4{L^2(1+n\cdot z)^3}
\{(1-z\cdot z)n+(1+n\cdot z)z-Ln(n\cdot c)\},
\quad L=|q|,\ n=q/L.
$$

On the declared interpolating tuple buffer, positive $L,D$ and bounded $z,c$ give a finite derivative bound in these three arguments. The subject's $2^{20}$ bound is conservative on $1/2<L<16$, $|z|,|c|<1/8$, with the connecting position vectors confined away from zero. Thus its defect contribution is bounded by $2^{20}(|\Delta q|+\lambda|\Delta b|+\lambda^2|\Delta A|)\le2^{40}\lambda^2S$. The acceleration coefficient has been retained. Combined with the finite comparison field's own consistency defect this gives

$$
|R(0)|\le C\lambda^{17}+2^{40}\lambda^2S.
$$

This reconstruction verifies the regularity mechanism. It remains conditional on the quantitative comparison-field consistency bound and the complete actual chart, rather than establishing those premises by smoothness alone.

## Finite consistency and source-window obligations

The finite coefficient construction concerns jets of the analytic comparison field, not jets of the actual history. Source acceleration first enters at parameter degree two. Accordingly a change in a coefficient of the field enters the row two degrees later; eight triangular substitutions determine the required coefficients through sixteen. The finite source position polynomial needs jets only through sixteen, hence at most fourteen state differentiations of its analytic acceleration field.

The subject's eight groups of fourteen width losses, each $2^{-24}$, total $112\cdot2^{-24}<2^{-16}$. Starting with width $2^{-10}$ leaves more than $2^{-11}$. Its per-differentiation exponent budget gives $30+14\cdot58=842<1000$. After eight halvings of the initial parameter disk, the declared smaller disk $2^{-5010}$ is available. The analytic comparison flow and implicit root must remain in those buffers uniformly in the complex parameter. Under the stated field bound and time radius, Cauchy's estimate then applies to an analytic residual with vanishing coefficients through sixteen, and $2^{31+17\cdot5010}$, even with elementary component factors, is below $2^{86000}$. None of this arithmetic grants complex analyticity to the actual history.

The initial actual defect is bounded on the full recent polynomial window, not only at release. The subsequent finite-window contraction must include reception in the supremum and absorb its coefficient, rather than silently replace the source supremum by an endpoint value. The subject's nested intervals do so: after the initial absorption, each later interval samples only its predecessor or itself. Its ninth transmission of the initial $O(\epsilon^2)$ defect is $O(\epsilon^{20})$, below the retained $O(\epsilon^{17})$ consistency error. The original sixth seams remain present.

For persistence, the frozen homogeneity sends $R_y$ to $H^4R_y$ and parameter to $\epsilon/H$, giving weight $H^{21}$. Radius freezing instead sends it to $r^2R_y$ and parameter to $\epsilon/\sqrt r$, giving weight $r^{21/2}$. These exponents agree with the subject. The supplied initial interval must cover the first backward window, and the auxiliary left endpoint must increase thereafter. The displayed bounds $g'=1-40\epsilon HH'>1/2$ or $g'=1-20\epsilon r'>1/2$ provide precisely this safeguard. The compact argument also needs the previously admitted positive lower bound on $H$; the parabolic argument uses its explicit lower radius and speed bounds. Dropping either premise would invalidate the corresponding uniform small-parameter estimate.

## Finite coordinate-flow transport reconstructed independently

Let $x=\Phi(z)$ be the composition of the fifteen exact polynomial coordinate flows, and let the actual first-order value equation be $x'=V(x)+e$. Then the ordinary chain rule gives

$$
z'=D\Phi(z)^{-1}V(\Phi(z))+D\Phi(z)^{-1}e.
$$

This formula uses the value of $e$ only. It does not differentiate the actual-history defect. A $C^1$ actual state curve suffices. In logarithmic parameter coordinates, the ordinary parameter component of every generator retains a factor of that parameter, so the analytic transformed logarithmic field extends to parameter zero. There is no assertion that the actual logarithm exists at zero.

The finite norm premise bounds each generator on the radius-four state polydisk. On the radius-two buffer, Cauchy and the degree bound control the Jacobian. With parameter radius $\rho=2^{-10000}$, all fifteen displacements and variational exponents are $O(2^{4110}\rho^2)$, so the stated state buffer and Jacobian/inverse bounds close with ample slack. The finite Lie identities, if independently checked, are the Taylor coefficients of this exact transformed comparison field. Cauchy's tail bound at order seventeen applies to that analytic field alone.

The actual error enters afterwards through the inverse Jacobian and the old/new parameter ratio. Its multiplication by at most two for the Jacobian and by at most $2^{17}$ for the parameter preserves order seventeen. The bounded $w,u$ powers are harmless only inside the stated real parabolic image chart. No analytic continuation of the coordinates through $w=0$ constructs a physical path beyond infinite radius.

## Preliminary finding and explicit premise boundary

**Derived finding before cross-assessment:** the proposed bridge is compatible with the original $C^{5,1}$ history. A seventeenth-order acceleration-value approximation does not imply, or need, a seventeenth actual derivative. The two possible illicit moves—Taylor-expanding actual acceleration to high order, or differentiating its error during normal-coordinate transport—are absent from the reconstructed argument. Both exact controls pass the required identities, including a sampled sixth seam.

This is not an independent replay of all finite coefficient arithmetic, initial compatibility constants, or terminal classification. The conclusion requires the admitted actual chart and roots, the finite analytic consistency construction, the complete weighted-window induction, the generator norm, exact finite pullback identities, and the real coordinate-image domain. The next cross-assessment will verify how the frozen adjudications supply these premises. A missing one is a mathematical gap even if other components agree.

Falsifiers are a hidden derivative of the actual defect in a downstream consumer, an unbounded comparison jerk used for root transport, a source window leaving the bounded history, a failed tuple interpolation domain, a wrong finite coefficient identity, an excessive generator norm, loss of the inverse coordinate Jacobian, or use of the parabolic value estimate beyond its admitted chart. No Python, trajectory, new law, preparation change, long process, Git mutation or generated rewrite was used.
