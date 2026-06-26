# EQ-07A Compact-Star Support And Collapse Scale Residual

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source audit: [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md)
- Parent packet: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
- Assigned ID: `EQ-07A`
- Related corpus material: [Black Holes](../../../content/markdown/aaa/spacetime/black-holes.md), [Singularity Resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), [Nested Shell Braid Geometry](../../../content/markdown/aaa/noether-braid/nested-shell-braid-geometry.md), [Fermi-Dirac And Bose-Einstein Statistics](../../../content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md)
- Claim level: observer-level compact-star support benchmark, native variable dictionary, and fail-closed residual target
- Promotion status: priority-only
- Current score: `2`

## Purpose

`EQ-07A` splits the compact-star support problem out of the broader `EQ-07` through `EQ-10` effective-metric packet without renumbering the core inventory. The row asks whether one retained compact-region record can recover:

- Chandrasekhar support scaling;
- the composition dependence $M_{\mathrm{Ch}}\propto Y_e^2$;
- TOV pressure-gravity comparison in the compact-star regime;
- electron-capture, photodisintegration, neutrino, heat, and remnant ledgers;
- material Noether braid scale compression;
- and effective spatial-compliance response.

The row is not a new ontology and not a claim that compact-star pressure has already been derived. It is a bounded equation-mapping packet for the first reusable variable dictionary and no-hidden-retune residual.

## Standard Benchmark

The white-dwarf support comparison begins with Fermi-state counting:

$$
p_F\sim\hbar n_e^{1/3},
\qquad
\ell_e\sim n_e^{-1/3},
\qquad
x_F\equiv\frac{p_F}{m_ec_0}.
$$

The pressure law changes with the electron momentum regime:

$$
P_{e,\mathrm{nr}}\propto \rho^{5/3},
\qquad
P_{e,\mathrm{rel}}\propto \rho^{4/3}.
$$

The rough hydrostatic comparison is

$$
P_{\mathrm{grav}}\sim\frac{GM^2}{R^4},
$$

and the support boundary carries composition through

$$
M_{\mathrm{Ch}}\propto Y_e^2M_\odot,
\qquad
Y_e=\frac{1}{\mu_e}.
$$

For neutron-star and stronger compact-star comparisons, the observer-level benchmark is the TOV pressure-gravity row:

$$
\frac{dP}{dr}
\sim
-\frac{
G(\epsilon+P/c_0^2)(m+4\pi r^3P/c_0^2)
}{
r^2(1-2Gm/(rc_0^2))
}.
$$

These formulae are useful because they are not arbitrary curve fits. The pressure exponents follow from state counting and energy-momentum scaling; the support boundary follows from pressure-gravity comparison and composition; TOV is the compact-star GR benchmark. In this packet they remain observer-level constraints that a native retained record must reproduce or fail.

## Level Discipline

The compact-star map must keep three scale notions separate:

| Scale notion | Standard role | Native handling |
| --- | --- | --- |
| Atomic orbital scale | Pre-white-dwarf and condensed-matter precursor. | Does not carry the degenerate electron pressure law. |
| Fermi spacing $\ell_e\sim n_e^{-1/3}$ | Delocalized electron reservoir after ordinary atomic orbitals lose authority. | Supplies the state-counting inverse clue for $p_F$, $x_F$, and the $5/3\to4/3$ transition. |
| Material Noether braid scale $\lambda_A=R_{\perp,A}/R_{\perp,A,0}$ | Native material scale-compression row. | Must be derived from the retained compact-region branch ledger and cannot be substituted for $\ell_e$ without a bridge calculation. |

The historical level placement also remains active. The Chandrasekhar scaling is a special-relativistic electron calculation joined to Newtonian support balance. TOV is the later observer-level compact-star benchmark. Neither row is substrate geometry.

## Compact-Region Variable Dictionary

The first score-moving object is a variable dictionary, not another checker:

| Variable or row | Role in `EQ-07A` | Required native attachment |
| --- | --- | --- |
| $n_e$ | Electron number density for the degenerate reservoir. | Declared electron inventory row in the compact-region event ledger. |
| $\ell_e$ | Fermi spacing comparison, $\ell_e\sim n_e^{-1/3}$. | Kept distinct from atomic orbital scale and $\lambda_A$. |
| $p_F$ and $x_F$ | Momentum scale and nonrelativistic/relativistic transition. | State-counting bridge to the pressure regime, not a fitted pressure exponent. |
| $Y_e$ and $\mu_e$ | Composition and electron fraction. | Electron-capture and nuclear inventory rows must update them. |
| $M$, $R$, $r$, and $\Omega_r$ | Observer-level compact-star mass, radius, radial coordinate, and retained interior region. | Projection from the same compact-region record used by exterior lensing, redshift, timing, and signal-delay rows. |
| $\epsilon$ and $P_{\mathrm{EOS}}$ | Energy density and pressure/EOS comparison. | Observer-level compact-star benchmark; not imported as native ontology. |
| $P_{\mathrm{pack}}^\theta$ | Native pressure/packing projection. | Coarse-grained exclusion-stress and branch-deformation response from the retained record. |
| $\lambda_A$ and $\mathcal{S}_{\mathrm{mat}}$ | Material Noether braid scale compression. | Same branch/cadence/energy ledger used by the effective metric projection. |
| $\Theta_{\mathrm{NS}}(r)$ | Neutron-star radial support record. | Noether sea density, cadence, delay, stress, response tensor, and local event ledger. |
| $\mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)}$ | Compact-region conservation and reaction ledger. | Energy, momentum, angular momentum, reaction, neutrino, heat, medium-update, and remnant rows. |
| $\mathcal{S}_{\mathrm{metric}}$ | Effective spatial-compliance readout. | Same $\theta$ carrier as $\mathcal{S}_{\mathrm{mat}}$, lapse, signal delay, and horizon-interface rows. |
| $F_H$ and $\mathcal{R}_H$ | Horizon-interface and finite strong-field regularity comparison. | Activated only when branch survival fails and the compact record reaches the horizon-interface regime. |

## Retained Carrier

For a compact region $\Omega$ over an absolute-time window $W$, define the first `EQ-07A` carrier as

$$
\Theta_{\mathrm{cs}}^{07A}(\Omega,W)
=
\left(
\mathcal B_{\mathrm{std}}^{\mathrm{cs}},
\mathcal C_{\mathrm{pack}}^\theta,
\Theta_{\mathrm{NS}},
\mathcal S_{\mathrm{mat}},
\mathcal S_{\mathrm{metric}},
\mathcal L_{E\mathbf p\mathbf J}^{(\Omega)},
\Pi_{\mathrm{EOS}},
\Pi_{\mathrm{metric}}
\right).
$$

Here $\mathcal B_{\mathrm{std}}^{\mathrm{cs}}$ carries the observer-level compact-star benchmarks, $\mathcal C_{\mathrm{pack}}^\theta$ carries the native packing/pressure projection, $\Pi_{\mathrm{EOS}}$ is the declared equation-of-state comparison projection, and $\Pi_{\mathrm{metric}}$ is the effective metric and spatial-compliance projection. The same retained record must feed all entries; if the support law, reaction inventory, scale compression, and metric compliance use separate records, the packet fails.

## Support And Collapse Residual

The first residual should decompose the comparison rather than hiding all failure modes in one scalar:

$$
\mathcal{R}_{07A}^{\mathrm{cs}}(\theta;\Omega,W)
=
\mathcal R_{\mathrm{Fermi}}
+\lambda_P\mathcal R_{\mathrm{support}}
+\lambda_Y\mathcal R_{\mathrm{rxn}}
+\lambda_E\mathcal R_{E\mathbf p\mathbf J}^{(\Omega)}
+\lambda_{\mathrm{scale}}\mathcal R_{\mathrm{collapse}\to\mathrm{metric}}
+\lambda_{\mathrm{NS}}\mathcal R_{\mathrm{NS}}
+\lambda_{\mathrm{retune}}\mathcal S_{\mathrm{retune}}.
$$

The terms are:

| Residual term | Meaning |
| --- | --- |
| $\mathcal R_{\mathrm{Fermi}}$ | Checks that $p_F$, $x_F$, and the $5/3\to4/3$ pressure-regime switch follow from the declared electron inventory and state-counting bridge. |
| $\mathcal R_{\mathrm{support}}$ | Compares $P_{\mathrm{pack}}^\theta$ against the declared Chandrasekhar or TOV benchmark for the active regime. |
| $\mathcal R_{\mathrm{rxn}}$ | Checks that electron capture, photodisintegration, neutrino transport, heat, and remnant updates drive $Y_e$, inventory, and energy changes in the same event ledger. |
| $\mathcal R_{E\mathbf p\mathbf J}^{(\Omega)}$ | Reports compact-region energy, momentum, angular-momentum, reaction, neutrino, heat, medium-update, and remnant closure. |
| $\mathcal R_{\mathrm{collapse}\to\mathrm{metric}}$ | Reuses the parent packet's material-scale-to-metric-compliance residual. |
| $\mathcal R_{\mathrm{NS}}$ | Checks radial neutron-star branch survival through $\Theta_{\mathrm{NS}}(r)$ while $v_O<c_f$, $s_n$ remains in its declared support range, $\mathcal R_H$ is finite, and the ledger closes. |
| $\mathcal S_{\mathrm{retune}}$ | Penalizes any split between support, reaction, scale-compression, metric, and horizon-interface records. |

The support comparison may use

$$
P_{\mathrm{std}}
\in
\left\{
P_{e,\mathrm{nr}}(n_e,Y_e),
P_{e,\mathrm{rel}}(n_e,Y_e),
P_{\mathrm{TOV}}(r;\epsilon,P,m)
\right\},
$$

but the active regime must be declared. A successful white-dwarf comparison does not automatically close neutron-star support, and a TOV benchmark does not automatically supply the native dense-matter branch.

## Score Decision

Current `6/23 b` score: `2`.

The score is conservative:

- the standard compact-star formula families and corpus anchors are clear;
- the native carriers are plausible and named;
- the packet now supplies a variable dictionary and residual decomposition;
- but no accepted compact-region retained carrier, dense-matter equation-of-state bridge, or source-backed reaction inventory has been populated.

No existing row score changes follow from this packet.

## First Blocker

First blocker: `missing_accepted_compact_region_carrier`.

The minimum evidence object is a source-backed compact-region carrier $\Theta_{\mathrm{cs}}^{07A}(\Omega,W)$ with:

- declared $n_e$, $p_F$, $x_F$, $Y_e$, $M$, $R$, and active pressure regime;
- declared $\lambda_A$, $\mathcal{S}_{\mathrm{mat}}$, $\Theta_{\mathrm{NS}}(r)$, and $\mathcal{S}_{\mathrm{metric}}$ rows;
- electron-capture, photodisintegration, neutrino, heat, medium-update, and remnant ledger entries when the collapse regime requires them;
- one $\mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)}$ record shared by support, reaction inventory, scale compression, and metric readout;
- negative controls for imported pressure formulae, hidden retune between pressure and metric rows, and level collapse between Fermi spacing and material Noether braid scale.

## Executable Attempt Carrier

The first concrete artifact for this lane is the score-neutral attempt carrier at [eq07a-compact-region-carrier-attempt.v1.json](../../../scripts/equation-mapping/eq07a-compact-region-carrier-attempt.v1.json), evaluated by [eq07a-compact-region-carrier-residual.mjs](../../../scripts/equation-mapping/eq07a-compact-region-carrier-residual.mjs):

```bash
node scripts/equation-mapping/eq07a-compact-region-carrier-residual.mjs --summary --pretty
```

The current run returns `schemaOk: true`, `status: blocked_missing_accepted_compact_region_carrier`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_compact_region_carrier`. The variable dictionary, Fermi-state counting check, pressure-regime check, composition relation, support residual, reaction ledger, compact-region ledger, scale/metric residual, neutron-star radial-support residual, source-provenance residual, hidden-retune residual, level-separation witness, and all three negative controls pass on the attempt carrier. They do not count as accepted retained evidence because the compact-region carrier and every row binding remain `status: attempt`.

## Score-Lift Path

| Target score | Required evidence |
| --- | --- |
| `3` | Populate the variable dictionary on one attempt carrier and report each residual term with active regimes declared. |
| `4` | Demonstrate one shared compact-region record that passes the support, reaction-ledger, scale-compression, and metric-compliance residuals without hidden retuning, while still treating TOV and Chandrasekhar rows as observer-level benchmarks. |
| `5` | Derive the compact-star support and collapse transition from accepted retained Noether braid/Noether sea rows, including a dense-matter branch or EOS bridge strong enough for reader-facing promotion. |

## Promotion Plan

Promotion status: priority-only.

Candidate reader-facing targets after the first blocker clears:

- [Black Holes](../../../content/markdown/aaa/spacetime/black-holes.md)
- [Singularity Resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md)

No reader-facing promotion is justified now. The safe canon level is already present in the compact-object chapters: Chandrasekhar scaling is an inverse clue, neutron-star support is a branch-survival target, and horizon-interface continuation is a finite strong-field boundary problem. This packet makes the priority work executable enough to continue without strengthening those reader-facing claims.
