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

| Letter  | Old name    | Typical shape description                            | Number of orbitals | Maximum electrons |
| ------- | ----------- | ---------------------------------------------------- | ------------------ | ----------------- |
| **$s$** | sharp       | sphere                                               | 1                  | 2                 |
| **$p$** | principal   | dumbbell or figure-8 family                          | 3                  | 6                 |
| **$d$** | diffuse     | cloverleaf family with one mixed donut-dumbbell form | 5                  | 10                |
| **$f$** | fundamental | complex multi-lobed family                           | 7                  | 14                |

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

Two especially important consequences are:

- **$4s$ fills before $3d$** in the neutral-atom buildup pattern.
- **$4f$ appears late**, which is why the $f$-block sits where it does in the periodic table.

This pattern reflects the fact that orbital energies depend on more than just $n$ alone.

Period number alone therefore does not tell the whole story. Period 4, for example, includes the filling of $4s$, then $3d$, then $4p$. The table reflects energy ordering, not a perfectly clean shell-by-shell filling rule.

### 5. Mnemonics For The Full Aufbau Sequence

If the goal is to reconstruct the full filling order without relying on noble-gas shorthand or directly reading from the periodic table, there are several useful mnemonic strategies. These are memory aids rather than deeper physical explanations, but they are often effective in classroom or exam settings.

#### Phrase-pattern mnemonic

One rote-memory approach uses a repeated first-letter pattern:

- **School, School**
- **Public School, Public School**
- **District Public School, District Public School**
- **Federal District Public School, Federal District Public School**

Taking the first letters gives the subshell sequence:

**$s, s, p, s, p, s, d, p, s, d, p, s, f, d, p, s, f, d, p, s$**

You then combine that letter sequence with the starting levels:

- $s$ starts at 1
- $p$ starts at 2
- $d$ starts at 3
- $f$ starts at 4

Counting upward as each letter reappears reconstructs the full sequence:

**$1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p$**

This method is useful for rote memorization, although it is less conceptually transparent than the visual and mathematical methods below.

#### Diagonal-rule visual mnemonic

The best-known visual method is the **diagonal rule**, also called **Madelung's rule** in classroom use. Use the triangular layout already shown in the Aufbau section above.

Then read diagonally downward to the left. That procedure generates:

- $1s$
- $2s$
- $2p \rightarrow 3s$
- $3p \rightarrow 4s$
- $3d \rightarrow 4p \rightarrow 5s$
- $4d \rightarrow 5p \rightarrow 6s$
- $4f \rightarrow 5d \rightarrow 6p \rightarrow 7s$
- $5f \rightarrow 6d \rightarrow 7p$

This is often the easiest reconstruction method to perform quickly on scratch paper.

#### The $n + l$ rule

The most logical mnemonic is the **$n + l$ rule**. In this method, orbitals fill in order of increasing $n + l$, where:

- for $s$, $l = 0$
- for $p$, $l = 1$
- for $d$, $l = 2$
- for $f$, $l = 3$

Examples:

- $4s$: $4 + 0 = 4$
- $3d$: $3 + 2 = 5$

So $4s$ fills before $3d$ because 4 is less than 5.

If two orbitals have the same $n + l$ value, the one with lower $n$ fills first. For example:

- $3d$: $3 + 2 = 5$
- $4p$: $4 + 1 = 5$

So $3d$ comes before $4p$ because 3 is less than 4.

Among the mnemonic methods, this one is the closest to the actual organizing principle behind the usual Aufbau ordering.

#### The periodic table itself as a mnemonic

In practice, the periodic table is often the most reliable mnemonic of all. The table is already laid out in $s$-, $d$-, $p$-, and $f$-blocks according to the usual occupation order, so reading across it reproduces the filling pattern. The detailed block and period mapping is collected in the `Periodic-Table Meaning` section below.

#### Chunked block mnemonic

For many students, the easiest way to memorize the filling order is not as one uninterrupted string, but as a sequence of short blocks:

```text
1s
2s 2p
3s 3p
4s 3d 4p
5s 4d 5p
6s 4f 5d 6p
7s 5f 6d 7p
```

This chunked version is often easier to hold in working memory than:

**$1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p$**

It also makes the periodic structure more visible, especially the repeating pattern $4s, 3d, 4p$ then $5s, 4d, 5p$ then $6s, 4f, 5d, 6p$.

#### Repeating-pattern mnemonic

A useful pattern behind the chunked form is:

- each new principal level begins with an $s$ subshell,
- then the sequence often backfills the previous level's $d$ subshell,
- and for higher periods it can also backfill the $f$ subshell from two levels earlier.

That is why the middle of the sequence falls into the memorable pattern:

- $4s, 3d, 4p$
- $5s, 4d, 5p$
- $6s, 4f, 5d, 6p$
- $7s, 5f, 6d, 7p$

This is one of the best compact mental models for remembering the usual order quickly.

#### Limits of mnemonics

No mnemonic completely replaces the need to remember known exceptions. Transition-metal and related anomalies such as Cr, Mo, Cu, Ag, Au, and sometimes Pd must still be learned as a small separate list of special cases. In most teaching practice, the diagonal diagram and the periodic table itself are the most reliable memory tools.

If the goal is speed, the chunked block form plus the repeating $s/d/f/p$ backfill pattern is often the fastest practical memory aid. If the goal is understanding, the $n + l$ rule is the strongest guide.

### 6. The Noble-Gas Shorthand

Because full configurations get long very quickly, chemists usually compress the inner closed-shell core using the nearest preceding noble gas in brackets.

| Element | Full configuration | Shorthand |
| --- | --- | --- |
| Na (11) | $1s^2 2s^2 2p^6 3s^1$ | **[Ne] $3s^1$** |
| Fe (26) | $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^6$ | **[Ar] $4s^2 3d^6$** |
| Au (79) | long form omitted here | **[Xe] $4f^{14} 5d^{10} 6s^1$** |

This shorthand is not just a convenience. It also foregrounds the chemically active outer electrons. For example, instead of writing Iron as the full long sequence, we write **[Ar] $4s^2 3d^6$**, which immediately says that Iron contains an Argon-like core plus 8 outer electrons relevant to its chemistry and magnetism.

### 7. Periodic-Table Meaning

The periodic table is, in a very real sense, a map of orbital filling.

- The first two columns form the **$s$-block**.
- The last six columns form the **$p$-block**.
- The middle ten columns form the **$d$-block**, the transition metals.
- The two detached rows form the **$f$-block**, the lanthanides and actinides.

This block structure exists because the subshell capacities are 2, 6, 10, and 14 respectively. That is why the table has those widths.

Each new period corresponds broadly to the opening of a new principal energy level, even though the detailed filling order interleaves subshells from neighboring levels.

Reading across the periodic table also reproduces the usual filling sequence:

- periods 1 to 3 give the straightforward sequence $1s$, $2s$, $2p$, $3s$, $3p$,
- period 4 continues with $4s$, then $3d$, then $4p$,
- period 5 continues with $5s$, then $4d$, then $5p$,
- period 6 continues with $6s$, then $4f$, then $5d$, then $6p$,
- period 7 continues with $7s$, then $5f$, then $6d$, then $7p$.

This same structure explains the major group patterns:

- Group 1 elements typically end in $ns^1$,
- Group 2 elements typically end in $ns^2$,
- Group 17 elements typically end in $ns^2 np^5$,
- Group 18 elements typically end in a filled valence shell, with Helium as the special case $1s^2$.

That is why an element's position on the table already encodes much of its outer electron configuration.

### 8. Valence Electrons, Bonding, And Geometry

The outermost electrons, especially those in the highest occupied principal level, are the **valence electrons**. These dominate ordinary chemistry.

Valence structure helps determine:

- how reactive an element is,
- what kind of bonds it tends to form,
- why elements in the same column behave similarly,
- and how molecular geometry emerges.

For example, Group 1 elements end in **$ns^1$**, so each has one relatively weakly bound outer $s$ electron. That common valence pattern is why lithium, sodium, potassium, and related elements all behave as highly reactive metals.

Orbital shape also matters. The directional nature of the three $p$ orbitals helps explain why bonding is anisotropic and why molecules such as water and ammonia adopt specific bond angles and spatial arrangements rather than collapsing into purely spherical layouts.

### 9. Orbital Box Notation And Spin Rules

Electron configurations are also often written in orbital-box form. In that representation:

- an $s$ subshell is shown as one box,
- a $p$ subshell as three boxes,
- a $d$ subshell as five boxes,
- and an $f$ subshell as seven boxes.

Electrons are drawn as arrows, usually **$\uparrow$** and **$\downarrow$**, to track occupancy and spin.

For example, Oxygen has configuration **$1s^2 2s^2 2p^4$**. Its $2p^4$ part is commonly sketched as:

```text
[↑↓] [↑] [↑]
```

This means one $p$ orbital contains a pair and the other two $p$ orbitals each contain one electron.

Two rules govern this notation:

- **Pauli exclusion principle:** an orbital can hold at most two electrons, and if two are present they must have opposite spins.
- **Hund's rule:** within a set of equal-energy orbitals, electrons occupy separate orbitals one at a time before pairing.

That is why $p^4$ is not drawn as two paired boxes and one empty box.

### 10. Magnetism, Color, And Transition-Metal Behavior

Orbital notation is not merely bookkeeping. It helps explain major physical consequences.

- **Magnetism:** When two electrons occupy the same orbital, their opposite spins cancel their magnetic contributions. But in partially filled $d$ and $f$ subshells, electrons tend to spread out across available orbitals before pairing. This is Hund's rule, and it leaves unpaired electrons that generate strong magnetic behavior in elements such as Iron, Cobalt, and Neodymium.
- **Color:** Many vivid colors in transition-metal ions, gemstones, and coordination compounds arise because electrons can jump between nearby $d$-level patterns, absorbing some wavelengths and leaving others to be transmitted or reflected.
- **Variable oxidation states:** Transition metals often have several chemically accessible electron arrangements because their $d$ and outer $s$ levels are close in energy. This is why they commonly exhibit multiple oxidation states and serve as catalysts.

Lanthanides and actinides behave differently because the $f$ electrons are more buried and shielded. That is why many lanthanides show closely similar chemistry: their inner $f$ electrons often influence magnetism and spectra more strongly than ordinary bonding.

### 11. Important Stability Patterns And Exceptions

The usual filling order is a very good rule, but it is not perfect in every case. Half-filled and fully filled subshells can be especially stable, which leads to famous exceptions.

- **Chromium (Cr):** naive expectation **[Ar] $4s^2 3d^4$**, observed ground-state pattern **[Ar] $4s^1 3d^5$**
- **Copper (Cu):** naive expectation **[Ar] $4s^2 3d^9$**, observed ground-state pattern **[Ar] $4s^1 3d^{10}$**

These exceptions are important because they show that the final electron arrangement is determined by the detailed energetic balance of the whole atom, not by a rigid mnemonic alone.

Another important subtlety is that although $4s$ fills before $3d$ in the neutral-atom buildup pattern, the $4s$ electrons are often removed first when transition metals form cations.

For example:

- neutral Iron: **[Ar] $4s^2 3d^6$**
- Iron(II): **[Ar] $3d^6$**

That point is a common source of confusion and matters directly for oxidation-state bookkeeping.

### 12. Representative Chemical Examples

Short configurations often already tell you the main chemistry:

- **Carbon:** **$1s^2 2s^2 2p^2$**. Four valence electrons, strongly associated with covalent bonding and structural versatility.
- **Sodium:** **[Ne] $3s^1$**. One valence electron, easily lost, so Sodium commonly forms **Na$^+$**.
- **Chlorine:** **[Ne] $3s^2 3p^5$**. One electron short of a filled valence shell, so Chlorine commonly forms **Cl$^-$**.
- **Neon:** **[He] $2s^2 2p^6$**. Filled valence shell, which is why Neon is unusually unreactive.
- **Iron:** **[Ar] $4s^2 3d^6$**. Partially filled $d$ structure, multiple oxidation states, and frequent magnetic behavior.

These examples line up with the group patterns summarized in the `Periodic-Table Meaning` section above.

### 13. Why This Matters

The symbology of electron orbitals is not just an accounting trick. It is a compact encoding of the quantum structure that underlies atomic behavior.

It explains:

- why the periodic table has the shape it has,
- why chemically similar elements cluster into the same groups,
- why noble gases are unusually inert,
- why partially filled shells tend to drive bonding and reactivity,
- why transition metals are colorful and catalytically versatile,
- and why some materials are strongly magnetic.

In that sense, electron-orbital notation is both a language and a compressed theory. It lets you read atomic structure from a short string of symbols and infer a surprising amount about chemistry and physics at a glance.

The most useful compact intuition is this:

- the periodic table is a map of electron filling,
- electron-configuration notation tells you which orbital families are occupied,
- and the outermost occupied orbitals tell you most of the chemistry.

So the notation is a compressed way to ask how full an atom's electron neighborhoods are, and what that implies for reactivity, bonding, charge, spectra, and magnetism.

### 14. $\mathbb{A}\mathbb{A}\mathbb{A}$ Hypothesis, Interpretation, And Mapping To Quantum-Mechanical Language

This section records a theory-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation of orbitals and electron configurations. It should be read as a hypothesis and interpretive program rather than as a settled replacement for standard quantum mechanics.

#### Ontological hypothesis in $\mathbb{A}\mathbb{A}\mathbb{A}$

In the standard quantum-mechanical description, an electron in an atom is represented by a quantum state whose squared amplitude defines a spatial probability distribution. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ picture under consideration here, the electron is instead treated as a **localized assembly** moving through the Noether sea.

Under that hypothesis:

- the electron is not itself a smeared cloud,
- the orbital is not the ontological substance of the electron,
- and the observed orbital structure should instead be read as a **stable dynamical occupancy pattern** available to a localized assembly in the nuclear environment.

That shifts the interpretive burden. The primary object becomes the localized electron assembly plus the sea-mediated dynamical structure in which it moves.

#### Orbitals as regular dynamical patterns

On this reading, orbitals may correspond not to literal diffuse objects but to:

- equipotential or quasi-equipotential volumes,
- stable admissible regions of motion,
- recurring mode families in the nucleus plus Noether-sea background,
- or time-averaged occupancy patterns traced out by localized assemblies.

The familiar $s$, $p$, $d$, and $f$ shapes would then be understood as regular dynamical geometries generated by the atomic environment rather than as ontologically primary clouds.

This viewpoint is compatible with the thought that orbital geometry is both **regular** and **dynamic**. The visible orbital pattern would be the ledger of where a localized electron assembly can persist stably over time.

#### Electron-electron proximity and exclusion in $\mathbb{A}\mathbb{A}\mathbb{A}$

If electrons are localized assemblies, then the key question is no longer whether two electron probability clouds overlap in the textbook sense, but rather:

**How close can two localized electron assemblies approach one another in a stable bound atom?**

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framing, a stable atom would plausibly be a self-organized multi-assembly configuration in which:

- nuclear attraction draws electron assemblies into bound patterns,
- electron-electron repulsion prevents arbitrarily close approach,
- and the Noether sea mediates or reshapes the admissible dynamical structure.

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

#### Strong hypothesis to preserve

A strong version of the $\mathbb{A}\mathbb{A}\mathbb{A}$ orbital hypothesis is:

- electrons are localized assemblies,
- the atom is a dynamical multi-assembly system in the Noether sea,
- and the familiar orbital geometries arise as regular stable mode families or equipotential-pattern families for those assemblies.

If that stronger claim is right, then textbook orbital notation is not wrong, but incomplete. It would be a highly successful coarse-grained code for a deeper dynamical ledger.

#### Closure questions

For this idea to move from suggestive interpretation to closure, the following questions have to be answered constructively:

1. What dynamical law determines the admissible bound patterns for a single electron assembly around a nucleus?
2. What law sets the minimum approach distance, phase separation, or exclusion structure for two electron assemblies bound to the same nucleus?
3. Can the $s/p/d/f$ mode hierarchy be derived as a dynamical consequence of the Noether-sea response rather than inserted by analogy?
4. Can Pauli-style exclusion and Hund-style spreading be recovered as theorems of the assembly dynamics?
5. Can the resulting framework reproduce the known ordering patterns, spectroscopic splittings, magnetic moments, and chemical regularities encoded by standard orbital notation?

Those are the hard gates for turning the $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation of orbitals into a predictive closure rather than a suggestive re-description.

### 15. Full Electron-Configuration Table In Standard And Row Notation

The table below runs through the current known elements up to atomic number 118. It places five views side by side:

- the standard textbook electron-configuration string,
- the standard textbook shorthand with noble-gas compression,
- an `ECO` column for energy level, capacity, and occupancy written as three adjacent compact digits,
- an `EOC` column for energy level, occupancy, and capacity written as three adjacent compact digits,
- and the abbreviated row ledger using noble-gas core compression.

In the row-ledger columns, occupancies follow the fixed order `s, p, d, f`. Capacities use compact hexadecimal-style digits where `a = 10` and `e = 14`. Each occupied subshell term is rendered on its own line, and the noble-gas shorthand is vertically aligned to the row where the compressed core ends. For rows that exactly close a noble-gas core, the `= [Noble]` marker is appended directly to the final occupied line.

| Z | Element | Standard configuration | Abbreviated standard | ECO | EOC | Abbreviated row notation |
|---|---|---|---|---|---|---|
| 1 | Hydrogen | `1s1` | `1s1` | `121` | `112` | `E1 1/2` |
| 2 | Helium | `1s2` | `1s2 = [He]` | `122` | `122` | `E1 2/2 = [He]` |
| 3 | Lithium | `1s2`<br>`2s1` | `[He]`<br>`2s1` | `122`<br>`221` | `122`<br>`212` | `[He]`<br>`E2 1/2` |
| 4 | Beryllium | `1s2`<br>`2s2` | `[He]`<br>`2s2` | `122`<br>`222` | `122`<br>`222` | `[He]`<br>`E2 2/2` |
| 5 | Boron | `1s2`<br>`2s2`<br>`2p1` | `[He]`<br>`2s2`<br>`2p1` | `122`<br>`222`<br>`261` | `122`<br>`222`<br>`216` | `[He]`<br>`E2 2/2`<br>`E2 1/6` |
| 6 | Carbon | `1s2`<br>`2s2`<br>`2p2` | `[He]`<br>`2s2`<br>`2p2` | `122`<br>`222`<br>`262` | `122`<br>`222`<br>`226` | `[He]`<br>`E2 2/2`<br>`E2 2/6` |
| 7 | Nitrogen | `1s2`<br>`2s2`<br>`2p3` | `[He]`<br>`2s2`<br>`2p3` | `122`<br>`222`<br>`263` | `122`<br>`222`<br>`236` | `[He]`<br>`E2 2/2`<br>`E2 3/6` |
| 8 | Oxygen | `1s2`<br>`2s2`<br>`2p4` | `[He]`<br>`2s2`<br>`2p4` | `122`<br>`222`<br>`264` | `122`<br>`222`<br>`246` | `[He]`<br>`E2 2/2`<br>`E2 4/6` |
| 9 | Fluorine | `1s2`<br>`2s2`<br>`2p5` | `[He]`<br>`2s2`<br>`2p5` | `122`<br>`222`<br>`265` | `122`<br>`222`<br>`256` | `[He]`<br>`E2 2/2`<br>`E2 5/6` |
| 10 | Neon | `1s2`<br>`2s2`<br>`2p6` | `[He]`<br>`2s2`<br>`2p6 = [Ne]` | `122`<br>`222`<br>`266` | `122`<br>`222`<br>`266` | `[He]`<br>`E2 2/2`<br>`E2 6/6 = [Ne]` |
| 11 | Sodium | `1s2`<br>`2s2`<br>`2p6`<br>`3s1` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s1` | `122`<br>`222`<br>`266`<br>`321` | `122`<br>`222`<br>`266`<br>`312` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 1/2` |
| 12 | Magnesium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2` | `122`<br>`222`<br>`266`<br>`322` | `122`<br>`222`<br>`266`<br>`322` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 2/2` |
| 13 | Aluminium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p1` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p1` | `122`<br>`222`<br>`266`<br>`322`<br>`361` | `122`<br>`222`<br>`266`<br>`322`<br>`316` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 2/2`<br>`E3 1/6` |
| 14 | Silicon | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p2` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p2` | `122`<br>`222`<br>`266`<br>`322`<br>`362` | `122`<br>`222`<br>`266`<br>`322`<br>`326` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 2/2`<br>`E3 2/6` |
| 15 | Phosphorus | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p3` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p3` | `122`<br>`222`<br>`266`<br>`322`<br>`363` | `122`<br>`222`<br>`266`<br>`322`<br>`336` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 2/2`<br>`E3 3/6` |
| 16 | Sulfur | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p4` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p4` | `122`<br>`222`<br>`266`<br>`322`<br>`364` | `122`<br>`222`<br>`266`<br>`322`<br>`346` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 2/2`<br>`E3 4/6` |
| 17 | Chlorine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p5` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p5` | `122`<br>`222`<br>`266`<br>`322`<br>`365` | `122`<br>`222`<br>`266`<br>`322`<br>`356` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 2/2`<br>`E3 5/6` |
| 18 | Argon | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`3s2`<br>`3p6 = [Ar]` | `122`<br>`222`<br>`266`<br>`322`<br>`366` | `122`<br>`222`<br>`266`<br>`322`<br>`366` | &nbsp;<br>&nbsp;<br>`[Ne]`<br>`E3 2/2`<br>`E3 6/6 = [Ar]` |
| 19 | Potassium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`421` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`412` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2` |
| 20 | Calcium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2` |
| 21 | Scandium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`31a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 1/a` |
| 22 | Titanium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3a2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`32a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 2/a` |
| 23 | Vanadium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3a3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`33a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 3/a` |
| 24 | Chromium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s1`<br>`3d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s1`<br>`3d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`421`<br>`3a5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`412`<br>`35a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2`<br>`E3 5/a` |
| 25 | Manganese | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3a5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`35a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 5/a` |
| 26 | Iron | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3a6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`36a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 6/a` |
| 27 | Cobalt | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3a7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`37a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 7/a` |
| 28 | Nickel | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d8` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3a8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`38a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 8/a` |
| 29 | Copper | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s1`<br>`3d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s1`<br>`3d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`421`<br>`3aa` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`412`<br>`3aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 1/2`<br>`E3 a/a` |
| 30 | Zinc | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 a/a` |
| 31 | Gallium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`461` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`416` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 a/a`<br>`E4 1/6` |
| 32 | Germanium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`462` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`426` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 a/a`<br>`E4 2/6` |
| 33 | Arsenic | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`463` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`436` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 a/a`<br>`E4 3/6` |
| 34 | Selenium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`464` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`446` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 a/a`<br>`E4 4/6` |
| 35 | Bromine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`465` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`456` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 a/a`<br>`E4 5/6` |
| 36 | Krypton | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`4s2`<br>`3d10`<br>`4p6 = [Kr]` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Ar]`<br>`E4 2/2`<br>`E3 a/a`<br>`E4 6/6 = [Kr]` |
| 37 | Rubidium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`521` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2` |
| 38 | Strontium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2` |
| 39 | Yttrium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`41a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 1/a` |
| 40 | Zirconium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4a2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`42a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 2/a` |
| 41 | Niobium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`521`<br>`4a4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`44a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 4/a` |
| 42 | Molybdenum | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`521`<br>`4a5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`45a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 5/a` |
| 43 | Technetium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4a5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`45a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 5/a` |
| 44 | Ruthenium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`521`<br>`4a7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`47a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 7/a` |
| 45 | Rhodium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d8` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`521`<br>`4a8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`48a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 8/a` |
| 46 | Palladium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`4d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`4d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`4aa` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`4aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E4 a/a` |
| 47 | Silver | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s1`<br>`4d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s1`<br>`4d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`521`<br>`4aa` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`512`<br>`4aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 1/2`<br>`E4 a/a` |
| 48 | Cadmium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 a/a` |
| 49 | Indium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`561` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`516` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 a/a`<br>`E5 1/6` |
| 50 | Tin | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`562` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`526` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 a/a`<br>`E5 2/6` |
| 51 | Antimony | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`563` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`536` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 a/a`<br>`E5 3/6` |
| 52 | Tellurium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`564` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`546` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 a/a`<br>`E5 4/6` |
| 53 | Iodine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`565` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`556` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 a/a`<br>`E5 5/6` |
| 54 | Xenon | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`5s2`<br>`4d10`<br>`5p6 = [Xe]` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Kr]`<br>`E5 2/2`<br>`E4 a/a`<br>`E5 6/6 = [Xe]` |
| 55 | Cesium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`621` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`612` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2` |
| 56 | Barium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2` |
| 57 | Lanthanum | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`5d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`5d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`5a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`51a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E5 1/a` |
| 58 | Cerium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`5d1`<br>`4f1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`5d1`<br>`4f1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`5a1`<br>`4e1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`51a`<br>`41e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E5 1/a`<br>`E4 1/e` |
| 59 | Praseodymium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4e3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`43e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 3/e` |
| 60 | Neodymium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4e4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`44e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 4/e` |
| 61 | Promethium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4e5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`45e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 5/e` |
| 62 | Samarium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4e6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`46e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 6/e` |
| 63 | Europium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4e7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`47e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 7/e` |
| 64 | Gadolinium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f7`<br>`5d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f7`<br>`5d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4e7`<br>`5a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`47e`<br>`51a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 7/e`<br>`E5 1/a` |
| 65 | Terbium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f9` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4e9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`49e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 9/e` |
| 66 | Dysprosium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ea` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ae` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 a/e` |
| 67 | Holmium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f11` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f11` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4eb` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4be` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 b/e` |
| 68 | Erbium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f12` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f12` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ec` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ce` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 c/e` |
| 69 | Thulium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f13` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f13` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ed` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4de` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 d/e` |
| 70 | Ytterbium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e` |
| 71 | Lutetium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`51a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 1/a` |
| 72 | Hafnium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5a2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`52a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 2/a` |
| 73 | Tantalum | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5a3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`53a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 3/a` |
| 74 | Tungsten | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5a4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`54a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 4/a` |
| 75 | Rhenium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5a5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`55a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 5/a` |
| 76 | Osmium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5a6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`56a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 6/a` |
| 77 | Iridium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5a7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`57a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 7/a` |
| 78 | Platinum | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s1`<br>`4f14`<br>`5d9` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s1`<br>`4f14`<br>`5d9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`621`<br>`4ee`<br>`5a9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`612`<br>`4ee`<br>`59a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2`<br>`E4 e/e`<br>`E5 9/a` |
| 79 | Gold | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s1`<br>`4f14`<br>`5d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s1`<br>`4f14`<br>`5d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`621`<br>`4ee`<br>`5aa` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`612`<br>`4ee`<br>`5aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 1/2`<br>`E4 e/e`<br>`E5 a/a` |
| 80 | Mercury | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 a/a` |
| 81 | Thallium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`661` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`616` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 a/a`<br>`E6 1/6` |
| 82 | Lead | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`662` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`626` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 a/a`<br>`E6 2/6` |
| 83 | Bismuth | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`663` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`636` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 a/a`<br>`E6 3/6` |
| 84 | Polonium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`664` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`646` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 a/a`<br>`E6 4/6` |
| 85 | Astatine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`665` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`656` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 a/a`<br>`E6 5/6` |
| 86 | Radon | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6 = [Rn]` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Xe]`<br>`E6 2/2`<br>`E4 e/e`<br>`E5 a/a`<br>`E6 6/6 = [Rn]` |
| 87 | Francium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`721` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`712` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 1/2` |
| 88 | Radium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2` |
| 89 | Actinium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`6a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E6 1/a` |
| 90 | Thorium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`6d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`6d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`6a2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`62a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E6 2/a` |
| 91 | Protactinium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f2`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f2`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5e2`<br>`6a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`52e`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 2/e`<br>`E6 1/a` |
| 92 | Uranium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f3`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f3`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5e3`<br>`6a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`53e`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 3/e`<br>`E6 1/a` |
| 93 | Neptunium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f4`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f4`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5e4`<br>`6a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`54e`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 4/e`<br>`E6 1/a` |
| 94 | Plutonium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5e6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`56e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 6/e` |
| 95 | Americium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5e7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`57e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 7/e` |
| 96 | Curium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f7`<br>`6d1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f7`<br>`6d1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5e7`<br>`6a1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`57e`<br>`61a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 7/e`<br>`E6 1/a` |
| 97 | Berkelium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f9` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5e9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`59e` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 9/e` |
| 98 | Californium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ea` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ae` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 a/e` |
| 99 | Einsteinium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f11` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f11` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5eb` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5be` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 b/e` |
| 100 | Fermium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f12` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f12` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ec` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ce` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 c/e` |
| 101 | Mendelevium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f13` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f13` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ed` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5de` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 d/e` |
| 102 | Nobelium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e` |
| 103 | Lawrencium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`7p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`7p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`761` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`716` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E7 1/6` |
| 104 | Rutherfordium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6a2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`62a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 2/a` |
| 105 | Dubnium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6a3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`63a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 3/a` |
| 106 | Seaborgium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6a4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`64a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 4/a` |
| 107 | Bohrium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6a5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`65a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 5/a` |
| 108 | Hassium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6a6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`66a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 6/a` |
| 109 | Meitnerium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d7` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6a7` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`67a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 7/a` |
| 110 | Darmstadtium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d8` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6a8` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`68a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 8/a` |
| 111 | Roentgenium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d9` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6a9` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`69a` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 9/a` |
| 112 | Copernicium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 a/a` |
| 113 | Nihonium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p1` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p1` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`761` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`716` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 a/a`<br>`E7 1/6` |
| 114 | Flerovium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p2` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p2` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`762` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`726` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 a/a`<br>`E7 2/6` |
| 115 | Moscovium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p3` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p3` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`763` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`736` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 a/a`<br>`E7 3/6` |
| 116 | Livermorium | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p4` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p4` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`764` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`746` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 a/a`<br>`E7 4/6` |
| 117 | Tennessine | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p5` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p5` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`765` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`756` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 a/a`<br>`E7 5/6` |
| 118 | Oganesson | `1s2`<br>`2s2`<br>`2p6`<br>`3s2`<br>`3p6`<br>`4s2`<br>`3d10`<br>`4p6`<br>`5s2`<br>`4d10`<br>`5p6`<br>`6s2`<br>`4f14`<br>`5d10`<br>`6p6`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p6` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`7s2`<br>`5f14`<br>`6d10`<br>`7p6` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`766` | `122`<br>`222`<br>`266`<br>`322`<br>`366`<br>`422`<br>`3aa`<br>`466`<br>`522`<br>`4aa`<br>`566`<br>`622`<br>`4ee`<br>`5aa`<br>`666`<br>`722`<br>`5ee`<br>`6aa`<br>`766` | &nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>`[Rn]`<br>`E7 2/2`<br>`E5 e/e`<br>`E6 a/a`<br>`E7 6/6` |
