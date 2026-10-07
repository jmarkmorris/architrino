# Independent local source comparison and transverse refinement

**Derived reference; conditional lemma accepted.** The [source-comparison subject](overnight2-a-local-ode-source-comparison.md) has the correct backward integral, displaced-clock and response bounds. No derivative of the actual acceleration discrepancy is required. Its two-order improvement is a local source-functional statement; actual-history admission and a Taylor remainder for the comparison response remain separate requirements.

This after-disclosure review uses the Jack K. Hale lens with explicit Moore-style inequalities. It also derives a new, bounded application to the already admitted [wider mirror regime](slow-binary-wider-regime.md), using its [independent adjudication](slow-binary-wider-regime-independent-adjudication.md). This is an analytical reference within the canonical investigation, not a new mirror preparation or a transfer to the original nonmirror nominal/spatial histories. The exact source-fixed acceleration, complete past, ordinary-root coverage and $c_f=1$ remain unchanged. The coordinator suggested the auxiliary-ODE route before this assessment; the constants and transverse derivation below are reconstructed here. The earlier [cubic reference](overnight2-a-reference-canonical-cubic-row.md) is frozen and is not used as an accepted remainder theorem.

## Conditional lemma reconstructed

Fix the reception radius $r$, angular magnitude $h>0$, $alpha=\epsilon/h$, and fixed receiving axes. For $\tau=(a-s)/(rh)$, set $y=Y(a)/r$ and $w=y'=hY'(a)$. Let $y''=F(y,w)+e$, $|e|\le E_*$ on $[-\ell,0]$, and let $z''=F(z,z')$ have the same terminal position and velocity. Both paths must exist on the entire interval in the declared joining tube. For $\delta=y-z$,

$$
\delta'(\tau)=-\int_\tau^0 [F(y,y')-F(z,z')+e](b)\,db,
\qquad
\delta(\tau)=\int_\tau^0(b-\tau)[F(y,y')-F(z,z')+e](b)\,db.
$$

With $P=\|\delta\|_\infty$, $V=\|\delta'\|_\infty$, the common integrand bound is $B=E_*+L_yP+L_wV$. Therefore $P\le\ell^2B/2$, $V\le\ell B$, and $B\le E_*+\vartheta B$, where $\vartheta=L_y\ell^2/2+L_w\ell$. For $\vartheta<1$,

$$
P\le\frac{E_*\ell^2}{2(1-\vartheta)},\qquad
V\le\frac{E_*\ell}{1-\vartheta}.
\tag{1}
$$

The analytical control $F=0$, constant $e$ gives $\delta=e\tau^2/2$, $\delta'=e\tau$ exactly. This checks the backward signs and both integration factors before applying (1). An actual $W^{2,\infty}$ path and bounded measurable $e$ suffice; an acceleration jump causes no differentiation problem.

For either path $x$, define $g_x(d)=d-\alpha|n+x(-d)|$. If $|x'|\le V_*$ and $m=1-\alpha V_*>0$, then for $d_2>d_1$,

$$
g_x(d_2)-g_x(d_1)\ge m(d_2-d_1).
$$

This Lipschitz-norm argument does not need differentiability of the norm at a zero chord. Assuming both roots lie in the common window gives

$$
|d_y-d_z|\le\alpha P/m,\quad
|S_y-S_z|\le P/m,\quad
|w_y-w_z|\le V+A_*\alpha P/m,
\tag{2}
$$

where $S_x=n+x(-d_x)$ and the last bound uses only $|z''|\le A_*$. Thus the comparison acceleration, rather than the actual error, is differentiated. An affine source has $g'=1+\alpha N\cdot w\ge m$, providing an independent sign control for the moving clock.

For $v=\alpha w$ and $D=1+\widehat S\cdot v$, the dimensionless response is $\mathcal R=-4S/(|S|^3D)$. On a joining segment with $|S|\ge a_*$, $D\ge m$, and $|v|\le\alpha V_*$,

$$
\|D_S\mathcal R\|\le4\left[\frac2{a_*^3m}+\frac{\alpha V_*}{a_*^3m^2}\right]=L_S,
\qquad
\|D_v\mathcal R\|\le\frac4{a_*^2m^2}=L_V.
$$

Here $D_S(S/|S|^3)=|S|^{-3}(I-3NN^{\mathsf T})$ has norm $2/|S|^3$, while $\|D_SN\|=1/|S|$. These identities independently establish both constants. Equations (1)–(2) give exactly the subject's response bound

$$
|\mathcal R_y-\mathcal R_z|
\le\frac{E_*}{1-\vartheta}
\left[\frac{L_S\ell^2}{2m}+L_V\alpha\ell+
\frac{L_VA_*\alpha^2\ell^2}{2m}\right].
\tag{3}
$$

The velocity factor $\alpha$ is essential. Endpoint chord floors alone do not imply a joining-segment floor. With bounded constants and $\ell=O(\alpha)$, (3) gains two powers of $\alpha$. The physical slow acceleration response is $\mathcal R/r^2$, whereas $y''=(h^2/r)\mathcal R$; those two scalings must not be interchanged.

## A concrete generated mirror window

Retain precisely the wider theorem's provisional region and complete mirror history: $h\ge0.99$, $|\mathbf e|\le3$, $|Y'|\le4/h$, $Q=h^2/r\in(0,4]$, and its actual ceiling $\alpha<0.000506$. The estimates below use the weaker numerical bound $\alpha\le10^{-3}$. Require the stronger common-window condition

$$
s-2.1\epsilon r\ge s_*=10\epsilon,
\qquad \ell=2.1\alpha.
\tag{4}
$$

Thus every receiver in the comparison interval is already in the accepted generated regime, and the source generations needed by its accepted second-order row are covered. Merely checking that the present source exceeds $s_*$ would not establish (4). No estimate is applied across the initial supplied-history seam.

The inherited inequalities $0<h'\le2\epsilon h/r^2$ and $|Y'|\le4/h$ close a backward bootstrap over this slightly enlarged interval:

$$
\left|\frac{r(a)}r-1\right|\le9\alpha,
\qquad
1-20\alpha^2\le\frac{h(a)}h\le1,
\qquad
0\le\theta(s)-\theta(a)\le2.2\alpha\rho,
\quad \rho=hq=Q.
\tag{5}
$$

Indeed the radius variation is bounded by $8.4\alpha/(1-20\alpha^2)<9\alpha$. The angular-magnitude loss is bounded by $16.8\alpha^2/(1-9\alpha)^2<20\alpha^2$. The angle is bounded by $2.1\alpha\rho/(1-9\alpha)^2<2.2\alpha\rho$. These strict inequalities close by continuity from the terminal point and use no future radius ceiling.

In fixed reception axes, the actual path satisfies $|y-n|<0.1$, $|w|<5$, $|y_t|<2.22\alpha\rho$. Its own transverse acceleration is at most $2\epsilon h(a)/r(a)^3$; rotation of the radial acceleration, bounded by $1.01/r(a)^2$, adds less than $2.27\epsilon q/r^2$. The total is below $5\epsilon q/r^2$, giving

$$
|w_t|\le(1+50\alpha^2)\rho<1.001\rho.
\tag{6}
$$

For example the integrated velocity cost is at most $10.5\alpha^2Q^2\le42\alpha^2\rho$, strictly inside (6). This explicit component estimate supplies information that reflection symmetry alone would not supply.

Use the analytic first-order comparison field

$$
F(y,w)=Q\left[-\frac y{|y|^3}
+\frac\alpha{|y|^2}(I-2\widehat y\widehat y^{\mathsf T})w\right].
\tag{7}
$$

On the convex tube $|y-n|\le0.1$, $|w|\le5$, the reflection matrix has norm one. Differentiating it gives $\|D_y[|y|^{-2}(I-2\widehat y\widehat y^{\mathsf T})]\|\le6/|y|^3$. Consequently

$$
|F|<6,
\qquad L_y<12,
\qquad L_w<5\alpha.
\tag{8}
$$

Backward comparison existence in this tube follows directly: its initial speed is at most four, its velocity changes by at most $6\ell\le0.0126$, and its position changes by at most $5\ell\le0.0105$. These bounds are strictly inside the tube and justify continuation through the full interval. The actual root has $d_y<2.01\alpha$. For the comparison, $g_z(0)=-2\alpha$, while $|n+z(-\ell)|\le2+0.0105<2.1$, so its root also lies inside. Both sampled chords and their joining segment stay within distance $0.1$ of $2n$. We may therefore take

$$
V_*=5,\quad A_*=6,\quad a_*=1.9,\quad
m\ge0.995,\quad L_S<1.2,\quad L_V<1.13,
\quad\vartheta\le36.96\alpha^2<0.000037.
\tag{9}
$$

The accepted second-order row implies, in its own instantaneous axes at each $a$,

$$
|A_r-F_{1,r}^{\rm phys}|\le\frac{10\epsilon^2}{r(a)^2h(a)^2},
\qquad
|A_t-F_{1,t}^{\rm phys}|\le\frac{4\epsilon^2q(a)}{r(a)^2h(a)}.
\tag{10}
$$

The radial coefficient is bounded by $Q(a)^2/2+1400\alpha(a)<10$; the transverse coefficient is bounded by $|P(a)|+30\alpha(a)<4$. These use the accepted actual ceiling at $a$, not a new claim that every enlarged auxiliary parameter value is a physical history.

Define $A_0=(1-9\alpha)^{-2}(1-20\alpha^2)^{-2}$ and $B_0=(1-9\alpha)^{-3}$. Multiply (10) by $rh^2$ and rotate through (5). The fixed-axis discrepancy in $y''=F+e$ obeys

$$
\begin{aligned}
|e_r|&\le\alpha^2[10\rho A_0+8.8\alpha\rho^3B_0]<42\alpha^2,\\
|e_t|&\le\rho\alpha^2[4\rho B_0+22\alpha\rho A_0]<17\rho\alpha^2.
\end{aligned}
\tag{11}
$$

All upper bounds are monotone in $0\le\alpha\le10^{-3}$ and $0\le\rho\le4$; substitution at those endpoints gives respectively coefficients below $41.32$ and $16.54$. Thus $|e|<80\alpha^2$. Applying (1) and (3) now gives the concrete isotropic comparison

$$
P<177\alpha^4,\quad V<169\alpha^3,
\qquad |\mathcal R_y-\mathcal R_z|<410\alpha^4.
\tag{12}
$$

For the response coefficient, the first two terms are below $1.2(177)/0.995+1.13(169)<405$; the remaining term is below $0.002$ at the auxiliary ceiling. There is ample margin within 410.

## The transverse factor survives both clocks

Reflection equivariance says $F_t$ vanishes on the radial invariant subspace. It does not by itself bound an arbitrary actual transverse forcing. We use the stronger actual component estimate (11) and derive comparison component bounds before using reflection in the differential estimate.

Writing $R=|y|$, the transverse comparison field is

$$
F_t=Q\left[-\frac{y_t}{R^3}+\alpha\left(\frac{w_t}{R^2}-\frac{2(y\cdot w)y_t}{R^4}\right)\right].
$$

On the tube, $|F_t|\le6|y_t|+5\alpha|w_t|$. Since $z_t(0)=0$ and $z'_t(0)=\rho$, backward integration gives

$$
\|z'_t\|_\infty\le\frac{\rho}{1-6\ell^2-5\alpha\ell}<1.001\rho,
\quad
\|z_t\|_\infty<2.11\alpha\rho,
\quad
\|z''_t\|_\infty<18\alpha\rho.
\tag{13}
$$

The joining phase-space segments consequently satisfy $|y_t|\le2.3\alpha\rho$, $|w_t|\le1.01\rho$. The transverse diagonal derivative bounds follow from (8). Direct differentiation gives the additional bounds

$$
|\partial_{y_r}F_t|<60\alpha\rho,
\qquad |\partial_{w_r}F_t|<30\alpha^2\rho.
\tag{14}
$$

For transparency, the first derivative before taking absolute values is

$$
Q\left[\frac{3y_ty_r}{R^5}+\alpha\left(-\frac{2y_rw_t}{R^4}-\frac{2w_ry_t}{R^4}+
\frac{8(y\cdot w)y_ty_r}{R^6}\right)\right].
$$

Its coefficient is below $54\alpha\rho$ using $R\ge0.9$, $|w|\le5$ and the stated transverse tube. The second derivative is $-2Q\alpha y_ry_t/R^4$, whose bound is below $26\alpha^2\rho$. The rounded constants in (14) retain margin.

Let $P_t=\|y_t-z_t\|_\infty$ and $V_t=\|y'_t-z'_t\|_\infty$. In their integral equations, the radial cross terms contribute at most

$$
60\alpha\rho P+30\alpha^2\rho V
<15690\rho\alpha^5.
$$

Together with (11), this is below $18\rho\alpha^2$. Applying the same denominator $1-\vartheta$ to the transverse diagonal terms gives

$$
P_t<40\rho\alpha^4,\qquad V_t<38\rho\alpha^3.
\tag{15}
$$

The clock displacement in (2) is below $178\alpha^5$. Equations (13) and (15) imply

$$
|\delta S_t|<41\rho\alpha^4,\quad
|\delta S|<178\alpha^4,\quad
|\delta w|<170\alpha^3,\quad
|S_{z,t}|<2.2\alpha\rho.
\tag{16}
$$

In particular the changed clock multiplies a comparison transverse speed of order $\rho$; it does not create a transverse error independent of $\rho$. Its transverse sampled-velocity contribution is similarly bounded by $18\alpha\rho|\delta d|$.

Set $K(S,v)=|S|^{-3}(1+\widehat S\cdot v)^{-1}$. On the response tube,

$$
|K|<0.147,\qquad \|D_SK\|<0.24,\qquad \|D_vK\|<0.15.
$$

The exact product difference for $\mathcal R_t=-4S_tK$, together with (16), therefore gives

$$
\begin{aligned}
|\delta\mathcal R_t|
&\le0.59|\delta S_t|+4|S_{z,t}|(0.24|\delta S|+0.15\alpha|\delta w|)\\
&<[24.19+600.336\alpha]\rho\alpha^4
<25\rho\alpha^4.
\end{aligned}
\tag{17}
$$

Equations (12) and (17) are derived actual-mirror-to-comparison response bounds under (4). In physical slow acceleration units they are $410\epsilon^4/(r^2h^4)$ isotropically and $25\epsilon^4q/(r^2h^3)$ transversely. They do not yet include the Taylor truncation of the comparison response. The limiting zero-transverse analytical control has $z_t=0$, $e_t=0$, hence $y_t=0$ and $\mathcal R_t=0$; it checks the structural factor without dividing by zero or declaring an additional physical history.

## Finite-order iteration and the first remaining obligations

There is a credible conditional induction that avoids differentiating actual residuals. Suppose a pointwise analytic comparison field $F_m$, consistently expressed at every receiver, already approximates the actual rescaled acceleration by $O(\alpha^{m+1})$ throughout every needed source window. Suppose its finite derivative bounds, common tube, root margins and Taylor bounds are uniform on a declared parameter set. The integral comparison makes its evaluated response differ from the actual one by $O(\alpha^{m+3})$. Analytic dependence of the short comparison solution and the implicit source root then allows Taylor expansion through degree $m+2$, producing a candidate $F_{m+2}$ with error $O(\alpha^{m+3})$. This proves an induction step once those hypotheses and the pointwise consistency of the newly assembled field are verified.

For each fixed finite order, the ODE and implicit root are analytic on a nonsingular local tube, so finite Taylor remainders can in principle be bounded there. This does not assume an analytic history flow. Uniformity as $q$ tends to zero requires a componentwise induction: bounded reflection-compatible mixed derivatives, transverse paths of size $O(hq)$, and an actual residual retaining that factor. Reflection permits such a weighted estimate after these bounds; it cannot replace them. A single reception jet is also insufficient to define a comparison field on the whole window. Each new step needs the preceding estimate at every receiver in that window and the associated earlier generated sources. For a finite number of steps one may impose a correspondingly later source condition and, if necessary, a smaller small-parameter ceiling. No common all-order radius, convergence of the resulting formal series, or uniform constants in the order are proved here.

The first remaining inequality for a completed cubic mirror row by this route is an explicit fourth-order Taylor enclosure of the analytic comparison response on the tube, retaining a factor $q$ in its transverse component. The earlier independent cubic reference offers a different route and remains separately assessable. The first additional obstacle to transferring this comparison to the original nominal/spatial member is a declared full-window bound for its extra centered-history forcing with its two actual source clocks and normal components. Such forcing need not carry a factor $q$. Neither (11) nor (17) can be assigned to it by symmetry. Early-seam control and accumulated seed or phase integration are further obligations, not consequences of a local comparison.

## Disposition, preservation and falsifiers

Accept the subject's conditional isotropic lemma as written. Accept the derived mirror application (12), (17) only on the complete generated common window (4) and inherited wider-regime hypotheses. Accept the finite-order route as a conditional induction mechanism, not an already completed hierarchy or an analytic-flow theorem. Reject any inference of actual nominal-family phase/fate, any automatic transverse factor for an arbitrary bounded forcing, or any use of the enlarged comparison window without checking source coverage.

Falsifiers are a backward integral with the wrong sign or factor, a root outside the declared interval, a joining segment crossing the chord or denominator singularity, loss of the fixed-axis component bound (11), a missed radial-to-transverse derivative in (14), or an ODE Taylor coefficient/remainder exceeding its claimed bound. These are inspectable in the displayed integrals, exact derivative and explicit endpoint inequalities. A nominal history with additional forcing is outside the mirror application, not a counterexample to its conditional statement.

Measured source identities by `shasum -a256`, before authoring and again at closeout, are recorded below. This review writes only this new analysis. No subject, prior reference, shared report, physical preparation, production source, Git state or generated owner is changed. No numerical target, CPU job, new arithmetic instrument or external source was used. The simple endpoint arithmetic above is an analytical inequality calculation, not a reported computational receipt.

| Read-only source | SHA-256 |
| --- | --- |
| Source-comparison subject | `8c02dc405f4b0d023bd0a06fd16f202cf51a5e2f46ebc8cfc40b61b9c84809e9` |
| Wider mirror subject | `d8fc54a977a7aef6aabe9af3c645fad3aa8f34db841025413d33033e3c41d689` |
| Wider mirror assessment | `94f279458db71131c0f83879745d380313e1b6627e84a62523675706d4716640` |
| Earlier cubic reference | `d051660d4a64f03acc778abc8f68ae3ecbd8df3966c081954aee763b74d6340c` |

The established known-first document checker is run on this file at closeout. Its result concerns mathematical rendering, whitespace and local links only; mathematical acceptance rests on the independently reconstructed argument above. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) retains integration ownership.

**Freeze receipt, 2026-10-07 05:42 UTC.** `node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs reference/priorities/master-equation-closure/binary-research/analysis/overnight2-a-reference-local-ode-comparison.md` passed its known controls first, then all 155 mathematical spans and five local links, with no whitespace diagnostics. The four-source `shasum -a 256` closeout command returned exactly the identities in the table. These checks establish document validity and byte preservation within their stated scope. The coordinator's new evaluated-comparison subject and degree-five output remain unread at this freeze. This new reference is ready for the coordinator's separate mathematical assessment; it has not assessed itself by implementation parity.
