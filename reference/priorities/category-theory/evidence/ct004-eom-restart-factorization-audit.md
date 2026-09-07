# CT-004 Application — EOM Restart Factorization Audit

## Status and Decision

- **Status:** Completed as a measured implementation audit on 2026-08-26.
- **Category Theory consumer:** CT-004 lawful-history-extension and factorization contract.
- **Cross-lane owner:** App Solver `EOM-003`, persistent long-run checkpoint and campaign driver.
- **Decision:** The CT-004 factorization test has practical audit value. Applied to the live EOM checkpoint boundary, it detected a continuation-critical adaptive-controller field that the current restart record does not preserve. The result does not make category theory part of the substrate law; it shows that the categorical contract can expose an incomplete cross-lane state projection.

The audit changes no EOM solver code and advances no reader-facing physics claim. The implementation repair and its regression belong to `EOM-003`.

Plainly: an uninterrupted run remembers whether the previous accepted step was the first of two easy steps needed before growing the step size. A restarted run forgets that fact. It can therefore divide the same remaining time differently even though the saved path history at the restart cut is exact.

## 1. Boundary Under Test

Let $\mathscr F_T$ denote the complete implementation state at an accepted cut $T$: retained path histories, joint histories, immutable request controls, accepted and rejected counts, and every controller variable consumed by the next evolution decision. Let

$$
Q_{\mathrm{restart}}:\mathscr F_T\longrightarrow\mathscr R_T
$$

be the implemented restart projection. The actual reduced restart object is not the checkpoint file alone. It is the pair

$$
\mathscr R_T
=
(\text{checkpoint v6},\ \text{compatible request template}),
$$

because `resume_native_coupled_histories` reconstructs the next request from both inputs. Let $E_{T\to U}$ be uninterrupted evolution from $T$ to $U$, and let $\overline E_{T\to U}$ be checkpoint resume. The declared restart-parity obligation requires the continuation to factor through $\mathscr R_T$:

$$
Q_U\circ E_{T\to U}
=
\overline E_{T\to U}\circ Q_{\mathrm{restart}},
$$

where $Q_U$ retains the complete accepted record required by the EOM evolution contract, including discrete decisions and retained-history provenance.

Plainly: if the restart bundle is a sufficient state, saving and resuming at an accepted cut must not change what the solver decides next.

## 2. Coverage Audit

The live checkpoint carries the accepted time, current controller step size, certificate-cost cooldown, joint-history mode, model fingerprint, accepted and rejected counts, retained path histories, and joint histories. The compatible request template supplies the immutable evolution controls checked by the model fingerprint.

The adaptive controller also consumes

```cpp
std::size_t consecutive_growth_headroom_steps = 0U;
```

and doubles the step size after two consecutive accepted steps have sufficient growth headroom. That counter is not a field of `NativeCoupledEvolutionCertificate`, is not a field of `NativeEvolutionCheckpoint`, and is not restored by `resume_native_coupled_histories`. Every resumed invocation therefore reconstructs it as zero.

| Continuation field | Preserved across restart? | Evidence |
| --- | --- | --- |
| Accepted retained histories and joint histories | Yes | Checkpoint path and joint-history records. |
| Accepted time and controller step size | Yes | Checkpoint fields copied into the resumed request. |
| Certificate-cost cooldown | Yes | Certificate and checkpoint field restored into the resumed request. |
| Joint fallback mode | Yes | Checkpoint mode restored before resumed evolution. |
| Immutable request controls | Indirectly | Compatible request template plus model-fingerprint check. |
| Consecutive growth-headroom count | **No** | Local controller variable is initialized to zero on every invocation and has no certificate or checkpoint field. |

This is a structural sufficiency result about the implemented restart record. It is not a claim that this list is a physically minimal $\mathbb{A}\mathbb{A}\mathbb{A}$ history state.

## 3. Controls and Measured Result

### Positive control

The existing checkpoint round-trip test passed:

```text
tests/test_eom_native_coupled_evolution.py
-k checkpoint_roundtrip_is_atomic_tamper_evident_and_continuous

Ran 1 test ... OK
```

That fixture checks an exact checkpoint cut and continuous resume in a non-growing controller case. It establishes useful checkpoint plumbing but does not exercise the two-step growth-memory boundary.

### Separating control

A one-path constant retained-history request was run through a focused public-API probe compiled against the freshly rebuilt `.tmp/eom-native-dev/libeom_native.a`, with normalized $c_f=1$, initial and minimum step `0.01`, maximum step `0.04`, and accepted-step growth enabled. The uninterrupted request covered absolute time `2` through `2.08`. A second request stopped exactly at the first accepted cut, `2.01`; its exact checkpoint was then resumed through `2.08` with the same compatible request template.

The accepted partitions were:

```text
uninterrupted: 0.01, 0.01, 0.02, 0.02, 0.02
restart route: 0.01 | 0.01, 0.01, 0.02, 0.02, 0.01
```

The checkpoint cut records had equal fingerprints. The complete final retained-history fingerprints differed:

```text
equal_cut_fingerprint=true
equal_final_fingerprint=false

uninterrupted: segments=11, fingerprint=fnv1a64-chain-v1:d02b140720f2378e
restart route: segments=13, fingerprint=fnv1a64-chain-v1:031ae66685e2dbf1
```

The constant inertial endpoint remained physically identical in this control. What changed was the accepted step partition, segment count, and retained-history fingerprint. The separating control therefore falsifies factorization for the complete accepted record and violates the declared restart requirement of identical discrete decisions. It does not show a different physical endpoint for this inertial case.

### Claim grade and falsifier

- **Measured:** the current executable checkpoint/resume route forgets the adaptive controller's consecutive-growth-headroom count and produces a different accepted-history partition in the declared control.
- **Derived from inspected code:** resetting that count to zero explains the observed one-step delay in growth after restart.
- **Not claimed:** a physical trajectory error, a Master-Equation defect, checkpoint corruption, loss of accepted path values at the cut, or a general failure of every checkpoint configuration.
- **Falsifier:** preserve or reconstruct every continuation-critical controller field, then repeat the exact-cut adaptive control. The finding closes when interrupted and uninterrupted routes have identical discrete decisions and complete accepted records under the declared budget.

## 4. Practical Category-Theory Payoff

The local defect can be described without category theory: one controller variable is missing from serialization. The categorical contribution was to require a typed projection and ask whether all future-consumed distinctions factor through it. That question produced three practical gains:

1. It corrected the object boundary: the restart object is the checkpoint plus its compatible request template, not the checkpoint file alone.
2. It separated endpoint equality from complete accepted-record equality, preventing a physically inert control from being reported as restart parity.
3. It routed the omitted state to its owner without treating solver bookkeeping as substrate ontology.

This is enough to establish practical cross-lane audit value, but not a unique physical payoff. A simpler state-machine or serialization audit can express the same defect once the missing field is suspected. CT-004 remains useful as a reusable pre-audit contract across restart, history truncation, assembly projection, symmetry, and theory bridges; it remains removable from the underlying physics.

Plainly: category theory did not discover a new law of nature here. It supplied a disciplined question—“does the future really depend only on what crossed this boundary?”—and that question found a real omission.

## 5. Ownership and Next Action

| Item | Owner | Required action |
| --- | --- | --- |
| General factorization and boundary-typing template | Category Theory CT-004 | Retain this audit as the first measured application. |
| Checkpoint schema, certificate state, and resume reconstruction | App Solver EOM-003 | Preserve or lawfully reconstruct the consecutive-growth-headroom count. |
| Regression | App Solver EOM-003 | Add an adaptive exact-cut test requiring identical discrete decisions and complete retained-history fingerprints. |
| Physical history sufficiency | Master Equation and EOM scientific owners | Unchanged; no physical sufficiency claim follows from this implementation audit. |

The preferred implementation repair is either to persist the counter in the evolution certificate and checkpoint and restore it on resume, or to redesign the growth rule so the counter is exactly reconstructible from already retained accepted records. The owning lane must choose and independently validate that contract.

## 6. Validation Receipt

- `git diff --check`: passed.
- Existing checkpoint positive control: passed, one test.
- Focused adaptive separating probe: reproduced equal cut fingerprints and unequal final complete-history fingerprints.
- Strict content audit: 1,166 repository Markdown files, 0 errors, and 2 ambient generated-index warnings for the concurrent One Nature, Many Theories scene and Markdown files.
- Strict scene-graph check: 0 errors and the same 2 ambient warnings, plus generated graph drift from that external missing index entry.
- No generator was run in write mode.
