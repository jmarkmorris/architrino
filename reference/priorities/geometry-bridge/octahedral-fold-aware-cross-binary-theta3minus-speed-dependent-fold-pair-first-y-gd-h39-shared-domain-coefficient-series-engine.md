# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D H39 Shared-Domain Coefficient Series Engine

Promotion status: `priority-only`.

This packet is the coefficient-level predecessor to the h39 shared-domain
primitive diagnostic. The diagnostic consumes seven primitive bounds

$$
E_R,\quad \nu_J,\quad L_J,\quad \rho_X,\quad r_X,\quad M_G,\quad M_R,
$$

but those values cannot be safely assembled from unrelated symbolic rows. This
series engine constructs the common coefficient provenance for the two objects
that the future directed-rounded backend must bound:

$$
R_{\varepsilon,43}
=
\operatorname{Shift}_{43}
\left(
F_\varepsilon(y,h_{\varepsilon,\le38}+y^{39}X,\nu)
\right),
$$

and

$$
N_G=P-L-y^2A_{G,38}.
$$

The engine is not itself a retained branch certificate. It is the exact
coefficient-series layer from which the continuous h39 primitive witness is
built, and it now records source-certificate obstructions when an optional
source certificate cannot be computed on the requested envelope.

## Coefficient-Series Construction

The exported series context builds the same fold-pair chart used by the h38
coefficient packet, but one row farther. With $X=X_{39,\varepsilon}$ inserted
as the h39 successor variable, the branch coordinates are

$$
\delta_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2
+\sum_{k=0}^{38}h_{k,\varepsilon}y^{k+3}
+Xy^{42},
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2
-\sum_{k=0}^{38}h_{k,\varepsilon}y^{k+3}
-Xy^{42}.
$$

Substitution into

$$
F_\varepsilon
=
\delta_\varepsilon^2/\nu^2-2+\sin\phi_\varepsilon+\sin\delta_\varepsilon
$$

gives the shifted source coefficients of $R_{\varepsilon,43}$. At the leading
shifted coefficient, $X$ enters affinely: the engine verifies the coefficient
identity

$$
[y^{43}]F_\varepsilon(X)
=
[y^{43}]F_\varepsilon(0)
+X\left([y^{43}]F_\varepsilon(1)-[y^{43}]F_\varepsilon(0)\right).
$$

Thus the coefficient-level Jacobian row is already explicit:

$$
[y^0]\partial_XR_{\varepsilon,43}
=
[y^{43}]F_\varepsilon(1)-[y^{43}]F_\varepsilon(0),
$$

while the second-$X$ coefficient at the same shifted order is zero. This does
not make $L_J=0$ on a finite polydisc; higher shifted coefficients and
analytic remainders still supply continuous $X$-curvature.

The exact structural identities are stronger than the leading-coefficient
affinity. Since $\partial_X\delta_\varepsilon=y^{42}$ and
$\partial_X\phi_\varepsilon=-y^{42}$,

$$
\partial_XF_\varepsilon
=
y^{42}
\left(
\frac{2\delta_\varepsilon}{\nu^2}
+\cos\delta_\varepsilon
-\cos\phi_\varepsilon
\right),
$$

and

$$
\partial_X^2F_\varepsilon
=
y^{84}
\left(
\frac{2}{\nu^2}
-\sin\delta_\varepsilon
-\sin\phi_\varepsilon
\right).
$$

Therefore

$$
\partial_XR_{\varepsilon,43}
=
\operatorname{Shift}_{43}(\partial_XF_\varepsilon)
=
\frac{
2\delta_\varepsilon/\nu^2+\cos\delta_\varepsilon-\cos\phi_\varepsilon
}{y},
$$

where the quotient is read as the removable coefficient series at $y=0$, and

$$
\partial_X^2R_{\varepsilon,43}
=
\operatorname{Shift}_{43}(\partial_X^2F_\varepsilon)
=
y^{41}
\left(
\frac{2}{\nu^2}
-\sin\delta_\varepsilon
-\sin\phi_\varepsilon
\right).
$$

Thus the coefficient-only $L_J$ candidate is not generic bivariate curvature:
its first possible nonzero shifted row is suppressed until $y^{41}$. This is
a structural identity, not a directed-rounded shared-domain certificate.

Define the structural kernel

$$
K_\varepsilon
=
\frac{2}{\nu^2}
-\sin\delta_\varepsilon
-\sin\phi_\varepsilon.
$$

Then

$$
\partial_X^2R_{\varepsilon,43}=y^{41}K_\varepsilon.
$$

Consequently, on any shared graph-centered polydisc with $|y|\le\rho$, a
backend proof of

$$
M_K\ge
\max_\varepsilon\sup |K_\varepsilon|
$$

on the same speed and $X$ domain gives the theorem-level reduction

$$
\sup|\partial_X^2R_{\varepsilon,43}|
\le
\rho^{41}M_K.
$$

Thus the Lipschitz input may be supplied by the sufficient choice
$L_J^{\mathrm{red}}=\rho^{41}M_K$, or by any sharper certified shared-domain
bound for $\partial_X^2R_{\varepsilon,43}$.

The evaluator now has the finite branch-coordinate witness producer that
prepares this handoff. For each centered branch it can form the tuple

$$
(\nu_-,D_\varepsilon,\Phi_\varepsilon,B_\nu,
S_{\delta,\varepsilon},S_{\phi,\varepsilon};\mathfrak S),
$$

where $D_\varepsilon$ and $\Phi_\varepsilon$ are coordinate majorants with
Cauchy prefix-plus-geometric-tail envelope certificates, $B_\nu\ge 2/\nu_-^2$,
and $S_{\delta,\varepsilon},S_{\phi,\varepsilon}$ are
positive-Taylor/geometric-tail $\sinh$ envelope certificates. The finite-only
coordinate seminorm row remains open; the witness producer certifies a branch
only when the coordinate Cauchy envelopes and the $\sinh$ envelope
certificates are both supplied on the same $\mathfrak S$.

The engine also solves the h39 center coefficient:

$$
h_{39,\varepsilon}
=
-\frac{[y^{43}]F_\varepsilon(X=0)}
[y^{43}]F_\varepsilon(X=1)-[y^{43}]F_\varepsilon(X=0)}.
$$

After inserting this interval as the $X$ row, the leading shifted source
coefficient contains zero. This is the coefficient-level center solve for the
future graph-centered backend. It is not a finite $X_{39,\varepsilon}$ root
tube and does not by itself prove a continuous Rouché graph lift.

For the quotient numerator, the engine constructs the branch $G$ series,
sums the two fold-pair branches, and reads

$$
N_G=y^{41}T_G^{(39)}
$$

from the shifted coefficients $[y^{41+k}]P$. It also applies the structural
transformation

$$
D_{\mathrm{pair}}=(1-y\partial_y)G_{\mathrm{pair}}
$$

to emit the coefficient witnesses

$$
[y^k]T_D^{(39)}+(40+k)[y^k]T_G^{(39)}\ni0.
$$

These rows are coefficient provenance for $M_G$ and for the correlated h39
$D$ identity. They are not by themselves supremum bounds on a complex
graph-centered polydisc.

For a finite shifted coefficient prefix

$$
A(y)=\sum_{m=0}^{K}a_my^m,
$$

the engine also emits the coefficient-prefix seminorm

$$
\|A\|_{\rho,K}^{\mathrm{coef}}
=
\sum_{m=0}^{K}\max(|a_m^-|,|a_m^+|)\rho^m
$$

and the corresponding finite-prefix floor

$$
\operatorname{floor}_{\rho,K}^{\mathrm{coef}}(A)
=
\operatorname{dist}(a_0,0)
-
\sum_{m=1}^{K}\max(|a_m^-|,|a_m^+|)\rho^m.
$$

The summary deliberately names these as finite-prefix candidates. They may
guide the continuous backend, but they are not the final $E_R$, $\nu_J$,
$L_J$, $M_G$, or $M_R$ certificate values until analytic tails and outward
rounding are added.

## Shared-Domain Bound Functional

The next backend must replace the one-variable coefficient prefix with a
shared $y,X$ polydisc functional. Let $Z=X-X_c$ and let

$$
A(y,Z)=\sum_{p,q}a_{pq}y^pZ^q+\mathcal T_A(y,Z)
$$

on $|y|\le\rho$, $|Z|\le\rho_X$, where the backend supplies outward-rounded
coefficient intervals $a_{pq}\in[a_{pq}^-,a_{pq}^+]$ and a tail bound
$T_A\ge\sup|\mathcal T_A|$. Define

$$
\mathcal M_{\rho,\rho_X}(A)
=
\sum_{p,q}\max(|a_{pq}^-|,|a_{pq}^+|)\rho^p\rho_X^q+T_A.
$$

For a nonzero-centered quantity $J$ with constant coefficient $j_{00}$, define

$$
\mathcal F_{\rho,\rho_X}(J)
=
\operatorname{dist}(j_{00},0)
-
\sum_{(p,q)\ne(0,0)}
\max(|j_{pq}^-|,|j_{pq}^+|)\rho^p\rho_X^q
-T_J.
$$

The shared-domain primitive bounds consumed by the h39 reducer are therefore
obtained by the sufficient assignments

$$
E_R\ge\max_\varepsilon\mathcal M_{\rho,\rho_X}(R_{\varepsilon,43}),
\qquad
\nu_J\le\min_\varepsilon\mathcal F_{\rho,\rho_X}(\partial_XR_{\varepsilon,43}),
$$

$$
L_J\ge
\max_\varepsilon\mathcal M_{\rho,\rho_X}(\partial_X^2R_{\varepsilon,43}),
\qquad
M_R\ge
\max_\varepsilon\mathcal M_{\rho,\rho_X}(y\,\partial_yR_{\varepsilon,43}),
$$

and

$$
M_G\ge\mathcal M_{\rho,\rho_X}(N_G).
$$

Equivalently, using the structural kernel
$K_\varepsilon=2/\nu^2-\sin\delta_\varepsilon-\sin\phi_\varepsilon$, the same
interface may provide

$$
M_K\ge\max_\varepsilon\mathcal M_{\rho,\rho_X}(K_\varepsilon),
\qquad
L_J\ge\rho^{41}M_K.
$$

This is a coefficient/continuous-backend interface: the identity supplies the
$\rho^{41}$ reduction, while $M_K$ is still a continuous shared-domain
majorant that must include outward rounding and analytic tails.

A conservative continuous source for $M_K$ is already available before the
full shared-domain backend for $E_R,\nu_J,M_G,$ and $M_R$ is closed. On the
same graph-centered polydisc, let $D_\varepsilon$ and $\Phi_\varepsilon$ be
outward-rounded coordinate seminorm bounds satisfying

$$
|\delta_\varepsilon|\le D_\varepsilon,
\qquad
|\phi_\varepsilon|\le \Phi_\varepsilon.
$$

Since the entire-series estimate gives $|\sin z|\le\sinh(|z|)$ for complex
$z$, and $\nu\in[\nu_-,\nu_+]$ with $\nu_->0$, a sufficient kernel majorant is

$$
M_K^{\mathrm{coord}}
=
\max_\varepsilon
\left(
\frac{2}{\nu_-^2}
+\sinh(D_\varepsilon)
+\sinh(\Phi_\varepsilon)
\right).
$$

Thus the Lipschitz input may conservatively be taken as

$$
L_J^{\mathrm{red}}=\rho^{41}M_K^{\mathrm{coord}}.
$$

This is a continuous kernel bound only for the $X$-curvature row. It does not
supply $E_R$, $\nu_J$, $M_G$, $M_R$, Rouché slack, the h39 scalar diagnostic
pass, or retained branch status.

This is a theorem-level interface rather than a new gate: if the right side of
the $J$ floor is positive and the five majorants are computed on the same
declared $y,X$ polydisc, the existing Rouché and h39 scalar reducer already
know how to consume them. The current executable helper now includes
multivariate coefficient-prefix majorant and floor functions implementing
$\mathcal M_{\rho,\rho_X}$ and $\mathcal F_{\rho,\rho_X}$ for any finite
coefficient list plus an explicit tail majorant.

The h39 scalar reducer now also exposes primitive slack tolerances for the
same interface. Once a candidate tuple
$E_R,\nu_J,L_J,\rho_X,r_X,M_G,M_R$ is supplied, it computes the current
product $(\nu_J-L_J\rho_X)(\rho_X-r_X)$, the required product floor
$M_R/C_D$, and the strict one-at-a-time admissible intervals or ceilings for
each primitive value. The coefficient-series engine still does not certify
continuous primitive bounds by itself, but it can now report whether its
candidate finite-prefix and kernel-continuous values sit inside the exact
Rouché-primitive slack region that a directed-rounded backend must prove.
The scalar reducer also accepts candidate analytic-remainder allowances and
tests the resulting pessimistic rectangle, giving the coefficient-series route
a concrete measure of how much continuous tail can be added before the h39
primitive certificate fails.
It now also accepts an analytic-remainder profile direction and returns a
candidate maximum scale using the monotone safe floor
$J_{\mathrm{rob}}\sigma_{\mathrm{rob}}$, so the coefficient-series route can
compare finite-prefix values plus a whole continuous-tail pressure profile
against one scalar h39 margin.
The shared-domain evaluator now emits the first such concrete profile replay:
`computeH39FinitePrefixPrimitiveProfileScaleReplay` starts from the
finite-prefix tuple
$(E_R^0,\nu_J^0,L_J^0,M_G^0,M_R^0)$, derives the known
$L_J$ pressure
$\ell_J=\max(0,L_J^{\mathrm{red}}-L_J^0)$ from the kernel-reduced continuous
majorant, and calls the profile-scale reducer on the same replayed
$\rho_X,r_X$. With no extra Cauchy data, this proves that the known $L_J$
continuous pressure is not the current h39 bottleneck.
With explicit same-domain Cauchy outer inputs, the evaluator now also emits
candidate profile components for three formerly missing primitive directions:
the $R_{\varepsilon,43}$ shifted prefix-tail helper supplies
$e_R$ and $m_R$, and the $N_G=y^{41}T_G^{(39)}$ helper supplies the corrected
unshifted $m_G$ component. The optional $\nu_J$ profile component $n_J$ is
emitted only when a Jacobian Cauchy outer bound is supplied; without that
input, the evaluator leaves the $\nu_J$ tail-loss field null rather than
turning a coefficient floor into a continuous Jacobian floor.

The newest bridge removes one manual input layer for the source and Jacobian
directions. On an outer first-y radius $R_y$ with branch coordinate seminorms
$D_\varepsilon=\|\delta_\varepsilon\|_{R_y}$ and
$\Phi_\varepsilon=\|\phi_\varepsilon\|_{R_y}$, and with
$S_\nu=\sup_{\nu\in I_\nu}|\nu^{-2}|$, the source residual satisfies the
candidate outer bound

$$
B_{F,\varepsilon}^{\mathrm{out}}
=
S_\nu D_\varepsilon^2+2+\sinh D_\varepsilon+\sinh\Phi_\varepsilon.
$$

For the removable Jacobian numerator
$H_\varepsilon=y\,\partial_XR_{\varepsilon,43}$, a larger numerator radius
$R_H$ and smaller Jacobian radius $R_J<R_H$ give

$$
B_{H,\varepsilon}
=
2S_\nu D_\varepsilon+\cosh D_\varepsilon+\cosh\Phi_\varepsilon,
\qquad
B_{J,\varepsilon}^{\mathrm{out}}
=
\frac{B_{H,\varepsilon}}{R_H-R_J}.
$$

The evaluator takes the maximum over the two centered fold branches and feeds
these coordinate-derived $B_F^{\mathrm{out}}$ and
$B_J^{\mathrm{out}}$ into the same analytic-remainder profile replay. These
profile replays remain candidate-only and explicitly mark shared-domain
closure incomplete because the coordinate seminorms are still broad and are
not yet a retained directed-rounded polydisc certificate.

The finite-prefix candidates already show that the scalar Rouché reducer is
not the apparent bottleneck once $L_J^{\mathrm{red}}$ is used. Let
$r_R^-$ be the lower Rouché boundary

$$
r_R^-=
\frac{2E_R}{\nu_J+\sqrt{\nu_J^2-2L_JE_R}},
$$

with the usual $E_R/\nu_J$ interpretation when $L_J=0$. The executable replay
uses the explicit candidate policy

$$
\rho_X=2r_R^-,
\qquad
r_X=r_R^-+\frac12(\rho_X-r_R^-).
$$

This is a scalar feasibility replay, not a primitive-bound certificate: the
inputs are still finite-prefix $E_R,\nu_J,M_G,$ and $M_R$ candidates plus the
kernel-continuous $L_J^{\mathrm{red}}$ candidate. Its value is that it
separates two problems. The Rouché algebra has a strict radius choice with
large margin for the displayed candidate tuple; the remaining proof burden is
to replace the finite-prefix candidates by directed-rounded shared-domain
majorants and floors with analytic remainders on the same $y,X,\nu$ polydisc.

The raw Cauchy shifted-tail route is now also pinned down, and it explains why
the backend must use shifted coefficient structure rather than only an
unshifted outer-disc source bound. Let $\rho$ be the target first-y radius,
let $R_y>\rho$ be an outer Cauchy radius, and set $q=\rho/R_y$. If $F$ is
analytic on $|y|\le R_y$, $|F|\le B_F$, and the lower coefficients vanish so
that $F(y)=y^N\operatorname{Shift}_N F(y)$, then

$$
\sup_{|y|\le\rho}|\operatorname{Shift}_N F|
\le
\frac{B_F}{R_y^N(1-q)}
$$

and

$$
\sup_{|y|\le\rho}|y\partial_y\operatorname{Shift}_N F|
\le
\frac{B_F}{R_y^N}\frac{q}{(1-q)^2}.
$$

For the removable Jacobian numerator $H=yJ$ with leading coefficient $j_0$,
the nonconstant tail obeys

$$
\sup_{|y|\le\rho}|J-j_0|
\le
\frac{B_H}{R_y}\frac{q}{1-q},
$$

so a usable floor requires

$$
\operatorname{dist}(j_0,0)
>
\frac{B_H}{R_y}\frac{q}{1-q}.
$$

This is a sufficient theorem route, but the naive version is too wide on the
current collar. With $\rho=0.001$, $R_y=0.001796875$, $D\approx0.73$,
$\Phi\approx0.42$, and $\nu_-\approx3.02156$, the raw outer-disc source
majorant gives candidate $E_R\approx8.43\times10^{118}$ and
$M_R\approx1.06\times10^{119}$ before any shared $X$ graph lift. Those values
are more than ninety orders of magnitude larger than the current finite-prefix
candidate $E_R$ and $M_R$ scales, so raw unshifted Cauchy data cannot be the
continuous primitive backend. The viable backend is a hybrid: keep the exact
lower-coefficient cancellation and finite shifted prefix, then attach a
directed-rounded analytic tail through the same
$\mathcal M_{\rho,\rho_X}$ and $\mathcal F_{\rho,\rho_X}$ functionals.

The resulting order diagnostic is concrete. After retaining shifted
coefficients $a_0,\ldots,a_K$ of
$A=\operatorname{Shift}_N F$, the post-prefix scalar Cauchy tail is

$$
\frac{B_F}{R_y^N}\frac{q^{K+1}}{1-q},
$$

and the post-prefix $y\partial_y$ tail is

$$
\frac{B_F}{R_y^N}
\frac{q^{K+1}\big((K+1)-Kq\big)}{(1-q)^2}.
$$

On the current raw source-bound collar, making the function tail comparable to
the shifted-order $20$ finite-prefix $E_R$ scale requires about $K=367$, while
making the $y\partial_y$ tail comparable to the finite-prefix $M_R$ scale
requires about $K=388$. At $K=20$ the raw Cauchy tails are still of order
$10^{113}$ and $10^{114}$, respectively. This does not close h39, but it
turns the next backend target into an order-and-tail problem: either certify a
much sharper analytic tail than the raw source-bound tail, retain a much
deeper shifted prefix, or combine both improvements on one shared domain.

The same hybrid rule has to be run on the unshifted $N_G$ primitive, not only
on the shifted quotient scale. The scalar h39 reducer consumes
$M_G\ge\sup|N_G|$ with

$$
N_G=y^{41}T_G^{(39)}.
$$

Therefore a retained prefix for
$T_G^{(39)}=\operatorname{Shift}_{41}N_G$ becomes an $M_G$ candidate only after
restoring the $\rho^{41}$ factor and attaching a post-prefix tail for the
unshifted numerator:

$$
M_G^{\mathrm{hyb}}(\rho,K)
=
\rho^{41}
\left(
\sum_{m=0}^{K}\max(|g_m^-|,|g_m^+|)\rho^m
+
\frac{B_{N_G}^{\mathrm{out}}}{R_y^{41}}\frac{q^{K+1}}{1-q}
\right).
$$

With $\rho=0.001$, $R_y=0.001796875$, and tail target
$9.468681741438209\times10^{-99}$, the corrected unshifted-tail diagnostic
requires $K=266$ if $B_{N_G}^{\mathrm{out}}=10^{-20}$, $K=345$ if
$B_{N_G}^{\mathrm{out}}=1$, and $K=424$ if
$B_{N_G}^{\mathrm{out}}=10^{20}$. These are still candidate-only values: the
actual $B_{N_G}^{\mathrm{out}}$ requires denominator clearance for the branch
$G$ construction on the same complex graph-centered domain.

The denominator-clearance route is now explicit. For each branch,

$$
G_\varepsilon
=
\frac{4cB_\varepsilon}
{\nu\delta_\varepsilon^2J_\varepsilon^{\mathrm{abs}}},
\qquad
B_\varepsilon=-\frac12(\cos\phi_\varepsilon+\cos\delta_\varepsilon),
\qquad
J_\varepsilon^{\mathrm{abs}}=-\varepsilon J_\varepsilon.
$$

If the shared outer domain supplies
$|B_\varepsilon|\le K_\varepsilon$,
$\nu\ge\nu_-$, $|\delta_\varepsilon|\ge d_\varepsilon>0$, and
$|J_\varepsilon^{\mathrm{abs}}|\ge j_\varepsilon>0$, then

$$
|G_\varepsilon|
\le
\frac{4|c|K_\varepsilon}{\nu_-d_\varepsilon^2j_\varepsilon}.
$$

Therefore the outer $N_G$ source can be bounded by

$$
B_{N_G}^{\mathrm{out}}
=
\sum_{\varepsilon\in\{-,+\}}
\frac{4|c|K_\varepsilon}{\nu_-d_\varepsilon^2j_\varepsilon}
+
L_*
+
R_y^2
\sum_{k=0}^{38}
\max(|Q_{G,k}^-|,|Q_{G,k}^+|)R_y^k.
$$

This moves the live $B_{N_G}^{\mathrm{out}}$ task from a vague analytic
remainder to four branch-domain primitives: $K_\varepsilon$,
$d_\varepsilon$, $j_\varepsilon$, and $\nu_-$. It also explains why the next
backend should certify denominator floors before searching for another
successor row.

Those branch-domain primitives now have an executable candidate form. With

$$
D_\varepsilon(\rho)=\sum_{n\ge0}|\delta_{\varepsilon,n}|\rho^n,
\qquad
\Phi_\varepsilon(\rho)=\sum_{n\ge0}|\phi_{\varepsilon,n}|\rho^n,
$$

the branch numerator kernel is bounded by

$$
K_\varepsilon(\rho)
=
\frac12\big(\cosh D_\varepsilon(\rho)+\cosh\Phi_\varepsilon(\rho)\big).
$$

The same coefficient-prefix floor functional supplies

$$
d_\varepsilon(\rho)=
\operatorname{dist}(0,\delta_{\varepsilon,0})
-
\sum_{n\ge1}|\delta_{\varepsilon,n}|\rho^n,
$$

and

$$
j_\varepsilon(\rho)=
\operatorname{dist}(0,J_{\varepsilon,0}^{\mathrm{abs}})
-
\sum_{n\ge1}|J_{\varepsilon,n}^{\mathrm{abs}}|\rho^n.
$$

The new branch ingredient diagnostic therefore computes the exact candidate
inputs consumed by the denominator-clearance majorant. It remains a
candidate-only formula because continuous closure still requires the same
directed-rounded complex-domain provenance for the coordinate and Jacobian
series.

The same ingredients now have a finite-prefix plus Cauchy-tail candidate form.
For a represented branch series $a(y)=\sum_{n\ge0}a_ny^n$, retained through
order $K$ with outer bound $B_a^{\mathrm{out}}$ on $|y|\le R_y$ and
$q=\rho/R_y<1$,

$$
\mathcal M_{\rho,K}^{\mathrm C}(a)
=
\sum_{n=0}^{K}|a_n|\rho^n
+
B_a^{\mathrm{out}}\frac{q^{K+1}}{1-q},
\qquad
\mathcal F_{\rho,K}^{\mathrm C}(a)
=
\operatorname{dist}(0,a_0)
-
\sum_{n=1}^{K}|a_n|\rho^n
-
B_a^{\mathrm{out}}\frac{q^{K+1}}{1-q}.
$$

The Cauchy branch diagnostic uses
$\mathcal M_{\rho,K}^{\mathrm C}(\delta_\varepsilon)$ and
$\mathcal M_{\rho,K}^{\mathrm C}(\phi_\varepsilon)$ in the
$\cosh$ kernel, and uses
$\mathcal F_{\rho,K}^{\mathrm C}(\delta_\varepsilon)$ and
$\mathcal F_{\rho,K}^{\mathrm C}(J_\varepsilon^{\mathrm{abs}})$ as the
denominator floors. If the backend outer bound is for
$yJ_\varepsilon^{\mathrm{abs}}$, the direct $J_\varepsilon^{\mathrm{abs}}$
tail budget is $B_{yJ}^{\mathrm{out}}/R_y$.

The composed closure diagnostic now carries these branch ingredients all the
way through the h39 primitive replay. It forms
$B_{N_G}^{\mathrm{out}}$ from both branch $G$ majorants, uses the corrected
unshifted $N_G=y^{41}T_G^{(39)}$ Cauchy scale to produce $M_G$, and evaluates
the same strict Rouché-primitive ratio used by the h39 tail lemma. The output
is a conditional closure ratio, not a retained branch certificate.

The cell evaluator now has a safe denominator-Cauchy resolver for the
$N_G/M_G$ direction. It requires the complete same-domain input tuple
$(R_y,B_\delta,B_\phi,B_{J^{\mathrm{abs}}},L_*,A_*)$ before it will emit
\texttt{n\_g\_cauchy\_outer\_bound}; partial denominator data throws rather
than silently setting $L_*$ or $A_*$ to zero. Explicit
\texttt{nGCauchyOuterBound} inputs still override the derived candidate. When
the derived path is used, the summary labels the source as
\texttt{branch-denominator-cauchy-outer-bound} and threads it into the
existing $M_G$ profile replay.
The corresponding proof claim remains downstream of this coefficient engine:
after a directed-rounded same-domain provenance upgrade, the primitive
diagnostic's denominator-Cauchy $M_G$ witness wrapper can replay that source
through the existing $N_G$ numerator subset. The coefficient engine itself
still emits candidate/handoff data and does not certify the $M_G$ component.

The denominator closure diagnostic also now reports how much h39 work remains
in the $N_G$ channel. It computes the h39-implied branch-sum budget
$W_G$ by inverting the current $M_G$ ceiling, subtracts the actual branch
$G$ outer-majorant sum, and emits one of three statuses:
\texttt{h39-denominator-budget-candidate-below-ceiling},
\texttt{h39-denominator-budget-candidate-exceeds-ceiling}, or
\texttt{h39-denominator-budget-no-positive-branch-g-ceiling}. This turns the
open $M_G$ route into a quantitative target: either the current denominator
candidate is already below the scalar h39 ceiling, it must shrink by the
reported branch-sum ratio, or the current retained order/radius/primitive
tuple leaves no positive denominator budget.

## Executable Artifact

The executable helper is
[theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs](../../../scripts/neutral-swarm/theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs).
It exports:

- `makeTheta3minusFirstYGdSeriesContext`, a parameterized interval-series
  context through at least order $43$;
- `branchSeriesCoordinates`, `sourceEquationSeries`, `branchGSeries`, and
  `transformedDSeries`, matching the h38 fold-pair chart with the h39
  successor variable inserted;
- `evaluateR43CoefficientRows`, which emits the shifted $R_{\varepsilon,43}$,
  $\partial_XR_{\varepsilon,43}$, $\partial_X^2R_{\varepsilon,43}$, and
  $y\,\partial_yR_{\varepsilon,43}$ coefficient rows;
- `r43JacobianShiftedCoefficients` and
  `r43SecondXDerivativeShiftedCoefficients`, which implement the removable
  structural identity for $\partial_XR_{\varepsilon,43}$ and the $y^{41}$
  structural identity for $\partial_X^2R_{\varepsilon,43}$;
- `r43SecondXDerivativeKernelCoefficients` and
  `computeYPowerFactoredCoefficientPrefixMajorant`, which expose the
  $K_\varepsilon$ prefix and the finite-prefix identity
  $\mathcal M_\rho(y^{41}K_\varepsilon)=\rho^{41}\mathcal M_\rho(K_\varepsilon)$;
- `computeSeriesCoordinateMajorant` and
  `computeH39KernelContinuousMajorant`, which emit the coordinate-seminorm
  $|\sin z|\le\sinh(|z|)$ continuous $K_\varepsilon$ majorant and the reduced
  $L_J^{\mathrm{red}}=\rho^{41}M_K^{\mathrm{coord}}$ candidate;
- `computeH39FinitePrefixPrimitiveScalarReplay`, which feeds the finite-prefix
  $E_R,\nu_J,M_G,M_R$ candidates and the reduced continuous $L_J$ candidate
  through the Rouché-primitive scalar algebra with the displayed $\rho_X,r_X$
  policy, reports the candidate primitive slack tolerances, and explicitly
  refuses primitive-certificate status;
- `computeCauchyShiftedTailMajorants` and
  `computeCauchyRemovableQuotientFloor`, which expose the sufficient raw
  Cauchy shifted-tail and removable-Jacobian floor formulas while explicitly
  refusing primitive-certificate status;
- `computeCauchyCoefficientPrefixMajorant` and
  `computeCauchyCoefficientPrefixFloor`, which expose the direct coefficient
  prefix-plus-Cauchy-tail majorant and lower-floor functionals used by the
  branch denominator ingredients;
- `computeCauchyShiftedPrefixTailMajorant`,
  `computeCauchyRemovableQuotientPrefixFloor`, and
  `computeCauchyShiftedTailOrderForTarget`, which expose the hybrid
  retained-prefix plus post-prefix Cauchy-tail diagnostic and the retained
  order needed to meet a declared tail target, including the
  `unshifted-function` scale restoration needed for $N_G/M_G$;
- `computeCauchyShiftedTailOrderSensitivity`, which runs the same tail-order
  scan across several candidate outer bounds without granting primitive
  certificate status;
- `computeBranchGDenominatorClearanceMajorant`,
  `computeBranchGDenominatorIngredientCandidate`,
  `computeBranchGDenominatorCauchyIngredientCandidate`,
  `computeH39DenominatorCauchyNGOuterBoundCandidate`,
  `computeH39PrimitiveMGClosureCeilingCandidate`,
  `computeH39DenominatorCauchyOuterBoundCeilingCandidate`,
  `computeBranchGDenominatorAllocationTargetsCandidate`,
  `computeH39DenominatorCauchyPrimitiveClosureCandidate`,
  `computeNGOuterBoundFromDenominatorClearance`,
  `computeH39NGOuterBoundCandidateMG`, and
  `computeH39NGOuterBoundPrimitiveReplay`, which make the denominator-floor
  $B_{N_G}^{\mathrm{out}}$ route executable, restore the unshifted
  $N_G/M_G$ scale, require complete denominator Cauchy inputs before deriving
  the $N_G$ outer bound, translate the branch-sum ceiling into optional
  branch-local $d_\varepsilon^2j_\varepsilon$ clearance targets under an
  explicit allocation policy, expose the pressure-balanced minimax allocation
  weights proportional to $4|c|K_\varepsilon/\nu_-$, and replay the scalar h39
  reducer without upgrading the result to a directed-rounded certificate;
- `solveH39CenterCoefficientRow`, which solves the leading h39 center
  coefficient and verifies zero containment after insertion;
- `evaluateNGCoefficientRows`, which emits the shifted $N_G$ and correlated
  $D$-identity coefficient rows;
- `evaluateH39SharedDomainCoefficientCell`, which solves both branch h39
  center coefficients, evaluates the branch $R_{\varepsilon,43}$ rows and the
  pair $N_G$ row on the same declared coefficient cell, and emits only
  finite-prefix candidate summaries;
- `evaluateH39SharedDomainCoefficientRows`, which consumes supplied h38
  successor certificate rows and evaluates the h39 coefficient cell for each
  row without rebuilding the whole h38 chain;
- `buildH39SharedDomainCoefficientArtifact` and
  `validateH39SharedDomainCoefficientArtifact`, which emit and validate a
  priority-only h39 coefficient artifact from supplied h38 rows, including
  automatic series-order lifting for deeper shifted-prefix sweeps;
- `computeCoefficientPrefixMajorant` and `computeCoefficientPrefixFloor`,
  which compute finite-prefix seminorms and finite-prefix lower floors;
- `computeMultivariateCoefficientPrefixMajorant` and
  `computeMultivariateCoefficientPrefixFloor`, which implement the shared
  $y,X$ polydisc coefficient-prefix functionals above;
- `computeH39FinitePrefixPrimitiveProfileScaleReplay`, which turns the
  finite-prefix primitive tuple plus the kernel-reduced $L_J$ pressure into a
  candidate profile-scale replay through the h39 safe-product reducer;
- `computeH39R43AnalyticRemainderProfileCandidate`, which converts a shifted
  $R_{\varepsilon,43}$ retained prefix plus an explicit Cauchy outer bound into
  candidate $E_R$ and $M_R$ tail-profile components;
- `computeH39JacobianAnalyticRemainderProfileCandidate`, which converts an
  explicit $\partial_XR_{\varepsilon,43}$ Cauchy outer bound into the optional
  inward $\nu_J$ tail-loss profile;
- `computeH39SourceResidualCoordinateOuterBoundCandidate`,
  `computeH39JacobianCoordinateOuterBoundCandidate`, and
  `computeH39CoordinateCauchyOuterBoundsProfileCandidate`, which derive
  candidate source and removable-Jacobian Cauchy outer bounds from the branch
  coordinate seminorms, aggregate them across the centered fold pair, and feed
  them into the same profile replay without imposing a fixed speed band;
- `summarizeSharedDomainPrimitiveBounds`, which intentionally leaves
  $E_R,\nu_J,L_J,M_R,M_G$ null until a continuous interval backend supplies
  them, while threading any supplied Cauchy profile components into the
  candidate profile-scale replay.

Against the full 128-row h38 successor artifact, the h39 coefficient artifact
validates as a coefficient-only summary with 128 coefficient cells and 256
branch rows. It verifies that all centered leading $R_{\varepsilon,43}$
coefficients contain zero and that all shifted $D$-identity witnesses contain
zero. It now imports the inherited formal recurrence slope from the h38 row as
the leading $\partial_XR_{\varepsilon,43}$ coefficient, while preserving the
wide recomputed interval-series slope as a diagnostic. This gives
\texttt{min\_h39\_jacobian\_coefficient\_clearance=0.792719244976} on the full
h38 sweep. At $\rho=0.001$, the same finite-prefix pass reports
\texttt{min\_candidate\_nu\_J\_finite\_prefix=0.7922834330724204},
\texttt{max\_candidate\_M\_K\_finite\_prefix=0.5917788690239781},
\texttt{max\_candidate\_L\_J\_finite\_prefix=5.917788690239787e-124}, and
\texttt{max\_candidate\_L\_J\_factored\_finite\_prefix=5.917788690239787e-124},
with \texttt{all\_candidate\_L\_J\_factor\_identities\_hold=true} and
\texttt{second\_x\_kernel\_y\_power=41}. The elementary continuous kernel
majorant gives
\texttt{max\_candidate\_M\_K\_continuous\_majorant=16.799203536978943} and
\texttt{max\_candidate\_L\_J\_reduced\_continuous\_majorant=1.679920353697896e-122}.
Using the aggregate finite-prefix tuple
\texttt{max\_candidate\_E\_R\_finite\_prefix=2.8702250516400597e+25},
\texttt{max\_candidate\_M\_G\_finite\_prefix=9.468574421976908e-99}, and
\texttt{max\_candidate\_M\_R\_finite\_prefix=5.23938364006e+22}, the scalar
feasibility replay chooses
\texttt{candidate\_finite\_prefix\_scalar\_replay\_rho\_X=7.245450130162448e+25}
and
\texttt{candidate\_finite\_prefix\_scalar\_replay\_r\_X=5.434087597621836e+25},
and reports
\texttt{candidate\_finite\_prefix\_scalar\_replay\_closes=true} with
\texttt{candidate\_finite\_prefix\_scalar\_replay\_ratio=3.796256065292518e-115}.
The same artifact now computes
\texttt{candidate\_L\_J\_reduced\_minus\_finite\_prefix\_profile} and replays
that nonnegative $L_J$ profile through the h39 profile-scale reducer. The
field \texttt{candidate\_profile\_scale\_required\_closes=true} says the
known kernel-reduced $L_J$ pressure fits the strict h39 scalar contract at
scale $\lambda=1$; the companion field
\texttt{candidate\_profile\_direction\_complete\_for\_shared\_domain\_closure=false}
keeps the remaining $E_R,\nu_J,M_G,$ and $M_R$ analytic-remainder provenance
open.
The executable path has now been sharpened when explicit or coordinate-derived
Cauchy outer bounds are supplied. The helper
\texttt{computeH39R43AnalyticRemainderProfileCandidate} attaches the
post-prefix Cauchy tail of $R_{\varepsilon,43}$ as an $E_R$ profile component
and the corresponding $y\partial_yR_{\varepsilon,43}$ tail as an $M_R$ profile
component. The existing $N_G$ prefix-tail helper now exposes the unshifted
$M_G$ tail as an analytic-remainder profile, and
\texttt{computeH39JacobianAnalyticRemainderProfileCandidate} emits an optional
$\nu_J$ loss profile from either an explicit Jacobian outer bound or the
coordinate removable-numerator outer-bound candidate. Thus the profile vector
can now be populated in the $E_R,M_R,M_G$ directions and, when proper data is
supplied, in the $\nu_J$ direction, while all closure flags remain false until
those bounds are proven on the same directed-rounded graph-centered domain.
The primitive diagnostic now has component-level consumers for these profile
routes: the $R_{\varepsilon,43}$ profile may certify only $E_R,M_R$, the
$N_G$ profile may certify only $M_G$, and the center-Jacobian profile may
certify only $\nu_J$. The evaluator now emits the exact graph-radii witness
for $\rho_X,r_X$ when those radii are declared on the same $\mathfrak S$, and
the coefficient artifact exposes the same witness at top level so downstream
composition can consume one evaluator artifact without a sidecar radii object.
The artifact validator rebuilds that witness from the declared
$\rho_X,r_X;\mathfrak S$ parameters and rejects value or claim-boundary drift.
The $K_\varepsilon$/$L_J$ route certifies only $L_J$ after a same-domain
$M_K$ majorant. Therefore the coefficient-series engine no longer has a
generic primitive-vector gap; it has explicit component witness handoffs plus
the exact radius declaration, all of which must carry the same graph-centered
signature before the primitive provenance certificate can promote the h39
continuous-tail row.
The coordinate-Cauchy profile now has a matching upstream wrapper in the
primitive diagnostic: when the branch-derived $B_F^{\mathrm{out}}$ and
$B_J^{\mathrm{out}}$ values are directed-rounded on one $\mathfrak S$ and
match the shifted $R_{\varepsilon,43}$ and center-Jacobian profile inputs, the
wrapper can replay the existing $E_R,M_R$ and $\nu_J$ subsets. It still
certifies no $M_G$, no $L_J$, no graph radii, and no retained branch.
The downstream consumer is now explicit: the primitive diagnostic's
upstream-source composition artifact consumes these raw handoffs, rebuilds the
coordinate-Cauchy, denominator-Cauchy, $L_J$, and graph-radii wrapper replays,
passes only their extracted subsets to the component-subset composition, and
then replays the existing primitive provenance certificate. The
coefficient-series engine remains a constructor of component candidates and
cannot promote the h39 continuous-tail row by itself. The consumer can now
take the coefficient artifact directly. With one emitted
\texttt{h39\_coefficient\_cell}, it unwraps that cell. With multiple emitted
cells, it uses same-domain, same-radius per-branch maxima for the coordinate
source, selects one whole denominator source row with maximal certified $N_G$
outer bound, canonicalizes the $K_\varepsilon$ source back to one witness per
branch, uses the artifact-level graph-radii witness, and refuses fixed
speed-band fields.
The evaluator now also reports the h39 full Cauchy primitive profile-vector
status instead of leaving profile readiness implicit. The candidate vector is

$$
\mathfrak P_{39}^{\mathrm{cand}}
=
(E_R,\ M_R,\ M_G,\ \nu_J,\ L_J),
$$

where each entry is the finite-prefix primitive plus its declared analytic
remainder pressure on the same coefficient-domain replay. The status
\texttt{h39-full-cauchy-primitive-profile-vector-candidate-incomplete} names
the missing components, so an absent Cauchy tail can no longer be mistaken for
a zero tail. When all components are present, the same replay reports either
\texttt{h39-full-cauchy-primitive-profile-vector-candidate-scale-inequalities-open}
or \texttt{h39-full-cauchy-primitive-profile-vector-candidate-closes}. This is
still a candidate-only readiness result: it tests the coupled vector against
the h39 profile-scale inequalities but does not certify a directed-rounded
shared-domain primitive bound or retained branch.

When $\rho_X,r_X$ are fixed and $L_J$ is either fixed or varied only through a
declared nonnegative profile pressure, the same profile-vector replay now has
an exact fixed-radii primitive-profile boundary for the simultaneous
$E_R,\nu_J,L_J,M_G,M_R$ analytic-remainder direction. The boundary is the
minimum of the $J_{\min}$ boundary, the graph Rouché-margin boundary, and the
first positive root of the h39 scalar quadratic. This replaces a blind search
for the next profile scale with a named candidate bottleneck, while leaving the
shared-domain provenance requirement unchanged.

The evaluator records the same marker as
`candidate_profile_scale_exact_fixed_radii_strict_headroom`, with
`candidate_profile_scale_exact_fixed_radii_required_scale` fixed at
$\lambda=1$. A positive value is a candidate success marker for scalar replay
feasibility; a nonpositive value is the candidate deficit. The backend mirrors
the same quantity as `profile_scale_exact_fixed_radii_strict_headroom`. These
fields are deliberately not provenance flags and cannot promote candidate-only
primitive inputs.

The evaluator also threads the required-scale margin vector
$(J_1,\Gamma_1,P(1))$ from the exact-boundary replay. The corresponding fields
are
`candidate_profile_scale_exact_fixed_radii_J_min_at_required_scale`,
`candidate_profile_scale_exact_fixed_radii_rouche_margin_at_required_scale`,
and
`candidate_profile_scale_exact_fixed_radii_scalar_polynomial_at_required_scale`;
the backend mirrors them under `profile_scale_exact_fixed_radii_*`. These
margins explain the success or deficit reported by
`candidate_profile_scale_exact_fixed_radii_strict_headroom` and remain
diagnostic candidate data, not provenance flags.

The executable backend artifact now packages that readiness result as a single
primitive-vector interface. Let

$$
\Delta\mathfrak P_{39}
=
(e_R,\ m_R,\ m_G,\ n_J,\ \ell_J)
$$

be the adverse analytic-remainder profile and let

$$
\mathfrak P_{39}^{0}
=
(E_R^0,\ M_R^0,\ M_G^0,\ \nu_J^0,\ L_J^0)
$$

be the finite-prefix primitive vector. The replayed backend path is

$$
\mathfrak P_{39}(\lambda)
=
\left(
E_R^0+\lambda e_R,\,
M_R^0+\lambda m_R,\,
M_G^0+\lambda m_G,\,
\nu_J^0-\lambda n_J,\,
L_J^0+\lambda\ell_J
\right),
\qquad 0\le\lambda\le1.
$$

For fixed same-domain radii $\rho_X$ and $r_X$, the backend computes
$J_\lambda=(\nu_J^0-\lambda n_J)-(L_J^0+\lambda\ell_J)\rho_X$ and

$$
\Gamma_\lambda
=
(\nu_J^0-\lambda n_J)r_X
-
(E_R^0+\lambda e_R)
-
\frac12(L_J^0+\lambda\ell_J)r_X^2.
$$

It then packages the candidate vector for the existing h39 reducer by requiring
$0<r_X<\rho_X$, $J_\lambda>0$, $\Gamma_\lambda>0$, and

$$
\Lambda_{39}^{\mathrm R}(\lambda)
=
\frac{
(M_G^0+\lambda m_G)
\left(
40+
\frac{M_R^0+\lambda m_R}{J_\lambda(\rho_X-r_X)}
+
\frac{1}{s-1}
\right)
}{
B_{D,39}Y^{41}s^{40}(s-1)
}
<1.
$$

When provenance is coefficient-only, supplied-unverified, coordinate-derived,
or Cauchy-candidate, the strongest allowed claim is
\texttt{constructs\_h39\_primitive\_vector\_backend\_artifact=true}; all
directed-rounded shared-domain, continuous-tail, scaled-remainder, `I1`, and
retained-branch flags remain false. If a future backend supplies the whole
vector with directed-rounded same-domain provenance, this same artifact can
promote the h39 primitive-vector input to the existing Rouché reducer without
also claiming scaled remainder, quadrature, or retained-branch closure.
The companion primitive diagnostic now exposes this as an explicit
promotion-theorem bridge: it consumes the primitive-vector backend artifact,
replays the h39 Rouché-primitive reducer, and reports whether promotion is
blocked by missing vector input, an open reducer inequality, or unverified
same-domain provenance. This keeps the coefficient engine as a constructor of
the primitive-vector interface, while assigning any true certificate claim to a
future directed-rounded provenance backend.
That backend now has an exact verifier contract. A separate primitive
provenance certificate must supply directed-rounded reports for
$E_R,M_R,M_G,\nu_J,L_J,\rho_X,$ and $r_X$ with one shared graph-centered domain
signature and relation-aware coverage of the primitive-vector artifact: upper
bounds may be stronger than the primitive reducer input, the $\nu_J$ lower
bound may be stronger, and the graph radii must match exactly. Only after that
verifier and the Rouché-primitive replay both pass can the h39 primitive
continuous-tail row promote. The coefficient engine still remains
constructor-only and cannot promote itself by producing a candidate vector.
The first two-component subset is now explicit: a directed-rounded same-domain
shifted $R_{\varepsilon,43}$ Cauchy prefix-tail witness can certify $E_R$ and
$M_R$ together, using the same prefix-plus-geometric-tail formulas already
emitted by \texttt{computeH39R43AnalyticRemainderProfileCandidate}. This
subset is useful because it can feed the relation-aware primitive verifier as
stronger upper-bound provenance without pretending to certify $M_G$,
$\nu_J$, $L_J$, or the graph radii.
The candidate provenance report makes this boundary executable in the
opposite direction: when the coefficient engine is the only source, the report
returns \texttt{open-candidate-only-primitive-provenance}. That status is a
proof of non-promotion for this artifact, not a proof that the h39 tail fails.
It says that coefficient construction plus a strict scalar replay is still
short of same-domain directed-rounded provenance.
The minimal witness-set artifact sharpens the next backend object. The h39
coefficient identities isolate one reusable subset:

$$
\partial_X^2R_{\varepsilon,43}=y^{41}K_\varepsilon,
\qquad
K_\varepsilon=
\frac{2}{\nu^2}-\sin\delta_\varepsilon-\sin\phi_\varepsilon.
$$

Thus a same-signature directed-rounded majorant

$$
M_K\ge\max_\varepsilon\sup_{\mathfrak S}|K_\varepsilon|
$$

would supply the primitive Lipschitz entry

$$
L_J=\rho^{41}M_K.
$$

This is a subset reduction, not a certificate claim for the present artifact:
the current $L_J$ row remains candidate-only until the $K_\varepsilon$
majorant is certified on the same graph-centered signature as
$E_R,M_R,M_G,\nu_J,\rho_X,$ and $r_X$.
The primitive diagnostic now makes this subset executable. Its
\texttt{L\_J} kernel witness subset accepts the current
\texttt{kernel-continuous-majorant} row as an open candidate, but promotes the
$L_J$ component if and only if a directed-rounded same-domain $M_K$ witness is
supplied with the identity
$\partial_X^2R_{\varepsilon,43}=y^{41}K_\varepsilon$, the relation
$M_K\ge\max_\varepsilon\sup_{\mathfrak S}|K_\varepsilon|$, the reduction
$L_J\ge\rho^{41}M_K$, analytic-tail coverage, outward-rounded
transcendental bounds, and no fixed speed window. This certifies only one
primitive component; the coefficient engine still cannot certify the full
primitive vector.
The upstream $K_\varepsilon$ majorant witness is now executable as its own
conditional theorem. For both branches $\varepsilon\in\{-,+\}$, the witness
must supply the same $\mathfrak S$, directed-rounded bounds
$\nu\ge\nu_->0$, $|\delta_\varepsilon|\le D_\varepsilon$, and
$|\phi_\varepsilon|\le\Phi_\varepsilon$, analytic-tail coverage, an
outward-rounded $2/\nu_-^2$ majorant, and outward-rounded
$\sinh(D_\varepsilon)$ and $\sinh(\Phi_\varepsilon)$ enclosures. It then
emits only the $M_K$ component witness; the $L_J$ claim is checked by the
separate $L_J$ subset replay. The current coordinate-seminorm row remains
candidate-only because it does not yet carry those same-domain branch
witnesses.
The evaluator now produces that exact branch-coordinate witness set as a
handoff artifact. With only finite coordinate seminorms it returns
\texttt{open-K\_epsilon-branch-coordinate-witness-unverified}. With Cauchy
coordinate tails, a shared $\mathfrak S$, directed-rounded coordinate
provenance, and positive-Taylor/geometric-tail certificates for the
$\sinh(D_\varepsilon)$ and $\sinh(\Phi_\varepsilon)$ enclosures, it emits the
two branch witnesses for \texttt{buildH39KepsilonMajorantWitness}. A bare
transcendental-provenance flag no longer certifies this step. That downstream
artifact can then certify $M_K$, while still leaving $L_J$ to the separate
subset replay and all full h39 primitive-vector claims open.
The primitive diagnostic's upstream-source composition is the only current
downstream consumer that may combine this $M_K\to L_J$ route with the
$R_{\varepsilon,43}$, $N_G$, center-Jacobian, and graph-radii source handoffs.
It now accepts the evaluator's branch-coordinate witness-set artifact directly
when no external $M_K$ witness is supplied: the composition replays the
$K_\varepsilon$ majorant, extracts the generated $M_K$ witness, feeds it into
the $L_J$ subset, and only then rebuilds the wrappers and component-subset
composition. The promoted claim is still only the h39 continuous-tail row after
a strict primitive-certificate replay; failed branch-coordinate, $\sinh$
envelope, domain, or value-coverage predicates remain explicit blockers.
The deeper shifted-prefix diagnostic also runs on the full h38 sweep:
\texttt{shifted\_order=20} lifts the internal
\texttt{series\_order} to $63$, validates all $128$ coefficient cells, and
reports
\texttt{max\_candidate\_E\_R\_finite\_prefix=2.8702360237705014e+25},
\texttt{max\_candidate\_M\_G\_finite\_prefix=9.468681741438209e-99},
\texttt{max\_candidate\_M\_R\_finite\_prefix=5.261350878794293e+22}, and
\texttt{candidate\_finite\_prefix\_scalar\_replay\_ratio=3.796300532408038e-115}.
The one-cell \texttt{shifted\_order=40} sweep agrees at the reported scale.
This confirms that deeper finite shifted prefixes are not the bottleneck; the
missing piece is the continuous analytic tail attached to the shared-domain
coefficient prefix.
Thus the h38 recurrence row already supplies the coefficient-level $\nu_J$
floor candidate, the exact $X$-derivative identities supply the reduced
$L_J$ source, and the scalar Rouché reducer has a wide candidate margin. The
remaining target is to add the bivariate graph-centered remainders that turn
the finite-prefix candidates into continuous shared-domain $E_R,\nu_J,M_G,$
and $M_R$ certificates.

The companion test is
[neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.test.js](../../../tests/neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.test.js).
It verifies h39 $X$ insertion, affine leading $R_{\varepsilon,43}$ dependence
on $X$, the removable $\partial_XR_{\varepsilon,43}$ identity, the $y^{41}$
$\partial_X^2R_{\varepsilon,43}$ identity, the $K_\varepsilon$ factorization,
the h39 center coefficient solve, one-variable and multivariate
coefficient-prefix seminorm helpers, the shifted $D$ identity, h38-row artifact
consumption, the coordinate-seminorm continuous $K_\varepsilon$ majorant, the
finite-prefix scalar feasibility replay with primitive slack tolerances, the
two-branch coefficient-cell evaluator, and the refusal to emit full continuous
primitive bounds.
It also verifies that deeper shifted-prefix requests raise the internal series
order instead of silently truncating at the default h39 depth, and that the
Cauchy shifted-tail and hybrid order helpers compute only sufficient candidate
bounds. The same test now checks the branch-local allocation helper: allocated
branch budgets sum back to the h39 branch-sum ceiling, the required product
target is $4|c|K_\varepsilon/(\nu_-W_\varepsilon)$, supplied
$d_\varepsilon^2j_\varepsilon$ margins are reported, the pressure-balanced
minimax weights and common target are exposed, and the helper keeps all
directed-rounded and retained-branch certificate flags false.

## Claim Boundary

This packet may claim:

$$
\texttt{constructs\_h39\_shared\_domain\_coefficient\_series\_engine=true},
\qquad
\texttt{certifies\_h39\_primitive\_series\_provenance\_on\_one\_declared\_coefficient\_domain=true}.
$$

It may also claim that one coefficient-only engine constructs the truncated
series data for $R_{\varepsilon,43}$, $\partial_XR_{\varepsilon,43}$,
$\partial_X^2R_{\varepsilon,43}$, $y\,\partial_yR_{\varepsilon,43}$, and
$N_G$ from the same imported $h_{38,\varepsilon}$ row, speed-ratio enclosure,
branch label, $X$ center, and declared $y,X$ expansion variables. It may claim
the structural identity for the removable $\partial_XR_{\varepsilon,43}$ row,
the structural $y^{41}$ suppression of $\partial_X^2R_{\varepsilon,43}$, the
h39 center coefficient solve, and finite-prefix coefficient seminorms,
provided those quantities are labelled as coefficient-only candidates on the
shared graph-centered polydisc. It may also claim that the finite-prefix
candidate tuple, combined with the kernel-continuous reduced $L_J$ input,
passes the scalar Rouché-primitive replay for the displayed $\rho_X,r_X$
policy. That claim is only scalar feasibility; it is not a statement that the
finite-prefix inputs are continuous primitive certificates.

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_shared\_domain=false},
\qquad
\texttt{certifies\_directed\_rounded\_h39\_polydisc\_M\_G\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_h39\_root\_tangent\_numerator\_M\_R\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_h39\_jacobian\_lower\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_h39\_jacobian\_lipschitz\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

The coefficient-only engine is a provenance and evaluator-construction
advance: it prevents the h39 primitive quantities from being assembled from
different symbolic expansions. With passing source certificates, including
the safe multi-row aggregation rules above, the downstream primitive diagnostic
can now turn the coefficient artifact into the certified seven-input
continuous-tail row
$(E_R,M_R,M_G,\nu_J,L_J,\rho_X,r_X;\mathfrak S)$. The remaining certificate
burden is not another primitive-source handoff; it is the larger branch
closure: the full first-y quotient enclosure, scaled remainder, `I1`
composition, quadrature, and retained branch status.

The evaluator now accepts ordered
\texttt{coordinateSourceEnvelopeCandidates}. A wide coordinate-source candidate
can fail with `sinh Taylor majorant overflowed before the tail bound`, be
recorded as a rejected source-certificate candidate, and then fall back to a
smaller candidate on the same declared domain. A read-only full-cover h38 probe
with \texttt{coordinateCauchyOuterRadius=0.01},
\texttt{coordinateJacobianOuterRadius=0.01},
\texttt{coordinateJacobianNumeratorOuterRadius=0.02}, and
\texttt{denominatorCauchyOuterRadius=0.01} produces no
\texttt{source\_certificate\_obstructions}; the centered
$R_{\varepsilon,43}$ rows, shifted $D$ identities, graph-radii source, and
upstream-source composer input are all present.

This advances the obstruction from source-certificate existence to source
sharpness. A same-row radius scan shows the finite coordinate certificates are
too pessimistic after the unshifted Cauchy division by the small coordinate
radius: $R=0.01$ gives
$E_R\approx2.22\times10^{85}$ and
$M_R\approx4.69\times10^{85}$, while larger radii improve those pressures
until the coordinate $\sinh$ envelopes overflow around the next tested range.
The next mathematical task is therefore not another primitive handoff layer;
it is a shifted or cancellation-aware source envelope for
$R_{\varepsilon,43}=F_\varepsilon/y^{43}$ and
$y\,\partial_yR_{\varepsilon,43}$ on the same graph-centered domain.

That inlet now exists in the evaluator. A coordinate-source envelope candidate
can be explicitly marked as a shifted removable $R_{\varepsilon,43}$ source
bound. The engine checks the zero-prefix cancellation witness for the raw
$F_\varepsilon$ coefficients through $y^{42}$, accepts an external
directed-rounded zero-prefix certificate when the current coefficient fixture
does not itself close that prefix, verifies that the supplied shifted bound
dominates the shifted coefficient prefix at the declared source radius, and
then passes \texttt{candidate\_R43\_cauchy\_tail\_shift\_power=0} into the
primitive-profile replay. This is the first executable route that avoids the
raw $R^{-43}$ Cauchy pressure. With a supplied shifted bound $10^{-3}$ at
radius $0.01$ on the focused fixture, the resulting profile reports
$E_R\approx6.16\times10^{-7}$ and
$M_R\approx1.92\times10^{-7}$ and the complete profile-vector candidate
closes. The remaining full-cover proof burden is the directed-rounded shifted
$R_{\varepsilon,43}$ outer-bound certificate itself, not the reducer interface.
