# Noether Braid Proof Map

This chapter is the live proof-map companion to [Noether Braid Taxonomy](noether-braid-taxonomy.md). The taxonomy chapter defines the configuration axes and Proof ID grammar. This proof map records current proof-run targets, work status, detailed proof-record fields, and environment-qualified rounds such as `SH-0-sea`.

A proof map records failures and blocks with the same care as successes. It is the place where candidates, diagnostics, failures, blocked packets, retained rows, and downstream consumers are kept separate. The reader should first ask which branch configuration is being tested, then what job the packet is doing, and only then whether the evidence has reached retained or certified status.

A proof ID names a specific branch-configuration effort and does not assert success. Row evidence, diagnostics, fixtures, charts, and downstream physics packets should name the branch Proof ID they test or consume only after the support base, group-velocity regime, and local variation are declared.

A negative diagnostic remains scoped to the branch chart and assumptions that produced it. A photon, mass-response, Lorentz-export, topological-charge, GR-export, measurement, or app-runtime packet is downstream of branch retention unless the same retained record supplies the rows being exported. A planar reduced chart names a restricted proof or simulation representation; it should not be treated as a branch Proof ID unless the local calculation is explicitly testing a planar lower-rank branch or the terminal hinge. A proof fixture remains an overlay on the relevant branch Proof ID, not a Proof ID of its own.

Read every proof packet with three independent labels:

| Label | Question it answers | Example values |
| --- | --- | --- |
| Proof ID | Which branch configuration and proof environment are being tested? | `NB-0`, `SH-0`, `SH-0-sea`, `NSH-421`, `PL-NSH-0` |
| Proof-stack role | What job is this packet doing for that branch? | branch target, row evidence, diagnostic/rejection, fixture, chart, downstream consumer |
| Current disposition | What is the present result under the packet's declared assumptions? | candidate, not tested, blocked, rejected, `not_retained`, retained |

The ID alone never supplies disposition. A rejected `NB-0` diagnostic, an open `NSH-421` row-evidence packet, an isolation-only `SH-0` return map, a candidate `SH-0-sea` embedded test, a retained `SH-0-sea` branch stable among like assemblies, and a certified `SH-0-sea` branch with observer-export closure would have different proof meanings even though they share the same grammar.

Some proof efforts also carry local fixture or artifact labels. Those labels are stable evidence handles, not new base Proof IDs. A group-zero, axis-neutral, common-sphere held-release six-point fixture is `SH-0` row evidence because it declares one shell support band at rest. That classification does not make the branch retained. The result still depends on the current disposition, proof-stack role, accepted-source status, stability row, and Noether sea response row.

## Proof Burden Order

The Proof IDs name configurations, but the proof burden closes in ordered rows. A packet can supply evidence for one row while leaving the next row open.

| Proof burden | What must close on the same record | First IDs that exercise it | Promotion effect |
| --- | --- | --- | --- |
| Rest branch retention | Inventory, support, causal-root, wake-tail, dynamics, action, event, stability, and convergence rows in the declared rest environment. | `NB-0`, `SH-0`, `NSH-0`, `PL-NB-0`, `PL-SH-0`, `PL-NSH-0` | Candidate branch becomes a retained branch only in that declared environment. |
| Noether sea embedded retention | The rest retention rows plus the local Noether sea population-response row from like assemblies. | `SH-0-sea`; later `NB-0-sea`, `NSH-0-sea`, or `PL-*-sea` packets if declared. | Isolation-only diagnostics become medium-stability evidence when the environment row closes. |
| Moving observer export | Transport, response-center, clock, ruler, energy/action, and preferred-frame leakage rows for $\|\mathbf V_{\mathrm{grp}}\| > 0$. | `NB-L`, `SH-L`, `NSH-L`, `PL-NB-L`, `PL-SH-L`, `PL-NSH-L` | Retained branch can be promoted toward certified braid status only if Lorentz-compatible export closes. |
| Assembly consumer rows | Topological charge, photon channel, mass response, spin-statistics/exchange recovery, strong-sector/color and gluon behavior, accessory-architrino capture, generation behavior, GR/effective-metric export, and app-runtime packets consume the retained branch record. | Downstream packets tied back to the relevant retained Proof ID. | Consumer success classifies or exports a retained branch; it does not retroactively prove branch retention. |

## Evidence-Handle Cleanup Decisions

This pass separates three cases that should not be cleaned up the same way:
an active diagnostic packet with missing accepted-source rows, a planned
environment round with no inspected packet yet, and a candidate theorem family
whose diagnostics must not be consumed as branch proof.

| Proof ID | Existing evidence handles | Cleanup decision | First evidence blocker |
| --- | --- | --- | --- |
| `NB-0` | Neutral braid base certificate; all-pairs root ledger; rigid octahedral root/Jacobian diagnostics; finite-mode and bounded-speed successor targets when no shell support is declared. | Geometry, inventory, root-ledger, and negative diagnostics can stay under `NB-0`. Any force/action, stability, or retention read must be screened against the receiver-normal branch-strength row; source-normal/Jacobian-only or frozen-ledger rows remain diagnostic or restart-required. | No same-record neutral retained branch currently supplies accepted live roots plus $D_s$, $D_T$, $W^{\mathrm{rec}}$ / `branchWeight`, action/event/stability, convergence, and support rows. |
| `SH-0` | Held-release common-sphere fixture; octahedral root-ledger and no-go diagnostics when the declared chart has one common shell support. | Source/evidence cleanup is needed before any retention read. Keep the handles as diagnostic row evidence until seed-path, retained-history, return-response, stability, and provenance rows bind to one accepted record. | Fresh/default rows fail at `held_release_seed_path_rows[*].retained_record_id`; the current automated evidence-acquisition chain is blocked at the missing object `held_release_seed_path_rows_acceptance_certificate` and its required field `held_release_seed_path_rows.acceptance_certificate_ref`. |
| `SH-0-sea` | No inspected embedded packet is currently mapped; the row is the next environment round after isolated `SH-0` did not retain. | No legacy packet cleanup is available yet. First-packet modeling may inherit the diagnostic/candidate `SH-0` target identity, then add like-assembly population, boundary-condition, and sea-response rows. | Accepted retained-evidence claims still wait on an accepted central `SH-0` target/source record plus same-record receiver-normal, action, wake, support, event, and sea-response rows. |
| `NSH-0` | Nested shell reduction row; radial-support and role-map packets; shared nested certificate and dynamics/geometry theorem targets. | Support, role, radial geometry, and taxonomy material can stay. Any retained-branch read requires a nested branch certificate with same-record receiver-normal root strength, action/energy, frame, event, stability, and convergence rows. Exact binaries and a rank-three frame are not assumed unless the packet supplies them. | No accepted nested branch certificate with same-record receiver-normal active rows is currently mapped; support-dependent $A_0$, mass-response, or observer-export material remains downstream until inspected. |
| `NSH-421` | Doubling-frequency chapter; phase-bundle, caustic-score, Floquet, and torque/wake same-row diagnostics where used. | Source/evidence cleanup is needed to keep candidate row evidence separate from retained branch proof. The packet can remain a candidate-family theorem target until accepted branch-certificate and same-row active-ID refs exist. | Missing accepted `branch_certificate_ref`; downstream blockers include `same_retained_active_row_ids`, accepted branch chart, moving retained branch certificate, accepted transition source, and action-increment row. |
| `PL-*` | Planar reduced charts, lower-rank frame-boundary material, terminal-hinge comparisons, and possible photon-channel bridge evidence. | Geometry-only and chart material can stay. Assign `PL-NB-*`, `PL-SH-*`, or `PL-NSH-*` only when the local packet is explicitly testing lower-rank branch retention; otherwise keep the material chart-only, terminal-boundary, or downstream. Retained `PL` claims require same-record receiver-normal branch-strength rows plus the support, action/event, stability, and convergence rows for the declared support base. | No inspected lower-rank retained branch packet with support base, environment, receiver-normal root weights, action/event/stability rows, and convergence rows is mapped; `PL-NSH-0` remains chart-boundary started, not retained. |

## Current Work Index

In this index, work status is a proof-map status, not a certification claim. `Started` means at least one inspected proof packet, diagnostic, or row-evidence packet is mapped directly to the Proof ID. `Downstream started` means export or consumer rows are mapped, but they wait on a retained rest branch. `Boundary started` means terminal-boundary evidence is mapped without branch retention. `Chart-boundary started` means reduced-chart boundary evidence is mapped without a retained lower-rank branch. `Not started` means no inspected proof packet is currently mapped to the Proof ID. `Unassigned` means likely related material exists, but it has not been inspected enough to map without overclaiming.

| Proof ID | Proof focus | Work status | Current stage | Main proof question |
| --- | --- | --- | --- | --- |
| `NB-0` | neutral braid, rest | Started | No-declared-shell neutral rest category; only packets without a declared shell support geometry map here. | Can the broad neutral branch retain without adding a shell-support assumption? |
| `NB-L` | neutral braid, moving export | Downstream started | Observer-export rows are mapped; they wait on a retained `NB-0` branch. | Can a retained neutral branch move and export clock/ruler rows? |
| `SH-0` | shell braid, rest | Started | One-band shell support packets are active, including the group-zero axis-neutral common-sphere held-release fixture; retained branch remains open. | Can shell support rows retain on the same branch record? |
| `SH-0-sea` | shell braid, rest, Noether sea embedded | Not started | Defined as the next embedded round after isolated `SH-0` did not supply a retained row. | Does like-assembly Noether sea response retain the one-band shell branch? |
| `SH-L` | shell braid, moving export | Downstream started | Observer-export rows are mapped; they wait on a retained `SH-0` or `SH-0-sea` branch. | Can a retained shell survive transport and export Lorentz rows? |
| `NSH-0` | nested shell braid, rest | Started | Nested-shell reduction and shared-certificate targets exist; retained branch remains open. | Can nested support, role, causal-root, energy, frame, and stability rows retain? |
| `NSH-L` | nested shell braid, moving export | Downstream started | Lorentz and common-limit export rows are active; they wait on a retained `NSH-0` branch. | Can a retained nested shell branch recover Lorentz rows? |
| `NSH-AX` | nested shell braid, axis comparison | Not started | Axis-neutral and axis-polarized comparison is defined; no inspected packet is mapped yet. | Which axis settings survive same-record branch tests? |
| `NSH-ISO` | nested shell braid, iso-frequency `1:1:1` | Started | Iso-frequency energy/radius candidate is at candidate-family stage. | Can the common return-rate family close its ledgers? |
| `NSH-321` | nested shell braid, integer-ratio `3:2:1` | Started | Equation-map search names this comparison family; nested support still must be declared locally. | How does a non-doubling integer family compare? |
| `NSH-421` | nested shell braid, doubling-frequency `4:2:1` | Started | Phase-bundle, caustic-score, and Floquet rows are active candidate-theorem material. | Can the doubling lock close phase, role, root, frame, and stability rows? |
| `NSH-HINGE` | nested shell braid, field-speed hinge | Started | Middle-hinge and frequency-family comparison rows are active at candidate stage. | Which speed rows alter root access while preserving transversality? |
| `NSH-TERM` | nested shell braid, terminal hinge | Boundary started | Terminal-hinge and $D_{\mathrm{plane}} = 0$ chart-boundary evidence exists; it is not branch retention. | Where does closure fail or reorganize at the terminal hinge? |
| `PL-NB-0` | planar lower-rank neutral braid, rest | Not started | No inspected lower-rank neutral branch packet is mapped yet. | Can lower-rank behavior retain on neutral support? |
| `PL-NB-L` | planar lower-rank neutral braid, moving export | Not started | Blocked until a retained `PL-NB-0` branch exists. | Can a retained lower-rank neutral branch export observer rows? |
| `PL-SH-0` | planar lower-rank shell braid, rest | Unassigned | Possible shell material must be inspected before claiming lower-rank shell evidence. | Can one-band shell support retain without a rank-three frame? |
| `PL-SH-L` | planar lower-rank shell braid, moving export | Not started | Blocked until a retained `PL-SH-0` branch exists. | Can a retained lower-rank shell branch export observer rows? |
| `PL-NSH-0` | planar lower-rank nested shell braid, rest | Chart-boundary started | Planar-chart and $D_{\mathrm{plane}} = 0$ wall evidence exists; no retained lower-rank branch is claimed. | Is the lower-rank case retained, terminal, or only diagnostic? |
| `PL-NSH-L` | planar lower-rank nested shell braid, moving export | Not started | Blocked until a retained `PL-NSH-0` branch exists. | Can a retained lower-rank nested branch export observer rows? |

The detailed records below use the configuration decoder fields for each Proof ID: fixed effort, group velocity, support or shell count, angular-momentum frame, axis setting, frequency ratio, hinge value, energy-level relation, Noether sea environment, Lorentz deformation, and success condition. Proof-stack role, work status, and current disposition remain attached to inspected packets, fixture bullets, and the current work index rather than to the ID alone.

## Neutral Braid Proof IDs

**`NB-0` -- Neutral braid rest qualification**

- Fixed effort: Six-worldline $3:3$ inventory and one shared causal-return record.
- Group velocity: $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: No shell support geometry declared.
- Angular-momentum frame: Not assigned.
- Axis setting: Not assigned by the base ID.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: One branch energy ledger required.
- Noether sea environment: Not assigned by the base ID.
- Lorentz deformation: Not tested.
- Success condition: Retain the broad neutral branch record without adding a shell-support assumption.

**`NB-L` -- Moving neutral braid continuation**

- Fixed effort: Moving continuation of a retained neutral branch.
- Group velocity: $\|\mathbf V_{\mathrm{grp}}\| > 0$.
- Support / shell count: Inherited from `NB-0`, if any.
- Angular-momentum frame: Inherited or still unassigned.
- Axis setting: Not assigned unless added.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving energy/action export required.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Required if the neutral branch is promoted toward certification.
- Success condition: Show moving continuation, clock/ruler export, and bounded preferred-frame leakage.

## Shell Braid Proof IDs

**`SH-0` -- Shell braid rest qualification**

- Fixed effort: One controlled radial support band around a branch center.
- Group velocity: $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: One support band or common shell.
- Angular-momentum frame: Not assigned by shell support.
- Axis setting: Not assigned by the base ID. Inspected fixtures include an axis-neutral held-release seed where the three positive sites occupy one triangular face and the three negative sites occupy the opposite face.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: Shell support does not fix energy levels.
- Noether sea environment: Isolation-only unless the packet carries `-sea`.
- Lorentz deformation: Not tested.
- Success condition: Retain the shell support rows on the same branch record.
- Started fixture / evidence handles: group-zero, axis-neutral, common-sphere held-release six-point fixture; rigid fixed-speed octahedral root-ledger and no-go diagnostics when their declared chart includes one common shell support.
- Current fixture disposition: The held-release fixture preserves center-zero, common-sphere, common-speed, and antipodal-pair symmetry under the declared symmetry assumptions, then shows a single compression-to-expansion turn without a retained return response. It remains non-promoted diagnostic row evidence. Fresh/default seed-path rows still fail at the missing retained-record id, while the current automated evidence-acquisition chain sharpens the blocker to the missing same-record seed-path acceptance certificate. Without accepted seed-path, retained-history provenance, return, stability, and Noether sea rows, the fixture cannot count as retention evidence.
- Evidence cleanup decision: Clean this packet family before any retention read. The held-release and octahedral handles may support the `SH-0` diagnostic story, but retention requires the seed-path rows, retained-history provenance, return-response row, stability row, and later sea-response row to bind to one accepted record.
- Next environment round: `SH-0-sea`, with an explicit like-assembly population record, boundary condition, and sea-response row tied to the same target branch.

**`SH-0-sea` -- Noether sea embedded shell braid rest qualification**

- Fixed effort: The same one-band shell branch as `SH-0`, embedded in a surrounding Noether sea of like assemblies.
- Group velocity: $\mathbf V_{\mathrm{grp}} = \mathbf 0$ for the target branch and local sea frame unless a packet declares otherwise.
- Support / shell count: One target support band or common shell; the surrounding Noether sea does not add shells to the target branch.
- Angular-momentum frame: Not assigned by shell support.
- Axis setting: Inherited from the target `SH-0` fixture when the embedded test carries it forward.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: Target branch energy/action rows plus the local Noether sea population-response row must close on the same record.
- Noether sea environment: Embedded among like assemblies.
- Lorentz deformation: Not tested.
- Success condition: Retain the shell support rows and the Noether sea response row on the same branch record, showing that the embedded environment supplies stability missing from the isolated `SH-0` round without changing the base shell classification.
- Relationship to `SH-0`: Environment-qualified continuation after isolated `SH-0` did not supply a retained row; not a new support family and not a certification claim.
- Evidence cleanup decision: This is a first-packet construction target, not cleanup of an old embedded proof packet. The embedded round should reuse the target `SH-0` branch identity and then add the like-assembly population, boundary-condition, and sea-response rows needed to test whether the surrounding Noether sea supplies the missing stability.

**`SH-L` -- Moving shell braid continuation**

- Fixed effort: Moving continuation of a retained one-band shell, whether retained through `SH-0` or `SH-0-sea`.
- Group velocity: $\|\mathbf V_{\mathrm{grp}}\| > 0$.
- Support / shell count: One support band under transport.
- Angular-momentum frame: Optional; must be stated if used.
- Axis setting: Optional.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving shell energy/action export required.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Required for certification in the moving regime.
- Success condition: Prove the shell survives transport and exports Lorentz-compatible clock/ruler rows.

## Nested Shell Braid Proof IDs

**`NSH-0` -- Nested shell braid rest qualification**

- Fixed effort: Three ordered support bands in a rest branch.
- Group velocity: $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: Three support bands.
- Angular-momentum frame: Must be solved; rank-three or lower-rank is not assumed.
- Axis setting: Optional axis-neutral or axis-polarized placement.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: Energy/action rows $E_I,E_M,E_O$ or unordered $E_a$ must close if claimed.
- Noether sea environment: Not assigned by the base ID.
- Lorentz deformation: Not tested in the rest qualification.
- Success condition: Retain the nested support, role map, causal-root, energy, frame, and stability rows. An idealized rest proof fixture belongs here only when its declared assumptions include nested support.

**`NSH-L` -- Moving nested shell braid continuation**

- Fixed effort: Moving continuation of a retained nested shell branch.
- Group velocity: $\|\mathbf V_{\mathrm{grp}}\| > 0$.
- Support / shell count: Three transported support bands.
- Angular-momentum frame: Inherited from `NSH-0` or solved during continuation.
- Axis setting: Inherited if claimed.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving nested-shell energy/action export required.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Required.
- Success condition: Recover $\xi\to1/\gamma$, $d\tau/dt_{\mathrm{eff}}\to1/\gamma$, and bounded preferred-frame leakage from the same branch record.

**`NSH-AX` -- Nested shell braid axis-population comparison**

- Fixed effort: Axis-population comparison.
- Group velocity: Start at $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Compare axis-neutral `-+`, `-+`, `-+` with axis-polarized `--`, `-+`, `++`.
- Frequency ratio: Not fixed.
- Hinge value: Not fixed.
- Energy-level relation: Not fixed by axis population.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Decide whether either or both axis settings survive the same-record branch tests.

**`NSH-ISO` -- Nested shell braid iso-frequency family**

- Fixed effort: Common return-rate family.
- Group velocity: Start at $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Optional.
- Frequency ratio: `1:1:1`.
- Hinge value: Not fixed.
- Energy-level relation: Equal frequency does not imply equal energy.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Test phase, root, support, frame, energy, and stability rows for the iso-frequency family.

**`NSH-321` -- Nested shell braid integer-ratio family**

- Fixed effort: Non-doubling integer frequency family.
- Group velocity: Start at $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Optional.
- Frequency ratio: Example `3:2:1`.
- Hinge value: Not fixed.
- Energy-level relation: Integer frequency does not imply integer energy.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Compare against iso-frequency and doubling-frequency families without assuming repeated doubling.

**`NSH-421` -- Nested shell braid doubling-frequency lock**

- Fixed effort: Doubling-frequency lock in role-assigned order.
- Group velocity: Start at $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Optional.
- Frequency ratio: `4:2:1` in `I:M:O` order.
- Hinge value: Not fixed unless paired with hinge rows.
- Energy-level relation: No automatic equality; solve $E_I:E_M:E_O$ from the branch ledger.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Close the integer phase-return map, role assignment, causal-root rows, frame rows, and stability rows.
- Evidence cleanup decision: Clean the candidate proof handles before treating this as branch evidence. Phase-bundle, caustic-score, Floquet, torque/wake, and rank-join diagnostics may identify useful row targets, but they cannot authorize retained-branch consumption until an accepted `branch_certificate_ref`, same retained active-row IDs, accepted branch chart, moving certificate, transition source, and action-increment row close on the same record.

**`NSH-HINGE` -- Nested shell braid field-speed hinge occupancy**

- Fixed effort: One or more rows operating near the field-speed hinge.
- Group velocity: Usually rest-branch carrier test first.
- Support / shell count: Usually three support bands.
- Angular-momentum frame: Must be solved separately.
- Axis setting: Optional.
- Frequency ratio: Inherited if claimed.
- Hinge value: No hinge row, single-hinge, or multi-hinge.
- Energy-level relation: Energy consequences must be solved on the same branch.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested by the hinge row itself.
- Success condition: Show which speed statistic is at $c_f$, which roots become accessible, and whether transversality survives.

**`NSH-TERM` -- Nested shell braid terminal hinge**

- Fixed effort: Terminal hinge / braid symmetry-breaking point.
- Group velocity: Usually terminal carrier regime, not observer transport by itself.
- Support / shell count: Usually three support bands approaching loss of volumetric slack.
- Angular-momentum frame: Lower-rank or degenerating frame expected at the boundary.
- Axis setting: Coplanarity and co-linearity tested together.
- Frequency ratio: Not fixed by the name.
- Hinge value: Terminal hinge.
- Energy-level relation: Equal radii, equal frequencies, and equal energies are not implied.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested by the terminal row itself.
- Success condition: Identify the boundary where precession, root-access, action, and stability closure fail or reorganize.

## Planar Lower-Rank Proof IDs

**`PL-NB-0` -- Planar lower-rank neutral braid rest comparison**

- Fixed effort: Rest-branch lower-rank comparison on the neutral-braid support base.
- Group velocity: $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: No shell support fixed.
- Angular-momentum frame: Lower-rank: $D_{\mathrm{plane}} = 0$ or no retained three-row frame.
- Axis setting: Optional.
- Frequency ratio: Optional.
- Hinge value: Optional.
- Energy-level relation: Energy rows may be diagnostic unless retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Decide whether lower-rank behavior belongs to a retained neutral branch or remains only a diagnostic toy.

**`PL-NB-L` -- Moving planar lower-rank neutral braid continuation**

- Fixed effort: Moving continuation of a retained lower-rank neutral branch.
- Group velocity: $\|\mathbf V_{\mathrm{grp}}\| > 0$.
- Support / shell count: Inherited from `PL-NB-0`.
- Angular-momentum frame: Lower-rank.
- Axis setting: Inherited if claimed.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving energy/action export required if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Conditional; required only if the lower-rank neutral branch is promoted toward certification.
- Success condition: Test whether a lower-rank neutral branch can export observer rows without masquerading as rank-three Lorentz closure.

**`PL-SH-0` -- Planar lower-rank shell braid rest comparison**

- Fixed effort: Rest-branch lower-rank comparison on one support band.
- Group velocity: $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: One support band.
- Angular-momentum frame: Lower-rank.
- Axis setting: Optional.
- Frequency ratio: Optional.
- Hinge value: Optional.
- Energy-level relation: Shell energy/action rows must close if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Decide whether shell support can retain without a rank-three frame.

**`PL-SH-L` -- Moving planar lower-rank shell braid continuation**

- Fixed effort: Moving continuation of a retained lower-rank shell branch.
- Group velocity: $\|\mathbf V_{\mathrm{grp}}\| > 0$.
- Support / shell count: Inherited from `PL-SH-0`.
- Angular-momentum frame: Lower-rank.
- Axis setting: Inherited if claimed.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving shell energy/action export required if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Conditional; required only if the lower-rank shell branch is promoted toward certification.
- Success condition: Test whether a lower-rank shell branch can export observer rows without masquerading as rank-three Lorentz closure.

**`PL-NSH-0` -- Planar lower-rank nested shell braid rest comparison**

- Fixed effort: Rest-branch lower-rank or terminal-boundary comparison on nested support.
- Group velocity: $\mathbf V_{\mathrm{grp}} = \mathbf 0$.
- Support / shell count: Three support bands or declared terminal nested support.
- Angular-momentum frame: Lower-rank or degenerating frame.
- Axis setting: Optional; coplanarity and co-linearity may be active near the terminal row.
- Frequency ratio: Optional.
- Hinge value: Optional or terminal hinge.
- Energy-level relation: Nested energy/action rows must close if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Not tested.
- Success condition: Decide whether lower-rank behavior is a retained nested branch, a terminal boundary of `NSH`, or only a planar reduced-chart diagnostic.

**`PL-NSH-L` -- Moving planar lower-rank nested shell braid continuation**

- Fixed effort: Moving continuation of a retained lower-rank nested shell branch.
- Group velocity: $\|\mathbf V_{\mathrm{grp}}\| > 0$.
- Support / shell count: Inherited from `PL-NSH-0`.
- Angular-momentum frame: Lower-rank or degenerating frame.
- Axis setting: Inherited if claimed.
- Frequency ratio: Inherited if claimed.
- Hinge value: Inherited if claimed.
- Energy-level relation: Moving nested-shell energy/action export required if retained.
- Noether sea environment: Inherited or declared by the packet.
- Lorentz deformation: Conditional; required only if the lower-rank nested shell branch is promoted toward certification.
- Success condition: Test whether a lower-rank nested shell branch can export observer rows without masquerading as rank-three Lorentz closure.
