# Signed breathing for a rigidly repeating opposite pair: the isotropic part is controlled, the common-motion term is bounded at second order, and with a positive margin the anisotropic breathing carries the gain (2026-10-14)

## Result

**In words.** A rigidly repeating opposite pair gains relative angular momentum $J$ at a rate whose period total is close to the angle $\Theta$ turned by its axis. The accepted notes write what must cancel that gain in two equivalent ways: as a loss $M_+$ minus a breathing integral $B_S$, or as a common-motion term $\Lambda$ plus a breathing integral $\tilde B$. In those notes both breathing integrals are bounded only by their absolute values, with the velocity sum $\mathbf P=\mathbf v_1+\mathbf v_2$ taken at its largest value, and $\Lambda$ carries no bound. This note uses the evolution of the velocity sum along the solution. Three results follow. The part of the breathing weight that depends only on $\lvert\mathbf P\rvert^2$ is fixed by an exact identity and is small; so the two breathing integrals are exactly related, $B_S+\tilde B$ equal to that small part. The term $\Lambda$ is bounded at second order in speed once the two rows are combined, through the angular average of $r/J^2$; the bound has a curvature allowance that is also of higher order on the repeating class, by the accepted floor on the separation. With these the sufficient exclusion of the radial-period note gets smaller leading and variation coefficients, roughly half, at the price of a larger allowance at small $J_{\min}$. What remains is the *anisotropic* breathing $\tilde B$, whose weight is the part of $\tfrac18(P_\parallel^2-P_\perp^2)$ that does not cancel. When an explicit margin $H$, the gain fraction left after the error and non-breathing terms, is positive, $\tilde B$ is positive and at least $H\Theta$; it carries nearly the whole gain only when those error and loss fractions are small. A formal comparison, which freezes the relative orbit and the common velocity and is not a solution, shows that the scalar requirement is not contradictory: an eccentric relative orbit whose apsidal line lies at $45^\circ$ to the common velocity meets it. A second recurrence identity, such as the period balance of the apsidal line relative to the common velocity, is a candidate route to the missing estimate; it is not shown to be necessary.

1. **Exact link between the two breathing integrals (derived).** For every rigidly repeating pair with $J>0$ and speeds below one,
   $$
   B_S+\tilde B=\frac18\oint\lvert\mathbf P\rvert^2\,d\frac rJ ,
   $$
   and on solutions $\oint\lvert\mathbf P\rvert^2\,d(r/J)=-2\oint(r/J)\,(\mathbf A_1+\mathbf A_2)\cdot\mathbf P\,dt$, with $\mathbf A_i$ the rows (Lemma W.1).
2. **The isotropic part is small (derived).** Under the whole-past speed bound $w<\tfrac13$ and $J\ge J_{\min}>0$, $\tfrac18\lvert\oint\lvert\mathbf P\rvert^2d(r/J)\rvert\le\tfrac14k_A(w)\,\mathcal N+\tfrac14k_A'(w)\,\Theta/J_{\min}^2$, where $\mathcal N=\oint(r/J^2)\,d\vartheta$ and $k_A=O(w^2)$, $k_A'=O(w)$ (Lemma W.2). On the repeating class the separation floor turns the second term into a multiple of $\mathcal N$, giving $(\tfrac14k_A+w^2k_A'/c_-)\,\mathcal N=O(w^2)\,\mathcal N$. At $w=\tfrac1{10}$: $\tfrac14k_A\le0.01493$, $\tfrac14k_A'\le0.7721$.
3. **$\Lambda$ is bounded at second order (derived).** $\Lambda=\Lambda_0+\Lambda_1$ with a nonnegative principal term $0\le\Lambda_0\le w^2c_1(w)\,\mathcal N$, and a remainder $\lvert\Lambda_1\rvert\le k_1(w)\,\mathcal N+\tfrac14k_A'(w)\,\Theta/J_{\min}^2$ whose straight-row part $k_1$ is of third order and whose curvature allowance has an $O(w)$ coefficient (Theorem W.3). On the repeating class the separation floor gives the alternative form $\lvert\Lambda_1\rvert\le(k_1+w^2k_A'/c_-)\,\mathcal N=O(w^3)\,\mathcal N$. At $w=\tfrac1{10}$: $w^2c_1\le0.013445$, $k_1\le0.001483$.
4. **A sufficient exclusion with smaller coefficients (derived).** No rigidly repeating solution in the speed class satisfies the inequality of Corollary W.5. At $w=\tfrac1{10}$, with no radial travel and large $J_{\min}$, its left side is about $0.0150+0.00021\,X$, where the radial-period test has $0.0278+0.00043\,X$, and its radial-travel coefficient is $0.008155$ where that test has $0.015716$. Its allowance at small $J_{\min}$ is larger ($5.3966/J_{\min}$ against $3.989/J_{\min}$). Neither test dominates the other; a solution is excluded if either inequality holds. The lower envelope of the displayed test shows only that it cannot hold for radial travel per radian $\rho_r\ge121$ (the radial-period test: $\rho_r\ge62$); it does not show that the test holds below that value. As one consequence, constant-separation solutions at $w=\tfrac1{10}$ are excluded through $r=2\times10^7$, twenty times the accepted range (Corollary W.6).
5. **With a positive margin the anisotropic breathing carries the gain (derived).** With $H=1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda$ and $E_I=(k_A/4)\,\mathcal N/\Theta+k_A'/(4J_{\min}^2)$, $\tilde B\ge H\,\Theta$ and $B_S\le(-H+E_I)\,\Theta$ (Corollary W.7). $H>0$ makes $\tilde B$ positive; $H>E_I$ makes $B_S$ negative. Near-equality of the two in size, and a near-full share of the gain, hold only to within the fractions $E_I$ and $1-H$.
6. **A formal comparison (inferred; auxiliary model, not a solution).** In a prescribed model (relative motion an ellipse under an inward acceleration $2/r^2$ with frozen $J$, a constant common velocity, no delay corrections), the scalar balance $\Lambda+\tilde B=\Theta$ holds exactly when $\lvert\mathbf P\rvert^2(1-J\lambda^2\sin2\beta)=8\sqrt{1-e^2}$, with $e$ the eccentricity, $\lambda=(1-\sqrt{1-e^2})/e$ and $\beta$ the angle from the apsidal line to the common velocity. At $\beta=-\pi/4$ this is met at any small common speed once $Je^2$ is about $32/\lvert\mathbf P\rvert^2$ (Section 6). The model's constant velocity sum does not obey the leading common-motion equation, its orbit and $J$ are frozen, and its dropped terms have no proved bound; so it shows only that the scalar requirement of item 5 is not algebraically contradictory. It proves no restriction on estimates from the coupled equations. A second recurrence identity, such as the period balance of the apsidal line relative to the common velocity, is a candidate route, not a demonstrated prerequisite.

Claim grade: derived for items 1 to 5, inferred for item 6. Items 1 to 5 are hand derivations of one session. The [Codex review](saturday-signed-breathing-radial-travel-codex-review-2026-10-14.md) reconstructs Lemmas W.1 and W.2, Theorem W.3, Proposition W.4 and Corollaries W.5 to W.7 separately, checks the decimals and the constant-separation comparison with its own exact-fraction reference, and requested the five corrections SB1 to SB5 incorporated here. Item 6 is a formal calculation in a declared auxiliary model; it is not a solution of the Master Equation, has no error bound, and excludes and admits nothing. No instrument was written by this author and nothing was run by this author. Nothing is measured on solutions. Falsifiers are listed in Section 9.

Everything is for the unchanged Master Equation, planar motion, opposite unit polarities, unit reduced coupling, $c_f=1$, twice continuously differentiable complete histories, positive separation, rigid repetition $\mathbf x_i(t+T)=R\,\mathbf x_i(t)+\mathbf d$ with one rotation and one vector for both members, $J>0$ throughout, and, for items 2 to 5, both speeds at most a fixed $w<\tfrac13$ over the whole past, so that each member receives exactly one partner row of positive strength and none from its own path. Low and changing-sign $J$ are not treated.

## 1. Setting and notation

The notation is that of the [non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md), the [curved-window note](saturday-curved-window-strength-difference-2026-10-11.md), the [straight-term note](saturday-straight-strength-period-average-2026-10-12.md), the [breathing note](saturday-combined-breathing-period-average-2026-10-12.md), the [common-motion note](saturday-common-motion-period-comparison-2026-10-12.md) and the [radial-period note](saturday-solution-weighted-geometry-comparison-2026-10-12.md). $u_i$, $b_i$ are member $i$'s velocity components along and across the axis $\hat{\mathbf r}$, $\mathbf r=\mathbf x_1-\mathbf x_2$; $P_\parallel=u_1+u_2$, $P_\perp=b_1+b_2$, $\lvert\mathbf P\rvert^2=P_\parallel^2+P_\perp^2$, $Q=P_\parallel^2-P_\perp^2$; $d=J/r=b_1-b_2$; $x=r/J$; $\Omega=\dot\vartheta=J/r^2$; $\Theta=\oint\Omega\,dt$; $\oint f\,d\vartheta=\oint f\,\Omega\,dt$. On a solution member $i$ receives the row $\mathbf A_i=-a_i\mathbf n_i$; $A_\parallel$, $A_\perp$ are the components of $\mathbf A_1+\mathbf A_2$ along and across the axis; $\mu=\tfrac12(a_1+a_2)$, $\delta=\tfrac12(a_2-a_1)$; $e_J$, $e_P$, $\chi$, $\zeta=2r^2\delta-P_\parallel$ and $\zeta_0=u_1g(b_1)+u_2g(b_2)$ are as in the non-mirror and curved-window notes, with $g(b)=(1-b^2)^{-1/2}-1$, $\Phi(b)=1-\sqrt{1-b^2}-\tfrac12b^2$, $\sigma(b)=1-\sqrt{1-b^2}=\tfrac12b^2+\Phi(b)$.

The accepted relations used are:

- the component equations (non-mirror Proposition H): $\dot P_\parallel=A_\parallel+\Omega P_\perp$, $\dot P_\perp=A_\perp-\Omega P_\parallel$, $A_\parallel=2\delta-\chi$, $A_\perp=-\mu P_\perp-\delta J/r+e_P$, $\dot J=\mu J+r\delta P_\perp+re_J$, and $\tfrac{d}{dt}\lvert\mathbf P\rvert^2=2(A_\parallel P_\parallel+A_\perp P_\perp)$;
- the period identities: $\Lambda=\oint\frac r{4J}(A_\parallel P_\parallel-A_\perp P_\perp)\,dt$, $B=\oint\tfrac18Q\,dx$, $\tilde B=\oint H'\,dx$ with $H'=\tfrac18Q-D_\Phi$ and $D_\Phi=\Phi(b_1)+\Phi(b_2)-2\Phi(d/2)$, and the exact balance $\Lambda+\tilde B=-C_0+T_1+T_3$ with $G+C_0=-Z_{\rm curved}-\oint re_J\,dt$ (breathing Theorem B.5); $B_S=\oint W_S\,dx$ with $W_S=\sigma(b_1)+\sigma(b_2)-2\sigma(d/2)$, and $M_+-B_S=\Theta+M_{\rm rel}+R$ (common-motion Theorem C.2);
- the bounds under the whole-past speed bound $w<\tfrac13$: $r^2a_i\in[\alpha,c_1]$ with $\alpha=(1-w)^2/(1+w)$, $c_1=(1+w)^2/(1-w)$; $r^2\lvert\delta\rvert\le c_2=(3w+w^3)/(1-w^2)$; $\lvert\chi\rvert\le c_1w^2/r^2$; $r^3\lvert e_J\rvert,\ r^3\lvert e_P\rvert\le c_3=(1+w)^3/(1-3w)^2$; $\lvert\zeta_0\rvert\le z_0(w)=2wg(w)$ and $\lvert\zeta-\zeta_0\rvert\le c(w)/r$, $\lvert a_i-a_i^0\rvert\le c(w)/(2r^3)$ (Theorem S1); $0\le D_\Phi\le\tfrac14\varphi_2(w)P_\perp^2$ and $\lvert H'\rvert\le\kappa_B(w)\lvert\mathbf P\rvert^2$ (breathing Theorem B.2); $\lvert\dot J\rvert\le wc_+/r$, $c_\pm$ as in the radial-period note; the bound on $\mathcal V=\oint\lvert dx\rvert$ in the proof of the radial-period Theorem G.4, $\mathcal V\le R_1+(c_1+c_2P_{\perp\max}X+c_3/J_{\min})\,\mathcal N$; and Theorem G.2, $\mathcal N\le[1+(2w+wc_+/J_{\min})\rho_r]\,\Theta/c_-$ with $\rho_r=R_{\rm var}/(J_{\min}\Theta)$, $R_{\rm var}=\oint\lvert\dot r\rvert\,dt$, $R_1=\oint\lvert\dot r\rvert\,dt/J\le\rho_r\Theta$, $X=\sup r/J$.

Two elementary facts are used repeatedly: $\lvert P_\parallel\rvert,\lvert P_\perp\rvert\le2w$ and $\lvert\mathbf P\rvert\le2w$; and $d\,P_\perp=(b_1-b_2)(b_1+b_2)=b_1^2-b_2^2$, so $\lvert P_\perp\rvert\,J/r\le w^2$. Also $\oint dt/(rJ)=\mathcal N$, $\oint dt/r^2=\oint d\vartheta/J\le\Theta/J_{\min}$, $\oint dt/(Jr^2)=\oint d\vartheta/J^2\le\Theta/J_{\min}^2$, and $1/r\le2w/J$ because $J=r\,d\le2wr$. On the repeating class the radial-period note's floor $r\ge c_-/(4w^2)$ (its Proposition G.3) gives a second bound for the last integral, $\oint dt/(Jr^2)=\oint(1/r)\,dt/(rJ)\le(4w^2/c_-)\,\mathcal N$.

## 2. The isotropic part of the breathing weight

**Lemma W.1 (derived).** (a) *Kinematic.* For a rigidly repeating twice continuously differentiable planar pair with $r>0$, $J>0$ and speeds below one,

$$
W_S=\frac{P_\perp^2}4+D_\Phi,\qquad\frac{P_\perp^2}4=\frac{\lvert\mathbf P\rvert^2-Q}8,\qquad\text{hence}\qquad B_S+\tilde B=\frac18\oint\lvert\mathbf P\rvert^2\,dx .
$$

(b) *On solutions*, $\oint\lvert\mathbf P\rvert^2\,dx=-2\oint x\,(A_\parallel P_\parallel+A_\perp P_\perp)\,dt$.

*Proof.* (a) $\sigma(b)=\tfrac12b^2+\Phi(b)$, so $W_S=\tfrac12(b_1^2+b_2^2)-\tfrac14d^2+D_\Phi$. With $b_{1,2}=\tfrac12(P_\perp\pm d)$, $b_1^2+b_2^2=\tfrac12(P_\perp^2+d^2)$, which gives the first equality; the second is $\lvert\mathbf P\rvert^2-Q=2P_\perp^2$. Then $B_S=\tfrac18\oint\lvert\mathbf P\rvert^2dx-\oint(\tfrac18Q-D_\Phi)\,dx=\tfrac18\oint\lvert\mathbf P\rvert^2dx-\tilde B$. (b) $\lvert\mathbf P\rvert^2$ and $x$ are periodic under rigid repetition and $x$ is continuously differentiable, so $\oint\lvert\mathbf P\rvert^2dx=-\oint x\,\tfrac{d}{dt}\lvert\mathbf P\rvert^2dt$; insert Proposition H(5). $\qquad\blacksquare$

*Known case, by hand.* On the review's transverse-sum family of the common-motion note ($r=1$, $u_1=u_2=0$, $b_{1,2}=m\pm\tfrac12J$): $\lvert\mathbf P\rvert^2=4m^2$, $Q=-4m^2$, so $\tfrac18\oint\lvert\mathbf P\rvert^2dx-\tilde B=\oint(\tfrac12m^2+\tfrac12m^2+D_\Phi)\,dx=\oint(m^2+D_\Phi)\,dx=B_S$, as (a) states.

So the two breathing integrals of the accepted notes are not independent unknowns. They differ, up to sign, by the isotropic integral $\tfrac18\oint\lvert\mathbf P\rvert^2dx$, and that integral is fixed by the evolution of $\lvert\mathbf P\rvert^2$.

**Lemma W.2 (derived).** For a rigidly repeating solution in the speed class with $J\ge J_{\min}>0$,

$$
\lvert A_\parallel P_\parallel+A_\perp P_\perp\rvert\le\frac{k_A}{r^2}+\frac{k_A'}{r^3},\qquad
\frac18\Bigl\lvert\oint\lvert\mathbf P\rvert^2\,dx\Bigr\rvert\le\frac{k_A}4\,\mathcal N+\frac{k_A'}4\,\frac\Theta{J_{\min}^2},
$$

$$
k_A=4w^2c_1+4k_1,\qquad k_1=\tfrac14\bigl(2w\,z_0+2w^3c_1+w^2c_2\bigr),\qquad k_A'=2w\,(c+c_3).
$$

*Proof.* By Proposition H(3), (4) and $2\delta=(P_\parallel+\zeta)/r^2$,

$$
A_\parallel P_\parallel+A_\perp P_\perp=\frac{P_\parallel^2-r^2\mu P_\perp^2}{r^2}+\frac{\zeta P_\parallel}{r^2}-\chi P_\parallel-\delta\frac Jr P_\perp+e_PP_\perp .
$$

Since $r^2\mu\in[\alpha,c_1]$ and $c_1\ge1$, $\lvert P_\parallel^2-r^2\mu P_\perp^2\rvert\le c_1\lvert\mathbf P\rvert^2\le4w^2c_1$. Next $\lvert\zeta P_\parallel\rvert\le2w\,(z_0+c/r)$; $\lvert\chi P_\parallel\rvert\le2w^3c_1/r^2$; $\lvert\delta(J/r)P_\perp\rvert\le c_2w^2/r^2$; $\lvert e_PP_\perp\rvert\le2wc_3/r^3$. This is the pointwise bound. Integrate it against $2x\,dt$ (Lemma W.1(b)), using $\oint x\,dt/r^2=\mathcal N$ and $\oint x\,dt/r^3=\oint d\vartheta/J^2\le\Theta/J_{\min}^2$, and divide by $8$. $\qquad\blacksquare$

$k_A$ is of second order in $w$ and $k_1$ of third, while the curvature coefficient $k_A'$ is of first order and multiplies $\Theta/J_{\min}^2$. On the repeating class the floor bound $\oint dt/(Jr^2)\le(4w^2/c_-)\,\mathcal N$ of Section 1 gives the alternative form $\tfrac18\lvert\oint\lvert\mathbf P\rvert^2dx\rvert\le(\tfrac14k_A+w^2k_A'/c_-)\,\mathcal N$, whose coefficient is of second order as a whole. Both forms are valid; the numerical test of Section 4 uses the first. At $w=\tfrac1{10}$ (hand evaluation from the accepted tables: $c_1\le1.3445$, $c_2\le0.30405$, $c_3\le2.7164$, $g\le0.005038$, $c\le12.725$): $z_0\le0.0010076$, $k_1\le0.001483$, $\tfrac14k_A\le0.01493$, $\tfrac14k_A'\le0.7721$.

## 3. The common-motion term is of second order

Bounding the two rows of $\Lambda$ separately gives an integrand of first order in speed, which is why the common-motion note did not use a direct bound on $\Lambda$. Combined through Proposition H, the rows nearly cancel.

**Theorem W.3 (derived).** For a rigidly repeating solution in the speed class with $J\ge J_{\min}>0$, write $\Lambda=\Lambda_0+\Lambda_1$ with

$$
\Lambda_0=\oint\frac{P_\parallel^2+r^2\mu P_\perp^2}{4rJ}\,dt,\qquad 0\le\Lambda_0\le\frac{c_1}4\oint\frac{\lvert\mathbf P\rvert^2}{rJ}\,dt\le w^2c_1\,\mathcal N,
$$

$$
\lvert\Lambda_1\rvert\le k_1\,\mathcal N+\frac{k_A'}4\,\frac\Theta{J_{\min}^2}.
$$

*Proof.* With $D=A_\parallel P_\parallel-A_\perp P_\perp$, Proposition H(3), (4) give

$$
D=\frac{P_\parallel^2+r^2\mu P_\perp^2}{r^2}+\frac{\zeta P_\parallel}{r^2}-\chi P_\parallel+\delta\frac JrP_\perp-e_PP_\perp .
$$

The first term is nonnegative and at most $c_1\lvert\mathbf P\rvert^2/r^2$; multiplied by $r/(4J)$ and integrated it is $\Lambda_0$. The other four are bounded as in Lemma W.2, by $4k_1/r^2+k_A'/r^3$; multiply by $r/(4J)$ and integrate. $\qquad\blacksquare$

$\Lambda_0$ is a nonnegative loss of the same kind as $M_+$, with weight $\tfrac14(P_\parallel^2+r^2\mu P_\perp^2)$ in place of $\tfrac14P_\perp^2(r^2a_1/S_1+r^2a_2/S_2)$. Its bound carries $w^2c_1$ where the bound on $M_+$ carries $4w^2\kappa_M\approx2w^2$. In the displayed bound on $\Lambda_1$, the straight-row part $k_1$ is of third order but the curvature allowance $\tfrac14k_A'\Theta/J_{\min}^2$ has a first-order coefficient. On the repeating class the floor bound of Section 1 converts it, $\tfrac14k_A'\oint dt/(Jr^2)\le(w^2k_A'/c_-)\,\mathcal N$, so that $\lvert\Lambda_1\rvert\le(k_1+w^2k_A'/c_-)\,\mathcal N$, which is $O(w^3)\,\mathcal N$ as $w\to0$. In this sense the whole of $\Lambda$ is bounded at second order on that class; the fixed-speed test of Section 4 keeps the displayed form.

## 4. The balance through $\Lambda+\tilde B$, and the exclusion

**Proposition W.4 (the gain in terms of $\Theta$; derived).** For a rigidly repeating solution in the speed class with $J\ge J_{\min}>0$,

$$
\Lambda+\tilde B\ \ge\ \Theta\,(1-\eta_\Lambda)-t_1\,\mathcal N,\qquad
\eta_\Lambda=\frac{z_0}2+\frac{h_1}{J_{\min}},\qquad h_1=wc_1+2wc+c_3+wgc_1,\qquad t_1=2w^2g\,c_1,
$$

with $g=g(w)$.

*Proof.* $\Lambda+\tilde B=-C_0+T_1+T_3$ and $-C_0=G+Z_{\rm curved}+\oint re_J\,dt$ exactly. *The gain.* $G=\oint\mu J\,dt=\oint r^2\mu\,d\vartheta$. By Lemma S.1 of the curved-window note, $r^2\mu^0=\tfrac12(2-u_2/S_2+u_1/S_1)=1+\tfrac12\dot r+\tfrac12\xi_0$ with $\xi_0=u_1g(b_1)-u_2g(b_2)$, $\lvert\xi_0\rvert\le z_0$, because $u/S=u\,(1+g)$ and $u_1-u_2=\dot r$. Now $\oint\dot r\,d\vartheta=\oint J\,\tfrac{d}{dt}(-1/r)\,dt=\oint\dot J/r\,dt$ by parts, and $\lvert\dot J\rvert\le wc_+/r=2wc_1/r$, so $\tfrac12\lvert\oint\dot r\,d\vartheta\rvert\le wc_1\Theta/J_{\min}$. By Theorem S1, $\lvert r^2(\mu-\mu^0)\rvert\le c/(2r)\le wc/J$, so its angle integral is at most $wc\,\Theta/J_{\min}$. Hence $G\ge\Theta\,[1-z_0/2-(wc_1+wc)/J_{\min}]$. *The curvature terms.* $\lvert Z_{\rm curved}\rvert\le wc\oint dt/r^2\le wc\,\Theta/J_{\min}$ and $\lvert\oint re_J\,dt\rvert\le c_3\Theta/J_{\min}$ (curved-window Corollary S1.1, read against $\Theta$). *The straight-term remainders* (straight-term Proposition Z.3, read against $\mathcal N$ and $\Theta$): the integrand of $T_1$ is at most $2w^2g\,c_1/(rJ)$, so $\lvert T_1\rvert\le t_1\mathcal N$; that of $T_3$ is at most $wg\,c_1/r^2$, so $\lvert T_3\rvert\le wgc_1\Theta/J_{\min}$. $\qquad\blacksquare$

**Corollary W.5 (necessary condition and exclusion; derived).** For a rigidly repeating solution in the speed class with $J\ge J_{\min}>0$,

$$
(1-\eta_\Lambda-\eta_\Lambda')\,\Theta\ \le\ \bigl(w^2c_1+k_1+t_1\bigr)\,\mathcal N+4w^2\kappa_B\,\mathcal V,\qquad\eta_\Lambda'=\frac{k_A'}{4J_{\min}^2},
$$

and therefore no such solution satisfies

$$
\Bigl[w^2c_1+k_1+t_1+4w^2\kappa_B\Bigl(c_1+2wc_2X+\frac{c_3}{J_{\min}}\Bigr)\Bigr]\frac{1+(2w+wc_+/J_{\min})\,\rho_r}{c_-}+4w^2\kappa_B\,\rho_r\ <\ 1-\frac{z_0}2-\frac{h_1}{J_{\min}}-\frac{k_A'}{4J_{\min}^2}.
$$

The strict class is empty when the right side is not positive.

*Proof.* Proposition W.4, then $\Lambda+\tilde B\le\Lambda_0+\lvert\Lambda_1\rvert+\lvert\tilde B\rvert$ with Theorem W.3 and $\lvert\tilde B\rvert\le\kappa_B\oint\lvert\mathbf P\rvert^2\lvert dx\rvert\le4w^2\kappa_B\mathcal V$ (breathing Theorem B.2). For the exclusion insert $\mathcal V\le R_1+(c_1+2wc_2X+c_3/J_{\min})\mathcal N$ with $P_{\perp\max}\le2w$, $R_1\le\rho_r\Theta$, and Theorem G.2 for $\mathcal N$; divide by $\Theta>0$. $\qquad\blacksquare$

*A sufficient test at $w=\tfrac1{10}$ (hand evaluation, every coefficient rounded upward and every subtracted term rounded so as to weaken the test; it implies the exact inequality and is not equivalent to it).* With $w^2c_1\le0.013445$, $k_1\le0.001483$, $t_1\le0.0001355$, $4w^2\kappa_B\le0.005152$ (accepted $\kappa_B\le0.1288$), $4w^2\kappa_Bc_1\le0.006927$, $4w^2\kappa_B\cdot2wc_2\le0.0003133$, $4w^2\kappa_Bc_3\le0.0140$, $1/c_-\le0.6825$, $wc_+\le0.2689$, $z_0/2\le0.000504$, $h_1\le5.3966$, $k_A'/4\le0.7721$:

$$
0.6825\Bigl(0.0220+0.0003133\,X+\frac{0.0140}{J_{\min}}\Bigr)\Bigl(1+\Bigl(0.2+\frac{0.2689}{J_{\min}}\Bigr)\rho_r\Bigr)+0.005152\,\rho_r<0.999496-\frac{5.3966}{J_{\min}}-\frac{0.7721}{J_{\min}^2}.
$$

Dropping the nonnegative terms in $X$ and $1/J_{\min}$ leaves the lower envelope $0.015015+0.008155\,\rho_r$ of the left side; it exceeds the right side, which is below one, once $\rho_r\ge121$ (at $\rho_r=121$ it is exactly $1.00177$). So this test cannot hold for $\rho_r\ge121$, where the radial-period note's test cannot hold for $\rho_r\ge62$. The envelope says nothing about where the test does hold below $121$: whether it holds for a given solution depends on $X$ and $J_{\min}$ as well. These are statements about the two tests as written, not boundaries for solutions or bounds on their radial travel. The present test has smaller leading and variation coefficients, roughly half of the earlier ones, and a larger allowance at small $J_{\min}$; neither dominates, and a solution is excluded if either test holds.

**Corollary W.6 (constant separation, extended; derived, numbers by hand).** At $w=\tfrac1{10}$ there is no rigidly repeating solution in the speed class whose separation is constant with $r\le2\times10^7$.

*Proof.* For $r\le10^6$ this is the accepted Corollary G.7. For $10^6\le r\le2\times10^7$: constant separation gives $\rho_r=0$ and $J^2=r^3A_r\ge c_-r$ at every instant, so $J_{\min}\ge\sqrt{c_-r}\ge\sqrt{1.4653\times10^6}\ge1210.4$ and $X\le\sqrt{r/c_-}\le\sqrt{2\times10^7/1.4653}\le3694.5$. The left side of the test is at most $0.6825\,(0.0220+0.0003133\times3694.5+0.0140/1210.4)\le0.6825\times1.1796\le0.8051$, and the right side is at least $0.999496-5.3966/1210.4-0.7721/1210.4^2\ge0.9950$. $\qquad\blacksquare$

This subclass is a restriction added for the corollary, not a consequence of the law; it contains pairs whose axis turns at a varying rate and whose centre moves.

## 5. Where the gain has to come from

**Corollary W.7 (derived).** For a rigidly repeating solution in the speed class with $J\ge J_{\min}>0$, put $\lambda_\Lambda=(w^2c_1+k_1+t_1)\,\mathcal N/\Theta$. Then

$$
\tilde B\ \ge\ (1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda)\,\Theta,\qquad
B_S\ \le\ -(1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda)\,\Theta+\frac{k_A}4\,\mathcal N+\frac{k_A'}4\,\frac\Theta{J_{\min}^2}.
$$

Write $H=1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda$ for the margin and $E_I=(k_A/4)\,\mathcal N/\Theta+k_A'/(4J_{\min}^2)$ for the isotropic fraction, so that $\tilde B\ge H\Theta$ and $B_S\le(-H+E_I)\Theta$. When $H>0$ the anisotropic breathing $\tilde B$ is positive and at least $H\Theta$. The upper bound makes $B_S$ negative only when $H>E_I$. The two integrals are close in size only to within $E_I\Theta$, and $\tilde B$ carries nearly the whole gain only when $1-H$ is small, that is when the error fraction $\eta_\Lambda+\eta_\Lambda'$ and the loss fraction $\lambda_\Lambda$ are both small. When $H\le0$ nothing is said about the sign of $\tilde B$, and when $H\le E_I$ nothing about the sign of $B_S$.

*Proof.* Proposition W.4 and Theorem W.3 give $\tilde B\ge\Theta(1-\eta_\Lambda)-t_1\mathcal N-\Lambda_0-\lvert\Lambda_1\rvert$; then Lemmas W.1 and W.2. $\qquad\blacksquare$

$\lambda_\Lambda\le(w^2c_1+k_1+t_1)\,[1+(2w+wc_+/J_{\min})\rho_r]/c_-$, which at $w=\tfrac1{10}$ is at most $0.01028\,[1+(0.2+0.2689/J_{\min})\rho_r]$. So when the radial travel is moderate and $J_{\min}$ is large, $\eta_\Lambda+\eta_\Lambda'$ and $\lambda_\Lambda$ are small, and a repeating solution needs $\tilde B=\oint H'\,d(r/J)$, with $H'=\tfrac18Q-D_\Phi$ and $D_\Phi$ of fourth order, at least $H\Theta$ with $H$ close to one. The weight $Q=P_\parallel^2-P_\perp^2$ has no sign and averages to zero when the common velocity is fixed while the axis turns, so a positive $\tilde B$ of that size is a definite correlation: $r/J$ must on balance increase while the common velocity lies along the axis and decrease while it lies across it, with $\oint Q\,d(r/J)$ at least about $8H\Theta$, up to the fourth-order $D_\Phi$ term.

## 6. A formal comparison: how the anisotropic breathing could carry the gain

*Status.* This section is a formal calculation in a prescribed auxiliary model. It is not a solution of the Master Equation, it has no error bound, and it excludes and admits nothing. It shows that the scalar requirement of Corollary W.7 is not algebraically contradictory, and so suggests where a proof might look.

*The model.* (i) The relative motion is an ellipse under the inward relative acceleration $2/r^2$ (the leading value of $A_r$), with constant $J$: $r=\tfrac12J^2/(1+e\cos f)$, $f=\vartheta-\varpi$, so $x=r/J=\tfrac12J/(1+e\cos f)$ and $r/J^2=1/(2(1+e\cos f))$. (ii) The velocity sum $\mathbf P$ is constant in direction and size, at the angle $\alpha$ from a fixed direction; put $\beta=\alpha-\varpi$ and $\psi=\beta-f$, so $P_\parallel=\lvert\mathbf P\rvert\cos\psi$, $P_\perp=\lvert\mathbf P\rvert\sin\psi$, $Q=\lvert\mathbf P\rvert^2\cos2\psi$. (iii) Only leading terms are kept: $\Lambda\approx\oint\lvert\mathbf P\rvert^2dt/(4rJ)$, $\tilde B\approx\oint\tfrac18Q\,dx$, the gain $\Theta=2\pi$ per radial period, and $M_{\rm rel}$, $R$, $T_1$, $T_3$, $\Lambda_1$, $D_\Phi$ dropped. (iv) The constant $\mathbf P$ of (ii) does not obey the leading common-motion equation: by Proposition H(1), with the leading row sum $A_\parallel\approx P_\parallel/r^2$, $A_\perp\approx-P_\perp/r^2$, the velocity sum changes by a relative amount of order $1/J$ per radian and $\lvert\mathbf P\rvert^2$ by about $2\cos2\psi/J$ per radian. These changes are dropped, as are the evolution of $J$ and of the orbit that the gain and loss terms would drive. A heuristic size count suggests that the dropped changes of $\mathbf P$ alter $\tilde B$ by a relative amount of order $1/(Je)$; this is not proved, and no dropped term has a proved bound.

*The calculation.* With $1/(1+e\cos f)=(1-e^2)^{-1/2}[1+2\sum_{n\ge1}(-\lambda)^n\cos nf]$, $\lambda=(1-\sqrt{1-e^2})/e$,

$$
\Lambda\approx\frac{\lvert\mathbf P\rvert^2}4\oint\frac{r}{J^2}\,d\vartheta=\frac{\pi\lvert\mathbf P\rvert^2}{4\sqrt{1-e^2}},\qquad
\tilde B\approx\frac{\lvert\mathbf P\rvert^2}8\oint\cos(2\beta-2f)\,dx=-\frac{\pi\lvert\mathbf P\rvert^2J\lambda^2\sin2\beta}{4\sqrt{1-e^2}},
$$

because $\oint\cos2f\,dx=0$ ($x$ is even in $f$) and $\oint\sin2f\,dx=-\oint2x\cos2f\,df=-J\oint\cos2f\,df/(1+e\cos f)=-2\pi J\lambda^2/\sqrt{1-e^2}$. The leading balance $\Lambda+\tilde B=\Theta=2\pi$ reads

$$
\lvert\mathbf P\rvert^2\,\bigl(1-J\lambda^2\sin2\beta\bigr)=8\sqrt{1-e^2}.
$$

At $\beta=-\pi/4$ it is met when $J\lambda^2=8\sqrt{1-e^2}/\lvert\mathbf P\rvert^2-1$; for small $e$, $\lambda^2\approx e^2/4$, so $Je^2\approx32/\lvert\mathbf P\rvert^2$. For example, at $w=\tfrac1{10}$ with $\lvert\mathbf P\rvert=0.19$ and $e=0.3$ it asks for $J\approx8.9\times10^3$, for which the relative speed is at most $2(1+e)/J\approx2.9\times10^{-4}$, the member speeds stay below $w$, $Je\approx2.7\times10^3$ makes the heuristic $1/(Je)$ estimate small, and $J_{\min}=J$ makes $\eta_\Lambda$ about $10^{-3}$. The same configuration has $\rho_r\approx Je/(\pi(1-e^2))\approx9\times10^2$, far outside the reach of the sufficient tests above; the tests are not contradicted, they simply do not reach it.

*What this shows and what it does not.* In this prescribed model the scalar requirement of Corollary W.7 is met by an eccentric relative orbit whose apsidal line lies at $45^\circ$ to the common velocity, whatever the common speed below $w$, once $J$ is large enough. So the requirement is not algebraically contradictory. The model does not obey the leading coupled equations (its velocity sum, orbit and $J$ are frozen), and its dropped terms have no proved bound. It therefore proves no restriction on what estimates the coupled delayed equations can supply, and it does not show that a repeating solution exists. It does suggest where an argument might look. A rigidly repeating history must also return its apsidal line, its eccentricity and its velocity sum, rotated by the same $R$. In the model, $\mathbf P$ and the apsidal line are fixed, so $R$ is the identity and these conditions hold trivially. Under the law they would be secular conditions on the precession of the apsidal line, on the turning of $\mathbf P$ (by Proposition H(1), $\tfrac{d\alpha}{d\vartheta}\approx-\sin2\psi/J-\cos^2\psi/(2r)$ with the leading row sum) and on the change of $e$ over a period. Whether such conditions are needed, or whether the $J$ balance with a sharper estimate suffices, is open.

## 7. What remains

**The missing statement, reduced.** For rigidly repeating solutions in the speed class with $J\ge J_{\min}$ and $H=1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda>0$, a bound from the delayed law showing $\tilde B<H\,\Theta$ would exclude the class. Where $H\le0$ this target is empty. One candidate route, suggested by Section 6 but not shown to be necessary, is a second exact period identity paired with the $J$ balance: one that measures the same second angular harmonic of $r/J$ relative to the common velocity, for instance through the recurrence of the apsidal line relative to $\mathbf P$, with its own remainders bounded as here. It has not been derived.

Also open: an a-priori bound on the radial travel or on $X$; low and changing-sign $J$; general non-mirror periodicity.

## 8. Limits

Planar motion, opposite unit polarities, unit reduced coupling, $c_f=1$, complete twice continuously differentiable histories, positive separation, rigid repetition, $J>0$. Lemma W.1(a) is kinematic; W.1(b) needs a solution. Lemma W.2, Theorem W.3, Proposition W.4 and Corollaries W.5 to W.7 need a solution with the whole-past bound $w<\tfrac13$, through the accepted Propositions D and H, bounds (B1) to (B5), Theorem S1, Theorem B.2, Theorem B.5, Proposition Z.3, Theorem G.2 and the proof of Theorem G.4. Corollary W.6 is for constant separation and $w=\tfrac1{10}$ only. Section 6 is a formal comparison only. No sign is claimed for $\Lambda_1$, and none is transferred from a differently weighted integral. No repeating history was constructed or searched for, no solution was integrated, and no accepted file was changed.

## 9. Falsifiers

- A rigidly repeating pair, prescribed or not, with $J>0$ and $B_S+\tilde B\ne\tfrac18\oint\lvert\mathbf P\rvert^2d(r/J)$, refutes Lemma W.1(a); a solution with $\oint\lvert\mathbf P\rvert^2dx\ne-2\oint x\,(\mathbf A_1+\mathbf A_2)\cdot\mathbf P\,dt$ refutes W.1(b).
- A rigidly repeating solution in the speed class violating the bound of Lemma W.2, Theorem W.3 or Proposition W.4 refutes it, or one of the accepted bounds it uses; a prescribed path does not, since these use the rows.
- A rigidly repeating solution in the speed class satisfying the inequality of Corollary W.5, or one with constant separation $r\le2\times10^7$ at $w=\tfrac1{10}$, refutes that corollary.
- A rigidly repeating solution in the speed class with $1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda>0$ and $\tilde B<(1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda)\Theta$ refutes Corollary W.7.
- An exact evaluation showing a displayed decimal rounded in the wrong direction withdraws that decimal. A different evaluation of the two integrals of Section 6, in the stated model and to the stated order, withdraws that calculation only.

## 10. Proposed propagation (not applied)

Suggested text for the coordinator, for the periodicity queue entry: "Signed breathing (Saturday round, 2026-10-14, derived, until its review): the two breathing integrals are tied exactly, $B_S+\tilde B=\tfrac18\oint\lvert\mathbf P\rvert^2d(r/J)$, and the isotropic integral is controlled by the evolution of $\lvert\mathbf P\rvert^2$ at second order in speed (the curvature allowance included, by the separation floor). $\Lambda$ is bounded at second order: a nonnegative principal term $\Lambda_0\le w^2c_1\mathcal N$ plus a remainder that is $O(w^3)\mathcal N$ on the repeating class. Through $\Lambda+\tilde B$ the sufficient exclusion has smaller leading and variation coefficients, roughly half, and a larger allowance at small $J_{\min}$; neither test dominates. At $w=0.1$ the new displayed test cannot hold for radial travel per radian $\ge121$ (the earlier one: $\ge62$), which says nothing about coverage below; constant separation is excluded through $r=2\times10^7$. With $H=1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda$, $\tilde B\ge H\Theta$ and $B_S\le(-H+E_I)\Theta$: $H>0$ signs $\tilde B$, $H>E_I$ signs $B_S$. A prescribed comparison with frozen orbit and common velocity (not a solution) meets the scalar requirement with an eccentric orbit at $45^\circ$ to the common velocity once $Je^2\approx32/\lvert\mathbf P\rvert^2$, so the requirement is not algebraically contradictory; a second recurrence identity, such as the apsidal line relative to the common velocity, is a candidate route, not a shown prerequisite. Open: a bound on $\tilde B$ below $H\Theta$, radial travel, $X$, low and changing-sign $J$."
