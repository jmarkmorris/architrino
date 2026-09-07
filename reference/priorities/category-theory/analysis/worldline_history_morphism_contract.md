# CT-004 — Worldline-History Morphism Contract

## Status and Decision

- **Status:** Completed at bounded history-record contract grade on 2026-08-26.
- **Priority object:** `lawful_history_extension_category`.
- **Purpose:** Instantiate the CT-001 boundary-history type, prove the exact bookkeeping laws of identity and three-interval compatible union, specify a separating-pair test for snapshot factorization, and decide whether category theory adds a material payoff beyond simpler mathematics.
- **Decision:** The categorical formulation supplies a modest reusable typing and composition audit, but it does not strengthen the ordinary delay-system obstruction. Close CT-004 at bounded contract grade, pause category-specific physical expansion, and retain the lane as optional support for history-sensitive theory bridges and philosophy-history analysis.

This packet does not establish that the record below is physically minimal or sufficient. It does not provide a lawful Master-Equation separating pair, a retained assembly, unique or global continuation, a Markov closure, a recovery functor, or a need for higher categories.

Plainly: the contract gives one exact way to join complete records and one exact way to test whether a proposed snapshot forgot predictive history. The physical owners must still show that an actual $\mathbb{A}\mathbb{A}\mathbb{A}$ history satisfies those contracts.

## Claim Boundary

| Item | Grade in this packet | Falsifier or remaining burden |
| --- | --- | --- |
| Identity and compatible-union associativity | Proved abstract mathematics on the declared append-only record domain. | A legal parenthesization changes any timestamped field or certificate. |
| Manufactured endpoint-matched separating pair | Proved abstract negative control for a delayed functional. | The two histories fail to match at the declared endpoint or the delayed response does not separate. |
| Full-history $E(3)\times\mathbb R_{\mathrm{time}}$ covariance | Inherited Master-Equation result and typed contract here; not independently rederived. | A transformed complete record fails the owning symmetry theorem or changes an invariant causal condition. |
| Complete boundary-history record | Candidate coverage contract. | A later lawful continuation consumes an unrepresented field, or a listed field proves redundant under its owner. |
| Snapshot obstruction for a retained $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly | Still missing physical evidence. | Requires an independently certified lawful history pair and continuation or next-acceleration separation. |

## 1. Declared Record Domain

Fix a declared history-record domain $\mathcal D$, an absolute-time cut $T$, a represented interval $I_T\subseteq(-\infty,T]$, and a finite participating identity set $R$. Instantiate the candidate boundary-history object as

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

The fields have the CT-001 meanings:

- $T$ is the cut in absolute time.
- $R$ and $q$ are persistent identities and polarities.
- $\mathcal H_T$ is the represented coupled position-and-velocity history on $I_T$.
- $\mathcal C_T$ is the causal-root and branch ledger consumed at the cut.
- $\mathcal W_T$ contains required in-flight wake and history-functional records.
- $\mathcal N_T$ states the Noether sea or other environmental interface, including explicit empty or unresolved status.
- $\mathcal E_T$ states retained-horizon, omitted-tail, boundary, collision, caustic, and environment-port conditions.
- $\chi_T$ carries provenance, representation, uncertainty, certification, evidence grade, and abstention.

Exact equality means equality of every represented and physically consumed field. A full-history symmetry relation or a prospective coarse identification is not exact equality.

Plainly: this is a deliberately generous record. Nothing here says every field is necessary, and nothing says the list is sufficient for nature. It is sufficient only for the abstract append-only record algebra defined below.

## 2. Worldline-History Extensions

For $T_a\le T_b$, a history-extension arrow

$$
\mathsf P_{ab}:\mathcal B_{T_a}\longrightarrow\mathcal B_{T_b}
$$

is the tuple

$$
\mathsf P_{ab}
=
\left(
(T_a,T_b],
\Delta\mathcal H_{ab},
\Delta\mathcal C_{ab},
\Delta\mathcal W_{ab},
\Delta\mathcal N_{ab},
\Delta\mathcal E_{ab},
\Delta\chi_{ab};
\mathcal B_{T_a},
\mathcal B_{T_b}
\right).
$$

The interval fields contain only newly accepted records on $(T_a,T_b]$ plus the exact source and target references needed to verify the cut. This factorization avoids copying an unchanged past without declaring it physically redundant; a persistent or hash-linked representation remains valid only when it reconstructs the full referenced record.

An arrow is admitted at its physical owner’s evidence grade. This contract does not upgrade prescribed history, conditional calculation, display output, or a candidate continuation into canonical evolution.

### Exact identity extension

Define

$$
\operatorname{id}_{\mathcal B_T}
=
\left(
(T,T],
\varnothing,
\varnothing,
\varnothing,
\varnothing,
\varnothing,
\varnothing;
\mathcal B_T,
\mathcal B_T
\right).
$$

The empty interval appends no history, changes no ledger or evidence grade, and preserves every source field exactly. Consequently,

$$
\mathsf P_{ab}\circ\operatorname{id}_{\mathcal B_{T_a}}=\mathsf P_{ab},
\qquad
\operatorname{id}_{\mathcal B_{T_b}}\circ\mathsf P_{ab}=\mathsf P_{ab}.
$$

Plainly: doing nothing for zero elapsed time changes nothing. If a zero-duration operation refreshes, reclassifies, or weakens a record, it is not this identity arrow.

## 3. Exact Compatible Union and Three-Interval Associativity

Two arrows $\mathsf P_{ab}$ and $\mathsf P_{bc}$ are composable only when the first exact target equals the second exact source. Their composite is

$$
\mathsf P_{bc}\circ\mathsf P_{ab}
=
\mathsf P_{ac},
$$

where every interval component of $\mathsf P_{ac}$ is the timestamp-preserving compatible union of the corresponding components on $(T_a,T_b]$ and $(T_b,T_c]$. The merge removes no nonduplicate record, revises no accepted record, preserves persistent identities, and combines certification by an associative rule whose result cannot be stronger than its weakest required input.

### Proposition — three-interval compatible-union associativity

Let $T_0<T_1<T_2<T_3$ and let $\mathsf P_{01}$, $\mathsf P_{12}$, and $\mathsf P_{23}$ satisfy exact adjacent-boundary equality. Assume each record component is joined by timestamp-preserving compatible union and certificate combination is associative. Then

$$
(\mathsf P_{23}\circ\mathsf P_{12})\circ\mathsf P_{01}
=
\mathsf P_{23}\circ(\mathsf P_{12}\circ\mathsf P_{01})
=
\mathsf P_{03}.
$$

**Proof.** Both parenthesizations preserve the ordered partition $(T_0,T_1]\cup(T_1,T_2]\cup(T_2,T_3]$ and take the same compatible union in every interval field. Exact cut equality removes only duplicate boundary references. Associative certificate combination gives the same $\chi_{T_3}$, and the no-revision condition preserves the same earlier accepted fields. The two composites therefore have identical source, target, interval records, provenance, and certification, so they are the same arrow.

### Controls

| Control | Required outcome | Diagnostic meaning |
| --- | --- | --- |
| Left and right identity | Exact arrow equality. | Empty extension is neutral. |
| Three legal chronological intervals | Both parenthesizations equal $\mathsf P_{03}$. | Record joining is independent of bookkeeping parentheses. |
| $\mathsf P_{12}\circ\mathsf P_{23}$ | Rejected because the cut types do not match. | Associativity never permits reordering. |
| One mismatched boundary hash, root branch, or certificate | Composition abstains. | Hidden compatibility must not be repaired silently. |

Plainly: the categorical contribution here is a sharp interface rule: every compatibility fact must live in the boundary type. The proof itself is ordinary associativity of exact record union.

## 4. Snapshot-Factorization Test

Let $\mathscr H_{\mathcal D}$ be a declared history domain and let

$$
Q:\mathscr H_{\mathcal D}\longrightarrow\mathscr Z
$$

retain a proposed instantaneous state. For deterministic continuation $E_{\Delta T}$, snapshot evolution exists only if $Q\circ E_{\Delta T}$ is constant on every fiber $Q^{-1}(z)$. Equivalently, a map $\overline E_{\Delta T}:\mathscr Z\to\mathscr Z$ can satisfy

$$
Q\circ E_{\Delta T}
=
\overline E_{\Delta T}\circ Q
$$

only when histories identified by $Q$ remain identified after the declared evolution and projection.

### Endpoint-matched hidden-history separating-pair protocol

For a selected cut $T$ and interval length $h>0$:

1. Declare the projection $Q$, including every endpoint quantity it retains.
2. Construct two independently admissible histories $H_+$ and $H_-$ on $[T-h,T]$ with $Q(H_+)=Q(H_-)$.
3. Verify independently that the histories differ in a past field consumed by the delayed law.
4. Continue both histories on the same declared physical domain, or evaluate an independently derived next-acceleration functional when continuation is not yet available.
5. Report separation only if the same projected record differs after the step, or if the independently evaluated next-acceleration records differ at the common endpoint.
6. Abstain if root completeness, history coverage, continuation, branch selection, or evidence independence is unresolved.

For branching evolution, replace $E_{\Delta T}(H)$ by the complete continuation set or transition law. A snapshot-level relation or kernel exists only if its pushed-forward result is constant on every $Q$ fiber.

### Manufactured delayed-functional negative control

Set $T=0$, $h=1$, and let the scalar histories on $[-1,0]$ be

$$
x_{\pm}(\theta)
=
\pm a\,\theta^2(\theta+1)^2,
\qquad
a\ne0.
$$

For the instantaneous projection

$$
Q(x)=\bigl(x(0),x'(0)\bigr),
$$

both histories have

$$
Q(x_+)=Q(x_-)=(0,0).
$$

Define the manufactured delayed response

$$
\mathcal A_{1/2}(x)=x(-1/2).
$$

Then

$$
\mathcal A_{1/2}(x_+)=\frac{a}{16},
\qquad
\mathcal A_{1/2}(x_-)=-\frac{a}{16}.
$$

Thus the endpoint projection does not determine this delayed response. This is an exact mathematical negative control for the separating-pair instrument. It is not a Master-Equation solution, architrino acceleration calculation, or physical assembly witness.

Plainly: the two curves arrive at the same position and velocity but carry different earlier values. A rule that samples the earlier value distinguishes them immediately.

### Positive, negative, and independence controls

| Control | Construction | Required result | Claim boundary |
| --- | --- | --- | --- |
| Full-history positive control | $Q=\operatorname{id}_{\mathscr H}$ on a domain where evolution is defined. | Factorization succeeds with $\overline E=E$. | Checks the formal square, not physical adequacy. |
| Endpoint-local positive control | Use a response $\mathcal A_0(H)=F(Q(H))$. | Equal $Q$ images give equal responses. | Detects a test that falsely reports history dependence. |
| Manufactured hidden-history negative control | Use $x_\pm$ and $\mathcal A_{1/2}$ above. | Equal endpoint data, unequal delayed response. | Proves only instrument sensitivity to forgotten history. |
| Physical negative control | Two lawful, endpoint-matched $\mathbb{A}\mathbb{A}\mathbb{A}$ histories with independently certified root or next-acceleration separation. | Not supplied by this packet. | Required before any physical nonfactorization claim. |
| Same-implementation replay | Let the subject implementation generate and classify both sides. | No independent evidence claim. | At most tests deterministic plumbing. |

The physical separating pair must be classified by an analytic result or an instrument independent of the continuation and projection implementations under test. If one mathematical rule must be implemented on both sides, that rule requires a separate proof; parity then tests implementations rather than the rule.

## 5. Full-History Symmetry Covariance Square

Use only transformations already admitted by the Master Equation’s full-record action

$$
G_{\mathrm{fund}}=E(3)\times\mathbb R_{\mathrm{time}}.
$$

For $\gamma\in G_{\mathrm{fund}}$, transform the complete boundary object and every interval field: timestamp, full worldlines, velocities, persistent identities and polarities as admitted, causal-root and wake ledgers, environment and boundary records, provenance, and certification. Do not admit time reversal, scaling, polarity conjugation, arbitrary relabeling, or a snapshot-only transformation through this contract.

For any admitted history extension $\mathsf P_{ab}$, the two routes are $\mathcal B_{T_a}\xrightarrow{\mathsf P_{ab}}\mathcal B_{T_b}\xrightarrow{\gamma_b}\gamma\mathcal B_{T_b}$ and $\mathcal B_{T_a}\xrightarrow{\gamma_a}\gamma\mathcal B_{T_a}\xrightarrow{\mathsf P_{ab}^{\gamma}}\gamma\mathcal B_{T_b}$. The covariance obligation is

$$
\gamma_b\circ\mathsf P_{ab}
=
\mathsf P_{ab}^{\gamma}\circ\gamma_a.
$$

The square is typed here and inherits its physical validity from the owning full-history symmetry theorem. An implementation check requires independently computed invariants or an analytic transformed-record oracle; the same transform routine on both routes is not independent evidence.

Plainly: rotate, reflect, translate, or shift the time origin of the entire record before evolving, and the result must agree with evolving first and transforming the entire result. Moving only the visible endpoint is not a symmetry test.

## 6. Comparison With Simpler Tools

| Question | Simpler owner and result | Categorical addition | Decision |
| --- | --- | --- | --- |
| Does endpoint state determine a delayed response? | A state-dependent delay equation asks whether its history functional is constant on fibers of the endpoint-evaluation map. The manufactured pair answers no for $\mathcal A_{1/2}$. | The factorization square restates the same obstruction as failure of evolution to descend through $Q$. | No stronger theorem; keep the square as compact cross-lane vocabulary. |
| Can three accepted intervals be joined consistently? | Timestamped append-only records use ordinary compatible union, whose associativity gives the result. | Object typing makes every required cut field explicit and turns hidden compatibility into a type failure or abstention. | Modest material clarity; retain the ordinary history-extension category. |
| Which transformations are exact symmetries? | Group theory and the existing full-history action give the transformations and invariants. | The action groupoid records which complete history object each symmetry connects, and the covariance square compares symmetry with evolution. | Use group theory for calculation; retain groupoid language only when object typing helps. |
| Do history spaces deform or change root topology? | Functional analysis and topology own continuity, strata, degree, homotopy, and gluing questions. | No additional payoff demonstrated here. | Use the simpler tools. |
| How are causal hits connected? | A typed directed graph records emission, reception, identity, and root incidence. | Formal categorical paths would add no established physical composition. | Do not promote a causal-incidence category. |
| Are higher morphisms required? | Ordinary arrows, group actions, and commuting squares express every CT-004 obligation. | None demonstrated. | Do not introduce double or higher categories. |

The snapshot obstruction is therefore not uniquely categorical. The ordinary delay-system statement is shorter for proving non-Markov sufficiency: two histories with the same endpoint data yield different delayed responses. The categorical form earns a limited place because the same factorization square applies to coarse-graining and theory-bridge maps, while the boundary-object discipline makes composition failures auditable across physical owners.

Plainly: category theory did not discover a new memory effect. It gave us a reusable diagram for asking whether any proposed description preserves enough information, plus a strict rule for joining independently owned history records.

## 7. Continue-or-Pause Decision

CT-004 is complete at **bounded history-record contract grade**. The identity, compatible-union associativity proposition, reordered type-error control, manufactured endpoint-matched separating pair, positive controls, independence boundary, and full-history symmetry square are all explicit.

CT-004 remains incomplete at **physical history grade**. No lawful Master-Equation pair has been shown to share one proposed assembly snapshot and then separate under independently certified continuation or next acceleration. The candidate boundary record has not been proved sufficient or minimal, and no retained assembly or selected continuation domain has been established.

The continue-or-pause result is:

- pause category-specific physical expansion after this packet;
- retain the lane open at low intensity for philosophy-history and cross-theory bridge work that uses the factorization question to expose preserved or discarded information;
- reopen active physical work only when a named owner supplies a lawful separating pair, a recovery map needing a composition audit, or a concrete incompatibility that simpler delay, group, topology, or graph methods do not express adequately;
- keep monoidal, reaction, causal-incidence, double, and higher-category proposals deferred.

This decision is falsifiable. Resume active categorical development if a bounded physical case yields a genuinely clearer obstruction, reconstruction, compression, or bridge certificate through the categorical contract. Archive active development if future uses merely rename calculations already expressed more directly by their simpler owners.

## Ownership and Promotion Boundary

- The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) owns causal-root legality, delayed acceleration, history dependence, and admitted full-record symmetries.
- The [EOM evolution contract](../../app-solver/contracts/evolution-contract-v1.md) owns accepted evolution, history coverage, root completeness, append-only records, restart, and evidence status.
- The Braid Program and assembly lanes own retained carriers, stability, shielding, and branch identity.
- State-dependent delay-equation analysis owns existence, uniqueness, continuation, and regularity.
- Group theory, topology, and typed graphs remain the direct owners of their simpler questions.
- The Category Theory lane owns only this cross-lane typing, composition, factorization, and stop-decision contract.

No material in this packet is ready for promotion into `content/markdown/aaa`.
