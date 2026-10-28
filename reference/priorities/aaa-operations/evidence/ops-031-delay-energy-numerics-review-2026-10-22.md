# OPS-031 — Delay energy and numerical recipe review — October 22, 2026

## Scope and disposition

Report-only whole-chapter review of launch sequences 162 and 164 in the annual validation/simulation cycle. Complete source reads, with clipped output recovered in bounded sections, covered [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md), lines 1–358, and [Numerical Recipe and Stability](../../../../content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md), lines 1–44. The October 22 heartbeat authorizes a batch of two to four chapters; the parent coordinates the other two paths and the coverage cursor.

**No new actionable defect was established in these two chapters by whole-source reading, live-owner comparison, and the independent algebra below. No substantive replacement is proposed.** This is a valid no-change disposition, not a proof that the chapters contain no remaining error. The previously recorded independent-energy, complete-root, regulator-limit and stability obligations remain open. CRW-005 remains closed at its historical review/disposition scope.

The reviewer is a delegated Codex review agent using the same inherited review procedure; the runtime does not expose a reproducible exact model/settings identifier here. No materially different review model was deliberately adopted, so no model-comparison or superiority claim is made. Elapsed review burden and resource cost were not measured. No simulation, model variant, solver acceptance run, source repair, publication or regeneration was performed.

## Source versions and references

Native `shasum -a 256` measured the preserved scratch copies under `.tmp/ops-031-oct22/delay/` and the final live targets at the same identities:

| Chapter | Lines read | SHA-256 |
| --- | ---: | --- |
| Delay Dynamics Energy | 358 | `962b8ac638f5b7f97d3eba0a63ab7330812ba7ccc1e8f1ff75b55371e7b6cbc4` |
| Numerical Recipe and Stability | 44 | `a066ae34f8098ba5fbbe3c24340f4b95c95cef341a70ebe925363d4389cc949b` |

The decisive live references were the Master Equation's canonical integral/root reduction, caustic-transit scope, auxiliary regulator, and action-boundary statistic; Energy's explicitly provisional kinetic scalar; Effective Lagrangian's complete versus scale-only residual and charge-balance boundary; Binary Dynamics' normative residual tuple and actual-history-space certification requirements; and the EOM evolution contract's accepted-history loop. Native `shasum -a 256` recorded these inspected owner versions:

| Owner | SHA-256 |
| --- | --- |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) | `a3fa7047b1347c8743d385a12e38c9994dc1d25dcf63037a53a727670db95267` |
| [Energy](../../../../content/markdown/aaa/dynamics/energy.md) | `9d4ba35bb722be8ba4fb0b723d8db994fc09127ed45e712a0185366366f1b23d` |
| [Effective Lagrangian](../../../../content/markdown/aaa/dynamics/effective-lagrangian.md) | `aac3fe9d6e52bf657917e74d03c136d81ee187ba7f1545eaeeeb3dfed1e5c2c4` |
| [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md) | `badb0e8089a652c6d8787783b9ddb6bc5c1a22c7fa758caa368587c461e8d322` |
| [EOM evolution contract](../../app-solver/contracts/evolution-contract-v1.md) | `e9813089f6223ed21952911071d3dbbcc6458ec172443437cf38260f2ab85170` |

These references establish the declared obligations, not independent validation of their unresolved scientific constructions. The independent references for the retrospective checks are the chain rule and signed integrated balance, rather than agreement among chapter authors or agents. No new external measurement or quotation is used.

## Whole-chapter assessment

Delay Dynamics Energy correctly separates the desired history-only functional from a continued-record candidate and its finite-depth approximation. Its action kernel retains the owner's time-normalized delta, outer negative one-half convention and distance/time regulator conversion. Future continuation, moving cuts and omitted tails are explicit; the chapter does not claim that the candidate already generates the canonical acceleration law. The owner's conditional future-boundary cancellation is compatible with the chapter's requirement for proved cancellation of continuation dependence; the finite-depth cut still needs its stated additional data.

The work route retains its chain-rule identity without using that same identity as independent conservation evidence. Finite-width root-band attribution requires a nonoverlapping complete partition or an explicit complement. Pair power sums both members; pointwise tangential EOM balance is required for a constant-speed circle. The boundary account separates transport, controls, history-edge power and residuals. The crosswalk's plus-flux sign and its restricted assumptions agree with the signed balance below. A zero subtracted balance residual is expressly distinguished from a constant retained total. Lower-bound and speed-control requirements remain construction targets rather than a no-runaway theorem. The possible sea state is additional input when not determined by the explicit history, and its degrees of freedom cannot be counted twice.

Numerical Recipe and Stability preserves the acceleration-first canonical law with no primitive mass. With its declared normalized wake speed, differentiating its distance-gap function gives the stated transmitter derivative and negative receiver derivative; implicit differentiation gives signed playback, while the absolute transmitter derivative gives the positive acceleration weight. A negative or zero receiver factor does not delete an admitted simple root. Complete inactive-domain exclusion, interpolation uncertainty and history-tail control are explicit. The recipe distinguishes the sharp root formula from finite-width emission-time quadrature and forbids inserting the collapsed Jacobian a second time. It separates surface width from near-coincidence control and separates resolution guidance from a numerical-stability theorem. It consumes the Binary Dynamics tuple by reference and reserves physical stability for an actual solution with the full retained-history operator controlled.

These are measured textual dispositions against the cited live owners and derived local algebra; no numerical candidate, physical energy, global continuation or stable binary is certified. Reopen either chapter if an admitted independent charge contradicts its accounting, a complete root case violates the stated normalization, an unbounded support or memory contribution defeats its declared bounds, or the normative owners change incompatibly.

## Two accepted-repair rechecks and one previous no-change recheck

The historical [September 11 energy review and authorized closeout](../../aaa-corpus-rewrite/evidence/crw-005-delay-dynamics-energy-review-2026-09-11.md) identifies DDE-3 and DDE-4 as accepted repairs. Its “Preserved strengths and non-findings,” item 6, explicitly records the observer-potential prohibition as a no-change disposition. These are claim-level rechecks in the currently due validation class; they do not add whole-chapter coverage to other paths.

| Historical item | Before and retained after | Independent check and current disposition |
| --- | --- | --- |
| DDE-3: acceleration-residual weight | Before: an untyped/unweighted residual was substituted into energy balance. Retained after at current lines 262–274: actual acceleration minus modeled acceleration, paired with receiver velocity and the kinetic bookkeeping coefficient; an Euler residual requires a separately derived conversion. | Derived chain-rule witness with normalized wake speed, coefficient 2, velocity increasing linearly from 0 to 1 over a unit window, and modeled acceleration zero: kinetic change is 1 and integrated weighted residual power is 1. The old unweighted pairing gives only 0.5. The current repair survives for dimensional correctness, meaning and local explanation; no introduced regression established. |
| DDE-4: outward-flux sign | Before: the crosswalk used the wrong outward-flux sign. Retained after at current lines 209–258: inward boundary work is minus outward flux, and the simplified crosswalk adds outward flux under explicit no-control, no-sea-change, fixed-membership and vanishing-defect assumptions. | Derived balance witness with constant kinetic proxy, outward integrated flux 1 and no other entries: interaction change is −1 and work-reconstruction change is 0. Current numerator −1−0+1 vanishes; the old sign gives −2. The current repair survives for sign, preserved exchange meaning and explicit assumptions. It does not establish an actual conserved charge. |
| Previous no-change: observer gravitational potential | Historical item 6 says gravitational potential is an effective comparison label rather than an action primitive. Current line 49 retains: “Observer-level gravitational potential energy is therefore a comparison construct, not a fourth primitive term.” | Live Energy lines 3–17 and AGENTS' primitive/import boundary support this layer distinction. The current text requires reconstruction on the same retained kinetic/wake/sea/boundary account. The no-change disposition survives; no concealed extra primitive is introduced by this passage. |

All numerical witnesses use normalized wake speed 1. An in-memory Node linear-integral helper first passed the independently known constant and linear integrals over the unit interval, returning 1 and 0.5. Only then did the DDE-3 and DDE-4 witnesses run, returning weighted residual 0, old unweighted residual 0.5, corrected crosswalk 0 and old signed crosswalk −2. These check algebra and signs only, not delayed-law evolution or physical conservation. Reopen DDE-3 if a different kinetic convention is substituted without its corresponding chain-rule weight; reopen DDE-4 if flux orientation or crosswalk assumptions change; reopen the no-change disposition if the text or an accepted primitive decision actually adds a gravitational-potential term at substrate level.

## Focused structural verification and limits

The unchanged `.tmp/ops-031-effective-proposal-oct12/validate.mjs` parser first passed its known inline/display, code exclusion, blockquote, fenced-link and valid/invalid TeX controls before either target was read by that instrument. It then reported:

| Target | Math expressions | Displays / viewer links | Local file targets | Result |
| --- | ---: | ---: | ---: | --- |
| Delay Dynamics Energy | 141 | 18 / 18 | 31 | Passed |
| Numerical Recipe and Stability | 47 | 1 / 1 | 7 | Passed |

This establishes strict KaTeX parsing and local file existence for the recorded sources, not arbitrary fragment validity, visual layout, external-link reachability or mathematical correctness. The normatively linked Master Equation and Binary Dynamics sections were additionally read at their actual headings. No generator was run. No full repository acceptance or cost claim follows from these focused checks.

Owner follow-up: none newly proposed for these two paths. Their existing independent charge, route-equivalence, complete root/support, limit and periodic-history certification obligations remain with the cited scientific and solver owners. Coverage completion and the next due dates are recorded separately by the parent under OPS-031 and OPS-032.
