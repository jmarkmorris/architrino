# Speed-Attractor Derivation Under Both Receiver-Normal Conventions

Status: analysis-only, priority-only. No receiver-normal convention is promoted
and no attractor is booked by this file.

Claim level: the branchwise along-track formulas and the local small-delay
self-root expansion are derived. The July 9 speed-pin claim is a reported
measurement whose surviving repository record is insufficient to establish a
canonical Master EOM attractor. The signed-convention restoring mechanism is
plausible with named gaps; the unsigned convention does not supply that
mechanism.

## Finding

The canonical second-order Master Equation does **not yet derive** the reported
speed attractor. The decisive local mechanism is convention-sensitive, but the
surviving measurement cannot arbitrate it at zero run cost.

On an accelerating, just-super-field-speed, curved same-source history, the
new short-delay self root has

$$
D_T<0<D_s,
\qquad
m=\frac{D_T}{D_s}\simeq-1,
$$

and its line of action is nearly parallel to the current velocity. The signed
row therefore points back toward the historical emission point and brakes the
speed excursion. The unsigned row points away from the historical emission
point and reinforces the excursion. This sign difference is derived for that
branch. It is not yet a derivation of the net acceleration or of an attracting
full-history return map.

The uniform circular self chart cannot supply the missing proof or arbitrate
the convention: rotational symmetry gives $D_T=D_s$ and $m=+1$ on every
nondegenerate root. The conventions are identical there.

The July 9 pin claim has no linked raw trajectory, root ledger, convergence
record, or per-row $m$ data in the surviving repository. The later repository
audit also shows that the earlier native motion routine ignored $c_f$ and
retained history, excluded self-pairs, and omitted $D_s$, $D_T$, $m$, and
$W^{\mathrm{rec}}$. The dispatch does not bind the July 9 run to an executable
or artifact strongly enough to prove that it used that routine, but no
surviving record establishes otherwise. The historical pin is therefore not
canonical self-hit evidence.

## Evidence Inventory

### Reported July 9 pin

| Record | What it actually supplies | Grade | Limitation or falsifier |
| --- | --- | --- | --- |
| [Master-equation import-audit dispatch](master-equation-import-audit-dispatch-2026-07-18.md), P6/P6A | States that a 2026-07-09 native confirmation run measured a speed attractor near $c_f$. | Reported measured claim. | No run artifact, executable identity, seed, speed trace, duration, tolerance, convergence ladder, retained history, root ledger, or $m$-stratum table is linked. A located immutable packet containing those rows would upgrade this inventory. |
| [EOM attractor-search brainstorming](../eom-attractor-search/brainstorming.md) | Calls the $v=c_f$ pin a standing hint and makes speed histograms and pin-approach counts planned observables. | Inferred hypothesis / instrument plan. | It does not reproduce or validate the July 9 pin. |
| [Braid-program corpus reconciliation](../braid-program/corpus-reconciliation.md) | Records that reader-facing phrases including `field-speed pin`, `speed attractor`, and `confirmed natively` were excised during the fresh-start reconciliation. | Measured repository disposition, not a physics measurement. | A later accepted canonical evidence packet could justify a new forward-only statement; the excised wording itself carries no evidence. |

### What the native implementation record establishes

The [EOM work log](work-log.md#2026-07-13--current-native-master-equation-routine-audited)
records a code audit of
`architrino_solver_integrate_master_equation_motion_f64`. It found that the
routine:

- validated but did not use field speed or history depth in acceleration
  evaluation;
- used only instantaneous states and same-time partner positions;
- excluded all self-pairs;
- omitted causal roots, $D_s$, $D_T$, $m$, and $W^{\mathrm{rec}}$; and
- nevertheless reported canonical evidence.

Grade: **measured code-audit finding**. The falsifier is an independently
reproducible source/build artifact for the July 9 run proving that a different
routine consumed complete retained histories, all ordered pairs including
self-pairs, and the canonical receiver-normal root rows.

The same work log records the later certified acceleration and coupled-evolution
layers with the unsigned $|D_T/D_s|$ row, complete ordered-pair accounting, and
an active negative-$D_T$ super-field-speed control. Those are measured
implementation and validation results. They are not a speed-attractor run and
do not supply a stability return map.

### Current attractor-search artifacts

The [Phase 2 harness demo](../eom-attractor-search/evidence/phase2-harness-validation-2026-07-15/README.md)
is an executable-architecture, explicitly noncanonical $N=12$ demonstration
over $0\le T\le0.3$. Its six census rows report `nearPinCount: 0`; the final
maximum speed is about $0.635c_f$. Grade: **measured harness diagnostic**. It
does not encounter the pin and cannot discriminate the conventions.

The attractor-search [live packet](../eom-attractor-search/priorities.md)
explicitly says its measured workload and harness results do not book an
attractor. Its off-pin seed rule is an instrument-protection choice, not
evidence that dynamics flows toward the pin.

### Existing negative-orientation geometry

The [signed-convention analysis](analysis-signed-receiver-normal-convention.md)
and the executable
[prescribed-path test](../../../tests/prescribed-orbit-causal-roots.test.js)
contain an accelerating same-source circular history with $D_T<0<D_s$ and
$m<0$. Grade: **measured display-only geometry diagnostic**. The test consumes
a prescribed future path and expressly carries no retained-branch or dynamical
authority. It proves that the discriminating stratum is constructible; it does
not prove that the attractor transient visited it.

### Evidence conclusion

The strongest honest inventory is:

1. A pin was reported from a native run.
2. No surviving linked artifact establishes its exact trajectory, its
   attraction basin, two-sided stability, canonical-law provenance, or
   $m$-sign strata.
3. The currently recorded ensemble evidence did not approach the pin.
4. Negative-$m$ same-source geometry exists diagnostically, but has not been
   bound to the reported attractor transient.

Therefore the attractor remains a **reported measurement / unresolved
provenance claim**, not an accepted canonical Master EOM result.

## Branchwise Along-Track Equation

Let

$$
u=\|\mathbf V_i(T)\|,
\qquad
\hat{\mathbf e}=\frac{\mathbf V_i(T)}{u},
\qquad
\mu_\ell=\hat{\mathbf e}\cdot\hat{\mathbf r}_\ell,
$$

and consider a self-hit branch $ell$, for which $sigma_{ii}=+1$. Define the
positive amplitude

$$
K_\ell
=
\kappa\frac{|q_i|^2}{r_\ell^2}.
$$

The speed derivative contributed by that branch is the along-track projection
$\dot u_\ell=\hat{\mathbf e}\cdot\mathbf A_\ell$. The two conventions give

$$
\boxed{
\dot u_{\ell,\mathrm{unsigned}}
=
K_\ell
\left|\frac{c_f-u\mu_\ell}{D_{s,\ell}}\right|
\mu_\ell
}
$$

and

$$
\boxed{
\dot u_{\ell,\mathrm{signed}}
=
K_\ell
\frac{c_f-u\mu_\ell}{D_{s,\ell}}
\mu_\ell.
}
$$

Grade: **derived** directly from the two per-hit acceleration definitions. A
same-record row whose vector projection disagrees with either identity would
falsify the row construction.

These equations expose three limits on any speed-pin claim.

1. The receiver-normal null is a **projection** condition,
   $u\mu_\ell=c_f$, not generally $u=c_f$. Only an aligned branch with
   $\mu_\ell\simeq1$ places the null at total speed $c_f$.
2. The sign of one branch does not fix the net along-track acceleration. The
   total includes all self and partner roots with their polarity, direction,
   source-normal sign, distance, and regulator rows.
3. A zero branch contribution is not an attractor. Attraction requires a
   two-sided sign change in the complete history-state evolution and a stable
   return map, not merely $\dot u=0$ at one event.

## Below the Field Speed

Assume first that the complete retained same-source interval is strictly
sub-field-speed. The triangle inequality then forbids every nontrivial
self-root. Hence

$$
\dot u_{\mathrm{self}}=0
$$

under both conventions. Grade: **derived**. The falsifier is a complete
strictly sub-field retained interval containing a certified noncoincident
self-root.

The remaining partner sum has no universal sign. An opposite-polarity image
ahead of the receiver can add positive along-track acceleration, while other
partner geometries can brake it. Thus the statement “the law accelerates every
sub-field state toward $c_f$” is **not derivable** from the Master Equation.

If the retained history contains an earlier super-field-speed excursion,
self-hits may persist after the current speed falls below $c_f$. Their signs
must be evaluated row by row. Current sub-field speed alone does not determine
$D_s$, $m$, or the along-track sum. Grade: **derived memory qualification**;
the net sign is **unmeasured** for the reported transient.

## Just Above the Field Speed: Local Self-Root Birth

The sharpest analytic mechanism is the short-delay same-source chart. Put
$\Delta=T-S>0$, let

$$
\delta=u-c_f,
\qquad
\alpha=\dot u,
$$

and assume a smooth curved history near $T$. Taylor expansion gives

$$
\mathbf X(T)-\mathbf X(T-\Delta)
=
\mathbf V(T)\Delta
-\frac12\mathbf A(T)\Delta^2
+O(\Delta^3),
$$

so the causal residual divided by $\Delta$ is

$$
\frac{g(\Delta)}{\Delta}
=
\delta
-\frac12\alpha\Delta
+O(\Delta^2).
$$

Besides the excluded endpoint $\Delta=0$, an accelerating outward crossing
with $\delta>0$ and $\alpha>0$ therefore has the candidate small root

$$
\Delta_*
=
\frac{2\delta}{\alpha}
+O(\delta^2).
$$

On this root,

$$
\hat{\mathbf r}=\hat{\mathbf e}+O(\Delta_*),
\qquad
\mu=1+O(\Delta_*^2),
$$

$$
D_T=-\delta+O(\delta^2),
\qquad
D_s=+\delta+O(\delta^2),
\qquad
m=-1+O(\delta).
$$

Grade: **derived local asymptotic**, conditional on a smooth prescribed
history and a separated simple root for each fixed $delta>0$. The asymptotic
does not by itself construct a self-consistent solution of the Master
Equation.

The same sign pattern appears in the existing accelerating prescribed-path
diagnostic. The uniform circular case is not a counterexample because it has
$\alpha=0$; its leading balance is higher order and symmetry instead gives
$m=+1$ exactly.

### Unsigned $W=|m|$

For the just-born root, $\mu>0$ and $m<0$, so

$$
\dot u_{\mathrm{self,unsigned}}>0.
$$

The self-hit reinforces the just-super-field-speed excursion. More generally,
on a positive-$D_s$, outward branch with fixed geometry, the unsigned row is
positive on both sides of its receiver-normal null:

$$
\dot u_{\ell,\mathrm{unsigned}}
\propto
|c_f-u\mu_\ell|\mu_\ell>0
\qquad(\mu_\ell>0).
$$

The branch goes silent at the null but has a modulus cusp rather than a
direction reversal. It can approach the null from below while repelling from
it above; it is not a two-sided restoring law.

Grade: **derived branchwise obstruction**. This does not prove that a complete
unsigned many-root history can never have a speed attractor. It proves that
the receiver-normal modulus and the newly born outward self root do not derive
one. Any unsigned attractor requires a different sign-changing mechanism:
root-set changes, line-of-action rotation, partner dominance, finite-width
impulse structure, or a history-dependent cycle average.

### Signed $m$

For the same just-born root,

$$
\dot u_{\mathrm{self,signed}}<0.
$$

The negative orientation reverses like-polarity self-repulsion into acceleration
toward the historical emission point, opposing the super-field-speed
excursion. On a fixed positive-$D_s$ outward branch,

$$
\dot u_{\ell,\mathrm{signed}}
\propto
(c_f-u\mu_\ell)\mu_\ell,
$$

so the local derivative with respect to speed is

$$
\frac{\partial \dot u_{\ell,\mathrm{signed}}}{\partial u}
=
-K_\ell\frac{\mu_\ell^2}{D_{s,\ell}}<0.
$$

Grade: **derived branchwise negative feedback** on the declared fixed branch
chart. When $\mu\to1$, its receiver-normal null approaches $u=c_f$.

This is only a candidate grazing-restoration mechanism. The branch is born
from the excluded coincident endpoint, and as $delta\to0^+$ its separation,
$D_s$, and $D_T$ all approach zero. The sharp simple-root acceleration is
therefore not uniform in the limit. The finite-width causal-surface and core
route must determine the finite impulse and whether the feedback settles,
chatters, overshoots, or ejects the trajectory. A decelerating crossing can
also retain history from the super-field interval, so the below-pin response
is not obtained by simply continuing the positive-$D_s$ formula through the
endpoint event.

## Net Acceleration and Stability Burdens

For either convention the complete along-track acceleration is

$$
\dot u
=
\sum_{j,\ell}
\kappa\sigma_{ij}\frac{|q_iq_j|}{r_{ij,\ell}^2}
\mathcal W_{ij,\ell}
(\hat{\mathbf e}\cdot\hat{\mathbf r}_{ij,\ell}),
$$

where $\mathcal W=|m|$ or $m$. The local self-root sign does not settle this
sum. A derivation of a pin at $u=c_f$ still requires, on one accepted history
chart:

1. a complete root census above, at, and below the crossing;
2. same-record $D_s$, $D_T$, $m$, direction, distance, polarity, and regulator
   rows for every contributing branch;
3. a finite-width/core crossing result for the short-delay self-root birth;
4. a proof that the net along-track sum is positive below and negative above
   the same speed neighborhood;
5. control of transverse acceleration so direction rotation does not mimic a
   speed pin;
6. endpoint-matched prehistory agreement; and
7. a stable return map for the complete retained history, not only for
   $(\mathbf X,\mathbf V)$.

None of these seven rows is supplied by the reported July 9 record in the
surviving repository. Grade: **repo-audit finding**. A linked accepted packet
containing them would overturn it.

## Convention Sensitivity

The candidate mechanism is convention-sensitive **if and only if the
attractor transient's load-bearing branch budget contains $m<0$ rows**.

| Transient stratum | Unsigned $|m|$ | Signed $m$ | Discriminating? |
| --- | --- | --- | --- |
| Every active row has $m>0$ | Same acceleration rows. | Same acceleration rows. | No. |
| Uniform circular self roots | $m=+1$. | $m=+1$. | No. |
| Just-super-$c_f$ accelerating short-delay self root with $D_T<0<D_s$ and $\mu\simeq1$ | Positive along-track acceleration; reinforces the excursion. | Negative along-track acceleration; brakes the excursion. | Yes. |
| General mixed root set containing $m<0$ rows | Flips every negative-$m$ row relative to signed. | Preserves root-transport orientation. | Yes, but only the complete weighted sum decides the net effect. |

The conventions therefore predict different **local stability** for the
negative-orientation self-hit mechanism. They do not yet predict two distinct
fully derived attractor locations. Signed $m$ places each branch null at
$u=c_f/\mu$ and supplies a local restoring slope on a positive-$D_s$ outward
chart; only the near-aligned short-delay limit places that null at $c_f$.
Unsigned $|m|$ has the same null location but no sign reversal.

## Existing or Cheap Discriminating Observation

### What would be zero evolution-run cost

If the original attractor history already exists with complete per-root rows,
the decisive observation is a same-time table through the pin containing

$$
(u,\dot u,i,j,\ell,r,\hat{\mathbf e}\cdot\hat{\mathbf r},D_s,D_T,m)
$$

for every consumed branch. From those immutable rows, compute without evolving
a new trajectory

$$
a_{\parallel}^{|m|}
=
\sum_{j,\ell}
\kappa\sigma_{ij}\frac{|q_iq_j|}{r_{ij,\ell}^2}
|m_{ij,\ell}|
(\hat{\mathbf e}\cdot\hat{\mathbf r}_{ij,\ell})
$$

and

$$
a_{\parallel}^{m}
=
\sum_{j,\ell}
\kappa\sigma_{ij}\frac{|q_iq_j|}{r_{ij,\ell}^2}
m_{ij,\ell}
(\hat{\mathbf e}\cdot\hat{\mathbf r}_{ij,\ell}).
$$

The sharp discriminator is an above-pin interval where the measured
$\dot u<0$, the complete negative-$m$ self budget is nonzero and dominant,
and only one of these counterfactual sums has the measured sign and magnitude
inside the recorded enclosure. The below-pin interval must be checked too;
one terminal slowdown does not establish attraction.

Grade: **derived discriminator specification**. It is a local same-state
comparison, not an independent conservation adjudication and not by itself a
long-time signed replay.

### Why the present repository cannot use it

The surviving July 9 claim has no such row table, and the audited legacy native
routine did not emit or consume these quantities. The current Phase 2 demo
never entered the near-pin bins. Therefore the existing repository artifacts
do **not** arbitrate the convention at zero run cost.

The cheapest non-evolution follow-up is to locate the original immutable
trajectory, then perform root-ledger reconstruction on its stored histories.
If only display frames survive, the observation remains conditional because
interpolation and missing accepted-history provenance can change the root
census. A new dynamics run is unnecessary only if the original accepted
history has enough continuous, error-bounded coverage to reconstruct every
root and its complement.

Even a successful same-state discriminator would decide only which convention
is compatible with that local acceleration record. Physical convention
promotion still requires the independent same-action energy, momentum, and
angular-momentum arbitration specified in the
[signed-convention analysis](analysis-signed-receiver-normal-convention.md).

## Verdicts

### Canonical unsigned convention, $W^{\mathrm{rec}}=|m|$

**Verdict: not derivable from the available identities and evidence.**

Derived obstruction: the receiver-normal modulus makes an outward
positive-$D_s$ self branch keep the same acceleration ray on both sides of
its null. The newly born accelerating super-field self root reinforces rather
than brakes the excursion. Uniform circular self roots have $m=+1$ and add no
sign-changing mechanism. A complete unsigned attractor is not mathematically
excluded, but it would require a different, presently unproved whole-ledger
mechanism.

Falsifier: one accepted unsigned-law history packet with complete roots and
finite-width events, endpoint-matched prehistory agreement, positive net
along-track acceleration below the pin, negative net along-track acceleration
above it, and a contracting full-history return map would overturn this
repo-state verdict.

### Signed convention, $\mathcal W=m$

**Verdict: plausible with named gaps.**

Derived support: on the just-super-field, accelerating, positive-$D_s$
short-delay self root, $m<0$ reverses the like-polarity row and supplies
negative along-track feedback. The near-aligned null tends to $u=c_f$.

Named gaps: the coincident-endpoint/fold finite-width impulse; self-consistent
root birth under the acceleration it generates; the complete partner and
self-root sum; the below-pin persistent-memory response; transverse dynamics;
prehistory collapse; and stable full-history return. Any one can remove,
shift, or destabilize the candidate pin.

Falsifier: an accepted signed-law crossing packet in which the complete net
along-track sum stays nonnegative above the candidate pin, or a refined
full-history return map with a noncontracting speed mode, kills the proposed
signed restoring mechanism for that branch family.

## Consequence for the First-Order Variant

No Occam falsification is available yet. Neither convention currently derives
the reported attractor at the required whole-history stability grade. The
first-order velocity-targeting variant therefore remains **unmotivated but not
falsified**: it gains no positive evidence merely because the second-order
proof is incomplete, but it cannot be discarded on the strength of the
surviving pin claim.

If the signed second-order law later closes the seven stability burdens above
and reproduces the attractor from off-pin histories, then a fundamental
first-order target law adds a primitive setpoint without explaining any new
observation and is Occam-falsified for this role. The same consequence would
follow from a different fully derived unsigned second-order mechanism. A
reported or visually apparent pin is insufficient.

## Claim Grades and Falsifiers

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| The July 9 run measured a speed pin. | Reported measured claim; surviving provenance incomplete. | Locate the artifact and show that its speed trace does not approach or remain near $c_f$, or that the dispatch names the wrong run. |
| The July 9 pin is canonical self-hit evidence. | Rejected by current repository evidence. | Produce the bound executable and accepted record showing complete histories, self-pairs, causal roots, receiver-normal rows, convergence, and stability. |
| Strictly sub-field retained history has no nontrivial self-root. | Derived. | A certified complete counterexample. |
| Uniform circular self roots discriminate signed from unsigned. | Rejected; $m=+1$ is derived. | A nondegenerate uniform circular root with independently computed $D_T\ne D_s$. |
| An accelerating just-super-field short-delay self root has $D_T<0<D_s$ and $m\simeq-1$. | Derived local asymptotic; measured display-only example exists. | A smooth, separated small-delay root satisfying the stated assumptions whose independently computed signs disagree. |
| That root accelerates along-track under unsigned $|m|$ and brakes under signed $m$. | Derived branchwise. | A same-record vector row with $\mu>0$, $D_T<0<D_s$, and the opposite projections. |
| The unsigned convention derives the pin through this receiver-normal mechanism. | Rejected. | A proof showing a two-sided sign reversal from this same fixed branch without changing the unsigned definition. |
| A complete unsigned-law attractor is impossible. | Not claimed. | No falsifier needed; the global question remains open. |
| The signed convention derives a stable $u=c_f$ attractor. | Not established; plausible with named gaps. | A complete signed packet with no finite-width restoring impulse, a shifted/nonexistent net zero, or a noncontracting return map. |
| The existing repository artifacts arbitrate the convention at zero run cost. | Rejected. | Locate a complete original root-row table spanning the transient; then the same-state counterfactual sums become executable without evolution. |
| The first-order variant is Occam-falsified. | Not established. | It becomes established only after a second-order convention derives the off-pin-to-pin attracting history and the first-order law adds no independent recovery. |

## Disposition

This packet is `priority-only`. No canon, code, convention, or shared ledger is
changed. The attractor claim remains provenance-incomplete; the unsigned local
mechanism is obstructed; and the signed local mechanism is convention-sensitive
but not closed through the finite-width and full-history stability burdens.
