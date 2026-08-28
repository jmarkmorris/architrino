# Hilbert Space, Architrino Histories, and Braid Structure

## Scope and Working Thesis

This document is the academic synthesis of the ongoing Hilbert-space discussion. Revise it by integrating explanations, questions, corrections, and provisional constructions into the relevant sections, rather than appending a conversation transcript. The [learning path](README.md) and [QC-013](../work-queue.md#qc-013--hilbert-space-and-effective-state-vector-contract) retain the introductory task and its review boundary. Understanding is not inferred from the existence of this draft.

The central question is how the definite trajectories and causal histories of architrinos can support the state-space geometry used in quantum descriptions. The starting thesis is an **inferred research direction**: seek the connection through physically meaningful functions of assembly histories and their responses to apparatus, rather than identifying individual architrinos with Hilbert-space basis vectors. Such functions can admit Hilbert-space representations under explicit mathematical assumptions. Whether a particular representation reproduces quantum preparations, interference, transformations, and records remains a separate physical derivation.

Plainly: a braid is something that moves and interacts. Hilbert space is a way to organize descriptions and predictions. The proposed connection concerns which aspects of the braid's motion and history can supply that mathematical organization.

Definitions and worked identities below are comparison mathematics. Standard quantum rules are labeled effective recovery targets, not architrino-level premises. Proposed physical correspondences are conjectures until derived from the Master Equation, polarity, delayed path histories, wake/action reasoning, Euclidean void, and absolute time. Every new physical numerical example uses $c_f=1$; the coordinate examples below are dimensionless.

## Vectors Before Hilbert Space

### One Object, Different Coordinates

A vector is not identical to the list of numbers used to describe it. A basis is a collection of independent vectors sufficient to express every vector in the chosen space. In an ordinary plane, let $\mathbf e_1$ and $\mathbf e_2$ be perpendicular unit vectors. Consider this dimensionless example:

$$
\mathbf v=3\mathbf e_1+4\mathbf e_2,
\qquad
\|\mathbf v\|=\sqrt{3^2+4^2}=5.
$$

Plainly: $\mathbf v$ is the arrow. The two unit arrows $\mathbf e_1$ and $\mathbf e_2$ define the measuring directions. The numbers three and four describe the arrow's components in those directions, and the double bars denote its length, five.

Choose new measuring directions:

$$
\mathbf e'_1=\frac35\mathbf e_1+\frac45\mathbf e_2,
\qquad
\mathbf e'_2=-\frac45\mathbf e_1+\frac35\mathbf e_2,
\qquad
\mathbf v=5\mathbf e'_1+0\mathbf e'_2.
$$

Plainly: the prime marks the new axes. The first new unit arrow points along $\mathbf v$; the second is perpendicular to it. The coordinates change from three-and-four to five-and-zero, but the arrow has not moved.

**Derived check:** the new basis vectors each have squared length one and dot product zero. Substitution recovers the original arrow. A calculation giving a different arrow or length would falsify this example. This is a passive basis change, a change of description; physically rotating the arrow while keeping the axes fixed is a different operation.

Plainly: changing the labels on a description must not be confused with changing the physical system. The same distinction matters when a quantum state is written in different bases or a braid is viewed from different directions.

### Inner Products Supply Geometry

An inner product generalizes the dot product. It defines vector size and overlap. For complex coordinate vectors $a$ and $b$, the usual convention is

$$
\langle a,b\rangle=\sum_{j=1}^{n}a_j^*b_j,
\qquad
\|a\|^2=\langle a,a\rangle=\sum_{j=1}^{n}|a_j|^2.
$$

Plainly: $a_j$ and $b_j$ are component number $j$ of the two vectors, and $n$ is the number of components. The star takes the complex conjugate, reversing the imaginary part. The bracket compares the vectors; comparing a vector with itself gives its squared length. Absolute-value bars give the magnitude of each component.

An inner product is linear in its second argument, has conjugate symmetry, and gives a positive squared length to every nonzero vector. Orthogonal vectors have zero inner product; orthonormal vectors also have unit length. These are mathematical conditions, not statements about whether two physical objects interact. [MIT's introduction](https://ocw.mit.edu/courses/6-453-quantum-optical-communication-fall-2016/d9beb82c9d4f3ac411496eb0633e8aee_MIT6_453F16_Lect2_Notes.pdf) develops the finite-vector and signal examples.

Plainly: an inner product tells us what overlap, perpendicularity, and size mean in the chosen description. A physical mapping must justify why that comparison is relevant to the measurements being described.

## What Makes the Space a Hilbert Space

A Hilbert space is a real or complex vector space with an inner product that is complete in the associated distance. Completeness means that every Cauchy sequence, a sequence whose sufficiently late terms are arbitrarily close to one another, approaches an element already in the space. Every finite-dimensional inner-product space is complete. Infinite-dimensional spaces require care about which functions or sequences are included.

Plainly: if successive approximations settle down according to the space's distance rule, the final object must be available inside that space. “Complete” does not mean a complete description of nature or a theory with no open questions.

Ordinary Euclidean vector space is a real Hilbert space. Hilbert space is therefore neither exclusively quantum nor necessarily infinite-dimensional. Vector geometry extends to objects that are not literal arrows in physical space.

### A Whole Function Can Be One Vector

For a mathematical example, let $u$ be a dimensionless coordinate on $[0,1]$. The space $L^2([0,1])$ consists of complex functions with finite integrated squared magnitude, identifying functions that differ only on a set of zero integration measure:

$$
\mathcal H=L^2([0,1]),
\qquad
\langle f,g\rangle=\int_0^1 f(u)^*g(u)\,du,
\qquad
\|f\|^2=\int_0^1|f(u)|^2\,du<\infty.
$$

Plainly: $\mathcal H$ is the space; $f$ and $g$ are whole curves in it, and $u$ labels points along each curve. The integral compares two curves by adding their products across the interval. One entire curve is one vector, even though describing that curve takes more than a short list of numbers.

With a complete orthonormal sequence of functions $\phi_n$, a square-integrable function has an expansion

$$
f=\sum_{n=1}^{\infty}a_n\phi_n,
\qquad
a_n=\langle\phi_n,f\rangle,
\qquad
\|f\|^2=\sum_{n=1}^{\infty}|a_n|^2.
$$

Plainly: the functions $\phi_n$ are basis patterns, $a_n$ is the amount of pattern number $n$, and the infinite sum converges in the integrated-square distance. The last equation is a version of the Pythagorean theorem: squared size is the sum of squared components. It is not yet a probability law.

A musical signal is a useful analogy: frequency components describe one sound without adding physical directions to the room. The analogy stops before detector probabilities or quantum composition rules. Functions as vectors and bases are developed in [Durham's Hilbert-space lesson](https://www.maths.dur.ac.uk/users/kasper.peeters/mathphys/hilbert_space.html).

## The Additional Structure of Quantum Descriptions

### Amplitudes, Phase, and Probability

**Standard effective comparison:** a pure quantum state is represented by a unit vector in a complex Hilbert space, with vectors differing by a common phase representing the same pure state. More general preparations require a density operator, a positive operator with trace one that supplies quantum probabilities. Neither choice follows merely from having a vector space.

Plainly: a pure-state vector is one special quantum description. An uncertain preparation generally needs a more general object. A common phase affects all components together; relative phases describe differences between components and can affect interference.

For two orthonormal measurement vectors $\phi_A$ and $\phi_B$,

$$
\psi=\frac35\phi_A+\frac45\phi_B,
\qquad
P(A)=\left|\frac35\right|^2=\frac9{25},
\qquad
P(B)=\left|\frac45\right|^2=\frac{16}{25}.
$$

Plainly: $\psi$ names the state vector; $\phi_A$ and $\phi_B$ represent two ideal measurement outcomes. The coefficients are amplitudes. The Born rule assigns their squared magnitudes as probabilities: 36 percent and 64 percent. This rule is an explicit quantum comparison assumption here.

Probabilities in one measurement basis do not specify the full state:

$$
\psi_+=\frac{\phi_A+\phi_B}{\sqrt2},
\qquad
\psi_-=\frac{\phi_A-\phi_B}{\sqrt2},
\qquad
\langle\psi_+,\psi_-\rangle=0.
$$

Plainly: $\psi_+$ has matching signs; $\psi_-$ has opposite signs. Both give equal probabilities for A and B, but they are perpendicular state vectors. An ideal measurement in the basis formed by $\psi_+$ and $\psi_-$ distinguishes them perfectly. Relative sign therefore contains information absent from the A/B probabilities.

**Derived consequence within the comparison:** outcome probabilities for one apparatus cannot replace a phase-sensitive state description. Identical probabilities for every allowed measurement would defeat this example, but the displayed alternative basis distinguishes the states. [MIT's quantum postulates](https://www.ocw.mit.edu/courses/18-435j-quantum-computation-fall-2003/c1095b496b364b56aaa0cbb2d725234a_qc_lec02.pdf) give the comparison rules.

Plainly: recovering counts for one setting is less demanding than recovering a state that predicts counts across different settings.

### Composition and Dynamics

Standard quantum theory combines subsystem spaces using a tensor product and represents closed-system evolution by unitary transformations, linear maps that preserve inner products and have inverses. Measurement adds rules for probabilities and the state after a record. An open subsystem need not evolve unitarily by itself.

Plainly: quantum theory specifies how descriptions combine, change, and respond to measurement. A complex braid coordinate alone does not supply these rules. Describing only part of a coupled system can lose information even when the larger system evolves deterministically.

## What the Architrino Description Starts With

The [current ontology](../../../../content/markdown/aaa/foundations/ontology.md) places architrinos in the Euclidean void with absolute time. A position record is not automatically enough to predict future acceleration: the Master Equation uses causal source events along earlier trajectories. The [transfer-operator packet](../transfer-operator-basin-measure.md#state-space-and-coarse-graining) requires retained histories, root data, provenance, and apparatus context before reducing the state.

Let $\omega_T$ denote one admissible record at absolute time $T$, and $\Omega$ the domain of these records. Schematically its content includes

$$
\omega_T:
\left\{
\mathbf X_i(T),\mathbf V_i(T),s_i;\
\text{relevant labeled source histories and root data};\
\text{sea and apparatus context}
\right\}.
$$

Plainly: $\mathbf X_i$ and $\mathbf V_i$ are the position and velocity of architrino number $i$, and $s_i$ records its polarity. The rest of $\omega_T$ preserves the past and surroundings needed for prediction. This packages existing physical information; it does not add a substance or assert that all entries are independent.

A finite history horizon is legitimate only when omitted history is irrelevant or its contribution is bounded for the declared observation window. The admissible domain $\Omega$ need not be a vector space: adding lawful trajectories point by point need not produce another solution, preserve noncollision conditions, or respect the same causal-root structure.

Plainly: two complete movies do not generally add to a third physically possible movie. Lawful histories are different from functions that describe those histories.

| Role | Typical element | Meaning |
| --- | --- | --- |
| Physical space | A position vector | Where an architrino is. |
| History-state domain $\Omega$ | One admissible record $\omega_T$ | What physical evolution needs to retain. |
| A proposed effective state space | A function, vector, or density operator | What the observer's prediction method retains. |

Plainly: the first locates things, the second records their dynamical circumstances, and the third organizes predictions. The mapping problem concerns the relationships between these roles.

## A First Mathematical Route: Functions of Histories

### Hilbert Structure Without Quantum Postulates

**Conditional construction:** suppose $\Omega$ is a measurable history domain and $\mu$ is a declared probability measure on it. A measure assigns weights to sets of histories; its physical origin must be justified separately. Then

$$
\mathcal H_{\mathrm{hist}}=L^2(\Omega,\mu;\mathbb C),
\qquad
\langle F,G\rangle_\mu
=\int_\Omega F(\omega)^*G(\omega)\,d\mu(\omega).
$$

Plainly: $\mathcal H_{\mathrm{hist}}$ contains complex functions of whole histories. $F$ and $G$ are two such functions; $\mu$ determines the weighting in their comparison. $\mathbb C$ denotes complex values. Functions differing only on zero-weight sets represent the same vector.

One history $\omega$ is an input to these functions, not itself a vector $F$. A definite history does not automatically define a normalizable point vector in this space. For a measure without atoms, which assigns each individual history zero weight, a Dirac point measure is not an ordinary square-integrable amplitude.

Plainly: we are vectorizing functions that ask questions about histories, not automatically individual architrinos or exact histories.

This construction also applies to ordinary deterministic systems. It supplies analysis tools, not the Born rule or a physical preparation measure. The source of $\mu$ belongs with QC-003/QC-004 and the [measure-source discipline](../transfer-operator-basin-measure.md#measures-and-basin-partitions).

### Nonlinear Motion and Linear Function Evolution

Suppose an admitted map $\Phi_\tau:\Omega\to\Omega$ advances the retained state by absolute-time interval $\tau$ under a fixed protocol. Its Koopman operator evaluates a function after evolving its argument:

$$
(U_\tau F)(\omega)=F(\Phi_\tau\omega),
\qquad
U_\tau(aF+bG)=aU_\tau F+bU_\tau G.
$$

Plainly: $\Phi_\tau$ advances the physical record. $U_\tau$ tells us what a question about that record reports afterward. The numbers $a$ and $b$ weight two questions. Evaluating their weighted sum after evolution equals weighting the separate evaluations, so function evolution is linear even when physical motion is nonlinear.

This algebraic identity precedes a choice of Hilbert-space domain. A well-defined bounded operator on the specified $L^2$ space requires more assumptions. Measure preservation is sufficient for

$$
\|U_\tau F\|_\mu^2
=\int_\Omega |F(\Phi_\tau\omega)|^2\,d\mu(\omega)
=\int_\Omega |F(\omega)|^2\,d\mu(\omega)
=\|F\|_\mu^2.
$$

Plainly: if evolution preserves the weighting $\mu$, it preserves integrated squared size. This gives an isometry, a length-preserving map. Unitarity additionally requires the appropriate invertible, measure-preserving evolution on the same space. Forward determinism does not establish that inverse.

This is a conditional mathematical tool, not a new recovery target. [Das and Giannakis, Section 2](https://arxiv.org/html/1801.07799v8#S2) give the standard invertible measure-preserving setting. No Hamiltonian substrate, invariant measure, inverse evolution, or finite closed mode sector is assumed for an architrino assembly here. **Falsifier of an application:** the history domain is not closed under the claimed evolution, the measure changes, or required functions leave the operator's domain.

Plainly: deterministic histories can induce linear mathematical tools. The missing physical step is showing which tools have the meaning and operational rules of quantum mechanics.

There is a further structural warning. If bounded real functions $f$ and $g$ represent classical readouts by multiplication operators, $M_fF=fF$ and $M_gF=gF$, then

$$
M_fM_gF=fgF=gfF=M_gM_fF.
$$

Plainly: $M_f$ multiplies the function $F$ by the readout function $f$, and $M_g$ multiplies it by $g$. These operations commute: their order does not matter. Moving classical readouts into Hilbert space therefore does not automatically reproduce the noncommuting measurement operators of quantum theory. This calculation concerns multiplication readouts, not all possible physical interventions.

The proof burden is a derived representation of preparations and apparatus operations, not merely a complex function space with a length-preserving evolution. This is an obstruction to that shortcut, not a theorem excluding every deterministic history-based recovery.

## A Second Route: Histories as Sources of Response Patterns

### A Candidate Inner Product from Physical Responses

**Conjectural physical route with conditional mathematics:** derive a response pattern $r_\omega(u)$ from an admitted history $\omega$, where $u$ labels a declared sampling coordinate or response channel. Possible starting objects include a component of the causal-wake acceleration contribution along a receiver history or a phase-resolved apparatus response. These are questions, not identified quantum amplitudes. Settings, units, boundary conditions, and unresolved apparatus variables must be specified.

Suppose these responses are square-integrable under a declared nonnegative sampling measure $\nu$. Begin with real responses if no physical complex structure has been derived:

$$
\langle r_\omega,r_{\omega'}\rangle_{\mathrm{resp}}
=\int r_\omega(u)\,r_{\omega'}(u)\,d\nu(u),
\qquad
\mathcal H_{\mathrm{resp}}
=\overline{\operatorname{span}\{r_\omega:\omega\in\Omega\}}
\subseteq L^2(\nu;\mathbb R).
$$

Plainly: compare two histories through their response curves. The prime marks the second history; $\nu$ specifies how sampling points count. The span contains finite weighted sums of responses; the overline adds their limits in the integrated-square distance. The resulting closed subspace is a real Hilbert space under these assumptions.

For finitely many histories, define $G_{jk}=\langle r_{\omega_j},r_{\omega_k}\rangle_{\mathrm{resp}}$. For real coefficients $c_j$,

$$
\sum_{j,k}c_jG_{jk}c_k
=\int\left|\sum_jc_jr_{\omega_j}(u)\right|^2\,d\nu(u)
\ge0.
$$

Plainly: the matrix $G$ records pairwise overlaps. Comparing a weighted combination of curves with itself cannot give negative squared size. Thus $G$ is positive semidefinite. Zero directions are possible when the chosen response cannot distinguish some combinations.

This is a **derived identity under the stated assumptions**. It does not establish that every vector in the completed span is physically preparable, select the appropriate sampling weight, or turn overlaps into transition probabilities. **Falsifier of a proposed physical use:** discarding a response distinction changes a declared prediction, or the chosen overlap fails an independent apparatus comparison. **Promotion destination:** the [Effective State-Vector Contract](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md#effective-state-vector-contract), after deriving those connections.

Plainly: a mathematically valid Hilbert space can be built from response curves. Calling it the quantum state space requires more than that construction.

### Where Complex Phase Might Enter

A real periodic response admits two quadratures, components shifted by a quarter-cycle. As a dimensionless signal identity,

$$
r(u)=A\cos u+B\sin u
=\operatorname{Re}\!\left[(A-iB)e^{iu}\right].
$$

Plainly: $u$ is a phase coordinate, $A$ and $B$ are real weights, $i$ is the imaginary unit, and $\operatorname{Re}$ keeps the real part. The complex number $A-iB$ packages two real signal components. The identity does not make the signal quantum.

**Inferred place to investigate:** relative timing between braid motion, wakes, and apparatus may supply physically meaningful quadrature pairs. The burden is to derive phase transport and interference from the same dynamics, not merely rewrite an orbit using complex numbers. A constituent's angular position is not automatically quantum phase. The [spinor/history synthesis](../spinors-rotations-and-history/brainstorming.md) already distinguishes representation signs from physical response.

Plainly: timing is a plausible place to look for phase. It does not establish that timing alone reproduces the quantum meaning of phase.

## From Histories to Preparation Statistics

### An Effective State Usually Summarizes a Preparation

A physical system has a definite history in the proposed ontology, while a repeatable preparation leaves histories unresolved. Let $P$ denote a preparation protocol and $\mu_P$ its physically derived distribution over retained source histories. Let $C$ denote an apparatus protocol, and $K_o^C(\omega)$ its derived conditional probability for record $o$, after any explicitly specified unresolved apparatus variables are averaged:

$$
p(o\mid P,C)=\int_\Omega K_o^C(\omega)\,d\mu_P(\omega),
\qquad
K_o^C\ge0,
\qquad
\sum_oK_o^C=1.
$$

Plainly: $p$ is the predicted record frequency. For each source history $\omega$, $K_o^C$ describes the apparatus response, and $\mu_P$ supplies the preparation weights. With all outcome-relevant variables retained, the response can be a zero-or-one indicator. Any averaging over omitted apparatus variables needs a physical source. Include loss or no-record outcomes when relevant.

This is the existing [measure and detector-response program](../transfer-operator-basin-measure.md), not a license to choose weights to fit a target. A joint apparatus channel must satisfy the existing Bell and no-go constraints; no product of independent local response rules is presumed.

### Statistical Equivalence Is Not Identical Microscopic Evolution

For an exact predictive reduction, detailed histories mapped to the same reduced state must agree on the deterministic observables it claims to predict. For a quantum statistical description, histories in the same preparation can give different individual records. The appropriate equivalence concerns distributions across a declared family $\mathcal C$ of experiments:

$$
P\sim Q
\quad\Longleftrightarrow\quad
p(o\mid P,C)=p(o\mid Q,C)
\quad\text{for all }C\in\mathcal C
\text{ and records }o.
$$

Plainly: $P$ and $Q$ are preparation procedures. They are operationally equivalent if the allowed experiments in $\mathcal C$ cannot distinguish their record statistics. This does not require each underlying history to produce the same detector click.

This sharpens the mapping question: a state vector need not be assigned directly to each architrino or each definite history. It may represent an equivalence class of preparations. **Falsifier:** preparations declared equivalent disagree in an allowed experiment beyond the stated approximation error. An experiment outside $\mathcal C$ instead tests an extension of scope.

Plainly: specify whether a proposed map predicts individual motion, repeated frequencies, or both. A valid statistical compression need not be a complete microscopic state.

### The Quantum Representation Must Still Be Earned

**Effective recovery target:** find one Hilbert space, a preparation map $P\mapsto D_P$, and apparatus effects $E_o^C$ satisfying

$$
p(o\mid P,C)=\operatorname{Tr}(D_PE_o^C),
\qquad
D_P\ge0,\quad\operatorname{Tr}(D_P)=1,
\qquad
E_o^C\ge0,\quad\sum_oE_o^C=I.
$$

Plainly: $D_P$ is the quantum density operator for preparation $P$, and $E_o^C$ describes outcome $o$ under apparatus setting $C$. Positive operators have nonnegative expectations, the trace $\operatorname{Tr}$ adds diagonal entries, and $I$ is the identity operator. The target is one consistent quantum representation across experiments, not a fresh fit for each probability table.

For a pure state and ideal projective outcome, $D_P=|\psi_P\rangle\langle\psi_P|$ and $E_o^C=|\phi_o^C\rangle\langle\phi_o^C|$. The trace then reduces to $|\langle\phi_o^C,\psi_P\rangle|^2$. Each ket-bra product projects onto the indicated unit-vector direction. This recovers the earlier Born expression within the comparison formalism; it does not derive the formalism from native histories.

Plainly: the state-vector Born rule is a special case of the broader probability target. A Hilbert space of history functions alone does not reach it.

The maps must also respect physical preparation mixtures, available transformations, sequential records, and the claimed subsystem combinations. Otherwise a large representation can merely store experimental tables. The [measurement owner](../../../../content/markdown/aaa/quantum/measurement-ontology.md) and [no-go constraints](../../../../content/markdown/aaa/validation/no-go-theorems.md) retain these obligations. No general quantum representation theorem for architrino preparations is claimed here.

## What This Suggests About the Braid

**Working inference:** the first useful bridge is between retained braid-and-wake histories and physically derived response patterns. Functions on histories offer an analysis space; response functions offer a candidate connection to apparatus. These constructions have different elements and need not be the same Hilbert space. Their relation is itself a research question.

Plainly: one space organizes questions about histories; the other organizes the response curves histories produce. Neither automatically equals quantum state space.

| Braid-side object | Candidate mathematical role | Unresolved requirement |
| --- | --- | --- |
| Architrinos and labeled paths | Inputs to the history record | Determine which details remain predictive. |
| A retained braid history | A point in $\Omega$ or an index labeling a response | Establish admissibility and sufficient memory. |
| Recurring response patterns | Candidate basis functions or a reduced mode sector | Derive independence, completeness within scope, and controlled evolution. |
| Relative timing and wake history | Candidate phase information | Distinguish observable phase relations from reference conventions. |
| Apparatus coupling | A source for response overlaps and record rules | Derive compatible weights, outcome selection, and post-record evolution. |
| Repeated preparation | A distribution over unresolved histories | Establish physical weights without fitting Born probabilities. |
| Coupled assemblies | A candidate composite description | Derive the subsystem split and quantum correlation structure. |

Plainly: no established rule says that one architrino is one basis state, three binaries imply three Hilbert dimensions, or one closed trajectory is one quantum eigenstate. A prescribed recurring pattern also does not establish a stable physical mode.

## The First Discriminating Question

**Proposed next artifact, not a new queue:** construct a conditional history-sufficiency example with two admissible records that agree in current positions, velocities, polarities, and assembly geometry but differ in a specified earlier causal-wake datum. Derive which later response can distinguish them. If no admissible physical pair is available, use a clearly labeled mathematical example to teach the missing-information principle and leave physical existence open.

Distinguish three possibilities: the histories differ physically and have distinguishable responses; they differ physically but are equivalent within the apparatus family; or the apparent difference is a coordinate convention. A controlled response difference identifies information that an effective representation must retain. It does not by itself establish complex Hilbert structure or the Born rule.

Plainly: ask what a snapshot of the braid loses. If that information changes an observable response, it belongs somewhere in the effective description. This is more concrete than assigning quantum meanings to every braid component at once.

The strongest current result is conditional mathematics: Hilbert spaces can be constructed from weighted functions of histories or square-integrable response patterns. The proposed physical direction is to derive response geometry from retained causal histories. The unresolved transition is from that geometry to a common quantum representation of preparations, transformations, and records. The existing [Effective State-Vector Contract](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md#effective-state-vector-contract) is the eventual promotion destination; the [Braid Program](../../braid-program/priorities.md) retains candidate-specific evidence.

## Sources and Verification Scope

- [MIT, Quantum Optical Communication, Lecture 2](https://ocw.mit.edu/courses/6-453-quantum-optical-communication-fall-2016/d9beb82c9d4f3ac411496eb0633e8aee_MIT6_453F16_Lect2_Notes.pdf): inspected definitions of vectors, inner products, and Hilbert spaces.
- [Kasper Peeters, The Hilbert Space](https://www.maths.dur.ac.uk/users/kasper.peeters/mathphys/hilbert_space.html): inspected function-space and basis treatment.
- [MIT, Basics of Quantum Mechanics](https://www.ocw.mit.edu/courses/18-435j-quantum-computation-fall-2003/c1095b496b364b56aaa0cbb2d725234a_qc_lec02.pdf): standard state and measurement postulates, inspected during the introductory explanation.
- [Das and Giannakis, Koopman spectra in reproducing kernel Hilbert spaces, version 8, Section 2](https://arxiv.org/html/1801.07799v8#S2): inspected the function-space construction and invertible measure-preserving assumptions. The elementary identities above are shown explicitly; no numerical spectral result is transferred to the braid.
- The live [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md), [Quantum Summary](../../../../content/markdown/aaa/quantum/quantum-summary.md), and [transfer-operator packet](../transfer-operator-basin-measure.md) supply current native ownership and open proof boundaries.

Sources support comparison mathematics, not the physical correspondences proposed here. No EOM calculation, retained braid, detector dataset, or physical quantum-recovery result was produced for this draft. Dialogue should revise this synthesis in place while preserving claim levels and counterexamples; task history and validation receipts belong in the parent work log.
