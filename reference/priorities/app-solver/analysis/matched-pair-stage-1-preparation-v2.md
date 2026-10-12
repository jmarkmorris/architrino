# Matched-Pair Enclosure, Stage 1 Preparation, Version 2: Consumer Input Binding

Version 2 corrects the blocking defect R1-1 found by the [independent Stage 1 review](matched-pair-review-stage-1-2026-10-11.md). It supersedes the consumer of the [version 1 packet](matched-pair-stage-1-preparation.md), whose sources and outputs remain frozen and unchanged. Everything else in version 1 stands and is not repeated: the pairing rule, the bounds, the member-prefix re-proof, the accounting and the two observations about applicability. As before, the implementation exists only as new files and a guarded patch, built and run in a scratch copy of the frozen baseline. **No existing production file has been changed and nothing here is an integrated or accepted solver capability.** All numerical instances use $c_f=1$.

## 1. The defect

A group certificate encloses one specific quantity: the two-source acceleration for a particular receiver charge, coupling, pair of source charges, wake speed and pair of histories. The version 1 consumer checked identities, history fingerprints, the reception event and the width, and nothing else. The reviewer's harness presented a genuine certificate with the request's coupling changed from one to two, and then with the receiver charge changed from one to two. The consumer accepted the old interval in both cases, although the requested quantity, $640000000/15999992000001\approx4.0\times10^{-5}$, lies outside the certified radius of about $2.0\times10^{-5}$. The certificate also did not record the receiver charge or the coupling it was derived for, so the mismatch could not have been detected from it.

The defect was in the consumer boundary, not in the radius or the theorem. The snapshot route always consumed a certificate with the tokens it was certified for, so the version 1 snapshot outputs were not affected; the gap was that nothing enforced this.

## 2. The correction

**The certificate now records its mathematical inputs.** Besides the two source charge tokens it already carried, it records the receiver charge, the coupling, the wake speed, the far-field fraction and the acceleration tolerance as the tokens used to certify it.

**Each member request is rechecked against them.** Before a group's interval is used for one request, the consumer compares the request's receiver charge, source charge, coupling and tolerance, and the wake speed of the request's root marker, with the certified tokens. The comparison is on exact decimals, so `1`, `1.0` and `+1e0` are equal and nothing else is. It confirms that the two certified source charges are an exact opposite nonzero pair and that the wake speed is exactly one. It recomputes the two-slice threshold from the certified fraction, tolerance and source count and requires equality with the recorded threshold. For a present group it recomputes the radius from the recorded whole-slab bounds and the requested scalars and requires the stored interval to contain that recomputed enclosure and to fit the threshold; for an absent group it requires the point-zero interval and a zero debit. Any difference refuses the request. A changed scalar therefore needs a fresh certificate and can never relabel an old interval.

**The complete matrix re-certifies each group.** The per-request recheck trusts the bounds recorded in the certificate, because one request carries only one member's history. The acceleration reconstruction sees both member requests, so it does more: after verifying that each group is referenced exactly once as leader and once as follower through one certificate object, it certifies the group afresh from the two requests' own histories, charges, coupling, tolerance and wake speed and from the reconstruction's own path count, and requires the fresh result to reproduce the supplied status, interval, width and window coverage exactly. A certificate whose recorded bounds were falsified consistently with a narrowed interval passes the per-request recheck and fails here. Only the window start and the far-field fraction are still taken from the certificate, because the reconstruction's inputs do not carry them; the snapshot's existing receiver-total test against the request's own fraction and tolerance bounds what a falsified fraction could admit.

**Claim grade: derived** for the sufficiency of the complete-matrix check: the certifying function is deterministic in its inputs, so equality of a fresh certification from the actual request inputs with the supplied certificate means the supplied interval is the enclosure of the requested quantity under the reviewed theorem. Falsifier: a request matrix accepted by the reconstruction whose group interval differs from what `certify_matched_pair_enclosure` returns for that matrix's own histories and tokens.

## 3. Results

The scratch tree is again the read-only baseline snapshot plus the three new files plus the guarded patch, built Release with two workers under the compute supervisor with no warning or error.

**Reviewer's harness, unchanged.** [The frozen harness](../evidence/matched-pair-review-consumer-binding.cpp), SHA-256 `0434d6a128b7e2672aab1def240bedb6001de31d67447dac0e26e2bf74513c14`, was compiled with the reviewer's stated flags against the version 2 scratch headers and library. Its known control passes first, the genuine group being accepted with the static pair value contained. Both changed-input targets are now refused: `changed_coupling` and `changed_receiver_charge` report `accepted: false`. The changed-budget target is refused as before. This is the implementer's rerun of the reviewer's instrument; the reviewer's own rerun is the closure evidence.

**Per-request mutation controls.** After the genuine certificate is accepted for the leader, for the follower and for equivalent token forms, twenty-six single changes are each refused with a specific reason. Thirteen change the request: a foreign member, a wrong member history, a wrong receiver history, a wrong reception time, coupling doubled, coupling sign reversed, receiver charge doubled, member charge doubled, member charge sign reversed, wake speed changed, tolerance tightened, tolerance loosened, and an invalid token. Thirteen change the certificate: status, a widened interval, a narrowed interval, the certified coupling, the certified receiver charge, same-sign member charges, a smaller distance floor, a larger separation, the threshold, the fraction, the source count, the window coverage, and a present group relabelled absent.

**Complete-matrix controls.** A certified three-path snapshot supplies genuine root rows and one genuine group. The request matrix rebuilt from them is first passed unchanged, and the reconstruction returns receiver totals bit-identical to the snapshot's. Nine changes follow, and none is certified: coupling two everywhere, receiver charge two, and a replaced follower history are refused because the group does not reproduce; consistently forged bounds with a narrowed interval, and a present group relabelled absent, are refused for the same reason; a follower pointing at a duplicate certificate object, a missing follower reference and a certificate attached to an exact request are refused as ownership violations; a loosened member tolerance leaves both member requests uncertified.

**Everything from version 1, rerun.** With the policy disabled, the native, acceleration and evolution `all` outputs are again byte-identical to the frozen baseline by `cmp`, and the dispersal output equal on every non-timing field. The module controls again give 28 certificates: 9 enclosed, 1 absent, 18 declined. The 45 snapshot cases and the 16 cases from the reviewer's input fields run to completion with the same dispositions. The evolution guard refuses as before. The author's consistency instrument passes its known cases and then eighteen further checks.

**Claim grade: measured**, by the named fixture commands over the retained version 2 outputs. The consistency instrument and the mutation controls are the implementer's and are development evidence.

**Superseded output.** The certificate now prints its scalar tokens, so the version 2 output for the reviewer's input cases has a new identity, SHA-256 `fe8a51f3d4ba7688bbb574f2be48c55fb2ff1f0cfbc023827c8c29b2477857a8`. The reviewer's containment comparison was bound to the version 1 output and needs to be repeated on this one before it is cited for version 2. A field-by-field comparison of the version 1 and version 2 outputs, for both the 16 reviewer-input cases and the 45 snapshot cases, finds every receiver total identical and no difference of any kind other than the five token fields added to each group certificate. That comparison is the implementer's, made with the shared-environment interpreter, and is for the reviewer to confirm.

## 4. Interpreter provenance

Every `python3` command in the Stage 0 and Stage 1 records resolved to the shared virtual environment: `command -v python3` returns `/Users/markmorris/vibe/.venv/bin/python3`, version 3.13.2, which is the repository-adjacent `../.venv`, and `AAA_VENV` is unset in this session. No system interpreter was used. From this record on, Python receipts name the interpreter as `"${AAA_VENV:-../.venv}/bin/python"`; the version 2 patch check, consistency check and summaries were run that way.

## 5. Identities and retention

| Item | Location and identity |
| --- | --- |
| Version 2 sources, patch, consistency instrument and diff | `.local-data/eom-matched-pair/2026-10-11/stage1-prepared-source-v2/`, read-only; SHA-256 list `stage1-prepared-source-v2.sha256` |
| Version 2 outputs | `stage1-scratch-outputs-v2/`; SHA-256 list `stage1-scratch-output-v2-identities.sha256` |
| Version 2 binaries, including the rebuilt reviewer harness | SHA-256 list `stage1-scratch-binary-v2-identities.sha256` |
| Build log | `stage1-v2-scratch-build.log` |
| Version 1, frozen | `stage1-prepared-source/` and `stage1-scratch-outputs/`, unchanged |

At 2026-10-11T20:43Z the live solver source still hashed equal to the Stage 0 inventory, and the version 2 patch's check mode reported every preimage unique against the live checkout while writing nothing.

## 6. What is established and what is open

Established in scratch: a group's interval can be consumed only for the receiver charge, source charges, coupling, wake speed, tolerance, histories and path count it was certified for, at the single-request boundary for scalars and at the complete-matrix boundary for everything; the reviewer's two failing targets are refused; and nothing in the disabled route or the version 1 controls changed.

Open: the reviewer's own rerun and the repeated containment comparison on the version 2 output; the remainder of the Stage 1 review; the operator's direct authorization for this session to edit existing shared files; application of the patch to the live checkout; the shared far-field contract correction; and all of Stages 2 and 3.
