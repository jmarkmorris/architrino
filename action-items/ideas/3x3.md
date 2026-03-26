# 3x3 Binary-Slot Matrix

This note isolates a simple bookkeeping fact: if there are three binary classes and three ordered slots to fill, then the local state space is a $3 \times 3$ slot matrix, while the full ordered filling space has
$$
3^3 = 27
$$
states.

The point of the note is not to replace the canonical axis-based quark construction in [quarks.md](../content/markdown/aaa/assemblies/fermions/quarks.md). It is to ask what the radial three-slot bookkeeping sees before any stronger dynamical or symmetry argument is imposed.

## Composition classes and resulting sectors

Take the three binary classes
$B^- = (-,-)$,
$B^0 = (+,-)$,
and $B^+ = (+,+)$,
with the mixed binary written in its canonical representative ordering.

Then every three-slot filling belongs to one of the following composition classes:

| Slot composition | Ordered variants | Axial inventory | Net charge | Resulting particle sector |
| --- | ---: | --- | ---: | --- |
| $(B^-,B^-,B^-)$ | 1 | $0P,6E$ | $-e$ | electron-like charged-lepton sector |
| permutations of $(B^-,B^-,B^0)$ | 3 | $1P,5E$ | $-2e/3$ | anti-up-like quark sector |
| permutations of $(B^-,B^-,B^+)$ | 3 | $2P,4E$ | $-e/3$ | down-type quark Family I candidate |
| permutations of $(B^-,B^0,B^0)$ | 3 | $2P,4E$ | $-e/3$ | down-type quark Family II candidate |
| permutations of $(B^-,B^0,B^+)$ | 6 | $3P,3E$ | $0$ | neutral mixed sector |
| $(B^0,B^0,B^0)$ | 1 | $3P,3E$ | $0$ | neutral all-mixed sector |
| permutations of $(B^-,B^+,B^+)$ | 3 | $4P,2E$ | $+e/3$ | anti-down-like quark Family I candidate |
| permutations of $(B^0,B^0,B^+)$ | 3 | $4P,2E$ | $+e/3$ | anti-down-like quark Family II candidate |
| permutations of $(B^0,B^+,B^+)$ | 3 | $5P,1E$ | $+2e/3$ | up-type quark sector |
| $(B^+,B^+,B^+)$ | 1 | $6P,0E$ | $+e$ | positron-like charged-lepton sector |

These ten classes account for all $27$ ordered fillings because
$$
1 + 3 + 3 + 3 + 6 + 1 + 3 + 3 + 3 + 1 = 27.
$$

## The local 3x3 slot matrix

Now separate binary class from slot position. Let the three ordered radial slots be
$I = \text{Inner}$,
$M = \text{Middle}$,
and $O = \text{Outer}$.

Then the local placement matrix is:

| Binary class \ Slot | Inner $I$ | Middle $M$ | Outer $O$ |
| --- | --- | --- | --- |
| $B^- = (-,-)$ | $B^-_I$ | $B^-_M$ | $B^-_O$ |
| $B^0 = (+,-)$ | $B^0_I$ | $B^0_M$ | $B^0_O$ |
| $B^+ = (+,+)$ | $B^+_I$ | $B^+_M$ | $B^+_O$ |

This $3 \times 3$ table does not yet build particles by itself. It defines the nine local slot assignments from which the full three-slot fillings are assembled.

## Immediate algebra

Let
$n_-$,
$n_0$,
and $n_+$
count how many binaries of each class appear in a given three-slot filling. Then
$$
n_- + n_0 + n_+ = 3.
$$

At the polar-site level, the total positrino and electrino counts are
$$
N_P = n_0 + 2n_+,
\qquad
N_E = 2n_- + n_0.
$$

Using the repo convention $\epsilon = |e|/6$, the net electric charge is
$$
Q = (N_P - N_E)\epsilon = 2(n_+ - n_-)\epsilon = \frac{n_+ - n_-}{3}e.
$$

So the mixed class $B^0$ changes ordering structure without changing net charge by itself. Charge is controlled entirely by the imbalance between $B^+$ and $B^-$ counts.

## Canonical quark templates inside the matrix

Within this bookkeeping:

- up-type quarks occupy the composition class $(B^0,B^+,B^+)$ up to permutation;
- down-type quarks currently admit two allowed classes in [quarks.md](../content/markdown/aaa/assemblies/fermions/quarks.md):
  - $(B^+,B^-,B^-)$ up to permutation;
  - $(B^-,B^0,B^0)$ up to permutation.

That is already a useful structural warning. The down-type sector is not captured by a single three-slot recipe unless a stronger dynamical selection rule removes one family.

## Why the 3x3 view may matter

The $3 \times 3$ point of view cleanly separates three different questions:

1. Which binary classes are present?
2. Which ordered slots do they occupy?
3. Which permutations are physically distinct rather than symmetry-equivalent?

The first question controls net charge classes. The second question controls ordered patterning. The third question decides whether a visually different arrangement is a new particle state or only a relabeling of the same state.

That separation is useful because the canonical quark note currently answers the charge-class question more strongly than it answers the bridge between radial slot language $(I,M,O)$ and axis language $(H,M,L)$.

## Working interpretation

The radial $3 \times 3$ matrix looks like a good microscopic ledger:

- it explains why several different slot fillings can land on the same total charge;
- it makes the two allowed down-type families visible immediately;
- it provides a clean basis for asking which slot permutations might later be identified with color, generation, handedness, or another ordering datum.

What it does **not** yet establish is that quark color can be read directly as `Inner/Middle/Outer`. That stronger claim needs a separate bridge to the canonical ordered-axis construction in [quarks.md](../content/markdown/aaa/assemblies/fermions/quarks.md).

## Next theoretical targets

- Build an explicit bridge table between radial slots $(I,M,O)$ and ordered axes $(H,M,L)$.
- State which permutations are gauge-equivalent, dynamically equivalent, or genuinely distinct.
- Test whether the two down-type families remain distinct under the preferred dynamical closure.
- Extend the same bookkeeping to anti-core dressings and generation structure.
