# Quarks

## Overview

This chapter collects the quark catalog for $\mathbb{A}\mathbb{A}\mathbb{A}$ in one place. The aim is narrower than a full QCD derivation. It is to state, in a single canonical reference, how the six quark flavors are built from the nested shell braid program, how their axial patterns encode charge, how color is assigned, how many architrinos each flavor contains, and what a gluon is allowed to do to a quark state.

At the substrate level, a quark is a Noether braid assembly with an axial layer. The core fixes generation tier and matter chirality. The six-site axial layer fixes electric charge and the weak-active axial pattern. Color then appears when one axis is exceptional relative to the other two. At the effective level this reproduces the quark triplet structure of the Standard Model and supplies the coupling channel for gluons.

The chapter uses axis strings and tables so the catalog is explicit without depending on artwork.

## Architecture

### Core and axial split

The quark construction used here follows the same Noether braid-plus-axial split already used in the fermion mapping chapters:

- The **Noether braid** is the neutral binary scaffold.
- The **axial layer** is the six-site organization carrying the visible charge pattern.

For matter quarks, the core is a **pro-braid**. It is neutral in total charge and differs across generations by shielding-coherence level, not by changing the gauge-facing color frame:

- **Generation I:** nested shell braid shielding branch, 6 coherent scaffold architrinos.
- **Generation II:** bi-binary shielding branch, 4 coherent scaffold architrinos; the outer support tier is depleted on the branch lifetime window.
- **Generation III:** uni-binary shielding branch, 2 coherent scaffold architrinos; the outer and middle support tiers are depleted on the branch lifetime window.

The axial layer stays six sites wide in all three generations. Each site is occupied by either a positrino $(+\epsilon)$ or an electrino $(-\epsilon)$, with $\epsilon = |e|/6$. The H/M/L axial dyads remain the branch-level record that color and electroweak bookkeeping read, even when one or more shielding tiers no longer supply coherent support.

### Counting rule

The total constituent count of a quark is therefore
$$
N_{\text{quark}} = N_{\text{core}} + 6
$$
with
$$
N_{\text{core}} \in \{6,4,2\}
$$
for Generations I, II, and III respectively. Here $N_{\text{core}}$ counts coherent shielding-scaffold architrinos in the promoted branch, not every transient residue of an ablated or relocking tier. This gives:

- Generation I quark: 12 architrinos.
- Generation II quark: 10 architrinos.
- Generation III quark: 8 architrinos.

### Axis notation

To describe color and axial geometry compactly, use the three core axes $(H,M,L)$ and the following axis classes:

- $P^+ = (+,+)$: an axis whose two polar sites are both positrino.
- $P^- = (-,-)$: an axis whose two polar sites are both electrino.
- $P^{m} = (+,-)$ or $(-,+)$: a mixed axis with one positrino and one electrino.

In the fully shielded implementation picture, each axis contains:

- one neutral source binary, with one orbiting positrino and one orbiting electrino,
- plus one polar dyad attached to that binary axis.

The axis class labels $P^+$, $P^-$, and $P^{m}$ refer only to those one polar dyad. They do not mean that the underlying source binary stops being neutral. In higher-generation branches, a depleted shielding tier may no longer act as a coherent source binary, but the polar dyad and its H/M/L branch label remain the gauge-facing color record until the quark branch dissociates.

Colorless fermions keep the three axes equivalent. Quarks do not. A quark becomes color-charged when exactly one axis is exceptional relative to the other two.

## Charge classes and axis-exceptionality

### Up-type template

All up-type quarks share the same six-site axial count:
$$
5P + 1E
$$
That gives net charge
$$
Q = \frac{5-1}{6}e = +\frac{2}{3}e
$$

At axis level, the canonical up-type structure is:

- two axes of type $P^+$,
- one exceptional axis of type $P^{m}$.

In ordered-axis notation, the three color states are the three permutations of
$$
(P^{m},P^+,P^+)
$$

### Down-type template

All down-type quarks share the same six-site axial count:
$$
2P + 4E
$$
That gives net charge
$$
Q = \frac{2-4}{6}e = -\frac{1}{3}e
$$

The down-type sector admits two allowed axis-pattern families:

1. Family I:
   one axis of type $P^+$ and two axes of type $P^-$, i.e. permutations of
   $$
   (P^+,P^-,P^-)
   $$
2. Family II:
   one axis of type $P^-$ and two axes of type $P^{m}$, i.e. permutations of
   $$
   (P^-,P^{m},P^{m})
   $$

Both families satisfy the same structural rule: two axes are in one class and one axis is exceptional. That common axis-exceptionality is what carries color. They are therefore candidate sectors, not two independent low-energy species. For any realized down-type branch, a single selected family $F_\star\in\{I,II\}$ supplies the full red/green/blue color triplet over the declared stability window; the unselected family must be unstable, high-energy transient, or excluded by the hadron boundary conditions. The catalog does not assign $d$, $s$, and $b$ to separate families as a settled rule.

### Right-handed singlet bookkeeping

The image-level implementation candidate for right-handed pro-braid couplings matches the bookkeeping already used elsewhere in the repo and is useful to state explicitly here.

For right-handed quarks:

- the six-site axial counts stay the same as in the flavor catalog,
- the weak-coupling triad is treated as hidden or inactive,
- therefore
  $$
  T_3 = 0
  $$
- and the weak hypercharge is determined directly by
  $$
  Y = 2Q
  $$

This gives the standard singlet assignments:

| State family | Axial inventory | Electric charge $Q$ | Right-handed assignment |
| --- | --- | ---: | ---: |
| $u^R,c^R,t^R$ | $5P,1E$ | $+2/3$ | $T_3=0,\ Y=+4/3$ |
| $d^R,s^R,b^R$ | $2P,4E$ | $-1/3$ | $T_3=0,\ Y=-2/3$ |

The same count logic is what makes the right-handed quark sector look naturally like an SU(2) singlet arc in the six-site axial space: once the weak-coupling triad is no longer exposed, the only remaining electroweak datum is the net axial charge. In that sense, the right-handed quark state is not defined by a new axial pattern, but by the same pattern viewed in a geometrically shielded coupling posture.

### Left-handed doublet bookkeeping (conjectural implementation candidate)

The corresponding left-handed image suggests a useful implementation candidate for pro-braid weak couplings:

- the left-handed quark states are the exposed-coupling branches of the same six-site axial inventories,
- the up-type and down-type quarks then sit on the same electroweak doublet arc,
- and the distinction between them is carried by the exposed weak-coupling triad rather than by a different total axial inventory.

In this bookkeeping:

- the left-handed up-type states keep the $5P,1E$ axial count,
- the left-handed down-type states keep the $2P,4E$ axial count,
- the up-type branch carries
  $$
  T_3 = +\frac{1}{2}, \qquad Y = +\frac{1}{3}
  $$
- the down-type branch carries
  $$
  T_3 = -\frac{1}{2}, \qquad Y = +\frac{1}{3}
  $$

This gives the standard doublet bookkeeping:

| State family | Axial count | Electric charge $Q$ | Left-handed assignment |
| --- | --- | ---: | ---: |
| $u^L,c^L,t^L$ | $5P,1E$ | $+2/3$ | $T_3=+1/2,\ Y=+1/3$ |
| $d^L,s^L,b^L$ | $2P,4E$ | $-1/3$ | $T_3=-1/2,\ Y=+1/3$ |

The value of this conjecture is that it places the quark doublet in the same six-site counting language as the lepton doublet:

- $6E$ for charged leptons,
- $3P,3E$ for neutrinos,
- $2P,4E$ for down-type quarks,
- $5P,1E$ for up-type quarks.

That makes the quark sector look less like a separate lookup table and more like a continuous family of exposed coupling postures on the same axial-inventory wheel. At present this should be treated as a unifying implementation candidate, not a closed proof of weak-sector geometry.

### Anti-braid mirror bookkeeping (conjectural reverse-engineered candidate)

The two anti-braid images suggest a clean mirror rule that is worth recording explicitly. This is branch-record bookkeeping, not a constituent relabel: matter/antimatter is carried by pro/anti orientation plus retained path-history rows, causal-root rows, wake-history rows, action rows, and stability rows. The axial polarity inventory supplies the charge and color bookkeeping row; it is not itself the matter/antimatter label.

Start by mapping the quark axial inventories to their charged-sector conjugate rows:

- anti-up family $(\bar u,\bar c,\bar t)$:
  $$
  1P,5E,\qquad Q=-\frac{2}{3}
  $$
- anti-down family $(\bar d,\bar s,\bar b)$:
  $$
  4P,2E,\qquad Q=+\frac{1}{3}
  $$

The conjectural rule then reads:

- **right-handed anti-braid branches** behave as the electroweak mirrors of the pro-braid left-handed doublets,
- **left-handed anti-braid branches** behave as the electroweak mirrors of the pro-braid right-handed singlets.

This is structurally attractive because it matches the Standard-Model statement already used elsewhere in the repo: charged-current weak interactions act on left-handed quarks and, equivalently, on right-handed antiquarks.
At a broader bookkeeping level, it also suggests a compact charged-fermion rule: pro-left doublets mirror anti-right doublets, while pro-right singlets mirror anti-left singlets.

#### Right-handed antiquark bookkeeping

In this reverse-engineered candidate:

| State family | Axial count | Electric charge $Q$ | Right-handed anti-braid assignment |
| --- | --- | ---: | ---: |
| $\bar u^R,\bar c^R,\bar t^R$ | $1P,5E$ | $-2/3$ | $T_3=-1/2,\ Y=-1/3$ |
| $\bar d^R,\bar s^R,\bar b^R$ | $4P,2E$ | $+1/3$ | $T_3=+1/2,\ Y=-1/3$ |

These are exactly the charge-conjugate mirrors of the pro-braid left-handed quark doublet:
$$
\left(+\frac{1}{2},+\frac{1}{3}\right)\mapsto \left(-\frac{1}{2},-\frac{1}{3}\right),\qquad
\left(-\frac{1}{2},+\frac{1}{3}\right)\mapsto \left(+\frac{1}{2},-\frac{1}{3}\right)
$$

#### Left-handed antiquark bookkeeping

For the left-handed anti-braid branch, the same mirror logic gives:

| State family | Axial count | Electric charge $Q$ | Left-handed anti-braid assignment |
| --- | --- | ---: | ---: |
| $\bar u^L,\bar c^L,\bar t^L$ | $1P,5E$ | $-2/3$ | $T_3=0,\ Y=-4/3$ |
| $\bar d^L,\bar s^L,\bar b^L$ | $4P,2E$ | $+1/3$ | $T_3=0,\ Y=+2/3$ |

These are the charge-conjugate mirrors of the pro-braid right-handed singlets:
$$
\left(0,+\frac{4}{3}\right)\mapsto \left(0,-\frac{4}{3}\right),\qquad
\left(0,-\frac{2}{3}\right)\mapsto \left(0,+\frac{2}{3}\right)
$$

The practical advantage of this rule is that it closes the quark-sector wheel without inventing a separate anti-braid lookup system. Once the pro-braid sector is specified, the anti-braid sector follows by anti-braid branch orientation, the conjugate charged-sector polarity ledger, and the handedness swap in weak exposure.

This remains a conjectural bookkeeping layer derived by reverse engineering from the weak-coupling pictures. It should not yet be treated as a proved weak-sector theorem.

### Electroweak-plane embedding (conjectural map to the standard diagram)

The larger comparative picture suggested by the diagram is that the six-site axial-inventory wheel may be embedded directly into the familiar electroweak plane with coordinates
$$
(T_3,Y)
$$
while electric charge appears on the diagonal through
$$
Q = T_3 + \frac{Y}{2}
$$

For quarks, this gives a compact map:

| State | $(T_3,Y)$ | Charge check |
| --- | --- | --- |
| $u^L,c^L,t^L$ | $\left(+\frac{1}{2},+\frac{1}{3}\right)$ | $+\frac{1}{2}+\frac{1}{6}=+\frac{2}{3}$ |
| $d^L,s^L,b^L$ | $\left(-\frac{1}{2},+\frac{1}{3}\right)$ | $-\frac{1}{2}+\frac{1}{6}=-\frac{1}{3}$ |
| $u^R,c^R,t^R$ | $\left(0,+\frac{4}{3}\right)$ | $0+\frac{2}{3}=+\frac{2}{3}$ |
| $d^R,s^R,b^R$ | $\left(0,-\frac{2}{3}\right)$ | $0-\frac{1}{3}=-\frac{1}{3}$ |
| $\bar u^R,\bar c^R,\bar t^R$ | $\left(-\frac{1}{2},-\frac{1}{3}\right)$ | $-\frac{1}{2}-\frac{1}{6}=-\frac{2}{3}$ |
| $\bar d^R,\bar s^R,\bar b^R$ | $\left(+\frac{1}{2},-\frac{1}{3}\right)$ | $+\frac{1}{2}-\frac{1}{6}=+\frac{1}{3}$ |
| $\bar u^L,\bar c^L,\bar t^L$ | $\left(0,-\frac{4}{3}\right)$ | $0-\frac{2}{3}=-\frac{2}{3}$ |
| $\bar d^L,\bar s^L,\bar b^L$ | $\left(0,+\frac{2}{3}\right)$ | $0+\frac{1}{3}=+\frac{1}{3}$ |

What makes this useful is not merely that it reproduces the standard charge formula. It also suggests that the axial-inventory wheel may be functioning as a geometric pre-mixing chart:

- horizontal separation distinguishes weak-isospin splitting,
- vertical separation distinguishes hypercharge loading,
- the diagonal coordinate is the observed electromagnetic charge,
- and quark versus antiquark states appear as charge-conjugate reflections within the same plane.

This should still be treated cautiously. The image supports a candidate mapping to the standard electroweak diagram, but it does not yet derive the Weinberg-angle mixing itself from quark microgeometry. In other words, the map looks structurally compatible with the standard diagram, but it is not yet a closure proof for electroweak mixing.

## Six-flavor catalog

### Canonical flavor table

| Flavor | Type | Generation | Core architecture | Core architrinos | Axial pattern | Net charge | Total architrinos | Axis template |
| --- | --- | --- | --- | ---: | --- | ---: | ---: | --- |
| $u$ | up-type | I | pro nested shell braid | 6 | $5P,1E$ | $+2/3$ | 12 | permutations of $(P^{m},P^+,P^+)$ |
| $d$ | down-type | I | pro nested shell braid | 6 | $2P,4E$ | $-1/3$ | 12 | selected family $F_\star$: permutations of $(P^+,P^-,P^-)$ if $F_\star=I$, or $(P^-,P^{m},P^{m})$ if $F_\star=II$ |
| $c$ | up-type | II | pro bi-binary | 4 | $5P,1E$ | $+2/3$ | 10 | same up-type color template on a Generation-II core |
| $s$ | down-type | II | pro bi-binary | 4 | $2P,4E$ | $-1/3$ | 10 | same selected-family rule on a Generation-II core |
| $t$ | up-type | III | pro uni-binary | 2 | $5P,1E$ | $+2/3$ | 8 | same up-type color template on a Generation-III core |
| $b$ | down-type | III | pro uni-binary | 2 | $2P,4E$ | $-1/3$ | 8 | same selected-family rule on a Generation-III core |

### Flavor-by-flavor notes

#### Up quark

The up quark is the ground-state up-type quark. It uses the full pro nested shell braid core and the $5P,1E$ axial layer. Its defining axis geometry is one mixed axis against two positrino-rich axes.

#### Down quark

The down quark is the ground-state down-type quark. It also uses the full pro nested shell braid core, but with the $2P,4E$ axial layer. Its color structure comes from a single exceptional axis within the selected Family-I or Family-II sector, not from both families appearing as independent down-like species.

#### Charm quark

The charm quark keeps the up-type axial pattern but sheds the outer shielding binary. In this bookkeeping it is therefore a Generation-II up-type core with the same visible charge geometry as the up quark but a more exposed core.

#### Strange quark

The strange quark is the Generation-II down-type partner of charm. It keeps the $2P,4E$ axial pattern but lives on a bi-binary core rather than a nested shell braid core, with the same selected-family branch rule applied after the shielding tier is fixed.

#### Top quark

The top quark is the most exposed up-type branch in the present catalog. It carries the same $5P,1E$ axial inventory as the lighter up-type quarks but only a uni-binary core. Its total count is therefore only 8 architrinos. This is the most exposed quark branch and, correspondingly, the least stable.

#### Bottom quark

The bottom quark is the Generation-III down-type branch. It carries the down-type $2P,4E$ axial pattern on a uni-binary core. Like the top quark, it is highly exposed compared with Generation-I quarks, though the down-type selected-family sector remains a separate branch-selection target.

## Color assignments

### Color as exceptional-axis phase

For any quark flavor $q$, the color space is the ordered basis
$$
\mathcal{H}^{\text{color}}_q = \mathrm{span}\{|q_H\rangle, |q_M\rangle, |q_L\rangle\}
$$
where $|q_H\rangle$, $|q_M\rangle$, and $|q_L\rangle$ mean that the exceptional axis sits on $H$, $M$, or $L$ respectively.

This basis may be identified with the conventional color labels by the fixed phase convention
$$
|q_H\rangle \leftrightarrow \text{Red} \leftrightarrow 0^\circ
$$
$$
|q_M\rangle \leftrightarrow \text{Green} \leftrightarrow 120^\circ
$$
$$
|q_L\rangle \leftrightarrow \text{Blue} \leftrightarrow 240^\circ
$$

The exact angular labels are conventional. What matters geometrically is that the three states are separated by the three-way axis choice and behave as the triplet basis of the color sector.

### Up-type color table

| Color | Ordered axis pattern $(H,M,L)$ | Interpretation |
| --- | --- | --- |
| Red | $(P^{m},P^+,P^+)$ | H-axis exceptional |
| Green | $(P^+,P^{m},P^+)$ | M-axis exceptional |
| Blue | $(P^+,P^+,P^{m})$ | L-axis exceptional |

This table applies directly to $u$, and by generation lifting also to $c$ and $t$.

### Up-type implementation candidate

The most concrete current implementation candidate is:

- every axis keeps its neutral source binary,
- two axes carry polar-dyad decorations $(+,+)$,
- one axis carries the mixed polar dyad $(+,-)$ or $(-,+)$,
- and the color label is set by which axis carries that mixed polar dyad.

So for an up quark:

- **Red** means the H-axis is the mixed axis and the other two axes are $(+,+)$,
- **Green** means the M-axis is the mixed axis,
- **Blue** means the L-axis is the mixed axis.

This matches the intuitive “minority carrier” language already used elsewhere in the repo, but it sharpens it: the minority electrino is most naturally understood as living on one of the one polar dyad of the exceptional axis, not as replacing one member of the neutral source binary itself.

The two orderings
$$
(+,-)\quad\text{and}\quad(-,+)
$$
on the exceptional axis should be treated as two micro-configurations within the same color sector unless a later derivation shows that one of them carries an additional observable phase, helicity bias, or stability difference. At present they are best regarded as implementation-level variants of the same color assignment.

The corresponding antiquark is obtained by the charged-sector conjugate axial pattern together with anti-braid orientation, giving the anti-red, anti-green, and anti-blue states.

### Down-type color tables

Family I:

| Color | Ordered axis pattern $(H,M,L)$ | Interpretation |
| --- | --- | --- |
| Red | $(P^+,P^-,P^-)$ | H-axis exceptional |
| Green | $(P^-,P^+,P^-)$ | M-axis exceptional |
| Blue | $(P^-,P^-,P^+)$ | L-axis exceptional |

Family II:

| Color | Ordered axis pattern $(H,M,L)$ | Interpretation |
| --- | --- | --- |
| Red | $(P^-,P^{m},P^{m})$ | H-axis exceptional |
| Green | $(P^{m},P^-,P^{m})$ | M-axis exceptional |
| Blue | $(P^{m},P^{m},P^-)$ | L-axis exceptional |

These are candidate-sector tables. For any realized $d$, $s$, or $b$ branch, one selected family $F_\star$ supplies the three color states; the other family is not counted as an additional long-lived down-type particle. A branch that leaves both tables comparably stable in the same low-energy window over-predicts down-type species and fails the selection target.

### Colorless composites

A single quark is never colorless. Color neutrality appears only in composite states:

- **Mesons:** $3 \otimes \bar 3 \supset 1$.
- **Baryons:** $3 \otimes 3 \otimes 3 \supset 1$.

In the baryon picture used elsewhere in the repo, a color singlet is a closed 9-axis braid in which $H$, $M$, and $L$ exceptionality each appear once across the three Noether braids.

## Coupling rules to gluons

### What a gluon is in this catalog

In this framework, a gluon is not treated as a primitive point particle added on top of the quarks. It is an emergent axis-reconfiguration ribbon or braid segment running along a color flux tube in the Noether sea. Its job is to transfer color phase and axis exceptionality between Noether braids while preserving the quark inventory that defines flavor and electric charge.

The more detailed strong-sector picture remains in [gluons.md](../bosons/gluons.md) and [color-charge-su3.md](./color-charge-su3.md). This chapter only states the coupling rules required by the quark catalog.

### Working vortex picture

A useful geometric refinement is to treat the gluon not as the flux tube alone but as the full local coupling complex built from:

- the coupled flux-tube segment between Noether braids,
- the energetic source binaries whose motion generates the axial wake vortices,
- and any captive axial potentials that are temporarily locked into that coupled vortex channel.

On this reading, the flux tube is the visible corridor, but the active object is larger than the corridor by itself. The source binaries continue to matter because their rotating charge separation generates the potential vortices that make the corridor possible in the first place. This also suggests a natural way to think about color transfer: a gluon exchange may include a controlled swap or reassignment of captive axial potentials inside the coupled vortices, provided the overall flavor inventory, electric charge, and generation tier are preserved.

This remains a structural hypothesis, not yet a closed derivation. It is included here because it sharpens the coupling picture without changing the catalog rules stated below.

### Allowed gluon actions

At the quark level, a pure gluon coupling is allowed to do the following:

1. Rotate or swap axis exceptionality within the ordered basis $(H,M,L)$.
2. Transfer color phase between quarks connected by a flux tube.
3. Preserve the total six-site axial inventory of each flavor class.
4. Preserve electric charge.
5. Preserve generation tier on the strong-interaction timescale.
6. For down-type quarks, preserve the selected family sector $F_\star$ during pure strong reconfiguration.

In practical terms, a gluon may change
$$
|u_H\rangle \leftrightarrow |u_M\rangle,\qquad
|u_M\rangle \leftrightarrow |u_L\rangle,\qquad
|u_H\rangle \leftrightarrow |u_L\rangle
$$
and likewise for down-type states, without changing $u \leftrightarrow d$ or Generation I $\leftrightarrow$ II $\leftrightarrow$ III. Strong couplings move quarks around inside color space; they do not perform weak flavor conversion.
For down-type states this color motion is internal to the selected Family-I or Family-II sector. Pure gluon exchange may rotate H/M/L exceptionality, but it is not allowed to hop between Family I and Family II as a hidden flavor change.

### Generator picture

With the ordered basis $(H,M,L)$ fixed, the color action is represented by
$$
U \in SU(3)
$$
because the transformation must preserve norm, remain within the one-axis-exceptionality sector, and have unit determinant after removing the unobservable overall phase.

The eight gluon modes are then the eight traceless generators of this action. In axis language:

- off-diagonal generators move exceptionality between the pairs $(H,M)$, $(H,L)$, and $(M,L)$;
- diagonal generators compare the relative color weights of those three axes;
- the fully symmetric singlet combination is removed, leaving the familiar octet rather than a non-confining ninth long-range mode.

### Concrete coupling rules

The catalog uses the following working rules:

- **Up-type quarks couple to gluons through the exceptional mixed axis** against the two $P^+$ axes.
- **Down-type quarks couple to gluons through the exceptional axis** against the two background axes of the chosen family.
- **Local gluon complex:** the exchanged object should be understood as the coupled vortex corridor together with the source-binary vortex generators that sustain it, not as a detached tube with no source-side structure.
- **Captive-potential transfer:** gluon exchange may swap or relabel captive axial potentials between coupled vortex channels so long as the quark remains in the same flavor class and keeps the same total axial inventory.
- **Flavor-blindness of strong coupling:** the same color operator acts on $u,c,t$ within the up-type template and on $d,s,b$ within the down-type template.
- **No strong flavor change:** gluons do not turn $u$ into $d$, $c$ into $s$, or $t$ into $b$.
- **No strong generation change:** gluons do not by themselves add or remove shielding binaries.
- **Confinement rule:** open color sectors carry an energy cost that grows approximately linearly with separation, so isolated quarks are excluded and flux tubes close only in mesonic or baryonic singlets.

## What is fixed and what remains open

### Fixed by the Architecture

The following parts of the quark catalog are fixed strongly enough to be treated as canonical:

- up-type axial count $5P,1E$,
- down-type axial count $2P,4E$,
- generation as Noether braid shielding level,
- architrino counts $12$, $10$, and $8$ for Generations I, II, and III,
- color as axis exceptionality in the three-state $(H,M,L)$ basis,
- gluon action as an $SU(3)$ color reconfiguration that preserves flavor inventory.

### Still open

Several important derivations are not yet closed and should remain marked as open:

- which down-type family is selected dynamically for each stable branch,
- the full quantitative mass map for $u,d,c,s,t,b$,
- the exact confinement-energy functional and string tension extraction,
- the full CKM derivation from weak-basis to mass-basis overlap,
- whether captive axial-potential swapping inside coupled vortices is the correct microscopic picture of gluon exchange,
- explicit diagrammatic rendering of the six quark geometries.

That boundary matters. This chapter is a canonical catalog, not a claim that the full quark-sector closure is complete.

## Cross-links

- Charge, weak-isospin, and hypercharge bookkeeping: [quantum-number-mapping.md](./quantum-number-mapping.md)
- Color-space construction and SU(3) closure: [color-charge-su3.md](./color-charge-su3.md)
- Strong-sector carrier geometry: [gluons.md](../bosons/gluons.md)
- Weak-sector flavor mixing target: [weak-mixing-ckm.md](../../philosophy-history/theory-bridges/weak-mixing-ckm.md)
