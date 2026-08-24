Closure goal: Integrate the externally supplied neutral-braid review into BP-002 as a scope-and-provenance overlay, while preserving Family A, Family B, Family C, and every other admitted proposal as a finite ansatz subchart.

# BP-002 Scope-and-Provenance Overlay

- Date: 2026-07-29
- Artifact type: research findings, proposed changes, and priority disposition
- Source provenance: externally supplied review attributed by the operator to Bill Thurston, checked here against the live Braid Program owners and current braid taxonomy
- Authority: research guidance only; not accepted theory, an adopted configuration-chart specification, a solver result, a retention or stability result, a physical-realization claim, a particle identity, or an independent acceptance record
- Owning target: `reference/priorities/braid-program/configuration-chart.md` under BP-002

## research findings

The external review is compatible with the live Braid Program only as an overlay on the existing family taxonomy. The charter already requires scoped negatives, the method already separates prescribed screening from retained evolution, and the live chart already requires every campaign to declare which axes it can vary and which it freezes. The current taxonomy defines Family A, Family B, and Family C as prescribed geometry-and-motion families and expressly leaves room for additional geometries. Nothing in the review supplies authority to replace, merge, rank, or retire those proposals.

Plainly: the existing families remain useful finite search charts. The new material records what each chart actually represents and how far a computation reached; it does not choose a winning family.

For an admitted family or other proposal $F$, distinguish three domains:

$$
\mathcal D_F^{\mathrm{cov}}
\subseteq
\mathcal D_F^{\mathrm{eval}}
\subseteq
\mathcal D_F^{\mathrm{expr}}
\subseteq
\mathcal D_F.
$$

Here $\mathcal D_F^{\mathrm{expr}}$ is the domain representable by the declared coordinates, history model, inventory, and numerical representation; $\mathcal D_F^{\mathrm{eval}}$ is the subset actually evaluated, including certified enclosure cells when the campaign uses interval coverage; and $\mathcal D_F^{\mathrm{cov}}$ is the subset for which a separate coverage argument proves that the evaluation reaches every case covered by the verdict.

Plainly: a family definition, an instrument’s capabilities, the cases it ran, and the cases it rigorously covered are different sets. A finite sample supports a verdict only on the coverage-certified set, not on the whole family.

The smallest useful overlay is a typed record with these fields:

| Type | Required content | Claim boundary |
| --- | --- | --- |
| Scope and provenance | Family or proposal identifier, source owner, history class, motion class, and stated exclusions | Identifies an ansatz subchart; does not make it exhaustive |
| Coordinates and representation | Free and frozen coordinates, discrete choices, basis or path representation, resolution, approximation status, and chart-validity conditions | States what the instrument can express; does not state what it evaluated |
| Discrete inventory, environment, and boundary data | Persistent identities and polarities, complete declared architrino and Noether sea inventory, prehistory, retained horizon, boundary convention, and tail status | Missing inventory or history narrows or blocks a delayed-dynamics claim |
| Record-preserving symmetry assumptions | Each admitted transformation and the full record it preserves | Geometric resemblance alone does not license quotienting or deduplication |
| Derived diagnostics | Causal-root, field-speed, matching, topology, residual, or other computed rows with their source record and validity domain | A diagnostic is not a coordinate, coverage proof, retention result, or stability result |
| Coverage and certificates | Expressible, evaluated, and coverage-certified domains; coverage proof identity; unresolved cells and abstentions | Only the coverage-certified domain can bear a scoped negative |

Plainly: the record separates inputs, coordinate choices, derived outputs, and evidence reach. That separation prevents a convenient parameterization or favorable diagnostic from being mistaken for a physical result.

Topology rows require an explicit closure convention. An open finite history does not receive a knot, link, braid-closure, or framing verdict merely because its plotted paths look braided. A prescribed support closure and a returned-history closure are different records and keep separate provenance.

The overlay should also mark boxes or records that meet a singular stratum: collision; causal-root fold; field-speed crossing; matching gain, loss, or degeneracy; and stabilizer change. These labels indicate where coordinates, root inventories, matching identities, or quotient multiplicities can change. They do not by themselves establish a dynamical transition or a retained branch.

Finite presentations must carry both approximation status and tail status. A coefficient list, spline, Fourier representation, or finite retained horizon is not a complete history unless its reconstruction error and omitted-history effect are separately controlled for the claim being made.

The review’s adversarial negative controls are useful as design tests for the overlay:

- two records with the same family coordinates but different prehistories or ambient inventory;
- a geometric transform that fails to preserve the complete history and boundary record;
- a topology diagnostic requested without a valid closure convention;
- a scan that evaluates representatives but lacks a separate coverage proof;
- a record crossing a collision, fold, field-speed, matching, or stabilizer boundary.

Plainly: a correct overlay should refuse to merge these cases or broaden their verdicts. These controls test bookkeeping and claim scope; they do not certify a solver or establish a braid.

The broader architecture proposed in `bill-thurston-neutral-braid-configuration-atlas-2026-07-28.md` remains unadopted research. Its history-first emphasis, finite-presentation discipline, full-record symmetry boundary, and singular-wall separation support this narrower overlay. This packet does not adopt its global groupoid/pro-system proposal, topology inventory, matching functional, or regular-stratum theorem target.

BP-002 is independent of MEC-005 and MEC-006. Either lane becomes relevant only when a BP-002 row actually consumes its owned root-provenance or acceleration-gradient evidence. Neither is a blanket prerequisite for authoring the chart or its scope-and-provenance overlay.

No finding here establishes retention, stability, binding, physical realization, solver preference, particle identity, a conserved account, or an EOM result. A family-level negative remains unavailable from a finite scan unless a separate coverage proof closes over the exact declared domain.

## proposed changes

1. Preserve Family A, Family B, Family C, their members and constrained variants, and every other admitted proposal as finite ansatz subcharts. Do not replace the taxonomy with the overlay.
2. Add one scope-and-provenance obligation to `configuration-chart.md`. The obligation should require the typed fields above, explicit topology-closure conventions, singular-stratum status, and separate expressible, evaluated, and coverage-certified domains.
3. Complete BP-002 in three bounded passes:
   - inventory the admitted family and campaign subcharts without changing their definitions;
   - attach one overlay row to each subchart, declaring histories, prehistory, inventory, boundaries, symmetry assumptions, numerical representation, expressible domain, evaluated domain, coverage-certified domain, and exclusions;
   - ratify the chart only after every admitted campaign family has explicit coordinates, frozen axes, exclusions, ownership, and a reviewable coverage boundary.
4. Leave `work-queue.md` unchanged in this batch. Its existing BP-002 request and completion language already owns chart completion and requires explicit coordinates, symmetry reductions, exclusions, and ownership.
5. Do not edit the reader-facing braid taxonomy from this research input. The overlay is priority-program architecture until adopted and instantiated against live campaigns.

Plainly: the only immediate owner change is a compact obligation and completion sequence. Schema implementation, campaign migration, and any theorem or instrument work remain separate decisions.

## items to disposition into the priorities directory

| Disposition | Priority destination | Item |
| --- | --- | --- |
| Promote now | `reference/priorities/braid-program/configuration-chart.md` | Preserve named families as finite ansatz subcharts and add the scope-and-provenance overlay plus the three-pass completion sequence |
| Priority-only | BP-002 follow-on work | Inventory admitted subcharts and fill their overlay rows from live family and campaign owners |
| Priority-only | BP-002 follow-on work | Decide whether the overlay remains Markdown or later receives a machine-readable schema; do not create a new checker until a live consumer needs it |
| Priority-only | Campaign-specific specifications | Add topology closure and singular-stratum handling only where the campaign can express and evaluate those rows |
| Priority-only | Campaign-specific validation | Use adversarial negative controls when they test an implemented overlay or full-record equivalence path |
| Defer with blocker | Any family-level negative | Require a separately authored coverage proof over the exact declared domain; representative scans and finite samples are insufficient |
| Defer with blocker | MEC-005 or MEC-006 linkage | Link only when a concrete BP-002 row consumes owned root-provenance or acceleration-gradient evidence |
| Reject | Braid taxonomy replacement | The external review supplies no basis to replace, rank, or retire A, B, C, or other proposals |
| Reject | Physics promotion | Diagnostic classification, topology, or chart coverage cannot become retention, stability, binding, physical realization, solver preference, particle identity, a conserved account, or an EOM claim |

Plainly: the priority result is a better-scoped chart, not a larger theory claim or a new gate system.
