# Derived slow common-planar growth limit at fixed ring inventory

Date: 2026-10-03. **Scenario: unchanged Master Equation, every ordinary positive-delay self hit included.** Numbers use $K=c_f=1$. The primary reference is the exact alternating six-member high-rung locus; the argument also applies to each fixed even inventory $M$ admitted by the [fixed-inventory balance theorem](ring-inventory-ladders-2026-10-03.md#a-fixed-inventory-large-rung-theorem). Its [independent tail adjudication](ring-inventory-tail-independent-adjudication-2026-10-03.md) supplies the analytical prerequisite rather than a fit to the finite tables. **Grade: derived formal common-sector asymptotic theorem, frozen for separately constructed adjudication.** No finite-rung threshold, spectral ordering or nonlinear history conclusion is claimed.

## Result

Let $a=M^2/24$. On the asymptotic exact local balances in sufficiently high even cells there exists a locally unique simple positive real common-planar characteristic root with

$$
\frac{\lambda_{\rm slow}}{\beta}\longrightarrow\frac{\tau_*}{a},
\qquad \tau_*^2+\tau_*-2\tanh\tau_*=0,
\qquad \tau_*=0.71616422657180624\ldots.
$$

For six members, $a=3/2$ and $\lambda_{\rm slow}/\beta\to0.47744281771453749\ldots$. The name identifies this branch's order-$\beta$ scale relative to the separately derived order-$\beta^4$ branch. It does not establish that it is the smallest positive root, a complete spectral count or a dominant mode among complex roots. Existence here is a formal exponential first-variation statement about an exact balance, not a nonlinear departure theorem.

The limiting scalar function has precisely one positive zero. The full finite characteristic determinant need not have only one root on all positive scales. The result holds at fixed even $M$; constants in its proof depend on $M$, so it makes no assertion about simultaneously increasing rung and member count.

Restoring the physical symbols gives

$$
\lambda_{\rm slow}\sim\frac{c_f^3}{K}\frac{\tau_*\beta}{a}
\sim\frac{\tau_*c_f}{R},
\qquad \frac{\lambda_{\rm slow}}\Omega\sim\frac{\tau_*}{\beta}\to0.
$$

These are symbolic conversions only; no numerical $c_f$ other than one is instantiated and no physical value of $K$ is inferred. **Falsifier:** a failure of the exact tensor/projection identity, the admitted fold or radius asymptotics, an old-sheet inverse bound, a surviving projected remainder of order one differing from the stated limit, or an independently enclosed slow-scale pencil tending to a different function overturns the corresponding theorem. The finite fitted candidate in the [other-inventory stability subject](ring-inventory-ladder-stability-2026-10-03.md#an-inferred-slow-limit-candidate) is supporting context, not a premise or proof.

## Scaled pencil and exact root row

Use common radial and tangential displacement coordinates $u=(u_r,u_t)$, with tangential displacement in length units. Consume the admitted [common-sector tensor construction](ring-family-symmetric-stability-2026-10-03.md#tensor-construction-of-the-first-variation). A causal row has $x\in(0,\pi)$, polarity product $\sigma=(-1)^m$, sine $u=\sin x$, cosine $c=\cos x$, signed divisor $D=1-\beta c$, delay $2Ru$ and radial acceleration coefficient $C_{r,m}=\sigma/(4u|D|)$. The letter $u$ in the scalar row formulas below is its sine, not the displacement vector. Put

$$
\varepsilon=\beta^{-1},\quad s=zR,\quad E=e^{-2su},\quad
W=\frac{\sigma}{4u^2|D|},\quad n=(u,c),\quad k=(-c,u),\quad \mu=\frac1R.
$$

Write $\overline L_m=R^3L_m$ for the dimensionless first-variation row and $\overline A(s)=R^2A(s/R)$. Exact radial balance gives $-\beta^2=\mu\sum_m C_{r,m}$, while tangential balance gives $\sum_m C_{t,m}=0$. Therefore

$$
\overline A(s)=s^2I+2\beta sJ+\mu\sum_m\mathcal M_m(s),
\qquad \mathcal M_m=C_{r,m}I-\overline L_m.
$$

This uses the actual balanced radius, not an approximate radius substituted before linearization. Every row in the complete concavity census remains in the sum.

For any input vector $(a,b)$, set

$$
q_n=u(1+E)a+c(1-E)b,\quad
q_k=-c(1-E)a+u(1+E)b,
$$

$$
q_v=E[(-su+\beta c)a+(\beta u+sc)b].
$$

The exact tensor factorization gives

$$
\frac{\overline L_m(a,b)}W
=k\left(\frac{q_k}{2u}-\frac{\beta q_n}{2D}\right)
+n\left(-\frac{q_n}{uD}-\frac{\beta q_k}{2D}
-\frac{\beta^2u q_n}{2D^2}+\frac{q_v}D\right).
$$

The signed $D$ in this expression is essential even when its acceleration weight uses $|D|$.

## Exact projection exposing the cancellations

Let $t=\tanh s$, $P=(-\varepsilon,1)$ and $Q=(-\varepsilon t,1)^{\mathsf T}$. Define $\mathcal S(s)=\overline A_{22}-\overline A_{21}\overline A_{12}/\overline A_{11}$. The exact algebraic relation is

$$
P\overline A Q=\mathcal S+
\frac{(P\overline A e_1)(e_1^{\mathsf T}\overline A Q)}{\overline A_{11}}.
$$

The second term is finite in the limit and must be retained. It is not permissible to replace the Schur complement by the projected matrix alone.

The per-row projection admits a particularly useful exact reduction. Set

$$
H(u)=1-E-tu(1+E),\qquad
A(u)=1+t-sE+\frac{1-E}u,
$$

$$
B(u)=u[Es(t-1)+Et+2t]+2Es+\frac{Et-E-t-1}{2}
+\frac{E-1}u\left[2+\frac{t(1-u^2)}2\right],
$$

$$
C(u)=Es(u-1)(tu+1)-\frac{t(1+E)}2+\frac{E-1}2+\frac{1-E}u.
$$

Then

$$
\frac{P\mathcal M_m Q}{W}
=\frac{u(1-u)H(u)}{2D^2}
+\varepsilon^2\left[D A(u)+B(u)+\frac{C(u)}D\right].
$$

To obtain it, substitute $c=\varepsilon(1-D)$ into the root-resolved tensor and use $u^2+\varepsilon^2(1-D)^2=1$. The new symbolic instrument checks this equality exactly modulo that circle constraint; no numerical fitting enters. The apparent endpoint divisions are removable:

$$
A(0)=1+t+s,\quad B(0)=-1-2s-st,\quad C(0)=s-t,
\quad H(0)=H(1)=C(1)=0.
$$

All these functions and their first $s$ derivatives are smooth on $u\in[0,1]$, uniformly for $s$ in a compact positive interval. In particular $H(u)=O[u(1-u)]$ and $C(u)=O(1-u)$ at the upper endpoint. These zeros remove the potentially divergent old-cap terms before summation.

## Uniform old-root projection

Remove the newborn odd level $q$; its two roots are treated separately below. Pair each rising old level $l=1,\ldots,q-1$ with descending level $l-M$. Both have polarity $(-1)^l$. Write their angles $v$ and $\pi-w$, where $\beta\sin v-v=lh$ and $\beta\sin w+w=lh$, with $h=\pi/M$. Define $V(\theta,y)$ as the small ascending inverse of $\sin V-\theta V=y$. The two sines are $u_+=\sin V(\varepsilon,y)$ and $u_-=\sin V(-\varepsilon,y)$ at $y=lh\varepsilon$.

There remain exactly $M$ unpaired descending cap rows $m=q-M,\ldots,q-1$. This is the complete old ledger, including its self rows. No row is dropped because its delay is short or its level index grows.

The admitted newborn gap is $O_M(\beta^{-3})$. Hence throughout the paired range

$$
y\le1-(\pi/2+h)\varepsilon+O_M(\varepsilon^2),\qquad
1-y\ge c_M\varepsilon.
$$

For every intermediate $|\theta|\le\varepsilon$, the fold maximum of $\sin V-\theta V$ is $\sqrt{1-\theta^2}-\theta\arccos\theta=1-\pi\theta/2+O(\theta^2)$. Its height gap above these $y$ is at least a fixed $M$-dependent fraction of $1-y$. Strict concavity near that maximum yields

$$
\cos V-\theta\ge c_M\sqrt{1-y},\qquad
\cos V\asymp_M\cos V-\theta,\qquad
\sin V\ge c_M y.
$$

For $y\le1/2$ the same statements follow from the regular small inverse with a constant cosine floor. Thus the bounds are uniform over the growing number of old levels; they are not merely fixed-$l$ expansions.

The $\varepsilon^2D A$ term in the exact projection gives the paired expression

$$
\frac{(-1)^l\varepsilon^2}{4}
[g_A(-\varepsilon,y)-g_A(\varepsilon,y)],\qquad
g_A(\theta,y)=\frac{A(\sin V)}{\sin^2 V}.
$$

Its exact small-$y$ pole is $A(0)(1-\theta)^2/y^2$. After subtracting it, the $\theta$ derivative is bounded by $C_M(1+1/y)$. Indeed for $y\le1/2$, $\sin V=y/(1-\theta)+O(y^3)$ with uniformly differentiated remainders, leaving an $A'(0)(1-\theta)/y$ term and bounded analytic terms. For $y\ge1/2$, $A(u)/u^2$ has a bounded derivative in $u$, while

$$
\partial_\theta\sin V=\frac{V\cos V}{\cos V-\theta}
$$

is bounded by the preceding cosine comparison. The subtracted pole also has bounded derivative there. Consequently this pair contributes

$$
\frac{(-1)^l A(0)\varepsilon^3}{y^2}
+O_M\!\left(\varepsilon^3[1+1/y]\right).
$$

The $\varepsilon^2B$ term gives

$$
\frac{(-1)^l\varepsilon^3}{4}
[g_B(\varepsilon,y)+g_B(-\varepsilon,y)],\qquad
g_B(\theta,y)=\frac{B(\sin V)}{\sin^2V(\cos V-\theta)}.
$$

Its exact pole is $B(0)(1-\theta)/y^2$. The remainder is bounded by $C_M[1/y+(1-y)^{-1/2}]$: expand the regular small inverse at the lower endpoint, and use the divisor floor at the upper endpoint. The odd pole terms cancel in this symmetric sum. The paired contribution is therefore

$$
\frac{(-1)^l B(0)\varepsilon^3}{2y^2}
+O_M\!\left(\varepsilon^3[1/y+(1-y)^{-1/2}]\right).
$$

On the lattice, $\sum1/y=O_M(\varepsilon^{-1}\log\beta)$ and $\sum(1-y)^{-1/2}=O_M(\varepsilon^{-1})$. The latter follows by comparison with the integrable upper-end singularity, with the final gap at least $c_M\varepsilon$. Thus both remainder sums are $O_M(\varepsilon^2\log\beta)=o(\varepsilon)$ even in absolute value. No cancellation assumption is needed for these errors.

For the $C/D$ term, $C(1)=0$ and the old-sheet divisor comparison give an absolute bound $C_M\varepsilon^4/u^2$ per row. The sum of $u^{-2}$ is $O_M(\varepsilon^{-2})$ from the lower lattice spacing and the regular interior, so the total is $O_M(\varepsilon^2)$. For the $H$ term, its two endpoint zeros and the additional $1-u$ give an absolute bound $C_M\varepsilon^3$ per row: near $u=1$ the numerator vanishes as $(1-u)^2$ and the divisor cube scales as $\beta^3(1-u)^{3/2}$; near zero $H/u$ is bounded. There are $O_M(\beta)$ old rows, giving total $O_M(\varepsilon^2)$.

On each unpaired cap, $u=1-O_M(\varepsilon)$ and $|D|\asymp_M\varepsilon^{-1/2}$. Its $A$ contribution has the same constant leading value $(-1)^m\varepsilon^2 A(1)/4$ for every cap row. The $M$ consecutive polarities sum to zero because $M$ is even; its remainder is $O_M(\varepsilon^3)$. The $B$ cap sum is $O_M(\varepsilon^{5/2})$, with still smaller $C$ and $H$ terms. This retains the whole cap rather than mistaking an individually small term for a vanishing sum.

Only the paired poles survive at order $\varepsilon$. Since

$$
A(0)+\frac{B(0)}2=\frac{1+2t-st}{2},\qquad
\sum_{l\ge1}\frac{(-1)^l}{(lh)^2}=-2a,
$$

and the omitted alternating tail is $O_M(q^{-2})$, the complete older ledger satisfies

$$
\sum_{\rm old}P\mathcal M_m Q
=-a\varepsilon(1+2t-st)+O_M(\varepsilon^2\log\beta).
$$

Every stated error and endpoint bound holds with one $s$ derivative on compact positive $s$ intervals. Differentiating $E$ introduces a bounded factor $2u$; differentiating $t$ is bounded there; the geometric root and divisor inequalities do not depend on $s$. Since $\mu\varepsilon\to1/a$, the older rows contribute $-1-2t+st$ to the scaled projection in the $C^1$ limit.

## Older mixed rows do not enter the finite Schur correction

One must also show that old rows are negligible in the order-$\beta^3$ mixed projections. The exact row formula, $|1-E|\le C u$, the old-sheet identity $|c|\asymp_M|D|/\beta$, and $|c-\varepsilon u|\le C_M|D|/\beta$ give

$$
|P\overline L_m e_1|
\le C_M\left[\frac1{u^2|D|}+\frac\beta{D^2}\right],
$$

$$
|e_1^{\mathsf T}\overline L_m Q|
\le C_M\left[\frac1{\beta u^2}+\frac\beta{D^2}
+\frac1{\beta u|D|}\right].
$$

For the second inequality use $|q_n(Q)|\le C_Mu|D|/\beta$, $|q_k(Q)|\le C_Mu$ and $|q_v(Q)|\le C_M\beta u$. For the first, $q_n(e_1)=u(1+E)$, $|q_k(e_1)|\le C_M|c|u$ and $|q_v(e_1)|\le C_M(|D|+1)$ suffice. Substitution into the displayed tensor gives these bounds without any alternating summation.

At the two small-sine ends, the lattice gives $u\ge c_Ml/\beta$ and $|D|\ge c_M\beta$. Their absolute sums are $O_M(\beta)$. In the remaining region $u$ has a constant floor; for a row at level gap $k h$ below the maximum, concavity gives $D^2\ge c_M\beta k$. Therefore $\sum\beta/D^2=O_M(\log\beta)$ and the other sums remain $O_M(\beta)$. The cap obeys the same bounds. Both complete old mixed sums are $O_M(\beta+\log\beta)$. Multiplication by $\mu=O_M(\beta)$, and the smaller radial-balance identity terms, gives $O_M(\beta^2)=o(\beta^3)$, uniformly with one $s$ derivative. A coarse norm bound on the unprojected tensor would not establish this cancellation.

The radial entry has the weaker sufficient old bound $O_M(\beta^4)=o(\beta^6)$. For $|D|\ge\beta/4$, the exact dimensionless tensor has norm at most $C_M\beta^2$ using $u\ge c_M/\beta$; in its complementary old region $u$ has a constant floor and $|D|\ge c_M\sqrt\beta$, giving norm at most $C_M\sqrt\beta$. There are $O_M(\beta)$ rows and $\mu=O_M(\beta)$. Its delayed source-velocity terms obey smaller bounds. These statements also hold with one $s$ derivative because $0<u\le1$.

## Newborn pair and the finite correction

Let $g=F_{\max}-qh$ and define $\kappa_\beta=\sqrt{2g\beta^3}$. The accepted balance theorem gives $\kappa_\beta\to\kappa=1/(2a)$ and $R\beta\to a$. Uniform fold Taylor expansion for $\kappa_\beta$ in a compact positive interval gives

$$
D_\pm=\pm\kappa_\beta\varepsilon[1+O_M(\varepsilon^2)]+O_M(\varepsilon^4),
\quad u_\pm=1-\varepsilon^2/2\pm\kappa_\beta\varepsilon^3+O_M(\varepsilon^4),
$$

$$
E_\pm=e^{-2s}[1+s\varepsilon^2\mp2s\kappa_\beta\varepsilon^3+O_M(\varepsilon^4)],
\quad W_\pm=-[4\kappa_\beta\varepsilon]^{-1}[1+O_M(\varepsilon^2)].
$$

The common $O(\varepsilon^4)$ divisor asymmetry follows from the exact fold gap $\sqrt{\beta^2-1}(1-\cos y)+y-\sin y$: the odd cubic gap shifts the center only at order $\varepsilon^5$ in $y=x-x_*$. In the mixed projections the leading odd order-$\beta^4$ pieces cancel between the two roots; this symmetry must be retained rather than replacing both roots by a single fold point.

Put $v=e^{-2s}$ and $C_1=2sv(1+t)-t(1+v)$. Substituting the two Taylor rows in the exact formula, summing before taking the limit, gives

$$
\frac{\overline A_{11}}{\beta^6}\to-2a^2(1+v),\qquad
\frac{P\overline A e_1}{\beta^3}\to-a^2(1+v),\qquad
\frac{e_1^{\mathsf T}\overline A Q}{\beta^3}\to a^2C_1.
$$

For clarity, before substituting $\kappa=1/(2a)$ the three coefficients are respectively $-(1+v)/(4a\kappa^3)$, $-(1+v)/(8a\kappa^3)$ and $C_1/(8a\kappa^3)$. They arise from the signed paired tensor, not a fit to finite matrix values. The older rows are negligible at these orders by the preceding bounds. The limiting radial entry is strictly negative on every positive compact $s$ interval, so the Schur division is valid there for all sufficiently high rungs.

The projected newborn rows satisfy

$$
\mu\sum_{\rm new}P\mathcal M_m Q
\to1-sv(1+t)+\frac{a^2C_1}{2}.
$$

One direct check uses the exact projection reduction: with $D=\pm\kappa\varepsilon$, its bracket divided by $W$ has common leading coefficient

$$
\varepsilon^2\left[sv(1+t)-1-\frac{C_1}{8\kappa^2}\right].
$$

Multiplying by both negative weights and $\mu$ gives the displayed limit. The mixed-row limits give the separately retained Schur correction

$$
\frac{(P\overline A e_1)(e_1^{\mathsf T}\overline A Q)}{\overline A_{11}}
\to\frac{a^2C_1}{2}.
$$

All newborn limits are uniform with one $s$ derivative on positive compact intervals. Their geometric expansions have remainders uniform for $\kappa_\beta$ in a compact positive interval; differentiating $E$ introduces bounded sine factors only. A numerical convergence rate for $\kappa_\beta$ is unnecessary.

## Limiting pencil and positive-root persistence

The kinetic projection is $s^2(1+\varepsilon^2t)+2s(1-t)$. Combining it with the complete old and newborn projections, then subtracting the finite correction, yields

$$
\mathcal S(s)\longrightarrow s^2+2s(1-t)-1-2t+st+1-sv(1+t)
=s^2+s-2\tanh s,
$$

because $v(1+t)=1-t$. Convergence holds in $C^1$ on any compact positive interval. In the operator's proposed parameter $\tau=az/\beta$, $s=\tau\beta R/a$ and $\beta R/a\to1$, so equivalently

$$
\frac{a^2}{\beta^2}S(\tau\beta/a)\longrightarrow f(\tau)=\tau^2+\tau-2\tanh\tau
$$

with one derivative, where $S$ is the unscaled original Schur complement. This proves the previously inferred identification at the stated asymptotic boundary.

For the scalar function, $f(0)=0$, $f'(0)=-1$ and $f''(\tau)=2+4\operatorname{sech}^2\tau\tanh\tau>2$ on $\tau>0$. Strict convexity, initial negative slope and $f(\tau)\to+\infty$ imply exactly one positive zero and positive derivative there. Choose a compact positive neighborhood of that zero. Uniform function and derivative convergence gives opposite endpoint signs and positive derivative for all sufficiently high rungs. There is then a unique simple Schur zero in that neighborhood. Since $\overline A_{11}\ne0$ there, it is a simple positive zero of the full common-sector determinant. Shrinking the neighborhood gives its stated scaled limit. This argument provides no computable finite starting rung and no root exclusion outside that neighborhood.

## Instrument, analytical controls and receipts

The new [ring_slow_planar_limit_20261003.py](../../../../../scripts/braid-program/ring_slow_planar_limit_20261003.py) checks the exact projected-row identity modulo the circle constraint, its removable endpoint values, and an outward interval for the scalar positive zero. It imports no finite ring evaluator or old scalar oracle. It does not itself prove the uniform inverse bounds or evaluate a new finite balanced ring; those are the analytical proof above and the independently admitted prerequisites.

Before its target, `known.json` records the analytically known static acceleration tensor $\operatorname{diag}(-2,1)/8$ at separation two, exponential and geometric Taylor coefficients, a non-diagonal Schur example with exact complement one, and $f(0)=0,f'(0)=-1$. The target gate rejects changed script bytes. After those controls, 80-digit outward scalar evaluation gives

$$
0.71616422657180623<\tau_*<0.71616422657180625
$$

with opposite strict endpoint signs and a positive derivative interval. Exact binary interval endpoints are serialized as integer strings; decimal displays are diagnostics. Both final stages exited zero. Receipts under `.local-data/ring-exploration/slow-planar/` are `known.json`, SHA-256 `5d5d29c26aac157f950b27b03d83042c12f869e867431faa210a765ec6eda77b`, and `target.json`, SHA-256 `4f103574e1a8babb661b8b2d6104fcb13458af3a04eb4bbc2521fa813c94d97a`. Controlled symbolic Laurent scratch calculations support the row-coefficient bookkeeping; agreement with them is algebra checking, not the separate theorem adjudication.

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_slow_planar_limit_20261003.py known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_slow_planar_limit_20261003.py target
```

Recommended next action: independently reconstruct the old inverse-pole bounds, mixed-row sums and newborn Schur correction before integrating the derived limit. A quantitative threshold would require explicit constants in those uniform estimates and the admitted balance asymptotics; another finite fit cannot supply it. No shared queues, manuscript, registries, indexes, logs, frozen scientific subjects, ranks, scores or scenarios were edited by this work.
