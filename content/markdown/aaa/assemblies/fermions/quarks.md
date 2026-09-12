# Quarks

## Overview

This chapter collects the quark catalog for $\mathbb{A}\mathbb{A}\mathbb{A}$ in one place. The candidate quark construction is a color-exposed fermion assembly: a neutral Noether braid scaffold plus a six-site axial layer whose pattern exposes charge, weak bookkeeping, and one exceptional color axis.

The aim is narrower than a full QCD derivation. This page states, in a single canonical reference, the candidate shielding program for the six quark flavors, how their axial patterns would encode charge, how color is assigned, how many architrinos each flavor contains, and what a gluon is allowed to do to a quark state. The catalog is a bookkeeping target; the particle-to-braid assignment, confinement, running couplings, hadron spectra, and nonperturbative QCD recovery remain downstream closure problems.

The useful first picture is a layered object. The Noether braid scaffold carries the neutral branch and generation tier. Whole-branch polarity conjugation distinguishes matter from antimatter, while pro/anti ordered orientation is a separate parity-facing label. The axial layer carries the exposed polarity pattern. Color appears when one indexed axis is exceptional relative to the other two. The quark catalog is the table of those allowed exposed patterns.

An [architrino](../../foundations/architrino.md) is a point transceiver with polarity and a retained path history. Its causal wake is the expanding record of an earlier emission, propagating through the fixed [Euclidean void](../../foundations/euclidean-void.md) in [absolute time](../../foundations/absolute-time.md) $T$. A Noether braid is a candidate neutral assembly of such histories; the Noether sea is the ambient assembly medium. The [Master Equation](../../dynamics/master-equation.md#the-master-equation-canonical-form) sums the acceleration contributions from all admitted past emissions. Quantum chromodynamics (QCD), the standard theory of color interactions, is an effective recovery target here.

> Claim grade: guessed for the assembly-to-quark map; derived only for inventory arithmetic and conditional representation identities. A physical candidate must satisfy the full delayed acceleration law on one retained history, including partner and self roots, history coverage, singular-event treatment, and environmental boundaries, before its perturbation stability is assessed. It must also preserve the proposed axial record and supply an observer response map. Loss of those records or a fixed response prediction incompatible with the declared particle data falsifies that candidate. No such branch or response calculation is supplied here. New numerical instantiations use $c_f=1$.

The chapter uses axis strings and tables so the catalog is explicit without depending on artwork.

## Architecture

### Braid and axial split

The quark construction used here follows the same Noether braid-plus-axial split already used in the fermion mapping chapters. This split prevents three common confusions: charge is not color, color is not generation, and generation is not a new electric inventory.

- The **Noether braid** is the neutral braid scaffold.
- The **axial layer** is the six-site organization carrying the visible charge pattern.

For matter quarks, the braid scaffold is a **matter branch**. It is neutral in total charge and differs across generations by shielding-coherence level, not by changing the gauge-facing color frame. The matter branch may carry either pro or anti ordered orientation; polarity conjugation preserves that orientation while producing the corresponding antimatter branch:

- **Generation I:** full-shielding candidate braid, 6 coherent scaffold architrinos; taxonomy member unassigned.
- **Generation II:** Generation-II shielding branch, 4 coherent scaffold architrinos; support index 3 is depleted on the candidate branch lifetime window.
- **Generation III:** Generation-III shielding branch, 2 coherent scaffold architrinos; support indices 3 and 2 are depleted on the candidate branch lifetime window. These source-record roles do not encode a radius order.

The candidate axial layer stays six sites wide in all three generations. Each site is occupied by either an electrino $(-\epsilon)$ or a positrino $(+\epsilon)$. Write $e>0$ for the elementary electric-charge magnitude and $\epsilon=e/6$, with $\epsilon_+=+\epsilon$ and $\epsilon_-=-\epsilon$. This is an observer-level normalization convention; a protected six-site realization remains to be derived. Throughout this chapter $Q$ is dimensionful electric charge, while $Q/e$, weak isospin $T_3$, and weak hypercharge $Y$ are dimensionless. The indexed polar dyads are the proposed color and electroweak record. Their persistence when shielding support is depleted is a separate branch-existence requirement.

### Counting rule

The proposed coherent constituent count is
$$
N_{\text{quark}} = N_{\text{braid}} + 6
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0195af62a01fdc6b)

with
$$
N_{\text{braid}} \in \{6,4,2\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cca1c4e5c36b7bb5)

for Generations I, II, and III respectively. Here $N_{\text{braid}}$ counts coherent shielding-scaffold architrinos in the candidate branch, not every transient residue of an ablated or relocking tier. These are assigned branch inventories, not losses from the permanent architrino population. The conditional counts are:

- Generation I quark: 12 architrinos.
- Generation II quark: 10 architrinos.
- Generation III quark: 8 architrinos.

### Axis notation

To describe color and axial geometry compactly, use the three persistently indexed Noether braid axes $(1,2,3)$ and the following polarity-dyad classes:

- $(\epsilon_+,\epsilon_+)$: an axis whose two polar sites are both positive-polarity.
- $(\epsilon_-,\epsilon_-)$: an axis whose two polar sites are both negative-polarity.
- $(\epsilon_+,\epsilon_-)$ or $(\epsilon_-,\epsilon_+)$: a mixed axis with one positive-polarity site and one negative-polarity site.

In the fully shielded implementation picture, each axis contains:

- one neutral source binary, with one orbiting electrino and one orbiting positrino,
- plus one polar dyad attached to that binary axis.

The polarity-dyad labels refer only to that one polar dyad. They do not mean that the underlying source binary stops being neutral. In higher-generation branches, a depleted shielding tier may no longer act as a coherent source binary, but retention of the polar dyad and its persistent index must be demonstrated for it to supply the color record.

The dictionary assigns colorlessness to equivalent dyad classes and quark color to one exceptional axis. These are proposed observer assignments; dyad-class equality or inequality alone does not establish a physical color response.

## Charge classes and axis-exceptionality

### Up-type template

All up-type quarks share the same six-site axial count:
$$
5\epsilon_+ + 1\epsilon_-
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b1f7a88e9029bf66)

That gives net charge
$$
Q = \frac{5-1}{6}e = +\frac{2}{3}e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-862dad1da898bead)

At axis level, the canonical up-type structure is:

- two positive-polarity dyads,
- one exceptional mixed-polarity dyad.

In ordered-axis notation, the three color states are the three permutations of
$$
\big((\epsilon_+,\epsilon_-),(\epsilon_+,\epsilon_+),(\epsilon_+,\epsilon_+)\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bfcf10cab758c200)

### Down-type template

All down-type quarks share the same six-site axial count:
$$
2\epsilon_+ + 4\epsilon_-
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ca8bdff68a4533c4)

That gives net charge
$$
Q = \frac{2-4}{6}e = -\frac{1}{3}e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-33c1c6e8ffdbadbc)

The down-type sector admits two allowed axis-pattern families:

1. Family I: one positive-polarity dyad and two negative-polarity dyads, i.e. permutations of
   $$
   \big((\epsilon_+,\epsilon_+),(\epsilon_-,\epsilon_-),(\epsilon_-,\epsilon_-)\big)
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-9d1e411e23a32c36)

2. Family II: one negative-polarity dyad and two mixed-polarity dyads, i.e. permutations of
   $$
   \big((\epsilon_-,\epsilon_-),(\epsilon_+,\epsilon_-),(\epsilon_+,\epsilon_-)\big)
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-6c13f7a7d043ffc2)

Both families satisfy the same structural rule: two axes are in one class and one axis is exceptional. That common axis-exceptionality is what carries color. They are therefore candidate sectors, not two independent low-energy species. For any realized down-type branch, a single selected family $F_\star\in\{I,II\}$ supplies the full red/green/blue color triplet over the declared stability window; the single-family hypothesis requires suppression of the competing family in that context. Stability alone does not determine its population or whether an observer can distinguish it. The catalog does not assign $d$, $s$, and $b$ to separate families as a settled rule.

### Right-handed singlet bookkeeping

Here $L$ and $R$ denote the chiral weak-representation labels in the Standard Model comparison. They are not the pro/anti orientation of a spatial braid frame or, for a massive state, simply the sign of spin along its motion (helicity). The right-handed singlet assignments below are comparison data; a hidden or inactive weak-coupling triad is their conjectural geometric implementation, not a deduction from electric charge alone.

For right-handed quarks:

- the six-site axial counts stay the same as in the flavor catalog,
- the Standard Model comparison specifies the singlet assignment
  $$
  T_3 = 0
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-e021f2a9523c201b)

- and the weak hypercharge is determined directly by
  $$
  Y = 2Q/e
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-04d4ef5262aa0ed0)

This gives the standard singlet assignments:

| State family | Axial inventory | Electric charge $Q/e$ | Right-handed assignment |
| --- | --- | ---: | ---: |
| $u^R,c^R,t^R$ | $5\epsilon_+,1\epsilon_-$ | $+2/3$ | $T_3=0,\ Y=+4/3$ |
| $d^R,s^R,b^R$ | $2\epsilon_+,4\epsilon_-$ | $-1/3$ | $T_3=0,\ Y=-2/3$ |

With the comparison singlet assignment $T_3=0$ fixed, the net electric charge determines $Y$. The candidate right-handed implementation uses the same polarity inventory as its left-handed flavor partner, with a different weak-coupling posture. That geometric posture still has to reproduce the singlet response; counting the axial signs does not establish it.

### Left-handed doublet bookkeeping (conjectural implementation candidate)

The corresponding left-handed matter-branch weak-coupling posture gives a useful implementation candidate:

- the left-handed quark states are the exposed-coupling branches of the same six-site axial inventories,
- the up-type and down-type quarks then occupy the two branches of the same electroweak doublet,
- both branches have six occupied sites, but their polarity inventories differ; the proposed weak-coupling triad must account for the corresponding chiral response.

In this bookkeeping:

- the left-handed up-type states keep the $5\epsilon_+,1\epsilon_-$ axial count,
- the left-handed down-type states keep the $2\epsilon_+,4\epsilon_-$ axial count,
- the up-type branch carries
  $$
  T_3 = +\frac{1}{2}, \qquad Y = +\frac{1}{3}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-ba25e79f03f58d30)

- the down-type branch carries
  $$
  T_3 = -\frac{1}{2}, \qquad Y = +\frac{1}{3}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-01af42fbf433e4e7)

This gives the standard doublet bookkeeping:

| State family | Axial count | Electric charge $Q/e$ | Left-handed assignment |
| --- | --- | ---: | ---: |
| $u^L,c^L,t^L$ | $5\epsilon_+,1\epsilon_-$ | $+2/3$ | $T_3=+1/2,\ Y=+1/3$ |
| $d^L,s^L,b^L$ | $2\epsilon_+,4\epsilon_-$ | $-1/3$ | $T_3=-1/2,\ Y=+1/3$ |

The value of this conjecture is that it places the quark doublet in the same six-site counting language as the lepton doublet:

- $6\epsilon_-$ for charged leptons,
- $3\epsilon_+,3\epsilon_-$ for neutrinos,
- $2\epsilon_+,4\epsilon_-$ for down-type quarks,
- $5\epsilon_+,1\epsilon_-$ for up-type quarks.

That places the quark sector in the same ordered axial-inventory ledger as the lepton sector rather than in a separate lookup table. At present, the geometric continuity across that ledger should be treated as a unifying implementation candidate, not a closed proof of weak-sector geometry.

### Polarity-conjugate mirror bookkeeping and implementation status

Once the matter-branch rows are fixed, the Standard Model comparison layer fixes the mirror bookkeeping: right-handed antiquarks are the charge-conjugate mirrors of the left-handed quark doublets, and left-handed antiquarks are the charge-conjugate mirrors of the right-handed quark singlets. What remains conjectural is the substrate implementation claim that whole-branch polarity conjugation plus handedness-swap weak exposure realizes those rows in the branch geometry. This is branch-record bookkeeping, not a constituent relabel: matter/antimatter is carried by polarity-conjugate retained path-history, causal-root, wake-history, action, and stability rows. The axial polarity inventory supplies the charge and color bookkeeping row; it is not itself the matter/antimatter label. Pro/anti ordered orientation is independent and remains unchanged under polarity conjugation.

Start by mapping the quark axial inventories to their charged-sector conjugate rows:

- anti-up family $(\bar u,\bar c,\bar t)$:
  $$
  1\epsilon_+,5\epsilon_-,\qquad Q/e=-\frac{2}{3}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-56fe0008e30972a9)

- anti-down family $(\bar d,\bar s,\bar b)$:
  $$
  4\epsilon_+,2\epsilon_-,\qquad Q/e=+\frac{1}{3}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-ea88ab24a448161b)

The geometric implementation candidate then reads:

- **right-handed polarity-conjugate antimatter branches** behave as the electroweak mirrors of the matter-branch left-handed doublets,
- **left-handed polarity-conjugate antimatter branches** behave as the electroweak mirrors of the matter-branch right-handed singlets.

This is structurally attractive because it matches the Standard-Model statement already used elsewhere in the repo: charged-current weak interactions act on left-handed quarks and, equivalently, on right-handed antiquarks. At a broader bookkeeping level, it also suggests a compact charged-fermion rule: matter-branch left doublets mirror polarity-conjugate antimatter right doublets, while matter-branch right singlets mirror polarity-conjugate antimatter left singlets.

#### Right-handed antiquark bookkeeping

At the fixed comparison-bookkeeping layer:

| State family | Axial count | Electric charge $Q/e$ | Right-handed antimatter assignment |
| --- | --- | ---: | ---: |
| $\bar u^R,\bar c^R,\bar t^R$ | $1\epsilon_+,5\epsilon_-$ | $-2/3$ | $T_3=-1/2,\ Y=-1/3$ |
| $\bar d^R,\bar s^R,\bar b^R$ | $4\epsilon_+,2\epsilon_-$ | $+1/3$ | $T_3=+1/2,\ Y=-1/3$ |

These are exactly the charge-conjugate mirrors of the matter-branch left-handed quark doublet:
$$
\left(+\frac{1}{2},+\frac{1}{3}\right)\mapsto \left(-\frac{1}{2},-\frac{1}{3}\right),\qquad
\left(-\frac{1}{2},+\frac{1}{3}\right)\mapsto \left(+\frac{1}{2},-\frac{1}{3}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-772ed405fd3eb304)

#### Left-handed antiquark bookkeeping

For the left-handed polarity-conjugate antimatter branch, the same mirror logic gives:

| State family | Axial count | Electric charge $Q/e$ | Left-handed antimatter assignment |
| --- | --- | ---: | ---: |
| $\bar u^L,\bar c^L,\bar t^L$ | $1\epsilon_+,5\epsilon_-$ | $-2/3$ | $T_3=0,\ Y=-4/3$ |
| $\bar d^L,\bar s^L,\bar b^L$ | $4\epsilon_+,2\epsilon_-$ | $+1/3$ | $T_3=0,\ Y=+2/3$ |

These are the charge-conjugate mirrors of the matter-branch right-handed singlets:
$$
\left(0,+\frac{4}{3}\right)\mapsto \left(0,-\frac{4}{3}\right),\qquad
\left(0,-\frac{2}{3}\right)\mapsto \left(0,+\frac{2}{3}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0bee4b2bafc7ed4c)

The practical advantage of this rule is that it closes the quark-sector bookkeeping without inventing a separate antimatter lookup system. Once the matter sector is specified, the polarity-conjugate antimatter sector follows at the comparison layer by charge conjugation; at the implementation layer it must still be realized by a polarity-conjugate retained branch, the conjugate charged-sector polarity ledger, and the handedness swap in weak exposure.

The $(T_3,Y)$ mirror rows above are fixed Standard Model comparison bookkeeping once the matter-branch rows are declared. The open claim is the substrate implementation: a polarity-conjugate retained branch, conjugate charged-sector polarity ledger, and handedness-swap weak exposure must still be derived as one branch geometry rather than simply matched to the comparison table.

### Electroweak-plane embedding (conjectural map)

The larger comparative map embeds the six-site axial-inventory ledger directly into the familiar electroweak plane with coordinates
$$
(T_3,Y)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-462a99f3f8bceb14)

while electric charge appears on the diagonal through
$$
Q/e = T_3 + \frac{Y}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b019b1d4b7984d4f)

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

What makes this useful is not merely that it reproduces the standard charge formula. It also suggests that the axial-inventory ledger may be functioning as a geometric pre-mixing chart:

- horizontal separation distinguishes weak-isospin splitting,
- vertical separation distinguishes hypercharge loading,
- the diagonal coordinate is the observed electromagnetic charge,
- and quark versus antiquark states appear as charge-conjugate reflections within the same plane.

This should still be treated cautiously. The table supports a candidate mapping to the standard electroweak plane, but it does not yet derive the Weinberg-angle mixing itself from quark microgeometry. In other words, the map looks structurally compatible with that plane, but it is not yet a closure proof for electroweak mixing.

## Six-flavor catalog

### Canonical flavor table

The table chooses pro-oriented representatives where that ordered frame is defined. It does not identify all matter branches with pro orientation. Its shielding counts are hypotheses of the catalog; depleted branches are not full six-architrino Noether braids.

| Flavor | Type | Generation | Braid scaffold | Braid architrinos | Axial pattern | Net charge $Q/e$ | Coherent total | Axis template |
| --- | --- | --- | --- | ---: | --- | ---: | ---: | --- |
| $u$ | up-type | I | pro-oriented candidate braid | 6 | $5\epsilon_+,1\epsilon_-$ | $+2/3$ | 12 | one mixed dyad, two positive-polarity dyads |
| $d$ | down-type | I | pro-oriented candidate braid | 6 | $2\epsilon_+,4\epsilon_-$ | $-1/3$ | 12 | selected family $F_\star$: one positive-polarity dyad with two negative-polarity dyads if $F_\star=I$, or one negative-polarity dyad with two mixed dyads if $F_\star=II$ |
| $c$ | up-type | II | pro Generation-II shielding branch | 4 | $5\epsilon_+,1\epsilon_-$ | $+2/3$ | 10 | same up-type color template on a Generation-II braid scaffold |
| $s$ | down-type | II | pro Generation-II shielding branch | 4 | $2\epsilon_+,4\epsilon_-$ | $-1/3$ | 10 | same selected-family rule on a Generation-II braid scaffold |
| $t$ | up-type | III | pro Generation-III shielding branch | 2 | $5\epsilon_+,1\epsilon_-$ | $+2/3$ | 8 | same up-type color template on a Generation-III braid scaffold |
| $b$ | down-type | III | pro Generation-III shielding branch | 2 | $2\epsilon_+,4\epsilon_-$ | $-1/3$ | 8 | same selected-family rule on a Generation-III braid scaffold |

### Flavor-by-flavor notes

#### Up quark

The up quark is the ground-state up-type quark. The working assignment gives it a full pro-oriented candidate scaffold and the $5\epsilon_+,1\epsilon_-$ axial layer. Its defining axis geometry is one mixed axis against two positive-polarity-rich axes; no taxonomy-member assignment is established.

#### Down quark

The down quark is the ground-state down-type quark. The working assignment gives it a full pro-oriented candidate scaffold, but with the $2\epsilon_+,4\epsilon_-$ axial layer. Its color structure comes from a single exceptional axis within the selected Family-I or Family-II sector, not from both families appearing as independent down-like species.

#### Charm quark

The charm candidate keeps the up-type axial pattern while support index 3 is depleted; that index does not specify an outer radius. In this bookkeeping it is therefore a Generation-II up-type braid scaffold with the same visible charge geometry as the up quark but a more exposed braid scaffold.

#### Strange quark

The strange quark is the Generation-II down-type partner of charm. It keeps the $2\epsilon_+,4\epsilon_-$ axial pattern but lives on a Generation-II candidate braid scaffold rather than the full-shielding candidate, with the same selected-family branch rule applied after the shielding tier is fixed.

#### Top quark

The top quark is the most exposed up-type branch in the present catalog. It carries the same $5\epsilon_+,1\epsilon_-$ axial inventory as the lighter up-type quarks but only a Generation-III braid scaffold. Its total count is therefore only 8 architrinos. The catalog assigns the same coherent count to the bottom candidate, so this count does not rank their stability or determine either lifetime. A lifetime comparison requires retained histories, allowed reaction channels, and an observer clock map.

#### Bottom quark

The bottom quark is the Generation-III down-type branch. It carries the down-type $2\epsilon_+,4\epsilon_-$ axial pattern on a Generation-III braid scaffold. Like the top quark, it is highly exposed compared with Generation-I quarks, though the down-type selected-family sector remains a separate branch-selection target.

### Mass comparison boundary

The counts above determine no quark mass. As [Particle Masses](../particle-masses.md#why-quarks-should-not-be-expected-to-obey-koide) explains, QCD running masses are parameters defined in a stated renormalization scheme and at a stated energy scale; constituent-quark model masses and complete hadron masses are different quantities. They are not directly measured inertial masses of isolated quarks. The [PDG Quark Masses review, §§60.1–60.2](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-quark-masses.pdf) supplies this comparison distinction.

A candidate mass map must first derive retained assembly behavior, energy accounting, exposure, and medium response, then specify the hadronic observable and scheme-matching procedure used for comparison. A mismatch with an independently determined mass in that same scheme and scale would falsify the map. Neither adding the constituent counts nor assigning a separate fitted mass to each flavor performs that derivation.

## Color assignments

### Color as exceptional-axis phase

For a fixed quark flavor $q$ and selected family, introduce the effective representation ansatz
$$
\mathcal{H}^{\text{color}}_q = \mathrm{span}\{|q_1\rangle, |q_2\rangle, |q_3\rangle\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e011ea95dd2d916)

where the span is over $\mathbb C$ and the three displayed vectors are declared orthonormal, labeling exceptionality on axes 1, 2, and 3. This is a complex state space, not a deduction from the three-element label set. Its amplitude interpretation and the map from retained branch histories, medium state, preparation, and apparatus to measured records remain recovery targets.

This basis may be identified with the conventional color labels by the fixed phase convention
$$
|q_1\rangle \leftrightarrow \text{Red} \leftrightarrow 0^\circ
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f742ed0a807cbf75)

$$
|q_2\rangle \leftrightarrow \text{Green} \leftrightarrow 120^\circ
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b2f63c07975910a3)

$$
|q_3\rangle \leftrightarrow \text{Blue} \leftrightarrow 240^\circ
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4f34ed514536f110)

The angular labels are only a convention for naming three basis vectors. They do not identify those vectors with scalar phase multiples of one vector, which would span only one dimension. Recovering the triplet response requires more than the three-way axis choice.

### Up-type color table

| Color | Ordered axis pattern $(1,2,3)$ | Interpretation |
| --- | --- | --- |
| Red | mixed dyad, positive-polarity dyad, positive-polarity dyad | axis 1 exceptional |
| Green | positive-polarity dyad, mixed dyad, positive-polarity dyad | axis 2 exceptional |
| Blue | positive-polarity dyad, positive-polarity dyad, mixed dyad | axis 3 exceptional |

This table applies directly to $u$, and by generation lifting also to $c$ and $t$.

### Up-type implementation candidate

The Generation-I implementation candidate is:

- every axis keeps its neutral source binary,
- two axes carry polar-dyad decorations $(\epsilon_+,\epsilon_+)$,
- one axis carries the mixed polar dyad $(\epsilon_+,\epsilon_-)$ or $(\epsilon_-,\epsilon_+)$,
- and the color label is set by which axis carries that mixed polar dyad.

So for an up quark:

- **Red** means axis 1 is the mixed axis and the other two axes are $(\epsilon_+,\epsilon_+)$,
- **Green** means axis 2 is the mixed axis,
- **Blue** means axis 3 is the mixed axis.

This matches the intuitive “minority carrier” language already used elsewhere in the repo, but it sharpens it: the minority electrino is most naturally understood as living on one of the two polar sites of the exceptional axis's polar dyad, not as replacing one member of the neutral source binary itself.

The two orderings
$$
(\epsilon_+,\epsilon_-)\quad\text{and}\quad(\epsilon_-,\epsilon_+)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c7f61d2fe99d2f12)

on the exceptional axis should be treated as two micro-configurations within the same color sector unless a later derivation shows that one of them carries an additional observable phase, helicity bias, or stability difference. At present they are best regarded as implementation-level variants of the same color assignment.

The corresponding antiquark is obtained by the charged-sector conjugate axial pattern together with the polarity-conjugate antimatter branch, giving the anti-red, anti-green, and anti-blue states. Its pro/anti ordered orientation is inherited unchanged under that conjugation.

### Down-type color tables

Family I:

| Color | Ordered axis pattern $(1,2,3)$ | Interpretation |
| --- | --- | --- |
| Red | positive-polarity dyad, negative-polarity dyad, negative-polarity dyad | axis 1 exceptional |
| Green | negative-polarity dyad, positive-polarity dyad, negative-polarity dyad | axis 2 exceptional |
| Blue | negative-polarity dyad, negative-polarity dyad, positive-polarity dyad | axis 3 exceptional |

Family II:

| Color | Ordered axis pattern $(1,2,3)$ | Interpretation |
| --- | --- | --- |
| Red | negative-polarity dyad, mixed dyad, mixed dyad | axis 1 exceptional |
| Green | mixed dyad, negative-polarity dyad, mixed dyad | axis 2 exceptional |
| Blue | mixed dyad, mixed dyad, negative-polarity dyad | axis 3 exceptional |

These are candidate-sector tables. For any realized $d$, $s$, or $b$ branch, one selected family $F_\star$ supplies the three color states; the other family is not counted as an additional long-lived down-type particle. Two comparably stable families predict extra observable species only if both are appreciably populated and distinguishable in the same observer record. Such additional predicted signatures must be tested against the relevant data. Stability by itself does not establish either condition.

### Colorless composites

In the effective SU(3) comparison, the fundamental quark triplet has no invariant singlet vector. The simplest color-singlet composites occur in:

- **Mesons:** $3 \otimes \bar 3 \supset 1$.
- **Baryons:** $3 \otimes 3 \otimes 3 \supset 1$.

The closed nine-axis network with one occurrence of each exceptional-axis label is a proposed geometric realization. Its observer export must supply the antisymmetric color singlet $6^{-1/2}\sum_{a,b,c=1}^3\varepsilon_{abc}|abc\rangle$, where $\varepsilon_{abc}$ is the Levi-Civita antisymmetric tensor. This state is invariant because it transforms by $\det U=1$. A single assignment $|123\rangle$ is not invariant under general color rotations. The corresponding meson singlet is $3^{-1/2}\sum_{a=1}^3|a\bar a\rangle$. These conditional representation identities, developed in [Color Charge and SU(3)](color-charge-su3.md), do not prove network retention or spatial screening. They also do not exclude larger color-singlet composites.

## Coupling rules to gluons

### What a gluon is in this catalog

In this framework, a gluon is not treated as a primitive point particle added on top of the quarks. The proposed carrier is an axis-reconfiguration ribbon or braid segment along a color flux tube, a candidate corridor of coupled Noether sea response. Its intended effective role is color transfer while preserving the flavor and electric-charge record. A retained corridor and its response have not been derived here.

The more detailed strong-sector picture remains in [gluons.md](../bosons/gluons.md) and [color-charge-su3.md](./color-charge-su3.md). This chapter only states the coupling rules required by the quark catalog.

### Working vortex picture

A useful geometric refinement is to treat the gluon not as the flux tube alone but as the full local coupling complex built from:

- the coupled flux-tube segment between Noether braids,
- the energetic source binaries whose motion generates the axial wake vortices,
- and any captive axial potentials that are temporarily locked into that coupled vortex channel.

On this reading, the flux tube is the visible corridor, but the active object is larger than the corridor by itself. The source binaries continue to matter because their rotating charge separation generates the potential vortices that make the corridor possible in the first place. This also suggests a natural way to think about color transfer: a gluon exchange may include a controlled swap or reassignment of captive axial potentials inside the coupled vortices, provided the overall flavor inventory, electric charge, and generation tier are preserved.

This remains a structural hypothesis, not yet a closed derivation. It is included here because it sharpens the coupling picture without changing the catalog rules stated below.

### Allowed gluon actions

Within the candidate catalog, a pure color reconfiguration of an existing quark is required to do the following. These restrictions encode the intended effective gluon vertex; they do not exclude strong production of additional quark–antiquark pairs:

1. Rotate or swap axis exceptionality within the ordered basis $(1,2,3)$.
2. Transfer color phase between quarks connected by a flux tube.
3. Preserve the total six-site axial inventory of each flavor class.
4. Preserve electric charge.
5. Preserve generation tier on the strong-interaction timescale.
6. For down-type quarks, preserve the selected family sector $F_\star$ during pure strong reconfiguration.

In practical terms, a gluon may change
$$
|u_1\rangle \leftrightarrow |u_2\rangle,\qquad
|u_2\rangle \leftrightarrow |u_3\rangle,\qquad
|u_1\rangle \leftrightarrow |u_3\rangle
$$

[View →](../../../../../equation-mapping.html#corpus-equation-57dafda2a8c456dc)

and likewise for down-type states, without changing $u \leftrightarrow d$ or Generation I $\leftrightarrow$ II $\leftrightarrow$ III. Strong couplings move quarks around inside color space; they do not perform weak flavor conversion. For down-type states this color motion is internal to the selected Family-I or Family-II sector. Pure gluon exchange may rotate exceptionality among indexed axes 1, 2, and 3, but it is not allowed to hop between Family I and Family II as a hidden flavor change.

### Generator picture

In the declared complex state space, imposing linear norm-preserving transformations and preservation of a chosen complex volume form gives the candidate matrix group
$$
U \in SU(3)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a8ee260cc9e6e344)

by definition: $U^\dagger U=I$ and $\det U=1$. Norm preservation alone allows $U(3)$. Removing its overall phase gives a projective action $PU(3)\cong SU(3)/\mathbb Z_3$; choosing a determinant-one representative leaves three central cube-root choices. This phase convention does not derive the physical gauge group. Even the identity subgroup satisfies the preservation requirements, so dynamics must separately establish which transformations are realized.

A traceless Hermitian $3\times3$ matrix has eight real parameters: three real diagonal entries plus three complex off-diagonal entries, minus one trace condition. This derives a generator count within the effective ansatz. Recovering eight gluon response components, their common coupling, and local color transport from one retained history remains open. A local connection must compare color bases at neighboring effective positions without changing observable records under passive basis changes, as explained in [Gauge Structure Emergence](../gauge-structure-emergence.md#gauge-covariance-recovery-target). In the conditional generator description:

- off-diagonal generators move exceptionality between the pairs $(1,2)$, $(1,3)$, and $(2,3)$;
- diagonal generators compare the relative color weights of those three axes;
- tracelessness removes the identity component in $3\otimes\bar3=1\oplus8$, leaving an octet of matrix directions. This algebraic exclusion supplies no confinement law or dynamical bound on an extra long-range channel.

### Concrete coupling rules

The catalog uses the following working rules:

- **Up-type quarks couple to gluons through the exceptional mixed axis** against the two positive-polarity dyad axes.
- **Down-type quarks couple to gluons through the exceptional axis** against the two background axes of the chosen family.
- **Local gluon complex:** the exchanged object should be understood as the coupled vortex corridor together with the source-binary vortex generators that sustain it, not as a detached tube with no source-side structure.
- **Captive-potential transfer:** gluon exchange may swap or relabel captive axial potentials between coupled vortex channels so long as the quark remains in the same flavor class and keeps the same total axial inventory.
- **Flavor-blindness of strong coupling:** the same color operator acts on $u,c,t$ within the up-type template and on $d,s,b$ within the down-type template.
- **No strong flavor change:** gluons do not turn $u$ into $d$, $c$ into $s$, or $t$ into $b$.
- **No strong generation change:** gluons do not by themselves add or remove shielding binaries.
- **Confinement recovery target:** in a declared unscreened static source–antisource regime, the effective energy is approximately $E_{\mathrm{open}}(\ell)=E_0+\sigma\ell$, with observer separation $\ell$, reference energy $E_0$, and string tension $\sigma>0$ of units energy per length. With dynamical quarks, string breaking can limit this regime. This comparison neither derives suppression of isolated color signals nor restricts all singlets to the two simplest composites above. The energy map, regime, screening, and detector bounds remain separate requirements; see [Color Charge and SU(3)](color-charge-su3.md#closure-interface-confinement-energy-scaling).

## Hadronization Spin-Correlation Benchmark

Hadronization is the formation of color-singlet hadrons in the effective QCD description. The benchmark here is the STAR Collaboration's proton–proton measurement at $\sqrt{s}=200\,\mathrm{GeV}$ using 2012 data: [“Measuring spin correlation between quarks during QCD confinement”](https://doi.org/10.1038/s41586-025-09920-0), Nature 650, 65–71 (2026), equation (1) and Figures 2–4. Its measured hyperon correlation and its model-dependent quark-origin interpretation have different evidentiary scope.

The observer-level extraction uses the self-analysing weak decays of the hyperons. In comparison notation the decay-product opening-angle distribution is

$$
\frac{1}{N}\frac{dN}{d\cos\theta^*}
=
\frac{1}{2}
\left[
1+\alpha_1\alpha_2P_{\Lambda_1\Lambda_2}\cos\theta^*
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a558bb5371ee2234)

Here $N$ counts selected pairs, $\theta^*$ is the opening angle between daughter proton or antiproton directions after boosting each into its parent's rest frame, $P_{\Lambda_1\Lambda_2}$ is the dimensionless correlation, and $\alpha_1,\alpha_2$ are the dimensionless weak-decay analysing parameters. STAR finds a positive short-range $\Lambda\bar\Lambda$ correlation and long-range and scalar-control results consistent with zero. This is a measured detector-level constraint; it does not establish an Architrino mechanism or entanglement by itself.

For $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a recovery target, not an import of QCD vacuum ontology or a claim that "nothing" creates particles. The native branch must connect, in one event record, the strong-collision work input, the local Noether sea participation, the quark-level axial and color records, the confinement or hadronization route into color-singlet hyperons, feed-down and remnant rows, and the final weak-decay detector readout. In schematic form the benchmark asks for

$$
P_{\Lambda\bar{\Lambda}}^{\mathrm{obs}}(\Delta R)
=
\mathcal{P}_{\mathrm{had}}
\left(
\Gamma_{\mathrm{coll}},
I_{\mathrm{had}},
\mathcal{L}_{E\mathbf p\mathbf J},
\Theta_{\mathrm{decay}},
\Delta R
\right),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3a0eab6c5942f968)

Here $\Gamma_{\mathrm{coll}}$ denotes the retained collision history and its preparation and sea boundaries; $I_{\mathrm{had}}$ specifies the reaction route; $\mathcal L_{E\mathbf p\mathbf J}$ denotes the candidate energy, momentum, and angular-momentum accounts; and $\Theta_{\mathrm{decay}}$ contains the weak-reaction and detector calibration, acceptance, background, and feed-down model. The symbol $\mathcal P_{\mathrm{had}}$ names the response map still to be derived. The observer separation $\Delta R=\sqrt{(\Delta y)^2+(\Delta\phi)^2}$ combines rapidity and azimuth differences; it is not a distance in the Euclidean void. Agreement must use the experimental bins and uncertainties. A fixed predicted correlation outside those uncertainties, after the stated response corrections, falsifies that map; assigning the measured correlation as its output tests nothing.

## What is fixed and what remains open

### Catalog conventions and hypotheses

The catalog fixes definitions and candidate assignments. Its conventions are not evidence for the physical hypotheses:

- up-type axial count $5\epsilon_+,1\epsilon_-$ (hypothesis under test),
- down-type axial count $2\epsilon_+,4\epsilon_-$ (hypothesis under test),
- generation as Noether braid shielding level (hypothesis under test),
- architrino counts $12$, $10$, and $8$ for Generations I, II, and III (hypothesis under test),
- color as axis exceptionality in the three-state $(1,2,3)$ basis (definitional convention),
- gluon action as an $SU(3)$ color reconfiguration that preserves flavor inventory (hypothesis under test).

### Still open

Several important derivations are not yet closed and should remain marked as open:

- retained branch existence and stability, including binding of the six axial sites and persistence of the color record in depleted-support generations,
- which down-type family is selected dynamically in a stated environment, with population and observer distinguishability accounted for,
- the quantitative mass map for $u,d,c,s,t,b$ in declared schemes, scales, and hadronic observables,
- the amplitude, local connection, and gluon-response map from the same retained histories,
- the exact confinement-energy functional and string tension extraction,
- the full CKM derivation from weak-basis to mass-basis overlap,
- whether captive axial-potential swapping inside coupled vortices is the correct microscopic picture of gluon exchange,
- explicit diagrammatic rendering of the six quark geometries.

The catalog therefore fixes a testable dictionary. It establishes neither a retained quark assembly nor complete quark-sector recovery.

## Cross-links

- Charge, weak-isospin, and hypercharge bookkeeping: [quantum-number-mapping.md](./quantum-number-mapping.md)
- Color-space construction and SU(3) closure: [color-charge-su3.md](./color-charge-su3.md)
- Strong-sector carrier geometry: [gluons.md](../bosons/gluons.md)
- Weak-sector flavor mixing target: [weak-mixing-ckm.md](../../philosophy-history/theory-bridges/weak-mixing-ckm.md)
