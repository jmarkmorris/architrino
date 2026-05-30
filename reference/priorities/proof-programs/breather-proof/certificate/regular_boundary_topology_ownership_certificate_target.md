# Regular-Boundary Topology Ownership Certificate Target

## Scope

This packet belongs to `fresh-same-packet-fold-shear-seed-v0` and reads
proof-interval-v10 as its source blocker. It does not edit any live ledger,
does not accept any parent-complement strip, and does not authorize
`branch_chart.json`.

The purpose is narrower: convert the v10 topology/no-double-counting no-go into
one finite certificate target that a later sidecar can either satisfy with
proof-grade same-packet data or reject cleanly.

## Verdict

The v10 blocker cannot be closed by naming a topology convention. Each imported
regular-boundary core needs an explicit certificate
$$
T(C)
$$
that assigns ownership to exactly one separator and proves that the same core is
not reused by strict simple-root branch sums, endpoint-excluded complements, or
fold-layer rectangles.

The current packet has 10 such cores, 4 finite candidate separator families, and
20 candidate membership edges, but it has:

| Required field class | v10 certified count |
| --- | ---: |
| exact single separator assignments | 0 |
| same-packet inclusion proofs | 0 |
| topology/no-double-counting certificates | 0 |
| simple-root branch-reuse exclusions | 0 |
| endpoint-excluded complement disjointness proofs | 0 |
| fold-layer nonexpansion certificates | 0 |
| domination inequalities or enlarged same-packet ceilings | 0 |
| non-core complement closures | 0 |

Therefore this file is a certificate target, not a certificate pass.

## Certificate Target

Fix the same packet identity tuple
$$
\mathfrak{I}_{\mathrm{fresh\_shear\_v0}}
=
\left(
\mathcal{K},
T_{\mathrm{cyc}},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta
\right)
$$
used by `fresh-same-packet-fold-shear-seed-v0`. For a residual core
$$
C
\subset I_r(C)\times I_s(C),
$$
let
$$
z_u(\theta)=c_f t(\theta)-X(\theta),
\qquad
z_w(\theta)=c_f t(\theta)+X(\theta),
$$
and let
$$
\Delta_C(\theta_r,\theta_s)
=
z_\ell(\theta_r)-z_\ell(\theta_s),
\qquad
\ell\in\{u,w\},
$$
be the null-coordinate residual for the ledger of the parent row.

A residual-core topology ownership certificate
$$
T(C)
$$
must record all of the following fields on the same packet identity:

1. **Exact single separator assignment.** A certified separator
   $$
   \sigma(C)\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\}
   $$
   selected from the v10 candidate separator list. Candidate-list order,
   side labels, and endpoint adjacency are not certificates.
2. **Same-packet regular-boundary inclusion.** A finite listed family
   $$
   \mathcal{C}^{\mathrm{reg}}_{\sigma(C)}
   $$
   with an exact inclusion statement
   $$
   C\in \mathcal{C}^{\mathrm{reg}}_{\sigma(C)}
   \subseteq
   \overline{\mathcal{F}}_{\sigma(C)}^{\mathrm{bdry}},
   $$
   where the right-hand side is a finite same-packet regular-boundary family,
   not an open-ended regular-neighborhood class.
3. **Simple-root branch-reuse exclusion.** If
   $$
   S(C)
   $$
   is the accepted proof-interval-v4 simple-root subrow inside the same parent
   row, then the certificate must prove that the residual core is not counted in
   the strict simple-root branch contribution:
   $$
   C\cap \operatorname{int} S(C)=\varnothing,
   \qquad
   C\cap B_{\mathrm{simple}}=\varnothing.
   $$
4. **Endpoint-excluded complement disjointness.** If endpoint ownership is used
   anywhere in the same parent complement, then
   $$
   C\cap B_{\mathrm{endpoint}}=\varnothing
   $$
   except for explicitly listed endpoint contacts that carry root-count bound
   $[0,0]$.
5. **Fold-layer nonexpansion and domination.** The certificate must prove that
   adding the residual core does not silently expand the accepted fold-layer row
   rectangles. This can be done by exact same-packet fold-layer membership, or
   by a finite regular-boundary contribution and domination inequality
   $$
   \sum_{B\in\mathcal{F}_{\sigma}}
   I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
   +
   \sum_{C'\in\mathcal{C}^{\mathrm{reg}}_{\sigma}}
   I^{\mathrm{reg\text{-}bdry}}_{\eta,\epsilon_c,C'}
   \le
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\sigma},
   $$
   for each separator
   $$
   \sigma\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\},
   $$
   or by a separately accepted enlarged finite ceiling on the same packet
   identity.
6. **Non-core complement closure.** The remaining part of each parent complement
   after removing accepted simple-root subrows and residual cores must be
   consumed by strict null-coordinate range separation, endpoint exclusion,
   exact fold-layer coverage, or another already accepted same-packet complement
   predicate.

Only when all six field classes are present for all residual cores in a parent
row may the parent complement be consumed through this route.

## Finite Core Inventory

The v10 residual cores that would need certificates are:

| Core | Parent row | Side | Candidate separators |
| --- | --- | --- | --- |
| `C_w_A1_A0_left_v10_reg_boundary_core_1` | `R_w_A1_A0` | `left` | `Sigma_1`, `Sigma_2` |
| `C_w_A2_A0_left_v10_reg_boundary_core_2` | `R_w_A2_A0` | `left` | `Sigma_2`, `Sigma_1` |
| `C_w_A2_A0_right_v10_reg_boundary_core_3` | `R_w_A2_A0` | `right` | `Sigma_2`, `Sigma_1` |
| `C_w_A2_A1_left_v10_reg_boundary_core_4` | `R_w_A2_A1` | `left` | `Sigma_2`, `Sigma_1` |
| `C_w_A2_A1_right_v10_reg_boundary_core_5` | `R_w_A2_A1` | `right` | `Sigma_2`, `Sigma_1` |
| `C_u_A3_A2_left_v10_reg_boundary_core_6` | `R_u_A3_A2` | `left` | `Sigma_3`, `Sigma_4` |
| `C_u_A4_A2_left_v10_reg_boundary_core_7` | `R_u_A4_A2` | `left` | `Sigma_4`, `Sigma_3` |
| `C_u_A4_A2_right_v10_reg_boundary_core_8` | `R_u_A4_A2` | `right` | `Sigma_4`, `Sigma_3` |
| `C_u_A4_A3_left_v10_reg_boundary_core_9` | `R_u_A4_A3` | `left` | `Sigma_4`, `Sigma_3` |
| `C_u_A4_A3_right_v10_reg_boundary_core_10` | `R_u_A4_A3` | `right` | `Sigma_4`, `Sigma_3` |

The table is finite and useful, but it is not an assignment certificate: every
row still lists two candidate separators.

## Lemma Target

**Residual-core ownership lemma.** Suppose every core in the finite inventory
above has a certificate
$$
T(C)
$$
satisfying the six field classes. Then the selected separator families form a
finite disjoint ownership partition for the regular-boundary residual cores,
and each affected parent row can consume its parent complements without double
counting roots already assigned to strict simple-root subrows, endpoint-excluded
complements, or fold-layer rectangles.

Proof route. The exact separator assignment supplies one owner for each finite
core. Same-packet inclusion makes the owner a finite listed family rather than
a broad class. The simple-root, endpoint, and fold-layer exclusions make the
sets used by the parent-complement ledger pairwise disjoint. The domination
inequality or enlarged ceiling bounds the added regular-boundary contribution
inside the same finite packet. Non-core complement closure then covers the
remaining complement strips, so the parent row has no unresolved residual
piece.

Failure mode. If any one field is absent for any one core, the lemma fails
closed for the parent row. In particular, a two-separator candidate list plus
side labels still consumes zero rows.

## Work Order

The next regular-boundary sidecar should not repeat the v10 audit. It should
either:

1. supply exact separator assignments, inclusion, domination, topology
   ownership, branch-reuse exclusions, fold-layer nonexpansion, and non-core
   complement closure for the 10 cores above; or
2. reject the route and pivot to accepted same-packet fold-layer exact
   membership or candidate repair so the complement collars become strict
   range-empty.

The second route is likely lower risk unless the next pass has concrete
same-packet domination data. The current v10 summary records
`same_packet_fold_ceiling_available_for_fresh_packet=false`, so topology
ownership by itself cannot consume the rows.

## Capture Decision

Priority-only. This packet advances the proof program by sharpening the v10
blocker into a finite lemma target and acceptance field list. It is not
reader-facing AAA prose and should not be promoted until a later packet supplies
the same-packet data and passes the null-coordinate pre-ledger.
