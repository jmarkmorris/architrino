# Noether Braid Proof ID Crosswalk

Claim level. Priority-only crosswalk ledger. This file maps existing Noether braid proof work onto the Proof IDs defined in the reader-facing taxonomy chapter without changing any proof status, certificate status, or retained-branch claim.

## Purpose

The Proof ID system names branch-configuration proof efforts. It is not a replacement for every old task label, app label, diagnostic label, chart label, or downstream physics packet. This crosswalk exists so later braid-document cleanup does not accidentally convert a negative diagnostic, app adapter, photon consumer, Lorentz export packet, mass-response packet, or uninspected proof corpus into a false branch-proof claim.

Use this file as the staging ledger before broad cleanup of Noether braid markdown files. When a file is edited later, its proof language should be checked against the rows below before introducing a Proof ID.

## Assignment Rules

1. A Proof ID names the branch configuration under test, not the application, downstream observable, or solver component that consumes the branch.
2. Diagnostics and rejected fixtures may still be mapped to a Proof ID, but their status must stay diagnostic, rejected, or `not_retained`.
3. The ideal braid is a proof-fixture label, not a Proof ID. It overlays the branch Proof ID whose assumptions it declares, usually a rest branch with $\mathbf{V}_{\mathrm{grp}}=0$.
4. The planar reduced chart is a chart label, not a Proof ID. It maps to `PL-*` only when the work is actually testing a planar lower-rank branch, and maps to `NSH-TERM` when it is a terminal nested-shell boundary chart.
5. Topological charge, spin, mass response, photon gates, Lorentz export, GR export, and measurement rows attach to a retained branch record. They do not create a base Proof ID by themselves.
6. Large proof-packet corpora remain unmapped until inspected. A filename match is not sufficient evidence for assignment.
7. If the support base is not declared, assign a provisional row and record the missing support evidence instead of forcing the packet into `NB`, `SH`, or `NSH`.

## Proof ID Vocabulary

The active Proof ID source of truth is the proof map in [Noether Braid Taxonomy](../../../content/markdown/aaa/noether-braid/noether-braid-taxonomy.md#proof-map-table). This ledger uses the following working categories:

| Category | Meaning |
| --- | --- |
| `branch target` | The packet directly attempts a branch-configuration certificate or theorem target. |
| `row evidence` | The packet populates or rejects one row consumed by a branch target. |
| `diagnostic/rejection` | The packet tests a limited hypothesis and keeps the result below retention. |
| `fixture` | The packet uses idealized assumptions for a qualification object; fixture status must not become a family name. |
| `chart` | The packet uses a reduced representation or comparison chart; chart status must not become branch retention. |
| `downstream consumer` | The packet depends on a retained branch record for observer-facing or sector-facing physics. |
| `uninspected corpus` | The packet set is too large or too specialized to relabel without a focused audit. |

Confidence values:

| Confidence | Meaning |
| --- | --- |
| `high` | The current priority tracker or authored chapter states the branch role clearly. |
| `medium` | The mapping is strongly suggested but needs local packet inspection before mechanical edits. |
| `low` | The mapping is provisional and should not drive cleanup without focused review. |

## Crosswalk Table

| Current work surface | Existing proof work | Primary Proof ID or disposition | Proof-stack role | Cleanup rule | Confidence |
| --- | --- | --- | --- | --- | --- |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | `neutral_braid_base_certificate` | `NB-0` | branch target | Use `NB-0` for the broad six-site rest-branch certificate before shell support or binary partition is assumed. | high |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | `all_pairs_root_ledger` and fixed rigid octahedral root-ledger certification | `NB-0` | row evidence | Record as row evidence for `NB-0`; do not call it retained branch closure. | high |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | rigid zero-offset fixed-speed octahedral no-go, ordinary same-source no-go, inventory-bias overread, resolved-root overread, phase-offset overread, polarity-phase overread | `NB-0` | diagnostic/rejection | Keep each result as a scoped rejection or overread closure inside `NB-0`; do not present it as rejection of `SH`, `NSH`, bounded-speed, or medium-response programs. | high |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | frozen fixed-ledger speed-ODE screen and zero-mean correction target | `NB-0`, feeding possible `SH-0` successor | diagnostic/rejection | State that frozen-ledger evidence does not certify a bounded-speed live ledger; map successor live-ledger work only after support assumptions are declared. | high |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | bounded-speed coupled fixed-point system and live-ledger/action-stability packets | `NB-0` or `SH-0`, support-dependent | branch target / row evidence | If the packet tests bounded-speed neutral closure before support, use `NB-0`; if it declares one-band support, use `SH-0`. Preserve `not_retained` unless live-ledger, action, event, stability, and observer-export rows close. | medium |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | `shell_braid_reduction_row`, support-complete $M=3$ path, shell support packets | `SH-0` | branch target / row evidence | Use `SH-0` for one-band shell rest support. A shell-case failure rejects only the shell case, not broad `NB-0`. | high |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | `nested_shell_braid_reduction_row` | `NSH-0` | branch target | Use `NSH-0` when three ordered support bands are declared. Do not assume exact binaries or rank-three frame unless the packet supplies them. | high |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | `action_and_noether_closure`, event rows, stability rows, convergence rows | support-dependent: `NB-0`, `SH-0`, or `NSH-0` | row evidence | Attach these rows to the support base being tested; do not make a standalone Proof ID. | high |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | `topology_and_framed_wake_rows` | no standalone Proof ID | downstream classifier | Attach topological rows only after a branch candidate has noncollision, roots, and event rows. | high |
| [braid-retained-branch-closure/priorities.md](../braid-retained-branch-closure/priorities.md) | `observer_export_rows` | `NB-L`, `SH-L`, or `NSH-L`, support-dependent | downstream consumer | Treat Lorentz, photon, mass-map, color, strong-field, and cosmology exports as computed rows after base branch closure. | high |
| [braid-retained-branch-closure/equation-map-bearing-on-braid-configuration-search.md](../braid-retained-branch-closure/equation-map-bearing-on-braid-configuration-search.md) | retained configuration search across $(f+2,f,f-1)$, $(f+1,f,f-1)$, $(f,f,f)$, $(4f,2f,f)$, and $(nf,mf,f)$ | `NSH-HINGE`, `NSH-321`, `NSH-ISO`, `NSH-421`, and general integer-ratio extension | branch-family comparison | Use the family-specific IDs only when nested support is declared. Otherwise record the frequency or hinge family as a candidate row whose support base remains open. | medium |
| [braid-doubling-frequency-lock/priorities.md](../braid-doubling-frequency-lock/priorities.md) | phase-bundle return map for `1:2:4` / `4:2:1` | `NSH-421` | branch target | Keep `4:2:1` as a candidate nested-shell frequency-lock proof target, not a completed selection theorem. | high |
| [braid-doubling-frequency-lock/priorities.md](../braid-doubling-frequency-lock/priorities.md) | caustic-weighted selection score | `NSH-421` | row evidence | Attach to `NSH-421`; keep topological overlap separate from dynamical polygon closure. | high |
| [braid-doubling-frequency-lock/priorities.md](../braid-doubling-frequency-lock/priorities.md) | flat-moduli Floquet test and $D_{\mathrm{plane}}=0$ wall | `NSH-421`, with possible `PL-NSH-0` or `NSH-TERM` comparison | row evidence / chart boundary | Use `PL-NSH-0` only if the lower-rank branch is itself tested; use `NSH-TERM` if the packet is terminal-hinge or symmetry-breaking boundary work. | medium |
| [braid-doubling-frequency-lock/noether-braid-scaling-and-packing.md](../braid-doubling-frequency-lock/noether-braid-scaling-and-packing.md) | ideal Noether braid scaling, radius/speed equations, packing center density | `NSH-421` plus fixture overlay when ideal assumptions are declared | fixture / downstream packing consumer | Do not convert `ideal` into a Proof ID. Treat scaling laws as conditional until branch constants are derived. | medium |
| [braid-angular-momentum-spin/priorities.md](../braid-angular-momentum-spin/priorities.md) | fundamental angular-momentum ledger | support-dependent frame row | row evidence | Attach angular-momentum frame evidence to the active support base. It becomes rank-three only when three retained rows and $D_{\mathrm{plane}}\neq0$ close on the same record. | high |
| [braid-angular-momentum-spin/priorities.md](../braid-angular-momentum-spin/priorities.md) | `tri_binary_partition_rule` and canonical middle-hinge $(I,M,O)=(f+2,f,f-1)$ candidate | `NSH-HINGE`, with comparison rows for `NSH-ISO`, `NSH-421`, and integer-ratio families | branch-family comparison | Map each candidate by family. The middle-hinge route is not a retained branch while retained point-event, transport, wake, energy-routing, and stability rows remain missing. | high |
| [braid-angular-momentum-spin/iso-frequency-energy-radius-candidate.md](../braid-angular-momentum-spin/iso-frequency-energy-radius-candidate.md) | common-frequency energy-radius candidate | `NSH-ISO` | branch-family target | Rename prose to iso-frequency when touched; keep the row candidate-level until root, phase, support, frame, energy, and stability rows close. | high |
| [braid-angular-momentum-spin/planar-tri-binary-noether-braid-reduced-chart.md](../braid-angular-momentum-spin/planar-tri-binary-noether-braid-reduced-chart.md) | planar reduced chart | chart; maps to `PL-NSH-0` or `NSH-TERM` only by local purpose | chart | Do not rename the chart as a base family. Inspect local use before assigning `PL-NSH-0` or `NSH-TERM`. | medium |
| [braid-angular-momentum-spin/priorities.md](../braid-angular-momentum-spin/priorities.md) | spinor closure, causal-writhe, measurement response, pair provenance, Bell rebuild, orbital quantization | no standalone Proof ID | downstream consumer | These consume retained angular-momentum and frame rows. Attach to the underlying branch ID only after the retained row source is declared. | high |
| [braid-angular-momentum-spin/photon-planar-pair-ledger-substrate-packet.md](../braid-angular-momentum-spin/photon-planar-pair-ledger-substrate-packet.md) | photon planar-pair transverse ledger and Gate B substrate | no Noether braid branch Proof ID yet; possible `PL-*` dependency after Gate A branch is declared | downstream consumer | Treat photon work as a separate photon-branch/gate proof surface. It may consume planar lower-rank evidence, but it does not certify a Noether braid base branch. | high |
| [braid-nested-shell-causal-closure/priorities.md](../braid-nested-shell-causal-closure/priorities.md) | shared branch certificate contract | `NSH-0` for rest certificate, `NSH-L` for moving export rows | branch target / downstream consumer | Keep rest branch closure and moving observer export separate. Population remains blocked until one retained branch supplies all rows together. | high |
| [braid-nested-shell-causal-closure/priorities.md](../braid-nested-shell-causal-closure/priorities.md) | Lorentz residual packet | `NSH-L` | downstream consumer | This is moving-branch observer export. It cannot promote a rest branch or rescue an open branch identity. | high |
| [braid-nested-shell-causal-closure/priorities.md](../braid-nested-shell-causal-closure/priorities.md) | structural-integrity common limit | `NSH-L` plus photon and common-limit consumers | downstream consumer | Treat as a shared export requirement over one retained branch, not a base Proof ID. | high |
| [braid-nested-shell-causal-closure/priorities.md](../braid-nested-shell-causal-closure/priorities.md) | photon Gate A/B/C and residual-routing event ledger | no base Proof ID; consumes branch IDs after source branch is declared | downstream consumer | Keep photon gates and event-routing packets separate from Noether braid branch retention. | high |
| [braid-mass-response-map/priorities.md](../braid-mass-response-map/priorities.md) | $A_0$ reduced branch certificate and first attractor-family search | `NSH-0` if the packet declares nested shell support; otherwise support-dependent | branch target / downstream mass consumer | Inspect support declaration before relabeling. The mass map consumes branch energy, shielding, exposure, and medium-response rows; it does not certify branch retention by itself. | medium |
| [braid-mass-response-map/priorities.md](../braid-mass-response-map/priorities.md) | exposure quotient, pressure response, medium-response tensor, Koide benchmark, mass hierarchy checks | no standalone Proof ID | downstream consumer | Attach only after an accepted branch emits energy, exposure, Noether sea response, pressure, and receiver-normal rows on the same record. | high |
| [app-solver/ideal-braid-adapter.md](../app-solver/ideal-braid-adapter.md) | Ideal Braid app adapter | no Proof ID | app adapter / fixture-supporting software | Keep as software adapter closeout. If an ideal-braid fixture is discussed in proof prose, map the fixture to its declared branch ID separately. | high |
| [app-solver/branch-provider-evidence-report.md](../app-solver/branch-provider-evidence-report.md) and shared H39 provider readouts | provider-boundary diagnostics | no Proof ID until accepted branch source exists | diagnostic / source-boundary evidence | Keep `same_domain_branch_provider_missing` and related blockers below branch authorization. Do not treat provider diagnostics as retained branch rows. | high |
| `reference/priorities/braid-retained-branch-closure/shell-braid/` large proof packet set | shell-braid theorem, solver, proof, and certificate packets | usually `SH-0`, but uninspected packet-by-packet | uninspected corpus | Do not bulk relabel. Inspect the owning packet and decide whether it is one-band shell support, neutral precursor, nested-shell successor, diagnostic, or downstream export. | low |
| `reference/priorities/proof-programs/` large proof-packet corpora | proof-program certificates and interval artifacts | uninspected | uninspected corpus | Exclude from first cleanup pass unless a named packet is selected and inspected. | low |

## Current Proof-Work Grouping

Use this grouping when reorganizing prose:

| Group | Contains | Proof ID handling |
| --- | --- | --- |
| Base branch closure | neutral braid, shell braid, nested shell braid retention predicates and first-failure rows | `NB-0`, `SH-0`, `NSH-0` |
| Moving continuation and observer export | Lorentz clock/ruler export, common-limit rows, moving branch residuals | `NB-L`, `SH-L`, `NSH-L`, support-dependent |
| Frequency and hinge families | iso-frequency, integer-ratio, doubling-frequency, field-speed hinge, terminal hinge | `NSH-ISO`, `NSH-321`, `NSH-421`, `NSH-HINGE`, `NSH-TERM` when nested support is declared |
| Lower-rank and planar work | planar lower-rank branches and reduced planar charts | `PL-NB-*`, `PL-SH-*`, `PL-NSH-*` only when testing lower-rank branch retention; otherwise chart-only |
| Downstream physics | topological charge, spin, photon, mass, measurement, Lorentz/GR, radiation, reaction, cosmology | Attach to the branch ID they consume; no standalone base Proof ID |
| App and runtime support | Ideal Braid app, Photon app, solver adapters, UI/runtime bridge work | No Proof ID unless the app is explicitly generating evidence for a named branch target |

## Cleanup Procedure

Before editing a braid-related document or priority packet:

1. Identify whether the passage is branch proof, row evidence, diagnostic/rejection, fixture, chart, downstream consumer, app/runtime support, or uninspected historical material.
2. Assign the primary branch Proof ID only if the support base, group-velocity regime, and variation are stated.
3. Preserve negative and blocked statuses exactly. A mapped diagnostic is still a diagnostic.
4. If a downstream consumer mentions a branch, write "consumes `Proof ID` evidence" or "requires a retained `Proof ID` branch" rather than making the consumer itself a Proof ID.
5. If the passage uses the ideal braid, state the fixture assumptions and map it only as an overlay on the active branch ID.
6. If the passage uses a planar reduced chart, decide whether it is `PL` lower-rank evidence, terminal `NSH-TERM` evidence, photon-channel bridge evidence, or only a proof/simulation chart.
7. If the local packet is large or historical, add an `inspect-before-relabeling` note rather than doing a mechanical replacement.

## Open Audit Questions

1. Whether the current `NSH-321` suffix is broad enough for all non-doubling integer frequency families, or whether the taxonomy should add a more general `NSH-INT` row before broad cleanup.
2. Whether $A_0$ reduced branch material should be treated as `NSH-0` by default or left support-dependent until each packet explicitly declares nested support.
3. Whether photon Gate A should eventually receive a separate photon Proof ID family outside the Noether braid branch Proof ID table.
4. Whether any ideal-braid app output should be promoted as evidence for a named branch target, or whether it should remain app-side visualization/solver-adapter support only.
5. Which subset of the large shell-braid and proof-program corpora should be inspected first if later prose cleanup touches those directories.

## Promotion Routing

This file is priority-only. It should not be linked from authored `content/markdown/aaa` documents. Reader-facing material should promote only the necessary proof discipline: Proof IDs name branch targets, diagnostics do not imply retention, charts are not branch families, fixtures are not base configurations, and downstream observer/sector rows consume retained branch records.
