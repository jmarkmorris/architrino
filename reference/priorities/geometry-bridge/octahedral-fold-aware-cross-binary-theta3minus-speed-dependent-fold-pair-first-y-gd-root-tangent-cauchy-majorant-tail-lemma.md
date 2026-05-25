# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Root-Tangent Cauchy-Majorant Tail Lemma

Promotion status: `priority-only`.

This packet gives the analytic reduction that prevents the first-y $G,D$
successor program from becoming only an endless coefficient ladder. It does not
certify the h38 tail numerically. It proves the exact majorant form a future
interval certificate must satisfy after the h37 coefficient row:

$$
T_G^{(38)}
=
\operatorname{Shift}_{40}(P-L-y^2A_{G,37}),
\qquad
T_D^{(38)}
=
-39T_G^{(38)}
-\mathcal D_y^{(X_{38})}T_G^{(38)}.
$$

The point of the lemma is simple: once the first $38$ quotient rows have been
removed, a single analytic bound on the remaining numerator on a complex
polydisc bounds the whole residual tail. The finite h38, h39, and later rows
may still be useful diagnostics, but they are no longer the only mathematical
route.

## Setup

Let

$$
Y=0.001796875
$$

be the real first-y collar radius used by the directed-rounded coefficient
packets, and choose a complex radius $\rho>Y$ in the $y$ coordinate. Let
$\rho_X>0$ be a complex radius around the future $X_{38,\varepsilon}$ successor
root graph. Define the post-h37 numerator

$$
N_G(y,X,\nu)
:=
P(y,X,\nu)-L(\nu)-y^2A_{G,37}(y,\nu).
$$

The h37 packet and the formal recurrence imply that the relevant real branch
has no remaining $G$ numerator coefficients below the shifted h38 tail, so

$$
N_G(y,X,\nu)
=
y^{40}T_G^{(38)}(y,X,\nu)
$$

on the successor chart. The correlated $D$ tail is not evaluated by a separate
raw inverse. It is controlled through

$$
\mathcal D_y^{(X_{38})}
=
y\partial_y+\Xi_\varepsilon\partial_{X_{38}},
\qquad
\Xi_\varepsilon
=
-\frac{y\,\partial_yR_{\varepsilon,41}}{J_\varepsilon}.
$$

## Cauchy-Majorant Lemma

Assume $N_G$ is analytic on the closed polydisc

$$
\mathcal P_{\rho,\rho_X}
=
\{(y,X,\nu): |y|\le\rho,\ |X-X_{38,\varepsilon}(0,\nu)|\le\rho_X,
\nu\in[3.02156,3.02157]\}
$$

and that a directed-rounded interval certificate proves

$$
\sup_{\mathcal P_{\rho,\rho_X}}|N_G|\le M_G,
\qquad
\sup_{\mathcal P_{\rho,\rho_X}}|\Xi_\varepsilon|\le \Xi_*.
$$

Set

$$
q=\frac{Y}{\rho}.
$$

Then, for $0\le y\le Y$ on the certified speed enclosure,

$$
\sup |T_G^{(38)}|
\le
\frac{M_G}{\rho^{40}(1-q)}.
$$

The root-tangent term obeys

$$
\sup |\mathcal D_y^{(X_{38})}T_G^{(38)}|
\le
\frac{M_G}{\rho^{40}}
\left(
\frac{q}{(1-q)^2}
+
\frac{\Xi_*}{\rho_X(1-q)}
\right).
$$

Consequently the h38 continuous tail closes if the same certificate proves

$$
\frac{M_G}{\rho^{40}(1-q)}
<
B_{G,38},
$$

and

$$
\frac{M_G}{\rho^{40}}
\left(
\frac{39}{1-q}
+
\frac{q}{(1-q)^2}
+
\frac{\Xi_*}{\rho_X(1-q)}
\right)
<
B_{D,38}.
$$

For the current h37 successor,

$$
B_{G,38}=1.82989295868\times10^{103},
\qquad
B_{D,38}=1.82977192800\times10^{103}.
$$

## Proof

Write

$$
N_G(y,X,\nu)=\sum_{m\ge40}n_m(X,\nu)y^m.
$$

Cauchy's estimate on the $y$ disc gives

$$
|n_m(X,\nu)|\le M_G\rho^{-m}.
$$

Therefore

$$
|T_G^{(38)}|
\le
\sum_{r\ge0}M_G\rho^{-(r+40)}Y^r
=
\frac{M_G}{\rho^{40}(1-q)}.
$$

For the first part of the root-tangent derivative,

$$
|y\partial_yT_G^{(38)}|
\le
\sum_{r\ge0}rM_G\rho^{-(r+40)}Y^r
=
\frac{M_G}{\rho^{40}}\frac{q}{(1-q)^2}.
$$

Cauchy's estimate in the $X$ coordinate gives

$$
|\partial_{X_{38}}n_m|
\le
\frac{M_G}{\rho_X\rho^m},
$$

so

$$
|\partial_{X_{38}}T_G^{(38)}|
\le
\frac{M_G}{\rho_X\rho^{40}(1-q)}.
$$

Combining the two derivative estimates and multiplying by the certified
$\Xi_*$ bound proves the root-tangent inequality. The $D$ inequality follows
from

$$
T_D^{(38)}
=
-39T_G^{(38)}
-\mathcal D_y^{(X_{38})}T_G^{(38)}.
$$

## Claim Boundary

This packet may claim:

$$
\texttt{reduces\_h38\_continuous\_tail\_closure\_to\_cauchy\_majorant=true}.
$$

It may also claim that the h38 $D$ tail does not need a separate raw
$F_\delta$ inverse if the root-tangent $G$ majorant closes the displayed
inequalities.

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
\qquad
\texttt{retained\_branch=false}.
$$

The missing numerical artifact is a directed-rounded polydisc certificate for
$M_G$, $\Xi_*$, $\rho$, and $\rho_X$ satisfying the two displayed h38 budget
inequalities.
