# Coincident-midpoint common-frequency three-axis circular configuration Prescribed Structural Root Ledger

Date: `2026-07-28`

Status: `evaluated-diagnostic`, `null-score`, `prescribed-path-only`, `diagnostic-only`, and `priority-only`.

## Scope and authority

This receipt records one bounded structural ledger over the sealed $36$-channel coincident-midpoint common-frequency three-axis circular configuration prescribed-path root inventory. The ledger asks how the already imposed circular family behaves in interpretable root coordinates. It does not assign a composite score or candidate disposition.

The diagnostic owner is the [structural-ledger protocol](../../../../src/prescribed-path-analysis/protocols/coincident-midpoint-common-frequency-prescribed-structural-root-ledger-protocol.v1.json) executed by the prescribed-only [ledger evaluator](../../../../src/prescribed-path-analysis/CoincidentMidpointCommonFrequencyPrescribedStructuralRootLedger.mjs). The evaluator does not evolve a path, invoke the EOM solver or its interval machinery, calculate energy or action, or select a physical candidate.

Plainly: this ledger describes roots of the approved circular drawing. It does not test whether the EOM solver or nature produces, retains, or stabilizes that drawing.

## Predeclared ledger

Before execution, the protocol sealed the continuous-inventory and root-sheet summary and result hashes. It then fixed the ratio grid

$$
\alpha_1\in\left\{\frac78,\frac{29}{32},\frac{15}{16}\right\},
\qquad
\alpha_2=1,
\qquad
\alpha_3\in\left\{\frac{17}{16},\frac{35}{32},\frac98\right\},
$$

the $24$ phase-circle nodes $2\pi k/24$, and the unchanged delay bracket $1/32\le\delta\le9/4$. Every root-bearing inter-binary channel therefore has $216$ sampled rows. Phase-independent same-binary rows use their applicable radius endpoints and midpoint.

Plainly: the ledger uses a small, fixed grid covering the corners, midpoint, and phase cycle of the already frozen ratio box. It is not an adaptive search for favorable behavior.

The predeclared rows are:

1. sealed root-count topology in each declared root-sheet chart;
2. sampled delay ranges and their witness rows;
3. sampled sheet-coordinate transversality margins;
4. sampled reception-coordinate conditioning margins;
5. sampled receiver-phase projection ranges and adjacent-node sign-change brackets;
6. sampled phase and radius sensitivities;
7. endpoint-inversion symmetry relations; and
8. every raw root and its provenance.

For squared prescribed separation $D^2$, the root equation is

$$
G=D^2-\delta^2=0.
$$

The ledger records the normalized root derivative in both the declared sheet coordinate and reception coordinate. Where $p$ is one sampled phase or radius coordinate, the local implicit sensitivity is

$$
\frac{\partial\delta}{\partial p}
=
-\frac{\partial_pG}{\partial_\delta G}.
$$

For an emission-fixed chart with $\epsilon=(\theta-\delta)\bmod2\pi$, it also records

$$
\frac{d\theta}{d\epsilon}
=
\frac{\left.\partial_\delta G\right|_\theta}
{\left.\partial_\delta G\right|_\epsilon}.
$$

Plainly: the derivative rows show where a sampled root is steep or shallow and how much its delay moves under a small coordinate change. They do not measure dynamic robustness or stability.

## Controls and falsifiers fixed before execution

The ledger fails closed if the sealed $36$-channel topology is incomplete, any independently recomputed normalized squared residual exceeds $10^{-9}$, the direct and primary reception-delay derivatives differ by more than $10^{-7}$, endpoint-inversion or phase-seam replay differs by more than $10^{-12}$, a required control fails, or a resource ceiling is reached. A completed control failure receives `drawn-not-evaluated` with null score; a hard resource ceiling prevents an evaluated artifact from being emitted.

The positive and negative projection controls require the adjacent-node detector to find sign changes in the declared synthetic $\cos(\text{phase})$ derivative and find none for the constant derivative $1$. The sealed self-channel controls require zero nontrivial roots for the inner and middle self channels and one for each outer self channel.

Plainly: a broken root check, symmetry mapping, seam, detector, topology row, or resource budget invalidates the packet. A sampled projection sign change would falsify a sampled-monotonicity observation and remain visible as a bracket; it would not be hidden by the packet status.

## Executed ledger

All predeclared controls passed. The ledger retained $5{,}204$ root rows and used $710{,}020$ bisection evaluations, below the declared ceilings of $5{,}400$ and $800{,}000$ respectively.

| Channel class | Ordered channels | Sampled roots | Sampled delay range | Smallest absolute sampled sheet derivative |
| --- | ---: | ---: | ---: | ---: |
| Inter-binary | $24$ | $5{,}184$ | $0.2603788643805174$ to $2.088421952853519$ | $0.29533634168339334$ |
| Same-binary opposite endpoint | $6$ | $14$ | $1.3604852410840484$ to $1.5820293752336019$ | $1.5503589530462094$ |
| Same-transmitter self | $6$ | $6$ | $1.1989037761900652$ to $1.6614335916532563$ | $0.12275221068428979$ |

The self-channel count includes four sealed no-root channels with no sampled root row and the two outer self channels with three radius samples each.

Plainly: among the sampled rows, inter-binary delays cover the broadest span. The outer self-root rows have the shallowest root derivative. These are properties of the imposed paths on this grid, not evidence of binding or instability.

The largest sampled absolute phase sensitivity among inter-binary rows was $2.9433508955692327$. The largest sampled absolute radius sensitivity was the outer self-root value $|\partial\delta/\partial\alpha_3|=9.19233974165719$. The six emission-fixed ordered channels had sampled receiver-phase projection derivatives between $0.20903868693957398$ and $3.9433508955692322$.

No adjacent-node projection sign-change bracket was emitted. This is a $24$-node sampled observation only. It does not prove that the projection derivative stays positive between nodes, and it does not independently prove a reception-fixed root count for an emission-fixed sheet.

Plainly: the grid found no sampled reversal in the map from emission phase to reception phase. A reversal could still lie between nodes, so continuous projection monotonicity remains open.

Endpoint inversion gave identical delay and projection rows in all $2{,}592$ declared comparisons. The $216$ phase-seam replays had maximum delay difference $3.552713678800501\times10^{-15}$ and maximum projection-derivative difference $8.43769498715119\times10^{-15}$. The independent residual check covered all $5{,}204$ roots; its largest normalized residual was $2.5089753066770497\times10^{-15}$. The largest primary-versus-direct reception-derivative difference was $3.552713678800501\times10^{-15}$.

Plainly: the symmetry, phase seam, and separately structured residual and derivative calculations agree within their declared numerical floors. This supports diagnostic implementation conformance, not independent physical acceptance.

## Evidence identity

The protocol hash is `63c1cfdada32585279a053b33946ac7bb3608fdc8a92e97111e720c76409b87c`. The result hash is `addd5e758b2d6be181e804753385202fa7c71b7543e0768622cb8da7609aae74`. The [durable summary](coincident-midpoint-common-frequency-prescribed-structural-root-ledger-summary.v1.json) hash is `5d5a659a497fa644aefe0c0dff13920504cd33e351414120e3d0044d304df3bf`. The ignored complete raw ledger is `.local-data/braid-program/coincident-midpoint-common-frequency/coincident-midpoint-common-frequency-prescribed-structural-root-ledger.v1.json.gz`, with raw-ledger hash `aa67b33f8b06ac8b8ce3f54d71b3003344bf2ec22892650997867d64c3b73388`.

## Closure boundary and next honest step

The bounded structural ledger is complete at prescribed-path diagnostic grade with null score. It records root topology provenance, sampled delays, conditioning, symmetry, and sensitivities without opening an EOM, energy, action, angular-momentum, pressure, radiation, or GR stage.

If a fixed-reception root-count statement is later needed for the six emission-fixed channels, the next safe mathematical step is a separately declared continuous interval certificate that the receiver-phase projection derivative remains positive across the full ratio-phase domain. Until then, the zero sampled sign-change count remains a diagnostic observation, not a continuous theorem.

Plainly: the ledger supplies a useful structural map of the imposed family. Its next unresolved mathematical boundary is continuous projection monotonicity, not candidate scoring or physical interpretation.
