# Transferring a tangential exclusion to smooth coupled profiles

## Statement

The finite-amplitude [torque cover](overnight2-b-superwake-torque-cover.md) treats constant radius and planar angular rate. The following argument explains how a positive uniform tangential margin extends that exclusion to nearby smooth radius, phase and height functions. It uses the independently accepted [all-reception functional root chart](overnight2-b-independent-superwake-norm-chart.md).

This is a derived subject awaiting independent review. The [independent torque-cover audit](overnight2-b-independent-superwake-torque-cover.md) establishes a common lower bound $m>1/200$ such that, for every parameter triple

$$
H\in[1/20,1/9],\quad\beta\in[73/40,457/250],\quad\kappa\in[1/2,3],
$$

at least one of phases $0,\pi/2,\pi/4,3\pi/4$ has $|A_t^0|\ge m$ for the complete canonical sum of the reference profile

$$
\rho_0=1,\quad p_0=0,\quad z_0(\tau)=H\left(\cos\kappa\tau-\frac18\sin3\kappa\tau\right).
$$

The superscript zero identifies this reference profile, not an exact solution. The independent audit's exact common margin is

$$
m=\frac{19627241370865211579892879896906172454476499094273716667569147287}{3369993333393829974333376885877453834204643052817571560137951281152}>\frac1{200}.
$$

The last inequality follows by multiplying the numerator by 200 and comparing positive integers. The audit establishes all 624 leaf signs and the full closed parameter partition; its report is integrated into the parent account.

Consider any complete $C^2$ functions $\rho,p,z$ of normalized time $\tau=t/R$, with the same six-member alternating-height arrangement. Here $p$ is a real phase correction. The actual functions need not be periodic. Require the following scalar norm bounds for every real $\tau$:

$$
|\rho-1|,\ |\dot\rho|,\ |\ddot\rho|,\ |p|,\ |\dot p|,\ |\ddot p|,
\ |z-z_0|,\ |\dot z-\dot z_0|,\ |\ddot z-\ddot z_0|\le\eta,
$$

where dots mean normalized-time derivatives. More explicitly, normalized member $j$ is $(\rho\cos(\beta\tau+p+j\pi/3),\rho\sin(\beta\tau+p+j\pi/3),(-1)^jz)$; physical position multiplies this vector by $R$. The scenario is unchanged canonical $K=c_f=1$, all ordinary positive-delay roots including self and absolute source divisors.

The proposed quantitative conclusion is that no such profile is exact at any $R>0$ when

$$
0<\eta\le\min\left\{\frac1{2000},\frac{m}{146004000}\right\}. \tag{1}
$$

In particular, the explicit choice $\eta\le1/30000000000$ satisfies (1), since $30000000000>200(146004000)$. The constants below are deliberately conservative. This establishes an explicit open functional neighborhood; it does not claim a practically large waveform tolerance.

## Admission of every interpolated history

Let $Y=\rho e^{i(\beta\tau+p)}$ and $Y_0=e^{i\beta\tau}$ represent planar coordinates. The scalar bounds imply

$$
|Y-Y_0|\le2\eta,\qquad
|\dot Y-\dot Y_0|\le(2+2\beta+\eta)\eta<6\eta.
$$

For the full three-dimensional path, position and velocity differences are therefore below $3\eta$ and $7\eta$, respectively. These are complete-history bounds in a fixed Cartesian frame.

The reference height admits a sharper bound than the sum of its Fourier amplitudes. Since $|\sin3x|\le3|\sin x|$,

$$
|z_0|\le H\sqrt{1+(3/8)^2}\le\frac{\sqrt{73}}{72}<\frac{19}{160}<\frac18.
$$

The reference axial speed is at most $11/24$. For $\eta\le1/2000$, the actual height remains below $1/8$, axial speed below $1/2$, planar position error at most $1/1000$, and planar velocity error below $1/100$. Hence both actual and reference histories lie inside the accepted functional root chart.

Interpolate the complete Cartesian paths linearly with parameter $s\in[0,1]$. The position and velocity norm constraints are convex, so every interpolated history stays in that same admitted chart. Every interpolation consequently has the same eight complete ordinary roots with

$$
7/20<d<2,\qquad |D|>1/20,\qquad |V_s|<2.
$$

No singular root crossing is introduced during this comparison. The interpolation compares prescribed histories mathematically; it does not change the acceleration law or assert a family of exact solutions.

The reference normalized acceleration has norm below four. For the actual profile, the radial demand is bounded by $\eta+(1+\eta)(\beta+\eta)^2$, its tangential demand by $(2\beta+1+3\eta)\eta<5\eta$, and its axial demand by $17/8+\eta$. These bounds give a total norm below five for $\eta\le1/2000$. Every interpolated Cartesian acceleration is therefore bounded by five as well.

## Uniform sensitivity of every root and acceleration row

Fix one reception and one ordered root label. Its delay $d_s$ is continuously differentiable in interpolation parameter because the source divisor stays nonzero. For the unsquared gap, its parameter derivative at fixed delay has magnitude at most $6\eta$, and its delay derivative is $-D$. Thus

$$
|\partial_s d_s|\le120\eta.
$$

Write $Q_s$ for the separation, $n_s=Q_s/d_s$ at the causal root, and $V_s$ for the delayed source velocity. The complete Cartesian position difference between endpoint histories is at most $3\eta$ for each member. With source speed below two,

$$
|\partial_sQ_s|\le6\eta+2(120\eta)=246\eta,\qquad
|\partial_sn_s|\le\frac{246\eta+120\eta}{7/20}<1046\eta.
$$

The source velocity changes both through interpolation and through emission-time shift. Its direct difference is below $7\eta$ and the interpolated acceleration is below five, so

$$
|\partial_sV_s|\le7\eta+5(120\eta)=607\eta,\qquad
|\partial_sD|\le2(1046\eta)+607\eta=2699\eta.
$$

The signed divisor cannot change sign on the admitted chart. A canonical row is $\sigma n_s/(d_s^2|D_s|)$, with fixed polarity $\sigma\in\{-1,+1\}$. Differentiating it and using the uniform chart floors bounds its parameter derivative by

$$
\eta\left[
\frac{1046}{(7/20)^2(1/20)}
+\frac{240}{(7/20)^3(1/20)}
+\frac{2699}{(7/20)^2(1/20)^2}
\right]<9100000\eta.
$$

Summing all eight rows and integrating from $s=0$ to one yields a Cartesian acceleration difference below $72800000\eta$. The full acceleration itself has norm at most

$$
\sum_b\frac1{d_b^2|D_b|}\le\frac8{(7/20)^2(1/20)}=\frac{64000}{49}<1307.
$$

The actual tangential basis differs from the reference tangential basis by at most $|p|\le\eta$. Therefore the tangential acceleration difference satisfies the uniform bound

$$
|A_t-A_t^0|<73000000\eta. \tag{2}
$$

This estimate retains every self and partner contribution, including the negative-divisor row. No sign cancellation is assumed in deriving the bound.

## A common scale cannot compensate the tangential defect

The canonical exact equation in normalized coordinates is $R\ddot X=A$, where $X$ here denotes the normalized spatial profile. Suppose exact balance holds for every nonnegative normalized time. Integrating the planar equation by parts on $[0,T]$ gives

$$
R\frac1T\int_0^T|\dot Y|^2\,d\tau
=-\frac1T\int_0^T Y\cdot A_p\,d\tau
+\frac R T\left[Y\cdot\dot Y\right]_0^T.
$$

This is an elementary integration identity, not an imported conservation law. Both $Y$ and $\dot Y$ are uniformly bounded, so the boundary term tends to zero as $T\to\infty$ for any fixed $R$. No time-average limit is needed: use pointwise bounds in the two integrals before taking that limit. Within the admitted norm chart, $|Y|\le1001/1000$ and $|\dot Y|\ge\beta-1/100\ge363/200$. Together with the full acceleration bound this implies

$$
R\le\frac{(1001/1000)(64000/49)}{(363/200)^2}
=\frac{2562560000}{6456681}<400. \tag{3}
$$

The prescribed tangential demand is $L_t=2\dot\rho(\beta+\dot p)+\rho\ddot p$, so $|L_t|<5\eta$. At the deciding reference phase, (2) and (3) give

$$
|A_t-RL_t|\ge m-(73000000+2000)\eta\ge m/2>0
$$

under (1). This contradicts exact balance and proves the all-scale exclusion. The reference phases recur at arbitrarily late nonnegative times, and the uniform perturbation estimates hold at each such time. The argument requires only one deciding phase for each reference parameter triple; the identity of that phase may vary across the parameter cover. The scale bound requires exactness and the stated uniform bounds on an unbounded future interval; it is not a finite-segment exclusion.

## Interpretation, dependencies and review

The required positive margin $m$ and the functional root chart are separate independently accepted premises. The transfer argument itself awaits independent analytical reconstruction, including the norm admission, interpolation derivatives, rational constants and long-time scale bound. No numerical target is needed for the proof.

The perturbations may contain arbitrary smooth harmonics or aperiodic components within the stated complete-history derivative bounds, so the conclusion is not restricted to finite Fourier coefficients or a shared period. The same reference rotation coefficient $\beta$ and reference height function are fixed for the comparison; the actual bounded phase correction may be aperiodic. The numerical tolerance is conservative; no claim is made that its smallness reflects a physical transition or the actual boundary of the excluded set.

A profile violating the uniform norm, root-completeness, ordinary-divisor or unbounded-future exactness assumptions is outside this comparison. A root lost along the Cartesian interpolation, an incorrect root-sensitivity derivative, a larger row derivative, or a failure of the integration identity would falsify the relevant estimate. An exact member satisfying every hypothesis and (1) would falsify the final consequence. No EOM solver modification, singular continuation or standard-physics premise is introduced. The parent owns integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md).
