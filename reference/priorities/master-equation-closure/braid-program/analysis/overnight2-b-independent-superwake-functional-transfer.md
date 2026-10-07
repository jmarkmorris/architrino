# Independent review of the smooth functional transfer

## Verdict and domain

**Derived and accepted.** The [frozen transfer subject](overnight2-b-superwake-functional-transfer.md) correctly extends the accepted tangential exclusion to the stated complete $C^2$ scalar neighborhood, including aperiodic perturbations. No mathematical repair is required. In particular, the sufficient tolerance $\eta\le1/30000000000$ excludes exact canonical balance at every fixed $R>0$, provided exactness is required throughout an unbounded future interval and the prescribed norm bounds hold on the complete histories.

This is a transfer of two frozen premises: the [independently accepted functional root chart](overnight2-b-independent-superwake-norm-chart.md) and the [independently audited torque cover](overnight2-b-independent-superwake-torque-cover.md). It does not claim a larger admissible neighborhood, a finite-time obstruction with the same scale bound, or exclusion of arbitrary above-wake histories. The Ramon E. Moore role is the analytical lens, not mathematical authority.

The reference parameters remain fixed throughout the comparison:

$$
H\in[1/20,1/9],\qquad \beta\in[73/40,457/250],\qquad \kappa\in[1/2,3],
$$

$$
z_0(\tau)=H\bigl(\cos(\kappa\tau)-\tfrac18\sin(3\kappa\tau)\bigr).
$$

For a single fixed scale $R>0$, normalized time is $\tau=t/R$. Actual normalized member $j$ is

$$
x_j(\tau)=\bigl(\rho(\tau)\cos(\beta\tau+p(\tau)+j\pi/3),\rho(\tau)\sin(\beta\tau+p(\tau)+j\pi/3),(-1)^jz(\tau)\bigr).
$$

The nine scalar bounds in the subject are uniform for every real $\tau$: the absolute values of $\rho-1,\dot\rho,\ddot\rho,p,\dot p,\ddot p,z-z_0,\dot z-\dot z_0,\ddot z-\ddot z_0$ are each at most $\eta$. In particular, $p$ is a globally chosen real phase correction with small absolute value, not merely a phase taken modulo $2\pi$. The canonical scenario is unchanged: $K=c_f=1$, all positive-delay self and partner roots, positive self polarity and absolute source divisors. No new physical premise enters the proof.

## Exact starting margin

The frozen independent cover establishes at least one deciding reference phase per parameter triple, with $|A_t^0|\ge m$, where

$$
m=\frac{19627241370865211579892879896906172454476499094273716667569147287}{3369993333393829974333376885877453834204643052817571560137951281152}.
$$

Multiplying its numerator by 200 gives

$$
3925448274173042315978575979381234490895299818854743333513829457400
>
3369993333393829974333376885877453834204643052817571560137951281152.
$$

Thus $m>1/200$ follows by exact integer comparison. The margin is the independently evaluated minimum of all 624 certified leaf intervals; no subject minimum or sampled-point margin is substituted. A boundary point can belong to multiple leaves, but any one of their certified deciding phases suffices. The reference is a prescribed profile, not an assumed exact solution.

## Scalar bounds imply complete Cartesian admission

Write the planar coordinate as $Y=\rho e^{i(\beta\tau+p)}$, with reference $Y_0=e^{i\beta\tau}$. Using $|e^{ip}-1|\le|p|$ and writing $\rho e^{ip}-1=(\rho-1)e^{ip}+(e^{ip}-1)$ gives

$$
|Y-Y_0|\le2\eta.
$$

The exact velocity decomposition gives

$$
|\dot Y-\dot Y_0|
\le|\dot\rho|+\beta|\rho e^{ip}-1|+\rho|\dot p|
\le(2+2\beta+\eta)\eta<6\eta
$$

for $\eta\le1/2000$. Adding the axial component in Euclidean norm yields complete Cartesian position and velocity differences bounded by $\sqrt5\eta<3\eta$ and $\sqrt{37}\eta<7\eta$. These bounds compare vectors in a common fixed Cartesian frame, not differing rotating coordinate components.

For the needed height slack, $|\sin3x|\le3|\sin x|$ implies

$$
|z_0|\le H\bigl(|\cos x|+\tfrac38|\sin x|\bigr)
\le\frac{\sqrt{73}}{72}<\frac{19}{160}.
$$

The strict rational comparison after squaring is $73\cdot160^2=1868800<1871424=19^2\cdot72^2$. Moreover $1/8-19/160=1/160>1/2000$, so $|z|<1/8$. The reference axial velocity is bounded by $H\kappa(1+3/8)\le11/24$; adding $\eta\le1/2000$ keeps it strictly below $1/2$. The planar position error is at most $1/1000$, and its velocity error is below $6/2000<1/100$.

Both actual and reference histories therefore satisfy the accepted functional chart at all receptions and over the entire past. Linear Cartesian interpolation

$$
x_j^{\lambda}=(1-\lambda)x_j^0+\lambda x_j,\qquad 0\le\lambda\le1,
$$

preserves these norm constraints by convexity. It also preserves the six-member common planar-factor and alternating-height arrangement. Indeed its complex planar factor after removing $e^{i(\beta\tau+j\pi/3)}$ is $(1-\lambda)+\lambda\rho e^{ip}$, which differs from one by at most $2\eta\le1/1000$. Its real part is positive, so it has a globally smooth argument on that right half-plane and a positive modulus. Thus interpolation does not secretly leave the subject's radius/phase class or create a branch-cut issue.

Every interpolated complete history has the same eight ordinary roots, with fixed protected labels,

$$
7/20<d<2,\qquad |D|>1/20.
$$

Its speed is below two: the chart bounds give $|V|^2\le(\beta_++1/100)^2+1/4=907061/250000<4$. No acceleration ceiling or below-wake-speed assumption is imposed.

## Acceleration bounds needed for source-time shifts

The reference planar acceleration magnitude is $\beta^2<27/8$ and its axial magnitude is at most $H\kappa^2(1+9/8)\le17/8$. Therefore its squared full magnitude is less than $(27^2+17^2)/64=1018/64<16$, proving the stated reference bound of four.

In the actual rotating frame the exact normalized acceleration components are

$$
L_r=\ddot\rho-\rho(\beta+\dot p)^2,\qquad
L_t=2\dot\rho(\beta+\dot p)+\rho\ddot p,\qquad
L_z=\ddot z.
$$

Hence

$$
|L_r|\le\eta+(1+\eta)(\beta+\eta)^2,\qquad
|L_t|\le(2\beta+1+3\eta)\eta<5\eta,\qquad
|L_z|\le17/8+\eta.
$$

For a transparent conservative norm check, $\beta+\eta<11/6$ and $1+\eta<101/100$, giving $|L_r|<1/2000+12221/3600<7/2$. Also $|L_t|<1/400$ and $|L_z|<9/4$. Consequently

$$
|\ddot x|^2<(7/2)^2+(1/400)^2+(9/4)^2<25.
$$

Cartesian interpolation of the accelerations is linear, so every interpolated acceleration has norm below five. This bound holds on complete histories and is exactly what the delayed-source velocity estimate below needs; no third derivative or periodicity is required.

## Root and row derivatives under interpolation

Fix a reception, source and one of the eight protected labels. For the unsquared gap $g(\lambda,d)=|x_i^{\lambda}(\tau)-x_j^{\lambda}(\tau-d)|-d$, the partial interpolation derivative at fixed delay has magnitude at most $6\eta$. At a root, $g_d=n\cdot V-1=-D$, where $V$ is the delayed source velocity and $n=Q/d$. The joint regularity and uniform nonzero divisor permit the implicit function theorem; fixed labels make the resulting branch globally consistent over $\lambda\in[0,1]$. Thus

$$
|d_\lambda|\le120\eta.
$$

The total derivative of the separation along the branch includes its source-time shift: $Q_\lambda$ equals the direct difference of interpolation perturbations plus $Vd_\lambda$. Therefore

$$
|Q_\lambda|\le6\eta+2(120\eta)=246\eta,
$$

$$
|n_\lambda|\le\frac{|Q_\lambda|+|d_\lambda|}{d}
\le\frac{7320}{7}\eta<1046\eta.
$$

For source velocity, the emission-time contribution has the opposite sign, $V_\lambda=\Delta\dot x_j-\ddot x_j^{\lambda}d_\lambda$. Its norm obeys

$$
|V_\lambda|\le7\eta+5(120\eta)=607\eta.
$$

The source divisor derivative is $D_\lambda=-n_\lambda\cdot V-n\cdot V_\lambda$, so

$$
|D_\lambda|<2(1046\eta)+607\eta=2699\eta.
$$

These are total derivatives at the moving root. Confusing them with derivatives at a fixed emission time would omit the required acceleration term. The source speed and source acceleration are bounded uniformly over the interpolation and complete history, which makes the estimates uniform in reception time as well.

For fixed polarity $\sigma=\pm1$, the row is $a=\sigma n/(d^2|D|)$. Since $D$ never vanishes, its sign is fixed along the interpolation and differentiation of $|D|$ is legitimate. The product rule gives

$$
|a_\lambda|\le
\frac{|n_\lambda|}{d^2|D|}
+\frac{2|d_\lambda|}{d^3|D|}
+\frac{|D_\lambda|}{d^2|D|^2}.
$$

Using the chart floors and derived estimates, the coefficient of $\eta$ is bounded above by

$$
\frac{8368000}{49}+\frac{38400000}{343}+\frac{431840000}{49}
=\frac{3119856000}{343}<9100000.
$$

The exact difference after multiplying the last comparison by 343 is $3121300000-3119856000=1444000>0$. Thus integration in $\lambda$ and summation of all eight rows gives $|A-A^0|<72800000\eta$. No cancellation of positive and negative polarity contributions is assumed. In particular the negative signed-divisor row is included with its absolute divisor throughout.

The same chart gives $|A|,|A^0|\le8/[(7/20)^2(1/20)]=64000/49<1307$. The actual tangential basis differs from the reference one by at most $|p|\le\eta$. Projecting the Cartesian comparison into these respective bases therefore yields

$$
|A_t-A_t^0|<(72800000+1307)\eta<73000000\eta.
$$

The comparison is valid at every reception, whether or not the actual functions repeat.

## Long-time scale bound without a periodicity assumption

The physical acceleration of $Rx(\tau)$ is $\ddot x/R$, while the canonical acceleration is $A/R^2$. Exactness is therefore precisely $R\ddot x=A$, including $R\ddot Y=A_p$ in the plane. Dotting with $Y$, integrating by parts on $[0,T]$ and rearranging gives

$$
\frac R T\int_0^T|\dot Y|^2\,d\tau
=-\frac1T\int_0^T Y\cdot A_p\,d\tau
+\frac R T[Y\cdot\dot Y]_0^T.
$$

This identity follows from ordinary calculus, not an imported energy principle. The complete bounds give $|Y|\le1001/1000$, $|A_p|\le64000/49$, and $|\dot Y|\ge\beta-1/100\ge363/200$. Also $Y\cdot\dot Y$ is uniformly bounded. Apply these bounds for each finite $T$ to obtain

$$
R(363/200)^2
\le(1001/1000)(64000/49)+\frac{RC}{T}
$$

for some fixed finite boundary constant $C$. For any hypothesized fixed $R$, exactness for arbitrarily large $T$ allows $T\to\infty$. No time average is assumed to converge. Consequently

$$
R\le\frac{2562560000}{6456681}<400,
$$

where $400\cdot6456681-2562560000=20112400>0$. This establishes a common upper scale bound for every hypothetical exact member. It is not inferred from a finite observation window, and no uniform limit in $R$ is interchanged with the time limit.

The same argument works after a fixed initial future time by shifting the integration interval. It requires unbounded future exactness and the uniform velocity/position bounds there; complete-past bounds are separately required for the admitted causal-root chart and sensitivity estimates.

## Final contradiction and sufficient explicit tolerance

Choose a reference deciding phase for the fixed parameter triple. The reference relative geometry repeats with period $2\pi/\kappa$, so this phase occurs at arbitrarily late nonnegative receptions with the same reference tangential sum. The actual perturbations need not repeat: their uniform comparison bound applies at each such reception. Since $|L_t|<5\eta$ and $R<400$,

$$
|A_t-RL_t|
\ge |A_t^0|-|A_t-A_t^0|-R|L_t|
\ge m-73002000\eta.
$$

For $0<\eta\le\min\{1/2000,m/146004000\}$ the right side is at least $m/2>0$, contradicting exactness. This also excludes the reference itself at zero perturbation; stating a positive tolerance describes a neighborhood containing it.

The requested explicit choice follows from

$$
200\cdot146004000=29200800000<30000000000,
\qquad m>1/200.
$$

Thus $1/30000000000<m/146004000$, and it is plainly below $1/2000$. All comparisons are exact arithmetic displayed above, with no numerical target or additional interval experiment needed. The closed tolerance ball is excluded and contains an open functional neighborhood of each reference profile. Its tiny size is a conservative sufficient bound, not an identified physical transition.

## Qualifications, falsifiers and scoped verification

The proof requires one fixed scale and fixed reference triple, complete $C^2$ histories satisfying the scalar bounds, the selected canonical law, and exactness on an unbounded future. No common actual period, finite Fourier degree, time-average limit, bound on third derivatives or evolving-solution interpolation is assumed. The interpolation is a comparison of prescribed complete histories; each intermediate history is admitted geometrically and is not asserted exact. Bounds only modulo phase, only at sample times, only over a finite past window, or exactness only on a bounded future interval do not meet the stated premises.

A lost or nonordinary root within the interpolated norm chart would defeat its dependency. A violation of the displayed Cartesian norm estimates, omitted source-time derivative term, row derivative larger than the certified coefficient, or failure of the integration identity under its boundedness conditions would defeat the corresponding transfer step. An exact member satisfying every displayed hypothesis and tolerance would directly falsify the conclusion. An aperiodic function violating the uniform complete-history bounds is outside this theorem, not a counterexample. There is no conclusion about general above-wake profiles outside this small neighborhood.

Verification was analytical: the frozen subject was read in full and every stated derivative, sign, norm inequality, scale factor and rational constant was reconstructed above. The accepted chart and independent torque report are the unchanged geometric and measured premises. The latter's exact margin was compared directly by integer multiplication. No new numerical instrument, numerical target, runtime evidence or parent CPU slot was used. Native `shasum -a 256` identifies the frozen subject as `d9b3fda86a401eff34c609b22c538c493c684ec4547d49c19a4a5bb0f676e2b4`; final hashing verifies that identity and identifies this report. Native `git diff --no-index --check /dev/null` is the scoped whitespace check on the new file; exit one with no diagnostics denotes its new-file difference.

Only this new independent Markdown report was authored. Frozen subjects, prior reference/oracle code, all receipts, the parent account and shared owners remain untouched. No recursive delegation, sidebar message, repository-changing Git operation, generator, evidence deletion or relocation occurred. Local retained evidence remains in place; no backup or archive-recovery claim is made. Parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md) is the remaining disposition step. The bounded review is complete.
