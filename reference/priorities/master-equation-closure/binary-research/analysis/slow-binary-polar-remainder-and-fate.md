# Signed polar response and all-future slow-binary dispersal

A sufficiently slow supplied mirror pair cannot remain a bound near-circular object under the unchanged inverse-square Master Equation. The first-order transverse response creates a nonzero free eccentricity component. Its survival can be proved by retaining the signed second-order radial and transverse responses, instead of allowing an arbitrary error of that order to cancel it. The resulting theorem covers all future time, including elongated motion: the member radius tends to infinity, total orbital angle is finite, and velocity has a limit. The limit may be zero. Ballistic escape with a strictly positive limiting speed is a stronger statement that is not asserted here.

**Grade:** derived, author-checked and awaiting independent adjudication. This is a new subject, distinct from the frozen [changing-scale theorem](slow-binary-changing-scale-fate.md) and its [independent adjudication](slow-binary-changing-scale-independent-adjudication.md). The very small explicit speed restriction below is narrower than their restriction. The historical numerical binary is outside it. All calculations use $c_f=1$. No cap, event instruction, root deletion, physical mass, energy account or standard-physics law is assumed.

## Preparation and notation

Let $K=\kappa|q_+q_-|>0$, choose $R_0>0$, and put $v_0^2=K/(4R_0)$, $\epsilon=v_0/c_f$, $s=v_0T/R_0$ and $\mathbf Y(s)=\mathbf X_+(T)/R_0$. The other member has $\mathbf X_-=-\mathbf X_+$ in the complete supplied past. That past is a preparation, not an asserted solution before release. Use the exact preparation from the [finite secular theorem](slow-binary-controlled-secular-comparison.md): continuous planar positions and velocities, complete-past scaled speed at most two, recent $W^{2,\infty}$ data on $[-7\epsilon,0]$ with $3/4\le\|\mathbf Y\|\le5/4$, speed at most two and acceleration at most eight. At release require $|h_0-1|\le\epsilon$ and $\|\mathbf e_0\|\le\epsilon$. No jerk or acceleration continuity is added to these hypotheses.

The scalar $h=(\mathbf Y\times\mathbf Y')\cdot\hat{\mathbf z}$ measures angular motion in the fixed plane. Define $r=\|\mathbf Y\|$, $\mathbf n=\mathbf Y/r$, $\mathbf t=\hat{\mathbf z}\times\mathbf n$, $p=\mathbf Y'\cdot\mathbf n$, $q=\mathbf Y'\cdot\mathbf t=h/r$, and

$$
\mathbf e=\mathbf Y'\times(h\hat{\mathbf z})-\mathbf n,
\qquad e_n=\mathbf e\cdot\mathbf n,\quad e_t=\mathbf e\cdot\mathbf t.
$$

The coordinate identities are $1+e_n=h^2/r$, $p=-e_t/h$ and $q=(1+e_n)/h$. The orbital angle is chosen with $\theta(0)=0$ and obeys $\theta'=h/r^2$. These are geometric identities, not imported conservation laws.

The unique partner emission time is $\sigma=s-u$, where

$$
u=\epsilon R_d,\quad
R_d=\|\mathbf Y(s)+\mathbf Y(\sigma)\|,\quad
D=1+\epsilon\mathbf n_d\cdot\mathbf Y'(\sigma),\quad
\mathbf Y''=-\frac{4\mathbf n_d}{R_d^2D}.
$$

Here $\mathbf n_d$ is the unit vector along the delayed displacement. This is the [canonical acceleration row](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration), specialized to mirror opposite polarity. The full admitted root rule is retained. Strictly subfield complete histories have no positive-delay self root by the chord-speed inequality; they have exactly one partner root by the strictly monotone causal gap. Neither assertion is an imposed channel exclusion.

## All-future theorem

**Theorem.** For the supplied-history class above and $0<\epsilon\le10^{-16}$, the unchanged Master Equation has a unique planar mirror ordinary-root continuation for every $T\ge0$. Every member has one partner root and no positive-delay self root; physical member speed is at most $8v_0<c_f$. Both root factors exceed $1-8\epsilon$. The member radius tends to infinity, orbital angle has a finite limit and velocity has a limit. In scaled coordinates,

$$
r(s)\longrightarrow\infty,\qquad
\theta(s)\longrightarrow\theta_\infty<\frac{10}{\epsilon^2},\qquad
\mathbf Y'(s)\longrightarrow\mathbf V_\infty.
$$

The limiting direction is radial outward: $\mathbf V_\infty=p_\infty\mathbf n_\infty$ with $p_\infty\ge0$. The proof permits $p_\infty=0$. Thus the result establishes dispersal, meaning unbounded separation, and excludes an eternally bounded assembly for this preparation class. It does not establish a positive asymptotic speed, a universal radius-growth coefficient, or a fate theorem at the historical speed ratio.

## 1. Ordinary history coverage beyond the moderate class

Work provisionally in $h\ge1/2$, $\|\mathbf e\|\le3$. The only required radial estimate is

$$
r\ge\frac{h^2}{4},\qquad \|\mathbf Y'\|\le\frac4h\le8.
$$

There is no upper-radius assumption. Combining the constructed future with the complete supplied past gives a global physical speed ratio at most $8\epsilon$. Consequently the unique partner delay satisfies

$$
\frac{2\epsilon r}{1+8\epsilon}\le u\le\frac{2\epsilon r}{1-8\epsilon}<3\epsilon r,
\qquad \|\mathbf Y''\|\le\frac2{r^2}.
$$

Both root factors exceed $1-8\epsilon$. Emission time is strictly increasing with reception time because its derivative is the positive receiver factor divided by the positive transmitter factor.

Take $s_*=100\epsilon$. The accepted finite theorem supplies existence through this time, with $r$ between $0.9$ and $1.1$, $h$ near one and speed below two. Its bounded-defect angular equation gives strictly positive $h'$ on this short interval. Both the partner source at $s_*$ and that source's own partner source are positive: each of the two delays is less than $4\epsilon$, so the second source exceeds $92\epsilon$. Monotone emission time preserves this property thereafter. Thus every causal interval used below lies in the EOM-constructed future; no differentiability of the supplied acceleration is needed there. The supplied recent history remains necessary for the initial layer and is never replaced by a renewed circular past.

On a future causal interval, the initial global speed bound gives $|r(a)-r(s)|\le24\epsilon r(s)$. The direct bound $|h'|\le2/r$ then gives $|h(a)-h(s)|\le7\epsilon$. The angle difference across that interval is positive and less than $25\epsilon$ while $h>0$. The exact torque identity is

$$
h'=\frac{4rr_\sigma\sin(\theta-\theta_\sigma)}{R_d^3D}>0.
$$

It follows that $h(a)\le h(s)$ and $h(a)\ge h(s)-7\epsilon$. Hence source speed is at most $5/h(s)$. Reintegrating the window with this sharper bound yields

$$
\left|\frac{r(a)}{r(s)}-1\right|\le\frac{15\epsilon}{h(s)},\qquad
0<\theta(s)-\theta(a)\le\frac{4\epsilon h(s)}{r(s)}.
$$

Inserting this angle bound back into the torque gives $0<h'\le16\epsilon h/r^2$. In particular, on the actual window, $|h(a)/h(s)-1|\le64\epsilon^2/r(s)$. These estimates improve when radius becomes large. An apocenter does not introduce a factor $1/(1-\|\mathbf e\|)$.

## 2. A signed second-order row with an anisotropic remainder

The separately adjudicated [local kernel estimate](slow-binary-independent-adjudication-2026-10-03.md) first gives, on the windows just proved,

$$
\mathbf Y''=-\frac{\mathbf n}{r^2}
+\frac\epsilon{r^2}(\mathbf Y'-2p\mathbf n)+\mathbf Q_1,
\qquad \|\mathbf Q_1\|\le200000\frac{\epsilon^2}{r^2h^2}.
$$

For example the source-speed ratio is at most $5\epsilon/h$ and the integrated source-acceleration ratio is bounded by $128\epsilon^2/r\le512\epsilon^2/h^2$; $256(25+512)<200000$. These bounds concern the actual delayed source. They remain valid across a bounded acceleration step because velocity is continuous and acceleration is integrated.

Relative to the present radial and transverse axes, the stronger component estimates on this window are

$$
\left|\mathbf Y''(a)\cdot\mathbf n+\frac1{r^2}\right|
\le\frac{400\epsilon}{r^2h},\qquad
|\mathbf Y''(a)\cdot\mathbf t|\le\frac{100\epsilon q}{r^2}.
$$

The first follows by comparing $r(a)^{-2}\mathbf n(a)$ with $r^{-2}\mathbf n$ and using the preceding local row. The second uses exact torque to bound the transverse acceleration in its own frame by $16\epsilon q(a)/r(a)^2$, then rotates the central contribution through an angle at most $4\epsilon h/r$. Crucially the transverse bound contains $q=h/r$. It is not replaced by an isotropic absolute error when $q$ is small.

Integrating these bounds over $[s-u,s]$ once and twice gives

$$
\begin{aligned}
W_r&=2r-up-\frac{u^2}{2r^2}+\eta_r,
&|\eta_r|&\le\frac{200u^2\epsilon}{r^2h},\\
W_t&=-uq+\eta_t,
&|\eta_t|&\le\frac{50u^2\epsilon q}{r^2},\\
V_{\sigma,r}&=p+\frac u{r^2}+\xi_r,
&|\xi_r|&\le\frac{400u\epsilon}{r^2h},\\
V_{\sigma,t}&=q+\xi_t,
&|\xi_t|&\le\frac{100u\epsilon q}{r^2}.
\end{aligned}
$$

Here $\mathbf W=\mathbf Y(s)+\mathbf Y(\sigma)$; components use the present axes. These are integral Taylor estimates, requiring no jerk. Let $L=R_d/(2r)$ and $H=4r^2/(R_d^2D)$. Substitution in $u=\epsilon\|\mathbf W\|$ gives the following scalar expansions. Bounds in the last column multiply the indicated scale.

| Quantity | Expansion | Remainder bound |
| --- | --- | --- |
| $u/(2\epsilon r)=L$ | $1-\epsilon p+\epsilon^2(p^2-r^{-1}+q^2/2)$ | $10^5\epsilon^3/h^3$ |
| $n_{d,r}$ | $1-\epsilon^2q^2/2$ | $10^5\epsilon^3/h^3$ |
| $n_{d,t}$ | $-\epsilon q$ | $10^5\epsilon^3q/h^2$ |
| $D$ | $1+\epsilon p+\epsilon^2(2/r-q^2)$ | $10^6\epsilon^3/h^3$ |
| $H$ | $1+\epsilon p$ | $10^7\epsilon^3/h^3$ |

For explicit bounds, use $u<3\epsilon r$, $|p|,q\le4/h$, $r^{-1}\le4/h^2$ in the four integrated inequalities. Their normalized errors are at most $3600\epsilon^3/h^3$ radially and $900\epsilon^3q/h^2$ transversely. All arguments of the inverse and square-root expansions have magnitude below $10^{-2}$. On that interval, the remainder bounds for $(1+x)^{-1}$ and $(1+x)^{\pm1/2}$ through second order are at most $10|x|^3$. Applying these bounds in order to the norm, the implicit delay equation, the direction and $D^{-1}$ gives the displayed conservative constants. In the implicit step the map $u\mapsto\epsilon\|\mathbf W(u)\|$ has Lipschitz constant below $8\epsilon$; divide a substitution residual by $1-8\epsilon$. This closes the implicit-delay remainder rather than treating $u$ as an independent variable.

The significant cancellation is in $H$: the order-$\epsilon^2$ term in $L^{-2}$ is $p^2+2/r-q^2$, the corresponding term in $D^{-1}$ is $p^2-2/r+q^2$, and the product of the first-order terms contributes $-2p^2$. Their sum is zero. Source acceleration does not leave a second-order radial-amplitude term.

Multiplying direction by amplitude therefore proves the signed row, with $C_p=10^8$:

$$
\begin{aligned}
A_r&=-\frac{1+\epsilon p-\epsilon^2q^2/2}{r^2}+Q_r,
&|Q_r|&\le C_p\frac{\epsilon^3}{r^2h^3},\\
A_t&=\frac{\epsilon q+\epsilon^2pq}{r^2}+Q_t,
&|Q_t|&\le C_p\frac{\epsilon^3q}{r^2h^2}.
\end{aligned}
$$

The second bound is the decisive improvement over an absolute norm remainder: its extra factor $q$ prevents an artificial loss at a large apocenter.

## 3. The free eccentricity cannot be canceled

Direct polar differentiation of the signed row gives

$$
\begin{aligned}
h_\theta&=\epsilon+\epsilon^2p+R_h,
&|R_h|&\le C_p\epsilon^3/h^2,\\
\mathbf e_\theta&=\frac{2\epsilon}{h}(1+e_n)\mathbf n
+\epsilon^2\{2pq\mathbf n-(p^2+q^2/2)\mathbf t\}+\mathbf R_e,
&\|\mathbf R_e\|&\le20C_p\epsilon^3/h^3.
\end{aligned}
$$

For the remainder in the second line, the radial contribution is $-r^2Q_r\mathbf t$ and the transverse contribution is $2r^2Q_t\mathbf n-r^3pQ_t\mathbf t/h$. Substituting $rq=h$ and $|p|,q\le4/h$ proves the stated bound without an upper bound on radius. Also $\epsilon/2<h_\theta<3\epsilon/2$ throughout the provisional class.

Put $\mathbf c=\mathbf e/h$, $A=2\mathbf n\mathbf n^{\mathsf T}-I$, and

$$
\mathbf a=\mathbf c+\frac{2\epsilon}{h^2}\mathbf t,
\qquad
\mathbf b=\mathbf a+\frac{5\epsilon^2}{2h^3}\mathbf n.
$$

The signed second-order contribution to $\mathbf c_\theta$ is

$$
\frac{\epsilon^2}{h^3}P(\mathbf e,\theta),\qquad
P=-e_t(2+e_n)\mathbf n-\frac12(1+e_n)^2\mathbf t.
$$

Its value at $\mathbf e=0$ is $-\mathbf t/2$. Differentiating the first corrector contributes a further $-2\epsilon^2\mathbf t/h^3$. The second corrector cancels their sum, $-(5/2)\epsilon^2\mathbf t/h^3$. The remaining part satisfies $\|P+\mathbf t/2\|\le8\|\mathbf e\|$ for $\|\mathbf e\|\le3$. Thus it is a coefficient times $\mathbf c$, rather than a free forcing of order $\epsilon^2/h^3$. Straight substitution, including $R_h$ and $\mathbf R_e$, yields

$$
\left\|\mathbf b_\theta-\frac\epsilon h A\mathbf b\right\|
\le20\frac{\epsilon^2}{h^2}\|\mathbf b\|
+40C_p\frac{\epsilon^3}{h^4}.
$$

The terms from $R_h\mathbf c/h$ are absorbed into the displayed coefficient because $C_p\epsilon/h<1$. The corrector derivatives and their substitution costs are absorbed into the displayed forcing.

Use the bounded matrix primitive

$$
B=\frac12\begin{pmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{pmatrix},
\qquad B_\theta=A,\quad\|B\|=\frac12,
\qquad \mathbf z=(I-\epsilon B/h)\mathbf b.
$$

Its inverse has norm below two. Differentiation removes the order-$\epsilon/h$ oscillatory coefficient and gives

$$
\|\mathbf z_\theta\|
\le100\frac{\epsilon^2}{h^2}\|\mathbf z\|
+100C_p\frac{\epsilon^3}{h^4}.
$$

The initial source-crossing layer is treated with the accepted first-order defect, not the new second-order lemma. On $[0,s_*]$, $\theta_*<200\epsilon$, $h$ stays near one, and the first corrected equation has forcing $O(\epsilon^2)$. Its integrated contribution is $O(\epsilon^3)$. With the accepted constant $53248$ and its polar bounds, a sufficient explicit initial estimate is

$$
\left\|\mathbf z(\theta_*)-
\left(\frac{\mathbf e_0}{h_0}+\frac{2\epsilon}{h_0^2}\mathbf t_0\right)\right\|
\le10^5\epsilon^2.
$$

For example the first corrected derivative has norm below $10^7\epsilon^2$ on this layer; multiplication by $200\epsilon$ costs at most $2\times10^9\epsilon^3$. The matrix and second-corrector costs are below $100\epsilon^2$. Both are covered by the stated bound at $\epsilon\le10^{-16}$. Acceleration may jump; only its integrated bound is used.

Since $h_\theta\ge\epsilon/2$ and $h\ge1/2$, the integrals satisfy

$$
\int\frac{\epsilon^2}{h^2}\,d\theta\le4\epsilon,
\qquad
\int\frac{\epsilon^3}{h^4}\,d\theta\le\frac{16}{3}\epsilon^2.
$$

The elementary integrating-factor inequality now gives, throughout the provisional class,

$$
\left\|\mathbf z(\theta)-\mathbf c_*\right\|\le10^{12}\epsilon^2,
\qquad
\mathbf c_*:=\frac{\mathbf e_0}{h_0}+\frac{2\epsilon}{h_0^2}\mathbf t_0.
$$

Indeed the forcing integral is at most $(16/3)10^{10}\epsilon^2$, the coefficient integral is at most $400\epsilon$, and the initial vector has norm less than $4\epsilon$. These, the initial-layer estimate and the factor $e^{400\epsilon}<2$ are covered by $10^{12}\epsilon^2$. The smallness restriction makes this correction at most $10^{-4}\epsilon$.

The preparation gives $\|\mathbf c_*\|\ge\epsilon(2-h_0)/h_0^2$, near $\epsilon$, even when $\mathbf e_0$ points against the circular corrector. Hence $\|\mathbf e/h\|\le10\epsilon$ always, and, once $h\ge4$, $\|\mathbf e/h\|\ge\epsilon/2$. This preserves the nonzero free component in the exact delayed equation. The older arbitrary absolute remainder could not establish that fact.

## 4. No finite class exit; finite total angle

The provisional lower-$h$ boundary cannot occur: $h$ is strictly increasing and starts near one. The eccentricity boundary at three cannot occur either. If a first event $\|\mathbf e\|=2$ occurs, the upper bound on $\|\mathbf e/h\|$ gives $h\ge1/(5\epsilon)$. The polar equation then bounds $\|\mathbf e_\theta\|\le10\epsilon/h\le50\epsilon^2$. Within the next $2\pi$ of angle, the eccentricity vector changes by less than $400\epsilon^2<1/10$.

Choose an angle in that interval whose radial direction is opposite the eccentricity vector at the event. If the solution reached that angle, it would have $1+\mathbf e\cdot\mathbf n<1-2+1/10<0$, contradicting $1+e_n=h^2/r>0$. Nor can eccentricity reach three before this contradiction: it would need a change of norm at least one, whereas the same bound permits a change less than $1/10$. Thus the solution cannot complete those $2\pi$ after its first norm-two event; it remains inside the norm-three class throughout its physical future.

On every finite physical interval, $r\ge h^2/4$ has a positive floor, speed is bounded, and

$$
0<(h^4)'\le1024\epsilon.
$$

The last inequality follows from $h'\le16\epsilon h/r^2$. Hence $h$ and $r$ cannot diverge at finite $s$: radius has bounded derivative. Separation, delay and both root factors have positive floors on such an interval. The ordinary method-of-steps contraction therefore continues uniquely across its closed endpoint. The full retained source history has locally Lipschitz velocity, including its bounded acceleration seams. No finite-time obstruction remains in this class. This proves all-future existence.

If angle were unbounded, $h_\theta\ge\epsilon/2$ would make $h$ unbounded. The lower free-component bound would force eccentricity past two, after which the preceding angular contradiction prevents another complete revolution. Therefore angle has a finite limit. More quantitatively, by angle $8/\epsilon^2$ beyond the initial layer, $h$ would exceed $4/\epsilon$ and eccentricity would exceed two. Adding one revolution and the initial layer gives $\theta_\infty<10/\epsilon^2$. Also $h$ has a finite positive limit, less than $20/\epsilon$.

## 5. The angular conclusion is an actual fate statement

Finite angle implies

$$
\int_0^\infty\frac{ds}{r(s)^2}
=\int_0^{\theta_\infty}\frac{d\theta}{h(\theta)}<\infty.
$$

Because radius has a uniform Lipschitz bound, it must tend to infinity. To see this explicitly, if it returned below a fixed $L$ infinitely often, choose disjoint intervals about those returns on which $r\le2L$; bounded radial speed supplies a fixed positive interval length. Each contributes a fixed positive amount to the integral, a contradiction. This rules out merely unbounded excursions with infinitely many bounded returns.

The acceleration bound $\|\mathbf Y''\|\le2/r^2$ is integrable. Thus velocity is Cauchy at infinity and has a limit. Since $h$ has a finite positive limit and $r\to\infty$, transverse speed $q=h/r$ tends to zero. The radial direction converges because angle does. A negative limiting radial speed would eventually decrease radius, contradicting $r\to\infty$, so the limit is radial outward with nonnegative speed.

This argument supplies an all-future dispersal theorem directly. It does not need to force an elongated finite endpoint through the separately reviewed outgoing-impulse criterion. Such a criterion would additionally establish ballistic motion only if its strict positive-speed margin were proved. The possibility of zero terminal speed remains within the theorem; neither a regular eccentricity threshold nor a comparison denominator is mistaken for finite-time escape.

## Analytical controls, falsifiers and review boundary

Three exact controls were fixed before checking the new polar expressions. A stationary prescribed source has $A_r=-r^{-2}$, $A_t=0$. An affine radial prescribed source with present radial speed $p$ has exactly $u=2\epsilon r/(1+\epsilon p)$ and $A_r=-(1+\epsilon p)/r^2$, with no second-order term. A prescribed circular source has $\delta=2\epsilon q\cos(\delta/2)$, $R_d=2r\cos(\delta/2)$ and $D=1+\epsilon q\sin(\delta/2)$; these give $A_r=-r^{-2}(1-\epsilon^2q^2/2)+O(\epsilon^4)$ and $A_t=\epsilon q/r^2+O(\epsilon^3)$. These controls test the signs and the amplitude cancellation without claiming that a prescribed circle is an equilibrium. The recorded closed-form floating-point evaluations are in `.tmp/binary-polar-fate/analytic-controls.json`; no delayed target trajectory or production instrument was run.

The load-bearing falsifiers are a failure of the anisotropic source-window estimate, a missing second-order term in $H$, a missing term in the corrected eccentricity equation, or an admissible exact delayed solution for $\epsilon\le10^{-16}$ that remains bounded or violates the stated free-component enclosure. A zero limiting speed would not refute the theorem. Neither would the historical faster binary, which is outside its explicit restriction.

The original complete $W^{2,\infty}$ supplied-history class is retained; only the numerical smallness restriction is narrowed. Initial acceleration steps are integrated in the release layer. Future integral expansions use canonical component estimates, not an inherited jerk hypothesis. The theorem is an author-derived subject awaiting a separate frozen-subject review; analytical controls and syntax validation do not themselves provide that independent adjudication. No claim is made about other nonmirror or nonplanar preparations.

## Preservation and validation record

Before authoring, a SHA-256 known control for `abc` passed, then fifteen actual source identities were inventoried in `.tmp/binary-polar-fate/input-inventory.json`. The scientific reports and canonical equation are preserved; the coordinator owns any concurrent queue changes. Closing comparisons distinguish protected scientific inputs from operational owners. Only this new report and `.tmp/binary-polar-fate/` are authored by this investigation. No Git mutation, generator, Python interpreter or orbit solver is used. The Germund Dahlquist role is an analytical lens, not a named-person identity or acceptance authority.

`node .tmp/binary-polar-fate/validate.mjs` passed known SHA, fenced-code link, mathematical-span extraction and valid/invalid KaTeX controls before its target checks. The target rendered 222 mathematical spans, resolved five relative links with their anchors, and found all fifteen inventoried inputs unchanged by SHA-256 comparison. `git diff --no-index --check /dev/null` returned no whitespace diagnostics for the new report. These checks establish scoped source preservation and document validity, not independent mathematical acceptance. The subject digest for handoff is recorded in `.tmp/binary-polar-fate/validation.json` after this final validation paragraph.
