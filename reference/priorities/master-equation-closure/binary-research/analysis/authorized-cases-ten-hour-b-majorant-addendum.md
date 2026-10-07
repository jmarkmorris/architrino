# Explicit finite-history transfer for the Package B candidate

**Status: analytical addendum submitted for independent review.** This document supplies the operation-level bounds omitted from the [frozen direct-release candidate](authorized-cases-ten-hour-b-direct-release-candidate.md). It changes neither that frozen file nor the [fixed complete past](authorized-cases-ten-hour-b-case.md). The arithmetic ledger verifies inequalities between proposed constants; it cannot certify the analytic estimates proved here. No coupled target has been run.

## 1. Finite analytic germs for the derivative induction

At one reception freeze the radius at $a$, use $y=aZ$, $s-s_*=a^{3/2}\tau$ and write $\zeta=\epsilon/\sqrt a$. The real root has normalized range $16/9\le L_0\le16/7$ and source clock derivative between $7/9$ and $9/7$. Source and reception positions have norm at most two. Their normalized velocities have norm below $2^{13}$; this deliberately accommodates both the parabolic chart and the later bounded-speed chart. The parabolic source jets of order at most six are bounded by $16M_m$, because the source radius divided by the reception radius belongs to $[5/7,9/7]$.

For a differentiation order $k\in\{1,2,3,4\}$, put $q=\max(13,\log_2M_{k+1})$ and $\rho=2^{-(q+24)}$. Use independent finite Taylor polynomials for reception and source, centered at their actual times, with jets through order $k+1$. Set the source jet of order $k+2$ to zero to evaluate the non-highest part of the differentiated row. The coefficient of that omitted jet is exactly the previously derived delayed matrix coefficient. This operation does not assume that the real history is analytic.

For complex increments $|\tau|\le\rho$, $|\eta|\le2\rho$, the position changes are bounded by $2^{15}\rho$, the velocities by $2^{14}$, and source acceleration by $2^{q+6}$. For example, the nonlinear position part is at most $16\,2^q(2\rho)^2e^{2\rho}$, and the velocity change after its fixed first jet is at most $16\,2^q(2\rho)e^{2\rho}<2^{-18}$. These follow by taking absolute values in the finite exponential sums.

The shifted clock solves

$$
\eta=\tau-\zeta\{L(\tau,\eta)-L_0\}.
\tag{1}
$$

On the stated disk the change of the summed position is below $2^{16}\rho$. The squared range changes by at most twice the real range times this displacement plus its square. It therefore stays in a disk around $L_0^2$ which does not contain zero. Use the analytic square root equal to $L_0$ at the origin. It has $|L|>1$, $|n|<2$, and $|L-L_0|\le2$ times the summed-position displacement. Equation (1) maps $|\eta|\le2\rho$ into itself and its derivative with respect to $\eta$ is at most $2^{15}|\zeta|<1/8$. This proves the analytic clock and its disk bound. The transmitter denominator satisfies $|D-1|\le2^{15}|\zeta|<1/2$.

The row separates into a non-acceleration part and a term linear in source acceleration. The first has modulus below $2^8$ under these bounds. The second has modulus below $2^{q+12}|\zeta|^2<1$. Thus the row is bounded by $2^{10}$ on the disk. Cauchy's derivative estimate yields exactly

$$
N_k\le2^{10}k!\rho^{-k}.
\tag{2}
$$

There is no highest-jet dependence in this bound: it was explicitly removed before forming the polynomial, and the exact differentiated functional is affine in that highest source jet. The real differentiated value uses only these finite jets, so the polynomial value equals the real non-highest expression. The usual highest-jet coefficient is then restored and absorbed by its $1/4$ bound. This closes the operation-level gap behind candidate inequality (9), conditional only on the already stated real chart.

The same argument at derivative order four is applied almost everywhere. It does not differentiate the sixth derivative. Compatible derivatives through five are continuous; bounded sixth-derivative seams survive composition with the strictly increasing, Lipschitz source clock. The finite-germ bound therefore applies on every smooth subinterval and in essential supremum across the seams.

## 2. Exact reception derivative and its finite-jet Lipschitz bound

The following calculation is in frozen radius coordinates. Keep $\lambda$ as an auxiliary propagation parameter. At one reception define the finite real data

$$
q=Z+Z_d,\quad L=\sqrt{q\cdot q},\quad n=q/L,\quad
v=Z',\quad b=Z'_d,\quad A=Z''_d,\quad J=Z'''_d,
$$

$$
D=1+\lambda n\cdot b,\qquad c=\frac{1-\lambda n\cdot v}{D}.
$$

Dots below mean reception differentiation, with the physical source history fixed. Define the bracket

$$
B=(1-\lambda^2b\cdot b)n+\lambda Db-\lambda^2Ln(n\cdot A).
$$

Then the exact row is $F=-4B/(L^2D^3)$ and its derivative is determined by

$$
\dot q=v+bc,\quad \dot L=n\cdot\dot q,\quad
\dot n=(I-nn^{\mathsf T})\dot q/L,
\quad \dot D=\lambda(\dot n\cdot b+n\cdot Ac),
$$

$$
\begin{aligned}
\dot B={}&-2\lambda^2(b\cdot Ac)n+(1-\lambda^2b\cdot b)\dot n
+\lambda\dot D b+\lambda DAc\\
&-\lambda^2\{\dot L n(n\cdot A)+L\dot n(n\cdot A)
+Ln(\dot n\cdot A+n\cdot Jc)\},
\end{aligned}
$$

$$
\dot F=-\frac4{L^2D^3}
\left[\dot B-\left(\frac{2\dot L}L+\frac{3\dot D}D\right)B\right].
\tag{3}
$$

Only the source jerk, not a derivative beyond it, enters this derivative. The current acceleration does not enter (3). Thus a comparison curve sharing current position and velocity suffices for the receiver side of this transfer.

For the transfer domain take $16/9\le L\le16/7$, $|v|,|b|\le64$, $|A|\le256$, $|J|\le2^{69}$ and $|\lambda|\le2^{-10}$. Give each Cartesian finite-jet component a complex disk of radius $2^{-10}$. The real quantities extend analytically using the square root branch at the real positive range. Throughout this polydisk one may use the wider bounds

$$
1<|L|<3,\quad |n|<2,\quad \tfrac12<|D|<2,
\quad |v|,|b|<128,\quad |A|<512,\quad |J|<2^{70},\quad |c|<4.
$$

Direct substitution into (3) gives $|\dot q|<2^{10}$, $|\dot L|<2^{11}$, $|\dot n|<2^{12}$, $|\dot D|<2^{10}$, $|B|<4$, $|\dot B|<2^{80}$ and $|\dot F|<2^{90}$. These bounds use $\lambda$ only up to $2^{-10}$; the actual proposed parameter is much smaller. They are intentionally generous but follow term by term from the displayed formula.

Cauchy's estimate in each independent finite-jet disk now bounds each component derivative of $\dot F$ by $2^{100}$. There are ten scalar input components in $(q,v,b,A,J)$, so the Euclidean finite-jet Lipschitz estimate

$$
|\dot F(U)-\dot F(\widetilde U)|
\le2^{110}\max\{|\Delta q|,|\Delta v|,|\Delta b|,|\Delta A|,|\Delta J|\}
\tag{4}
$$

holds whenever the connecting real segment stays in the stated wider box. The root-transferred data below do remain there. The same elementary argument applied to $F$, using $w=\lambda b$ as the independent velocity variable and the explicit linear dependence on $A$, gives the weighted value estimate

$$
|\Delta F|\le2^{20}\{|\Delta q|+|\lambda|\,|\Delta b|+|\lambda|^2|\Delta A|\}.
\tag{5}
$$

No term in (4) or (5) is a derivative of an actual sixth seam. These are finite-dimensional analytic maps of the source and receiver jets, not an assertion of analytic histories.

## 3. Real-history transfer for the cubic value expansion

Fix a generated reception at time zero in the frozen coordinates. On its actual source segment, every intermediate radius is in $[5/7,9/7]$ and derivatives are bounded by $16M_m$. Let $P_3$ be the degree-three Taylor polynomial of the actual history at this reception, and let $u$ and $\widetilde u$ be the actual and polynomial partner delays. Both are at most $3\zeta$. Taylor's integral formula gives, at the actual delay,

$$
|Z(-u)-P_3(-u)|\le2^{262}\zeta^4,
$$

$$
|Z'(-u)-P_3'(-u)|\le2^{263}\zeta^3,
\qquad
|Z''(-u)-P_3''(-u)|\le2^{263}\zeta^2.
\tag{6}
$$

The real polynomial root residual has derivative bounded away from zero: its speed is below the chosen subfield margin throughout the tiny interval. Applying the mean-value inequality to the two root equations gives

$$
|u-\widetilde u|\le2\zeta\,|Z(-u)-P_3(-u)|.
\tag{7}
$$

Transporting the polynomial's position, velocity and acceleration from $-u$ to $-\widetilde u$ multiplies this root displacement by bounds for $P_3'$, $P_3''$ and $P_3'''$, respectively. These are at most $128$, $512$ and $2^{70}$. Thus all source-jet differences are explicitly bounded by (6) plus these three multiples of (7). Applying the weighted value bound (5) gives

$$
|F[Z]-F[P_3]|\le2^{1100}\zeta^4.
\tag{8}
$$

For example, the apparently largest transport term is the jerk bound times (7), followed by the row's acceleration coefficient $\zeta^2$. It is at most $2^{334}\zeta^7$, which is much smaller than $2^{1100}\zeta^4$. Omitting this transported acceleration term would be an error even though the available slack absorbs it.

The polynomial row is analytic in the auxiliary parameter on $|\lambda|\le\rho=2^{-8240}$ and bounded by $2^{10}$, by the root disk proof in Section 1 with the current point as the polynomial center. The Taylor coefficients through degree three are the accepted stationary, affine, quadratic-source and cubic-source controls. Its cubic remainder is bounded by $2^{12}\rho^{-4}\zeta^4<2^{33000}\zeta^4$. Combining this with (8) proves the explicit present-source fourth-order value remainder claimed before central-jet substitution.

## 4. Real-history transfer for the actual jerk estimate

Now use the degree-four polynomial $P_4$ of the actual history at the same reception. Its value and first derivative at reception agree exactly with the actual receiver data. By Taylor's integral formula with the bounded fifth derivative, errors in its sampled position, velocity, acceleration and jerk have orders $\zeta^5,\zeta^4,\zeta^3,\zeta^2$, respectively. A uniform explicit list is

$$
E_0\le2^{1031}\zeta^5,\quad E_1\le2^{1031}\zeta^4,
\quad E_2\le2^{1031}\zeta^3,\quad E_3\le2^{1031}\zeta^2.
\tag{9}
$$

The root displacement is at most $2\zeta E_0$. Transport of these four polynomial jets uses respectively $P_4',P_4'',P_4''',P_4''''$. Bounds $128,512,2^{70},2^{262}$ suffice; the fourth derivative is constant and explicitly retained. Adding the transported terms gives a maximum finite-jet discrepancy below $2^{1304}\zeta^2$. This estimate uses the smallness $\zeta\le2^{-199993}$, and in particular keeps every transferred datum inside the wider real boxes of Section 2. Applying (4) gives

$$
|F'[Z]-F'[P_4]|\le2^{1414}\zeta^2.
\tag{10}
$$

For the formal polynomial, introduce the independent complex reception parameter $\tau$ as well as $\lambda$. On $|\tau|,|\lambda|\le\rho$ the analytic row is bounded by $2^{10}$. Its first parameter coefficient is identically zero for all these reception values. The mixed Cauchy estimate therefore gives

$$
|F'[P_4]-DF_0(Z)Z'|\le2^{12}\rho^{-3}\zeta^2<2^{24733}\zeta^2.
\tag{11}
$$

The value estimate without the reception derivative follows from the same double-zero coefficient and the value transfer. Combining (10)–(11), with margin, proves

$$
|Z''-F_0(Z)|+|Z'''-DF_0(Z)Z'|
\le2^{33010}\zeta^2.
\tag{12}
$$

The equality $Z'''=F'[Z]$ is the differentiated actual equation at generated receptions, including the release right trace. The release compatibility through fifth order makes that trace agree with the joined history. Equation (12) is not asserted as an evolution equation at negative supplied times. It need not be: the cubic present-source expansion substitutes the generated present acceleration and jerk. Negative supplied source times enter only the real Taylor estimates (6) and (9), for which their bounded jets suffice. The original candidate's separate central discrepancy bound on that polynomial past is therefore a valid extra control, rather than an additional assumption essential to this transfer.

Taylor's integral formula is valid across all propagated seams because the relevant lower derivatives are absolutely continuous. Here the value transfer uses the fourth source derivative and the jerk transfer uses the fifth; both are continuous in $C^{5,1}$. The sixth derivative is used for continuation and the finite-germ induction, not secretly differentiated in this transfer.

Substitution of (12) into the quadratic present-acceleration and cubic jerk terms changes the value row by bounded fourth- and fifth-order terms. Their explicit coefficients at unit reception radius are at most two and $4/3$. The finite source/radius factors are below $2^{10}$. Together with (8) and the polynomial Cauchy remainder, these contributions are below $2^{50000}\zeta^4$. Restoring the frozen scale proves candidate (10) with the stated $C_Q$, subject to independent checking of the finite inequalities above.

## 5. Finite tail constants and arithmetic evidence

The frozen candidate's tail argument says that finite ballistic jet constants can be selected below $2^{20000}$ but does not list them. One explicit choice is

$$
(\widetilde M_2,\widetilde M_3,\widetilde M_4,\widetilde M_5,\widetilde M_6)
=(2^4,2^{128},2^{512},2^{2048},2^{16384}).
$$

At tail entry, multiply each inherited parabolic bound by at most $r_*^{1-m/2}$, where $r_*=2^{-13}$. These factors have exponents at most $26$. In ballistic frozen coordinates the extra factor $a^{-1}$ is at most $2^{13}$. Replacing $q+24$ by $q+40$ in the time-disk construction covers it and the enlarged entry bounds. The resulting recursion $N_k\le2^{10}k!2^{k(q+40)}$ is strictly absorbed by the displayed constants; the highest delayed coefficient remains small independently of them. These constants prove finite-time compatible continuation and are not reused in the signed parabolic account.

The [exact arithmetic ledger](../evidence/authorized-cases-ten-hour-b-constant-ledger.mjs) was run with Node. It first recorded correct known controls for powers, factorial, strict rational comparison and equality rejection, and then all its proposed constant inequalities passed. This is measured exact arithmetic only. Its output explicitly excludes analytic-majorant acceptance, solution certification, parameter admission and terminal-branch selection. The coordinator authorized this bounded verification separately from coupled target evolution.

The earlier frozen case and candidate were hashed only after the known SHA-256 `abc` control returned its published digest. No earlier subject or reference was changed. No owned long calculation or detached process was launched. The remaining independent task is to check the displayed analytic transfer and its use in the candidate's passage/tail proof; the large numerical exponents do not remove that obligation.
