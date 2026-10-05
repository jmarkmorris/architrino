# Independent adjudication of the slow common-planar ring limit

Date: 2026-10-03. **Scenario: unchanged Master Equation, complete positive-delay root census, $K=c_f=1$ in numbers.** Subject: [ring-slow-planar-limit-2026-10-03.md](ring-slow-planar-limit-2026-10-03.md), frozen SHA-256 `a51f76c5a9fc423585d68a53f2b81abeab91f87d5d5a84a9603d068b93a74063`; its separate instrument is frozen at `8fadc41693fda286471fdb51dc103576058070904ec19ce09205aef36856f383`. Neither was edited in this adjudication.

## Verdict and boundary

**Accepted, derived:** on the admitted sufficiently high exact local even-cell balances at each fixed even inventory $M$, a locally unique simple positive real common-planar characteristic branch satisfies

$$
\frac{\lambda_{\mathrm{slow}}}{\beta}\longrightarrow\frac{\tau_*}{a},\qquad
a=\frac{M^2}{24},\qquad
\tau_*^2+\tau_*-2\tanh\tau_*=0.
$$

**Measured scalar enclosure, independently controlled:** the new instrument below gives $0.71616422657180623<\tau_*<0.71616422657180625$ with outward endpoint signs and strictly positive derivative on that bracket. For $M=6$, the corresponding limiting ratio is $0.47744281771453749\ldots$. This is an asymptotic formal exponential first-variation result. It supplies no computable first applicable rung, ordering among all positive roots, complex-root count, finite-history nonlinear instability theorem, or later trajectory. The word slow compares its order-$\beta$ scale with the separately admitted order-$\beta^4$ branch; it does not assert that this is the smallest growing root.

The review independently closes the point that previously blocked promotion: all older rows, including the growing near-cap population, have a uniform projected remainder $O_M(\beta^{-1}\log\beta)$ after multiplication by the balanced coupling. Their mixed projections contribute $o(\beta^3)$, so the finite Schur correction is determined by the newborn pair. Fixed-level expansions alone would not establish either statement.

**Falsifier:** an error in the Cartesian first variation, the complete paired-plus-cap census, a root inverse bound near the older cap, the newborn gap/radius prerequisites, or a nonvanishing remainder in the displayed limit overturns the corresponding derived conclusion. A finite fitted root tending elsewhere would trigger a check of the exact balance, census and uniform estimates; it would not by itself replace them. No all-inventory uniform limit is asserted when $M$ grows with the rung.

## Independence and inherited premises

This review reconstructs the per-hit matrix from Cartesian displacement and delayed source-velocity variations, reconstructs the old-sheet inverse pole estimates and sums, and computes the newborn mixed coefficients from elementary low-order components. It imports neither the subject instrument nor any finite ring evaluator. Its separately written [algebra and scalar checker](../../../../../scripts/braid-program/ring_slow_planar_independent_adjudication_20261003.py) tests the resulting exact identity and scalar enclosure. Agreement with that checker verifies algebra and interval implementation; the complete-ledger limit is the analytical proof here.

The accepted prerequisites are the [fixed-inventory balance theorem](ring-inventory-ladders-2026-10-03.md#a-fixed-inventory-large-rung-theorem), its [separate tail adjudication](ring-inventory-tail-independent-adjudication-2026-10-03.md), and the admitted [common-sector first variation](ring-family-symmetric-stability-2026-10-03.md#tensor-construction-of-the-first-variation). Specifically, for $h=\pi/M$ and newborn odd level $q$, the exact balanced reference has

$$
g=F_{\max}-qh,\qquad \kappa_\beta=\sqrt{2g\beta^3}\to\frac1{2a},\qquad R\beta\to a.
$$

Those references supply exact existence and the complete concavity census before linearization. This adjudication does not independently reprove the balance theorem or certify a new finite ring. The current tail-adjudication digest, after the coordinator's rendered-equivalent `A^{3}` notation repair, is `ef00a5314dadaa0d2a1a082894cfddab80ddab23d334422f0c26afbc3f17a834`; the historical pre-repair freeze remains provenance, not a different theorem.

## Cartesian reconstruction and the essential Schur correction

Put $\varepsilon=1/\beta$, $s=zR$, $u=\sin x$, $c=\cos x$, $D=1-\beta c$, $E=e^{-2su}$, $t=\tanh s$ and $W=\sigma/(4u^2|D|)$. In the receiving radial/tangential frame, $n=(u,c)$ and $k=(-c,u)$. The independently reconstructed normalized displacement tensor and source-velocity tensor are

$$
\frac{T}{W}=\frac{kk^{\mathsf T}}{2u}
-\frac{\beta(kn^{\mathsf T}+nk^{\mathsf T})}{2D}
-\frac{nn^{\mathsf T}}{uD}
-\frac{\beta^2u\,nn^{\mathsf T}}{2D^2},\qquad
\frac{U}{W}=\frac{nn^{\mathsf T}}D.
$$

With source-frame rotation $B=Q(-2x)$, the row is $\overline L=T(I-EB)+UEB(sI+\beta J)$, where these tensors are dimensionless and $J(a,b)=(-b,a)$. The identities $n^{\mathsf T}B=(-u,c)$ and $k^{\mathsf T}B=(-c,-u)$ give exactly the subject's three source projections. In particular the velocity projection is $E[(-su+\beta c)a+(\beta u+sc)b]$; its sign is consequential for the slow cancellation.

Exact radial balance, rather than an approximate radius, gives

$$
\overline A=R^2 A(s/R)=s^2I+2\beta sJ+\mu\sum_m\mathcal M_m,
\qquad \mu=1/R,\qquad \mathcal M_m=C_{r,m}I-\overline L_m.
$$

Choose $P=(-\varepsilon,1)$ and $Q=(-\varepsilon t,1)^{\mathsf T}$. For any matrix with nonzero radial entry, direct bilinear algebra gives

$$
\overline S=\overline A_{22}-\frac{\overline A_{21}\overline A_{12}}{\overline A_{11}}
=P\overline A Q-
\frac{(P\overline A e_1)(e_1^{\mathsf T}\overline A Q)}{\overline A_{11}}.
$$

The final quotient has a nonzero finite limit and cannot be discarded. Reconstructing the Cartesian row and substituting $c=\varepsilon(1-D)$ gives the exact subject decomposition

$$
\frac{P\mathcal M_m Q}{W}=
\frac{u(1-u)H(u)}{2D^2}+\varepsilon^2[D A(u)+B(u)+C(u)/D].
$$

Here $H,A,B,C$ are the explicitly displayed functions in the [subject's exact-projection section](ring-slow-planar-limit-2026-10-03.md#exact-projection-exposing-the-cancellations). The separate checker derives the raw expression by matrix multiplication and verifies that its difference from this decomposition has polynomial remainder zero modulo $u^2+\varepsilon^2(1-D)^2=1$. This is not a subject-code replay. Their endpoint data follow directly by expanding $E=1-2su+O(u^2)$ and using $t=(1-e^{-2s})/(1+e^{-2s})$:

$$
A(0)=1+t+s,\qquad B(0)=-1-2s-st,\qquad H(0)=H(1)=C(1)=0.
$$

Thus $H=O[u(1-u)]$ and $C=O(1-u)$, uniformly with one $s$ derivative on every fixed compact positive $s$ interval.

## Complete older ledger: uniform estimates

The ledger pairs rising levels $l=1,\ldots,q-1$ with descending levels $l-M$, including self levels whenever present. Their polarities agree because $M$ is even. Exactly $M$ descending levels $q-M,\ldots,q-1$ remain unpaired; both newborn level-$q$ rows are excluded only from this older sum and restored below. This partitions the complete ledger without excluding a root by its delay or level.

Set $y=lh\varepsilon$ and let $V(\theta,y)$ solve $\sin V-\theta V=y$ on the ascending sheet. The paired sines are $\sin V(\varepsilon,y)$ and $\sin V(-\varepsilon,y)$. The last paired level has

$$
y\le1-(\pi/2+h)\varepsilon+O_M(\varepsilon^2).
$$

For $|\theta|\le\varepsilon$, the fold height is $1-\pi\theta/2+O(\theta^2)$. Its gap over the last $y$ is therefore at least an $M$-dependent positive fraction of $1-y$. Strict concavity near the fold, and the regular small inverse below $y=1/2$, give uniformly

$$
\cos V-\theta\ge c_M\sqrt{1-y},\quad
\cos V\asymp_M\cos V-\theta,\quad \sin V\ge c_M y.
$$

These statements retain the last old pair; replacing them by a bound valid only away from the cap would leave the theorem open.

The $A$ pair is $\sigma\varepsilon^2[g_A(-\varepsilon,y)-g_A(\varepsilon,y)]/4$, where $g_A=A(\sin V)/\sin^2 V$. Subtract its exact pole $A(0)(1-\theta)^2/y^2$. For $y\le1/2$, the expansion $\sin V=y/(1-\theta)+O(y^3)$ with a differentiated uniform remainder leaves a derivative bounded by $C_M(1+1/y)$. For $y\ge1/2$, the identity

$$
\partial_\theta\sin V=\frac{V\cos V}{\cos V-\theta}
$$

and cosine comparison give the same bound. The paired $A$ contribution is consequently $\sigma A(0)\varepsilon^3/y^2+O_M(\varepsilon^3[1+1/y])$.

For $B$, the pair is $\sigma\varepsilon^3[g_B(\varepsilon,y)+g_B(-\varepsilon,y)]/4$, with $g_B=B(\sin V)/[\sin^2 V(\cos V-\theta)]$. Its pole is $B(0)(1-\theta)/y^2$. The remainder is bounded by $C_M[1/y+(1-y)^{-1/2}]$, by the regular inverse expansion at zero and the divisor floor near the cap. Thus its pole contribution is $\sigma B(0)\varepsilon^3/(2y^2)$.

Absolute lattice sums, without alternating cancellation, give $\sum1/y=O_M(\varepsilon^{-1}\log\beta)$ and $\sum(1-y)^{-1/2}=O_M(\varepsilon^{-1})$. Both remainder sums are therefore $O_M(\varepsilon^2\log\beta)$. The $C/D$ term is at most $C_M\varepsilon^4/u^2$ per row, since $C(1)=0$ removes the upper divisor singularity; summing $u^{-2}=O_M(\varepsilon^{-2})$ gives $O_M(\varepsilon^2)$. The $H$ term is at most $C_M\varepsilon^3$ per row because $H/u=O(1-u)$ and its extra $1-u$ cancels the divisor cube. There are $O_M(\beta)$ rows, giving the same $O_M(\varepsilon^2)$ total.

At the $M$ unpaired cap levels, $u=1-O_M(\varepsilon)$ and $D\asymp_M\varepsilon^{-1/2}$. Their $A$ contributions have common leading magnitude $\varepsilon^2A(1)/4$ times their consecutive polarities, which sum to zero for even $M$. The remainder is $O_M(\varepsilon^3)$; their $B$ total is $O_M(\varepsilon^{5/2})$. The other terms are smaller. No cap is discarded.

Only the paired poles survive. Since $A(0)+B(0)/2=(1+2t-st)/2$ and $\sum_{l\ge1}(-1)^l/(lh)^2=-2a$, the complete older sum is

$$
\sum_{\mathrm{old}}P\mathcal M_m Q
=-a\varepsilon(1+2t-st)+O_M(\varepsilon^2\log\beta).
$$

The missing alternating tail is $O_M(q^{-2})$; even its absolute $O_M(q^{-1})$ bound would suffice here. Multiplying by $\mu\varepsilon\to1/a$ gives $-1-2t+st$. All estimates survive one $s$ derivative because the root/divisor bounds are independent of $s$, and differentiating the smooth coefficients introduces bounded factors. This establishes the required $C^1$ limit, not merely a pointwise fixed-level limit.

The mixed projections require their own estimate. Substituting the Cartesian projections and $|1-E|\le C u$ gives exactly

$$
|P\overline L_m e_1|\le C_M[1/(u^2|D|)+\beta/D^2],
$$

$$
|e_1^{\mathsf T}\overline L_m Q|\le C_M[1/(\beta u^2)+\beta/D^2+1/(\beta u|D|)].
$$

At either small-sine end, $u\ge c_M l/\beta$ and $|D|\ge c_M\beta$, so the corresponding sums are $O_M(\beta\sum l^{-2})=O_M(\beta)$. Away from those ends, $u$ has a constant floor; at level gap $kh$ below the old cap, $D^2\ge c_M\beta k$. Hence $\sum\beta/D^2=O_M(\log\beta)$. The remaining terms are smaller. The complete old mixed sums, including the unpaired caps, are $O_M(\beta+\log\beta)$; multiplication by $\mu=O_M(\beta)$ gives $o(\beta^3)$. The radial-balance identity terms are smaller still. A direct norm bound split at $|D|=\beta/4$ gives the sufficient old radial-entry bound $O_M(\beta^4)=o(\beta^6)$. These bounds also hold with one $s$ derivative.

## Newborn coefficients and persistence

Put $v=e^{-2s}$ and $C_1=2sv(1+t)-t(1+v)$. At either newborn root, write $D=d\varepsilon$, where $d\to\pm\kappa$ and $\kappa=1/(2a)$. The circle identity directly gives $u=1-\varepsilon^2/2+d\varepsilon^3+O(\varepsilon^4)$ and $E=v[1+s\varepsilon^2-2sd\varepsilon^3+O(\varepsilon^4)]$. The fold-gap identity gives the subject's common divisor-center asymmetry only at $O(\varepsilon^4)$, so it cannot change the paired coefficients retained here.

There is a short independently checkable reconstruction of the potentially delicate mixed-column term. For input $Q$, the source normal projection is

$$
q_n=-d(1-v)\varepsilon^2-\frac{C_1}{2}\varepsilon^3+O(\varepsilon^4).
$$

In $e_1^{\mathsf T}\mathcal M Q/W$, the order-$\varepsilon^{-2}$ terms from the quadratic normal tensor, mixed tensor and source-velocity tensor are respectively $-(1-v)/(2d)$, $(1+v)/(2d)$ and $-v/d$; they cancel. Its order-$\varepsilon^{-1}$ coefficient is $-C_1/(4d^2)$. Similarly, the radial mixed coefficient in $P\mathcal M e_1/W$ is $(1+v)/(4d^2)$. Both are even in $d$ and therefore survive multiplication by the two negative newborn weights. The projected row itself has leading coefficient

$$
\frac{P\mathcal M Q}{W}
=\varepsilon^2\left[sv(1+t)-1-\frac{C_1}{8d^2}\right]+o(\varepsilon^2).
$$

Using both weights $W\sim-1/(4\kappa\varepsilon)$ and $\mu\sim1/(a\varepsilon)$ gives

$$
\frac{\overline A_{11}}{\beta^6}\to-2a^2(1+v),\qquad
\frac{P\overline A e_1}{\beta^3}\to-a^2(1+v),\qquad
\frac{e_1^{\mathsf T}\overline A Q}{\beta^3}\to a^2C_1,
$$

and the newborn projected limit $1-sv(1+t)+a^2C_1/2$. The old bounds proved above justify these full-matrix limits. The Schur correction is $a^2C_1/2$, exactly cancelling the last newborn projected term. Adding the kinetic projection $s^2+2s(1-t)$ and old contribution $-1-2t+st$ leaves

$$
\overline S(s)\longrightarrow s^2+s-2\tanh s
$$

in $C^1$ on positive compact intervals. The radial entry is nonzero there for high enough rungs. For $f(s)=s^2+s-2\tanh s$, $f(0)=0$, $f'(0)=-1$, and $f''(s)=2+4\operatorname{sech}^2s\tanh s>2$ for $s>0$. Strict convexity and eventual positivity give exactly one positive zero with positive derivative. Uniform function and derivative convergence produces one simple positive Schur zero in any sufficiently small fixed neighborhood of it for all sufficiently high admitted balances. Shrinking the neighborhood gives $s\to\tau_*$; since $R\beta\to a$, this is precisely $\lambda/\beta\to\tau_*/a$. This local persistence argument needs no global root count.

## Controlled instrument and receipts

**Measured by the new independent checker:** `known` exited zero before `target`, verifying the analytical static acceleration tensor $\operatorname{diag}(-2,1)/8$, a non-diagonal Schur complement equal to one, the cubic coefficient $-1/8$ of $(2+q)^{-2}$, and an outward addition enclosure of $1/2$. The subsequent target exited zero, checking the Cartesian exact-projection identity, algebraic newborn and fixed-pair coefficient reductions, and the outward scalar bracket. The lower endpoint satisfies $f<-1.0852\times10^{-17}$, the upper satisfies $f>1.2900\times10^{-17}$, and the derivative on the whole bracket is greater than $1.1876170732250293$.

Script SHA-256: `6f1b4dac75b021f57a2e64f067b62047e3364d90dc6e16f2f9629f4e932e6694`. Receipts under `.local-data/ring-exploration/slow-planar-independent/`: `known.json`, `a15890a5d78857abe02e8b2e6dc5e90c63e5c62bf4096aa6e0b7e287e6cca681`; `target.json`, `cb0e580fdf3a0ad81f0093dc2de4f4bccb9643187c2263c38ff02296d24aeac1`. Exact binary interval endpoints are retained. The instrument does not compute a finite ring spectrum or certify the analytical whole-ledger estimates by a finite scan.

An exploratory scratch Laurent extraction initially produced a mixed-column disagreement because it extracted coefficients from unsimplified rational expressions with powers of $\varepsilon$ still hidden in denominators. That attempt is rejected evidence. Direct Cartesian component coefficients, shown above, resolve the discrepancy; the durable instrument verifies their explicit reductions rather than reusing that extraction path. No correction to the frozen subject was needed.

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_slow_planar_independent_adjudication_20261003.py known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_slow_planar_independent_adjudication_20261003.py target
```

Recommended next action: integrate the derived asymptotic slow branch at its stated formal grade. To obtain a finite starting rung or a full common-sector root count, separately bound the constants in these uniform estimates and the balance asymptotics; another finite fitted sequence would not settle either obligation. No shared queues, trackers, indexes, manuscript, log, ranking, scenario or frozen scientific subject was edited by this review.
