# Noether Braid Taxonomy

This chapter is the front door for classifying Noether braid configurations. It names the independent axes used to describe a candidate branch before a solver or proof program decides whether that branch is retained. The taxonomy is therefore a configuration language, not a classification theorem.

A Noether braid taxonomy record can be written schematically as

$$
\mathsf{Tax}_{\mathfrak B}
=
\left(
\mathsf{Inventory},
\mathsf{Support},
\mathsf{AngularMomentumFrame},
\mathsf{Polarity},
\mathsf{Handedness},
\mathsf{Speed},
\mathsf{Hinge},
\mathsf{Frequency},
\mathsf{Certificate}
\right).
$$

Each entry records a different kind of structure. Mixing the entries creates a candidate configuration; it does not by itself prove that the delayed dynamics admit a stable branch. Retention still belongs to the branch ledger, causal-root rows, action and energy rows, gluing status, and stability margin described in the surrounding Noether braid chapters.

## Local Terms

This chapter uses four evidence-level terms in a controlled way:

| Term | Meaning in this chapter | What it does not claim by itself |
| --- | --- | --- |
| branch | A candidate whole six-architrino Noether braid history over a declared finite memory window. The branch is the object whose inventory, paths, causal roots, wakes, energy/action rows, angular-momentum rows, phases, support data, response-center data, and Noether sea row are tested together. | A branch is not a single path, a single binary row, or a visual braid drawing. It is also not automatically stable or physical. |
| retained | Evidential status for a branch, row, or chart whose required data close on the same record under the declared tolerance, event/domain convention, and stability conditions. | `Retained` does not mean assumed, preferred, or merely still under discussion. If the same-record ledgers are missing, the object remains a candidate. |
| support | The geometric region, band, envelope, or comparison chart occupied by the branch data. Shell support, nested shell support, oblate support, and axial comparison support are different ways to describe where the six paths or their derived ledgers live. | Support is not a force law and not proof of retention. A support label says how the candidate is represented geometrically, not that the delayed dynamics preserve it. |
| record | The finite ledger attached to one branch over the declared memory window. It includes only data that can still affect the next delayed update or certificate: inventory, path history, causal-root rows, wake rows, energy/action rows, momentum and angular-momentum rows, phase and plane-orientation rows, support claims, response-center and group-velocity rows, and the local Noether sea row. | A record is not a narrative summary or a loose collection of diagnostics. A proof claim must say which rows close on the same record. |

## Taxonomy Axes

| Axis | Reader-facing purpose | Example values |
| --- | --- | --- |
| Base inventory | Six-body polarity-neutral branch structure | neutral braid |
| Support geometry | How the six paths occupy branch support | shell braid, nested shell braid, oblate envelope |
| Angular-momentum frame | Whether three angular-momentum rows are retained | rank-three frame, planar lower-rank braid (`PL`) |
| Polarity placement | How `+++` and `---` populate opposite axial pairs | axis-neutral, axis-polarized |
| Angular-momentum handedness | Orientation of the ordered rank-three frame | positive-handed, negative-handed |
| Speed regime | Relation of layer speed rows to $c_f$ | sub-field, field-speed, super-field, mixed |
| Field-speed hinge occupancy | Which rows operate within a declared $c_f$ tolerance and how that affects root access | no hinge row, single-hinge, multi-hinge, terminal hinge |
| Frequency-ratio family | Return or winding-frequency relation | iso-frequency `1:1:1`, integer-ratio `3:2:1`, doubling-frequency `4:2:1` |
| Certificate status | Evidential status of a branch claim | toy diagnostic, candidate braid, retained branch, certified braid |

The axes are intentionally independent. A nested shell braid may be studied with or without an exact rank-three frame. A doubling-frequency family may be studied on an axis-neutral or axis-polarized polarity placement. A row with field-speed hinge occupancy may or may not belong to an iso-frequency or integer-ratio family. A positive-handed angular-momentum frame may be a candidate diagnostic without yet being a retained branch certificate.

## Base Inventory

The base inventory is the neutral six-architrino case described in [Noether Braid](noether-braid.md). It contains three positive-polarity architrinos and three negative-polarity architrinos:

$$
\#\{i:\sigma_i=+1\}
=
\#\{i:\sigma_i=-1\}
=3,
\qquad
\sum_i \sigma_i=0.
$$

This inventory says only that the candidate has the required polarity count and a shared causal-return ledger. It does not assume exact binary pairs, shell support, an orthogonal angular-momentum frame, or a protected topological class.

## Support Geometry

Support geometry records how the six paths occupy their branch support.

| Support value | Meaning | Claim level |
| --- | --- | --- |
| neutral braid | Six-body polarity-neutral candidate before a radial support structure is certified. | Base configuration class. |
| shell braid | Neutral braid whose six paths remain in a controlled radial support band. | Support class requiring radial control rows. |
| nested shell braid | Shell braid with three ordered radial support bands. | Support class used by [Nested Shell Braid Geometry](nested-shell-braid-geometry.md) and [Nested Shell Braid Dynamics](nested-shell-braid-dynamics.md). |
| oblate envelope | Candidate support whose retained path envelope is flattened relative to a spherical shell. | Explored support variation, not a retained class by name alone. |

Support geometry should not be confused with binary grouping. A branch may have shell support before it proves three persistent binary rows. Conversely, a rank-three frame may be used as a reduced diagnostic without proving that the full six-body support is a retained nested shell braid.

## Angular-Momentum Frame

The angular-momentum-frame axis asks whether the retained branch emits enough angular-momentum rows to define a volumetric internal frame. The rows are ledger data extracted from the branch, not assumed circular orbits. The three-row or rank-three sublocus is developed in [Noether Braid Configuration Space](noether-braid-configuration-space.md), but it remains a sublocus of the broader Noether braid taxonomy rather than the definition of every Noether braid.

| Frame value | Meaning | What it does not prove |
| --- | --- | --- |
| not assigned | The branch has not yet supplied retained angular-momentum rows. | It does not reject the branch; it only leaves the frame axis open. |
| rank-three frame | The branch supplies three retained angular-momentum rows with nonzero frame determinant. | It does not by itself prove shell support, frequency lock, polarity placement, or certification. |
| planar lower-rank braid (`PL`) | The branch is lower-rank on this axis because $D_{\mathrm{plane}}=0$ or because no retained three-row frame exists. | It is not automatically the planar reduced chart and not automatically a terminal nested-shell boundary. |

For a rank-three frame, the branch record includes three angular-momentum two-form classes

$$
[\omega_J^{(a)}],
\qquad
a\in\{1,2,3\},
$$

with derived plane normals $\hat{\mathbf n}_a$ when the Hodge-dual direction is nonzero. The frame is volumetric only when

$$
D_{\mathrm{plane}}
=
\det
\begin{bmatrix}
\hat{\mathbf n}_1 & \hat{\mathbf n}_2 & \hat{\mathbf n}_3
\end{bmatrix}
\ne 0.
$$

A planar lower-rank braid (`PL`) may still be dynamically meaningful, but it is not a promoted rank-three Noether braid branch until the three-row frame condition and its conditioning floor are supplied on the same retained record.

The planar reduced chart is different. A reduced planar chart is a proof or simulation representation that places branch data into a common plane or near-plane so a restricted calculation can be performed. Such a chart may represent a `PL` candidate, the terminal boundary of a nested shell braid, or the photon-channel bridge described by the coaxial contra-rotating pro/anti planar pair. It should therefore be named as a chart, not used as a base-family name.

## Polarity Placement

Polarity placement records how the three positive-polarity and three negative-polarity architrinos populate opposite axial pairs in an axial comparison chart. Let an axial chart have three opposite coordinate pairs

$$
A_k=\{+\hat{\mathbf e}_k,-\hat{\mathbf e}_k\},
\qquad
k\in\{1,2,3\}.
$$

The two final polarity-placement terms are:

| Term | Axial population pattern | Meaning |
| --- | --- | --- |
| axis-neutral | Each opposite axial pair contains one positive and one negative endpoint. | The schematic polarity row is `-+`, `-+`, `-+`, up to axis and endpoint relabeling. |
| axis-polarized | One opposite axial pair contains two positives, one contains two negatives, and one remains mixed. | The schematic polarity row is `--`, `-+`, `++`, up to axis and endpoint relabeling. |

These are polarity placements, not force laws. They classify a polarity placement on a chosen axial comparison chart. They do not decide whether the underlying paths are axial, circular, or retained by the delayed dynamics.

## Angular-Momentum Handedness

Angular-momentum handedness records the orientation of the ordered rank-three frame when the frame exists. If the retained branch supplies ordered plane normals $\hat{\mathbf n}_1,\hat{\mathbf n}_2,\hat{\mathbf n}_3$, then the sign of $D_{\mathrm{plane}}$ gives the handedness of that ordered frame:

$$
\operatorname{sgn}(D_{\mathrm{plane}})
=
\begin{cases}
+1, & \text{positive-handed},\\
-1, & \text{negative-handed}.
\end{cases}
$$

When $D_{\mathrm{plane}}=0$ or the branch has no retained three-row frame, handedness is not assigned as a rank-three property. It may still have planar chirality, circulation signs, or other lower-rank orientation diagnostics, but those are separate rows.

## Speed, Hinge, And Frequency Families

The speed regime records how retained speed rows relate to the field speed $c_f$. Sub-field rows satisfy speeds below the local field-speed hinge; field-speed rows sit at the transition scale; super-field rows enter regimes where delayed self-interaction can become available. In nested `I:M:O` notation, these rows are assigned only after the retained branch supplies the role map.

Field-speed hinge occupancy is a separate axis. It asks which row, if any, operates within a declared tolerance of $c_f$, and it must say which speed statistic is being tested: transverse carrier speed, orbital/circulation speed, or another branch-declared component. A hinge row is not automatically a self-hit row. It is the speed-regime condition at which the branch can transition from target-hit-only access toward target plus self-hit access, provided the same-source causal-root ledger and transversality rows also close.

| Hinge value | Meaning |
| --- | --- |
| no hinge row | No retained row is declared within the $c_f$ hinge tolerance. |
| single-hinge | One row is organized around the field-speed hinge. |
| multi-hinge | More than one row is organized around the field-speed hinge. |
| terminal hinge | The branch approaches a terminal-alignment regime, such as the braid symmetry-breaking point, where hinge occupancy and loss of volumetric slack must be tested together. |

The frequency-ratio family records return or winding-frequency relations. The main examples are:

| Frequency-ratio value | Meaning |
| --- | --- |
| iso-frequency `1:1:1` | Candidate family with common return rate across the three retained rows. |
| integer-ratio `3:2:1` | Candidate family with integer return rates but no repeated-doubling assumption. |
| doubling-frequency `4:2:1` | Candidate nested `I:M:O` family in which each inward row doubles the next outer row, studied in [Noether Braid Doubling-Frequency Resonance Lock](noether-braid-doubling-frequency-resonance-lock.md). |

Frequency-ratio labels are candidate-family labels until the phase-return degree, causal-root ledger, finite-memory gluing, and stability rows close on the same branch. Hinge labels require their own speed and causal-root rows; they are not frequency-ratio names.

## Certificate Status

Certificate status prevents taxonomy names from being mistaken for results.

| Status | Meaning |
| --- | --- |
| toy diagnostic | A simplified computation or visualization that tests a limited obstruction or analogy. |
| candidate braid | A proposed branch family or configuration class whose required ledger rows are not all certified. |
| retained branch | A branch whose inventory, causal-root, wake-tail, dynamics, action, event, stability, and convergence rows close on one retained record. |
| certified braid | A retained branch record that returns under the delayed return map up to declared neutral symmetries, preserves the required non-symmetry stability margins, and satisfies the observer-export rows required of a physical branch. |

All certified braids must reproduce Lorentz-compatible clock and ruler deformation at the observer-export layer when they are tested in a homogeneous moving-branch regime. The same retained record must then export a ruler row whose longitudinal-to-transverse deformation approaches $\xi=R_{\parallel}/R_{\perp}\to1/\gamma$, a clock row whose extracted rate approaches $d\tau/dt\to1/\gamma$, and bounded preferred-frame leakage through the declared $\epsilon_{\text{LV}}$ or two-way anisotropy diagnostic.

The ideal braid is a proof-fixture label, not a base family. In this chapter it means a highly symmetric rest-branch qualification fixture with $\mathbf{V}_{\mathrm{grp}}=0$ and declared support, frame, frequency, axis, and hinge assumptions. Because the fixture has group velocity $0$, no moving-envelope deformation is present there. Lorentz deformation is a separate moving-export certification obligation, not a burden carried only by that test object.

The [Noether Braid Topological Charge](noether-braid-topological-charge.md) program adds topological labels only after the retained branch chart supplies the needed root-complex and phase-return data. A taxonomy value can point to where that proof should be attempted, but it cannot substitute for the proof.

## Reading The Explored Configurations

The explored Noether braid configurations should be read as combinations of the axes above:

| Configuration name | Primary axis content | Status discipline |
| --- | --- | --- |
| neutral braid | Base inventory only. | Broad class before shell support or binary rows are certified. |
| shell braid | Base inventory plus controlled radial support band. | Support geometry claim requiring radial rows. |
| nested shell braid | Shell support plus ordered radial support bands. | Support geometry used by nested-shell dynamics, not proof of exact binaries by itself. |
| iso-frequency braid | Frequency-ratio family with common return rate. | Candidate family until distinct energy, speed, phase, support, and ledger rows close. |
| doubling-frequency `4:2:1` lock | Frequency-ratio family plus phase-return target. | Candidate family until the integer phase-return map and stability rows close. |
| field-speed hinge occupancy | Speed-regime axis declaring one or more rows near $c_f$. | Candidate regime until the component speed, root-access, and transversality rows close. |
| axis-neutral placement | Mixed polarity on every opposite axial pair. | Polarity-placement decoration in an axial comparison chart. |
| axis-polarized placement | One positive pair, one negative pair, and one mixed pair. | Polarity-placement decoration in an axial comparison chart. |
| positive-handed or negative-handed frame | Sign of the ordered rank-three angular-momentum frame. | Assigned only when the branch supplies a nondegenerate three-row frame. |
| planar lower-rank braid (`PL`) | Lower-rank angular-momentum frame with $D_{\mathrm{plane}}=0$ or no retained three-row frame. | Boundary or comparison family until the same-record ledgers decide whether it is retained, a degeneration of another family, or only a diagnostic toy. |
| planar reduced chart | Proof or simulation representation in a common plane or near-plane. | Chart label only; it may represent `PL`, a terminal nested-shell boundary, or a photon-channel bridge. |
| ideal braid | Rest-branch proof fixture with declared idealizing assumptions. | Fixture label only; not a base braid family and not the sole carrier of Lorentz-export obligations. |

This taxonomy is designed to keep the architecture extensible without turning every variation into a retained branch. A configuration becomes physically important only when its taxonomy record is joined to a retained branch certificate, a certified-braid theorem target, or a clearly marked lower-status search family.

## Proof Map Table

This table is a proof map, not only a taxonomy decoder. A proof ID names a specific effort and does not assert success. The base and frame-modifier codes are:

| Code | Base family or modifier | Meaning |
| --- | --- | --- |
| `NB` | neutral braid | Broad six-worldline $3:3$ polarity-neutral candidate before shell support is certified. |
| `SH` | shell braid | Neutral braid with one controlled radial support band. |
| `NSH` | nested shell braid | Shell braid with three ordered support bands. This is separate from plain shell work. |
| `PL` | planar lower-rank modifier | Lower-rank angular-momentum-frame modifier: the branch has $D_{\mathrm{plane}}=0$ or no retained three-row frame. It must be paired with a support base such as `NB`, `SH`, or `NSH` before it is used as a proof ID. |

The suffix names the proof regime or variation:

| Suffix | Meaning |
| --- | --- |
| `0` | Rest-branch qualification with $\mathbf{V}_{\mathrm{grp}}=0$. |
| `L` | Moving-branch continuation with $\mathbf{V}_{\mathrm{grp}}>0$ and Lorentz clock/ruler export. |
| `AX` | Axis-population comparison across axis-neutral and axis-polarized placements. |
| `ISO` | Iso-frequency family, `1:1:1`. |
| `321` | Integer-ratio family, example `3:2:1`. |
| `421` | Doubling-frequency lock, `4:2:1` in role-assigned `I:M:O` order. |
| `HINGE` | Field-speed hinge occupancy. |
| `TERM` | Terminal hinge / braid symmetry-breaking point. |

| Proof ID | Base configuration | What is fixed by this effort | Group velocity | Support / shell count | Angular-momentum frame | Axis setting | Frequency ratio | Hinge value | Energy-level relation | Lorentz deformation | Proof stage / success condition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `NB-0` | neutral braid | Six-worldline $3:3$ inventory and one shared causal-return record. | $\mathbf{V}_{\mathrm{grp}}=0$ | No shell support fixed. | Not assigned. | Not assigned. | Not fixed. | Not fixed. | One branch energy ledger required. | Not tested. | Retain the broad neutral branch record before any support reduction. |
| `NB-L` | neutral braid | Moving continuation of a retained neutral branch. | $\mathbf{V}_{\mathrm{grp}}>0$ | Inherited from `NB-0`, if any. | Inherited or still unassigned. | Not assigned unless added. | Inherited if claimed. | Inherited if claimed. | Moving energy/action export required. | Required if the neutral branch is promoted toward certification. | Show moving continuation, clock/ruler export, and bounded preferred-frame leakage. |
| `SH-0` | shell braid | One controlled radial support band around a branch center. | $\mathbf{V}_{\mathrm{grp}}=0$ | One support band. | Not assigned by shell support. | Not assigned unless an axial chart is added. | Not fixed. | Not fixed. | Shell support does not fix energy levels. | Not tested. | Retain the shell support rows on the same branch record. |
| `SH-L` | shell braid | Moving continuation of a retained one-band shell. | $\mathbf{V}_{\mathrm{grp}}>0$ | One support band under transport. | Optional; must be stated if used. | Optional. | Inherited if claimed. | Inherited if claimed. | Moving shell energy/action export required. | Required for certification in the moving regime. | Prove the shell survives transport and exports Lorentz-compatible clock/ruler rows. |
| `NSH-0` | nested shell braid | Three ordered support bands in a rest branch. | $\mathbf{V}_{\mathrm{grp}}=0$ | Three support bands. | Must be solved: rank-three or lower-rank is not assumed. | Optional axis-neutral or axis-polarized placement. | Not fixed. | Not fixed. | Energy/action rows $E_I,E_M,E_O$ or unordered $E_a$ must close if claimed. | Not tested in the rest qualification. | Retain the nested support, role map, causal-root, energy, frame, and stability rows. An ideal braid rest fixture belongs here only when its declared fixture assumptions include nested support. |
| `NSH-L` | nested shell braid | Moving continuation of a retained nested shell branch. | $\mathbf{V}_{\mathrm{grp}}>0$ | Three transported support bands. | Inherited from `NSH-0` or solved during continuation. | Inherited if claimed. | Inherited if claimed. | Inherited if claimed. | Moving nested-shell energy/action export required. | Required. | Recover $\xi\to1/\gamma$, $d\tau/dt\to1/\gamma$, and bounded preferred-frame leakage from the same branch record. |
| `NSH-AX` | nested shell braid | Axis-population comparison. | Start at $\mathbf{V}_{\mathrm{grp}}=0$. | Usually three support bands. | Must be solved separately. | Compare axis-neutral `-+`, `-+`, `-+` with axis-polarized `--`, `-+`, `++`. | Not fixed. | Not fixed. | Not fixed by axis population. | Not tested. | Decide whether either or both axis settings survive the same-record branch tests. |
| `NSH-ISO` | nested shell braid | Common return-rate family. | Start at $\mathbf{V}_{\mathrm{grp}}=0$. | Usually three support bands. | Must be solved separately. | Optional. | `1:1:1`. | Not fixed. | Equal frequency does not imply equal energy. | Not tested. | Test phase, root, support, frame, energy, and stability rows for the iso-frequency family. |
| `NSH-321` | nested shell braid | Non-doubling integer frequency family. | Start at $\mathbf{V}_{\mathrm{grp}}=0$. | Usually three support bands. | Must be solved separately. | Optional. | Example `3:2:1`. | Not fixed. | Integer frequency does not imply integer energy. | Not tested. | Compare against iso-frequency and doubling-frequency families without assuming repeated doubling. |
| `NSH-421` | nested shell braid | Doubling-frequency lock in role-assigned order. | Start at $\mathbf{V}_{\mathrm{grp}}=0$. | Usually three support bands. | Must be solved separately. | Optional. | `4:2:1` in `I:M:O` order. | Not fixed unless paired with hinge rows. | No automatic equality; solve $E_I:E_M:E_O$ from the branch ledger. | Not tested. | Close the integer phase-return map, role assignment, causal-root rows, frame rows, and stability rows. |
| `NSH-HINGE` | nested shell braid | One or more rows operating near the field-speed hinge. | Usually rest-branch carrier test first. | Usually three support bands. | Must be solved separately. | Optional. | Inherited if claimed. | no hinge row, single-hinge, or multi-hinge. | Energy consequences must be solved on the same branch. | Not tested by the hinge row itself. | Show which speed statistic is at $c_f$, which roots become accessible, and whether transversality survives. |
| `NSH-TERM` | nested shell braid | Terminal hinge / braid symmetry-breaking point. | Usually terminal carrier regime, not observer transport by itself. | Usually three support bands approaching loss of volumetric slack. | Lower-rank or degenerating frame expected at the boundary. | Coplanarity and co-linearity tested together. | Not fixed by the name. | terminal hinge. | Equal radii, equal frequencies, and equal energies are not implied. | Not tested by the terminal row itself. | Identify the boundary where precession, root-access, action, and stability closure fail or reorganize. |
| `PL-NB-0` | planar lower-rank neutral braid | Rest-branch lower-rank comparison on the neutral-braid support base. | $\mathbf{V}_{\mathrm{grp}}=0$ | No shell support fixed. | Lower-rank: $D_{\mathrm{plane}}=0$ or no retained three-row frame. | Optional. | Optional. | Optional. | Energy rows may be diagnostic unless retained. | Not tested. | Decide whether lower-rank behavior belongs to a retained neutral branch or remains only a diagnostic toy. |
| `PL-NB-L` | planar lower-rank neutral braid | Moving continuation of a retained lower-rank neutral branch. | $\mathbf{V}_{\mathrm{grp}}>0$ | Inherited from `PL-NB-0`. | Lower-rank. | Inherited if claimed. | Inherited if claimed. | Inherited if claimed. | Moving energy/action export required if retained. | Conditional: required only if the lower-rank neutral branch is promoted toward certification. | Test whether a lower-rank neutral branch can export observer rows without masquerading as rank-three Lorentz closure. |
| `PL-SH-0` | planar lower-rank shell braid | Rest-branch lower-rank comparison on one support band. | $\mathbf{V}_{\mathrm{grp}}=0$ | One support band. | Lower-rank. | Optional. | Optional. | Optional. | Shell energy/action rows must close if retained. | Not tested. | Decide whether shell support can retain without a rank-three frame. |
| `PL-SH-L` | planar lower-rank shell braid | Moving continuation of a retained lower-rank shell branch. | $\mathbf{V}_{\mathrm{grp}}>0$ | Inherited from `PL-SH-0`. | Lower-rank. | Inherited if claimed. | Inherited if claimed. | Inherited if claimed. | Moving shell energy/action export required if retained. | Conditional: required only if the lower-rank shell branch is promoted toward certification. | Test whether a lower-rank shell branch can export observer rows without masquerading as rank-three Lorentz closure. |
| `PL-NSH-0` | planar lower-rank nested shell braid | Rest-branch lower-rank or terminal-boundary comparison on nested support. | $\mathbf{V}_{\mathrm{grp}}=0$ | Three support bands or declared terminal nested support. | Lower-rank or degenerating frame. | Optional; coplanarity and co-linearity may be active near the terminal row. | Optional. | Optional or terminal hinge. | Nested energy/action rows must close if retained. | Not tested. | Decide whether lower-rank behavior is a retained nested branch, a terminal boundary of `NSH`, or only a planar reduced-chart diagnostic. |
| `PL-NSH-L` | planar lower-rank nested shell braid | Moving continuation of a retained lower-rank nested shell branch. | $\mathbf{V}_{\mathrm{grp}}>0$ | Inherited from `PL-NSH-0`. | Lower-rank or degenerating frame. | Inherited if claimed. | Inherited if claimed. | Inherited if claimed. | Moving nested-shell energy/action export required if retained. | Conditional: required only if the lower-rank nested shell branch is promoted toward certification. | Test whether a lower-rank nested shell branch can export observer rows without masquerading as rank-three Lorentz closure. |
