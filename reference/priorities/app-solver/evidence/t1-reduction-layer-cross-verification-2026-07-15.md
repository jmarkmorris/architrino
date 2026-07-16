# T1 Clean-Room Reduction-Layer Cross-Verification — 2026-07-15

**Current disposition:** `NOT_VERIFIABLE_ANALYTIC_INTERVAL_EXHAUSTED`;
Tier 1 OPEN; Tiers 2--4 barred; `priority-only`; no corpus promotion. The
earlier Tier-1 `FAIL` below is retained as an adjudicated definition-mismatch
record, not the current §14 verdict.

**Clean-room boundary.** This pass independently authors reductions over the
EOM independent-oracle output contract. The reduction author and auditor did
not inspect, import, or execute any legacy braid-ideal implementation and did
not follow the fixture packet's legacy `source_ref` links. A separate fixture
extractor performed the sanctioned constants-only read and copied no reduction
logic.

## Tier 1 predeclaration

The following tolerances and reduction choices were written before the first
Tier 1 calculation.

| Number | Recorded value | Predeclared tolerance | Basis |
|---|---:|---:|---|
| Three neutral binary rings | $0$ primitive charge units | exactly $0$ | Integer charge ledger; no numerical reduction. |
| §99 screened pro/anti pair | $0$ primitive charge units | exactly $0$ | Integer polarity-conjugate ledger for every recorded occupancy/orientation combination. |
| §99 six-negative-site payload | $-6$ primitive charge units $=-1e$ | exactly $0$ | Integer ledger followed by the exact recorded conversion $1$ primitive unit $=|e|/6$. |
| §96 flat-control rings | $0$ primitive charge units | exactly $0$ | Three integer $[+1,-1]$ ledgers. |
| §14 neutral-binary cancellation | approximately $97\%$ cancellation | $\tau=\max(0.005,w_f/2,|c_f-c_c|)$ | `0.005` is the half-unit of the recorded nearest-whole-percent value; $w_f/2$ is the propagated fine-grid oracle enclosure radius; $|c_f-c_c|$ is the independently run fine/coarse history-reconstruction convergence error. |

Here $c_c$ and $c_f$ denote the coarse and fine cancellation-fraction
midpoints, not field speed. The tolerance formula is fixed now; only its
oracle-produced enclosure and convergence inputs will be filled after the run.

## §14 reduction definition fixed before calculation

**Derived:** the owning §14 prose defines the recorded channel as tangential
force from the two opposite-polarity inner sources into all three outer
receivers. The fixture fixes the evaluation start at $T=0$ and identifies all
three outer receivers as the evaluation set. Because the operator requested
the instantaneous fraction, this pass evaluates the six source-to-receiver
pair rows at the exact recorded start epoch $T=0$; it does not average over the
subsequent outer-rotation window. Each certified pair acceleration is projected
onto its receiver's positive tangential unit vector, then the six scalars are
reduced together.

Before computation, the convention mapping is

$$
r=\frac{|\sum_j f_j|}{\sum_j |f_j|},
\qquad
C_{\mathrm{comp}}=1-r,
$$

where $r$ is the operator-defined cancellation fraction and
$C_{\mathrm{comp}}$ is retained only as the complementary cancelled fraction.
Thus the recorded approximately $97\%$ cancellation target is compared directly
to $r\approx0.97$.

**Derived:** the sharp EOM oracle row has the common multiplicative factor
$\kappa q_r q_s$. The recorded outer receivers all have $q_r=+1$, while the
two source signs remain inside each $f_j$. For any common $\kappa>0$,

$$
\frac{|\sum_j \kappa f_j^{(1)}|}
     {\sum_j |\kappa f_j^{(1)}|}
=
\frac{\kappa|\sum_j f_j^{(1)}|}
     {\kappa\sum_j |f_j^{(1)}|},
$$

so the unspecified common coupling cancels algebraically. The oracle request
therefore uses the harmless gauge value $\kappa=1$; this is not a fitted or
inferred physical coupling.

**Audit correction, 2026-07-15.** The first report compared the complement
$1-r$ to the recorded target. An independent audit caught that convention
error. The operator's explicit formula above governs, so this corrected report
compares $r$ itself to $0.97$ and retains $1-r$ only as a secondary diagnostic.
The correction increases the measured disagreement; it does not reconcile it.

## Tier 1 result — FAIL; later tiers barred

**Finding in plain language:** the charge bookkeeping passes exactly, but the
operator-defined instantaneous §14 cancellation does not reproduce the
recorded approximately $97\%$ value. The independently reduced cancellation
at $T=0$ is approximately $42.9009\%$. This is a numerical FAIL, so this pass
stopped before Tier 2 and did not attempt to reconcile the two instruments.

| Number | Fixture reference | Recorded value | New value | Absolute delta | Tolerance | Result and grade |
|---|---|---:|---:|---:|---:|---|
| Three neutral binary rings | `t1-fixture-data-2026-07-15.json` → Tier 1 → `charge_ledgers.three_neutral_binary_rings.site_list` | $0$ units | $0$ units | $0$ | $0$ | **PASS**; derived |
| §99 screened pro/anti pair | same packet → `charge_ledgers.section_99_screened_pair` | $0$ units for each complete pair | $0,0,0,0$ units across the four recorded occupancy/orientation combinations | $0$ | $0$ | **PASS**; derived |
| §99 six-negative-site payload | same packet → `charge_ledgers.section_99_electron_payload.site_list` | $-6$ units $=-1e$ | $-6$ units $=-1e$ | $0$ | $0$ | **PASS**; derived |
| §96 flat-control rings | same packet → `charge_ledgers.section_96_flat_control_charge_ledger` | $0$ units | $0$ units | $0$ | $0$ | **PASS**; derived |
| §14 instantaneous cancellation | same packet → `section_14_neutral_braid_configuration`; §14 owning spec; $T=0$; all $3\times2$ tangential pair rows | $r=0.97$ | $r=0.4290091236275871282409795810$; $C_{\mathrm{comp}}=0.5709908763724128717590204190$ | $0.5409908763724128717590204190$ | $0.005$ | **FAIL**; measured |

### Hand charge check

**Derived:** the three binary rings give
$Q=(+1-1)+(+1-1)+(+1-1)=0$. For every screened row the anti braid reverses
every pro charge, so $Q_{\rm pair}=Q_{\rm pro}-Q_{\rm pro}=0$; explicitly the
recorded pro nets are $0,0,+2,+2$ and the anti nets are $0,0,-2,-2$. The
payload gives $Q=6(-1)=-6$ primitive units and therefore
$Q=6(-|e|/6)=-1e$. The §96 flat control repeats $+1-1$ on each of three rings,
so its net is $0$.

### §14 numerical certificate

**Measured:** both independently constructed circular-history resolutions
certified one simple causal root for each of the six ordered source-to-receiver
pairs. The 1500-segment coarse result was
$r_c=0.4290091235366603740838940998$. The 3000-segment fine result enclosed

$$
r_f\in
[0.4290091132346686942865097771,
 0.4290091340205055621954493849].
$$

Its enclosure radius is $1.03929184339544698\times10^{-8}$, and the coarse/fine
midpoint delta is $9.09267541570855\times10^{-11}$. The predeclared tolerance
therefore evaluates to

$$
\tau=\max(0.005,1.0393\times10^{-8},9.0927\times10^{-11})=0.005.
$$

The measured delta $0.5409908764$ exceeds $\tau$ by about $108.2$ times.

**Falsifier:** this FAIL is overturned if the same recorded $T=0$ configuration,
all-six-pair tangential reduction, and certified sharp EOM-oracle contract
produce an $r=|\sum_j f_j|/\sum_j|f_j|$ interval within $0.005$ of $0.97$. The
operator can check the pair rows and reduction by running the reproduction
command below.

## Reproduction and stop point

```bash
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" \
  scripts/eom-verification/t1_reduction_layer.py \
  --coarse-segments 1500 --fine-segments 3000

PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" \
  tests/test_eom_t1_reduction_layer.py -v
```

The execution emitted one heartbeat after every pair at simulation time
$T=0$. Tier 2, Tier 3, and Tier 4 were not started.

## Adjudication addendum — 2026-07-15 (operator-thread review)

The §14 FAIL above is adjudicated as a **definition/configuration mismatch, not a numerical
disagreement**. The recorded 0.97 is owned by `legacy source retired`
§14 ("Cross-Hit Absorption on the Causal Root-Sum"): the cross-hit relay from a **nested neutral
inner binary** onto the middle receiver, computed as a **period-integrated causal root-sum**
(N_T = 2000→8000 ladder; converged net 0.214→0.224 vs magnitude sum 7.42; 1 − 0.224/7.42 = 0.970).
The comparison target computed here — T=0, six-pair internal tangential ratio on the single-shell
braid — is a valid measurement of a **different, unrecorded observable**, in a configuration where
spec §8 shows the cross-hit channel does not exist (single common frequency → zero cross-hit
clicks). The definitional error entered through the dispatch prompt (which restated the observable
inline, propagating a provenance mislabel in the claims-triage ledger's §14 row, since corrected —
see the ledger's R5c note and Tier-1 adjudication section). The blind reduction layer executed its
instruction faithfully; no defect in this file's measurements is implied.

Status: charge-ledger rows stand as PASS (first cross-verified T1 rows). The §14 row reverts from
FAIL to PENDING-RERUN under the owning definition. The independent value r = 0.4290091236275871
(complement 0.5709908763724129) is retained as a diagnostic of the unrecorded single-shell T=0
observable; it carries no claim and contradicts none. Tiers 2–4 remain barred until the §14 rerun
closes Tier 1. Claim level: adjudication verified by direct read of spec §§8, 13, 14; the
0.970 arithmetic reproduction is derived from the spec's stated numbers, with exact normalization
to be pinned by the rerun.

## §14 owning-definition rerun predeclaration — 2026-07-15

**Status before calculation:** `PREDECLARED_NOT_RUN`. This section was appended before the first
official $N_T=2000,4000,8000$ numeric run. The rerun uses the fixture packet's
`section_14_causal_root_sum_owner_configuration` and its quoted owning definition: at each
reception time $T$, certify every causal emission root, evaluate source state at emission and
receiver state at reception, project each signed branch contribution onto the receiver tangent,
then aggregate the branch rows over the full half-open one-rotation reception window. The
single-shell $T=0$ diagnostic above is excluded from the rerun input.

The two reported fractions are named separately and are not interchangeable:

$$
S=\frac{|F_{\mathrm{net}}|}{F_{\mathrm{mag}}},
\qquad
C=1-S,
$$

where $F_{\mathrm{net}}$ is the signed tangential root-sum and $F_{\mathrm{mag}}$ is the sum of
the magnitudes of the same branch contributions. The recorded target $0.97$ is the cancellation
fraction $C$, consistent with the recorded arithmetic $1-0.224/7.42$.

**Derived coupling convention:** the EOM sharp-row contract multiplies every admitted branch by
one common factor $\kappa |q_rq_s|$ and carries the polarity in the recorded charge signs. The
fixture gives unit-magnitude receiver and source charges, so $|q_rq_s|=1$ on every row. For one
common $\kappa>0$, both $|F_{\mathrm{net}}|$ and $F_{\mathrm{mag}}$ acquire the same factor;
therefore $S$ and $C$ are invariant under $\kappa$. The rerun may set the gauge value $\kappa=1$
only after checking those unit magnitudes. A missing or non-common charge magnitude returns
`NOT-VERIFIABLE` rather than being inferred.

**Fixed comparison tolerance:** the documented normalized convergence width is

$$
w_{\mathrm{doc}}=\frac{0.224-0.214}{7.42}
=\frac{0.010}{7.42}
=0.0013477088948787061994609164420485\ldots.
$$

The recorded $0.97$ is nearest-percent precision, so its half-unit is $0.005$. Before running,
the comparison tolerance is fixed as

$$
\tau_{\mathrm{cmp}}=\max(0.005,w_{\mathrm{doc}})=0.005.
$$

It will not be widened from live ladder movement. The comparison passes only if the complete
certified $C_{8000}$ enclosure lies inside $[0.97-\tau_{\mathrm{cmp}},
0.97+\tau_{\mathrm{cmp}}]$.

**Separate live-convergence criterion:** let $I_N$ be the certified interval for $C_N$ and define

$$
d(I,J)=\max(|I_{\mathrm{lo}}-J_{\mathrm{lo}}|,
|I_{\mathrm{hi}}-J_{\mathrm{hi}}|),
\qquad
w_{\mathrm{cert}}=\max(\operatorname{width} I_{4000},
\operatorname{width} I_{8000}).
$$

The ladder is declared settled only if both

$$
d(I_{4000},I_{8000})\le w_{\mathrm{doc}}+w_{\mathrm{cert}}
\quad\text{and}\quad
d(I_{4000},I_{8000})\le d(I_{2000},I_{4000}).
$$

If either inequality fails, or any sample lacks complete certified causal-root coverage or a
certified sharp branch contribution, the disposition is `NOT-VERIFIABLE`. This convergence rule
uses the documented normalized width plus the live certified enclosure width as its scale while
leaving $\tau_{\mathrm{cmp}}$ fixed.

## §14 owning-definition rerun result — NOT-VERIFIABLE

**Finding in plain language:** the clean analytic interval certificate established complete causal-
root coverage at every requested reception sample, and EOM supplied one certified branch-
geometry/acceleration row per externally supplied root bracket, but the live ladder did not
settle. The $4000\to8000$ change is larger than both the declared convergence scale and the
preceding $2000\to4000$ change. Under the predeclaration this is `NOT-VERIFIABLE`; it is not a
numerical FAIL against the recorded $0.97$ and Tier 1 remains open.

The clean-room runner used the fixture's nested two-frequency configuration and full half-open
one-middle-receiver-rotation window. It certified the planar circular scalar causal residual and
its source-normal sign on a recursive interval partition, supplied the resulting complete root
certificate to the unmodified EOM acceleration interface, and aggregated every EOM-certified
signed tangential branch row. **Proof-boundary correction:** the clean analytic interval
certificate alone owns causal-root existence, isolation, and root-free-complement completeness.
The EOM acceleration interface re-evaluates branch separation/direction and intersects the
supplied source- and receiver-normal bounds against retained-history geometry; it does **not**
evaluate the causal residual, establish that an external bracket contains a root, or verify the
root-free complement. Claim grade: **measured** for the ladder values and **derived** for the
clean-certificate completeness reduction from residual exclusion or a strict-sign source normal
on every partition cell.

The interface limitation is executable rather than rhetorical. The runner's
`--interface-boundary-self-check` supplies a deliberately non-root external bracket whose clean
analytic residual interval excludes zero. EOM nevertheless accepts its internally consistent
branch geometry and normal bounds. The self-check must report
`deliberate_bracket_residual_excludes_zero=true`, `eom_branch_geometry_accepted=true`,
`eom_causal_residual_validation=false`, and
`root_completeness_owner=clean_analytic_interval_certificate`. This negative control prevents EOM
branch-row acceptance from being misreported as independent causal-root validation.

| $N_T$ | Pairs | Certified roots | Average net signed root-sum | Average magnitude sum | Surviving fraction $S$ | Cancellation fraction $C$ | Wall seconds |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 2000 | 12000 | 12152 | $[0.084929517467898202,0.084929522253004319]$ | $[2.078956258957152,2.0789562637457504]$ | $[0.040851998163192169,0.040852000558976018]$ | $[0.95914799944102391,0.95914800183680793]$ | 5.4408 |
| 4000 | 24000 | 24304 | $[0.061606692175773241,0.061606697182699795]$ | $[2.0828810100382307,2.0828810150522603]$ | $[0.029577633926548386,0.029577636401595973]$ | $[0.97042236359840395,0.97042236607345178]$ | 10.8191 |
| 8000 | 48000 | 48608 | $[0.11227708541060474,0.11227709321445953]$ | $[2.1112507275483714,2.1112507353663443]$ | $[0.053180365330280151,0.053180369223525613]$ | $[0.94681963077647424,0.94681963466971997]$ | 21.7534 |

The comparison tolerance stayed fixed at
$\tau_{\mathrm{cmp}}=0.005$, giving the target interval $[0.965,0.975]$. The complete
$C_{8000}$ enclosure lies outside that interval, with midpoint delta
$0.023180367276902895$. That fact does not become a FAIL because the separately declared live
convergence prerequisite fails first:

$$
\begin{aligned}
d(I_{2000},I_{4000})&=0.01127436423664385,\\
d(I_{4000},I_{8000})&=0.02360273282192971,\\
w_{\mathrm{cert}}&=3.89324573\times10^{-9},\\
w_{\mathrm{doc}}+w_{\mathrm{cert}}&=
0.001347712788124436199460916442\ldots.
\end{aligned}
$$

Thus the final movement is about $17.5$ times the allowed scale and is larger, not smaller, than
the preceding movement. Exact disposition:
`NOT_VERIFIABLE_LIVE_RECEPTION_LADDER_NOT_SETTLED`; Tier 1 remains OPEN and Tiers 2–4 remain
barred.

**Heartbeat record:** each rung emitted a startup heartbeat at step $0$, then a heartbeat every
100 reception steps through its final step. Every heartbeat included $N_T$, step/total,
reception simulation time, cumulative root count, pair progress, and wall seconds. All three runs
completed in the foreground; no process was detached or left active.

**Reproduction:** build the unmodified EOM library after the latest EOM source, compile the
clean-room runner, then execute the ladder in the recorded order:

```bash
cmake -S src/eom -B /tmp/architrino-eom-t1-build -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/architrino-eom-t1-build --target eom_native --parallel 8
c++ -std=c++20 -O3 -Wall -Wextra -Wpedantic \
  -Isrc/eom/include -I/opt/homebrew/include \
  scripts/eom-verification/t1_section14_native.cpp \
  /tmp/architrino-eom-t1-build/libeom_native.a \
  /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib -pthread \
  -o /tmp/architrino-eom-t1-build/t1_section14_native

/tmp/architrino-eom-t1-build/t1_section14_native \
  --interface-boundary-self-check

/tmp/architrino-eom-t1-build/t1_section14_native \
  2000 100 8 0.002 0 6.411413578754679 1.74 1 0.98 0.44 2.45 0.2 1 1 1 -1
/tmp/architrino-eom-t1-build/t1_section14_native \
  4000 100 8 0.002 0 6.411413578754679 1.74 1 0.98 0.44 2.45 0.2 1 1 1 -1
/tmp/architrino-eom-t1-build/t1_section14_native \
  8000 100 8 0.002 0 6.411413578754679 1.74 1 0.98 0.44 2.45 0.2 1 1 1 -1

PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" \
  tests/test_eom_t1_reduction_layer.py -v
```

**Falsifier:** this `NOT-VERIFIABLE` disposition is overturned by the same fixture-firewalled
full-window branch reduction when a predeclared refinement ladder produces complete certified
root/acceleration coverage and a final adjacent-ladder interval distance no larger than
$w_{\mathrm{doc}}+w_{\mathrm{cert}}$ and no larger than its preceding movement. Only after that
settling condition passes may the fixed $[0.965,0.975]$ target comparison produce PASS or FAIL.

## Corrected §14 owning-rerun predeclaration after certificate audit — 2026-07-15

**Status:** `PREDECLARED_NOT_RUN_AWAITING_INDEPENDENT_HASH_CONFIRMATION`. The ladder numbers above
remain a non-accepted diagnostic because their clean analytic root certificate failed the later
proof-boundary audit: it admitted terminal endpoint uncertainty as though it were an exact root,
merged gaps up to the root tolerance, and formed part of the receiver angle in ordinary double
arithmetic before interval enclosure. Those defects do not establish that a reported number is
wrong, but they make the run inadmissible as causal-root-completeness evidence. No corrected
official ladder has been run.

The fixture, target, comparison tolerance, ladder, and convergence rule remain frozen without
change:

- owning fixture: nested neutral inner binary into the three middle receivers over the full
  half-open one-middle-receiver-rotation reception window;
- ladder: $N_T=2000,4000,8000$ in that order;
- named fractions: $S=|F_{\mathrm{net}}|/F_{\mathrm{mag}}$ and $C=1-S$;
- recorded target: $C=0.97$;
- fixed comparison tolerance: $\tau_{\mathrm{cmp}}=
  \max(0.005,0.010/7.42)=0.005$;
- live convergence: $d(I_{4000},I_{8000})\le w_{\mathrm{doc}}+w_{\mathrm{cert}}$
  and $d(I_{4000},I_{8000})\le d(I_{2000},I_{4000})$; failure remains
  `NOT-VERIFIABLE` and cannot widen $\tau_{\mathrm{cmp}}$.

The corrected clean certificate predeclares these fail-closed invariants:

1. **Exact retained-history parameter binding.** Radius, angular rate, phase, height, and tilt are
   read from each EOM `UniformCircularEndpointCertificate`, not from a parallel geometry copy.
   The scalar proof uses the factory's effective radius
   `tangential_speed / abs(angular_speed)`, because that is the radius used by the retained-
   history analytic state. Exact zero height and exact zero tilt on both paths are mandatory
   preconditions for the planar scalar formula.
2. **Serialized-token arithmetic.** Reception time, emission-cell endpoints, rates, phases,
   tangential speeds, and field speed are serialized to the same decimal tokens consumed
   downstream, reparsed as outward intervals, and only then combined. No ordinary-double
   angle product is treated as an exact proof input.
3. **Root admission.** A terminal bracket is admitted only when its two serialized/reparsed
   endpoint residual intervals have strict opposite signs and the source-normal interval has one
   strict nonzero sign over the whole bracket. The opposite signs give existence by continuity;
   the strict source-normal sign gives monotonicity and therefore uniqueness. An endpoint
   `strict_sign == 0` is uncertainty, not an exact root, and returns `NOT-VERIFIABLE` if refinement
   cannot resolve it within the fixed tolerance/resource bounds.
4. **Root-free complement.** A cell is excluded only when its residual interval excludes zero, or
   when one strict source-normal sign holds over the cell and the two endpoint residual intervals
   have the same strict nonzero sign. Any remaining unresolved cell, fold/caustic sign loss,
   midpoint serialization collapse, depth exhaustion, or cell-budget exhaustion returns
   `NOT-VERIFIABLE`.
5. **Merge rule.** Candidate brackets may merge only when their serialized interval enclosures
   actually overlap or touch and their strict source-normal signs agree. The merged interval must
   then independently re-pass the whole-bracket strict source-normal test and the strict-opposite-
   endpoint residual test; otherwise the run returns `NOT-VERIFIABLE`. A gap smaller than the root
   tolerance is not merge authority.
6. **Segment-boundary coverage.** Every retained-history segment touched by the serialized root
   bracket is listed. A zero-width bracket on a segment join lists both adjacent segment IDs;
   nonzero brackets spanning a join list the complete contiguous index range.
7. **Interface ownership.** The clean analytic interval certificate alone owns causal residual,
   root existence/isolation, and complete-complement claims. EOM checks the externally supplied
   bracket's branch geometry, normal-bound intersection, polarity, and acceleration only. Its
   acceptance is never described as independent root validation.

The native interface-boundary negative control is required before the corrected ladder. It gives
EOM a deliberately non-root bracket whose clean analytic residual excludes zero and must report:

```json
{"status":"PASS","deliberate_bracket_residual_excludes_zero":true,"eom_branch_geometry_accepted":true,"eom_causal_residual_validation":false,"segment_join_lists_both_adjacent":true,"zero_planar_metadata_accepted":true,"nonzero_tilt_rejected":true,"nonzero_height_rejected":true,"root_completeness_owner":"clean_analytic_interval_certificate"}
```

Before any corrected official output, SHA-256 hashes of this predeclaration-bearing evidence file
and the clean native source are recorded in the sibling timestamped hash sidecar. The coordinator
must independently confirm those hashes before authorizing the ladder. Any later change to either
hashed file invalidates the authorization and requires a new predeclaration hash.

### Predeclaration amendment after the first authorized start

**Measured execution status:** `NOT-VERIFIABLE_BEFORE_FIRST_PAIR`. After independent confirmation
of the first corrected-run hashes, the authorized execution entered the $N_T=2000$ rung and
stopped at reception step zero, before evaluating any receiver pair, with:

```text
clean scalar circular certificate requires zero height and zero tilt
```

No cancellation number, pair contribution, or ladder value was produced, and the $N_T=4000$ and
$N_T=8000$ rungs were not started. The earlier three-number diagnostic remains inadmissible for
the proof-boundary reasons above.

**Derived defect diagnosis:** the retained histories did carry zero height and zero tilt, but the
checker tested those exact metadata tokens by first converting `0` into an outward-widened
arithmetic interval. That interval necessarily contains nearby nonzero values, so an exact-zero
metadata predicate rejected the valid planar fixture. This was a certificate implementation
defect, not a measured physical result.

The repair is deliberately narrower than the frozen scientific protocol: height and tilt are now
validated directly from their serialized metadata tokens by requiring a finite numeric parse,
complete token consumption, and parsed value exactly equal to zero. The interval enclosure path
for all proof arithmetic is unchanged. The required native self-check now proves that zero planar
metadata reaches the certificate path, while independently nonzero tilt and nonzero height each
fail closed. The frozen fixture, target, tolerance, ladder, convergence rule, root certificate,
and adjudication rules above remain unchanged.

**Status after repair:** `PREDECLARED_NOT_RUN_AWAITING_NEW_INDEPENDENT_HASH_CONFIRMATION`. The
repaired source and this amended predeclaration require a new hash sidecar and independent
confirmation before another official ladder start. No official rung may run under the superseded
hash authorization.

## V2-authorized corrected §14 execution result — 2026-07-15

**Measured result:** `NOT-VERIFIABLE_ANALYTIC_INTERVAL_EXHAUSTED`. The coordinator independently
confirmed the V2 pre-run SHA-256 values before authorization: evidence
`b1ab4996c82af9e84f6007170be80e71f7c93cdb33cd2e22d86f2b8e5a1da9d9` and native source
`9e58100bbc3ee8c3d5dda8b45de7f2a13a02de78f798d0fa8af929372b3279bf`. The unmodified EOM target
was rebuilt, and the native runner binary timestamp was `2026-07-15 18:19:07 -0400`, 154 seconds
after the hashed source timestamp `2026-07-15 18:16:33 -0400`. Both frozen hashes reverified
after compilation. The required interface-boundary self-check passed all predeclared controls.

The official $N_T=2000$ rung ran in the foreground with a startup heartbeat and heartbeats every
100 completed reception steps. After the step-1900 heartbeat, the run failed within the next
100-step chunk with the exact terminal record:

```json
{"status":"NOT-VERIFIABLE","sample_count_N_T":2000,"failed_step":1901,"pair_count_before_failure":11739,"root_count_before_failure":11872,"missing_input_or_interface":"native complete-root certificate failed: analytic_interval_exhausted"}
```

The clean analytic interval certificate exhausted its fixed refinement resources before it could
certify complete causal-root coverage for the failing pair. Therefore the rung produced no
average root-sum, surviving fraction, cancellation fraction, or target comparison. In accordance
with the frozen stop rule, $N_T=4000$ and $N_T=8000$ were not started. This is an instrument-reach
limit, not evidence for or against the recorded $C=0.97$ value; Tier 1 remains OPEN and Tiers 2–4
remain barred.

**Falsifier:** this disposition is overturned only by a separately authorized certificate path
that completes the same frozen $N_T=2000,4000,8000$ ladder without a certificate/interface
failure and then satisfies the predeclared live-convergence test. No comparison with the target is
licensed before those gates pass.

### Failure-location reporter correction

The raw JSON above is preserved verbatim, but its `failed_step=1901` field is a reporting defect:
the reporter emitted the first 1-based step of the active 100-step chunk rather than the failing
pair's own step. The failure occurred somewhere after the step-1900 heartbeat and within the
step-1901-through-step-2000 chunk. The raw `pair_count_before_failure=11739` label is also
misnamed because the counter was incremented before the status check and therefore includes the
failing pair.

**Derived corrected location:** there are six ordered receiver-source pairs per reception sample,
so the actual 1-based sample is
$\lfloor(11739-1)/6\rfloor+1=1957$. The within-sample slot is
$((11739-1)\bmod 6)+1=3$, which under the runner's receiver-major/source-minor ordering is
receiver 1 from source 0 (`r1 <- s0`). Thus the certificate failure occurred at sample 1957,
pair slot 3, not at sample 1901. This correction changes only failure-location reporting; it does
not alter the measured `NOT-VERIFIABLE_ANALYTIC_INTERVAL_EXHAUSTED` disposition, produce a
cancellation value, or authorize either later rung.

The native reporter now carries the originating step index in each pair's metadata, emits that
pair-derived `failed_step`, names the inclusive counter `pair_count_at_failure`, and emits the
1-based `failed_pair_slot`. Its boundary self-check includes the observed
sample-1957/pair-slot-3 case as a regression control. This reporting-only repair was not used to
rerun the ladder.

## Blind-authorship and closeout record

**Attestation:** independent-grade authorship is intact for the V2 reduction. The fixture
extractor alone read selected constants from
`scripts/braid-ideal/cross-hit-causal-absorption.mjs`; it did not execute the file or copy any
root, force, integration, or acceptance logic. The reduction author and independent auditor did
not open, grep, diff, import, or execute any file under `scripts/braid-ideal/`. The coordinator's
post-run edit was limited to the failure-location reporter and its prose after the hashed V2 run;
it could not change a root, contribution, tolerance, or disposition.

**Reduction-author read set:** `AGENTS.md`;
`reference/op/agent-startup-orientation.generated.md`;
`reference/entourage/archie/prompts/corpus-advancement-pass.md`;
`reference/op/theory-orientation.md`; this evidence file; the Tier-1/R2 ledger section;
`reference/priorities/app-solver/evidence/t1-fixture-data-2026-07-15.json`; owning spec §14 in
`legacy source retired`; the clean files under
`scripts/eom-verification/`; `tests/test_eom_t1_reduction_layer.py`; imported oracle interfaces
`scripts/eom/oracle/certified_acceleration.py`, `certified_history.py`, and
`decimal_interval.py`; and the relevant EOM interval, retained-history, exact-pair, and certified-
acceleration headers/implementations under `src/eom/`.

**Files touched by this rerun:** this evidence file; the claims-triage ledger; the fixture JSON;
the two predeclaration-hash sidecars; `scripts/eom-verification/t1_reduction_layer.py`;
`scripts/eom-verification/t1_section14_native.cpp`; and
`tests/test_eom_t1_reduction_layer.py`. `src/solver`, the EOM/oracle implementations, and
`content/markdown/aaa` were untouched.
