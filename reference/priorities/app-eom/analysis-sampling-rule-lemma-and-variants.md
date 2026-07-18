# Receiver-Sampling Lemma Family and Variant Discriminators

## Finding

The source-time delta collapse fixes the simple-root denominator $1/|D_s|$.
It does not fix which spatial wake statistic produces acceleration, and it does
not by itself multiply the collapsed row by $|D_T|$. The scalar
$D_T=c_f-\hat{\mathbf r}\cdot\mathbf V_i$ is forced as the normal speed of the
receiver through the causal-wake level set and as the numerator of root
transport. Turning that scalar crossing rate into acceleration magnitude is a
constitutive choice. Coupling to the full relative crossing-velocity vector is
a different constitutive choice because its transverse part is invisible to
the scalar causal constraint.

This yields a clean two-axis family on the simple-root, sub-field-speed
receiver chart:

| Spatial statistic | Normal-projection response | Full-vector response |
| --- | --- | --- |
| Causal-isochron surface density, $\Sigma\propto r^{-2}$ | **SR:** canonical surface/radial rule | **SV:** surface/vector rule |
| Outward density-gradient magnitude, $\|-\nabla\Sigma\|\propto r^{-3}$ | **GR:** gradient/radial rule | **GV:** gradient/vector rule |

**Claim grade: derived, conditional on the definitions below.** The
classification follows algebraically once the common causal-root law, the two
spatial statistics, and the two receiver response maps are declared. It does
not prove that any member is nature's rule.

## Scope and Source Status

The live [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md)
defines the SR member. The 2026-07-18
[import audit](../master-equation-closure/brainstorming.md) correctly separates
the derived $D_s$ denominator from the postulated use of $|D_T|$ and from the
postulated coupling of sampled surface density along $\hat{\mathbf r}$. The
[dispatch packet](master-equation-import-audit-dispatch-2026-07-18.md) supplies
the three-axis falsification standard used below.

Direct inspection of
[`CertifiedAcceleration.cpp`](../../../src/eom/src/CertifiedAcceleration.cpp)
shows that the EOM solver currently evaluates
$|D_T/D_s|\,\mathbf r/r^3$: the implemented production member is SR.

**Claim grade: measured by direct code inspection.** This is an implementation
fact, not independent evidence that SR is physically correct. Solver agreement
with its own formula would be self-agreement only.

No numerical trajectory, conservation ledger, Darwin-order expansion, or
anchored-recovery run was executed for this analysis.

## Common Per-Hit Geometry

Fix one ordered receiver-source row $(i,j)$ at reception time $T$ and one
positive-delay emission time $S=T_{\mathrm{em}}<T$. Define

$$
\mathbf r
\equiv
\mathbf X_i(T)-\mathbf X_j(S),
\qquad
r\equiv\|\mathbf r\|>0,
\qquad
\hat{\mathbf r}\equiv\frac{\mathbf r}{r},
$$

$$
g(T,S)
\equiv
r(T,S)-c_f(T-S),
$$

$$
D_s
\equiv
c_f-\hat{\mathbf r}\cdot\mathbf V_j(S),
\qquad
D_T
\equiv
c_f-\hat{\mathbf r}\cdot\mathbf V_i(T).
$$

The row is on the sharp simple-root chart when

$$
g(T,S)=0,
\qquad
|D_s|\ge\nu_s>0.
$$

For the clean sampling-rule comparison, also impose

$$
\|\mathbf V_i(T)\|<c_f.
$$

Then $D_T>0$ for every line of action, so the signed-versus-unsigned question
does not contaminate the radial-versus-vector discriminator. Decompose the
receiver velocity as

$$
\mathbf V_i
=
V_r\hat{\mathbf r}+\mathbf V_\perp,
\qquad
V_r\equiv\hat{\mathbf r}\cdot\mathbf V_i,
\qquad
\hat{\mathbf r}\cdot\mathbf V_\perp=0,
$$

and define the full relative crossing-velocity vector

$$
\mathbf C
\equiv
c_f\hat{\mathbf r}-\mathbf V_i
=
D_T\hat{\mathbf r}-\mathbf V_\perp.
$$

Its normal projection is exactly

$$
(\hat{\mathbf r}\cdot\mathbf C)\hat{\mathbf r}
=
D_T\hat{\mathbf r}.
$$

**Claim grade: derived.** These are identities on the declared chart.

## The Lemma Family

Let

$$
Q_{ij}\equiv\sigma_{ij}|q_iq_j|.
$$

For isotropic emission at fixed output per unit absolute time, write the
surface density as

$$
\Sigma(r)=\frac{\Sigma_0}{4\pi r^2}.
$$

Its outward density-gradient carrier is

$$
-\nabla_{\mathbf X}\Sigma
=
\frac{2\Sigma_0}{4\pi r^3}\hat{\mathbf r}.
$$

The constant $2/(4\pi)$ is absorbed into the gradient coupling. Because the
two spatial statistics have different dimensions, their universal couplings
$\kappa_S$ and $\kappa_G$ also have different dimensions. Equivalently, a
gradient rule needs one additional declared length scale if it is written in
terms of $\kappa_S$. That scale may not be fitted separately at each radius.

### Lemma 1: Surface-Density, Radial-Projection Member (SR)

On the declared chart, the per-hit acceleration is

$$
\boxed{
\mathbf A_{SR}
=
\kappa_S Q_{ij}
\frac{1}{r^2}
\frac{D_T}{|D_s|}
\hat{\mathbf r}
}
$$

This is the canonical member because $D_T>0$ here. On the general simple-root
chart it extends canonically by replacing $D_T$ with $|D_T|$.

**Claim grade: derived as the reduction of the declared SR rule; status:
postulated substrate acceleration law.** Neither delta collapse nor surface
dilution alone proves the final boxed coupling.

### Lemma 2: Surface-Density, Full-Vector Member (SV)

On the same chart, replace the normal projection of $\mathbf C$ by the full
vector:

$$
\boxed{
\mathbf A_{SV}
=
\kappa_S Q_{ij}
\frac{1}{r^2}
\frac{\mathbf C}{|D_s|}
=
\kappa_S Q_{ij}
\frac{1}{r^2|D_s|}
\left(D_T\hat{\mathbf r}-\mathbf V_\perp\right)
}
$$

The SR and SV radial components are therefore identical on this chart, while
SV adds a transverse component.

**Claim grade: derived as a candidate definition; status: postulated
variant.** The scalar causal-root geometry supplies no transverse Jacobian or
transverse wake cargo that would derive this extra response.

### Lemma 3: Density-Gradient, Radial-Projection Member (GR)

Couple acceleration to the magnitude of the outward gradient of the derived
surface density while retaining the scalar receiver crossing rate:

$$
\boxed{
\mathbf A_{GR}
=
\kappa_G Q_{ij}
\frac{1}{r^3}
\frac{D_T}{|D_s|}
\hat{\mathbf r}
}
$$

The polarity convention is kept the same as SR, so the outward carrier gives
like-polarity repulsion and unlike-polarity attraction.

**Claim grade: derived as a candidate definition; status: postulated
variant.** The $r^{-3}$ power follows from differentiating the specified
$r^{-2}$ surface density. This is not the gradient of a separate $1/r$
potential; that would be a different family.

### Lemma 4: Density-Gradient, Full-Vector Member (GV)

Combine the gradient spatial scale with the full crossing-velocity response:

$$
\boxed{
\mathbf A_{GV}
=
\kappa_G Q_{ij}
\frac{1}{r^3}
\frac{\mathbf C}{|D_s|}
=
\kappa_G Q_{ij}
\frac{1}{r^3|D_s|}
\left(D_T\hat{\mathbf r}-\mathbf V_\perp\right)
}
$$

**Claim grade: derived as a candidate definition; status: postulated
variant.** It inherits both unproved choices: gradient sampling and transverse
response.

### Extension Beyond the Comparison Chart

When $D_T<0$, a full-vector rule needs an additional convention. The two
minimal completions are the signed vector $\mathbf C/|D_s|$ and the
radial-matched vector $\operatorname{sign}(D_T)\mathbf C/|D_s|$. They agree on
the sub-field-speed chart and differ on super-field-speed receiver crossings.
The radial-matched completion is discontinuous at $D_T=0$ when
$\mathbf V_\perp\ne\mathbf0$, whereas SR goes continuously silent there.

**Claim grade: derived.** This is why the four-member comparison is stated on
the sub-field-speed chart. Choosing the general vector completion belongs to
the separate signed-versus-unsigned receiver-normal adjudication; it cannot be
silently bundled into the present result.

## What Delta Collapse Forces and What It Leaves Free

### Proposition 1: The Source-Normal Denominator Is Forced

At fixed $T$,

$$
\partial_S g(T,S)
=
c_f-\hat{\mathbf r}\cdot\mathbf V_j(S)
=
D_s.
$$

For any locally regular scalar or vector integrand $\mathbf f(T,S)$ and simple
roots $S_\ell(T)$,

$$
\int dS\,\mathbf f(T,S)\,\delta(g(T,S))
=
\sum_\ell
\frac{\mathbf f(T,S_\ell(T))}{|D_s(T,S_\ell(T))|}.
$$

Therefore every member that claims the same source-time delta support must
carry $1/|D_s|$. A rule that omits this factor is excluded from this family
unless its pre-collapse integrand contains a compensating $|D_s|$ factor, in
which case it has declared a different emission law.

**Claim grade: derived. Falsifier:** a valid simple-root change of variables
for the stated $g$ that produces a Jacobian other than $1/|D_s|$.

### Proposition 2: The Radial Form of the Crossing Scalar Is Forced, but Its Use as Acceleration Weight Is Not

At fixed $S$,

$$
\partial_T g(T,S)
=
\hat{\mathbf r}\cdot\mathbf V_i(T)-c_f
=
-D_T.
$$

Implicit differentiation of $g(T,S_\ell(T))=0$ gives

$$
\frac{dS_\ell}{dT}
=
-\frac{\partial_Tg}{\partial_Sg}
=
\frac{D_T}{D_s}.
$$

Thus $D_T$ and its radial projection are forced as a scalar level-set crossing
identity and as root-transport bookkeeping. Tangential motion does not change
$g$ to first order because $\hat{\mathbf r}\cdot\mathbf V_\perp=0$.

The source-time delta collapse itself still yields only $1/|D_s|$. It yields
$|D_T/D_s|$ only when $|D_T|$ is already present in the pre-collapse
integrand, or when an independently justified reception-cadence measure is
introduced. Consequently:

- $D_T/D_s$ is forced as signed root transport;
- the choice to use $|D_T/D_s|$ as acceleration strength is free until an
  action or wake-ledger derivation closes;
- a transverse term proportional to $\mathbf V_\perp$ is not a causal-surface
  crossing rate and requires a new constitutive response.

**Claim grade: derived. Falsifier:** a retained differentiable root whose
measured derivative $dS_\ell/dT$ disagrees with $D_T/D_s$ while the recorded
$g=0$ and $D_s\ne0$ remain valid.

### Proposition 3: Dilution Is Derived Under Declared Isotropy; Acceleration Coupling Is Free

Conservation of isotropically emitted scalar wake cargo across a Euclidean
sphere gives $4\pi r^2\Sigma(r)=\text{constant}$ and hence
$\Sigma\propto r^{-2}$. Differentiating that statistic gives
$\|-\nabla\Sigma\|\propto r^{-3}$. Delta collapse acts on emission time and
does not choose between those spatial statistics.

Therefore:

- the $r^{-2}$ dilution follows from isotropy, conserved scalar cargo, and
  three-dimensional Euclidean area;
- acceleration proportional to $\Sigma$ is a free constitutive choice;
- acceleration proportional to $-\nabla\Sigma$ is another mathematically
  admissible constitutive choice;
- no constant normalization can make the two rules agree at more than one
  separation, because their logarithmic slopes differ.

**Claim grade: derived under the stated emission assumptions. Falsifier:** an
isotropic conserved-cargo construction in three Euclidean dimensions whose
surface integral is radius independent but whose local surface density is not
proportional to $r^{-2}$.

### Forced-Versus-Chosen Summary

| Ingredient | Status | Consequence |
| --- | --- | --- |
| Causal support $g=0$ | Declared common ontology/dynamics input | Selects the same roots for all four members. |
| Simple-root factor $1/|D_s|$ | **Forced by delta collapse** | All four members retain it. Omitting it changes the source-time law. |
| Signed $D_T/D_s$ in $dS/dT$ | **Forced by implicit differentiation** | Root transport uses it for every member. |
| $D_T$ as a scalar normal speed | **Forced by the scalar level set** | Tangential receiver motion is not crossing-rate data. |
| $|D_T|$ as acceleration numerator | **Chosen** | Requires reception-cadence, action, or ledger derivation. |
| Radial acceleration direction | **Chosen by the scalar line-of-action coupling; compatible with isotropy** | Not forced by delta collapse alone. |
| Full $\mathbf C$ response | **Chosen extra constitutive response** | Adds transverse acceleration not encoded in $g$. |
| $r^{-2}$ surface dilution | **Derived under isotropic conserved emission** | Does not by itself say acceleration samples $\Sigma$. |
| Surface-density coupling | **Chosen** | Gives a static $r^{-2}$ per-hit law. |
| Density-gradient coupling | **Chosen** | Gives a static $r^{-3}$ per-hit law and needs a dimensionally distinct coupling or length scale. |

**Claim grade: derived synthesis.** None of SR, SV, GR, or GV is excluded by
the source-time delta identity alone. GR and GV are instead placed under
immediate pressure by the independently declared static inverse-square
anchor. SV and GV are placed under immediate pressure by the absence of a
declared transverse wake response or closing ledger.

## Per-Hit Discriminators

Define

$$
K_S(r)
\equiv
\kappa_S Q_{ij}r^{-2},
\qquad
K_G(r)
\equiv
\kappa_G Q_{ij}r^{-3}.
$$

For $p\in\{S,G\}$, the radial and vector members satisfy

$$
\mathbf A_{pR}
=
\frac{K_pD_T}{|D_s|}\hat{\mathbf r},
$$

$$
\mathbf A_{pV}
=
\frac{K_p}{|D_s|}
\left(D_T\hat{\mathbf r}-\mathbf V_\perp\right).
$$

Hence

$$
\boxed{
\mathbf A_{pR,\perp}=\mathbf0,
\qquad
\mathbf A_{pV,\perp}
=
-\frac{K_p}{|D_s|}\mathbf V_\perp
}
$$

and

$$
\boxed{
\hat{\mathbf r}\cdot\mathbf A_{pR}
=
\hat{\mathbf r}\cdot\mathbf A_{pV}
=
\frac{K_pD_T}{|D_s|}
}.
$$

The transverse component is therefore the sharp one-row discriminator for
radial versus vector coupling: it changes one observable while holding the
root, $D_s$, $D_T$, separation, polarity, and radial acceleration fixed.

The corresponding acceleration moment about the historical source point is

$$
\mathbf M_A
\equiv
\mathbf r\times\mathbf A,
$$

$$
\boxed{
\mathbf M_{A,pR}=\mathbf0,
\qquad
\mathbf M_{A,pV}
=
-\frac{K_pr}{|D_s|}
\hat{\mathbf r}\times\mathbf V_\perp
}.
$$

$\mathbf M_A$ is an acceleration-first kinematic observable, not a new
substrate interaction quantity. A nonzero value increases the angular-momentum wake-ledger
burden; it does not prove a leak unless the full architrino-plus-wake ledger
fails to compensate it.

**Claim grade: derived.**

For the density axis, set both source and receiver velocities to zero. Then
$D_s=D_T=c_f$, and

$$
\|\mathbf A_S(r)\|
=
|\kappa_SQ_{ij}|r^{-2},
\qquad
\|\mathbf A_G(r)\|
=
|\kappa_GQ_{ij}|r^{-3}.
$$

The normalization-free discriminator is the logarithmic separation slope

$$
n
\equiv
-\frac{d\log\|\mathbf A\|}{d\log r},
\qquad
\boxed{n_S=2,\quad n_G=3}.
$$

Equivalently, at two separations $r_1\ne r_2$,

$$
\boxed{
\frac{\|\mathbf A_S(r_1)\|}{\|\mathbf A_S(r_2)\|}
=
\left(\frac{r_2}{r_1}\right)^2,
\qquad
\frac{\|\mathbf A_G(r_1)\|}{\|\mathbf A_G(r_2)\|}
=
\left(\frac{r_2}{r_1}\right)^3
}.
$$

Matching $\kappa_G$ to $\kappa_S$ at one radius cannot hide the mismatch at a
second radius. Three well-separated radii make the test robust against a
single normalization accident.

**Claim grade: derived.**

## Two-Architrino Discriminating Controls

### Control A: Pure Transverse Receiver Motion

Choose one certified partner root with the source stationary at emission and

$$
\mathbf V_j(S)=\mathbf0,
\qquad
\mathbf V_i(T)=\mathbf V_\perp,
\qquad
0<\|\mathbf V_\perp\|<c_f.
$$

Then $D_s=D_T=c_f$. The four predictions are

| Member | Radial component | Transverse component |
| --- | --- | --- |
| SR | $\kappa_SQ_{ij}\hat{\mathbf r}/r^2$ | $\mathbf0$ |
| SV | $\kappa_SQ_{ij}\hat{\mathbf r}/r^2$ | $-\kappa_SQ_{ij}\mathbf V_\perp/(c_fr^2)$ |
| GR | $\kappa_GQ_{ij}\hat{\mathbf r}/r^3$ | $\mathbf0$ |
| GV | $\kappa_GQ_{ij}\hat{\mathbf r}/r^3$ | $-\kappa_GQ_{ij}\mathbf V_\perp/(c_fr^3)$ |

This control separates the direction axis in one row without importing an
observer-level cross-product premise. The measured quantity is simply the component of the
per-hit acceleration orthogonal to the historical source-receiver line.

**Claim grade: derived. Falsifier for radial members:** a certified nonzero
$\mathbf A_\perp$ on this isolated row after the independent instrument's
error interval excludes zero. **Falsifier for vector members:** a certified
zero interval narrow enough to exclude the displayed nonzero prediction.

### Control B: Stationary Two-Radius Scaling

Set both architrinos stationary on two or more retained static controls and
compare the acceleration magnitudes without refitting the coupling. The
surface members predict exponent $2$; the gradient members predict exponent
$3$. Direction choice is irrelevant because $\mathbf C=c_f\hat{\mathbf r}$.

**Claim grade: derived. Falsifier for surface members:** a certified slope
interval excluding $2$. **Falsifier for gradient members:** a certified slope
interval excluding $3$.

### Control C: Same Radial Geometry, Changed Transverse Velocity

Hold $(r,\hat{\mathbf r},D_s,V_r)$ fixed across two manufactured simple-root
rows while changing only $\mathbf V_\perp$. SR and GR predict no instantaneous
change. SV and GV predict

$$
\Delta\mathbf A_\perp
=
-\frac{K_p}{|D_s|}\Delta\mathbf V_\perp.
$$

This finite difference removes the static radial term and is sharper than
comparing whole trajectories, because later root and line-of-action changes do
not enter the instantaneous result.

**Claim grade: derived.**

## Complete Pairwise Discriminator Table

| Pair | Sharpest observable | First member predicts | Second member predicts |
| --- | --- | --- | --- |
| SR vs SV | $\mathbf A_\perp$ in Control A or C | $\mathbf0$ | $-\kappa_SQ_{ij}\mathbf V_\perp/(|D_s|r^2)$ |
| GR vs GV | $\mathbf A_\perp$ in Control A or C | $\mathbf0$ | $-\kappa_GQ_{ij}\mathbf V_\perp/(|D_s|r^3)$ |
| SR vs GR | Static slope $n$ | $2$ | $3$ |
| SV vs GV | Static slope $n$ | $2$ | $3$ |
| SR vs GV | $\mathbf A_\perp$ first; static slope second | zero; $2$ | nonzero; $3$ |
| SV vs GR | $\mathbf A_\perp$ first; static slope second | nonzero; $2$ | zero; $3$ |

**Claim grade: derived.** These controls discriminate the declared equations.
They do not count as evidence until evaluated by an independent analytic or
numerical instrument.

## Three-Axis Falsification Protocol

The same retained input record must be replayed under each member. Only the
per-hit response rule changes. Root finding, branch identity, $D_s$, $D_T$,
polarity, history coverage, regularization, and accumulation order remain
fixed. The ledger may use the universal $\mu_{\mathrm{arch}}$ conversion for
energy, momentum, and angular-momentum bookkeeping; this does not alter the
substrate acceleration law.

### Axis 1: Internal Ledger Closure

For an isolated retained window, record certified residuals for total energy,
momentum, and angular momentum of architrinos plus causal wakes under one
common action and boundary convention. A member fails if a residual interval
excludes zero under refinement and regulator convergence, with no declared
wake-history or boundary term that accounts for it.

The vector members have an additional load-bearing row:
$\mathbf r\times\mathbf A\ne\mathbf0$ for transverse receiver motion. That is
not automatically a failure, but the wake ledger must carry the compensating
angular response. The surface and gradient radial members have zero per-hit
acceleration moment about the historical source point, while delayed pair
nonreciprocity still requires a full wake ledger.

**Claim grade: derived test specification; current result: unmeasured.** The
live scalar-action discussion does not yet close the receiver-normal residual
for SR, and no corresponding action derivation exists here for SV, GR, or GV.

### Axis 2: Anchored Statics and Downstream Recovery

The first anchor is the static inverse-square response. SR and SV pass its
radial scaling by construction. GR and GV predict inverse-cube response and
therefore conflict with that anchor as direct per-hit laws. A one-radius
normalization match is not a pass.

The next independent anchors are the Darwin-order coefficient, later Lorentz
recovery, and other observer-level tested behavior. Those are recovery targets,
not architrino-level premises. A member is falsified if its natively derived
coefficient misses an anchored value that a competitor reaches under the same
independent comparison protocol.

**Claim grade: derived for the static scaling comparison; inferred for the
current evidentiary consequence; unmeasured here for Darwin-order and Lorentz
recovery.**

### Axis 3: Discriminating Regime

Use Control A or C for the direction axis and Control B for the density axis.
At least one side of the comparison must be an independently authored closed
form or oracle. Running the production EOM solver against a fixture generated
from the same production formula is not independent evidence.

**Claim grade: derived test specification; current result: unmeasured.**

## Per-Member Falsifiers

| Member | Internal-ledger falsifier | Anchored-statics/recovery falsifier | Discriminating-regime falsifier | Current status |
| --- | --- | --- | --- | --- |
| **SR** | Any refined energy, momentum, or angular-momentum residual excludes zero with no compensating wake/boundary row under the SR action convention. | Static slope excludes $2$, or a native Darwin/Lorentz derivation misses an anchored coefficient that another member reaches. | Independent Control A/C gives $\mathbf A_\perp\ne\mathbf0$, or Control B excludes $n=2$. | Implemented canon; static shape passes by construction; internal and velocity-dependent recovery closure remain open. |
| **SV** | The transverse acceleration moment or transverse work channel leaves an uncompensated refined ledger residual. | Static slope excludes $2$, or the SV Darwin/Lorentz coefficient misses the anchor. | Independent Control A/C returns zero while excluding the displayed nonzero $\mathbf A_\perp$. | Static shape survives; no native transverse-response derivation, accepted ledger, or discriminating evidence found. |
| **GR** | The delayed gradient rule leaves any uncompensated refined ledger residual. | The required static inverse-square anchor is retained as a direct per-hit requirement; GR gives $n=3$. | Independent Control B excludes $n=3$, or Control A finds a nonzero transverse component. | Conflicts with the declared static anchor as a direct per-hit law; otherwise mathematically compatible with delta collapse. |
| **GV** | The transverse gradient channel leaves any uncompensated refined ledger residual. | The required static inverse-square anchor is retained; GV gives $n=3$, or later recovery coefficients fail. | Control A/C returns zero while excluding GV's nonzero prediction, or Control B excludes $n=3$. | Carries both unsupported choices and conflicts with the declared static anchor. |

**Claim grade: derived for the falsifier logic; inferred for the current-status
summaries.**

## Evidence Ranking

1. **SR — strongest current standing.** It is the live canonical and
   implemented member, preserves the derived $1/|D_s|$ factor, uses the actual
   scalar level-set crossing rate, and has the required static inverse-square
   form. Its lead is conventional and compatibility-based, not proof: the use
   of $|D_T|$ as acceleration weight, the radial surface-density coupling, the
   full conservation ledger, and the discriminating recovery coefficients are
   not closed by this analysis.
2. **SV — second.** It preserves the simple-root denominator and static
   inverse-square anchor, so it survives more current constraints than either
   gradient member. It adds a transverse acceleration and acceleration moment
   not supplied by the scalar causal-surface crossing identity. No accepted
   wake ledger or independent transverse signal currently supports that added
   structure.
3. **GR — third.** It preserves line-of-action response and the forced
   $1/|D_s|$ denominator, but differentiating the derived surface density gives
   a static inverse-cube law. It therefore conflicts with the declared static
   inverse-square anchor unless that anchor is explicitly rescoped away from
   the bare per-hit law and an independent emergence derivation replaces it.
4. **GV — fourth.** It inherits the gradient member's static scaling conflict
   and the vector member's unsupported transverse channel. Either independent
   discriminator can falsify it.

**Claim grade: inferred from current live equations, implementation, and the
declared falsification anchors.** This is an evidence-standing rank, not a
posterior probability and not a proof of SR.

## Verdict

The delta-collapse mathematics proves less than the canonical prose sometimes
suggests and more than a completely free sampling ansatz would allow. It forces
the source-normal denominator and forces $D_T/D_s$ as root transport. It also
forces $D_T$ to be radial if the numerator is interpreted as a scalar wake-
surface crossing rate. It does not force acceleration to consume that rate,
does not force acceleration to sample surface density rather than its gradient,
and does not prevent a separately postulated transverse response.

The shortest decisive experiment is therefore two-part:

1. an independently evaluated transverse-velocity control, which returns
   exactly zero for SR/GR and a specified nonzero vector for SV/GV; and
2. an independently evaluated stationary separation slope, which returns
   exactly $2$ for SR/SV and $3$ for GR/GV.

Those two observables identify all four members without fitting their coupling
normalizations. The three-axis arbitration then rejects any survivor that
cannot close its own architrino-plus-wake ledger or recover the anchored
effective behavior.

**Claim grade: derived discriminator conclusion; current physical verdict:
unmeasured.** SR remains the best-supported working member, but its sampling
rule remains a postulate pending independent ledger and recovery closure.
