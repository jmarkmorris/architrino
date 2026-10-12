# Matched-Pair Stage 1: Independent Review

Current disposition: the [version 3 independent review](matched-pair-review-stage-1-v3-2026-10-11.md) closes both R1-1 and R1-2 in scratch using unchanged independent instruments. This document preserves the version 1 observation and its failure evidence. Live integration, remaining qualification controls and Stage 2 release remain open. The [execution conversation](../../../op/agent-chats/2026-10-11-eom-matched-pair-integration/chat.md) owns coordination and deadlines.

## Reviewed identities and positive evidence

**Measured by `shasum -a 256 -c`:** all five files in the prepared-source manifest and all nine files in the scratch-output manifest verify against Claude's retained identities. The scratch library SHA-256 is `c72a80b8923b41f639ba57d18aa8e469e9f767038d06149bb3bf6e2d3c854876`, matching its binary manifest. `cmp` confirms the review harness's included matched-pair header equals the retained prepared header. This binds the consumer experiment to the retained implementation; it does not establish all uninspected sources or live integration.

**Measured independent containment:** the reviewer-owned [comparison adapter](../evidence/matched-pair-review-snapshot-comparison.mjs), after known cases and without modifying the separately authored frozen oracle, checks the retained sixteen affine snapshot outputs. All twelve complete cases contain all three exact receiver vectors; all four lower-boundary cases remain explicitly uncertified and are excluded from acceptance. Full logical identity and grouped-role checks pass on those observed records. Its target SHA-256 `5af87c38364162ff2aa8360ceed3893e0a3bf22679af94705edf4d681be9c8fc` matches Claude's output manifest, upgrading the earlier observed-byte receipt to a packet-bound comparison. This is prescribed-history snapshot evidence, not evolution, every negative control or a cost result.

**Derived and accepted:** the member-prefix re-proof closes the original R0-3 mathematical concern. The computed upper separation on the actual member's full prefix is below $T_r-S_0$. For every $S\le S_0$, the causal distance is at least $T_r-S_0$, so the residual is strictly negative. This needs no prefix speed bound or imported proof identity. The actual module reads each member's position hull and keeps its fingerprint. The original addendum's imported-token rule is superseded by this construction. Prefix control outputs and carrier consumption still receive implementation review.

**Measured disabled compatibility:** three separate `cmp` commands confirm complete native, acceleration and evolution `all` outputs are byte-identical to the retained baseline. A reviewer-authored recursive JSON difference function first passes known scalar/array/key-change controls, then finds exactly four differing dispersal fields: `enabled_step_wall_seconds`, `enabled_final_step_wall_seconds`, `enabled_total_wall_seconds` and `disabled_step_wall_seconds`. Object keys/order are identical and every other value agrees. The retained difference receipt is `.local-data/eom-matched-pair/2026-10-11/reviewer-targets/disabled-dispersal-differences-2026-10-11T2041.json`. This establishes disabled compatibility on those four fixtures; it is not an independent correctness proof.

### Additional analytical controls

**Derived independently from the canonical kernel and the inspected fixture inputs:** the three-dimensional affine control has both roots at zero, distance one, source-ray vectors $(-7/25,0,24/25)$ and $(7/25,0,24/25)$, and transmitter denominators $113/125$ and $137/125$. With opposite unit charges its exact pair vector is

$$
\left(-\frac{8750}{15481},\ 0,\ \frac{2880}{15481}\right).
$$

Both nonzero components have magnitude below one by integer comparison. Bounded `jq` extraction of the manifest-verified `affine_moving_pair` output gives all three component intervals as $[-2.7704620861092022,2.7704620861092022]$, which contain this exact vector. This validates the three-dimensional moving-source instance without taking the implementer's expected vector as an oracle.

For the quadratic source functions $z_+(S)=10+(2/125)S^2$ and $z_-(S)=369/40+(2/125)S^2$, roots $-25/2$ and $-45/4$ satisfy the unsquared causal equations exactly. Their speeds there are $-2/5$ and $-9/25$, and denominators are $3/5$ and $16/25$. Their signed contributions sum to

$$
-\frac4{375}+\frac1{81}=\frac{17}{10125}.
$$

This positive value is below $1/500$ by integer comparison. The manifest-verified whole-window and re-expanded interior-window outputs enclose it with component half-widths above $0.01$. The nonzero-acceleration quadratic instance and shifted evaluation therefore have independent analytical inclusion evidence. A falsifier is a mismatch of the specified input cubics/roots or an emitted interval excluding either rational vector.

**Measured prefix controls by bounded `jq` extraction:** the $S_0=-14$ interior window is admitted as `member_prefix_reproved` with both recorded prefix residual upper bounds strictly negative; the $S_0=-12$ and $S_0=-11$ windows decline with `MPE-WINDOW-02` and no acceleration interval. This agrees with the independently identified roots in the earlier intervals. No foreign prefix evidence can be submitted through the prepared request type.

## R1-1: consumer must bind the mathematical inputs

**Measured blocking defect:** a separately authored [consumer negative-control harness](../evidence/matched-pair-review-consumer-binding.cpp) first accepts a genuine static matched-pair certificate with coupling and receiver charge one, and confirms its known pair value is contained. Only after that known pass, it submits the same genuine certificate with coupling two, then separately with receiver charge two. `certify_pair_acceleration` accepts both altered requests as `consumed_certified_matched_pair_group` and returns the unchanged enclosure. The exact acceleration of the requested pair lies outside that enclosure in both cases.

The receiver is at the origin, sources are at $10.005=2001/200$ and $9.995=1999/200$, and their charge tokens are $1$ and $-1$. The exact original pair contribution is

$$
\frac{40000}{1999^2}-\frac{40000}{2001^2}
=\frac{320000000}{15999992000001}.
$$

Doubling either the coupling or receiver charge doubles this value to $640000000/15999992000001$, approximately $4.000002\times10^{-5}$. The original grouped upper bound is approximately $2.003003\times10^{-5}$. Thus the defect is separated by a wide margin; it does not depend on a borderline rounding comparison. The hypothesis $c_f=1$ and all histories, root markers, event tokens and member fingerprints remain unchanged.

**Measured cause by bounded source reads:** `matched_pair_certificate_refusal` receives receiver/member histories and reception time, but no requested coupling, receiver charge or member charge. The certificate records member charge tokens but not the receiver charge and coupling tokens used to derive it. `certify_pair_acceleration` parses the altered scalars and places them in metadata, then consumes the earlier interval without checking those scalars against the enclosure's mathematical inputs. Positive coupling admission therefore does not repair this mismatch.

Required correction: bind and recheck all mathematical inputs used to certify the group, including receiver and both source charge magnitudes/sign relation, coupling and normalized wake speed; preserve exact-token equality semantics where applicable. Validate the applicable budget/event/search coverage at the consumer boundary as its contract requires. Changed inputs must reject or trigger fresh certification, rather than relabel an old interval. The changed-budget control already refuses the much tighter pair tolerance in this experiment; it is not reported as a defect.

**Falsifier/closure control:** rerun the unchanged reviewer harness against the corrected subject after its known control. Both changed-input cases must be refused or freshly certified with enclosing intervals. Also test changed member charge and changed marker wake-speed token, because the currently inspected recheck cannot observe those selected inputs. Do not modify this frozen negative control to manufacture a pass.

### Reproduction and retention

The harness was compiled in 0.56 seconds using `/usr/bin/c++ -std=c++20 -O2 -ffp-contract=off -arch arm64`, the existing SDK `MacOSX26.5.sdk`, scratch headers and the manifest-bound library, with the existing MPFR/GMP/Boost JSON libraries. The executable SHA-256 is `e1c9628fe665b35700619a0590450135944fe487b80ea9bd4b4ff79483743956`; source identity is `0434d6a128b7e2672aab1def240bedb6001de31d67447dac0e26e2bf74513c14`. The single run's complete stdout is retained as `.local-data/eom-matched-pair/2026-10-11/reviewer-targets/consumer-binding-2026-10-11T2038.stdout`, with its known-case result preceding mutation targets. No production source, frozen oracle or Claude patch was changed by the reviewer.

## Remaining review and host boundary

The wider review remains open for complete matrix consumer negatives and the corrected source. The present packet's module recheck line does not exercise the complete reconstruction's missing/duplicated/foreign group ownership paths; those acceptance negatives remain required with the correction packet. The packet's literal `python3` commands also need interpreter provenance reconciled to the repository's shared-venv requirement; the reviewer has not run system Python or counted the implementer's consistency instrument as independent acceptance.

Claude still reports no direct receiving-host authorization and has stopped new substantial work pending it. This does not prevent correction of the owned new module/fixture and retained scratch patch within the preparation scope already permitted by that host. Return the R1-1 finding for that bounded correction and further review. Existing shared-file integration remains blocked by the actual host rejection, and no reviewer edit substitutes for that authorization. Stages 2–3 remain predecessor-gated.
