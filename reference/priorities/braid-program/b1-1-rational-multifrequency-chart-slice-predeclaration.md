# B1.1 Rational Multi-Frequency Chart-Slice Predeclaration

Status: proposed priority-only downstream protocol. No implementation or
analytical execution is authorized. This slice may be materialized only after
the B1.1 local geometry landscape has a frozen manifest, a valid center pilot,
and a closed geometry-anchor adjudication.

Claim grade: **declared protocol**. Every numerical instantiation uses
$c_f=1$ and prescribed paths only. No path evolution or EOM solver is in
scope, and no result can establish stability, retention, binding, energy
closure, particle identity, or physical realization.

## Purpose and ordering

The sealed 576-case campaign varied common B1.1 harmonics but did not isolate
multi-frequency effects around one adjudicated geometry. This slice opens only
the three persistent binary-frequency coordinates while holding the accepted
geometry, materialized phases, polarity assignments, circulation, common
midpoint, axis, translation, source order, and all numerical tolerances fixed.

The geometry anchor is selected before this slice is materialized:

1. use the lexicographically lowest dense-admitted local-landscape row in
   refined $(P,Q)$ order if one exists;
2. otherwise use the dense-admitted local-landscape center; and
3. stop without a frequency slice if neither row is dense-admitted.

The selected materialized specification and exact-source hashes must be copied
into a machine predeclaration before any frequency row is evaluated.

Plainly: geometry is settled first. The frequency slice is not allowed to
choose a different shape after seeing frequency scores.

## Rational frequency coordinates

Let the three persistent B1.1 binary frequencies be

$$
f_a=\frac{h_a}{4},
\qquad
h_a\in\{2,3,4\},
\qquad
a\in\{1,2,3\}.
$$

The frequency token is the exact ordered integer triple
$\mathbf h=(h_1,h_2,h_3)$. Binary indices never reorder by frequency. If

$$
g(\mathbf h)=\gcd(h_1,h_2,h_3),
$$

then the least common return period is

$$
P_{\mathbf h}=\frac{4}{g(\mathbf h)}.
$$

Each row records both $\mathbf h$ and $P_{\mathbf h}$ as exact integer/rational
tokens before binary64 materialization. The source interval and causal history
must cover the complete cycle beginning at $T=4$ and the outer-probe
causal-delay reach. A longer declared source record may be generated only
before the manifest hash is frozen.

Plainly: the slice contains 27 exact rational frequency triples. Their least
return periods are computed from integers, not inferred from floating-point
near-equality.

## Primary and held-out populations

The 15 primary rows are fixed in this order:

```text
(2,2,2)
(3,3,3)
(4,4,4)
(2,3,3) (3,2,3) (3,3,2)
(4,3,3) (3,4,3) (3,3,4)
(2,3,4) (2,4,3) (3,2,4) (3,4,2) (4,2,3) (4,3,2)
```

They provide three common-frequency controls, six one-index changes around the
sealed common-harmonic-3 stratum, and all six persistent-index permutations of
the deliberately mismatched `(2,3,4)` stratum.

The 12 held-out rows are frozen before scoring:

```text
(2,2,3) (2,2,4) (2,3,2) (2,4,2) (2,4,4) (3,2,2)
(3,4,4) (4,2,2) (4,2,4) (4,3,4) (4,4,2) (4,4,3)
```

No held-out row participates in anchor choice, component attribution, or any
decision to alter the primary population. All 27 rows are materialized and
hashed before the first analytical evaluation.

Plainly: the first 15 rows expose simple frequency changes. The other 12 test
whether the interpretation survives frequency combinations that were not used
to form it.

## Fastest-harmonic time resolution

The number of fastest orbital cycles in one least return period is

$$
m_{\max}(\mathbf h)
=
\frac{\max(h_1,h_2,h_3)}{g(\mathbf h)}.
$$

Use the existing uniform left-closed periodic grid with row-specific sample
counts

$$
N_{\mathrm{primary}}
=
24m_{\max},
\qquad
N_{\mathrm{refined}}
=
48m_{\max},
\qquad
N_{\mathrm{dense}}
=
96m_{\max}.
$$

Thus every primary row has 24 time samples per fastest orbit, every refined
row has 48, and every dense row has 96. The surface grids remain 12-by-24,
16-by-32, and 24-by-48 respectively unless the frozen local-landscape protocol
requires stronger grids. The retained spectral maximum harmonic remains
separate from the source-frequency tuple and must satisfy the protocol's
strict Nyquist margin at each row-specific primary count.

Plainly: a faster binary automatically receives more time samples. Equal
sample counts across rows would underresolve the fastest multi-frequency
paths.

Every applicable row also receives a two-return control over
$2P_{\mathbf h}$ with exactly twice the time samples and otherwise identical
settings. The first and second least-return cycles must agree within the
unchanged primary/refined comparison rule after phase-aligned reduction.
Failure is `unknown-numerical` when caused by incomplete roots or execution,
and `inapplicable-member-score` when the member inventory is incomplete.

Plainly: repeating the same closed paths for a second return checks period and
grid aliasing. It does not create a persistence claim.

## Applicability and root-completeness gates

A row is chart-applicable only when all of the following pre-score conditions
hold:

1. the exact geometry-anchor, source-order, polarity, circulation, translation,
   and phase hashes equal the frozen machine predeclaration;
2. every $h_a$ is one of the declared positive integer harmonics and the
   materialized frequency equals its exact token divided by `4`;
3. the prescribed source and history cover $[4,4+2P_{\mathbf h}]$ plus the
   conservative outer-surface causal-delay reach;
4. the maximum source-speed bound is strictly below $c_f=1$;
5. minimum source separation is at least `1e-8`; and
6. the row-specific time and surface grids satisfy every protocol validation
   rule before evaluation.

For every moving-endpoint event at primary, refined, dense, and two-return
resolution, retain:

- exact expected and observed transmitter identifiers;
- every retained positive causal root with transmitter id and root ordinal;
- all unresolved candidate intervals;
- the root-policy id
  `all-retained-roots/event-specific-isolation-certified.v2`;
- maximum root residual, root-transversality margin, and minimum root
  separation; and
- the complete acceleration-inventory certificate and reason list.

Root completeness passes only when the observed transmitter inventory is
exact, every candidate interval is resolved or independently excluded, every
retained root residual is at most `1e-12`, root transversality is at least
`1e-8`, and no resource or convergence limit was reached. Dense rows require a
separately bound geometric causal-root residual recomputation with maximum
residual at most `1e-12`. Same-implementation replay is reproducibility only.

Plainly: a missing transmitter, unresolved interval, near-tangent root, or
resource ceiling never becomes a frequency score. The row stays fail-closed.

## Objective and unchanged handoff overlay

Retain the local-landscape lexicographic member objective $(P,Q)$ without
combining it with exterior, spectral, root, separation, or cost rows. Also
retain axial, radial, tangential, summed-acceleration, exposure, anisotropy,
causal wake-flux, frequency-resolved, primary/refined, two-return, and cost
rows separately.

The old handoff overlay remains:

$$
P\le 6,
\qquad
\Delta_{\mathrm{primary/refined}}\le 0.05.
$$

A crossing must additionally pass dense inventory, independent root-residual,
and two-return gates. No directed descent follows from this slice.

Plainly: changing frequency does not change the pass line. A good spectral or
exterior row cannot compensate for an incomplete root ledger or large member
residual.

## Fail-closed dispositions

Every row has exactly one disposition:

- `applicable-threshold-crossing`;
- `applicable-threshold-noncrossing`;
- `inapplicable-chart`;
- `inapplicable-member-score`;
- `unknown-numerical`; or
- `invalid-manifest-row`.

Only the first two carry $(P,Q)$. A declared exact row whose source-speed bound
is not strictly below $c_f=1$ is `inapplicable-chart` and remains in the
population with a null score. A history, manifest, or exact rational-token
mismatch is `invalid-manifest-row`. A root, convergence, separation,
transversality, resource, or two-return execution failure is
`unknown-numerical`. A completed evaluation without certified moving-endpoint
inventory is `inapplicable-member-score`. None of the null-score dispositions
is candidate failure.

Plainly: the slice distinguishes a scored noncrossing from an unavailable
score and from an unresolved numerical case.

## Held-out audit and stop rules

Primary interpretation may report only persistent-index effects that satisfy
all of the following:

1. the exact matched common-frequency controls are applicable;
2. every claimed one-index contrast survives primary/refined and two-return
   comparison;
3. frequency permutations are reported by persistent binary index rather than
   pooled as exchangeable;
4. the primary rows generate a frozen predicted contrast sign for each
   applicable held-out row before any held-out score is opened; and
5. unresolved or inapplicable held-out rows are counted explicitly and cannot
   be discarded or replaced.

If fewer than 8 of the 12 held-out rows are applicable, the audit is
`coverage-insufficient`. If 8 or more are applicable but fewer than 80 percent
of the applicable rows preserve the predeclared contrast signs, the primary
interpretation fails. These thresholds grade only the proposed frequency
pattern; they do not grade the braid family or physical realization.

Stop before frequency scoring if the geometry anchor lacks dense admission,
the manifest contains other than 27 unique exact triples, any row changes
non-frequency coordinates, or a protocol field is selected after a score is
observed. Stop the interpretation, while retaining all rows, if any manifest
identity changes or the held-out audit is coverage-insufficient.

Plainly: the held-out rows may disprove or leave the frequency explanation
unresolved. They cannot be swapped for friendlier cases.

## Required machine freeze before execution

The next frequency-slice implementation packet must freeze:

- the selected geometry-anchor specification and exact-source hashes;
- the ordered 15 primary and 12 held-out triples;
- all row-specific least return periods and time counts;
- the exact complete-cycle protocol for each resolution class;
- the materialized 27-row specification manifest and SHA-256;
- runner and independent dense-root-audit implementation hashes;
- write-once output paths and retained raw-evidence policy; and
- a score-free dry-run receipt proving count, uniqueness, identity, history
  coverage, and protocol validity.

No analytical evaluation is authorized until that packet is reviewed after
the local geometry audit closes.

Closure goal: after the local B1.1 geometry anchor is dense-admitted, freeze
this 27-row rational multi-frequency manifest and validate it without scoring
before any frequency search.
