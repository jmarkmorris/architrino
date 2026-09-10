# Category Theory for History, Composition, and Physical Description

## 1. The problem of preserving a process

A description can preserve the visible state of a system while losing information that its next step consumes. Category theory makes that distinction precise by identifying the objects a process accepts, the arrows representing allowed changes, and the conditions under which consecutive changes compose. Its useful question is whether a proposed translation preserves enough structure to reproduce the processes it claims to describe.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, this question begins with path history. An architrino is a primitive point transceiver with persistent identity and polarity, the signed property entering its interactions. It moves in the Euclidean void, a fixed three-dimensional space, with absolute time $T$ ordering events. Its causal wake is the expanding, source-provenanced disturbance emitted along its path. An assembly is an organized collection of architrinos; the Noether sea denotes ambient physical contents formed from neutral braid assemblies, rather than the spatial container. These are the [theory's starting commitments](../../../content/markdown/aaa/foundations/ontology.md), not deductions from category theory.

The [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md) assigns acceleration from past emissions whose wakes reach the receiving architrino. A causal root is an emission time satisfying that arrival condition. A causal-root ledger records which such roots and branches are included, excluded, or unresolved. A branch is a locally continued choice of root data on a declared domain. Consequently, a process boundary can require much more than the current positions and velocities: it can consume earlier paths, in-flight wakes, branch records, environmental inputs, and certification of what the retained record covers.

This manuscript develops three distinct kinds of result. Ordinary categorical definitions and the compatible-union and factorization arguments are derived mathematics on declared record types. Their application to complete physical histories remains a contract whose sufficiency and realization belong to the dynamical theory. A dated checkpoint/restart audit supplies measured implementation evidence that forgetting one controller variable can change the accepted record without changing the endpoint in the tested case. None of those results derives a retained assembly, a particle identity, an observer probability law, or an effective geometry.

The developed mathematical account is supported by the [minimal categorical contract](analysis/categorical-contract-and-ownership-map.md) and the [worldline-history morphism contract](analysis/worldline_history_morphism_contract.md). Proposals outside that minimum remain explicit alternatives. The manuscript's source dispositions and validation limits are kept in the [coverage record](analysis/manuscript-source-coverage.md).

The argument follows the information a process needs. After the categorical vocabulary, Chapter 3 constructs a boundary record and explains how exact chronological extensions compose. Chapter 4 asks when a smaller description can preserve prediction. Chapters 5 and 6 distinguish complete-record transformations from finite representations and their uncertainty; Chapters 7 and 8 apply those distinctions to recovery and reactions. The restart study in Chapter 9 gives a concrete implementation test, while Chapters 10 and 11 delimit comparison with existing theories and the unresolved physical questions. This organization supports scrutiny of each argument at its stated grade; it does not presume physical acceptance or promotion.

## 2. Objects, arrows, and translations

### 2.1 Typed processes and their composition

A category specifies objects and morphisms, or typed arrows, between them. An arrow $f:A\to B$ starts at object $A$ and ends at object $B$. Whenever $f:A\to B$ and $g:B\to C$ are admitted, their composition $g\circ f:A\to C$ means first $f$, then $g$. Every object has an identity arrow that leaves it unchanged. The defining laws are

$$
h\circ(g\circ f)=(h\circ g)\circ f,
\qquad
f\circ\operatorname{id}_A=f,
\qquad
\operatorname{id}_B\circ f=f.
$$

Associativity changes how one fixed sequence is grouped; it does not change its order. If $h:C\to D$, both parenthesizations mean the sequence from $A$ through $B$ and $C$ to $D$. The expression $f\circ g$ can be undefined because its boundary types do not match. Even where both orders exist, associativity does not assert that they agree. Commutativity, the agreement of reordered operations, is a separate property.

Morphisms need not be ordinary functions. Their additional names express precise properties: an endomorphism starts and ends at one object; an isomorphism has a two-sided inverse; an automorphism is an invertible endomorphism. A monomorphism permits cancellation on the left, and an epimorphism permits cancellation on the right. Those cancellation definitions should not be silently replaced by injectivity or surjectivity in an arbitrary category. A homeomorphism is an isomorphism of topological spaces, preserving continuity in both directions; a diffeomorphism does the same for smooth spaces and differentiable maps.

### 2.2 Structure-preserving translations

A functor $F:\mathcal C\to\mathcal D$ translates objects and arrows between categories while preserving identity and composition:

$$
F(\operatorname{id}_A)=\operatorname{id}_{F(A)},
\qquad
F(g\circ f)=F(g)\circ F(f).
$$

Thus translating a whole process must agree with translating its parts and composing the translated parts. A natural transformation compares two functors by assigning a comparison arrow at every source object and requiring those comparisons to commute with the source arrows. The condition makes the comparison consistent across processes, rather than merely matching isolated outputs.

A groupoid is a category in which every arrow is invertible. A monoidal category additionally describes systems considered together through a product operation and its coherence laws. A pro-object is a compatible inverse system of approximations: more detailed records map consistently to less detailed ones. These are established mathematical constructions. Their existence as abstract constructions does not establish that a particular physical system supplies their objects or operations.

> Claim grade: derived for these definitions and their distinction between regrouping and reordering. A proposed physical example fails the definition if matching object types conceal an additional composition condition or if legal regrouping changes the arrow. The physical interpretation therefore requires its own admissibility proof.

## 3. History records and chronological composition

The object and the composition rule must be developed together: the record at a cut determines what the next extension may consume. The construction begins with the delayed arrival condition, specifies the candidate boundary fields, and then proves the exact joining laws on that declared record type. Physical sufficiency remains a separate question throughout.

### 3.1 The delayed arrival condition

At reception time $T_r$, a transmitter's emission time $T_t$ satisfies

$$
\left\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\right\|
=
c_f(T_r-T_t),
\qquad
T_t<T_r.
$$

Here $\mathbf X_r$ and $\mathbf X_t$ are receiver and transmitter positions in the Euclidean void, and $c_f$ is the primitive wake propagation speed. The equation compares the distance from the past emission point to the current receiver with the distance the wake has traveled. It selects data from the transmitter's earlier path. Numerical examples use normalized wake-speed units with $c_f=1$; the symbolic equation retains the speed explicitly.

The instantaneous projection, denoted $X(T)$ when referring to the complete collection of instantaneous data, must be distinguished from the canonical history-bearing state $S(T)$. Bold $\mathbf X_i(T)$ denotes the position of one architrino. Endpoint information alone does not reconstruct an arbitrary consumed past path. The stronger claim that a particular physical assembly admits two lawful endpoint-matched histories with different futures still requires an independently certified witness; the abstract example in Section 4.2 does not supply it.

### 3.2 Boundary fields, equality, and sufficiency

Fix a declared domain $\mathcal D$, a cut $T$, a finite participating identity set $R$, and the represented interval $I_T\subseteq(-\infty,T]$. The candidate boundary-history record is

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

The cut, identity set, and polarity assignment $q$ establish which objects and times the record describes. The remaining components divide its continuation-relevant information as follows.

| Component | Information carried |
| --- | --- |
| $\mathcal H_T$ | Coupled position-and-velocity histories for all represented identities. |
| $\mathcal C_T$ | Active, inactive, unresolved, continued, born, merged, split, and excluded causal-root and branch records consumed at the boundary. |
| $\mathcal W_T$ | In-flight wakes and history-functional records consumed by later continuation or conservation accounts. |
| $\mathcal N_T$ | Noether sea or other environmental interface, with explicit empty or unresolved status where appropriate. |
| $\mathcal E_T$ | Horizon, omitted-tail, collision, caustic, boundary, and environmental-port conditions. A caustic is a singular root geometry requiring its own treatment. |
| $\chi_T$ | Provenance, representation, uncertainty, certification, evidence grade, and abstention metadata. Abstention means that the available record does not license the requested conclusion. |

This is a coverage contract, not a theorem that the physical state is minimal or sufficient. A blank component cannot mean “irrelevant” without justification. A field can be removed only if a reconstruction or predictive-sufficiency result establishes that later processes do not lose necessary information. A cached derived field must name its source and consistency rule; caching must not create a second physical degree of freedom.

Exact equality requires agreement of every represented and physically consumed field under its declared representation. Equality does not discard identities, provenance, root labels, wakes, or omitted-tail obligations. A proved symmetry can relate distinct records by an isomorphism. A coarse map can identify them for an effective purpose. Both relations differ from exact equality.

Losslessness has two requirements. Reconstructability means recovering the original substrate record from the encoding, including persistent identities when they distinguish histories. Predictive sufficiency means that equal encoded states give the same complete admitted future continuations, or the same transition law, on the declared domain. An encoding can fail one requirement while meeting a restricted version of the other. Mathematical equivalence of categories alone does not settle either physical requirement.

### 3.3 Coupled extensions and the empty identity

A single worldline segment is generally too small a process record: its acceleration depends on transmitters and possibly on shared wakes or environment. The proposed arrow therefore carries a coupled history increment and its boundary data. For $T_a\le T_b$, write

$$
\mathsf P_{ab}:\mathcal B_{T_a}\longrightarrow\mathcal B_{T_b}
$$

with the explicit record

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

The increment components contain newly accepted interval records. The source and target references allow the boundary to be checked. Unchanged prehistory can be stored once and referenced persistently, including through reconstructible hash links. Sharing storage is not permission to discard physical history. A lawful arrow inherits its actual evidence grade from the producing owner: prescribed or conditional history, reference calculation, display output, and accepted evolution remain distinct.

The identity is exactly the empty extension

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

It neither appends history nor changes a ledger or grade. A zero-duration operation that reclassifies a root or weakens a certificate is a different operation. The left and right identity laws follow because compatible union with the empty interval changes no component.

### 3.4 Compatible union and exact associativity

The identity law checks the empty extension; associativity checks how a fixed nonempty chronological sequence is joined. Both depend on the same exact boundary type, so a record omitted from that type cannot be repaired by a formal composition symbol.

Two arrows compose only when the first exact target equals the second exact source. Their interval components join by timestamp-preserving compatible union: no nonduplicate record is removed, no accepted record is revised, identities remain fixed, and certificate combination is associative and no stronger than the weakest required input. If an extra compatibility condition must be checked after the boundary objects match, that condition belongs in the object type.

For three consecutive intervals with exact matching boundaries,

$$
(\mathsf P_{23}\circ\mathsf P_{12})\circ\mathsf P_{01}
=
\mathsf P_{23}\circ(\mathsf P_{12}\circ\mathsf P_{01})
=
\mathsf P_{03}.
$$

**Proof.** Both parenthesizations retain the same ordered partition $(T_0,T_1]\cup(T_1,T_2]\cup(T_2,T_3]$ and the same timestamped union in every component. Exact boundary equality removes only duplicate boundary references. Associative certificate combination yields the same final certificate, and the no-revision rule preserves identical earlier records. Source, target, interval data, provenance, and certification therefore agree, which is exact arrow equality.

> Claim grade: derived on the declared append-only record domain. The result is conditional on exact cuts, compatible union, associative certificate handling, and preservation of accepted history. A legal parenthesization that changes a timestamped field or certificate falsifies this proposed composition contract. No existence, uniqueness, global continuation, causal-root completeness, or retained-assembly theorem follows from the record algebra.

Reordered expressions such as $\mathsf P_{12}\circ\mathsf P_{23}$ are ordinarily ill-typed. A mismatched boundary, root branch, or certificate requires abstention, rather than a silent repair. These negative controls separate chronology from associativity. Ordinary fixed-interval path concatenation can also change parameterization under regrouping; using actual absolute-time intervals avoids hiding such rescaling inside this exact construction.

## 4. The obstruction to forgetting predictive history

Exact record composition leaves open whether a smaller state can support the same declared predictions. The relevant test compares histories that the proposed reduction identifies. A single separating pair can refute closure; a successful isolated comparison cannot establish it for an entire history domain.

### 4.1 Factorization through a reduced state

Let $\mathscr H$ be a declared full-history domain on which a deterministic continuation $E_{\Delta T}$ is defined. Let $Q:\mathscr H\to\mathscr Z$ retain a proposed reduced state. A fiber $Q^{-1}(z)$ is the set of histories giving the same reduced state $z$. For a self-contained reduced evolution $\overline E_{\Delta T}$, the required equation is

$$
Q\circ E_{\Delta T}
=
\overline E_{\Delta T}\circ Q.
$$

The equation says that evolving the full record and then reducing it agrees with reducing first and evolving the reduced record. Its central requirement is constancy on fibers: all histories identified by $Q$ must have the same reduced future.

#### 4.1.1 The separating-pair lemma

**Separating-pair lemma.** Suppose two histories obey

$$
Q(H_1)=Q(H_2)
$$

but

$$
Q\!\left(E_{\Delta T}(H_1)\right)
\ne
Q\!\left(E_{\Delta T}(H_2)\right).
$$

Then no reduced function can satisfy the commuting equation on that domain. **Proof.** A function of the equal values $Q(H_1)$ and $Q(H_2)$ must give equal outputs. The commuting equation would identify those outputs with the two unequal reduced futures, a contradiction.

> Claim grade: derived abstract obstruction. The falsifier for a claimed closed reduction is one admitted pair in a common fiber with distinct projected futures. Applying the lemma to physical histories requires lawful admissibility and independent classification of the separating response; history-dependent notation alone is not that witness.

#### 4.1.2 Branching domains and transition laws

On a branching domain, a full state can have a set of admitted continuations. A transition law additionally assigns probabilities, if independently supplied. The reduced relation or law must be constant after pushing those complete sets or laws through $Q$. Selecting a convenient branch independently on each side does not test this obligation, and counting alternatives does not assign probabilities.

### 4.2 A manufactured exact negative control

The worldline-history contract tests whether the proposed diagnostic notices discarded history through a scalar mathematical example. Set $T=0$, $h=1$, and take

$$
x_{\pm}(\theta)
=
\pm a\,\theta^2(\theta+1)^2,
\qquad
a\ne0.
$$

The parameter $\theta$ runs over the retained interval $[-1,0]$. The projection $Q(x)=(x(0),x'(0))$ reads endpoint position and derivative. Both curves give $(0,0)$ because the polynomial has a double zero at the endpoint. A manufactured delayed response reads the midpoint of the past interval:

$$
\mathcal A_{1/2}(x)=x(-1/2).
$$

Direct substitution yields

$$
\mathcal A_{1/2}(x_+)=\frac{a}{16},
\qquad
\mathcal A_{1/2}(x_-)=-\frac{a}{16}.
$$

The endpoint projection cannot determine that response. This is a derived negative control for a delay-functional instrument, not a Master-Equation solution or an architrino acceleration calculation. The symbol $\mathcal A_{1/2}$ names only this manufactured response. The example is falsified if the endpoints fail to match or the displayed responses fail to separate.

The control set also needs a full-history positive case, $Q=\operatorname{id}$ where evolution exists, and an endpoint-local positive response $\mathcal A_0(H)=F(Q(H))$, for which equal projections necessarily give equal responses. The latter detects a test that spuriously reports memory dependence. The physical negative-control slot remains unsupplied: it requires two lawful endpoint-matched histories and independent root, next-acceleration, or later projected separation. Same-implementation replay tests repeatability or plumbing and supplies no independent physical acceptance.

### 4.3 Markov sufficiency and speed restrictions

A state description is Markov-sufficient when its present value contains everything needed for its declared future transition law. Determinism instead concerns whether a complete state selects one future; causality concerns allowed past-supported influences; single-root behavior concerns how many emission events contribute. None of those three statements alone establishes Markov sufficiency in instantaneous variables.

#### 4.3.1 Geometric restrictions on the consumed past

The [field-speed comparison](../field-speed-ceiling/brainstorming.md#markov-sufficiency-across-master-equation-variants) distinguishes future-only caps, universal non-strict bounds, universal strict bounds, and uniform gaps. A future cap leaves older wakes in flight. A non-strict cap allows tangent or degenerate equality cases. Strict sub-$c_f$ motion excludes ordinary noncoincident self-hits on the consumed interval and makes the partner-root map monotone, but a unique partner root still selects a past transmitter event. Pointwise strictness permits arbitrarily poor conditioning near $c_f$; a uniform positive speed gap supplies a stronger transversality bound. These geometric restrictions do not reconstruct the missing transmitter history. Removing self-hits also materially changes any reasoning that consumes them.

#### 4.3.2 History-state closure and the selector problem

A history-state representation includes the consumed past as part of the present state, for example

$$
\mathbf Y_T(\theta)=\mathbf Y(T+\theta),
\qquad
\theta\in[-h,0],
$$

together with required root, wake, branch, and boundary records. Here $\mathbf Y$ collects position and velocity data, and $h$ is the declared memory horizon. This remains a conditional Markov formulation on a generally infinite-dimensional space: the window must suffice and the evolution must be well posed with a selected continuation. An independently evolving wake or medium state could replace a history functional only after its emission, propagation, reception, boundary law, and equivalence to the delayed account are established.

There is also a separate selector problem. In the proposed field-speed-ceiling exact-mirror delayed-ignition family, the linked analysis records multiple continuations sharing the same preceding labeled history without an activation-time rule. Adding more past data does not by itself supply that missing rule. This statement concerns the proposed ceiling response, not a newly derived defect of the canonical law. A stochastic formulation would require an independently justified probability law over continuations. Category theory can type alternatives but cannot select them.

One next-acceleration mismatch can refute instantaneous sufficiency on a certified pair. Agreement at one step cannot prove sufficiency, because an omitted wake can arrive later. A physical test must declare the full history domain, projection, branch selection, observable family, and continuation interval, then abstain whenever root completeness, admissibility, or independence is unresolved.

## 5. Symmetry, topology, and complete-record identity

Symmetry and topology describe transformations and invariants, but the permitted transformations differ. This chapter first treats proved actions on complete histories and then distinguishes them from continuous deformations and spatial topology. The distinction determines what an invariant can classify and prevents a formal equivalence from carrying an unsupported dynamical conclusion.

### 5.1 Full-history symmetries

A reversible symmetry and a lawful extension answer different questions. A symmetry changes an entire record through a proved transformation; an extension adds chronological history and is generally not reversible. A restriction discards information. Keeping these arrow classes separate prevents an effective identification from being mistaken for substrate identity.

The [full-history symmetry theorem](../../../content/markdown/aaa/dynamics/master-equation.md#fundamental-symmetry-group) admits

$$
G_{\mathrm{fund}}=E(3)\times\mathbb R_{\mathrm{time}}.
$$

The Euclidean isometry group $E(3)$ contains spatial translations and orthogonal transformations, including reflections; the other factor shifts the absolute-time origin. Distances and time differences remain unchanged, and the full line-of-action acceleration record transforms covariantly. The categorical contract inherits this theorem rather than deriving new symmetries from its notation.

For a group $\Gamma$ acting on a full-history space $\mathscr H$, the action groupoid records a history and the particular transformation taking it to another history:

$$
\mathscr G=\Gamma\ltimes\mathscr H\rightrightarrows\mathscr H.
$$

Its arrows retain more information than a flattened orbit space, which merely groups symmetry-related objects. In particular, it retains the stabilizer

$$
\operatorname{Stab}_{\Gamma}(H)
=
\{\gamma\in\Gamma:\gamma\cdot H=H\}.
$$

The stabilizer consists of transformations that leave the complete history fixed. It matters when a later mapping consumes those self-symmetries. Likewise, a labeled-history return is exact return of the represented identities and records; quotient return is return only after an allowed identification. A deduplication procedure must declare which of these it uses.

An admitted transformation carries the full paths, polarities, root identities, wakes, environment, boundaries, and certification. Persistent-label permutations are exact symmetries only on records where the complete provenance and causal-root identities transform consistently. Time reversal does not preserve the declared past-supported law. Polarity conjugation, scaling, and additional internal transformations are not supplied by the accepted group action. Neither similar endpoints nor equal effective outputs establish such a symmetry.

### 5.2 Covariance of a chronological extension

For an admitted interval arrow $\mathsf P_{ab}$, full-history covariance is expressed by

$$
\gamma_b\circ\mathsf P_{ab}
=
\mathsf P_{ab}^{\gamma}\circ\gamma_a.
$$

Here $\gamma_a$ and $\gamma_b$ transform the source and target records, and $\mathsf P_{ab}^{\gamma}$ is the transformed history increment. Transforming the input and then extending must agree with extending and then transforming the output. The physical theorem is inherited; an implementation test still needs independent invariants or an analytic transformed-record reference. Using the same transformation routine on both routes does not independently validate that routine.

> Claim grade: derived mathematics for action groupoids and stabilizers; inherited derived symmetry for the declared full-history action. A transformed complete record that violates the causal condition or changes a consumed invariant falsifies a proposed symmetry on that domain. No symmetry orbit establishes retention, stability, particle identity, or probability.

### 5.3 Groups, representations, and deformation paths

Group theory is the direct tool for reversible transformations. A group $G$ is a one-object category $\mathbf BG$, with group elements as arrows and multiplication as composition. A representation assigns linear transformations to those arrows, expressed categorically as $\rho:\mathbf BG\to\mathbf{Vect}$, where $\mathbf{Vect}$ is the category of vector spaces and linear maps. General categories become useful when multiple boundary types or noninvertible operations must be related.

Topology supplies neighborhoods, continuity, and deformation. The fundamental groupoid $\Pi_1(X)$ of a space $X$ has points as objects and endpoint-fixed homotopy classes of paths as arrows; a homotopy continuously deforms one path into another while retaining its endpoints. Its automorphisms at a point recover the fundamental group:

$$
\pi_1(X,x)=\operatorname{Aut}_{\Pi_1(X)}(x).
$$

A symmetry arrow need not be a deformation path, and a deformation need not be a symmetry or a lawful evolution. For delayed dynamics the [regularized finite-memory scaffold](../../../content/markdown/aaa/dynamics/master-equation.md) uses

$$
\mathcal H
=
C^1\!\left([-h,0],\mathbb R^{6N}\right).
$$

This is the space of continuously differentiable position-and-velocity histories for $N$ architrinos over a window of length $h$. The alternative $W^{1,\infty}([-h,0],\mathbb R^{6N})$ requires bounded weak first derivatives; absolutely continuous history classes are another possible refinement. The appropriate regularity is part of the theorem's hypotheses. The source's finite-branch, distance-floor, and transversality assumptions are not supplied by choosing a convenient space.

### 5.4 The distinct referents of topological invariants

Several invariants can coexist without sharing a referent. History-space topology concerns proximity and deformation of histories; spatial knot or link topology concerns embedded curves under declared closure conventions; causal-root topology concerns births, folds, signed degrees, and branch walls. Exchange-configuration loops describe exchanging two assemblies but do not alone establish quantum statistics or holonomy, the transformation accumulated around a closed path. An orbifold or differentiable-stack presentation retains quotient stabilizers under further smoothness and action assumptions; an arbitrary topological groupoid does not automatically have that stronger structure. The brainstorming source reports priority-side examples where root counts remain fixed as spatial support changes knot type; that particular external example is retained as an unverified supporting lead in the coverage record, rather than used here as independent evidence.

A Noether braid's physical name does not certify an Artin braid class, a mathematical class of strand exchanges under specific endpoint and deformation conditions. A visual braid pattern also does not establish protected knotting, framing, chirality, retention, or stability. Every claimed invariant needs its source space, admissible transformations, and validity domain.

## 6. Finite records, restriction, and uncertainty

A finite representation makes a different change from a complete-history symmetry: it retains less information. Its adequacy depends on what was omitted, how uncertainty is carried, and which conclusions remain licensed. The following restriction algebra specifies consistency between representations; it does not establish that the discarded past is physically irrelevant.

### 6.1 Finite representations and compatible restriction

Finite computation represents bounded history and resolution. The candidate finite record

$$
B_{H,N}
=
\left(
P_N\mathbf X|_{[T_0-H,T_1]},
\mathcal U_{H,N},
\beta_H,
\mathcal N_{\mathrm{sea},H},
\chi_{H,N}
\right)
$$

contains a finite-resolution path representation $P_N$, reconstruction uncertainty $\mathcal U_{H,N}$, an omitted-tail contract $\beta_H$, a represented sea interface, and certification. In this formula $H$ is a history depth and $N$ is a resolution index; they are local presentation parameters, not the history object or particle count used elsewhere.

For detail indices $\alpha\preceq\beta\preceq\gamma$, compatible restriction maps obey

$$
\rho_{\alpha\to\alpha}=\operatorname{id},
\qquad
\rho_{\beta\to\alpha}\circ\rho_{\gamma\to\beta}
=
\rho_{\gamma\to\alpha}.
$$

Reducing directly must agree with reducing through an intermediate record. Every restriction carries its changed uncertainty, tail conditions, lost causal-root reach, and abstention boundary. If discarded history can change a downstream record, the output must enclose that uncertainty or decline the claim. The Braid Program owns the executable atlas and restriction data; the categorical statement is only the shared interface.

### 6.2 Uncertainty, truncation, and predictive claims

Epistemic uncertainty is a family of possible exact histories. Truncation stores only part of a history. Physical coarse-graining asserts that certain distinctions do not matter for specified effective predictions. These three operations can use related mathematical language while imposing different proof burdens. A coherent inverse system does not by itself prove a physical limiting history or predictive closure.

### 6.3 Compatibility of extracted root and acceleration records

Candidate extraction functors $F_{\mathrm{root}}$ and $F_{\mathrm{acc}}$ map full histories to typed causal-root and delayed-acceleration records. Besides preserving identity and composition, they would have to obey induced symmetry and restriction relations such as

$$
F_k(\gamma\cdot B)=\gamma_k\cdot F_k(B)
$$

and

$$
F_k\!\left(\rho_{\beta\to\alpha}B_\beta\right)
=
\rho^{(k)}_{\beta\to\alpha}F_k(B_\beta).
$$

Here $k$ selects root or acceleration records, $\gamma_k$ is the independently specified target action, and $\rho^{(k)}$ restricts the target record. These remain proposed naturality and compatibility tests. Independent positive, negative, stabilizer, and ambiguity controls are required; forcing ambiguity into a definite answer or using the same extractor on both sides defeats the intended test.

## 7. Coarse descriptions and recovery between levels

Restriction records information loss; a closed coarse description must additionally justify why that loss is harmless for its declared predictions. Recovery between physical levels requires still more: independently supported carriers and mapping rules. The distinction separates an exact quotient, a bounded approximation, and a proposed physical bridge.

### 7.1 Exact quotients and bounded approximate descriptions

An exact coarse quotient identifies histories or arrows only through an equivalence compatible with composition. If $f\sim f'$ and $g\sim g'$ are compatible representatives, the quotient requires $g\circ f\sim g'\circ f'$. Predictive closure additionally imposes Section 4.1's fiber condition. The permission to define a quotient supplies neither of these physical conclusions automatically.

For an approximate description, selected continued histories can instead satisfy

$$
d_{\mathrm{eff}}
\left(
Q(E_1H_1),
Q(E_2H_2)
\right)
\le\epsilon
$$

with a predeclared effective distance $d_{\mathrm{eff}}$, tolerance $\epsilon$, continuation-matching rule, observable family, and validity domain. The processes $E_1$ and $E_2$ are the admitted matched continuations. An erased distinction that changes an included observable beyond tolerance refutes closure on that domain. Lax functoriality, in which composition is related by specified comparison maps rather than strict equality, is a coherence language; it does not supply the numerical bound.

### 7.2 The substrate-to-observer recovery chain

The prospective physical chain is

$$
\mathscr H_{\mathrm{substrate}}
\longrightarrow
\mathscr A_{\mathrm{assemblies}}
\longrightarrow
\mathscr N_{\mathrm{sea}}
\longrightarrow
\mathscr O_{\mathrm{observer}}.
$$

Its successive descriptions concern complete substrate histories, assemblies, medium behavior, and observer-accessible records. Each arrow requires a physical mapping rule, preserved structure, approximation regime, and independent falsifier. No substrate-to-observer recovery functor is established by the lane's record contracts. A compact observer state may need a memory kernel, an additional environment variable, or an enlarged state if the discarded history remains predictive.

Exact full-history isomorphism, symmetry-orbit membership, effective equivalence, and equivalence between existing theories are separate relations. An invariant coarse map obeys $Q(\gamma\cdot H)=Q(H)$; an equivariant one obeys $Q(\gamma\cdot H)=\gamma_{\mathrm{eff}}\cdot Q(H)$ for a declared target action. Stabilizers must survive wherever the target consumes them. Equal recovery outputs do not prove that their source histories are substrate-isomorphic.

### 7.3 Comparing direct recovery with staged translation

Suppose two effective theories receive candidate functors from a common retained history category,

$$
F_A:\mathscr H_{\mathrm{ret}}\longrightarrow\mathscr T_A,
\qquad
F_B:\mathscr H_{\mathrm{ret}}\longrightarrow\mathscr T_B.
$$

A comparison map $M:\mathscr T_A\to\mathscr T_B$ gives the proposed comparison

$$
\eta:F_B\Longrightarrow M\circ F_A.
$$

The natural transformation $\eta$, or a declared bounded replacement, compares direct recovery with staged translation on the same retained histories and processes. A diagram stipulated to commute is only an obligation map. An evidential test must independently tie both routes to the physical records, avoid per-observable retuning, and measure the declared residual.

> Claim grade: guessed physical recovery architecture and inferred methodological usefulness. A lawful separating pair beyond the declared tolerance falsifies a proposed reduced state or bridge. A retained carrier, mapping rule, and independent cross-process comparison are still required before any recovery claim.

## 8. Causal incidence, assembly combination, and reactions

Physical processes impose composition questions at several scales. Formal paths through causal hits, parallel combinations of assemblies, and successive reactions each require their own admissibility conditions. The reaction identity account supplies concrete routing data, while the preceding history contract explains why routing alone cannot establish lawful event composition.

### 8.1 Formal causal paths and assembly independence

Emission events, reception events, and certified causal hits already define a typed directed graph. Its edges can carry transmitter and receiver identities, delay, polarity product, root Jacobian, direction, and acceleration contribution. A free category on that graph adds formal paths by concatenating edges. Such a path does not establish a new physical interaction: successive receiver-local hits do not become one transitive causal hit merely because the graph has a route. A physical composition law or a counterexample to a proposed one belongs to the Master Equation's causal semantics.

Assembly juxtaposition has an analogous limitation. A disjoint identity inventory does not prove independence, because delayed cross-wakes and shared environment can couple the proposed parts. A monoidal product, describing parallel combination, requires an independence or controlled-coupling theorem. Operadic substitution, in which one assembly is inserted into a designated slot of another, likewise requires lawful boundary conditions. Where these conditions fail, explicit environmental ports and cross-coupling records must remain in the composite description.

### 8.2 Reaction boundaries and identity routing

The [reaction ledger](../../../content/markdown/aaa/validation/reaction-ledger.md#provenance-preserving-polarity-inventory) supplies a definite starting datum: a closed event routes participating persistent identities by a polarity-preserving bijection,

$$
\Pi_{\mathsf e}:R_{\mathsf e}^{\mathrm{in}}\longrightarrow R_{\mathsf e}^{\mathrm{out}},
\qquad
q_{\Pi_{\mathsf e}(a)}=q_a.
$$

The sets include explicitly recruited or returned reservoir contents. An observer-level net charge balance is weaker than this identity account. A proposed reaction boundary is

$$
\mathsf X
=
\left(
R,\pi,\{\mathfrak B_k\}_{k\in\pi},\mathcal E_{\partial}
\right),
$$

where $\pi$ partitions participating identities into assemblies and environmental blocks, $\mathfrak B_k$ carries each block's retained branch and provenance data, and $\mathcal E_{\partial}$ describes the boundary and sea ports. A reaction arrow must supply a lawful history segment in addition to its routing bijection. Lawful composition would require

$$
\Pi_{\mathsf e'\circ\mathsf e}
=
\Pi_{\mathsf e'}\circ\Pi_{\mathsf e}.
$$

Matching the finite sets is insufficient: the second event must consume the first event's full branch, wake, medium, and boundary output without revising accepted history.

### 8.3 Conditional count preservation and its physical limits

Let $\mathbf{FinSet}^{\pm}$ be the groupoid of finite polarity-labeled identity sets and polarity-preserving bijections. A candidate forgetful functor is

$$
U:\mathscr{Rxn}\longrightarrow\mathbf{FinSet}^{\pm},
\qquad
U(\mathsf X)=(R,q|_R),
\qquad
U(\mathsf e)=\Pi_{\mathsf e}.
$$

If the reaction category $\mathscr{Rxn}$ and this functor are established on a closed domain, polarity counts are preserved because a bijection pairs each identity with exactly one output of the same polarity. This conditional corollary does not independently derive fixed identity ontology, physical event closure, or observer charge mapping.

Effective lepton, baryon, color, and species labels are classifications used in observer-level particle descriptions. Whether they factor through a branch-sensitive quotient finer than polarity inventory is an open question; a nonfactorization theorem is not presumed. A separating reaction pair would reject an insufficient quotient. The source discussion names a fully typed free-neutron beta-reaction morphism as a possible bounded example, but supplies no completed physical event.

Pair production, in effective language, cannot mean that substrate identities arise from nothing. Its substrate account requires explicit source or Noether sea ports. Structured cospans, which describe open systems through a common interior with input and output interfaces, are only one possible formalism. Ordinary explicit environment objects remain the smaller starting point. Similarly, a finite continuation family becomes a family of reaction arrows only after a classifier establishes common typed boundaries and physical channel meaning. Its cardinality alone is neither a count of reaction channels nor a branching-ratio law.

> Claim grade: inferred candidate reaction architecture, with derived count preservation conditional on lawful closure and the stated bijections. A missing reservoir identity, incompatible history boundary, or failure of routing composition falsifies the proposed process description. Reaction, monoidal, operadic, and higher structures remain outside the accepted minimum.

## 9. A measured restart boundary

The factorization test has a concrete implementation use even while the physical history-sufficiency question remains open. A restart record promises to preserve the state consumed by later solver decisions. The historical negative control and its later bounded repair test that promise against complete accepted records, making the chosen comparison observable as important as the saved input.

### 9.1 The historical restart object and omitted controller state

The [26 August 2026 restart audit](evidence/ct004-eom-restart-factorization-audit.md) applies the factorization question to an implementation. Its complete state $\mathscr F_T$ included accepted path and joint histories, immutable controls, accepted/rejected counts, and all controller variables used by the next step. The reduced restart object was the pair of a checkpoint and a compatible request template, because resume reconstructed its request from both. For that version,

$$
Q_{\mathrm{restart}}:\mathscr F_T\longrightarrow\mathscr R_T,
\qquad
\mathscr R_T
=
(\text{checkpoint v6},\ \text{compatible request template}).
$$

The required output comparison retained the complete accepted history and discrete decisions. A discrete decision is the solver's choice to accept a step, change its width, or take another specified controller action. Matching only an endpoint would test a weaker property.

The checkpoint preserved histories, accepted time, current step width, certificate-cost cooldown, joint fallback mode, counts, and fingerprint-bound request controls. The audit found that the adaptive controller's consecutive-growth-headroom count was omitted. Its two-success rule doubled the step width after two sufficiently easy accepted steps; restarting initialized the count to zero and thereby delayed growth.

### 9.2 Exact-cut control and complete-record separation

The audit's existing non-growing checkpoint round-trip test passed. A focused public-API probe compiled against the rebuilt EOM solver library then used a one-path constant retained history with $c_f=1$, minimum and initial width $0.01$, maximum width $0.04$, and adaptive growth enabled. The full request covered $T=2$ through $2.08$, with the comparison route stopped and restarted at $2.01$. Its measured accepted partitions were

```text
uninterrupted: 0.01, 0.01, 0.02, 0.02, 0.02
restart route: 0.01 | 0.01, 0.01, 0.02, 0.02, 0.01
```

The cut fingerprints agreed; final complete-history fingerprints differed. The recorded segment counts were eleven and thirteen. The inertial endpoint remained equal. The negative finding therefore concerns complete accepted-record and discrete-decision parity in that historical control, not a physical trajectory error, checkpoint corruption, loss of accepted cut values, or a Master-Equation defect. Raw fingerprint tokens and reproduction details remain in the evidence packet.

> Claim grade: measured historical implementation result, reported by the named public-API probe and checkpoint positive control in the evidence packet; the omitted counter supplied the code-level explanation. The appropriate falsifier is restoration or exact reconstruction of the counter followed by matching discrete decisions and complete accepted records in the same control. This manuscript does not rerun the historical executable.

### 9.3 Repair evidence and its remaining boundary

The [27 August solver-owner record](../app-solver/work-log.md#2026-08-27--adaptive-growth-memory-checkpoint-repair) reports a bounded repair. The exact counter passes from request through certificate and checkpoint encoding to resume; missing-state legacy formats are rejected. The record identifies checkpoint schema v7 and reports 36 tests plus an independent 366-check audit against a predeclared two-success recurrence and constant-path closed form. Cuts after one, two, and four accepted steps preserve the accepted-history tokens, final fingerprints, step decisions, and controller state in those controls.

A current source inspection of the resume assignment and evolution initialization confirms that the counter is transferred into the resumed request and consumed by the controller. This is code-reading evidence, not a fresh execution of the reported audit. The historical omission must therefore not be described as an uncorrected current defect.

The repair record retains one difference: the first resumed step reuses two start snapshots where uninterrupted execution reuses three, so resume performs one additional fresh calculation at that boundary. Its acceptance concerns history and decision parity, not identical performance telemetry, a cost improvement, arbitrary controller modes, or general restart sufficiency. Crash-surviving campaign state, retained-history certification, and long-horizon orchestration remain separate solver obligations.

### 9.4 What the restart application establishes

The categorical contribution is methodological. It established the correct boundary object, distinguished endpoint equality from complete-record equality, and asked whether every future-consumed distinction crossed that boundary. A state-machine or serialization audit can express the same missing variable. The example supports practical reuse of the factorization question without establishing a uniquely categorical physical theorem.

## 10. Comparison with existing theories

### 10.1 Representations and quantum process descriptions

The comparison structures in the source synthesis are mathematical organizing languages. The Standard Model describes observed particle families and their interactions; its representation categories organize multiplets, or groups of states transformed together, and intertwiners, or maps respecting those transformations. Gauge groupoids organize equivalent descriptions under gauge changes. Such organization does not derive why a particular physical symmetry group, representation inventory, or coupling is realized. The global form of a gauge group, including possible identifications by a subgroup, must also be specified when physically consumed; a local symmetry-algebra name alone does not settle it.

Quantum theory organizes amplitudes and probabilities for observations. Hilbert spaces, vector spaces equipped with inner products and completeness, and operator or completely positive map categories describe processes and their composition. A dagger operation represents an adjoint; monoidal structure represents a declared composite-system product. The wires-and-boxes diagram convention depicts systems as wires and processes as boxes, but does not create independence, amplitudes, probability rules, or measurement records. Nor does diagrammatic resemblance establish no-signaling constraints: the requirement that changing a measurement setting in one separated part of an experiment cannot change the outcome statistics observed locally in the other. Classical copying structure is an additional specified structure, not permission to copy arbitrary quantum states by diagrammatic resemblance.

### 10.2 Geometric and field-theory descriptions

General relativity describes gravity through observer-level Lorentzian geometry, which assigns spacetime intervals with distinct temporal and spatial signs. Model and metric groupoids organize covariance and equivalence; embeddings organize relationships among regions. Quantum field theory associates field or observable structures with regions, and functorial examples translate region, spacetime, or bordism data into algebras or vector spaces. A bordism relates boundaries through an intervening manifold. These descriptions clarify covariance, locality, and gluing but do not select an empirical field theory or make its geometry fundamental within $\mathbb{A}\mathbb{A}\mathbb{A}$.

### 10.3 Structural comparison and constitutive explanation

These are comparison-level summaries retained from the lane. The detailed source-backed case studies remain an explicit research gap, not completed evidence that category theory caused either a theory's success or its unresolved problems. Each proposed case study must distinguish independently supplied physical inputs, categorical result, unique payoff, discarded information, overreach, and falsifier. Standard Model, quantum, quantum-field, relativistic, and assembly cases must keep their physical structures as recovery targets or comparisons rather than substrate premises.

The general diagnostic is that structural coherence concerns how defined things relate, whereas a constitutive account supplies what exists and the law of its behavior. A commuting diagram can expose a missing dependency; it cannot replace that constitutive account. A classification is useful without becoming a derivation of its physical members.

## 11. Mathematical scope and unresolved physical questions

### 11.1 Established record algebra and open physical obligations

The ordinary record construction supplies exact identities, associative compatible union, the fiber-separation obstruction, a typed symmetry square, and compatible restriction equations. Its record type makes hidden boundary conditions inspectable. The restart application demonstrates a practical information-loss audit. The shorter proofs remain ordinary record algebra, delay-system reasoning, group theory, topology, or state-machine analysis; no stronger uniquely categorical physical theorem is supplied.

The physical obligations are specific: a sufficient history domain, valid state-dependent-delay existence and continuation hypotheses, causal-root completeness through composed intervals, treatment of branching or selection, an independently lawful separating pair, and a retained carrier for any assembly claim. Root/acceleration naturality needs independently classified records and ambiguity controls. Physical causal-incidence composition needs an actual law beyond formal graph paths. Recovery needs one accepted carrier and one tested effective record with a compositional residual. Assembly combination needs protected topology or independence, not disjoint inventory or a picture.

### 11.2 Provisional classifications and optional higher structures

Several provisional ideas retain their distinct uncertainty. Particle species as equivalence classes of retained histories require both a retained family and an independently derived relation; a recovery fiber is not a proved substrate isomorphism class. Assembly automorphisms inducing effective multiplets require a full-record action, a representation, and consistent recovery across representatives. Effective observer states requiring memory remain an inferred possibility to be settled by a separating pair or a closure theorem. Branch-sensitive reaction labels require a sufficient quotient and lawful composition. No one of these proposals is accepted merely by belonging to a categorical vocabulary.

Higher morphisms, relating arrows to arrows, remain optional. A boundary-fixed deformation between history extensions must pass through admissible histories at every intermediate stage. Double categories can distinguish evolution and symmetry directions, but ordinary arrows and covariance squares express the present obligations. Monoidal, operadic, stack, topos, and other broad programs have no demonstrated necessity here. A topos is a category with additional structures supporting a generalized set-like internal language; possessing such a language is not evidence for physical ontology.

### 11.3 The test for a continuing mathematical role

The defensible ongoing role is a low-intensity supporting laboratory. It can provide a bridge certificate for a concrete pair of theories, an information-loss counterexample, compact relational vocabulary, or a bounded history-composition test. For philosophy-history, it distinguishes a change of notation from equivalence of models, controlled reduction from ontological derivation, bridge compatibility from a common physical mechanism, and preserved from discarded information. It supplies no historical evidence about what people believed, why a program prevailed, or which historical path was available.

Immediate organizational uses include level typing, symmetry inventory, mapping comparison, composition audits, coarse-graining records, and routing physical claims to their proper owners. Intermediate use must produce repeated successful tests on named consumers. A non-removable long-term role would require a nontrivial obstruction, uniqueness or reconstruction theorem, independently verified prediction, cross-observable compression without retuning, or a demonstrated inadequacy of simpler tools. The methodological value is falsified if concrete applications merely rename existing calculations, conceal omitted history, or commute only by definition. The physical expansion remains paused, with established support material preserved and no automatic promotion into the reader-facing corpus.
