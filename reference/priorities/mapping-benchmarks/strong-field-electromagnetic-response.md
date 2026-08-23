# Strong-Field Electromagnetic Response

## Closure Boundary

This benchmark treats five observer-level behaviors as one coupled closure
problem:

1. photon--photon scattering;
2. strong-background vacuum birefringence;
3. amplitude-dependent polarization and propagation;
4. electron--positron pair production; and
5. backreaction by the produced pairs on the source, Noether sea, and effective
   electromagnetic environment.

The nonlinear electromagnetic sector is not covered when only one or several
of these rows are reproduced. Coverage requires all five rows to pass on one
shared source, sea, boundary, photon, pair, detector, and provenance record,
with no row-specific retuning.

Plainly: scattering, polarization change, pair production, and screening are
different views of one evolving physical history. Five unrelated fits do not
explain that history.

## Theory-Layer Boundary

The QED equations, cross sections, constitutive tensors, and strong-field rate
laws used here are effective recovery targets and observational constraints.
They are not architrino-level premises. The native calculation may use only the
Master Equation, delayed path histories, causal-root and wake records,
architrino polarity, retained assembly dynamics, and Euclidean void plus
absolute time. Effective electric and magnetic fields are projections from
that record; they are not substrate objects inserted into the per-hit law.

Source strength must therefore be changed through a declared physical source
preparation parameter, denoted by $\zeta$, while every Master Equation
coefficient and projection rule remains fixed. Any numerical instantiation
must use normalized wake-speed units with $c_f=1$.

Plainly: the experiment may strengthen the source that prepares the effective
field, but it may not add an electric-field knob or a strong-field switch to an
individual architrino interaction.

## One Shared Strong-Field Record

Every row consumes the same versioned carrier:

$$
\Theta_{\mathrm{SF}}^{\zeta}
=
\left(
\mathcal H_{\mathrm{src}}^{\zeta},
\mathcal H_{\mathrm{sea}}^{\zeta},
\mathcal H_{\partial\Omega},
\mathcal L_{\gamma,\mathrm{in/out}},
\mathcal L_{\mathrm{pair}},
\mathcal L_{E\mathbf p\mathbf J},
\mathcal D_{\mathrm{det}},
\mathcal B_{\mathrm{branch}}
\right).
$$

Here $\mathcal H_{\mathrm{src}}^{\zeta}$ is the prepared source path history,
$\mathcal H_{\mathrm{sea}}^{\zeta}$ is the evolving Noether sea history,
$\mathcal H_{\partial\Omega}$ is the boundary history,
$\mathcal L_{\gamma,\mathrm{in/out}}$ is the incoming and outgoing photon
packet ledger, $\mathcal L_{\mathrm{pair}}$ is the pair identity and polarity
ledger, $\mathcal L_{E\mathbf p\mathbf J}$ is the energy, momentum, and angular
momentum account, $\mathcal D_{\mathrm{det}}$ is the observer-level detector
projection, and $\mathcal B_{\mathrm{branch}}$ records retained, escaped,
reorganized, and failed branches.

Plainly: every claimed effect must point back to the same versioned
source-family campaign and evolving sea preparation and, whenever effects
coexist, the same event record, down to the causal roots, wakes, architrino
identities, and detector reconstruction that produced it.

### Required Record Keys

| Record key | Required content | Rejection condition |
| --- | --- | --- |
| Source preparation | `sourceHistoryId`, $\zeta$, geometry, duration, cadence, polarity inventory | A result labels an effective field amplitude but does not identify the source history that prepared it. |
| Sea and boundary | `seaStateId`, initial-state prefix, boundary identifier, regulator and causal-window identifiers | Separate sea states or boundary laws are fitted to separate behaviors. |
| Causal provenance | Transmitter, receiver, causal-root, wake, and path-history identifiers | A projected response cannot be traced to native hits and their continuing histories. |
| Photon ledger | Incoming and outgoing packet identities, energy, momentum, angular momentum or helicity, polarization, and branch outcome | Scattering or propagation is reported without packet conservation and provenance. |
| Pair ledger | Every pre-event architrino identity, product assignment, net polarity, retained electron/positron branch, remnant, and unused inventory | New identities appear, polarity is unbalanced, or products are only observer labels. |
| Projection contract | One versioned $\Pi_{\mathrm{EM}}$, detector kernel, coefficient set, tolerances, and ensemble measure | A behavior uses a private field definition, detector response, tolerance, or fitted measure. |

The effective electromagnetic and polarization readouts are declared outputs:

$$
\left(
\mathbf E_{\mathrm{eff}}^{\zeta},
\mathbf B_{\mathrm{eff}}^{\zeta},
\chi_{\gamma}^{ab,\zeta}
\right)
=
\Pi_{\mathrm{EM}}\!\left[\Theta_{\mathrm{SF}}^{\zeta}\right].
$$

Plainly: $\mathbf E_{\mathrm{eff}}$, $\mathbf B_{\mathrm{eff}}$, and the
polarization-response tensor summarize the native record. They do not cause
the record.

## Common Amplitude And Event Ladder

The first executable packet must use one source family across this predeclared
ladder:

| Regime | Required run | Minimum question |
| --- | --- | --- |
| Null | $ζ=0$ with the same sea, boundary, and detector preparation | Does the instrument invent scattering, birefringence, pairs, or effective-field change? |
| Weak signed pair | Small $+\zeta$ and $-\zeta$ | Is the leading response approximately linear with the required reversal parity? |
| Intermediate | Increasing $|\zeta|$ below pair onset | Does a resolved geometric state change produce amplitude-dependent polarization or propagation? |
| Strong sub-threshold | Largest retained source branches before pair capture | Do scattering and birefringence remain on the same constitutive record as the weak limit? |
| Pair-active | Source preparations with nonzero pair capture measure | Are retained charge-conjugate products formed with exact provenance and immediate backreaction? |

For any declared polarization or propagation observable $Y(\zeta)$, record the
weak tangent and nonlinear departure:

$$
R_{\mathrm{amp}}(\zeta)
=
\frac{
\left\lVert
Y(\zeta)-Y(0)-\zeta\,\partial_{\zeta}Y(0)
\right\rVert
}{
\left\lVert\zeta\,\partial_{\zeta}Y(0)\right\rVert+\epsilon
}.
$$

A nonzero residual is informative only when convergence tests trace it to
resolved changes in source, root, sea, wake, or retained-assembly geometry.

Plainly: the benchmark first measures the weak straight-line response, then
asks when and why the actual response bends away from that line. Numerical
error or an amplitude-specific coefficient does not count as nonlinear
physics.

## Coupled Behavior Rows

### SF-1: Photon--Photon Scattering

This row targets elastic light-by-light scattering,
$\gamma\gamma\rightarrow\gamma\gamma$. It is distinct from the
Breit--Wheeler pair channel $\gamma\gamma\rightarrow e^-e^+$, although both
must consume the same photon packet and event-ledger grammar. Each event must
record incoming and outgoing packet identities, energy, momentum, angular
momentum or helicity, polarization, scattering angle, source and sea change,
and any boundary flux. Ensemble output must include the differential rate or
cross section and polarization dependence.

$$
\mathbf R_{\gamma\gamma}
=
\left(
\Delta E,
\Delta\mathbf p,
\Delta\mathbf J,
R_{\mathrm{packet}},
R_{\sigma},
R_{\mathrm{pol}},
R_{\mathrm{medium}}
\right).
$$

This row binds the photon carrier in `EQ-12`, the event and pair provenance of
`EQ-28`, and the branch-outcome measure of `EQ-30`. QED loop language may
specify the effective comparison but may not be treated as a literal substrate
path.

Plainly: two incoming photon packets must become two outgoing photon packets
with the right rare angular and polarization statistics, while the complete
native ledger remains balanced.

### SF-2: Strong-Background Vacuum Birefringence

This row targets polarization-dependent photon propagation in a strong
electromagnetic background. It must remain distinct from generic
preferred-frame or Lorentz-leakage birefringence. For propagation direction
$\hat{\mathbf k}$, the effective comparison uses the transverse projector and
a polarization-resolved constitutive readout:

$$
P_{\perp}^{ij}=\delta^{ij}-\hat k^i\hat k^j,
\qquad
\chi_{\gamma}^{ab}
=
\chi_{\mathrm{iso}}P_{\perp}^{ab}
+
\chi_{\mathrm{aniso}}
P_{\perp}^{ai}S_{ij}^{\mathrm{TF}}P_{\perp}^{jb}
+
R_{\gamma}^{ab},
$$

$$
\Delta\chi_{\gamma}=\lambda_1-\lambda_2.
$$

The weak homogeneous isotropic control must give
$\Delta\chi_{\gamma}\rightarrow0$ within tolerance. Strong loading must
derive any eigenvalue split, eigenvectors, phase accumulation, and Stokes
transport from the same $\Theta_{\mathrm{SF}}^{\zeta}$. The
[vacuum-birefringence source map](../source-mining/vacuum-birefringence-noether-sea-constitutive-map.md)
owns the measured IXPE, NICER, and Parkes record and its model-dependent
interpretation boundary.

Plainly: the sea may treat two transverse photon polarizations differently in
a strong background, but the split must disappear in the declared symmetric
control and must be derived from one resolved constitutive history.

### SF-3: Amplitude-Dependent Polarization And Propagation

This row consumes the full $\zeta$ ladder and records, for each photon packet,
the polarization eigenvalues and eigenvectors, phase and group delay,
dispersion, absorption or scattering, and output Stokes data. The weak tangent,
the first resolved nonlinear departure, and the pair-active continuation must
use one source geometry, one constitutive projection, and one coefficient set.
Where loss and dispersion are both extracted, each polarization eigenchannel
must satisfy the declared causal consistency test, including the applicable
Kramers--Kronig comparison at effective grade.

This row fails if every amplitude is assigned a separate response tensor, if a
nonlinear coefficient is inserted without a native state change, or if the
weak and strong calculations use incompatible photon or sea records.

Plainly: the benchmark must show how stronger source loading changes the sea
and therefore changes light propagation. It cannot merely replace a linear
formula with a fitted nonlinear one.

### SF-4: Electron--Positron Pair Production

One mechanism class must be tested in at least two observer-level limits:

- photon-assisted or Breit--Wheeler pair production, using the same incoming
  photon ledger as SF-1; and
- a slowly varying strong electric background, compared with the Schwinger
  field dependence.

The conventional strong-electric comparison has the characteristic form

$$
w(E)\propto E^2\exp\!\left(-\frac{\pi E_S}{E}\right),
$$

but this rate law is a recovery target, not a native input or fitted threshold.
The native rate must arise from a declared ensemble measure of initial records
that enter retained electron and positron basins.

Every successful event must route pre-existing architrino identities into two
retained, charge-conjugate assemblies with opposite protected six-unit
polarity inventories. The benchmark does not assume that the charged sites are
axial, external, exposed, or internal; their geometry is a result to be
resolved. Generic breakup, ionization, or a transient oppositely signed
projection does not count as pair production.

Plainly: no architrinos are created. A successful event reorganizes an
identified prior inventory into a retained electron and positron, and the
observed exponential rarity must emerge from which initial histories reach
those two basins.

### SF-5: Pair Backreaction

The produced electron and positron must immediately continue in the same
causal network as the source, sea, boundaries, remnants, and outgoing photon
packets. Their effect on the observer-level environment is measured by a
change in projection:

$$
\Delta\mathbf E_{\mathrm{eff}}
=
\Pi_E\!\left[\Theta_{\mathrm{SF}}(T_b)\right]
-
\Pi_E\!\left[\Theta_{\mathrm{SF}}(T_a)\right].
$$

Screening is one allowed outcome. Redistribution, local enhancement,
oscillation, radiation, source depletion, and boundary transfer remain
possible and must be reported rather than forced to carry the screening sign.
The complete event account is

$$
\Delta\mathfrak L_{\mathrm{src}}
+\Delta\mathfrak L_{\mathrm{sea}}
+\Delta\mathfrak L_{e^-}
+\Delta\mathfrak L_{e^+}
+\Delta\mathfrak L_{\mathrm{rem}}
+\mathfrak F_{\partial\Omega}
+\mathfrak R
=0,
$$

with

$$
\mathfrak L=
\left(E,\mathbf p,\mathbf J,N_+,N_-,\mathcal H_{\mathrm{wake}}\right).
$$

A frozen-background pair calculation may benchmark a yield, but it cannot
pass this row because the products do not update the record that formed them.

Plainly: pair creation and field screening are not two simulations. They are
the product-formation and subsequent-evolution portions of one conserved event.

## Shared Acceptance Vector

The packet reports the vector residual

$$
\mathbf R_{\mathrm{SF}}
=
\left(
R_{\gamma\gamma},
R_{\mathrm{biref}},
R_{\mathrm{amp}},
R_{\mathrm{pair}},
R_{\mathrm{back}}
\right).
$$

No weighted scalar score may hide a failed component. The nonlinear
electromagnetic sector is covered by this benchmark only if:

1. all five residual components pass their predeclared tolerances;
2. all five outputs bind to the same shared-record keys and projection
   contract;
3. the amplitude ladder changes only the declared physical source
   preparation;
4. exact identity, polarity, energy, momentum, angular momentum, wake, remnant,
   and boundary provenance closes at event level;
5. ensemble statistics use one declared measure and detector kernel; and
6. refinement, null, polarity-reversal, record-split, frozen-sea,
   frozen-backreaction, and hidden-retune controls pass.

Plainly: this is an all-rows gate. Excellent birefringence with no retained
pairs, or a fitted pair rate with no screening ledger, leaves the sector open.

## Behavior-To-Owner Map

| Behavior | Primary equation owners | Native burden | First falsifier |
| --- | --- | --- | --- |
| Photon--photon scattering | `EQ-12`, `EQ-28`, `EQ-30` | Retained photon packets, same-event conservation, polarization-resolved branch measure | Elastic light-by-light statistics require a private photon ontology, fitted event measure, or unbalanced ledger. |
| Vacuum birefringence | `EQ-12`, `EQ-13` | One polarization-resolved Noether sea and photon constitutive record | The split persists in the symmetric null or requires a record unrelated to the other strong-field rows. |
| Amplitude-dependent propagation | `EQ-12`, `EQ-13`, `EQ-30` | One $\zeta$ ladder with resolved geometry and causal loss/dispersion | Nonlinearity appears only through amplitude-specific coefficients or projection changes. |
| Pair production | `EQ-28`, `EQ-30` | Retained conjugate basins, exact identity and polarity routing, native capture measure | New inventory, generic breakup labeled as a pair, or an installed Schwinger threshold. |
| Backreaction | `EQ-05`, `EQ-06`, `EQ-28` | Coupled source/sea/product/remnant/boundary continuation | Pair yield is computed on a frozen background or effective-field change has no native ledger. |

## Current Grade And Blockers

This is a draft benchmark specification, not an executed result. It changes no
equation maturity score, benchmark status, or accepted physics claim. The first
execution remains blocked on:

- a retained source branch and retained Noether sea braid that can be evolved
  across the complete amplitude ladder;
- accepted input and output photon packet carriers with the required Gate A/B
  provenance;
- an elastic light-by-light branch-outcome carrier and independent
  polarization-resolved comparison;
- one retained polarization-resolved Noether sea constitutive record;
- retained electron and positron basins with protected polarity and exact
  architrino identity routing; and
- finite-window wake, energy, momentum, angular-momentum, remnant, and boundary
  accounts that continue after pair capture.

The canonical execution row remains `XTM-006` in
[work-queue.md](work-queue.md). Case-local construction steps in this file do
not create another execution queue.

Plainly: the packet now says exactly what one calculation must contain and what
would count as failure. The required retained carriers do not yet exist at an
accepted evidence grade.

## Failure Codes

| Failure code | Meaning |
| --- | --- |
| `strong_em.partial_bundle` | Fewer than all five behavior rows pass. |
| `strong_em.record_split` | Behavior rows use different source, sea, boundary, photon, pair, detector, or projection records. |
| `strong_em.hidden_amplitude_tuning` | Source amplitude changes a native coefficient, per-hit law, constitutive tensor, detector kernel, or ensemble measure. |
| `strong_em.field_as_ontology` | Effective $\mathbf E$, $\mathbf B$, or a QED field object is inserted as a substrate cause. |
| `strong_em.packet_ledger_open` | Photon identities or energy, momentum, angular momentum, polarization, recoil, remnant, or boundary rows do not close. |
| `strong_em.false_pair` | Breakup, ionization, or transient signed output is labeled pair production without two retained conjugate basins. |
| `strong_em.inventory_creation` | Produced assemblies contain architrino identities absent from the pre-event record. |
| `strong_em.frozen_backreaction` | Pair yield is computed without continuing the source, sea, products, remnants, and boundaries together. |
| `strong_em.weighted_masking` | A combined scalar score hides failure of an individual behavior row. |

## External Comparison Anchors

- Julian Schwinger, [On Gauge Invariance and Vacuum
  Polarization](https://doi.org/10.1103/PhysRev.82.664), *Physical Review* 82
  (1951), supplies the conventional slowly varying strong-electric rate
  comparison.
- ATLAS Collaboration, [Evidence for light-by-light scattering in heavy-ion
  collisions with the ATLAS detector at the
  LHC](https://doi.org/10.1103/PhysRevLett.123.052001), *Physical Review
  Letters* 123 (2019), supplies an observer-level elastic light-by-light
  benchmark.
- The local [vacuum-birefringence source
  map](../source-mining/vacuum-birefringence-noether-sea-constitutive-map.md)
  preserves the measured-versus-model-inferred boundary for the strong-source
  polarization record.

These anchors constrain outputs. They do not authorize importing QED vacuum,
loop, point-charge, or field ontology into the native calculation.

## Promotion Map

| Result | Candidate consumer | Promotion condition |
| --- | --- | --- |
| Shared nonlinear electromagnetic carrier | [Mapping Electromagnetism](../mapping-electromagnetism/priorities.md) | All five rows pass without record splitting or hidden amplitude tuning. |
| Photon scattering and propagation | [Radiation](../../../content/markdown/aaa/reactions/radiation.md) | Retained photon packets, polarization, event balance, and detector statistics share one carrier. |
| Pair formation and backreaction | Electron, reactions, Noether sea, and conservation canon | Retained conjugate products, exact inventory provenance, and continuing source/sea/product ledger are accepted. |
| Effective constitutive readout | Gauge and Maxwell recovery | Weak linear and strong nonlinear projections emerge from one native response family. |
