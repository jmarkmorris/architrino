# Planar region admission up to two explicit exits

**Grade: derived candidate, awaiting independent assessment.** For planar nonmirror histories near the slow circular preparation, the corrected midpoint account controls common velocity for arbitrarily long time while the scalar account is nonpositive and relative angular motion stays above $2K$. The speed and separation boundaries then cannot occur first. Two exits remain: positive scalar account, or angular motion reaching $2K$. This is a conditional planar result. It does not prove the requested complete three-dimensional neighborhood or the fate of the literal historical source.

Use the unchanged canonical law, $c_f=1$, source-fixed $K=4\epsilon^2R_0$, and complete histories confined to one fixed plane. Planarity here is an explicit restriction on both supplied member histories, preserved by uniqueness; it is not inferred for general perturbations. The root census and source coverage are those in the [nonlinear state correction](authorized-cases-ten-hour-d-primary-center-state-correction.md). No ordinary root is omitted.

## Entry conditions and interval

Let $0<\epsilon\le1/2900$. At a finite generated entry time $T$, assume

$$
T>3d(T),\qquad
0<\chi(T)=K/d(T)\le2.1\epsilon^2,
\qquad -2.1\epsilon^2\le\mathcal J(T)<0,
\tag{1}
$$

$$
H(T)>2K,\qquad
M_T:=\sup_{s\le T}|W(s)|\le\epsilon/100.
\tag{2}
$$

Here $H=Z\times U$ is the signed planar angular-motion scalar, with orientation chosen so it is initially positive. Complete member speed through $T$ is less than $1/100$. Consider the subsequent actual continuation before the first event

$$
\mathcal J=0,\quad H=2K,\quad
\max_i|V_i|=1/100,\quad \chi=1/100.
\tag{3}
$$

The complete supplied past and all generated source windows are retained. The inequality $t>3d(t)$ persists on this interval, since $(t-3d)'\ge1-6/100>0$. Thus the generated-window condition of the corrected midpoint equation persists automatically.

## Exact planar midpoint account

Write $a=W\cdot N$, $b=W\cdot T_\theta$, $g=\sqrt{1-b^2}$, where $T_\theta$ is the unit planar tangent. The corrected variable is

$$
Y=W-\frac\chi{2g}bT_\theta,
\quad A=Y\cdot N=a,
\quad B=Y\cdot T_\theta=b\left(1-\frac\chi{2g}\right).
\tag{4}
$$

Put $\mu=K/H\le1/2$ and

$$
\mathcal S=|Y|^2+2\mu AB.
\tag{5}
$$

The exact corrected equation is $Y'=k(2NN^{\mathsf T}-I)Y+\mathcal R$, where $k=K/d^2$ and $|\mathcal R|\le66k\chi M(t)$, with

$$
M(t)=\max\{M_T,\sup_{T\le s\le t}|W(s)|\}.
\tag{6}
$$

This supremum covers the shorter actual source window in the state-correction theorem. Differentiating (5) in the actual planar frame gives

$$
\mathcal S'=-\frac{2KAB}{H^2}H'
+2\{Y+\mu(BN+AT_\theta)\}\cdot\mathcal R.
\tag{7}
$$

The relative row decomposes as

$$
H'=kH+\frac{2KAB}{dg}+r_H.
\tag{8}
$$

The remainder retains the exact affine central difference $Q_t$, the actual delay error $e_{\rm rel}$, and the distinction between $W$ and $Y$:

$$
r_H=dQ_t+d(e_{\rm rel})_t
+\frac{2K}{dg}(ab-AB).
\tag{9}
$$

The scalar account note gives $|e_{\rm rel}|\le6k\chi$ and

$$
|Q_t|\le k\left\{\frac{3\beta^2|v|^2}{4g_0^5}
+\frac{|\nu||v|}{2g_0^3}\right\},
\quad \beta=1/100,\quad g_0=\sqrt{1-\beta^2}.
\tag{10}
$$

Since $H=d|v|$ on this positively oriented interval, $\chi/|v|=\mu$. Also $ab-AB=\chi ab/(2g)$. Therefore

$$
\frac{|r_H|}{kH}
\le\frac{3\beta^2|v|}{4g_0^5}
+\frac{|\nu|}{2g_0^3}
+6\mu+\frac{\mu|ab|}{g^2}
<3.02.
\tag{11}
$$

This is uniform even when $|v|$ becomes small: its denominator has been replaced by the explicitly retained $H\ge2K$ condition.

Substituting (8) in (7), completing the square in $AB/H$, and using $g\le1$ yields

$$
-\frac{2KAB}{H^2}H'
\le\frac{dg}{4}\left(k+\frac{r_H}{H}\right)^2
<4.1k\chi.
\tag{12}
$$

The remainder term in (7) is at most $198k\chi M(t)^2$, because $|Y|\le|W|$ in (4) and $\mu\le1/2$. Consequently

$$
\mathcal S'\le4.1k\chi+200k\chi M(t)^2.
\tag{13}
$$

This estimate uses the negative anisotropic square; replacing it by an absolute error would lose the finite scalar-account budget.

## Uniform midpoint and member-speed bounds

The correction and $\mu\le1/2$ give

$$
\frac12\left(1-\frac\chi{2g_0}\right)^2|W|^2
\le\mathcal S\le\frac32|W|^2,
\qquad |W|^2<2.1\mathcal S.
\tag{14}
$$

Let $L(t)=\int_T^t k\chi\,ds$. Strict increase of $\mathcal J$ while it remains nonpositive gives

$$
0\le L(t)\le-\frac23\mathcal J(T)\le1.4\epsilon^2.
\tag{15}
$$

Integrating (13), using (14), and taking the running supremum yields

$$
M(t)^2\le3.15M_T^2+8.61L(t)
+420\int_T^t k\chi M(s)^2\,ds.
\tag{16}
$$

An integrating-factor bound therefore gives

$$
M(t)^2\le\{3.15M_T^2+8.61L(t)\}e^{420L(t)}
<12.25\epsilon^2,
\qquad M(t)<3.5\epsilon.
\tag{17}
$$

For the last inequality use $M_T\le\epsilon/100$, $L\le1.4\epsilon^2$, $\epsilon\le1/2900$, and $e^x\le(1-x)^{-1}$ for $0\le x<1$.

The separation barrier in the [region-admission note](authorized-cases-ten-hour-d-primary-region-admission.md) gives

$$
\chi(t)^{3/2}\le\chi(T)^{3/2}-\sqrt{4.04}\,\mathcal J(T)
\le(3.05\epsilon+4.221)\epsilon^2
<4.223\epsilon^2.
\tag{18}
$$

At $\epsilon\le1/2900$, squaring the last bound verifies

$$
\chi(t)<1/15000<1/100.
\tag{19}
$$

Since $\mathcal J\le0$, $|U|^2\le4.04\chi$. Thus

$$
\max_i|V_i|\le|W|+|U|/2
<\frac{3.5}{2900}+\frac12\sqrt{\frac{4.04}{15000}}
<0.0095<1/100.
\tag{20}
$$

The speed and separation boundaries in (3) cannot occur first. All bounds are for the actual coupled equation with both clocks. If neither of the remaining two events occurs, this planar solution continues ordinarily for all future time, and the scalar account theorem gives $d(t)\to\infty$.

## Relation to the accepted circular preparation

For the ideal complete circular mirror source, take $T=10R_0$. The accepted release-layer bounds give $0.9929<r/R_0<1.0071$, scaled speed below $1.0062$, and scaled angular motion at least $1-\epsilon$. They imply $\chi(T)<2.1\epsilon^2$, $-2.1\epsilon^2<\mathcal J(T)<0$, $H(T)>2K$, and $T>3d(T)$. Its midpoint velocity is identically zero. For example, dividing $\mathcal J(T)$ by $\epsilon^2$, a conservative lower bound is

$$
\frac{2(1-\epsilon)^2}{1.0071^2}
-\frac4{0.9929}
-\frac{4\epsilon\,1.0062}{0.9929}>-2.1,
\tag{21}
$$

and an upper bound is

$$
2(1.0062)^2-\frac4{1.0071}
+\frac{4\epsilon\,1.0062}{0.9929}<0.
\tag{22}
$$

Finite-time dependence in the explicit complete-history norm gives a planar neighborhood satisfying the strict entry conditions. This is an existential finite-time entry neighborhood; its norm radius has not been quantified or compared with the literal historical phase defect. The numerical speed ceiling includes the historical ratio as a range comparison only. Source membership is a separate assertion and is not supplied here.

## Remaining exits and scope

For this planar region, the earlier vague midpoint-speed difficulty has been reduced to two specific unresolved events: $H$ reaching $2K$, or $\mathcal J$ becoming positive. At a positive-account crossing the radial sign remains undetermined. At the angular boundary the quadratic account used here loses its chosen coercivity margin if $H$ falls further. The equations above do not show that either event happens or fails to happen.

The full three-dimensional question has an additional plane-variation term already displayed in the state-correction note. The planar restriction in this theorem cannot be removed by continuity over arbitrarily long time without controlling that term. Consequently this result is not an all-future complete nonmirror-neighborhood theorem and not a historical-source fate certificate.

Falsifiers are failure of the exact signed derivative (7), a missing term in (9), loss of generated source coverage despite (1) and the speed bound, a violated constant in (11)–(22), or an actual planar first speed/separation exit while every other stated premise holds. No numerical trajectory, modified law, replacement history or physical-energy premise was used.
