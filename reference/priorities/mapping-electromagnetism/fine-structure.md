# Fine-Structure Coupling Map

## Workstream Metadata

- Kind: `priority` focused derivation packet
- Owner: [Mapping Electromagnetism](priorities.md), under `EMAP-004`
- Equation-row authority:
  [EQ-26A Theta-Alpha Source-Field Map](../equation-mapping/eq-26a-theta-alpha-source-field-map.md)
- Score authority:
  [Equation Mapping Detail](../equation-mapping/equation.md#eq-26a-fine-structure-constant-electromagnetic-coupling-and-energy-running)
- Benchmark authority:
  [Precision Electroweak Gauge-Running Benchmark Packet](../standard-model-closure/precision-electroweak-gauge-running-benchmark-packet.md)
- Review synthesis:
  [Planck Action Period, Blackbody, and Fine-Structure Coupling](../../research-office/research-history/review-packets/planck-action-period-blackbody-alpha-reconciliation-2026-07-29.md)
- Claim level: derivation/closure target with observer-level comparison equations
- Status: draft; priority-only; no accepted retained evidence or score change

## Purpose And Boundary

This packet is the canonical priority home for the mathematical effort to map
the observer-level fine-structure coupling into one retained
$\mathbb{A}\mathbb{A}\mathbb{A}$ electromagnetic exposure and Noether sea
response record. It owns the derivation program, dependency joins, benchmark
selection, and falsifiers. It does not own `EQ-26A` scores, checker semantics,
or accepted-row decisions.

This is one track in the larger program to determine the braid geometry, or
small family of geometries, that supports assemblies of matter and the Noether
sea. Equation mapping supplies observer-level equations whose bulk responses
must be reconstructed from those geometries. The special interest of this
track is whether the many apparent ingredients of electromagnetic coupling can
be reduced to a parsimonious retained record built from an electron and/or a
positron, the absolute-state view, and declared effective electric or magnetic
environments.

In this packet, **absolute-state view** names complete-state bookkeeping from
$S(T)$. It is the packet's canonical wording for the operator's Absolute
Observer perspective; it does not introduce another embedded observer or an
apparatus-dependent frame.

The fine-structure constant is not a primitive substrate constant in this
packet. Its measured low-energy value, atomic consequences, radiative
corrections, and running are observer-level recovery targets. Standard
electromagnetic and QED equations specify the comparison surface; they are not
premises for an individual architrino's acceleration.

Plainly: this file asks how one retained exposure/action/photon-channel/Noether
sea record produces the observed electromagnetic coupling. It does not insert
the observed value or QED running law into the Master Equation.

## What An Alpha Determination Means

An experiment does not place a direct meter on $\alpha$. It measures a
frequency ratio, recoil, resistance, spectral interval, cross section, or
another observable and infers $\alpha$ through a declared theoretical
relation, auxiliary constants, and environmental assumptions. The 2022 CODATA
adjustment identifies the electron magnetic-moment anomaly and the rubidium and
cesium atom-recoil results as its three most accurate alpha determinations; the
first route is strongly theory-mediated, while the recoil routes join measured
$h/m$ to the Rydberg constant and relative masses. The [2022 CODATA
report](https://physics.nist.gov/cuu/pdf/JPCRD2022CODATA.pdf) owns the detailed
observational equations and covariance treatment.

Each scenario in this packet must therefore record:

1. the matter assemblies and their geometry;
2. the Noether sea state and causal boundary history;
3. any effective electric or magnetic environment derived from source
   assemblies and the sea;
4. the observable actually measured;
5. the comparison equation used to infer $\alpha$;
6. which other constants or theory terms enter that inference; and
7. whether the result tests the coupling itself or only a downstream
   alpha-sensitive response.

Plainly: “measuring alpha” means solving an interpretation problem. The raw
readout and the equation that turns it into $\alpha$ must both be mapped before
the braid geometry can be inferred.

## Scenario Inventory

The inventory has two complementary parts. **Determination scenarios** ask how
an alpha value or constraint is presently inferred. **Geometry scenarios** ask
which controlled matter, field, sea, or gravity configuration could produce
the same or a different readout in $\mathbb{A}\mathbb{A}\mathbb{A}$.

### Determination And Consumer Scenarios

The determination rows are not sea-free descriptions. Each row must join to a
geometry/environment row and carry a resolved sea partition, schematically

$$
\Theta_{\mathrm{sea}}^{(D_k)}
=
\left(
\Theta_{\mathrm{sea}}^{\mathrm{near}},
\Theta_{\mathrm{sea}}^{\mathrm{env}},
\Theta_{\mathrm{sea}}^{\mathrm{far}}
\right)_{D_k}
$$

Here the near part is coupled directly to the measured assembly, the
environment part includes the region organized by field sources and nearby
apparatus assemblies, and the far part supplies the ambient and causal boundary
state. These labels are resolution domains of one sea record, not three
different media. A row may find that one domain contributes no distinguishable
effect, but that must be a derived or measured null rather than an omission.

Plainly: every alpha determination occurs in the Noether sea. The scenario must
say which part of the sea is close to the particle, which part carries the
declared environment, and what farther state supplies the boundary conditions.

| Id | Observer-level situation | What is actually measured | Role in the alpha map | Minimal $\mathbb{A}\mathbb{A}\mathbb{A}$ geometry question |
| --- | --- | --- | --- | --- |
| `D1` | Trapped electron magnetic-moment anomaly | Spin-precession and cyclotron-frequency information in a confining electromagnetic environment. | Precision alpha determination after inversion of the QED moment relation. | Can one electron, the trap-source assemblies, the near electron-coupled sea, the field-organized environmental sea, and the farther boundary sea reproduce the frequency relation without fitting a private coupling? |
| `D2` | Trapped positron magnetic response | Positron spin and orbital frequency information under the polarity-conjugate field arrangement. | Polarity and matter-antimatter comparison; not currently the primary alpha anchor. | Does the conjugate braid and its near-to-far sea response reverse the required orientations while preserving the same dimensionless coupling? |
| `D3` | Rubidium or cesium atom recoil | The recoil ratio $h/m_X$ from photon momentum transfer. | Independent precision determination when joined to $R_\infty$ and relative masses. | Can a many-architrino atom and photon event reproduce the recoil relation from the same action and exposure records? |
| `D4` | Hydrogen or a hydrogen-like ion | Transition frequencies, including gross, fine, hyperfine, and radiative structure. | Alpha-sensitive consumer and cross-check; each line also depends on other structure. | Which spectral terms come from the common coupling, and which require spin, recoil, nuclear, or wake geometry? |
| `D5` | Positronium, muonium, or another simple leptonic bound system | Spectral intervals, decay rates, or magnetic response. | Composition-changing consumer with reduced or altered nuclear structure. | Can electron-positron or lepton-pair geometry isolate the coupling from nuclear geometry? |
| `D6` | Quantum Hall or electrical-metrology system | A resistance plateau or related electrical ratio in many-body matter under strong magnetic response. | Bulk electromagnetic cross-check, historically used to infer alpha. | Can the same coupling survive a collective charged assembly and its strongly organized sea response? |
| `D7` | Low-energy scattering or annihilation | Differential rates, angular distributions, or cross sections. | Process-dependent coupling consumer. | Does one exposed-charge and photon-channel record predict both bound and unbound electromagnetic events? |
| `D8` | Spacelike and timelike running measurements | Scale-dependent scattering or annihilation observables. | Determines an effective $\alpha$ at declared momentum transfer and scheme. | Can one fixed situation record reproduce both running branches and their threshold inventory? |
| `D9` | Electroweak-scale precision inference | A global set of electroweak observables near $M_Z$. | Scheme-labelled high-scale running anchor. | Can the electromagnetic projection join the weak-sector basis without reassigning the low-energy parents? |
| `D10` | Clock comparisons over time or gravitational potential | Ratios of transitions with different alpha sensitivities. | Constraint on $\Delta\alpha/\alpha$, not an absolute alpha determination. | Does a changed gravitational or sea environment move the coupling, the clocks' assembly geometry, or both? |
| `D11` | Astrophysical spectra or cosmological recombination | Relative line positions, opacity, or recombination-sensitive observables. | Distant-time or distant-environment constraint with substantial model dependence. | Which source, propagation, sea, composition, and clock changes are degenerate with a changed coupling? |

Plainly: the cleanest first geometry target is `D1` because it approaches the
desired reduction to one electron plus applied fields. `D2` supplies the
polarity control. Recoil and spectroscopy then test whether the same coupling
survives increasingly complicated assemblies. Bulk, high-energy, gravity, and
cosmological cases come later because more geometry is entangled in their
readouts.

### Geometry And Environment Scenarios

| Id | Declared situation | Why examine it | Noether sea question |
| --- | --- | --- | --- |
| `G0` | Weak, approximately homogeneous reference region with no declared applied field | Defines the reference matter and sea record. | What density, cadence, orientation distribution, strain, flow, and braid-envelope distribution constitute the baseline? |
| `G1` | Electron and positron separately in the reference region | Isolates polarity and the minimal charged assembly geometry. | Does each charged assembly create a conjugate local sea organization while leaving the far reference state common? |
| `G2` | Static magnetic-dominant environment | Directly supports the trapped-electron and trapped-positron routes. | What source-assembly and sea configuration projects to $\mathbf B_{\mathrm{eff}}$, and which braid orientations determine spin and orbital response? |
| `G3` | Static electric-dominant environment | Separates electric exposure from magnetic response. | What sea loading, polarization, or strain projects to $\mathbf E_{\mathrm{eff}}$? |
| `G4` | Parallel, crossed, and independently varied electric and magnetic environments | Tests whether one parsimonious geometry generates both field sectors and their combined response. | Are the effective fields distinct projections of one sea response, or do they require independent modes? |
| `G5` | Time-dependent or radiative electromagnetic environment | Separates static constitutive response from propagation and delayed response. | Which sea and wake variables carry phase, polarization, dispersion, and energy transfer? |
| `G6` | Electron-positron pair, positronium, hydrogen, and one-electron ions | Introduces the smallest bound assemblies in a controlled order. | How do exclusion envelopes, source exposure, and shared-sea deformation change with partner polarity and nuclear geometry? |
| `G7` | High-$Z$ ion or other strong local electric environment | Amplifies relativistic, spin-sensitive, nuclear-size, and radiative consumers. | Does the sea response remain in the weak constitutive regime, or develop a new density, strain, or anisotropy branch? |
| `G8` | Dense or many-body charged matter, including the quantum Hall regime | Tests whether a common microscopic coupling produces a collective bulk response. | What sea configuration is induced by charge density, boundaries, lattice geometry, and macroscopic magnetic organization? |
| `G9` | Prescribed sea-density, strain, flow, orientation, or envelope-anisotropy variation | Directly tests environmental dependence without first naming it an electric or magnetic field. | Which sea variables change the parent coupling projection, and which change only propagation or assembly dynamics? |
| `G10` | Different gravitational potentials or gradients, extending eventually to compact-object conditions | Tests the possibility that effective gravity and electromagnetism share sea state variables. | Does gravitational sea loading change $q_{\mathrm{obs}}$, $h_\vartheta$, $c_\gamma$, or $\mathcal C_{\mathrm{EM}}$, or only the comparison clocks and paths? |
| `G11` | Different thermal or ambient radiation states | Tests background occupation and thermal sea response. | Does temperature change the coupling projection or only populate and perturb the assemblies used to infer it? |
| `G12-A` | Fixed-background scale projection | Provides the conventional control in which the parent matter and sea record is held fixed while the effective scale label changes. | Can wake/dressing and threshold response reproduce $\alpha(\mu)$ without changing matter or sea state? |
| `G12-B` | Matter energy-state transition $A\rightarrow B$ | Tests whether a higher-energy electron or other charged assembly has different internal cadence, radii, envelope scale, envelope shape, or exposure. | Does the assembly transition require a coupled local sea retuning, and which part of the changed readout belongs to matter geometry rather than the coupling? |
| `G12-C` | Matched matter state in different local or extended sea states | Tests whether energy-state preparation is accompanied by local or wider sea differences that survive outside the immediate assembly neighborhood. | At matched matter geometry and comparison scale, does changing sea density, cadence distribution, strain, orientation, flow, or boundary history change the inferred coupling? |

Plainly: `G2` through `G5` ask what actual geometry corresponds to applied
fields. `G9` and `G10` ask whether a changed sea or gravitational environment
changes the coupling itself. `G12-A` is the fixed-background running control;
`G12-B` and `G12-C` test the alternative that conventional running folds real
matter-braid and sea-state changes into one effective scale law. Changing the
comparison scale, changing the assembly state, and changing the sea are three
distinct operations until a derivation proves that they are linked.

Existing running measurements do not by themselves choose among these three
interpretations. They infer an effective coupling from scale-dependent process
observables under a declared QED or electroweak response model. Agreement
across processes, kinematic channels, and schemes strongly constrains any
native explanation to reproduce a common effective running law, but it does
not directly report an electron's internal braid radii or the Noether sea
state. The scenario ledger must therefore retain all three rows and ask what
additional same-scale controls distinguish them.

The scale $\mu$ must also be kept distinct from energy stored in a charged
assembly. In running measurements it commonly labels a momentum-transfer or
renormalization scale. Different event geometries can therefore sample
different $\mu$ values without preparing different persistent internal states
of the incoming electron, while different processes can be compared at a
matched $\mu$. A native map may still assign a $\mu$-dependent transient braid,
wake, and local sea geometry to the interaction event, but it must derive that
identification rather than equating higher $\mu$ with a smaller electron by
definition.

Plainly: the measurements may compress several native changes into one
$\alpha(\mu)$ curve. They do not make the assembly and sea possibilities go
away; they tell us how universal and reproducible their combined projection
must be. They also require the packet to distinguish persistent particle
state, event momentum transfer, and sea response.

## Absolute-Situation Factorization

Let $\mathfrak s$ label one declared physical situation. Its candidate alpha
carrier is

$$
\Theta_\alpha^{(\mathfrak s)}
=
\left(
\Theta_{\mathrm{matter}}^{(\mathfrak s)},
\Theta_{\mathrm{sea}}^{(\mathfrak s)},
\mathcal H_{\partial\Omega}^{(\mathfrak s)},
q_{\mathrm{obs}}^{(\mathfrak s)},
h_\vartheta^{(\mathfrak s)},
c_\gamma^{(\mathfrak s)},
\mathcal E_S^{(\mathfrak s)},
\mathcal C_{\mathrm{EM}}^{(\mathfrak s)}
\right)
$$

The matter, sea, and boundary entries belong to the absolute-state record. The
remaining entries are candidate electromagnetic readouts that must be derived
from that record rather than independently assigned.

Effective fields are child projections of source assemblies and sea response:

$$
\left(
\mathbf E_{\mathrm{eff}}^{(\mathfrak s)},
\mathbf B_{\mathrm{eff}}^{(\mathfrak s)}
\right)
=
\Pi_{\mathrm{EM}}
\left[
\Theta_{\mathrm{src}}^{(\mathfrak s)},
\Theta_{\mathrm{sea}}^{(\mathfrak s)},
\mathcal H_{\partial\Omega}^{(\mathfrak s)}
\right]
$$

Plainly: a declared electric or magnetic field describes part of the effective
assembly situation. It does not replace the required source and sea geometry
that produces that field.

The situation-conditioned coupling question is

$$
\alpha_{\mathrm{eff}}^{(\mathfrak s)}
=
\mathcal P_\alpha
\left[
\Theta_\alpha^{(\mathfrak s)}
\right]
$$

This is a question map, not a derived law. A changed spectral interval,
precession frequency, recoil, or resistance does not by itself establish that
$\alpha_{\mathrm{eff}}^{(\mathfrak s)}$ changed. The corresponding assembly,
field, propagation, and sea-response changes must first be accounted for.

Plainly: each scenario asks two questions. What observable does this geometry
produce, and does reproducing it require a different dimensionless coupling?

For conventional scale running inside one fixed situation, the subordinate
factorization is

$$
\alpha(\mu\mid\mathfrak s)
=
\alpha_{\mathrm{ref}}^{(\mathfrak s)}\,
\mathcal K_{\mathrm{EM}}
\left(
\mu;
\Theta_\alpha^{(\mathfrak s)},
I_\mu
\right)
$$

Its entries mean:

- $\mu$ is the declared observer-level probe energy or resolution scale;
- $\mathfrak s$ fixes the matter geometry, Noether sea state, boundary history,
  electromagnetic environment, and parent readouts for the comparison window;
- $\alpha_{\mathrm{ref}}^{(\mathfrak s)}$ is the coupling readout at a declared
  reference scale $\mu_0$ in that situation;
- $\mathcal K_{\mathrm{EM}}$ is the scale-dependent effective electromagnetic
  response derived from the same fixed situation record; and
- $I_\mu$ is the scheme-labelled inventory of charged effective channels
  resolved at scale $\mu$.

The vertical bar separates conventional scale variation from a change of
physical situation. The normalization condition is

$$
\mathcal K_{\mathrm{EM}}
\left(
\mu_0;
\Theta_\alpha^{(\mathfrak s)},
I_{\mu_0}
\right)
=1,
\qquad
\alpha_{\mathrm{ref}}^{(\mathfrak s)}
=
\alpha(\mu_0\mid\mathfrak s)
$$

Plainly: the reference value fixes the anchor, and the response factor carries
all allowed scale dependence within one situation. A changed matter geometry,
action period, charge convention, photon-speed row, gauge domain, applied-field
configuration, or Noether sea state defines a different $\mathfrak s$. It may
be a legitimate scenario comparison, but it is not running of the same fixed
record.

The current `EQ-26A` checker contract covers the fixed-background running
route, especially `G12-A`. It does not yet represent `G12-B`, `G12-C`, or the
full cross-situation inventory `G0` through `G11`. Adding that inventory here
changes the research question and the required evidence map, but it does not
populate an accepted row or change the present equation-mapping score.

Plainly: the existing checker remains useful for running. A later artifact must
add the declared-situation dimension without weakening its hidden-retune
control.

## Observer-Level Benchmark Anchors

The 2022 CODATA recommended low-energy value is

$$
\alpha(0)
=
7.297\,352\,5643(11)\times10^{-3},
\qquad
\alpha(0)^{-1}
=
137.035\,999\,177(21)
$$

This is the reference-scale benchmark for the packet, not a dimensionless
substrate input. The [2022 CODATA value
table](https://physics.nist.gov/cuu/pdf/wallet_2022.pdf) supplies the value and
uncertainty.

At the electroweak scale, the shorthand $\alpha(M_Z)\approx1/128$ is useful only
after its scheme and resolved channel content are declared. The 2024 PDG
electroweak review gives, in its five-flavor $\overline{\mathrm{MS}}$
comparison,

$$
\widehat{\alpha}^{(5)}(M_Z)^{-1}
=
127.930\pm0.008
$$

The [PDG electroweak
review](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-standard-model.pdf),
Section 10.2.2, also identifies low-energy hadronic vacuum polarization as part
of the uncertainty in transporting the electromagnetic coupling to this scale.
The low-energy and $M_Z$ rows therefore cannot be compared as two unlabeled
measurements of one scheme-free scalar.

Plainly: electromagnetic coupling is stronger at the higher comparison scale,
but the precise number near $1/128$ belongs to a declared calculation and
threshold convention. The map must reproduce both the change and the labels
that make the comparison meaningful.

## Reference-Coupling Derivation

Standard comparison form:

$$
\alpha
=
\frac{e^2}{4\pi\epsilon_0\hbar c_\gamma}
$$

Packet translation:

$$
\alpha_{\mathrm{ref}}
=
\mathcal P_\alpha
\left[
q_{\mathrm{obs}},
h_\vartheta,
c_\gamma,
\mathcal E_S,
\mathcal C_{\mathrm{EM}}(\theta_{\mathrm{sea}})
\right]
$$

Here $e$, $\epsilon_0$, $\hbar$, and $c_\gamma$ in the standard form are
effective comparison entries, not substrate constants. In the packet
translation, $q_{\mathrm{obs}}$ is a scheme-pinned charge/exposure readout,
$\mathcal E_S$ is the exposed-sector record, and
$\mathcal C_{\mathrm{EM}}$ is the electromagnetic part of the resolved Noether
sea constitutive response.

The retained-branch reduced-carrier action-period target inherited from
`EQ-12A` is

$$
h_\vartheta
\equiv
\oint_{\gamma_0}\vartheta_{\mathrm{PC}}
$$

where $\gamma_0$ is the certified retained periodic orbit and
$\vartheta_{\mathrm{PC}}$ is the local Poincare-Cartan one-form on the reduced
carrier. Its reduced action quantum is

$$
\hbar_\vartheta
\equiv
\frac{h_\vartheta}{2\pi}
$$

In standard observer notation, Planck's constant $h$ has units of action and
$\hbar=h/(2\pi)$. This packet does not use bare $h$ as a generic action
variable: $h_\vartheta$ names the particular retained-orbit action period, and
$\hbar_\vartheta$ names its reduced form. Both must be derived before any alpha
datum is consumed.

This action period is not a primitive per-architrino action and is not yet the
action functional whose variation derives the Master Equation. It is a
same-branch orbit readout. It gains authority only when the retained orbit also
satisfies the vector Master Equation and the action, history-energy, and
boundary residuals close on that record.

In a weak isotropic observer chart, the projection must reduce to

$$
\mathcal P_\alpha
\longrightarrow
\frac{q_{\mathrm{obs}}^2}
{4\pi\epsilon_{\mathrm{eff}}
\hbar_\vartheta c_\gamma}
$$

with $\epsilon_{\mathrm{eff}}$ extracted from
$\mathcal C_{\mathrm{EM}}(\theta_{\mathrm{sea}})$. This reduction is a recovery
condition, not a definition of the substrate. The same
$\epsilon_{\mathrm{eff}}$ must also serve the sourced Maxwell comparison in the
declared weak regime; it cannot be fitted only to $\alpha$.

Plainly: the low-energy number must result from a derived exposed charge, a
derived action period, a derived photon-channel speed, and the same sea
response used elsewhere in electromagnetism. Matching $1/137$ by assigning a
private permittivity or action unit would not explain it.

## Scale-Response Derivation

Standard comparison form:

$$
\frac{d\alpha^{-1}}{d\ln\mu}
=-b(\mu)
$$

Packet translation: inside the factorization,
$\alpha^{-1}=\alpha_{\mathrm{ref}}^{-1}
\mathcal K_{\mathrm{EM}}^{-1}$. Between declared threshold crossings, the
corresponding closure equation is

$$
\frac{d\alpha^{-1}}{d\ln\mu}
=
-\alpha_{\mathrm{ref}}^{-1}
\mathcal K_{\mathrm{EM}}^{-2}
\frac{d\mathcal K_{\mathrm{EM}}}{d\ln\mu}
=
-b_\theta(\mu)
$$

or equivalently

$$
\frac{d\mathcal K_{\mathrm{EM}}}{d\ln\mu}
=
\alpha_{\mathrm{ref}}\,
b_\theta(\mu)\,
\mathcal K_{\mathrm{EM}}^2
$$

Here $b_\theta(\mu)$ is the recovered observer-level running coefficient from
the same wake/dressing response and threshold inventory. The QED-like
coefficient is a comparison target in its valid regime, not a substrate input.

For a fixed charged-channel inventory in the standard QED-like one-loop
comparison regime,

$$
b(\mu)
=
\frac{2}{3\pi}
\sum_{f\in I_\mu}N_cQ_f^2,
\qquad
\beta_\alpha(\alpha,\mu)
\equiv
\frac{d\alpha}{d\ln\mu}
=
b(\mu)\alpha^2
+O(\alpha^3)
$$

Here $f$ indexes the resolved effective channels in $I_\mu$, $N_c$ is the
declared channel multiplicity, and $Q_f$ is the channel charge in units of the
declared reference charge.

For one unit-charge Dirac channel, this reduces to the often-quoted special
case $\beta_\alpha=2\alpha^2/(3\pi)+O(\alpha^3)$. Holding $b$ fixed between two
thresholds gives

$$
\alpha(\mu_1)
=
\frac{\alpha(\mu_0)}
{1-\alpha(\mu_0)b\ln(\mu_1/\mu_0)}
$$

The equivalent form with $\ln(\mu_1^2/\mu_0^2)/(3\pi)$ applies only to that
single-unit-charge case. Higher-loop terms and threshold matching must be
carried when the benchmark precision or scale interval requires them.

Plainly: a positive QED comparison coefficient makes $\alpha$ increase with
probe scale. The packet translates that behavior into a required change of the
electromagnetic response while keeping the parent record fixed. The familiar
one-line formula is a controlled special case, not a universal running law for
every charged inventory or across every threshold.

At a charged-channel threshold $\mu_k$, the packet must declare the matching
row

$$
\mathcal K_{\mathrm{EM}}(\mu_k^+)
-
\mathcal K_{\mathrm{EM}}(\mu_k^-)
=
\Delta\mathcal K_k
$$

where $\Delta\mathcal K_k$ is derived under the same scheme, exposure domain,
and Noether sea record. It must not be absorbed into a retuned
$\alpha_{\mathrm{ref}}$.

Plainly: between thresholds, the response kernel must reproduce the observed
slope. At thresholds, the same record must explain the matching change. Neither
case permits the underlying action unit or charge convention to move.

## Vacuum-Polarization Comparison And Native Translation

In QED, vacuum-polarization loops provide the effective screening account of
electromagnetic running. Charged-pair contributions modify the photon
propagator, so a low-momentum-transfer probe measures a more screened coupling
than a high-momentum-transfer probe. The familiar polarized-cloud picture is a
useful visualization of this effective result, but virtual particles in that
picture are not literal constituents imported into the substrate. Likewise,
shorter-distance language refers to the resolution associated with larger
momentum transfer in the declared observer experiment; it is not a new
fundamental distance law.

The corresponding $\mathbb{A}\mathbb{A}\mathbb{A}$ closure target is not to
reproduce the cartoon. It is to derive the same scale-dependent observer
response from the `vacuum_polarization_wake_dressing_row` and the shared
constitutive record:

$$
\mathcal K_{\mathrm{EM}}
=
\mathcal P_{\mathrm{dress}}
\left[
\mathcal E_S,
\mathcal C_{\mathrm{EM}}(\theta_{\mathrm{sea}}),
I_\mu,
\mu
\right]
$$

$\mathcal P_{\mathrm{dress}}$ is the packet's dressing projection. Its
low-energy screening, positive QED-like slope, and threshold changes must
appear as outputs of one retained carrier. The projection must also connect
to the same electromagnetic constitutive response used by sourced Maxwell
recovery; an alpha-only dressing coefficient would be a hidden fit.

Plainly: QED tells this packet what observed scale response must be recovered.
The native explanation must come from delayed geometry, exposure, and Noether
sea response, not from assuming a pre-existing quantum vacuum filled with
Standard Model particles.

## Graph Geometry And Coupling Basis

The apparent shape of running depends on the plotted variables. For the
electromagnetic convention used above, fixed $b$ gives

$$
\alpha^{-1}(\mu)
=
\alpha^{-1}(\mu_0)
-b\ln\left(\frac{\mu}{\mu_0}\right)
$$

Thus $\alpha^{-1}$ plotted against $\ln\mu$ is a straight line within a
one-loop interval of fixed channel content. If the horizontal coordinate is
$x=\log_{10}\mu$, its slope is $-b\ln 10$. By contrast,

$$
\alpha(\mu)
=
\frac{1}
{\alpha^{-1}(\mu_0)-b\ln(\mu/\mu_0)}
$$

is the reciprocal of an affine function of logarithmic scale. It is not
literally a logarithm. Against $\ln\mu$ it rises gently and curves upward;
against a linear $\mu$ axis its change is spread over many orders of magnitude
and ordinarily appears increasingly flat throughout the perturbative range.

| Vertical coordinate | Horizontal coordinate | One-loop fixed-inventory shape |
| --- | --- | --- |
| $\alpha^{-1}$ | $\ln\mu$ or $\log_{10}\mu$ | Straight line, with slope changed only by the logarithm base. |
| $\alpha$ | $\ln\mu$ or $\log_{10}\mu$ | Slowly rising reciprocal-linear curve. |
| $\alpha^{-1}$ | Linear $\mu$ | Slowly falling logarithmic curve. |
| $\alpha$ | Linear $\mu$ | Slowly rising curve that is generally visually flattened over the ordinary perturbative range. |

Plainly: the coupling does not acquire a different physical law when the graph
looks curved. A straight or curved trace can represent the same running after
the axes and reciprocal convention are changed.

Standard comparison form for the conventional three-coupling unification
plot:

$$
\alpha_i
=
\frac{g_i^2}{4\pi},
\qquad
\frac{d\alpha_i^{-1}}{d\ln\mu}
=
-\frac{B_i}{2\pi},
\qquad
i\in\{1,2,3\}
$$

so that

$$
\alpha_i^{-1}(\mu)
=
\alpha_i^{-1}(\mu_0)
-\frac{B_i}{2\pi}
\ln\left(\frac{\mu}{\mu_0}\right)
$$

Packet translation into collision-free semantic labels:

$$
\alpha_{Y,\mathrm{GUT}}
\equiv
\alpha_1
=
\frac{5}{3}\alpha_Y,
\qquad
\alpha_W
\equiv
\alpha_2,
\qquad
\alpha_s
\equiv
\alpha_3
$$

The numbered gauge symbols appear only in the displayed recognition and
translation forms. They are not packet working symbols because the canonical
terminology reserves that numbered alpha family for PPN preferred-frame
parameters. In this section, $\alpha_{Y,\mathrm{GUT}}$ is the GUT-normalized
hypercharge coupling, $\alpha_W$ is the weak-isospin coupling, and $\alpha_s$
is the strong coupling.

Here $B_i$ in the standard form is the conventional one-loop gauge beta
coefficient. It is kept distinct from this packet's $b$, which already
includes the factor $1/(2\pi)$; within the corresponding electromagnetic
interval,

$$
b
=
\frac{B_{\mathrm{EM}}}{2\pi}
$$

The labels are also important. The GUT-normalized hypercharge line is not
ordinary electromagnetic $\alpha$. At the electroweak matching scale,

$$
\alpha_{\mathrm{EM}}^{-1}
=
\alpha_Y^{-1}+\alpha_W^{-1}
=
\frac{5}{3}\alpha_{Y,\mathrm{GUT}}^{-1}+\alpha_W^{-1}
$$

The [PDG grand-unification
review](https://pdg.lbl.gov/2023/reviews/rpp2023-rev-guts.pdf), Section 93.5 and
Figure 93.1, gives the one-loop affine form and shows the two-loop and threshold
qualification.

Plainly: the classic three-line diagram compares normalized gauge-basis
couplings. Calling its hypercharge line “electromagnetism” hides the
electroweak mixing and normalization that must accompany any quantitative
comparison.

Massive-channel transitions add a second qualification. In a sharp
effective-theory presentation, a massive channel is integrated out below its
matching scale and included above it, giving piecewise-linear inverse-coupling
segments with changed slopes and matching offsets. Higher-loop evolution adds
gentle curvature. Physical observables generally cross a massive threshold
smoothly rather than developing an exact geometric corner.

The condition $E\geq2mc^2$ is the on-shell pair-production threshold for an
appropriate time-like process; it is not the condition under which a virtual
loop first exists. For running-coupling bookkeeping, a massive contribution
decouples for $\mu\ll m$, becomes active for $\mu\gg m$, and is matched through
a scheme- and observable-dependent region of order $m$. Charm, bottom, and top
therefore change the effective inventory, but not as universal exact kinks at
$2mc^2$.

Plainly: threshold bends mean that the effective channel inventory and matching
description have changed. They do not mean a virtual particle suddenly begins
to exist at the real-pair-production energy.

## Scale Narrative: Resolving The Response

The useful narrative is successive resolution of electromagnetic dressing,
not the exposure of a measurable naked core. In renormalized QED, a bare charge
is regulator- and scheme-dependent rather than an observable object. The
polarized-cloud or onion picture can illustrate why a higher-momentum probe
measures a larger effective coupling, but it must not be read as a literal map
of particles surrounding an electron in the substrate.

| Stage | Observer benchmark | Defensible physical narrative | Inference not carried forward |
| --- | --- | --- | --- |
| Low momentum transfer | $\alpha(0)^{-1}=137.035\,999\,177(21)$ | The long-resolution readout includes the full low-energy polarization response represented in the declared comparison scheme. | Most of a hidden true charge has literally been canceled by a material fog. |
| Electroweak scale | $\widehat{\alpha}^{(5)}(M_Z)^{-1}=127.930\pm0.008$ in the stated $\overline{\mathrm{MS}}$ convention | Larger momentum transfer resolves shorter-scale response, and the effective electromagnetic coupling is larger. | A collider physically punches through layers of virtual particles to touch an electron core. |
| High-scale gauge evolution | $\alpha_{Y,\mathrm{GUT}}$, $\alpha_W$, and $\alpha_s$ with declared normalization, spectrum, and thresholds | The three gauge-basis couplings evolve with different beta coefficients and may approach one another in selected extensions. | The interactions are empirically known to merge, or ordinary $\alpha_{\mathrm{EM}}$ simply reaches $1/40$. |
| Formal QED ultraviolet extrapolation | Zero of the one-loop denominator defining the Landau-pole scale | The isolated perturbative QED formula signals that it cannot serve as an ultraviolet-complete description indefinitely. | Quantum gravity is known to prevent the pole by turning spacetime into quantum foam. |

Plainly: each stage says what a declared observer calculation reports at a
different resolution. None reveals a directly measurable bare charge or
licenses an imported microscopic picture for the Noether sea.

At the atomic comparison level, the smallness of $\alpha$ controls useful
hydrogenic hierarchies such as

$$
\frac{v}{c_\gamma}
\sim
\frac{Z\alpha}{n},
\qquad
\frac{|E_{\mathrm{bind}}|}{m_ec_\gamma^2}
\sim
\frac{(Z\alpha)^2}{2n^2}
$$

Here $Z$ is the nuclear charge number, $n$ is the principal quantum number,
$v$ is the bound-state speed estimate, $E_{\mathrm{bind}}$ is the binding
energy, and $m_e$ is the observer-level electron mass. These are observer-level
Coulombic scaling targets. For the hydrogen ground state, $Z=n=1$ makes
$v/c_\gamma$ of order $\alpha$ and the binding fraction of order $\alpha^2$.
They help explain the perturbative hierarchy of ordinary atomic structure, but
they do not establish by themselves that chemistry, DNA, or solid matter would
be stable under an arbitrary change of $\alpha$; those are many-parameter,
many-body questions.

Plainly: $1/137$ organizes the size of familiar atomic corrections. It is an
important ingredient in ordinary matter, not a one-number proof of every form
of material or biological stability.

The useful distance language is a resolution estimate. For a relativistic
probe with characteristic momentum scale $\mu$,

$$
\ell_{\mathrm{res}}
\sim
\frac{\hbar c_\gamma}{\mu}
$$

$\ell_{\mathrm{res}}$ is the estimated observer-level spatial resolution. At
$\mu=M_Z\approx91\,\mathrm{GeV}$ this gives a resolution of order
$2\times10^{-18}\,\mathrm{m}$. The estimate connects momentum transfer to
spatial resolution; it does not say that $\alpha$ is fundamentally a function
of Euclidean radius or that the probe crosses literal shells.

Plainly: greater collision energy can resolve shorter structures, but “zooming
inside the cloud” remains a picture of the effective measurement, not the
native mechanism.

For the high-scale comparison, the numerical claim must be attached to a
model. The PDG example with a minimal supersymmetric spectrum and omitted
subleading corrections gives

$$
M_G
\simeq
2\times10^{16}\,\mathrm{GeV},
\qquad
\alpha_G^{-1}(M_G)
\simeq
24.3
$$

$M_G$ is the model's comparison meeting scale and $\alpha_G$ is its common
coupling at that scale. This is not ordinary
$\alpha_{\mathrm{EM}}\approx1/40$, and it is not a Standard Model result. The
minimal Standard Model lines fail quantitative unification; the quoted meeting
belongs to the specified extension and changes with its spectrum and threshold
corrections. Above electroweak matching, the correct comparison tracks the
gauge-basis couplings rather than continuing ordinary electromagnetic
$\alpha_{\mathrm{EM}}$ as an isolated identity.

Plainly: a near-meeting of three extrapolated couplings is a model test, not an
observation that electromagnetism has lost its identity or that one substrate
interaction has been derived.

Finally, the fixed-$b$ one-loop electromagnetic expression has a formal pole
where its denominator vanishes:

$$
\mu_L
=
\mu_0
\exp\left[
\frac{1}{b\alpha(\mu_0)}
\right]
$$

This extrapolation lies far outside the regime in which isolated low-order QED
with fixed channel content is justified. It does not place the pole at the
Planck scale, prove that a physical divergence occurs, or identify quantum
gravity as its resolution. The Planck scale remains a separate observer-level
comparison regime where gravitational quantum effects are expected to matter.
The $\mathbb{A}\mathbb{A}\mathbb{A}$ substrate retains Euclidean void and
absolute time; quantum foam is therefore not imported as its ultraviolet
ontology.

Plainly: the Landau pole is a warning about indefinite extrapolation of the
comparison formula. It is not evidence for a smallest distance, spacetime foam,
or a known cosmic mechanism that prevents an infinity.

## Comparison Boundary: QED, QCD, And Unification

The [PDG grand-unification
review](https://pdg.lbl.gov/2023/reviews/rpp2023-rev-guts.pdf), Section 93.5,
states the essential qualification: quantitative coupling unification fails in
the minimal Standard Model extrapolation and works much more closely only for
declared extensions and threshold assumptions.

| Observer-level comparison | Running behavior | Use in this packet |
| --- | --- | --- |
| Electromagnetic QED regime | Charged-matter screening gives a positive one-loop electromagnetic beta coefficient, so $\alpha$ grows with scale between declared thresholds. | Required recovery target for $\mathcal K_{\mathrm{EM}}$. |
| Asymptotically free QCD regime | Non-Abelian gauge-sector contributions dominate the usual high-energy strong-coupling beta coefficient, so $\alpha_s$ decreases with scale. | Contrast showing that one universal screening response cannot be assumed; a separate strong/gauge carrier is required. |
| Grand-unification extrapolation | High-scale meeting depends on coupling normalization, spectrum, thresholds, perturbative order, and model. The minimal Standard Model extrapolation does not give quantitative unification; selected extensions can bring the couplings much closer near $10^{16}\,\mathrm{GeV}$. | Optional comparison only after separate electromagnetic, weak, and strong running carriers exist; not an alpha-map closure obligation. |

Plainly: electromagnetic screening does not establish a universal mechanism for
all gauge couplings, and three extrapolated lines approaching one another does
not by itself establish a unified substrate interaction. This packet keeps the
measured running of $\alpha$ as required benchmark pressure and leaves grand
unification as model-dependent comparison material.

## Fixed-Record Conditions

For scale running inside one declared situation $\mathfrak s$, the no-retune
conditions are

$$
\frac{\partial h_\vartheta}{\partial\ln\mu}=0,
\qquad
\frac{\partial q_{\mathrm{obs}}}{\partial\ln\mu}=0,
\qquad
\frac{\partial c_\gamma}{\partial\ln\mu}=0,
\qquad
\theta_{\mathrm{sea}}(\mu)
=
\theta_{\mathrm{sea}}(\mu_0)
$$

The gauge scheme is fixed across the comparison. The threshold inventory may
carry declared scale labels, but all child rows must retain the same carrier
id, source provenance, exposure domain, action-period parent, and photon-speed
parent.

Plainly: only the effective response and its declared threshold content may
run inside one $\mathfrak s$. Everything that defines that physical situation
stays fixed. A comparison between two different situations may intentionally
change the sea or field geometry, but it must use two explicitly related
carriers rather than disguising the change as scale running.

## Shared Carrier And Required Rows

The smallest useful fixed-situation mathematical object is

$$
\Theta_\alpha^{(\mathfrak s,\mu,W)}
=
\left(
q_{\mathrm{obs}},
h_\vartheta,
c_\gamma,
\mathcal E_S,
\mathcal C_{\mathrm{EM}}(\theta_{\mathrm{sea}}),
\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}},I_\mu),
I_\mu,
\mathcal R_\alpha,
\mathcal S_{\mathrm{retune}}
\right)
$$

where $W$ is the declared finite source/measurement window. The residual vector
is

$$
\mathcal R_\alpha
=
\left(
\Delta_{\alpha(0)},
\Delta_{\mathrm{Ryd}},
\Delta_{\mathrm{fs}},
\Delta_{\mathrm{run}},
\mathcal S_{\mathrm{retune}}
\right)
$$

Plainly: one object must carry the low-energy value, atomic consequences,
running behavior, and proof that none of the parents were secretly changed
inside the declared situation. Cross-situation comparisons require a family
of such objects with their intended geometry changes made explicit.

| Required row | Mathematical job | Owning prerequisite |
| --- | --- | --- |
| `theta_gamma_packet` | Supplies the accepted photon/action parent. | `EQ-12` photon closure. |
| `retained_orbit_reduction_row` and `geometry_derived_action_period_row` | Derive $h_\vartheta$ before any alpha datum is consumed. | `EQ-12A`. |
| `charge_exposure_row` | Pins $q_{\mathrm{obs}}$, its scheme, exposure domain, and source provenance. | `EQ-16` exposure-domain work and Standard Model Closure; these are clues, not substitutes for the alpha row. |
| `local_photon_speed_row` | Supplies $c_\gamma$ from the same photon parent used by atomic consumers. | Photon closure and `EQ-26`. |
| Resolved Noether sea constitutive record | Supplies $\epsilon_{\mathrm{eff}}$ and the response state from one resolved Noether sea record. | `EMAP-004` and Master Equation Closure. |
| `alpha_coupling_row` | Evaluates $\alpha_{\mathrm{ref}}$ from the accepted parent rows. | `EQ-26A`. |
| `gauge_covariance_row` | Shows that a gauge-chart change does not change the physical branch ledger. | Gauge/exposure closure. |
| `charged_threshold_inventory` | Declares $I_\mu$ for each running interval and matching point. | Standard Model Closure benchmark mapping. |
| `vacuum_polarization_wake_dressing_row` | Derives the scale response carried by $\mathcal K_{\mathrm{EM}}$. | `EMAP-004` plus photon/pair/event ledgers. |
| `energy_scale_running_row` | Evaluates the slope and threshold-matching residuals. | `EQ-26A`. |
| `source_provenance` and `no_hidden_retune_witness` | Bind every anchor to one source, scheme, exposure domain, sea state, and parent chain. | Shared across all owners. |

Plainly: the work crosses several existing owners, but every row joins one
carrier. No supporting workstream may substitute its priority prose or attempt
fixture for the accepted source row that `EQ-26A` requires.

## Direct Geometry And Evidence Map

| Comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ readout | Same-record requirement | Advancement falsifier | Smallest accepted evidence object |
| --- | --- | --- | --- | --- |
| Parent action/photon scale | Retained action period and local photon-channel speed. | `theta_gamma_packet`, $h_\vartheta$, and $c_\gamma$ use one parent chain. | Priority prose, attempts, probes, or generated files presented as parent evidence. | Accepted photon packet plus retained-orbit and photon-speed rows. |
| $q_{\mathrm{obs}}$ | Scheme-pinned exposed-polarity readout. | Charge exposure, gauge domain, carrier id, and provenance remain fixed across anchors. | `eq26a.alpha_hidden_retune`. | Accepted `charge_exposure_row` rooted in a durable source record. |
| $\alpha_{\mathrm{ref}}$ | Weak-chart projection $\mathcal P_\alpha$ from charge, action, photon speed, and sea response. | The coupling row consumes the accepted parent ids without inversion from observed alpha. | `eq26a.alpha_fitted_action_period`. | Accepted `alpha_coupling_row` bound to accepted charge/action/photon/constitutive rows. |
| $I_\mu$ | Charged-channel threshold readout for the declared scale interval. | Threshold ids, matching scheme, wake response, and source provenance share one carrier. | An undeclared threshold or a pointwise fitted coupling. | Accepted threshold inventory and matching rows. |
| $\mathcal K_{\mathrm{EM}}$ | Noether sea electromagnetic wake/dressing response. | The same constitutive state serves sourced Maxwell coefficients and alpha running. | `scale_independent_alpha` or a private alpha-only constitutive coefficient. | Accepted constitutive and wake/dressing rows with two independent electromagnetic benchmark families. |
| $\mathcal S_{\mathrm{retune}}$ | Same-record witness across low-energy, atomic, recoil, and running anchors within one declared situation. | Every child cites one carrier, source, scheme, exposure domain, sea state, and parent chain. | An undeclared parent change inside one fixed-situation comparison. | Source-backed $\Theta_\alpha^{(\mathfrak s,\mu,W)}$ consumed by the existing checker. |

Plainly: each effective comparison term has a named native readout, a binding
rule, and a failure condition. The table is a proof route, not evidence that
any row has already been derived.

## Benchmark Ladder

The first comparison must use independent consumers rather than multiple
rewritings of the same datum.

| Rung | Benchmark role | Use rule |
| --- | --- | --- |
| Low-energy $\alpha(0)$ | Reference coupling anchor. | Carry the measurement method and covariance; do not derive $h_\vartheta$ by inversion. |
| Rydberg/hydrogen scale | Action-charge-spectrum consistency consumer. | Consume the `EQ-26` hydrogen carrier; do not fit a private alpha or gross-spectrum coefficient. |
| Atomic fine-structure splitting | Higher-order atomic consumer. | Keep spin-sensitive and radiation/wake corrections outside the gross spectral fit until their ledgers exist. |
| Independent recoil family | Charge/action calibration and cross-check. | Keep rubidium and cesium determinations as distinct records rather than averaging a discrepancy away. |
| $\widehat{\alpha}^{(5)}(M_Z)$ or another declared running point | Scale-response anchor. | Carry scheme, scale, threshold inventory, and hadronic-polarization uncertainty. |
| Electron $g-2$ | Withheld precision consumer. | Freeze the alpha/electron/electromagnetic record without fitting $a_e$, then predict the moment residual. |

Plainly: the same derived coupling must survive low-energy, atomic, recoil, and
running tests. The electron moment is strongest when withheld from calibration.

The useful content of the supplied fine-structure overview is consolidated in
this packet as follows: the low-energy value and running are benchmark rows;
the one-loop beta function is a regime-limited comparison equation; the
screening cloud is explanatory imagery for the observer-level QED account; the
inverse-coupling-versus-logarithmic-scale plot is piecewise near-linear; the
QED/QCD contrast prevents a universal-response assumption; and high-scale grand
unification and the Landau pole remain optional, model-dependent comparison
material.
Atomic spectral splitting, the $v/c\sim\alpha$ comparison, and
binding-to-rest-energy scaling of order $\alpha^2$ remain downstream consumers,
not independent evidence for the native coupling row.

Plainly: the supplied material strengthens the benchmark and explanation map,
but it does not fill any accepted native row or change the current score.

## Strongest Falsifier

Derive $h_\vartheta$ from retained-orbit geometry, pin $q_{\mathrm{obs}}$ and
$\mathcal C_{\mathrm{EM}}$, and then evaluate $\alpha(0)$, one atomic
fine-structure anchor, and one running point. Extract the action period implied
by each observer comparison without refitting the source record.

The fixed-situation map fails if the inferred periods disagree under numerical
refinement, if matching the running point requires

$$
\frac{\partial h_\vartheta}{\partial\ln\mu}\ne0
$$

or if any anchor inside the same declared situation requires a different
charge exposure, photon speed, gauge domain, constitutive state, or Noether sea
record.

Plainly: one geometry-derived action clock must work everywhere. If each alpha
measurement demands a different clock or electromagnetic environment, the
fixed-situation factorization is incoherent. A planned comparison of different
field, matter, sea, or gravity scenarios is not a failure; its burden is to
show exactly what changed and whether the inferred dimensionless coupling did.

## Current Evidence Boundary

The live `EQ-26A` source-attempt fixture is score-neutral. The
[Planck/alpha runner](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs)
currently reports `blocked_missing_rows`,
`nextBlocker=missing_accepted_theta_gamma_packet`,
`scoreDecision=no_score_increase`, `alphaRunningPass=true`, and all 15 declared
negative controls passing. These are checker-contract measurements on attempt
rows, not an independent derivation of $\alpha$.

The derivation dependency order is:

1. accepted parent `theta_gamma_packet`;
2. accepted retained-orbit/action-period support;
3. scheme-pinned `charge_exposure_row`;
4. shared electromagnetic constitutive row;
5. accepted `alpha_coupling_row`;
6. accepted wake/dressing, threshold, running, provenance, and no-retune rows.

The exact checker order remains owned by the
[EQ-26A source-field map](../equation-mapping/eq-26a-theta-alpha-source-field-map.md);
the current global first blocker is `missing_accepted_theta_gamma_packet`, and
the first local source-field object is `charge_exposure_row`.

The smallest alpha-specific next object is a source-backed charge-exposure
report that declares the $q_{\mathrm{obs}}$ scheme and durable source identity.
It must bind forward to the coupling, constitutive, wake/dressing, and running
rows without marking them accepted prematurely.

## Speculative Geometry Route

The Master Equation constant-count audit leaves open whether a surviving
dimensionless native combination could be fixed by self-consistency and then
map to $\alpha_{\mathrm{ref}}$. This is a speculation, not the current
derivation route. It becomes a theorem target only after the native
dimensionless combination, its unit independence, the fixing condition, and
the projection $\mathcal P_\alpha$ are all stated without using alpha data.

## Promotion Targets

Successful source-backed results may support:

- [Architrino SI Base Units](../../../content/markdown/aaa/validation/architrino-si-base-units.md);
- [Parameter Ledger](../../../content/markdown/aaa/validation/parameter-ledger.md);
- [Atomic Spectra](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md);
- [Gauge Structure Emergence](../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md);
- [Solving the Crisis](../../../content/markdown/aaa/philosophy-history/solving-the-crisis.md); and
- the electron magnetic-response and radiation chapters.

Promotion requires at least one source-backed
$\Theta_\alpha^{(\mathfrak s,\mu,W)}$ whose
reference coupling, one independent atomic or recoil consumer, and one running
consumer share the accepted parent rows and pass the no-hidden-retune controls.

Closure goal: derive a situation-conditioned $\alpha_{\mathrm{eff}}$ from
retained matter, field, and Noether sea geometry; then derive
$\mathcal K_{\mathrm{EM}}$ inside one fixed situation and distinguish true
coupling variation from changes in downstream alpha-sensitive observables.
