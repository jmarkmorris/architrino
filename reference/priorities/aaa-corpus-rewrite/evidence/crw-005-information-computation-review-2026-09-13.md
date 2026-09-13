# CRW-005 Information / Computation review — 2026-09-13

## Scope and disposition

Full 400-line baseline and full resulting diff reviewed for [Information / Computation](../../../../content/markdown/aaa/philosophy-history/information-computation.md). Only chapter and receipt were written. Live AGENTS/router, review skill and reviewer/integrator/closure-verifier procedures and applicable theory/style canon govern this bounded review. No runtime, fixture, neighbor, shared record, generated artifact or Git/index writes occurred.

Baseline SHA-256: `eca7418433287b2f681e256563cffd0f603c83a858cb7c944e19cc5d74a2d1ec`.

Final chapter SHA-256: `dc1a5419ae3be83d977c82af8fd7eddd8298d8f88ed78222d37c45f4b65c08c1`.

Disposition: repaired comparison mathematics and evidence domains while retaining the philosophical carrier-before-code thesis and subject classifications. No computable substrate update, quantum reconstruction or thermodynamic law is derived from Architrino primitives here.

## Findings

| ID | Severity | Finding and repair |
| --- | --- | --- |
| IC-01 | Medium | Coding claims omitted error-free unique decoding, alphabet/log units, support and finite-code overhead. Shannon paragraph now distinguishes entropy bounds, asymptotic block rates and ideal cross-entropy/log loss from exact finite prefix lengths. |
| IC-02 | Medium | Closed global state was conflated with purity and subsystem entropy with entanglement. The chapter now distinguishes normalized state entropy, subsystem/algebra choice and pure-bipartite versus mixed-state interpretations. |
| IC-03 | High | Holographic entropy was promoted to universal validated recovery. Ryu–Takayanagi now has its conditional static semiclassical AdS/CFT scope; optional holographic comparisons do not automatically become experimentally established requirements for all spacetime or candidate ontologies. |
| IC-04 | Medium | A close pair of encoded states could be read as establishing whole-theory equivalence. The preserved norm display now has common encoding/units/domain, and state indistinguishability is distinguished from equivalence of competing theories across admitted tests. |
| IC-05 | High | Arbitrary success-subset probability was asserted to bound total entropy from below by k_B log(1/p). The false bound is replaced, under its preserved viewer ID, with the physical Landauer reservoir-heat inequality under explicit initial-product/Gibbs/fixed-reservoir-Hamiltonian/joint-unitary conditions. Success probability is separately normalized and no longer supplies an unsupported cost. |
| IC-06 | High | Heat, total entropy production and cyclic resource restoration were conflated. The chapter distinguishes ideal bit-erasure heat from vanishing reversible total production, finite-reservoir energy/temperature from actual entropy change, finite-bath pure-reset limitations, failure/postselection accounting and restoration of the working device rather than the entire environment. |
| IC-07 | Medium | Distinct observable ensembles were categorically treated as inconsistent. The chapter now permits different pushforward laws from one declared preparation; unrelated fitting without such a joint account remains the defect. |
| IC-08 | High | Finite update structure and computability were asserted without proof. The preserved transition map is a conditional history-reduction target requiring compatibility, existence, memory sufficiency, effective representation, root algorithms and approximation error control. |
| IC-09 | Medium | Identified entities and discrete records were treated as opposition to all continuum primitives. The chapter now states continuous Euclidean coordinates and absolute time, separating this ontology from a digital update/register hypothesis. “Massless” is corrected to no intrinsic mass property. |
| IC-10 | Medium | External cellular-automaton programs were required to contain a Noether sea. They now owe their own physical propagation mechanism or causal update structure, plus the recovery domain they claim. |
| IC-11 | High | The maximum residual bundled unspecified scales and optional targets into a global recovery gate. Each retained row now has nonnegative defect, matching positive normalization, domain, uncertainty, calibration and independent benchmark. Missing rows are untested; a finite maximum passes only the specified comparisons. Partial programs retain methodological value. |
| IC-12 | Medium | Historical contribution to communication tools was treated as endorsement of informational ontology, and reversible low-dissipation computation was unnecessarily restricted to isolation. Both claims are narrowed without rewriting the historical/philosophical thesis. |

Five high and seven medium findings. No fixed finding count was imposed.

## Independent proofs and primary sources

### Unsupported success bound and correct replacement

Let the operation be the identity on an initially prepared four-state system with uniform probabilities. Label one unchanged state as “success.” Then p=1/4, all physical states and entropy accounts are unchanged, and total entropy change is zero. The rejected expression demands at least k_B ln4 for zero error allowance. Success-set notation supplies no physical premise capable of enforcing that inequality. The same counterexample can make p arbitrarily small without changing the process.

For the replacement, take initially uncorrelated target and Gibbs reservoir with fixed reservoir Hamiltonian, and joint unitary evolution. Unitary entropy preservation gives target entropy change plus actual reservoir entropy change equal to final mutual information. Gibbs relative entropy gives reservoir energy gain divided by its initial temperature minus actual reservoir entropy change equal to k_B times reservoir relative entropy. Adding yields heat divided by temperature plus target entropy change equal to two nonnegative terms. Hence the displayed heat bound follows, in physical entropy units. This derives the correction independently of any script or fixture.

[Reeb and Wolf, An improved Landauer Principle with finite-size corrections](https://arxiv.org/html/1306.4352v3), inspected Eq. (2), HTML lines 89–100 and setup lines 105–125, gives precisely this product/Gibbs/unitary domain and correction terms. Finite-size and limiting-process distinctions appear in lines 92–97. The paper is an effective quantum-statistical comparison source, not a substrate premise.

In the ideal unbiased-bit erasure limit, target entropy decreases by k_B ln2 and reservoir heat approaches T times that value. Their entropy changes cancel in the reversible large-reservoir limit; positive erasure heat is not a universal positive lower bound on total entropy production. A full-rank finite-dimensional product state stays full rank under unitary evolution, so its reduced target cannot become exactly pure; the chapter marks exact erasure as a limiting idealization.

### Coding, quantum entropy and normalization

[Shannon, A Mathematical Theory of Communication](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf), Theorem 9 on PDF p. 16 (zero-based p. 15), lines 844–856, and code example on PDF p. 18, lines 1001–1025, supplies the noiseless coding/rate comparison. For a uniquely decodable D-ary code with lengths l_i, Kraft–McMillan gives C=sum D^(-l_i)<=1. Normalize q_i=D^(-l_i)/C; relative entropy gives average length minus H_D(p)=D_D(p||q)-log_D C>=0. This direct proof fixes the alphabet/log convention independently.

For binary probabilities (0.9,0.1), entropy is approximately 0.4689955935892812 bits, but a one-symbol binary prefix code for both outcomes has length at least one for each. Cross-entropy with the true model equals the entropy, not that finite code length. For the dyadic source (1/2,1/4,1/8,1/8), lengths (1,2,3,3) achieve 1.75 bits exactly. Model-zero support on a positive-probability source event requires an infinite log loss; it is not a finite coding cost.

A closed maximally mixed two-qubit state has nonzero entropy and stays mixed under unitary evolution. A pure Bell state has mixed one-qubit reductions; a classical mixture of product states can also have mixed reductions without entanglement. Thus closure, purity and reduced-state entanglement are different properties.

[ Ryu and Takayanagi, Holographic Derivation of Entanglement Entropy from AdS/CFT](https://arxiv.org/abs/hep-th/0603001), abstract lines 16–17, explicitly states its AdS/CFT/minimal-surface comparison and the AdS3/CFT2 match. It is not an experimental universal-spacetime theorem. The chapter distinguishes the original static prescription from further dynamical/quantum formulations rather than importing them as obligatory substrate structure.

### Computability and common preparation

A real-valued coordinate in a continuous history is not made a finite exact symbol string by assigning its entity a discrete identity. A formal evolution map need not have a proved effective representation or a computable error-controlled solution operator. The existing Turing-machine reachability implication remains unchanged: if an algorithm decided every encoded reachability instance, composing it with the computable encoding would decide halting, a contradiction. This conditional undecidability result does not establish that the Architrino evolution implements such an encoding.

Distinct pushforwards can be consistent: for U uniform on [0,1], U itself is uniform while U-squared has CDF sqrt(z). One preparation and two observables yield different laws without retuning. Likewise a maximum of normalized rows states simultaneous finite comparisons; it proves neither unsampled behavior nor a missing row.

## Live owners and boundaries

- [Thermodynamic Residual](../../../../content/markdown/aaa/validation/simulations/thermodynamic-residual.md), current entropy-measure passages and lines 217–237, 267 and 331–337: entropy requires a declared measure, thermal admissibility, fixed reservoir/reference temperature and work convention; finite mock residuals do not recover thermodynamics. These sections were read for this task; no runtime was edited or used as a physical oracle.
- [Energy](../../../../content/markdown/aaa/dynamics/energy.md) and [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), compatible-history passage near 2470–2510 and the energy/action boundary passages read in this sequence: a displayed action or state map does not establish substrate conservation, global evolution or finite-memory closure.
- [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md) and [Architrino](../../../../content/markdown/aaa/foundations/architrino.md): continuous fixed geometry, individual primitive identity and no mass property. Discrete particle labels are not a digital-space axiom.
- Recently repaired Information and the Wake, Geometry and Ontology, and Theory Mapping supply the same conditional projection/recovery discipline. Their integration is coordinator-owned, not modified here.

## Validation and preservation

Known-case-first Node controls returned two actual math spans while skipping code, excluded fenced link syntax, and rejected invalid KaTeX before target inspection. Strict KaTeX then rendered 72 current spans (61 baseline). Of 11 displays, ten are byte-identical; the only changed display is the Landauer replacement under `corpus-equation-3da45544db415a12`. All headings and all original links/viewer identities are retained. There are 23 current links, 20 local, and all local file paths resolve (including the self-fragment route). Fragment contents and remote availability are not exhaustively certified by this check.

Independent entropy instrument first returned one bit for a fair binary source, then 1.75 for the dyadic source, 0.4689955935892812 for the biased binary source and zero for a certain outcome. Natural-log evaluations returned ln2=0.6931471805599453 and ln4=1.3862943611198906. The independent proofs above establish the physical/logical conclusions; these numerical checks verify arithmetic only.

`node scripts/validate-content.mjs --check --strict` passed before receipt creation with 199 corpus Markdown files, 1774 repository Markdown files, zero errors and zero warnings; existing informational scene-link notes remain. Scoped `git diff --check HEAD -- content/markdown/aaa/philosophy-history/information-computation.md` passed. Final direct two-file path/whitespace/hash checks include this receipt. No generated or publication commands were run.

## Remaining obligations

Actual device claims must provide initial/final physical states, reservoir and apparatus models, correlations, success/failure ensemble, work/heat extraction and uncertainty. Architrino recovery additionally needs the native energy, thermal and observable maps; the comparison theorem is not that derivation. Finite update/computability, quantum occupation/entropy and any claimed holographic regime remain separate owner obligations. No external ontology is required to adopt a Noether sea, and no finite residual vector establishes full theory closure. Coordinator integration remains separate.
