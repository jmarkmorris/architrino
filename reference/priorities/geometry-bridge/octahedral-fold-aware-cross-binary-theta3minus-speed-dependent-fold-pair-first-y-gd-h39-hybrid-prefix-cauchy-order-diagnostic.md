# H39 Hybrid Prefix-Cauchy Order Diagnostic

This packet is priority-only. It sharpens the h39 shared-domain primitive
backend target by turning the raw Cauchy shifted-tail obstruction into a
hybrid retained-prefix order diagnostic.

The diagnostic is not a retained branch certificate, not a directed-rounded
shared-domain primitive certificate, and not h39 continuous successor-tail
closure. Its role is to identify how much shifted coefficient prefix must be
retained before the remaining analytic Cauchy tail is small enough to be a
plausible input to the existing Rouché-primitive replay.

## Hybrid Tail Formula

Let $F$ be analytic on the outer first-y disc $|y|\le R_y$, with
$|F|\le B_F$, and suppose exact lower-coefficient cancellation gives

$$
F(y)=y^N A(y),
\qquad
A(y)=\operatorname{Shift}_N F(y)=\sum_{m\ge0}a_my^m.
$$

For a target first-y radius $0\le\rho<R_y$, set $q=\rho/R_y$. If the retained
shifted prefix is $a_0,\ldots,a_K$, then the hybrid majorant is

$$
\sup_{|y|\le\rho}|A(y)|
\le
\sum_{m=0}^{K}\max(|a_m^-|,|a_m^+|)\rho^m
+
\frac{B_F}{R_y^N}\frac{q^{K+1}}{1-q}.
$$

The corresponding $y$-derivative tail is

$$
\sup_{|y|\le\rho}
\left|
y\partial_y
\left(
\sum_{m\ge K+1}a_my^m
\right)
\right|
\le
\frac{B_F}{R_y^N}
\frac{q^{K+1}\big((K+1)-Kq\big)}{(1-q)^2}.
$$

Therefore

$$
\sup_{|y|\le\rho}|y\partial_yA(y)|
\le
\sum_{m=1}^{K}m\max(|a_m^-|,|a_m^+|)\rho^m
+
\frac{B_F}{R_y^N}
\frac{q^{K+1}\big((K+1)-Kq\big)}{(1-q)^2}.
$$

For a removable quotient $J=H/y$ with $H(0)=0$,

$$
J(y)=j_0+\sum_{m\ge1}j_my^m,
$$

and $|H|\le B_H$ on the same outer disc, the hybrid floor through $K$ is

$$
\operatorname{floor}_{\rho,K}(J)
=
\operatorname{dist}(j_0,0)
-
\sum_{m=1}^{K}\max(|j_m^-|,|j_m^+|)\rho^m
-
\frac{B_H}{R_y}\frac{q^{K+1}}{1-q}.
$$

These formulas are sufficient estimates. They become primitive certificate
inputs only when the retained prefix, Cauchy tail, speed enclosure, $X$ radius,
center graph, and outward rounding all come from one shared graph-centered
domain.

## Unshifted $N_G/M_G$ Scaling

For the h39 $G$ numerator, the shifted coefficient row is not itself the
primitive reducer input. The h39 reducer consumes an unshifted numerator
majorant

$$
M_G\ge\sup |N_G|,
\qquad
N_G=y^{41}T_G^{(39)}.
$$

Thus a retained shifted prefix for

$$
T_G^{(39)}(y)=\sum_{m\ge0}g_my^m
$$

becomes a candidate $M_G$ input only after the $y^{41}$ scale is restored. If
$|N_G|\le B_{N_G}^{\mathrm{out}}$ on an outer first-y disc $|y|\le R_y$ and
$q=\rho/R_y$, the matching hybrid numerator majorant on $|y|\le\rho$ is

$$
M_G^{\mathrm{hyb}}(\rho,K)
=
\sum_{m=0}^{K}\max(|g_m^-|,|g_m^+|)\rho^{41+m}
+
B_{N_G}^{\mathrm{out}}\frac{q^{41+K+1}}{1-q}.
$$

Equivalently,

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

This corrected scaling is the practical route for the $N_G/M_G$ input. A
large shifted $T_G^{(39)}$ Cauchy tail may still correspond to a tiny
unshifted $N_G$ tail after multiplication by $\rho^{41}$; conversely, it is
not valid to feed a shifted-tail bound directly as $M_G$.

## Denominator-Clearance $B_{N_G}^{\mathrm{out}}$ Route

The outer source bound needed above is now a concrete denominator-clearance
problem. On a shared outer domain
$\mathcal P^{\mathrm{out}}_{R_y,\rho_X}$, each branch contribution has the
form used by the coefficient engine:

$$
G_\varepsilon
=
\frac{4cB_\varepsilon}
{\nu\delta_\varepsilon^2J_\varepsilon^{\mathrm{abs}}},
\qquad
B_\varepsilon
=
-\frac12(\cos\phi_\varepsilon+\cos\delta_\varepsilon),
\qquad
J_\varepsilon^{\mathrm{abs}}=-\varepsilon J_\varepsilon.
$$

If the same domain supplies

$$
|B_\varepsilon|\le K_\varepsilon,\qquad
\nu\ge\nu_-,\qquad
|\delta_\varepsilon|\ge d_\varepsilon>0,\qquad
|J_\varepsilon^{\mathrm{abs}}|\ge j_\varepsilon>0,
$$

then

$$
|G_\varepsilon|
\le
\frac{4|c|K_\varepsilon}{\nu_-d_\varepsilon^2j_\varepsilon}.
$$

For

$$
N_G=P-L-y^2A_{G,38},
\qquad
P=G_-+G_+,
$$

a sufficient outer bound is

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

where $L_*\ge\sup|L|$ and

$$
A_*
\ge
\sup_{|y|\le R_y}|A_{G,38}(y,\nu)|.
$$

A coefficient-safe lower-polynomial choice is

$$
A_*=
\sum_{k=0}^{38}
\max(|Q_{G,k}^-|,|Q_{G,k}^+|)R_y^k.
$$

Thus $B_{N_G}^{\mathrm{out}}$ is no longer an undefined analytic input. It
reduces to branch kernel majorants $K_\varepsilon$, coordinate floors
$d_\varepsilon$, denominator floors $j_\varepsilon$, a speed floor, and the
already-certified lower $G$ polynomial. This still becomes a certificate only
when all of those quantities are directed-rounded on the same
graph-centered complex domain.

The branch ingredients themselves have a coefficient-seminorm candidate form.
Write

$$
\delta_\varepsilon(y)=\sum_{n\ge0}\delta_{\varepsilon,n}y^n,
\qquad
\phi_\varepsilon(y)=\sum_{n\ge0}\phi_{\varepsilon,n}y^n.
$$

On $|y|\le\rho$, set

$$
D_\varepsilon(\rho)=
\sum_{n\ge0}|\delta_{\varepsilon,n}|\rho^n,
\qquad
\Phi_\varepsilon(\rho)=
\sum_{n\ge0}|\phi_{\varepsilon,n}|\rho^n.
$$

Then $|B_\varepsilon|\le K_\varepsilon(\rho)$ with

$$
K_\varepsilon(\rho)
=
\frac12
\left(
\cosh D_\varepsilon(\rho)
+
\cosh \Phi_\varepsilon(\rho)
\right),
$$

using $|\cos z|\le\cosh|z|$. The coordinate and denominator floors are

$$
d_\varepsilon(\rho)
=
\operatorname{dist}(0,\delta_{\varepsilon,0})
-
\sum_{n\ge1}|\delta_{\varepsilon,n}|\rho^n,
$$

and, with

$$
J_\varepsilon^{\mathrm{abs}}(y)
=
-\varepsilon\operatorname{Shift}_1
\left(
\frac{2\delta_\varepsilon}{\nu^2}
-\cos\phi_\varepsilon
+\cos\delta_\varepsilon
\right)
=
\sum_{n\ge0}J_{\varepsilon,n}^{\mathrm{abs}}y^n,
$$

the Jacobian floor is

$$
j_\varepsilon(\rho)
=
\operatorname{dist}(0,J_{\varepsilon,0}^{\mathrm{abs}})
-
\sum_{n\ge1}|J_{\varepsilon,n}^{\mathrm{abs}}|\rho^n.
$$

If $d_\varepsilon(\rho)>0$ and $j_\varepsilon(\rho)>0$, these candidate
floors feed the denominator-clearance branch bound above. The proof ingredients
are elementary, but the h39 closure status is unchanged until the represented
series and tails are outward-rounded on the same shared complex domain.

The infinite coefficient seminorms can be reduced further by the same hybrid
prefix-plus-Cauchy tail used for the $N_G$ input. For a represented branch
series $a(y)=\sum_{n\ge0}a_ny^n$, retained through order $K$ with
$B_a^{\mathrm{out}}\ge\sup_{|y|\le R_y}|a(y)|$ and $q=\rho/R_y<1$, define

$$
\mathcal M_{\rho,K}^{\mathrm C}(a)
=
\sum_{n=0}^{K}|a_n|\rho^n
+
B_a^{\mathrm{out}}\frac{q^{K+1}}{1-q},
$$

and

$$
\mathcal F_{\rho,K}^{\mathrm C}(a)
=
\operatorname{dist}(0,a_0)
-
\sum_{n=1}^{K}|a_n|\rho^n
-
B_a^{\mathrm{out}}\frac{q^{K+1}}{1-q}.
$$

Then $D_\varepsilon(\rho)$ and $\Phi_\varepsilon(\rho)$ may be replaced by
$\mathcal M_{\rho,K}^{\mathrm C}(\delta_\varepsilon)$ and
$\mathcal M_{\rho,K}^{\mathrm C}(\phi_\varepsilon)$, while the branch floors
may be replaced by
$\mathcal F_{\rho,K}^{\mathrm C}(\delta_\varepsilon)$ and
$\mathcal F_{\rho,K}^{\mathrm C}(J_\varepsilon^{\mathrm{abs}})$. If the
backend instead certifies $H_\varepsilon=yJ_\varepsilon^{\mathrm{abs}}$ on the
outer radius, the same formula applies to $J_\varepsilon^{\mathrm{abs}}$ with
tail budget $B_H^{\mathrm{out}}/R_y$. Thus the denominator-clearance task now
has a finite-prefix target plus three branch outer bounds:
$B_\delta^{\mathrm{out}}$, $B_\phi^{\mathrm{out}}$, and
$B_J^{\mathrm{out}}$.

This gives a single denominator-Cauchy primitive closure criterion. Define

$$
K_{\varepsilon,K}^{\mathrm C}
=
\frac12
\left(
\cosh\mathcal M_{\rho,K}^{\mathrm C}(\delta_\varepsilon)
+
\cosh\mathcal M_{\rho,K}^{\mathrm C}(\phi_\varepsilon)
\right),
$$

$$
d_{\varepsilon,K}^{\mathrm C}
=
\mathcal F_{\rho,K}^{\mathrm C}(\delta_\varepsilon),
\qquad
j_{\varepsilon,K}^{\mathrm C}
=
\mathcal F_{\rho,K}^{\mathrm C}(J_\varepsilon^{\mathrm{abs}}).
$$

When $d_{\varepsilon,K}^{\mathrm C}>0$ and
$j_{\varepsilon,K}^{\mathrm C}>0$ for both branches, set

$$
B_{N_G,K}^{\mathrm{denC}}
=
\sum_{\varepsilon\in\{-,+\}}
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-\left(d_{\varepsilon,K}^{\mathrm C}\right)^2j_{\varepsilon,K}^{\mathrm C}}
+
L_*
+
R_y^2A_*.
$$

For $N_G=y^{41}T_G^{(39)}$ and
$T_G^{(39)}=\sum_{m\ge0}g_my^m$, the unshifted numerator input becomes

$$
M_{G,K}^{\mathrm{denC}}
=
\sum_{m=0}^{K}|g_m|\rho^{41+m}
+
B_{N_G,K}^{\mathrm{denC}}\frac{q^{41+K+1}}{1-q}.
$$

Let $s=\rho/Y$, $J_{\min}=\nu_J-L_J\rho_X$, and
$\sigma_X=\rho_X-r_X$. The Rouché graph lift must also have

$$
0<r_X<\rho_X,
\qquad
\Gamma_R
=
\nu_Jr_X-E_R-\frac12L_Jr_X^2
>0.
$$

The full h39 candidate closure ratio for this route is

$$
\Lambda_{39}^{\mathrm{denC}}
=
\frac{
M_{G,K}^{\mathrm{denC}}
\left(
40+\frac{M_R}{J_{\min}\sigma_X}+\frac{1}{s-1}
\right)
}
{B_{D,39}Y^{41}s^{40}(s-1)}.
$$

The denominator-Cauchy route condition is the strict inequality
$\Lambda_{39}^{\mathrm{denC}}<1$, together with the positivity of the branch
floors, $J_{\min}$, and $\Gamma_R$. This is now one executable conditional
theorem. It is not a retained branch certificate until every ingredient above
is supplied by the same directed-rounded graph-centered complex-domain backend.

The same inequality can be inverted into the exact outer-bound ceiling that
the branch denominator certificate must satisfy. Define the primitive
allowable numerator size

$$
C_M
=
\frac{
B_{D,39}Y^{41}s^{40}(s-1)
}
{
40+\frac{M_R}{J_{\min}\sigma_X}+\frac{1}{s-1}
},
$$

the retained unshifted prefix

$$
P_{G,K}
=
\sum_{m=0}^{K}|g_m|\rho^{41+m},
$$

and the unshifted Cauchy tail coefficient

$$
\alpha_K
=
\frac{q^{41+K+1}}{1-q}.
$$

If $C_M>P_{G,K}$, then the outer numerator budget is

$$
B_{N_G}^{\mathrm{out}}
<
\frac{C_M-P_{G,K}}{\alpha_K}.
$$

Consequently the sum of the two branch $G$ denominator-clearance majorants
must satisfy

$$
\sum_{\varepsilon\in\{-,+\}}G_{\varepsilon,*}
<
\frac{C_M-P_{G,K}}{\alpha_K}
-
L_*
-
R_y^2A_*.
$$

This is the practical branch-budget target for the shared-domain backend. If
the right side is nonpositive, no amount of branch denominator tightening at
that retained order and radius can close the h39 route without changing the
prefix order, radius, primitive bounds, or fixed lower-polynomial/L terms. It
is a sum budget for the two branch $G$ majorants; a per-branch allocation would
be an additional choice, not part of the theorem.

The sum ceiling can nevertheless be inverted into branch-local diagnostic
targets once a backend chooses positive allocation weights. Let

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

and set

$$
W_\varepsilon=W_G\frac{a_\varepsilon}{A}.
$$

For the branch majorant

$$
G_{\varepsilon,*}
=
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-\left(d_{\varepsilon,K}^{\mathrm C}\right)^2
j_{\varepsilon,K}^{\mathrm C}},
$$

the sufficient strict product target is

$$
\left(d_{\varepsilon,K}^{\mathrm C}\right)^2
j_{\varepsilon,K}^{\mathrm C}
>
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-W_\varepsilon}.
$$

Equivalently, if one denominator floor has already been certified, the other
must satisfy

$$
j_{\varepsilon,K}^{\mathrm C}
>
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-W_\varepsilon\left(d_{\varepsilon,K}^{\mathrm C}\right)^2},
\qquad
d_{\varepsilon,K}^{\mathrm C}
>
\sqrt{
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}
{\nu_-W_\varepsilon j_{\varepsilon,K}^{\mathrm C}}
}.
$$

These targets imply $G_{\varepsilon,*}<W_\varepsilon$ branch by branch, and
$\sum_\varepsilon W_\varepsilon=W_G$ recovers the theorem-level sum ceiling.
The weights are a candidate allocation policy only; the theorem still requires
one directed-rounded shared-domain proof of the underlying branch floors.

There is one canonical minimax allocation if the backend has no other
branch-specific preference. Put

$$
C_\varepsilon=
\frac{4|c|K_{\varepsilon,K}^{\mathrm C}}{\nu_-}.
$$

For positive $C_\varepsilon$, the allocation

$$
W_\varepsilon
=
W_G\frac{C_\varepsilon}{\sum_\eta C_\eta}
$$

equalizes the required product targets and minimizes
$\max_\varepsilon C_\varepsilon/W_\varepsilon$. The common target is

$$
\left(d_{\varepsilon,K}^{\mathrm C}\right)^2
j_{\varepsilon,K}^{\mathrm C}
>
\frac{\sum_\eta C_\eta}{W_G}.
$$

The proof is only the budget inequality:
if $t\ge C_\varepsilon/W_\varepsilon$ for every branch, then
$W_G=\sum_\varepsilon W_\varepsilon\ge\sum_\varepsilon C_\varepsilon/t$, so
$t\ge(\sum_\varepsilon C_\varepsilon)/W_G$, with equality approached by the
pressure-balanced allocation above.

## Current Collar Order Estimate

On the current h39 collar, the raw outer-disc obstruction used

$$
\rho=0.001,\qquad
R_y=0.001796875,\qquad
q\approx0.5565217391304348,
$$

with raw outer source majorant $B_F\approx3.2874123140772826$ for the
$R_{\varepsilon,43}$ source. The no-prefix shifted Cauchy estimate gives
$E_R\approx8.43\times10^{118}$ and
$M_R\approx1.06\times10^{119}$, which is unusably wider than the finite-prefix
candidate scale.

Using the hybrid tail-order helper with the full shifted-order $20$ candidate
scales from the 128-row h38 sweep,

$$
E_R^{\mathrm{fp}}\approx2.8702360237705014\times10^{25},
\qquad
M_R^{\mathrm{fp}}\approx5.261350878794293\times10^{22},
$$

gives:

| Tail target | Required retained prefix order | Tail at required order | Previous tail |
| --- | ---: | ---: | ---: |
| Function tail $\le E_R^{\mathrm{fp}}$ | $K=367$ | $1.8328999691660645\times10^{25}$ | $3.2934921320952724\times10^{25}$ |
| $y\partial_y$ tail $\le M_R^{\mathrm{fp}}$ | $K=388$ | $3.233046396248729\times10^{22}$ | $5.7944941259702705\times10^{22}$ |

At much lower retained orders the raw Cauchy tail remains enormous: with
$K=20$, the function tail is about $3.8092405095376786\times10^{113}$ and the
$y\partial_y$ tail is about $8.477427408480912\times10^{114}$. With $K=40$,
they are still about $3.093720440914861\times10^{108}$ and
$1.3072485392493187\times10^{110}$.

This explains the previous shifted-order $20$ and $40$ diagnostic result. A
deeper finite shifted prefix changes the reported finite-prefix candidate tuple
only mildly, but a raw Cauchy tail attached at those depths is still far too
large to be the primitive backend. The next real backend must either certify a
much sharper analytic tail than the raw source-bound tail, retain a much deeper
prefix, or combine both improvements on one shared graph-centered domain.

The $N_G/M_G$ side has a separate, corrected order diagnostic. Using the same
$\rho=0.001$, $R_y=0.001796875$, and the finite-prefix candidate
$M_G^{\mathrm{fp}}\approx9.468681741438209\times10^{-99}$ as the tail target,
the unshifted numerator tail has this sensitivity to the still-open outer
bound $B_{N_G}^{\mathrm{out}}$:

| $B_{N_G}^{\mathrm{out}}$ | Required retained prefix order | Tail at required order | Previous tail |
| ---: | ---: | ---: | ---: |
| $10^{-20}$ | $K=266$ | $9.154293288193856\times10^{-99}$ | $1.6449120752223334\times10^{-98}$ |
| $1$ | $K=345$ | $7.156709338004543\times10^{-99}$ | $1.2859712091726915\times10^{-98}$ |
| $10^{20}$ | $K=424$ | $5.59502377040258\times10^{-99}$ | $1.0053558337442137\times10^{-98}$ |

This is a real narrowing of the obstruction: the $M_G$ input is not governed
by the shifted $T_G^{(39)}$ scale alone. It is still only a diagnostic because
the actual $B_{N_G}^{\mathrm{out}}$ must be certified on the same
graph-centered complex domain, including the denominator clearance implicit in
the branch $G$ construction.

## Executable Hooks

The helper
[theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs](../../../scripts/neutral-swarm/theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs)
now exports:

- `computeCauchyShiftedPrefixTailMajorant`, which combines a retained shifted
  coefficient prefix with the post-prefix Cauchy tail and its
  $y\partial_y$ tail;
- `computeCauchyRemovableQuotientPrefixFloor`, which combines a retained
  removable quotient prefix with the post-prefix Cauchy floor loss;
- `computeCauchyShiftedTailOrderForTarget`, which scans for the first retained
  prefix order whose function or $y\partial_y$ Cauchy tail is below a declared
  target;
- `computeCauchyShiftedTailOrderSensitivity`, which scans several outer
  bounds against the same target, including the `unshifted-function` mode
  needed for the $N_G/M_G$ scale restoration;
- `computeCauchyCoefficientPrefixMajorant` and
  `computeCauchyCoefficientPrefixFloor`, which apply the same retained-prefix
  plus Cauchy-tail algebra directly to branch coordinate and Jacobian
  denominator series;
- `computeBranchGDenominatorClearanceMajorant` and
  `computeNGOuterBoundFromDenominatorClearance`, which turn branch kernel,
  speed, coordinate, Jacobian, $L$, and lower-polynomial bounds into a
  candidate $B_{N_G}^{\mathrm{out}}$;
- `computeBranchGDenominatorIngredientCandidate`, which emits the
  coefficient-seminorm $K_\varepsilon$, $d_\varepsilon$, and $j_\varepsilon$
  candidates and the branch $G$ denominator-clearance majorant;
- `computeBranchGDenominatorCauchyIngredientCandidate`, which emits the
  finite-prefix plus Cauchy-tail version of those branch ingredients from
  supplied shared-domain outer bounds;
- `computeH39PrimitiveMGClosureCeilingCandidate` and
  `computeH39DenominatorCauchyOuterBoundCeilingCandidate`, which invert the
  primitive replay into an allowable $M_G$ ceiling and then into a
  $B_{N_G}^{\mathrm{out}}$ and branch-sum ceiling;
- `computeBranchGDenominatorAllocationTargetsCandidate`, which takes that
  branch-sum ceiling, positive allocation weights, and branch kernel, speed,
  coordinate, and Jacobian data, then emits the required
  $d_\varepsilon^2j_\varepsilon$ product target plus optional single-floor
  targets without granting certificate status;
- `computeH39DenominatorCauchyPrimitiveClosureCandidate`, which composes
  branch Cauchy denominator candidates into
  $B_{N_G}^{\mathrm{out}}$, restores the unshifted $M_G$ scale, and replays
  the h39 primitive closure ratio;
- `computeH39NGOuterBoundCandidateMG` and
  `computeH39NGOuterBoundPrimitiveReplay`, which turn that outer bound and a
  retained shifted $N_G$ prefix into a candidate $M_G$ and scalar h39 replay
  without granting certificate status.

The companion test
[neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.test.js](../../../tests/neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.test.js)
checks the hybrid function-tail, derivative-tail, quotient-floor,
unshifted-function, coefficient-prefix Cauchy floor, denominator-clearance,
candidate $M_G$, and
order-selection formulas.

## Claim Boundary

This packet may claim:

$$
\texttt{defines\_h39\_hybrid\_prefix\_cauchy\_order\_diagnostic=true}.
$$

It may also claim that the raw source-bound Cauchy tail, if attached after
only $K=20$ or $K=40$, is many orders of magnitude too large to certify the
current h39 primitive candidate scale, and that the raw source-bound tail would
need retained orders near $K=367$ for the function tail and $K=388$ for the
$y\partial_y$ tail to compete with the current finite-prefix candidate values.
For the unshifted $N_G/M_G$ input, it may claim only the corrected scaling and
the displayed sensitivity table; the actual $B_{N_G}^{\mathrm{out}}$ remains
an open shared-domain certificate input.

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_shared\_domain=false},
\qquad
\texttt{certifies\_h39\_continuous\_successor\_tail=false},
\qquad
\texttt{retained\_branch=false}.
$$

Passing this diagnostic in the future would identify a sufficient retained
prefix order and tail-size target for the directed-rounded backend. It would
not by itself prove the Rouché graph lift, h39 continuous tail, full first-y
quotient enclosure, interval quadrature, or retained branch status.
