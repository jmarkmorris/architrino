# OPS-031 Nuclear Binding review — 2026-09-22

## Disposition and source

**Complete whole-chapter review; no new actionable finding.** Preserve the chapter unchanged. This is priority-3 supporting coverage under the [periodic review procedure](../../../op/periodic-document-review.md), not reopening CRW-005 or certifying a nuclear mechanism. Reviewer: Codex `ops_032_weekly`, reused for this bounded assignment; same model lineage as the running campaign, with no model-adoption or superiority claim. Exact model revision/settings and elapsed review burden were not measured.

[The chapter](../../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) was read completely in bounded source ranges 1–145, 146–270 and 270–396 after the initial combined read was truncated. `shasum -a 256` before substantive review and again after the reads returned `0ea9a4a3d237e770d3fff6e62b3dc16049abb6de2eee6baf737b2014d054ac7d`, matching the final digest in the [September 12 CRW receipt](../../aaa-corpus-rewrite/evidence/crw-005-nuclear-binding-review-2026-09-12.md). Observed HEAD was `e54cd56b43381b8faa7959a2540b1b1177813ee0`; `git --no-optional-locks status --short -- content/markdown/aaa/nuclear-atomic/nuclear-binding.md` returned no entries. No source edit occurred. These commands establish byte identity and tracked state for this chapter only.

The earlier receipt repaired fourteen issues; it was not a whole-document no-change disposition. The requested previous no-change recheck is therefore claim-level: its explicitly preserved binding-energy definition and beta inventory display, not a misdescription of that earlier review as wholly unchanged. Its recorded baseline is commit `66e0e47de3797be86855acf6318aaab6c503031c`, chapter digest `428e2c7533f612c8d4134d3dcf89170d1456f68beeb7bcb721bdc7583e97cdad`. This review inspected that baseline's binding-energy passage with `git show`, independently of the later receipt's narrative.

## Coverage and independent reasoning

| Chapter scope | Review and disposition |
| --- | --- |
| Opening and binding-energy intuition, lines 1–29 | Effective-model and observer-calibration boundaries are explicit. Mass-defect ordering is distinguished from accessibility and reaction rate; differing proton/neutron reference energies are not conflated with one universal baseline. No correction warranted. |
| Prompt fission and D–T balances, lines 29–81 | Initial motion, excitation, massive-product inventory, medium/sea/recoil allocation and finite-cutoff interaction energy are stated. Algebraic accounting does not itself demonstrate conservation in the primitive theory. The existing text makes that distinction. |
| Core claim and decomposition, lines 83–152 | Proposed nucleon envelopes and effective rest masses remain separate from native mass recovery. Shell terms have unspecified sign; all five correction terms enter binding. Corridor exchange and sea energy must be disjoint, with unresolved relative-motion/many-body allocation explicit. |
| Physical ingredients and potential, lines 154–227 | The hard core is an idealization, not a derived self-hit threshold. The proton monopole term is observer-level and restricted by finite-size/screening applicability. The sign pattern is insufficient for a retained branch, as the text states. |
| Deuteron and saturation, lines 229–276 | Spin-channel, electromagnetic-response and complete-energy requirements remain targets. The charge quadrupole discussion distinguishes the state from its readout operator. Uniform neighbor-count and per-neighbor bounds are required for bounded attraction per nucleon; a density minimum is separately required. |
| Alpha structure and decay, lines 278–313 | Equal proton/neutron count does not imply electric neutrality. Formation, conditional opportunity probabilities, constant-rate/rare-event assumptions and competing decay channels are distinguished. No single deterministic escape history is presented as an ensemble law. |
| Metastability, beta interface and tests, lines 315–373 | Rate versus half-life dimensions, state versus sea energy, full lepton/electronic inventory and energetic versus kinetic permission are explicit. Existing seven comparison conditions are retained; no new gate is proposed. |
| Meson interface, sources and related chapters, lines 375–396 | Source roles are explicit; empirical comparisons do not authorize primitive imports. Nearby owner checks and external source checks are scoped below. |

### Previous no-change claim survives: binding-energy definition

The earlier receipt explicitly preserved all seventeen display equations; the definition at current lines 140–147 was already present in its pinned baseline. Its independent reference is elementary subtraction from the definition of a matched separated-nucleon energy: let $E_{\mathrm{sep}}=\sum_a M_a c_{\mathrm{eff}}^2$. The energy required to take a lower-energy nucleus to that specified separated state is $B=E_{\mathrm{sep}}-E_{\mathrm{nuc}}$. If $E_{\mathrm{nuc}}=E_{\mathrm{sep}}+\sum_j E_j$, subtraction gives $B=-\sum_j E_j$ with every correction included. This is an observer-level definition and algebraic identity, not a substrate conservation theorem.

The preserved definition remains correct. The old adjacent prose omitted the shell contribution; NB-05 repaired that prose, and current line 150 includes it. Thus the unchanged equation passes its independent reference while the earlier prose correction also survives. A missing term, inconsistent reference environment, or mixed mass convention would overturn the accounting application; none is hidden by the present explicit caveats. Correctness and preserved meaning pass at this defined level. Explanatory usefulness is an editorial judgment: the local sentence connecting the displayed definition to the five terms is useful and requires no rewrite.

The unchanged beta inventory equation at lines 343–349 also passes a separate charge/baryon-number check: one neutron has charge zero and baryon number one; the proton, electron and electron antineutrino products have total charge $+1-1+0=0$ and baryon number one. The surrounding text correctly refuses to infer free-nucleon energetic permission from this inventory identity. This checks bookkeeping only, not the weak mechanism or its rate.

### Counterexample checks against overreading

These are analytical checks, not new simulations or alternative microscopic premises:

- An energetically lower daughter state behind an inaccessible dynamical route need not occur. The chapter already separates endpoint energy from a route and a population rate.
- Finite favorable-neighbor count alone would not bound attraction per nucleon if each contribution grew with population size. The chapter explicitly requires both bounds and separate control of sea/many-body terms.
- For a radial point-charge density, the angular average of $3\cos^2\theta-1$ is zero, so a pure spherical charge distribution has zero quadrupole. A nonzero composite charge operator need not be equivalent to changing a central nuclear potential. The chapter's deuteron qualification passes this distinction.
- With equally spaced opportunities and fixed conditional escape probability $p$, survival after $n$ opportunities is $(1-p)^n$; taking its logarithm gives the stated effective rate $-\nu\log(1-p)$ and rare-event approximation $\nu p$. This is a declared sampling model, not a universal formula for arbitrary waiting-time processes. The existing paragraph names stationary sampling and controlled correlations and does not claim a primitive stochastic law.

No demonstrated contradiction was found by these checks. They do not establish that the proposed nuclear branches exist.

## Canon and source checks

Live startup and review instructions were read: AGENTS, router corpus-review card, review skill/live owner, corpus reviewer, theory orientation and the periodic-review procedure. Task-relevant style, notation, terminology, comparative-glossary and source-policy passages were inspected. Nearby readings were deliberately bounded, not whole-owner certification: Ontology and Architrino openings; Master Equation's primitive acceleration scope; Nucleon Structure's claim boundary; Mesons' declared assembly/interface scope; and Particle Masses' effective rest-energy readout. These support the chapter's distinction between declared nuclear envelopes and a derived architrino branch. Canon was not edited.

`shasum -a 256` recorded the nearby source versions:

| Path relative to `content/markdown/aaa/` | SHA-256 |
| --- | --- |
| `nuclear-atomic/nucleon-structure.md` | `dc8f6687cebdf944892cb47aa40bcb41a66342d772fe675a8b4de80ecc51246d` |
| `assemblies/mesons/mesons.md` | `5e3311408fce6f3053b9aedac06d0e055ccde17ec64f6c5e29699523ccb9b4fd` |
| `assemblies/particle-masses.md` | `7c12ec4982c88d82c7e0d07af8e6f690f559352a05cbad342024eacecc23e945` |

The prior CRW receipt's SHA-256 is `592a8b68a5c388d1d6aeff5621b56aa4b8ff2e4486bdcc4df51296e1d48c876e`.

Both external sources were reopened on September 22 through the web tool. The [ENSDF adopted polonium-212 levels](https://www.nndc.bnl.gov/ensnds/212/Po/adopted.pdf), page 1, identifies the August 2020 evaluation, gives ground-state half-life `294.3 ns 8`, and total alpha release `8954.20 11` keV. The chapter's rounded lifetime and explicit recoil distinction agree with that cited edition. This is not a search for a newer evaluation or reproduction of a spectrum. The [Filin et al. abstract](https://arxiv.org/abs/2009.08911) explicitly uses two-nucleon potentials and single-/two-nucleon charge-density contributions. It supports the cited state-versus-charge-operator distinction; the full 39-page computation was not reproduced or reviewed.

## Limits and next disposition

Confirmed new defects: **0**. Optional revisions recommended: **0**. No source edits, repair expansion, model switch, generator writes, publication, solver run, or broad validation suite occurred. No new computational checker was needed for the algebraic and symmetry arguments. The prior rendering/link measurements are historical evidence at identical chapter bytes, not a newly executed rendering or navigation check.

This pass supports keeping the current exposition. It does not certify deuteron or alpha retention, a complete energy functional, weak/alpha rates, sea constitutive response, empirical nuclear accuracy or corpus-wide correctness. A future accepted change to the mass, sea, nuclear-envelope or meson interface triggers dependency review; otherwise retain the approved priority-3 cycle deadline of March 13, 2027. Root owns the shared cursor, sample accounting and any wider priority routing. CRW-005 remains closed.

Final verification: the chapter SHA-256 remained `0ea9a4a3d237e770d3fff6e62b3dc16049abb6de2eee6baf737b2014d054ac7d` after receipt creation. `git diff --no-index --check /dev/null` on this new receipt emitted no whitespace diagnostics; exit 1 denotes the new-file difference.
