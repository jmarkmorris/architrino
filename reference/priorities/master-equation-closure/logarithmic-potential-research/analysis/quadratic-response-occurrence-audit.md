# Quadratic receiver-response occurrence audit

## Disposition and corrected scenario

**Operator direction, 2026-10-02:** remove the quadratic receiver response from the logarithmic collinear scenario. A temporary modification used to understand one issue must not become an assumption in later analyses without explicit selection. This audit records where the factor occurred and distinguishes removal from the active scenario from preservation of separate experiments.

The [active manuscript](../manuscript.md#strict-domain-with-unchanged-logarithmic-acceleration) now uses the logarithmic causal acceleration with its unchanged source weighting and the strict speed domain. It has no receiver-speed multiplier. The comparison table, strict treatment, first-interval walkthrough, README, priorities and queue have been corrected together. The quadratic contact-limit conclusion and its speed–separation identity are no longer active results. The independently established unmodified incoming result instead reaches the excluded speed-one boundary at positive separation. During the stationary-source interval, the equation is $u'=K/(a+x)$ and the identity is $u^2=2K\ln[2a/(a+x)]$. The earlier of the history join and speed-one boundary ends this interval; the history join is not always first.

The earlier modified calculations remain at their existing paths with prominent exclusion notices. Their mathematical bodies and prior assessments are preserved. This preserves review provenance without making those assumptions available by default. The inclusive calculation contains no quadratic multiplier in its independent proof; its historical assessment links are distinguished below, and discussion of that case remains deferred. No replacement response, regulator, event prescription or self acceleration is introduced.

## Occurrences in this directory

The following inventory is measured by label, equation and filename searches with `rg` under this directory, followed by reads of the matching passages. “Removed” means removed from the current equation and its asserted consequences, not erased from the historical record.

| Document | Previous use | Current disposition |
| --- | --- | --- |
| [Manuscript](../manuscript.md#strict-domain-with-unchanged-logarithmic-acceleration) | Ceiling setup/table, strict endpoint derivation and first-interval walkthrough | Quadratic equation and dependent conclusions removed; unmodified logarithmic treatment substituted |
| [README](../README.md) | Summary of the quadratic contact limit and links presenting the result as a current strict case | Active summary corrected; historical links labeled as excluded side studies |
| [Priorities](../priorities.md) | Strict result, walkthrough, and response-provenance clarification | Current assumptions, first-event correction and exclusion recorded |
| [Work queue](../work-queue.md) | Additional evidence for research disposition | Withdrawn strict comparison removed as an active dependency |
| [Earlier ceiling comparison](ceiling-comparison.md) | Combined inclusive and quadratic strict comparison, strict proof and synthesis | Preserved behind a withdrawal notice; not the active strict scenario definition |
| [Quadratic independent reference](strict-ceiling-independent-check.md) | Independently derived theorem for the extra receiver factor | Preserved behind an exclusion notice; no evidence for the current strict equation |
| [Earlier inverse-distance comparisons](inverse-distance-collinear-obstructions.md) | Conditional contact/self examples plus a separate quadratic strict-response calculation | Mixed historical assumptions made explicit; quadratic section excluded from current scenario |
| [Inclusive independent reference](inclusive-ceiling-independent-check.md) | Historical assessment references the combined comparison and former manuscript | Inclusive proof uses no quadratic multiplier; original reference unchanged |
| [Work log](../work-log.md) | Chronology of the withdrawn comparison and walkthrough | Earlier entries preserved; correction appended with source-identity and validation record |

The historical independent reference uses the phrase “canonical quadratic response.” Its new notice corrects the scope: this meant a modified inverse-square comparison. The receiver factor is not canonical. Historical wording is not a permission to import it.

## Earlier collinear experiments

These are separate experiments in the [collinear owner's quarantine](../../collinear-research/README.md#quarantined-quadratic-response-examinations). Following the operator's further direction, the multiplier-dependent studies and their summaries are explicitly quarantined there. Their findings are not transferred into the active logarithmic scenario or continued as default collinear research. The original mathematics and evidence remain available under their declared assumptions; unrelated results in mixed documents retain their own scope. Reopening this response family requires explicit operator selection.

| Document | Use of the receiver factor |
| --- | --- |
| [Quadratic speed response](../../collinear-research/analysis/strict-speed-quadratic-response.md) | Original explicit proposal, examined September 26; multiplies inverse-square Master Equation acceleration by the quadratic receiver factor |
| [Finite-contact passage](../../collinear-research/analysis/strict-speed-finite-contact-passage.md) | Combines the factor with a softened spatial interaction and an added length |
| [Acceleration balance](../../collinear-research/analysis/strict-speed-acceleration-balance.md) | Audits the softened model's saved trajectory and examines response/geometry and action interpretations |
| [Two-path action](../../collinear-research/analysis/strict-speed-two-path-action.md) | Tests an attempted action formulation for the factor using an inverse-hyperbolic-tangent velocity function |
| [Finite-passage response comparison](../../collinear-research/analysis/finite-passage-response-comparison.md) | Its stronger stationary contact theorem assumes the factor; the more general local integrability discussion has separate assumptions |
| [Linear delayed-response comparison](../../collinear-research/analysis/linear-delayed-response-comparison.md) | Both instantaneous and delayed linear-response experiments retain the factor; measured growth belongs to the combined delayed model |
| [Master Equation assumption audit](../../collinear-research/analysis/master-equation-assumption-audit.md) | Identifies the factor as an added law and summarizes its consequences |
| [Collinear manuscript](../../collinear-research/manuscript.md#collinear-note-10) | Rows and notes 10–12 summarize the original quadratic, softened, and linear experiments |
| [Collinear priorities](../../collinear-research/priorities.md), [brainstorming](../../collinear-research/brainstorming.md), and [work log](../../collinear-research/work-log.md) | Summaries, proposed follow-ups and historical records of those experiments |

In particular, the softened-passage and linear-response results cannot be attributed to their radial changes alone. They combine those changes with the receiver factor. Their existence or suggested follow-up work is not authorization to carry that combination into another scenario.

## Exploratory code and retained outputs

The specific factor or its equivalent transformed-velocity implementation occurs in five scripts under `scripts/collinear-research/`, by targeted `rg` and source reads:

| Instrument | How the factor enters |
| --- | --- |
| [Finite-contact exploration](../../../../../scripts/collinear-research/strict-speed-finite-contact-exploration.py) | Evolves a transformed variable with velocity given by its hyperbolic tangent; differentiation supplies the quadratic factor |
| [Linear-response comparison](../../../../../scripts/collinear-research/linear-response-comparison.py) | Uses the same transformed variable in the instantaneous and delayed models |
| [Acceleration audit](../../../../../scripts/collinear-research/strict-speed-acceleration-audit.py) | Explicitly multiplies by `1-v*v` |
| [Potential-gradient check](../../../../../scripts/collinear-research/strict-speed-potential-gradient-check.py) | Explicitly multiplies both compared expressions by `1-vr*vr` |
| [Two-path variation check](../../../../../scripts/collinear-research/strict-speed-two-path-variation-check.py) | Checks the inverse-hyperbolic-tangent/logarithmic action candidate associated with this response |

These instruments are unchanged and were not run for this removal. Their filenames have no matches in `tests/` or `package.json` by filename `rg`. Saved output paths under `.local-data/collinear-research/finite-contact/` and `linear-response/` were identified by `rg --files`; they include older instrument snapshots and remain reproducibility records. Their ignored contents were not re-audited or deleted.

No implementation of this response was found in `src/eom/` or `tests/` by targeted searches for its name, velocity multiplier and hyperbolic-tangent forms. A live read of `src/eom/src/CertifiedAcceleration.cpp` at the sharp-root acceleration calculation confirms the transmitter weighting and inverse-square kernel there without a quadratic current-receiver multiplier. This is a bounded lexical audit plus inspection of that calculation, not a proof about every possible algebraically equivalent implementation.

## Search scope, exclusions and binders

The repository occurrence search covered `reference/`, `content/`, `scripts/`, `src/` and `tests/` using labels, linked filenames, displayed factor variants and transformed-velocity forms, followed by matching source reads. The focused negative-code check was:

```bash
rg -n -i 'strict-speed-quadratic|quadratic[- ](speed|receiver|response)|artanh|atanh|tanh|1\s*-\s*(v|u|vr)\s*\*\s*(v|u|vr)' src/eom tests
```

Observer-level Lorentz factors, translating-binary shape factors, lattice pulse polynomials, interpolation, quadratic-gradient flux and statistical quadratic response are different expressions or different roles. They were not removed. The quintic self-response experiment and a fixed lower-cap experiment are also different modifications, not instances of the quadratic factor audited here.

Binder inspection by filename `rg` found the moved logarithmic manuscript and earlier inverse-distance comparison in `src/documentation/research-source-locations.json`, and the original collinear analyses with historical source digests in the AWT-016 file map and migration records under `reference/priorities/aaa-work-threads/evidence/`. No paths are moved by this correction and those historical receipts are unchanged. The startup router records informational fingerprints of policy sources; ordinary source edits do not authorize regenerating that router. Filename searches found no additional references to the audited analysis filenames under `content/generated/` or `src/documentation/` beyond the stated inverse-distance route.

The [scenario-assumption procedure](../../../../op/theory-orientation.md#scenario-assumptions), linked from `AGENTS.md`, now states the general rule: use the named baseline plus only the expressly selected modifications, keep side experiments confined to their stated scope, report obstructions without inserting a remedy, and remove dependent active conclusions when an assumption is withdrawn. Existing explicit selection persists; it does not require repeated confirmation.

This inventory would be incomplete if another authored equation, instrument or active summary using this multiplier is found outside the listed occurrences. Such a finding should extend the inventory and be classified by its actual scenario; a matching polynomial or word alone is not evidence of inherited response physics.
