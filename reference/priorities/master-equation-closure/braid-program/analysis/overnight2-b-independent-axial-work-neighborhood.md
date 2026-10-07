# Independent review of the finite-speed axial-work neighborhood

## Verdict and hypotheses

**Derived and independently accepted:** the [frozen axial-work neighborhood subject](overnight2-b-axial-work-neighborhood.md) proves its stated uniform bound
$$
\boxed{\langle V_{y,z}A_{y,z}\rangle>\frac1{2500}}
$$
for every permitted complete history and every $R>0$. No mathematical repair is required. The accepted [independent midpoint theorem](overnight2-b-independent-midpoint-axial-work.md) supplies the reference mean identity and quantitative margin. Every new chart, perturbation and rational estimate is reconstructed below without numerical evidence.

The canonical law remains $K=c_f=1$, with alternating interaction polarities $\sigma_j=(-1)^j$ relative to receiver zero, all five partner channels, and every ordinary positive self root if present. Write $s=t/R$ for normalized time and use primes for derivatives in $s$. The reference curves are
$$
x_j(s)=\left(\cos\left[\frac{s}{5}+\frac{j\pi}{3}\right],\sin\left[\frac{s}{5}+\frac{j\pi}{3}\right],(-1)^jH\cos\frac{3s}{20}\right),\qquad \frac45\le H\le\frac{17}{20}.
$$
For each comparison, $H$ is fixed for the entire history. The complete $C^2$ curves $y_j$ belong to the stated six-member class with periodic radius, phase correction and height, with the same base rates $\beta=1/5$, $\kappa=3/20$. They satisfy, for all real $s$ and all six labels,
$$
|y_j(s)-x_j(s)|\le e,\qquad |y_j'(s)-x_j'(s)|\le e,\qquad e=\frac1{10000}.
$$
These are vector Euclidean bounds at the same normalized time. The physical paths are $Ry_j(t/R)$, so their physical velocities are exactly $y_j'$. No parity, Fourier cutoff, or uniform bound on $y_j''$ is assumed. Periodic height velocity is needed for the final exact-balance contradiction; the local comparison inequalities themselves use only the uniform complete-history norm bounds.

The certified set includes the boundary of this norm tube. The phrase “open neighborhood” describes the open tube it contains and the resulting robustness; the proof actually certifies the stated nonstrict closed tube as well. Membership cannot be inferred from finitely sampled closeness or from individual Fourier coefficient bounds without a separate uniform vector-norm estimate.

## Reference derivatives and complete ordinary chart

Direct differentiation gives
$$
|x_j'|^2\le\frac1{25}+\left(\frac{51}{400}\right)^2
=\frac{9001}{160000}<\frac{9216}{160000}=\left(\frac6{25}\right)^2.
$$
Thus $|x_j'|<0.24$ and $|y_j'|<0.2401<1/4$. We may use the common speed upper bound $v_*=1/4$ and positive divisor lower bound $q_*=3/4$. These bounds concern every time, not a finite retained segment.

The second reference derivative has a planar part of magnitude $1/25$ and an axial part bounded by $153/8000$. Consequently
$$
|x_j''|^2\le\frac1{625}+\left(\frac{153}{8000}\right)^2
=\frac{125809}{64000000}<\frac{160000}{64000000}=\frac1{400}.
$$
Integration over any normalized-time interval gives the reference velocity Lipschitz bound
$$
|x_j'(s_2)-x_j'(s_1)|\le\frac1{20}|s_2-s_1|.
$$
The time here is normalized time, exactly the variable shifted by a normalized causal delay. There is no missing physical-scale factor in its later use.

At equal times every reference partner planar chord is at least one. Perturbed equal-time partner separation is therefore at least $1-2e=4999/5000$. The perturbed planar radius is at least $1-e>0$, directly from the planar projection of the position error.

Every reference position has squared norm at most $1+(17/20)^2=689/400$. This is less than $(1313/1000)^2$, with positive difference $1469/1000000$. Every perturbed position therefore has norm below $13131/10000$, and every chord in either complete history has length below $13131/5000<263/100$.

For either history, the receiver-fixed gap is the endpoint distance minus normalized delay. Source speed below $1/4$ makes every gap secant strictly negative, with slope magnitude between $3/4$ and $5/4$. The gap starts positive for each partner, becomes negative beyond the uniform diameter, and has exactly one positive root. For the self channel, path length bounds self displacement strictly below every positive delay, so there is no positive self root. The argument covers all ancient delays because the position bound holds on the complete histories.

At each partner root, the same-time chord and maximal gap decrease give
$$
\Delta>\frac{1-2e}{5/4}=\frac{4999}{6250}>\frac{79}{100}=:d_-,
\qquad \Delta<\frac{263}{100}=:d_+.
$$
For either history, with $n$ the root direction and $V_s$ the delayed source velocity,
$$
D=1-n\cdot V_s\in\left(\frac34,\frac54\right).
$$
Thus there are exactly five ordinary contributions in each sum, no positive self contribution, and a common delay and divisor chart for comparison.

## Reference mean exceeds one over 250

The reference radius is constant and even, its phase correction is zero and odd, and its height is a cosine. Its delay phase obeys
$$
\kappa\Delta<\kappa d_+=\frac{789}{2000}<\frac25<1.
$$
The accepted midpoint bound therefore applies, including its upper bound $D_m\le1+v_*=5/4$:
$$
W_x:=\langle V_{x,z}A_{x,z}\rangle
\ge\frac{5\kappa^2H^2}{2d_+^2(5/4)}\left[1-\frac{(\kappa d_+)^2}{6}\right].
$$
Here $5\kappa^2H^2\ge9/125$, $d_+^2=69169/10000<7$, and the bracket is strictly greater than $1-(2/5)^2/6=73/75$. Hence
$$
W_x>\frac9{125}\frac2{35}\frac{73}{75}=\frac{1314}{328125}>\frac1{250}.
$$
The last exact comparison has cross-product difference $1314\cdot250-328125=375>0$. The strict inequalities survive at both allowed height endpoints. This lower bound is entirely analytical and uniform over the fixed reference height interval.

## Root displacement and source-divisor comparison

Fix one receiver time $s$ and one partner label $j$. Let $\Delta_x,\Delta_y$ be the unique roots. At the same trial delay, the separation-vector difference is bounded by $2e$, one position error at the receiver and one at the source. The two norm gaps therefore differ by at most $2e$. At $\Delta_x$ the reference gap vanishes, so the perturbed gap has magnitude at most $2e$. Its absolute secant slope is at least $q_*=3/4$. Uniqueness and monotonicity imply
$$
|\Delta_y-\Delta_x|\le b:=\frac{2e}{q_*}=\frac1{3750}.
$$
This estimate uses the same certified root branch for every channel; no root matching based on proximity is assumed.

Now compare the separation vectors at their own roots. Insert the reference source position at $s-\Delta_y$ to obtain
$$
|Q_y-Q_x|\le2e+v_*|\Delta_y-\Delta_x|\le2e+\frac b4=b.
$$
Since root norms equal their delays, the elementary normalization inequality gives
$$
\left|\frac{Q_y}{|Q_y|}-\frac{Q_x}{|Q_x|}\right|
\le\frac{2|Q_y-Q_x|}{\min(|Q_y|,|Q_x|)}
\le\frac{2b}{d_-}.
$$
The source velocities must be compared at their distinct emission times. Insert the reference velocity at the perturbed emission time:
$$
\begin{aligned}
|y_j'(s-\Delta_y)-x_j'(s-\Delta_x)|
&\le |y_j'(s-\Delta_y)-x_j'(s-\Delta_y)|\\
&\quad+|x_j'(s-\Delta_y)-x_j'(s-\Delta_x)|\\
&\le e+\frac b{20}.
\end{aligned}
$$
Only the reference velocity is shifted inside the Lipschitz estimate. Arbitrarily large but existing perturbed second derivatives do not invalidate it.

Expanding the difference of $n\cdot V_s$ and using the common speed bound gives
$$
|D_y-D_x|\le\frac{2v_*b}{d_-}+e+\frac b{20}.
$$
Since $d_-=79/100>3/4$, this is strictly less than
$$
\frac{2b}{3}+e+\frac b{20}
=\frac{131}{450000}<\frac{135}{450000}=\frac3{10000}.
$$
The source velocity in this step belongs to the transmitter divisor. It is distinct from the receiver velocity used in the axial-work numerator below.

## Vector kernel and work error

For one unsigned ordinary contribution write $K=n/(\Delta^2D)$; the common polarity factor has magnitude one. A telescoping decomposition is
$$
K_y-K_x
=\frac{n_y-n_x}{\Delta_y^2D_y}
+\frac{n_x}{D_y}(\Delta_y^{-2}-\Delta_x^{-2})
+\frac{n_x}{\Delta_x^2}(D_y^{-1}-D_x^{-1}).
$$
The mean-value bound for $u\mapsto u^{-2}$ on $[d_-,\infty)$ gives $|\Delta_y^{-2}-\Delta_x^{-2}|\le2b/d_-^3$. Also $|D_y^{-1}-D_x^{-1}|\le|D_y-D_x|/q_*^2$. Therefore
$$
|K_y-K_x|\le\frac{4b}{d_-^3q_*}+\frac{|D_y-D_x|}{d_-^2q_*^2}.
$$
This is a vector estimate, so it applies to the axial component without any alignment assumption.

The exact inequalities $d_-^2=6241/10000>3/5$ and $d_-^3=493039/1000000>49/100$ give
$$
|K_y-K_x|<\frac{32}{11025}+\frac1{1125}
=\frac{209}{55125}<\frac{19}{5000}.
$$
The final comparison has positive cross-product difference $19\cdot55125-209\cdot5000=2375$. Summing exactly five partner contributions proves
$$
|A_{y,z}-A_{x,z}|<\frac{19}{1000}.
$$
The reference acceleration itself satisfies
$$
|A_{x,z}|\le|A_x|\le\frac5{d_-^2q_*}<\frac5{(3/5)(3/4)}=\frac{100}{9}.
$$
The receiver axial velocity obeys
$$
|V_{y,z}|\le\kappa H+e\le\frac{51}{400}+\frac1{10000}
=\frac{319}{2500}<\frac{16}{125},\qquad
|V_{y,z}-V_{x,z}|\le e.
$$
Expand the product difference using $V_{y,z}(A_{y,z}-A_{x,z})+(V_{y,z}-V_{x,z})A_{x,z}$. Pointwise at every receiver time,
$$
|V_{y,z}A_{y,z}-V_{x,z}A_{x,z}|
<\frac{16}{125}\frac{19}{1000}+\frac1{10000}\frac{100}{9}
=\frac{304}{125000}+\frac1{900}
=\frac{1993}{562500}<\frac9{2500}.
$$
The final rational gap is $2025/562500-1993/562500=32/562500>0$. Averaging cannot increase this uniform bound. Combined with the reference mean it yields
$$
\langle V_{y,z}A_{y,z}\rangle
>\frac1{250}-\frac9{2500}=\frac1{2500}.
$$
No perturbed reflection cancellation or perturbative truncation is used: the comparison is an exact finite-error estimate around the reference mean.

## Exact balance, scope and falsifiers

Let $T=2\pi/\kappa$ in normalized time. Periodic height profiles make $y_{0,z}'$ periodic with that period. Exact physical acceleration balance would require $A_{y,z}=Ry_{0,z}''$, and consequently
$$
\frac1T\int_0^T V_{y,z}A_{y,z}\,ds
=\frac{R}{2T}\big[(y_{0,z}')^2\big]_0^T=0.
$$
The normalized-time and phase means coincide because $\phi=\kappa s$ has constant positive rate. Thus the proved positive mean excludes exact balance at every scale $R>0$. Physical velocity–acceleration work has the additional factor $R^{-2}$ and the same sign. This is a kinematic periodic derivative identity, not an imported conservation law.

The result admits arbitrary periodic profile complexity, parity breaking and infinite Fourier tails within the complete-history tube. It does not automatically include coefficient boxes, varying base rates, finite-sample reconstructions, a time-varying choice of reference height, or histories lacking the periodicity needed for the mean-zero identity. It establishes no actual evolved trajectory or stability property.

Operator-checkable falsifiers are a permitted history with additional or missing ordinary roots, a divisor below the proved common floor, a root shift greater than $b$, a violation of the displayed source-velocity or vector-kernel inequalities, or an axial-work mean at or below $1/2500$. An exact canonical history satisfying every stated hypothesis directly falsifies the exclusion. Changing the transmitter weighting or only checking a finite time window changes the mathematical premise rather than refuting the stated theorem.

## Source identity and scoped validation

Native `shasum -a 256` identifies the frozen subject as `ed9ad542c41e5533c98145e2b5f3ec987fa0ffdef15e5076bce2d35d1de2eead`. The accepted independent midpoint report is the frozen analytical dependency; its identity is `dc9146c12a4465472549f83bac470631c2d28217016ffd5c58790719ee94c07a`. The new estimates were independently expanded above, including exact integer comparisons. No numerical instrument, target, library arithmetic or computational known-first stage was required.

Only this new independent report was authored. The subject, midpoint theorem and review, all prior instruments and receipts, parent account and shared owners remain read-only. Native final hashing verifies the two frozen source identities; `git diff --no-index --check /dev/null` supplies the new report's whitespace check, with exit one representing new-file differences when no diagnostics are emitted. No Git mutation, generator, new agent or runtime evidence write was used. There is no mathematical blocker within this scope; parent integration remains the disposition step. The later reflection-height extension was not reviewed here.
