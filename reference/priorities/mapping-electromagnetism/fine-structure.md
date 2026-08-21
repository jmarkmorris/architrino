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

The fine-structure constant is not a primitive substrate constant in this
packet. Its measured low-energy value, atomic consequences, radiative
corrections, and running are observer-level recovery targets. Standard
electromagnetic and QED equations specify the comparison surface; they are not
premises for an individual architrino's acceleration.

Plainly: this file asks how one native charge/action/photon/sea record produces
the observed electromagnetic coupling. It does not insert the observed value
or QED running law into the Master Equation.

## Target Factorization

The organizing equation is

$$
\alpha(\mu;\theta_{\mathrm{sea}})
=
\alpha_{\mathrm{ref}}\,
\mathcal K_{\mathrm{EM}}
\left(\mu;\theta_{\mathrm{sea}},I_\mu\right).
$$

Its entries mean:

- $\mu$ is the declared observer-level probe energy or resolution scale;
- $\theta_{\mathrm{sea}}$ is the fixed Noether sea state for the comparison
  window;
- $\alpha_{\mathrm{ref}}$ is the coupling readout at a declared reference scale
  $\mu_0$;
- $\mathcal K_{\mathrm{EM}}$ is the scale-dependent effective electromagnetic
  response derived from the same exposure and Noether sea record; and
- $I_\mu$ is the scheme-labelled inventory of charged effective channels
  resolved at scale $\mu$.

The semicolon separates the varied probe scale from the fixed environmental
record. The normalization condition is

$$
\mathcal K_{\mathrm{EM}}
\left(\mu_0;\theta_{\mathrm{sea}},I_{\mu_0}\right)
=1,
\qquad
\alpha_{\mathrm{ref}}
=
\alpha(\mu_0;\theta_{\mathrm{sea}}).
$$

Plainly: the reference value fixes the anchor, and the response factor carries
all allowed scale dependence. A changed action period, charge convention,
photon-speed row, gauge domain, or Noether sea state is a different record, not
running of the same coupling.

## Reference-Coupling Derivation

The observer comparison is conventionally written

$$
\alpha
=
\frac{e^2}{4\pi\epsilon_0\hbar c_\gamma}.
$$

For this map, $e$, $\epsilon_0$, $\hbar$, and $c_\gamma$ are effective
comparison entries. They must not be imported as substrate constants. The
native derivation target is a projection

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
\right],
$$

where $q_{\mathrm{obs}}$ is a scheme-pinned charge/exposure readout,
$h_\vartheta$ is the geometry-derived action period,
$\hbar_\vartheta=h_\vartheta/(2\pi)$, $\mathcal E_S$ is the exposed-sector
record, and $\mathcal C_{\mathrm{EM}}$ is the electromagnetic part of the
resolved Noether sea constitutive response.

In a weak isotropic observer chart, the projection must reduce to

$$
\mathcal P_\alpha
\longrightarrow
\frac{q_{\mathrm{obs}}^2}
{4\pi\epsilon_{\mathrm{eff}}
\hbar_\vartheta c_\gamma},
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

The standard running comparison is

$$
\frac{d\alpha^{-1}}{d\ln\mu}
=-b(\mu).
$$

Inside the factorization, $\alpha^{-1}=\alpha_{\mathrm{ref}}^{-1}
\mathcal K_{\mathrm{EM}}^{-1}$. Between declared threshold crossings, the
corresponding native closure equation is therefore

$$
\frac{d\alpha^{-1}}{d\ln\mu}
=
-\alpha_{\mathrm{ref}}^{-1}
\mathcal K_{\mathrm{EM}}^{-2}
\frac{d\mathcal K_{\mathrm{EM}}}{d\ln\mu}
=
-b_\theta(\mu),
$$

or equivalently

$$
\frac{d\mathcal K_{\mathrm{EM}}}{d\ln\mu}
=
\alpha_{\mathrm{ref}}\,
b_\theta(\mu)\,
\mathcal K_{\mathrm{EM}}^2.
$$

Here $b_\theta(\mu)$ is the recovered observer-level running coefficient from
the same wake/dressing response and threshold inventory. The QED-like
coefficient is a comparison target in its valid regime, not a substrate input.

At a charged-channel threshold $\mu_k$, the packet must declare the matching
row

$$
\mathcal K_{\mathrm{EM}}(\mu_k^+)
-
\mathcal K_{\mathrm{EM}}(\mu_k^-)
=
\Delta\mathcal K_k,
$$

where $\Delta\mathcal K_k$ is derived under the same scheme, exposure domain,
and Noether sea record. It must not be absorbed into a retuned
$\alpha_{\mathrm{ref}}$.

Plainly: between thresholds, the response kernel must reproduce the observed
slope. At thresholds, the same record must explain the matching change. Neither
case permits the underlying action unit or charge convention to move.

## Fixed-Record Conditions

For one comparison carrier and fixed $\theta_{\mathrm{sea}}$, the no-retune
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
\theta_{\mathrm{sea}}(\mu_0).
$$

The gauge scheme is fixed across the comparison. The threshold inventory may
carry declared scale labels, but all child rows must retain the same carrier
id, source provenance, exposure domain, action-period parent, and photon-speed
parent.

Plainly: only the effective response and its declared threshold content may
run. Everything that defines which physical record is being measured stays
fixed.

## Shared Carrier And Required Rows

The smallest useful mathematical object is

$$
\Theta_\alpha^{(\mu,W)}
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
\right),
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
\right).
$$

Plainly: one object must carry the low-energy value, atomic consequences,
running behavior, and proof that none of the parents were secretly changed.

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
| $\mathcal S_{\mathrm{retune}}$ | Same-record witness across low-energy, atomic, recoil, and running anchors. | Every child cites one carrier, source, scheme, exposure domain, sea state, and parent chain. | Any anchor requires a changed parent entry. | Source-backed $\Theta_\alpha^{(\mu,W)}$ consumed by the existing checker. |

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
| $\hat{\alpha}(M_Z)$ or another declared running point | Scale-response anchor. | Carry scheme, scale, threshold inventory, and hadronic-polarization uncertainty. |
| Electron $g-2$ | Withheld precision consumer. | Freeze the alpha/electron/electromagnetic record without fitting $a_e$, then predict the moment residual. |

Plainly: the same derived coupling must survive low-energy, atomic, recoil, and
running tests. The electron moment is strongest when withheld from calibration.

The source-mined 2022 fine-structure overview is retained only as a source lead.
It usefully groups $\alpha(0)\approx1/137.035999$, spectral splitting,
Coulomb-to-photon energy ratios, the $v/c\sim\alpha$ atomic comparison,
binding-to-rest-energy scaling of order $\alpha^2$, and energy-scale running.
Its anthropic or multiverse interpretation is outside this equation map. None
of those comparisons supplies accepted retained evidence for a native row.

## Strongest Falsifier

Derive $h_\vartheta$ from retained-orbit geometry, pin $q_{\mathrm{obs}}$ and
$\mathcal C_{\mathrm{EM}}$, and then evaluate $\alpha(0)$, one atomic
fine-structure anchor, and one running point. Extract the action period implied
by each observer comparison without refitting the source record.

The map fails if the inferred periods disagree under numerical refinement, if
matching the running point requires

$$
\frac{\partial h_\vartheta}{\partial\ln\mu}\ne0,
$$

or if any anchor requires a different charge exposure, photon speed, gauge
domain, constitutive state, or Noether sea record.

Plainly: one geometry-derived action clock must work everywhere. If each alpha
measurement demands a different clock or electromagnetic environment, the
factorization is incoherent.

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

Promotion requires at least one source-backed $\Theta_\alpha^{(\mu,W)}$ whose
reference coupling, one independent atomic or recoil consumer, and one running
consumer share the accepted parent rows and pass the no-hidden-retune controls.

Closure goal: derive $\alpha_{\mathrm{ref}}$ and
$\mathcal K_{\mathrm{EM}}$ from one retained electromagnetic exposure and
Noether sea response record, then falsify that map across independent
low-energy, atomic, recoil, and running benchmarks without retuning.
