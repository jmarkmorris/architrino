# EOM Attractor Search — Brainstorming and Provisional Capture

**Opened:** 2026-07-15, from the operator session that executed the
canonical-photon search. Everything here is staged capture with claim
levels; nothing is corpus-solid yet.

## Why this workstream exists (the three-assumption diagnosis)

Every bare-assembly negative in the program — §83/§84 torque-null no-go,
§92/§93 pair pump/flutter, §97/§98 isolated-triple non-bind, §99 planar
assembly, and the 2026-07-15 canonical-photon scoped negative (75,876 rows
stacked + 5,760 coplanar-hexagonal; zero force balance; see
canonical-photon-search-spec.md (legacy-braid ref: `braid-archive/braid-ideal/canonical-photon-search-spec.md`))
— shares three assumptions: the assembly is **isolated** in empty void, its
motion is **rigid** (prescribed circles/helices), and success is **static
force balance** in a co-moving sense. The established result (measured,
ladder-hardened) is that the intersection of those three assumptions is
empty. Which assumption is wrong is the open question (inferred, this
session):

1. **Isolation.** The void is not empty in the theory's own ontology. Two
   2026-07-15 findings point at the medium: (a) at drift the summed wake
   force on every tested pair has essentially zero coherent centripetal
   component ($\kappa_\star \to 0$, $\epsilon_{\rm bind} \to 1$) — nothing
   for any coupling to amplify; (b) the master equation has NO pointwise
   $v \times B$ structure (derived: the receiver-velocity coupling per root
   is the symmetric tensor $-\hat r \hat r^{\mathsf T}$, since $v_r$ enters
   only through $D_T = c_f - \hat r \cdot v_r$), so magnetic-like
   phenomenology and plausibly the E-B wave itself are properties of
   disturbances propagating in the medium, not of bare sources. The
   constitutive-sea route tests this assumption.
2. **Rigidity.** Every screen ever run asks whether a guessed rigid shape
   balances. §86's lesson: linear internal freedom aggravates; the untested
   channel is nonlinear retained-history relaxation. A real bound state may
   be a limit cycle (breathing, phase-slipping) no rigid helix
   approximates — in which case $\epsilon_{\rm bind} \approx 1$ against the
   rigid ansatz class is exactly what a real object would produce. THIS
   workstream tests this assumption.
3. **Equilibrium framing.** Co-moving stasis is massive-particle intuition;
   a luminal object has no rest frame. Force balance is the right
   precondition for electron-like objects, possibly a category error for
   the photon. This workstream drops it: persistence replaces balance.

The attractor search is the discriminating experiment: it drops rigidity
and equilibrium simultaneously while staying bare. If persistent structures
exist bare, the sea is not needed for existence; if nothing survives,
isolation is cornered and the sea route inherits everything.

## Operator observation seeding the campaign (anecdotal grade — reproduce first)

The Borg app (eom-backed, visualizing) releases populations; most
architrinos escape immediately, but some couple transiently — the operator
observed a **2:2 assembly** that held together for a while. Not yet
reproduced headless, not yet collapse-tested, no persistence metric
recorded. First targeted sub-campaign: dense re-seeding around that
observed 2:2 configuration — an observed near-coupling outranks random
seeds.

Related standing hint (T1-adjacent): the $v = c_f$ speed attractor — pairs
pinned at the field speed. Escaper speed histograms ride along free in
every ensemble and bear on it.

## E-B wake-pattern probe results (context; measured 2026-07-15, evaluator grade)

`canonical-photon-search.mjs --mode=eb-pattern`, held assemblies at
$u = 0.99$, co-moving observers at $\rho \in \{3,6,12\}$ (delays
$\gamma$-scaled, $\Delta \approx \rho/\sqrt{1-u^2}$): oscillating wake is
91–98% longitudinal for every tested geometry (hex pair, stacked champion,
contra/co/single controls nearly identical); transverse remainder is
linearly polarized but axis-locked to observer azimuth (electrostatic-like,
not a wave). No bare geometry shows a transverse plane-polarized co-moving
pattern. Untested sharper probe: the transient pulse waveform at a STATIC
observer as the assembly passes; and both probes inside a modeled sea.

## Campaign plan (ratified in-session 2026-07-15; Phase 1 later superseded — see below)

- **Phase 0 — workload characterization.** Profile the Borg-style release
  headless at $N \in \{6, 12, 24, 48\}$, fixed short horizon, sampling
  profiler: attribute wall time (root certification / acceleration
  snapshots / corrector / history reconstruction / reducer) and split
  escaped-pair vs close-pair cost; measure the $N$-scaling exponent
  empirically. All §86-era optimizations targeted the pinned-fold MPFR
  workload; the release ensemble is a different cost structure. Cost
  claims are empirical, always.
- **Phase 1 — single performance enhancement (SUPERSEDED as a decision:
  the operator landed the final eom performance improvement on
  2026-07-15 before Phase 0 ran).** Phase 0 now informs campaign sizing
  rather than enhancement choice. Candidate list retained for reference,
  ranked by expected $N$-scaling relevance: (a) stop materializing
  excluded pairs (feed block-exclusion certificates to the reducer
  directly — the README's own open item; the only candidate improving the
  $N$-exponent); (b) warm-carry of root brackets across steps for
  slowly-changing far pairs; (c) certified binary64 fast path for pairs
  provably below the acceleration tolerance. Validation protocol for any
  future change: byte-identical trajectories (SHA-256) on §86/§97
  fixtures, native↔oracle parity suites green, A-B-A paired timing, no
  certificate-rule or tolerance change, never in the same diff as a
  comparison instrument.
- **Phase 2 — headless ensemble harness** (driver in the
  section-97-98-direct-evolution.cpp pattern): declared seed distributions
  for neutral populations; T3 prehistory discipline built in (materially
  different prehistory families per endpoint state — circular, straight,
  inspiral — with root-clearance certificates on the seeded interval);
  escape/cluster census as first-class observables; checkpointed chunks
  with heartbeats; trajectory replay format the Borg app can visualize
  (compute headless, pictures preserved).
- **Phase 3 — campaign design declared before scoring:** population sizes,
  charge mixes, initial-condition families with exact counts; persistence
  criterion fixed up front (bounded separation over $\ge k$ slow periods
  with certified roots, $k$ declared); escaper-culling only if Phase 0
  shows escapers dominate, and only with a certified back-reaction bound
  plus operator ratification (culling is a physics approximation). First
  target: the 2:2 neighborhood.
- **Phase 4 — promotion:** any persistent cluster runs the full collapse
  protocol (endpoint-matched distinct prehistories, refinement envelope)
  before "candidate" is uttered; survivors route to the claims queue as
  the first native bound-structure evidence.

## Observables (first-class in the harness)

Cluster census over time with composition ledger ($k{:}m$ mixes, e.g.
2:2), cluster lifetimes, boundedness of mean separation, per-cluster charge
and angular-momentum ledgers, escaper speed histogram (speed-attractor
bearing), pair-distance minima (collision diagnostics), root-certification
health (fail-closed events), and approach-to-pin statistics.

## Standing constraints and cost rules

- **Pinned/self-fold cost wall:** seeds at exactly $v = c_f$ (or total
  speed pinned to $c_f$) inherit §86's perpetual near-singularity cost.
  First ensembles stay off the pin. If dynamics FLOW toward the pin, that
  approach is itself a finding, and pinned-step budget becomes a measured
  quantity, not a surprise. (Definitions: a fold is a delayed root with
  $D_s = 0$ — a caustic, roots born/dying in tangent pairs; a self-fold is
  the architrino catching its own wake, existing only above $c_f$ total
  speed; a pinned fold is the $v = c_f$ degenerate case where the tangency
  sits at zero delay on the particle forever.)
- **Prehistory selects the future** (2026-07-14 collapse-test result): no
  ensemble outcome is object-level until endpoint-matched distinct
  prehistories agree within the numerical envelope. Seed-indexed results
  are reported as seed-indexed.
- **No mass, no $mv$;** wake/action reasoning only; "delayed", never the
  disallowed variant; KaTeX inline math; evidence independence per
  AGENTS.md (any new instrument names its independent reference at birth).
- Long runs emit heartbeats (step index, simulation time, wall seconds);
  no DONE with an unwatched job running; rebuild native before running and
  state binary build time vs last source change.

## Open questions parked here

- Does the ensemble select the antipodal binary + $c_f$ pin spontaneously
  (speed attractor at population scale)?
- Is the observed 2:2 a metastable transient or a shallow basin? What is
  its composition (polarity mix, senses, separations)?
- What is the right persistence horizon $k$ given measured escape
  timescales?
- Static-observer pulse waveform of a passing held assembly (E-B recovery
  probe #2); repeat inside a modeled sea once the constitutive operator
  exists.
- Does escaper culling admit a certified back-reaction bound, or does the
  campaign simply pay the $O(N^2)$ tail?
