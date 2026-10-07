# Quantitative compact radial transport for the exact selected member

**Status: derived candidate, unreviewed.** Fix $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$ and exactly the complete history in the [case file](authorized-cases-ten-hour-b-case.md). No phase, cutoff, source jet or preparation parameter is selected anew. The [quantitative all-future result](authorized-cases-ten-hour-b-terminal-branch.md) remains the admitted theorem. This candidate uses the new, separately frozen [sixth-jet transfer](authorized-cases-ten-hour-b-sixth-order-transfer.md), which also remains unreviewed.

The purpose is to quantify one part of the actual preparation-to-turn map: the protected cubic seed, its first fixed compact eccentric levels, and an actual pericenter between those levels. It does not carry that pericenter to the final near-parabolic passage. The distinction matters because the resulting negative account margin is of order $h^{-2}$, whereas the final passage must resolve order $\epsilon^3h^{-5}$.

## 1. Fixed compact chart and inherited actual inventory

Use the corrected angular variable $H=h\exp(-\epsilon^2/r)$ and the exact changing coordinates

$$
\rho=r/H^2,\qquad u=Hr',\qquad \delta=\epsilon/H,
\qquad d\tau/ds=H^{-3}.
\tag{1}
$$

The temporary compact box is $1/2\le\rho\le4$, $|u|\le2$. The target norm levels will be $A_1=1/8$ and $A_2=1/4$, inside the enlarged central energy cutoff $J_*=9/50$. At zero parameter that cutoff has eccentricity $3/5$ and turning radii $5/8$ and $5/2$, strictly inside the box. The tangential normalized speed is $t=\exp(\delta^2/\rho)/\rho<3$, so the full normalized speed is below eight. The complete old speed bound, root census and sixth-jet inventory are inherited from the admitted result, up to any first positive account crossing. Section 6 below closes the negative account condition on this compact chart.

Freezing $H=a$ converts the radial inventory to the angular-scale inventory with factors at most $2^8$. Thus the proof of the sixth-jet transfer applies with time disk $2^{-8310}$, mixed-cancellation bound $2^{34100}\delta^2$, and generated central-jet discrepancy $2^{40100}\delta^2$. These are coordinate conversions, not a new scale symmetry or a renewed past. Throughout this candidate $H\ge3/4$, hence $\delta\le2\epsilon$.

## 2. Finite autonomous coefficients with bounded operations

Let $F^{[6]}=\sum_{n=0}^6\lambda^nF_n$, with $F_1=0$, denote exactly the finite coefficient construction in the [accepted signed subject](../../analysis/amplitude-gradient-signed-radial-mode.md#3-explicit-autonomous-coefficient-construction-and-the-improved-remainder). Its receiver gradient is taken before the source jets are replaced. The equivalent direct-row construction below provides bounds on those same coefficients; it does not define a different response.

Start with $F^{(0)}=F_0$. Given $F^{(j)}$, generate its formal position jets through six with $\mathcal D_F=V\cdot\partial_Z+F\cdot\partial_V$, form the degree-six source polynomial, evaluate the exact implicit-root row, and retain its parameter coefficients through six. Call the result $F^{(j+1)}$. Acceleration first enters the row at parameter order two, so each iteration fixes two additional orders. Therefore $F^{(3)}=F^{[6]}$ through degree six.

Here is a norm budget for this finite construction. Use complex state tubes about $1/2\le|Z|\le4$, $|V|\le8$, with initial component radius $2^{-8}$. Each state differentiation spends a tube width $2^{-20}$. At most four differentiations per iteration and three iterations spend less than $2^{-16}$, leaving a tube larger than $2^{-9}$. On an intermediate field bounded by $2^{30}$, Cauchy's estimate and the four state components bound one application of $\mathcal D_F$ by a factor below $2^{54}$. The generated jets through six are consequently below $2^{246}$ on the smaller tube.

Start with parameter radius $2^{-2000}$. On that disk the source polynomial displacement is below $2^{-1900}$, its speed below sixteen, and its acceleration below $2^{31}$. The source clock is a strict contraction, the range stays away from zero and $|D-1|<1/4$. The exact row is below $2^{12}$. Truncating at degree six and halving the parameter radius gives polynomial norm below $2^{13}$, restoring the loose $2^{30}$ induction bound. Three such steps leave radius greater than $2^{-2004}$. It follows that

$$
|F_n|\le2^{30+2004n},\qquad 0\le n\le6,
\tag{2}
$$

on the retained state tube. Additional finitely many state derivatives use its remaining width. The stationary, affine and cubic controls identify the first coefficients as the already accepted $F_0,F_2,F_3$; the three-iteration triangular construction bounds the remaining ones without numerical fitting.

## 3. Quantitative real-history order reduction

For derivative orders $k=0,1,2$, the $k$th reception derivative of the exact row is a rational finite-jet function. Its source jets through order $k$ have unweighted coefficients; the jets of orders $k+1$ and $k+2$ enter with at least one and two powers of $\delta$, respectively. This follows by differentiating the row and source clock: an additional derivative either advances one source jet while retaining its coefficient, or differentiates the clock and contributes another propagation factor.

The needed finite-jet Lipschitz bound is uniform when those two highest jets are treated as the independent weighted variables $\delta Z_d^{(k+1)}$ and $\delta^2 Z_d^{(k+2)}$. To check it without a hidden derivative, put $c=(1-\delta n\cdot V)/D$. Then

$$
\dot q=V+bc,\qquad \ddot q=F+A_dc^2+bc',
$$

$$
c'=\frac{-\delta(\dot n\cdot V+n\cdot F)D
-(1-\delta n\cdot V)D'}{D^2},
$$

$$
D'=\delta(\dot n\cdot b+n\cdot A_dc),
$$

$$
D''=\delta\{\ddot n\cdot b+2\dot n\cdot A_dc
+n\cdot Z_d'''c^2+n\cdot A_dc'\}.
\tag{3}
$$

Differentiate the bracket of the exact row twice. Its highest term is $\delta^2L n(n\cdot Z_d'''')c^2$; terms with the source jerk outside that highest term have at least one propagation factor. No $c''$ is required. On complex component disks of radius $2^{-10}$ about the real jet data, with $|V|,|b|<128$, $|F|,|A_d|<512$, and the weighted higher variables below two, (3) and $n=q/L$ bound every primitive through second order below $2^{100}$ and the differentiated row below $2^{512}$. Cauchy's component estimate, including the fewer than twenty scalar jet inputs, bounds its weighted Lipschitz constant by $2^{544}$. For $k=0,1$ the unused higher variables and terms are simply absent.

Use the actual degree-four Taylor polynomial at reception. Its source errors have bounds $2^{1060}\delta^{5-j}$ for $0\le j\le4$, including the causal-window length below $10\delta$ on this angular-scale box. The root error is at most twice $\delta$ times the position error. Transporting each polynomial jet to that shifted root uses the next polynomial jet; the highest one is constant. The maximum weighted data discrepancy for row derivative $k$ is therefore below $2^{1400}\delta^{5-k}$. Its real-history transfer error is below $2^{2100}\delta^{5-k}$. This includes the acceleration and jerk transport; it is not a same-clock comparison.

For the polynomial row, use independent complex reception and propagation disks of radius $2^{-8310}$. The mixed Cauchy remainder after parameter order $4-k$, followed by $k$ reception derivatives, has bound below $2^{42000}\delta^{5-k}$. Thus the actual row, its first derivative and its second derivative have the finite present-jet expansions through orders four, three and two with that bound. Only five bounded source jets are needed for these Taylor transfers.

Triangular substitution of the actual generated jets gives the following safe common budget:

| Actual jet | Autonomous orders retained | Error bound |
| --- | --- | --- |
| $Z''$ | through degree four | $2^{81000}\delta^5$ |
| $Z'''$ | through degree three | $2^{81000}\delta^4$ |
| $Z''''$ | through degree two | $2^{81000}\delta^3$ |
| $Z^{(5)},Z^{(6)}$ | central values | $2^{40100}\delta^2$ |

For clarity, the first row is obtained by first determining the acceleration through quadratic order. Its remaining cubic error, inserted in the quadratic source-acceleration coefficient, is fifth order. The cubic present-source coefficient depends linearly on jerk, and its second-order central discrepancy also contributes at fifth order. The second differentiated-row calculation uses the already determined quadratic acceleration in the zeroth-order total derivative of $F_0$. All unknown highest present-jet feedback retains its factor $O(\delta^2)$ and is absorbed with factor at most two. Bounds (2), the mixed remainder, and the central discrepancy give constants below the displayed common exponent. This is a finite triangular solve, not differentiation of a seventh-order remainder.

After the source clock is positive, the generated sixth coefficient varies over one causal interval by at most $2^{40200}\delta$ relative to the current central sixth jet. Taylor's integral formula then gives position, velocity and acceleration errors of orders seven, six and five. Their row weights are zero, one and two. The implicit-root transfer and the polynomial parameter remainder together are below $2^{60000}\delta^7$.

One can check the final coefficient substitution with separate budgets. The present-acceleration and jerk coefficient norms are at most two and $4/3$. For the $n$th present-source coefficient, the finite-germ Cauchy estimate bounds its jet Lipschitz constant by $2^{100+8310n}$. At order four this multiplies the $2^{81000}\delta^3$ fourth-jet error; at order five it multiplies a $2^{40100}\delta^2$ error. Order-six central replacements are at least eighth order. Their sum, with the preceding value remainder, is below the single bound

$$
Z''=F^{[6]}(Z,Z';\delta)+R_7,
\qquad |R_7|\le2^{121000}\delta^7.
\tag{4}
$$

Before source-clock clearance the corresponding bound is $2^{121000}\delta^6$, since the supplied sixth jet is merely bounded. It lasts for less than $5\epsilon$ in the original orbital time. No seventh actual derivative or derivative of $R_7$ is asserted.

## 4. Bounded moving-center construction and actual release seed

Let $\mathcal A_r,\mathcal A_\theta$ be the components of $F^{[6]}((\rho,0),(u,t);\delta)$, with $t=e^{\delta^2/\rho}/\rho$. Retain the analytic exponential coordinate factors and define

$$
b=\rho e^{-\delta^2/\rho}\mathcal A_\theta+\delta^2u/\rho^2,
\qquad G=(u-2b\rho,\;bu+\mathcal A_r+e^{2\delta^2/\rho}/\rho^3).
$$

This is the finite comparison system of the accepted signed subject. At zero parameter,

$$
G_0=(u,-\rho^{-2}+\rho^{-3}),\qquad
DG_0(1,0)=J_0=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

Construct the degree-six center $a=(\rho_s-1,u_s)$ in the finite polynomial ring, using the weighted coefficient norm at

$$
R_c=2^{-15000}.
$$

In that norm $\|\delta a'\|\le6\|a\|$. The constant parameter-dependent field at the center is below $2^{-25000}$ by (2); the nonlinear part of $G_0-J_0a$ has derivative below $2^{-10}$ on $\|a\|\le2^{-40}$. The remaining parameter-dependent state derivatives and $b\delta a'$ have Lipschitz norm below $2^{-10}$ there. Hence

$$
a\longmapsto-J_0^{-1}\bigl[G(1+a_\rho,a_u,\delta)-J_0a
+\delta b(1+a_\rho,a_u,\delta)a'\bigr]\pmod{\delta^7}
\tag{5}
$$

is a contraction on that ball. The coefficient equations are triangular and have the same unique solution as the accepted construction. Every center coefficient through degree six is bounded by $2^{90000}$. Reversal/reflection parity and the independently known quadratic/cubic coefficients give

$$
\rho_s=1+\tfrac32\delta^2+\rho_4\delta^4+\rho_6\delta^6,
\qquad u_s=\tfrac83\delta^3+u_5\delta^5.
\tag{6}
$$

The untruncated residual of (5) is analytic on the $R_c$ disk, bounded by $2^{50}$, and has its first seven coefficients zero. Its actual size is below $2^{105051}\delta^7$. Combining it with (4) bounds the generated center defect by $2^{121020}\delta^7$.

At release $H_0=(1-\epsilon^2/2)^{-1/2}e^{-\epsilon^2}$, $\rho_0=H_0^{-2}$ and $u_0=0$. Let $z=\rho-\rho_s$, $q=u-u_s$. The exact initial data and (6) give

$$
|z_0|\le2^{90010}\epsilon^4,
\qquad \left|q_0+\tfrac83\epsilon^3\right|
\le2^{90010}\epsilon^5.
\tag{7}
$$

For the fast potential and corrected norm use exactly the accepted definitions, with $P(\rho,\delta)=\rho^{-2}-e^{2\delta^2/\rho}(\rho^{-3}-\delta^2/(2\rho^4))$:

$$
v(z,\delta)=\int_0^z[P(\rho_s+t,\delta)-P(\rho_s,\delta)]\,dt,
\qquad J=q^2/2+v,
\qquad A=\sqrt{J-\tfrac43\delta^3\chi}.
$$

The polynomial source window at release lies wholly inside the original recent interval. The short generated radius change is below $20\epsilon$, so the delay is below $3\epsilon$ and the source clock is positive by $s_b=5\epsilon$. The nongenerated sixth-order error integrates to at most $2^{121010}\epsilon^7$. Variation of constants for the equivalent two-component fast norm, whose curvature stays between fixed positive bounds, preserves (7). Therefore

$$
\left|\frac{A(s_b)}{(4\sqrt2/3)\epsilon^3}-1\right|<2^{-100000},
\qquad |H(s_b)-1|<2^{20}\epsilon^2.
\tag{8}
$$

This is an actual signed release-mode assertion. A supplied sixth seam cannot remove its cubic coefficient under the fixed inventory.

## 5. Explicit compact cycle bounds and transport

At zero parameter the exact fast potential is $v=z^2/[2(1+z)^2]$. The coordinate $Q=\operatorname{sgn}(z)\sqrt{2v}$ has inverse $\rho=1/(1-Q)$. On the enlarged cutoff $J_*=9/50$, $|Q|,|q|\le3/5$. Give this real interval complex width $2^{-12}$. The denominator $1-Q$ stays above $1/3$ in modulus. Write $2v=z^2W$ before taking the analytic square root, so the center is regular. The explicit potential and its derivatives on this tube are bounded by $2^{20}$. The center bound $2^{-40}$ on the $R_c$ disk therefore perturbs $z\sqrt W$ by less than $2^{-20}$, while the unperturbed inverse derivative is bounded and its direct derivative exceeds $1/10$. A circle of radius $2^{-10}$ about the central inverse has a larger boundary margin than that perturbation; the analytic implicit inverse exists inside it. On the resulting real chart,

$$
1/32<Q_z<8.
\tag{9}
$$

The cycle numerator is $D=q\Gamma_q+v_z\Gamma_z-\delta\rho^{-3}v_\delta$, where $\Gamma_z=-2(\rho^{-2}-\rho_s^{-2})$ and $\Gamma_q=-\rho^{-3}q$. Define $c=\langle D\rangle/(J\langle\rho^{-3}\rangle)$, and let $\chi$ be the zero-mean periodic primitive of $(D-cJ\rho^{-3})/Q_z$ in fast angle. These are exactly the accepted definitions. Their analytical central control is $\oint D\,d\tau=6\pi J$ and $\oint\rho^{-3}d\tau=2\pi$, hence $c(J,0)=3$. In $Q=\sqrt{2J}\sin\theta$, $q=\sqrt{2J}\cos\theta$, divide the quadratic numerator by $2J$ before estimating it; this removes the apparent center singularity. The inverse-coordinate bounds, the explicit rational potential and integration over a $2\pi$ interval bound that numerator and its primitive by $2^{60}$, including subtraction of the weighted constant mean. At zero parameter the cycle denominator equals $2\pi$ for every amplitude; the displayed inverse perturbation changes it by less than one, so it stays above one. Cauchy estimates on the retained complex state width, and even dependence on $\delta$, give the safe bounds

$$
|\chi|\le2^{100}J,\quad
|\nabla_{z,q}\chi|\le2^{100}\sqrt J,
\quad |\chi_\delta|\le2^{30200}\delta J,
\quad |c-3|\le2^{30200}\delta^2.
\tag{10}
$$

The parameter exponents in (10) include $R_c^{-2}$ explicitly. Thus smallness is not inferred merely from finiteness of a cycle constant. The polar primitive has a smooth Cartesian center limit because its numerator vanishes quadratically and its mean is removed; its radial derivative is of order $\sqrt J$ and its angular derivative divided by the radius has the same order.

Subtracting the moving center and retaining the quadratic fast potential gives state errors bounded by

$$
2^{122000}\delta^4\sqrt J+2^{122000}\delta^7.
$$

Differentiate $\widehat J=J-(4/3)\delta^3\chi$ only once using the actual first-order system. The fast derivative cancels the zero-mean cycle term. Equations (4), (6) and (10), with their displayed parameter factors, bound the remaining terms by $2^{160000}(\delta^4\widehat J+\delta^7\sqrt{\widehat J})$. The exact scale rate satisfies $\delta^3/128<b_a<2^{10}\delta^3$. After dividing by $\dot H=Hb_a$ and using norm equivalence, a convenient common constant is

$$
\left|\frac{dA}{dH}-\frac{3A}{2H}\right|
\le2^{170000}\left(\frac{\epsilon A}{H^2}
+\frac{\epsilon^4}{H^5}\right).
\tag{11}
$$

Here $2^{170000}\epsilon=2^{-30000}$, not an unspecified smallness condition. Integrating (11) for $A/H^{3/2}$, starting with (8) and $H(s_b)>3/4$, gives

$$
\left|\frac{A(H)}{(4\sqrt2/3)\epsilon^3H^{3/2}}-1\right|
<2^{-20000}
\tag{12}
$$

until the fixed compact cutoff. The lower bound prevents loss of the phase coordinate. The corresponding phase error is bounded by $2^{170000}(\delta^3+\delta^7/A)$; (12) makes it smaller than $1/64$, so the actual fast phase increases at a rate between $1/64$ and sixteen. No derivative of $R_7$ enters these statements.

## 6. One actual eccentric pericenter and its signed account

The first hits of $A_1=1/8$ and $A_2=1/4$ occur at finite scales

$$
H_i=\left(\frac{3A_i}{4\sqrt2}\right)^{2/3}\epsilon^{-2}(1+e_i),
\qquad |e_i|<2^{-19998}.
\tag{13}
$$

The ratio $H_2/H_1$ exceeds $3/2$, and $H_1>\epsilon^{-2}/16$. Since $d\tau/dH>H^2/(2^{10}\epsilon^3)$, the phase-time interval between these hits exceeds $2^{-30}\epsilon^{-9}$. Its phase advance is therefore more than $4\pi$. The radial velocity $u=q+u_s$ has both signs on those cycles because $|u_s|$ is much smaller than the fixed radial amplitude. Near the inner crossing $u=0$, the central value of $\dot u$ is $(1-\rho)/\rho^3$; the fixed lower amplitude and the established perturbation bounds keep it above $1/16$. Thus the same actual prepared history reaches a genuine pericenter between the two hits.

At that pericenter,

$$
\frac1{16}\epsilon^{-2}<h_p<\frac12\epsilon^{-2},
\qquad
-\frac12<H_p^2\mathcal E_p<-\frac38.
\tag{14}
$$

For the account bound, at zero parameter $H^2\mathcal E=J-1/2$. Substitution of the exact account, the center bounds and the coordinate exponential changes this identity by less than $2^{100000}\delta^2$ on the compact box. Also $|\widehat J-J|\le(4/3)2^{100}\delta^3J$. Between the two norm hits these errors are far smaller than $1/64$. The stated interval follows with slack. More generally the whole enlarged chart $J\le9/50$ retains negative account, closing the temporary negative-account premise in Section 1. The strict coordinate margins and the inherited complete-root/jet theorem then continue the actual history through both hits.

Equation (14) is a preparation-specific signed quantity, not the missing final deficit. Its deficit is still much larger than the positive outbound-input scale $\gamma h_p^{-5}$, where $\gamma=4\epsilon^3/3$. It establishes that the fixed dyadic member actually enters the $h\asymp\epsilon^{-2}$ eccentric regime used in earlier conditional power counts. It does not identify its final pericenter or decide whether the signed account later crosses zero.

## Review boundary and falsifiers

All new conclusions remain unreviewed pending independent checking of the weighted derivative maps, quantitative autonomous coefficient bounds, real-history substitutions, finite center contraction and explicit cycle norms. The first particularly sensitive operations are the weighted higher-jet coefficients in Section 3 and the complex inverse/primitive bounds in Section 5. A missing derivative, root transport term, failed state-tube margin, constant exceeding its declared budget, or actual trajectory violating (11) under those hypotheses would defeat this candidate. No amount of arithmetic agreement would repair such a gap.

The next unresolved quantity remains the correlated actual phase and account at a near-critical final passage. A positive-frequency compact phase estimate and the negative pericenter in (14) do not supply it. No numerical target, new physical law, smoother past, arbitrary forcing, selected favorable phase, external source, Python execution, long process or Git mutation was used.
