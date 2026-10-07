# Exact radial source memory and the remaining nominal entry obligation

**Derived subject, frozen for independent assessment.** On the actual negative-account passage from $D=3\times10^{29}R_0$ to first $L=4D$, the complete moving-clock radial defect admits a much sharper estimate than the inherited $6k\chi$ bound. Its contribution to the signed radial account over that whole passage is less than $9\times10^{-59}$, even allowing inward excursions. This does not establish the missing radial-entry sign. It identifies precisely the remaining geometric history integral and shows why local delay accuracy alone does not select the nominal branch.

This note uses the unchanged literal nominal tokens and complete-extension/spatial-neighborhood class in the [first-zero subject](authorized-cases-two-hour-d-subject-inward-zero.md). Its full-spatial negative-only argument through first $L$ is used here; the minor positive-stage exponential justification identified during its independent review is irrelevant to the negative portion and is not reused. No new independent signed-memory derivation was read before this note was frozen. The separately frozen reference on the prior affine limitation had already been read; it is named below with that disclosed provenance.

## 1. Current-affine comparison with every source moment retained

Fix an actual reception time $t$, receiver $i$ and opposite source $j$. Let $Z_i=X_i(t)-X_j(t)=dN_i$, $V=V_j(t)$ and $A(s)=X_j''(s)$ on the complete actual source history. Define lag moments

$$
B(r)=\int_0^r A(t-s)\,ds,\qquad
E(r)=\int_0^r(r-s)A(t-s)\,ds.
\tag{1}
$$

Then $X_j(t-r)=X_j(t)-rV+E(r)$ and $V_j(t-r)=V-B(r)$. For $0\le\lambda\le1$, interpolate the source functional by

$$
X_j^\lambda(t-r)=X_j(t)-rV+\lambda E(r).
\tag{2}
$$

Its source velocity is the convex combination $(1-\lambda)V+\lambda V_j(t-r)$. It retains a complete strict speed bound and agrees with the actual source at $\lambda=1$. At $\lambda=0$ it is precisely the current-affine comparison, not an actual coupled continuation. The receiver position remains fixed for this directed functional comparison. Each receiver has its own root throughout.

Write

$$
R=|S|,\quad S=Z_i+RV-\lambda E(R),\quad n=S/R,\quad
v_\lambda=V-\lambda B(R),\quad D_\lambda=1-n\cdot v_\lambda.
\tag{3}
$$

The ordinary complete root is unique. A local strict speed bound $\beta$ on the entire root window gives $d/(1+\beta)\le R\le d/(1-\beta)$ and $D_\lambda\ge1-\beta$. The complete remote history establishes uniqueness and self-root exclusion; the local estimate merely locates this same root.

All subscripts $\lambda$ on derivatives below mean total differentiation, including the moving root. Put $E_n=n\cdot E$, $E_\perp=E-E_nn$, $B_n=n\cdot B$, $A_n=n\cdot A(t-R)$ and $v_\perp=v_\lambda-(n\cdot v_\lambda)n$. Direct differentiation yields

$$
R_\lambda=-E_n/D_\lambda,\qquad
S_\lambda=v_\lambda R_\lambda-E,\qquad
(v_\lambda)_\lambda=-B-\lambda A(t-R)R_\lambda,
\tag{4}
$$

$$
(D_\lambda)_\lambda
=B_n+\frac{v_\perp\cdot E_\perp}{R}
+\frac{|v_\perp|^2E_n}{D_\lambda R}
-\frac{\lambda A_nE_n}{D_\lambda}.
\tag{5}
$$

The last term is the actual source-acceleration contribution from changing the sampled time. It remains present although the canonical row itself depends only on source velocity.

Set $\zeta=N_i\cdot n$ and $N_\perp=N_i-\zeta n$. The canonical directed acceleration is $F_i^\lambda=-Kn/(R^2D_\lambda)$. Equations (4)–(5) give the exact current-radial identity

$$
N_i\cdot\partial_\lambda F_i^\lambda
=\frac{K}{R^2D_\lambda^2}\left\{
\zeta\left[
\mathcal C+\frac{v_\perp\cdot E_\perp}{R}
+\frac{|v_\perp|^2E_n}{D_\lambda R}
-\frac{\lambda A_nE_n}{D_\lambda}
\right]
+\frac{N_\perp\cdot(D_\lambda E_\perp+v_\perp E_n)}R
\right\},
\tag{6}
$$

where

$$
\mathcal C=B_n-\frac{2E_n}{R}
=\int_0^R(2s/R-1)n\cdot A(t-s)\,ds.
\tag{7}
$$

All vectors in (6) are evaluated at that receiver's $\lambda$-dependent root. In particular $n$ is held fixed only within the lag integral in (7), not across $\lambda$ or receiving times. If $e_r=N\cdot(e_+-e_-)$ is the actual-minus-affine relative radial defect, with $N_+=N$ and $N_-=-N$, then

$$
e_r(t)=\sum_{i\in\{+,-\}}\int_0^1
N_i\cdot\partial_\lambda F_i^\lambda(t)\,d\lambda.
\tag{8}
$$

This sums both independent clocks. It is not one averaged clock.

## 2. Meaning of the signed source functional and analytical controls

The two halves of the weight in (7) each have absolute integral $R/4$. Thus $\mathcal C$ is $R/4$ times the difference between an older weighted average of $n\cdot A$ and a recent weighted average. A magnitude bound on acceleration alone gives no ordering of these two averages. If $A$ is constant on the sampled interval, $\mathcal C=0$ exactly. More generally

$$
|\mathcal C|\le\frac R4
\operatorname{osc}_{[t-R,t]}(n\cdot A).
\tag{9}
$$

If generated acceleration is locally Lipschitz, its almost-everywhere derivative gives

$$
\mathcal C=-\frac1R\int_0^R s(R-s)n\cdot A'(t-s)\,ds,\qquad
|\mathcal C|\le\frac{R^2}{6}\operatorname*{ess\,sup}|A'|.
\tag{10}
$$

These identities do not assume a globally smooth supplied acceleration.

Two direct analytical controls precede application to the actual history. For $A=0$, all terms in (6) vanish, as required by equality of the affine and actual functional. For the scalar radial algebra with $V=0$, fixed $d$ and a constant sampled acceleration $aN_i$, the local root obeys $d=R+\lambda aR^2/2$ and $D_\lambda=1+\lambda aR$. Formula (6) reduces to

$$
N_i\cdot\partial_\lambda F_i^\lambda
=-\frac{K\lambda a^2}{2D_\lambda^3}.
\tag{11}
$$

Solving the quadratic root gives the same derivative directly. This checks both the cancellation in (7) and the retained moving-acceleration sign. It is a row-identity control, not a new physical preparation or an asserted coupled solution. Scalar affine functions of lag with slopes of either sign also check that the covariance functional in (7), considered on bounded functions alone, has either sign. This is not a claim that both choices occur in the nominal generated history.

## 3. Three-level generated coverage on the actual late negative passage

Consider only the remaining branch on which $J<0$ until first $L$. The [accepted negative extension](authorized-cases-account-d-subject-negative-extension.md) supplies, after first $D$,

$$
\chi<5\times10^{-24},\qquad
\int_{T_D}^{t}k\chi\,ds\le\frac23j_D,\qquad
0<j_D=-J(T_D)<2.001\chi_D<3.335\times10^{-36}.
\tag{12}
$$

The new negative-only reserve through first $L$ gives throughout the earlier and current negative prefix

$$
M<m_-:=1.65\times10^{-17},\quad
|U|^2\le4.04\chi,\quad
\max_i|V_i|<.0095.
\tag{13}
$$

First attainment of $D$ occurs after physical time $50D$: indeed $d(10)<3R_0$, $|d'|<.019$, and $10+(D-3R_0)/.019>50D$. Subsequently $(t-4d)' > .924$, so $t-4d(t)>10$ on the whole passage.

For a fixed time in this passage put $I_t=[t-4d,t]$. Equation (13) implies, for $s\in I_t$,

$$
.92d<d(s)<1.08d,\qquad
|U(s)|<2.1\sqrt\chi,\qquad
|V_i(s)|<b:=m_-+1.05\sqrt\chi<3\times10^{-12}.
\tag{14}
$$

Here the first estimate uses the earlier global speed bound, and the latter two then use the actual negative account at those sampled times. There is no circular replacement by current speeds.

The first clock range is less than $1.001d$. Each subsequent receiver has separation below $1.08d$ and a partner range below $1.081d$ within this local speed chart. Consequently the first source, its source, and the additional source needed to evaluate the acceleration appearing in the derivative of its row all lie after $t-3.243d>t-4d$. The complete causal gap is monotone; its sign at each proposed local endpoint locates its unique complete root in this interval. Thus all three levels are generated, not just the first two. For the receiving points used below,

$$
|A_i|\le1.2k.
\tag{15}
$$

This follows from $|A_i|\le K(1+b)^2/[(1-b)d(s)^2]$ and $d(s)>.92d$.

Generated acceleration is locally Lipschitz: the canonical row is smooth on the ordinary positive-range chart, its sampled velocity is locally Lipschitz, and its root is locally Lipschitz. Differentiating it almost everywhere uses sampled acceleration, not sampled jerk. Let $\mathscr R,\mathscr D,\mathscr n$ denote a source receiver's own partner range, denominator and direction, and let $\delta v$ be its current receiver velocity minus its sampled partner velocity. Then

$$
|\delta v|\le2.1\sqrt\chi+1.32\chi<2.2\sqrt\chi,\qquad
.9d<\mathscr R<1.1d,
$$

$$
|A_j'|
\le\frac{K}{\mathscr R^3}
\left[
\left(\frac3{(1-b)^2}+\frac b{(1-b)^3}\right)|\delta v|
+\frac{\mathscr R(1+b)}{(1-b)^3}\,1.2k
\right]
<\frac{10k\sqrt\chi}{d}.
\tag{16}
$$

For example the bracket coefficients are bounded by $3.01$ and $1.01$, and division by $.9^3$ leaves less than $10\sqrt\chi$ using (12). The root derivative used here is $(1-\mathscr n\cdot V_j)/\mathscr D$ and is not set to one. Propagated derivative seams are allowed in the almost-everywhere formula.

## 4. A sharp actual radial defect and its accumulated contribution

For the primary interpolated row, (14) gives $|N_\perp|\le b$, $|v_\perp|\le b$, $|E|\le1.2kR^2/2$ and $R<1.001d$. The angular bound follows directly by crossing $n=dN_i/R+$ the average interpolated source velocity with $N_i$.

Equations (10) and (16) give $|\mathcal C|<1.68\chi\sqrt\chi$. The remaining terms inside braces in (6) are bounded by

$$
1.2kR\left[b(1+b)+\frac{b^2}{2(1-b)}\right]
+\frac{(1.2k)^2R^2}{2(1-b)}
<1.21b\chi+.73\chi^2.
\tag{17}
$$

Also $K/(R^2D_\lambda^2)<1.001k$. Summing both directed rows and integrating $\lambda$ therefore gives

$$
|e_r(t)|
<2.002k\chi(1.68\sqrt\chi+1.21b+.73\chi)
<k\chi(7\sqrt\chi+3m_-).
\tag{18}
$$

The last inequality substitutes $b=m_-+1.05\sqrt\chi$ and $\sqrt\chi<2.24\times10^{-12}$. At the actual first $L$ endpoint, $\chi_L< (5/12)\times10^{-36}$ and $\sqrt{\chi_L}<6.46\times10^{-19}$, so

$$
|e_r(T_L)|<6\times10^{-17}k(T_L)\chi_L.
\tag{19}
$$

This is an actual generated-history bound, not a replacement of the defect by zero.

For the [signed radial account](authorized-cases-account-d-radial-transfer.md), as corrected by its [independent assessment](authorized-cases-account-d-reference-radial-assessment.md),

$$
F(u)=u-2\log(1+u/2),\qquad
P=\chi-F(u)+\frac32\chi^2,
$$

$$
P'=-G-\frac{u}{2+u}e_r,\qquad
G=\frac{2ku(1-g)}{2+u}
+\frac{u}{2+u}\left(\frac{|v|^2}{d}+Q_r\right)
+3ku\chi.
\tag{20}
$$

On an outward component $G\ge0$. Across an inward excursion it retains its displayed signed value. Equations (12), (13) and (18) prove on the entire actual negative passage, without assuming $u\ge0$,

$$
\begin{aligned}
\left|\int_{T_D}^{t}\frac{u}{2+u}e_r\,ds\right|
&\le1.06\sqrt{\chi_{\max}}
(7\sqrt{\chi_{\max}}+3m_-)\int_{T_D}^{t}k\chi\,ds\\
&<9\times10^{-59},
\qquad \chi_{\max}=5\times10^{-24}.
\end{aligned}
\tag{21}
$$

Indeed $|u|/(2+u)<1.06\sqrt\chi$, the leading coefficient is below $3.73\times10^{-23}$, and the integral is below $(2/3)(3.335\times10^{-36})$. On any single outward component with endpoints $a,b$, changing variables by $\chi'=-ku$ gives the sharper bound

$$
\int_a^b\frac{u}{2+u}|e_r|\,ds
\le\frac75(\chi(a)^{5/2}-\chi(b)^{5/2})
+\frac{3m_-}{4}(\chi(a)^2-\chi(b)^2).
\tag{22}
$$

The full-passage bound (21), rather than an unproved monotonicity of distance, is the one used for the remaining actual alternative.

## 5. What is and is not decided

The actual endpoint obeys the explicit enclosure

$$
P(T_L)=P(T_D)-\int_{T_D}^{T_L}G\,ds+\delta,
\qquad |\delta|<9\times10^{-59}.
\tag{23}
$$

Thus the late signed source covariance has been quantitatively controlled in absolute accumulated size. Its unknown sign is no longer the dominant obstruction on this late finite passage. To certify the radial entry, the still missing preparation-specific inequality is a signed geometric integral large enough to make the right side nonpositive, or a direct quantitative lower bound on $u(T_L)$.

The accepted first-attainment information gives only $u(T_L)\ge0$. Since $F(u)\le u^2/4$ for $u\ge0$, $P\le0$ requires at least $u\ge2\sqrt\chi$. The available negative-account speed enclosure permits radial speeds all the way down to zero. At $u=0$, the algebraic value would be $P=\chi+(3/2)\chi^2>0$; this is an admissible value of the existing enclosure, not an assertion that the nominal trajectory takes it. At the fixed $L$, $\chi_L> (1/3)\times10^{-36}$, so the residual budget in (23) is less than $3\times10^{-22}\chi_L$. Merely improving that residual does not supply an order-$\sqrt\chi$ radial lower bound.

Nor does monotone decrease of $P$ on outward components force a finite crossing. The already accepted full-affine comparison, examined in the separately frozen [radial nonimplication reference](authorized-cases-two-hour-d-reference-radial-obstruction.md), has both $J<0$ and $P>0$ approaching zero at every finite point. That reference was read after the first-zero subject freeze and before this note; agreement with it is not claimed as a second blind derivation. It remains a comparison-information obstruction, not a nominal-history counterexample.

The exact remaining obligation is therefore sharper than a generic delayed-error gap: establish the actual signed integral in (23), obtain the missing radial lower bound, or prove a frame-free continuation of the negative future. This note does not close any of those alternatives and does not infer physical failure from the inability of the present bound to select them.

## Provenance and validation

Source SHA-256 identities, measured by shasum:

| Source | SHA-256 |
| --- | --- |
| Actual negative extension | d2c6bec096283f0a2b85c606e1535a5e1847bf9179b64ee33d2cff2c331978a2 |
| Actual scalar-account identities | 2cc51820a0122215e5501747e78605894f71df6016d972d0801c9d8c5f223e16 |
| Signed radial subject | 21e87619949413d0168f385bd305268f12848a9029dd991b3975915ddfd7b278 |
| Corrected signed radial assessment | cb1b0c9ce9a42d2501226dcf94ef222ebcf30fa6e988eb548cc98a6ff7a494e4 |
| New first-zero subject | 690bfd3c7879717c6ee482e64393c783bdae41973996b8f7fa9863d98ba8e33d |

All scientific claims here are derived candidates. The analytical controls in section 2 precede actual application. The existing document checker passed its known controls before the target; its target result concerns syntax and links only. No scientific computation or new instrument was used.

Falsifiers include a sign error in (4)–(6), omission of the moving source acceleration, incorrect three-level coverage, a hidden smoothness demand in (16), failure of the actual coefficient in (18), or invalid use of $\chi$ as a monotone variable across an inward excursion. Equation (22) is deliberately restricted to outward components; equation (21) covers the entire finite passage. A separately proved lower bound on the actual signed geometric integral would resolve the stated missing obligation rather than refute the identities. No owned scientific process is active and no prior frozen or shared source was edited.

