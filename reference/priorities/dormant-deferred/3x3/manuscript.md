# Three Polarity Classes in Three Ordered Slots

## 1. What the slot construction describes

### 1.1. A finite description before dynamics

The three-slot construction separates polarity composition from placement. It describes how three classes of two polar sites can occupy three labeled positions, and how their total electric inventory changes with composition. Its counting statements follow from a finite alphabet and an explicitly chosen ordering convention. They do not establish that every formal filling is a realized assembly, a stable particle or a distinct physical state.

The [original slot analysis](priorities.md) calls the classes binaries. Here the labels denote only the two-site polarity classes used in that analysis:

$$
\mathcal B=\{B^-,B^0,B^+\},\qquad
B^-=(-,-),\quad B^0=(+,-),\quad B^+=(+,+).
$$

The mixed pair is represented by one canonical ordering. This representation suppresses the distinction between its two internal orders; it does not prove those orders dynamically equivalent. In the [quark catalog](../../../../content/markdown/aaa/assemblies/fermions/quarks.md#axis-notation), the corresponding symbols describe polar dyads attached to indexed axes. They do not change an underlying neutral source binary into a same-polarity source binary. Translating the slot notation into that architecture must preserve this distinction.

### 1.2. Nine local assignments and twenty-seven complete fillings

Let the slot set be

$$
\mathcal S=\{I,M,O\},
$$

with the original proposed radial labels Inner, Middle and Outer. A single class-and-slot assignment is an element of the nine-element product set of classes and slots. Its placement table is

| Polarity class | Inner $I$ | Middle $M$ | Outer $O$ |
| --- | --- | --- | --- |
| $B^-$ | $B^-_I$ | $B^-_M$ | $B^-_O$ |
| $B^0$ | $B^0_I$ | $B^0_M$ | $B^0_O$ |
| $B^+$ | $B^+_I$ | $B^+_M$ | $B^+_O$ |

A complete filling is instead a function assigning one class to each slot. Repetition is allowed, and there is no requirement to use each class once. Thus its formal state set is

$$
\mathcal F=\{f:\mathcal S\longrightarrow\mathcal B\},
\qquad |\mathcal F|=3\cdot3\cdot3=27.
$$

For example, the all-negative filling uses the first row at all three positions; a filling with one class of each kind uses one cell from each row. The nine cells are local choices, not nine complete particles. Nor does the number 27 assign probabilities: equal counting weights would be an additional mathematical choice, not a measure derived from delayed assembly histories.

## 2. Composition, multiplicity and electric inventory

### 2.1. The ten composition classes

For a filling, let $n_-$, $n_0$ and $n_+$ count its negative, mixed and positive classes. Then

$$
n_-+n_0+n_+=3,
\qquad n_-,n_0,n_+\in\{0,1,2,3\}.
$$

The number of ordered fillings with a fixed composition follows by selecting the slots for each class:

$$
M(n_-,n_0,n_+)=\frac{3!}{n_-!\,n_0!\,n_+!}.
$$

There are ten such nonnegative count triples. A repeated class has fewer ordered variants than three distinct classes because exchanging equal entries leaves the filling unchanged. Equivalently, under the purely formal action that permutes the three slot labels, these ten compositions are the ten orbits. That mathematical quotient does not authorize identifying radial exchanges as a physical gauge symmetry.

### 2.2. Charge follows from the polarity imbalance

Each mixed class supplies one positive and one negative polar site; each unmixed class supplies two of one sign. Consequently the positive and negative site counts satisfy

$$
N_P=n_0+2n_+,\qquad N_E=2n_-+n_0,\qquad N_P+N_E=6.
$$

Use $e>0$ for the magnitude of the elementary electric charge and the source convention $\epsilon=e/6$. The net electric charge in this bookkeeping is then the derived identity

$$
Q=(N_P-N_E)\epsilon
=2(n_+-n_-)\epsilon
=\frac{n_+-n_-}{3}e.
$$

The sign convention makes the original use of $|e|$ and signed particle charges unambiguous. A mixed class contributes no net charge by itself. Its placement can still change a formal pattern or a proposed geometry; the charge map forgets that information.

The full composition table retains the original candidate-sector comparisons. The last column is a comparison by exposed inventory, not an identification of a complete assembly or a proof of its existence.

| Representative classes | Counts $(n_-,n_0,n_+)$ | Ordered variants | $(N_P,N_E)$ | Charge | Inventory comparison |
| --- | --- | ---: | --- | --- | --- |
| $(B^-,B^-,B^-)$ | $(3,0,0)$ | 1 | $(0,6)$ | $-e$ | Electron-like charged-lepton sector |
| $(B^-,B^-,B^0)$ | $(2,1,0)$ | 3 | $(1,5)$ | $-2e/3$ | Anti-up-like sector |
| $(B^-,B^-,B^+)$ | $(2,0,1)$ | 3 | $(2,4)$ | $-e/3$ | Down-type Family I candidate |
| $(B^-,B^0,B^0)$ | $(1,2,0)$ | 3 | $(2,4)$ | $-e/3$ | Down-type Family II candidate |
| $(B^-,B^0,B^+)$ | $(1,1,1)$ | 6 | $(3,3)$ | $0$ | Neutral mixed sector |
| $(B^0,B^0,B^0)$ | $(0,3,0)$ | 1 | $(3,3)$ | $0$ | Neutral all-mixed sector |
| $(B^-,B^+,B^+)$ | $(1,0,2)$ | 3 | $(4,2)$ | $+e/3$ | Anti-down-like Family I candidate |
| $(B^0,B^0,B^+)$ | $(0,2,1)$ | 3 | $(4,2)$ | $+e/3$ | Anti-down-like Family II candidate |
| $(B^0,B^+,B^+)$ | $(0,1,2)$ | 3 | $(5,1)$ | $+2e/3$ | Up-type sector |
| $(B^+,B^+,B^+)$ | $(0,0,3)$ | 1 | $(6,0)$ | $+e$ | Positron-like charged-lepton sector |

The multiplicities sum to 27. Combining rows by charge gives multiplicities 1, 3, 6, 7, 6, 3 and 1 in increasing charge order. In particular, neutrality admits both the six permutations with one class of each kind and the single all-mixed filling. Equal charge therefore does not imply equal composition, even before any path or symmetry information is introduced. Conversely, a complete matter/antimatter relation requires more than opposite axial inventories; the quark catalog assigns it to a polarity-conjugate retained branch history.

## 3. What remains between counting and particle structure

### 3.1. Radial positions do not yet supply indexed color axes

The proposed radial labels refer to a possible inner-to-outer ordering. The current quark catalog instead uses persistent indices 1, 2 and 3 for its gauge-facing axes. Its source-record support indices do not themselves encode a radius order. The older slot source's reference to ordered axes labeled H, M and L therefore cannot be taken as an already established radial-to-color dictionary.

A bridge would have to assign actual geometric and history-dependent objects to the slots and axes, state when the assignment exists, and specify which transformations preserve the relevant physical record. Formal permutations can then be compared with relabelings, physical reconfigurations or distinct branches. Until that construction is supplied, neither three slots nor six permutations of a mixed composition determine color, generation or handedness. A discrete permutation action alone also supplies no continuous color-group representation or interaction law.

This distinction preserves the source's three questions: which classes occur, where they are placed, and which rearrangements are physically distinct. The first fixes the electric inventory. The second adds formal ordering. The third requires geometric and dynamical information absent from the count.

### 3.2. Two down-type families are competing candidates

The up-type template has two positive classes and one exceptional mixed class. The down-type inventory has two composition families: one positive and two negative classes, or one negative and two mixed classes. Both have two axes of one class and one exceptional axis when interpreted as the catalog's polar dyads. Each family separately provides three locations for the exceptional axis.

The [canonical selection condition](../../../../content/markdown/aaa/assemblies/fermions/quarks.md#down-type-template) is stronger than merely retaining both rows in a catalog. For a realized down-type branch, a single selected family must supply its color triplet over the declared stability window; the other must be unstable, transient or excluded by the relevant hadron conditions. Counting both families as independent long-lived species would bypass that unresolved selection problem. The two families are not an established assignment of different quark generations.

The finite slot construction cannot choose between them. It contains no master-equation trajectory, delayed interaction, equilibrium, admissibility restriction or retention argument. Those would have to be developed from the primitives of $\mathbb{A}\mathbb{A}\mathbb{A}$ and the relevant assembly history, not imported from a particle label attached to a table row.

### 3.3. The scope of the result

The derived result is the finite classification under the stated three-class convention, its multiplicities and its polarity-based charge identity. A counterexample to those mathematical statements would be an omitted or duplicated admissible filling, an incorrect multiplicity, or a site count inconsistent with the declared classes. Their premises also matter: retaining both internal orders of a mixed dyad or restricting admissible fillings changes the formal counting problem.

The proposed physical use remains conditional. A radial-to-indexed-axis bridge, an account of physically equivalent permutations and a dynamical selection of the down-type family are separate missing constructions. Extending the description to conjugate core dressings or generation structure requires their branch histories rather than further charge arithmetic. The table organizes those questions without answering them by enumeration.
