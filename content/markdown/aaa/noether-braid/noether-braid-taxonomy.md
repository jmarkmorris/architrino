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
\mathsf{Frequency},
\mathsf{Certificate}
\right).
$$

Each entry records a different kind of structure. Mixing the entries creates a candidate configuration; it does not by itself prove that the delayed dynamics admit a stable branch. Retention still belongs to the branch ledger, causal-root rows, action and energy rows, gluing status, and stability margin described in the surrounding Noether braid chapters.

## Taxonomy Axes

| Axis | Reader-facing purpose | Example values |
| --- | --- | --- |
| Base inventory | Six-body polarity-neutral branch structure | neutral braid |
| Support geometry | How the six paths occupy branch support | shell braid, nested shell braid, oblate envelope |
| Three-binary branch record | Whether three angular-momentum rows are retained | rank-three Noether braid chart, planar lower-rank chart |
| Polarity support | How `+++` and `---` populate opposite axial pairs | axis-neutral, axis-polarized |
| Angular-momentum handedness | Orientation of the ordered three-binary frame | positive-handed, negative-handed |
| Speed hierarchy | Relation of layer speeds to $c_f$ | sub-field, hinge, self-hit, nested `I:M:O` |
| Frequency family | Return or winding-frequency relation | dyadic `4:2:1`, equal-frequency, offset-hinge |
| Certificate status | Evidential status of a branch claim | toy diagnostic, candidate, retained branch, eigen-braid candidate |

The axes are intentionally independent. A nested shell braid may be studied with or without an exact three-binary chart. A dyadic frequency family may be studied on an axis-neutral or axis-polarized polarity support. A positive-handed angular-momentum frame may be a candidate diagnostic without yet being a retained branch certificate.

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

Support geometry should not be confused with binary grouping. A branch may have shell support before it proves three persistent binary rows. Conversely, a three-binary chart may be used as a reduced diagnostic without proving that the full six-body support is a retained nested shell braid.

## Three-Binary Branch Record

The three-binary branch record asks whether the retained branch emits three angular-momentum rows. It is developed in [Noether Braid Configuration Space](noether-braid-configuration-space.md). The rows are ledger data extracted from the branch, not assumed circular orbits.

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

Angular-momentum handedness records the orientation of the ordered three-binary frame when the frame exists. If the retained branch supplies ordered plane normals $\hat{\mathbf n}_1,\hat{\mathbf n}_2,\hat{\mathbf n}_3$, then the sign of $D_{\mathrm{plane}}$ gives the handedness of that ordered frame:

$$
\operatorname{sgn}(D_{\mathrm{plane}})
=
\begin{cases}
+1, & \text{positive-handed},\\
-1, & \text{negative-handed}.
\end{cases}
$$

When $D_{\mathrm{plane}}=0$ or the branch has no retained three-row frame, handedness is not assigned as a rank-three property. It may still have planar chirality, circulation signs, or other lower-rank orientation diagnostics, but those are separate rows.

## Speed And Frequency Families

The speed hierarchy records how retained speed rows relate to the field speed $c_f$. Sub-field rows satisfy speeds below the local field-speed hinge; hinge rows sit at the transition scale; self-hit rows enter regimes where delayed self-interaction becomes available. In nested `I:M:O` notation, these rows are assigned only after the retained branch supplies the role map.

The frequency family records return or winding-frequency relations. The main examples are:

| Frequency value | Meaning |
| --- | --- |
| dyadic `4:2:1` | Candidate nested `I:M:O` family studied in [Noether Braid Dyadic Resonance Lock](noether-braid-dyadic-resonance-lock.md). |
| equal-frequency | Candidate family with common return rate across the three retained rows. |
| offset-hinge | Candidate family in which one layer is organized around the field-speed hinge while the other rows carry offset return data. |

Frequency labels are candidate-family labels until the phase-return degree, causal-root ledger, finite-memory gluing, and stability rows close on the same branch.

## Certificate Status

Certificate status prevents taxonomy names from being mistaken for results.

| Status | Meaning |
| --- | --- |
| toy diagnostic | A simplified computation or visualization that tests a limited obstruction or analogy. |
| candidate | A proposed branch family or configuration class whose required ledger rows are not all certified. |
| retained branch | A branch whose inventory, causal-root, wake-tail, dynamics, action, event, stability, and convergence rows close on one retained record. |
| eigen-braid candidate | A retained or near-retained branch record that returns under the delayed return map up to declared neutral symmetries. |

The [Noether Braid Topological Charge](noether-braid-topological-charge.md) program adds topological labels only after the retained branch chart supplies the needed root-complex and phase-return data. A taxonomy value can point to where that proof should be attempted, but it cannot substitute for the proof.

## Reading The Explored Configurations

The explored Noether braid configurations should be read as combinations of the axes above:

| Configuration name | Primary axis content | Status discipline |
| --- | --- | --- |
| neutral braid | Base inventory only. | Broad class before shell support or binary rows are certified. |
| shell braid | Base inventory plus controlled radial support band. | Support geometry claim requiring radial rows. |
| nested shell braid | Shell support plus ordered radial support bands. | Support geometry used by nested-shell dynamics, not proof of exact binaries by itself. |
| rank-three Noether braid chart | Three retained angular-momentum rows and nondegenerate frame data. | Branch-record claim requiring $D_{\mathrm{plane}}$ and same-record ledger rows. |
| dyadic `4:2:1` lock | Frequency family plus phase-return target. | Candidate family until the dyadic return map and stability rows close. |
| axis-neutral support | Mixed polarity on every opposite axial pair. | Polarity-support decoration in an axial comparison chart. |
| axis-polarized support | One positive pair, one negative pair, and one mixed pair. | Polarity-support decoration in an axial comparison chart. |
| positive-handed or negative-handed frame | Sign of the ordered rank-three angular-momentum frame. | Assigned only when the branch supplies a nondegenerate three-row frame. |

This taxonomy is designed to keep the architecture extensible without turning every variation into a retained branch. A configuration becomes physically important only when its taxonomy record is joined to a retained branch certificate or a clearly marked theorem target.
