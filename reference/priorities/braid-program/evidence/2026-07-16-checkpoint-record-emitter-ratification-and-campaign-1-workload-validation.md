# Checkpoint Record Emitter Ratification and Campaign 1 Workload Validation

Date: 2026-07-16

> Historical instrument record only. The operator removed the associated old simulation outputs on 2026-07-24 after the EOM solver review. This document no longer accepts G3/G4 for campaign execution; fresh validation against the corrected solver is required by the live instrument gate.

## Verdict

**Instrument verdict — ACCEPTED (measured serialization parity).** The harness's checkpoint-to-`assembly-view-record.v0` emitter crossed the separate-change boundary. A checkpoint-only dumper and the emitted record agreed on both path ids, both retained-history fingerprints, and every segment start, end, coefficient, position-error, and velocity-error token. The comparison passed before the Campaign 1 workload edit and again after it.

**Workload verdict — PASSED FOR CONSTRUCTION ONLY (derived rule; measured implementation parity).** The declared 27 configurations, three endpoint-matched prehistories, and three refinement rows were instantiated and independently checked. No Campaign 1 root search, acceleration evaluation, master-equation evolution, oracle parity window, collapse comparison, or fate booking occurred. The workload is ready for a separate production change; it is not physics evidence.

## Separate-Change Boundary

The preceding [provenance repair](2026-07-16-eom-path-provenance-repair-audit.md) implemented and first exercised exact record emission but left G3 acceptance open. This change inspected that already-exercised emitter without changing its serialization mechanism, repeated its falsifier check, and ratified it in the [instrument gate](../campaigns/instrument-gate.md). Campaign workload construction was then added elsewhere in the harness and the emitter comparison was repeated to catch integration regressions.

The ratification smoke used the existing Phase-0 two-path straight prehistory for one accepted step. It was an instrument check, not a Campaign 1 production coordinate and not a fate run.

## Exact Checkpoint-to-Record Comparison

The serialization-only tool `scripts/eom/dump-eom-checkpoint-segments.cpp` reads the public checkpoint and prints stored decimal tokens without path arithmetic. The comparison projected each record worldline to `{id, fingerprint, segments}` and required exact JSON string equality with the dumper's two checkpoint paths.

Measured result, both before and after workload integration:

- exact token parity: `true`;
- path count: 2;
- declared prehistory segments per path: 1;
- evolved segments per path: 2;
- record authority: `eom-native-coupled-evolution`;
- coverage per path: `[-8,0.01]`;
- release root clearance: `certified_complete`.

**Falsifier:** any unequal id, fingerprint, time, coefficient, or error token; any segment-count boundary crossing; or any record segment absent from the checkpoint would reject emission duty. None fired.

## Campaign 1 Construction Theorem

This is the independent mathematical check on the workload rule. It does not depend on either implementation.

With $u=-t/H$ and $q(t)=u^2(3-2u)$,

$$
q(0)=0,
\qquad
q'(0)=0,
\qquad
q(-H)=1,
\qquad
q'(-H)=0.
$$

Therefore adding $\sigma_i(0.25d)q(t)$ along either declared bump axis changes the old endpoint by exactly $\sigma_i0.25d$, changes no old-endpoint velocity, and changes neither release position nor release velocity. `P1-lateral` and `P2-longitudinal` are materially different in orthogonal axes, while all three histories are endpoint-matched at release. This proves the construction rule; it does not predict what evolution will do with those inputs.

The C++ implementation rebases that analytic cubic onto the declared segment grid and attaches `1e-11` position and velocity error tokens to enclose decimal token/rebase rounding. No bump formula is evaluated after release.

## Construction-Only Exercise

The harness option `--campaign1-grid-manifest=<path>` uses the same `campaign1_paths` constructor selected by the future production seed family. It instantiates every retained segment, checks history joins through the EOM history constructor, evaluates probes at $t=-20,-15,-10,-5,0$, writes a construction manifest, and returns before the code path that creates an output directory, performs release root clearance, or calls coupled evolution.

The separately authored JavaScript checker reconstructs the Cartesian grid, release states, cubic $q$ and $q'$, refinement rows, endpoint groups, and old history displacement directly from the campaign specification. Because it was authored in the same change as the C++ workload, its agreement is graded **measured implementation parity**, not an independent proof of the rule. The derived theorem above supplies the rule-level check.

Measured inventory:

| Check | Result |
|---|---:|
| configurations $(d,s,\theta)$ | 27 |
| production coordinates including prehistory | 81 |
| construction rows including refinement | 243 |
| retained paths | 486 |
| retained cubic segments instantiated | 226,800 |
| analytic path-time probes | 2,430 |
| endpoint-matched path/refinement groups | 162 |
| material-difference groups | 162 |
| maximum probed position interval width | $2.0030199721077224\times10^{-11}$ |
| maximum probed velocity interval width | $2.0000778810924658\times10^{-11}$ |
| status | passed |

Every release speed was one of $0.25,0.50,0.75<1$. Every history covered $[-20,0]$. Segment counts were 200, 400, and 800 per path at R0, R1, and R2; maximum segment durations respected $0.10$, $0.05$, and $0.025$. Every refinement retained a $0.10$ chunk duration and root depths 192, 224, and 256.

**Workload falsifier:** a missing/duplicate coordinate; a non-sub-field release; an incorrect polarity, endpoint, old-history bump, segment count, coverage, probe enclosure, refinement value, or chunk duration; or control flow reaching root search/evolution before the construction-only return would reject the workload. None fired. The manifest's `evolutionInvoked` and `physicsResultBooked` fields are descriptive metadata only and are not consumed as evidence.

## Build and Artifact Identity

- repository `HEAD`: `8474cc60acc3dc4a4267d29693d9103b5b4f772e` plus the live changes named here;
- live `src/eom` digest: `0fa3188066ef1cba0cf26fb138921d01410f577bfa0040b0efc76c9dbd034fa2`;
- last `src/eom` source change: `2026-07-16 13:33:56 -0400`;
- completed EOM build: `2026-07-16 13:39:20 -0400`, SHA-256 `ff9bf0909509d8e07b73719378b6e23dcefef5ed46be4039617ecbda86b7ebec`;
- pre-edit ratification harness: `2026-07-16 13:51:11 -0400`, SHA-256 `0276e9df948ea6011e1d8f3b951fea9ff77d37de09b9551cb30975a5c06aa07c`;
- workload harness: `2026-07-16 13:55:55 -0400`, SHA-256 `c79dbf33cc00c5a247e4e5b8ca6d4485202761c4bca0cc4045938612b121023e`;
- construction manifest retained in `/tmp` only: 1,187,094 bytes, SHA-256 `91635bc54da0dd4bb1893dfe483e257303f0ba88f24510f72523c5d94d5a6104`;
- independent checker SHA-256: `63a32cb118636ba0a3dbb35d8cb8680fa895df5515aaa903d10e761faa7148db`.

The completed EOM build is newer than the latest `src/eom` source file, and both harness binaries were compiled afterward with `-Wall -Wextra -Wpedantic` without diagnostics. Production must recompute this identity; these hashes do not pre-authorize a later run.

## Reproduction Commands

Construction-only exercise:

```sh
/tmp/attractor-ensemble-harness-campaign1 \
  --campaign1-grid-manifest=/tmp/campaign1-binary-workload-construction-20260716.json
```

Independent construction check:

```sh
node scripts/eom/validate-campaign1-binary-workload.mjs \
  /tmp/campaign1-binary-workload-construction-20260716.json
```

## Booking Boundary

No assembly-view record is required for the construction manifest because it is not a booked run or collapse-protocol seed and contains no evolved segment. No fate table, residual result, root-ledger result, oracle parity result, or symmetry-reduced temporal result exists in this change. Campaign 1 production remains the next queue action and must begin from a fresh build check.
