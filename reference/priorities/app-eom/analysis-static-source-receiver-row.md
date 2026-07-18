# Static-Source First-Order Receiver Row

Status: analysis-only, priority-only. This file changes no canonical law,
observer map, EOM solver behavior, or evidence status. No run was performed.

## Verdict

**Verdict: falsifies-the-weight against the static-source electrodynamics
recovery anchor.** On the positive-normal static-source chart, the canonical
receiver-normal acceleration weight makes the substrate radial acceleration
depend on the receiver's radial velocity at first order. The Lorentz clock and
ruler factors available to a source-rest observer begin at second order in
speed. First-order Doppler factors exist, but they change a remotely received
signal rate; they do not change a co-located trajectory, an orbit shape, or a
source-rest acceleration comparison. None of the named observer-level
candidates therefore cancels the row without changing another anchored
observable or introducing a separately fitted, source-dependent map.

**Claim grade: derived on the declared static-source chart and conditional on
the independently anchored Maxwell/Darwin comparison used by
[P11](analysis-two-body-darwin-match.md); inferred for the program-level word
`falsifies`.** The verdict is overturned by one independently derived,
same-record observer closure map that cancels the row in source-rest orbit,
fall, and local clock/ruler observables while retaining ordinary first-order
Doppler response, second-order Lorentz clock/ruler response, and the other
P11 coefficients without per-observable retuning.

This verdict does not prove that every possible bound-assembly or Noether sea
response is unable to compensate the row. A new compensating dynamical channel
could do so in principle. Such a channel would be additional dynamics, not an
observer-coordinate absorption, and it would carry its own universality,
conservation, and recovery burdens. It therefore cannot be counted as support
for the present use of $D_T$ as a universal acceleration weight.

**Claim grade: inferred scope qualification.** A derived common assembly
response that supplies the required cancellation from the same retained
record would falsify this qualification's statement that the burden is still
open, but it would not turn the current bare weight into a derived result.

## Static-Source Row in Substrate Coordinates

Let source $j$ be stationary in the Euclidean void and let receiver $i$ be on
a retained positive-delay simple root. Write

$$
\mathbf R
=
\mathbf X_i(T)-\mathbf X_j,
\qquad
R=\|\mathbf R\|,
\qquad
\mathbf N=\frac{\mathbf R}{R},
$$

$$
\mathbf V=\frac{d\mathbf X_i}{dT},
\qquad
V_R=\mathbf N\cdot\mathbf V=\frac{dR}{dT},
\qquad
h=\frac{V_R}{c_f}.
$$

For a stationary source,

$$
D_s=c_f,
\qquad
D_T=c_f-V_R=c_f(1-h),
$$

and the delayed source position, present source position, and source-rest
line of action coincide. On the sub-field-speed chart $D_T>0$, so signed and
unsigned receiver-normal conventions agree. If

$$
\mathbf A_0(R)
=
\kappa Q_{ij}\frac{\mathbf N}{R^2},
\qquad
Q_{ij}=\sigma_{ij}|q_iq_j|,
$$

then the canonical row is exactly

$$
\boxed{
\mathbf A_{\mathrm{can}}(T)
=
\frac{d^2\mathbf X_i}{dT^2}
=
\left(1-\frac{V_R}{c_f}\right)\mathbf A_0(R)
}
$$

on this chart. Its first-order defect relative to the static inverse-square
anchor is

$$
\boxed{
\delta\mathbf A
=
-\frac{V_R}{c_f}\mathbf A_0(R).
}
$$

This is the $-h\mathbf N$ row isolated by P11. It is cargo-independent,
source-velocity-independent, and already present for one static source.

**Claim grade: derived by exact specialization of the canonical branch law.**
The row is falsified as written by a same-record evaluation with stationary
source, fixed $(R,\mathbf N,\mathbf V)$, $D_s=c_f$, and a canonical acceleration
that does not equal the boxed expression.

### Instantaneous radial acceleration

Two receiver states at the same position with radial velocities
$\mathbf V_{\pm}=\pm v_R\mathbf N+\mathbf V_\perp$ satisfy

$$
\boxed{
\mathbf A_{\mathrm{can}}(\mathbf V_+)
-
\mathbf A_{\mathrm{can}}(\mathbf V_-)
=
-2\frac{v_R}{c_f}\mathbf A_0(R).
}
$$

Outward and inward passages through the same substrate position therefore
have different radial coordinate accelerations at first order. Transverse
receiver velocity does not enter this particular row.

**Claim grade: derived.** The falsifier is equality of the two canonical
accelerations for any $v_R\ne0$ while the declared row and geometry are held
fixed.

### Orbit shape and radial-cycle stability

For planar motion, the substrate equations are

$$
\ddot R-R\dot\theta^2
=
a_0(R)\left(1-\frac{\dot R}{c_f}\right),
\qquad
R\ddot\theta+2\dot R\dot\theta=0,
$$

where $\mathbf A_0=a_0(R)\mathbf N$ and dots denote $d/dT$. Thus
$R^2\dot\theta$ remains constant, but the radial equation contains a term
linear in $\dot R$. If the static baseline admits a potential $\Phi$ with
$a_0=-d\Phi/dR$, the baseline mechanical diagnostic

$$
E_T=\frac12\|\mathbf V\|^2+\Phi(R)
$$

obeys

$$
\boxed{
\frac{dE_T}{dT}
=
-\frac{a_0(R)}{c_f}\dot R^2.
}
$$

For an attractive baseline, $a_0<0$, this row pumps the diagnostic energy on
both the inward and outward legs; for a repulsive baseline it removes it. The
effect vanishes on an exactly circular orbit with $\dot R=0$, but a small
radial perturbation about a circular attractive branch carries a negative-
damping term. Orbit closure, radial amplitude, and apsidal passage therefore
receive first-order-in-radial-speed changes in substrate coordinates.

**Claim grade: derived for the radial equation and energy identity;
inferred for long-time orbit morphology because the complete delayed
multi-root dynamics and assembly response are not included.** The derived
claim is overturned if direct differentiation gives a different energy row.
The morphology inference is overturned by a complete retained-history orbit
whose first-order correction cancels after all omitted rows are included.

### Fall rates

A receiver released from rest has no instantaneous $-h\mathbf N$ correction at
the release event. Once radial speed develops, its source-rest acceleration is
changed by the fractional amount $-V_R/c_f$. An inward attractive fall has
$V_R<0$ and therefore a larger inward acceleration magnitude than the static
baseline; an outward leg has a smaller instantaneous attractive magnitude but
the energy identity above still gives a positive secular contribution. The
substrate fall time and the velocity reached at a fixed $R$ consequently shift
at order $v_{\mathrm{fall}}/c_f$ unless another dynamical row cancels the
effect.

**Claim grade: derived for the local acceleration sign and order; inferred
for an integrated fall-time shift.** A complete same-record fall solution with
a vanishing first-order difference at fixed endpoints would falsify the
integrated inference, not the displayed local row.

### Spectroscopy analogue

A substrate-level architrino has no primitive spectroscopic observable.
Spectral lines belong to assembly clocks and photon-channel comparison.
Nevertheless, any bound assembly whose counted cycle contains radial motion
samples the velocity-odd acceleration row. Linearizing a candidate circular
attractive branch gives a radial-cycle equation of the schematic form

$$
\delta\ddot R
+\frac{a_0(R_0)}{c_f}\delta\dot R
+\omega_R^2\delta R
=
\text{other retained-history rows}.
$$

Because $a_0(R_0)<0$, the displayed contribution is negative damping. If it
survives assembly summation, it changes cycle amplitude and phase and therefore
can appear as a cadence drift, line shift, or line broadening. An exactly
circular internal branch is blind to the row, as was P1's neutral line for a
different cancellation reason.

**Claim grade: derived for the displayed contribution conditional on the
declared linearization; inferred for any spectroscopic readout.** The
spectroscopy inference is falsified if the independently derived assembly
clock and photon map cancels this contribution while retaining all other
recovery anchors.

## Observer-Level Absorption Candidates and Their Orders

The relevant comparison frame is the rest frame of the static source. Its
laboratory clocks and rulers need not move with the receiver. A receiver-carried
clock can describe the same trajectory in its own readout, but that does not
remove a source-rest interaction-acceleration mismatch.

**Claim grade: derived frame identification for the P11 benchmark.** It is
overturned only if the benchmark being matched is shown not to be the
static-source rest-frame interaction used in P11.

| Candidate | Leading speed order in the homogeneous source-rest limit | Can it cancel $-h\mathbf N$? | Claim grade and falsifier |
| --- | --- | --- | --- |
| Moving assembly proper-time retuning | $d\tau/dT=1-\tfrac12v^2/c_\star^2+O(v^4/c_\star^4)$: second order and even under $\mathbf V\mapsto-\mathbf V$ | No. Re-expressing acceleration with this clock changes the row only at second order. | **Derived from the declared Lorentz clock target.** Falsifier: a same-branch clock derivation produces a universal first-order term proportional to $\mathbf N\cdot\mathbf V$ while preserving Lorentz clock comparisons. |
| Moving ruler contraction | $L_\parallel/L_0=1-\tfrac12v^2/c_\star^2+O(v^4/c_\star^4)$: second order and even | No. Source-rest positions are measured by source-rest rulers, and the moving-ruler correction has no first-order term. | **Derived from the declared Lorentz ruler target.** Falsifier: a universal first-order ruler response cancels the orbit-shape row without producing an odd one-way length anisotropy. |
| Relativistic inertia or conversion from interaction row to coordinate acceleration | Starts at $O(v^2/c_\star^2)$ for a static electric source | No. This is the P11 order statement: it can add second-order rows but cannot remove a first-order row. | **Observer-level derived recovery target, inherited from P11's independent benchmark.** Falsifier: the independently derived static-source acceleration law contains an $O(v/c_\star)$ inertia term of the required sign. |
| Lorentz boost or relativity-of-simultaneity term | A boost between different inertial charts contains first-order time-space mixing in the *observer boost speed* | No in the source-rest comparison. Setting the observer boost to zero leaves the receiver row untouched. Choosing the receiver as observer makes the source move and changes the benchmark rather than absorbing its source-rest defect. | **Derived coordinate-layer distinction.** Falsifier: one fixed Lorentz chart removes the row in the source-rest frame and all boosted frames while retaining the standard transformed static-source field. |
| First-order Doppler factor in a received rate | $1-\hat{\mathbf n}\cdot\mathbf v_{\mathrm{rel}}/c_\gamma+O(v^2/c_\gamma^2)$: first order and odd | It can shift a remotely received frequency, but it cannot change a co-located radial acceleration, the geometric curve $R(\theta)$, or the source-rest fall record. Using it as a dynamics correction would also double-count the ordinary launch/arrival factor in spectroscopy. | **Derived channel distinction; inferred no-double-counting consequence.** Falsifier: a same-record signal-and-trajectory map shows that the Doppler factor cancels the local row and still returns the independently anchored received-frequency formula. |
| Effective-metric lapse, spatial compliance, or Noether sea dressing | Static lapse and Lorentz clock/ruler speed corrections are scalar/even at leading kinematic order; a shift or sea-flow vector can create first-order frame terms | No generic cancellation. A shift is a shared frame/medium row, not a different $\mathbf N_j\cdot\mathbf V$ factor for every static source. A source-specific shift would be a new constitutive interaction and would require cross-observable retuning. | **Derived order and tensor mismatch under the declared common-map closure; inferred exclusion of all undeclared constitutive maps.** Falsifier: one independently derived common map cancels every source row and passes redshift, Shapiro, lensing, clock, ruler, and preferred-frame anchors without refitting. |
| Root or population measure redefinition | Multiplication by $c_f/D_T=1+h+O(h^2)$ is first order | Algebraically yes, but this changes the acceleration measure and becomes singular at $D_T=0$. It is the receiver-weight modification analyzed below, not observer absorption. | **Derived.** Falsifier: the same factor arises from an independent observer map rather than from changing the branch strength, and remains regular through the receiver-normal null. |
| Bound-assembly internal compensation | Not fixed; a specially structured response could be first order | Not excluded in principle, but it is additional dynamics. It must be universal across charges, materials, orientations, and source superpositions and must not erase ordinary Doppler. | **Guessed possibility with a named proof burden.** A derivation either promotes it to a measured or derived candidate or excludes it. |

### Order and parity obstruction

Let a regular source-rest clock/ruler map have Jacobian
$J=I+O(v^2/c_\star^2)$ and clock factor
$d\tau/dT=1+O(v^2/c_\star^2)$. Applying it to

$$
\mathbf A_{\mathrm{can}}
=
\mathbf A_0
-h\mathbf A_0
+O(h^2)
$$

leaves the coefficient of $-h\mathbf A_0$ unchanged. More generally, an
isotropic local clock or ruler scalar in a static source-rest state is even
under $\mathbf V\mapsto-\mathbf V$, whereas the obstruction is odd. A first-
order absorber therefore needs an additional directed record. Doppler supplies
such a direction only for a signal path; a static-source interaction supplies
a different $\mathbf N$ for each source. One universal observer chart cannot
use all of those source-specific directions as its own frame direction.

**Claim grade: derived under regularity, isotropy, and the declared Lorentz
clock/ruler target.** The falsifier is an explicit universal first-order map
with the required source-by-source tensor structure and no conflicting
first-order preferred-frame or signal residual.

## Minimal Receiver-Weight Modification

P2 separates two facts that should remain separate:

1. $D_T/D_s=dS/dT$ is forced as signed root transport.
2. Using $|D_T|$ as an acceleration numerator is chosen.

The smallest change that removes the static-source row while preserving P2's
source-time delta-collapse denominator is therefore not deletion of all normal
data. It is replacement of the normalized receiver multiplier by one:

$$
\frac{|D_T|}{c_f}
\longmapsto
1,
$$

so that

$$
\boxed{
W_{\mathrm{acc}}^{(0)}
=
\frac{c_f}{|D_s|},
\qquad
\mathbf A_{i\leftarrow j}^{(0)}
=
\kappa Q_{ij}
\frac{1}{r^2}
\frac{c_f}{|D_s|}
\hat{\mathbf r}.
}
$$

Meanwhile,

$$
\boxed{
\frac{dS_\ell}{dT}
=
\frac{D_T}{D_s}
}
$$

is retained for root transport, branch orientation, and history bookkeeping.
In this precise sense the **receiver factor** is unit weight while $D_T$
remains only in transport.

**Claim grade: derived as the minimal algebraic removal consistent with P2's
forced denominator; postulated as a replacement acceleration law.** It is not
promoted by this file. An action or wake derivation that requires another
velocity-even numerator would falsify its claimed minimal physical standing,
though not the algebraic fact that it removes $-h\mathbf N$.

If `unit weight` instead means setting the complete branch factor to

$$
W_{\mathrm{acc}}=1,
$$

then $D_s$ is also removed from acceleration strength. That is a larger change:
it abandons the $1/|D_s|$ factor P2 derives from source-time delta collapse.
Both variants remove the static-source receiver row, but they have different
population and coincident-endpoint consequences. The distinction is
load-bearing and must remain explicit.

**Claim grade: derived distinction.** The falsifier is an agreed definition in
which the complete branch factor and the normalized receiver multiplier are
the same object despite the retained $1/|D_s|$ source-collapse row.

## Consequences for P1, P2, P3, and P6A

### P1: the neutral-line coefficient remains $C_B=0$

For P1's positive-normal uniform line, common-slice source-label transport is

$$
d\xi=dy\,\frac{D_s}{c_f}.
$$

With the minimal receiver-factor replacement,

$$
d\xi\,W_{\mathrm{acc}}^{(0)}
=
dy\,\frac{D_s}{c_f}\frac{c_f}{D_s}
=
dy.
$$

The emission-coordinate kernel is therefore independent of source drift and
receiver velocity. Common-slice neutrality again kills the bulk line row, so

$$
\boxed{C_B^{(0)}=0.}
$$

The modification removes P11's static-source $-h\mathbf N$ contradiction but
does not recover Darwin-order magnetism. P1's routing to an independently
derived bound-structure or Noether sea constitutive channel remains unchanged.

**Claim grade: derived.** The falsifier is a same-measure line integral of the
displayed modified kernel that returns a receiver-linear current coefficient
different from zero.

The complete-unit alternative $W_{\mathrm{acc}}=1$ also has $C_B=0$ because it
contains no receiver velocity, but it no longer cancels source-label transport.
For a line along $\hat{\mathbf x}$ with current
$\mathcal J=\sum_\alpha\Lambda_\alpha u_\alpha$, it instead gives the
receiver-independent first-order row

$$
\boxed{
\mathbf A_{\mathrm{line}}^{W=1}
=
-\frac{\pi\kappa q_i\mathcal J}{2\rho c_f}
\hat{\mathbf x}
}
$$

after neutrality. The Darwin benchmark has no such receiver-independent
current row. Complete unit weight therefore trades the $-h\mathbf N$ conflict
for a different first-order line conflict unless another term cancels it.

**Claim grade: derived from P1's emission-coordinate measure and
$\int \hat r_x\hat{\mathbf r}\,dy/r^2=(\pi/2\rho)\hat{\mathbf x}$.** The
falsifier is a direct evaluation of that integral with another coefficient or
zero under the same line convention.

### P2: the four-member family collapses on its receiver-response axis

Replacing $D_T$ by $c_f$ in the radial members yields

$$
\mathbf A_{S0}
=
\kappa_SQ_{ij}\frac{1}{r^2}
\frac{c_f}{|D_s|}\hat{\mathbf r},
\qquad
\mathbf A_{G0}
=
\kappa_GQ_{ij}\frac{1}{r^3}
\frac{c_f}{|D_s|}\hat{\mathbf r}.
$$

The surface-versus-gradient distinction remains: the static slopes are still
$n_S=2$ and $n_G=3$. The old full-vector carrier

$$
\mathbf C=D_T\hat{\mathbf r}-\mathbf V_\perp
=
c_f\hat{\mathbf r}-\mathbf V
$$

cannot remain unchanged, because for a static source it contains the complete
first-order receiver row $-\mathbf V/c_f$, including a transverse component
that the static-source Maxwell benchmark also lacks. Replacing $\mathbf C$ by
$c_f\hat{\mathbf r}$ makes each vector member identical to its radial member.

The revised family table is therefore

| Spatial statistic | Velocity-independent radial response | Unchanged full-vector response |
| --- | --- | --- |
| Surface density, $r^{-2}$ | **S0:** survives the static inverse-square shape anchor; ledger and Darwin closure remain open | **SV:** rejected by the static-source first-order anchor unless a separately derived compensating channel is attached |
| Density gradient, $r^{-3}$ | **G0:** removes receiver-velocity dependence but still conflicts with the direct static inverse-square anchor | **GV:** carries both the inverse-cube conflict and the forbidden first-order receiver-vector row |

P2 Controls A and C cease to distinguish surviving unit-receiver members:
every survivor has zero transverse response. Control B remains decisive for
the $r^{-2}$ versus $r^{-3}$ axis. Any future velocity-dependent member must
start at a benchmark-allowed order or carry source-receiver bilinear structure;
it cannot restore a receiver-only first-order term.

**Claim grade: derived for the modified equations, family collapse, and
control consequences; inferred for the restriction on future ansatz design.**
The derived claim is falsified by an unchanged SV/GV equation whose static-
source first-order vector row vanishes. The inference is falsified by an
independently derived allowed first-order receiver-only benchmark term.

### P3: $m<0$ remains a transport stratum, not an acceleration stratum

Under either unit-receiver modification,

$$
m=\frac{D_T}{D_s}
$$

still classifies orientation of the root map. Negative $m$ still means that
increasing reception time moves the selected emission time backward along the
source history. It remains relevant to branch tracking, root-set changes, and
any action or wake pullback that consumes signed transport.

It no longer flips or nulls the acceleration row. At $D_T=0$, the replacement
acceleration does not vanish merely because $m=0$; signed $m$ versus unsigned
$|m|$ is no longer an acceleration-law choice, and the P3 cusp/direction
arbitration does not select between acceleration conventions. P3's negative-
orientation geometry remains valid, but its acceleration and same-action
dual-replay consequence must be retired or reformulated as a transport-ledger
question.

**Claim grade: derived conditional on either displayed unit-receiver law.**
The falsifier is a branch acceleration under that law whose magnitude or
direction changes when only the sign of $D_T$ changes at fixed
$(r,\hat{\mathbf r},D_s,Q_{ij})$.

### P6A: the receiver-normal speed governor does not survive

P6A's candidate signed governor used the factor

$$
m=\frac{c_f-u\mu}{D_s}
$$

in the along-track self-row. Its zero near $u=c_f$ and its negative slope on
the positive-$D_s$, near-aligned branch supplied the proposed braking
mechanism. With the minimal receiver-factor replacement, the same branch gives

$$
\boxed{
\dot u_{\ell}^{(0)}
=
K_\ell\frac{c_f}{|D_{s,\ell}|}\mu_\ell,
\qquad
K_\ell=\kappa\frac{|q_i|^2}{r_\ell^2}>0.
}
$$

With complete unit weight it gives

$$
\boxed{
\dot u_{\ell}^{W=1}
=
K_\ell\mu_\ell.
}
$$

Neither row has a receiver-normal null at $u=c_f/\mu$. Neither changes sign
when $m$ becomes negative. On P6A's just-super-$c_f$ short-delay self root,
$\mu\simeq1$, so the like-polarity contribution remains along-track rather
than becoming a signed braking row. The **P6A receiver-normal governor is
therefore removed** under either unit-receiver outcome. A different governor
from root-set changes, finite-width impulses, partner dominance, or a complete
history cycle is not excluded, but it is presently unproved.

The two replacements differ at the coincident-endpoint limit. P6A has
$D_s\simeq\delta\to0^+$ on the just-born sharp root. The minimal
$c_f/|D_s|$ law is singular there and transfers the full decision to the
finite-width/core impulse. Complete unit weight avoids that source-normal
singularity in acceleration but creates the P1 line conflict above and
abandons P2's delta-collapse factor. This is the smallest remaining law-choice
gap.

**Claim grade: derived for loss of the receiver-normal null, loss of the
branchwise braking sign, and the two sharp-limit behaviors; inferred for the
possibility of another whole-history governor.** A same-law branch row with a
$D_T$-controlled zero or sign reversal would falsify the derived consequence.

## Claim Ledger

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| A static source gives $\mathbf A=(1-V_R/c_f)\mathbf A_0$ on the positive-normal chart. | Derived. | Direct specialization of the canonical row gives another factor. |
| The row changes source-rest radial acceleration and orbit/fall diagnostics at first order. | Derived locally; integrated morphology inferred. | The local paired-velocity difference vanishes, or a complete retained-history solution cancels the integrated effect. |
| Standard Lorentz clock and ruler responses cannot absorb the row. | Derived under the declared Lorentz closure target. | A universal first-order clock/ruler map cancels it and passes the same-record Lorentz anchors. |
| First-order Doppler is the wrong channel. | Derived channel distinction. | A same-record derivation makes Doppler cancel the local trajectory row without changing the received-frequency anchor. |
| No currently declared observer-level absorber closes the mismatch. | Repo-grounded inferred verdict. | A declared, independently derived common observer map with the required cancellation is identified. |
| Replacing the receiver factor $|D_T|/c_f$ by one removes the obstruction while retaining $1/|D_s|$. | Derived algebra; replacement law postulated. | The static specialization retains receiver velocity after the replacement. |
| The minimal replacement leaves P1 at $C_B=0$. | Derived. | The modified neutral-line integral yields $C_B\ne0$. |
| Complete unit weight introduces a receiver-independent current row on P1's line. | Derived. | The stated line integral vanishes under the same measure. |
| P2's surviving family has only the surface/gradient axis. | Derived conditional on the static-source anchor. | An unchanged full-vector member has no forbidden receiver-only first-order row. |
| P3's $m<0$ stratum survives only as root transport. | Derived conditional on unit receiver weight. | Acceleration under the replacement still flips with $m$. |
| P6A's receiver-normal governor does not survive. | Derived conditional on unit receiver weight. | The replacement along-track row retains the $D_T$ zero and negative slope. |

## Smallest Follow-On

The smallest follow-on is an **analytic source-normal retention lemma**. Hold
the causal support, static inverse-square normalization, and P2 root transport
fixed, then derive the acceleration prefactor from one frozen pre-collapse
action or wake-flux measure without assuming either answer. The lemma must
decide between

$$
W_{\mathrm{acc}}^{(0)}=\frac{c_f}{|D_s|}
\qquad\text{and}\qquad
W_{\mathrm{acc}}=1,
$$

and must state the finite-width behavior as $D_s\to0$ and the P1 neutral-line
coefficient. No trajectory run is needed. This is smaller than another Darwin
family search because it settles which replacement law is even admissible
before P11 is re-expanded.

**Claim grade: inferred priority recommendation.** It is displaced if an
existing independent action/wake derivation already fixes the post-removal
source-normal factor, or if the operator chooses to abandon the delta-collapse
origin of acceleration explicitly.

## Disposition

Disposition: **priority-only**. The observer-order audit supports
`falsifies-the-weight`; it does not authorize a canonical receiver-weight
change. The cleanest candidate is unit receiver factor with the forced
$c_f/|D_s|$ source-normal row retained, but its coincident-endpoint impulse and
action/wake provenance remain open. Complete unit weight is not the minimal
P2-consistent change and already exposes a separate P1 line conflict.
