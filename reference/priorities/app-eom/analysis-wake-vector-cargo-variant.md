# Wake Vector-Cargo Variant

## Finding in plain language

Frozen source-velocity cargo can survive the exact neutral-line measure
transport, but merely adding that vector to the per-hit numerator does **not**
repair the magnetism deficit. A bare source-velocity term produces a
receiver-independent acceleration proportional to the line current and leaves
P1's receiver-velocity-linear coefficient at $C_B=0$.

The smallest line-compatible repair found here has two distinct cargo
channels:

1. a direct source-cargo channel, chosen so its receiver-independent bulk line
   response cancels while its one-hit transverse response remains; and
2. a bilinear receiver-cargo channel whose transported neutral-line response
   has exactly the Darwin comparison tensor.

For the declared two-parameter law, the exact coefficient is

$$
\boxed{C_B=\lambda.}
$$

Thus the survival condition fixes $\lambda=1$ inside this minimal family, but
it does not fix the direct-cargo coefficient $\alpha$. In the wider local,
Euclidean-reflection-covariant linear response family, the same neutral-line condition
leaves additional invisible combinations. The magnetism anchor therefore
selects a family, not a unique per-hit law.

**Claim grade: derived conditional on the candidate law below.** The law is a
postulated constitutive variant, not an action-derived result. Its physical
standing is **inferred candidate only**.

## Scope and import test

The calculation uses the positive-normal simple-root chart shared by P1 and
P2:

$$
g(T,S)=r-c_f(T-S)=0,
\qquad
D_s=c_f-\hat{\mathbf r}\cdot\mathbf U>0,
\qquad
D_T=c_f-\hat{\mathbf r}\cdot\mathbf V>0,
$$

where

$$
\mathbf r=\mathbf X_i(T)-\mathbf X_j(S),
\qquad
r=\|\mathbf r\|,
\qquad
\hat{\mathbf r}=\frac{\mathbf r}{r},
$$

$$
\mathbf U\equiv\mathbf V_j(S),
\qquad
\mathbf V\equiv\mathbf V_i(T).
$$

The shell cargo is the full Euclidean vector $\mathbf U$ evaluated at the
emission event. It is copied from the retained source history at $S$ and is
held fixed during propagation. The shell does not carry the source's later
velocity. Radial and transverse decompositions are made only when the receiver
samples the shell:

$$
U_r=\hat{\mathbf r}\cdot\mathbf U,
\qquad
\mathbf U_\perp=\mathbf U-U_r\hat{\mathbf r},
$$

$$
V_r=\hat{\mathbf r}\cdot\mathbf V,
\qquad
\mathbf V_\perp=\mathbf V-V_r\hat{\mathbf r}.
$$

The derivation uses only retained path history, the causal-root geometry,
Euclidean vector algebra, polarity, and absolute time. The Darwin expression
enters only after the native line sum as an observer-level recovery target. No
standard-physics acceleration law is used as an architrino-level premise.

The signed or unsigned continuation through $D_T\le0$ or $D_s\le0$ is not
fixed here. This is a precise chart-local candidate, not a global replacement
law across causal folds or receiver-normal reversals.

**Claim grade: derived for the chart identities and import classification;
candidate definition for the frozen-cargo ontology; open derivation target for
any global-chart extension.**

## Why bare velocity cargo is insufficient

Consider the direct numerator addition

$$
\mathbf N_{\mathrm{bare}}
=D_T\hat{\mathbf r}+a\mathbf U.
$$

It keeps the delta-collapse factor $1/D_s$, but after P1's exact source-label
transport it contributes $a\mathbf U/c_f$ to the line integrand. For a source
species drifting as $u\hat{\mathbf x}$,

$$
\int_{-\infty}^{\infty}\frac{\mathbf U}{r^2}\,dy
=\frac{\pi u}{\rho}\hat{\mathbf x}.
$$

Consequently a neutral line with current
$\mathcal J=\sum_s\Lambda_su_s$ acquires

$$
\mathbf A_{\mathrm{bare},V=0}^{\mathrm{line}}
=a\frac{\pi\kappa q_i\mathcal J}{\rho c_f}\hat{\mathbf x},
$$

while the term has no receiver velocity and therefore still gives $C_B=0$.
It fails the zero receiver-independent Darwin line anchor unless $a=0$.

**Claim grade: derived.** A same-record symmetric-cutoff sum that instead
eliminates the displayed current term, without changing the measure or
numerator, would falsify this conclusion.

## Formalized minimal variant

Define the direct cargo map

$$
\mathcal R_{\hat r}\mathbf U
\equiv
\mathbf U-2\hat{\mathbf r}
(\hat{\mathbf r}\cdot\mathbf U)
=\mathbf U_\perp-U_r\hat{\mathbf r},
$$

and the bilinear receiver-cargo map

$$
\mathcal K(\hat{\mathbf r};\mathbf V,\mathbf U)
\equiv
\mathbf U(\hat{\mathbf r}\cdot\mathbf V)
-\hat{\mathbf r}(\mathbf U\cdot\mathbf V).
$$

Equivalently,

$$
\mathcal K
=V_r\mathbf U_\perp
-\hat{\mathbf r}(\mathbf U_\perp\cdot\mathbf V_\perp).
$$

The candidate per-hit acceleration on the declared chart is

$$
\boxed{
\mathbf A_{i\leftarrow j}^{(\alpha,\lambda)}
=
\kappa Q_{ij}\frac{1}{r^2D_s}
\left[
D_T\hat{\mathbf r}
+\alpha\mathcal R_{\hat r}\mathbf U
+\frac{\lambda}{c_f}
\mathcal K(\hat{\mathbf r};\mathbf V,\mathbf U)
\right],
}
$$

where $Q_{ij}=\sigma_{ij}|q_iq_j|$ and $\alpha,\lambda$ are universal
dimensionless constants. They may not be refitted by geometry, source species,
or separation.

The first row is canon. The second row gives a direct transverse response to
source cargo but uses the unique coefficient ratio, within the two-vector
local polar basis $\{\mathbf U,\hat{\mathbf r}
(\hat{\mathbf r}\cdot\mathbf U)\}$, whose steady infinite-line integral
vanishes. The third row is linear in both the frozen
source cargo and the receiver velocity. It obeys

$$
\mathbf V\cdot\mathcal K=0,
$$

so that row alone produces no instantaneous receiver-side bookkeeping power.
That orthogonality does not close pair momentum or angular momentum.

If the source is static at emission, $\mathbf U=\mathbf0$, both cargo rows
vanish and

$$
\mathbf A_{i\leftarrow j}^{(\alpha,\lambda)}
=\kappa Q_{ij}\frac{D_T}{D_s}
\frac{\hat{\mathbf r}}{r^2},
$$

exactly the positive-normal canonical law for arbitrary sub-field receiver
velocity. If both architrinos are static, $D_s=D_T=c_f$ and the law reduces
exactly to $\kappa Q_{ij}\hat{\mathbf r}/r^2$.

**Claim grade: candidate definition for the boxed law; derived for the
decomposition, work orthogonality, and exact source-static and fully static
reductions.** No action or wake ledger currently derives either cargo map.

## Exact neutral-line transport and $C_B$

Use P1's infinite line along $\hat{\mathbf x}$, with receiver offset
$\rho\hat{\mathbf y}$. For source species $s$, let $\xi$ be its identity label
on the common reception-time slice and $y$ its emission coordinate. Then

$$
\mathbf U_s=u_s\hat{\mathbf x},
\qquad
r=\sqrt{y^2+\rho^2},
\qquad
\hat{\mathbf r}
=\frac{-y\hat{\mathbf x}+\rho\hat{\mathbf y}}{r},
$$

and the exact identity-label transport is

$$
\frac{d\xi}{dy}=\frac{D_{s,s}}{c_f}.
$$

Therefore the species contribution is exactly

$$
\begin{aligned}
\mathbf A_s^{(\alpha,\lambda)}
=\kappa q_i\Lambda_s
\int_{-\infty}^{\infty}\frac{dy}{r^2}
\Bigg[
&\frac{D_T}{c_f}\hat{\mathbf r}
+\frac{\alpha}{c_f}\mathcal R_{\hat r}
(u_s\hat{\mathbf x})\\
&+\frac{\lambda}{c_f^2}
\mathcal K(\hat{\mathbf r};\mathbf V,u_s\hat{\mathbf x})
\Bigg].
\end{aligned}
$$

No $D_s$ remains. Unlike the canonical numerator, however, the last two rows
retain $u_s$ explicitly as transported cargo.

The direct row vanishes species by species because

$$
\int_{-\infty}^{\infty}\frac{dy}{r^2}
=\frac{\pi}{\rho},
\qquad
\int_{-\infty}^{\infty}
\frac{\hat{\mathbf r}\hat{\mathbf r}^{\mathsf T}}{r^2}\,dy
=\frac{\pi}{2\rho}
(\hat{\mathbf x}\hat{\mathbf x}^{\mathsf T}
+\hat{\mathbf y}\hat{\mathbf y}^{\mathsf T}),
$$

so

$$
\int_{-\infty}^{\infty}
\frac{\mathcal R_{\hat r}(u_s\hat{\mathbf x})}{r^2}\,dy
=\mathbf0.
$$

For the bilinear row,

$$
\mathcal K
=u_s\left[
\hat{\mathbf x}(\mathbf V\cdot\hat{\mathbf r})
-\hat{\mathbf r}V_x
\right],
$$

and hence

$$
\int_{-\infty}^{\infty}\frac{\mathcal K}{r^2}\,dy
=\frac{2u_s}{\rho}
(V_y\hat{\mathbf x}-V_x\hat{\mathbf y}).
$$

The canonical transported row is independent of $u_s$ and cancels under
$\sum_s\Lambda_s=0$. Summing the cargo rows under

$$
\sum_s\Lambda_s=0,
\qquad
\mathcal J=\sum_s\Lambda_su_s\ne0,
$$

gives

$$
\boxed{
\mathbf A_{V}^{\mathrm{line},(\alpha,\lambda)}
=\lambda
\frac{2\kappa q_i\mathcal J}{\rho c_f^2}
(V_y\hat{\mathbf x}-V_x\hat{\mathbf y}).
}
$$

Using P1's normalization,

$$
\boxed{C_B=\lambda.}
$$

This result is exact for the declared constant-drift infinite-line chart; it
does not come from truncating a delayed-branch expansion.

**Claim grade: derived conditional on the boxed candidate law.** The
observer-level statement that exact Darwin recovery requires $C_B=1$ is the
accepted comparison anchor from P1, not a substrate premise. A direct
source-identity sum converging to another coefficient on the same retained
roots would falsify the calculation.

## What the survival condition fixes

Within the declared two-parameter law,

$$
C_B=1
\quad\Longleftrightarrow\quad
\lambda=1,
$$

while $\alpha$ remains free. Thus even the minimal law is not fixed uniquely.
The mirrored source-motion control below measures $\alpha$ independently of
$C_B$.

The non-uniqueness is larger without the minimal-map restriction. The most
general local Euclidean-reflection-covariant polar numerator through first order in
$\mathbf U$ and at most first order in $\mathbf V$, using no new scale, can
contain

$$
\begin{aligned}
\mathbf N_{\mathrm{cargo}}
=&\ a\mathbf U
+b\hat{\mathbf r}(\mathbf U\cdot\hat{\mathbf r})\\
&+\frac{1}{c_f}\Big[
c\mathbf U(\mathbf V\cdot\hat{\mathbf r})
+d\mathbf V(\mathbf U\cdot\hat{\mathbf r})
+e\hat{\mathbf r}(\mathbf U\cdot\mathbf V)
+f\hat{\mathbf r}(\mathbf U\cdot\hat{\mathbf r})
(\mathbf V\cdot\hat{\mathbf r})
\Big].
\end{aligned}
$$

On the exact neutral line, absence of a receiver-independent current response
requires

$$
b=-2a.
$$

Matching both components of the normalized Darwin current response requires

$$
c+\frac{f}{3}=1,
\qquad
e+\frac{f}{3}=-1.
$$

The coefficient $d$ is invisible on the symmetric infinite line, while $a$
and $f$ remain free after the displayed constraints. The declared minimal
family is

$$
a=\alpha,
\quad b=-2\alpha,
\quad c=\lambda,
\quad d=f=0,
\quad e=-\lambda.
$$

Therefore $C_B=1$ is a necessary coefficient constraint, not a derivation of
the cargo response. Additional native input—an action, a wake constitutive
law, or independent discriminating controls—is required to select a unique
member. Choosing the tensor only because it reaches the benchmark is fitting,
not independent evidence.

**Claim grade: derived within the stated covariance, order, and locality
ansatz; inferred that a native derivation is required for unique physical
selection.** Higher-order or nonlocal cargo maps lie outside this family and
increase, rather than remove, the non-uniqueness.

## P2 discriminators and mirrored Control A

### Mirrored Control A: pure transverse source motion

Choose one certified simple partner root with

$$
\mathbf V_i(T)=\mathbf0,
\qquad
\mathbf U=\mathbf U_\perp,
\qquad
\hat{\mathbf r}\cdot\mathbf U_\perp=0,
\qquad
0<\|\mathbf U_\perp\|<c_f.
$$

Then $D_s=D_T=c_f$ and $\mathcal K=\mathbf0$. The three relevant predictions
are

| Rule | Radial component | Transverse component |
| --- | --- | --- |
| Canon SR | $\kappa Q_{ij}\hat{\mathbf r}/r^2$ | $\mathbf0$ |
| P2 SV | $\kappa Q_{ij}\hat{\mathbf r}/r^2$ | $\mathbf0$ |
| Vector cargo $(\alpha,\lambda)$ | $\kappa Q_{ij}\hat{\mathbf r}/r^2$ | $\alpha\kappa Q_{ij}\mathbf U_\perp/(c_fr^2)$ |

This is the source-motion mirror of P2 Control A. It separates a nonzero
direct vector-cargo channel from both canon and SV while holding the root,
separation, $D_s$, $D_T$, and radial acceleration fixed.

The ordinary P2 Control A supplies the orthogonal discriminator. With the
source static and the receiver moving transversely, the vector-cargo law
reduces exactly to canon and predicts zero transverse acceleration, whereas SV
predicts $-\kappa Q_{ij}\mathbf V_\perp/(c_fr^2)$. The two controls therefore
distinguish source cargo from receiver-vector sampling without importing an
observer-level magnetic mechanism.

The mirrored prediction exists only when $\alpha\ne0$. The magnetism survival
condition does not require that: the bilinear-only member $\alpha=0$ still has
$C_B=1$ when $\lambda=1$. A zero mirrored-control result therefore falsifies a
declared nonzero $\alpha$, not the entire $C_B=1$ cargo family.

**Claim grade: derived discriminator predictions; current result:
unmeasured.** An independent one-row evaluator whose error interval excludes
the displayed prediction falsifies the corresponding member.

## Delta collapse and internal ledger burden

The cargo maps are numerator functions evaluated on the same retained root.
They do not alter $g=0$, the root identity, or
$\partial_Sg=-D_s$. The sharp source-time delta collapse therefore retains the
same forced factor $1/|D_s|$. This is why the exact P1 measure transport remains
applicable.

That kinematic compatibility does not provide a conservation ledger. Define
the added cargo acceleration and its bookkeeping row by

$$
\mathbf A_{i,\mathrm{VC}}
\equiv
\sum_j
\left(
\mathbf A_{i\leftarrow j}^{(\alpha,\lambda)}
-\mathbf A_{i\leftarrow j}^{\mathrm{can}}
\right),
\qquad
\mathbf R_{i,\mathrm{VC}}
\equiv
\mu_{\mathrm{arch}}\mathbf A_{i,\mathrm{VC}},
$$

where $\mu_{\mathrm{arch}}$ is only the universal action/energy bookkeeping
conversion, not an architrino mass. After declared window-boundary fluxes are
included, the same action or compatible realized-history construction must
supply wake rows satisfying

$$
\boxed{
\frac{dE_{\mathrm{wake,VC}}}{dT}
=-\sum_i\mathbf V_i\cdot\mathbf R_{i,\mathrm{VC}},
}
$$

$$
\boxed{
\frac{d\mathbf P_{\mathrm{wake,VC}}}{dT}
=-\sum_i\mathbf R_{i,\mathrm{VC}},
}
$$

$$
\boxed{
\frac{d\mathbf J_{\mathrm{wake,VC}}}{dT}
=-\sum_i\mathbf X_i\times\mathbf R_{i,\mathrm{VC}}.
}
$$

The per-hit acceleration moment about the historical source point is

$$
\boxed{
\mathbf r\times
(\mathbf A_{i\leftarrow j}^{(\alpha,\lambda)}
-\mathbf A_{i\leftarrow j}^{\mathrm{can}})
=
\frac{\kappa Q_{ij}}{rD_s}
\left(
\alpha+\lambda\frac{\hat{\mathbf r}\cdot\mathbf V}{c_f}
\right)
\hat{\mathbf r}\times\mathbf U.
}
$$

It is generically nonzero. Delayed transposition also does not make the pair
momentum row cancel automatically. Even though
$\mathbf V\cdot\mathcal K=0$, the bilinear channel still needs momentum and
angular-momentum wake rows; the direct $\alpha$ channel generally needs all
three rows.

P4 proved that the pure scalar $1/r$ action already leaves a nonzero
per-worldline residual on the principal circular partner chart. An
action-level cargo derivation therefore inherits that open residual/recoil
structure. A successful enriched action must show, on one branch-preserving
chart and one boundary convention, both how its Euler derivative generates the
cargo row and whether it cancels or retains P4's residual. It must then derive
the three wake increments above from that same action. The cargo coefficient
calculation alone proves none of those statements.

**Claim grade: derived for the unchanged delta-collapse factor, the displayed
moment, and the three required balance rows; open derivation target for their
satisfaction. The inheritance of P4's unresolved residual/recoil obligation
is a derived logical consequence of adding a new action term without an
existing cancellation proof.**

## Three-axis falsification

| Axis | Vector-cargo variant | Canon relative to the variant |
| --- | --- | --- |
| **1. Internal ledger closure** | Falsified if refined total energy, momentum, or angular-momentum residuals exclude zero with no same-action cargo wake or boundary row. For $\alpha\ne0$, mirrored Control A supplies a nonzero angular row that must be compensated. | Canon's absence of cargo is not itself an internal failure, but P4's canonical action-residual/recoil obligation remains open. Failure to close that same-action residual falsifies an action derivation of canon on the tested chart, though not the acceleration law retained explicitly as a postulate. |
| **2. Anchored statics and recovery** | Passes the source-static inverse-square law exactly. On the neutral line it survives the Darwin coefficient only if $\lambda=1$ and its direct cargo map has zero receiver-independent bulk current response. Any independently derived $C_B\ne1$, nonzero forbidden bulk term, or later Lorentz-recovery failure falsifies the member. | Passes the static inverse-square anchor. P1's exact $C_B=0$ falsifies canon as the standalone per-hit origin of Darwin-order magnetism because the recovery anchor is $1$; it does not exclude a separate assembly or Noether sea channel. |
| **3. Discriminating regime** | Mirrored Control A predicts $\mathbf A_\perp=\alpha\kappa Q_{ij}\mathbf U_\perp/(c_fr^2)$; the neutral-line current test predicts $C_B=\lambda$. Ordinary P2 Control A predicts zero when $\mathbf U=0$. An independent result excluding any declared value falsifies that member. | Predicts zero in mirrored Control A and $C_B=0$ in the neutral-line current test. A certified nonzero mirrored response falsifies canon's per-hit direction rule on that row; a certified $C_B=1$ from the unchanged canonical kernel would falsify P1's analytic null instead. |

**Claim grade: derived test logic; current discriminating and ledger results:
unmeasured.** The analytic $C_B$ values are derived from the respective
postulated kernels, not independent evidence that nature selects either one.

## Verdict and claim ledger

The exact transport gives a conditional yes and a uniqueness no:

- **Derived:** frozen numerator cargo survives P1's $D_s$ cancellation.
- **Derived:** bare additive velocity cargo has $C_B=0$ and adds a forbidden
  receiver-independent infinite-line current response; it is not the repair.
- **Derived conditional on the candidate law:** the bilinear cargo map gives
  $C_B=\lambda$, so $\lambda=1$ reaches the Darwin comparison coefficient.
- **Derived:** $C_B=1$ does not select a unique cargo law. It leaves $\alpha$
  free in the minimal family and more freedom in the general stated ansatz.
- **Inferred:** vector cargo remains a live per-hit repair candidate only as an
  enriched receiver-cargo coupling, not merely as a shell carrying
  $\mathbf V_j(S)$.
- **Open:** no native action, conservation ledger, global signed-normal rule,
  or independent control currently selects or validates the enriched law.
- **Open:** P4's residual/recoil structure must be solved by any action-level
  promotion of the cargo term.

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| The shell cargo is the frozen emission velocity $\mathbf V_j(S)$. | candidate definition | An accepted native wake construction carries a different source-history object or evolves the cargo in transit. |
| The minimal law reduces exactly to canon when $\mathbf V_j(S)=0$. | derived | Direct substitution leaves a noncanonical row. |
| Exact transport yields $C_B=\lambda$. | derived conditional on the candidate law | Same-root identity summation or the displayed integrals produce another coefficient. |
| $C_B=1$ fixes $\lambda$ but not $\alpha$. | derived | The mirrored-control coefficient follows from the neutral-line coefficient without another assumption. |
| The wider first-order response remains a family after line matching. | derived within the declared ansatz | The covariance basis is incomplete at the stated order, or the displayed constraints determine every coefficient. |
| The cargo term has new wake-ledger burdens. | derived requirement | A same-action proof shows the added mechanical rows cancel pairwise and at boundaries without cargo wake increments on a branch-preserving neighborhood. |
| The variant is the physical per-hit magnetism mechanism. | unestablished inference | Internal-ledger failure, $C_B\ne1$, a failed independent control, or a different native channel recovering the anchor excludes it. |

## Promotion disposition

Disposition: **priority-only**. This packet formalizes and conditionally
normalizes a candidate law; it does not authorize a canon or EOM solver change.
Promotion requires a native derivation that fixes the remaining coupling
freedom, closes the same-action energy/momentum/angular-momentum rows including
P4's residual/recoil obligation, and survives independent discriminating
controls.
