# Noether Braid

The **Noether braid** is the reader-facing class of neutral six-architrino assembly scaffolds used by the Noether sea chapters and particle-architecture chapters. It is the first place where the reader should think in terms of a retained six-body branch rather than a pair, point particle, or ordinary orbit.

A Noether braid is not assumed at the outset to be a set of exact binaries. The base object is a polarity-neutral six-body branch whose architrino paths lie on closed support curves with speed factors bounded above and below. In that branch, three negative-polarity architrinos (electrinos) and three positive-polarity architrinos (positrinos) maintain a persistent causal-return ledger.

The simple idea is six persistent strands plus one shared ledger. The hard question is whether the delayed dynamics can keep that ledger coherent: the same six identities, the same active root structure, compatible action and wake rows, and enough stability to serve as a reusable assembly scaffold.

This question is the crux of the theory. The Noether sea, the particle architecture, the mass-response program, and the effective-metric recovery all rest on a retained six-body branch, so the retained-branch question is the central open obligation of this scene. The chapters here define the braid families, carry the shared mathematics, explain the configuration-space hypotheses, and state the requirements a retained branch must satisfy, each at its stated claim level. These chapters do not track the search: status, run results, and candidate rankings are not textbook content, and a result enters only once it is established at its stated claim level.

One working principle of this scene deserves stating openly. When two statements derived along independent routes turn out to describe the same limit — the horizon-alignment condition and the vanishing of the axial polarity dipole, or the same minimum-energy arrangement organizing both the braid core and its accessory dressing — that coincidence is treated as a seam of the underlying ontology, not as an accident to admire. In a correct substrate theory one mechanism surfaces in many observer-level places precisely because it is one mechanism, so each multi-route convergence is logged, the common cause is hunted, and the identified mechanism is then required to make at least one new prediction beyond the statements it unified. Convergences that resist unification are equally valuable, because they mark places where the ontology is still missing a part.

The prescribed geometry is organized by [Braid Taxonomy](braid-taxonomy.md). Its current map is:

| Term | Definition | Additional structure |
| --- | --- | --- |
| [**neutral braid**](braid-families.md#the-neutral-braid-base-of-the-family-ladder) | The broad six-architrino neutral case before any required binary grouping or radial organization. | Polarity balance and causal-return bookkeeping. |
| [**Family A**](braid-family-a.md) | One braid whose three binary axes are orthogonal at the near-rest endpoint and converge toward the group-translation direction under the prescribed response. | `A1` is the three-radius hinge member; `A2` is the fully symmetric no-hinge member. |
| [**Family B**](braid-family-b.md) | One braid whose three binary midpoints and axes coincide. | `B1` is the rigid common-frequency member. |
| [**Family C**](braid-family-c.md) | An assembly composed of two complete B1 braids. | `C1` has the same circulation sense; `C2` has the opposite circulation sense. |

These definitions name prescribed coordinate classes, not retained-branch existence. Stable all-pairs roots, recovery after perturbation, and observer-export behavior are theorem targets that must be certified by the branch ledger rather than read back into a family identifier. The broader diagnostic axes and search variables remain in [Noether Braid Configuration Space](noether-braid-configuration-space.md).

The word **braid** names the six retained worldline strands together with their shared causal-return ledger. It does not by itself assert that the branch already carries a protected mathematical braid-group class. A protected braid, linking, framing, or chirality class is extra structure to be certified by the [assembly topological charge](noether-braid-topological-charge.md) program.

Canonical reader-facing prose uses **Noether braid** for the assembly class, **neutral braid** for the base case, and the family/member identifiers for prescribed geometry. Durable symbols and internal runtime identifiers may still contain `NS`, `noether_braid`, or `nested-shell-braid`; those strings are stable implementation identifiers, not a second taxonomy. The braid's dynamic envelope geometry is developed separately in [Braid Envelope Geometry](braid-envelope-geometry.md), while metric-level translation belongs to [Emergent Metric](../spacetime/emergent-metric.md).

## Simple Picture

A Noether braid is a candidate way for six architrinos to keep coming back into a repeatable causal relationship. The important object is not a drawn knot or a fixed material ring. It is the full branch record: which architrinos are present, which causal wakes return, which root identities stay active, and which conserved or nearly conserved quantities survive around the cycle.

That is why the family identifiers are deliberately neutral. `A1`, `A2`, `B1`, `C1`, and `C2` point to explicit table rows; the identifiers do not themselves imply stability, mass response, photon behavior, or Noether sea dominance. Those claims require retained branch certificates and downstream export rows.

## Document Role

This chapter is the overview and family map for the Noether braid stack. It defines the word **braid**, routes the coordinate taxonomy, and explains why family identifiers are geometry classes rather than retained-branch results.

It does not carry the detailed family derivations, select a frequency family, assign proof dispositions, compute assembly topological charge, or export Lorentz clock/ruler deformation by itself. Neighboring chapters consume the branch record named here, and they play distinct roles. The taxonomy defines the coordinate system and member rows; the requirements chapter states the realization-independent proof contract; the mathematics chapter carries the machinery shared by every realization; the configuration-space chapter carries broader diagnostic axes and search variables; the analysis chapter works one candidate frequency family exactly; the export chapters describe what a retained branch would hand to the rest of the theory.

| Role | Chapter | What it owns |
| --- | --- | --- |
| Requirements | [Braid Recovery Requirements](braid-recovery-requirements.md) | The realization-independent retention-certificate shape, its base-family instantiation, proof-burden order, and recovery-target inventory. |
| Taxonomy | [Braid Taxonomy](braid-taxonomy.md) | The canonical coordinates, family/member identifiers, master tables, and prescribed response endpoints. |
| Family definition and member analysis | [Braid Family A](braid-family-a.md) | The shared Family-A geometry, A1 variants, A2 symmetry, the A1.2/A2 boundary, and A2 retention diagnostics. |
| Family definition | [Braid Family B](braid-family-b.md) | The exact B1 path geometry, coordinate boundaries, axial-translation specialization, and Family-A boundary. |
| Family definition | [Braid Family C](braid-family-c.md) | The exact two-B1 composition chart, C1/C2 circulation relation, derived axis offset, and physical-mapping boundary. |
| Configuration space | [Noether Braid Configuration Space](noether-braid-configuration-space.md) | The classification axes, evidence-level terms, and the rank-three angular-momentum-frame search variables. |
| Retention and interpretation | [Neutral-Braid Retention and Interpretation](braid-families.md) | The base neutral braid, A1 retention questions, closure labels, dynamics, dressing, and downstream hypotheses not yet assigned to specialist member documents. |
| Mathematics | [Braid Mathematics](braid-mathematics.md) | The core-agnostic machinery: invariant channels and equivariant reductions, exact channel identities, the exact speed budget, eigen-braid spectrum framing, fold-set action quantization as hypothesis, and the Thomson dressing mechanism. |
| Analysis | [Doubling-Frequency Resonance Lock](doubling-frequency-lock.md) | The A1.3 `4:2:1` candidate and its lock analysis. |
| Export | [Braid Envelope Geometry](braid-envelope-geometry.md) | The family-general envelope and observer-export interface: dynamic exclusion envelope, sea-interface diagnostic, canonical geometry variables, and the Lorentz projection. |
| Export | [Noether Braid Topological Charge](noether-braid-topological-charge.md) | Classification of retained branch charts. |

A first reading should follow the table order: what a retained braid must satisfy, then the coordinate taxonomy and Family-A, Family-B, and Family-C definitions, then the broader configuration space, shared mathematics, and A1.3 analysis, with the export chapters as the interface layer. Search progress is not tracked in these chapters.

## Medium-Selection Burden

Branch retention is not the same question as Noether sea primacy. A retained Noether braid branch would show that one neutral assembly class can persist. It would not yet show that this class is the dominant ambient structure in the universe, because many other architrino assemblies might also be imagined.

The stronger claim is a selection theorem over candidate assembly classes. A class can serve as the ambient Noether sea population only if it can be retained as a branch and also form a dense, locally neutral, convergent, transparent, pressure-bearing, and constitutively useful medium. In the notation of [Noether sea](../spacetime/noether-sea.md#composition), any proposed Family-A route must pass the ambient selection residual while competing assembly classes either fail, remain local matter or reaction branches, or appear only as higher-energy, short-lived, or environment-specific excitations.

This distinction protects the proof order. The neutral-braid row asks whether the six-site architecture can close; each family/member row adds its own coordinate constraints. The Noether sea selection row asks why one retained member should dominate the weak homogeneous medium rather than a different assembly population. A particle-like success, a metric-like export, or an appealing exclusion volume is therefore not enough by itself; the same branch class must also supply the statistical abundance, far-field cancellation, packing, and shared-response properties needed by the Noether sea.
