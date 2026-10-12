# Matched-Pair Integration: Independent Review Preparation

Status: ◐ Partial — reviewer preparation for the operator-selected [integration stages](../contracts/matched-pair-enclosure-integration-scope.md). Codex authored this note before reading Claude's Stage 0 design or production implementation. The [execution conversation](../../../op/agent-chats/2026-10-11-eom-matched-pair-integration/chat.md) owns handoff and deadlines. This note is not a stage acceptance receipt.

## Canonical weighting check

**Measured by bounded source reads and `rg` in the named owners:** the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) distinguishes transmitter weighting from receiver playback; `CertifiedAcceleration.cpp` constructs `acceleration_weight = field_speed / abs(transmitter_factor)`, and the independently authored [`reference_kernel.py`](../../../../scripts/eom/oracle/reference_kernel.py) uses the same law. The source evidence establishes the selected canonical formula rather than independent correctness of its implementation.

**Derived:** on a monotone simple-root domain, an individual complete searched-history contribution obeys

$$
\|\mathbf A_{ij}\|\le
\frac{\sup|\kappa|\,\sup|q_iq_j|\,c_f^+}
{(r^-)^2(c_f^- - v_j^+)}.
$$

There is at most one retained root, not necessarily one. With no root the contribution is zero. The proof uses $\|\mathbf n\|=1$, the transmitter denominator floor and the positive receiver-distance floor; receiver velocity does not enter the instantaneous contribution. Coupling needs an absolute upper bound unless the scenario explicitly restricts its sign. A falsifier is a canonical simple-root hit inside the admitted domain whose exact magnitude exceeds the right-hand side. All numerical controls use $c_f=1$.

The older receiver-speed numerator is conservative for a nonnegative speed upper bound and positive $c_f$, provided every other premise is valid. Removing it corrects the law description and improves the bound; it does not change the inspected runtime weighting. Any assertion that this numerator is necessary for canonical acceleration is false under the selected law. Contract reconciliation must also inspect its derived cutoff and definitions of coupling bounds, rather than change only the displayed numerator.

## Uniform receiver-event parameters

Let $P=I_T\times\mathcal R$ be a product of reception times and receiver positions. For every $p=(T,\mathbf X)\in P$, consider the same two source histories on a complete common slab $[S_0,S_1]$, with $S_1\le\inf I_T$. Assume one convex source-position domain, a common distance floor for all $\mathbf X\in\mathcal R$, common speed/separation/relative-speed/acceleration bounds, and strict endpoint membership inequalities holding uniformly over $P$ for both sources.

**Derived:** the [frozen pair theorem](../../app-barnes-hut/analysis/matched-pair-enclosure-theorem.md) applies independently at each fixed $p$, because the kernel proof differentiates source position and velocity with receiver parameters fixed. The same bound $B$ therefore encloses the union of pair accelerations over $P$. No receiver speed or time derivative is introduced by taking this union. The two sources' membership must be uniformly both-present or uniformly both-absent; pointwise membership changing within $P$ is not an admission certificate.

Interval residual evaluation must keep all parameter uncertainty: distance is bounded over $\mathcal R$ and the source endpoint, while $T-S_k$ is bounded over $I_T$. Comparing their squared nonnegative ranges is sufficient only when these squared ranges have strict separation. Both receivers and sources remain in a common positive-distance domain. The original fixed-time restriction can thus be relaxed after validating the parameter-box construction; replacing the receiver by a midpoint cannot establish the extension. Falsifier: some event in the admitted parameter box has different membership or a pair acceleration outside the emitted common enclosure.

This is a union of snapshot results. It does not bound acceleration derivatives, certify an evolved solution tube, or prove that arbitrary independent position/time boxes describe an attainable trajectory. Those are separate evolution obligations.

## Possible uncertainty extension without a true-acceleration carrier

This section supplies a mathematical route for later Stage 2 consideration, not a release of that stage. Suppose admissible true histories $\mathbf X_\pm$ are continuously differentiable, with $\dot{\mathbf X}_\pm=\mathbf V_\pm$, and satisfy whole-window bounds around nominal cubics $\bar{\mathbf X}_\pm$:

$$
\|\mathbf X_\pm(S)-\bar{\mathbf X}_\pm(S)\|\le E_\pm,
\qquad
\|\mathbf V_\pm(S)-\dot{\bar{\mathbf X}}_\pm(S)\|\le U_\pm.
$$

Let $\bar\ell$ bound nominal equal-time separation, $\bar w$ nominal relative speed, and $\bar a$ each nominal cubic's second derivative. Define $\ell=\bar\ell+E_++E_-$ and choose $v<1$ bounding each nominal speed plus its $U$ radius. Use $\nu=1-v$, a convex domain enclosing the error-expanded source histories, and uniform true-history membership bounds. Then the original monotonicity and reverse-triangle argument gives $|S_+-S_-|\le\ell/\nu$ and $\|\mathbf X_+(S_+)-\mathbf X_-(S_-)\|\le\ell/\nu$.

For velocity, split the two true velocities through their nominal values rather than differentiate their error:

$$
\begin{aligned}
\|\mathbf V_+(S_+)-\mathbf V_-(S_-)\|
&\le U_++U_-+
\|\dot{\bar{\mathbf X}}_+(S_+)-\dot{\bar{\mathbf X}}_-(S_-)\|\\
&\le U_++U_-+\bar w+\bar a\,\ell/\nu.
\end{aligned}
$$

**Derived under these compatibility assumptions:** the same source-kernel Lipschitz constants yield

$$
B_{\mathrm{err}}=C\left[
\frac{(2\nu+v)\ell}{(r^-)^3\nu^3}
+\frac{\bar w+U_++U_-+\bar a\ell/\nu}{(r^-)^2\nu^2}
\right].
$$

The symbol $\bar a$ bounds only the nominal cubic, not true acceleration. This proof does not infer a derivative of position/velocity error radii or assume a true second derivative exists. Its falsifier is a derivative-compatible pair inside all declared tubes and membership constraints whose exact acceleration lies outside the emitted enclosure.

**Unresolved repository admission:** prove that the actual history carrier's uncertainty semantics supply simultaneous whole-window position/velocity bounds for derivative-compatible true paths, or restrict the route to carriers that do. Existing coordinate radii alone do not certify an arbitrary physical curve or its origin. If a carrier describes only a nominal curve, treat the result at that grade. Independently validate the nominal derivative controls, the expanded convex domain and all endpoint signs. Piecewise joins require complete window ownership; this argument does not make a selected slab cover missing history.

## Independent algebraic controls to freeze

✓ Done — Authored a reviewer-owned [exact-rational affine reference](../evidence/matched-pair-review-affine-reference.mjs) independent of the production certifier, with frozen [four-fixture controls](../evidence/matched-pair-review-affine-controls-2026-10-11.json). For axis-aligned affine sources with receiver at the origin and reception $T=0$, write $z(S)=p+uS>0$ over the whole window and $|u|<1$. The causal equation gives $S=-p/(1+u)$, $r=p/(1+u)$ and $D=1+u$. Hence the signed source contribution along the positive axis is $-\kappa q_rq_s(1+u)/p^2$. Root membership is an exact comparison with the declared finite window; self/coincident records require their canonical convention separately.

First record the known static source at distance two returning $-1/4$ along that axis for $\kappa=q_r=q_s=1$, then freeze exact full-population static/affine controls and boundary cases before running a new instrument on production output. The minus direction is because the source is above the receiver. The earlier BHL checker uses a different source/receiver orientation; signs must be evaluated from geometry, not copied from its printed known value.

**Measured before production target use:** `node reference/priorities/app-solver/evidence/matched-pair-review-affine-reference.mjs reference/priorities/app-solver/evidence/matched-pair-review-affine-controls-2026-10-11.json` first recorded the exact static root/kernel $(-2,-1/4)$, moving root/kernel $(-4/3,-3/8)$, reversed geometry/polarity and decimal arithmetic controls, then evaluated four three-path populations with 36 logical rows. Exact unsquared residual and root-ray identities are asserted for every nonself row. The fixtures cover complete static and affine windows, mixed membership and a lower-boundary root. `shasum -a 256` recorded reference identity `4c0f6aae006d233f21f7de879843f0ca236dac6a6453ba879882abf5ecb0afd6` and control identity `cdcea43040a01f2711502f294f29415fcdf73ac038025b72f3e831636d8ed5a2`. These files are frozen before production comparison; a separate output adapter may consume them without modifying this reference. Closed-window boundary values are reference data; the grouped route must reject their boundary membership, and any exact-root consumer must identify its endpoint ownership convention.

✓ Done — The [Stage 0 independent review](matched-pair-review-stage-0-2026-10-11.md) accepts core mathematics and retained baseline preparation, returns R0-2–R0-4 refinements and releases Stage 1 new-file/scratch preparation. Shared-file integration remains dependent on Claude's receiving-host authorization and findings disposition. ○ Not done — Run independent comparison against Stage 1 production output only after the reference's known-case receipt and freeze exist. Deterministic baseline replay is compatibility evidence and remains distinct from these analytic controls.

## Snapshot output comparison preparation

✓ Done — The separately authored [snapshot output adapter](../evidence/matched-pair-review-snapshot-comparison.mjs) consumes the frozen affine answers without importing production code or changing their oracle. It compares exact rational totals against exact binary64 endpoint values, checks the full logical matrix, unique source slots and group leader/follower roles, rejects grouped mixed/boundary membership and leaves incomplete acceleration outputs explicitly unaccepted. Input translation and implementation qualification remain separate review obligations.

**Measured known-case receipt before any target use:** `node reference/priorities/app-solver/evidence/matched-pair-review-snapshot-comparison.mjs --known-only` passes exact binary64 controls for $1/2$, $-1/4$, the smallest subnormal and the rounded decimal $1/10$, a static $-1/4$ inclusion, and rejection of an escaped value, missing total and duplicated logical slot. Its known stub uses the actual frozen reference's vector-valued total schema. After that check, `shasum -a 256` records adapter identity `6747631ddf282bceecfe04acb077095d8b94fdb3fee5229b2085ccf7eb877eff`. That preparation run reads no snapshot target. The adapter's falsifier is a known exact value outside the printed interval that it accepts, or a missing/duplicated logical slot it fails to reject.

**Measured subsequent preliminary target comparison:** copied the observed scratch JSONL once to `.local-data/eom-matched-pair/2026-10-11/reviewer-targets/snapshot-observed-2026-10-11T2033.jsonl`, with 143483 bytes and SHA-256 `5af87c38364162ff2aa8360ceed3893e0a3bf22679af94705edf4d681be9c8fc`. Running the frozen comparison adapter with the unchanged affine JSON, that retained target and the exclusive-create receipt `snapshot-preliminary-comparison-2026-10-11T2033.json` passes its known cases before target reading, then checks sixteen cases. All twelve complete cases contain all three exact receiver vectors, thirty-six totals in all, under enabled/disabled grouping and both traversal selections. The four lower-boundary cases are explicitly incomplete and not accepted for containment. Logical identities and grouping roles are checked on all sixteen records. The read input-case file translates the four affine fixtures into local coefficients correctly: for example the two moving sources use $c_0=100+0.01(-200)=98$ and $c_0=100.1+0.03(-200)=94.1$ with unchanged slopes. This is a bounded manual check of that printed adapter input, not a general proof of its translator.

The preliminary result applies only to the retained output bytes. Claude's frozen source/build/evidence packet is still awaited; prefix-history binding, consumer negatives, complete input correspondence and production integration are not accepted by this comparison. The original oracle and answer JSON were not changed. A source change or different target hash requires reviewing its affected evidence rather than carrying this receipt forward automatically.
