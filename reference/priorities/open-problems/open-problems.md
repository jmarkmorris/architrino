# Open Problems

## Workstream Metadata

- Kind: `priority-candidate`
- Rank: `unranked`
- Value: `unscored`
- Cost: `unscored`
- ROI: `unscored`
- Status: `drafting`

## Task Queue

1. `paper_skeleton` - Maintain the deployed draft [solving-open-problems.md](../../../content/markdown/aaa/philosophy-history/solving-open-problems.md) as a readable technical paper draft grouped by major open-problem domains. Status: `active`. Depends on: none.
2. `claim_level_audit` - For every chapter, classify the candidate as `architecture-ready`, `direction-ready`, `appendix-watch`, or `exclude-for-now`. Status: `next`. Depends on: `paper_skeleton`.
3. `test_contracts` - Attach at least one recovery target, source family, observable, simulation variable, or falsifier to every `architecture-ready` chapter. Status: `next`. Depends on: `claim_level_audit`.
4. `corpus_route_map` - Map every retained chapter to its current $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus and priority destinations before promotion. Status: `pending`. Depends on: `test_contracts`.
5. `source_trace_refresh` - Replace public-list orientation with primary papers, review articles, data releases, or experiment documentation for any chapter selected for public-facing use. Status: `pending`. Depends on: `claim_level_audit`.
6. `paper_claim_filter` - Remove or demote chapters that cannot name a native $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism and a falsifiable test surface. Status: `pending`. Depends on: `test_contracts`.

## Scope

This lane organizes a possible paper on open problems in physics, astronomy, astrophysics, and cosmology where $\mathbb{A}\mathbb{A}\mathbb{A}$ already has a plausible or stronger architectural answer.

The lane is priority-control only. The draft document itself has moved to `content/markdown/aaa/philosophy-history` so it can be surfaced by the Unknowns and Paradoxes scene. This control file decides which public open problems are strong enough for a readable technical answer, which are only directional, and which should stay out of the paper until the native proof stack matures.

## Selection Rule

A chapter belongs in the main body only when it can name all four of these items:

1. The standard open problem in ordinary technical language.
2. The native $\mathbb{A}\mathbb{A}\mathbb{A}$ object, mechanism, or theorem route that addresses it.
3. The existing corpus or priority workstream that should carry the proof burden.
4. A test surface: observational signature, benchmark recovery, simulation target, or falsifier.

If any item is missing, the chapter should be marked `direction-ready`, `appendix-watch`, or `exclude-for-now`.

## Claim-Level Key

| Level | Meaning | Paper treatment |
| --- | --- | --- |
| `architecture-ready` | The native mechanism and test surface are clear enough for a main chapter, even if proofs and coefficients remain open. | Main body. |
| `direction-ready` | The route is plausible, but a theorem, simulation, source trace, or quantitative bridge is missing. | Shorter chapter or later draft. |
| `appendix-watch` | The topic is interesting, but the current answer is too thin or too dependent on unsettled data. | Appendix, watchlist, or exclusion note. |
| `exclude-for-now` | The problem is outside current $\mathbb{A}\mathbb{A}\mathbb{A}$ closure or would require overclaiming. | Do not include. |

## Draft Structure

| Major section | Primary role | Candidate chapter family |
| --- | --- | --- |
| Foundations and spacetime | Show how the ontology replaces incompatible foundational starting points. | Quantum gravity, metric emergence, Lorentz recovery, problem of time. |
| Strong-field gravity | Convert singularity, horizon, entropy, and radiation puzzles into boundary and event-ledger closure. | Black-hole singularities, cosmic censorship, information, entropy, gravitational waves, compact stars. |
| Cosmology and large-scale structure | Treat cosmological anomalies as Noether sea, redshift, transfer-function, and structure-growth problems. | Dark matter, dark energy, cosmological constant, $H_0$, $S_8$, inflation, CMB, BBN, structure formation. |
| Quantum and statistical emergence | Explain observer-level probabilities, measurement records, and thermodynamics from deterministic basin and path-history dynamics. | Measurement, Born rule, Bell, entropy, arrow of time, photons. |
| Standard Model and particle closure | Route particle families, masses, mixing, confinement, and asymmetries into branch geometry and event provenance. | Higgs/origin of mass, hierarchy, neutrinos, flavor, matter-antimatter asymmetry, QCD confinement. |
| Astrophysical engines | Use the same reaction, radiation, and medium-response ledger in high-energy astrophysical settings. | Supernovae, nucleosynthesis, jets, outflows, transients. |
| Appendix and exclusions | Keep weak or data-unstable cases visible without overpromoting them. | FRBs, UHECRs, coronal heating, solar-cycle, planetary, Fermi paradox, one-off anomalies. |

## Deployed Draft

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [solving-open-problems.md](../../../content/markdown/aaa/philosophy-history/solving-open-problems.md) | Deployed working paper draft with major sections, chapter candidates, $\mathbb{A}\mathbb{A}\mathbb{A}$ architectural answers, test advice, and claim levels. | Unknowns and Paradoxes scene, later paper manuscript, plus selected promotions into existing corpus and priority workstreams after claim-level audit. |

## Promotion Map

| Candidate section | Primary priority route | Primary corpus route | Promotion gate |
| --- | --- | --- | --- |
| Foundations and spacetime | [master-equation-closure](../master-equation-closure/master-equation-closure.md), [braid-retained-branch-closure](../braid-retained-branch-closure/braid-retained-branch-closure.md), [cross-theory-mapping](../cross-theory-mapping/cross-theory-mapping.md) | Spacetime and dynamics corpus documents. | One effective metric and one path-history record recover known clock, ruler, null-path, and phase benchmarks. |
| Strong-field gravity | [strong-field-closure](../strong-field-closure/strong-field-closure.md), [dark-sector](../dark-sector/dark-sector.md), [simulations](../simulations/simulations.md) | Black-hole, singularity, radiation, and nested shell braid documents. | Boundary conditions, entropy counts, event ledgers, and release channels are expressed without hidden singular sinks. |
| Cosmology and large-scale structure | [cosmology-closure](../cosmology-closure/cosmology-closure.md), [dark-sector](../dark-sector/dark-sector.md), [cross-theory-mapping](../cross-theory-mapping/cross-theory-mapping.md) | Cosmology, CMB, BBN, structure, dark-sector, and redshift documents. | The same Noether sea variables support redshift, distance, growth, CMB, lensing, and structure records. |
| Quantum and statistical emergence | [quantum-closure](../quantum-closure/quantum-closure.md), [braid-angular-momentum-spin](../braid-angular-momentum-spin/braid-angular-momentum-spin.md), [cross-theory-mapping](../cross-theory-mapping/cross-theory-mapping.md) | Quantum, measurement, Bell, entropy, and radiation documents. | Basin measures, detector response, pair provenance, and path-history phase recover the benchmark probabilities without free collapse postulates. |
| Standard Model and particle closure | [standard-model-closure](../standard-model-closure/standard-model-closure.md), [braid-mass-response-map](../braid-mass-response-map/braid-mass-response-map.md), [braid-angular-momentum-spin](../braid-angular-momentum-spin/braid-angular-momentum-spin.md) | Assemblies, fermions, bosons, gauge, mass, nuclear, and validation documents. | Branch geometry, exposure maps, mixing integrals, confinement energetics, and event provenance produce testable particle records. |
| Astrophysical engines | [strong-field-closure](../strong-field-closure/strong-field-closure.md), [cosmology-closure](../cosmology-closure/cosmology-closure.md), [standard-model-closure](../standard-model-closure/standard-model-closure.md) | Radiation, reactions, compact-object, nucleosynthesis, and structure documents. | High-energy events close energy, momentum, angular momentum, composition, remnant, and medium-update ledgers. |

## Related Priorities

- [cross-theory-mapping](../cross-theory-mapping/cross-theory-mapping.md)
- [cosmology-closure](../cosmology-closure/cosmology-closure.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)
- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [braid-mass-response-map](../braid-mass-response-map/braid-mass-response-map.md)
- [braid-angular-momentum-spin](../braid-angular-momentum-spin/braid-angular-momentum-spin.md)
- [simulations](../simulations/simulations.md)
