# Parallel A/B/C H1/H2 Census

Date: 2026-08-26  
Status: Accepted source-frozen prescribed-history census  
Claim grade: `H1 P[D]` for all nineteen rows; `H2 P[D]` except `A3.1` and `A3.2`, which are `H2 P[D/M]` because an independent dense sample is completed by a continuous Lipschitz-and-roundoff enclosure  
Search manifest: `campaigns/parallel-agent-braid-search.v1.json`  
Manifest canonical-object SHA-256: `ec61a199dc772b9a37d6090120280b3e9a9e2bdfb05c742dd4c3180acba05b8d`  
Manifest byte SHA-256: `739eb4706ae1be9d427c1a643419c7e5d5455fe85a26ad5d6e490bb114d411ee`

## Scope And Method

The parallel prescribed search reconstructed each frozen source independently of its production evaluator. Every row has six or twelve unique persistent identities, complete source order, normalized field speed $c_f=1$, exact period $P=4$, two full periods on $[0,8]$, and retained history depth $H=2$. For wholly analytic rows, trigonometric bounds establish continuous all-pair noncoincidence. For `A3.1` and `A3.2`, an independent $N=1{,}048{,}576$ sample is completed by pair-specific Lipschitz and roundoff bounds, so the recorded lower bound holds on the full continuous interval rather than only at the sample points.

Plainly: every listed prescribed path is identity-complete and collision-free for its whole declared history. The check does not say that the Master Equation produces or retains that path.

## Complete Census

| Candidate | Frozen source binding | H1 | Continuous H2 minimum clearance | Maximum delay bound | Maximum normalized speed | H3 speed admission | Next object |
| --- | --- | --- | ---: | ---: | ---: | --- | --- |
| `A1` | `a1` | `P[D]` | $\ge 0.10$ | $\le 0.86$ | $2.0263272615654166$ | Blocked: $v_{\max}\ge 1$ | Freeze a slower-cadence history, then reconfirm H2. |
| `A1.1` | `a1-1` | `P[D]` | $\ge 0.10$ | $\le 0.86$ | $0.6754424205218055$ | Pass | Separately predeclare H3. |
| `A1.2` | `a1-2` | `P[D]` | $0.1171281292110204$ | $\le 0.64$ | $0.5026548245743669$ | Pass | Separately predeclare H3. |
| `A1.3` | `a1-3` | `P[D]` | $\ge 0.10$ | $\le 0.86$ | $1.319468914507713$ | Blocked: $v_{\max}\ge 1$ | Freeze a slower-cadence history, then reconfirm H2; `BP-007` remains only a separate calibration route. |
| `A1.4` | `a1-4` | `P[D]` | $\ge 0.10$ | $\le 0.86$ | $0.9896016858807848$ | Pass, margin $0.0103983141192152$ | Separately predeclare H3 and preserve the narrow speed margin. |
| `A2` | `a2` | `P[D]` | $0.126942311999055$ | $\le 0.64$ | $0.4659734936924695$ | Pass | Separately predeclare H3. |
| `A3.1` | `a3-1` | `P[D]` | $\ge 0.11999567225233991$ | $\le 0.86$ | $0.5979351297837099$ | Pass | Separately predeclare H3. |
| `A3.2` | `a3-2` | `P[D]` | $\ge 0.0047046356068462065$ | $\le 0.64$ | $0.4866934411168334$ | Pass | Separately predeclare H3 and preserve the tight clearance bound. |
| `A3.3` | `a3-3` | `P[D]` | $\ge 0.10$ | $\le 0.86$ | $1.2644666515873306$ | Blocked: $v_{\max}\ge 1$ | Freeze a slower-cadence history, then reconfirm H2. |
| `A3.4` | `a3-4` | `P[D]` | $\ge 0.10$ | $\le 0.86$ | $0.948349988690498$ | Pass | Separately predeclare H3. |
| `B1.1` | `b1-1` | `P[D]` | $0.36204582617627834$ | $\le 0.88$ | $0.3850559351721385$ | Pass | Separately predeclare H3; `BP-009` remains a different center-pilot decision. |
| `B1.2` | `b1-2` | `P[D]` | $0.1478660161838747$ | $\le 0.88$ | $0.11819367666168143$ | Pass | Separately predeclare H3. |
| `B1.3` | `b1-3` | `P[D]` | $0.28354893757515653$ | $\le 0.88$ | $0.6911503837897545$ | Pass | Separately predeclare H3. |
| `C1` | `c1` | `P[D]` | $0.3784177585684899$ | $\le 1.6790473489452287$ | $0.5340707511102649$ | Pass | Separately predeclare H3. |
| `C2` | `c2` | `P[D]` | $0.15999999999999995$ | $\le 1.6790473489452287$ | $0.5340707511102649$ | Pass | Separately predeclare H3. |
| `C3` | `c3` | `P[D]` | $0.3620458261762784$ | $\le 1.9336524702497488$ | $0.3850559351721385$ | Pass | Separately predeclare H3. |
| `C4` | `c4` | `P[D]` | $0.3024491474077481$ | $\le 1.9336524702497486$ | $0.3850559351721385$ | Pass | Separately predeclare H3 and preserve the $0.0663475297502514$ history-depth margin. |
| `C5` | `c5` | `P[D]` | $0.28354893757515653$ | $\le 1.408687332235227$ | $0.6911503837897545$ | Pass | Separately predeclare H3; no direct H2 dependency on `BP-007` remains. |
| `C6` | `c6` | `P[D]` | $0.2835489375751565$ | $\le 1.4086873322352267$ | $0.6911503837897545$ | Pass | Separately predeclare H3. |

The manifest owns the exact path and byte hash behind every source-binding identifier. The initial integration audit reproduced the identity/source-order invariants and displayed admission summaries. The later [exact-decimal root-reference audit](2026-08-27-abc-subfield-root-reference.md) preserves all sixteen admissions but distinguishes rounded display values from outward limits for the literal source tokens: use `0.640000000002` rather than bare `0.64` for A2/A3.2's conservative two-time distance bound, and `0.880000000002` for B1.1. Its complete outward table, not rounded entries above, owns the limits for new root declarations. The original H2 instruments and this independent reference remain distinct evidence generations.

Plainly: sixteen rows are below the field-speed ceiling and can proceed to a new, separately authorized causal-root packet. Three require only a slower frozen cadence and a fresh H2 confirmation before that same step.

## Excluded Claims And Falsifiers

This census does not execute H3, ordinary EOM evolution, return, retention, stability, association, particle identity, score, Borg approval, or physical realization. H2 is overturned by a source-hash mismatch, missing or duplicate identity, incomplete declared history, nonpositive continuous pair clearance, or retained depth not strictly exceeding the conservative delay bound. H3 speed admission is overturned by any independently reproduced $v_{\max}\ge1$ for a row reported as passing.

Plainly: this is a clean admission census, not a dynamical result. It establishes which frozen histories are safe to test next and nothing beyond that.

Closure goal: preserve one manifest-bound H1/H2 census, route sixteen sub-field rows to separately predeclared H3 packets, and route A1, A1.3, and A3.3 through slower-cadence H2 reconfirmation before any root work.
