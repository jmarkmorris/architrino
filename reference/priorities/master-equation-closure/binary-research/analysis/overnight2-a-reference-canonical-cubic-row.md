# Independent cubic mirror-row derivation and a generated-window remainder

**Derived reference, pending independent assessment.** The degree-three radial and tangential coefficients from the stated generated jets are respectively $4p/(3r^3)$ and $-5q/(3r^3)$. The implicit delay and the delayed source acceleration both contribute. They cannot be obtained by assigning an independently chosen delay or by retaining only the affine-source response.

This reference also derives a conservative candidate uniform fourth-order bound on a later, explicitly generated mirror window. Its stronger source condition is $\sigma^2(s)\ge s_*=10\epsilon$. It preserves a factor of $q$ in the transverse remainder and uses an exact first derivative of the delayed row, not differentiation of a previously bounded error. The original canonical nominal/spatial pair is not replaced by this mirror reference. Transferring the refinement to that nonmirror family, controlling its early seam contribution and integrating a new corrected seed remain separate obligations.

The derivation uses the Jack K. Hale lens with explicit arithmetic bounds. It reads the [formal method](overnight2-a-canonical-cubic-method.md), the frozen [wider mirror theorem](slow-binary-wider-regime.md), its [accepted assessment](slow-binary-wider-regime-independent-adjudication.md), and the [canonical per-hit row](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration). No new cubic instrument, target receipt or subject-result file is read before this reference is frozen. The coordinator later suggested a local-ODE comparison for bounding the remainder; that suggestion is not used in the direct differentiation proof below.

## Exact row and analytical controls

Use the receiving fixed Cartesian axes $n(s),t(s)$, with $Y=(r,0)$, $V=(p,q)$ and slow time $s$. In the canonical mirror specialization,

$$
S=Y(s)+Y(\sigma),\quad R=|S|,\quad N=S/R,
\quad u=s-\sigma=\epsilon R,
\quad D=1+\epsilon N\cdot V(\sigma),
\quad A=-\frac{4N}{R^2D}.
\tag{1}
$$

The normalization is the original $c_f=1$ scaling. The transmitter factor $D$ is the acceleration denominator; receiver velocity appears in clock playback, not as an extra multiplier. Complete strict histories retain the unique partner root and exclude positive-delay self roots.

For the affine-source control, $x=S_r/(2r)=1-\epsilon pL$, $y=S_t/(2r)=-\epsilon qL$ and $L=R/(2r)$. Consequently $N_t=-\epsilon q$, $N_r=\sqrt{1-\epsilon^2q^2}$, $L=(N_r+\epsilon p)^{-1}$ and $D=N_r(N_r+\epsilon p)$. Substitution gives exactly

$$
A_r^{\rm aff}=-\frac{\sqrt{1-\epsilon^2q^2}+\epsilon p}{r^2},
\qquad
A_t^{\rm aff}=\frac{\epsilon q+\epsilon^2pq/\sqrt{1-\epsilon^2q^2}}{r^2}.
$$

Both cubic coefficients vanish. This is a prescribed response control, not an affine coupled future. Another control is direct differentiation of $-Y/|Y|^3$: at reception it gives $(2p,-q)/r^3$, so the leading jerk includes the rotating-frame contribution even though all subsequent Taylor components are expressed in fixed reception axes.

## Independent coefficient calculation

Insert only the specified jets

$$
A_0=(-r^{-2},0),\quad A_1=(-pr^{-2},qr^{-2}),
\quad J_0=(2pr^{-3},-qr^{-3})
$$

into the formal source Taylor expansion. With $u=2\epsilon rL$, its normalized components are

$$
\begin{aligned}
x&=1-\epsilon pL-\frac{\epsilon^2L^2}{r}
-\frac{\epsilon^3p}{r}\left(L^2+\frac43L^3\right)+O(\epsilon^4),\\
y&=-\epsilon qL+\frac{\epsilon^3q}{r}\left(L^2+\frac23L^3\right)+O(\epsilon^4),\\
\epsilon V_{\sigma,r}&=\epsilon p+\frac{2\epsilon^2L}{r}
+\frac{\epsilon^3p}{r}(2L+4L^2)+O(\epsilon^4),\\
\epsilon V_{\sigma,t}&=\epsilon q-\frac{2\epsilon^3q}{r}(L+L^2)+O(\epsilon^4).
\end{aligned}
\tag{2}
$$

These formal $O$ symbols initially assert no uniform actual-history estimate. Dividing $y$ by the same implicit $L$ gives

$$
N_t=-\epsilon q+\frac{5\epsilon^3q}{3r}+O(\epsilon^4),
\qquad N_r=1-\frac{\epsilon^2q^2}{2}+O(\epsilon^4).
\tag{3}
$$

There is no cubic radial-direction term. The exact equation $x=LN_r$, rather than a separate delay prescription, yields

$$
L=1-\epsilon p+\epsilon^2\left(p^2+\frac{q^2}{2}-\frac1r\right)
+\epsilon^3\left(-p^3-pq^2+\frac{2p}{3r}\right)+O(\epsilon^4).
\tag{4}
$$

For example, its cubic residual before solving for that coefficient is $p^3+pq^2-2p/(3r)$: the $1/r$ terms from the acceleration, first-order acceleration and jerk jets must all be retained. Substitution in the actual transmitter factor then gives

$$
D=1+\epsilon p+\epsilon^2\left(\frac2r-q^2\right)
+\epsilon^3\left(\frac{4p}{r}-\frac{pq^2}{2}\right)+O(\epsilon^4).
\tag{5}
$$

Let $H=L^{-2}D^{-1}$. Multiplication before inversion provides a separate scalar check:

$$
L^2D=1-\epsilon p+\epsilon^2p^2
+\epsilon^3\left(-p^3-\frac{pq^2}{2}+\frac{4p}{3r}\right)+O(\epsilon^4),
$$
$$
H=1+\epsilon p+\epsilon^3\left(\frac{pq^2}{2}-\frac{4p}{3r}\right)+O(\epsilon^4).
\tag{6}
$$

Thus the known quadratic scalar-amplitude cancellation survives, but its next term is not zero. Multiplication by (3) cancels its $pq^2/2$ contribution in the radial component. The final formal row is

$$
\boxed{A_r=-\frac{1+\epsilon p-\epsilon^2q^2/2}{r^2}
+\frac{4\epsilon^3p}{3r^3}+O(\epsilon^4),}
$$
$$
\boxed{A_t=\frac{\epsilon q+\epsilon^2pq}{r^2}
-\frac{5\epsilon^3q}{3r^3}+O(\epsilon^4).}
\tag{7}
$$

Every second-order term agrees with the accepted row, and the transverse cubic retains $q$. No coefficient from a numerical or symbolic target was used in this calculation.

## A sufficient actual generated-window domain

For the following new remainder lemma, retain precisely the accepted mirror class $h\ge.99$, $|\mathbf e|\le3$, $0<\epsilon\le1/2000$, and write

$$
\alpha=\epsilon/h,\quad P=hp,\quad Q=hq=h^2/r,
\qquad |P|\le3,\quad 0<Q\le4.
$$

The proof uses the harmless larger algebraic ceiling $\alpha\le.001$. Require in addition that the second nested source at reception satisfies $\sigma(\sigma(s))\ge s_*=10\epsilon$. Monotone source playback then places every source $\sigma(a)$, for $a\in[\sigma(s),s]$, beyond the accepted generated entry. Its own source is positive by the accepted entry theorem. This covers the sampled accelerations used below and avoids imposing jerk data on the supplied $W^{2,\infty}$ past or differentiating across release.

This stronger condition is not asserted at $s_*$ itself. The old release estimate remains necessary until the condition is reached. The accepted global mirror speed bound makes source time tend to infinity, so this is a later generated-window condition, not a new preparation. It does not assign this mirror class to the actual nonmirror nominal family.

The accepted second-order row directly supplies present acceleration errors

$$
|(A-A_0-\epsilon A_1)_r|
\le10\frac{\epsilon^2}{r^2h^2},
\qquad
|(A-A_0-\epsilon A_1)_t|
\le4\frac{\epsilon^2q}{r^2h}.
\tag{8}
$$

Indeed its radial coefficient is at most $Q^2/2+1400\alpha\le9.4$, and its transverse coefficient at most $|P|+30\alpha\le3.03$. Neither bound is differentiated.

## Exact delayed-row differentiation instead of error differentiation

At a generated time $a$, let $b=\sigma(a)$ and use dots here only for slow-time differentiation at $a$. Define

$$
c=\dot\sigma=\frac{1-\epsilon N\cdot V(a)}D,
\quad F=V(a)+cV(b),\quad \rho=N\cdot F,
\quad \dot N=\frac{F-\rho N}{R}.
$$

Direct differentiation of (1) gives

$$
\dot D=\epsilon\{\dot N\cdot V(b)+N\cdot A(b)c\},
$$
$$
\boxed{\dot A=-\frac4{R^3D}
\left[F-3\rho N-\frac{R\dot D}{D}N\right].}
\tag{9}
$$

The delayed source acceleration $A(b)c$ is indispensable. Formula (9) requires no derivative of that acceleration. It holds almost everywhere under the retained regularity, which suffices for the integral Taylor formulas. Strict positive playback makes the source composition legitimate through those almost-everywhere identities.

Here is an explicit conservative bound on (9), uniformly in the first source interval and in reception axes. Applying the accepted radius, angular and $h$ comparisons twice gives radii in $[1-19\alpha,1+19\alpha]r$, angular displacement at most $4.2\epsilon q$, and earlier $h$ at least $(1-41\alpha^2)h$. The total two-window duration is below $4.04\epsilon r$. In particular velocities have norm below $4.1/h$, and their radial differences from $p$ are below $9\alpha/h$ on the first window and $20\alpha/h$ on the second. Their tangential differences from $q$ are below $50\alpha^2q$ and $200\alpha^2q$, respectively.

To check the transverse figures, the accepted first-window acceleration is bounded by $6\epsilon q/r^2$. On the two-window union, its own-frame transverse part is bounded by $2\epsilon h(b)/r(b)^3$, and rotation of its radial part costs at most $1.1(4.2)\epsilon q/r^2$. Their sum is below $8\epsilon q/r^2$. Integration over the two respective duration bounds gives the stated 50 and 200. This explicitly preserves $q$ at arbitrarily large radius.

It follows that $|c-1|<8.3\alpha$, $|F|<8.3/h$, $|F_r-2p|<64\alpha/h$, $|F_t-2q|<10\alpha q$, $|N_t|<4.2\epsilon q$, and $|N_r-1|\le282.24\alpha^2$. Therefore $|\rho-2p|<205\alpha/h$ and $|\rho N_r-2p|<207\alpha/h$. The exact denominator term in (9) satisfies

$$
\left|\frac{R\dot D}{D}\right|
<2.039\epsilon\left(\frac{17.63}{h^2}+\frac{1.10913}{r}\right)
<\frac{50\alpha}{h}.
$$

The first inequality uses $|\dot N|<4.3/(rh)$ and $|A(b)|<1.1/r^2$; the second uses $1/r\le4/h^2$. Also

$$
\frac4{R^3D}=\frac{1+\delta_B}{2r^3},\qquad |\delta_B|<50\alpha.
$$

For the last estimate, bound the three factors by $(1\pm9\alpha)^{-3}$, $(1\pm4.101\alpha)^{-3}$ and $(1\pm4.1\alpha)^{-1}$. The upper logarithmic bound is below $43.72\alpha$, whose exponential differs from one by less than $50\alpha$ at the stated ceiling. The lower estimate follows by the same product comparison.

The radial bracket of (9) differs from $-4p$ by less than $735\alpha/h$. The tangential bracket differs from $2q$ by less than $116\alpha q$. Including the prefactor error therefore proves the convenient bounds

$$
|\dot A(a)\cdot n(s)-2p/r^3|
\le1000\frac{\epsilon}{r^3h^2},
$$
$$
|\dot A(a)\cdot t(s)+q/r^3|
\le200\frac{\epsilon q}{r^3h}
\quad\text{for }a\in[\sigma(s),s].
\tag{10}
$$

They compare the whole source-window jerk to $J_0$ at reception. No snap estimate or derivative of the earlier $O(\alpha^3)$ defect is hidden in (10).

## Integral jets and an explicit fourth-order propagation

The integral Taylor formulas with (8) and (10) now justify the jets in the method. The radial position error is at most $u^2(10\epsilon^2/(r^2h^2))/2+u^3(1000\epsilon/(r^3h^2))/6$; the analogous velocity error replaces those coefficients by $u$ and $u^2/2$. The transverse estimates use their $q$-weighted counterparts. Since $u<2.01\epsilon r$ and $Q\le4$, the normalized exact rows can be written

$$
\begin{aligned}
x&=1-\alpha PL-\alpha^2QL^2
-\alpha^3PQ(L^2+4L^3/3)+\rho_x,\\
y&=-\alpha QL+\alpha^3Q^2(L^2+2L^3/3)+\rho_y,\\
\epsilon V_{\sigma,r}&=\alpha P+2\alpha^2QL
+\alpha^3PQ(2L+4L^2)+\rho_v,\\
\epsilon V_{\sigma,t}&=\alpha Q-2\alpha^3Q^2(L+L^2)+\rho_w,
\end{aligned}
$$

with

$$
|\rho_x|\le3000\alpha^4,\quad
|\rho_y|\le600\alpha^4Q,\quad
|\rho_v|\le9000\alpha^4,\quad
|\rho_w|\le1800\alpha^4Q.
\tag{11}
$$

For example, the pre-rounding radial position coefficient is $4[5(2.01)^2+(1000/6)(2.01)^3]/2=2747.268$, and the transverse position coefficient is $4[2(2.01)^2+(200/6)(2.01)^3]/2=557.5338$. These are rational inequalities, not instrument measurements.

Define the cubic polynomials

$$
L_3=1-\alpha P+\alpha^2(P^2-Q+Q^2/2)
+\alpha^3(-P^3-PQ^2+2PQ/3),
$$
$$
D_3=1+\alpha P+\alpha^2(2Q-Q^2)
+\alpha^3(4PQ-PQ^2/2),
\qquad
H_3=1+\alpha P+\alpha^3(PQ^2/2-4PQ/3).
$$

The accepted $|L-1|\le4.1\alpha$ and (11) first give

$$
|N_t+\alpha Q-(5/3)\alpha^3Q^2|<650\alpha^4Q,
\quad |N_r-1+\alpha^2Q^2/2|<200\alpha^4.
$$

For the implicit radial equation, hold the observed $N_r$ fixed and subtract its polynomial equation at $L_3$. Its derivative in $L$ exceeds $.99$ on the interval between $L$ and $L_3$. The pure polynomial degree-four-and-higher residual is below $841\alpha^4$, the direction replacement below $201\alpha^4$, and (11) contributes $3000\alpha^4$. Thus $|L-L_3|<4200\alpha^4$. This is the same valid implicit subtraction used by the accepted second-order proof; it does not declare the physical direction independent of the delay.

The normalized velocity errors after substitution are below $10000\alpha^4$ radially and $1900\alpha^4Q$ transversely. Product substitution in $D$ then gives $|D-D_3|<11000\alpha^4$. Finally, the polynomial $H_3L_3^2D_3-1$ has zero coefficients through degree three. An absolute coefficient majorant is

$$
(1+3z+40z^3)(1+3z+21z^2+83z^3)^2(1+3z+8z^2+72z^3).
$$

Its degree-four coefficient is 4710; at $0\le z\le.001$ the normalized higher tail is below 24. Thus the required residual is below $5000\alpha^4$. Replacing $L_3,D_3$ by $L,D$ adds less than $19700\alpha^4$, and $L^2D>.98$. It follows that

$$
|H-H_3|<30000\alpha^4.
$$

Multiplying by the direction bounds, including the finite polynomial product tails, proves the candidate uniform row

$$
\boxed{\left|A_r+\frac{1+\epsilon p-\epsilon^2q^2/2}{r^2}
-\frac{4\epsilon^3p}{3r^3}\right|
\le31000\frac{\epsilon^4}{r^2h^4},}
$$
$$
\boxed{\left|A_t-\frac{\epsilon q+\epsilon^2pq}{r^2}
+\frac{5\epsilon^3q}{3r^3}\right|
\le800\frac{\epsilon^4q}{r^2h^3}.}
\tag{12}
$$

For the transverse multiplication the three residual contributions are below $31\alpha^4Q$, $653\alpha^4Q$ and $61\alpha^4Q$, respectively; their sum is below 800. This avoids replacing the transverse error by an isotropic radius-independent allowance.

## Scope, remaining obligations and falsifiers

The formal coefficients (7) are independently derived before disclosure of any target output. The additional uniform estimate (12) is a new analytical candidate for separate assessment on the declared later generated mirror windows. It does not use or assert a new supplied mirror history. Its extra source condition must not be silently removed, and the original acceleration seam is still handled by the accepted release-layer argument.

For the actual canonical nominal/spatial investigation, the first remaining application obligations are an independently accepted version of (12), a controlled early-layer contribution through the stronger source-generation threshold, and a quantitative nonmirror transfer that retains the cubic signs and complete midpoint history. No corrected-seed integral, late radial sign, positive terminal speed or original-member fate is obtained here. Using the formal coefficient alone as an evolved production row would omit precisely these obligations.

Checkable falsifiers are a wrong sign in the source jerk, omission of $A(b)c$ in (9), loss of a sampled source from the generated region, invalid fixed-reception-frame rotation bounds, loss of $q$ in (10)–(12), or failure of the explicit polynomial residual budgets. The affine response control distinguishes a generated-source cubic contribution from an algebraic implementation artefact. No numerical agreement is offered as evidence before the independent expression is frozen.

Native `shasum -a 256` measured the formal method as `4ac50bd76acb96aa765e84ddccd51421cc80e48c30483dada48cfc370f1e8468`, the wider subject as `d8fc54a977a7aef6aabe9af3c645fad3aa8f34db841025413d33033e3c41d689`, its accepted assessment as `94f279458db71131c0f83879745d380313e1b6627e84a62523675706d4716640`, and the canonical Master Equation owner as `a3fa7047b1347c8743d385a12e38c9994dc1d25dcf63037a53a727670db95267` before drafting. Only this new reference is authored. No cubic producer, target receipt or result subject is inspected; no numerical process, new instrument, physical preparation, shared-owner edit, production change, generator, Git mutation, publication or recursive agent is used. The parent owns independent assessment and integration into [the main A report](overnight2-a-followup-and-research-2026-10-07.md).

**Independent freeze and document validation, 2026-10-07 05:29 UTC.** `node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs reference/priorities/master-equation-closure/binary-research/analysis/overnight2-a-reference-canonical-cubic-row.md` passed known controls before the target and then passed 148 math spans, five local links, one fragment and whitespace. That validation is syntactic, not acceptance of the new mathematics. Repeated native `shasum -a 256` returned the same four source identities above. The independent coefficients and new remainder candidate are frozen before any instrument, target or result disclosure. The bounded derivation is complete; the parent owns its independent adjudication and any comparison with the withheld symbolic result.
