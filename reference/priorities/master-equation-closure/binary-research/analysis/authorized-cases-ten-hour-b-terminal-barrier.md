# A finite account test for positive terminal speed

**Status: derived candidate submitted for independent review.** Retain exactly the member selected in the [terminal-branch record](authorized-cases-ten-hour-b-terminal-branch.md): $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$, and its unchanged complete cutoff and compatible polynomial. This test uses the already [independently admitted all-future theorem](authorized-cases-ten-hour-reference-b-adjudication.md#5-current-adjudicated-conclusion). It does not yet establish that the selected history passes the test.

Write $r=|y|$, $p=r'$, $v=y'$, $h=(y\times v)\cdot\hat z$, $\gamma=4\epsilon^3/3$ and

$$
\mathcal E=\frac{|v|^2}2-\frac1r-\frac{\epsilon^2h^2}{2r^3}-\frac{\gamma p}{r^2}.
$$

The new sufficient test is the finite-state inequality

$$
\boxed{\qquad
\mathcal E(s)\ge-\frac{\gamma}{4r(s)^{5/2}}
\quad\Longrightarrow\quad |v_\infty|>0.
\qquad}
\tag{1}
$$

It applies to the actual admitted history at any finite reception. A strictly positive account is not necessary for this test, though the conclusion still follows through a future positive crossing. The account is mathematical bookkeeping; no physical energy assumption enters.

## Known analytical control

For the central parabolic radial control $r'=\sqrt{2/r}$, direct substitution $ds=\sqrt{r/2}\,dr$ gives

$$
\int_s^\infty r(t)^{-4}\,dt
=\frac{\sqrt2}{5}r(s)^{-5/2}.
$$

A comparison account with derivative $\gamma/r^4$ and zero limiting value is therefore $-(\sqrt2/5)\gamma r^{-5/2}$. Its coefficient is greater than $1/4$, so it does not pass the proposed sufficient test. This checks the direction and normalization before applying the argument to the actual delayed history. The control is not asserted to solve that delayed equation.

## Proof on the actual zero-speed alternative

Suppose, for contradiction, that the selected member has zero terminal velocity. The admitted theorem then puts it on the nonpositive-account branch for all future time. It gives $r\to\infty$, $\mathcal E\to0$, $r\ge2^{-13}$, the provisional bound $|v|^2r\le4$, and the exact account identity. That identity yields

$$
|v|^2r
\le2+\frac{4\epsilon^2}{r}
+\frac{16\epsilon^3}{3r^{3/2}}<\frac94.
\tag{2}
$$

The last strict inequality follows immediately from the fixed dyadic parameter and the proved radius floor. This is a sharpening of the earlier bound three, using the same actual account. In particular $p\sqrt r\le|v|\sqrt r<3/2$; $p$ need not be positive.

The admitted relative rate error is at most $2^{50020}\epsilon/\sqrt r<1/64$, so

$$
\mathcal E'\ge\frac{63}{64}\frac\gamma{r^4}.
\tag{3}
$$

For every finite $T>s$, the chain rule and (2) give

$$
r(s)^{-5/2}-r(T)^{-5/2}
=\frac52\int_s^T p(t)r(t)^{-7/2}\,dt
\le\frac{15}{4}\int_s^T r(t)^{-4}\,dt.
$$

This inequality holds through inward excursions as well, since their negative $p$ only lowers the left integral. Let $T\to\infty$ and use $r(T)\to\infty$ to obtain

$$
\int_s^\infty r(t)^{-4}\,dt
\ge\frac4{15}r(s)^{-5/2}.
\tag{4}
$$

On the zero-speed alternative, integrate (3) toward the zero account limit:

$$
-\mathcal E(s)=\int_s^\infty\mathcal E'(t)\,dt
\ge\frac{63}{64}\frac4{15}\gamma r(s)^{-5/2}
=\frac{21}{80}\gamma r(s)^{-5/2}.
\tag{5}
$$

Since $21/80>1/4$, (5) contradicts the premise of (1), including equality there. The admitted two-branch theorem then supplies a future positive crossing, its exact escape cone and a nonzero limiting vector. This proves the sufficient test without assuming that the tested reception is already outward or that a particular excursion is final.

The proof actually supplies the stronger necessary zero-speed bound (5). An actual finite value larger than $-(21/80)\gamma r^{-5/2}$ also excludes that alternative. The simpler coefficient $1/4$ leaves a fixed rational slack of $1/80$.

## The precise remaining selected-history inequality

Define the finite observable

$$
Z(s)=\mathcal E(s)+\frac{\gamma}{4r(s)^{5/2}}.
$$

While the account is nonpositive, (2)–(3) imply

$$
Z'=\mathcal E'-\frac{5\gamma}{8}\frac p{r^{7/2}}
\ge\frac3{64}\frac\gamma{r^4}>0.
\tag{6}
$$

At the selected release, $Z(0)=-1/[2(1-\epsilon^2/2)]+\gamma/4<0$. Monotonicity alone still does not imply a finite zero: on the zero-speed alternative, (5) keeps $Z\le-\gamma/(80r^{5/2})<0$ while $Z\to0$. The unresolved source-to-entry statement is now the explicit inequality $Z(s)\ge0$ at some actual finite reception, or a separate asymptotic argument that it never occurs. No such reception has been established.

Thus this lemma sharpens the branch certificate but leaves the exact member's terminal speed unresolved. It uses no numerical trajectory or finite-tail extrapolation. Falsifiers are an error in the actual speed sharpening (2), the sign or coefficient of the chain-rule identity, failure of the admitted nonpositive-branch limit, or a member satisfying (1) while also obeying the necessary zero-speed bound (5).
