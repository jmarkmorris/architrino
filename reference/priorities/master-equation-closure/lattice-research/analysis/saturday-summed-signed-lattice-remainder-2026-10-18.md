# The summed signed remainder of the localized lattice family and a later barrier (2026-10-18)

## Result

**In words.** The [forward-profile note](saturday-localized-beyond-evolved-endpoint-2026-10-14.md) continued the localized disturbance of the alternating lattice to the time $T_S(\varepsilon)$, at which its seed-size bound reaches $0.0211$. It also showed that the term limiting the estimate cancels between each source and its mirror image across the receiver, except for the seed envelope's variation and a third-order odd remainder. That remainder had no bound. This note supplies it:

- an explicit cubic bound on the odd remainder, summed over all sources;
- a bound on the two source-history-difference brackets of the exact pair decomposition;
- the assembly of both with the receiver's cubic term into one bound on the whole nonlinear remainder of the equation.

At the accepted endpoint, the assembled signed bound is about $0.40$ of the absolute-value bound used before. Starting from the accepted earlier barrier at seed size $0.012$, the same solution continues to seed size $0.0277$, a further guaranteed time of at least $0.0940$ beyond $T_S$. For the declared choices, the chart condition $d+2Kd^2\le1/16$, which keeps every member inside the region where the accepted chart facts hold, is close to saturation (slack $0.00027195$). The barrier inequality itself keeps a margin of about a quarter. No optimum, maximal reach or necessary next route is claimed.

1. **Third derivatives of the row (derived).** On the chart, every third derivative of the canonical row $\Psi(R,v)$ is bounded by an explicit constant times the appropriate inverse power of the range (Lemma L.1).
2. **The odd remainder, summed (derived).** For every receiver and every mirror pair of sources, the odd part $f_\ell(\alpha,\bar\Phi)-f_\ell(-\alpha,-\bar\Phi)$ of a row with a pure-seed source is bounded by a sum of cubic monomials, each containing a seed factor at the source. Summed over all offsets with the declared lattice sums, it gives an explicit nonnegative cubic polynomial $\mathcal O(d,y)$. The bound uses the row's third derivatives, a second-order bound on the sum of the two causal-delay shifts, and the seed's third time derivative with the accepted prefactor $\bar\Lambda_3<0.1229$ (Lemma L.2).
3. **The source-difference brackets (derived).** Each of the two brackets of the exact pair decomposition is bounded by a Lipschitz estimate with the receiver displacement held fixed. Its history difference is the envelope variation, at most $r/20$ of the seed bound, plus the actual correction at the source. The correction enters with only its accepted two derivatives (Lemma L.3).
4. **The assembled signed bound (derived; evaluated in exact arithmetic).** The nonlinear remainder is bounded by $F_{\rm sgn}(d,y)=g\,[c_{E3}A^3+\Sigma_{\rm br}+\tfrac12\mathcal O]$, a polynomial with nonnegative coefficients and no term below degree two (Theorem L.4). At the accepted endpoint on chart $1/20$, $C_LF_{\rm sgn}(0.0211,0.01424672)\le0.005663$, against $0.0142447$ for the absolute-value polynomial $F_\mu$.
5. **A later barrier for the same solution (derived; numbers by exact arithmetic).** Take chart $1/16$, start at the time when $\Delta=0.012$, where the accepted Corollary E.4 gives $y<22.5\Delta^2$, and use barrier $K=22.5$ and endpoint $d_{\rm new}=0.0277$. Then $C_LF_{\rm sgn}(d_{\rm new},Kd_{\rm new}^2)\le0.013074<0.017264025=Kd_{\rm new}^2$ and $d_{\rm new}+2Kd_{\rm new}^2=0.06222805\le1/16$. For every $0<\varepsilon\le6.46\times10^{-3}$ the continued solution therefore exists to

   $$T_N(\varepsilon)=\frac1{2.8953}\ln\frac{0.0277}{0.1144\,\varepsilon}\ \ge\ T_S(\varepsilon)+0.0940 .$$

   On the interval it satisfies $|u-\varepsilon\phi|<22.5\Delta^2$, with displacements at most $0.044965$, speeds at most $0.16773$ and one causal root per ordered pair (Theorem L.5).
6. **What is not obtained.** The particular central-member growth lower bound is empty at $T_N$ for every admitted amplitude, as it was at $T_S$ (Section 6). The solution is shown to exist and stay small, not to keep growing, and the emptiness of a sufficient lower bound is not a statement of actual nongrowth. The near-saturated chart condition belongs to the method and is not an event in the solution. No order-one evolution, ending, wake-speed arrival or growth uniform in $\varepsilon$ is established.

Claim grade: derived for Lemmas L.1–L.3, Theorem L.4 and Theorem L.5 by the hand arguments below. The numbers of items 4–5 come from a session instrument in exact rational arithmetic, which passed known cases first. The lattice sums, contour and seed constants are the declared values of the accepted notes and keep their interval-library conditionality, except two elementary majorants stated in Section 3. Nothing is measured on solutions. Falsifiers are listed in Section 8.

Everything is for the unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, the full alternating population with every member dynamical, every causal root retained, the original eight-source block summation, the contour of radius $1/10$, the accepted normalized seed class supported within $1/20$ of the staggered wavevector, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$ with its unique charted continuation. A run started at a finite time from the linear seed, a fixed exterior, a finite population or a copied coherent trajectory is a different preparation.

## 1. Setting and notation

The notation is that of the [preparation](saturday-localized-nonlinear-preparation-2026-10-10.md), [forward-evolution](saturday-localized-forward-evolution-2026-10-11.md), [quantification](saturday-localized-forward-quantification-2026-10-11.md), [extension](saturday-localized-forward-extension-2026-10-12.md), [evolved-history](saturday-localized-evolved-history-continuation-2026-10-12.md) and forward-profile notes. The row is $g\sigma_\ell\Psi(R,v)$ with $\Psi(R,v)=R/(|R|^2(|R|-R\cdot v))$. Here $R$ is the vector from the emission point to the receiver and $v$ the source velocity at emission; the transmitter factor $1-\hat R\cdot v$ is evaluated at the emission. With $c_f=1$ and unit reduced coupling this is the canonical per-hit row.

The remainder of the equation is

$$
\mathcal N_i=g\,E(u_i)+g\sum_{\ell\ne0}\sigma_\ell f_\ell\bigl(u_i(T),u_{i-\ell}\bigr),
$$

with $f_\ell$ as in the forward-profile Lemma S.3. Here $E$ is the resting-lattice field remainder at the displaced receiver, computed with the original eight-source blocks. Write:

- $a\in(2.6952,2.6953)$, $\bar a=2.6953$, $\lambda_+=a+0.2<2.8953$;
- $X=e^{aT}$ for a reception time $T\le0$ in the translated frame;
- $\mathsf s=\eta e^{-ar}$, $\eta=e^{2\bar a\rho}$, $\mathsf s_1=\eta e^{-a}$, $\kappa=1-2\rho$ and $\varpi=\bar a\rho$, as in Lemma E.2;
- $\mu=e^{-0.2(1-2\rho)}$, the forward factor of Lemma S.1, declared from above.

For a seed bound $d$ and a correction bound $y$ put $A=d+y$, the receiver factor, and $q=\mu d$, the seed factor at a source.

**Inputs.** All of the following are accepted:

- Lemma E.1, $y(t)\le C_L\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}$;
- the chart facts of the forward note for radius $\rho\le1/16$: one root, range at least $\kappa r$, delay within $2\rho$ of $r$;
- Lemma Q1 (second-derivative constants $c_{20},c_{11},c_{02}$) and Lemma Q2 ($|E(\alpha)|\le c_{E3}|\alpha|^3$);
- the derivative bounds $|\partial_R\Psi(\ell,0)|=2/r^3$ (written $T_\ell$) and $|\partial_v\Psi(\ell,0)|=1/r^2$ (written $B_\ell$);
- Lemma S.1, Lemma S.3 and Proposition S.4;
- Corollary E.4.

For seed derivatives: Lemma S.3(ii) states that $M_n$, the $L^1$ norm of the time-differentiated seed transform, obeys the accepted seed bound of Proposition Q6(3), with constant $\bar\Lambda_0$ for $n\le2$ and $\bar\Lambda_3\le\bar\Lambda_0\lambda_+/a$ for $n=3$. Lemma S.1's argument uses only that bound, so at a source time $T'\le-(1-2\rho)$

$$
|D_\ell^{(n)}|\le\tfrac r{20}\,a^n\mu\,d\,e^{aT'}\ (n\le2),\qquad
|\bar\Phi^{(n)}|\le a^n\mu\,d\,e^{aT'}\ (n\le2),\qquad
|\bar\Phi^{(3)}|\le1.0743\,a^3\mu\,d\,e^{aT'} .
$$

The actual correction at a source obeys $|c^{(n)}|\le(2a)^ny\,e^{2aT'}$ for $n\le2$ only. No third derivative of the correction is used anywhere.

## 2. Third derivatives of the row

**Lemma L.1 (derived).** For $R\ne0$ and $|v|\le\varpi<1$ write $\rho=|R|$, $D=1-\hat R\cdot v\ge1-\varpi$ and $\mathsf m=|\hat R-v|/D\le(1-\varpi^2)^{-1/2}$. As trilinear maps with Euclidean norms,

$$
|\partial_v^3\Psi|\le\frac{c_{03}}{\rho^2},\quad|\partial_R\partial_v^2\Psi|\le\frac{c_{12}}{\rho^3},\quad|\partial_R^2\partial_v\Psi|\le\frac{c_{21}}{\rho^4},\quad|\partial_R^3\Psi|\le\frac{c_{30}}{\rho^5},
$$

$$
c_{03}=\frac6{D^4},\quad c_{12}=\frac{6+6\mathsf m}{D^3},\quad c_{21}=\frac{4+8\mathsf m+6\mathsf m^2}{D^2}+\frac2{D^3},\quad
c_{30}=\frac{6+6\mathsf m+6\mathsf m^2+6\mathsf m^3}{D}+\frac{3+1.1548+6\mathsf m}{D^2}.
$$

*Proof.* Write $\Psi=G_2B$ with $G_2(R)=R/\rho^2=\nabla\log\rho$ and $B=1/h$, $h=\rho-R\cdot v=\rho D$.

*$G_2$.* As in Lemma Q1, $|G_2|=1/\rho$, $|\partial G_2|=1/\rho^2$ and $|\partial^2G_2|\le2/\rho^3$. The form $\langle e,\partial^3G_2[h,k,l]\rangle$ is the symmetric fourth derivative of $\log\rho$. The norm of a symmetric form on a Euclidean space is attained on a repeated vector. Along a line, $\log|x+th|=\operatorname{Re}\log(t-z_0)$ with $|z_0|=\rho$, whose fourth $t$-derivative at $0$ has modulus $6/\rho^4$. So $|\partial^3G_2|=6/\rho^4$.

*$h$.* The derivatives are:

- $\partial_Rh[e]=(\hat R-v)\cdot e$, of size at most $\mathsf mD$;
- $\partial_vh[k]=-R\cdot k$, of size at most $\rho$;
- $\partial_R^2h=(I-\hat R\hat R^{\mathsf T})/\rho$, of norm $1/\rho$;
- $\partial_R\partial_vh[e,k]=-e\cdot k$, $\partial_v^2h=0$ and $\partial_v\partial_R^2h=0$;
- $\partial_R^3h=\partial^3\rho$.

On a line through a point at unit distance, $\partial^3\rho$ is $-3s^2c/((t+c)^2+s^2)^{5/2}$ at $t=0$, with $c^2+s^2=1$. Its largest modulus is $2/\sqrt3\le1.1548$. So $|\partial^3\rho|\le1.1548/\rho^2$.

*$B$.* Use $\partial^3(1/h)=-h'''/h^2+2\sum_3h''h'/h^3-6h'h'h'/h^4$ and its lower-order analogues, inserting the bounds above with mixed directions:

- $|\partial_vB|\le1/(\rho D^2)$ and $|\partial_v^2B|=2/(\rho D^3)$;
- $|\partial_R\partial_vB|\le(1+2\mathsf m)/(\rho^2D^2)$;
- $|\partial_R^2\partial_vB|\le[2/D^3+4\mathsf m/D^2+6\mathsf m^2/D^2]/\rho^3$;
- $|\partial_R\partial_v^2B|\le(4+6\mathsf m)/(\rho^2D^3)$ and $|\partial_v^3B|=6/(\rho D^4)$;
- $|\partial_RB|\le\mathsf m/(\rho^2D)$ and $|\partial_R^2B|\le[1/D^2+2\mathsf m^2/D]/\rho^3$, as in Lemma Q1;
- $|\partial_R^3B|\le[1.1548/D^2+6\mathsf m/D^2+6\mathsf m^3/D]/\rho^4$.

*Assembly* by Leibniz' rule for the product of the $v$-independent $G_2$ with $B$:

- $\partial_v^3\Psi=G_2\partial_v^3B$;
- $\partial_R\partial_v^2\Psi=\partial G_2\,\partial_v^2B+G_2\,\partial_R\partial_v^2B$;
- $\partial_R^2\partial_v\Psi=\partial^2G_2\,\partial_vB+2\,\partial G_2\,\partial_R\partial_vB+G_2\,\partial_R^2\partial_vB$;
- $\partial_R^3\Psi=\partial^3G_2\,B+3\,\partial^2G_2\,\partial_RB+3\,\partial G_2\,\partial_R^2B+G_2\,\partial_R^3B$.

Inserting the bounds gives the four constants. $\blacksquare$

At rest the bound on $|\partial_R^3\Psi|$ is $34.1548/\rho^5$, against the exact $24/\rho^5$ of $-\nabla^4(1/\rho)$. The constants increase in $\mathsf m$ and in $1/D$, so the chart values are obtained from $D\ge1-\varpi$ and the accepted upper bound for $\mathsf m$. On chart $1/16$ they are at most $c_{30}=44.3076$, $c_{21}=29.9313$, $c_{12}=21.0215$ and $c_{03}=12.5491$.

## 3. The odd remainder, summed over the sources

Fix a receiver $i$, a reception time $T\le0$ and a mirror pair $\{\ell,-\ell\}$, $r=|\ell|$. Let $\alpha=u_i(T)$ and let $\bar\Phi$ be the pair's pure-seed average of the forward-profile Proposition S.4. Let $P$, $V$, $W$ and $U$ be the suprema of $|\bar\Phi|$, $|\bar\Phi'|$, $|\bar\Phi''|$ and $|\bar\Phi'''|$ over the source window, the times within $2\rho$ of $T-r$, and put $m=|\alpha|+P$.

**Lemma L.2 (derived).** On the chart $\rho\le1/16$,

$$
\begin{aligned}
\bigl|f_\ell(\alpha,\bar\Phi)-f_\ell(-\alpha,-\bar\Phi)\bigr|\le{}&\frac{c_{30}m^2P}{(\kappa r)^5}+\frac{c_{21}(m^2V+2mVP)}{(\kappa r)^4}+\frac{c_{12}(2mV^2+V^2P)}{(\kappa r)^3}+\frac{c_{03}V^3}{(\kappa r)^2}\\
&+\Bigl[\frac{c_{20}m}{(\kappa r)^4}+\frac{c_{11}V}{(\kappa r)^3}\Bigr]2Vm+\Bigl[\frac{c_{11}m}{(\kappa r)^3}+\frac{c_{02}V}{(\kappa r)^2}\Bigr]2Wm\\
&+\frac2{r^3}\Bigl[V\Bigl(\frac{m^2}{\kappa r}+2Vm\Bigr)+Wm^2\Bigr]+\frac1{r^2}\Bigl[W\Bigl(\frac{m^2}{\kappa r}+2Vm\Bigr)+Um^2\Bigr].
\end{aligned}
$$

*Proof.* Let $\tau_\pm$ be the causal delays of the configurations $(\alpha,\bar\Phi)$ and $(-\alpha,-\bar\Phi)$, $s_\pm=T-\tau_\pm$ and $\delta_\pm=\tau_\pm-r$. Both configurations lie in the chart, so each has exactly one root. Write $f_\ell(\beta,Y)=\mathcal F(\beta,p,v)+T_\ell[Y(s)-Y(T-r)]+B_\ell[Y'(s)-Y'(T-r)]$ with $(p,v)=(Y(s),Y'(s))$ and $\mathcal F(\beta,p,v)=\Psi(\ell+\beta-p,v)-\Psi(\ell+\beta,0)-T_\ell p-B_\ell v$. Put $z_+=(\alpha,\bar\Phi(s_+),\bar\Phi'(s_+))$; the second configuration samples $(-\alpha,-\bar\Phi(s_-),-\bar\Phi'(s_-))$.

*The odd core.* Let $G(x,v)=\Psi(\ell+x,v)$ and $\mathcal R_3(\zeta)=G(\zeta)-G(-\zeta)-2\nabla G(0)\zeta$. Since $\nabla G(0)\cdot(x,v)=-T_\ell x+B_\ell v$, direct substitution gives $\mathcal F(z)-\mathcal F(-z)=\mathcal R_3(\alpha-p,v)-\mathcal R_3(\alpha,0)$; every linear term cancels. Now $\nabla\mathcal R_3(\zeta)=\nabla G(\zeta)+\nabla G(-\zeta)-2\nabla G(0)$ is an even second difference, so $|\nabla\mathcal R_3(\zeta)[h]|\le\sup_{|t|\le1}|\nabla^3G(t\zeta)[\zeta,\zeta,h]|$, since $\int_{-1}^1(1-|t|)dt=1$. Integrate along $\zeta_\theta=(\alpha-\theta p,\theta v)$, $h=(-p,v)$. Expanding the trilinear form by Lemma L.1, with $|x_\theta|\le m$, $|v_\theta|\le V$ and every range at least $\kappa r$, gives the first line.

*The sample shift.* The two configurations sample at different times: $|\bar\Phi(s_-)-\bar\Phi(s_+)|\le V|\tau_+-\tau_-|\le2Vm$ and $|\bar\Phi'(s_-)-\bar\Phi'(s_+)|\le2Wm$, since $|\delta_\pm|\le m$. So $\mathcal F(-z_+)$ and the second configuration's $\mathcal F$ differ by at most the partial-derivative bounds of the quantification note's Proposition Q4 times these shifts. That is the second line.

*The delay brackets.* Their odd combination is $T_\ell[\bar\Phi(s_+)+\bar\Phi(s_-)-2\bar\Phi(T-r)]$ plus the same with $B_\ell$ and one more derivative: a second difference in time. Taylor's formula gives

$$
\bar\Phi(s_+)+\bar\Phi(s_-)-2\bar\Phi(T-r)=-\bar\Phi'(T-r)(\delta_++\delta_-)+\mathcal E,\qquad|\mathcal E|\le\tfrac12W(\delta_+^2+\delta_-^2)\le Wm^2 .
$$

With $z_\pm=\alpha-\bar\Phi(s_\pm)$, $\delta_++\delta_-=[|\ell+z_+|+|\ell-z_+|-2r]+[|\ell-z_-|-|\ell-z_+|]$. The first bracket lies in $[0,|z_+|^2/(\kappa r)]$, since the Hessian of $|x|$ has norm $1/|x|$. The second is at most $|z_+-z_-|\le2Vm$. So $|\delta_++\delta_-|\le m^2/(\kappa r)+2Vm$: the two delay shifts cancel to first order. The $B_\ell$ bracket is the same with $V,W$ replaced by $W,U$; this is where the seed's third derivative enters. With $|T_\ell|=2/r^3$ and $|B_\ell|=1/r^2$ this is the third line. $\blacksquare$

**Summation.** Insert $|\alpha|\le XA$, $P\le Xq\mathsf s$, $V\le\bar aXq\mathsf s$, $W\le\bar a^2Xq\mathsf s$ and $U\le1.0743\,\bar a^3Xq\mathsf s$. Every term is cubic and contains at least one factor $q\mathsf s$. Divide by $X^2$ and use $X\le1$. Expanding $m=A+q\mathsf s$ gives monomials $A^2q\,\mathsf s$, $Aq^2\mathsf s^2$ and $q^3\mathsf s^3$, each over a power of $r$ from $1/r^2$ to $1/r^5$. Sum over all $\ell\ne0$ with

$$
\sum\frac{\mathsf s}{r^k}=\eta S_k(a),\qquad\sum\frac{\mathsf s^2}{r^k}=\eta^2S_k(2a),\qquad\sum\frac{\mathsf s^j}{r^k}\le\mathsf s_1^{\,j-2}\eta^2S_k(2a)\ (j\ge3),
$$

the declared sums for $k=2,3,4$. Two elementary majorants are added: $S_5\le S_4$ at either rate, since $r\ge1$; and $S_1(2a)\le e^{-a}S_1(a)$ with the accepted $S_1(a)\le0.69831$, since $e^{-ar}\le e^{-a}$. The result is

$$
\sum_{\ell\ne0}\sup\bigl|f_\ell(\alpha,\bar\Phi)-f_\ell(-\alpha,-\bar\Phi)\bigr|\big/X^2\le\mathcal O(A,q)=o_{21}A^2q+o_{12}Aq^2+o_{03}q^3,
$$

with nonnegative coefficients given by the closed forms above. On chart $1/16$ these are about $o_{21}\approx315.2$, $o_{12}\approx113.8$ and $o_{03}\approx11.4$; the decisive comparisons below are exact. As a polynomial in $(d,y)$, every monomial of $\mathcal O(d+y,\mu d)$ contains $d$. On chart $1/16$ the largest contributions to $o_{21}$ are the row's third-derivative terms ($c_{21}$ and $c_{30}$, about $152$ together) and the sample-shift terms ($c_{20}$ and $c_{11}$, about $125$). The delay brackets contribute about $38$, of which the seed's third time derivative, with prefactor $1.0743\,\bar a^3$, contributes about $17$. Each pair is counted twice in $\sum_{\ell\ne0}$, so a pair's odd part contributes $\tfrac12\mathcal O$ in the assembly.

## 4. The source-difference brackets

The first two brackets of Proposition S.4 have the form $f_\ell(\beta,Y_1)-f_\ell(\beta,Y_2)$, with $\beta=\pm\alpha$ fixed and $Y_2=\pm\bar\Phi$. The difference $\Delta Y=Y_1-Y_2$ is $\pm D_\ell+c_{i\mp\ell}$, the envelope variation plus the actual correction at the source.

**Lemma L.3 (derived).** Let $P_k$ and $V_k$ bound $|Y_k|$ and $|Y_k'|$ on the source window, $W_2$ bound $|Y_2''|$, and $\delta_p,\delta_v,\delta_w$ bound $|\Delta Y|,|\Delta Y'|,|\Delta Y''|$ there. Put $\bar P=\frac12(P_1+P_2)$, $\bar V=\frac12(V_1+V_2)$ and $\vartheta_0=1/(1-\varpi)$. Then

$$
\begin{aligned}
|f_\ell(\beta,Y_1)-f_\ell(\beta,Y_2)|\le{}&\Bigl[\frac{c_{20}(|\beta|+\bar P)}{(\kappa r)^4}+\frac{c_{11}\bar V}{(\kappa r)^3}\Bigr]\delta_p(1+V_2\vartheta_0)
+\Bigl[\frac{c_{11}(|\beta|+\bar P)}{(\kappa r)^3}+\frac{c_{02}\bar V}{(\kappa r)^2}\Bigr](\delta_v+W_2\vartheta_0\delta_p)\\
&+\frac2{r^3}\bigl[(|\beta|+P_1)\delta_v+V_2\vartheta_0\delta_p\bigr]+\frac1{r^2}\bigl[(|\beta|+P_1)\delta_w+W_2\vartheta_0\delta_p\bigr].
\end{aligned}
$$

*Proof.* From the root equations and the speed bound, $|\tau_1-\tau_2|\le\vartheta_0\delta_p$. So the sampled values differ by $|\Delta p|\le\delta_p(1+V_2\vartheta_0)$ and $|\Delta v|\le\delta_v+W_2\vartheta_0\delta_p$. With the receiver fixed, $\mathcal F$ changes along the segment between the two samples. On that segment the mean source displacement is at most $\bar P$ and the mean source velocity at most $\bar V$. The quantification note's partial-derivative bounds for $\partial_p\mathcal F$ and $\partial_v\mathcal F$ then give the first line. The delay brackets differ by $T_\ell[\Delta Y(s_1)-\Delta Y(T-r)]+T_\ell[Y_2(s_1)-Y_2(s_2)]$ and the same with $B_\ell$ and one more derivative. With $|\tau_1-r|\le|\beta|+P_1$ this is the second line. $\blacksquare$

**Summation.** Insert $|\beta|\le XA$, together with:

- $P_1\le X(q\mathsf s+y\mathsf s^2)$ and $P_2\le Xq\mathsf s$, so $\bar P\le X(q\mathsf s+\frac12y\mathsf s^2)$;
- $\bar V\le\bar aX(q\mathsf s+y\mathsf s^2)$, $V_2\le\bar aXq\mathsf s$ and $W_2\le\bar a^2Xq\mathsf s$;
- $\delta_p\le X[\tfrac r{20}q\mathsf s+y\mathsf s^2]$, $\delta_v\le X[\bar a\tfrac r{20}q\mathsf s+2\bar ay\mathsf s^2]$ and $\delta_w\le X[\bar a^2\tfrac r{20}q\mathsf s+4\bar a^2y\mathsf s^2]$.

The actual source $Y_1$ is seed plus correction, with the seed at the source bounded by $\mu d$. Each term is quadratic or cubic and contains a source factor. Divide by $X^2$ and sum over $\ell\ne0$ as in Section 3; the factor $r/20$ lowers the power of $r$ by one. Each pair has two brackets of this form with the same $r$, so the two brackets of all pairs together are bounded by $\Sigma_{\rm br}(A,q,y)$, the sum over all offsets of one bracket bound.

On chart $1/16$ the largest coefficients of $\Sigma_{\rm br}$ are about $5.27$ for $Ay$ (receiver times correction at the source), $1.86$ for $Aq$ (receiver times envelope variation) and $1.08$ for $qy$; the others are below $0.6$. The $Ay$ coefficient is exactly the corresponding coefficient of Lemma E.2, $\eta^2[c_{20}\kappa^{-4}S_4(2a)+2(\bar ac_{11}\kappa^{-3}+2\bar a)S_3(2a)+4\bar a^2S_2(2a)]$; pairing does not reduce it. Multiplied by $C_Lg$, the $Aq$ coefficient is about $1.17$ on chart $1/16$. This is the forward-profile orientation figure (about $0.98$ without $\mu$ on chart $1/20$) made a bound, with every Lipschitz factor included. It is an order of magnitude below the unpaired receiver–source coefficient, about $17.4$ on chart $1/20$.

## 5. The assembled bound

**Theorem L.4 (derived).** Let $0<\rho\le1/16$ and let $\psi$, $v$ satisfy the hypotheses of Lemma E.2 with $d+2y\le\rho$. In addition, at every source time $T'\le-(1-2\rho)$, assume the forward-profile seed bounds of Section 1 hold, including the envelope variation and the third derivative of the pair averages. Then

$$
\lVert\mathcal N[\psi+v]\rVert_{0,2a}\le F_{\rm sgn}(d,y)=g\Bigl[c_{E3}A^3+\Sigma_{\rm br}(A,\mu d,y)+\tfrac12\mathcal O(A,\mu d)\Bigr],\qquad A=d+y .
$$

$F_{\rm sgn}$ is a polynomial in $(d,y)$ with nonnegative coefficients and no monomial of degree below two.

*Proof.* By Proposition S.4, each pair's contribution to $\mathcal N_i/g$ is $\sigma_\ell$ times two source-difference brackets plus the odd part. The row remainders summed over the sources are absolutely convergent, since each is bounded by a summable majorant. So grouping the sources into mirror pairs is a rearrangement of an absolutely convergent series. The receiver term $E(u_i)$ keeps its own eight-source block evaluation, unchanged. Bound the receiver term by Lemma Q2, each bracket by Lemma L.3 and each odd part by Lemma L.2, then sum as in Sections 3–4. Every term has total degree at least two in $(d,y)$, with nonnegative coefficient. $\blacksquare$

$F_{\rm sgn}$ covers every term of the remainder:

- both source-history-difference brackets, with the envelope variation and the actual correction at the source;
- every receiver–source and source–source product, with correction-source products unpaired;
- the odd remainder of the pure-seed part;
- the separately bounded receiver cubic $E$.

The correction enters only through its accepted two derivatives.

**Comparison at the accepted endpoint.** On chart $1/20$ with $\mu\le0.83528$, the exact evaluation gives $C_LF_{\rm sgn}(0.0211,0.01424672)\le0.0056628$, against the accepted $C_LF_\mu=0.0142447\ldots$. The three parts are $C_Lg\Sigma_{\rm br}\approx0.00214$, $C_Lg\tfrac12\mathcal O\approx0.00204$ and $C_Lgc_{E3}A^3\approx0.00149$ (float breakdown, orientation only). The receiver cubic, untouched by pairing, is now comparable to the other two.

## 6. A later barrier

**Theorem L.5 (derived, relying on the accepted notes).** Let $\rho=1/16$, so that:

- $\varpi=0.16845625$, $\kappa=0.875$, $\eta\le1.40062$, $\mathsf s_1\le0.09459$ and $\mu\le0.83946$;
- $c_{20}\le8.7669$, $c_{11}\le4.3806$, $c_{02}\le3.4784$ and $c_{E3}\le57.346$;
- the constants of Lemma L.1 are those given in Section 2.

Let $\delta_s=0.012$, $K=22.5$, $d_{\rm new}=0.0277$ and $y_{\rm new}=Kd_{\rm new}^2=0.017264025$. In exact arithmetic on these declared values:

- (a) $d_{\rm new}+2y_{\rm new}=0.06222805\le\rho$;
- (b) $C_LF_{\rm sgn}(d_{\rm new},y_{\rm new})\le0.0130739<y_{\rm new}$;
- (c) $\delta_s+2K\delta_s^2=0.01848\le\rho$;
- (d) the start time $t_s(\varepsilon)$, at which $\Delta=\delta_s$, satisfies $t_s(\varepsilon)\ge t_s(6.46\times10^{-3})\ge0.9627>1-2\rho=0.875$.

Consequently, for every $0<\varepsilon\le6.46\times10^{-3}$, with $T_N(\varepsilon)=\ln(d_{\rm new}/(\bar\Lambda_0\varepsilon))/2.8953\ge T_S(\varepsilon)+0.0940$:

1. the unique charted continuation of $u^\varepsilon$ exists on $(-\infty,T_N]$; it is the same solution, with the same past;
2. for $t_s\le T\le T_N$ and every member, $|u_j(T)-\varepsilon\phi_j(T)|<22.5\,\Delta(T)^2$, and the first two derivatives of the difference are below $2a$ and $(2a)^2$ times that;
3. on $(-\infty,T_N]$:
   - displacements are at most $0.044965$, speeds at most $0.16773$ and accelerations at most $0.70290$;
   - transmitter factors are at least $0.83227$, separations at least $0.910071$, and each delay is within $0.089929$ of the anchor distance;
   - each ordered pair of distinct members has exactly one causal root at every reception time, and no member has a root on its own path;
4. the disturbance keeps finite spatially weighted size up to $T_N$ (forward note, Proposition 4; qualitative).

*Proof.* This is the argument of Theorem E.3, started at $t_s$.

- *Start.* The barrier quantity is the full translated history norm $y(t)=\lVert\tilde v^t\rVert_{2a}$. The proof of the accepted Corollary E.4 bounds this norm, and its printed pointwise item is a consequence. It gives $y(t)<22.5\Delta(t)^2$ whenever $\Delta(t)\le0.012$, in particular at $t_s$. By (c) the chart condition holds there.
- *Through the accepted interval.* The solution already exists through $T_S$, and the argument below runs on that same solution from $t_s$. Passing through the accepted interval, it improves the bound at $T_S$ to $y(T_S)<22.5(0.0211)^2=0.010017225<32(0.0211)^2$, and then continues the solution beyond $T_S$ without replacing any part of its past.
- *Validity of the forward factor.* By (d), Lemma S.1 applies at every $t\ge t_s$ on chart $1/16$.
- *The inequality along the solution.* At a time $t\ge t_s$ up to which the solution exists with $\Delta(t)+2y(t)\le\rho$, Lemma E.1 and Theorem L.4 give $y(t)\le C_LF_{\rm sgn}(\Delta(t),y(t))$. Lemma E.1's pointwise chart holds because $\rho\le1/16$ and $\bar a\rho\le3/16$.
- *Scaling.* $F_{\rm sgn}(d,Kd^2)/d^2$ is nondecreasing in $d$, so (b) gives $C_LF_{\rm sgn}(d,Kd^2)<Kd^2$ for every $0<d\le d_{\rm new}$.
- *Barrier.* The first-crossing argument of Theorem E.3, with continuity of $y$ (Lemma E.1) and the forward note's maximal continuation, shows that $y(t)<K\Delta(t)^2$ persists to $T_N$ and that $T_{\max}>T_N$. No fixed point is constructed.
- *Items.* As in Theorem E.3:
  - displacement at most $d_{\rm new}+y_{\rm new}$;
  - speed at most $\bar a(d_{\rm new}+2y_{\rm new})\le0.167724$;
  - acceleration at most $\bar a^2(d_{\rm new}+4y_{\rm new})\le0.702899$;
  - the chart facts with radius $d_{\rm new}+y_{\rm new}$.

  Before $t_s$ the accepted smaller bounds hold.
- *Gain.* $\ln(0.0277/0.0211)/2.8953\ge0.0940$, by interval logarithm. $\blacksquare$

The same instrument also verifies three alternative declared starts on chart $1/16$, each limited by the chart condition (a):

- from the accepted $T_S$ barrier ($K=32$) to $d=0.0243$;
- from $T_E$ ($K=28$) to $d=0.0256$;
- from Corollary E.4 at $\Delta=0.015$ ($K=24.5$) to $d=0.0269$.

In each, (b) holds with a margin of at least $0.0049$. The declared start at $0.012$ gives the largest of the four.

**Growth.** At $T_N$ the particular central-member lower bound is $\varepsilon p_0e^{aT_N}-K d_{\rm new}^2$, with $e^{aT_N}=R^{\beta}$, $R=d_{\rm new}/(\bar\Lambda_0\varepsilon)$ and $\beta=a/2.8953<1$. It is empty for every admitted amplitude. Indeed $\varepsilon R^\beta=\varepsilon^{1-\beta}(d_{\rm new}/\bar\Lambda_0)^\beta$ increases with $\varepsilon$, so its largest value is at $\varepsilon_{\max}=0.00646$. There $\ln R<3.625$ and $\beta<0.931$, so $\varepsilon p_0R^\beta<0.00646\times0.0763\times e^{3.4}<0.014770<0.017264025=Kd_{\rm new}^2$. This argument follows the uniform one in the forward-profile review and the present review. The more conservative display with $\theta=0.9308$ in place of $\beta$ is smaller still, and the instrument's table at $\varepsilon=10^{-3},\dots,10^{-6}$ agrees. A sufficient lower bound that is empty proves no actual nongrowth; the result gives existence and upper bounds only.

**Where the declared estimate stands.** For the declared choices, condition (b) has a margin of about $24$ percent at $d_{\rm new}$, while (a) is close to saturation, with slack $0.00027195$. At $d_{\rm new}$ the three parts of $C_LF_{\rm sgn}$, evaluated by the independent review's reference, are about $0.0055700$ for half the odd sum, $0.0042284$ for the brackets and $0.0032755$ for the receiver cubic; the half-odd part is the largest. Two routes to a later barrier are possible: a smaller proved coefficient K at a start where the forward factor is valid, or chart facts and Lemma E.1 for a radius above $1/16$. The second would mean re-deriving the one-root, range, delay and speed facts there. A signed treatment of the unpaired receiver cubic is another candidate. None of these is shown to be necessary, no optimum or maximal reach of the method is established, and none is a statement about the solution.

## 7. Instrument, evidence and the reference boundary

[`signed_barrier.py`](../evidence/saturday-summed-signed-lattice-remainder-2026-10-18/signed_barrier.py), described in the [evidence README](../evidence/saturday-summed-signed-lattice-remainder-2026-10-18/README.md), builds the per-offset bounds of Lemmas L.2 and L.3 as exact polynomials. It sums them with the declared lattice sums and the two majorants of Section 3, then evaluates the barrier conditions in exact rational arithmetic. It imports the frozen evolved-history instrument, unchanged, for chart parameters, declared constants and the accepted polynomial, and through it the frozen extension instrument for row constants, rounding and the interval exponential and logarithm.

Before any target it passes the following known cases:

- a hand expansion of $(A+q\mathsf s)^2q\mathsf s$;
- the hand values of Lemma L.1's constants at rest, and $1.1548\ge2/\sqrt3$;
- the rest bound $c_{30}\ge24$;
- the accepted chart-$1/20$ row constants and $\mu$;
- the accepted barrier value of the frozen polynomial on chart $1/25$;
- a sampled finite-difference check that $|\partial_R^3\Psi|$ stays below the $c_{30}$ bound at 300 random arguments (largest ratio $0.661$). This is a sampled check, not a proof.

Version 1 ran the polynomial, the chart-$1/20$ comparison and three chart scans. Version 2 added the declared starts, gains and growth table without changing any version-1 function. Both runs passed every known case at the first attempt. The first source is retained in `history/`.

What the instrument establishes: exact evaluation of the stated closed forms from declared inputs. It does not establish the lemmas, which are hand derivations, nor the declared lattice sums, which rest on the accepted interval enclosures. Its comparison values are hand values, exact arithmetic and accepted same-author regression values; none is an independent reference. Nothing is computed on a history.

## 8. Falsifiers

- Lemma L.1: an argument with $|v|\le\varpi$ at which a third derivative of $\Psi$ exceeds its stated bound.
- Lemma L.2: a receiver displacement, pure-seed source path of the class and offset for which the odd part exceeds the displayed bound. Two other cases also refute it: a configuration with the delay-sum bound $|\delta_++\delta_-|\le m^2/(\kappa r)+2Vm$ violated, or a seed of the class with $\bar\Lambda_3\ge0.1229$.
- Lemma L.3: histories in the chart for which a bracket exceeds the displayed bound.
- Theorem L.4: histories satisfying the hypotheses with $\lVert\mathcal N[\psi+v]\rVert_{0,2a}>F_{\rm sgn}(d,y)$, or an arithmetic error in the assembly.
- Theorem L.5:
  - an exact evaluation in which (a)–(d) fails with the declared constants;
  - a seed of the class and an amplitude whose constructed history, with its complete past and unique charted continuation, ceases to exist before $T_N$, violates a bound of items 2–3, or has two roots for one ordered pair or a root on its own path at some $T\le T_N$.

  A run started at a finite time from the seed alone does not test this.
- A correct enclosure showing a declared lattice sum, $S_1(a)$ or $C_L$ above its declared value withdraws the numbers without affecting the lemmas.

## 9. Limits

The unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, all members dynamical, the eight-source block prescription, the contour of radius $1/10$ and the accepted seed class, for $0<\varepsilon\le6.46\times10^{-3}$. The statements concern the complete-past solution and its unique charted continuation. Theorem L.5 gives existence and upper bounds to $T_N$, not growth. Spatial decay is qualitative. Lattice sums are conditional on the interval library, with two elementary majorants added. The constants of Lemmas L.1–L.3 are not claimed optimal, and no largest seed size reachable by this estimate is established; the declared triple is one passing choice. Order-one displacement, the ending of regular evolution and arrival at wake speed are not addressed.

## Corrections after review

The [independent review](saturday-summed-signed-lattice-remainder-codex-review-2026-10-18.md) reconstructs Lemmas L.1–L.3 and Theorems L.4–L.5, and its separate reference reproduces the barrier, chart, gain and start values. It asked for three clarifications, now made. First, the largest of the three parts at the new endpoint is the half-odd sum, not the receiver cubic; the chart condition is described as close to saturation for the declared choices, with no optimum, maximal reach or necessary next route claimed; and the rest value of the $c_{30}$ bound is $34.1548$ (SL1). Second, the emptiness of the particular growth lower bound now has a uniform proof over all admitted amplitudes, and the start states that it uses the full translated history norm and improves the bound at $T_S$ to $y(T_S)<22.5(0.0211)^2$ (SL2). Third, the reading of the prior review was completed before these corrections (SL3). No lemma inequality, constant, declared triple or tabulated decimal changed.
