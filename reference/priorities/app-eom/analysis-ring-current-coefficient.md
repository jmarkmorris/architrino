# Canonical Current Coefficient of a Neutral Drifting Ring

## Finding in plain language

The closed ring does **not** restore the missing canonical current response.
For a uniformly populated circular loop, changing from source labels on the
common absolute-time slice to causal-emission angle produces the same exact
Jacobian as P1's straight line:

$$
\frac{d\xi}{dy}=\frac{D_s}{c_f}.
$$

That factor cancels the canonical source-normal denominator in
$W^{\mathrm{rec}}=D_T/D_s$. The remaining integrand depends on the loop
geometry and receiver velocity, but not on the source drift. The two polarity
populations therefore cancel exactly under common-slice neutrality. At the
ring center and everywhere on its symmetry axis,

$$
\boxed{
C_{B,\mathrm{can}}^{\mathrm{ring}}(z)=0,
\qquad
C_{B,\mathrm{D}}^{\mathrm{ring}}(z)=1,
\qquad
\frac{C_{B,\mathrm{can}}^{\mathrm{ring}}}
{C_{B,\mathrm{D}}^{\mathrm{ring}}}=0.
}
$$

This is an **exact ring null**, not a null through only one order in curvature
or $u/c_f$. The magnetostatic benchmark remains nonzero and has the axial
factor $R_{\mathrm{ring}}^2/(R_{\mathrm{ring}}^2+z^2)^{3/2}$. Thus a ring
instrument is a clean independent verification target for the canonical null,
but it does not reopen a per-hit magnetism route. P11's consequence remains:
the missing magnetism recovery belongs to Path B, meaning bound structure
and/or Noether sea constitutive response, unless a different independently
derived per-hit law is introduced.

**Claim grade: derived** for both coefficients and their ratio, conditional on
the canonical positive-normal branch law, prescribed uniform circular drift,
common-slice neutrality, and the continuum ring measure stated below.
**Claim grade: inferred** for the Path B program consequence; the calculation
does not derive the Path B mechanism. The coefficient claim is falsified if a
source-identity sum using the same causal root in $r$, $D_s$, $D_T$, and the
source-label measure leaves any nonzero term proportional to
$\mathcal J\mathbf V$ after the two populations are summed.

## Scope and native ring setup

Let

$$
R\equiv R_{\mathrm{ring}},
\qquad
\mathbf X_{\mathrm{ring}}(y)=R\,\mathbf e_r(y),
\qquad
\mathbf e_r(y)=(\cos y,\sin y,0),
\qquad
\mathbf e_\phi(y)=(-\sin y,\cos y,0).
$$

There are two source populations, $\alpha\in\{+,-\}$, with uniform signed
line densities and prescribed angular velocities

$$
\Lambda_+=+\Lambda,
\qquad
\Lambda_-=-\Lambda,
\qquad
\omega_+=+\frac{u}{2R},
\qquad
\omega_-=-\frac{u}{2R}.
$$

Their common-slice net line density and conventional signed current are

$$
\sum_\alpha\Lambda_\alpha=0,
\qquad
\mathcal J
\equiv
\sum_\alpha \Lambda_\alpha R\omega_\alpha
=\Lambda u.
$$

The standard current symbol $\mathcal J$ is used only as compact bookkeeping
for the comparison after the native sum. No magnetic acceleration law is
inserted into the substrate calculation.

At reception time $T$, place the receiver at the event

$$
\mathbf X_i(T)=\mathbf x,
\qquad
\mathbf V_i(T)=\mathbf V.
$$

For the requested axis calculation,

$$
\mathbf x=z\,\mathbf e_z,
\qquad
r_0=\sqrt{R^2+z^2}.
$$

The ring center is the specialization $z=0$. The moving-receiver calculation
is instantaneous at that event: $\mathbf V$ may have transverse and axial
components even though a receiver with transverse velocity subsequently
leaves the axis. Assume

$$
\frac{|u|}{2}<c_f,
\qquad
\|\mathbf V\|<c_f.
$$

Then $D_s>0$ and $D_T>0$ on every active branch, so the canonical unsigned
weight equals the signed positive-normal ratio $D_T/D_s$. Each source identity
has one simple causal root because
$D_s\ge c_f-|u|/2>0$ makes the causal-root map strictly monotone.

**Claim grade: derived** for neutrality, current, the positive-normal floors,
and root uniqueness; **declared** for the prescribed uniform-drift scope. A
second causal root or a sign-changing normal within these speed bounds would
falsify the stated branch chart.

## Closed-loop causal-delay transport

### Source identities and causal-emission angle

Label one source identity of population $\alpha$ by its angle $\xi$ on the
common slice $T$. At the selected emission time $S<T$, define

$$
\tau=T-S,
\qquad
y=\xi-\omega_\alpha\tau.
$$

The source emission event is $R\mathbf e_r(y)$, so

$$
\mathbf r(y)=\mathbf x-R\mathbf e_r(y),
\qquad
r(y)=\|\mathbf r(y)\|,
\qquad
\hat{\mathbf r}(y)=\frac{\mathbf r(y)}{r(y)}.
$$

The native causal constraint is $r(y)=c_f\tau$. Eliminating $\tau$ gives the
implicit label map

$$
\boxed{
\xi=y+\frac{\omega_\alpha}{c_f}r(y).
}
$$

Curvature is present here: in reception-slice label coordinates $\xi$, the
emission angle $y$ depends on how far the source rotates during the causal
delay. Thus the straight-line affine relation is not available. However, once
$y$ is used as the integration coordinate, $\mathbf r(y)$ and
$\hat{\mathbf r}(y)$ contain no $\omega_\alpha$.

**Claim grade: derived.** The geometry statement is falsified if solving the
same causal constraint for a fixed emission angle leaves an explicit source
drift in $\mathbf x-R\mathbf e_r(y)$.

### Exact measure identity

Differentiate the distance around the loop:

$$
\frac{dr}{dy}
=
\hat{\mathbf r}\cdot\frac{d\mathbf r}{dy}
=
-R\hat{\mathbf r}\cdot\mathbf e_\phi(y).
$$

The source velocity at emission is

$$
\mathbf U_\alpha(y)=R\omega_\alpha\mathbf e_\phi(y),
$$

so the source-normal denominator is

$$
D_{s,\alpha}
=c_f-\hat{\mathbf r}\cdot\mathbf U_\alpha
=c_f-\omega_\alpha R\hat{\mathbf r}\cdot\mathbf e_\phi.
$$

The label map therefore has the exact Jacobian

$$
\boxed{
\frac{d\xi}{dy}
=1+\frac{\omega_\alpha}{c_f}\frac{dr}{dy}
=1-\frac{\omega_\alpha R}{c_f}
\hat{\mathbf r}\cdot\mathbf e_\phi
=\frac{D_{s,\alpha}}{c_f}.
}
$$

This is the same one-power balance as P1. Curvature changes the tangent
$\mathbf e_\phi(y)$ as $y$ changes, but it changes the label Jacobian and
$D_s$ in exactly the same way.

Because $D_s>0$, the map is orientation preserving. Its periodicity is
$\xi(y+2\pi)=\xi(y)+2\pi$, so one complete common-slice ring maps onto one
complete causal-emission ring with no endpoint term. This closed-domain fact
replaces the straight line's decay at infinite endpoints.

**Claim grade: derived.** The falsifier is either a mismatch between the
displayed Jacobian and $D_s/c_f$, or a failure of the map to have degree one
while the declared positive-normal floor remains valid.

### Receiver-normal factor and population sum

For the same causal root,

$$
D_T(y)=c_f-\hat{\mathbf r}(y)\cdot\mathbf V,
\qquad
\frac{dS}{dT}=\frac{D_T}{D_s},
\qquad
W^{\mathrm{rec}}=\frac{D_T}{D_s}.
$$

The root-transport equation and the acceleration weight use the same
receiver-normal numerator, as required by the canonical law. For one
population, the continuum acceleration is

$$
\mathbf A_\alpha(\mathbf x,\mathbf V)
=
\kappa q_i\Lambda_\alpha R
\int_0^{2\pi}
d\xi\,
\frac{D_T}{D_{s,\alpha}}
\frac{\hat{\mathbf r}}{r^2}.
$$

Changing to $y$ gives

$$
\boxed{
\mathbf A_\alpha(\mathbf x,\mathbf V)
=
\kappa q_i\Lambda_\alpha R
\int_0^{2\pi}
dy\,
\left(1-\frac{\hat{\mathbf r}\cdot\mathbf V}{c_f}\right)
\frac{\hat{\mathbf r}}{r^2}.
}
$$

Every dependence on $\omega_\alpha$ has disappeared before polarity summation.
Consequently

$$
\boxed{
\mathbf A_{\mathrm{ring}}^{\mathrm{can}}
=
\sum_\alpha\mathbf A_\alpha
=\mathbf0
}
$$

for every receiver event away from the loop itself, not only on the axis,
under the declared uniform circular populations and positive-normal chart.
The requested center and axis nulls are therefore specializations of a
stronger closed-loop result.

**Claim grade: derived and exact.** No expansion in $u/c_f$ or $1/R$ is
needed. The result excludes all terms proportional to
$u^m\mathbf V^n/R^p$ with $m>0$ in this prescribed continuum geometry, not
only the first curvature-order term. The claim is falsified by a surviving
$\omega_\alpha$ in the boxed emission-coordinate integral.

## What survives P1 and what changes on the ring

| P1 step | Closed-ring result | Grade |
| --- | --- | --- |
| Express geometry in a causal-emission coordinate. | Survives. The ring uses emission angle $y$ rather than emission coordinate on a straight line; $\mathbf r(y)$ and $\hat{\mathbf r}(y)$ are drift-independent. | **Derived.** |
| Transport the common-slice source measure. | Survives exactly: $d\xi/dy=D_s/c_f$. Curvature rotates the tangent but does not change the identity. | **Derived.** |
| Cancel the one delta-collapse denominator. | Survives exactly: $d\xi\,(D_T/D_s)=dy\,D_T/c_f$. | **Derived.** |
| Remove boundary terms. | The mechanism changes. The line uses the infinite-domain limit; the ring uses periodic degree-one closure, so there are no endpoints. | **Derived.** |
| Use straight-line closed-form integrals. | Does not survive. Ring integrals use circular symmetry and the axial distance $r_0$. | **Derived.** |
| Allow source drift to survive through curvature. | Does not occur for a complete uniform ring. Drift appears in $y(\xi)$ but is erased by the exact measure transport before summation. | **Derived.** |

The premise that curvature by itself might defeat P1 is therefore resolved
negatively. Curvature changes the coordinate relation but not the one-power
transport balance. A nonzero current response requires a broken hypothesis:
an incomplete arc, nonuniform or species-dependent density, different source
tracks, deformation, a non-simple branch chart, or a law with additional
source-velocity structure. Those cases are not coefficients of the prescribed
uniform ring.

**Claim grade: derived** for the listed transport distinctions; **inferred**
that the named broken hypotheses are the relevant routes to a nonzero native
instrument residual. That inference is falsified if a nonzero residual occurs
while every declared symmetry, measure, branch, and law is retained exactly.

## Center and symmetry-axis evaluation

On the axis,

$$
r(y)=r_0=\sqrt{R^2+z^2},
\qquad
\hat{\mathbf r}(y)
=\frac{-R\mathbf e_r(y)+z\mathbf e_z}{r_0}.
$$

Since $\mathbf e_\phi\cdot\mathbf e_r=0$ and
$\mathbf e_\phi\cdot\mathbf e_z=0$,

$$
D_{s,\alpha}=c_f,
\qquad
y=\xi-\frac{\omega_\alpha r_0}{c_f}.
$$

Thus each population is merely rotated by a constant causal-delay angle.
Uniformity makes that rotation invisible even before invoking a nontrivial
Jacobian.

For diagnostic clarity, the full single-population row is

$$
\boxed{
\begin{aligned}
\mathbf A_\alpha(z,\mathbf V)
={}&
\frac{2\pi\kappa q_i\Lambda_\alpha Rz}{r_0^3}\mathbf e_z\\
&-
\frac{\pi\kappa q_i\Lambda_\alpha R}{c_fr_0^4}
\left[
R^2\mathbf V_\perp
+2z^2V_z\mathbf e_z
\right],
\end{aligned}
}
$$

where

$$
\mathbf V_\perp
=\mathbf V-(\mathbf V\cdot\mathbf e_z)\mathbf e_z,
\qquad
V_z=\mathbf V\cdot\mathbf e_z.
$$

The first row is the single-population static radial acceleration integrated
around the loop. The second is the integrated canonical receiver-normal row.
Both are proportional to signed line density $\Lambda_\alpha$ and neither
depends on its drift. They cancel pairwise for the neutral ring.

At the center, $z=0$ and $r_0=R$, so

$$
\mathbf A_\alpha(0,\mathbf V)
=-
\frac{\pi\kappa q_i\Lambda_\alpha}{c_fR}
\mathbf V_\perp,
\qquad
\sum_\alpha\mathbf A_\alpha(0,\mathbf V)=\mathbf0.
$$

For a receiver at rest, $\mathbf V=\mathbf0$, the current-odd response is
zero at the center and on the axis. For a moving receiver, the entire
current-odd, receiver-velocity-linear response is also zero. The displayed
single-population receiver row is charge-odd and current-even; it is not an
axial magnetic analogue.

**Claim grade: derived.** A direct circular integration of either
$\hat{\mathbf r}/r_0^2$ or
$\hat{\mathbf r}\hat{\mathbf r}^{\mathsf T}/r_0^2$ that changes the displayed
coefficients falsifies this evaluation.

## Darwin and magnetostatic loop benchmark

This section is comparison-only effective physics. It enters after the native
calculation and is not used as an architrino-level premise.

P1's shared normalization identifies

$$
\frac{\mu_0}{4\pi}=\frac{\kappa}{c_f^2}
$$

for the benchmark comparison. The standard axial field of a circular current
loop is independently derived in OpenStax, *University Physics Volume 2*,
[Section 12.4, equations 12.15 and 12.17](https://openstax.org/books/university-physics-volume-2/pages/12-4-magnetic-field-of-a-current-loop).

Using the same $\mathcal J$, $R$, and $c_f$ normalization as P1, the benchmark
can also be integrated directly:

$$
\begin{aligned}
\boldsymbol{\mathcal B}_{\mathrm D}(z)
&=
\frac{\kappa\mathcal J}{c_f^2}
\oint
\frac{d\boldsymbol\ell\times\hat{\mathbf r}}{r_0^2}\\
&=
\boxed{
\frac{2\pi\kappa\mathcal J R^2}
{c_f^2(R^2+z^2)^{3/2}}
\mathbf e_z
}.
\end{aligned}
$$

At the center,

$$
\boldsymbol{\mathcal B}_{\mathrm D}(0)
=
\frac{2\pi\kappa\mathcal J}{c_f^2R}\mathbf e_z.
$$

The benchmark receiver-velocity-linear acceleration is therefore

$$
\boxed{
\mathbf A_{\mathrm D,V}^{\mathrm{ring}}(z)
=
\frac{2\pi\kappa q_i\mathcal J R^2}
{c_f^2(R^2+z^2)^{3/2}}
\mathbf V\times\mathbf e_z.
}
$$

A receiver at rest has no such velocity-linear row. A receiver moving along
the axis also has no such row because
$\mathbf V\times\mathbf e_z=\mathbf0$. A transverse receiver velocity is the
discriminating orientation.

**Claim grade: derived** for the loop integration of the stated benchmark;
**source-backed derived recovery target** for the magnetostatic formula. Its
falsifier is a Biot-Savart integration in the shared normalization that yields
an axial factor other than
$2\pi\kappa\mathcal J R^2/[c_f^2(R^2+z^2)^{3/2}]$.

## Coefficient extraction and verdict

Define the ring coefficient at an axial receiver event by

$$
\mathbf A_{V,\mathrm{current\text{-}odd}}^{\mathrm{ring}}(z)
\equiv
C_B^{\mathrm{ring}}(z)
\frac{2\pi\kappa q_i\mathcal J R^2}
{c_f^2(R^2+z^2)^{3/2}}
\mathbf V\times\mathbf e_z.
$$

Then

| Response | $C_B^{\mathrm{ring}}(z)$ | Difference from benchmark | Grade |
| --- | ---: | ---: | --- |
| Canonical receiver-normal branch law | $0$ exactly | $-1$ | **Derived.** |
| Darwin/magnetostatic loop | $1$ | $0$ | **Source-backed recovery target; direct integral derived.** |

The verdict is

$$
\boxed{\text{exact ring null}.}
$$

There is no surviving $O(u\|\mathbf V\|/c_f^2)$ curvature response, nor a
higher curvature-order response, within the prescribed continuum ring. The
canonical law misses the full axial loop coefficient just as it misses the
full P1 line coefficient.

**Claim grade: derived.** The immediate **inferred** Path B consequence is
that replacing the infeasible straight stream with a ring changes the
instrument geometry and removes endpoint/tail burdens, but does not change
the current-recovery routing. A nonzero accepted canonical ring result would
falsify this derivation or expose a mismatch between the analytic continuum
scope and the native realization; it would not by itself identify which one.

## Ring-instrument parity observable

Let $s=\pm1$ reverse the source-ring current and $p=\pm1$ reverse a chosen
transverse receiver velocity $\mathbf V_0$. Let
$\mathbf A_{s,p}$ be the same declared receiver observable extracted from the
four parity-related realizations. The doubly odd projection is

$$
\boxed{
\mathbf A_{oo}
=\frac14
\left(
\mathbf A_{+,+}
-\mathbf A_{+,-}
-\mathbf A_{-,+}
+\mathbf A_{-,-}
\right).
}
$$

It removes current-even receiver-normal contamination and
receiver-velocity-even geometric acceleration. The normalized coefficient
estimator is

$$
\boxed{
\widehat C_B^{\mathrm{ring}}(z)
=
\frac{
\mathbf A_{oo}\cdot(\mathbf V_0\times\mathbf e_z)
}{
\displaystyle
\frac{2\pi\kappa q_i\mathcal J R^2}
{c_f^2(R^2+z^2)^{3/2}}
\|\mathbf V_0\times\mathbf e_z\|^2
}.
}
$$

The prescribed analytic targets are

$$
\widehat C_{B,\mathrm{can}}^{\mathrm{ring}}=0,
\qquad
\widehat C_{B,\mathrm{D}}^{\mathrm{ring}}=1.
$$

The complementary current-odd rest-receiver projection,

$$
\mathbf A_{J\text{-odd},V=0}
=\frac12\left(\mathbf A_{+,0}-\mathbf A_{-,0}\right),
$$

must also vanish in the ideal geometry. A nonzero value is therefore a direct
diagnostic of parity preparation, density, geometry, history, or extraction
contamination rather than the requested magnetic analogue.

**Claim grade: derived** for the parity algebra and normalization;
**inferred** for its diagnostic use in a native realization. The projection
claim is falsified if a term even in either $\mathcal J$ or $\mathbf V_0$
survives the four-run combination under exact parity-related inputs.

## Native-realization deformation budget

The analytic result uses prescribed uniform circular drift. A native
two-ring or ring-plus-test-path realization must evolve under the unmodified
EOM solver, so the rings and the receiver path need not preserve that
geometry. The instrument should therefore keep the analytic coefficient and
the deformation budget as separate rows.

1. **Charge-density and current-density parity.** Track the two populations'
   angular density modes separately. A current-odd density ripple multiplying
   a charge-even acceleration can enter the same doubly odd channel as the
   target. Net charge, dipole, and the lowest angular density modes should be
   bounded on the extraction window.
2. **Radius, center, plane, and thickness.** Track mean radius, radial spread,
   ring-center displacement, plane-normal tilt, and any out-of-plane
   thickness. These quantities change the axial normalization and can rotate
   a geometric acceleration into the transverse projection.
3. **Current preservation.** Track each population's signed angular transport
   and the resulting $\mathcal J(T)$. A decaying or phase-mixed current should
   be normalized from the same accepted time window, not from its initial
   value alone.
4. **Parity-paired evolution.** Current reversal and receiver-velocity
   reversal must begin from exact parity-related histories. The four native
   trajectories can deform differently; the mismatch between parity-mapped
   geometry records is part of the observable's error budget rather than an
   unreported correction.
5. **Causal-history preparation.** A closed ring removes spatial endpoints and
   straight-stream tail truncation, but not history preparation. Periodic
   prescribed prehistory or another declared endpoint-matched history must
   keep startup transients outside the coefficient window.
6. **Branch integrity.** The analytic proof assumes one positive-normal simple
   root per source identity. Native records must bound $D_s$ away from zero,
   preserve root identity over the extraction window, and report any
   additional root or finite-width transition separately.
7. **Receiver-path symmetry.** A ring-plus-test-path realization should use a
   transverse center or axis crossing, since axial receiver motion has zero
   benchmark signal. The test-path position, velocity, and timing must be
   parity-matched at the extraction event. A two-ring realization needs the
   corresponding integrated receiver-ring momentum-transfer projection, with
   internal self-response separated from source-ring response.

These are qualitative budget categories, not measured cost or tolerance
claims. The smallest defensible native objective is to test whether the
doubly odd interval contains zero while all seven deformation and branch rows
remain within predeclared bounds. A nonzero interval that excludes zero is
scientifically interpretable only after those rows exclude deformation and
parity leakage at a smaller scale.

**Claim grade: inferred instrument design requirements** from the analytic
symmetries and the EOM solver's native-evolution obligation. No execution,
profile, feasibility, or numerical precision claim is made. The inference is
falsified by an independently specified observable that provably cancels one
of these deformation classes without measuring it, or by showing that the
class cannot couple into the doubly odd projection.

## Claim disposition

- **Priority-only:** this derived result belongs in the P17 analysis packet
  under the strict one-file authority of this task.
- **Promotion target:** the exact closed-loop transport lemma may later be
  promoted beside P1's straight-line result if the operator authorizes a canon
  integration pass.
- **Deferred with blocker:** a native ring instrument specification is deferred
  until its parity-related deformation bounds, accepted evidence route, and
  receiver observable are frozen independently of visible scientific output.

No numerical run or measured result is used in this analysis.
