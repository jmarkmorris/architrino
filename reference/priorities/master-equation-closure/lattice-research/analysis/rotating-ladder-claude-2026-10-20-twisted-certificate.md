# The twisted rotating and translating double helix: an interval certificate at twist 0.9π

## Result

The twisted double helix of the [rotating alternating ladder](rotating-alternating-ladder.md), with rung radius $R=1000$ (units $K/c_f^2$) and twist $\alpha=0.9\pi$, rotating rigidly and translating uniformly along its axis for all past time, satisfies the unchanged Master Equation exactly. A three-dimensional Krawczyk test, evaluated in outward-rounded interval arithmetic with every causal root enclosed by interval Newton and with proved bounds on the omitted rungs, shows that the box

$$
\frac dR\in[3.147702014,\,3.147704014],\qquad \omega R\in[0.01364616543,\,0.01364618543],\qquad u\in[-0.0050891447,\,-0.0050889447]
$$

contains exactly one solution of the three balance conditions, and that this solution lies in the narrower box $d/R\in[3.1477028799,3.1477031476]$, $\omega R\in[0.0136461752,0.0136461757]$, $u\in[-0.00508904618,-0.00508904326]$. The recorded float seed ($d/R\approx3.14770$, $\omega R\approx0.013646$, $u\approx-0.005089$) is therefore correct to its printed digits. Every member is below wake speed throughout the box (total member speed at most $0.014565$).

The certificate extends to a branch. For each of 102 consecutive twist intervals covering $\alpha\in[0.8922\pi,\,0.9116\pi]$ a separate parametric Krawczyk test shows that for every twist in the interval there is exactly one solution in that interval's box. Over $\alpha\in[0.8956\pi,\,0.9046\pi]$ the neighbouring pieces are also joined by point certificates at the shared twists, so the solutions there form one continuous branch. The mirror-handed structure is certified at the same spacing and rotation speed with the axial speed reversed. Two further targets routed by the PI were also settled: at $\alpha=0.878\pi$ two disjoint boxes each contain exactly one balance, and the non-rotating untwisted ladder translating at speed $0.8434$ is certified at $d/R=2.5083135$.

**Claim grade:** derived, for existence and uniqueness in each stated box. The grade rests on the analytic lemmas of Sections 2 to 4, the Krawczyk theorem of interval analysis, and the interval evaluation by mpmath 1.3.0 `iv`, whose correct outward rounding is a declared primitive dependency. The instrument passed the known-case controls of Section 6 before its target runs. Stability is not addressed. Nothing is claimed about solutions outside the boxes, about the branch outside the certified twist intervals, or about whether the two balances at $0.878\pi$ are connected to the certified branch.

## Conventions and law

The law is the canonical Master Equation with $c_f=1$ and $K=1$. A receiver at $\mathbf x$ at time $T$ receives from source $j$ at each causal emission time $s<T$ with $T-s=\lvert\mathbf x-\mathbf X_j(s)\rvert$ the acceleration $\sigma\,(\mathbf x-\mathbf X_j(s))/(\tau^3\lvert D\rvert)$, where $\tau=T-s$, $D=1-\mathbf n\cdot\mathbf V_j(s)$, $\mathbf n=(\mathbf x-\mathbf X_j(s))/\tau$, and $\sigma=+1$ for like and $-1$ for unlike polarities. Contributions add over all sources and all causal roots. The emission at $s=T$ is excluded. Nothing is added to the law.

**Scaling.** Lengths and times are measured in units of $R$. Velocities are unchanged, accelerations given by the law scale by $1/R^2$, and kinematic accelerations scale by $1/R$. Write $\delta=d/R$, $\varepsilon=\omega R$ (rotation speed) and $w=u$ (axial speed). The prescribed motion requires centripetal acceleration $\varepsilon^2/R$ in original units. In the unit chart the law must therefore supply a radial acceleration $A_r=-R\varepsilon^2$, a tangential acceleration $A_t=0$ and an axial acceleration $A_z=0$, with $R=1000$ entering only through the radial target.

**Configuration (unit chart).** For every integer $k$ and $m\in\{0,1\}$, member $(k,m)$ has polarity $+$ for $m=0$ and $-$ for $m=1$ and path

$$
\phi_{k,m}(t)=k\alpha+m\pi+\varepsilon t,\qquad \mathbf X_{k,m}(t)=\bigl(\cos\phi_{k,m}(t),\,\sin\phi_{k,m}(t),\,k\delta+wt\bigr).
$$

Rung $k$ is the pair $m=0,1$ at height $k\delta+wt$. Successive rungs are turned by $\alpha$ in the sense of rotation ($\varepsilon>0$ is counter-clockwise seen from $+z$). For $\alpha=\pi$ this is the untwisted ladder of the subject document. The receiver is member $(0,0)$ at $t=0$, at $\mathbf x=(1,0,0)$ with velocity $(0,\varepsilon,w)$. Its radial, tangential and axial directions are $\mathbf e_x$, $\mathbf e_y$ and $\mathbf e_z$.

**Sign mapping.** In this convention the balance at $\alpha=0.9\pi$ has $u<0$. The structure translates toward $-z$, opposite to the direction in which the rungs advance by $+\alpha$ in the sense of rotation. The seeds supplied by the PI use the same sign ($u\approx-0.005089$ at $0.9\pi$; $u\approx-0.0098$ near the fold). The handedness partner is $\alpha\to2\pi-\alpha$, which is $1.1\pi$ here, and it has $u>0$ (Section 8).

## 1. Reduction to one receiver

**Lemma 0 (derived).** If the three conditions $A_r=-R\varepsilon^2$, $A_t=0$ and $A_z=0$ hold at the receiver at $t=0$, the law holds at every member at every time.

*Proof.* The law is unchanged by orientation-preserving isometries of space, by shifts of time, and by reversing every polarity, because it is built from vector differences, scalar products and products of polarities. Three such operations map the history to itself.

1. A time shift by $t_0$, combined with a rotation by $\varepsilon t_0$ about the axis and a translation by $wt_0$ along it, maps $\mathbf X_{k,m}(t)$ to $\mathbf X_{k,m}(t+t_0)$.
2. The screw, a rotation by $\alpha$ combined with a translation by $\delta$, maps member $(k,m)$ to member $(k+1,m)$ and preserves polarity.
3. The half turn, a rotation by $\pi$ combined with reversal of all polarities, exchanges $(k,0)$ and $(k,1)$.

Together these carry the receiver at $t=0$ to any member at any time. They are rotations about the axis and translations along it, so they carry the radial, tangential and axial directions at one member to the same directions at the image member, and they carry the prescribed centripetal acceleration to itself. $\blacksquare$

The axial condition is not automatic here. The reflection $z\to-z$ of the untwisted ladder maps a twist $\alpha$ to $-\alpha$ and $w$ to $-w$ (Section 8), so it is a symmetry only when $\alpha\equiv-\alpha$, that is, when $\alpha=\pi$.

## 2. Causal roots

**Lemma 1 (derived).** Let $V=\sqrt{\varepsilon^2+w^2}<1$. Every source other than the receiver has exactly one causal root $\tau>0$. The receiver has no positive-delay root from its own past.

*Proof.* Fix a source and put $f(\tau)=\tau-\lvert\mathbf x-\mathbf X(-\tau)\rvert$. Every path moves at constant speed $V$, so $\lvert\mathbf X(-\tau_2)-\mathbf X(-\tau_1)\rvert\le V\lvert\tau_2-\tau_1\rvert$. Hence $f(\tau_2)-f(\tau_1)\ge(1-V)(\tau_2-\tau_1)>0$ for $\tau_2>\tau_1$, and $f$ is strictly increasing with $f\to\infty$. Since $f(0)=-\lvert\mathbf x-\mathbf X(0)\rvert\le0$, there is exactly one root $\tau\ge0$. That root is zero exactly when the source is at $\mathbf x$ at $t=0$. For $(k,m)\ne(0,0)$ the squared distance at $t=0$ is $2-2\cos(k\alpha+m\pi)+k^2\delta^2$, which is positive. For the receiver $f(0)=0$, so $f(\tau)>0$ for every $\tau>0$ and there is no self root. $\blacksquare$

For source $(k,m)$ with delay $\tau$, put $\beta=k\alpha+m\pi-\varepsilon\tau$ and $\zeta=k\delta-w\tau$. Then $\mathbf x-\mathbf X(-\tau)=(1-\cos\beta,\,-\sin\beta,\,-\zeta)$ and $\tau$ is the unique positive zero of

$$
\Phi(\tau)=\tau^2-\zeta^2-2+2\cos\beta .
$$

Because $\tau+\lvert\mathbf x-\mathbf X\rvert>0$, the sign of $\Phi$ is the sign of $f$. The source velocity at emission is $(-\varepsilon\sin\beta,\varepsilon\cos\beta,w)$. This gives

$$
E:=\tau D=\tau+w\zeta+\varepsilon\sin\beta=\tfrac12\Phi'(\tau),\qquad D\ge1-V>0 .
$$

## 3. Components, conditions and derivatives

With $Q=\tau^2E$ and $\sigma=+1$ for $m=0$, $-1$ for $m=1$, source $(k,m)$ contributes

$$
a_r=\sigma\frac{1-\cos\beta}{Q},\qquad a_t=\sigma\frac{-\sin\beta}{Q},\qquad a_z=\sigma\frac{-\zeta}{Q}.
$$

The residual is $F(\delta,\varepsilon,w;\alpha)=\bigl(\sum a_r+R\varepsilon^2,\ \sum a_t,\ \sum a_z\bigr)$, summed over all $(k,m)\ne(0,0)$. The sums converge absolutely by Section 4, so their order does not matter.

Implicit differentiation of $\Phi=0$ gives

$$
\tau_\delta=\frac{k\zeta}{E},\quad \tau_\varepsilon=-\frac{\tau\sin\beta}{E},\quad \tau_w=-\frac{\tau\zeta}{E},\quad \tau_\alpha=\frac{k\sin\beta}{E}.
$$

From these, $\beta_p=-\varepsilon\tau_p-[p=\varepsilon]\tau+[p=\alpha]k$, $\zeta_p=[p=\delta]k-[p=w]\tau-w\tau_p$, $E_p=\tau_p+[p=w]\zeta+w\zeta_p+[p=\varepsilon]\sin\beta+\varepsilon\cos\beta\,\beta_p$ and $Q_p=2\tau\tau_pE+\tau^2E_p$. Each component $X/Q$ then has derivative $(X_pQ-XQ_p)/Q^2$. These formulas are what the instrument evaluates in interval arithmetic. Control C5 below checks them independently against interval central differences.

## 4. Proved tail bounds

Fix a box $\delta\ge\delta_-$, $\lvert w\rvert\le w_+$, $\lvert\varepsilon\rvert\le\varepsilon_+$, $V\le V_+<1$, and put $D_-=1-V_+$, $D_+=1+V_+$, $\delta'=\delta_-/(1+w_+)$ and $\kappa=1/\delta'$. For any member of rung $k$, $\tau\ge\lvert\zeta\rvert\ge\lvert k\rvert\delta-\lvert w\rvert\tau$, so

$$
\tau\ge\lvert k\rvert\delta',\qquad \lvert k\rvert\le\kappa\tau,\qquad \lvert\zeta\rvert\le\tau,\qquad Q\ge D_-\tau^3 .
$$

**Value tails, per member.** $\lvert a_r\rvert\le2/(D_-\tau^3)$ and $\lvert a_t\rvert\le1/(D_-\tau^3)$. These decay like $k^{-3}$.

**Axial value tail, per rung pair (derived).** A single member's axial row decays only like $k^{-2}$. Write $s=k\delta$, $p=2-2\cos\beta\in[0,4]$ and $q=\varepsilon\sin\beta\in[-\varepsilon,\varepsilon]$. For fixed $s$ and $w$, the delay is the unique positive root of $(1-w^2)\tau^2+2sw\tau-(s^2+p)=0$, so $\tau=\tau(p)$ and $\zeta=s-w\tau(p)$ depend only on $p$. Each member of rung $k$ therefore contributes $-\sigma f(p,q)$ with

$$
f(p,q)=\frac{\zeta}{\tau^2(\tau+q+w\zeta)} .
$$

The two members of a rung have opposite $\sigma$. Their sum is therefore $f(p_1,q_1)-f(p_0,q_0)$, and by the mean-value theorem on the rectangle $[0,4]\times[-\varepsilon,\varepsilon]$ its size is at most $4\sup\lvert f_p\rvert+2\varepsilon\sup\lvert f_q\rvert$. On the rectangle $\tau\ge\tau(0)\ge\lvert k\rvert\delta'$ and $\tau+q+w\zeta\ge\tau e'$, where $e'=1-w_+-\varepsilon_+/\tau_N$. Using $\tau_p=1/(2(\tau+w\zeta))$ one finds

$$
\lvert f_q\rvert\le\frac1{e'^2\tau^3},\qquad \lvert f_p\rvert\le\frac{(w_++2)/e'+1/e'^2}{2(1-w_+)\tau^4},
$$

so a rung pair contributes at most $2\varepsilon_+/(e'^2\tau^3)+2\bigl[(w_++2)/e'+1/e'^2\bigr]/\bigl((1-w_+)\tau^4\bigr)$ to the axial sum. This gives a $k^{-3}$ rate, with constant proportional to the rotation speed: about $9\times10^{-4}/N^2$ at the target, against $0.41/N$ for the per-member bound.

**Derivative tails, per member.** The bounds $\lvert\tau_\delta\rvert\le(\kappa/D_-)\tau$, $\lvert\tau_\varepsilon\rvert\le1/D_-$, $\lvert\tau_w\rvert\le\tau/D_-$ and $\lvert\tau_\alpha\rvert\le\kappa/D_-$ give bounds on $\lvert\beta_p\rvert$, $\lvert\zeta_p\rvert$, $\lvert E_p\rvert$ and $\lvert Q_p\rvert$ as Laurent polynomials in $\tau$ with nonnegative coefficients. Then

$$
\Bigl\lvert\partial_p\frac XQ\Bigr\rvert\le\frac{\lvert X_p\rvert}{D_-\tau^3}+\frac{\lvert X\rvert\,\lvert Q_p\rvert}{D_-^2\tau^6}
$$

with $\lvert1-\cos\beta\rvert\le2$, $\lvert\sin\beta\rvert\le1$ and $\lvert\zeta\rvert\le\tau$. The instrument builds these polynomials mechanically, with outward-rounded coefficients, and refuses any term decaying more slowly than $\tau^{-2}$. Every derivative row decays at least like $k^{-2}$, so the derivative series converge uniformly on the box. $F$ is therefore $C^1$ there, and its Jacobian is the term-by-term sum.

**Summation.** For a term $c\,\tau^{-j}$ with $j\ge2$, $\sum_{k>N}(k\delta')^{-j}\le\delta'^{-j}N^{1-j}/(j-1)$. Each bound is multiplied by 4 for the two members and the two signs of $k$, or by 2 for the rung-pair axial bound.

These bounds are crude for the tangential and radial rows, which also oscillate with the phase $k\alpha$. Control C6 shows the partial tails beyond $N=200$ are about 600 times smaller than the bound. No sharper paired bound for those rows was needed or proved.

## 5. The instrument and the certificate test

`twisted_certificate.py` (SHA-256 `75885d17a4a17a08dce3b68a83a11e47c026829d6c09a844f5f84f2ebb849722`) works in mpmath `iv` at 80 bits. Floats are used only to choose guesses, centres and preconditioners.

- **Root enclosure.** For each source with $\lvert k\rvert\le N$, a float delay $\tilde\tau$ seeds the interval $T=[\tilde\tau-r,\tilde\tau+r]$, and the instrument checks the interval Newton condition $N(T)=\tilde\tau-\Phi(\tilde\tau,P)/\Phi'(T,P)\subset\operatorname{int}T$. Here $P$ is the parameter box, so the condition holds for every parameter point in it. If the check fails, $r$ is enlarged; a nonpositive enclosure is refused. By the one-dimensional interval Newton theorem, $N(T)$ then encloses a unique root in $T$ for every parameter point. By Lemma 1 that root is the causal root.
- **Head and tail.** Components and derivatives are evaluated with the enclosure, summed over $\lvert k\rvert\le N$, and widened by the Section 4 tail bounds.
- **Krawczyk test.** With centre $\hat x$, box $X$, interval Jacobian $J(X)$ (head plus derivative tails) and $C\approx\operatorname{mid}J(X)^{-1}$, the test checks $K=\hat x-CF(\hat x)+(I-CJ(X))(X-\hat x)\subset\operatorname{int}X$ componentwise. If it holds, the Krawczyk theorem (Krawczyk 1969; Moore 1977; Neumaier 1990) gives exactly one zero of $F$ in $X$, lying in $K$, and every matrix in $J(X)$ is nonsingular.
- **Parametric form.** For a twist interval $A$, the instrument encloses $F(\hat x,A)$ by the mean-value form $F(\hat x,\hat\alpha)+\partial_\alpha F(\hat x,A)(A-\hat\alpha)$, including a tail bound for $\partial_\alpha$, and evaluates $J$ over $X\times A$. Inclusion then gives, for every $\alpha\in A$, exactly one zero in $X$. Since every $J\in J(X\times A)$ is nonsingular and the zero stays in $K\subset\operatorname{int}X$, the implicit-function theorem makes it a $C^1$ function of $\alpha$ on $A$.
- **Reducing over-estimation.** Interval evaluation over the box over-estimates the Jacobian of the nearest rungs. For the Jacobian pass only, the instrument therefore takes the hull of members with $\lvert k\rvert\le200$ over 8 sub-intervals of $\delta$, and of members with $\lvert k\rvert\le12$ over $8\times4$ sub-boxes of $(\delta,w)$. Each sub-box enclosure is valid on its own, so their hull is valid.

## 6. Known-case controls (run and recorded before any target run)

Receipt: `controls-receipt.json` (`controls.py`, SHA-256 `1b191bb9…85e6f`). All controls pass on the frozen instrument. They were run first at 22:04Z, rerun after each instrument change, and finally rerun at 22:33Z immediately before the frozen target runs.

| Control | Independent reference | Outcome |
| --- | --- | --- |
| C1 interval Newton on $x^2-2$ | $\sqrt2$ at 200 bits | enclosure width $1.7\times10^{-24}$ contains $\sqrt2$ |
| C2 stationary source ($\varepsilon=w=0$), 8 members up to $\lvert k\rvert=2000$ | exact delay $\sqrt{2-2\cos\beta_0+k^2\delta^2}$ and inverse-square row at 220 bits | all delays and all three row components enclosed |
| C3 uniformly moving source ($\varepsilon=0$, $w=\pm0.3$) | closed-form delay $\tau=[\mathbf r_0\cdot\mathbf V+\sqrt{(\mathbf r_0\cdot\mathbf V)^2+(1-V^2)r_0^2}]/(1-V^2)$ and row | all enclosed, both signs |
| C4 tail machinery | $\sum_{k\ne0}(-1)^k/k^2=-\pi^2/6$; $\sum_k(-1)^k/(k^2+c^2)=\pi/(c\sinh\pi c)$, $c=0.7$ | both closed forms inside head plus tail bound ($N=2000$) |
| C5 Jacobian formulas, 6 members | interval central differences, $h=10^{-30}$, 200 bits | all 54 entries agree within $10^{-25}$ of row scale |
| C5b twist derivative | as C5 | all agree |
| C6, C6b tail bounds | float partial sums over $200<\lvert k\rvert\le4000$ (sanity check only, not proof) | every partial sum below its bound |
| C7 untwisted pipeline, $\alpha=\pi$, $w=0$, $R=1000$, $N=2000$ | reflection symmetry; published untwisted balance $(3.345035293,\,0.01384081428)$ | axial head enclosure $[-8.9,8.7]\times10^{-24}\ni0$; radial and tangential enclosures contain 0 at the published point |
| C8 Krawczyk at $\alpha=\pi$, $N=20000$ | published untwisted balance (another session's instrument) | certified; $K$ contains $d/R=3.345035293$, $\omega R=0.01384081428$, $u=0$ |

The first C5 run reported a failure for the receiver's partner ($k=0$), whose exact $\delta$-derivatives are zero. The comparison criterion had divided by a floor of $10^{-30}$, so it rejected a difference quotient of order $10^{-30}$ against an exact zero. The criterion, not the instrument, was corrected to a tolerance relative to the member's row scale, and the run is recorded here.

C8 also reproduces the subject document's axial braking slope. Its Jacobian entry $\partial A_z/\partial u=-0.142275$ agrees with the recorded $-0.14227$. That number comes from a different instrument, so the agreement tests implementations, not the law.

## 7. Target: $\alpha=0.9\pi$, $R=1000$

Receipt: `krawczyk-alpha-0.9pi.json`. Settings: $N=20000$ rungs on each side, centre at the float solution $(3.1477030137218747,\,0.013646175429263243,\,-0.0050890447176521305)$, radii $(10^{-6},10^{-8},10^{-7})$, 26.8 s.

- **Residual at the centre.** The enclosures are $F_r\in\pm3.30\times10^{-10}$, $F_t\in\pm1.65\times10^{-10}$ and $F_z\in\pm2.25\times10^{-12}$, almost entirely tail bound. The head residuals alone are about $10^{-15}$.
- **Jacobian.** The interval Jacobian, tails included, contains $\begin{pmatrix}-0.04127&27.286&-0.00231\\0.001777&-0.01748&-0.04704\\0.00112&-0.04704&-0.1261\end{pmatrix}$. Its largest entry of $\lvert I-CJ\rvert$ is $0.032$.
- **Outcome.** $K\subset\operatorname{int}X$ in all three components. Over the box $V\le0.014565$.

One solution therefore exists in the box stated in the Result, and it is the only one there (derived). **Falsifier:** a zero of the three conditions in this box other than the one in $K$, or a sign-definite residual over $K$ under any correct evaluation, would refute the certificate. Replaying `twisted_certificate.py certify` with these arguments under a different interval library is the operator-checkable test.

## 8. Mirror handedness

Reflecting in $z$ and reindexing $k\to-k$ maps $(\alpha,\varepsilon,w)$ to $(-\alpha,\varepsilon,-w)$ with the same $\delta$ (derived). At $\alpha=1.1\pi\equiv-0.9\pi$ the Krawczyk test certifies the box with the same $\delta$ and $\varepsilon$ ranges and $u\in[0.0050889447,0.0050891447]$ (receipt `krawczyk-alpha-1.1pi-mirror.json`, 27.7 s). This confirms the sign reversal of $u$. It is also a consistency check of the evaluator against a derived symmetry.

## 9. Branch segment in the twist

Settings: driver `branch.py` (SHA-256 `e78831bf…e6d`), $N=4000$, twist pieces of width $0.0002\pi$ walking outward from $0.9\pi$, radii twice the float displacement to the piece ends in $\delta$ and four times in $\omega R$ and $u$. The compact receipt is `branch-certificate-summary.json`; full records are in `.local-data/…/twisted-certificate/branch-*.json`.

- **Coverage.** Every piece of $[0.8922\pi,0.9116\pi]$ is certified: 102 parametric certificates, each stating that for every twist in the piece exactly one solution lies in its box.
- **Bisections.** The five pieces between $0.8922\pi$ and $0.8932\pi$ failed at both radius factors and were bisected; all ten halves certified. These failures are retained in the full records.
- **Speed.** Over all boxes $V\le0.01482$.
- **Gluing.** At each shared twist a point Krawczyk box $Y$ was certified ($N=8000$) and checked to lie inside both neighbouring boxes. By uniqueness in each box, the two piece solutions then coincide. This was done for the 44 joins nearest $0.9\pi$ before the time budget ended (receipt `branch-gluing.json`, driver `glue.py`). All 44 passed, so over $\alpha\in[0.8956\pi,\,0.9046\pi]$ the certified solutions form one continuous ($C^1$) branch. The other joins were not run.
- **Branch values.** $d/R$ rises from about $3.1015$ at $0.8922\pi$ to about $3.2000$ at $0.9116\pi$. $\omega R$ rises from $0.013590$ to $0.013704$, and $u$ goes from $-0.00587$ to $-0.00420$.

**Falsifier:** a twist in a certified piece at which its box holds no solution or two solutions.

An attempt with wider pieces ($0.001\pi$ and $0.0005\pi$) failed. The over-estimation of the Jacobian from evaluating over the whole box, mainly for the rungs $\lvert k\rvert\le10$, made $\lvert I-CJ\rvert$ exceed 1. The rows of the Jacobian sum many rungs whose signs cancel, and interval evaluation adds their uncertainties instead. Those failed pilot records are kept in `.tmp/rotating-ladder/twisted-certificate/pilot-seg*.json`.

## 10. Two balances at $\alpha=0.878\pi$ (PI target T3)

Float Newton with this instrument's own float evaluator ($N=20000$) gives an upper balance from the seed $d/R\approx2.93$ and a lower one from $d/R\approx2.82$. Both are certified with $N=20000$ and radii $(10^{-5},10^{-7},10^{-6})$, in 47 s and 52 s.

| Balance | Certified box $d/R$ | $\omega R$ | $u$ | Enclosure $K$ of $d/R$ |
| --- | --- | --- | --- | --- |
| upper | $[2.92403280,2.92405280]$ | $[0.0133279346,0.0133281346]$ | $[-0.0091600951,-0.0091580951]$ | $[2.92403916,2.92404645]$ |
| lower | $[2.87046303,2.87048303]$ | $[0.0132301446,0.0132303446]$ | $[-0.0103814804,-0.0103794804]$ | $[2.87046931,2.87047675]$ |

The boxes are disjoint, so the twisted helix at $0.878\pi$ and $R=1000$ has at least two distinct exact balances (derived). The lower one has the smaller spacing and the larger $\lvert u\rvert$, as reported for the returning branch.

That the two are the two arms of one fold near $0.87775\pi$ is inferred, not certified. No fold certificate was attempted. It is also not certified that the upper balance connects to the branch of Section 9, because the interval $[0.878\pi,0.8922\pi]$ is not covered.

## 11. Non-rotating translating untwisted ladder (PI target T2)

The problem has $\alpha=\pi$ and $\varepsilon=0$, with unknowns $(\delta,u)$. Every source then lies at angle 0 or $\pi$, so $\sin\beta=0$ exactly and the tangential condition holds identically (derived; the interval enclosure $\pm1.3\times10^{-8}$ is tail bound only). There is no rotation, so the radial target is zero and $R$ drops out. Driver `t2_translating_ladder.py` (SHA-256 `6a623ce8…34b6`) applies a two-dimensional Krawczyk test to the $(r,z)\times(\delta,u)$ block of the frozen evaluator.

- **Tail constants.** At $V\approx0.843$ the constants degrade as expected: $D_-=0.1566$, $\delta'=1.3607$. With $N=20000$ the axial-row derivative tails are about $0.12$ and $0.16$, comparable to the Jacobian entries themselves.
- **Certificate.** A first attempt with radii $(10^{-6},10^{-6})$ failed in $\delta$ ($\lvert I-CJ\rvert_{\delta\cdot}\approx0.5,0.7$). It is preserved as `t2-failed-attempt-radii-1e-6-1e-6.json` in `.local-data`. With radii $(10^{-6},3\times10^{-7})$ the test certifies exactly one solution in $d/R\in[2.5083125333,2.5083145333]$, $u\in[0.8433851761,0.8433857761]$. It lies in $d/R\in[2.5083128043,2.5083142624]$, $u\in[0.8433853231,0.8433856291]$ (receipt `t2-translating-ladder-w-plus.json`, 37 s).
- **Mirror.** The reflection $z\to-z$ gives the same balance with $u<0$ (derived, not run).

**Defect found while doing this (derived from inspection).** The frozen instrument's float delay guess starts Newton from the present distance. At axial speed $0.84$ that can converge to the spurious negative zero of $\Phi$. My first float evaluation of the claimed point therefore gave a large false residual ($A_r=-0.134$, $A_z=0.217$). The interval stage would not accept such a root, because it refuses nonpositive enclosures and Lemma 1 identifies the positive root as the causal one. The certificates of Sections 7 to 10, with $\lvert u\rvert\le0.011$, all completed with positive verified enclosures and are unaffected.

The T2 driver therefore substitutes, without editing the frozen file, a float guess from the closed-form delay for uniform axial motion. This substitution, and the two-dimensional assembly, were checked against the uniform-motion closed form at $u=0.84339$ for eight members up to $\lvert k\rvert=20000$ (`t2-posthoc-control.txt`, pass). That control was run after the T2 target run, not before; this departs from the required instrument order and is recorded as such.

## Assumptions and dependencies

- The canonical Master Equation, unchanged, with complete rigid histories and all rungs and both polarities retained. The omitted rungs enter only through the proved bounds of Section 4.
- mpmath 1.3.0 `iv` outward rounding of $+$, $-$, $\times$, $\div$, square root, $\cos$, $\sin$ and $\pi$, as a declared primitive dependency.
- The interval Newton and Krawczyk theorems of interval analysis, and the mean-value and implicit-function theorems.
- Decimal twist endpoints are enclosed outward. Box endpoints are exact binary numbers produced by outward-rounded conversion. The decimal endpoints printed in this note are rounded to nearest for display only.

## Falsifiers

- An outward-rounded re-evaluation in which some certified $K$ is not inside its $X$.
- A source with two positive causal roots while $V<1$, which would contradict Lemma 1.
- A tail partial sum exceeding its Section 4 bound for some $N$.
- A second zero inside any certified box.

The receipts give every box and enclosure needed to re-run each check.

## Provenance and departures

- **Independence.** The forbidden float worker's files and the legacy helix scripts were not opened. All paths, conditions and bounds were derived here from the verbal configuration.
- **Instrument changes before freezing.** The instrument was changed before freezing to add the twist derivative, the parametric mean-value form, the Jacobian sub-box hulls and exact endpoint transport between processes. All controls and the $\pi$, $0.9\pi$ and $1.1\pi$ certificates were rerun on the frozen version, at 22:33Z to 22:35Z.
- **Unsupervised long run.** A float-only solve with $10^5$-plus rungs ran 7 min 16 s without the supervisor, against the 5-minute rule. The cause was an iteration cap that never triggered. The cap was fixed. All later long runs used the owned supervisor in foreground form.
- **Stray system Python.** One shell pipe briefly invoked the system `python3` with only `import sys`. It did no computation.
- **First gluing run.** It lacked a main-module guard and stalled under process spawning. Its record is kept as `branch-gluing-failed-run-no-main-guard.json`.

**Reproduction** (from the evidence directory, shared venv python):

- `controls.py all controls-receipt.json`: 2.3 s.
- `twisted_certificate.py certify --alpha 0.9,0.9 --center 3.1477030137218747,0.013646175429263243,-0.0050890447176521305 --radii 1e-6,1e-8,1e-7 --N 20000 --out krawczyk-alpha-0.9pi.json`: 27 s. Use `--alpha 1,1` or `1.1,1.1` with the centres in the receipts for the control and the mirror case.
- `branch.py LO HI NSEG 4000 OUT HB X0 200,8,12,4,1 2:4:4,2.5:5:5 DEADLINE`: about 20 s per piece. Runs of 474, 500, 87, 519 and 492 s produced the coverage above.
- `branch_summary.py`, then `glue.py branch-certificate-summary.json branch-gluing.json 8000 DEADLINE`: 521 s.
- `t2_translating_ladder.py 2.5083135333 0.8433854761 20000 1e-6 3e-7 OUT`: 37 s.


## Independent review disposition and corrected decimal bounds

Codex reviewed this note and its receipts as frozen (note SHA-256 `ccbc7a7b132358217dbadf0e5a8326560eb49c63df219ba6de93da56f1f15e94`, instrument `75885d17a4a17a08dce3b68a83a11e47c026829d6c09a844f5f84f2ebb849722`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-21T00:14:06Z, and accepted, as derived results under the declared interval-arithmetic dependency: the $0.9\pi$ balance and its mirror, the translating-ladder certificate, the two distinct balances at $0.878\pi$, and the connected $C^1$ branch over $[0.8956\pi,0.9046\pi]$ through the $0.9\pi$ balance. It accepted the one-receiver reduction for $\alpha\ne\pi$ and $u\ne0$, the mirror map $F(\delta,\varepsilon,-u;2\pi-\alpha)=\operatorname{diag}(1,1,-1)F(\delta,\varepsilon,u;\alpha)$, the paired axial tail bound (valid at speed $0.8434$; it needs $e'>0$, not small drift) and the Laurent derivative tails, and checked component formulas and 120 parameter derivatives against its own direct-law instrument. It reproduced every point certificate and T2 exactly, reran all 44 joins (largest weighted contraction below $0.053914$) and three parametric pieces, and verified strict inclusion for all 102 piece records by exact readback; it reran the T2 closed-form controls before a fresh T2 target, repairing the disclosed post-hoc order. Weighted contraction bounds: $0.002391$ (untwisted control), $0.011663$ ($0.9\pi$ and mirror), $0.272595$ and $0.286387$ ($0.878\pi$ upper and lower), $0.728969$ (translating).

**Corrected decimals.** The receipt formatter rounds to nearest, so some printed bounds above are inward or extend beyond the machine box. The machine boxes in the receipts are the certificates. Safe decimal statements, verified by exact readback:

- Outward root enclosures: at $0.9\pi$, $d/R\in[3.1477028799,\,3.1477031476]$, $\omega R\in[0.0136461752,\,0.0136461757]$, $u\in[-0.00508904618,\,-0.00508904325]$; translating ladder $d/R\in[2.5083128042,\,2.5083142624]$, $u\in[0.8433853230,\,0.8433856291]$; spacing images at $0.878\pi$: upper arm $[2.92403915,\,2.92404645]$, lower arm $[2.87046931,\,2.87047676]$.
- Uniqueness boxes (exactly one solution in each, strictly inside the machine box and strictly containing its image): $0.9\pi$: $d/R\in[3.14770202,3.14770401]$, $\omega R\in[0.01364616544,0.01364618542]$, $u\in[-0.0050891447,-0.0050889448]$; $1.1\pi$: the same with $u\in[0.0050889448,0.0050891447]$; $0.878\pi$ upper: $[2.92403281,2.92405280]$, $[0.0133279347,0.0133281346]$, $[-0.0091600950,-0.0091580951]$; $0.878\pi$ lower: $[2.87046304,2.87048303]$, $[0.0132301447,0.0132303446]$, $[-0.0103814803,-0.0103794804]$; translating: $d/R\in[2.5083125334,2.5083145333]$, $u\in[0.8433851761,0.8433857760]$.

**Scope.** Reflection $z\to-z$ preserves an individual history only when $u=0$ and $\alpha\equiv-\alpha\pmod{2\pi}$ (that is $\alpha=0$ or $\pi$). The two $0.878\pi$ balances are distinct balances, not a proved fold: their identification as the two arms, the fold location, nonexistence below it and their connection to the central branch are unproved. Outside $[0.8956\pi,0.9046\pi]$ the 102 pieces are local existence-and-uniqueness certificates, not yet one certified branch. The disclosed unsupervised float run and system-Python import supply no evidence.
