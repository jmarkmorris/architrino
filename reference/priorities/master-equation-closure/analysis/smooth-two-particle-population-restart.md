# Continuing from a complete population state

## Question and evidence boundary

The purpose of this calculation is to certify every affected architrino at the common time $h=13/4$, then use that state to continue the same supplied-history solution toward $H=15/4$. The earlier theorem already established existence and upward target motion through $h$, but its stored environmental histories ended at the earlier emission times needed by the targets. A new population estimate needs all affected positions and velocities at the same restart time, together with their complete earlier histories.

**Derived result, independently accepted:** the complete population state at $h$ is certified, and the unchanged Master Equation continues through $H=15/4$. Both selected targets rise throughout the added half interval, so no fifth turn has occurred. Their final height is between $0.0015120317$ and $0.0016600318$ lattice spacings. The requested next upward maximum remains open.

## 1. The same physical problem

There is one architrino at every site of the infinite simple cubic lattice $\ell\mathbb Z^3$. Its polarity is $\sigma_i=(-1)^{i_1+i_2+i_3}$. The selected neighboring sites are $0$ and $\ell e_1$. Both selected histories contain the same supplied vertical pulse; every environmental supplied past is stationary. At forward release, all displacements and velocities vanish. The [preparation assessment](smooth-two-particle-preparation-independent-adjudication.md) establishes the limitation: this prescribed complete past is not an unforced solution throughout the past. The result therefore concerns that particular preparation.

The wake speed is $c_f=1$, time is $t=T/\ell$, displacement is $y_i=(X_i-\ell i)/\ell$, and the fixed acceleration coupling is $g=16$. Both targets have the same height $z(t)$ by the accepted reflection symmetry. Common upward motion refers to this vertical height; the horizontal distance between the pair is a different quantity.

More explicitly, each selected supplied past is $y_i(s)=p(s+11/8)e_3$ for $s\le0$, where

$$
p(u)=\begin{cases}-(1-8u)u^4(1-4u)^4,&0\le u\le1/4,\\0,&\text{otherwise}.\end{cases}
$$

The supplied pulse runs from $s=-11/8$ to $s=-9/8$ and has maximum displacement magnitude $1/314928$. Every other supplied past is identically zero in displacement coordinates. These are the exact unchanged inputs of the [earlier full-law certificate](smooth-two-particle-later-certification.md).

The Master Equation, all causal roots and the original eight-source stationary block sum remain unchanged. The numerical comparison curve omits the stationary field, but the continuous residual includes its full bound. Consequently the final proof must control that omission as well as integration and interpolation error. No additional damping or restoring acceleration is supplied.

## 2. Which architrinos and interactions are included?

The [complete-population derivation](smooth-two-particle-population-restart-continuation.md) and [independent reconstruction](smooth-two-particle-population-restart-independent-adjudication.md) identify 504 environmental histories and the two selected targets by $h$: **506 affected identities**. Their first direct reception comes from squared anchor distance at most 21. A generated disturbance cannot reach a previously stationary environmental site before its direct initial front, by the triangle inequality and the separate check of the original unit neighbors. This proves that the population census is complete.

The new archive stores 505 paths, including the left target; the right target is stored separately. All end at $h$. Every retained earlier node is unchanged, and the left-target polynomial is the exact reflected right-target polynomial. The [construction note](smooth-two-particle-population-restart-approximant.md) explains the source-table order and incoming-history domains.

The environmental equations through $h$ receive 9692 generated directed channels from 248 earlier histories through $73/32$. The two targets receive another 120 such channels. The independent old-pulse census has 860 directed channels. Conservative numerical candidate lists also contain inactive rows; those list lengths are not the physical active-channel counts. The infinite stationary complement remains in the block sum. These are complete causally relevant interactions, rather than an isolated 506-particle simulation.

Each new generated source time satisfies

$$
s\le h-1+\frac1{2000}+\frac1{40000}<\frac{73}{32}.
$$

Thus the population construction never requires an invented or extrapolated future source history. The restart retains the complete supplied and evolved past; it does not replace a history-dependent equation with a position-and-velocity-only initial-value problem.

## 3. A usable state at the restart

The [continuous certificate](smooth-two-particle-population-restart-certificate.py) encloses the exact dyadic quintic polynomials, including the spaces between numerical nodes. Its outward full-population polynomial bounds are

| Quantity through $13/4$ | Polynomial bound |
| --- | ---: |
| Displacement norm | $0.000416851016$ |
| Velocity norm | $0.000978172322$ |
| Acceleration norm | $0.004612912909$ |

The largest displacement and velocity belong to environmental paths. A bound on the selected pair alone would therefore be insufficient. Actual state bounds also require the complete acceleration residual and propagation of every received-source error.

The continuous environmental residual is below $3.196037\times10^{-8}$ through $89/32$ and $1.622542\times10^{-6}$ over the remaining suffix through $h$. These satisfy the theorem's respective budgets $10^{-6}$ and $2\times10^{-6}$. The stationary contribution alone accounts for almost all of the latter bound; it has not been removed from the actual equation. The instrument checks 3968 time subcells for every environmental path, with the latest generated emission below $2.250391627<73/32$.

The independently accepted sufficient actual bounds are

$$
|y_i(h)|<\frac1{2000},\qquad |y_i'(h)|<\frac1{1000},\qquad |y_i''(h)|<\frac1{100}.
$$

The independent comparison gives tighter complete-population endpoint bounds of $0.000418435$ in displacement and $0.000983849$ in speed, supporting the displayed allowances. The displacement bound also gives a simple simultaneous separation statement: two architrinos anchored at neighboring sites remain more than $1-2/2000=0.999$ lattice spacings apart at $h$. This uses their positions at the same time, not a causal range to an earlier source position.

## 4. Why the later restart can help

The earlier uniform estimate applied the largest source displacement over an unnecessarily long reception interval. The new comparison begins at $h$ with the small certified population state and divides the required source prefix into sixteen successive intervals of length $1/32$. A later, larger displacement is used only after the corresponding source time.

The [restart derivation](smooth-two-particle-population-restart-continuation.md) retains both endpoint terms in every integrated vector-source contribution, the lower emission-time primitive, the stationary field and all newly reachable lattice sites. Its accepted comparison is

$$
Y(t)=\frac1{2000}+\frac{29}{1000}(t-h),\qquad h\le t\le H.
$$

Here $Y$ bounds displacement; it is an estimate, not a trajectory or an additional acceleration law. At $H$, it is $0.015<1/64$. Strict velocity and acceleration estimates close the same comparison, and all required emissions remain before $89/32$. Independently enclosed polynomial histories and their propagated errors discharge all sixteen source-time hypotheses. The whole-population displacement estimate also keeps simultaneous separations between initially neighboring labels above $0.97$ lattice spacings through $H$.

By $H$, 674 environmental histories and both targets have become nonconstant: **676 affected identities**. The theorem covers their motion without requiring a stored polynomial for every path through $H$, because every incoming emission on this half interval belongs to the already certified earlier histories. The complete directed census includes 1160 original pulse channels, 17204 certainly admitted generated channels and 336 additional channels retained as potentially active near the endpoint. Each final target has exactly 85 changed source identities. The infinite stationary complement remains in the original sum.

## 5. The pair is still rising through $15/4$

The final-target residual is below $8.936836\times10^{-5}$, including the infinite stationary field. The [sign instrument](smooth-two-particle-population-restart-turns.py) combines the continuous polynomial bounds with independently supported uniform errors $7.4\times10^{-5}$ in position and $3.1\times10^{-4}$ in velocity. It gives

$$
\begin{aligned}
z'(t)&>0.0005698356935 &&(13/4\le t\le15/4),\\
0.0015120317&<z(15/4)<0.0016600318,\\
0.0043753735&<z'(15/4)<0.0049953736.
\end{aligned}
$$

The previous accepted signs cover the interval from the fourth minimum to $13/4$. Combining them with the new continuous positive-velocity bound excludes any fifth turn through $15/4$.

Let $m_4$ be the fourth minimum and $M_3$ the preceding maximum. The unfinished rise is $U(t)=z(t)-m_4$, and the preceding completed fall is $D_4=M_3-m_4$. Preserving their shared minimum in the interval calculation gives

$$
2048.7749787<\frac{U(15/4)}{D_4}<2810.2998887.
$$

This certifies a much larger subsequent rise for the fixed preparation. It does not locate the next maximum or establish all-time growth. The independent reviewer reconstructs the population comparison, source-time errors, complete censuses and continuous polynomial signs separately before accepting the combined result.

## 6. Validation and open question

Known analytical cases precede every new target calculation. They cover interval arithmetic, implicit source times, quintic derivatives, signed accumulation, per-path prefix norms and continuous increasing motion. A separate arbitrary-size integer calculation checks exact polynomial endpoint identities and neighboring position, velocity and acceleration equalities for all 505 stored paths across the new suffix. Reusing the original numerical kernel is construction provenance, not independent validation of the equation.

Local evidence is retained at the literal path `.local-data/master-equation-closure/population-restart/`, with construction under `approximant/` and outward certificates under `check/`. The [independent assessment](smooth-two-particle-population-restart-independent-adjudication.md) records the accepted boundary and its independently derived estimates. Earlier accepted subjects, instruments and numerical archives remain unchanged.

The population and final-target residual instruments complete with exit code zero, recording 1127.828 and 8.451 seconds respectively by their internal calculation timers. Independent receipt reconciliation checks all 9692 environmental edges, all 85 target identities, exact retained prefixes, all 31 consecutive residual bins, source-time coverage and the final signs. The local figure `approximant/diagnostics/common-height.png` under the evidence directory shows the accepted height bands through $15/4$ and the earlier four turns on an enlarged inset scale. Its center curve remains a numerical approximation; the enclosure and continuous sign proof carry the actual-motion claim.

An omitted identity or causal row, uncovered source time, false zero interval, altered inherited node, incorrect polynomial join, failed residual bound or nonpositive velocity enclosure would invalidate the associated claim. A continuation endpoint alone does not identify the requested next maximum. Eventual settling, all-time growth and behavior under other preparations remain unresolved.

### Reproducing the continuous checks

The commands below read the frozen local population and target archives and their accepted predecessor receipts. They write a separate `recheck/` directory, preserving the original checking receipts. The source files contain the independently known controls, which must pass first. Watched execution follows the repository's owned-computation procedure.

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-population-restart-certificate.py known --output-dir .local-data/master-equation-closure/population-restart/recheck
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 2400 -- "${AAA_VENV:-../.venv}/bin/python" -u reference/priorities/master-equation-closure/analysis/smooth-two-particle-population-restart-certificate.py residual --output-dir .local-data/master-equation-closure/population-restart/recheck
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 600 -- "${AAA_VENV:-../.venv}/bin/python" -u reference/priorities/master-equation-closure/analysis/smooth-two-particle-population-restart-certificate.py target --output-dir .local-data/master-equation-closure/population-restart/recheck
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-population-restart-turns.py known --output-dir .local-data/master-equation-closure/population-restart/recheck
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-population-restart-turns.py signs --position-error 0.000074 --velocity-error 0.00031 --output-dir .local-data/master-equation-closure/population-restart/recheck
```

These computations check the polynomial defects and signs. The continuation theorem and independently reconstructed error bounds remain necessary to turn them into statements about actual motion.
