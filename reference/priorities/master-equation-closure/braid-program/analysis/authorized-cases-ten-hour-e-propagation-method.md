# Directed Cartesian propagation for the fixed E+M trial

**Grade: derived candidate and implementation specification, awaiting independent assessment.** This work owns only response Jacobian/tube coefficients and finite positive-delay error propagation. The E subject worker retains the exact preparation, exact-rational quintic trial, complete root/source-cell proofs and whole-cell residual instrument. The target is actual finite departure beyond the initial perturbation; no sampled residual or longer trajectory is substituted for a certificate.

## Frozen case and method

Use solely the [selected literal E+M positive-offset case](authorized-cases-ten-hour-e-method.md), $K=c_f=1$, $\beta=0.429117161835$, $r=2.559210616145$, offset $10^{-4}r(1,0.7,1.3)$ on member zero, and the exact owner-defined minimum-width $C^{2,1}$ endpoint patch. All twelve ordinary partner roots are retained; complete strict speed excludes positive-delay self roots. No source replacement, speed-cap law or spectrum calculation enters.

Before the propagation target, `shasum -a 256` returned method `1bb2566a6bc74819d145047ae4ea2b5d29a9be1e69271e5d9a43a9ed8ab6fe21`, shared independent method `b0e4c653975cb7add7cb4fbd26792acf87f7e55e47626029b214632bd773aede`, and its [weighted-comparison correction](authorized-cases-ten-hour-reference-e-comparison-correction.md) `1e63367dd10829de0da1d474350b56a6aa83431b29931ef34c5f23c1811e11d6`. The retained trial input `.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json` has digest `ef83cb8910090bf4c7179ebef65986c8895bb0d693e1a50bc5099a018393e193`. Its exact-rational reconstruction and exact launch-knot repair are owned by the E worker; this note does not change either history or trial.

The new method first checks explicit receiver Jacobians against stationary, affine and accelerated prescribed-source controls. It then encloses the signed Cartesian matrices over each admitted trial/source cell and current error tube. The symmetric part of a weighted six-dimensional error equation controls growth; completed-source errors remain external forcing. A numerical target requires the E worker's independently admitted complete cell/root/residual data. No target values are claimed in this freeze.

## Exact receiver Jacobians on a fixed completed source

At fixed reception time let the trial source be a known $C^{2,1}$ curve. Write $R=t-S$, $n=(x-\widehat X_j(S))/R$, $v=\widehat V_j(S)$, $a=\widehat A_j(S)$, $j=\widehat X_j'''(S)$ almost everywhere, $u$ for current receiver velocity, and $D=1-n\cdot v>0$. Define

$$
h=1-|v|^2,\quad p=n-v,\quad s=n\cdot a,\quad N=ps-Da,
\quad E=\frac{hp}{R^2D^3}+\frac N{RD^3},
\quad L=(1-u\cdot n)I+nu^{\mathsf T},\quad F=LE.
\tag{1}
$$

Polarity signs are multiplied after evaluating each directed hit. Treating $D$ temporarily as an independent scalar, the partial derivatives are

$$
E_R=-\frac{2hp}{R^3D^3}-\frac N{R^2D^3},\qquad
E_D=-\frac{3E}{D}-\frac a{RD^3},
\tag{2}
$$

$$
E_n^D=\frac{(h/R^2+s/R)I+pa^{\mathsf T}/R}{D^3},\quad
E_v^D=-\frac{(hI+2pv^{\mathsf T})/R^2+sI/R}{D^3},\quad
E_a=\frac{pn^{\mathsf T}-DI}{RD^3}.
\tag{3}
$$

Eliminate $D$ by $\widetilde E_n=E_n^D-E_Dv^{\mathsf T}$ and $\widetilde E_v=E_v^D-E_Dn^{\mathsf T}$. The full-row partials are

$$
F_R=LE_R,\quad F_n=L\widetilde E_n+(u\cdot E)I-Eu^{\mathsf T},
\quad F_v=L\widetilde E_v,\quad F_a=LE_a.
\tag{4}
$$

Differentiating the ordinary clock with respect to the current receiver position gives

$$
D_xS=-\frac{n^{\mathsf T}}D,\quad D_xR=\frac{n^{\mathsf T}}D,
\quad G:=D_xn=\frac{I-nn^{\mathsf T}}R\left(I+\frac{vn^{\mathsf T}}D\right),
\quad D_xv=-\frac{an^{\mathsf T}}D,\quad D_xa=-\frac{jn^{\mathsf T}}D.
\tag{5}
$$

Consequently the exact current-state Jacobians are

$$
J_x=F_nG+\frac{(F_R-F_va-F_aj)n^{\mathsf T}}D,
\qquad J_u=nE^{\mathsf T}-En^{\mathsf T}.
\tag{6}
$$

In particular $J_u^{\mathsf T}=-J_u$ exactly. The sum of the three signed directed hits remains skew. This retains the full receiver response; it is not a projected equation or an omitted term. The delayed source acceleration and its trial jerk contribution in (6) remain present.

At a trial seam, jerk may have a bounded jump while acceleration is continuous. Use the union of the relevant piecewise jerk enclosures. The response is locally Lipschitz in receiver position, (6) holds almost everywhere along the comparison segment, and integration of that derivative gives the same difference bound. No derivative of the unknown error history is required.

## Completed-source forcing separated from current error

At a receiving block compare the true row first with the response of the completed trial source at the **same actual receiver position and velocity**, then compare that auxiliary row with the retained trial receiver. The latter difference uses (6). The former uses only completed source-history errors $x_p,v_p,a_p$ for the given label and windows.

With actual/trial source speeds at most $b<1$, ranges at least $\ell>0$, denominators at least $m>0$, trial acceleration and jerk bounded by $A_0,J_0$, and both actual/trial acceleration magnitudes at most $A$, root transport is bounded by

$$
\eta_p=\frac{x_p}{1-b},\quad
\Delta R\le\eta_p,\quad
\Delta n\le\frac{2x_p}{\ell(1-b)},\quad
\Delta v\le v_p+A_0\eta_p,\quad
\Delta a\le a_p+J_0\eta_p.
\tag{7}
$$

The source windows must cover the complete interval between these two roots. All these roots must precede the receiving block. The current receiver position error is absent from (7) because it is held identical in this split.

For an explicit conservative fallback, reuse the independently derived telescoping coefficients. Set

$$
E_0=\frac{1+b}{\ell^2m^3}+\frac{2(1+b)A}{\ell m^3},
\tag{8}
$$

$$
\alpha_R=(1+2b)\left[\frac{2(1+b)}{\ell^3m^3}+\frac{2(1+b)A}{\ell^2m^3}\right],
\quad
\alpha_D=(1+2b)\left[\frac{3(1+b)}{\ell^2m^4}+\frac{6(1+b)A}{\ell m^4}\right],
\tag{9}
$$

$$
\begin{aligned}
\alpha_n&=(1+2b)\left[\frac1{\ell^2m^3}+\frac{2(1+b)A}{\ell m^3}\right]+2bE_0+b\alpha_D,\\
\alpha_v&=(1+2b)\left[\frac{1+2b+2b^2}{\ell^2m^3}+\frac{2A}{\ell m^3}\right]+\alpha_D,\\
\alpha_a&=\frac{2(1+2b)(1+b)}{\ell m^3}.
\end{aligned}
\tag{10}
$$

Then one hit's completed-source discrepancy is bounded by $P_xx_p+P_vv_p+P_aa_p$, where

$$
P_x=\frac{\alpha_R+2\alpha_n/\ell+\alpha_vA_0+\alpha_aJ_0}{1-b},
\qquad P_v=\alpha_v,\qquad P_a=\alpha_a.
\tag{11}
$$

These positive coefficients are safe but may be too pessimistic; directed cellwise kernel derivatives can replace them once their interpolation domain is enclosed. No polarity cancellation is inferred from magnitudes. Include the certified whole-cell residual $\rho_i$ and all three source labels to obtain $f_i=\rho_i+\sum_j(P_{x,ij}x_{p,j}+P_{v,ij}v_{p,j}+P_{a,ij}a_{p,j})$.

## Signed block propagation

For each receiver the current-error equation has the form

$$
\delta X_i'=\delta V_i,\qquad
\delta V_i'=A_i(t)\delta X_i+B_i(t)\delta V_i+g_i(t),
\quad B_i^{\mathsf T}=-B_i,\quad |g_i|\le f_i.
\tag{12}
$$

Here $A_i,B_i$ are the averaged current-state Jacobians along the receiver homotopy with the completed trial sources held fixed. Their directed interval domains must include every corresponding root and source piece. Current receivers decouple in (12); coupling re-enters through completed positive-delay histories.

Fix $\gamma_i>0$ on the block and set

$$
y_i=(\sqrt{\gamma_i}\delta X_i,\delta V_i),\qquad r_i=|y_i|.
$$

The symmetric part of its six-dimensional matrix has zero diagonal blocks and off-diagonal block $(\sqrt{\gamma_i}I+A_i/\sqrt{\gamma_i})/2$. Thus

$$
D^+r_i\le\mu_i r_i+f_i,\qquad
\mu_i\ge\sup_t\frac{\|\gamma_iI+A_i(t)\|_2}{2\sqrt{\gamma_i}}.
\tag{13}
$$

The full $B_i$ contributes no positive term to this Euclidean logarithmic norm. Signed restoring parts of $A_i$ remain inside $\gamma_iI+A_i$. If only $\|A_i\|_2\le L_x$ is available, $\gamma_i=L_x>0$ gives $\mu_i\le\sqrt{L_x}$, with no receiver-velocity Lipschitz contribution. A zero $L_x$ can use any positive weight; its exact limiting comparison can also be integrated directly.

For a block of width $h$ with constant upper bounds $\mu_i\ge0$ and $f_i\ge0$,

$$
r_{i,\rm end}\le e^{\mu_i h}r_{i,\rm start}
+h\varphi_1(\mu_i h)f_i,\qquad
\varphi_1(z)=\int_0^1e^{sz}\,ds.
\tag{14}
$$

The same right side bounds the block supremum. Hence $e_{x,i}\le r_i/\sqrt{\gamma_i}$ and $e_{v,i}\le r_i$. To store acceleration error for later blocks, retain separate bounds $L_{x,i}\ge\|A_i\|_2$ and $L_{u,i}\ge\|B_i\|_2$:

$$
e_{a,i}\le L_{x,i}\frac{r_i}{\sqrt{\gamma_i}}+L_{u,i}r_i+f_i.
\tag{15}
$$

Skewness removes $L_u$ only from current norm growth, not from the acceleration error needed by later sources. If the weight changes between blocks, initialize the next block using its separate position/velocity bounds, or the factor $\max\{1,\sqrt{\gamma_{\rm next}/\gamma_{\rm old}}\}$ on the prior weighted radius. No unrecorded norm reset is allowed.

Each receiving block must be shorter than the certified actual and auxiliary delay floors. Strict bootstrap inequalities for speed, separation, ranges, denominators, error tubes and complete source availability are still necessary. Positive-delay induction does not require $P_a<1$; a large delayed gain can nevertheless make (14)–(15) unusable. The corrected scalar alternative remains $\lambda=\max(cL_x,1/c+L_v)$, never the erroneous $1/c+cL_v$.

## Known analytical controls before target use

For a stationary source with $v=a=j=0$, every receiver velocity gives $F=n/R^2$, $J_u=0$, and $J_x=(I-3nn^{\mathsf T})/R^3$. For an affine source with $n=e_1$, $v=ve_1$, $a=j=u=0$, the derivative is $(1+v)(I-3e_1e_1^{\mathsf T})/[R^3(1-v)^2]$ and $J_u=0$.

A nonzero-acceleration/jerk control is the prescribed source $X_s(s)=(0,As^2/2,Js^3/6)$ near $s=0$, receiver $x=Re_1$ at time $t=R$, and $u=0$. Smooth bounded-speed extensions supply a complete ordinary-root control. At the exact root $S=0$, the expected matrices are

$$
J_x=\frac{I-3e_1e_1^{\mathsf T}}{R^3}
+\frac A{R^2}(e_1e_2^{\mathsf T}+2e_2e_1^{\mathsf T})
+\frac JRe_3e_1^{\mathsf T},
\quad J_u=-\frac AR(e_1e_2^{\mathsf T}-e_2e_1^{\mathsf T}).
\tag{16}
$$

Finally, the abstract block control $A=-\gamma I$ with any skew $B$ has a skew weighted matrix and exactly conserved unforced weighted norm. The zero-growth forced comparison is $r(h)=r(0)+hf$. These controls test matrix signs, sampled jerk, receiver response and propagation separately; none is a substitute physical target.

A target failure of the current tube, the source-error recursion, or the departure-observable inequality is a failed certificate unless an actual physical event is independently enclosed. Falsifiers include an omitted $F_aj$ term, a lost receiver response, root transport outside the completed source interval, a non-skew $B$ after exact construction, or a directed coefficient not containing the true matrix on its full cell. No target propagation has yet been run.
