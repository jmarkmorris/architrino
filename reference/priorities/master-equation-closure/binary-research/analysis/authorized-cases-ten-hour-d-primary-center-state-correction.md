# A nonlinear local correction for midpoint velocity

**Grade: derived candidate, awaiting independent assessment.** A local state correction removes the term linear in relative velocity from the exact current-affine midpoint row. Actual source-history errors retain a factor of midpoint velocity, using the complete center homotopy and no source jerk. On the nonpositive interval of the [scalar account](authorized-cases-ten-hour-d-primary-anisotropic-account.md), the corrected midpoint equation has the signed reflection matrix as its leading term and a remainder weighted by $K^2/d^3$. This weight has a finite budget from that account. The reflection matrix itself still depends on the actual nonmirror separation direction.

The equation, source identities, complete-history norm and root census are fixed in the [method](authorized-cases-ten-hour-d-primary-method.md) and [region-admission note](authorized-cases-ten-hour-d-primary-region-admission.md). Throughout use $c_f=1$, source-fixed $K$, actual complete strict member speed $\beta\le1/100$, and $\chi=K/d\le1/100$. Both actual partner clocks are retained; positive-delay self roots are absent by complete strict speed. No history is replaced by its affine comparison.

## The exact primitive in the current-affine row

Write

$$
Z=dN,\quad U=V_+-V_-,\quad W=(V_++V_-)/2,\quad
u=N\cdot U,\quad v=U-\nu N,
\tag{1}
$$

$$
a=N\cdot W,\quad b=W-aN,\quad g=\sqrt{1-|b|^2},\quad k=K/d^2.
\tag{2}
$$

Use $\nu$ here for the radial relative velocity, to distinguish it from a source time. The even velocity function in the affine row is

$$
E(z)=\sqrt{1-|z_\perp|^2}\,N-
\frac{(z\cdot N)z_\perp}{\sqrt{1-|z_\perp|^2}},
\qquad z_\perp=z-(z\cdot N)N.
\tag{3}
$$

Its exact midpoint contribution is

$$
W'=k(2NN^{\mathsf T}-I)W+\Delta+e_{\rm ctr},
\quad
\Delta=\frac k2\{E(W+U/2)-E(W-U/2)\}.
\tag{4}
$$

Here $e_{\rm ctr}$ is the actual-delay error defined in the account note; it is not set to zero. The term in $\Delta$ linear in $U$ is $(k/2)DE(W)U$.

Define $B(W,N)=b/g$. Direct differentiation, holding $W$ fixed, gives

$$
DE(W)U=-\frac{b\cdot v}{g}N-
\frac{\nu b+av}{g}-\frac{ab(b\cdot v)}{g^3},
\tag{5}
$$

$$
\left.\frac d{dt}\frac{B(W,N)}d\right|_{W\ {m fixed}}
=\frac1{d^2}DE(W)U.
\tag{6}
$$

The derivative on the left includes both $d'=\nu$ and $N'=v/d$. Thus the corrected midpoint variable

$$
Y=W-\frac K{2d}\frac bg
\tag{7}
$$

satisfies the exact identity

$$
Y'=k(2NN^{\mathsf T}-I)W+R_3+e_{\rm ctr}
-\frac\chi2D_WB(W,N)W',
\tag{8}
$$

$$
R_3=\frac k2\{E(W+U/2)-E(W-U/2)-DE(W)U\}.
\tag{9}
$$

This is an algebraic change of variables within the original equation. It is not an additional response factor or a replacement equation. At $W=0$, all midpoint terms and the correction vanish. At $U=0$, (6) vanishes and (8) retains precisely the variation of $W$ in (7).

## Cubic relative-velocity remainder with midpoint parity

The fourth derivative of $E$ is uniformly bounded on $|z|\le\beta$. A conservative multilinear bound is

$$
\|D^4E\|\le
\frac{15}{g_0^3}+\frac{135\beta^2}{g_0^5}
+\frac{225\beta^4}{g_0^7}+\frac{105\beta^6}{g_0^9}<32,
\qquad g_0=\sqrt{1-\beta^2}.
\tag{10}
$$

For verification, $D^4\sqrt{1-|z_\perp|^2}$ has norm at most $3g_0^{-3}+18\beta^2g_0^{-5}+15\beta^4g_0^{-7}$. The third derivative of $z_\perp/\sqrt{1-|z_\perp|^2}$ has the same bound, and its fourth derivative has norm at most $45\beta g_0^{-5}+150\beta^3g_0^{-7}+105\beta^5g_0^{-9}$. The product rule for the second term of (3) gives (10). These estimates follow by differentiating the quadratic argument and retaining its first two derivatives; higher derivatives of that argument vanish.

The central-difference remainder in (9) vanishes at $W=0$, because $E$ is even. Differentiate that remainder once in $W$, use the third-order central-difference integral formula, and integrate from zero to $W$. The entire interpolation stays in the speed ball by convexity of the four points $\pm W\pm U/2$. Consequently

$$
|R_3|\le\frac{32}{48}k|W||U|^3.
\tag{11}
$$

If the scalar account $\mathcal J\le0$, its algebraic bound gives $|U|^2\le4.04\chi$ and complete speed gives $|U|\le0.02$. Hence

$$
|R_3|<0.054\,k\chi|W|.
\tag{12}
$$

The midpoint factor is essential. Bounding $D^3E$ directly before using parity would lose it and produce a false nonzero drive at a mirror state.

## A midpoint factor in the actual-delay error

Assume $t-3d(t)\ge0$, so the source windows used in the following estimate are generated. Set

$$
M_t=\sup_{s\in[t-3d(t),t]}|W(s)|.
\tag{13}
$$

Scale the entire center history to $\lambda C$, $-1\le\lambda\le1$, while keeping the actual relative history fixed. Convexity preserves complete member speed at most $\beta$. Each clock is solved separately. The homotopy histories are prescribed comparisons, not asserted coupled solutions. Their source acceleration is a convex combination of the two actual member accelerations, so the current-window bound $1.08k$ remains valid.

The [nonlinear midpoint estimate](authorized-cases-ten-hour-d-primary-nonlinear-center.md), applied at each time in the current source window, gives

$$
\sup_{s\in[t-d/(1-\beta),t]}|C''(s)|\le6kM_t.
\tag{14}
$$

To check coverage, those times have separation at least $d(1-2\beta/(1-\beta))>0.979d$. Their own causal windows start after $t-2.06d$, within (13), and are generated. The earlier coefficient $B_\beta(\eta)$ is below five there because $\eta<0.012$. The separation change leaves a bound below $6k$. Thus (14) does not assume a global acceleration derivative or ignore an earlier source interval.

For a single receiver and fixed $\lambda$, let $R$ be its actual delay and write the source Taylor remainder

$$
\mathcal E(\lambda,R)=X_j^\lambda(t-R)-X_j^\lambda(t)+V_j^\lambda(t)R.
\tag{15}
$$

Use a bar for the current-affine comparison. The account note gives $|R-\bar R|,|S-\bar S|\le0.56K$ and $|V_j^\lambda(t-R)-V_j^\lambda(t)|\le1.1\chi$. At fixed $R$, (14) gives

$$
|\mathcal E_\lambda|\le3.1KM_t,\qquad
|\mathcal E_R|\le1.1\chi.
\tag{16}
$$

The ordinary clock derivative is

$$
R_\lambda=
\frac{n\cdot\{W(t)R-\mathcal E_\lambda\}}
{1-n\cdot V_j^\lambda(t-R)}.
\tag{17}
$$

Its denominator is the actual transmitter factor. The corresponding affine formula has $\mathcal E=0$. The source velocity in (17) must not be replaced by its current value. The bounds above, $|n-\bar n|<0.58\chi$, and the denominator difference below $1.106\chi$ yield

$$
|R_\lambda|<1.06dM_t,\quad
|\bar R_\lambda|<1.03dM_t,\quad
|R_\lambda-\bar R_\lambda|<5.5KM_t.
\tag{18}
$$

Differentiating $S=dN+V_j^\lambda(t)R-\mathcal E$ and the sampled source velocity then gives

$$
|S_\lambda-\bar S_\lambda|<5KM_t,
\quad |\bar S_\lambda|<1.03dM_t,
\quad
|\partial_\lambda V_j^\lambda(t-R)-W(t)|<7.3\chi M_t.
\tag{19}
$$

In particular $\partial_\lambda V_j^\lambda(t-R)=W(t-R)-A_j^\lambda(t-R)R_\lambda$ includes its moving-clock acceleration term.

On the chord comparison region $R>0.98d$, $D>0.99$, the canonical row $F(S,V)=-KS/(|S|^3D)$ satisfies

$$
\|D_SF\|<2.2K/d^3,\quad \|D_VF\|<1.1K/d^2,
\tag{20}
$$

$$
\|D^2_{SS}F\|<30K/d^4,\quad
\|D^2_{SV}F\|<10K/d^3,\quad
\|D^2_{VV}F\|<3K/d^2.
\tag{21}
$$

For example, twice differentiating $S/|S|^3$ gives a crude norm bound $24/|S|^4$; the transmitter-factor terms add less than the reserve in thirty. The mixed derivative bound follows by differentiating $nn^{\mathsf T}/(R^2D^2)$, and the last bound is $2K/(R^2D^3)$. Thus these constants cover the complete row, including transmitter sensitivity.

Subtracting the actual and affine $\lambda$ derivatives using (18)–(21) gives a single-row bound less than

$$
\{2.2\cdot5+1.1\cdot7.3
+(30\cdot0.56+10\cdot1.1)1.03
+10\cdot0.56+3\cdot1.1\}\,k\chi M_t
<60k\chi M_t.
\tag{22}
$$

The midpoint error is odd in the complete center history and vanishes at $\lambda=0$. Integrating the single-row derivative bound from zero to one, with the opposite receiver obtained by the opposite homotopy sign, proves

$$
|e_{\rm ctr}(t)|\le60k\chi M_t.
\tag{23}
$$

No acceleration derivative occurs. For $W^{2,\infty}$ histories the clock and row derivatives hold almost everywhere in $\lambda$ and are integrated; the generated-time restriction supplies (14). This estimate improves the absolute midpoint error in the account note while retaining the original complete past and both clocks.

## The corrected actual equation

The matrix derivative satisfies $\|D_WB\|\le g_0^{-3}$, and the earlier nonlinear midpoint estimate gives $|W'|\le5kM_t$ at reception. Equations (7)–(12) and (23) therefore imply, on $\mathcal J\le0$,

$$
Y'=k(2NN^{\mathsf T}-I)Y+\mathcal R,
\qquad |\mathcal R(t)|\le66\frac{K^2}{d^3}M_t,
\tag{24}
$$

$$
|Y-W|\le\frac\chi{2g_0}|W|<0.0051|W|.
\tag{25}
$$

The remaining error coefficient has a finite account budget:

$$
\int_T^t\frac{K^2}{d^3}\,ds
\le\frac23\{\mathcal J(t)-\mathcal J(T)\}
\le-\frac23\mathcal J(T)
\quad\hbox{while }\mathcal J\le0.
\tag{26}
$$

Thus the relative-velocity correction does not itself force a nonintegrable absolute midpoint error. The leading signed matrix in (24) remains. Its direction is the actual $N(t)$, whose nonlinear dynamics must still be controlled.

## A planar signed account and its three-dimensional limit

For a planar actual relative motion with $H=d^2\theta'>0$, set $T=N_\theta$ and temporarily write the components of a vector obeying the leading equation in (24) as $a_Y=Y\cdot N$, $b_Y=Y\cdot T$. Then

$$
a_Y'=ka_Y+\theta'b_Y,\qquad
b_Y'=-kb_Y-\theta'a_Y,
\tag{27}
$$

so $(a_Yb_Y)'=\theta'(b_Y^2-a_Y^2)$. Consequently

$$
\mathcal S=|Y|^2+\frac{2K}{H}a_Yb_Y,
\qquad
\mathcal S'=-\frac{2K}{H^2}a_Yb_YH'
\tag{28}
$$

for that leading equation. The omitted remainder contributes exactly $2[Y+(K/H)(b_YN+a_YT)]\cdot\mathcal R$ and can be retained with (24). The account is coercive for $H>K$, with lower factor $1-K/H$.

At leading current-affine order, $H'=kH+2Ka_Yb_Y/(dg)$, up to the separately retained relative-row error and the difference between $W$ and $Y$. Substitution into (28) gives

$$
\mathcal S'=-\frac{2K^2}{d^2H}a_Yb_Y
-\frac{4K^2}{dgH^2}(a_Yb_Y)^2.
\tag{29}
$$

The second term is nonpositive. Completing the square, rather than discarding it, bounds the displayed expression above by $K^2g/(4d^3)$. If $H' = kH+2Ka_Yb_Y/(dg)+r_H$, the same square completion gives the upper bound

$$
\frac{dg}{4}\left(k+\frac{r_H}{H}\right)^2.
\tag{30}
$$

This identity shows how the nonlinear anisotropy can assist a midpoint bound on a region with controlled $H$. It is not yet an all-future estimate: $r_H$, coercivity, and the memory term must remain controlled on that actual region.

For a genuinely three-dimensional relative motion, put $H=|Z\times U|$, $T=(U-\nu N)/|U-\nu N|$, $L=N\times T$, and let $c_Y=Y\cdot L$. The frame satisfies $T'=-\theta'N+\kappa L$, where $\theta'=H/d^2$ and $\kappa=L\cdot(A_+-A_-)/|v|$. The exact leading analogue of (28) becomes

$$
\mathcal S'=-2kc_Y^2+\frac{2K}{H}\kappa a_Yc_Y
-\frac{2K}{H^2}a_Yb_YH'.
\tag{31}
$$

The affine anisotropy contributes $\kappa=2Ka_Yc_Y/(dgH)$ at leading order. In addition to the negative planar square, (31) therefore contains

$$
-2kc_Y^2+\frac{4K^2a_Y^2c_Y^2}{dgH^2}.
\tag{32}
$$

This term is controlled by normal damping when $2a_Y^2\le gH^2/(Kd)$, but that inequality need not persist on a zero-relative-speed tail. Dropping the plane-variation term would incorrectly turn a planar estimate into a full three-dimensional proof. Likewise, letting $H\downarrow K$ destroys the coercivity used in (28). These are explicit remaining boundaries of this signed-account route, not asserted events on the selected trajectory.

## Scope and falsifiers

Equations (7)–(26) are a nonlinear reduction of the actual midpoint equation, conditional on the stated generated slow region and nonpositive scalar account. Equations (28)–(32) identify the next signed control and the additional three-dimensional term. No all-future nonmirror neighborhood, historical-source membership, finite outgoing witness, or coupled nondispersing counterexample is claimed.

Falsifiers include failure of the fixed-$W$ primitive (6), an omitted moving-clock term in (17)–(19), source coverage outside the declared generated interval, failure of the fourth-derivative or row-Hessian bounds, a midpoint remainder lacking the factor in (23), or a missing frame term in (31). The reference mirror's angular variable has not replaced the actual $N,H,T,L$. No numerical trajectory or new equation variant was used.
