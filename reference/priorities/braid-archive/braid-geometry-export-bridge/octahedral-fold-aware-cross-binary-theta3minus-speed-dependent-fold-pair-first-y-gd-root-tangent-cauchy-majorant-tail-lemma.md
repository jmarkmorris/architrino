# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Root-Tangent Cauchy-Majorant Tail Lemma

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet gives the analytic reduction that prevents the first-y $G,D$
successor program from becoming only an endless coefficient ladder. The h38
coefficient certificate now supplies the next root-center row, so the live
continuous target is re-indexed from the h38 tail to the h39 tail. This packet
does not certify the h39 tail numerically. It proves the exact majorant form a
future interval certificate must satisfy after the h38 coefficient row:

$$
T_G^{(39)}
=
\operatorname{Shift}_{41}(P-L-y^2A_{G,38}),
\qquad
T_D^{(39)}
=
-40T_G^{(39)}
-\mathcal D_y^{(X_{39})}T_G^{(39)}.
$$

The point of the lemma is simple: once the first $39$ quotient rows have been
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
$\rho_X>0$ be a complex radius around the future $X_{39,\varepsilon}$ successor
root graph center, let $r_X<\rho_X$ enclose the graph points at which the tail
is evaluated, and set the actual $X$-Cauchy margin

$$
\sigma_X=\rho_X-r_X.
$$

Define the post-h38 numerator

$$
N_G(y,X,\nu)
:=
P(y,X,\nu)-L(\nu)-y^2A_{G,38}(y,\nu).
$$

The h38 packet and the formal recurrence imply that the relevant real branch
has no remaining $G$ numerator coefficients below the shifted h39 tail, so

$$
N_G(y,X,\nu)
=
y^{41}T_G^{(39)}(y,X,\nu)
$$

on the successor chart. The correlated $D$ tail is not evaluated by a separate
raw inverse. It is controlled through

$$
\mathcal D_y^{(X_{39})}
=
y\partial_y+\Xi_\varepsilon\partial_{X_{39}},
\qquad
\Xi_\varepsilon
=
-\frac{y\,\partial_yR_{\varepsilon,43}}{J_\varepsilon},
\qquad
R_{\varepsilon,43}
=
\operatorname{Shift}_{43}
\left(
F_\varepsilon(y,h_{\varepsilon,\le38}+y^{39}X,\nu)
\right),
\qquad
J_\varepsilon=\partial_XR_{\varepsilon,43}.
$$

## Cauchy-Majorant Lemma

Assume $N_G$ is analytic on the closed polydisc

$$
\mathcal P_{\rho,\rho_X}
=
\{(y,X,\nu): |y|\le\rho,\ |X-X_{39,\varepsilon}(0,\nu)|\le\rho_X,
\nu\in[3.02156,3.02157]\}
$$

and that a directed-rounded interval certificate proves

$$
\sup_{\mathcal P_{\rho,\rho_X}}|N_G|\le M_G,
\qquad
\sup_{\mathcal P_{\rho,\rho_X}}|\Xi_\varepsilon|\le \Xi_*,
\qquad
\sigma_X>0.
$$

Set

$$
q=\frac{Y}{\rho}.
$$

The $M_G$ input in this lemma is the unshifted numerator majorant, not a
direct shifted-quotient majorant. If a backend constructs $M_G$ from retained
coefficients of

$$
T_G^{(39)}=\operatorname{Shift}_{41}N_G,
$$

then the retained prefix and its analytic tail must be scaled back to the
unshifted numerator before they enter the inequalities below. In the
single-variable notation used by the hybrid diagnostic, this means using

$$
M_G^{\mathrm{hyb}}(\rho_0,K)
=
\rho_0^{41}
\left(
\sum_{m=0}^{K}\max(|g_m^-|,|g_m^+|)\rho_0^m
+
\frac{B_{N_G}^{\mathrm{out}}}{R_y^{41}}\frac{(\rho_0/R_y)^{K+1}}{1-\rho_0/R_y}
\right)
$$

for the numerator bound on the chosen inner radius $\rho_0$, and then using it
as this lemma's $M_G$ only if the same graph-centered complex domain supplies
the branch denominator clearance, root graph, and outward rounding. This
prevents the shifted $T_G^{(39)}$ tail from being fed directly into the
unshifted $M_G$ slot.

A concrete way to supply the outer $B_{N_G}^{\mathrm{out}}$ term is now
available. For each branch contribution

$$
G_\varepsilon
=
\frac{4cB_\varepsilon}
{\nu\delta_\varepsilon^2J_\varepsilon^{\mathrm{abs}}},
\qquad
B_\varepsilon=-\frac12(\cos\phi_\varepsilon+\cos\delta_\varepsilon),
\qquad
J_\varepsilon^{\mathrm{abs}}=-\varepsilon J_\varepsilon,
$$

same-domain bounds
$|B_\varepsilon|\le K_\varepsilon$,
$\nu\ge\nu_-$, $|\delta_\varepsilon|\ge d_\varepsilon>0$, and
$|J_\varepsilon^{\mathrm{abs}}|\ge j_\varepsilon>0$ imply

$$
|G_\varepsilon|
\le
\frac{4|c|K_\varepsilon}{\nu_-d_\varepsilon^2j_\varepsilon}.
$$

Consequently a sufficient outer numerator bound is

$$
B_{N_G}^{\mathrm{out}}
=
\sum_{\varepsilon\in\{-,+\}}
\frac{4|c|K_\varepsilon}{\nu_-d_\varepsilon^2j_\varepsilon}
+
L_*
+
R_y^2A_*,
$$

with

$$
A_*=
\sum_{k=0}^{38}
\max(|Q_{G,k}^-|,|Q_{G,k}^+|)R_y^k
$$

as a coefficient-safe lower-polynomial choice. This does not change the lemma's
certificate boundary; it identifies the specific denominator floors and kernel
majorants that a shared-domain backend must provide before $M_G$ can be
certified.

The branch ingredients can be obtained by coefficient-seminorm estimates on
the same represented series. If

$$
D_\varepsilon(\rho)=\sum_{n\ge0}|\delta_{\varepsilon,n}|\rho^n,
\qquad
\Phi_\varepsilon(\rho)=\sum_{n\ge0}|\phi_{\varepsilon,n}|\rho^n,
$$

then $|\cos z|\le\cosh|z|$ gives

$$
K_\varepsilon(\rho)
=
\frac12
\left(\cosh D_\varepsilon(\rho)+\cosh\Phi_\varepsilon(\rho)\right).
$$

The floors are the constant clearance minus the nonconstant tail:

$$
d_\varepsilon(\rho)
=
\operatorname{dist}(0,\delta_{\varepsilon,0})
-
\sum_{n\ge1}|\delta_{\varepsilon,n}|\rho^n,
\qquad
j_\varepsilon(\rho)
=
\operatorname{dist}(0,J_{\varepsilon,0}^{\mathrm{abs}})
-
\sum_{n\ge1}|J_{\varepsilon,n}^{\mathrm{abs}}|\rho^n.
$$

Positive $d_\varepsilon$ and $j_\varepsilon$ make the branch denominator
clearance quantitative; they do not by themselves certify retained branch
status.

For a finite retained prefix, these branch ingredients inherit the same
Cauchy-tail closure. If $a(y)=\sum_{n\ge0}a_ny^n$ is retained through order
$K$, $B_a^{\mathrm{out}}\ge\sup_{|y|\le R_y}|a(y)|$, and $q=\rho/R_y<1$, then

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

The branch kernel uses
$\mathcal M_{\rho,K}^{\mathrm C}(\delta_\varepsilon)$ and
$\mathcal M_{\rho,K}^{\mathrm C}(\phi_\varepsilon)$; the branch denominator
uses $\mathcal F_{\rho,K}^{\mathrm C}(\delta_\varepsilon)$ and
$\mathcal F_{\rho,K}^{\mathrm C}(J_\varepsilon^{\mathrm{abs}})$. If the
outer backend certifies $yJ_\varepsilon^{\mathrm{abs}}$ rather than
$J_\varepsilon^{\mathrm{abs}}$ directly, the Jacobian tail contribution is
formed with $B_{yJ}^{\mathrm{out}}/R_y$.

Combining these branch ingredients with the primitive h39 theorem produces a
single conditional closure ratio. With

$$
B_{N_G,K}^{\mathrm{denC}}
=
\sum_{\varepsilon\in\{-,+\}}
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-\left(d_{\varepsilon,K}^{\mathrm C}\right)^2j_{\varepsilon,K}^{\mathrm C}}
+
L_*
+
R_y^2A_*,
$$

the corrected unshifted numerator input is

$$
M_{G,K}^{\mathrm{denC}}
=
\sum_{m=0}^{K}|g_m|\rho^{41+m}
+
B_{N_G,K}^{\mathrm{denC}}\frac{q^{41+K+1}}{1-q}.
$$

If $0<r_X<\rho_X$,
$J_{\min}=\nu_J-L_J\rho_X>0$,
$\sigma_X=\rho_X-r_X$, and
$\Gamma_R=\nu_Jr_X-E_R-\frac12L_Jr_X^2>0$, the h39
denominator-Cauchy primitive criterion is

$$
\Lambda_{39}^{\mathrm{denC}}
=
\frac{
M_{G,K}^{\mathrm{denC}}
\left(
40+\frac{M_R}{J_{\min}\sigma_X}+\frac{1}{s-1}
\right)
}
{B_{D,39}Y^{41}s^{40}(s-1)}
<1,
\qquad
s=\frac{\rho}{Y}.
$$

This is the end-to-end conditional theorem for the current route: it reduces
h39 closure to branch denominator floors, one corrected $N_G$ outer bound, an
admissible Rouché graph lift, and one primitive Rouché replay on a shared
domain.

For the shared-domain evaluator contract, the same theorem can be replayed
along a finite-prefix-plus-remainder profile. Write

$$
E_R(\lambda)=E_R^0+\lambda e_R,\qquad
\nu_J(\lambda)=\nu_J^0-\lambda n_J,\qquad
L_J(\lambda)=L_J^0+\lambda \ell_J,
$$

and

$$
M_G(\lambda)=M_G^0+\lambda m_G,\qquad
M_R(\lambda)=M_R^0+\lambda m_R,
$$

where the profile components are nonnegative and are interpreted as outward
remainder pressure on majorants and inward pressure on floors. For the fixed
replayed $\rho_X,r_X$,

$$
J_{\mathrm{rob}}(\lambda)
=\nu_J(\lambda)-L_J(\lambda)\rho_X,
\qquad
\sigma_{\mathrm{rob}}=\rho_X-r_X,
$$

and

$$
\Gamma_R(\lambda)
=
\nu_J(\lambda)r_X
-E_R(\lambda)
-\frac12L_J(\lambda)r_X^2 .
$$

The profile replay is admissible only while
$J_{\mathrm{rob}}(\lambda)>0$, $\Gamma_R(\lambda)>0$, and

$$
\Lambda_{39}^{\mathrm{prof}}(\lambda)
=
\frac{
M_G(\lambda)
\left(
40+
\frac{M_R(\lambda)}{J_{\mathrm{rob}}(\lambda)\sigma_{\mathrm{rob}}}
+\frac{1}{s-1}
\right)
}
{B_{D,39}Y^{41}s^{40}(s-1)}
<1 .
$$

This profile replay is not a new closure condition. It is the executable form
of the same h39 Rouché-primitive theorem when a backend reports a nonnegative
analytic-remainder direction and asks how much of that direction the strict
certificate can absorb.

Equivalently, the theorem gives a direct target for the missing
$B_{N_G}^{\mathrm{out}}$ certificate. Let

$$
C_M
=
\frac{
B_{D,39}Y^{41}s^{40}(s-1)
}
{
40+\frac{M_R}{J_{\min}\sigma_X}+\frac{1}{s-1}
},
\qquad
P_{G,K}
=
\sum_{m=0}^{K}|g_m|\rho^{41+m},
\qquad
\alpha_K
=
\frac{q^{41+K+1}}{1-q}.
$$

Then h39 closure requires

$$
B_{N_G}^{\mathrm{out}}
<
\frac{C_M-P_{G,K}}{\alpha_K},
$$

with a positive right side. After subtracting the non-branch terms, the two
branch $G$ denominator majorants must fit inside

$$
\frac{C_M-P_{G,K}}{\alpha_K}
-
L_*
-
R_y^2A_*.
$$

This ceiling is often more useful than the closure ratio itself because it
tells the backend how much branch denominator budget remains before it attempts
the full directed-rounded enclosure. The ceiling constrains the sum of the two
branch majorants; it does not by itself assign separate branch quotas.

A branch-local diagnostic can be obtained by adding an explicit allocation
policy. Define

$$
W_G=
\frac{C_M-P_{G,K}}{\alpha_K}
-
L_*
-
R_y^2A_*,
\qquad
a_\varepsilon>0,
\qquad
A=\sum_\eta a_\eta,
$$

and assign

$$
W_\varepsilon=W_G\frac{a_\varepsilon}{A}.
$$

If $W_G>0$, then the sufficient branch condition

$$
G_{\varepsilon,*}
=
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-\left(d_{\varepsilon,K}^{\mathrm C}\right)^2
j_{\varepsilon,K}^{\mathrm C}}
<W_\varepsilon
$$

is equivalent to the strict denominator-product target

$$
\left(d_{\varepsilon,K}^{\mathrm C}\right)^2
j_{\varepsilon,K}^{\mathrm C}
>
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-W_\varepsilon}.
$$

Thus, with a certified $d_{\varepsilon,K}^{\mathrm C}$, it is enough to prove

$$
j_{\varepsilon,K}^{\mathrm C}
>
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-W_\varepsilon\left(d_{\varepsilon,K}^{\mathrm C}\right)^2},
$$

and, with a certified $j_{\varepsilon,K}^{\mathrm C}$, it is enough to prove

$$
d_{\varepsilon,K}^{\mathrm C}
>
\sqrt{
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-W_\varepsilon j_{\varepsilon,K}^{\mathrm C}}
}.
$$

This allocation layer is not an additional theorem hypothesis. It is a
candidate target splitter: strict branch inequalities imply the sum ceiling
because $\sum_\varepsilon W_\varepsilon=W_G$, but the actual certificate still
has to prove all floors on one directed-rounded shared domain.

The same algebra gives a non-arbitrary default splitter. Let

$$
C_\varepsilon=
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}{\nu_-}.
$$

If all $C_\varepsilon$ are positive and the only allocation objective is to
minimize the worst required denominator product, then

$$
W_\varepsilon
=
W_G\frac{C_\varepsilon}{\sum_\eta C_\eta}
$$

is minimax. It gives the common target

$$
\left(d_{\varepsilon,K}^{\mathrm C}\right)^2
j_{\varepsilon,K}^{\mathrm C}
>
\frac{\sum_\eta C_\eta}{W_G}.
$$

Indeed, any bound $C_\varepsilon/W_\varepsilon\le t$ implies
$W_G=\sum_\varepsilon W_\varepsilon\ge\sum_\varepsilon C_\varepsilon/t$,
so $t\ge(\sum_\varepsilon C_\varepsilon)/W_G$. The proportional allocation
attains that lower bound at the candidate-algebra level.

Then, for $0\le y\le Y$ on the certified speed enclosure,

$$
\sup |T_G^{(39)}|
\le
\frac{M_G}{\rho^{41}(1-q)}.
$$

The root-tangent term obeys

$$
\sup |\mathcal D_y^{(X_{39})}T_G^{(39)}|
\le
\frac{M_G}{\rho^{41}}
\left(
\frac{q}{(1-q)^2}
+
\frac{\Xi_*}{\sigma_X(1-q)}
\right).
$$

Consequently the h39 continuous tail closes if the same certificate proves

$$
\frac{M_G}{\rho^{41}(1-q)}
<
B_{G,39},
$$

and

$$
\frac{M_G}{\rho^{41}}
\left(
\frac{40}{1-q}
+
\frac{q}{(1-q)^2}
+
\frac{\Xi_*}{\sigma_X(1-q)}
\right)
<
B_{D,39}.
$$

For the current h38 successor,

$$
B_{G,39}=1.01837521179\times10^{106},
\qquad
B_{D,39}=1.01830785559\times10^{106}.
$$

For the diagnostic radius choice

$$
\rho=4Y=0.0071875,
\qquad
q=\frac14,
$$

the factor $\rho^{41}$ is approximately

$$
1.31732266963\times10^{-88}.
$$

The two budget inequalities then reduce to

$$
M_G < 1.00614656451\times10^{18}
$$

for the $G$ tail, and

$$
M_G
<
\frac{1.34144002283\times10^{18}}
{53.7777777778+1.3333333333(\Xi_*/\sigma_X)}
$$

for the correlated $D$ tail. With $\Xi_*/\sigma_X=0$, the $D$ row is already the
stricter target:

$$
M_G < 2.49441326560\times10^{16}.
$$

Thus the h39 majorant route is a quantitative closure problem rather than an
open coefficient ladder: find one directed-rounded polydisc certificate for
$N_G$ and $\Xi_\varepsilon$ whose $M_G$, $\Xi_*$, $\rho$, and $\sigma_X$ satisfy
the displayed inequalities.

## Radius-Monotone D-Bottleneck Corollary

Let

$$
s=\frac{\rho}{Y}>1,
\qquad
a=\frac{\Xi_*}{\sigma_X}\ge0.
$$

For fixed $a$, the $G$ threshold is

$$
M_G
<
B_{G,39}Y^{41}s^{40}(s-1),
$$

and the $D$ threshold is

$$
M_G
<
B_{D,39}Y^{41}
\frac{s^{40}(s-1)^2}{(40+a)(s-1)+1}.
$$

Both thresholds are strictly increasing functions of $s$ on $s>1$. For the
$G$ row,

$$
\frac{d}{ds}\log\!\left(s^{40}(s-1)\right)
=
\frac{40}{s}+\frac{1}{s-1}>0.
$$

For the $D$ row,

$$
\frac{d}{ds}\log\!\left(
\frac{s^{40}(s-1)^2}{(40+a)(s-1)+1}
\right)
=
\frac{40}{s}
+\frac{2}{s-1}
-\frac{40+a}{(40+a)(s-1)+1}.
$$

Since

$$
\frac{40+a}{(40+a)(s-1)+1}
<
\frac{1}{s-1},
$$

the derivative is greater than

$$
\frac{40}{s}+\frac{1}{s-1}>0.
$$

Moreover, the correlated $D$ threshold is always the active bottleneck. The
ratio between the two admissible $M_G$ thresholds is

$$
\frac{M_{G,\mathrm{thr}}^D}{M_{G,\mathrm{thr}}^G}
=
\frac{B_{D,39}}{B_{G,39}}
\frac{1}{40+a+\frac{1}{s-1}},
$$

which is less than $1$ for every $s>1$ and $a\ge0$.

Thus the h39 Cauchy-majorant backend should not search for an interior optimal
radius in the threshold formula. For any fixed certified slope ratio $a$, the
budget side improves as the certified analytic $y$ radius grows and as the
$X$-Cauchy margin lowers $a$. A real polydisc certificate must still check that
the numerator bound $M_G$ or the root-tangent bound $\Xi_*$ does not worsen
enough to erase that budget-side gain. The only threshold that can decide
closure is the correlated $D$ threshold.

## Slope-Envelope Corollary

The same active $D$ inequality can be inverted. For $M_G>0$, define the
dimensionless candidate numerator size

$$
\mu_D=\frac{M_G}{B_{D,39}Y^{41}}.
$$

At a chosen radius ratio $s=\rho/Y>1$, the h39 Cauchy-majorant budget admits
exactly those nonnegative slope ratios

$$
a=\frac{\Xi_*}{\sigma_X}
$$

that satisfy

$$
M_G\left(40+a+\frac{1}{s-1}\right)
<
B_{D,39}Y^{41}s^{40}(s-1).
$$

Solving this strict scalar inequality for $a$ gives

$$
a
<
\frac{s^{40}(s-1)}{\mu_D}
-40-\frac{1}{s-1}.
$$

Equivalently, in the original $q=Y/\rho$ variables,

$$
\frac{\Xi_*}{\sigma_X}
<
(1-q)\frac{B_{D,39}\rho^{41}}{M_G}
-40-\frac{q}{1-q}.
$$

This converts any future directed-rounded $M_G$ certificate into an immediate
root-tangent margin test. If the right-hand side is negative, no nonnegative
$\Xi_*/\sigma_X$ can close the h39 majorant at that radius. If it is positive,
the remaining proof burden is exactly

$$
\frac{\Xi_*}{\sigma_X}
<
a_{\max}(M_G,\rho).
$$

This is a stronger backend contract than a pass/fail $M_G$ threshold alone:
the missing polydisc certificate may report $M_G$ first, and the h39 reducer can
then tell how much $X$-Cauchy root-tangent slope budget remains.

## Root-Tangent Derived-Input Corollary

The slope ratio does not need to be treated as a primitive backend input. On
the same graph-centered polydisc, suppose a certificate proves

$$
M_R\ge\sup |y\,\partial_yR_{\varepsilon,43}|,
\qquad
J_{\min}\le\inf |J_\varepsilon|,
\qquad
J_{\min}>0,
\qquad
\sigma_X=\rho_X-r_X>0.
$$

Since

$$
\Xi_\varepsilon
=
-\frac{y\,\partial_yR_{\varepsilon,43}}{J_\varepsilon},
$$

one may choose

$$
\Xi_*=\frac{M_R}{J_{\min}},
\qquad
\frac{\Xi_*}{\sigma_X}
\le
\frac{M_R}{J_{\min}\sigma_X}.
$$

Substituting this into the active h39 scalar inequality gives the primitive
backend sufficient condition

$$
M_G
\left(
40+
\frac{M_R}{J_{\min}\sigma_X}
+
\frac{1}{s-1}
\right)
<
B_{D,39}Y^{41}s^{40}(s-1).
$$

Equivalently, in $q=Y/\rho$ form,

$$
\frac{M_G}{\rho^{41}}
\left(
\frac{40}{1-q}
+
\frac{q}{(1-q)^2}
+
\frac{M_R}{J_{\min}\sigma_X(1-q)}
\right)
<
B_{D,39}.
$$

This condition is sufficient, not necessary. A loose quotient
$M_R/J_{\min}$ can fail the scalar budget even when a sharper direct
$\Xi_\varepsilon$ enclosure would pass. Equality in the input bounds is
allowed when the bounds are certified on the same polydisc; equality in the
final h39 scalar inequality is not enough because the budget is strict.

## Primitive Polydisc Certificate Theorem

The h39 backend target can now be stated as a single primitive certificate
theorem. Fix $s=\rho/Y>1$ and a graph-centered polydisc on which the same
directed-rounded certificate supplies $M_G$, $M_R$, $J_{\min}$, and
$\sigma_X$ as above. Define the dimensionless closure ratio

$$
\Lambda_{39}^{\mathrm{prim}}
=
\frac{
M_G
\left(
40+
M_R/(J_{\min}\sigma_X)
+
1/(s-1)
\right)
}{
B_{D,39}Y^{41}s^{40}(s-1)
}.
$$

If

$$
\Lambda_{39}^{\mathrm{prim}}<1,
$$

then the correlated h39 $G,D$ Cauchy-majorant tail closes on the first-y
collar. The corresponding maximum admissible primitive numerator is

$$
M_R
<
J_{\min}\sigma_X
\left(
(1-q)\frac{B_{D,39}\rho^{41}}{M_G}
-40-\frac{q}{1-q}
\right),
$$

provided the parenthesized quantity is positive. Thus a candidate backend need
not guess a slope ratio: after it reports $M_G$, $J_{\min}$, and $\sigma_X$,
the budget theorem gives the exact residual numerator ceiling that
$M_R\ge\sup |y\,\partial_yR_{\varepsilon,43}|$ must beat.

This theorem is the present closure form of the h39 analytic route. It is a
success certificate when the four primitive bounds are produced on one shared
polydisc and $\Lambda_{39}^{\mathrm{prim}}<1$; it is not a new independent
gate and it does not authorize mixing $M_G$, $M_R$, $J_{\min}$, and
$\sigma_X$ from different domains.

## Rouché Graph-Lift Corollary

The primitive theorem still assumes a certified $X_{39,\varepsilon}$ graph
tube. A safe graph lift can be stated directly in backend quantities. Let
$X_c(\nu)$ be the graph center used for the h39 $X$ polydisc, and suppose the
same directed-rounded domain certifies

$$
|R_{\varepsilon,43}(y,X_c(\nu),\nu)|\le E_R,
$$

$$
|\partial_XR_{\varepsilon,43}(y,X_c(\nu),\nu)|\ge\nu_J,
$$

and the oscillation bound

$$
|\partial_XR_{\varepsilon,43}(y,X,\nu)
-\partial_XR_{\varepsilon,43}(y,X_c(\nu),\nu)|
\le L_J|X-X_c(\nu)|
$$

for $|X-X_c(\nu)|\le\rho_X$. Choose $0<r_X<\rho_X$ and define

$$
\sigma_X=\rho_X-r_X,
\qquad
J_{\min}=\nu_J-L_J\rho_X.
$$

A sufficient source for the oscillation bound is a shared-domain proof that
$L_J\ge\sup|\partial_X^2R_{\varepsilon,43}|$ on the same graph-centered
polydisc. The current h39 coefficient-series engine supplies the structural
identity behind that target:

$$
\partial_X^2R_{\varepsilon,43}
=
y^{41}
\left(
\frac{2}{\nu^2}
-\sin\delta_\varepsilon
-\sin\phi_\varepsilon
\right).
$$

This explains why the coefficient-only $L_J$ candidate is $y^{41}$-suppressed,
but it does not by itself certify a continuous $L_J$ value.

A sharper backend interface is available before the scalar h39 reducer sees
$L_J$. If the same graph-centered certificate proves

$$
M_K\ge
\max_\varepsilon\sup_{\mathcal P_{\rho,\rho_X}}
\left|
\frac{2}{\nu^2}
-\sin\delta_\varepsilon
-\sin\phi_\varepsilon
\right|,
$$

then the structural identity gives

$$
\sup_{\mathcal P_{\rho,\rho_X}}
|\partial_X^2R_{\varepsilon,43}|
\le
\rho^{41}M_K.
$$

The graph-lift theorem may therefore use the reduced Lipschitz input
$L_J^{\mathrm{red}}=\rho^{41}M_K$. This is not a separate certificate: it is
the coefficient identity plus one continuous kernel majorant on the same
polydisc.

One safe way to produce that kernel majorant is the coordinate-seminorm bound
$M_K^{\mathrm{coord}}$ from the h39 shared-domain coefficient-series engine,
using $|\sin z|\le\sinh(|z|)$. The graph-lift theorem may consume
$L_J^{\mathrm{red}}=\rho^{41}M_K^{\mathrm{coord}}$ as a sufficient Lipschitz
input, provided the coordinate seminorms are outward-rounded on the same
$y,X,\nu$ polydisc used for $E_R,\nu_J,M_G,$ and $M_R$.

If

$$
J_{\min}>0
$$

and

$$
E_R+\frac12L_Jr_X^2<\nu_Jr_X,
$$

then $R_{\varepsilon,43}(y,X,\nu)=0$ has a unique zero in
$|X-X_c(\nu)|<r_X$ for each certified $(y,\nu)$ base point. That zero is the
$X_{39,\varepsilon}$ root graph used by the h39 majorant, it lies a positive
Cauchy distance $\sigma_X$ from the boundary of the larger $X$ disc, and
$|J_\varepsilon|\ge J_{\min}$ on the larger $X$ polydisc.

The Rouché radius can be solved rather than guessed. If $L_J>0$, set

$$
\Delta_R=\nu_J^2-2L_JE_R.
$$

The strict graph-lift window is nonempty exactly when

$$
\Delta_R>0
\qquad\text{and}\qquad
r_R^-<\rho_X,
$$

where the lower boundary may be written in the stable form

$$
r_R^-
=
\frac{\nu_J-\sqrt{\Delta_R}}{L_J}
=
\frac{2E_R}{\nu_J+\sqrt{\Delta_R}}.
$$

Under the additional h39 condition $J_{\min}=\nu_J-L_J\rho_X>0$, the upper
quadratic root does not further restrict the admissible interval, so the
backend should choose

$$
r_X\in(r_R^-,\rho_X).
$$

If $L_J=0$, the window is

$$
r_X\in(E_R/\nu_J,\rho_X),
$$

with $E_R/\nu_J=0$ when $E_R=0$. For fixed $\rho_X$, maximizing the Cauchy
margin means choosing $r_X$ just above the lower strict boundary, so

$$
\sigma_X<\rho_X-r_R^-
$$

when $L_J>0$, and

$$
\sigma_X<\rho_X-\frac{E_R}{\nu_J}
$$

when $L_J=0$. These are suprema, not attained margins, because equality at the
lower boundary fails the strict Rouché inequality.

## Cauchy Shifted-Tail Interface

The shared-domain primitive certificate can be supplied by a shifted-tail
Cauchy backend, but only if every primitive value comes from the same
graph-centered domain. Let $\rho$ be the target first-y radius, let
$R_y>\rho$ be an outer Cauchy radius, and set $q=\rho/R_y$. If $F$ is analytic
on $|y|\le R_y$, $|F|\le B_F$, and the lower coefficients vanish exactly so
that

$$
F(y)=y^N\operatorname{Shift}_N F(y),
$$

then

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
the same Cauchy estimate gives the sufficient nonzero floor condition

$$
\operatorname{dist}(j_0,0)
>
\frac{B_H}{R_y}\frac{q}{1-q}.
$$

This interface is sufficient, not necessary. It does not allow mixing
$E_R,\nu_J,L_J,\rho_X,r_X,M_G,$ and $M_R$ from different domains, and it does
not certify retained branch status unless the strict Rouché graph lift and
$\Lambda_{39}^{\mathrm R}<1$ are also proved on that same domain. The raw
unshifted version is too wide on the present collar; its role is therefore to
bound the remaining analytic tail after the finite shifted prefix, not to
replace the shifted-prefix certificate.

The intended use is a finite-prefix-plus-Cauchy-tail diagnostic. The finite
prefix may improve candidate values of $E_R,\nu_J,M_G,$ and $M_R$, while the
Cauchy estimate supplies only the unretained analytic tail. This diagnostic is
order-selection data for the future backend: it can say that a retained prefix
order $K$ would leave enough h39 scalar margin if its shared-domain tails were
certified. It cannot by itself prove the Rouché graph lift, cannot mix
primitive inputs from different domains, and cannot certify the h39 continuous
tail unless the resulting seven primitive inputs are directed-rounded on the
same graph-centered polydisc and satisfy $\Lambda_{39}^{\mathrm R}<1$.

The executable h39 denominator path now implements this interface for the
$N_G/M_G$ direction with an explicit completeness rule. A derived
$B_{N_G}^{\mathrm{out}}$ is emitted only when the backend supplies
$R_y$, outer bounds for $\delta_\varepsilon$, $\phi_\varepsilon$, and
$J_\varepsilon^{\mathrm{abs}}$, plus $L_*$ and the lower-polynomial majorant
$A_*$. Missing one of these inputs leaves no derived $N_G$ Cauchy bound; the
implementation rejects partial data instead of assuming a zero contribution.
When the data are complete, the two branch denominator candidates give

$$
B_{N_G}^{\mathrm{denC}}
=
\sum_\varepsilon
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_- (d_{\varepsilon,K}^{\mathrm C})^2j_{\varepsilon,K}^{\mathrm C}}
+
L_*+R_y^2A_*.
$$

The same diagnostic compares this value to the h39-implied ceiling

$$
\frac{C_M-P_{G,K}}{\alpha_K}
$$

and records the remaining branch-sum budget

$$
W_G=
\frac{C_M-P_{G,K}}{\alpha_K}-L_*-R_y^2A_*.
$$

If $W_G\le0$, the current retained order, radius choice, and primitive tuple
leave no positive branch-denominator budget. If $W_G>0$, the branch-sum ratio
\[
\frac{\sum_\varepsilon G_{\varepsilon,*}}{W_G}
\]
is a direct work-remaining measure: values below $1$ pass this candidate
budget, and values above $1$ state the required shrink factor before the
denominator route can close.

## Rouché-Primitive Closure Theorem

Combining the graph lift with the primitive h39 theorem gives one scalar
certificate in backend variables. Under the Rouché hypotheses above, set

$$
J_R=\nu_J-L_J\rho_X,
\qquad
\sigma_R=\rho_X-r_X,
\qquad
\Gamma_R=\nu_Jr_X-E_R-\frac12L_Jr_X^2.
$$

The graph-lift side of the same certificate is exactly

$$
0<r_X<\rho_X,
\qquad
J_R>0,
\qquad
\Gamma_R>0.
$$

Define

$$
\Lambda_{39}^{\mathrm R}
=
\frac{
M_G
\left(
40+
\frac{M_R}{J_R\sigma_R}
+
\frac{1}{s-1}
\right)
}{
B_{D,39}Y^{41}s^{40}(s-1)
}.
$$

If the same graph-centered directed-rounded certificate proves

$$
J_{\min}=J_R>0,
\qquad
\sigma_X=\sigma_R>0,
$$

chooses $r_X$ inside the strict Rouché radius window, certifies
$M_G\ge\sup|N_G|$ and
$M_R\ge\sup|y\,\partial_yR_{\varepsilon,43}|$ on that same domain, and proves

$$
\Lambda_{39}^{\mathrm R}<1,
$$

then the correlated h39 $G,D$ Cauchy-majorant tail closes on the first-y
collar. Written without the ratio name, the closing inequality is

$$
M_G
\left(
40+
\frac{M_R}{J_R\sigma_R}
+
\frac{1}{s-1}
\right)
<
B_{D,39}Y^{41}s^{40}(s-1).
$$

Equivalently, once $M_G$, $\nu_J$, $L_J$, $\rho_X$, and $r_X$ are fixed, the
Rouché-form admissible numerator ceiling is

$$
M_R
<
(\nu_J-L_J\rho_X)(\rho_X-r_X)
\left(
(1-q)\frac{B_{D,39}\rho^{41}}{M_G}
-40-\frac{q}{1-q}
\right),
$$

provided the parenthesized quantity is positive. If it is nonpositive, no
nonnegative $M_R$ can close this sufficient h39 majorant at that radius and
candidate $M_G$. If $M_G=0$, the $G$ numerator tail is already zero and the
$M_R$ ceiling becomes irrelevant after the strict graph lift is certified.

For $L_J>0$, the strict radius window is equivalently

$$
\Delta_R>0,
\qquad
r_R^-<r_X<\rho_X<\frac{\nu_J}{L_J}.
$$

For $L_J=0$, it is

$$
\frac{E_R}{\nu_J}<r_X<\rho_X,
$$

with any $0<r_X<\rho_X$ allowed when $E_R=0$. This theorem is the current
backend closure theorem in certificate variables: the same certificate must
supply $E_R$, $\nu_J$, $L_J$, $r_X$, $\rho_X$, $M_G$, and $M_R$ on one shared
domain, with strict Rouché and h39 scalar margins. It keeps the speed input
fixed to the certified speed-ratio enclosure rather than introducing any fixed
speed band.

### Primitive-Vector Artifact Promotion Corollary

The primitive-vector backend artifact promotes to this h39 continuous-tail
certificate exactly when its vector

$$
\mathfrak P_{39}=(E_R,\ M_R,\ M_G,\ \nu_J,\ L_J)
$$

and the declared radii $(\rho_X,r_X)$ are supplied by one directed-rounded
graph-centered provenance backend and the displayed Rouché-primitive
inequalities are strict. A complete vector whose status is only
\texttt{provided-unverified} is a reducer-ready candidate, not a proof. A
complete vector labelled by an external directed-rounded source is still only
a replay pass unless the receiving artifact verifies the same-domain
provenance. Thus the theorem closes exactly the h39 correlated $G,D$
Cauchy-majorant tail; it does not by itself certify scaled remainder,
quadrature, `I1` regular critical exhaustion, or retained branch status.

The same statement now has an executable proof-object form. A primitive
same-domain provenance certificate must verify that $E_R$, $M_R$, $M_G$,
$\nu_J$, $L_J$, $\rho_X$, and $r_X$ all share one graph-centered domain
signature and have the correct directed-rounded bound relation. The certificate
passes exactly when each witness covers the primitive reducer input in the
proper direction, the graph radii match exactly, and the Rouché-primitive
replay gives $\Lambda_{39}^{\mathrm R}<1$ with the strict graph-lift margins
above. This is not a new gate: it is the proof-object form of the displayed
theorem, with a built-in no-go result for domain mismatch, failed value
coverage, missing components, wrong bound direction, or unverified provenance.
The first source-family subset is now factored out: a directed-rounded
same-domain shifted $R_{\varepsilon,43}$ Cauchy prefix-tail witness certifies
exactly the $E_R$ and $M_R$ primitive components, while leaving $M_G$,
$\nu_J$, $L_J$, $\rho_X$, $r_X$, scaled remainder, `I1`, and retention open.
The remaining primitive entries now have matching component witness routes:
a shifted $N_G$ prefix-tail witness certifies only $M_G$, a positive
center-Jacobian Cauchy floor certifies only $\nu_J$, a same-domain
$K_\varepsilon$ majorant followed by the $y^{41}$ reduction certifies only
$L_J$, and a graph-radii declaration certifies exactly $\rho_X,r_X$. Together
these subsets cover the seven primitive inputs of the h39 reducer without
changing the claim boundary: a full h39 continuous-tail certificate still
requires all seven component witnesses to share one graph-centered signature
and to replay through the strict scalar inequality.
The executable component-subset composition artifact is the proof-object form
of this sentence: it assembles the five subset packets into the same primitive
provenance report consumed by the existing certificate, then leaves
scaled-remainder, `I1`, quadrature, and retained-branch claims outside the
theorem.

The current candidate-vector backend now emits that no-go direction explicitly.
If the only available source is the candidate primitive vector, the derived
provenance report has status
\texttt{open-candidate-only-primitive-provenance}. This status is decisive for
the artifact claim level: it prevents
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=true}
even when the scalar h39 replay reports $\Lambda_{39}^{\mathrm R}<1$. The
obstruction is missing same-domain proof provenance, not a failure of the
Rouché-primitive inequality itself.

## Minimal Denominator-Cauchy Witness Corollary

For the denominator-Cauchy route to the $M_G$ primitive, the finite witness is
the same domain signature $\mathfrak S$ together with

$$
K_\varepsilon,\quad d_\varepsilon,\quad j_\varepsilon,\quad \nu_-,
\quad L_*,\quad A_*,\quad R_y,\quad \rho,\quad K,
\quad \{g_0,\ldots,g_K\}.
$$

If

$$
|B_\varepsilon|\le K_\varepsilon,\qquad
|\delta_\varepsilon|\ge d_\varepsilon>0,\qquad
|J_\varepsilon^{\mathrm{abs}}|\ge j_\varepsilon>0,
\qquad
\nu\ge\nu_-,
$$

all hold on $\mathfrak S$, then

$$
B_{N_G,K}^{\mathrm{denC}}
=
\sum_{\varepsilon\in\{-,+\}}
\frac{4|c|K_\varepsilon}
{\nu_-d_\varepsilon^2j_\varepsilon}
+L_*+R_y^2A_*
$$

is a same-domain outer source for the unshifted numerator tail, and

$$
M_{G,K}^{\mathrm{denC}}
=
\sum_{m=0}^{K}|g_m|\rho^{41+m}
+B_{N_G,K}^{\mathrm{denC}}
\frac{(\rho/R_y)^{41+K+1}}{1-\rho/R_y}
$$

is an admissible $M_G$ primitive entry. Therefore the $M_G$ backend is narrowed
to a finite denominator witness: any missing branch floor, nonpositive
$d_\varepsilon$ or $j_\varepsilon$, or domain-signature mismatch blocks the
$M_G$ primitive independently of the scalar h39 replay.

The executable form of this corollary is a denominator-Cauchy $M_G$ witness,
not a new primitive-closure artifact. It verifies the two branch
denominator-Cauchy candidates, checks that their branch majorants compose
$B_{N_G,K}^{\mathrm{denC}}$ on one graph-centered signature, restores the
$y^{41}$ unshifted scaling, and then feeds the existing $N_G$ numerator subset
replay. Its strongest positive claim is exactly the $M_G$ component witness;
the component-subset composition still needs the other four source families
and the strict h39 scalar replay before the continuous-tail row can certify.

## Primitive Slack Tolerance Corollary

The same Rouché-primitive inequality also gives a one-at-a-time tolerance map
for the seven primitive bounds. This is useful because it turns the remaining
shared-domain backend problem into explicit directed-rounded targets rather
than another qualitative requirement.

Let

$$
K_D=B_{D,39}Y^{41}s^{40}(s-1),
\qquad
A_D=40+\frac{1}{s-1},
\qquad
X_R=J_R\sigma_R.
$$

For $M_G>0$, define

$$
C_D=\frac{K_D}{M_G}-A_D.
$$

If $C_D\le0$, no nonnegative $M_R$ can satisfy the sufficient h39 scalar
majorant for that $M_G$. If $C_D>0$, the primitive closure condition is
equivalent to the strict product floor

$$
X_R>\frac{M_R}{C_D}.
$$

Holding the other primitive values fixed, the corresponding strict admissible
one-at-a-time boundaries are

$$
E_R<\nu_Jr_X-\frac12L_Jr_X^2,
$$

$$
\nu_J>
\max\left(
L_J\rho_X,\,
\frac{E_R+\frac12L_Jr_X^2}{r_X},\,
L_J\rho_X+\frac{M_R}{\sigma_RC_D}
\right),
$$

$$
L_J<
\min\left(
\frac{\nu_J}{\rho_X},\,
\frac{2(\nu_Jr_X-E_R)}{r_X^2},\,
\frac{\nu_J-\frac{M_R}{\sigma_RC_D}}{\rho_X}
\right),
$$

$$
M_G<
\frac{K_D}{A_D+\frac{M_R}{J_R\sigma_R}},
\qquad
M_R<J_R\sigma_RC_D.
$$

The $X$-polydisc radius and graph radius can also be inverted. Write
$X_{\min}=M_R/C_D$. For $L_J>0$, admissible $\rho_X$ values lie strictly
between the two roots

$$
\rho_X^\pm=
\frac{
\nu_J+L_Jr_X
\pm
\sqrt{(\nu_J-L_Jr_X)^2-4L_JX_{\min}}
}{2L_J},
$$

provided the discriminant is positive. For $L_J=0$, the lower condition is
$\rho_X>r_X+X_{\min}/\nu_J$. With $\rho_X$ fixed and $J_R>0$, admissible
$r_X$ lies strictly above the Rouché lower boundary and below

$$
\min\left(\rho_X,\ r_R^+,\ \rho_X-\frac{X_{\min}}{J_R}\right),
$$

where $r_R^+$ is omitted when $L_J=0$. All these boundaries are strict:
equality describes the edge of the sufficient certificate, not a retained h39
branch.

## Primitive Remainder Budget Corollary

The slack map can be made robust against analytic remainders without changing
the h39 theorem. Start with a candidate tuple
$(E_R,\nu_J,L_J,\rho_X,r_X,M_G,M_R)$ and nonnegative remainder allowances

$$
\delta_E,\quad \delta_\nu,\quad \delta_L,\quad
\delta_{\rho,-},\quad \delta_{\rho,+},\quad
\delta_{r,-},\quad \delta_{r,+},\quad
\delta_G,\quad \delta_R .
$$

Use the pessimistic replacements

$$
E^+=E_R+\delta_E,\quad
\nu^-=\nu_J-\delta_\nu,\quad
L^+=L_J+\delta_L,
$$

$$
\rho^-\le\rho'\le\rho^+,
\qquad
\rho^-=\rho_X-\delta_{\rho,-},
\qquad
\rho^+=\rho_X+\delta_{\rho,+},
$$

$$
r^-\le r'\le r^+,
\qquad
r^-=r_X-\delta_{r,-},
\qquad
r^+=r_X+\delta_{r,+},
$$

and $M_G^+=M_G+\delta_G$, $M_R^+=M_R+\delta_R$. If
$0<r^-\le r^+<\rho^-\le\rho^+$, then the robust Jacobian and Cauchy margins are

$$
J_{\mathrm{rob}}=\nu^- - L^+\rho^+,
\qquad
\sigma_{\mathrm{rob}}=\rho^- - r^+.
$$

The Rouché margin

$$
\Gamma(r)=\nu^- r-E^+-\frac12L^+r^2
$$

is concave in $r$, so its minimum on $[r^-,r^+]$ occurs at an endpoint. The
product

$$
X(\rho,r)=(\nu^- - L^+\rho)(\rho-r)
$$

is concave in $\rho$ for fixed $r$ and decreases with $r$ when
$\nu^- - L^+\rho>0$, so a sufficient robust product floor is

$$
X_{\mathrm{rob}}
=
\min\left(
(\nu^- - L^+\rho^-)(\rho^- - r^+),\,
(\nu^- - L^+\rho^+)(\rho^+ - r^+)
\right).
$$

The whole rectangle remains inside the h39 Rouché-primitive certificate if

$$
J_{\mathrm{rob}}>0,\qquad
\sigma_{\mathrm{rob}}>0,\qquad
\min(\Gamma(r^-),\Gamma(r^+))>0,
$$

and

$$
M_G^+
\left(
A_D+\frac{M_R^+}{X_{\mathrm{rob}}}
\right)
<K_D.
$$

This is the first h39 analytic-remainder budget theorem: a continuous backend
does not need to recompute the h39 algebra after each primitive tail estimate.
It only has to prove that its outward-rounded primitive remainders fit inside
this rectangle with positive strict margins.

## Primitive Remainder Profile-Scale Corollary

The preceding robust rectangle also gives a one-dimensional closure target for
analytic-remainder profiles. Fix nonnegative profile directions

$$
d_E,\quad d_\nu,\quad d_L,\quad
d_{\rho,-},\quad d_{\rho,+},\quad
d_{r,-},\quad d_{r,+},\quad d_G,\quad d_R .
$$

For $\lambda\ge0$, replace the allowances in the primitive remainder budget by

$$
\delta_E=\lambda d_E,\quad
\delta_\nu=\lambda d_\nu,\quad
\delta_L=\lambda d_L,\quad
\delta_{\rho,\pm}=\lambda d_{\rho,\pm},\quad
\delta_{r,\pm}=\lambda d_{r,\pm},\quad
\delta_G=\lambda d_G,\quad
\delta_R=\lambda d_R .
$$

The sharp fixed-rectangle lower product $X_{\mathrm{rob}}$ is valid at each
chosen $\lambda$, but it is not the cleanest bisection predicate because the
endpoint minimum can switch. A monotone sufficient predicate is obtained by the
safe product floor

$$
X_{\mathrm{safe}}(\lambda)
=J_{\mathrm{rob}}(\lambda)\sigma_{\mathrm{rob}}(\lambda)
=
(\nu^-(\lambda)-L^+(\lambda)\rho^+(\lambda))
(\rho^-(\lambda)-r^+(\lambda)).
$$

Define $P_{\mathrm{safe}}(\lambda)$ to be the conjunction of
$0<r^-(\lambda)\le r^+(\lambda)<\rho^-(\lambda)\le\rho^+(\lambda)$, positive
endpoint Rouché margins, $X_{\mathrm{safe}}(\lambda)>0$, and

$$
M_G^+(\lambda)
\left(
A_D+\frac{M_R^+(\lambda)}{X_{\mathrm{safe}}(\lambda)}
\right)
<K_D .
$$

Then the safe profile scale

$$
\lambda_*^{\mathrm{safe}}
=
\sup\{\lambda\ge0:\ P_{\mathrm{safe}}(\lambda)\}
$$

is an executable scalar target for the continuous backend. Because the
inequalities are strict, a certified backend must choose
$\lambda<\lambda_*^{\mathrm{safe}}$; equality is the edge of the sufficient
certificate, not a retained branch. This converts a vector of analytic-tail
remainder pressures into one candidate maximum scale while preserving the
same h39 Rouché-primitive theorem.

### Fixed-Radii Primitive-Profile Boundary

The live h39 analytic-remainder obstruction has a sharper closed form when
$\rho_X,r_X$ are fixed and the primitive pressures vary through declared
nonnegative profile directions. Fix the primitive base vector

$$
(E_R^0,\nu_J^0,L_J^0,M_G^0,M_R^0)
$$

on one graph-centered signature, and fix nonnegative profile directions
$e_R,n_J,\ell_J,m_G,m_R$. For $\lambda\ge0$, set

$$
E_R(\lambda)=E_R^0+\lambda e_R,\qquad
\nu_J(\lambda)=\nu_J^0-\lambda n_J,
$$

$$
L_J(\lambda)=L_J^0+\lambda\ell_J,\qquad
M_G(\lambda)=M_G^0+\lambda m_G,\qquad
M_R(\lambda)=M_R^0+\lambda m_R .
$$

Let

$$
\sigma_X=\rho_X-r_X,\qquad
J_\lambda
=\nu_J(\lambda)-L_J(\lambda)\rho_X
=J_0-\lambda(n_J+\ell_J\rho_X),
$$

and

$$
\Gamma_\lambda
=\nu_J(\lambda)r_X-E_R(\lambda)-\frac12L_J(\lambda)r_X^2
=\Gamma_0-\lambda\left(n_Jr_X+e_R+\frac12\ell_Jr_X^2\right).
$$

For the h39 scalar budget, write

$$
K_D=B_{D,39}Y^{41}s^{40}(s-1),\qquad
C_D=40+\frac{1}{s-1}.
$$

The fixed-radii primitive profile closes exactly when

$$
\sigma_X>0,\qquad J_\lambda>0,\qquad \Gamma_\lambda>0,
$$

and

$$
\Lambda_{39}^{\mathrm{multi}}(\lambda)
=
\frac{
M_G(\lambda)
\left(
C_D+\dfrac{M_R(\lambda)}{J_\lambda\sigma_X}
\right)
}{K_D}
<1 .
$$

Equivalently, while $J_\lambda\sigma_X>0$, the scalar boundary is the first
positive failure of the quadratic inequality $P(\lambda)>0$, where

$$
P(\lambda)
=
K_D\sigma_X(J_0-a_J\lambda)
-
(M_G^0+m_G\lambda)
\left(
C_D\sigma_X(J_0-a_J\lambda)+M_R^0+m_R\lambda
\right)
$$

with $J_0=\nu_J^0-L_J^0\rho_X$ and
$a_J=n_J+\ell_J\rho_X$. Thus the unattained strict scale is

$$
\lambda_*^{\mathrm{multi}}
=
\min\{\lambda_J,\lambda_\Gamma,\lambda_\Lambda\},
$$

with

$$
\lambda_J=
\begin{cases}
J_0/a_J,& a_J>0,\\
\infty,& a_J=0,
\end{cases}
\qquad
\lambda_\Gamma=
\begin{cases}
\Gamma_0/a_\Gamma,& a_\Gamma>0,\\
\infty,& a_\Gamma=0,
\end{cases}
$$

where

$$
a_\Gamma=n_Jr_X+e_R+\frac12\ell_Jr_X^2,
\qquad
\Gamma_0=\nu_J^0r_X-E_R^0-\frac12L_J^0r_X^2.
$$

The value $\lambda_\Lambda$ is the first positive root of $P(\lambda)$. The
bottleneck is whichever of $J_\lambda$, $\Gamma_\lambda$, or
$\Lambda_{39}^{\mathrm{multi}}$ attains the minimum. This is a candidate
budget reducer, not a new closure gate: a certified backend must still choose
some $\lambda<\lambda_*^{\mathrm{multi}}$ and provide same-domain
directed-rounded witnesses for every primitive component it uses.

The required-scale margin vector is the boundary replay evaluated at
$\lambda=1$:

$$
\mathbf M_1^{\mathrm{multi}}
=
\bigl(J_1,\Gamma_1,P(1)\bigr),
$$

where

$$
J_1=J_0-a_J,
\qquad
\Gamma_1=\Gamma_0-a_\Gamma,
$$

and

$$
P(1)
=
K_D\sigma_XJ_1
-(M_G^0+m_G)\bigl(C_D\sigma_XJ_1+M_R^0+m_R\bigr).
$$

At fixed $\rho_X,r_X$, the required scale is candidate-admissible exactly when
$\sigma_X>0$ and all three displayed margins are strictly positive. Equality
is the strict boundary, not closure. The vector records which candidate margin
blocks $\lambda=1$ when $H_{\lambda=1}\le0$.

Candidate success marker: define
$H_{\lambda=1}:=\lambda_*^{\mathrm{multi}}-1$ for this exact fixed-radii
primitive-profile boundary. If $H_{\lambda=1}>0$, the declared analytic
remainder direction has candidate headroom through the required scale
$\lambda=1$; if $H_{\lambda=1}\le0$, the value $-H_{\lambda=1}$ is the
candidate deficit or strict-boundary shortfall. This marker records scalar
replay feasibility only: it does not certify directed-rounded shared-domain
provenance, continuous-tail closure, or retained branch status.

The current shared-domain evaluator now supplies concrete candidate sources
for most of that profile vector when explicit Cauchy outer bounds are
available. A shifted $R_{\varepsilon,43}$ retained prefix with outer bound
$B_R$ on radius $R_y$ contributes

$$
d_E=
\frac{B_R}{R_y^{43}}\frac{q^{K+1}}{1-q},
\qquad
d_R=
\frac{B_R}{R_y^{43}}
\frac{q^{K+1}\big((K+1)-Kq\big)}{(1-q)^2},
\qquad
q=\frac{\rho}{R_y}.
$$

The shifted $N_G=y^{41}T_G^{(39)}$ retained prefix contributes the unshifted
$M_G$ profile

$$
d_G=
B_{N_G}^{\mathrm{out}}
\frac{q^{41+K+1}}{1-q}.
$$

Finally, an explicit $\partial_XR_{\varepsilon,43}$ outer bound contributes
the optional floor-loss profile $d_\nu$ by subtracting the post-prefix Cauchy
tail from the coefficient floor. If that Jacobian outer bound is absent, the
evaluator leaves $d_\nu$ absent instead of promoting a coefficient-only floor
to a continuous $\nu_J$ certificate.

The evaluator can now also manufacture the source and Jacobian outer inputs
from branch-coordinate seminorms, still only as candidate data. Let
$D_\varepsilon(R)=\|\delta_\varepsilon\|_R$,
$\Phi_\varepsilon(R)=\|\phi_\varepsilon\|_R$, and
$S_\nu=\sup_{\nu\in I_\nu}|\nu^{-2}|$. On a source outer radius $R_y$, the
source residual
$F_\varepsilon=\delta_\varepsilon^2/\nu^2-2+\sin\phi_\varepsilon+\sin\delta_\varepsilon$
obeys the elementary entire-function bound

$$
B_{F,\varepsilon}^{\mathrm{out}}
=
S_\nu D_\varepsilon(R_y)^2
+2
+\sinh D_\varepsilon(R_y)
+\sinh \Phi_\varepsilon(R_y).
$$

For the removable Jacobian numerator
$H_\varepsilon=y\,\partial_XR_{\varepsilon,43}$, choose nested radii
$R_J<R_H$. Then

$$
B_{H,\varepsilon}
=
2S_\nu D_\varepsilon(R_H)
+\cosh D_\varepsilon(R_H)
+\cosh \Phi_\varepsilon(R_H),
\qquad
B_{J,\varepsilon}^{\mathrm{out}}
=
\frac{B_{H,\varepsilon}}{R_H-R_J}.
$$

The strict gap $R_H-R_J$ is the removable-quotient Cauchy margin; the route is
invalid if the intended $y$ domain touches the division point. The branch-pair
candidate takes the maximum over $\varepsilon\in\{-,+\}$ and passes those
$B_F^{\mathrm{out}}$ and $B_J^{\mathrm{out}}$ values into the existing profile
replay. This is a theory advance because it connects the h39 profile vector to
the actual branch coordinates, but it is not yet closure because the resulting
bounds are intentionally broad and still need directed-rounded shared-domain
provenance.
That provenance boundary is now executable in the primitive diagnostic. A
coordinate-Cauchy witness may turn the branch-pair maxima
$B_F^{\mathrm{out}}$ and $B_J^{\mathrm{out}}$ into the existing shifted
$R_{\varepsilon,43}$ source-family replay and center-Jacobian floor replay
only when those maxima, the profile outer radii, and the graph-centered
signature agree. Its positive theorem claim is limited to $E_R,M_R,\nu_J$;
the $M_G$ numerator, the $L_J$ kernel route, graph radii, and the final h39
scalar replay remain separate proof obligations.

The corresponding full Cauchy primitive profile-vector diagnostic packages the
five quantities that must become mutually compatible on one graph-centered
Cauchy domain:

$$
\mathfrak P_{39}
=
(E_R,\ M_R,\ M_G,\ \nu_J,\ L_J).
$$

Its role is not merely to ask whether each entry has some bound. The vector
must survive the same h39 graph-lift and correlated $G,D$ tail inequalities:

$$
J_{39}=\nu_J-L_J\rho_X,
\qquad
\sigma_X=\rho_X-r_X,
\qquad
\Gamma_{39}=\nu_Jr_X-E_R-\frac12L_Jr_X^2,
$$

and

$$
\Lambda_{39}^{\mathrm{prof}}
=
\frac{
M_G
\left(
40+\frac{M_R}{J_{39}\sigma_X}+\frac{1}{s-1}
\right)
}{
B_{D,39}Y^{41}s^{40}(s-1)
}.
$$

The certificate-readiness inequalities are

$$
0<r_X<\rho_X,
\qquad
J_{39}>0,
\qquad
\Gamma_{39}>0,
\qquad
\Lambda_{39}^{\mathrm{prof}}<1.
$$

For replayed analytic-tail pressure, the executable vector path is

$$
\mathfrak P_{39}(\lambda)
=
\bigl(
E_R^0+\lambda e_R,\,
M_R^0+\lambda m_R,\,
M_G^0+\lambda m_G,\,
\nu_J^0-\lambda n_J,\,
L_J^0+\lambda \ell_J
\bigr),
$$

with all increments nonnegative. The current evaluator therefore reports
whether the vector is incomplete, complete but scale-open, or complete and
closed at $\lambda=1$. This is a stronger mathematical object than separate
component bounds because it rejects mutually unusable estimates drawn from
different Cauchy domains or remainder models.

## Rouché Radius Supremum Reduction Corollary

The preceding theorem still presents $r_X$ as a chosen strict radius. The
radius choice itself can be reduced. Hold $\rho_X$, $E_R$, $\nu_J$, $L_J$,
$M_G$, and the $y$ radius fixed, and set

$$
C_D
=
(1-q)\frac{B_{D,39}\rho^{41}}{M_G}
-40-\frac{q}{1-q}
$$

for $M_G>0$. Equivalently,

$$
C_D
=
\frac{B_{D,39}Y^{41}s^{40}(s-1)}{M_G}
-40-\frac{1}{s-1}.
$$

For a fixed admissible Rouché radius $r_X$, the primitive numerator ceiling is

$$
M_R
<
J_R(\rho_X-r_X)C_D.
$$

Thus, if $C_D\le0$, no nonnegative $M_R$ can close this sufficient h39
majorant at the chosen $M_G$ for any admissible $r_X$. If $M_G=0$, the h39
scalar ratio imposes no finite $M_R$ ceiling after the strict graph lift is
certified.

Assume now that $M_G>0$, $C_D>0$, and the strict Rouché radius window is
nonempty. If $L_J>0$, the supremal admissible primitive numerator ceiling is

$$
M_{R,\sup}^{(L_J>0)}
=
(\nu_J-L_J\rho_X)(\rho_X-r_R^-)C_D,
$$

or, with the stable lower boundary inserted,

$$
M_{R,\sup}^{(L_J>0)}
=
(\nu_J-L_J\rho_X)
\left(
\rho_X-\frac{2E_R}{\nu_J+\sqrt{\nu_J^2-2L_JE_R}}
\right)
C_D.
$$

If $L_J=0$, the lower strict boundary is $E_R/\nu_J$ and the supremal ceiling is

$$
M_{R,\sup}^{(L_J=0)}
=
\nu_J
\left(
\rho_X-\frac{E_R}{\nu_J}
\right)
C_D
=
(\nu_J\rho_X-E_R)C_D.
$$

The reason is monotonicity in the chosen graph radius. For every admissible
case with $C_D>0$,

$$
M_R^{\max}(r_X)=J_R(\rho_X-r_X)C_D
$$

has derivative

$$
\frac{d}{dr_X}M_R^{\max}(r_X)
=
-J_RC_D<0.
$$

The best ceiling is therefore approached by taking $r_X$ arbitrarily close to
the lower strict Rouché boundary from above. It is not attained. For $L_J>0$,
equality $r_X=r_R^-$ gives $\Gamma_R=0$; for $L_J=0$ and $E_R>0$, equality
$r_X=E_R/\nu_J$ also gives $\Gamma_R=0$; and for $L_J=0$, $E_R=0$, the lower
endpoint $r_X=0$ violates the positive-radius requirement.

Consequently, after the shared-domain certificate supplies
$E_R,\nu_J,L_J,\rho_X,M_G,M_R$, the existential radius question is reduced to

$$
M_R<M_{R,\sup}.
$$

When this holds, any radius satisfying

$$
r_{\mathrm{low}}
<
r_X
<
\rho_X-\frac{M_R}{J_RC_D}
$$

closes the same Rouché-primitive h39 inequality, where

$$
r_{\mathrm{low}}=r_R^-
\quad(L_J>0),
\qquad
r_{\mathrm{low}}=\frac{E_R}{\nu_J}
\quad(L_J=0).
$$

This is only a reduction of the radius choice inside the existing h39 closure
ratio. It introduces no independent gate and does not relax the requirement
that all backend bounds come from one shared graph-centered certificate
domain.

## Rouché $\rho_X$ Optimum Corollary

The remaining $X$-polydisc radius can also be reduced at the scalar-budget
level, provided the backend treats $E_R,\nu_J,L_J,M_G$ as fixed shared-domain
constants over the radius family being compared. This is not a directed-rounded
certificate by itself, because a real enclosure may make $M_G$, $E_R$, or
$L_J$ worsen as $\rho_X$ grows.

For $M_G>0$ and $C_D>0$, the $r_X$-optimized ceiling is

$$
M_R
<
C_D(\nu_J-L_J\rho_X)(\rho_X-r_{\mathrm{low}}).
$$

If $L_J>0$, set

$$
\Delta_R=\nu_J^2-2L_JE_R,
\qquad
r_{\mathrm{low}}=r_R^-=
\frac{2E_R}{\nu_J+\sqrt{\Delta_R}}.
$$

The admissible window requires $\Delta_R>0$ and
$r_{\mathrm{low}}<\rho_X<\nu_J/L_J$. The remaining factor

$$
(\nu_J-L_J\rho_X)(\rho_X-r_{\mathrm{low}})
$$

is a concave quadratic in $\rho_X$, with unconstrained maximizer

$$
\rho_X^\ast
=
\frac{\nu_J/L_J+r_{\mathrm{low}}}{2}
=
\frac{2\nu_J-\sqrt{\Delta_R}}{2L_J}.
$$

Therefore, without a smaller shared-domain cap, the supremal ceiling is

$$
M_{R,\sup}^{\rho_X,L_J>0}
=
C_D\frac{\Delta_R}{4L_J}.
$$

If the backend has only a certified family up to
$\rho_X\le\bar\rho_X$ and
$r_{\mathrm{low}}<\bar\rho_X<\rho_X^\ast$, the capped ceiling is

$$
M_{R,\sup}^{\rho_X,L_J>0}
=
C_D(\nu_J-L_J\bar\rho_X)(\bar\rho_X-r_{\mathrm{low}}).
$$

If $\bar\rho_X\ge\rho_X^\ast$, the interior value above is still the best
scalar ceiling; if $\bar\rho_X\le r_{\mathrm{low}}$, the strict Rouché window
is empty.

If $L_J=0$, the lower boundary is $r_{\mathrm{low}}=E_R/\nu_J$ and the
optimized fixed-cap ceiling is

$$
M_{R,\sup}^{\rho_X,L_J=0}
=
C_D(\nu_J\bar\rho_X-E_R).
$$

With no finite $\bar\rho_X$, this scalar sufficient budget is unbounded when
$C_D>0$. In all cases the ceiling remains a supremum rather than an attained
maximum, because $r_X=r_{\mathrm{low}}$ is outside the strict Rouché window.

## Rouché $y$-Radius Optimum Corollary

The $y$-radius side has an even simpler scalar structure. Hold the
shared-domain constants $E_R,\nu_J,L_J,M_G$ fixed over the compared radius
family, and write

$$
s=\frac{\rho}{Y}>1.
$$

For $M_G>0$, the active h39 slope budget is

$$
C_D(s)
=
\frac{B_{D,39}Y^{41}}{M_G}s^{40}(s-1)
-40-\frac{1}{s-1}.
$$

It has derivative

$$
C_D'(s)
=
\frac{B_{D,39}Y^{41}}{M_G}s^{39}(41s-40)
+\frac{1}{(s-1)^2}.
$$

Every term is positive for $s>1$, so $C_D(s)$ is strictly increasing on the
whole admissible radius range. Consequently there is no interior $y$-radius
optimum in the scalar h39 budget. If a backend certifies one fixed-constant
family with

$$
1<s\le s_{\max},
$$

the best scalar ceiling uses $s=s_{\max}$, with the same $X$ factor supplied by
the $r_X$ and $\rho_X$ reductions above. For example, after the $\rho_X$
optimization at $L_J>0$ without a smaller $\rho_X$ cap,

$$
M_{R,\sup}^{y,L_J>0}
=
C_D(s_{\max})\frac{\nu_J^2-2L_JE_R}{4L_J}.
$$

With a finite $\rho_X$ cap, replace the last factor by
$(\nu_J-L_J\rho_X^\sharp)(\rho_X^\sharp-r_{\mathrm{low}})$ where
$\rho_X^\sharp=\min(\bar\rho_X,\rho_X^\ast)$, subject to
$\bar\rho_X>r_{\mathrm{low}}$. For $L_J=0$, a finite scalar ceiling still
requires a finite $\rho_X$ cap and becomes

$$
M_{R,\sup}^{y,L_J=0}
=
C_D(s_{\max})(\nu_J\bar\rho_X-E_R).
$$

If no finite $s_{\max}$ is certified, the scalar expression is unbounded under
the fixed-$M_G$ hypothesis. This is not a certificate-level closure claim: in
the actual interval backend, increasing the $y$ radius may worsen $M_G$,
$E_R$, $\nu_J$, or $L_J$, or may leave the analytic domain. The safe
certificate statement is only that, under fixed shared-domain constants and a
finite certified $y$-radius cap, the largest certified cap is optimal for this
scalar h39 budget.

## Executable Budget Artifact

The executable budget reducer is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs).
Its test is
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.test.js).
The artifact certifies only the analytic budget formula, the Rouché-primitive
closure ratio $\Lambda_{39}^{\mathrm R}$, and the concrete $\rho=4Y$ decision
target, and records the radius-monotone $D$-bottleneck corollary. It also
accepts a candidate directed-rounded $M_G$ bound, computes the maximum
admissible $\Xi_*/\sigma_X$ slope ratio, emits the scalar left/right margin for
$M_G(40+\Xi_*/\sigma_X+1/(s-1))<B_{D,39}Y^{41}s^{40}(s-1)$, and decides the
single active $D$-threshold inequality for that bound. It can also derive
$\Xi_*/\sigma_X$ from $M_R$, $J_{\min}$, and $\sigma_X$ before applying the same
scalar test, and with $M_G$, $J_{\min}$, and $\sigma_X$ supplied it computes
the maximum admissible primitive numerator $M_R$. With the Rouché inputs
$E_R$, $\nu_J$, $L_J$, $r_X$, and $\rho_X$ supplied, it emits the fully expanded
seven-input ratio $\Lambda_{39}^{\mathrm R}$ and the matching Rouché-form
$M_R$ ceiling. It now also emits candidate primitive slack tolerances: the
current $J_R\sigma_R$ product, the required product floor, and strict
one-at-a-time admissible boundaries for $E_R$, $\nu_J$, $L_J$, $\rho_X$,
$r_X$, $M_G$, and $M_R$. It also emits a primitive remainder-budget candidate:
given nonnegative allowances in the pessimistic directions for the seven
primitive values, it forms the robust $\rho_X,r_X$ rectangle, checks endpoint
Rouché margins, computes the endpoint lower bound for $J_R\sigma_R$, and
replays the h39 scalar inequality against $M_G^+$ and $M_R^+$. It also inverts
a nonnegative analytic-remainder profile into the largest candidate
$\lambda$ scale that preserves the monotone safe-product floor
$J_{\mathrm{rob}}\sigma_{\mathrm{rob}}$, so the backend can turn a vector of
continuous-tail pressures into one strict scalar margin. It also reports the
unattained Rouché-window supremal $M_R$ ceiling over admissible $r_X$, so the
backend can decide whether a strict radius slack exists before selecting a
concrete $r_X$. With fixed
$E_R,\nu_J,L_J,M_G$ and an optional shared-domain $\rho_X$ upper bound, it also
reports the scalar $\rho_X$ optimum: a concave quadratic optimum for $L_J>0$
and a capped linear optimum, or unbounded status, for $L_J=0$. With a finite
certified $y$-radius cap it also reports the scalar $s=\rho/Y$ optimum at the
largest cap, and without that cap reports the fixed-constant scalar family as
unbounded rather than claiming an interior optimum. It leaves the
directed-rounded $M_G$,
$y\partial_yR_{\varepsilon,43}$, $J_\varepsilon$, and
$\Xi_\varepsilon$ polydisc enclosures open until a separate graph-centered
certificate supplies those inputs. It also accepts the Rouché graph-lift
inputs $E_R$, $\nu_J$, $L_J$, $r_X$, and $\rho_X$ and derives
$J_{\min}=\nu_J-L_J\rho_X$ plus $\sigma_X=\rho_X-r_X$ before applying the
primitive h39 scalar test. It emits the admissible Rouché radius window and
the supremal Cauchy-margin target, so a backend can choose $r_X$ with explicit
positive slack above the lower strict boundary.

## Executable Shared-Domain Diagnostic

The coefficient-series helper
[theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs](../../../../scripts/neutral-braid/theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs)
now constructs the common h39 coefficient provenance that the future
continuous backend must use. It inserts the successor variable $X$ as the
$h_{39,\varepsilon}$ row, emits shifted $R_{\varepsilon,43}$,
$\partial_XR_{\varepsilon,43}$, and
$y\,\partial_yR_{\varepsilon,43}$ coefficient rows, and emits shifted $N_G$
and $D$-identity coefficient rows from the same declared branch, speed cell,
and expansion variables. At the leading shifted source coefficient, it proves
the affine-in-$X$ identity

$$
[y^{43}]F_\varepsilon(X)
=
[y^{43}]F_\varepsilon(0)
+X\left([y^{43}]F_\varepsilon(1)-[y^{43}]F_\varepsilon(0)\right),
$$

so the coefficient-level $\partial_XR_{\varepsilon,43}$ row is explicit while
the leading second-$X$ coefficient is zero. It also solves the h39 center
coefficient

$$
h_{39,\varepsilon}
=
-\frac{[y^{43}]F_\varepsilon(X=0)}
[y^{43}]F_\varepsilon(X=1)-[y^{43}]F_\varepsilon(X=0)}
$$

and emits finite-prefix coefficient seminorms as candidate guides. This is
still coefficient-only: continuous $E_R$, $\nu_J$, $L_J$, $M_G$, and $M_R$
bounds require analytic remainders on one graph-centered polydisc. The
helper also now defines the shared $y,X$ coefficient-prefix functionals that
the continuous backend must satisfy:

$$
\mathcal M_{\rho,\rho_X}(A)
=
\sum_{p,q}\max(|a_{pq}^-|,|a_{pq}^+|)\rho^p\rho_X^q+T_A,
\qquad
\mathcal F_{\rho,\rho_X}(J)
=
\operatorname{dist}(j_{00},0)
-
\sum_{(p,q)\ne(0,0)}
\max(|j_{pq}^-|,|j_{pq}^+|)\rho^p\rho_X^q
-T_J.
$$

Thus a future directed-rounded shared-domain certificate can feed the
existing reducer by proving
$E_R\ge\max_\varepsilon\mathcal M(R_{\varepsilon,43})$,
$\nu_J\le\min_\varepsilon\mathcal F(\partial_XR_{\varepsilon,43})$,
$L_J\ge\max_\varepsilon\mathcal M(\partial_X^2R_{\varepsilon,43})$,
$M_R\ge\max_\varepsilon\mathcal M(y\,\partial_yR_{\varepsilon,43})$, and
$M_G\ge\mathcal M(N_G)$ on one common polydisc. Running the coefficient
artifact over the full 128-row h38 certificate validates coefficient
provenance and the shifted $D$ identity. The artifact imports the inherited
formal recurrence slope as the leading $\partial_XR_{\varepsilon,43}$
coefficient and reports
\texttt{min\_h39\_jacobian\_coefficient\_clearance=0.792719244976}. The h38
recurrence row therefore supplies the coefficient-level $\nu_J$ floor
candidate. The same coefficient-only pass verifies the structural identities

$$
\partial_XR_{\varepsilon,43}
=
\frac{
2\delta_\varepsilon/\nu^2+\cos\delta_\varepsilon-\cos\phi_\varepsilon
}{y},
\qquad
\partial_X^2R_{\varepsilon,43}
=
y^{41}
\left(
\frac{2}{\nu^2}
-\sin\delta_\varepsilon
-\sin\phi_\varepsilon
\right),
$$

with the first quotient read as removable at $y=0$. At $\rho=0.001$, it reports
\texttt{min\_candidate\_nu\_J\_finite\_prefix=0.7922834330724204},
\texttt{max\_candidate\_M\_K\_finite\_prefix=0.5917788690239781},
\texttt{max\_candidate\_L\_J\_finite\_prefix=5.917788690239787e-124}, and
\texttt{max\_candidate\_L\_J\_factored\_finite\_prefix=5.917788690239787e-124},
with \texttt{all\_candidate\_L\_J\_factor\_identities\_hold=true}. The same
run reports the coordinate-seminorm continuous kernel bounds
\texttt{max\_candidate\_M\_K\_continuous\_majorant=16.799203536978943} and
\texttt{max\_candidate\_L\_J\_reduced\_continuous\_majorant=1.679920353697896e-122}.
These are structural coefficient-only candidates plus one conservative
continuous $X$-curvature input, not directed-rounded $E_R$, $\nu_J$, $M_G$, or
$M_R$ values and not a retained h39 primitive certificate. The remaining
backend target is the analytic remainder that turns the other primitive
candidates into continuous shared-domain enclosures.

The
companion packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-coefficient-series-engine](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-coefficient-series-engine.md).

The replay diagnostic
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs)
wraps the h39 reducer without certifying any new interval bound. It consumes
externally supplied values

$$
E_R,\quad \nu_J,\quad L_J,\quad \rho_X,\quad r_X,\quad M_G,\quad M_R,
$$

replays the Rouché graph-lift and $\Lambda_{39}^{\mathrm R}$ scalar check, and
labels the result as one of:

| Decision | Meaning |
| --- | --- |
| `open-missing-primitive-bounds` | The seven explicit primitive inputs are not all present. |
| `open-shared-domain-not-certified` | The numbers pass the h39 reducer, but their shared-domain provenance is only `provided-unverified`. |
| `passes-provided-primitive-bounds` | The numbers pass the h39 reducer and are labelled `directed-rounded-external-unverified-by-this-artifact`. |
| `fails-provided-primitive-bounds` | The numbers fail the Rouché graph lift or h39 scalar reducer. |

This diagnostic is a theorem-boundary artifact, not a new gate. It makes the
current h39 closure rule executable and prevents the reducer from being used
with primitive bounds copied from different domains. The companion priority
packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.md),
and the companion test is
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js).

## Proof

Write

$$
N_G(y,X,\nu)=\sum_{m\ge41}n_m(X,\nu)y^m.
$$

Cauchy's estimate on the $y$ disc gives

$$
|n_m(X,\nu)|\le M_G\rho^{-m}.
$$

Therefore

$$
|T_G^{(39)}|
\le
\sum_{r\ge0}M_G\rho^{-(r+41)}Y^r
=
\frac{M_G}{\rho^{41}(1-q)}.
$$

For the first part of the root-tangent derivative,

$$
|y\partial_yT_G^{(39)}|
\le
\sum_{r\ge0}rM_G\rho^{-(r+41)}Y^r
=
\frac{M_G}{\rho^{41}}\frac{q}{(1-q)^2}.
$$

Cauchy's estimate in the $X$ coordinate gives, at every evaluated graph point
with distance at most $r_X$ from the polydisc center,

$$
|\partial_{X_{39}}n_m|
\le
\frac{M_G}{\sigma_X\rho^m},
$$

so

$$
|\partial_{X_{39}}T_G^{(39)}|
\le
\frac{M_G}{\sigma_X\rho^{41}(1-q)}.
$$

Combining the two derivative estimates and multiplying by the certified
$\Xi_*$ bound proves the root-tangent inequality. The $D$ inequality follows
from

$$
T_D^{(39)}
=
-40T_G^{(39)}
-\mathcal D_y^{(X_{39})}T_G^{(39)}.
$$

## Claim Boundary

This packet may claim:

$$
\texttt{reduces\_h39\_continuous\_tail\_closure\_to\_cauchy\_majorant=true}.
$$

It may also claim that the h39 $D$ tail does not need a separate raw
$F_\delta$ inverse if the root-tangent $G$ majorant closes the displayed
inequalities.

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
\qquad
\texttt{retained\_branch=false}.
$$

The missing numerical artifact is a directed-rounded polydisc certificate for
$E_R$, $\nu_J$, $L_J$, the selected or capped $\rho_X$ domain, $M_G$, and
$M_R$ satisfying the strict graph-lift and h39 scalar budget inequalities on
one shared graph-centered polydisc. The first concrete missing evaluator is a
shared-domain h39 primitive evaluator that returns $E_R$, $\nu_J$, $L_J$,
$M_G$, and $M_R$ on the same graph-centered domain, with the same speed cell,
$y$ disc, branch, $\rho_X$, and center graph data.
