# Campaign 1 — Sub-Field Opposite-Polarity Binary Evolution

Status: SPECIFIED; INSTRUMENT AND WORKLOAD READY; PRODUCTION CHANGE REQUIRED
(2026-07-16). The path-provenance audit is green, exact native record emission
is ratified, and the complete declared workload has passed a construction-only
exercise. This change books no physics result; production evolution must occur
in a later change.

## Question and Claim Ceiling

What is the finite-window fate of two opposite-polarity architrinos, both
strictly below field speed, under coupled master-equation evolution: retained
within a bounded separation envelope, dispersed, or conditional on declared
prehistory?

All fate statements book at `executable_architecture_evidence`. “Bound” below
means **bound through the declared claim window**, not eternal stability and not
a canonical object claim. A configuration that does not meet a fate gate is
`unresolved`, not forced into a binary answer.

## Engine and Build Identity

The sole engine is the EOM solver in `src/eom`. The candidate production build
declared by this spec is:

- repository `HEAD`: `8474cc60acc3dc4a4267d29693d9103b5b4f772e` with the
  live source changes included in the source digest below;
- live `src/eom` source digest (sorted per-file SHA-256 ledger, then SHA-256 of
  that ledger):
  `0fa3188066ef1cba0cf26fb138921d01410f577bfa0040b0efc76c9dbd034fa2`;
- last `src/eom` source change: `2026-07-16 13:33:56 -0400`;
- `/tmp/architrino-eom-build/libeom_native.a`: built
  `2026-07-16 13:28:18 -0400`, SHA-256
  `b2a9c52681f1f9eb7e66ba66f48906841f59579a9540c08547adbae36640f07f`;
- completed EOM build (`/tmp/architrino-eom-build/eom_borg_shadow_cli`):
  `2026-07-16 13:39:20 -0400`, SHA-256
  `ff9bf0909509d8e07b73719378b6e23dcefef5ed46be4039617ecbda86b7ebec`;
- Campaign 1 workload harness candidate: built
  `2026-07-16 13:55:55 -0400`, SHA-256
  `c79dbf33cc00c5a247e4e5b8ca6d4485202761c4bca0cc4045938612b121023e`.

The completed EOM build is 5 minutes 24 seconds newer than the last EOM source
change, and the workload harness was compiled afterward, so the construction
exercise was fresh. Before production, the booking script must recompute all
times and digests. Any changed `src/eom` file, harness file, or older build time
invalidates this identity and requires a rebuild plus spec amendment before a
run can book.

## Initial-Condition Grid

Use field-speed units with $c_f=1$, charges $q_+=+1/6$ and $q_-=-1/6$, and the
declared EOM coupling $36\kappa_{\mathrm{eq}}$. No standard-physics orbit,
force, mass, or energy law enters the workload.

At release, place the paths at
$\mathbf x_+(0)=+(d/2)\mathbf e_x$ and
$\mathbf x_-(0)=-(d/2)\mathbf e_x$. Let

$$
\mathbf v_+(0)=s(-\cos\theta\,\mathbf e_x+\sin\theta\,\mathbf e_y),
\qquad
\mathbf v_-(0)=-\mathbf v_+(0).
$$

The full rung-1 grid is the Cartesian product:

| Coordinate | Values | Meaning |
|---|---|---|
| separation $d$ | $1,2,4$ | release separation |
| speed $s$ | $0.25,0.50,0.75$ | each path's release speed; all strictly below $c_f$ |
| approach angle $\theta$ | $0,\pi/4,\pi/2$ | head-on collinear, oblique approach, transverse approach |

This gives 27 claimed configurations. The $\theta=0$ rows are the queue-item-4
head-on/collinear feed. Any path whose certified velocity enclosure touches or
crosses $1$ at any later segment is outside this campaign: stop that run, mark
it `field-speed-extension-required`, and book no fate.

## Declared Prehistories as Search Coordinates

Prehistory depth is $H=20$. For each path $i$, let the endpoint-matched inertial
base be

$$
\mathbf x_i^{(0)}(t)=\mathbf x_i(0)+t\mathbf v_i(0),
\qquad -H\le t\le0,
$$

and define the exact cubic endpoint bump

$$
q(t)=u^2(3-2u),\qquad u=-t/H.
$$

Because $q(0)=q'(0)=0$, every family below has the same release positions and
velocities. They are first-class workload coordinates, not hidden defaults:

| Prehistory id | Declared retained history |
|---|---|
| `P0-inertial` | $\mathbf x_i^{(0)}(t)$ |
| `P1-lateral` | $\mathbf x_i^{(0)}(t)+\sigma_i(0.25d)q(t)\mathbf e_z$ |
| `P2-longitudinal` | $\mathbf x_i^{(0)}(t)+\sigma_i(0.25d)q(t)\mathbf e_x$ |

Here $\sigma_+=+1$ and $\sigma_-=-1$. The two bumped families alter the old
retained geometry in orthogonal directions while leaving the release state
exactly matched. Their maximum displacement from `P0-inertial` is $0.25d$, so
they are materially different by construction. The cubic itself is the
declared input history; no bump formula is evaluated after release.

Each of the 27 configurations therefore has three production runs. A fate claim
requires all 81 production runs plus their declared refinements; no single seed
may stand for a configuration.

### Workload implementation and construction check

The harness selects this family with
`--seed-family=campaign1-subfield-binary-v1`, the declared grid coordinates with
`--binary-separation`, `--binary-speed`, and `--binary-angle=0|pi4|pi2`, the
prehistory id with `--prehistory`, and the envelope row with
`--refinement=R0|R1|R2`. The refinement id fixes step, history segmentation,
root depth, and chunk steps; campaign callers cannot silently substitute those
values.

`--campaign1-grid-manifest=<path>` is construction-only. It instantiates all
243 configuration/prehistory/refinement rows and their retained-history
segments, probes five declared times, records fingerprints and coverage, and
exits before root search or evolution. The separately authored checker at
`scripts/eom/validate-campaign1-binary-workload.mjs` reconstructs the grid and
cubic equations directly from this specification. The 2026-07-16 exercise
passed all 27 configurations, 81 production coordinates, 243 refinement rows,
486 paths, 226,800 retained segments, and 2,430 analytic probes. This is
measured implementation parity plus a derived endpoint theorem, not a fate
result; see the [ratification and workload evidence](../evidence/2026-07-16-checkpoint-record-emitter-ratification-and-campaign-1-workload-validation.md).

## Delay and Claim Window

The state includes the complete retained interval $[-H,0]$. Every run evolves
at least to $t=H$. The actual claim window begins at the first accepted chunk
boundary $t_c\ge H$ for which every ordered receiver-source root certificate is
`certified_complete` and every active emission interval has lower bound greater
than zero throughout the following chunk. This proves the seeded interval can
no longer enter the active causal sum.

The run then continues through at least $t_c+H$, and the claim window is
$[t_c,t_c+H]$. If clearance is not achieved by $t=60$, the run is
`root-clearance-unresolved`; it has no fate result. The emitted view record
declares `delayHorizon: 20` and includes the complete prehistory plus accepted
extensions.

## Refinement Envelope

All production coordinates use the same declared controller tolerances and are
run on three levels:

| Level | maximum step | maximum prehistory segment | root depth | steps per chunk | chunk duration |
|---|---:|---:|---:|---:|---:|
| R0 | $0.02$ | $0.10$ | 192 | 5 | $0.10$ |
| R1 | $0.01$ | $0.05$ | 224 | 10 | $0.10$ |
| R2 | $0.005$ | $0.025$ | 256 | 20 | $0.10$ |

The same exact cubic prehistory is rebased onto each segmentation; changing the
segmentation must not change the declared path. Root maximum cells are 500,000,
quadrature depth/cells are 32/300,000, and MPFR precision is 128–512 bits.
Acceleration tolerance is $5\times10^{-3}$, position and velocity tolerances are
$2\times10^{-6}$, and correction tolerance is $2\times10^{-7}$.

A result is inside the envelope only if R1 and R2 have the same fate, every
claim-window observable below differs by at most $0.02$ after normalization,
and all residual, root, sub-field, and oracle gates pass. R0 must move toward R1
rather than away from it. Otherwise refine again or book `outside-envelope`.

Chunking is part of the envelope even though duration is held fixed. Agreement
between levels or repeated runs is determinism/refinement evidence only, not an
independent correctness result.

## Symmetry-Reduced Observables and Fate Gates

Remove common translation and orientation. For the relative state define

$$
r(t)=\lVert\mathbf x_+(t)-\mathbf x_-(t)\rVert,
\qquad
\dot r(t)=
\frac{(\mathbf x_+-\mathbf x_-)\cdot(\mathbf v_+-\mathbf v_-)}{r(t)},
$$

and also record relative speed
$w(t)=\lVert\mathbf v_+(t)-\mathbf v_-(t)\rVert$. Segment interval enclosures,
not display samples, decide every threshold.

- **Bound through window:** throughout $[t_c,t_c+H]$, $r(t)\le2d$; over the
  final half-window, $|r(t_c+H)-r(t_c+H/2)|/H\le0.01d/H$; and the dispersed gate
  never fires.
- **Dispersed through window:** before the final half-window, $r(t)\ge4d$ with
  $\dot r(t)>0.05$; throughout the final half-window, $r(t)>3.5d$ and the lower
  interval bound of $\dot r(t)$ remains positive.
- **Unresolved:** neither finite-window gate holds, or a threshold interval
  straddles its boundary.
- **Conditional on prehistory:** the three endpoint-matched runs disagree in
  fate, or, after $t_c$, any pair differs by more than $0.02$ in $r/d$,
  $H\dot r/d$, or $w$ on their common claim window. This classification takes
  precedence over “bound” or “dispersed.”

A basin-scoped fate is booked only when all three prehistories collapse within
these limits at R1 and R2.

## Master-Equation Residual Gate

The residual reducer is authored fresh from this spec. For every accepted EOM
segment, it evaluates the segment acceleration
$\mathbf a_{\mathrm{seg}}(u)=2\mathbf c_2+6u\mathbf c_3$ and independently
reconstructs the master-equation acceleration interval from that segment's
retained-history/root ledger at the segment start, midpoint, and end. It also
checks an interval hull over the full segment.

Every component residual interval must contain zero after the EOM segment error
budget is applied, and its absolute upper bound must be no larger than
$10^{-2}$. R2 residual width must be no larger than R1. One failed point or one
unresolved full-segment hull fails the run; endpoint-only residuals do not pass.

## Root-Ledger Gate

Every ordered pair, including self-pairs, must be `certified_complete` at
release and at every residual evaluation point. Before $t_c$, the ledger must
also certify that no active root can still reach the seeded interval. An
unresolved complement, precision ceiling, memory boundary, caustic, or
transmitter-side-factor pole closes the claim window and fails the run
closed.

## Independent-Oracle Parity (G5)

Every one of the 81 production runs has one independent-oracle window: the
first complete R2 segment after $t_c$. The Python
`eom_independent_oracle/v0` receives the declared prehistory and request
parameters directly, never an engine-generated shortcut. Passing parity
requires:

1. identical ordered-pair membership and root count;
2. overlapping certified root brackets;
3. overlapping master-equation acceleration intervals; and
4. engine endpoint position and velocity intervals enclosed by, or overlapping,
   the oracle intervals at the declared $2\times10^{-6}$ tolerance.

Engine/replay equality, checkpoint resume equality, and R1/R2 self-agreement do
not satisfy G5.

## Evidence and View-Record Booking

Each run id is
`rung1-d<d>-s<s>-theta<theta>-<prehistory>-R<level>`. Beside its evidence file
land:

- `run-manifest.json` with build identity, workload coordinates, refinement
  level, root status, and run status;
- `assembly-view-record.json` emitted directly from checkpoint histories;
- residual ledger;
- root ledger;
- oracle parity record;
- symmetry-reduced observable table; and
- reproduction command.

The record must report concrete `engineVersion`, `generatingSpec`, and `date`,
`runStatus: completed`, `claimGrade: evolved-record`, the correct prehistory and
evolved segment counts, and exact token parity with the checkpoint. Producer
evidence flags are ignored. A missing or converted display record makes the run
unbookable.

The campaign fate table books one row per $(d,s,\theta)$ only after all three
prehistory coordinates and required refinements pass. No result is promoted to
the canonical corpus in this campaign.

## Named Falsifier

The campaign's named falsifier is **post-clearance non-collapse or gate
violation**. It fires if any endpoint-matched prehistory changes the fate or
exceeds the collapse tolerance after $t_c$; any finer in-envelope run changes
the fate; any master-equation residual exceeds $10^{-2}$; any root ledger is
incomplete or reaches the seeded interval; any production oracle window fails
parity; any path touches field speed; or any view-record segment differs from
its checkpoint. Inspect the fate table, residual/root ledgers, oracle record,
sub-field velocity enclosure, and checkpoint/record token comparison beside
the run.

## Production Boundary and Rung-2 Entry

The instrument and workload prerequisites are satisfied. Production remains a
separate change so the first workload exercise cannot also become a physics
claim. That later change must reconfirm or amend the build identity, execute the
declared run matrix, and pass every booking gate above before recording any
fate.

Rung 2 may start only if rung 1 has at least one basin-scoped bound-through-window
row with all residual, root, refinement, collapse, strict-sub-field, record, and
per-run oracle gates green. If every row disperses, rung 2 should widen the
sub-field separation/speed grid before increasing $N$. If outcomes remain
prehistory-conditional, rung 2 must first turn preparation history into an
explicit campaign coordinate. Field-speed folds remain a Waiting On extension.
