# Higher-Fold Fold-Layer Burden Atlas

## Verdict

The higher-fold packet `fresh-v10-higher-fold-12-root-rebuild-v0` still fail-closes before branch-chart
authorization. The proof-interval v6 ledger leaves 112
fold-layer candidate rows under `trig_range_overlap_touches_fold_layer_candidate`. This atlas groups
those rows by the 12 higher-fold separator layers and records the same-packet
fields required before any of them may be consumed.

This report is priority-only. It does not update the live `causal_ledger.json`,
does not mark any row `fold_layer`, and does not authorize
`branch_chart.json`.

| Separator | Rows | Row ids |
| --- | ---: | --- |
| `Sigma_hf_01` | 11 | `R_u_A01_F01`, `R_u_F01_A00`, `R_u_F01_F01`, `R_w_A01_F01`, `R_w_A02_F01`, `R_w_A03_F01`, `R_w_A04_F01`, `R_w_A05_F01`, `R_w_A06_F01`, `R_w_F01_A00`, `R_w_F01_F01` |
| `Sigma_hf_02` | 11 | `R_u_A02_F02`, `R_u_F02_A01`, `R_u_F02_F02`, `R_w_A02_F02`, `R_w_A03_F02`, `R_w_A04_F02`, `R_w_A05_F02`, `R_w_A06_F02`, `R_w_F02_A01`, `R_w_F02_A12`, `R_w_F02_F02` |
| `Sigma_hf_03` | 7 | `R_u_A03_F03`, `R_u_F03_A02`, `R_u_F03_F03`, `R_w_A03_F03`, `R_w_A06_F03`, `R_w_F03_A02`, `R_w_F03_F03` |
| `Sigma_hf_04` | 9 | `R_u_A04_F04`, `R_u_F04_A03`, `R_u_F04_F04`, `R_w_A04_F04`, `R_w_A05_F04`, `R_w_A06_F04`, `R_w_F04_A03`, `R_w_F04_A12`, `R_w_F04_F04` |
| `Sigma_hf_05` | 9 | `R_u_A05_F05`, `R_u_F05_A04`, `R_u_F05_F05`, `R_w_A05_F05`, `R_w_A06_F05`, `R_w_F05_A02`, `R_w_F05_A03`, `R_w_F05_A04`, `R_w_F05_F05` |
| `Sigma_hf_06` | 9 | `R_u_A06_F06`, `R_u_F06_A05`, `R_u_F06_F06`, `R_w_A06_F06`, `R_w_F06_A03`, `R_w_F06_A04`, `R_w_F06_A05`, `R_w_F06_A12`, `R_w_F06_F06` |
| `Sigma_hf_07` | 11 | `R_u_A07_F07`, `R_u_A08_F07`, `R_u_A09_F07`, `R_u_A10_F07`, `R_u_A11_F07`, `R_u_A12_F07`, `R_u_F07_A06`, `R_u_F07_F07`, `R_w_A07_F07`, `R_w_F07_A06`, `R_w_F07_F07` |
| `Sigma_hf_08` | 11 | `R_u_A08_F08`, `R_u_A09_F08`, `R_u_A10_F08`, `R_u_A11_F08`, `R_u_A12_F08`, `R_u_F08_A06`, `R_u_F08_A07`, `R_u_F08_F08`, `R_w_A08_F08`, `R_w_F08_A07`, `R_w_F08_F08` |
| `Sigma_hf_09` | 7 | `R_u_A09_F09`, `R_u_A12_F09`, `R_u_F09_A08`, `R_u_F09_F09`, `R_w_A09_F09`, `R_w_F09_A08`, `R_w_F09_F09` |
| `Sigma_hf_10` | 9 | `R_u_A10_F10`, `R_u_A11_F10`, `R_u_A12_F10`, `R_u_F10_A06`, `R_u_F10_A09`, `R_u_F10_F10`, `R_w_A10_F10`, `R_w_F10_A09`, `R_w_F10_F10` |
| `Sigma_hf_11` | 9 | `R_u_A11_F11`, `R_u_A12_F11`, `R_u_F11_A08`, `R_u_F11_A09`, `R_u_F11_A10`, `R_u_F11_F11`, `R_w_A11_F11`, `R_w_F11_A10`, `R_w_F11_F11` |
| `Sigma_hf_12` | 9 | `R_u_A12_F12`, `R_u_F12_A06`, `R_u_F12_A09`, `R_u_F12_A10`, `R_u_F12_A11`, `R_u_F12_F12`, `R_w_A12_F12`, `R_w_F12_A11`, `R_w_F12_F12` |

## Row Burden

| Row | Separator | Ledger | Receiver | Source | Diagnostic overlap width |
| --- | --- | --- | --- | --- | ---: |
| `R_u_A01_F01` | `Sigma_hf_01` | `u` | `A01` | `F01` | 0.000737515570209846 |
| `R_u_F01_A00` | `Sigma_hf_01` | `u` | `F01` | `A00` | 0.000345752777769937 |
| `R_u_F01_F01` | `Sigma_hf_01` | `u` | `F01` | `F01` | 0.10057650979682 |
| `R_w_A01_F01` | `Sigma_hf_01` | `w` | `A01` | `F01` | 0.00577876077814987 |
| `R_w_A02_F01` | `Sigma_hf_01` | `w` | `A02` | `F01` | 0.00577876077814987 |
| `R_w_A03_F01` | `Sigma_hf_01` | `w` | `A03` | `F01` | 0.00577876077814987 |
| `R_w_A04_F01` | `Sigma_hf_01` | `w` | `A04` | `F01` | 0.00577876077814987 |
| `R_w_A05_F01` | `Sigma_hf_01` | `w` | `A05` | `F01` | 0.00577876077814987 |
| `R_w_A06_F01` | `Sigma_hf_01` | `w` | `A06` | `F01` | 0.00577876077814987 |
| `R_w_F01_A00` | `Sigma_hf_01` | `w` | `F01` | `A00` | 0.00344594439738999 |
| `R_w_F01_F01` | `Sigma_hf_01` | `w` | `F01` | `F01` | 0.00577876077814987 |
| `R_u_A02_F02` | `Sigma_hf_02` | `u` | `A02` | `F02` | 0.00000900769038597593 |
| `R_u_F02_A01` | `Sigma_hf_02` | `u` | `F02` | `A01` | 0.0000600624674139683 |
| `R_u_F02_F02` | `Sigma_hf_02` | `u` | `F02` | `F02` | 0.10040629332013 |
| `R_w_A02_F02` | `Sigma_hf_02` | `w` | `A02` | `F02` | 0.00526007644793003 |
| `R_w_A03_F02` | `Sigma_hf_02` | `w` | `A03` | `F02` | 0.00526007644793003 |
| `R_w_A04_F02` | `Sigma_hf_02` | `w` | `A04` | `F02` | 0.00526007644793003 |
| `R_w_A05_F02` | `Sigma_hf_02` | `w` | `A05` | `F02` | 0.00526007644793003 |
| `R_w_A06_F02` | `Sigma_hf_02` | `w` | `A06` | `F02` | 0.00526007644793003 |
| `R_w_F02_A01` | `Sigma_hf_02` | `w` | `F02` | `A01` | 0.00526007644793003 |
| `R_w_F02_A12` | `Sigma_hf_02` | `w` | `F02` | `A12` | 0.00526007644793003 |
| `R_w_F02_F02` | `Sigma_hf_02` | `w` | `F02` | `F02` | 0.00526007644793003 |
| `R_u_A03_F03` | `Sigma_hf_03` | `u` | `A03` | `F03` | 0.0000246624026040004 |
| `R_u_F03_A02` | `Sigma_hf_03` | `u` | `F03` | `A02` | 0.003913602928103 |
| `R_u_F03_F03` | `Sigma_hf_03` | `u` | `F03` | `F03` | 0.099455120443155 |
| `R_w_A03_F03` | `Sigma_hf_03` | `w` | `A03` | `F03` | 0.00610744410589015 |
| `R_w_A06_F03` | `Sigma_hf_03` | `w` | `A06` | `F03` | 0.00610744410589015 |
| `R_w_F03_A02` | `Sigma_hf_03` | `w` | `F03` | `A02` | 0.00610744410589015 |
| `R_w_F03_F03` | `Sigma_hf_03` | `w` | `F03` | `F03` | 0.00610744410589015 |
| `R_u_A04_F04` | `Sigma_hf_04` | `u` | `A04` | `F04` | 0.00667570751386015 |
| `R_u_F04_A03` | `Sigma_hf_04` | `u` | `F04` | `A03` | 0.00249636682082999 |
| `R_u_F04_F04` | `Sigma_hf_04` | `u` | `F04` | `F04` | 0.10132973905199 |
| `R_w_A04_F04` | `Sigma_hf_04` | `w` | `A04` | `F04` | 0.00513070275741012 |
| `R_w_A05_F04` | `Sigma_hf_04` | `w` | `A05` | `F04` | 0.00513070275741012 |
| `R_w_A06_F04` | `Sigma_hf_04` | `w` | `A06` | `F04` | 0.00513070275741012 |
| `R_w_F04_A03` | `Sigma_hf_04` | `w` | `F04` | `A03` | 0.00513070275741012 |
| `R_w_F04_A12` | `Sigma_hf_04` | `w` | `F04` | `A12` | 0.00513070275741012 |
| `R_w_F04_F04` | `Sigma_hf_04` | `w` | `F04` | `F04` | 0.00513070275741012 |
| `R_u_A05_F05` | `Sigma_hf_05` | `u` | `A05` | `F05` | 0.000027478253629809 |
| `R_u_F05_A04` | `Sigma_hf_05` | `u` | `F05` | `A04` | 0.00237542148832004 |
| `R_u_F05_F05` | `Sigma_hf_05` | `u` | `F05` | `F05` | 0.10158090269606 |
| `R_w_A05_F05` | `Sigma_hf_05` | `w` | `A05` | `F05` | 0.00506519107432002 |
| `R_w_A06_F05` | `Sigma_hf_05` | `w` | `A06` | `F05` | 0.00506519107432002 |
| `R_w_F05_A02` | `Sigma_hf_05` | `w` | `F05` | `A02` | 0.00506519107432002 |
| `R_w_F05_A03` | `Sigma_hf_05` | `w` | `F05` | `A03` | 0.00506519107432002 |
| `R_w_F05_A04` | `Sigma_hf_05` | `w` | `F05` | `A04` | 0.00506519107432002 |
| `R_w_F05_F05` | `Sigma_hf_05` | `w` | `F05` | `F05` | 0.00506519107432002 |
| `R_u_A06_F06` | `Sigma_hf_06` | `u` | `A06` | `F06` | 0.000612210133719593 |
| `R_u_F06_A05` | `Sigma_hf_06` | `u` | `F06` | `A05` | 0.0000104749772500412 |
| `R_u_F06_F06` | `Sigma_hf_06` | `u` | `F06` | `F06` | 0.10047510948387 |
| `R_w_A06_F06` | `Sigma_hf_06` | `w` | `A06` | `F06` | 0.00541270191175003 |
| `R_w_F06_A03` | `Sigma_hf_06` | `w` | `F06` | `A03` | 0.00414962769274996 |
| `R_w_F06_A04` | `Sigma_hf_06` | `w` | `F06` | `A04` | 0.00202716290387994 |
| `R_w_F06_A05` | `Sigma_hf_06` | `w` | `F06` | `A05` | 0.00541270191175003 |
| `R_w_F06_A12` | `Sigma_hf_06` | `w` | `F06` | `A12` | 0.00541270191175003 |
| `R_w_F06_F06` | `Sigma_hf_06` | `w` | `F06` | `F06` | 0.00541270191175003 |
| `R_u_A07_F07` | `Sigma_hf_07` | `u` | `A07` | `F07` | 0.00577876077814032 |
| `R_u_A08_F07` | `Sigma_hf_07` | `u` | `A08` | `F07` | 0.00577876077814032 |
| `R_u_A09_F07` | `Sigma_hf_07` | `u` | `A09` | `F07` | 0.00577876077814032 |
| `R_u_A10_F07` | `Sigma_hf_07` | `u` | `A10` | `F07` | 0.00577876077814032 |
| `R_u_A11_F07` | `Sigma_hf_07` | `u` | `A11` | `F07` | 0.00577876077814032 |
| `R_u_A12_F07` | `Sigma_hf_07` | `u` | `A12` | `F07` | 0.00577876077814032 |
| `R_u_F07_A06` | `Sigma_hf_07` | `u` | `F07` | `A06` | 0.00577876077814032 |
| `R_u_F07_F07` | `Sigma_hf_07` | `u` | `F07` | `F07` | 0.00577876077814032 |
| `R_w_A07_F07` | `Sigma_hf_07` | `w` | `A07` | `F07` | 0.000737515570210068 |
| `R_w_F07_A06` | `Sigma_hf_07` | `w` | `F07` | `A06` | 0.00193040072430017 |
| `R_w_F07_F07` | `Sigma_hf_07` | `w` | `F07` | `F07` | 0.10057650979682 |
| `R_u_A08_F08` | `Sigma_hf_08` | `u` | `A08` | `F08` | 0.00526007644792958 |
| `R_u_A09_F08` | `Sigma_hf_08` | `u` | `A09` | `F08` | 0.00526007644792958 |
| `R_u_A10_F08` | `Sigma_hf_08` | `u` | `A10` | `F08` | 0.00526007644792958 |
| `R_u_A11_F08` | `Sigma_hf_08` | `u` | `A11` | `F08` | 0.00526007644792958 |
| `R_u_A12_F08` | `Sigma_hf_08` | `u` | `A12` | `F08` | 0.00526007644792958 |
| `R_u_F08_A06` | `Sigma_hf_08` | `u` | `F08` | `A06` | 0.00526007644792958 |
| `R_u_F08_A07` | `Sigma_hf_08` | `u` | `F08` | `A07` | 0.00526007644792958 |
| `R_u_F08_F08` | `Sigma_hf_08` | `u` | `F08` | `F08` | 0.00526007644792958 |
| `R_w_A08_F08` | `Sigma_hf_08` | `w` | `A08` | `F08` | 0.00000900769038025828 |
| `R_w_F08_A07` | `Sigma_hf_08` | `w` | `F08` | `A07` | 0.0000600624674196304 |
| `R_w_F08_F08` | `Sigma_hf_08` | `w` | `F08` | `F08` | 0.10040629332013 |
| `R_u_A09_F09` | `Sigma_hf_09` | `u` | `A09` | `F09` | 0.00610744410588993 |
| `R_u_A12_F09` | `Sigma_hf_09` | `u` | `A12` | `F09` | 0.00610744410588993 |
| `R_u_F09_A08` | `Sigma_hf_09` | `u` | `F09` | `A08` | 0.00610744410588993 |
| `R_u_F09_F09` | `Sigma_hf_09` | `u` | `F09` | `F09` | 0.00610744410588993 |
| `R_w_A09_F09` | `Sigma_hf_09` | `w` | `A09` | `F09` | 0.0000246624026001285 |
| `R_w_F09_A08` | `Sigma_hf_09` | `w` | `F09` | `A08` | 0.00391360292810017 |
| `R_w_F09_F09` | `Sigma_hf_09` | `w` | `F09` | `F09` | 0.09945512044315 |
| `R_u_A10_F10` | `Sigma_hf_10` | `u` | `A10` | `F10` | 0.0051307027574099 |
| `R_u_A11_F10` | `Sigma_hf_10` | `u` | `A11` | `F10` | 0.0051307027574099 |
| `R_u_A12_F10` | `Sigma_hf_10` | `u` | `A12` | `F10` | 0.0051307027574099 |
| `R_u_F10_A06` | `Sigma_hf_10` | `u` | `F10` | `A06` | 0.0051307027574099 |
| `R_u_F10_A09` | `Sigma_hf_10` | `u` | `F10` | `A09` | 0.0051307027574099 |
| `R_u_F10_F10` | `Sigma_hf_10` | `u` | `F10` | `F10` | 0.0051307027574099 |
| `R_w_A10_F10` | `Sigma_hf_10` | `w` | `A10` | `F10` | 0.00667570751385949 |
| `R_w_F10_A09` | `Sigma_hf_10` | `w` | `F10` | `A09` | 0.00249636682083043 |
| `R_w_F10_F10` | `Sigma_hf_10` | `w` | `F10` | `F10` | 0.10132973905199 |
| `R_u_A11_F11` | `Sigma_hf_11` | `u` | `A11` | `F11` | 0.00506519107432002 |
| `R_u_A12_F11` | `Sigma_hf_11` | `u` | `A12` | `F11` | 0.00506519107432002 |
| `R_u_F11_A08` | `Sigma_hf_11` | `u` | `F11` | `A08` | 0.00506519107432002 |
| `R_u_F11_A09` | `Sigma_hf_11` | `u` | `F11` | `A09` | 0.00506519107432002 |
| `R_u_F11_A10` | `Sigma_hf_11` | `u` | `F11` | `A10` | 0.00506519107432002 |
| `R_u_F11_F11` | `Sigma_hf_11` | `u` | `F11` | `F11` | 0.00506519107432002 |
| `R_w_A11_F11` | `Sigma_hf_11` | `w` | `A11` | `F11` | 0.0000274782536200391 |
| `R_w_F11_A10` | `Sigma_hf_11` | `w` | `F11` | `A10` | 0.0023754214883196 |
| `R_w_F11_F11` | `Sigma_hf_11` | `w` | `F11` | `F11` | 0.101580902696059 |
| `R_u_A12_F12` | `Sigma_hf_12` | `u` | `A12` | `F12` | 0.00541270191174981 |
| `R_u_F12_A06` | `Sigma_hf_12` | `u` | `F12` | `A06` | 0.00541270191174981 |
| `R_u_F12_A09` | `Sigma_hf_12` | `u` | `F12` | `A09` | 0.00414962769275018 |
| `R_u_F12_A10` | `Sigma_hf_12` | `u` | `F12` | `A10` | 0.00202716290388061 |
| `R_u_F12_A11` | `Sigma_hf_12` | `u` | `F12` | `A11` | 0.00541270191174981 |
| `R_u_F12_F12` | `Sigma_hf_12` | `u` | `F12` | `F12` | 0.00541270191174981 |
| `R_w_A12_F12` | `Sigma_hf_12` | `w` | `A12` | `F12` | 0.000518106762580572 |
| `R_w_F12_A11` | `Sigma_hf_12` | `w` | `F12` | `A11` | 0.0000104749772500412 |
| `R_w_F12_F12` | `Sigma_hf_12` | `w` | `F12` | `F12` | 0.100475109483861 |

## Required Same-Packet Fields

- higher-fold packet identity refs to phi_cyc, mesh, input screen, proof-interval ledger, and root-count certificate.
- same-packet fold-layer atlas rows for Sigma_hf_01 through Sigma_hf_12.
- theta_center, t_center, theta_range, t_range, ledger, and layer radii for each separator layer.
- alpha_floor > 0 and exit_floor > 0 for each higher-fold separator layer.
- fold-layer parity data: delta root count, signed degree, local even jump, and parity status.
- mollifier proof or direct quadrature route under the higher-fold packet identity.
- Gamma/g coupling certification under the higher-fold packet identity.
- per-row support coverage and finite fold impulse bound or direct fold-row action bound.
- parent-complement consumption rule after accepted fold-layer rows are removed.

## Template-Only Reuse

The older fold-layer packets may be reused only as templates:
`fold_layer_burden.fresh-same-packet-fold-shear-seed-v0.json`, `fold_layer_burden_report.fresh-same-packet-fold-shear-seed-v0.md`, `fold_layer_atlas.json`, `fold_full_interval_constants_certificate.json`, `fold_full_interval_fallback_legality.md`. They are
not higher-fold same-packet evidence and do not consume the rows above.

## Consumption Rule

Each row above may become `fold_layer` only after the higher-fold same-packet
fields are accepted. No row above may be rewritten as `simple_root`, and no
branch-sum residual may be routed through a separator layer.

## Capture Decision

Priority-only. This atlas sharpens the remaining v6 burden: the 42 regular
parent-complement rows need a new source-cover/parent-complement theorem or
candidate change, the 8 periodic endpoint/complement rows need endpoint
ownership, and the 112 rows above need higher-fold same-packet fold-layer
certification.
