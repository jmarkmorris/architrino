# Fold Parent Complement Partition Attempt

## Scope

This packet refines the two side-specific parent-complement attempts into one explicit strip partition for the six fold-adjacent parent rows of packet `seed-doubled-four-arc-cosine-template-v0` and refinement `preledger-separator-level-split-v1`.

It uses the accepted fixed-parameter fold constants in `fold_full_interval_constants_certificate.json`, the parent-complement contract in `fold_parent_boundary_complement_packet.md`, and the simple-root subwindows in `mesh_refined_preledger_v1.json`.

It does not edit `causal_ledger.json`, `fold_layer_atlas.json`, `branch_chart.json`, or any live ledger.

## Verdict

Rejected as an accepted parent-complement closure certificate.

The partition below is useful because it identifies the exact boundary strips left after removing the accepted simple-root subrow from each parent row. However, none of the strips can currently be certified by the strict range-empty alternative
$$
\Delta^y_B>0.
$$
The computed null-coordinate ranges touch at endpoints, giving zero certified gap after outward rounding. The accepted fold-layer constants make fold-family coverage available in principle, but no current artifact proves exact membership of these regular-parent boundary strips in
$$
\mathcal{F}_{\Sigma_1},\quad
\mathcal{F}_{\Sigma_2},\quad
\mathcal{F}_{\Sigma_3},\quad
\mathcal{F}_{\Sigma_4}.
$$

Therefore the six parent rows remain blocked, and no live pre-ledger update is authorized.

## Partition Rule

For a parent row $I_r\times I_s$ with accepted simple-root subrow $J_r\times J_s$, the diagnostic strip partition is:

| Strip class | Receiver theta interval | Source theta interval |
| --- | --- | --- |
| `receiver_left` | left component of $I_r\setminus J_r$ | all of $I_s$ |
| `receiver_right` | right component of $I_r\setminus J_r$ | all of $I_s$ |
| `source_left` | all of $J_r$ | left component of $I_s\setminus J_s$ |
| `source_right` | all of $J_r$ | right component of $I_s\setminus J_s$ |

Empty strip classes are omitted. This covers the parent row outside the simple-root subrow up to shared endpoints, which are exactly where the zero-gap failures appear.

## `w` Parent Rows

All ranges below are diagnostic endpoint evaluations using the monotonicity already recorded for the parent arcs. They are not accepted outward-rounded interval certificates.

| Parent row | Strip | Receiver $\theta$ range | Source $\theta$ range | Receiver $w$ range | Source $w$ range | Gap result |
| --- | --- | --- | --- | --- | --- | --- |
| `R_w_A1_A0` | `receiver_left` | $[0.160083617650,0.170709367399]$ | $[0,0.135083617650]$ | $[1.669902497690,1.675063938914]$ | $[1.250000000000,1.674902497689]$ | zero/touching |
| `R_w_A1_A0` | `source_left` | $[0.170709367399,0.339916382350]$ | $[0,0.041038833440]$ | $[1.466528714676,1.669902497690]$ | $[1.250000000000,1.466528714678]$ | zero/touching |
| `R_w_A1_A0` | `source_right` | $[0.170709367399,0.339916382350]$ | $[0.125869003963,0.135083617650]$ | $[1.466528714676,1.669902497690]$ | $[1.669902497690,1.674902497689]$ | zero/touching |
| `R_w_A2_A0` | `receiver_right` | $[0.457747116028,0.635083617650]$ | $[0,0.135083617650]$ | $[1.669902497690,3.164200959219]$ | $[1.250000000000,1.674902497689]$ | zero/touching |
| `R_w_A2_A0` | `source_left` | $[0.364916382350,0.457747116028]$ | $[0,0.041076558044]$ | $[1.466690155900,1.669902497690]$ | $[1.250000000000,1.466690155899]$ | endpoint-scale gap, not accepted after rounding |
| `R_w_A2_A0` | `source_right` | $[0.364916382350,0.457747116028]$ | $[0.125869003963,0.135083617650]$ | $[1.466690155900,1.669902497690]$ | $[1.669902497690,1.674902497689]$ | zero/touching |
| `R_w_A2_A1` | `receiver_left` | $[0.364916382350,0.373898811563]$ | $[0.160083617650,0.339916382350]$ | $[1.466690155900,1.471528714676]$ | $[1.466528714676,1.675063938914]$ | zero/touching |
| `R_w_A2_A1` | `receiver_right` | $[0.457785341387,0.635083617650]$ | $[0.160083617650,0.339916382350]$ | $[1.670063938913,3.164200959219]$ | $[1.466528714676,1.675063938914]$ | zero/touching |
| `R_w_A2_A1` | `source_left` | $[0.373898811563,0.457785341387]$ | $[0.160083617650,0.170446004355]$ | $[1.471528714676,1.670063938913]$ | $[1.670063938913,1.675063938914]$ | zero/touching |
| `R_w_A2_A1` | `source_right` | $[0.373898811563,0.457785341387]$ | $[0.329553995645,0.339916382350]$ | $[1.471528714676,1.670063938913]$ | $[1.466528714676,1.471528714676]$ | zero/touching |

The `w` side therefore cannot be closed by strict range-empty gaps from this partition. A later certificate must either prove endpoint-aware exclusions compatible with the parent-complement contract or record exact coverage of each strip by the accepted $\mathcal{F}_{\Sigma_1}$ or $\mathcal{F}_{\Sigma_2}$ fold-layer families.

## `u` Parent Rows

| Parent row | Strip | Receiver $\theta$ range | Source $\theta$ range | Receiver $u$ range | Source $u$ range | Gap result |
| --- | --- | --- | --- | --- | --- | --- |
| `R_u_A3_A2` | `receiver_left` | $[0.660083617650,0.670709367399]$ | $[0.364916382350,0.635083617650]$ | $[4.811495151279,4.816656592503]$ | $[3.118984347961,4.816495151279]$ | zero/touching |
| `R_u_A3_A2` | `source_left` | $[0.670709367399,0.839916382350]$ | $[0.364916382350,0.541038833440]$ | $[4.608121368266,4.811495151279]$ | $[3.118984347961,4.608121368267]$ | zero/touching |
| `R_u_A3_A2` | `source_right` | $[0.670709367399,0.839916382350]$ | $[0.625869003963,0.635083617650]$ | $[4.608121368266,4.811495151279]$ | $[4.811495151279,4.816495151279]$ | zero/touching |
| `R_u_A4_A2` | `receiver_right` | $[0.957747116028,1]$ | $[0.364916382350,0.635083617650]$ | $[4.811495151280,5.033185307180]$ | $[3.118984347961,4.816495151279]$ | zero/touching |
| `R_u_A4_A2` | `source_left` | $[0.864916382350,0.957747116028]$ | $[0.364916382350,0.541076558044]$ | $[4.608282809490,4.811495151280]$ | $[3.118984347961,4.608282809489]$ | endpoint-scale gap, not accepted after rounding |
| `R_u_A4_A2` | `source_right` | $[0.864916382350,0.957747116028]$ | $[0.625869003963,0.635083617650]$ | $[4.608282809490,4.811495151280]$ | $[4.811495151279,4.816495151279]$ | zero/touching |
| `R_u_A4_A3` | `receiver_left` | $[0.864916382350,0.873898811563]$ | $[0.660083617650,0.839916382350]$ | $[4.608282809490,4.613121368266]$ | $[4.608121368266,4.816656592503]$ | zero/touching |
| `R_u_A4_A3` | `receiver_right` | $[0.957785341387,1]$ | $[0.660083617650,0.839916382350]$ | $[4.811656592503,5.033185307180]$ | $[4.608121368266,4.816656592503]$ | zero/touching |
| `R_u_A4_A3` | `source_left` | $[0.873898811563,0.957785341387]$ | $[0.660083617650,0.670446004355]$ | $[4.613121368266,4.811656592503]$ | $[4.811656592503,4.816656592503]$ | zero/touching |
| `R_u_A4_A3` | `source_right` | $[0.873898811563,0.957785341387]$ | $[0.829553995645,0.839916382350]$ | $[4.613121368266,4.811656592503]$ | $[4.608121368266,4.613121368266]$ | zero/touching |

The `u` side therefore cannot be closed by strict range-empty gaps from this partition. A later certificate must either prove endpoint-aware exclusions compatible with the parent-complement contract or record exact coverage of each strip by the accepted $\mathcal{F}_{\Sigma_3}$ or $\mathcal{F}_{\Sigma_4}$ fold-layer families.

## Consequence For The Live Pre-Ledger

| Quantity | Current state after this attempt |
| --- | --- |
| Accepted fixed-parameter fold constants | Available for all four separator families. |
| Strict range-empty parent complement closure | Rejected for the natural strip partition; gaps are zero/touching. |
| Fold-family membership closure | Not recorded for any parent complement strip. |
| `causal_ledger.json` update | Not authorized. |
| `fold_layer_atlas.json` update | Not authorized. |
| `branch_chart.json` authorization | Not authorized. |

The exact remaining mathematical obligation is no longer a fold-constant calculation. It is an endpoint-aware parent-complement closure proof: for each named strip above, prove either a valid exclusion despite endpoint contact, or exact membership in an accepted fold-layer family on the same packet identity tuple.
