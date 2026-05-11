 # Electron Orbitals

## Scope

Base priority document for electron-orbital notes, terminology, notation, and related follow-up work. This document is intended to accumulate merge-inserted content over time rather than append disconnected fragments.

## Entourage Input

The symbology of electron orbitals is the language chemists and physicists use to describe the quantum addresses of electrons within an atom. Rather than planetary orbits, electrons exist in probability clouds. The notation maps out where these clouds belong, what shape family they take, how many electrons occupy them, and how the atom's structure connects to periodic behavior, bonding, magnetism, and spectra.

Here is a merged breakdown of the shorthand, abbreviations, intuitions, and implications of electron-orbital symbology.

### 1. The Shorthand: How To Read The Notation

The standard notation for an electron configuration looks like a sequence of numbers and letters with superscripts, such as **$1s^2 2s^2 2p^6$** for Neon.

Each term in this sequence, such as **$2p^6$** or **$3d^7$**, has three parts:

| Component | Meaning | Typical values |
| --- | --- | --- |
| Number | **Principal quantum number ($n$)**, the main energy level or shell | 1, 2, 3, 4, 5, 6, 7 |
| Letter | **Subshell**, which identifies the orbital family and associated angular pattern | $s, p, d, f$ |
| Superscript | Number of electrons occupying that subshell | from 0 up to the subshell maximum |

So **$3d^7$** means "7 electrons in the $d$ subshell associated with the third principal level."

The principal quantum number tells you the broad energy level and typical radial scale. Higher $n$ usually means the electrons are, on average, farther from the nucleus and higher in energy. The letter marks the subshell and therefore the orbital family. The superscript tells you how many electrons currently occupy that subshell.

At a finer level, electron states are organized by four quantum numbers:

| Symbol | Role                                    | Intuition                                      |
| ------ | --------------------------------------- | ---------------------------------------------- |
| $n$    | Principal quantum number                | main energy level                              |
| $l$    | Orbital angular-momentum quantum number | subshell family and angular character          |
| $m_l$  | Magnetic quantum number                 | orbital orientation within a subshell          |
| $m_s$  | Spin quantum number                     | spin state of the electron                     |

This address system is what lets chemists and physicists talk about electrons as occupying well-defined quantum states rather than classical little planets moving on tracks.

It is also useful to distinguish three levels of structure explicitly:

| Level | Meaning | Example |
| --- | --- | --- |
| Shell | All states with the same principal quantum number | shell 3 |
| Subshell | One orbital family within a shell | $3s$, $3p$, $3d$ |
| Orbital | One specific member of a subshell | one of the three $2p$ orbitals |

So shell 3 contains the subshells $3s$, $3p$, and $3d$, and each of those subshells contains its own number of orbitals.

### 2. The Subshell Letters: $s, p, d, f$

The letters used for the orbitals, **$s, p, d,$ and $f$**, are historical abbreviations inherited from early spectroscopy:

| Letter  | Old name    | Typical shape family | Number of orbitals | Maximum electrons |
| ------- | ----------- | -------------------- | ------------------ | ----------------- |
| **$s$** | sharp       | spherical            | 1                  | 2                 |
| **$p$** | principal   | directional lobes    | 3                  | 6                 |
| **$d$** | diffuse     | cloverleaf family    | 5                  | 10                |
| **$f$** | fundamental | multi-lobed family   | 7                  | 14                |

What matters physically now is not the historical names themselves, but the structure they identify.

These labels also correspond to orbital angular-momentum quantum numbers:

- $s \rightarrow l = 0$
- $p \rightarrow l = 1$
- $d \rightarrow l = 2$
- $f \rightarrow l = 3$

The key occupancy rule is that each individual orbital can hold at most **2 electrons**, and those two electrons must have opposite spins. This is the **Pauli exclusion principle** in action. Because a subshell contains multiple orbitals, its total capacity is:

- $s$: 1 orbital x 2 electrons = 2
- $p$: 3 orbitals x 2 electrons = 6
- $d$: 5 orbitals x 2 electrons = 10
- $f$: 7 orbitals x 2 electrons = 14

If elements were heavy enough, the sequence could continue to $g, h, i$, and so on, although no known ground-state element requires those labels in ordinary chemical practice.

### 3. Intuitions: Visualizing The Quantum World

To build the right intuition, you have to abandon the old solar-system picture of the atom. Electrons behave quantum mechanically, with both particle-like and wave-like character. An orbital is not a hard shell or a literal path. It is a mathematical state whose squared amplitude defines a probability distribution, often visualized as a three-dimensional region containing a high probability, commonly around 90 percent, of finding the electron.

- **$s$ orbitals:** The simplest family. They are spherically symmetric around the nucleus. As the level rises from $1s$ to $2s$ to $3s$, the distribution spreads outward and gains additional radial structure.
- **$p$ orbitals:** Directional orbitals with three spatial orientations, usually associated with the $x$, $y$, and $z$ axes. Their directional character makes them central to bonding geometry.
- **$d$ orbitals:** A five-orbital family with more elaborate angular structure. Four are often drawn as cloverleafs; one is commonly represented as a dumbbell with a torus around the center.
- **$f$ orbitals:** A seven-orbital family with still more intricate multi-lobed shapes. These become important in heavier atoms and in the chemistry and magnetism of lanthanides and actinides.

### 4. Filling Order: The Aufbau Pattern

Electrons fill orbitals from lower energy to higher energy, but that order is not a simple march of $n = 1, 2, 3, 4, \dots$. The ordering depends on both the principal level and the subshell type.

A common schematic is:

```text
1s
2s  2p
3s  3p  3d
4s  4p  4d  4f
5s  5p  5d  5f
6s  6p  6d
7s  7p
```

Reading along the standard diagonal pattern gives the usual filling sequence:

**$1s \rightarrow 2s \rightarrow 2p \rightarrow 3s \rightarrow 3p \rightarrow 4s \rightarrow 3d \rightarrow 4p \rightarrow 5s \rightarrow 4d \rightarrow 5p \rightarrow 6s \rightarrow 4f \rightarrow 5d \rightarrow 6p \rightarrow 7s \rightarrow 5f \rightarrow 6d \rightarrow 7p$**

Note the starting levels:

- $s$ starts at 1
- $p$ starts at 2
- $d$ starts at 3
- $f$ starts at 4

Two especially important consequences are:

- **$4s$ fills before $3d$** in the neutral-atom buildup pattern.
- **$4f$ appears late**, which is why the $f$-block sits where it does in the periodic table.

This pattern reflects the fact that orbital energies depend on more than just $n$ alone.

Period number alone therefore does not tell the whole story. Period 4, for example, includes the filling of $4s$, then $3d$, then $4p$. The table reflects energy ordering, not a perfectly clean shell-by-shell filling rule.

### 5. The Noble-Gas Shorthand

Because full configurations get long very quickly, chemists usually compress the inner closed-shell core using the nearest preceding noble gas in brackets.

| Element | Full configuration | Shorthand |
| --- | --- | --- |
| Na (11) | $1s^2 2s^2 2p^6 3s^1$ | **[Ne] $3s^1$** |
| Fe (26) | $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^6$ | **[Ar] $4s^2 3d^6$** |
| Au (79) | long form omitted here | **[Xe] $4f^{14} 5d^{10} 6s^1$** |
[[]]
This shorthand is not just a convenience. It also foregrounds the chemically active outer electrons. For example, instead of writing Iron as the full long sequence, we write **[Ar] $4s^2 3d^6$**, which immediately says that Iron contains an Argon-like core plus 8 outer electrons relevant to its chemistry and magnetism.

### 6. Periodic-Table Meaning

The periodic table is, in a very real sense, a map of orbital filling.

- The first two columns form the **$s$-block**.
- The last six columns form the **$p$-block**.
- The middle ten columns form the **$d$-block**, the transition metals.
- The two detached rows form the **$f$-block**, the lanthanides and actinides.

This block structure exists because the subshell capacities are 2, 6, 10, and 14 respectively. That is why the table has those widths.

Each new period corresponds broadly to the opening of a new principal energy level, even though the detailed filling order interleaves subshells from neighboring levels. So the table is not just a shell counter. It is a visible record of the same energy-order pattern described above: $s$-block first, then the relevant $d$- or $f$-block where applicable, and then the $p$-block.

This same structure explains the major group patterns:

- Group 1 elements typically end in $ns^1$,
- Group 2 elements typically end in $ns^2$,
- Group 17 elements typically end in $ns^2 np^5$,
- Group 18 elements typically end in a filled valence shell, with Helium as the special case $1s^2$.

That is why an element's position on the table already encodes much of its outer electron configuration.

### 7. Valence Electrons, Bonding, And Geometry

The outermost electrons, especially those in the highest occupied principal level, are the **valence electrons**. These dominate ordinary chemistry.

Valence structure helps determine:

- how reactive an element is,
- what kind of bonds it tends to form,
- why elements in the same column behave similarly,
- and how molecular geometry emerges.

For example, Group 1 elements end in **$ns^1$**, so each has one relatively weakly bound outer $s$ electron. That common valence pattern is why lithium, sodium, potassium, and related elements all behave as highly reactive metals.

Orbital shape also matters. In particular, the directional character of the $p$ orbitals helps explain why bonding has preferred angles and orientations rather than remaining spherically uniform.


### 8. $\mathbb{A}\mathbb{A}\mathbb{A}$ Hypothesis, Interpretation, And Mapping To Quantum-Mechanical Language

This section records a theory-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation of orbitals and electron configurations. It should be read as a hypothesis and interpretive program rather than as a settled replacement for standard quantum mechanics.

#### Ontological hypothesis in $\mathbb{A}\mathbb{A}\mathbb{A}$

In the standard quantum-mechanical description, an electron in an atom is represented by a quantum state whose squared amplitude defines a spatial probability distribution. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ picture under consideration here, the electron is instead treated as a **localized assembly** moving through the Noether Sea.

Under that hypothesis:

- the electron is not itself a smeared cloud,
- the orbital is not the ontological substance of the electron,
- and the observed orbital structure should instead be read as a **stable dynamical occupancy pattern** available to a localized assembly in the nuclear environment.

That shifts the interpretive burden. The primary object becomes the localized electron assembly plus the sea-mediated dynamical structure in which it moves.

#### Orbitals as regular dynamical patterns

On this reading, orbitals may correspond not to literal diffuse objects but to:

- equipotential or quasi-equipotential volumes,
- stable admissible regions of motion,
- recurring mode families in the nucleus plus Noether-Sea background,
- or time-averaged occupancy patterns traced out by localized assemblies.

The familiar $s$, $p$, $d$, and $f$ shapes would then be understood as regular dynamical geometries generated by the atomic environment rather than as ontologically primary clouds.

This viewpoint is compatible with the thought that orbital geometry is both **regular** and **dynamic**. The visible orbital pattern would be the ledger of where a localized electron assembly can persist stably over time.

#### Electron-electron proximity and exclusion in $\mathbb{A}\mathbb{A}\mathbb{A}$

If electrons are localized assemblies, then the key question is no longer whether two electron probability clouds overlap in the textbook sense, but rather:

**How close can two localized electron assemblies approach one another in a stable bound atom?**

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framing, a stable atom would plausibly be a self-organized multi-assembly configuration in which:

- nuclear attraction draws electron assemblies into bound patterns,
- electron-electron repulsion prevents arbitrarily close approach,
- and the Noether Sea mediates or reshapes the admissible dynamical structure.

That suggests that under unperturbed conditions the electrons need not collide in any naive classical sense. Instead, the stable bound state would keep them on distinct recurring trajectories, phase-separated modes, or mutually excluding occupancy patterns. Their minimum approach distance, phase relation, or exclusion geometry would be a derived dynamical quantity, not an imposed metaphor.

#### Mapping to the existing quantum-mechanical interpretation

The standard quantum-mechanical language can then be re-read as an effective summary of a deeper localized-assembly dynamics:

| Standard QM language | Possible $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation |
| --- | --- |
| orbital | stable dynamical mode or admissible occupancy region for a localized assembly |
| probability density $|\psi|^2$ | time-averaged occupancy ledger or effective detection density of localized assemblies |
| shell / subshell structure | hierarchy of stable mode families in the nuclear and sea-mediated potential geometry |
| Pauli exclusion | dynamical non-cooccupancy rule for identical localized assemblies in the same admissible mode |
| Hund's rule | energetic preference for phase-separated occupancy across nearly degenerate modes before pair-locking |
| orbital overlap | shared admissible spatial region, not necessarily literal co-location of ontological electron substance |

This mapping does not by itself derive the quantum rules. It only identifies where the interpretive bridge would need to be built.

#### `EOC` as a hypothesis-level geometric occupancy ledger

The `EOC` code can be read at three distinct levels, and those levels should not be conflated:

| Layer | Reading of an `EOC` row such as `35a` |
| --- | --- |
| Standard QM effective description | shell 3, occupancy 5, capacity 10; within the present $s/p/d/f$ range the capacity digit identifies the $d$ subshell family |
| $\mathbb{A}\mathbb{A}\mathbb{A}$ ontological interpretation | shell-indexed ledger entry saying that a $d$-type stable mode family is available at level 3 and presently supports five localized assemblies in admissible bound occupancy patterns |
| Speculative geometric/dynamical extension | reduced symbolic shadow of a deeper mode geometry in which the admissible multiplicity, exclusion structure, and occupancy ordering are derived from nucleus plus Noether-Sea dynamics |

On that interpretive reading, `EOC` is not merely bookkeeping. It is a **geometric occupancy ledger**: `E` marks the shell-scale family, `C` marks the geometry-linked multiplicity of the admissible mode set, and `O` records how much of that set is realized in the current atom. The code string is therefore a compressed ledger of dynamical orbital geometry and, on the stronger version of the hypothesis, a **dynamical state code** for the bound multi-assembly system. At present, however, the map from geometry to code is imported from standard quantum mechanics rather than derived internally from $\mathbb{A}\mathbb{A}\mathbb{A}$.

This also sharpens several standard notions:

- shell and subshell structure become a hierarchy of stable bound mode families at different radial scales and angular multiplicities,
- exclusion behavior becomes the rule that identical localized assemblies cannot stably co-occupy the same admissible mode state and therefore must separate into distinct occupancy states before pair-locking,
- fill order becomes the sequence in which those mode families become energetically admissible as nuclear charge and existing occupancy reshape the sea-mediated environment,
- and valence behavior becomes the dynamical openness of the outer, incompletely closed rows, which are the easiest occupancy structures to reorganize during bonding, ionization, and polarization.

On this view, an `EOC` row can be interpreted as a **signature of an admissible stable occupancy mode family** for localized assemblies. A full configuration is then a stack of such signatures. The standard configuration string says which subshell labels are occupied, the fully enumerated additive row notation makes the shell-resolved ledger explicit one electron at a time, and `EOC` compresses that ledger into a minimal state code. The unresolved question is whether this is only a useful reinterpretation or the visible shadow of a deeper derivable geometry.

#### Compact mapping from orbital notation to `EOC`

| Standard orbital notation | Fully enumerated additive row notation | `EOC` | Hypothesis-level $\mathbb{A}\mathbb{A}\mathbb{A}$ reading |
| --- | --- | --- | --- |
| $1s^2$ | `E1 1/2 + 1/2` | `122` | first shell, lowest closed mode family, two localized assemblies saturating the simplest admissible bound pattern |
| $2p^4$ | `E2 1/6 + 1/6 + 1/6 + 1/6` | `246` | second-shell directional mode family, partially filled, with four assemblies distributed across a six-state effective occupancy set |
| $3d^5$ | `E3 1/a + 1/a + 1/a + 1/a + 1/a` | `35a` | third-shell $d$ family at half filling, suggesting maximal phase-separated spreading across the five effective orbital channels before pair-locking |
| $4f^{14}$ | `E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` | `4ee` | fourth-shell $f$ family fully closed, a saturated high-multiplicity occupancy ledger whose geometry is effective in QM and hypothesized dynamical in $\mathbb{A}\mathbb{A}\mathbb{A}$ |

#### Strong hypothesis to preserve

A strong version of the $\mathbb{A}\mathbb{A}\mathbb{A}$ orbital hypothesis is:

- electrons are localized assemblies,
- the atom is a dynamical multi-assembly system in the Noether Sea,
- and the familiar orbital geometries arise as regular stable mode families or equipotential-pattern families for those assemblies.

If that stronger claim is right, then textbook orbital notation, and the more compact `EOC` notation built from it, are not wrong, but incomplete. They would be highly successful coarse-grained codes for a deeper dynamical ledger.

#### Closure questions

For this idea to move from suggestive interpretation to closure, the following questions have to be answered constructively:

1. What in the $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics determines the shell and subshell geometry itself, and why should the admissible multiplicities appear as `2`, `6`, `a`, and `e`?
2. What sets the minimum approach distance, exclusion structure, or phase-separation law that limits how localized assemblies can occupy a given mode family?
3. What determines fill order as the atom grows, including the known rearrangements of near-degenerate $s$, $d$, and $f$ families and the emergence of valence behavior?
4. Can `EOC` be derived as a reduced symbolic shadow of the deeper mode geometry, rather than assigned after the fact from standard QM labels and capacities?

Those are the hard gates for turning the $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation of orbitals, and the `EOC` compression built on top of it, into predictive closure rather than a suggestive re-description.

### 9. Number-Theoretic And Combinatorial Inquiry In `EOC` Space

The `EOC` rows can also be studied as a constrained arithmetic language. If one regards strings such as `216`, `35a`, or `4ee` as compact hexadecimal-style numerals, the question is not whether arbitrary numerology can be imposed on them, but whether the admissible rows and their evolution across the elements exhibit stable arithmetic or combinatorial laws.

For sequence analysis of atomic buildup, `EOC` alone is not sufficient because it is a state code and therefore rewrites occupancy as a subshell fills. A fully enumerated additive ledger is the safer analysis surface when the question concerns how the electrons accumulate rather than only what the final state is.

The first discipline here is to separate three layers:

- **encoding-trivial structure**, forced directly by the definition of `EOC`,
- **effective physical structure**, forced by the known orbital filling pattern and its exceptions,
- and **deeper hidden structure**, which would remain after the first two layers are factored out.

That distinction matters because some patterns are immediate and not deep. For example, every `EOC` row ends in `2`, `6`, `a`, or `e` simply because the final digit is the subshell capacity. Residue classes mod 16 therefore recover the subshell family almost by definition. That is useful, but it is not yet hidden structure.

More interestingly, the presently tabulated neutral elements up to atomic number 118 realize only a sparse subset of the ambient three-character code space. The visible regularities already suggest a real arithmetic and combinatorial inquiry:

| Pattern class                | Example                                                                                                                        | Why it matters                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| sparse admissible code space | only 107 distinct `EOC` rows appear in the current table up to 118                                                             | the code set is highly constrained and should be treated as a structured language, not as generic integers          |
| occupancy ladders            | `216, 226, 236, 246, 256, 266`; `61a, 62a, ..., 6aa`                                                                           | for fixed shell and capacity, occupancy usually moves through an ordered ladder in the middle digit                 |
| complement symmetry          | `216 <-> 256`, `226 <-> 246`, `32a <-> 38a`, `41e <-> 4de`                                                                     | the map $O \mapsto C - O$ creates a particle-hole-style symmetry around closure                                     |
| self-dual half-fill rows     | `236`, `35a`, `47e`                                                                                                            | half-filled rows sit at arithmetic fixed points of the complement symmetry and align with known stability landmarks |
| closure rows                 | `122`, `266`, `3aa`, `4ee`, `5aa`, `6aa`, `766`                                                                                | fully saturated rows act as closure markers in both the notation and the chemistry                                  |
| structured missing rows      | `34a`, `39a`, `43a`, `46a`, `49a`, `42e`, `48e`, `58a`, `51e`, `55e`, `58e` do not appear for neutral ground states up to 118  | the absences are not random and encode the known anomaly structure as much as the present rows do                   |
| near-local successor rule    | from one element to the next, 105 of the 117 steps change exactly one row, while only 12 steps require a two-row rearrangement | the full periodic sequence traces an almost monotone path through `EOC` space, with a small exceptional set         |

This suggests that the strongest hidden-pattern search is probably not about prime factorizations of isolated row codes. It is more likely to live in:

- the symmetry and sparsity of the admissible row set,
- the missing-row pattern,
- the path geometry traced by the element sequence through `EOC` space,
- and whole-atom invariants formed from the row stack rather than from single rows in isolation.

Useful whole-atom invariants include:

- the electron count $Z = \sum_{i} O_{i}$,
- the vacancy count $V = \sum_{i} (C_{i} - O_{i})$,
- the number of closed rows with $O_{i} = C_{i}$,
- and a complement-symmetry profile comparing each partially filled row to its partner under $O \mapsto C - O$.

Those quantities may provide a cleaner bridge between arithmetic structure and periodic behavior than raw inspection of single `EOC` strings.

#### Questions for this inquiry

1. After factoring out the obvious last-digit capacity classes, do nontrivial residue classes, digital sums, or other arithmetic invariants distinguish closures, half-filled rows, and anomaly rows?
2. Can the neutral-atom sequence be modeled as a minimal or near-minimal path on a constrained occupancy lattice, with the two-row jumps marking the true exception set?
3. Are the missing `EOC` rows explained entirely by known energetic anomalies, or do they obey a more compressed combinatorial exclusion law?
4. Can whole-atom invariants built from the `EOC` stack predict block boundaries, noble-gas closures, or valence behavior?
5. In the stronger $\mathbb{A}\mathbb{A}\mathbb{A}$ reading, is the arithmetic of `EOC` merely a code artifact, or a reduced symbolic shadow of deeper mode geometry?

This is therefore a legitimate area of inquiry, but it should be pursued with discipline. The goal is not to force mystical significance onto compact symbols. The goal is to determine whether the `EOC` language defines a sparse arithmetic geometry whose regularities track real structure in orbital filling and, possibly, deeper dynamical organization.

### 10. Full Electron-Configuration Table In Standard, `EOC`, And Additive Row Notation

The table below runs through the current known elements up to atomic number 118. It places four views side by side:

- the standard textbook electron-configuration string,
- the standard textbook shorthand with noble-gas compression,
- an `EOC` column for energy level, occupancy, and capacity written as three adjacent compact digits,
- and an abbreviated additive row ledger using noble-gas core compression.

The `EOC` column is a compact state code, so its middle digit rewrites occupancy as a subshell fills. The additive row ledger is different: after a noble-gas abbreviation point, every post-core electron remains explicit as its own `1/C` token until the next noble-gas closure, so earlier electrons are not silently absorbed into a later count. Capacities use compact hexadecimal-style digits where `a = 10` and `e = 14`. Each occupied subshell family is rendered on its own line in the standard fill-order sequence, the noble-gas shorthand is vertically aligned to the row where the compressed core ends, and for rows that exactly close a noble-gas core, the `= [Noble]` marker is appended directly to the final occupied line.

| Z | Element | Standard configuration | Abbreviated standard | EOC | Abbreviated additive row notation |
|---|---|---|---|---|---|
| 1 | Hydrogen | `1s1` | `1s1` | `112` | `E1 1/2` |
| 2 | Helium | `1s2` | `1s2 = [He]` | `122` | `E1 1/2 + 1/2 = [He]` |
| 3 | Lithium | `1s2`<br>`2s1` | `[He]`<br>`2s1` | `122`<br>`212` | `[He]`<br>`E2 1/2` |
| 4 | Beryllium | `1s2`<br>`2s2` | `[He]`<br>`2s2` | `122`<br>`222` | `[He]`<br>`E2 1/2 + 1/2` |
| 5 | Boron | `1s2`<br>`2s2`<br>`2p1` | `[He]`<br>`2s2`<br>`2p1` | `122`<br>`222`<br>`216` | `[He]`<br>`E2 1/2 + 1/2`<br>`E2 1/6` |
| 6 | Carbon | `1s2`<br>`2s2`<br>`2p2` | `[He]`<br>`2s2`<br>`2p2` | `122`<br>`222`<br>`226` | `[He]`<br>`E2 1/2 + 1/2`<br>`E2 1/6 + 1/6` |
| 7 | Nitrogen | `1s2`<br>`2s2`<br>`2p3` | `[He]`<br>`2s2`<br>`2p3` | `122`<br>`222`<br>`236` | `[He]`<br>`E2 1/2 + 1/2`<br>`E2 1/6 + 1/6 + 1/6` |
| 8 | Oxygen | `1s2`<br>`2s2`<br>`2p4` | `[He]`<br>`2s2`<br>`2p4` | `122`<br>`222`<br>`246` | `[He]`<br>`E2 1/2 + 1/2`<br>`E2 1/6 + 1/6 + 1/6 + 1/6` |
| 9 | Fluorine | `1s2`<br>`2s2`<br>`2p5` | `[He]`<br>`2s2`<br>`2p5` | `122`<br>`222`<br>`256` | `[He]`<br>`E2 1/2 + 1/2`<br>`E2 1/6 + 1/6 + 1/6 + 1/6 + 1/6` |
| 10 | Neon | `1s2`<br>`2s2`<br>`2p6` | `[He]`<br>`2s2`<br>`2p6 = [Ne]` | `122`<br>`222`<br>`266` | `[He]`<br>`E2 1/2 + 1/2`<br>`E2 1/6 + 1/6 + 1/6 + 1/6 + 1/6 + 1/6 = [Ne]` |
| 11 | Sodium | `1s2`<br>`2s2`<br>`2p6`<br>`3s1` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s1` | `122`<br>`222`<br>`266`<br>`312` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2` |
| 12 | Magnesium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2` | `122`<br>`222`<br>`266`<br>`322` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2 + 1/2` |
| 13 | Aluminium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p1` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p1` | `122`<br>`222`<br>`266`<br>`322`<br>`316` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2 + 1/2`<br>`E3 1/6` |
| 14 | Silicon | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p2` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p2` | `122`<br>`222`<br>`266`<br>`322`<br>`326` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2 + 1/2`<br>`E3 1/6 + 1/6` |
| 15 | Phosphorus | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p3` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p3` | `122`<br>`222`<br>`266`<br>`322`<br>`336` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2 + 1/2`<br>`E3 1/6 + 1/6 + 1/6` |
| 16 | Sulfur | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p4` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p4` | `122`<br>`222`<br>`266`<br>`322`<br>`346` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2 + 1/2`<br>`E3 1/6 + 1/6 + 1/6 + 1/6` |
| 17 | Chlorine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p5` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p5` | `122`<br>`222`<br>`266`<br>`322`<br>`356` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2 + 1/2`<br>`E3 1/6 + 1/6 + 1/6 + 1/6 + 1/6` |
| 18 | Argon | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p6 = [Ar]` | `122`<br>`222`<br>`266`<br>`322`<br>`366` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2 + 1/2`<br>`E3 1/6 + 1/6 + 1/6 + 1/6 + 1/6 + 1/6 = [Ar]` |
| 19 | Potassium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`412` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2` |
| 20 | Calcium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2` |
| 21 | Scandium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`31a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a` |
| 22 | Titanium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`32a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a` |
| 23 | Vanadium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`33a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a` |
| 24 | Chromium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s1`<br>`3d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s1`<br>`3d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`412`<br>`35a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a` |
| 25 | Manganese | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`35a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a` |
| 26 | Iron | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`36a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 27 | Cobalt | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`37a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 28 | Nickel | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d8` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`38a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 29 | Copper | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s1`<br>`3d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s1`<br>`3d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`412`<br>`3aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 30 | Zinc | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 31 | Gallium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`416` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E4 1/6` |
| 32 | Germanium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`426` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E4 1/6 + 1/6` |
| 33 | Arsenic | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`436` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E4 1/6 + 1/6 + 1/6` |
| 34 | Selenium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`446` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E4 1/6 + 1/6 + 1/6 + 1/6` |
| 35 | Bromine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`456` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E4 1/6 + 1/6 + 1/6 + 1/6 + 1/6` |
| 36 | Krypton | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p6 = [Kr]` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2 + 1/2`<br>`E3 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E4 1/6 + 1/6 + 1/6 + 1/6 + 1/6 + 1/6 = [Kr]` |
| 37 | Rubidium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2` |
| 38 | Strontium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2` |
| 39 | Yttrium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`41a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a` |
| 40 | Zirconium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`42a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a` |
| 41 | Niobium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`44a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a` |
| 42 | Molybdenum | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`45a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a` |
| 43 | Technetium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`45a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a` |
| 44 | Ruthenium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`47a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 45 | Rhodium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d8` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`48a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 46 | Palladium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`4d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`4d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`4aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 47 | Silver | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`4aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 48 | Cadmium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 49 | Indium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`516` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E5 1/6` |
| 50 | Tin | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`526` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E5 1/6 + 1/6` |
| 51 | Antimony | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`536` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E5 1/6 + 1/6 + 1/6` |
| 52 | Tellurium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`546` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E5 1/6 + 1/6 + 1/6 + 1/6` |
| 53 | Iodine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`556` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E5 1/6 + 1/6 + 1/6 + 1/6 + 1/6` |
| 54 | Xenon | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p6 = [Xe]` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2 + 1/2`<br>`E4 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E5 1/6 + 1/6 + 1/6 + 1/6 + 1/6 + 1/6 = [Xe]` |
| 55 | Cesium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`612` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2` |
| 56 | Barium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2` |
| 57 | Lanthanum | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`5d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`5d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`51a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E5 1/a` |
| 58 | Cerium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`5d1`<br>`4f1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`5d1`<br>`4f1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`51a`<br>`41e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E5 1/a`<br>`E4 1/e` |
| 59 | Praseodymium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`43e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e` |
| 60 | Neodymium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`44e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e` |
| 61 | Promethium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`45e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e` |
| 62 | Samarium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`46e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 63 | Europium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`47e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 64 | Gadolinium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f7`<br>`5d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f7`<br>`5d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`47e`<br>`51a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a` |
| 65 | Terbium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f9` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`49e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 66 | Dysprosium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ae` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 67 | Holmium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f11` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f11` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4be` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 68 | Erbium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f12` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f12` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ce` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 69 | Thulium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f13` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f13` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4de` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 70 | Ytterbium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 71 | Lutetium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`51a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a` |
| 72 | Hafnium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`52a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a` |
| 73 | Tantalum | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`53a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a` |
| 74 | Tungsten | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`54a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a` |
| 75 | Rhenium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`55a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a` |
| 76 | Osmium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`56a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 77 | Iridium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`57a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 78 | Platinum | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s1`<br>`4f14`<br>`5d9` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s1`<br>`4f14`<br>`5d9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`612`<br>`4ee`<br>`59a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 79 | Gold | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s1`<br>`4f14`<br>`5d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s1`<br>`4f14`<br>`5d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`612`<br>`4ee`<br>`5aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 80 | Mercury | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 81 | Thallium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`616` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E6 1/6` |
| 82 | Lead | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`626` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E6 1/6 + 1/6` |
| 83 | Bismuth | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`636` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E6 1/6 + 1/6 + 1/6` |
| 84 | Polonium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`646` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E6 1/6 + 1/6 + 1/6 + 1/6` |
| 85 | Astatine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`656` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E6 1/6 + 1/6 + 1/6 + 1/6 + 1/6` |
| 86 | Radon | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6 = [Rn]` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2 + 1/2`<br>`E4 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E5 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E6 1/6 + 1/6 + 1/6 + 1/6 + 1/6 + 1/6 = [Rn]` |
| 87 | Francium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`712` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2` |
| 88 | Radium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2` |
| 89 | Actinium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E6 1/a` |
| 90 | Thorium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`6d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`6d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`62a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E6 1/a + 1/a` |
| 91 | Protactinium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f2`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f2`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`52e`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e`<br>`E6 1/a` |
| 92 | Uranium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f3`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f3`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`53e`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e`<br>`E6 1/a` |
| 93 | Neptunium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f4`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f4`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`54e`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a` |
| 94 | Plutonium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`56e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 95 | Americium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`57e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 96 | Curium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f7`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f7`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`57e`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a` |
| 97 | Berkelium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f9` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`59e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 98 | Californium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ae` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 99 | Einsteinium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f11` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f11` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5be` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 100 | Fermium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f12` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f12` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ce` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 101 | Mendelevium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f13` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f13` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5de` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 102 | Nobelium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e` |
| 103 | Lawrencium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`7p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`7p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`716` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E7 1/6` |
| 104 | Rutherfordium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`62a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a` |
| 105 | Dubnium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`63a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a` |
| 106 | Seaborgium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`64a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a` |
| 107 | Bohrium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`65a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a` |
| 108 | Hassium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`66a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 109 | Meitnerium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`67a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 110 | Darmstadtium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d8` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`68a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 111 | Roentgenium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d9` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`69a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 112 | Copernicium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a` |
| 113 | Nihonium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`716` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E7 1/6` |
| 114 | Flerovium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`726` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E7 1/6 + 1/6` |
| 115 | Moscovium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`736` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E7 1/6 + 1/6 + 1/6` |
| 116 | Livermorium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`746` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E7 1/6 + 1/6 + 1/6 + 1/6` |
| 117 | Tennessine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`756` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E7 1/6 + 1/6 + 1/6 + 1/6 + 1/6` |
| 118 | Oganesson | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`766` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2 + 1/2`<br>`E5 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e + 1/e`<br>`E6 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a + 1/a`<br>`E7 1/6 + 1/6 + 1/6 + 1/6 + 1/6 + 1/6` |
