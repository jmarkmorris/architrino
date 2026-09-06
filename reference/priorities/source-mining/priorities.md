# Source Mining

## Workstream Metadata

- Kind: `priority`
- Rank: `unranked / blocked`
- Value: `1.23`
- Cost: `2.7`
- ROI: `0.46`
- Status: `deferred-no-executable-object`

## Work Queue

The accepted source batches, mining order, dependencies, and completion boundaries live in [work-queue.md](work-queue.md).

## Scope

This is the ranked queue for source-material mining and corpus integration.

## Core Theory Focus Constraint

During the current core geometrical theory push, do not treat corpus coverage as a substitute for solving the mathematics. Use this queue only when the source-mining work adds or clarifies definitions, equations, closure targets, proof routes, or worked examples that directly serve the active theory stack.

## Deprioritized Mining Lanes

Do not start broad particle-physics mining merely because a source family is large, famous, or numerically rich. These lanes are deferred unless a current proof route names a specific carrier, event ledger, benchmark row, or same-record residual that consumes the source:

- Raw whole-Particle Data Group catalog sweeps. Use PDG rows only as scoped downstream benchmarks after the native branch, exposure, mass, detector, or event-provenance object has been declared.
- Broad beyond-Standard-Model anomaly hunting. Mine anomalies only when a named source supplies a hard benchmark, detector-provenance example, or falsifier for a live closure route.
- E8 or supersymmetry numerology. Treat these as comparison frameworks or legacy clue surfaces only after an accepted branch-state or gauge-record row exists.
- Standalone Koide work. Koide remains a post-prediction charged-lepton mass-map residual and should not receive source-mining time before the shared `EQ-04` mass-shell and charged-lepton generation rows exist.

## Scorecard Use

- For scorecard purposes, this is the main Coverage bucket.
- Under the validated-closure scorecard, Coverage+Interface Readiness has weight `2`, so this queue improves reader and corpus completeness without substituting for certified equations, coefficients, parameters, or benchmark validation.
- If the goal is the fastest validated-closure score increase, pair this workstream with residual-routing-event-ledger, exposure-quotient-theorem, and mass-map rather than treating prose coverage as the main lift.
- Rule of thumb to retain: a `+10` point gain in Coverage+Interface Readiness adds about `+0.2` to the weighted total; high-weight categories such as Empirical Precision+Benchmark Validation, Formula+Coefficient Recovery, Master EOM+Local Dynamics, Parameter+Scale Closure, and Potential+Action Closure move the total more.

## Process Guide

This directory retains active priority material and program history; the canonical reusable process remains [Source Mining Best Practice](../../op/source-mining-best-practice.md).

[About Architrino](../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) owns which references belong in reader-facing prose; its [source-checking disclosures](../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review) govern checking and uncertainty. Queue order and mining-history coverage do not create a publication requirement for every inspected source.

Use topic-sweep mode when the operator needs to reconstruct what the legacy archive says about one concept across many posts before choosing individual sources to mine. A topic sweep is source discovery and synthesis; it should not add source-mining-history rows unless the normal source-mining triage and accepted edit or explicit no-edit disposition are also completed for those posts.

Use archive-level mining mode when the operator needs a full-archive idea map before selecting individual sources or topic sweeps. This mode retrieves all public WordPress post text, writes the durable post registry, regenerates the markdown table and URL queue from that registry, stores cleansed full text under the platform temporary directory, clusters source signals, flags legacy terminology and high-risk language, checks coarse corpus coverage, and writes compact priority reports without adding source-mining-history rows.

## Mining History

The completed target list lives in [source-mining-history](analysis/source-mining-history.md). When a source or source family is mined or incorporated, add it to that history file with the relevant source identity, date, and disposition. WordPress tags are not used for source-mining completion; local source-mining history records mining events, while the durable WordPress registry records the permanent archive inventory.

## Active Mining Batches

- [Entropy video mining](analysis/entropy-video-mining.md) tracks the current operator-supplied entropy video batch for the later rollup report.

## Most Recent Completed Batch

- [Solving the Crisis source refresh](evidence/solving-the-crisis-source-refresh-2026-09-02.md) closes SM-003 with an exact 44-row source ledger matching every retained Open Problems chapter. Each row identifies a qualifying paper, review, data release, or experiment record and bounds its use as a recovery target, observational constraint, or comparison; excluded chapters 45–46 remain outside the source program.
- [Legacy technology and operations recovery audit](evidence/legacy-technology-operations-recovery-audit.md) closes SM-002 across all 16 registry posts tagged `technology_ai_operations`, with a current-terminology mapping and explicit disposition for every selected item. Existing useful incorporations were preserved; no duplicate promotion was made.
- [PIRSA fakeon causal-support screen](analysis/pirsa-fakeon-causal-support-screen.md) completes SM-001 with a derived support test showing that Anselmi's finite-width even averaging kernel is not a past-supported $\mathbb{A}\mathbb{A}\mathbb{A}$ causal update. The source's broader framework was not imported, and no reader-facing corpus edit was warranted.

## Completed Searchable Source Archives

- Legacy Architrino WordPress original-blog archive-level mining is complete as of June 28, 2026. The bonus retained artifact is a reusable searchable archive, not an open priority item.
- [Legacy Architrino WordPress post registry](archive-analysis/legacy-architrino-wordpress-posts.jsonl) preserves the durable normalized post inventory for future post mining and topic sweeps.
- [Legacy Architrino WordPress library posts](analysis/legacy-architrino-wordpress-library-posts.md) is the generated human-readable title/date/topic/keyword table from the registry.
- [Legacy Architrino WordPress mining queue](archive-analysis/legacy-architrino-wordpress-mining-queue.txt) is the generated all-post URL view from the registry; it is not completion state.
- [Legacy Architrino archive mining report](archive-analysis/legacy-architrino-archive-mining-report.md), [candidate gaps](archive-analysis/legacy-architrino-candidate-gaps.md), and [idea clusters](archive-analysis/legacy-architrino-idea-clusters.md) preserve the archive-level source map for future lookup.

## Legacy Architrino WordPress Library Stats

- Source: [Architrino home archive](https://architrino.wordpress.com/), [Posts History](https://architrino.wordpress.com/library/), and current-year archive pages such as [2026](https://architrino.wordpress.com/2026/).
- Last crawl: June 28, 2026.
- Published posts discovered: `379`.
- Current local registry state: all discovered posts are retained for recurring topic sweeps and post-by-post mining.
- Completion authority: source-mining history records mining and incorporation events. WordPress tags were retired from this workflow on June 28, 2026.
- The durable JSONL registry is generated by scanning the public WordPress post text and deriving keywords, topic routes, claim buckets, content hashes, and clean-text cache paths.
- The WordPress site is now treated as an official historical archive to mine while the subscription remains active, currently expected through approximately June 2029.

## Legacy Architrino Archive-Level Mining Stats

- Phase 1 archive report generated: June 28, 2026.
- Script: [build-legacy-architrino-archive.py](../../../scripts/source-mining/build-legacy-architrino-archive.py).
- Local artifact root: `${TMPDIR:-/tmp}/architrino-archive-mining`.
- Retrieval result: `379` posts, `1030` idea cards, and `840` deterministic idea clusters.
- Route-level triage reports: [archive mining report](archive-analysis/legacy-architrino-archive-mining-report.md), [candidate gaps](archive-analysis/legacy-architrino-candidate-gaps.md), and [idea clusters](archive-analysis/legacy-architrino-idea-clusters.md).
- This archive-level pass did not add source-mining-history rows and did not promote material into `content/markdown/aaa`.

## Comparison Packets

- [PIRSA fakeon causal-support screen](analysis/pirsa-fakeon-causal-support-screen.md) extracts a finite-width two-sided kernel as a negative comparison and preserves the causal-support predicate without importing fakeon or higher-derivative-gravity ontology.
- [Vacuum birefringence to Noether sea constitutive map](analysis/vacuum-birefringence-noether-sea-constitutive-map.md) captures the August 2026 IXPE/NICER/Parkes magnetar result, its model boundary, and the polarization-resolved susceptibility, Stokes-transport, adiabatic-following, avoided-crossing, and causal-dispersion bridges without importing virtual-particle or literal-crystal ontology.
- [Tim Maudlin Bell-foundations 2022 video source mining](../dormant-deferred/epr-bell/tim-maudlin-bell-foundations-2022-video-source-mining.md) captures Maudlin's locality-first reading of Bell, the detector-efficiency and measurement-independence mechanisms, the corrected EPR-to-Bell metaphor, and the PBR and time boundaries without treating his interpretive preference as theorem or selecting an $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell route.
- [Tim Maudlin EPR--Bell video source mining](../dormant-deferred/epr-bell/tim-maudlin-epr-bell-video-source-mining.md) captures the EPR completeness argument, one-particle versus two-wing predecision scope, no-signaling versus Bell locality, the conservation-ledger warning, and a conditional-independence diagnostic map without treating the lecture as a Bell derivation or route decision.
- [Collider detector provenance and event reconstruction](analysis/collider-detector-provenance-event-reconstruction.md) captures CERN, ATLAS, and CMS detector, trigger, reconstruction, jet, missing-transverse-momentum, and uncertainty material for event-ledger mapping.
- [QCD confinement and hadronization recovery targets](../mapping-standard-model/analysis/qcd-confinement-hadronization-recovery-targets.md) captures PDG QCD, lattice-QCD, LEP event-shape, fragmentation-function, and LHC jet/hadron benchmark material for Standard Model closure without treating quarks, gluons, showers, or jets as directly observed substrate products.
- [PDG particle mass, width, lifetime, and scheme benchmark map](analysis/pdg-particle-mass-width-lifetime-benchmark-map.md) captures scoped charged-lepton, selected light-hadron, $W/Z/H$, top, quark scheme, width, lifetime, and branching-ratio rows as downstream benchmark material without raw whole-catalog mining or standalone Koide work.
- [Classical source-history electrodynamics](analysis/classical-source-history-electrodynamics.md) captures the Lienard-Wiechert, Jefimenko, Heaviside-Feynman, and Panofsky-Phillips comparison space for delayed source-history electrodynamics.
