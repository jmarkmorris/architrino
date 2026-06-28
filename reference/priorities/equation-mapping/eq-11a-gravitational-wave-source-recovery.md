# EQ-11A Gravitational-Wave Source Recovery

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source audit: [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md)
- Parent packet: [EQ-11 Through EQ-20 Gravity And Dark-Energy Packet](eq-11-20-gravity-dark-energy-packet.md)
- Assigned ID: `EQ-11A`
- Related corpus material: [Gravitational Waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md), [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), [Noether Sea](../../../content/markdown/aaa/spacetime/noether-sea.md)
- Claim level: observer-level gravitational-wave source benchmark, native carrier dictionary, and fail-closed residual target
- Promotion status: priority-only
- Current score: `2`

## Purpose

`EQ-11A` splits gravitational-wave source recovery out of the broader weak-gravity row. The parent `EQ-11` row asks for Poisson and Einstein-limit readouts from one Noether sea constitutive record. This suffix row asks whether the same effective-metric discipline can recover source-side gravitational-wave equations:

- quadrupole radiated power;
- chirp mass and inspiral frequency drift;
- Peters-Mathews circular orbital decay;
- calibrated strain flux at a detector;
- radiated energy and angular momentum;
- and ringdown labels for the final compact object.

The row is not a claim that gravitational-wave sources have already been derived in $\mathbb{A}\mathbb{A}\mathbb{A}$. It is a bounded equation-mapping packet that turns source equations into one retained-record target with explicit failure modes.

## Equation Attack Card

| Field | Current result |
| --- | --- |
| Current score | `2` |
| Closure driver | Recover quadrupole power, chirp mass and drift, Peters-Mathews orbital decay, detector strain flux, radiated energy/angular momentum, and ringdown labels from one gravitational-wave source carrier. |
| Exact first blocker | `missing_accepted_gw_source_carrier` in the default attempt. |
| Deepest current probe | [eq11a-gravitational-wave-source-no-hidden-retune-witness-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-no-hidden-retune-witness-source-contract-attempt.v1.json) marks every required row accepted-looking with row-specific source-contract boundaries, then fails closed at `source_contract_boundary_not_retained_evidence`. |
| Selected source-window shard | [EQ-11A GW150914 Source-Field Map](eq-11a-gw150914-source-field-map.md), which maps `GW150914-v3` to the Direct Geometry Layer and fail-closed controls without accepting retained evidence. |
| Smallest score-moving evidence object | A retained $\Theta_{\mathrm{GWsrc}}(W,P)$ packet whose source carrier, Noether sea/effective-metric rows, source-event ledger, detector strain record, radiated-output ledger, ringdown label, source provenance, and no-hidden-retune witness are accepted, durable-source-backed, and same-record bound. |
| Fail-closed controls already exercised | Coordination-source and probe-source controls keep accepted-looking `gw_source_carrier` rows blocked when sourced only to priority/probe artifacts; the `theta_sea` controls keep authored Noether sea prose or row-mismatched durable source contracts from satisfying retained `theta_sea` evidence; the tensor, source-event-ledger, quadrupole, chirp-mass, Peters-decay, strain-flux, ringdown-label, detector-strain, source-provenance, and no-hidden-retune row-mismatch controls keep wrong-row support from satisfying `effective_metric_tensor_channel`, `source_event_ledger`, `quadrupole_source_row`, `chirp_mass_row`, `peters_decay_row`, `strain_flux_row`, `ringdown_label_row`, `detector_strain_record`, `source_provenance`, or `no_hidden_retune_witness`; the checker blocks all-source-contract shells at `source_contract_boundary_not_retained_evidence`. |
| Next safe implementation target | Replace the source-contract shell with the smallest accepted retained $\Theta_{\mathrm{GWsrc}}(W,P)$ evidence object; leave the score at `2` until that object is durable-source-backed and the checker reports populated without source-contract-boundary rows. |

## Standard Benchmark

The leading circular-binary chirp-mass comparison is

$$
\mathcal M_c
=
\frac{(m_1m_2)^{3/5}}{(m_1+m_2)^{1/5}},
$$

with leading chirp-rate benchmark

$$
\dot f_{\mathrm{GW}}
=
\frac{96}{5}\pi^{8/3}
\left(\frac{G_{\mathrm{eff}}\mathcal M_c}{c_{\mathrm{GW}}^3}\right)^{5/3}
f_{\mathrm{GW}}^{11/3}.
$$

For a circular orbit, the Peters-Mathews semi-major-axis decay is

$$
\dot a
=
-\frac{64}{5}
\frac{G_{\mathrm{eff}}^3m_1m_2(m_1+m_2)}
{c_{\mathrm{GW}}^5a^3}.
$$

The leading quadrupole-power comparison can be written either as

$$
P_{\mathrm{GW}}
=
\frac{G_{\mathrm{eff}}}{5c_{\mathrm{GW}}^5}
\left\langle
\dddot Q_{ij}\dddot Q^{ij}
\right\rangle,
$$

or, for a circular binary,

$$
P_{\mathrm{GW}}
=
\frac{32}{5}
\frac{G_{\mathrm{eff}}^4\mu^2M^3}
{c_{\mathrm{GW}}^5a^5},
\qquad
\mu=\frac{m_1m_2}{M}.
$$

The detector-side strain-flux comparison is

$$
\mathcal F_{\mathrm{GW}}
=
\frac{c_{\mathrm{GW}}^3}{32\pi G_{\mathrm{eff}}}
\left\langle
\dot h_+^2+\dot h_\times^2
\right\rangle.
$$

Ringdown is represented here only as an observer-level final-compact-object label comparison:

$$
f_{\mathrm{ring}}
=
\alpha_{\mathrm{QNM}}
\frac{c_{\mathrm{GW}}^3}{G_{\mathrm{eff}}M_f},
\qquad
\tau_{\mathrm{ring}}
=
\beta_{\mathrm{QNM}}
\frac{G_{\mathrm{eff}}M_f}{c_{\mathrm{GW}}^3}.
$$

These are grounded equations because they follow from conservation, weak-field radiation, orbital dynamics, strain-energy flux, and final-state compact-object comparisons. They are not loose curve fits. In this packet they remain observer-level constraints that a native carrier must reproduce or fail.

## Native Carrier Dictionary

For a binary source window $W$ and detector path-history window $P$, define the first `EQ-11A` carrier as

$$
\Theta_{\mathrm{GWsrc}}(W,P)
=
\left(
\theta_{\mathrm{sea}},
g_{\mu\nu}^{\mathrm{eff}},
Q_{ij}^{\mathrm{eff}},
h_+,
h_\times,
E_{\mathrm{rad}},
\mathbf J_{\mathrm{rad}},
\mathcal M_c,
\dot P_b,
\theta_{\mathrm{ring}},
\mathcal R_{\mathrm{GWsrc}}
\right).
$$

The carrier requires:

| Variable or row | Role in `EQ-11A` | Required native attachment |
| --- | --- | --- |
| $\theta_{\mathrm{sea}}$ | Noether sea state supplying effective metric response. | Same constitutive record used by the weak-gravity parent row. |
| $g_{\mu\nu}^{\mathrm{eff}}$ | Observer-level tensor channel for propagation and source readout. | Effective metric projection, not substrate geometry. |
| $Q_{ij}^{\mathrm{eff}}$ | Source quadrupole comparison. | Projection from the same binary source event ledger as the energy and angular-momentum rows. |
| $h_+$ and $h_\times$ | Two tensor strain modes at the detector. | Detector strain record with path-history provenance. |
| $E_{\mathrm{rad}}$ and $\mathbf J_{\mathrm{rad}}$ | Radiated energy and angular momentum. | Same source event ledger as orbital decay and final compact-object labels. |
| $\mathcal M_c$ and $\dot P_b$ | Inspiral chirp and orbital-decay readouts. | Derived from one source record, not independently fit. |
| $\theta_{\mathrm{ring}}$ | Final compact-object ringdown label. | Bound to the same source carrier after radiated energy and angular momentum update the remnant. |
| $\mathcal R_{\mathrm{GWsrc}}$ | Residual bundle. | Reports source, path, detector, remnant, provenance, and no-hidden-retune failures separately. |

## Direct Geometry Layer

This layer keeps the benchmark equations tied to one retained source geometry. It does not treat chirp mass, quadrupole power, detector strain, and ringdown as independently fitted comparison outputs.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $\mathcal M_c=(m_1m_2)^{3/5}/(m_1+m_2)^{1/5}$ | Component-mass and chirp-mass readout from the binary source ledger. | `gw_source_carrier`, `source_event_ledger`, `chirp_mass_row` | One `carrierId`, `sourceWindowId`, `supportId`, and `eventId` bind component masses and $\mathcal M_c$. | `gw.source_window_split` rejects component masses and chirp rows split across event ids. | Accepted `gw_source_carrier` plus same-event component-mass/chirp-mass row with source path and artifact hash. |
| $\dot f_{\mathrm{GW}}$ | Inspiral frequency-drift readout using the same $\mathcal M_c$, $G_{\mathrm{eff}}$, and $c_{\mathrm{GW}}$. | `chirp_mass_row`, `theta_sea`, `effective_metric_tensor_channel`, `source_event_ledger` | The chirp row, Noether sea row, tensor channel, and source ledger share the same carrier and source window. | Source/probe negative controls reject authored prose, coordination notes, or probe JSON as retained evidence. | Accepted `theta_sea` and effective-metric tensor rows bound to the accepted source carrier after the carrier itself passes. |
| Peters-Mathews $\dot a$ and $\dot P_b$ | Orbital-decay readout from the same source masses, orbital state, and tensor-radiation channel. | `peters_decay_row`, `source_event_ledger`, `effective_metric_tensor_channel` | The decay row consumes the same event ledger as the chirp and radiated-output rows. | Split-source control rejects orbital decay calculated from a different binary or event version. | Accepted orbital-decay row with the source-event ledger and tensor channel bound to one carrier id. |
| $P_{\mathrm{GW}}$ quadrupole forms | Source quadrupole and radiated-power readout from the effective metric tensor disturbance. | `quadrupole_source_row`, `source_event_ledger`, `effective_metric_tensor_channel` | $Q_{ij}^{\mathrm{eff}}$, $E_{\mathrm{rad}}$, and $\mathbf J_{\mathrm{rad}}$ use the same source/remnant ledger. | Unledgered-power and split-source controls reject standalone quadrupole arithmetic. | Accepted quadrupole row plus radiated energy/angular-momentum ledger from the same source record. |
| $\mathcal F_{\mathrm{GW}}$ | Detector path-history strain-flux readout for $h_+$ and $h_\times$. | `strain_flux_row`, `detector_strain_record`, `effective_metric_tensor_channel` | Detector strain, path-history window, calibration/nuisance row, and source event share one `supportId`. | Strain-only controls reject single-polarization or detector rows not bound to the source carrier. | Accepted detector strain record plus strain-flux row with artifact hashes and source-window binding. |
| $f_{\mathrm{ring}}$ and $\tau_{\mathrm{ring}}$ | Final compact-object label after radiated energy and angular momentum update the remnant. | `ringdown_label_row`, `source_event_ledger` | Ringdown labels, final mass/spin, and remnant id stay on the same event ledger. | Split-ringdown control rejects remnant labels imported from another event or retuned after the fact. | Accepted ringdown label row bound to the same remnant ledger as the source carrier. |
| $\mathcal S_{\mathrm{retune}}$ and source provenance | No-hidden-retune witness and source-backed retained-record identity. | `source_provenance`, `no_hidden_retune_witness`, all required rows | All rows cite durable non-priority evidence with artifact hashes and stable event/source ids. | Coordination-source, probe-source, and theta-sea content-source controls reject priority packets, probe JSON, and authored prose as evidence. | A retained $\Theta_{\mathrm{GWsrc}}(W,P)$ packet whose required rows are all accepted, source-backed, same-record bound, and checker consumable. |

## Source Residual

The first residual should decompose the comparison rather than hide all failures in one scalar:

$$
\mathcal R_{11A}^{\mathrm{GWsrc}}
=
\mathcal R_{\mathcal M_c}
+\lambda_f\mathcal R_{\dot f}
+\lambda_P\mathcal R_{\mathrm{Peters}}
+\lambda_Q\mathcal R_Q
+\lambda_h\mathcal R_h
+\lambda_E\mathcal R_{E\mathbf J}
+\lambda_{\mathrm{ring}}\mathcal R_{\mathrm{ring}}
+\lambda_{\mathrm{retune}}\mathcal S_{\mathrm{retune}}.
$$

| Residual term | Meaning |
| --- | --- |
| $\mathcal R_{\mathcal M_c}$ | Checks that chirp mass follows from the declared component masses. |
| $\mathcal R_{\dot f}$ | Checks the leading chirp-rate row with the same $\mathcal M_c$, $G_{\mathrm{eff}}$, and $c_{\mathrm{GW}}$. |
| $\mathcal R_{\mathrm{Peters}}$ | Checks orbital decay on the same source record. |
| $\mathcal R_Q$ | Compares quadrupole power to the circular-binary and quadrupole-third-derivative forms. |
| $\mathcal R_h$ | Checks detector strain flux and, when declared, luminosity consistency with source power. |
| $\mathcal R_{E\mathbf J}$ | Checks radiated energy and angular momentum against the source/remnant ledger. |
| $\mathcal R_{\mathrm{ring}}$ | Checks final compact-object frequency and damping labels. |
| $\mathcal S_{\mathrm{retune}}$ | Penalizes any split between source quadrupole, chirp, orbital decay, strain, and ringdown records. |

This residual deliberately sits between `EQ-11` and `EQ-29`. `EQ-29` handles radiation source mechanisms such as synchrotron and bremsstrahlung through photon-channel source ledgers. `EQ-11A` handles the tensor effective-metric gravitational-wave channel. Coincident electromagnetic or neutrino emission may be event-ledger context, but it is not the gravitational-wave carrier.

## Score Decision

Current `6/23 b` score: `2`.

The score is conservative:

- the standard formula families and corpus anchors are clear;
- the native carriers are plausible and named;
- the packet supplies a variable dictionary, residual decomposition, and score-neutral solver-style attempt checker;
- but no accepted gravitational-wave source carrier, source-backed effective metric tensor row, or remnant/ringdown retained label has been populated.

No existing row score changes follow from this packet.

## First Blocker

First blocker: `missing_accepted_gw_source_carrier`.

The minimum evidence object is a source-backed gravitational-wave source carrier $\Theta_{\mathrm{GWsrc}}(W,P)$ with:

- declared component masses, source separation or orbital element row, $\mathcal M_c$, $f_{\mathrm{GW}}$, $\dot f_{\mathrm{GW}}$, and $\dot P_b$;
- declared $Q_{ij}^{\mathrm{eff}}$, quadrupole-power row, strain modes, detector path-history row, and calibrated flux row;
- one event ledger carrying radiated energy, radiated angular momentum, and final remnant labels;
- one effective metric tensor channel and Noether sea constitutive record shared by source, propagation, detector, and ringdown readouts;
- negative controls for total-mass-only chirp fitting, orbital decay without gravitational-wave flux, one-polarization strain flux, split ringdown labels, and unledgered radiated power.

## Executable Attempt

The first concrete artifact for this lane is the score-neutral attempt fixture at [eq11a-gravitational-wave-source-attempt.v1.json](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-attempt.v1.json), evaluated by [eq11a-gravitational-wave-source-residual.mjs](../../../scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs):

```bash
node scripts/equation-mapping/eq11a-gravitational-wave-source-residual.mjs --summary --pretty
```

The expected attempt run returns `schemaOk: true`, `status: blocked_missing_accepted_gw_source_carrier`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_gw_source_carrier`. The normalized sample's chirp-mass, chirp-rate, Peters decay, quadrupole-flux, strain-flux, ringdown, energy/angular-momentum ledger, source-provenance, hidden-retune, and negative-control diagnostics should pass. They do not count as accepted retained evidence because the gravitational-wave source carrier and every row binding remain `status: attempt`.

[EQ-11A GW150914 Source-Field Map](eq-11a-gw150914-source-field-map.md) narrows the first concrete source-window candidate for this blocker. It maps `GW150914-v3` source fields to the checker rows, but keeps every row candidate-level until a checker-consumable retained packet with accepted source bindings exists.

## Promotion Disposition

Classification: `priority-only`.

Promote now: no.

Potential later targets:

- [Gravitational Waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md), after the source carrier is accepted enough to state the source residual reader-facing.
- [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), only after the same effective metric tensor channel is shared with the parent weak-gravity and propagation rows.

## Next Evidence Object

The next score-moving artifact is not another normalized fixture. It is a source-backed $\Theta_{\mathrm{GWsrc}}(W,P)$ carrier whose row bindings are accepted and whose source ledger keeps the quadrupole, chirp, orbital decay, detector strain, radiated energy/angular momentum, and ringdown labels on one record.
