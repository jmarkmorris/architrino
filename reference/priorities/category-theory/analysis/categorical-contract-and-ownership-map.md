# CT-001 — Minimal Categorical Contract and Ownership Map

## Status and Purpose

- **Status:** Completed at priority-contract grade on 2026-08-26.
- **Priority object:** `categorical_contract_and_ownership_map`.
- **Purpose:** Fix the smallest categorical interface that can test history composition and information loss without importing new substrate ontology or duplicating an existing physical owner.
- **Authority:** This packet defines types, composition obligations, ownership, rejection decisions, and falsifiers. It does not prove that a retained assembly exists, that a proposed continuation is unique, that a recovery functor is realized, or that higher categorical structure is required.

The accepted minimum is three ordinary structures over compatible full-history records: a lawful-history-extension category, a full-history symmetry groupoid, and a certified-restriction system. A prospective coarse-graining map is kept separate until predictive closure is proved. Causal-incidence paths, monoidal assembly products, reaction categories, and higher categories are not accepted by this packet.

Plainly: this packet says what information and transformations a future category would have to carry. It does not make a physical assembly or a new law merely by naming the boxes and arrows.

## Claim Boundary

| Claim class | Status in this packet |
| --- | --- |
| Category, functor, groupoid, associativity, and factorization definitions | Established mathematics used as organizational language. |
| Full-history dependence and the admitted $E(3)\times\mathbb R_{\mathrm{time}}$ action | Inherited from the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md); not rederived here. |
| Boundary-history objects and lawful-history arrows | Candidate definitions and closure targets. |
| Snapshot-factorization obstruction | Proved abstract lemma; a physical matched-history witness remains a separate artifact. |
| Retained assembly, stable branch, probability law, observer recovery, or higher category | Not claimed. |

Plainly: only the small no-go lemma below is proved here. Everything that would identify a particular physical assembly or effective theory still belongs to its dynamical owner.

## 1. Typed Boundary-History Objects

Fix a declared domain $\mathcal D$, an absolute-time cut $T$, and a finite participating identity set $R$. Let $I_T\subseteq(-\infty,T]$ be the retained interval actually represented. A candidate boundary-history object is

$$
\mathcal B_T
=
\left(
T,
R,
q,
\mathcal H_T,
\mathcal C_T,
\mathcal W_T,
\mathcal N_T,
\mathcal E_T,
\chi_T
\right).
$$

| Field | Required content | Owner of physical meaning |
| --- | --- | --- |
| $T$ | Absolute substrate time of the cut. | Absolute-time and Master Equation owners. |
| $R$ and $q$ | Persistent identities and polarities represented by the record. | Substrate ontology and reaction-provenance owners. |
| $\mathcal H_T$ | The retained coupled position-and-velocity history on $I_T$ for every identity in $R$. | Master Equation and EOM evolution contract. |
| $\mathcal C_T$ | Active, inactive, unresolved, continued, born, merged, split, or excluded causal-root and branch records consumed at the cut. | Master Equation and EOM root-completeness contract. |
| $\mathcal W_T$ | In-flight wake and history-functional records required by later continuation or conservation claims. | Master Equation and causal-action owners. |
| $\mathcal N_T$ | Declared Noether sea or other environmental interface, including an explicit empty or unresolved status. | Noether sea and owning assembly/reaction lanes. |
| $\mathcal E_T$ | Boundary, retained-horizon, omitted-tail, collision, caustic, and environment-port conditions. | Braid Program atlas, EOM contract, and physical lane consuming the record. |
| $\chi_T$ | Provenance, representation, uncertainty, certification, evidence grade, and abstention metadata. | Producing instrument and its validation owner. |

Plainly: a boundary object is the information package that a later interval is allowed to consume. A blank field is not harmless; it must be explicitly irrelevant, bounded, empty, or unresolved under the physical owner’s rules.

This tuple is a coverage contract, not a minimal-state theorem. A field may later be removed only by a reconstruction or predictive-sufficiency result. A derived field may be cached, but it must identify its source record and consistency rule so that caching does not become a second physical degree of freedom.

Two exact boundary objects are equal only when every physically consumed field agrees under its declared exact representation. Equality does not quotient persistent identity, provenance, root labels, wake records, or omitted-tail obligations. A separately declared full-history symmetry may relate distinct objects by an isomorphism, and a coarse map may later identify them for a named effective purpose; neither relation changes exact object equality.

## 2. Lawful-History-Extension Category

Let $\mathsf{HistExt}_{\mathcal D}$ have the admitted boundary-history records $\mathcal B_T$ as objects. A candidate arrow

$$
\mathsf P_{ab}:\mathcal B_{T_a}\longrightarrow\mathcal B_{T_b},
\qquad
T_a\le T_b,
$$

contains the newly accepted coupled worldline interval on $(T_a,T_b]$, every root, wake, environment, controller, boundary, and certification update consumed or produced on that interval, and the exact resulting boundary record $\mathcal B_{T_b}$. An arrow is lawful only at the evidence grade supplied by its physical owner: canonical EOM evolution, conditional prescribed history, reference calculation, or another explicitly typed grade must not be conflated.

Plainly: an arrow is a complete accepted history increment, not one curve, a displayed animation, or an instruction to invent the missing dynamics.

The identity arrow $\operatorname{id}_{\mathcal B_T}$ is the zero-duration extension that appends no history, changes no record, and returns the same certified boundary object. Multiple arrows may share a source object when the declared physical semantics permit more than one continuation. Category theory records those alternatives; it does not select one or assign probabilities.

Two arrows are composable only when the first arrow’s exact target object is the second arrow’s exact source object. If an additional hidden compatibility test is needed after those objects match, then the object type is insufficient and must be refined rather than allowing a silent partial composition.

## 3. Three-Interval Associativity Obligation

For $T_0<T_1<T_2<T_3$, let

$$
\mathsf P_{01}:\mathcal B_{T_0}\to\mathcal B_{T_1},
\qquad
\mathsf P_{12}:\mathcal B_{T_1}\to\mathcal B_{T_2},
\qquad
\mathsf P_{23}:\mathcal B_{T_2}\to\mathcal B_{T_3}
$$

be compatible lawful extensions. Composition must satisfy

$$
(\mathsf P_{23}\circ\mathsf P_{12})\circ\mathsf P_{01}
=
\mathsf P_{23}\circ(\mathsf P_{12}\circ\mathsf P_{01})
=
\mathsf P_{03}.
$$

This is a fixed-order statement. It does not permit reordering, time reversal, or replacement of any interval. A reversed expression is generally ill-typed.

Plainly: the same three chronological pieces must produce the same complete history whether bookkeeping joins the first two pieces or the last two pieces first.

### Conditional associativity proposition

Assume:

1. adjacent boundary objects agree exactly;
2. composition appends timestamped interval records by exact compatible union;
3. the provenance and certification merge is associative and never weakens an earlier failure or abstention;
4. later composition cannot revise an earlier accepted state, causal-root classification, history identity, or evidence grade.

Then the three-interval composition above is associative.

**Proof.** Both parenthesizations produce the same timestamped union of records on $(T_0,T_3]$. Exact boundary matching removes duplicate cut records, while assumptions 3 and 4 make the merged provenance and certification independent of parenthesization. Therefore both composites have the same source, target, interval history, ledgers, and certification, so they are the same arrow $\mathsf P_{03}$.

Plainly: the algebraic proof is short because the real burden has moved into the physical data contract. The hard question is whether the boundary object contains everything needed to make exact compatible union legitimate.

The proposition does not establish existence, uniqueness, global continuation, root completeness, or a retained assembly. A three-interval control falsifies the proposed contract if the two legal parenthesizations differ. Such a failure diagnoses missing boundary data, nonassociative certificate handling, truncation drift, or revision of accepted history; it is not evidence that physical chronology can be reordered.

## 4. Snapshot-Factorization Obstruction

Let $\mathscr H$ be a declared full-history state space on which a deterministic continuation $E_{\Delta T}$ is well defined, and let

$$
Q:\mathscr H\longrightarrow\mathscr Z
$$

forget history and retain a proposed instantaneous assembly state in $\mathscr Z$.

### Lemma — no snapshot evolution after a separating history pair

If there exist $H_1,H_2\in\mathscr H$ such that

$$
Q(H_1)=Q(H_2)
$$

but

$$
Q\!\left(E_{\Delta T}(H_1)\right)
\ne
Q\!\left(E_{\Delta T}(H_2)\right),
$$

then no function $\overline E_{\Delta T}:\mathscr Z\to\mathscr Z$ can make

$$
Q\circ E_{\Delta T}
=
\overline E_{\Delta T}\circ Q
$$

hold on that domain.

**Proof.** If $\overline E_{\Delta T}$ existed, then $Q(H_1)=Q(H_2)$ would imply

$$
\overline E_{\Delta T}(Q(H_1))
=
\overline E_{\Delta T}(Q(H_2)).
$$

The commuting equation would identify the two sides with $Q(E_{\Delta T}(H_1))$ and $Q(E_{\Delta T}(H_2))$, contradicting their assumed inequality.

Plainly: if two histories look identical under the proposed snapshot but later look different under that same description, there is no self-contained rule that evolves the snapshot alone.

On a branching domain, replace $E_{\Delta T}(H)$ by the complete admitted continuation set or transition law $\mathcal F_{\Delta T}(H)$. If two histories with the same $Q$ image induce different pushed-forward continuation sets or transition laws, no Markov transition relation or kernel depending only on $Q(H)$ is well defined.

The Master Equation’s path-history dependence supplies the mechanism by which a separating pair may exist, but this packet does not claim that a specific assembly pair has already been certified. The bounded physical test must construct two admissible histories with the same declared instantaneous assembly projection and show, independently of the projection code, that a later root, acceleration, branch, or observable record separates them.

### Required controls

| Control | Expected result | Meaning |
| --- | --- | --- |
| Full-history identity map $Q=\operatorname{id}_{\mathscr H}$ | Factorization succeeds whenever the full-history continuation is well defined. | Positive control for the formal test. |
| Endpoint-matched histories with a later separating wake or root | Factorization fails for the selected snapshot projection. | Evidence that the projection discarded predictive information. |
| Reordered interval composition | Rejected as ill-typed or physically different. | Noncommutativity and chronology control, not an associativity failure. |
| Same implementation on both sides of the square | No independent evidence claim. | Prevents a commuting diagram from validating itself. |

Plainly: the negative control must change hidden history while keeping the proposed visible state fixed. Merely replaying one record through two code paths tests plumbing, not whether the state description is sufficient.

## 5. Full-History Symmetry Groupoid

Let $G_{\mathrm{adm}}$ contain only transformations already proved to preserve the complete physical record on the declared domain. The Master Equation presently supplies the full-history action of spatial Euclidean isometries and absolute-time-origin shifts through

$$
G_{\mathrm{fund}}=E(3)\times\mathbb R_{\mathrm{time}}.
$$

The candidate symmetry groupoid is the action groupoid

$$
\mathsf{Sym}_{\mathcal D}
=
G_{\mathrm{adm}}\ltimes\operatorname{Obj}(\mathsf{HistExt}_{\mathcal D}).
$$

An arrow $\gamma:\mathcal B_T\to\gamma\mathcal B_T$ transforms the full retained paths, identities where admitted, polarities, root and wake ledgers, environment, boundary data, and certification. Snapshot resemblance, arbitrary relabeling, time reversal, polarity conjugation, scaling, and unproved internal transformations are not admitted by this definition.

Plainly: an exact symmetry moves the whole evidence record together. It does not erase which architrino followed which path.

For a lawful extension $\mathsf P_{ab}$ and admitted boundary symmetries $\gamma_a$ and $\gamma_b$, covariance requires

$$
\gamma_b\circ\mathsf P_{ab}
=
\mathsf P_{ab}^{\gamma}\circ\gamma_a.
$$

This ordinary commuting square is the accepted minimum. No double category or two-morphism is required until a concrete compatibility cannot be expressed by such squares.

## 6. Certified Restriction and Information Loss

Finite-horizon, finite-resolution, or uncertainty-bearing records require restriction arrows

$$
\rho_{\beta\to\alpha}:\mathcal B_{\beta}\longrightarrow\mathcal B_{\alpha},
\qquad
\alpha\preceq\beta,
$$

with

$$
\rho_{\alpha\to\alpha}=\operatorname{id},
\qquad
\rho_{\beta\to\alpha}\circ\rho_{\gamma\to\beta}
=
\rho_{\gamma\to\alpha}.
$$

Every restriction must carry the changed uncertainty, omitted-tail contract, lost root reach, and abstention boundary. The Braid Program’s `BP-002` remains the owner of the executable configuration atlas and its finite-history certification. This packet defines only the cross-lane type requirement and does not create a competing atlas.

Plainly: shortening a record is allowed only when the record also says what became unknown and which conclusions are no longer licensed.

A physical coarse-graining map $Q$ is not the same operation as truncation. It claims that selected distinctions do not matter for named effective predictions on a declared domain. Such a $Q$ remains prospective until it passes the factorization or bounded-residual test. No recovery functor is accepted by CT-001.

## 7. Structures Kept Distinct

| Structure | Accepted role | Decision and stop condition |
| --- | --- | --- |
| Group theory | Reversible transformations and invariants. | Use directly when one object type and invertible transformations suffice. |
| History-space topology | Continuity, connectedness, deformation, root degree, and strata. | Use directly; topology does not supply physical evolution. |
| Typed directed graph | Emission, reception, and causal-hit incidence. | Preferred over a causal-incidence category until a physical composition law for hits is proved. |
| State-dependent delay equations | Existence, uniqueness, continuation, and regularity. | Remain the dynamics-side owner; categorical associativity cannot replace these theorems. |
| Ordinary history-extension category | Typed chronological composition and the snapshot-factorization question. | Accepted as the smallest useful categorical candidate. |
| Full-history action groupoid | Exact reversible symmetry without quotienting provenance. | Accepted only for independently admitted full-record actions. |
| Certified inverse or pro-system | Compatible finite-history and finite-resolution presentations. | Interface retained; executable realization remains with `BP-002`. |
| Monoidal or operadic assembly structure | Parallel composition or substitution of assemblies. | Rejected for now; delayed cross-coupling prevents independence from following from disjoint inventory. |
| Double, bicategorical, or higher structure | Morphisms between morphisms or multiple composition directions. | Rejected for now; ordinary categories plus covariance squares express every current obligation. |
| Topos, stack, or other grand categorical program | Broad foundational reconstruction. | Outside the accepted minimum; reconsider only after a specific ordinary structure fails and a physical consumer exists. |

Plainly: the contract deliberately sends most questions back to simpler mathematics. Category theory survives only where typed composition or factorization adds a check that those tools do not state as clearly by themselves.

## 8. Ownership Map

| Physical or mathematical responsibility | Authoritative owner | CT-001 interface | Prohibited inference |
| --- | --- | --- | --- |
| Primitive identities, polarity, Euclidean void, and absolute time | [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), and [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md) | Supplies object fields and time typing. | Category theory does not derive the substrate. |
| Causal roots, per-hit acceleration, path-history dependence, and admitted symmetries | [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) | Supplies legality of history and symmetry arrows. | A formal arrow is not a physical hit or solution. |
| Accepted evolution, root completeness, append-only accepted history, restart, and evidence records | [EOM evolution contract](../../app-solver/contracts/evolution-contract-v1.md) | Supplies executable arrow records and failure semantics. | CT-001 does not modify or validate the EOM solver. |
| Configuration atlas, finite-history scope, restrictions, uncertainty, and abstention | [Braid Program configuration chart](../../braid-program/configurations/configuration-chart.md) and `BP-002` | Supplies atlas objects when ratified; receives no duplicate implementation here. | Atlas admission does not establish retention or physical realization. |
| Existence, uniqueness, and continuation of state-dependent delay evolution | Master Equation closure and the applicable delay-equation theorem owner | Supplies the domain on which $E_{\Delta T}$ or continuation sets exist. | Associativity cannot prove well-posedness. |
| Assembly retention, stability, shielding, and branch identity | Owning braid and assembly lanes | May later provide physical objects for `CT-004` or `CT-006`. | A typed assembly object is not a retained assembly. |
| Noether sea constitution and environment response | [Noether sea](../../../../content/markdown/aaa/spacetime/noether-sea.md) and its priority owners | Supplies $\mathcal N_T$ and environment-port semantics. | An environment field in a tuple does not close the sea law. |
| Reaction inventories and identity routing | [Reaction Ledger](../../../../content/markdown/aaa/validation/reaction-ledger.md) and reaction owners | May later provide reaction-process generating data. | A routing bijection alone does not prove lawful history composition. |
| Quantum, Standard Model, and effective-geometry recovery | Their existing recovery lanes | Prospective codomains only. | No recovery functor or observer law is claimed. |
| Cross-lane categorical types, ownership, and stop conditions | This packet | Prevents type and authority collapse. | Formal coherence is structural evidence only. |

Plainly: every physical arrow must come from the lane that owns its dynamics or evidence. The Category Theory lane may test whether the arrows fit together, but it cannot manufacture them.

## 9. Completion and CT-004 Adjudication

CT-001 is complete at priority-contract grade because this packet:

- fixes the boundary-history object fields and exact-equality rule;
- separates lawful evolution, exact symmetry, certified restriction, and prospective coarse-graining;
- supplies identity and three-interval associativity obligations;
- proves the abstract snapshot-factorization obstruction;
- records the full ownership map and abstention boundaries;
- rejects unsupported causal, monoidal, reaction, and higher categorical structures;
- names the physical witness still required before any stronger claim.

The completion is not a theory or evidence promotion. The categorical layer remains removable scaffolding unless a later bounded test produces a nontrivial physical obstruction, reconstruction, compression, or independently checkable result.

### Decision — CT-004 is materially but only partially unblocked

CT-004 is now executable at **bounded contract grade**. Its first artifact can instantiate the typed boundary object, test identity and three-interval composition, construct an endpoint-matched hidden-history control, and evaluate the snapshot-factorization square without claiming a retained assembly.

CT-004 remains blocked at **physical completion grade** by:

- a proved sufficient boundary-history domain;
- verified state-dependent-delay existence and continuation hypotheses on that domain;
- causal-root continuation and completeness through the composed intervals;
- an accepted treatment of branching or nonunique continuation;
- a retained assembly carrier if the test is stated as an assembly result rather than a history-record contract.

Plainly: CT-001 has made the next experiment precise, so CT-004 can start. It has not supplied the physical history theorem that CT-004 must eventually prove.

## Next Artifact

Create `worldline_history_morphism_contract.md` under `CT-004` with four bounded controls: an identity extension, a three-interval associative concatenation, an endpoint-matched history pair that separates after projection, and a full-history symmetry covariance square. Stop before higher categories or a retained-assembly claim unless the ordinary contract demonstrably fails.
