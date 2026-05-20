# Fold Parent Regular-Boundary Contract Probe

## Status

This packet is a proof-policy probe for the regular-boundary fold-coverage lane of packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`.

It does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, `pass_fail_ledger.md`, or any integrated regular-boundary attempt. It is priority-only contract material.

## Verdict

Rejected as a current parent-row consumption certificate.

The minimal regular-boundary theorem can be stated as a finite same-packet contract, but the current artifacts do not satisfy it. They identify residual equality cores and accepted fixed-parameter fold constants, but they do not prove same-packet inclusion of those regular-parent cores in an explicitly finite regular-boundary fold family, and they do not prove domination of the regular-boundary contribution by the already accepted constants.

Fail-closed result:

| Question | Answer |
| --- | --- |
| Can a regular-boundary theorem be defined without becoming a broad proof class? | Yes, but only as a finite same-packet theorem over named residual cores with explicit inclusion and domination fields. |
| Do the current packets supply those fields? | No. |
| Can residual equality cores be consumed now using `fold_full_interval_constants_certificate.json` alone? | No. |
| Are live-ledger updates authorized? | No. |

## Candidate Theorem Statement

**Finite regular-boundary fold-coverage contract theorem.** Fix the exact packet identity tuple
$$
(\mathcal{K},T_{\mathrm{cyc}},\mathcal{S},\mathcal{P},\mathcal{B}_{\mathrm{rep}},\Theta)
$$
recorded for `seed-doubled-four-arc-cosine-template-v0` and `preledger-separator-level-split-v1`, with
$$
\eta=0.02,\qquad \epsilon_c=0.05,\qquad \Gamma=1,
$$
and with the accepted fixed-parameter fold constants of `fold_full_interval_constants_certificate.json`.

Let $\mathcal{C}^{\mathrm{reg}}_{\Sigma}$ be a finite list of named residual equality cores, each lying in a fold-adjacent parent boundary complement and assigned to exactly one separator
$$
\Sigma\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\}.
$$
If, for every listed core $C$, the certificate records:

1. the outward-rounded receiver/source rectangle and null-coordinate overlap for $C$;
2. the parent row, strip id, accepted simple-root subrow boundary, and complement-boundary ownership convention;
3. an exact inclusion statement
   $$
   C\in\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}}
   $$
   where $\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}}$ is defined only as the finite listed same-packet regular-boundary family, not as an open-ended class;
4. preservation of
   $$
   \alpha_{\Sigma}>0,\qquad
   \nu_{\mathrm{exit},\Sigma}>0,\qquad
   \Delta N_\Sigma\in2\mathbb{Z},\qquad
   \Delta D_\Sigma=0;
   $$
5. a same-packet domination inequality proving that the already accepted fixed-parameter fold ceiling still covers the added regular-boundary contribution, for example
   $$
   \sum_{B\in\mathcal{F}_{\Sigma}} I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
   +
   \sum_{C\in\mathcal{C}^{\mathrm{reg}}_{\Sigma}}
   I^{\mathrm{reg\text{-}bdry}}_{\eta,\epsilon_c,C}
   \le
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma},
   $$
   or else a separately accepted enlarged finite ceiling on the same packet identity tuple;
6. a no-double-counting rule keeping $C$ out of strict simple-root branch sums and out of endpoint-excluded $[0,0]$ complements;
7. closure of every non-core complement by an already accepted strict gap, endpoint exclusion, or exact fold-layer alternative;

then each such $C$ may be consumed as regular-boundary fold-covered. Without all seven fields, the theorem fails closed.

## Required Certificate Fields

The minimal certificate is not another constants packet. It must add the missing geometric and domination fields:

| Field | Required content | Current status |
| --- | --- | --- |
| `packet_identity_tuple` | Exact same tuple and fixed parameters as the accepted constants certificate. | Present for constants only. |
| `residual_core_table` | Finite row-by-row list of all residual equality cores after endpoint exclusion and threshold subdivision. | Partly present diagnostically in the `w` and `u` positive-overlap subdivision attempts. |
| `regular_boundary_family_definition` | A finite same-packet definition of $\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}}$ by named cores, not by broad regular-neighborhood language. | Absent. |
| `separator_assignment` | Exact assignment of each core to one of $\Sigma_1,\ldots,\Sigma_4$. | Suggested by adjacency, but not certified. |
| `same_packet_inclusion_proof` | Proof that each core is included in the finite regular-boundary family without changing the accepted fold-layer row rectangles. | Absent; exact fold-family membership was rejected. |
| `domination_proof` | Inequality showing the accepted fixed-parameter fold ceiling covers fold rows plus regular-boundary cores, or a separately accepted enlarged ceiling. | Absent. |
| `topology_and_no_double_counting` | Half-open or closed/open ownership of shared simple-root, endpoint, and fold boundaries; no branch-sum reuse. | Partly present for endpoint exclusions only, not for residual cores. |
| `non_core_complement_closure` | Accepted strict gap or endpoint/fold coverage for endpoint-scale separated non-core strips. | Absent for `R_w_A2_A0/source_left` and `R_u_A4_A2/source_left`. |
| `live_ledger_guard` | Explicit statement that no ledger row changes until all parent complements and fold rows close. | Present across prior packets. |

## Current Artifact Check

The current artifacts pass only the fixed-constant and diagnostic-enumeration parts:

- `fold_full_interval_constants_certificate.json` accepts finite fixed-parameter constants for the 16 fold-layer rows and records
  $$
  I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}=11289.90742089375
  $$
  for each separator aggregate at $\eta=0.02$, $\epsilon_c=0.05$, and $\Gamma=1$.
- `fold_parent_fold_family_membership_attempt.md` proves the 20 parent-complement strips are not exact members of the accepted fold-layer row rectangles.
- `fold_parent_endpoint_w_closure_attempt.md` and `fold_parent_endpoint_u_closure_attempt.md` locally accept seven singleton endpoint-contact strips, but reject full parent consumption.
- `fold_parent_w_positive_overlap_subdivision_attempt.md` and `fold_parent_u_positive_overlap_subdivision_attempt.md` identify residual equality cores after inverse-threshold subdivision, but reject them as parent-consumption certificates.

They fail the theorem contract at the decisive points:

1. No artifact defines $\overline{\mathcal{F}}_{\Sigma}^{\mathrm{bdry}}$ as a finite accepted same-packet family.
2. No artifact records exact inclusion of each residual equality core in such a family.
3. No artifact proves that the accepted fixed-parameter fold constants dominate the added regular-boundary contribution.
4. The accepted constants certificate covers the 16 fold-layer row rectangles; the residual cores are regular-parent subrectangles with `A*/A*` interval ids.
5. Two endpoint-scale separated non-core strips still lack accepted outward-rounded strict gaps: `R_w_A2_A0/source_left` and `R_u_A4_A2/source_left`.

## Fail-Closed Conclusion

The regular-boundary route remains a possible theorem target, but the present packet set does not authorize it. Accepting the residual equality cores now would introduce a broad new proof class: regular-parent subrectangles adjacent to fold layers would be treated as fold-covered without same-packet inclusion and without a domination inequality tying their contribution to the accepted fixed-parameter constants.

Therefore the correct current state remains:

| Artifact or row class | Authorization |
| --- | --- |
| Residual equality cores | Not consumed. |
| Six fold-adjacent parent rows | Not consumed. |
| 16 fold-layer rows | Constants accepted externally; live ledger not rewritten by this packet. |
| `causal_ledger.json` | No update authorized. |
| `fold_layer_atlas.json` | No update authorized. |
| `branch_chart.json` | Not authorized. |
| `pass_fail_ledger.md` | No update authorized by this packet. |

## Capture Decision

Priority-only. This packet should not be promoted into `content/markdown/aaa` yet. The theorem target is mathematically useful, but the required inclusion and domination proof fields are not supplied.
