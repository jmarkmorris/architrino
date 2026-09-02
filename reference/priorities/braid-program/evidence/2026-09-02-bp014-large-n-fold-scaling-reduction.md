# BP-014 Large-$N$ Fold-Scaling Reduction

Status: derived causal-fold lemma; measured branch split; limiting balance kernel open

## Scope

This packet advances the regular alternating $2N$-gon large-$N$ problem with normalized wake speed $c_f=1$. It derives the causal-root birth scale and corrects the assumption that all accepted $N=2$ through $N=12$ rows lie on one topology branch. It does not prove a limiting balance constant, compatible-radius law, branch uniqueness, evolution, retention, stability, or physical scaling law.

## Exact root and acceleration equations

For receiver phase zero and transmitter $k$, set

$$
\phi_k=\frac{k\pi}{N},
\qquad
\epsilon_0\epsilon_k=(-1)^k.
$$

Every causal delay angle $\chi$ satisfies

$$
\chi
=
2\beta\left|\sin\frac{\chi-\phi_k}{2}\right|,
\qquad
0<\chi\leq2\beta.
$$

With $a=\phi_k-\chi$, $q=\sin(a/2)$, $c=\cos(a/2)$, and

$$
J=\left|1+\beta\operatorname{sgn}(q)c\right|,
$$

one root contributes

$$
A_{r,k}=\frac{(-1)^k}{4|q|J},
\qquad
A_{t,k}=-\frac{(-1)^k\operatorname{sgn}(q)c}{4q^2J}.
$$

Balance requires the complete tangential sum to vanish. A compatible positive radius then requires

$$
\frac{R}{R_*}
=
-\frac{\sum A_{r,k}}{\beta^2}>0.
$$

The antipodal polarity is $\epsilon_{k+N}=(-1)^N\epsilon_k$: odd $N$ has opposite-polarity antipodes, while even $N$ has like-polarity antipodes.

Plainly: parity changes the antipodal channel before any limit is taken, so even and odd subsequences must be tracked separately.

## Accepted branch split

The accepted finite ledgers have the following roots per receiver:

| $N$ | Roots per receiver |
| ---: | ---: |
| 1 | 4 |
| 2 | 6 |
| 3 | 12 |
| 4 | 10 |
| 5 | 12 |
| 6 | 14 |
| 7 | 28 |
| 8--12 | $2N+2$ |

In particular, the accepted $N=7$ row at $\beta=2.971792998251308\ldots$ lies on the $4N$-root topology, not the low-speed $2N+2$ topology followed by the accepted $N=8$ through $N=12$ rows. A single topology branch through every accepted $N=2$ through $N=12$ row is therefore falsified by the current ledgers.

Plainly: the existing table contains balances from more than one root-birth branch. A large-$N$ theorem must select a coherent branch rather than fit across that jump.

## Fold-count lemma

For $\beta>1$, consider the lobe immediately after $\chi=\phi_k$ with residual

$$
f(\chi)
=
2\beta\sin\frac{\chi-\phi_k}{2}-\chi.
$$

This function is strictly concave on the lobe. Its unique maximum occurs at

$$
\chi_*=\phi_k+2\arccos(1/\beta).
$$

Define

$$
L(\beta)
=
2\left(\sqrt{\beta^2-1}-\arccos(1/\beta)\right).
$$

Provided $\chi_*<2\beta$, the lobe has two ordinary roots when $\phi_k<L(\beta)$, one fold root when equality holds, and no root when $\phi_k>L(\beta)$. Near $\beta=1$, writing $\delta=\beta-1$ gives

$$
L(1+\delta)
=
\frac{4\sqrt2}{3}\delta^{3/2}
+O(\delta^{5/2}).
$$

Consequently, retaining a fixed number of post-zero root-pair births as $N\to\infty$ requires

$$
\beta_N-1=O(N^{-2/3}).
$$

More precisely, if

$$
\beta_N=1+cN^{-2/3}+o(N^{-2/3}),
$$

then, away from fold thresholds, the number of these births approaches

$$
\left\lfloor
\frac{4\sqrt2}{3\pi}c^{3/2}
\right\rfloor.
$$

This establishes the exponent forced by the causal-fold geometry. It does not establish that a tangential balance exists on the resulting scaled branch.

Plainly: keeping the same small root topology while the polygon gains sites forces the speed excess above one to shrink like $N^{-2/3}$. The coefficient and the balance itself still require the acceleration sum.

## First-birth theorem target

The accepted $N=8$ through $N=12$ rows give discovery-only values of $(\beta_N-1)N^{2/3}$ decreasing from about $1.56$ to $1.52$. They lie in the first-birth window

$$
\left(\frac{3\pi}{4\sqrt2}\right)^{2/3}
<c<
2^{2/3}\left(\frac{3\pi}{4\sqrt2}\right)^{2/3},
$$

approximately $1.405<c<2.23$. The next proof object is a source-bound interval limit for the tangential residual in scaled coordinates

$$
x=N^{2/3}(\beta-1),
\qquad
h=\frac1N,
$$

treated separately for even and odd $N$. A unique zero of the limiting kernel with a controlled uniform remainder would establish a coherent first-birth branch and its speed constant. Only after that result should the radial sum be used to derive the compatible-radius order.

## Boundary and falsifier

The root equation, parity identity, and fold-count lemma are derived. The branch table and finite scaled values are measured. The $N^{-2/3}$ balance continuation is inferred, not proved; the radius order is open. A corrected complete root ledger that changes the branch table, an interval-certified first-birth balance outside the declared birth window, failure of the scaled tangential zero to remain in a compact $x$ interval, or a nonuniform remainder that prevents convergence falsifies the corresponding claim or proposed route.

Closure goal: prove the limiting first-birth tangential kernel and its unique zero separately on the even- and odd-$N$ subsequences, then derive the compatible-radius order.
