# T02 ancient departure: a specified fast mode and finite series evaluation

## Result and boundary

The adjudicated ancient-history construction can be specialized to a characteristic root in the certified fast T02 interval near $\lambda=10.65842417404937$, without proving that root is the largest positive real root. The new ingredient is the invertibility of $A(n\lambda)$ for every integer $n\geq2$: three outward interval determinant enclosures handle $n=2,3,4$, and the inherited radius-43 spectral confinement handles every $n\geq5$. **Grade: derived conditional extension, pending a separately constructed adjudication of this new result.** Its premises are the accepted exact T02 balance, complete eight-root ledger and frozen characteristic certificate. It is an ancient coupled history, not a present-time impulse with an arbitrarily prescribed past.

The new instrument computes its formal series through degree eight. The coefficients grow rapidly, and the quantitative convergence radius has not been enclosed. **Grade: measured finite Taylor coefficients and polynomial evaluations only.** The calculation does not establish a finite-amplitude history at the displayed amplitudes and does not identify its later fate as another rung, a fold, a wake-speed event or dispersal. An impossible negative delay in a polynomial evaluated too far from zero is failure of that extrapolation, not evidence of a causal event.

The law is the unchanged Master Equation, with $K=c_f=1$ in every number, acceleration language, all ordinary positive-delay self roots included, and no cap, receiver multiplier, root exclusion or event rule. Only the common planar radius and phase sector is evaluated. The [adjudicated local construction](t02-nonlinear-history-independent-adjudication-2026-10-03.md) and its [subject](t02-admissible-nonlinear-history-connection.md) remain the owners of local existence and nonlinear instability.

## 1. Specific-mode nonresonance

Let $A(z)$ be the Cartesian rotating-frame characteristic matrix of the [independent T02 evaluation](t02-symmetric-characteristic-independent-evaluation.md). Its reference is an exact ring with eight ordinary hits per receiver, 48 directed hits in all, including one positive-delay self hit per receiver. Its strictly positive delay floor is greater than $0.3608$ and its minimum absolute transmitter factor exceeds $0.1955$. The complete past has no additional hits by the admitted bounded-history chart argument; merely summing the eight rows would not establish that complement.

The certificate's fast trial bracket encloses at least one real zero of $\det A$ and lies inside

$$
10.6584241740493694042984<\lambda<10.6584241740493694043185.
$$

The new interval computation consumes the certificate's authoritative binary bounds for every delay and each $C,F,H$ entry, rather than treating their printed decimal displays as exact. The printed trial endpoints, recorded to 75 significant figures, are widened by $10^{-70}$ before reuse. For every $\lambda$ in that widened bracket the following conservative decimal intervals enclose the determinants:

| Matrix | Outward determinant enclosure, conservatively widened for this display |
| --- | --- |
| $A(2\lambda)$ | $[154036.45285,154036.45286]$ |
| $A(3\lambda)$ | $[926970.87898,926970.87899]$ |
| $A(4\lambda)$ | $[3093137.50792,3093137.50793]$ |

**Grade: measured interval signs**, instrument [ring_unstable_series_evaluation_20261003.py](../../../../../scripts/braid-program/ring_unstable_series_evaluation_20261003.py), target receipt `.local-data/ring-exploration/unstable-series/target.json`. The certificate itself is an inherited premise, not independently recalculated here. The interval matrix operation is a new bounded use of those premises.

For $n\geq5$, $n\lambda>53.29>43$. The accepted confinement theorem therefore gives $\det A(n\lambda)\ne0$. Its numerical constants are $B_1=34$ and $B_0=318$, so the same induced infinity norm argument also supplies

$$
\|A(z)^{-1}\|_\infty\leq\frac{1}{z^2-34z-318},\qquad z\geq5\lambda.
$$

Indeed write $A(z)=z^2I+E(z)$, with $\|E(z)\|_\infty\leq34z+318$, and sum the geometric inverse series. The denominator is positive at $5\lambda$ and increases thereafter. The corresponding weighted bound $n^2/(n^2\lambda^2-34n\lambda-318)$ decreases for $n\geq5$. Thus finite inverse bounds for $n=2,3,4$, plus this tail bound, give explicit finite bounds for both $\sup_{n\geq2}\|A(n\lambda)^{-1}\|_\infty$ and $\sup_{n\geq2}n^2\|A(n\lambda)^{-1}\|_\infty$, recorded in the receipt.

The resulting conservative displayed bounds are $B<0.003583$ and $B_2<0.035206$ in the infinity coefficient norm. The computed interval upper bounds, rounded upward here, are $0.003582870805$ and $0.035205414718$, respectively. These close the inverse-operator part of the quantitative certificate; they do not close the nonlinear-map majorant.

This is sufficient to replace the maximal-root choice in the accepted proof: choose any root in the fast interval, solve its real null vector, and apply the same analytic coefficient-space contraction. The new interval check also encloses $A_{12}(\lambda)$ away from zero, conservatively inside $[-97.562,-97.561]$, so its first radial component can be normalized to $R$. The leading vector is then

$$
\mathbf u_1=R\left(1,-A_{11}(\lambda)/A_{12}(\lambda)\right)^{\mathsf T}.
$$

No simplicity, count of positive roots, largest-root claim or all-sector statement is required. **Grade: derived conditional existence of a fast-mode ancient branch for sufficiently small amplitude.** Falsifier: a missing reference root, failure of the frozen characteristic certificate, an interval determinant containing zero at a required harmonic, or failure of the analytic delayed-composition estimates invalidates the corresponding premise or extension.

## 2. Formal recurrence from the nonlinear row

Write the common rotating displacement as

$$
\mathbf u(T)=\mathbf p(q),\qquad q=q_0e^{\lambda T},\qquad
\mathbf p(q)=\sum_{n\geq1}\mathbf u_nq^n.
$$

The sign of $q_0$ selects either local departure direction. The ancient limit is $T\to-\infty$, where $q\to0$. Neither sign changes the equation. At a reference row with scalar half-chord $x$, delay $\Delta=2R\sin x$ and signed transmitter factor $D_0$, the continued row is

$$
\begin{aligned}
q_s&=q e^{-\lambda d(q)},\\
\theta(q)&=-2x-\Omega[d(q)-\Delta],\\
\mathbf r(q)&=R\mathbf e_1+\mathbf p(q)-Q(\theta(q))[R\mathbf e_1+\mathbf p(q_s)],\\
\ell(q)&=\sqrt{\mathbf r(q)\cdot\mathbf r(q)},\\
\mathbf V_s(q)&=Q(\theta(q))\left[\Omega J(R\mathbf e_1+\mathbf p(q_s))+\lambda\sum_{n\geq1}n\mathbf u_nq_s^n\right],\\
D(q)&=1-\mathbf r(q)\cdot\mathbf V_s(q)/\ell(q),\\
\mathbf a(q)&=\frac{(-1)^m\mathbf r(q)}{\ell(q)^3\operatorname{sgn}(D_0)D(q)}.
\end{aligned}
$$

Here $m$ is the scalar root's lattice label, so $(-1)^m$ is the actual receiver/source polarity product. The continued delay solves $\ell(q)-d(q)=0$. Its derivative in $d$ at the circular reference is $-D_0$. If the coefficient $d_n$ is temporarily zero, the computed degree-$n$ gap coefficient $F_n$ therefore gives $d_n=F_n/D_0$. This signed denominator applies equally to the negative-$D$ rising branch and the ordinary self row. The algebra fixes each reference sign and is legitimate only while the true analytic history remains on that chart.

With Euler derivative $\mathcal E=q\,d/dq$, the exact rotating equation is

$$
\lambda^2\mathcal E^2\mathbf p+2\Omega\lambda J\mathcal E\mathbf p-\Omega^2(R\mathbf e_1+\mathbf p)-\sum\mathbf a=0.
$$

Its constant term vanishes by exact balance and its first term vanishes by $A(\lambda)\mathbf u_1=0$. At degree $n\geq2$, set $\mathbf u_n=0$, compute the remaining residual coefficient $\mathbf E_n$, and solve

$$
A(n\lambda)\mathbf u_n=-\mathbf E_n.
$$

This recurrence includes moved emission times, accelerated source velocities, the absolute transmitter factor on its fixed sign branch, and all eight reference roots. It is not a prescribed linear eigenhistory inserted into a nonlinear residual and called an evolution. **Grade: derived recurrence on the admitted analytic chart.** Falsifier: an independently expanded ordinary row disagreeing with the signed gap coefficient or this recurrence would overturn it.

## 3. Known controls and finite coefficients

The new Taylor algebra passed known analytical cases before its ring target. A stationary source at the origin and receiver at $(2+q,0)$ has implicit delay $2+q$ and acceleration $(2+q)^{-2}$. Through degree eight the instrument returned the delay exactly and every coefficient

$$
[q^n](2+q)^{-2}=(-1)^n\frac{n+1}{2^{n+2}}
$$

exactly. Exponential coefficients, $\sin^2q+\cos^2q=1$ and an exact polynomial-composition control also passed below $10^{-105}$. The final instrument's known receipt is `.local-data/ring-exploration/unstable-series/known.json`; the target refuses receipts produced by another instrument digest. **Grade: measured known-case controls, with the displayed closed forms as the independent references.**

Before constructing the target coefficients, the new nonlinear jet's first-order columns at $z=0.7$ and $z=20$ were compared with the frozen independently authored vector first variation. Their deviations are recorded in the target receipt. This is cross-instrument checking of the row expansion; it does not independently re-certify the exact ring or reference matrix intervals. The subject, frozen reference, and original evaluator were not modified.

The numerical point reference gives $\mathbf u_1\approx(0.975976431801691,0.233137410815621)$. The following coefficients are **measured point values**, rounded for display; they have no outward coefficient enclosure.

| $n$ | Radial Cartesian coefficient $u_{n,1}$ | Tangential Cartesian coefficient $u_{n,2}$ |
| --- | ---: | ---: |
| 1 | 0.975976431802 | 0.233137410816 |
| 2 | -17.0711606158 | -7.31646120353 |
| 3 | 580.122095257 | 289.431122710 |
| 4 | -26330.2911663 | -14124.9555432 |
| 5 | 1403902.66456 | 786035.134063 |
| 6 | -82927272.9068 | -47760806.4302 |
| 7 | 5257948788.05 | 3089622710.40 |
| 8 | -351129093569 | -209443786967 |

The degree-eight coefficient equations leave maximum absolute residual about $1.24\times10^{-60}$ using 110-digit arithmetic and the frozen reference's point entries printed to 75 significant figures. The increasing residual across coefficient order is finite-input rounding amplified by the growing coefficients. This residual is a numerical implementation check, not a nonlinear remainder estimate and not a proof that any finite-amplitude truncation solves the equation.

Falsifier: a separately authored jet expansion with the same exact reference and normalization disagreeing beyond the stated printed precision invalidates these coefficients. A finite coefficient discrepancy is distinct from the unresolved convergence radius.

## 4. What the finite polynomial shows and cannot show

The table evaluates the degree-eight polynomial, its associated velocity, and the continued degree-eight delay and factor polynomials. **Grade: measured polynomial diagnostics only.** Even at $|q|=0.001$, the last retained term is not a bound on the missing tail.

| $q$ | Radius of truncated position | Speed of truncated path | Smallest truncated $|D|$ | Norm of degree-eight position term |
| --- | ---: | ---: | ---: | ---: |
| -0.001 | 0.974982805990 | 1.82195002142 | 0.188988093652 | $4.09\times10^{-13}$ |
| 0.001 | 0.976935918354 | 1.83058943765 | 0.201644337637 | $4.09\times10^{-13}$ |
| -0.01 | 0.963362114336 | 1.74537769048 | 0.0762579903043 | $4.09\times10^{-5}$ |
| 0.01 | 0.984422453861 | 1.85787567131 | 0.242338853106 | $4.09\times10^{-5}$ |

The inward sign initially reduces radius and speed, whereas the outward sign initially increases both, as also follows from the leading vector. **Grade: derived infinitesimal direction, with the finite magnitudes measured only.** These are departures from the circle, not circles at another rung: radius and velocity vary in time, so comparing a single instantaneous speed with a rung does not establish rung transfer.

At $q=\pm0.05$, the degree-eight term has norm about $15.97$ and at least one delay polynomial is negative. That extrapolation no longer represents an ordinary causal row. It does not establish that the actual solution reached $D=0$ or crossed a causal fold. At $q=\pm0.1$, the same failure is still larger. Those deliberately retained failed polynomial evaluations make the finite instrument's reach visible.

No observation here distinguishes a later rung approach, periodic modulation, singular root chart, wake-speed event or dispersal. Falsifier for any future fate claim: an actual complete-root continuation with a certified remainder or independent validated EOM path displaying a different event would overturn that claimed fate; this report makes none.

## 5. Exact remaining convergence obligation

The accepted analytic proof guarantees a nonzero local radius in the coefficient norm. The harmonic inverse operator is now quantitatively bounded by Section 1, but the remaining constants have not been computed. To certify a displayed amplitude $q_0$, the following three finite obligations remain:

1. Enclose a numerical complete-history chart tube: active root brackets, positive range/delay floors, signed-$D$ floors, recent self and partner exclusion, and a strictly positive minimum causal gap on the compact inactive complement. The reference delay and $D$ floors alone do not control that complement under a nonlinear history perturbation.
2. Bound the implicit delay map in the coefficient algebra, including a numerical ball on which its square root and fixed-sign reciprocal remain analytic and $\|q e^{-\lambda d(q)}\|<\rho<1$. This requires quantified delay perturbation and derivative estimates, not only point values of the first eight $d_n$.
3. Supply a numerical quadratic remainder bound $\|\mathcal N(p)\|\leq C\|p\|^2$ and Lipschitz bound on that ball. With the now finite inverse bound $B$, close the contraction inequalities $4BC\varepsilon<1$ and the chart containment, then produce a remainder enclosure for the retained polynomial and its first two time derivatives.

**Grade: derived description of the missing certificate, with its current absence measured by the target receipt's explicit `convergenceRadius` field and the instrument's finite-order scope.** Merely extending the coefficient list or observing a small last term cannot replace these obligations. The current result advances the specified fast-mode branch and its finite local shape, while retaining the exact blocker to event-level evaluation.

## Reproduction and scope

Run the analytical controls before the target, with the shared venv:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_unstable_series_evaluation_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_unstable_series_evaluation_20261003.py --stage target
```

The frozen characteristic certificate consumed here has SHA-256 `ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6`. Its exact binary fields supply the interval premises. Its separate point control receipt supplies rounded point matrices and root coordinates for the finite series. No production solver is run and no existing oracle, proof, source, receipt, shared queue, qualification, ranking, score or scenario selection is changed. The coordinator owns integration and independent review.

Scoped validation uses `.tmp/ring-unstable-series/validate.mjs`, whose known fenced-code, mathematical-link and malformed-TeX controls precede the document target. Its receipt reports the actual KaTeX span count, local-link count, whitespace check and current instrument/control identity. These checks address syntax and provenance, not independent adjudication of the new nonresonance extension or coefficient recurrence.
