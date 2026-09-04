# EQ-12 Theta-Gamma CERN Record 6005 Retained-Evidence Intake Manifest

## Status

- Kind: `priority`
- Schema target: `aaa-equation-map-eq12-theta-gamma-packet-retained-evidence-intake/v1`
- Source lead: CERN Open Data CMS DoublePhoton AOD record 6005
- Rows served: `EQ-12` parent `theta_gamma_packet` and shared $\Theta_\gamma(W;E,R)$ consumers
- Claim level: source-acquisition manifest with a Verification incomplete outcome; not accepted retained evidence
- Score disposition: no score changes

This manifest narrows the first source-acquisition object for [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md). It records the smallest retained-evidence intake object that could make CERN Open Data record 6005 checker-consumable after a local mirror and extraction pass. It does not mark `theta_gamma_packet` or any child row accepted, and it does not replace the photon packet checker.

## Source Lead

| Field | Required value or status |
| --- | --- |
| `source_family` | `cern_open_data_cms_doublephoton_aod` |
| `cern_record_id` | `6005` |
| `source_url` | `https://opendata.cern.ch/record/6005` |
| `doi` | `10.7483/OPENDATA.CMS.CEPG.EXLP` |
| `dataset` | `/DoublePhoton/Run2012B-22Jan2013-v1/AOD` |
| `collision_system` | `pp` |
| `collision_energy` | `8 TeV` |
| `run_period` | `Run2012B` |
| `cmssw_release` | `CMSSW_5_3_32` |
| `global_tag` | `FT53_V21A_AN6` |
| `provider_file_count` | `1612` ROOT/AOD files |
| `provider_total_size_bytes` | approximately `6281212898059` |
| `source_claim_level` | durable public source lead only; not retained evidence |

## Selected Artifact Seed

| Field | Required value or status |
| --- | --- |
| `provider_file_key` | `CMS_Run2012B_DoublePhoton_AOD_22Jan2013-v1_20000_file_index.json_0` |
| `provider_filename` | `0013EBD3-FA6C-E211-A1DF-00261894384A.root` |
| `provider_file_id` | `74fd0e45-dbe3-43e7-86bd-bf4956291194` |
| `provider_artifact_url` | `root://eospublic.cern.ch//eos/opendata/cms/Run2012B/DoublePhoton/AOD/22Jan2013-v1/20000/0013EBD3-FA6C-E211-A1DF-00261894384A.root` |
| `provider_size_bytes` | `4236550306` |
| `provider_checksum` | `adler32:6e9d5603` |
| `local_mirror_path` | required before acceptance; must be a repo-approved or operator-approved durable local artifact path, not a temporary path |
| `local_mirror_sha256` | required before acceptance; provider `adler32` is not enough |
| `local_mirror_byte_count` | required before acceptance; must match the mirrored artifact |
| `mirror_access_log` | required before acceptance; must identify acquisition command, timestamp, source URL, byte count, and local hash |
| `current_status` | `blocked_local_mirror_absent` |

## Intake Object Shape

The future intake object must be one JSON-compatible record with schema `aaa-equation-map-eq12-theta-gamma-packet-retained-evidence-intake/v1`. The expected top-level fields are:

| Field | Acceptance requirement |
| --- | --- |
| `schema` | exactly `aaa-equation-map-eq12-theta-gamma-packet-retained-evidence-intake/v1` |
| `claimLevel` | must state source-acquisition or retained-evidence status; cannot claim accepted evidence until every accepted-state gate below passes |
| `scoreDecision` | `no_score_increase` unless the checker later supports score review from accepted retained rows |
| `commonCarrierId` | deterministic id for the selected event/window, for example derived from record id, run, luminosity block, event id, photon object ids, and extraction manifest hash |
| `thetaGammaPacketId` | row id for `theta_gamma_packet`; must equal the checker row identity or be explicitly mapped to it |
| `sourceArtifacts` | CERN record metadata, selected provider artifact, local mirror path, local mirror SHA-256, provider checksum, and local byte count |
| `extractionConfig` | CMSSW release, global tag, container image or exact reader, extraction script hash, photon collection, trigger policy, object selection, calibration/condition inputs, and output manifest hash |
| `eventWindow` | run number, luminosity section, event number, finite-window id, timestamp or event-clock convention when available, and selected photon object ids |
| `sourceEndpoint` | source endpoint id $E$, source object row, source depletion or transition row if available, and source-side provenance |
| `receiverEndpoint` | receiver endpoint id $R$, receiver or detector/coupling row, capture/material handoff row if available, and receiver-side provenance |
| `eventLedger` | energy, momentum, angular-momentum, recoil, wake, medium, remnant, and explicit zero rows where a channel is absent |
| `noetherSeaPath` | Noether sea path id, density/cadence/path response inputs, null/eikonal support, and path-history transfer binding |
| `rowBindings` | row-specific bindings for all required `Theta_gamma` fields listed below |
| `sameRecordBinding` | proof that every accepted row shares `commonCarrierId`, event/window provenance, local artifact hash, extraction manifest hash, and no-hidden-retune witness |
| `sourceProvenance` | DOI, CERN record id, selected artifact id, local mirror hash, extraction environment, script hash, and row-specific source support metadata |
| `noHiddenRetuneWitness` | frozen constants, thresholds, trigger policy, calibration inputs, extraction code hash, local artifact hash, and statement that $h$, $c_\gamma$, transfer factor, detector coupling, and path response were not retuned per observable |
| `acceptedStateGates` | explicit pass/fail gates below; all must pass before any row is accepted |
| `firstFailure` | first compatibility code for a not advanced disposition from the table below |

## Required Row Bindings

| `Theta_gamma` row | Required same-record field binding | Current status |
| --- | --- | --- |
| `theta_gamma_packet` | packet id, finite window $W$, source endpoint $E$, receiver endpoint $R$, `commonCarrierId`, source path, retained status, and local mirror hash | blocked |
| `photon_branch_packet` | photon branch identity, phase/frequency row, packet momentum row, and branch ledger on the selected event/window | blocked |
| `gate_a_kinematics_row` | $E_\gamma=h\nu$, $p_\gamma=h/\lambda_\gamma$, null mass shell, no rest branch, phase-wavelength/geometry separation, and $c_\gamma$ convention from the same extraction | blocked |
| `gate_b_transverse_row` | two-transverse-mode handoff, polarization or helicity basis, analyzer handoff when present, and no accepted free longitudinal photon mode | blocked |
| `gate_c_event_routing_row` | emission, absorption or scattering route, declared out-of-window channels, and receiver/capture route | blocked |
| `emission_source_row` | source endpoint, source depletion or launch cadence, source branch state, and source provenance | blocked |
| `path_history_transfer_row` | path-history propagation, endpoint cadence, path response, and signed frequency-transfer residual | blocked |
| `receiver_coupling_row` | detector/material receiver coupling, capture route, and receiver energy row | blocked |
| `energy_frequency_row` | single $E_\gamma=h\nu$ readout from the selected packet, not a fitted per-observable constant | blocked |
| `null_eikonal_row` | null/eikonal residual on the same packet and Noether sea path state | blocked |
| `helicity_ledger_row` | angular-momentum and polarization ledger tied to Gate B | blocked |
| `event_balance_row` | energy, momentum, and angular-momentum event balance across source, photon, receiver, recoil, wake, medium, and remnant terms | blocked |
| `source_depletion_row` | source-side depletion or transition row with explicit remnant accounting | blocked |
| `recoil_wake_remnant_row` | recoil, wake, medium update, remnant rows, and explicit zero rows where absent | blocked |
| `noether_sea_path_row` | Noether sea density/cadence/path response used by photon path and null/eikonal checks | blocked |
| `source_provenance` | row-specific source support metadata, DOI, selected artifact, local mirror hash, extraction config, and output manifest hash | blocked |
| `no_hidden_retune_witness` | one frozen extraction and constant-choice witness for all rows | blocked |

## Accepted-State Gates

| Gate | Required pass condition | First failure code |
| --- | --- | --- |
| Mirror gate | Selected CERN artifact exists at an approved durable local path with local SHA-256 and byte count. | `blocked_local_mirror_absent` |
| Extraction environment gate | CMSSW/container or equivalent AOD reader is recorded with release, global tag, executable/script hash, and no temporary-only dependency. | `blocked_extraction_tool_absent` |
| Event/window gate | One run/luminosity/event window and photon object pair are selected from the mirrored artifact. | `blocked_event_window_unselected` |
| Endpoint gate | Source endpoint $E$ and receiver endpoint $R$ are bound to rows on the selected event/window. | `blocked_source_receiver_endpoint_binding_absent` |
| Event ledger gate | Energy, momentum, angular-momentum, recoil, wake, medium, and remnant rows are emitted or explicitly zeroed on the same `commonCarrierId`. | `blocked_event_ledger_absent` |
| Noether sea path gate | Noether sea path id, path-history transfer, and null/eikonal support rows bind to the selected packet. | `blocked_noether_sea_path_absent` |
| Same-record gate | Every accepted row shares `commonCarrierId`, local mirror hash, extraction manifest hash, event/window id, source provenance, and no-hidden-retune witness. | `blocked_same_record_binding_absent` |
| Retune gate | One no-hidden-retune witness freezes constants, thresholds, trigger policy, calibration inputs, path response, and detector coupling. | `blocked_no_hidden_retune_witness_absent` |
| Source support gate | Checker-visible row-specific metadata names `EQ-12`, `theta_gamma_packet`, exact row id, exact carrier id, `source_provenance`, artifact hash, and no-hidden-retune support. | `blocked_theta_gamma_source_metadata_absent` |

## Non-Accepting Evidence Classes

These inputs remain non-authorizing for `theta_gamma_packet` and every child row:

- raw CERN URLs without a mirrored local artifact and local hash;
- provider checksums alone, including `adler32:6e9d5603`;
- whole-dataset references without selected run/luminosity/event/window rows;
- generic ROOT files without extraction config, local hash, selected event/window, and row-specific bindings;
- priority prose, authored AAA prose, source-mining notes, generated files, source shells, attempts, probes, controls, mocks, toys, temporary paths, and arbitrary local files;
- synthetic `commonCarrierId`, synthetic source/receiver endpoints, synthetic Noether sea path rows, synthetic provenance, and synthetic no-hidden-retune witnesses;
- downstream consumer rows for `theta_bb`, `theta_alpha`, `EQ-12A`, or `EQ-28A` used as substitutes for the parent $\Theta_\gamma(W;E,R)$ carrier.

## Negative-Control References

| Negative control class | Expected failure |
| --- | --- |
| `photon_packet_transfer_priority_source_negative_control` | priority packet or source shell remains `missing_accepted_theta_gamma_packet` |
| `raw_url_source_not_mirrored` | raw CERN URL remains non-accepting until local mirror path and local SHA-256 exist |
| `generic_source_file_not_evidence` | generic in-repo or local files remain non-accepting without row-specific `Theta_gamma` metadata |
| `provider_checksum_only` | provider `adler32` remains source provenance only, not a local retained artifact hash |
| `whole_dataset_reference` | record-level DOI or dataset id remains non-accepting without selected event/window rows |
| `split_packet_carrier` | rows with different `commonCarrierId` values remain non-accepting |
| `solved_wave_import_without_native_packet` | wave-equation or eikonal comparisons remain tests only, not photon packet ontology |
| `source_free_frequency_loss` | frequency-transfer rows without source/path/receiver provenance remain non-accepting |

## Current First Failure

`blocked_local_mirror_absent` is the first failure. The next executable source-acquisition object is a non-write-mode mirror and extraction plan that can create:

1. a durable local mirror record for one CERN 6005 ROOT/AOD artifact;
2. a local SHA-256 hash and byte count for that artifact;
3. a frozen CMSSW/global-tag/extraction configuration;
4. a selected run/luminosity/event finite window and photon object pair;
5. row-specific bindings for $\Theta_\gamma(W;E,R)$, source/receiver endpoints, event ledger, Noether sea path, source provenance, and no-hidden-retune witness.

Until those objects exist, this manifest remains source-acquisition material only. No accepted retained evidence, accepted transition source, retained action-period evidence, same-record photon packet evidence, retained record binding, or score movement follows from this file.
