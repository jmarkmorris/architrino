# Electron Orbitals, Occupancy Codes, and Assembly Interpretation

## 1. Orbital structure as a recovery problem

Atomic orbital notation compresses several different kinds of information: a shell label, an angular family, an occupancy, and an effective account of how electrons participate in chemistry. A deeper description must explain why these regularities occur, including their exceptions. Replacing the labels with a shorter code does not supply that explanation.

The treatment here develops three distinct layers. The first is the standard effective description summarized in the retained orbital notes and element table. The second is EOC, a private notation for shell index, occupancy, and capacity. The third is the hypothesis that localized electron assemblies realize stable dynamical mode families in an atomic environment involving the nucleus and Noether sea. The third layer is a proposed interpretation within $\mathbb{A}\mathbb{A}\mathbb{A}$; its geometry, exclusion mechanism, and filling order have not been derived in these sources.

The effective description therefore serves as a recovery target and comparison vocabulary. Quantum capacities, Pauli exclusion, orbital probability densities, and chemical filling rules enter at that level. They are not premises for the substrate acceleration law. The [retained orbital notes and complete element table](priorities.md) supply the detailed comparison record; the numerical configurations and pattern counts below are attributed to that record rather than newly verified atomic data.

### 1.1 What an occupancy description contains

A configuration specifies how many electrons occupy each represented subshell. It does not specify a microscopic trajectory, the phases of localized assemblies, a detector response, or a complete many-electron quantum state. Even a successful occupancy code leaves those distinctions open. This limitation matters especially when the code is interpreted as a dynamical description: identical occupancy counts can leave many geometrical and dynamical properties unspecified.

The central physical question is whether the effective mode families and their allowed populations can be recovered from assembly dynamics. A compact notation can expose this question and organize comparisons. It cannot answer it by inheriting the quantum labels that it was designed to encode.

## 2. Shells, subshells, and orbital geometry

### 2.1 Reading a configuration

In a term such as $3d^7$, the leading integer is the principal shell index, the letter identifies an angular family, and the superscript is the number of electrons assigned to that subshell. Thus the term records seven electrons in the third-shell d family. A shell contains several subshells: the third shell includes s, p, and d families. An orbital is a more specific effective spatial state within a subshell; it is not synonymous with the shell or the entire subshell.

The usual labels distinguish the principal index $n$, angular index $\ell$, orientation label $m_\ell$, and spin label $m_s$. At the effective level, $n$ organizes radial and broad energy scales, while $\ell$ distinguishes angular structure. Energy ordering in a many-electron atom depends on more than $n$, so a shell number is not itself a numerical energy. The orientation label distinguishes basis states within an angular family, and the spin label supplies the two effective spin alternatives.

| Family | Historical name | Angular index | Spatial orbitals | Electron capacity |
| --- | --- | --- | ---: | ---: |
| s | sharp | $\ell=0$ | 1 | 2 |
| p | principal | $\ell=1$ | 3 | 6 |
| d | diffuse | $\ell=2$ | 5 | 10 |
| f | fundamental | $\ell=3$ | 7 | 14 |

The standard Pauli rule permits at most two electrons of opposite spin in one spatial orbital. Within the standard effective counting, there are $2\ell+1$ spatial orbitals and two spin alternatives per orbital. The resulting capacity is

$$
C_\ell=2(2\ell+1).
$$

This formula organizes the four capacities in the table; it does not derive them from architrino dynamics. Higher angular labels such as g, h, and i extend the effective vocabulary. The retained notes restrict their practical ground-state discussion to s, p, d, and f and report no ordinary chemical need for the higher families in their element inventory. That inventory statement is source-scoped.

### 2.2 A shape is not a trajectory

An effective orbital is represented by a wavefunction, with $|\psi|^2$ giving its probability-density description. Familiar pictures often draw a surface enclosing a chosen probability, such as 90 percent. Such a surface is a visualization convention, not a hard edge of an electron or an atomic container. Neither the picture nor the density assigns a definite orbit to an electron.

The s family has spherical angular structure, with radial structure changing across shells. The p family is commonly displayed in three directional forms, conventionally aligned with x, y, and z. Those axes specify a chosen basis; they are not three distinguished substrate directions. Familiar d pictures include four cloverleaf forms and one form with axial lobes and a toroidal region. The f family has more elaborate multilobed structure. The notes associate f-shell participation with lanthanide and actinide chemistry and magnetism as effective phenomenology.

These geometries define an explanatory target for an assembly account. A time-dependent localized object occupying a region and a quantum density drawn over that region are different mathematical objects. A relation between them requires an explicit averaging and observation rule.

## 3. Filling patterns and chemical organization

### 3.1 Shell availability and energy ordering

The source's shell diagram begins with 1s, then 2s and 2p, then 3s, 3p, and 3d, and continues through shells containing the f family. It distinguishes the availability of a family from the order in which neutral-atom configurations commonly populate it: s begins at shell 1, p at 2, d at 3, and f at 4.

The retained buildup sequence is

$$
1s,\ 2s,\ 2p,\ 3s,\ 3p,\ 4s,\ 3d,\ 4p,\ 5s,\ 4d,\ 5p,\ 6s,\ 4f,\ 5d,\ 6p,\ 7s,\ 5f,\ 6d,\ 7p.
$$

This is a useful organizing sequence, subject to the exceptions recorded in the same element table. In particular, 4s enters before 3d in the usual neutral buildup pattern, and the fourth period runs through 4s, 3d, and 4p. The first f family appears substantially later than the first fourth-shell s state. These examples show why increasing principal index alone cannot determine filling order. The sequence is not a universal ordering of all states, all ions, or every near-degenerate configuration.

### 3.2 Configurations, cores, and valence

Neon provides a simple complete configuration, $1s^2\,2s^2\,2p^6$. A noble-gas symbol can abbreviate such a filled core. The notes give sodium as $[\mathrm{Ne}]\,3s^1$, iron as $[\mathrm{Ar}]\,4s^2\,3d^6$, and gold as $[\mathrm{Xe}]\,4f^{14}\,5d^{10}\,6s^1$. These notations preserve the occupancy assignments while suppressing already specified core rows.

Valence describes the electrons relevant to reorganization in bonding, ionization, and polarization. Highest-shell occupancy is a useful first guide, especially for the main groups, but it is not a sufficient definition for every atom. The iron example involves both 4s and 3d participation; reducing valence to the largest value of $n$ would discard that distinction. The source associates alkali behavior with an outer $ns^1$ pattern and relates directional p occupancy to bonding geometry. These are effective chemical comparisons, not derived assembly interaction laws.

### 3.3 Periodic blocks and their qualifications

The familiar block widths follow the effective capacities: two positions for s, six for p, ten for d, and fourteen for f. The first two columns, last six columns, middle transition region, and detached f rows are a useful visual organization of these families. The layout also contains conventions and exceptions: helium has a $1s^2$ configuration while occupying the noble-gas column.

The notes summarize main-group outer patterns as $ns^1$ for group 1, $ns^2$ for group 2, and $ns^2np^5$ for group 17, with filled outer configurations in group 18 and helium treated separately. Similar outer occupancy helps explain why a group exhibits recurring chemical behavior. A period nevertheless combines several shell families, as the fourth-period example shows; it is not a simple count of one progressively filled shell.

## 4. EOC as an occupancy representation

### 4.1 The three fields

EOC is a local three-character notation. Its first field E records the shell index, O records occupancy, and C records capacity. Within the s/p/d/f domain, the capacities identify the angular family uniquely. The code `35a`, for example, means third shell, five electrons, capacity ten: the same occupancy information as $3d^5$.

The characters use hexadecimal-style single digits where needed: `a` denotes ten, `b` eleven, `c` twelve, `d` thirteen, and `e` fourteen. Thus the family-capacity characters are `2`, `6`, `a`, and `e`, and a full f row has occupancy character `e`. E is an index field, not a measured energy. The limited single-character format is the notation used for the retained table; no unrestricted encoding for arbitrarily large shell indices or capacities is implied.

For a subshell with shell index $n$, occupancy $O$, and capacity $C$, the representation records

$$
(n,O,C),\qquad O\in\{0,1,\ldots,C\}.
$$

The original table prints occupied rows. Allowing zero in the abstract domain is useful for comparing configurations and defining complements; it does not mean that zero-occupancy rows were printed in the source. A full atomic configuration is a collection of subshell-indexed rows, with an order chosen for presentation. Reordering those printed rows does not change the occupancies or establish a temporal sequence.

### 4.2 Additive tokens and compression

The source also writes one token for each electron, prefixed by a shell label. For example, `E2 1/6 + 1/6 + 1/6 + 1/6` records four electron tokens in a capacity-six family and compresses to `246`. Each token denotes one counted electron. Reading the slash as a numerical fraction instead gives a fraction of capacity, not an electron count or fractional electron charge.

| Effective subshell | Additive notation | EOC |
| --- | --- | --- |
| $1s^2$ | `E1 1/2 + 1/2` | `122` |
| $2p^4$ | `E2 1/6 + 1/6 + 1/6 + 1/6` | `246` |
| $3d^5$ | `E3 1/a + 1/a + 1/a + 1/a + 1/a` | `35a` |
| $4f^{14}$ | `E4` followed by fourteen `1/e` tokens | `4ee` |

For $O$ tokens of a fixed capacity $C$, counting tokens returns $O$, whereas summing their numerical values returns $O/C$. The distinction is definitional. Neither operation supplies a distribution among individual orbital orientations or spin states. In particular, the suggested half-filled d interpretation as five phase-separated channels before pairing is an additional physical hypothesis, not information encoded by `35a` alone.

The additive representation makes electron counts visible while EOC compresses them. Neither representation identifies persistent individual electrons across successive elements. When a recorded configuration rearranges, existing subshell occupancies can decrease even though the total electron count increases. Explicit tokens therefore do not establish an append-only physical history.

### 4.3 The complete comparison table

The retained table covers all 118 listed elements from hydrogen through oganesson in four parallel representations: the full effective configuration, noble-gas shorthand, an uncompressed EOC stack, and additive rows. It aligns filled-core markers with helium, neon, argon, krypton, xenon, and radon. The additive column expands rows after the preceding noble-gas core; a core abbreviation does not discard those electrons from the atom. The oganesson row is included, without inventing an additional printed core marker absent from the source.

The full table remains supporting reference material because its 118 repeated expansions make the correspondence inspectable element by element. The chapter develops the mapping and its limitations without duplicating every row. The table's configurations, including its heavy-element assignments, are a retained effective comparison inventory; no new primary-source authentication, updated spectroscopic assessment, or native physical derivation is supplied here.

## 5. Arithmetic structure and its limits

### 5.1 What follows from the encoding

If an EOC string is interpreted as a base-16 numeral with numerical field values $n$, $O$, and $C$, its numerical value is

$$
N=16^2n+16O+C,\qquad N\equiv C\pmod{16}.
$$

The residue is therefore a consequence of the final capacity digit. It identifies s, p, d, or f within this code domain because the encoding already put that information there. It is not independent evidence for a physical multiplicity law. Likewise, increasing occupancy by one at fixed shell and capacity increases the encoded integer by sixteen; an evenly spaced numerical ladder is built into the notation.

The source displays `216, 226, 236, 246, 256, 266` and `61a, 62a, …, 6aa` as occupancy ladders. Their formal regularity should be distinguished from the physical question of which ladder entries occur in a specified collection of atomic states. The notes report 107 distinct EOC rows in their neutral-element table through atomic number 118. That is a claim about the retained collection, not the whole three-character language or every possible atomic state.

### 5.2 Complement, half filling, and closure

At fixed shell and capacity, define the occupancy complement by

$$
K_C(O)=C-O,\qquad K_C(K_C(O))=O.
$$

On the extended integer domain from zero through $C$, this is an involution. Its fixed point satisfies $O=C/2$, which exists as an integer for the even capacities considered here. The source examples `236`, `35a`, and `47e` are therefore arithmetically self-complementary. The paired examples are `216` with `256`, `226` with `246`, `32a` with `38a`, and `41e` with `4de`.

Closure has $O=C$ and maps to zero occupancy. Consequently, the set of printed nonempty rows is not by itself a domain closed under complement, and the subset actually observed in the source table need not contain every complement partner. The word symmetry here describes the mathematical map; it does not establish a symmetry of atomic energies, populations, or dynamics.

The source associates half filling with familiar stability landmarks and lists closure examples `122`, `266`, `3aa`, `4ee`, `5aa`, `6aa`, and `766`. Those associations remain effective comparisons. The fixed-point equation proves half occupancy, not enhanced binding or a universal half-filled ground-state rule. A physical explanation would have to account for actual energy differences and the recorded exceptions.

### 5.3 Missing rows and rearrangements

The notes report that the following rows do not appear in their neutral-ground-state table through atomic number 118: `34a`, `39a`, `43a`, `46a`, `49a`, `42e`, `48e`, `58a`, `51e`, `55e`, and `58e`. Such absences are scoped to that collection. They do not exclude those occupancies in ions, excited states, other environments, or an enlarged effective state space.

The same record describes 105 of its 117 successive-element steps as changing one subshell row, with twelve changing two rows. For this statement to have a precise occupancy meaning, rows must be matched by subshell identity and unprinted rows treated as zero; counting changed strings without matching subshells would answer a different question. The counts are retained as source-reported observations, without an independent recount in this exposition.

Several table examples explain why a simple filling ladder is insufficient. Chromium is recorded as $[\mathrm{Ar}]\,4s^1\,3d^5$, following vanadium's $4s^2\,3d^3$ outer assignment. Copper is recorded with $4s^1\,3d^{10}$. In the next transition series, niobium, molybdenum, ruthenium, rhodium, and palladium show departures from a simple two-electron s-row progression; palladium's row omits an occupied 5s subshell. Lanthanum, cerium, gadolinium, and lutetium illustrate d/f participation across the lanthanide region. Platinum and gold have one 6s electron in the retained table. The actinide entries include d/f rearrangements, and the source assigns lawrencium a 7p electron while the following rutherfordium entry has a 6d population. These examples are properties of the retained configurations, with their original scientific verification limits.

A change from one atomic number to the next compares two distinct atoms. It is not by itself a time evolution within one atom. Calling the sequence almost monotone can describe predominantly local changes in this table, but individual occupancy coordinates need not be monotone. A minimal-path claim would require a defined state space, admissible transitions, and a cost; none is supplied by the encoding alone.

### 5.4 Whole-atom quantities

Let $I$ be a declared finite set of subshell indices, with capacity $C_i$ and occupancy $O_i$ for each index. For a neutral-atom configuration containing all of its occupied subshells, the electron count agrees with atomic number:

$$
Z=\sum_{i\in I}O_i.
$$

Other useful bookkeeping quantities are the vacancy count relative to that chosen set and its number of full rows:

$$
V_I=\sum_{i\in I}(C_i-O_i),\qquad
F_I=\#\{i\in I:O_i=C_i\}.
$$

If $I$ contains only occupied rows, $V_I$ counts vacancies in those represented families. If a fixed comparison set includes additional unoccupied families, it counts their capacities as vacancies as well. These are different conventions. Changing the index set changes the quantity, so a vacancy comparison must declare the set before using it. For noble-gas shorthand, the core occupancies must be included or counted separately in the total.

A complement profile can compare partially occupied rows with their formal partners. Together with total population, full-row count, and missing-row patterns, it provides a more structured comparison than prime factorization of individual encoded integers. The notes propose examining nontrivial residues and digital sums after removing encoding identities, near-minimal paths, compressed explanations of missing rows, and predictions of block boundaries, closures, or valence. These are questions for a constrained symbolic description, with no demonstrated predictive result in the retained material.

## 6. Localized assemblies and the proposed physical bridge

### 6.1 Four readings of orbital geometry

The strong hypothesis in the notes takes electrons to be localized assemblies and the atom to be a dynamical multi-assembly system in the Noether sea. It proposes that familiar orbital shapes arise as regular stable mode families. Four possible realizations are retained: equipotential or quasi-equipotential volumes; stable admissible regions of motion; recurring mode families involving nucleus and sea; and time-averaged occupancy patterns traced by localized assemblies.

These alternatives do not yet select one mathematical mechanism. An equipotential description already requires an appropriate effective potential, while stable regions and recurring modes require a specified dynamics and persistence criterion. A sea-mediated explanation also requires an established response of the sea. No nontrivial constitutive response, bound atomic solution, or stability demonstration is provided by these orbital notes.

The proposed picture relates nuclear attraction, electron-electron repulsion, and environmental mediation at the assembly or effective level. It does not add primitive force laws or magnetic mechanisms to the architrino acceleration law. The relevant microscopic derivation would have to begin with the allowed delayed path-history interactions and justify the effective description used for the atom.

### 6.2 Exclusion, proximity, and detection

The source asks how closely two localized electron assemblies can approach in a stable bound atom. It suggests distinct recurring trajectories, phase-separated modes, or mutually excluding occupancy patterns, with a minimum approach or phase relation derived from dynamics. No minimum distance, exclusion law, or accepted phase-separation mechanism is supplied. Repulsion alone does not establish Pauli exclusion, and avoidance of collision does not establish the effective two-spin capacity of an orbital.

| Effective concept | Proposed assembly interpretation | Unresolved bridge |
| --- | --- | --- |
| Orbital | Stable mode or admissible occupancy region | Existence, geometry, and persistence of that mode |
| Probability density | Time-averaged occupancy or effective detection density | A measure and observation rule relating the descriptions |
| Shell and subshell | Hierarchy of stable mode families | Radial and angular organization with the observed multiplicities |
| Pauli exclusion | Dynamical non-cooccupancy of identical assemblies in one mode | The precise exclusion structure and its effective spin-dependent form |
| Hund ordering | Phase-separated occupation of near-degenerate modes before pair-locking | An ordering mechanism and its scope across configurations |
| Orbital overlap | Shared admissible spatial region | Why effective overlap need not mean simultaneous co-location |

A long-time occupancy fraction and a detection probability require distinct definitions even when they are proposed to agree. An averaging limit, its dependence on initial histories, and the detector coupling cannot be inferred from a drawing of an orbital. The source's density reinterpretation therefore supplies neither a Born-rule derivation nor an assertion of ergodicity.

### 6.3 From a code to a physical description

At the effective level, `35a` records an occupancy already assigned by standard orbital notation. At the hypothesis level, it suggests a third-shell mode family supporting five localized assemblies out of ten effective occupancy possibilities. At the strongest proposed level, it would summarize a geometry whose multiplicity, exclusion, and ordering follow from assembly dynamics. The transition between these levels is the substance of the recovery problem.

The source calls the stronger reading a geometric occupancy ledger and a possible dynamical state code. Its present demonstrated content is the reduced occupancy ledger. The code lacks enough information to reconstruct trajectories, phases, observation statistics, or an atomic evolution from one string. Calling it a state code is therefore an aspirational interpretation of a reduced description, not an established complete state representation.

Four linked questions remain unresolved in the source. A physical account must determine shell and subshell geometry with multiplicities two, six, ten, and fourteen; establish the minimum-approach, exclusion, or phase relation that constrains population; explain filling order and rearrangements among near-degenerate families together with valence; and obtain EOC, if useful, as a consequence of that geometry rather than assigning it afterward. Spectra, transition rules, and chemistry remain observer-level recovery targets alongside occupancy. The combinatorial identities developed here clarify the notation and its limitations while leaving those physical questions open.
