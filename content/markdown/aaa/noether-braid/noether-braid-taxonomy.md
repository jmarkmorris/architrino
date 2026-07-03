# Noether Braid Taxonomy

This chapter is the front door for classifying Noether braid configurations. It names the independent axes used to describe a candidate branch before a solver or proof program decides whether that branch is retained. The taxonomy is therefore a configuration language, not a classification theorem.

A Noether braid taxonomy record can be written schematically as

$$
\mathsf{Tax}_{\mathfrak B}
=
\left(
\mathsf{Inventory},
\mathsf{Support},
\mathsf{Rows}_{3B},
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
| Rank-three branch record | Whether three angular-momentum rows are retained | rank-three Noether braid chart, planar lower-rank chart |
| Polarity support | How `+++` and `---` populate opposite axial pairs | axis-neutral, axis-polarized |
| Angular-momentum handedness | Orientation of the ordered rank-three frame | positive-handed, negative-handed |
| Speed regime | Relation of layer speed rows to $c_f$ | sub-field, field-speed, super-field, mixed |
| Field-speed hinge occupancy | Which rows operate within a declared $c_f$ tolerance and how that affects root access | no hinge row, single-hinge, multi-hinge, terminal hinge |
| Frequency-ratio family | Return or winding-frequency relation | iso-frequency `1:1:1`, integer-ratio `3:2:1`, doubling-frequency `4:2:1` |
| Certificate status | Evidential status of a branch claim | toy diagnostic, candidate braid, retained branch, certified braid |

The axes are intentionally independent. A nested shell braid may be studied with or without an exact rank-three chart. A doubling-frequency family may be studied on an axis-neutral or axis-polarized polarity support. A row with field-speed hinge occupancy may or may not belong to an iso-frequency or integer-ratio family. A positive-handed angular-momentum frame may be a candidate diagnostic without yet being a retained branch certificate.

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

Support geometry should not be confused with binary grouping. A branch may have shell support before it proves three persistent binary rows. Conversely, a rank-three chart may be used as a reduced diagnostic without proving that the full six-body support is a retained nested shell braid.

## Rank-Three Branch Record

The rank-three branch record asks whether the retained branch emits three angular-momentum rows. It is developed in [Noether Braid Configuration Space](noether-braid-configuration-space.md). The rows are ledger data extracted from the branch, not assumed circular orbits.

For a rank-three chart, the branch record includes three angular-momentum two-form classes

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

A planar lower-rank chart may still be dynamically meaningful, but it is not a promoted rank-three Noether braid chart until the three-row frame condition and its conditioning floor are supplied on the same retained record.

## Polarity Support

Polarity support records how the three positive-polarity and three negative-polarity architrinos populate opposite axial pairs in an axial comparison chart. Let an axial chart have three opposite coordinate pairs

$$
A_k=\{+\hat{\mathbf e}_k,-\hat{\mathbf e}_k\},
\qquad
k\in\{1,2,3\}.
$$

The two final polarity-support terms are:

| Term | Axial population pattern | Meaning |
| --- | --- | --- |
| axis-neutral | Each opposite axial pair contains one positive and one negative endpoint. | The schematic polarity row is `-+`, `-+`, `-+`, up to axis and endpoint relabeling. |
| axis-polarized | One opposite axial pair contains two positives, one contains two negatives, and one remains mixed. | The schematic polarity row is `--`, `-+`, `++`, up to axis and endpoint relabeling. |

These are support decorations, not force laws. They classify a polarity placement on a chosen axial comparison chart. They do not decide whether the underlying paths are axial, circular, or retained by the delayed dynamics.

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

All certified braids must reproduce Lorentz deformation of space and time at the observer-export layer. In the homogeneous moving-branch regime, the same retained record must export a ruler row whose longitudinal-to-transverse deformation approaches $\xi=R_{\parallel}/R_{\perp}\to1/\gamma$, a clock row whose extracted rate approaches $d\tau/dt\to1/\gamma$, and bounded preferred-frame leakage through the declared $\epsilon_{\text{LV}}$ or two-way anisotropy diagnostic. The Ideal Braid lesson is one app-facing demonstration of this obligation; it is not a special exception that carries the Lorentz burden alone.

The [Noether Braid Topological Charge](noether-braid-topological-charge.md) program adds topological labels only after the retained branch chart supplies the needed root-complex and phase-return data. A taxonomy value can point to where that proof should be attempted, but it cannot substitute for the proof.

## Reading The Explored Configurations

The explored Noether braid configurations should be read as combinations of the axes above:

| Configuration name | Primary axis content | Status discipline |
| --- | --- | --- |
| neutral braid | Base inventory only. | Broad class before shell support or binary rows are certified. |
| shell braid | Base inventory plus controlled radial support band. | Support geometry claim requiring radial rows. |
| nested shell braid | Shell support plus ordered radial support bands. | Support geometry used by nested-shell dynamics, not proof of exact binaries by itself. |
| rank-three Noether braid chart | Three retained angular-momentum rows and nondegenerate frame data. | Branch-record claim requiring $D_{\mathrm{plane}}$ and same-record ledger rows. |
| iso-frequency braid | Frequency-ratio family with common return rate. | Candidate family until distinct energy, speed, phase, support, and ledger rows close. |
| doubling-frequency `4:2:1` lock | Frequency-ratio family plus phase-return target. | Candidate family until the integer phase-return map and stability rows close. |
| field-speed hinge occupancy | Speed-regime axis declaring one or more rows near $c_f$. | Candidate regime until the component speed, root-access, and transversality rows close. |
| axis-neutral support | Mixed polarity on every opposite axial pair. | Polarity-support decoration in an axial comparison chart. |
| axis-polarized support | One positive pair, one negative pair, and one mixed pair. | Polarity-support decoration in an axial comparison chart. |
| positive-handed or negative-handed frame | Sign of the ordered rank-three angular-momentum frame. | Assigned only when the branch supplies a nondegenerate three-row frame. |

This taxonomy is designed to keep the architecture extensible without turning every variation into a retained branch. A configuration becomes physically important only when its taxonomy record is joined to a retained branch certificate, a certified-braid theorem target, or a clearly marked lower-status search family.

## Coverage Decoder Table

This decoder table lists the main braid variations currently used or previously examined. `Unknown` means the row must be supplied by a retained branch record before the label can be promoted.

| Name / label | What the label decodes | Radii / velocity information? | Frequency-ratio value | Shell count | Axis situation | Hinge value | Energy-level relation | Status | Notes / missing rows |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| neutral braid | Base six-body polarity-neutral Noether braid inventory. | Not fixed by the label. | Not fixed. | Unknown or undeclared. | No rank-three frame implied. | Not fixed. | One branch energy ledger required, but no layer relation implied. | Broad candidate class. | Needs support, causal-root, wake, action, stability, and observer-export rows for promotion. |
| shell braid | Neutral braid with controlled radial support band. | Radial support bounds required; speeds remain branch rows. | Not fixed. | One support band. | No rank-three frame implied. | Not fixed. | Not fixed by support label. | Support candidate or retained support class. | Needs radial-control rows and same-record retention. |
| nested shell braid | Shell braid with ordered radial support bands. | Distinct support radii or bands required; speed rows solved per band. | Not fixed by nesting. | Three support bands. | Rank-three frame optional until supplied. | Not fixed. | Not automatically equal or ordered; energy/action rows must solve it. | Explored fermion-scaffold candidate. | Needs role map, support gluing, causal-root, energy, and stability closure. |
| rank-three Noether braid chart | Three retained angular-momentum rows with nondegenerate frame data. | Each row carries $r_a$ and speed statistic $s_a$; circular charts may use $s_a=2\pi f_a r_a$. | Not fixed. | Independent of shell count. | Three nondegenerate plane normals with $D_{\mathrm{plane}}\ne0$. | Not fixed. | Three energy rows $E_a$ required. | Branch-record theorem target. | Needs same-record frame, momentum, phase, root, energy, and stability rows. |
| planar lower-rank chart | Reduced coplanar or nearly coplanar diagnostic. | Row radii and speeds may be supplied by the reduced chart. | Not fixed. | Usually comparison support, not shell count. | $D_{\mathrm{plane}}=0$ or below rank-three floor. | Not fixed. | Energy rows may be diagnostic only. | Lower-rank candidate or toy diagnostic. | Must not be counted as a promoted rank-three branch. |
| axis-neutral support | Polarity support with one positive and one negative endpoint on every opposite axial pair. | Axial placement only; no speed or radius law. | Not fixed. | Independent of shell count. | `-+`, `-+`, `-+` on the axial comparison chart. | Not fixed. | Not fixed. | Polarity-support decoration. | Needs branch retention before it becomes physical architecture. |
| axis-polarized support | Polarity support with one positive pair, one negative pair, and one mixed pair. | Axial placement only; no speed or radius law. | Not fixed. | Independent of shell count. | `--`, `-+`, `++` on the axial comparison chart. | Not fixed. | Not fixed. | Polarity-support decoration. | Tests the second topological population class on the axial chart. |
| positive-handed frame | Ordered rank-three angular-momentum frame with positive determinant. | Requires retained plane normals; no radius or speed law by itself. | Not fixed. | Independent of shell count. | $D_{\mathrm{plane}}>0$. | Not fixed. | Not fixed. | Orientation row after frame retention. | Requires ordering convention and same-record frame data. |
| negative-handed frame | Ordered rank-three angular-momentum frame with negative determinant. | Requires retained plane normals; no radius or speed law by itself. | Not fixed. | Independent of shell count. | $D_{\mathrm{plane}}<0$. | Not fixed. | Not fixed. | Orientation row after frame retention. | Chirality must be separated from polarity support. |
| iso-frequency braid | Frequency family with common return rate. | Radii and speeds remain solved rows; circular charts still require $s_a=2\pi f r_a$. | `1:1:1`. | Independent of shell count. | Axis-neutral, axis-polarized, or other support possible. | Not fixed. | Equal frequency does not imply equal energy. | Candidate frequency family. | Needs phase, support, energy, causal-root, and stability rows. |
| integer-ratio braid | Frequency family with integer but non-doubling return rates. | Radii and speeds solved from the retained carrier chart. | Example `3:2:1`. | Independent of shell count. | Any retained axis support may be tested. | Not fixed. | Integer frequency does not imply integer energy. | Candidate frequency family. | Useful comparison family between iso-frequency and doubling-frequency locks. |
| doubling-frequency lock | Nested role-assigned frequency family. | Requires role map; radii and speeds must satisfy carrier and energy rows. | `4:2:1` in `I:M:O` order. | Often studied with three nested bands. | Axis support not fixed by the frequency label. | Not fixed unless combined with field-speed rows. | No automatic equality; solve $E_I:E_M:E_O$ from action and wake ledgers. | Candidate lock family. | Needs integer phase-return map, role assignment, causal-root, and stability rows. |
| field-speed hinge occupancy | Speed-regime row declaring one or more rows near $c_f$. | Yes: declares which transverse, orbital, or other speed statistic lies within the $c_f$ tolerance. | Not a frequency label. | Independent of shell count. | Any retained axis support may be tested. | no hinge row, single-hinge, multi-hinge, or terminal hinge. | Energy consequences must be solved from the same branch. | Candidate speed regime. | A hinge row is not automatically a self-hit row. |
| braid symmetry-breaking point | Terminal-alignment threshold for a nested shell braid. | Yes: shorthand sector has $s_M=c_f$, $s_O\to c_f$, and $s_I>c_f$. | Not fixed by the name. | Usually nested three-band support. | Coplanarity, co-linearity, and loss of volumetric slack are tested together. | terminal hinge. | Equal radii, equal frequencies, or equal energies are not implied. | Terminal theorem target. | Needs precession, root-access, action, and stability closure. |
| oblate envelope | Flattened branch envelope relative to spherical support. | Requires $R_{\parallel}$ and $R_{\perp}$; moving branches test $\xi=R_{\parallel}/R_{\perp}$. | Not fixed. | Support envelope, not shell count. | Drift axis supplied by momentum or response-center row. | Not fixed. | Energy row separate from geometric ratio. | Support variation and Lorentz-closure target. | The Lorentz content is the closure law, not the surface name. |
| ideal braid | App-facing idealized Lorentz lesson for a Noether braid oblate envelope. | Yes: displays $\beta$, $\gamma$, $\xi$, clock/ruler deformation, and normalized energy readouts. | Usually not the primary row. | App display envelope, not a shell-count theorem. | Drift axis and oblate support are emphasized. | Not fixed unless paired with hinge controls. | Normalized lesson energy, not a certified branch energy ledger. | Demonstration and theorem-target surface. | Keeps the name for now; it does not alone certify a physical braid. |
| candidate braid | Proposed branch or family before all certificate rows close. | Whatever the proposal declares; missing rows remain explicit. | Whatever the proposal declares. | Whatever the proposal declares. | Whatever the proposal declares. | Whatever the proposal declares. | Whatever the proposal declares. | Candidate status. | The default status for taxonomy combinations before retention. |
| certified braid | Retained branch promoted through return-map, stability, alignment, and observer-export closure. | Must include branch transport and moving-export rows. | Must be part of the retained record if frequency is claimed. | Must be part of the retained record if support is claimed. | Declared symmetries, frame rows, and topological rows must close where claimed. | Must close if hinge occupancy is claimed. | Must close energy/action rows on the same record. | Certified theorem target. | Must reproduce Lorentz clock/ruler deformation and bounded preferred-frame leakage. |
