# Source-Normal Retention Lemma

Status: analysis-only, priority-only. This file changes no canonical law, EOM
solver behavior, evidence status, or shared priority ledger. No run was
performed.

## Verdict

The frozen regularized scalar action selects the first post-P14 law:

$$
\boxed{
W_{\mathrm{acc}}^{(0)}
=
\frac{c_f}{|D_s|}
}
$$

for its inverse-square scale row. It does not select the canonical
$|D_T/D_s|$ weight or complete unit weight. The reason is structural: spatial
variation of P10's frozen kernel produces a source-time causal-surface density
with no receiver-cadence multiplier. Simple-root collapse then supplies
$1/|D_s|$, and static inverse-square normalization supplies the numerator
$c_f$. The receiver normal $D_T$ remains in signed root transport but not in
the scale-row acceleration strength.

The complete action-derived law is not the scale row alone. P10 and P13 give
the recoil-inclusive equation

$$
\boxed{
\mathbf A_i
=
\mathbf A_{\mathrm{scale},i}^{(0)}
+
\mathbf A_{C,i},
}
$$

where $\mathbf A_{C,i}$ is the split-independent recoil row from the same
action. Thus the result selects $c_f/|D_s|$ as the base law for P11's next
expansion; it does not license dropping recoil.

**Claim grade: derived** on P10's endpoint-clear regularized action chart,
P13's split-independent branch neighborhood, the positive-normal simple-root
chart, the quadratic local response scaffold used by P10, and the declared
static inverse-square normalization. The verdict is falsified by a correct
spatial first variation of the same frozen kernel that leaves a multiplicative
$D_T$, or by a pre-collapse factor that is already present in P10's declared
measure but omitted below.

## 1. Frozen Chart and the Question Being Decided

For one retained ordered receiver-source row, let

$$
\mathbf r(T,S)
=
\mathbf X_i(T)-\mathbf X_j(S),
\qquad
r=\|\mathbf r\|,
\qquad
\hat{\mathbf r}=\frac{\mathbf r}{r},
$$

and use P10's time-normalized causal constraint

$$
\widetilde g(T,S)
=
T-S-\frac{r(T,S)}{c_f}.
$$

Define

$$
D_s
=
c_f-\hat{\mathbf r}\cdot\mathbf V_j(S),
\qquad
D_T
=
c_f-\hat{\mathbf r}\cdot\mathbf V_i(T).
$$

The comparison chart is

$$
\widetilde g=0,
\qquad
D_s>0,
\qquad
D_T>0,
\qquad
r>0.
$$

The absolute values are retained in final acceleration weights so the source
collapse statement remains valid on any simple-root chart. Positive normals
are used during the derivation to keep root orientation separate from
acceleration magnitude.

**Claim grade: definition plus declared scope.** Loss of a simple root,
$r>0$, or either positive-normal floor moves the row outside this lemma rather
than falsifying an identity inside it.

The three candidate normalized scale weights correspond to three different
pre-collapse measures:

| Candidate sharp weight | Pre-collapse multiplier relative to uniform source time | Physical declaration it would require |
| --- | ---: | --- |
| $c_f/|D_s|$ | $1$ | Uniform source-time action density, followed by static normalization. |
| $|D_T/D_s|$ | $|D_T|/c_f$ | Receiver-crossing or reception-cadence flux is acceleration strength. |
| $1$ | $|D_s|/c_f$ | A source-normal-compensated emission or action density. |

**Claim grade: derived measure classification.** It is falsified by applying
the simple-root delta identity to any table row and obtaining a different
sharp factor. The last two declarations are not contained in the frozen
$K_0$ measure and therefore cannot be inserted as algebraic conveniences.

## 2. Spatial Variation of the Frozen Action

P10's reduced regularized kernel is

$$
K_0^{(\eta)}(r,g)
=
\frac{\delta_\eta(g)}{r}.
$$

With

$$
D
=
\partial_r-\frac{1}{c_f}\partial_g,
$$

P10's exact characteristic split gives

$$
K_0^{(\eta)}
=
K_{\mathrm{scale}}^{(\eta)}
+
K_C^{(\eta)},
$$

$$
\boxed{
D K_{\mathrm{scale}}^{(\eta)}
=
-\frac{\delta_\eta(g)}{r^2},
}
\qquad
\boxed{
D K_C^{(\eta)}
=
-\frac{\delta_\eta'(g)}{c_fr}.
}
$$

The first box is the inverse-square scale coefficient. It contains neither
source nor receiver velocity before collapse. The second box is the distinct
constraint-derivative recoil coefficient. P13 proves that changing the
endpoint-clear characteristic split adds only a homogeneous term $H(u)$ with
$D H=0$; it cannot move a $D_T$ factor into the scale row or remove the recoil
row.

**Claim grade: derived in P10 and P13 and applied here.** The application is
falsified if two admissible characteristic endpoints give different local
spatial Euler coefficients. P13's identity $D H=0$ excludes that mechanism on
the certified neighborhood.

At fixed reception time,

$$
\partial_S\widetilde g
=
-1+\frac{\hat{\mathbf r}\cdot\mathbf V_j(S)}{c_f}
=
-\frac{D_s}{c_f}.
$$

Therefore the scale part of the receiver Euler coefficient collapses as

$$
\begin{aligned}
\int dS\,
\frac{\delta_\eta(\widetilde g)}{r^2}
\hat{\mathbf r}
&\longrightarrow
\sum_\ell
\frac{c_f}{|D_{s,\ell}|}
\frac{\hat{\mathbf r}_\ell}{r_\ell^2}.
\end{aligned}
$$

The universal action/response conversion and the overall coupling are fixed
by requiring a static source, for which $D_s=c_f$, to reproduce the declared
inverse-square normalization. They cannot change the displayed velocity
ratio. Hence

$$
\boxed{
\mathbf A_{i\leftarrow j,\mathrm{scale}}^{(0)}
=
\kappa Q_{ij}
\frac{1}{r^2}
\frac{c_f}{|D_s|}
\hat{\mathbf r}.
}
$$

**Claim grade: derived.** The denominator is the source-time delta Jacobian;
the numerator is the static normalization. A simple-root collapse returning
another denominator or a static specialization different from one falsifies
the boxed prefactor.

## 3. Why Root Transport Does Not Supply an Acceleration Numerator

At fixed emission time,

$$
\partial_T\widetilde g
=
1-\frac{\hat{\mathbf r}\cdot\mathbf V_i(T)}{c_f}
=
\frac{D_T}{c_f}.
$$

Implicit differentiation of
$\widetilde g(T,S_\ell(T))=0$ gives

$$
\boxed{
\frac{dS_\ell}{dT}
=
\frac{D_T}{D_s}.
}
$$

This is signed transport of the selected source event as reception time
changes. Spatial variation at one fixed reception time instead integrates
over $dS$ and uses $|\partial_S\widetilde g|^{-1}$. These are different
operations. Multiplying the scale acceleration by $|D_T|/c_f$ would therefore
be a new reception-flux declaration, not a consequence of the frozen action.

**Claim grade: derived operation-level distinction.** It is falsified by a
derivation in which the fixed-$T$ spatial Euler coefficient necessarily
contains $\partial_T\widetilde g$ without changing the action measure or the
variation being taken.

Complete unit weight is also not obtained. It would require the pre-collapse
scale measure

$$
dS\,
\frac{|D_s|}{c_f}
\delta_\eta(\widetilde g),
$$

so that the inserted factor cancels the simple-root Jacobian. This is a
source-velocity-dependent action or emission measure and is absent from
$K_0^{(\eta)}=\delta_\eta(g)/r$.

**Claim grade: derived exclusion for the frozen measure.** A declared
$|D_s|/c_f$ factor in the original action would falsify the exclusion and
would define a different action to analyze.

## 4. Coincident Endpoint Under the Dual-Mollified Route

The sharp selected law is singular when $D_s\to0$. The finite-width route
must therefore be taken before root collapse. Use P12's same-source local
variables

$$
t=T-T_0,
\qquad
\tau=T-S>0,
\qquad
\delta(T)=u(T)-c_f,
\qquad
\alpha=\dot u(T_0)>0,
$$

for which

$$
g(t,\tau)
=
\alpha\tau\left(t-\frac{\tau}{2}\right)
+\text{higher-order terms},
$$

and the newborn root is $\tau_*(t)=2t+O(t^2)$ with

$$
D_s=\alpha t+O(t^2),
\qquad
D_T=-\alpha t+O(t^2).
$$

Replacing P12's pre-collapse $|D_T|$ numerator by the action-selected $c_f$
gives, on P12's newborn cell $\tau\ge t$,

$$
\boxed{
a_{\parallel,\mathrm{new}}^{(0)}(t)
=
K_i c_f
\int_t^h
\frac{c_f\tau}
{\left(c_f^2\tau^2+\epsilon_c^2\right)^{3/2}}
\delta_\eta\!\left(
\alpha\tau\left(t-\frac{\tau}{2}\right)
\right)d\tau,
}
$$

where $K_i=\kappa|q_i|^2>0$. Every displayed factor is nonnegative. The
newborn like-polarity row is therefore forward along-track; it has no signed
receiver-normal braking branch.

**Claim grade: derived within P12's frozen-history, dual-mollified local
reduction after replacing only the acceleration numerator.** It is falsified
by a same-measure reduction that leaves a factor proportional to $D_T$ or
changes the displayed sign.

For every fixed $\eta>0$ and $\epsilon_c>0$, the integral and its finite-window
velocity impulse are finite. Thus finite width plus a finite core replaces the
pointwise $1/D_s$ pole by a resolved endpoint layer. Finite causal width alone
is not sufficient when the core is removed.

**Claim grade: derived from boundedness on the fixed-regulator compact cell.**
The fixed-regulator statement is falsified by a nonintegrable singularity in
the displayed integral for positive $\eta$ and $\epsilon_c$.

The stronger re-scoped scaling follows by setting

$$
\ell_\eta=\sqrt{\frac{\eta}{\alpha}},
\qquad
\ell_c=\frac{\epsilon_c}{c_f},
\qquad
\rho=\frac{\ell_c}{\ell_\eta}.
$$

For P12's Gaussian $\delta_\eta(z)=\eta^{-1}\varphi(z/\eta)$, define

$$
\mathcal C_\varphi^{(0)}(\rho)
=
\int_0^\infty
\int_z^\infty
\frac{
y\,\varphi\!\left(y(z-y/2)\right)
}
{(y^2+\rho^2)^{3/2}}
\,dy\,dz.
$$

Then the newborn-cell impulse has leading form

$$
\boxed{
J_{\eta,\epsilon_c}^{(0)}
\sim
\frac{K_i}{c_f\eta}
\mathcal C_\varphi^{(0)}(\rho).
}
$$

For every fixed $\rho>0$, the coefficient is positive and finite. Its two
edge regimes are

$$
\mathcal C_\varphi^{(0)}(\rho)
\sim
\frac{1}{\rho^2}
\qquad
(\rho\to\infty),
$$

and

$$
\mathcal C_\varphi^{(0)}(\rho)
=
\varphi(0)\log\frac{1}{\rho}+O(1)
\qquad
(\rho\to0^+).
$$

Consequently,

$$
\boxed{
J_{\eta,\epsilon_c}^{(0)}
\sim
\frac{K_ic_f}{\alpha\epsilon_c^2}
}
\qquad
(\ell_c\gg\ell_\eta),
$$

while

$$
\boxed{
J_{\eta,\epsilon_c}^{(0)}
\sim
\frac{K_i}{c_f\eta}
\left[
\varphi(0)
\log\!\left(
\frac{c_f}{\epsilon_c}
\sqrt{\frac{\eta}{\alpha}}
\right)
+O(1)
\right]
}
\qquad
(\ell_\eta\gg\ell_c).
$$

At fixed finite $\rho$, matched refinement diverges as $\eta^{-1}$. The
core-dominated result can also be checked by sharp collapse first:

$$
a_{\parallel,\mathrm{new}}^{(0)}(t)
\longrightarrow
K_i
\frac{2c_f^2}
{\alpha\left(4c_f^2t^2+\epsilon_c^2\right)^{3/2}},
$$

whose impulse tends to $K_ic_f/(\alpha\epsilon_c^2)$. Thus the selected law
does not inherit P12's former
$1/\max(\ell_\eta,\ell_c)$ magnitude. Removing the vanishing $|D_T|$ numerator
raises the endpoint divergence to an inverse-square core divergence or a
$\eta^{-1}$ width divergence with logarithmic core sensitivity. The joint
sharp limit is divergent and refinement-path dependent.

**Claim grade: derived asymptotic within the same frozen-history newborn-cell
reduction.** Another admissible endpoint/newborn partition may change an
order-one coefficient, but it cannot remove the displayed inverse powers or
the small-$\rho$ logarithm unless the complete transition supplies a
cancelling row. A finite, path-independent complete-transition impulse from
the same selected law is the operator-checkable falsifier.

## 5. P1 Neutral Line and P8 Speed-Ratio Consequences

For P1's positive-normal uniform line, common-slice source-label transport is

$$
d\xi
=
dy\,\frac{D_s}{c_f}.
$$

The selected weight gives

$$
d\xi\,W_{\mathrm{acc}}^{(0)}
=
dy\,\frac{D_s}{c_f}\frac{c_f}{D_s}
=
dy.
$$

Uniform source drift therefore disappears exactly, and common-slice
neutrality removes the remaining line row. The selected law has

$$
\boxed{C_B^{(0)}=0}
$$

and it creates no receiver-independent current row.

**Claim grade: derived from P1's exact source-label change of variable.** A
same-measure neutral-line integral returning either $C_B\ne0$ or a nonzero
receiver-independent current coefficient falsifies the conclusion.

The P8 coupling of the law fork to
$q_c=c_{\mathrm{eff}}/c_f$ is therefore:

| Scale law | First-order conflict | $q_c$ consequence | Grade |
| --- | --- | --- | --- |
| Canonical $|D_T/D_s|$ | Static-source receiver row of order $v/c_f$. | It is suppressed by $q_c$ relative to $v/c_{\mathrm{eff}}$ if $q_c\ll1$, but is exposed when $q_c\sim1$. | derived power counting, conditional on the canonical law |
| Complete unit weight $1$ | P14's receiver-independent neutral-line current row of order $u/c_f$. | It is likewise suppressed by $q_c$ if $q_c\ll1$, but remains the wrong tensor row and is exposed when $q_c\sim1$. | derived power counting, conditional on complete unit weight |
| Selected $c_f/|D_s|$ | Neither of those first-order rows survives. | The weight decision no longer needs speed separation to hide P14's defect. P1 still gives exactly $C_B=0$, so no value of $q_c$ turns this bare scale row into Darwin magnetism. | derived |

Suppression is not a derivation of cancellation. A precision bound could make
a wrong first-order row small; it would not make that row the required
observer-level interaction.

**Claim grade: derived scope distinction.** It is falsified by a retained
same-law reduction in which changing $q_c$ changes the exact zero
$C_B^{(0)}=0$ into the Darwin value one without an additional assembly or
Noether sea response.

## 6. P6A Governor Status

On P6A's just-born, just-super-$c_f$ self root,

$$
D_s\simeq\delta\to0^+,
\qquad
D_T\simeq-\delta,
\qquad
\mu=\hat{\mathbf e}\cdot\hat{\mathbf r}\simeq1.
$$

The selected sharp scale row is

$$
\dot u_{\ell}^{(0)}
=
K_\ell
\frac{c_f}{|D_{s,\ell}|}
\mu_\ell>0.
$$

It has no $D_T$ zero, no sign reversal at $u\mu=c_f$, and no signed braking
side. Under finite width it becomes the positive endpoint impulse derived in
Section 4. Therefore the P6A receiver-normal governor is removed. A governor
from root-set changes, partner rows, or a complete retained-history return map
remains logically possible but is not derived here.

**Claim grade: derived for removal of the P6A receiver-normal mechanism;
open for every different whole-history mechanism.** A selected-law branch row
whose sign or zero is controlled by $D_T$ alone would falsify the derived
statement.

## 7. Directive for the P11 Re-Expansion

The recoil-inclusive Darwin delta pass must use

$$
\boxed{
\mathbf A_{\mathrm{base}}
=
\mathbf A_{\mathrm{scale}}^{(0)}
+
\mathbf A_C,
\qquad
W_{\mathrm{scale}}^{(0)}
=
\frac{c_f}{|D_s|},
}
$$

with $\mathbf A_C$ derived from the same $K_C^{(\eta)}$, retained branch
chart, mollifier, characteristic cuts, and endpoint convention used in P10
and P13. It must not use canonical $|D_T/D_s|$ as the base, and it must not use
complete unit weight.

P11's previous coefficient system was expanded around the canonical
$D_T/D_s$ numerator. Removing that numerator changes its direct receiver rows,
while the split-independent recoil contribution enters at Darwin order. The
old no-solution result therefore cannot be imported unchanged into the delta
pass; the complete coefficient table must be recomputed before Path A is
called open or closed under the action-selected base.

**Claim grade: derived workflow consequence of the selected scale law and
P10/P13 recoil order; no new Darwin verdict is claimed.** The directive is
falsified if the re-expansion proves that both the base change and recoil have
identically zero coefficients in every P11 row, making the old coefficient
system exactly unchanged.

## 8. Claim Ledger

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| Uniform source-time $K_0$ collapse produces the normalized scale factor $c_f/|D_s|$. | derived | The same fixed-$T$ delta collapse produces another factor. |
| $D_T/D_s$ remains forced root transport but is not scale acceleration strength. | derived | The fixed-$T$ spatial variation necessarily contains $\partial_T\widetilde g$. |
| Canonical $|D_T/D_s|$ needs a receiver-cadence declaration. | derived measure classification | The factor $|D_T|/c_f$ is already present in the frozen $K_0$ measure. |
| Complete unit weight needs a source-normal-compensated premeasure. | derived measure classification | Uniform $K_0$ collapse cancels $D_s$ without an inserted compensator. |
| P13 prevents characteristic-split choice from changing the local scale or recoil rows. | derived in P13 | Two endpoint-clear splits give different spatial Euler coefficients. |
| The selected sharp law is singular as $D_s\to0$. | derived | $c_f/|D_s|$ remains bounded while $c_f>0$. |
| Fixed positive $\eta$ and $\epsilon_c$ resolve a finite endpoint impulse. | derived in the local reduction | The displayed compact-cell integral diverges at fixed regulators. |
| The joint sharp impulse is divergent and path dependent with the re-scoped scaling in Section 4. | derived in the local reduction | A finite common value survives core-dominated, width-dominated, and matched refinement. |
| The P1 neutral-line coefficient is $C_B^{(0)}=0$. | derived | The exact transported neutral-line sum gives another coefficient. |
| The P6A receiver-normal governor is removed. | derived conditional on the selected law | The selected branch retains a $D_T$-controlled zero and braking sign. |
| P11 must be re-expanded on $\mathbf A_{\mathrm{scale}}^{(0)}+\mathbf A_C$. | derived workflow consequence | The selected action law contains a different base or no recoil row. |

## Smallest Follow-On

The smallest follow-on is the **recoil-inclusive P11 delta re-expansion**.
Keep P11's positive-normal constant-source-velocity chart and independent
Darwin comparison, replace its canonical base by $c_f/|D_s|$, and add P10's
split-independent recoil row from the same regularized action. Recompute only
the changed direct, bilinear, and source-quadratic coefficient table before
introducing any new cargo basis or running a trajectory.

**Claim grade: inferred priority recommendation.** It is displaced only by a
smaller analytic identity showing that the recoil row or every changed P11
coefficient vanishes on the whole comparison chart.

## Disposition

Disposition: **priority-only**. The frozen P10/P13 action measure selects
$c_f/|D_s|$ as the inverse-square scale base and rejects the other two weights
for that measure. Promotion remains blocked on the divergent, path-dependent
coincident-endpoint transition and on the recoil-inclusive P11 coefficient
match.

**Claim grade: derived for the measure selection; inferred for promotion
readiness.** A finite regulator-independent complete-transition impulse plus
a successful independent P11 recovery match would remove the two named
blockers.
