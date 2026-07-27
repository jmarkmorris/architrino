# B/C Retained Score-Landscape Diagnosis

Status: closed documentary diagnosis of the sealed 2026-07-25 prescribed-path
campaign. No campaign row was rerun, added, rescored, or reclassified.

Claim grade: **retained measured diagnostic** for the sealed row counts and
scores; **derived documentary diagnosis** for the gate-level and next-step
conclusions. The local SQLite database and coverage files are operational
artifacts and are not present in this checkout, so this packet relies on their
committed hashes and the retained row diagnosis rather than claiming a fresh
replay.

## Input and unchanged boundary

The only numerical input is the write-once
[B1/Family-C Monte Carlo-to-basin diagnostic](2026-07-25-bc-monte-carlo-basin-diagnostic.md).
Its 576 rows remain sealed: 573 evaluated, 3 `unknown`, 159 with an applicable
member score, 414 `inapplicable`, and zero handoffs, admissions, or descents.
The refined peak handoff ceiling remains `6`, the primary/refined score-change
ceiling remains `0.05`, and dense admission still requires complete declared
isolated inventory plus independently recomputed causal-root residual at most
`1e-12`.

Plainly: this pass interprets the retained table. It does not give the old
campaign another chance to pass.

## Applicability landscape

| Member | Drawn | Unknown | Applicable score | Inapplicable | Primary moving-receiver unavailable | Refined moving-receiver unavailable |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| B1.1 | 64 | 0 | 37 | 27 | 25 | 27 |
| B1.2 | 64 | 0 | 30 | 34 | 33 | 34 |
| B1.3 | 64 | 2 | 18 | 44 | 43 | 44 |
| C1 | 64 | 0 | 9 | 55 | 45 | 55 |
| C2 | 64 | 0 | 8 | 56 | 45 | 56 |
| C3 | 64 | 0 | 21 | 43 | 41 | 43 |
| C4 | 64 | 0 | 23 | 41 | 37 | 41 |
| C5 | 64 | 0 | 8 | 56 | 54 | 56 |
| C6 | 64 | 1 | 5 | 58 | 55 | 58 |
| **Total** | **576** | **3** | **159** | **414** | **378** | **414** |

Every inapplicable row lacked a refined moving-endpoint acceleration-inventory
certificate. Of those, 378 also lacked the primary certificate and 36 lost
applicability only at refinement. The compact rows do not retain the
event-by-event certificate reason list, so no finer split among event validity,
transmitter inventory, and root completeness is supported.

Plainly: 414 rows did not receive a bad member score. They received no valid
member score because the required moving-endpoint inventory was incomplete.

The surface-quadrature gate failed in all 573 evaluated rows, but it is not the
applicability condition for the pointwise member residual. The three unknown
rows remain B1.3 samples 11 and 43 and C6 sample 36. Samples 11 and 36 have
named event-convergence failures; sample 43 has a compact surface
minimum-separation failure. All three keep null scores.

Plainly: surface failure, member-score inapplicability, and unresolved
evaluation are three different dispositions. None may be rewritten as a
family-level negative.

## Lowest B1.1 pattern

The 37 applicable B1.1 refined peaks have minimum
`59.29861867019956`, first quartile `110.33829223921393`, median
`140.21549054100748`, third quartile `186.4041371318672`, and maximum
`422.39619893906456`.

| Sample | Refined peak | Refined RMS | Common harmonic | Circulation | Binary polarity assignments |
| --- | ---: | ---: | ---: | ---: | --- |
| 5 | 59.29861867019956 | 45.95733365123426 | 3 | -1 | `(+1,-1,-1)` |
| 40 | 63.709402879231035 | 59.89188442805349 | 3 | -1 | `(-1,-1,+1)` |
| 10 | 74.23111338809342 | 56.03117348816709 | 2 | -1 | `(+1,-1,-1)` |
| 57 | 88.30259418608675 | 73.0940326668711 | 2 | -1 | `(+1,-1,-1)` |
| 28 | 91.14057459191419 | 68.4094990516453 | 2 | -1 | `(-1,-1,+1)` |

Sample 5 is `9.883103111699926` times the unchanged peak ceiling. Its peak is
settled between the old primary and refined grids to reported change
`6.440934118268966e-9`, but its surface and fixed-internal gates fail and its
refined summed-acceleration necessary-condition row reports maximum summed
equation-residual norm `5.141187258615106`.

Plainly: sample 5 is the best retained internal-member score, not an admitted
candidate. It remains far above the handoff line and fails other diagnostic
conditions.

The fixed descriptive low-score box

$$
P \le 74.12327333774945,
\qquad
Q \le 57.44666706404282
$$

contains only sample 5. The only other retained row with its exact harmonic,
circulation, and polarity stratum is sample 16, whose member score is
inapplicable. The old population therefore measures no same-stratum slope,
curvature, finite-width neighborhood, or local minimum around sample 5.

Plainly: the sealed sample identifies a place worth mapping, but it does not
show a basin.

## Disposition and next bounded object

BP-008 is complete at documentary grade:

- the controlling limitation is moving-receiver inventory applicability, not a
  low-score threshold cluster;
- the best comparable B1.1 row is isolated in its discrete stratum and remains
  far above the unchanged handoff ceiling;
- the three unknown rows remain unresolved and null-score;
- no retained evidence supports threshold relaxation, another blind Monte
  Carlo draw, or a solver/physical claim; and
- the next object is the coordinator-reviewed
  [B1.1 local landscape design](../b1-1-score-landscape-diagnostic-predeclaration.md),
  whose analytical execution remains blocked on an exact score-free manifest
  and instrument freeze.

A separate
[rational multi-frequency slice](../b1-1-rational-multifrequency-chart-slice-predeclaration.md)
is declared now but remains downstream of the local geometry audit.

Plainly: the next authorized work is to freeze and validate the local
landscape manifest without evaluating roots. Search execution is not yet
authorized.

## Reproduction reach

If the sealed local artifacts are restored at their recorded paths, first
verify their identities and compact-database integrity:

```bash
shasum -a 256 \
  .local-data/braid-analysis/monte-carlo-basin/bc-initial-20260725-v1/predeclared-protocol.json \
  .local-data/braid-analysis/monte-carlo-basin/bc-initial-20260725-v1/descent-v1/execution-receipt.json \
  .local-data/braid-analysis/compact-campaigns.sqlite3

node scripts/eom/analytical-campaign-database.mjs verify \
  --database .local-data/braid-analysis/compact-campaigns.sqlite3

node scripts/eom/analytical-campaign-database.mjs query-cases \
  --database .local-data/braid-analysis/compact-campaigns.sqlite3 \
  --member-id B1.1
```

The expected hashes for the protocol, receipt, and closeout database are
`f24bb346816ec644faae0c6881bfe5888f35d1b499ac8d207efefbec7c108a4f`,
`c3be996baf9dbc688524b61cb07b68aa1900bc520cd68f1069f93776c0519a70`,
and
`5edb4d81018f62af77b6f0a0e9ffec0d61ab09d3a7cf46e105fed78a3c1b71e5`.
The original packet supplies the nine member-by-member reproduction commands.

The exact documentary reducer that produced the gate-level table is not a
retained repository instrument. Therefore a clean checkout can verify this
packet's sources and arithmetic, but cannot claim a fresh row-level
reproduction without restoring the sealed exports or creating a separately
reviewed read-only reducer.

Plainly: the source identities are checkable if the operational artifacts are
restored. This checkout does not silently recreate missing rows or call the
committed table a new measurement.

## Falsifiers

- A byte-verified export of the sealed campaign that changes any count, score,
  gate boolean, coordinate, or identity hash overturns the corresponding
  retained diagnosis.
- An event-level retained packet that supports a finer certificate-reason
  classification may refine the inapplicable split; the compact rows alone do
  not.
- A valid local landscape row below sample 5 overturns only the statement that
  sample 5 is the lowest retained old row, not the sealed campaign.
- A future threshold crossing under a separately frozen protocol does not
  alter the old zero-handoff result.

Closure goal: freeze the exact B1.1 local-landscape manifest and instrument
identities without scoring a row, then run only the declared center capability
pilot after separate review.
