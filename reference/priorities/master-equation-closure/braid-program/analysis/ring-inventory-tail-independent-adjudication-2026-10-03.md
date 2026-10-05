# Independent adjudication of the fixed-inventory circular tail

Date: 2026-10-03. Frozen subject: [alternating inventory ladders](ring-inventory-ladders-2026-10-03.md), SHA-256 `68537f3975820e7f13634e7465dbb9cd79de95bd08e54810bf43ea53dea87573`. This pins the version with its appended 600-row completion account. Scope here is solely the fixed-even-inventory analytical theorem, including its paired tail, local high-cell balance, next radius coefficient and fast common-sector limit. The finite 120/600-row admissions, arithmetic tables, process receipts and finite stability witnesses require their separate reviews.

## Verdict

Accepted, derived at each fixed even member count $M$: the complete older tangential ledger is $a+O_M(\beta^{-3/2})$, the older radial ledger is $-b+O_M(\beta^{-1/2})$, with $a=M^2/24$ and $b=M\log2/(2\pi)$. The mixed inverse-derivative estimate and alternating total-variation argument can be reconstructed explicitly below. The even cap's leading cancellation is necessary and valid. These estimates justify the next radius coefficient; an unquantified limit of the older tangential sum alone would not do so.

Accepted at local asymptotic scope: at every sufficiently high odd birth there is one exact tangential zero in a fixed scaled neighborhood of the stated newborn gap, its radial coefficient is negative, and the circular locus has $R/R_*=a/\beta+b/\beta^2+o_M(\beta^{-2})$. The common planar characteristic matrix has its stated $C^1$ fast limit and largest positive real root $\lambda_{\max}/\beta^4\to\sqrt2$ in normalized units. No whole-cell uniqueness, odd-cell exclusion, finite threshold, complex-root maximum, nonlinear departure theorem for other inventories, or interchange with $M\to\infty$ follows.

No mathematical repair is required in the fixed-$M$ proof. This adjudication supplies additional explicit formulas behind its two compressed steps: the mixed derivative cancellation and the newborn weighted-offset cancellation. It imports no numerical table, balance oracle or characteristic implementation as proof of the theorem. All numerical instances of this scenario retain $K=c_f=1$; symbols are restored only in the consequences.

Falsifiers: failure of the intermediate inverse's fold margin, a mixed derivative exceeding the bounds below, a noncancelling cap, an old scaled derivative that fails to vanish, or a newborn weighted first moment too large to justify its radial/tangential ratio invalidates the relevant conclusion. A second zero outside the fixed scaled neighborhood is compatible with this local theorem.

## Complete pairing and a uniform inverse chart

Set $h=\pi/M$, $F_\beta(x)=\beta\sin x-x$ and $x_*=\arccos(1/\beta)$. At a cell with newest level $q$ there are descending levels $m=-M+1,\ldots,0$ and two roots at each $m=1,\ldots,q$. This follows directly from strict concavity and the endpoint values of $F_\beta$; every admitted self level is retained. Remove the two newest roots at $q$ only for the older-ledger estimates, and add them back in the balance argument.

Pair rising level $l=1,\ldots,q-1$ with descending level $l-M$. Because $M$ is even their polarity products are equal. Write their half-angles as $v$ and $\pi-w$; they solve

$$
\sin v-\epsilon v=s,\qquad \sin w+\epsilon w=s,
\qquad \epsilon=\beta^{-1},\quad s=lh/\beta.
$$

The remaining unpaired descending levels are exactly $q-M,\ldots,q-1$, a cap of $M$ consecutive levels. This accounts for all older rows once, including the self rows; it is not a truncation of the complete causal census.

For $\theta\in[-\epsilon,\epsilon]$, define the small inverse $V$ by $\sin V-\theta V=s$ and put $H=\cos V-\theta>0$. The inverse fold height is

$$
\mu(\theta)=\sqrt{1-\theta^2}-\theta\arccos\theta,
\qquad \mu'(\theta)=-\arccos\theta<0.
$$

The largest paired $s$ lies below $\mu(\epsilon)$ by at least $h\epsilon$, uniformly on compact positive newborn scaled-gap neighborhoods. Since $\mu(\epsilon)=1-(\pi/2)\epsilon+O(\epsilon^2)$, its distance $\delta=1-s$ from 1 is at least $(\pi/2+h)\epsilon+O_M(\epsilon^2)$. Monotonicity of $\mu$ therefore gives

$$
\mu(\theta)-s\ge c_M\delta,\qquad |\theta|\le C_M\delta
$$

for all intermediate parameters and sufficiently large $\beta$. The constants may deteriorate with $M$; they remain positive at every fixed $M$. For $s\ge1/2$, the inverse stays in a fixed central angle interval, and the fold's quadratic shape gives $H\asymp_M\sqrt\delta$. This establishes the uniform chart used for every old pair, rather than an expansion at a fixed source level.

## Mixed inverse derivatives: the cancellation made explicit

Let $S=\sin V$, $C=\cos V$ and $A=H^{-1}$. The independent differential identities are

$$
V_s=A,\quad V_\theta=VA,\quad
A_s=SA^{3},\quad A_\theta=A^2+SVA^{3}.
$$

On the central chart $V$ and $S^{-1}$ are bounded. Induction from these identities gives, for mixed derivatives of total order $r$, $\partial^rA=O_M(\delta^{-r-1/2})$, and for $r\ge1$, $\partial^rV=O_M(\delta^{-r+1/2})$. Composition of a smooth bounded angle function inherits the latter bound. Each further parameter or $s$ derivative costs at most one power of $\delta^{-1}$.

The crucial cancellation is an exact identity for $g=\csc V$:

$$
g_s=-\frac{C}{S^2H}=-S^{-2}-\theta S^{-2}A.
$$

The part that contains the most singular inverse factor is explicitly multiplied by $\theta$. Differentiating three times in $\theta$ gives terms involving $\partial_\theta^3S^{-2}$, $\theta\partial_\theta^3(S^{-2}A)$ and $3\partial_\theta^2(S^{-2}A)$. Their orders are at most $\delta^{-5/2}$, $|\theta|\delta^{-7/2}$ and $\delta^{-5/2}$. Since $|\theta|\le C_M\delta$,

$$
|g_{\theta\theta\theta s}|\le C_M\delta^{-5/2},
\qquad |g_{\theta\theta\theta ss}|\le C_M\delta^{-7/2}.
$$

This explicitly confirms the subject's mixed derivative bound. A naive bound lacking the $\theta$ factor would lose the power needed for the next radius coefficient.

For $L=\log\tan(V/2)$, the exact identity is $L_s=S^{-1}A$. Hence the same induction directly gives $|L_{\theta\theta s}|\le C_M\delta^{-5/2}$ and $|L_{\theta\theta ss}|\le C_M\delta^{-7/2}$. Symmetric parameter Taylor formulas now give the paired tangential errors $E_t=O_M(\beta^{-4}\delta^{-5/2})$, $E_t'=O_M(\beta^{-4}\delta^{-7/2})$, and radial errors $E_r=O_M(\beta^{-3}\delta^{-5/2})$, $E_r'=O_M(\beta^{-3}\delta^{-7/2})$.

At the other endpoint, inversion around $V=0$ gives

$$
V=\frac{s}{1-\theta}+O(s^3),\qquad
g=\frac{1-\theta}{s}+O(s),\qquad
L=\log s-\log\bigl(2(1-\theta)\bigr)+O(s^2),
$$

uniformly for sufficiently small $|\theta|$. The exact pole of $g$ is affine in $\theta$, so its third parameter derivative vanishes; the $s$ derivative of the logarithmic pole is independent of $\theta$. Subtracting these poles leaves uniformly bounded mixed derivatives on $s\le1/2$. This independently checks that the lower endpoint supplies no hidden divergent error or growing row-count factor.

## Alternating summation and the cap

The exact unsigned paired coefficients follow from the inverse identities:

$$
p_t=-\frac1{4\beta}\partial_s[g(\epsilon,s)-g(-\epsilon,s)],
\qquad
p_r=\frac1{4\beta}\partial_s[L(\epsilon,s)+L(-\epsilon,s)].
$$

At zero parameter $V=\arcsin s$ and $g_\theta=-\arcsin(s)/s^2$. Therefore

$$
p_t=-\frac1{2(lh)^2}+\frac1{2\beta^2}f(s)+E_t,
\qquad
p_r=\frac1{2lh}+\frac1{2\beta s}\bigl[(1-s^2)^{-1/2}-1\bigr]+E_r,
$$

with the subject's $f$. If $\arcsin s=\sum_{n\ge0}c_ns^{2n+1}$, then

$$
f(s)=\sum_{n\ge1}(2n-1)c_ns^{2n-2}.
$$

All coefficients are positive, making $f$ nonnegative and increasing. The radial residual function also has positive Taylor coefficients. Their endpoint values are $O_M(\sqrt\beta)$, because $\delta\ge c_M/\beta$.

Integration of the mixed error derivatives over that domain gives $\sup|E_t|+\operatorname{TV}(E_t)=O_M(\beta^{-3/2})$ and $\sup|E_r|+\operatorname{TV}(E_r)=O_M(\beta^{-1/2})$. The explicit residual functions have the same respective orders after their prefactors. The bounded lower-end expansions supply only smaller orders. Abel summation against $(-1)^l$, whose partial sums have absolute value at most one, bounds each complete discrete alternating remainder by its supremum plus total variation. The bound is independent of the growing number of paired rows.

For the $M$ unpaired descending cap roots, the height gaps below the maximum are between fixed positive multiples of $h$ and $Mh$. Thus $D\asymp_M\sqrt\beta$ and $\sin x=1+O_M(\beta^{-1})$. The exact identity $\cos x=(1-D)/\beta$ gives

$$
\frac{(-1)^m\cos x}{4\sin^2xD}
=-\frac{(-1)^m}{4\beta}+O_M(\beta^{-3/2}).
$$

The leading terms sum to zero across $M$ consecutive integers because $M$ is even. The entire cap is consequently $O_M(\beta^{-3/2})$ tangentially and $O_M(\beta^{-1/2})$ radially. Without this even-cap cancellation the proof would retain an order-$\beta^{-1}$ tangential term and could not identify the same next radius coefficient.

Finally the omitted tails of the infinite alternating pole sums are $O_M(\beta^{-2})$ and $O_M(\beta^{-1})$, by the alternating-series remainder estimate rather than an absolute tail bound. The mathematical identities $\sum_{l\ge1}(-1)^{l+1}/l^2=\pi^2/12$ and $\sum_{l\ge1}(-1)^{l+1}/l=\log2$ then give

$$
C_{t,\rm old}=a+O_M(\beta^{-3/2}),\qquad
C_{r,\rm old}=-b+O_M(\beta^{-1/2}),
\quad a=\frac{M^2}{24},\quad b=\frac{M\log2}{2\pi}.
$$

The first identity follows, for example, from the Fourier series of $x^2$ at zero; the second follows by integrating the finite geometric series of $(1+x)^{-1}$ on $[0,1]$ and taking its alternating remainder limit. They are mathematical sums, not imported physical laws.

## Local birth zero and the next radial coefficient

Take odd $q$ and set $F_{\max}-qh=d\beta^{-3}$, with $d$ in a compact positive neighborhood. Fold Taylor expansion gives offsets $x_\pm-x_* =\pm\sqrt{2d}\,\beta^{-2}(1+o_M(1))$. The pair has negative polarity, and its tangential limit is $-1/(2\sqrt{2d})$. Adding the old sum gives the simple limiting zero $d_0=1/(8a^2)$.

The old scaled derivative also vanishes uniformly. For an individual old baseline row, direct differentiation with $x'=\sin x/D$ simplifies its tangential derivative to

$$
\frac{d}{d\beta}\frac{\sigma\cos x}{4\sin^2x|D|}
=-\frac{\sigma}{4\sin^2xD|D|}
-\frac{\sigma\beta\cos x}{4D^2|D|}.
$$

If $|D|\ge\beta/4$, use the uniform sine floor $\sin x\ge c_M/\beta$; otherwise the angle is central, its sine has a fixed positive floor, and $|D|\ge c_M\sqrt\beta$. Both regions give a uniform bound on this derivative. Summing $O_M(\beta)$ old rows and multiplying by $d\beta/dd=O_M(\beta^{-3})$ gives an old scaled derivative $O_M(\beta^{-2})$. The newborn expansion is $C^1$ in $d$ on the compact positive neighborhood. Its limiting derivative at $d_0$ is positive. Opposite limiting endpoint signs and uniform positive derivative prove existence and uniqueness in this scaled neighborhood for each sufficiently high odd birth. They do not count zeros elsewhere in the cell.

To justify the radius correction, put $y=x-x_*$ and $B=\sqrt{\beta^2-1}$. The exact fold derivatives give

$$
F_{\max}-F(x_*+y)=\frac B2y^2+\frac16y^3+O_M(\beta y^4).
$$

If $t=\sqrt{2d\beta^{-3}/B}=O_M(\beta^{-2})$, the two offsets are $\pm t+O_M(\beta^{-5})$. The quadratic asymmetry in $D= B\sin y+1-\cos y$ gives a relative inverse-weight imbalance $O_M(\beta^{-3})$. Consequently their inverse-$|D|$ weighted first moment is $O_M(\beta^{-5})$, while their weighted second moment is $O_M(\beta^{-4})$. Expanding $\csc x$ and $\cos x/\sin^2x$ in these weighted moments shows that the pair's radial/tangential ratio is $\beta+O_M(\beta^{-1})$. This reconstructs the cancellation omitted by a single-row ratio estimate.

At the tangential zero $C_{t,\rm new}=-C_{t,\rm old}$. Therefore

$$
C_r=-\beta\bigl[a+O_M(\beta^{-3/2})\bigr]-b+O_M(\beta^{-1/2})+O_M(\beta^{-1})
=-a\beta-b+o_M(1).
$$

The strict inward radial sign holds eventually, and exact baseline radius selection gives $R=-KC_r/(c_f^2\beta^2)$. The resulting positive radius supplies the full circular balance, by rotation covariance and the complete inherited root chart. The stronger tangential estimate is what makes $\beta(C_{t,\rm old}-a)\to0$ and preserves the constant $-b$.

## Frequency and fast-mode consequences

With $R_*=K/c_f^2$ and $\Omega_*=c_f^3/K$, the accepted radius law and exact $v=c_f\beta$, $\Omega=v/R$ give the subject's frequency inversion, adjacent-rung limits and $Rv$ limit. In particular $b/(2a)=6\log2/(\pi M)$, $\Delta\beta\to2\pi/M$, $\Delta(\Omega/\Omega_*)/\beta\to96\pi/M^3$ and $Rv\to M^2K/(24c_f)$ per member. These are fixed-$M$ high-rung statements. The analytically known six-member specialization recovers $a=3/2$, $b=3\log2/\pi$ and the established $\Delta\beta\to\pi/3$, serving as an independent algebraic normalization control.

For the baseline common planar first variation, the [independently reconstructed receiver tensor](ring-frequency-and-fast-limit-independent-adjudication-2026-10-03.md#4-receiver-tensor-reconstructed-from-vector-geometry) applies at any circular hit. At these exact balances the newborn factors, delays and acceleration weights are

$$
|D_\pm|\sim(2a\beta)^{-1},\quad \ell_\pm\sim2a/\beta,
\quad w_\pm\sim-\beta^3/(2a).
$$

Substitution into its leading term $-w\beta^2\sin x/(2RD^2)$ gives coefficient 1 multiplying $\beta^8e_1e_1^{\mathsf T}$ per newborn row: the fixed-inventory factor $a$ cancels. The other row terms have orders $\beta^4,\beta^6,\beta^5$. Old roots have uniform sine and divisor floors, delay at least $c_M\beta^{-2}$, individual receiver tensors $O_M(\beta^6)$ and total $O_M(\beta^7)$. The complete delayed-velocity sum is $O_M(\beta^4)$ and delayed-position sum $O_M(\beta^8)$.

At $z=\eta\beta^4$ and positive compact $\eta$ intervals, the delay floor gives exponential suppression $e^{-c_M\eta\beta^2}$; differentiating in $\eta$ adds at most polynomial factors because all delays are at most $2R=O_M(\beta^{-1})$. The Coriolis and centrifugal terms also vanish after scaling. Thus the matrix and its first scaled derivative converge to $\eta^2I-2e_1e_1^{\mathsf T}$. The limiting determinant $\eta^2(\eta^2-2)$ has a simple positive zero at $\sqrt2$.

A kernel-vector norm estimate confines all right-half-plane roots to $|z|\le C_M\beta^4$, since its linear and constant bounds are $O_M(\beta^4)$ and $O_M(\beta^8)$. Uniform determinant convergence excludes larger positive real roots away from the limiting crossing; uniform derivative convergence makes that crossing locally unique. Hence the largest positive real common-sector root has the stated $\sqrt2$ ratio. This says nothing about whether a complex root has a larger real part, total mode counts, a useful finite-rung threshold, or nonlinear admissible histories at other inventories.

## Integration boundary

This is a separately constructed analytic adjudication. No target numerical instrument or table replay was used as mathematical evidence. The exact pairing identities, small-$s$ poles, finite alternating sums, six-member specialization and newborn tensor normalization are the analytical controls of the reconstructed argument. The subject's finite reports retain their own independent-admission obligations.

Recommended next action: integrate the fixed-inventory theorem at the scopes above and retain separate routes for complete finite-cell zero counts, finite thresholds, complex spectra and nonlinear history constructions. The theorem establishes sufficiently high exact circular loci and formal growing common-sector modes; it does not turn any finite unreviewed table row into accepted evidence or alter a rank, score, deferred task, scenario or equation.
