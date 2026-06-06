# Higher-Fold Layer Same-Packet Field Readiness Classifier

Packet: `fresh-v10-higher-fold-12-root-rebuild-v0`

Status: `higher_fold_layer_same_packet_field_readiness_classifier_fail_closed_no_row_consumption`

Claim level: priority-only same-packet field readiness classifier for the 112 higher-fold fold-layer rows; no accepted fold-layer rows, no row consumption, no live-ledger update

## Blocker Sharpened

This classifier isolates the 112 proof-interval v6 higher-fold fold-layer rows
over 12 separator layers. The row set is mechanical: it is the
`trig_range_overlap_touches_fold_layer_candidate` family already recorded by the fold-layer burden atlas
and the row-family classifier.

The result is fail-closed. The same-packet packet-identity artifacts are
present, and the root-tube interval certificate remains available as source
evidence, but the row-acceptance fields are absent: 0 / 112 rows have a
`higher_fold_layer_atlas_ref`, `alpha_floor`, `exit_floor`,
`same_packet_fold_impulse_or_direct_quadrature_bound`,
`fold_layer_parity_record`, or `parent_complement_consumption_ref`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
| `higher_fold_proof_interval_v6_ledger` | `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `0d774bb9e3e664d6749ef120a5805a4eeef7b19fdf412432201ea49a2b96f4a5` |
| `preledger_row_family_classifier` | `preledger_row_family_classifier.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json` | true | `e28c017b4fd8a16ed5eb4c1be765c0a99288a60db1b54c88df501ac5e2e84e0b` |
| `fold_layer_burden_atlas` | `fold_layer_burden.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true | `da59d44487f227ab01170459c660fb0cc92e9b8d9a9b894ba8a4c881af015e62` |
| `fold_layer_burden_report` | `fold_layer_burden_report.fresh-v10-higher-fold-12-root-rebuild-v0.md` | true | `d7251b07f178bd606f854ee4b0f3c229e2f76d2b83dabf680daf690747fedced` |
| `phi_cyc` | `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true | `a731d57f5b5cfd1b3992c54dc0b989aed59c636e01e667dcc3ff15c7a160f8dd` |
| `mesh` | `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true | `807ef730a80d0a8568d9e8fe09123ea8ddd3880630443ebd16e891b560ca0aee` |
| `causal_preledger_input_screen` | `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.json` | true | `3bdab74a60bc1c54f5fffa56bce2c21d5ec69291b953c723825cde99c45ae3ec` |
| `higher_fold_root_tube_audit` | `fresh_v10_higher_fold_root_tube_certificate.v0.json` | true | `d4227cbf19e631e88e4e08b13bf2f99de6bd926ca91d9485ec6a8a20864746d1` |
| `higher_fold_root_tube_interval_certificate` | `fresh_v10_higher_fold_root_tube_interval_certificate.v0.json` | true | `1a69d9ad8da4df4fbf63e2bef706da62b878bf86be22a1c1c9805bbc487eb365` |
| `proof_interval_backend_certificate` | `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json` | true | `f24318dcd26ad10e851e7e6139aa54563aa3210a27e52e3c4da7d7dd85ef6891` |

## Separator Counts

| Separator | Rows |
| --- | ---: |
| `Sigma_hf_01` | 11 |
| `Sigma_hf_02` | 11 |
| `Sigma_hf_03` | 7 |
| `Sigma_hf_04` | 9 |
| `Sigma_hf_05` | 9 |
| `Sigma_hf_06` | 9 |
| `Sigma_hf_07` | 11 |
| `Sigma_hf_08` | 11 |
| `Sigma_hf_09` | 7 |
| `Sigma_hf_10` | 9 |
| `Sigma_hf_11` | 9 |
| `Sigma_hf_12` | 9 |

## Field Readiness

| Same-packet field | Present rows | Missing rows |
| --- | ---: | ---: |
| `higher_fold_layer_atlas_ref` | 0 | 112 |
| `alpha_floor` | 0 | 112 |
| `exit_floor` | 0 | 112 |
| `same_packet_fold_impulse_or_direct_quadrature_bound` | 0 | 112 |
| `fold_layer_parity_record` | 0 | 112 |
| `parent_complement_consumption_ref` | 0 | 112 |

## Guard Fields

| Guard field | Present rows | Missing rows |
| --- | ---: | ---: |
| `row_may_become_fold_layer` | 112 | 0 |
| `row_must_not_become_simple_root` | 112 | 0 |
| `row_consumption_authorized` | 0 | 112 |
| `branch_chart_authorized` | 0 | 112 |

## Interval-Type Counts

| Interval-type pair | Rows |
| --- | ---: |
| `fold_layer_candidate -> fold_layer_candidate` | 24 |
| `fold_layer_candidate -> regular` | 38 |
| `regular -> fold_layer_candidate` | 50 |

## Row Classifier

| Row | Separator | Ledger | Receiver | Source | Interval-type pair | Diagnostic overlap width | First missing same-packet field | Row consumed |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| `R_u_A01_F01` | `Sigma_hf_01` | `u` | `A01` | `F01` | `regular -> fold_layer_candidate` | 0.000737515570209846 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F01_A00` | `Sigma_hf_01` | `u` | `F01` | `A00` | `fold_layer_candidate -> regular` | 0.000345752777769937 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F01_F01` | `Sigma_hf_01` | `u` | `F01` | `F01` | `fold_layer_candidate -> fold_layer_candidate` | 0.10057650979682 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A01_F01` | `Sigma_hf_01` | `w` | `A01` | `F01` | `regular -> fold_layer_candidate` | 0.00577876077814987 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A02_F01` | `Sigma_hf_01` | `w` | `A02` | `F01` | `regular -> fold_layer_candidate` | 0.00577876077814987 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A03_F01` | `Sigma_hf_01` | `w` | `A03` | `F01` | `regular -> fold_layer_candidate` | 0.00577876077814987 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A04_F01` | `Sigma_hf_01` | `w` | `A04` | `F01` | `regular -> fold_layer_candidate` | 0.00577876077814987 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A05_F01` | `Sigma_hf_01` | `w` | `A05` | `F01` | `regular -> fold_layer_candidate` | 0.00577876077814987 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A06_F01` | `Sigma_hf_01` | `w` | `A06` | `F01` | `regular -> fold_layer_candidate` | 0.00577876077814987 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F01_A00` | `Sigma_hf_01` | `w` | `F01` | `A00` | `fold_layer_candidate -> regular` | 0.00344594439738999 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F01_F01` | `Sigma_hf_01` | `w` | `F01` | `F01` | `fold_layer_candidate -> fold_layer_candidate` | 0.00577876077814987 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A02_F02` | `Sigma_hf_02` | `u` | `A02` | `F02` | `regular -> fold_layer_candidate` | 0.00000900769038597593 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F02_A01` | `Sigma_hf_02` | `u` | `F02` | `A01` | `fold_layer_candidate -> regular` | 0.0000600624674139683 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F02_F02` | `Sigma_hf_02` | `u` | `F02` | `F02` | `fold_layer_candidate -> fold_layer_candidate` | 0.10040629332013 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A02_F02` | `Sigma_hf_02` | `w` | `A02` | `F02` | `regular -> fold_layer_candidate` | 0.00526007644793003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A03_F02` | `Sigma_hf_02` | `w` | `A03` | `F02` | `regular -> fold_layer_candidate` | 0.00526007644793003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A04_F02` | `Sigma_hf_02` | `w` | `A04` | `F02` | `regular -> fold_layer_candidate` | 0.00526007644793003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A05_F02` | `Sigma_hf_02` | `w` | `A05` | `F02` | `regular -> fold_layer_candidate` | 0.00526007644793003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A06_F02` | `Sigma_hf_02` | `w` | `A06` | `F02` | `regular -> fold_layer_candidate` | 0.00526007644793003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F02_A01` | `Sigma_hf_02` | `w` | `F02` | `A01` | `fold_layer_candidate -> regular` | 0.00526007644793003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F02_A12` | `Sigma_hf_02` | `w` | `F02` | `A12` | `fold_layer_candidate -> regular` | 0.00526007644793003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F02_F02` | `Sigma_hf_02` | `w` | `F02` | `F02` | `fold_layer_candidate -> fold_layer_candidate` | 0.00526007644793003 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A03_F03` | `Sigma_hf_03` | `u` | `A03` | `F03` | `regular -> fold_layer_candidate` | 0.0000246624026040004 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F03_A02` | `Sigma_hf_03` | `u` | `F03` | `A02` | `fold_layer_candidate -> regular` | 0.003913602928103 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F03_F03` | `Sigma_hf_03` | `u` | `F03` | `F03` | `fold_layer_candidate -> fold_layer_candidate` | 0.099455120443155 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A03_F03` | `Sigma_hf_03` | `w` | `A03` | `F03` | `regular -> fold_layer_candidate` | 0.00610744410589015 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A06_F03` | `Sigma_hf_03` | `w` | `A06` | `F03` | `regular -> fold_layer_candidate` | 0.00610744410589015 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F03_A02` | `Sigma_hf_03` | `w` | `F03` | `A02` | `fold_layer_candidate -> regular` | 0.00610744410589015 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F03_F03` | `Sigma_hf_03` | `w` | `F03` | `F03` | `fold_layer_candidate -> fold_layer_candidate` | 0.00610744410589015 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A04_F04` | `Sigma_hf_04` | `u` | `A04` | `F04` | `regular -> fold_layer_candidate` | 0.00667570751386015 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F04_A03` | `Sigma_hf_04` | `u` | `F04` | `A03` | `fold_layer_candidate -> regular` | 0.00249636682082999 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F04_F04` | `Sigma_hf_04` | `u` | `F04` | `F04` | `fold_layer_candidate -> fold_layer_candidate` | 0.10132973905199 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A04_F04` | `Sigma_hf_04` | `w` | `A04` | `F04` | `regular -> fold_layer_candidate` | 0.00513070275741012 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A05_F04` | `Sigma_hf_04` | `w` | `A05` | `F04` | `regular -> fold_layer_candidate` | 0.00513070275741012 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A06_F04` | `Sigma_hf_04` | `w` | `A06` | `F04` | `regular -> fold_layer_candidate` | 0.00513070275741012 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F04_A03` | `Sigma_hf_04` | `w` | `F04` | `A03` | `fold_layer_candidate -> regular` | 0.00513070275741012 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F04_A12` | `Sigma_hf_04` | `w` | `F04` | `A12` | `fold_layer_candidate -> regular` | 0.00513070275741012 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F04_F04` | `Sigma_hf_04` | `w` | `F04` | `F04` | `fold_layer_candidate -> fold_layer_candidate` | 0.00513070275741012 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A05_F05` | `Sigma_hf_05` | `u` | `A05` | `F05` | `regular -> fold_layer_candidate` | 0.000027478253629809 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F05_A04` | `Sigma_hf_05` | `u` | `F05` | `A04` | `fold_layer_candidate -> regular` | 0.00237542148832004 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F05_F05` | `Sigma_hf_05` | `u` | `F05` | `F05` | `fold_layer_candidate -> fold_layer_candidate` | 0.10158090269606 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A05_F05` | `Sigma_hf_05` | `w` | `A05` | `F05` | `regular -> fold_layer_candidate` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A06_F05` | `Sigma_hf_05` | `w` | `A06` | `F05` | `regular -> fold_layer_candidate` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F05_A02` | `Sigma_hf_05` | `w` | `F05` | `A02` | `fold_layer_candidate -> regular` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F05_A03` | `Sigma_hf_05` | `w` | `F05` | `A03` | `fold_layer_candidate -> regular` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F05_A04` | `Sigma_hf_05` | `w` | `F05` | `A04` | `fold_layer_candidate -> regular` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F05_F05` | `Sigma_hf_05` | `w` | `F05` | `F05` | `fold_layer_candidate -> fold_layer_candidate` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A06_F06` | `Sigma_hf_06` | `u` | `A06` | `F06` | `regular -> fold_layer_candidate` | 0.000612210133719593 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F06_A05` | `Sigma_hf_06` | `u` | `F06` | `A05` | `fold_layer_candidate -> regular` | 0.0000104749772500412 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F06_F06` | `Sigma_hf_06` | `u` | `F06` | `F06` | `fold_layer_candidate -> fold_layer_candidate` | 0.10047510948387 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A06_F06` | `Sigma_hf_06` | `w` | `A06` | `F06` | `regular -> fold_layer_candidate` | 0.00541270191175003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F06_A03` | `Sigma_hf_06` | `w` | `F06` | `A03` | `fold_layer_candidate -> regular` | 0.00414962769274996 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F06_A04` | `Sigma_hf_06` | `w` | `F06` | `A04` | `fold_layer_candidate -> regular` | 0.00202716290387994 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F06_A05` | `Sigma_hf_06` | `w` | `F06` | `A05` | `fold_layer_candidate -> regular` | 0.00541270191175003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F06_A12` | `Sigma_hf_06` | `w` | `F06` | `A12` | `fold_layer_candidate -> regular` | 0.00541270191175003 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F06_F06` | `Sigma_hf_06` | `w` | `F06` | `F06` | `fold_layer_candidate -> fold_layer_candidate` | 0.00541270191175003 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A07_F07` | `Sigma_hf_07` | `u` | `A07` | `F07` | `regular -> fold_layer_candidate` | 0.00577876077814032 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A08_F07` | `Sigma_hf_07` | `u` | `A08` | `F07` | `regular -> fold_layer_candidate` | 0.00577876077814032 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A09_F07` | `Sigma_hf_07` | `u` | `A09` | `F07` | `regular -> fold_layer_candidate` | 0.00577876077814032 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A10_F07` | `Sigma_hf_07` | `u` | `A10` | `F07` | `regular -> fold_layer_candidate` | 0.00577876077814032 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A11_F07` | `Sigma_hf_07` | `u` | `A11` | `F07` | `regular -> fold_layer_candidate` | 0.00577876077814032 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A12_F07` | `Sigma_hf_07` | `u` | `A12` | `F07` | `regular -> fold_layer_candidate` | 0.00577876077814032 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F07_A06` | `Sigma_hf_07` | `u` | `F07` | `A06` | `fold_layer_candidate -> regular` | 0.00577876077814032 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F07_F07` | `Sigma_hf_07` | `u` | `F07` | `F07` | `fold_layer_candidate -> fold_layer_candidate` | 0.00577876077814032 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A07_F07` | `Sigma_hf_07` | `w` | `A07` | `F07` | `regular -> fold_layer_candidate` | 0.000737515570210068 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F07_A06` | `Sigma_hf_07` | `w` | `F07` | `A06` | `fold_layer_candidate -> regular` | 0.00193040072430017 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F07_F07` | `Sigma_hf_07` | `w` | `F07` | `F07` | `fold_layer_candidate -> fold_layer_candidate` | 0.10057650979682 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A08_F08` | `Sigma_hf_08` | `u` | `A08` | `F08` | `regular -> fold_layer_candidate` | 0.00526007644792958 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A09_F08` | `Sigma_hf_08` | `u` | `A09` | `F08` | `regular -> fold_layer_candidate` | 0.00526007644792958 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A10_F08` | `Sigma_hf_08` | `u` | `A10` | `F08` | `regular -> fold_layer_candidate` | 0.00526007644792958 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A11_F08` | `Sigma_hf_08` | `u` | `A11` | `F08` | `regular -> fold_layer_candidate` | 0.00526007644792958 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A12_F08` | `Sigma_hf_08` | `u` | `A12` | `F08` | `regular -> fold_layer_candidate` | 0.00526007644792958 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F08_A06` | `Sigma_hf_08` | `u` | `F08` | `A06` | `fold_layer_candidate -> regular` | 0.00526007644792958 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F08_A07` | `Sigma_hf_08` | `u` | `F08` | `A07` | `fold_layer_candidate -> regular` | 0.00526007644792958 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F08_F08` | `Sigma_hf_08` | `u` | `F08` | `F08` | `fold_layer_candidate -> fold_layer_candidate` | 0.00526007644792958 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A08_F08` | `Sigma_hf_08` | `w` | `A08` | `F08` | `regular -> fold_layer_candidate` | 0.00000900769038025828 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F08_A07` | `Sigma_hf_08` | `w` | `F08` | `A07` | `fold_layer_candidate -> regular` | 0.0000600624674196304 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F08_F08` | `Sigma_hf_08` | `w` | `F08` | `F08` | `fold_layer_candidate -> fold_layer_candidate` | 0.10040629332013 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A09_F09` | `Sigma_hf_09` | `u` | `A09` | `F09` | `regular -> fold_layer_candidate` | 0.00610744410588993 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A12_F09` | `Sigma_hf_09` | `u` | `A12` | `F09` | `regular -> fold_layer_candidate` | 0.00610744410588993 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F09_A08` | `Sigma_hf_09` | `u` | `F09` | `A08` | `fold_layer_candidate -> regular` | 0.00610744410588993 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F09_F09` | `Sigma_hf_09` | `u` | `F09` | `F09` | `fold_layer_candidate -> fold_layer_candidate` | 0.00610744410588993 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A09_F09` | `Sigma_hf_09` | `w` | `A09` | `F09` | `regular -> fold_layer_candidate` | 0.0000246624026001285 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F09_A08` | `Sigma_hf_09` | `w` | `F09` | `A08` | `fold_layer_candidate -> regular` | 0.00391360292810017 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F09_F09` | `Sigma_hf_09` | `w` | `F09` | `F09` | `fold_layer_candidate -> fold_layer_candidate` | 0.09945512044315 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A10_F10` | `Sigma_hf_10` | `u` | `A10` | `F10` | `regular -> fold_layer_candidate` | 0.0051307027574099 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A11_F10` | `Sigma_hf_10` | `u` | `A11` | `F10` | `regular -> fold_layer_candidate` | 0.0051307027574099 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A12_F10` | `Sigma_hf_10` | `u` | `A12` | `F10` | `regular -> fold_layer_candidate` | 0.0051307027574099 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F10_A06` | `Sigma_hf_10` | `u` | `F10` | `A06` | `fold_layer_candidate -> regular` | 0.0051307027574099 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F10_A09` | `Sigma_hf_10` | `u` | `F10` | `A09` | `fold_layer_candidate -> regular` | 0.0051307027574099 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F10_F10` | `Sigma_hf_10` | `u` | `F10` | `F10` | `fold_layer_candidate -> fold_layer_candidate` | 0.0051307027574099 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A10_F10` | `Sigma_hf_10` | `w` | `A10` | `F10` | `regular -> fold_layer_candidate` | 0.00667570751385949 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F10_A09` | `Sigma_hf_10` | `w` | `F10` | `A09` | `fold_layer_candidate -> regular` | 0.00249636682083043 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F10_F10` | `Sigma_hf_10` | `w` | `F10` | `F10` | `fold_layer_candidate -> fold_layer_candidate` | 0.10132973905199 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A11_F11` | `Sigma_hf_11` | `u` | `A11` | `F11` | `regular -> fold_layer_candidate` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A12_F11` | `Sigma_hf_11` | `u` | `A12` | `F11` | `regular -> fold_layer_candidate` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F11_A08` | `Sigma_hf_11` | `u` | `F11` | `A08` | `fold_layer_candidate -> regular` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F11_A09` | `Sigma_hf_11` | `u` | `F11` | `A09` | `fold_layer_candidate -> regular` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F11_A10` | `Sigma_hf_11` | `u` | `F11` | `A10` | `fold_layer_candidate -> regular` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F11_F11` | `Sigma_hf_11` | `u` | `F11` | `F11` | `fold_layer_candidate -> fold_layer_candidate` | 0.00506519107432002 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A11_F11` | `Sigma_hf_11` | `w` | `A11` | `F11` | `regular -> fold_layer_candidate` | 0.0000274782536200391 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F11_A10` | `Sigma_hf_11` | `w` | `F11` | `A10` | `fold_layer_candidate -> regular` | 0.0023754214883196 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F11_F11` | `Sigma_hf_11` | `w` | `F11` | `F11` | `fold_layer_candidate -> fold_layer_candidate` | 0.101580902696059 | `higher_fold_layer_atlas_ref` | false |
| `R_u_A12_F12` | `Sigma_hf_12` | `u` | `A12` | `F12` | `regular -> fold_layer_candidate` | 0.00541270191174981 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F12_A06` | `Sigma_hf_12` | `u` | `F12` | `A06` | `fold_layer_candidate -> regular` | 0.00541270191174981 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F12_A09` | `Sigma_hf_12` | `u` | `F12` | `A09` | `fold_layer_candidate -> regular` | 0.00414962769275018 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F12_A10` | `Sigma_hf_12` | `u` | `F12` | `A10` | `fold_layer_candidate -> regular` | 0.00202716290388061 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F12_A11` | `Sigma_hf_12` | `u` | `F12` | `A11` | `fold_layer_candidate -> regular` | 0.00541270191174981 | `higher_fold_layer_atlas_ref` | false |
| `R_u_F12_F12` | `Sigma_hf_12` | `u` | `F12` | `F12` | `fold_layer_candidate -> fold_layer_candidate` | 0.00541270191174981 | `higher_fold_layer_atlas_ref` | false |
| `R_w_A12_F12` | `Sigma_hf_12` | `w` | `A12` | `F12` | `regular -> fold_layer_candidate` | 0.000518106762580572 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F12_A11` | `Sigma_hf_12` | `w` | `F12` | `A11` | `fold_layer_candidate -> regular` | 0.0000104749772500412 | `higher_fold_layer_atlas_ref` | false |
| `R_w_F12_F12` | `Sigma_hf_12` | `w` | `F12` | `F12` | `fold_layer_candidate -> fold_layer_candidate` | 0.100475109483861 | `higher_fold_layer_atlas_ref` | false |

## Certificate-Side Handoff

Next artifact target: `higher_fold_layer_atlas_ref / alpha_floor / exit_floor / fold_layer_parity_record / same_packet_fold_impulse_or_direct_quadrature_bound / parent_complement_consumption_ref`.

Continuation class: mechanical fold-layer certificate; construct same-packet separator-layer fields for Sigma_hf_01 through Sigma_hf_12 before any fold-layer row can be accepted.

Fail-closed stop conditions:

- Do not consume fold-layer rows from the burden atlas alone.
- Do not rewrite fold-layer candidate rows as simple-root rows.
- Do not treat the root-tube interval certificate as a fold-layer atlas ref, alpha floor, exit floor, parity record, fold impulse bound, direct quadrature bound, or parent-complement consumption ref.
- Do not set preledger_pass, updates_live_ledger, row_consumed, or branch_chart_authorized from this classifier.

## Authorization Lock

- `preledger_pass`: false
- `updates_live_ledger`: false
- `accepted_fold_layer_rows`: 0
- `branch_chart_authorized`: false
- row consumption authorized: false

This artifact is a priority-only readiness classifier. It proves no same-packet
fold-layer acceptance field, no row consumption, no live-ledger update, and no
branch-chart authorization.
