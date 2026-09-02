# Human Carbonic Anhydrase II Event Ledger

## Status and Claim Boundary

- **Work item:** `NAM-008 enzyme_active_site_bridge`
- **Selected mechanism:** human carbonic anhydrase II catalysis of reversible carbon-dioxide hydration.
- **Status:** Complete at source-bound mechanism-design grade.
- **Current native disposition:** `blocked_missing_native_hcaii_turnover_record`.

The observer-level reaction is

$$
\mathrm{CO_2+H_2O}
\rightleftharpoons
\mathrm{HCO_3^-+H^+}.
$$

The source packet resolves two coupled operations: carbon-species conversion at a zinc-bound solvent site and proton transport between that site, His64, and bulk solution. These are effective biochemical and structural descriptions supported by crystallography, isotope-exchange kinetics, and site-directed mutants. They are not architrino-level premises, and this packet does not claim a native enzyme carrier, catalytic rate, chemical bond transition, proton-transfer path, or retained turnover.

Plainly: The enzyme performs one overall reaction, but experiments show that making bicarbonate and resetting the proton state are distinguishable parts of the cycle. A native account must preserve that distinction.

## Source-Bound Experimental Packet

| Source | Instrument and measured record | Bounded use here |
| --- | --- | --- |
| Fisher et al., [*Atomic crystal and molecular dynamics simulation structures of human carbonic anhydrase II: insights into the proton transfer mechanism*](https://pubmed.ncbi.nlm.nih.gov/17319692/), DOI `10.1021/bi062066y` | Wild-type X-ray structure at $1.05\,\mathring{\mathrm A}$ resolution, $R_{\mathrm{cryst}}=12.0\%$, $R_{\mathrm{free}}=15.1\%$; zinc-bound solvent, ordered waters, and dual His64 conformation; the authors report about 80% inward His64 occupancy and infer the zinc-bound-water/neutral-His64 state | Geometry and conformational benchmark. The proton path and state assignment remain source inference, not direct observation of a completed transfer event. |
| Zheng et al., [*Structural and kinetic characterization of active-site histidine as a proton shuttle in catalysis by human carbonic anhydrase II*](https://pubmed.ncbi.nlm.nih.gov/15667203/), DOI `10.1021/bi0480279` | X-ray structures across pH 5.1–10.0 plus mass-spectrometric $^{18}\mathrm O$ exchange; histidine at positions 64 or 67 supports proton-shuttle rates above $10^5\,\mathrm{s}^{-1}$, while His62 is near $10^3\,\mathrm{s}^{-1}$; a completed static water chain is not required, while a bridge with two intervening waters is consistent with efficient transfer | Source-bound geometry/kinetics discriminator for path selection. It does not uniquely prove one microscopic water sequence. |
| Tu et al., [*Role of histidine 64 in the catalytic mechanism of human carbonic anhydrase II studied with a site-specific mutant*](https://pubmed.ncbi.nlm.nih.gov/2514797/), DOI `10.1021/bi00445a054` | Steady-state hydration and equilibrium $^{18}\mathrm O$ exchange for wild type and H64A; carbon-species exchange is essentially unchanged above pH 7 and only modestly reduced below it, while proton-bearing water release without buffer is slower by as much as twentyfold in H64A | Negative control separating the carbon-conversion row from the proton-shuttle/reset row. It does not make His64 the sole possible proton route in every environment. |

Plainly: Structure identifies candidate geometry, isotope exchange tracks chemical cycling, and mutants perturb specific parts of the path. Agreement among these different instruments is stronger than replaying one fitted molecular model.

## Required Molecular Record

The minimum candidate turnover carrier is

$$
\Theta_{\mathrm{CAII}}
=
\left(
\mathcal A_{\mathrm{enzyme}},
\Gamma_{\mathrm{Zn-solv}},
\mathcal G_{64},
\mathcal W_{\mathrm{active}},
\mathcal A_{\mathrm{CO_2}},
\mathcal A_{\mathrm{H_2O}},
\mathcal A_{\mathrm{HCO_3^-}},
\mathcal A_{\mathrm{H^+}},
\mathcal H_{\mathrm{wake}},
\theta_{\mathrm{sea}}^{(\ell_c)},
\mathcal L_{\mathrm{event}},
W,
\mathcal D
\right).
$$

$\mathcal A_{\mathrm{enzyme}}$ is the full enzyme assembly record rather than a rigid pocket; $\Gamma_{\mathrm{Zn-solv}}$ is the metal/solvent coordination record; $\mathcal G_{64}$ records His64 position and protonation-sensitive state; $\mathcal W_{\mathrm{active}}$ records the active-site water network; the substrate and product entries carry molecular identity and provenance; $\mathcal H_{\mathrm{wake}}$ and $\theta_{\mathrm{sea}}^{(\ell_c)}$ retain the causal-history and local Noether sea environment; and $\mathcal L_{\mathrm{event}}$, $W$, and $\mathcal D$ bind the turnover to its accounts, time window, and instrument.

Plainly: The active site is a changing molecular arrangement, not a fixed cartoon. The required record must include the enzyme, zinc-bound solvent, His64, active-site waters, reactants, products, environment, and readout in the same turnover.

## Action-Path Selection

Represent the candidate turnover as three linked branch families rather than one label:

$$
\Pi_{\mathrm{turn}}
=
\Pi_{\mathrm{capture/convert}}
\circ
\Pi_{\mathrm{product/reload}}
\circ
\Pi_{\mathrm{proton/reset}}.
$$

The first family admits $\mathrm{CO_2}$ into the active-site geometry and changes the carbon-species record near the zinc-bound solvent. The second exports bicarbonate and reloads zinc-bound solvent. The third transports the proton through a geometry involving His64, active-site waters, and bulk solution, returning the catalytic macrostate to a new-turnover-ready record. The composition symbol expresses temporal and provenance ordering, not an imported substrate reaction law.

For a declared preparation $\mathcal P$ and environment $\mathcal E$, a future native calculation must select an admissible retained path by its own action and causal-root history,

$$
\pi_*
\in
\operatorname*{argmin}_{\pi\in\Pi_{\mathrm{admissible}}(\mathcal P,\mathcal E)}
\mathcal S_{\mathrm{native}}[\pi],
$$

subject to closure, exclusion, event-account, and record-stability constraints. This is a target interface. No $\mathcal S_{\mathrm{native}}$ or admissible path set has been computed here, and the standard chemical mechanism is not used to define the winning path.

Plainly: The source mechanism tells us which before-and-after records must be distinguished. The lower-level dynamics still have to choose the path; writing an optimization symbol does not perform that derivation.

## Event and Failure Rows

| Row | Required same-record transition | Evidence grade now | Acceptance condition | Falsifier |
| --- | --- | --- | --- | --- |
| `CAII-capture-convert` | Source-bound $\mathrm{CO_2}$ and zinc-solvent state enter one active-site record and exit as a bicarbonate-bearing state | Mechanism inferred from structure and kinetics | Native evolution changes the carbon-species record while preserving molecular identity, geometry provenance, and all account rows | Product label is imposed without a molecular transition, or carbon/species provenance is lost |
| `CAII-product-reload` | Bicarbonate exits and a new solvent record occupies the zinc-coordination slot | Mechanism inferred | The enzyme returns to the correct coordination family without deleting recoil, solvent, or environment changes | A new cycle begins from an incompatible coordination state or silently replaces molecular entries |
| `CAII-proton-reset` | Proton state moves from the zinc-bound-solvent side through a His64/water/bulk context | Structure and kinetics measured; exact microscopic path inferred | The same native record reproduces the wild-type proton-transfer response and its pH/buffer context without a preassigned proton-shuttle rule | A static geometry alone is treated as transfer evidence, or the path cannot produce a durable bulk record |
| `H64A-negative-control` | The H64A preparation changes only the declared residue branch while retaining assay and environment definitions | Mutant response measured | Carbon-species exchange remains much less affected than the proton-release/reset channel, including the observed qualitative separation | Both channels change identically, the mutation rewrites unrelated rules, or the control is fitted after seeing its result |
| `His-position-control` | His64, His67, and His62 variants use the same path-selection rule with source-bound geometry and pH | Variant structure and kinetics measured | The rule distinguishes efficient 64/67 placement from much slower 62 placement without residue-specific rate constants | Efficiency is assigned by residue name or the ordering reverses outside preregistered uncertainty |
| `catalyst-return` | One completed turnover exports products while retaining a readable enzyme macrostate | Closure target guessed | After removing declared product and bath entries, the enzyme/coordination state returns within tolerance and supports a second turnover | The enzyme drifts, accumulates hidden state, or only one turnover is possible |

Plainly: The mutant rows are decisive because they perturb the proposed pathway without erasing the whole reaction. A successful native mechanism must reproduce which part slows and which part remains comparatively intact.

## Energy, Momentum, Angular-Momentum, and Provenance Routing

Each transition must satisfy one assembly-level account:

$$
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{enzyme}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{substrates/products}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{solvent/buffer}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{sea}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{apparatus}}
=0.
$$

No omitted channel may absorb a residual merely because the macroscopic reaction is exergonic, endergonic, or buffered. The source molecule, product molecule, exchanged solvent, proton acceptor/donor, enzyme conformation, and detector record must remain traceable across the same event identifier.

Plainly: Catalysis changes the route and rate, not the bookkeeping obligation. Every product and every transferred quantity must still have a source and destination.

## Record-State Stability

Let $\mathcal Q_{\mathrm{cat}}$ project out exported products and declared bath microstate while retaining the enzyme conformation, zinc coordination, active-site hydration class, and readiness for another turnover. A reusable catalyst must satisfy

$$
d_{\mathrm{cat}}
\left(
\mathcal Q_{\mathrm{cat}}\Theta_{\mathrm{CAII}}^{\mathrm{out}},
\mathcal Q_{\mathrm{cat}}\Theta_{\mathrm{CAII}}^{\mathrm{in}}
\right)
\le
\varepsilon_{\mathrm{cat}}
$$

over a preregistered multi-turnover window, with no monotone hidden-state drift. The metric, tolerance, and window must be frozen before execution. One return produced by a fitted reset operation is not independent stability evidence.

Plainly: The enzyme is a catalyst only if it remains usable. The test therefore checks repeated cycles, not just whether one hand-crafted path reaches the products.

## Acceptance Boundary

NAM-008 closes the mechanism-selection and ledger-design task because one enzyme mechanism is source-bound and has explicit geometry, action-path, event-account, catalyst-return, controls, and falsifier rows. None of those native rows has passed. Corpus promotion requires a retained molecular trajectory or independently instrumented coarse record, preregistered tolerances, multi-turnover stability, and successful H64A and histidine-position controls under the same constitutive rules.

Closure goal: derive one reusable carbonic-anhydrase-II turnover record that preserves the experimentally separated carbon-conversion and proton-reset channels without importing their biochemical mechanism as substrate law.
