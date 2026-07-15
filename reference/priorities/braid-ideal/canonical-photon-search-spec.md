# Canonical Photon Search — Force-Balance Screen Result

**Date:** 2026-07-15
**Dispatch:** [canonical-photon-search-dispatch-packet.md](canonical-photon-search-dispatch-packet.md)
**Runner:** `scripts/braid-ideal/canonical-photon-search.mjs`
**Fixture:** `scripts/braid-ideal/canonical-photon-search-fixture.mjs`
**Owner test:** `tests/braid-ideal-canonical-photon-search.test.js`
**Independent comparator:** `scripts/eom/canonical-photon-self-root-parity.py`

## Verdict in plain language

No canonical 12-worldline photon configuration in the declared search space
comes anywhere near force balance. The best row at near-luminal drift misses
the binding gate by a factor of about $28$ (binding residual $0.833$ against
the declared $0.03$ gate), the best rest row misses by a factor of about
$22$ ($0.650$), and the sampling ladder makes both worse, not better (the
replayed champions converge to residuals of $0.86$–$1.0$ at 24 samples).
There is no force-balanced rest branch and no force-balanced drift branch:
the object fails everywhere, by a margin roughly $20\times$ wider than every
sampling, window, and tail uncertainty combined. This is a **scoped negative
for the declared ranges only** — it retires the canonical photon as a bare
(sea-free) force-balanced assembly within this coverage, and it says nothing
about a sea-dressed photon, which remains the constitutive-sea route's
question.

**Claim grade:** measured, evaluator-grade instantaneous force screen.
No stability, locking, or temporal claim is made anywhere in this document.
Because no row passed force balance, the eom coupled-release stage was
correctly not run (a release from a non-equilibrium screen row carries no
target authority), and no linearization was performed about any
configuration.

**Falsifier:** a certified row in these declared grids with
$\epsilon_{\rm bind} \le 0.03$, $\kappa_\star > 0$, and clean flags would
overturn this negative. The operator can check any single row in seconds:
`node scripts/braid-ideal/canonical-photon-search.mjs --mode=bench` measures
cost, and any row of any stage can be replayed by index; the shard files in
`.tmp/canonical-photon-search/` carry every scored row.

## Engine ruling compliance and eom acceptance gate

- All dynamics were gated on the new `src/eom` engine. The acceptance gate is
  **green in this environment**: `tests/test_eom_native_history_layer.py`
  (15 tests), `tests/test_eom_native_acceleration.py` (12), and
  `tests/test_eom_native_coupled_evolution.py` (17) all pass, native C++
  against the 90-digit Python oracle.
- **Build freshness:** the native engine was rebuilt in this session
  (2026-07-15, ~15:29 UTC sandbox time) from sources whose latest change is
  `src/eom/src/CoupledEvolution.cpp` at 2026-07-15 12:54 — binary newer than
  the last source change. `src/eom` was not modified.
- **Inspection residual items 1–3** (from the
  [independent inspection](../app-solver/eom-engine-independent-inspection-2026-07-13.md)):
  item 1 (fold/caustic impulse): the analytic pinned-fold certificate landed
  2026-07-14 with oracle acceptance tests. Item 2 (co-cell multi-root
  completeness): the evolved-history root-path repair (token-dominance gate,
  two-segment join enclosure, self-root-cluster route) landed 2026-07-14
  with native/oracle parity on evolved history. Item 3 (theorem-anchored
  departure cases): the sub-$c_f$ departure case is evolved-confirmed (the
  §97 finalist departs its circle under the master equation); the
  super-$c_f$ curved self-hit oracle case is **still open** — one more
  reason no super-$c_f$ dynamical claim is made here.
- Because zero rows survived the force-balance precondition, this campaign's
  outputs are exactly the force-balance screens the packet authorizes; the
  quarantine discipline of the
  [claims-triage ledger](../app-solver/claims-triage-ledger-2026-07-12.md)
  is untouched.

## The object (certified before any number)

Photon = two braids, lead and trail, stacked along the drift direction $z$.
Braid = 3 binaries $I, M, O$; binary = one $+/-$ conjugate antipodal pair
(charges $\pm|e|/6$ explicit per site) rotating in a plane $\perp z$. Twelve
explicit worldlines, 6 of each polarity; net charge certified $0$ by summing
explicit per-site charges. Corresponding lead/trail binaries have identical
radius and transverse speed and opposite rotation sense. Axial order is
front-to-back $I, M, O$ in the lead braid with the reflection-symmetric
trail order ($O$ faces the gap). The runner **throws** on any drift from
this object (occupancy $\ne 2$, non-antipodal pair, polarity imbalance,
mirror violation, nonzero net charge); the owner test exercises these
defects.

## Instrument

The screen implements the sharp master-equation law exactly as the endorsed
`src/eom` engine defines it: per certified delayed root,
$a = \kappa\, q_r q_s\, |D_T/D_s|\, \hat r / r^2$ with
$D_s = c_f - \hat r \cdot v_{\rm src}$ and
$D_T = c_f - \hat r \cdot v_{\rm recv}$ — no softening, direction always
source-to-receiver, sign from the charge product only. Delayed roots come
from a **complete Lipschitz root finder**: the causal residual's derivative
is rigorously bounded ($|g'| \le c_f + |v_{\rm src}|$), so a scan cell
whose endpoint magnitudes exceed the bound times its width is *certified*
root-free, and every other cell is subdivided until it brackets a simple
root or fails closed (tangency flag / work-budget flag). Self-hits are
first-class: self-roots use the exact closed-form helical residual
$2R\,|\sin(\omega\delta/2)| = \sqrt{c_f^2 - u^2}\,\delta$ (a hand-derivable
theorem for a drifting circular worldline), which also proves there are no
self-roots at sub-field total speed and none at super-luminal drift, and
that at $u = c_f$ exactly every self-root sits on a $D_s = 0$ fold.

Force balance is scored as in §99: the required acceleration of each site on
its presumed helix is centripetal, $-\omega_i^2 \mathbf r_\perp$; a common
coupling $\kappa_\star$ is least-squares fitted; the binding residual
$\epsilon_{\rm bind}$ is the normalized remainder. The $\pi$-rotation-plus-
conjugation symmetry of the antipodal object reduces receivers to the six
$+$ sites (validated structurally in the owner test).

Fail-closed row flags: `tangentRoot` (unresolved fold), `causticDs`
($|D_s| < 10^{-6}$ at a consumed root), `luminalSelfPin` (total site speed
within $10^{-9}$ of $c_f$; the pinned self-fold term is *omitted and
flagged*, exactly the §86 hard case), `scanBudgetExhausted` (refinement work
cap). Uncertified rows are never scored as negatives; they are reported as
uncertified.

### Evidence independence

1. **Production-runtime parity (non-self roots):** on declared sample rows,
   emission times agree with `solveMovingCircularSourceCausalRoots` (the
   unit-tested legacy production root solver, independent implementation) to
   $\le 8\times10^{-13}$, including the short-delay trail$\leftarrow$lead
   direction at $u = 0.99$ (`--mode=legacy-parity`, `allMatched: true`).
2. **Closed-form/mpmath parity (self roots and self force):**
   `scripts/eom/canonical-photon-self-root-parity.py` re-solves the helical
   residual at 60 significant digits and recomputes the master-equation
   self-acceleration independently of all JavaScript. Three cases (rest
   super-$c_f$; $u=0.99$; $u=0.9999$ with 55 self-roots): root deltas
   $\le 1.8\times10^{-12}$, force deltas $\le 8\times10^{-19}$, ALL PASS.
3. **§99 analytic symmetric-pair anchor:** reproduced,
   error $1.1\times10^{-16}$ (implementation test only).
4. **§92 control:** reproduced **exactly** (deltas $0$ on both the free-pair
   $0.19885688497216406$ and hard-lock $0.19629953398461314$ growth values).
5. **§93/§95 controls:** the control instruments are single monolithic
   completions that exceed this sandbox's 45-second execution ceiling; they
   could not be run here. This is an environment blocker, not a physics
   blocker. Exact commands for the operator/Codex:
   `node scripts/braid-ideal/canonical-photon-search.mjs --mode=controls --which=93`
   and `--which=95`; the owner test runs all controls under
   `CANONICAL_PHOTON_FULL_CONTROLS=1`.

## Coverage statement (exact counts; declared before scoring)

Gauges (exact symmetries, not restrictions): $\phi_I^{\rm lead}=0$ (global
rotation), $s_I^{\rm lead}=+1$ ($y$-reflection), $R_M=1$ (scale gauge; the
fitted $\kappa_\star$ absorbs it and $\epsilon_{\rm bind}$ is invariant).

| Stage | Grid (verbatim from the fixture) | Rows |
|---|---|---|
| P1 geometry, full factorial | $R_I, R_O \in \{0.55, 0.75, 1.0, 1.3\}$; $v_I, v_M, v_O \in \{0.6, 0.9, 1.0, 1.25\}$ (independent per pair); $d_1, d_2 \in \{0.35, 0.7\}$; $g \in \{0.5, 1.0, 1.5\}$; $\phi_M=\phi_O=0$; senses $(+,+,+)$; sense-only mirror; $\Delta=\pi$; $u \in \{0, 0.99\}$ | $2\cdot4^2\cdot4^3\cdot2^2\cdot3 = 24{,}576$ |
| P1b phase-forward, full factorial | independent core $R_I,R_O \in \{0.55, 1.0\}$, common $v \in \{0.6,0.9,1.0,1.25\}$, $d_1{=}d_2 \in \{0.35,0.7\}$, $g \in \{0.5,1.5\}$ crossed with the FULL discrete lattice $\phi_M,\phi_O \in \{0,\pi/3,2\pi/3\}$, senses $\{(+,+,+),(+,+,-),(+,-,+),(+,-,-)\}$, both polarity-mirror variants, $\Delta \in \{0,\pi/2,\pi,3\pi/2\}$; $u \in \{0, 0.99\}$ | $2\cdot(2^2\cdot4\cdot2\cdot2)\cdot(9\cdot4\cdot2\cdot4) = 36{,}864$ |
| P2 discrete cross on champions | best 24 certified P1 rows per drift $\times$ the same full discrete lattice ($288$ each) | $13{,}824$ |
| P3 drift continuation, geometry re-solved | best 12 champions overall; per champion and per $u \in \{0.999, 0.9999\}$: center $+$ each of 8 continuous DOF ($R_I,R_O,v_I,v_M,v_O,d_1,d_2,g$) stepped by factors $\{0.8, 1.25\}$ | $408$ |
| P4 luminal endpoint, direct | same 17-row neighborhoods at $u = c_f$ exactly | $204$ |
| **Total scored** | | **75,876** (75,672 certified; 204 fail closed, all at $u=c_f$) |

Sampling: base 3 cycle samples of the slowest binary period; declared ladder
$3\to6\to12\to24$ replayed on all champions and any near-marginal row
($\epsilon_{\rm bind} \le 0.06$; none existed). Window ladder: champions
replayed at $2\times$ the scan window — **bit-identical residuals**, so the
window is sufficient. Tail contributions beyond the window are reported per
row as a declared diagnostic (cap assumption $W \le 25$, at most 4 tail
roots per source period).

**Transverse speed regimes:** sub-$c_f$ ($0.6, 0.9$), the exact transverse
pin ($1.0$), and super-$c_f$ ($1.25$) are all covered. At $u>0$ every row's
total site speed is super-$c_f$, so self-hits are active in all drift rows
(they are computed from the closed-form ledger, not omitted). Rows whose
total speed pins at exactly $c_f$ (e.g. $v=1.0$ at $u=0$) are flagged
`luminalSelfPin`: their self-fold term is omitted at evaluator grade, which
can only *understate* their residual; every such row still failed by a wide
margin, hence the negative is unaffected.

**Not exercised** (each a costed widening lever, none silently dropped):
the full Cartesian product of P1 geometry with the P1b discrete lattice
(measured cost: $\sim 4$–$7$ ms/row single-threaded, so the full
$24{,}576 \times 288$ cross is $\sim 2$ CPU-hours if ever wanted);
per-binary independent lead/trail offsets $\Delta_i$ (only the common
$\Delta$ was searched); axial-order permutations other than $I,M,O$
(radii/speeds sweep independently, so permutations are near-relabelings);
ring-plane tilt (excluded by the packet's object definition); any
constitutive sea (out of scope by the packet); the pinned self-fold term on
`luminalSelfPin` rows; drift values between the declared points.

## Results

### Force balance fails everywhere (the headline numbers)

| $u/c_f$ | rows | min $\epsilon_{\rm bind}$ (3-sample screen) | bind passes |
|---|---|---|---|
| $0$ (rest check) | 37,632 | $0.650$ | 0 |
| $0.99$ | 37,632 | $0.833$ | 0 |
| $0.999$ | 204 | $0.831$ | 0 |
| $0.9999$ | 204 | $0.831$ | 0 |
| $1$ (direct) | 204 | all fail closed (luminal band) | 0 |

The declared gate is $\epsilon_{\rm bind} \le 0.03$ with $\kappa_\star > 0$.
The sampling ladder *raises* every replayed champion (e.g. the rest best
$0.650 \to 0.971$ at 24 samples; the $u=0.99$ best $0.833 \to 0.998$): the
3-sample screen is flattering, so the converged negative is stronger than
the screen numbers. Window doubling changes nothing. No row at any rung
comes within $20\times$ of the gate — sampling artifacts cannot manufacture
or hide a pass at this margin.

**No rest branch:** no force-balanced rest configuration exists in the
declared coverage (required for a photon, though here it is moot since no
drift branch exists either).

### Packet exploration dimensions (a)–(d), answered

- **(a) H-$\pi$ phasing:** $\pi$ is NOT selected over $0$ — because they are
  the *same object*: offsetting a trail binary by $\pi$ equals conjugating
  its polarities (antipodal identity, proven as an exact site-set identity
  in the owner test and visible in the campaign as bit-level ties). The
  physical family is $\Delta \bmod \pi$, and the physics mildly prefers
  $\Delta \in \{0 \equiv \pi\}$ over $\pi/2 \equiv 3\pi/2$ (best $0.833$ vs
  $0.871$ at $u = 0.99$). The H-$\pi$ hypothesis is therefore *degenerate
  with* $\Delta = 0$, not falsified and not confirmed as a distinct lattice.
- **(b) Within-braid senses:** all four gauge-inequivalent patterns swept;
  best is $(+,+,-)$ ($0.650$), worst $(+,-,+)$ ($0.852$). No pattern binds.
- **(c) Polarity mirroring:** both variants swept; they tie to $10^{-16}$
  at the optimum (a consequence of the same antipodal identity). Neither
  admits force balance.
- **(d) Ranges and grids:** declared in the fixture before any run and
  echoed verbatim above; the P4 direct-endpoint treatment and this coverage
  table were fixed before scoring.

### Speed-dependent geometry and the flattening diagnostic $d_i(u)$

Geometry was re-solved at every drift (P1/P1b full grids at $u \in
\{0,0.99\}$; declared neighborhood re-solve at $0.999, 0.9999, 1$). The
best-row spacings along the branch:

| $u/c_f$ | $d_1$ | $d_2$ | $g$ |
|---|---|---|---|
| $0$ | $0.35$ | $0.70$ | $1.5$ |
| $0.99$ | $0.35$ | $0.35$ | $1.5$ |
| $0.999$ | $0.35$ | $0.35$ | $1.875$ |
| $0.9999$ | $0.35$ | $0.35$ | $1.875$ |

$d_1, d_2$ sit at the declared grid floor from $u = 0.99$ on and do not
continue toward $0$ within the re-solve neighborhoods ($0.8\times$ steps
were offered and not taken). **Measured: no flattening trend toward planar
within this coverage** — with the caveat that a residual landscape with no
equilibrium anywhere ($\epsilon_{\rm bind} \approx 0.83$) makes $d_i(u)$ a
diagnostic of a non-equilibrium objective, not of a bound object's shape.

### The luminal endpoint $u = c_f$

Direct evaluation was attempted with the helical-residual scanner (no
moving-circular reparametrization, so the endpoint is not silently
dropped): all 204 rows **fail closed** on the scan-work budget — at
$u = c_f$ co-moving forward pairs sit on a persistent near-critical causal
residual (the documented singular structure), and every self-root is a
$D_s = 0$ fold. The endpoint answer is therefore carried by the documented
limit: Richardson extrapolation of the minimum binding residual over
$u \in \{0.99, 0.999, 0.9999\}$ gives $\epsilon_{\rm bind}(u \to c_f) =
0.83071$ (two-point) vs $0.83072$ (three-point), **error budget
$2.4\times10^{-6}$** — four orders of magnitude smaller than the distance
to the gate.

### Axial pump and drift-selection diagnostics

The best rows carry uncancelled axial pump ($|{\rm pump}| = 0.04$–$0.12$
against the $0.02$ gate) and a lead/trail axial-force asymmetry (the lead
braid barely feels the trail at near-luminal drift — the chase-direction
force is suppressed as $(1-u/c_f)^2$ — while the trail braid feels the lead
at short delay). Nothing in the declared space simultaneously balances,
cancels pump, and selects drift.

## Decision (packet logic)

**No force-balanced, locked, $c_f$-selecting canonical row exists in the
declared ranges → scoped negative for the declared ranges only.** The DOF
that bound the negative most tightly are the spacings/gap (best rows pinned
at the $d_i$ grid floor) and the speed triple (best rows use mixed
super-$c_f$/sub-$c_f$ speeds); widening either is cheap ($\sim$100 s per
24k-row factorial, single-threaded) but the ladder-converged margins
($>20\times$ the gate, monotonically worsening under refinement) give no
indication that any nearby widening closes the gap. On this evidence the
constitutive-sea route remains the cheaper lever, consistent with the
§99-era strategic conclusion — now established for the *canonical* object,
which the retired §99 screen never tested.

No chirality claim (no cap dipole is modeled). No constitutive-sea claim
(no sea is modeled). No temporal claim (nothing survived to release).

## Reproduction

```bash
node scripts/braid-ideal/canonical-photon-search.mjs --mode=count
node scripts/braid-ideal/canonical-photon-search.mjs --mode=screen-p1  --offset=0 --limit=12288
node scripts/braid-ideal/canonical-photon-search.mjs --mode=screen-p1b --offset=0 --limit=18432
node scripts/braid-ideal/canonical-photon-search.mjs --mode=select-p2 && node scripts/braid-ideal/canonical-photon-search.mjs --mode=screen-p2 --offset=0 --limit=13824
node scripts/braid-ideal/canonical-photon-search.mjs --mode=select-p3 && node scripts/braid-ideal/canonical-photon-search.mjs --mode=screen-p3 --offset=0 --limit=408
node scripts/braid-ideal/canonical-photon-search.mjs --mode=screen-p4 --offset=0 --limit=204
node scripts/braid-ideal/canonical-photon-search.mjs --mode=ladder --stage=p1   # and p1b, p2, p3
node scripts/braid-ideal/canonical-photon-search.mjs --mode=summarize
node scripts/braid-ideal/canonical-photon-search.mjs --mode=anchor
node scripts/braid-ideal/canonical-photon-search.mjs --mode=legacy-parity
node scripts/braid-ideal/canonical-photon-search.mjs --mode=self-parity-emit && python3 scripts/eom/canonical-photon-self-root-parity.py
node --test tests/braid-ideal-canonical-photon-search.test.js
```

Row-level shards and `summary.json` live in `.tmp/canonical-photon-search/`
(scratch, not committed). Long screen runs emit a heartbeat every 100 rows
(row index, wall seconds).
