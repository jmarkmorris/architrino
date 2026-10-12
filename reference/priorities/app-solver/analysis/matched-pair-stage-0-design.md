# Matched-Pair Enclosure, Stage 0: Law Binding, Restricted Domain and Stage 1 Design

This record is the Stage 0 deliverable of the [matched-pair integration scope](../contracts/matched-pair-enclosure-integration-scope.md). It states what the EOM solver computes today for one far source, fixes the exact domain on which a two-source grouped enclosure will be admitted, proves the one extension the [matched-pair theorem](../../app-barnes-hut/analysis/matched-pair-enclosure-theorem.md) needs before it can be applied to a solver receiver, and specifies the Stage 1 admission, accounting and fallback design. It reports measurements of the current source and a frozen baseline; it implements nothing. All numerical instances use $c_f=1$.

Two terms recur. A **causal root** is an emission time at which a source's distance to the receiver equals the wake travel time to the reception event. A **slab** is one closed emission-time interval on which a source history is a single cubic polynomial.

## 1. What the solver computes for one far source

**Claim grade: measured**, by reading `certify_far_field_enclosure` and `detail::certify_canonical_acceleration_snapshot` in `src/eom/src/CoupledEvolution.cpp`, the sharp row in `src/eom/src/CertifiedAcceleration.cpp` lines 485–510, and [Master EOM Binding v1](../contracts/master-eom-binding-v1.md) lines 84 and 166–178, in the source inventory identified in section 8. A falsifier is a different expression in those symbols at that inventory.

The binding gives each causal root the dimensionless acceleration weight $c_f/|D_t|$, where $D_t=c_f-\hat{\mathbf r}\cdot\mathbf V_t$ is the transmitter-side factor. The receiver-side factor $D_r$ enters only the root-playback ratio $D_r/D_t$; the binding states that acceleration is independent of receiver velocity at fixed geometry. The sharp row implements exactly that: `acceleration_weight = field_speed / |transmitter_factor|`.

The individual far-field classifier evaluates, with outward interval arithmetic over the whole emission window $[S_{\mathrm{start}},T_r]$,

$$
B_{ij}=\frac{\kappa^+\,|q_iq_j|^+\,c_f^+}{(r^-_{ij})^2\,(c_f^--v_j^+)},
$$

where $r^-_{ij}$ is the lower bound of the distance between the receiver position hull at reception and the source position hull over the window, and $v_j^+$ is the upper bound of the source speed hull. It emits $[-B_{ij},B_{ij}]^3$ and admits the pair when the component width does not exceed the lower endpoint of the slice $f_{\mathrm{FF}}\tau_A/N$. The bound contains no receiver-speed factor.

The [far-field contract](../contracts/far-field-contribution-enclosure.md) instead displays the numerator $c_f^++v_i^+$, with $v_i^+$ the receiver speed bound, and says that numerator is retained because dropping it would not enclose the frozen law. That sentence does not describe the binding or the classifier. The contract's formula is larger than the implemented one and therefore still a valid enclosure, but its stated necessity is unsupported, and its derived cutoff differs from the implemented cutoff whenever the receiver moves. For the zero-speed worked value in the contract, $\sqrt{2.4}$, the two formulas agree.

### Binder inventory for the contract

**Claim grade: measured.** Each row names its command and scope; a falsifier is a consumer the stated search would have found and did not.

| Possible binder | Finding | Instrument and scope |
| --- | --- | --- |
| Content digest pins | None | `grep -rIl` for the 16-character prefixes of the file's SHA-256, SHA-1, MD5 and Git blob id, repository-wide excluding `node_modules` and `.git` |
| Generated index | `content/generated/reference/reference-surface.v1.json` records the path, title, word count 1205 and byte count 9254 in two entries | `grep -c` and a context read of that file; an edit makes this generated target stale, to be regenerated only by the publication procedure |
| Path-only records | A source inventory text file, the 2026-10-03 equation-ownership migration JSON, and the style-conversion ledger list the path with no byte binding | `grep -rIl far-field-contribution-enclosure` over the repository excluding `node_modules`, `.git`, `.local-data`, `.tmp` |
| Evidence | `evidence/far-field-contribution-enclosure-apple-m3-2026-07-16.md` is byte-preserved historical evidence; it reports counts and widths and does not restate the numerator | `grep -n` for the receiver symbols in that file |
| Code and tests | No file under `scripts`, `tests`, `src`, `apps` or `.githooks` references the contract path; the `FFE-*` codes appear only in `CoupledEvolution.cpp`, the contract and the solver work log | `grep -rIl` over those directories |
| Build identity | `src/eom/cmake/EquationSourceIdentity.cmake` digests the binding and the Surface definition, not this contract | read of that file |

The reconciliation is therefore a prose correction with one expected generated-index drift and no semantic, byte or test binder. The proposed edit replaces the numerator by $c_f^+$ in the bound and the cutoff, replaces the necessity sentence by a statement that the canonical weight is receiver-independent, and keeps $v_i^+$ in the `FFE-NORMAL-01` row as a diagnostic value. **It has not been applied**: the task host refused the write to that shared file, as section 9 records. The unapplied patch and its unified diff are retained at `.local-data/eom-matched-pair/2026-10-11/far-field-contract-proposed-reconciliation.py` and `.diff`.

## 2. A finding about exact tokens

**Claim grade: measured**, by reading `Interval::decimal_token` in `src/eom/src/Interval.cpp` lines 56–62. The function returns `Interval(downward(value), upward(value))` for every token, including decimals that binary64 represents exactly. Every time, charge, coupling and field-speed token therefore becomes an interval one unit in the last place wide on each side; `Interval::decimal_token("0")` is not the point zero.

Two consequences shape the design. First, the scope's condition that the reception time be "an exact interval point" cannot be tested on the interval, because no token produces a point. The honest statement is about the token: the snapshot interface carries one decimal string for the reception time, and that string denotes one exact real number $T_r$. The interval is a rounding enclosure of a known number, not a physical time uncertainty. Every quantity below is computed outward from the enclosure and therefore encloses the exact quantity at $T_r$; no uniform-time extension is involved, and none is claimed. Second, equal and opposite source polarities cannot be established from intervals, since two overlapping intervals do not prove equality. Stage 1 compares the charge tokens as exact decimals by normalizing sign, digit string and exponent, and requires the two normalized magnitudes to be identical and the signs opposite.

## 3. Restricted domain for Stage 1

A candidate group is attempted only when every condition holds. Failure of any condition declines the grouped route for that pair and leaves both sources on their existing individual-enclosure and exact-root routes.

1. **Model.** Canonical sharp interaction: `chart_policy` is `sharp`, no Surface geometry or carrier is present, the equation selection is absent or canonical, and the field-speed token is exactly the decimal one.
2. **Receiver event.** One decimal reception token $T_r$. The receiver position is the box $\mathcal R=\texttt{position\_hull}(T_r)$ of the receiver's retained history, which includes that history's reconstruction error radii and the rounding enclosure of $T_r$. Section 4 proves the box extension.
3. **Sources.** Two distinct source paths, both distinct from the receiver, with exactly opposite charge tokens of equal magnitude. Each source belongs to at most one group for this receiver event.
4. **Search window.** The declared root-search window is $[S_0,T_r]$, where $S_0$ is the certified causal-prefix lower bound when the snapshot's prefix exclusion is `certified_complete` and the common history start otherwise. Both far-field scheduling paths already require a common history start. For each source, one cubic segment must contain the whole window: its start is at or before $S_0$ and its end at or after $T_r$, decided by exact token comparison when the tokens denote the same decimal and by strict interval order otherwise. A history whose window crosses a segment join is declined in Stage 1.
5. **Exact cubic histories.** Every position-error and velocity-error token of the covering segment is an exact decimal zero, and the history carries no uniform-circular analytic certificate. The supplied cubic is then the source history itself, so its second derivative is the source acceleration. Coefficient tokens may be any finite decimals; they are enclosed outward.
6. **Whole-slab bounds.** The bounds of section 5 give $r^->0$, $v^+<1$ and finite $\ell^+$, $w^+$, $a^+$.
7. **Membership.** Both members strictly present, or both strictly absent, by section 6.
8. **Budget.** The outward component width of the emitted interval does not exceed the sum of the two members' slice lower endpoints, by section 7.

The speed condition restricts this optimization only. It caps nothing: a pair that fails it continues on the unrestricted exact route.

## 4. The receiver-box extension

**Statement.** Let $\mathcal R\subset\mathbb R^3$ be a box containing the true receiver position $\mathbf X_r$ at the exact reception time $T_r$. Let $\Omega$ be a convex set containing both source histories on the slab $I=[S_0,T_r]$, and suppose $\|\mathbf y-\mathbf x\|\ge r^->0$ for all $\mathbf y\in\mathcal R$ and $\mathbf x\in\Omega$. Suppose the speed, separation, relative-speed and acceleration bounds $v^+<1$, $\ell^+$, $w^+$, $a^+$ of the theorem hold on $I$. Suppose finally that for each member the lower-endpoint residual has one strict sign for every receiver point of the box:

$$
\sup_{\mathbf y\in\mathcal R}\|\mathbf y-\mathbf X_\pm(S_0)\|<T_r-S_0
\quad\text{(present)},\qquad\text{or}\qquad
\inf_{\mathbf y\in\mathcal R}\|\mathbf y-\mathbf X_\pm(S_0)\|>T_r-S_0
\quad\text{(absent)}.
$$

If both members are present, the true pair acceleration has every component in $[-B,B]$ with the theorem's radius $B$ evaluated at these common bounds. If both are absent, the pair contributes exactly zero on the window.

**Proof.** The true receiver position is one point $\mathbf y^\ast\in\mathcal R$. Apply the theorem at the fixed receiver event $(T_r,\mathbf y^\ast)$. Its geometric hypothesis holds because $\Omega$ is at distance at least $r^-$ from every point of $\mathcal R$, in particular from $\mathbf y^\ast$. Its source bounds do not involve the receiver. Its membership hypothesis at the lower endpoint holds for $\mathbf y^\ast$ because the strict sign holds for every point of the box. At the upper endpoint $S_1=T_r$ the residual is $g_\pm(T_r)=\|\mathbf y^\ast-\mathbf X_\pm(T_r)\|-0\ge r^->0$, since $\mathbf X_\pm(T_r)\in\Omega$; so the upper sign is strictly positive without a separate test. With $g_\pm(S_0)<0<g_\pm(T_r)$ and $g_\pm'\ge\nu=1-v^+>0$, each present member has exactly one root, strictly interior to the slab. With $g_\pm(S_0)>0$ and $g_\pm$ increasing, an absent member has no root in the slab. The theorem's conclusion for $\mathbf y^\ast$ uses only $r^-$, $v^+$, $\ell^+$, $w^+$, $a^+$ and $C$, none of which depends on which point of the box is the true one. Hence the stated enclosure. ∎

The argument is a quantifier exchange and adds no new analysis: the theorem holds pointwise in the receiver, and the constants are chosen uniformly. What it does not cover is a receiver whose reception time is itself an interval of physical width; that case is outside Stage 1 and is not needed, by section 2.

**Claim grade: derived.** Falsifier: a receiver point in the box, with histories meeting every stated bound and a uniform strict sign, whose exact two-root acceleration has a component outside $[-B,B]$.

A mixed outcome, or any member whose residual interval at $S_0$ contains zero, is ambiguous and returns both members to their existing routes. A root exactly at $S_0$ is the solver's retained-history boundary case; it is never grouped, so the existing boundary handling is unchanged.

## 5. Outward whole-slab bounds as they will be computed

Let a source's covering segment start at $t_0$ with coefficient rows $\mathbf c_0,\dots,\mathbf c_3$ in the segment's local time $S-t_0$, each enclosed by `Interval::decimal_token`. Put $d=S_0-t_0$ and $h=T_r-S_0$ as intervals. Re-expand about the slab start, in the slab's own local time $\tau=S-S_0\in[0,h]$:

$$
\mathbf a_0=\mathbf c_0+\mathbf c_1d+\mathbf c_2d^2+\mathbf c_3d^3,\quad
\mathbf a_1=\mathbf c_1+2\mathbf c_2d+3\mathbf c_3d^2,\quad
\mathbf a_2=\mathbf c_2+3\mathbf c_3d,\quad
\mathbf a_3=\mathbf c_3.
$$

The cubic Bernstein control vectors of position, and the control vectors of velocity and acceleration, are then

$$
\begin{aligned}
\mathbf b_0&=\mathbf a_0,&\mathbf b_1&=\mathbf a_0+\tfrac13\mathbf a_1h,&\mathbf b_2&=\mathbf a_0+\tfrac23\mathbf a_1h+\tfrac13\mathbf a_2h^2,&\mathbf b_3&=\mathbf a_0+\mathbf a_1h+\mathbf a_2h^2+\mathbf a_3h^3,\\
\boldsymbol\beta_0&=\mathbf a_1,&\boldsymbol\beta_1&=\mathbf a_1+\mathbf a_2h,&\boldsymbol\beta_2&=\mathbf a_1+2\mathbf a_2h+3\mathbf a_3h^2,\\
\mathbf e_0&=2\mathbf a_2,&\mathbf e_1&=2\mathbf a_2+6\mathbf a_3h.
\end{aligned}
$$

These are the theorem's $\mathbf b_j$, $\mathbf d_j$ and $\mathbf e_j$ written directly in the shifted coefficients, which avoids differencing interval control points. Evaluated with outward interval arithmetic, each computed box contains the exact control vector, because the exact $d$, $h$ and coefficients lie in their enclosures. The exact curve is a convex combination of its exact control vectors, so the position, velocity and acceleration of the source over the slab lie in the convex hulls of the computed boxes.

The bounds are $v^+=\max\|\boldsymbol\beta_{\pm,j}\|^+$, $a^+=\max\|\mathbf e_{\pm,j}\|^+$, $\ell^+=\max_j\|\mathbf b_{+,j}-\mathbf b_{-,j}\|^+$ and $w^+=\max_j\|\boldsymbol\beta_{+,j}-\boldsymbol\beta_{-,j}\|^+$, where a superscript plus is the upper endpoint of the interval norm; the relative bounds pair equal indices because both members share the slab parameter. The convex position domain $\Omega$ is the axis-aligned box hull of the eight position control boxes, and $r^-$ is the lower endpoint of the interval norm of $\mathcal R-\Omega$, which is the distance between the two boxes rounded down. Any of $r^-\le0$, $v^+\ge1$ or a nonfinite bound declines the route.

**Claim grade: derived**, from the Bernstein convex-hull property proved in the theorem and the inclusion property of outward interval arithmetic. Falsifier: a point of an admitted source history outside $\Omega$, or a true speed, separation, relative speed or acceleration above its computed bound.

## 6. Membership as it will be computed

For each member, $G_0=\|\mathcal R-\mathbf b_0\|-(T_r-S_0)$ as an interval. The member is present when $G_0^+<0$, absent when $G_0^->0$, and ambiguous otherwise. No upper-endpoint test is run, by the proof in section 4. No root is located, bracketed or counted.

Both-absent means zero contribution on the declared window. That matches the exact route, whose certified quantity is the contribution of the retained window and which makes no claim about emission times before it.

## 7. Radius, emitted interval and budget

With $\nu=1-v^+$ evaluated downward and $C=|\kappa q_r|^+\epsilon^+$,

$$
B=C\left[\frac{(2\nu+v^+)\ell^+}{(r^-)^3\nu^3}+\frac{w^++a^+\ell^+/\nu}{(r^-)^2\nu^2}\right]
$$

is evaluated in interval arithmetic and its upper endpoint $B^+$ is taken. The emitted acceleration is $[-B^+,B^+]^3$ and its component width is the solver's outward `width()`. Each source owns the slice $b=f_{\mathrm{FF}}\tau_A/N$ with $N$ the full source-path count of the snapshot; the group is admitted when the emitted width does not exceed the downward-rounded sum of the two slice lower endpoints. A both-absent group emits exact zero and consumes no width.

## 8. Stage 1 design

### Policy and scope of use

A request field `matched_pair_enclosure_policy` takes the value `disabled` by default and `canonical_snapshot_single_slab/v1` when selected. Grouping runs only inside the two existing far-field scheduling paths, so it also requires a positive far-field fraction and the existing enclosure switch; it spends the same far-field budget and never a second one. The evolution entry points reject a non-disabled policy in Stage 1, so the capability is snapshot-only and says so. The Borg request is unchanged.

### Focused module

The certificate type, the exact-decimal charge comparison, the Bernstein bounds, the membership test and the radius live in a new module, `MatchedPairEnclosure.hpp` and `.cpp`, as one pure function from two source histories, a receiver box and the run tokens to a `NativeMatchedPairEnclosureCertificate`. It reads no evolution state and mutates nothing. `CoupledEvolution.cpp` gains a planning helper and narrow call sites; `CertifiedAcceleration.cpp` gains one consumer branch.

### Deterministic pairing

For one receiver, candidates are the sources presented by the scheduling path, in canonical path order, excluding the receiver itself. Walking that order, the first ungrouped source is offered as leader to the first later ungrouped source whose charge token is its exact opposite. Each such candidate pair is certified once. There is no geometric search and no second attempt with a different partner in Stage 1. Because the order is the path order and certification is a pure function, membership cannot depend on worker scheduling.

In the direct far-field path every non-self source is a candidate. In the traversal path only sources of the receiver's exact tiles are candidates, so a source already consumed by a certified excluded block is never grouped. Both paths call the same helper and consult the same per-receiver ownership table before classifying a source individually.

### Atomic fallback

Certification returns a value; nothing is recorded until it reports `certified_enclosed` or `certified_absent`. A declined pair leaves no width debit, no marker and no consumed member, and both sources proceed to the individual enclosure test and then the exact-root batch exactly as today.

### Logical identities and one numerical interval

Each member keeps its own row in the ordered-pair matrix, with a root marker of schema `eom_native_matched_pair_member_marker/v1` that names the group and records that the root search was bypassed; it carries no roots and does not claim a root-free complement. The grouped certificate is stored once per group in the snapshot. In the acceleration reconstruction the leader's row carries the grouped interval and the follower's row carries the additive identity, labelled as a reduction identity that refers to the group. The follower row is not a statement that the second source's physical acceleration is zero. The receiver total is the existing fixed pairwise sum over the unchanged slot order, so the reduction tree and its disabled-route behavior are untouched.

The snapshot ledger counts both members of a present group as enclosed relationships and both members of an absent group as certified exclusions, adds the group width once to the receiver's enclosed width, and reports group counts in new fields so a reader can reconstruct the split. The existing receiver-total test against $f_{\mathrm{FF}}\tau_A$ applies unchanged.

### Certificate contents

Receiver identity and history fingerprint; both source identities, charge tokens and history fingerprints, leader first; policy identity; reception token, window lower token, any referenced prefix-exclusion status, both covering segment indices; the control-box hull $\Omega$, $\mathcal R$, $r^-$, $v^+$, $\nu$, $\ell^+$, $w^+$, $a^+$; each member's residual interval and disposition; $C$, the radius, the emitted interval, its width, the two slices and the admission threshold; status and failure code. A consumer rechecks identities, fingerprints, reception coverage and width before use.

### Controls identified for independent reference

Each instance uses decimal tokens that are exact rationals, so a separately authored exact evaluator can compute the two-root acceleration and test containment in the emitted interval. The frozen BHL-001 checker supplies the formulas; it is not edited.

| Control | Receiver and reception | Source histories on one segment | Expected disposition |
| --- | --- | --- | --- |
| Known kernel | origin, $T_r=0$ | one static source at distance 2 | exact route value $(0,0,\mp1/4)$ per sign; recorded before any target |
| Static neutral pair | origin, $T_r=0$ | static at $z=10.005$ and $9.995$, segment $[-20,0]$ | both present; exact magnitude $2R\ell/(R^2-\ell^2/4)^2$ with $R=10$, $\ell=0.01$ inside the interval |
| Affine moving pair | $(0,0,0.96)$, $T_r=1$ | $(\pm0.28,0,\pm0.1S)$ on $[-0.5,1]$, roots exactly at $S=0$ | both present; velocity-dipole term of order one over distance squared inside the interval |
| Quadratic pair | origin, $T_r=0$ | $z=10+0.016S^2$ and $z=9.225+0.016S^2$ on $[-15,0]$, roots $-12.5$ and $-11.25$ | both present with nonzero $a^+$ |
| Both absent | origin, $T_r=0$ | the static pair on $[-5,0]$ | zero contribution, both members excluded, zero width |
| One missing | origin, $T_r=0$ | the static pair on $[-10,0]$ | declined; exact route returns the nearer member's single contribution |
| Endpoint root | origin, $T_r=0$ | the static pair on $[-10.005,0]$ | ambiguous, declined |
| Declined by eligibility | as static pair | same polarity; unequal magnitudes; nonzero error token; two-segment history; uniform-circular factory history; speed bound at or above one; receiver inside $\Omega$ | each declined with its own failure code and unchanged exact accounting |
| Budget edge | as static pair | tolerance chosen so the width is just inside, then just outside, two slices | admitted, then declined |
| Scheduling | six-path population | both traversal modes, one and four workers, repeated | identical membership and identical bytes |

Agreement of a rebuilt binary with the frozen baseline below shows that the disabled route is unchanged. It is not evidence that any enclosure is correct.

## 9. Frozen baseline, source identity and the host limit

**Claim grade: measured**, by the commands named.

| Item | Identity |
| --- | --- |
| Starting commit and branch | `3fa846aa90d9e423c458f8d8c7758eb2f7f6d746` on `codex/opportunity`, by `git rev-parse HEAD` and `git branch --show-current` |
| Source inventory | 79 solver source and build files hashed at 2026-10-11T20:08:24Z; list at `.local-data/eom-matched-pair/2026-10-11/stage0-source-inventory.sha256`, whose own SHA-256 is `fcfab61b1b234caa045b7b26a5a9e223d8d7e35b6e60093fe98d9273b72b472a` |
| Read-only source snapshot | `.local-data/eom-matched-pair/2026-10-11/baseline-source/`, verified identical to the live inventory by `diff` of the two hash lists, then made read-only |
| Concurrent state at start | 13 tracked solver files already modified and 5 untracked solver files present, by `git status --short`; list at `stage0-start-git-status.txt`. These belong to other work and are part of the baseline as found |
| Baseline build | from the snapshot, Release, two workers, SDK pinned to `MacOSX26.5.sdk` as in the existing accepted build directory; log `baseline-build.log`; binary SHA-256 list `baseline-binary-identities.sha256` |
| Baseline outputs | `eom_native_fixture_cli all`, `eom_native_acceleration_fixture_cli all`, `eom_native_evolution_fixture_cli far-field-dispersal` and `all`, each exit 0 with empty standard error; outputs under `baseline-outputs/`, SHA-256 list `baseline-output-identities.sha256`, run times in `RUNS.txt` |
| Determinism of the comparison | A second run of the native `all` and evolution `all` commands was byte-identical to the first, so those two outputs can be compared byte for byte; the dispersal output carries wall-clock fields and is compared on its non-timing fields only |

The default macOS SDK on this host is `MacOSX27.0.sdk`, whose library stubs the installed linker rejects; configuring with the 26.5 SDK, as the existing accepted build does, compiles and links. That is a per-build setting and no system setting was changed.

**Host limit.** The task host's automatic permission check refused the write to `contracts/far-field-contribution-enclosure.md` with the reason "Modify Shared Resources". The same check can be expected to refuse edits to existing shared solver files. That refusal is a host permission decision and is not overridden by this assignment or by a peer's message. Until the operator confirms the scope directly in the implementing session, the work proceeds only in new files: this record, the unapplied contract patch, and Stage 1 preparation built in scratch storage against the frozen baseline library. No existing production file, shared contract or tracker has been changed.

## 10. What Stage 0 establishes and what it leaves open

Established: the implemented individual bound and its disagreement with the contract's displayed numerator; the absence of byte, semantic or test binders on that contract beyond one generated index; the token-enclosure behavior that fixes how the reception event and charge equality must be tested; the receiver-box extension; the explicit outward construction of all five bounds; the membership rule with its automatic upper sign; and a frozen, reproducible disabled-route baseline.

Open: the contract edit itself, blocked by the host; independent review of sections 2 through 7; every Stage 1 implementation and control; and everything in Stages 2 and 3. Nothing here is a runtime capability, a cost result or a physical claim.
