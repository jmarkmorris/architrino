# Matched-Pair Enclosure, Stage 1 Preparation, Version 3: Retained Proof Fields

Version 3 disposes finding R1-2 of the [independent version 2 review](matched-pair-review-stage-1-v2-2026-10-11.md). It changes how a supplied group certificate is checked against a fresh certification, and nothing else. [Version 1](matched-pair-stage-1-preparation.md) and [version 2](matched-pair-stage-1-preparation-v2.md) remain frozen with their sources and outputs. As before, the implementation exists only as new files and a guarded patch, built and run in a scratch copy of the frozen baseline. **No existing production file has been changed and nothing here is an integrated or accepted solver capability.** All numerical instances use $c_f=1$.

## 1. The finding

A group certificate retains the evidence behind its interval: the distance floor, the speed, separation, relative-speed and acceleration bounds, both hulls, each member's residual and segment, the prefactor, radius, slice, threshold and width. Version 2's complete-matrix check certified each group afresh but compared only the status, interval, width and window coverage. The reviewer's probe set the retained separation bound to zero and left the genuine interval untouched. The reconstruction still certified, although the true separation is $1/100$. The acceleration interval was valid throughout; what failed is the integrity of the retained record, which a later reader or auditor would take as proved. Version 2's statement that the complete-matrix boundary bound "everything" was too broad.

## 2. The correction

**At the complete matrix, every retained field must equal the fresh one.** After the ownership test, each group is certified afresh from the two member requests' own histories and scalar tokens, exactly as in version 2. The supplied certificate is then compared with the fresh one field by field: identities and fingerprints, both members' complete evidence, the event and scalar tokens, window coverage, source count, status and failure code, both hulls, all six whole-slab bounds including the transmitter-factor floor, the prefactor, radius, slice, threshold, width and interval. Doubles and interval endpoints are compared exactly. The first differing field is named in the refusal. The rule is one comparison over the whole record; no field is treated specially. A supplied certificate is therefore accepted only when it is identical to what the certifying function produces from the actual inputs, so none of its fields is taken on its own word.

**The declared window is bound to the root markers.** The window start and end are the caller's declared inputs to the fresh certification, so equality with the fresh certificate cannot test them. The reconstruction now requires them to equal the searched interval recorded on both members' root markers.

**At a single request, the record must be internally consistent, exactly.** One request carries one member's history, so the bounds cannot be re-derived there. Version 2 required the stored interval to contain a radius recomputed from the recorded bounds. Version 3 requires equality throughout: the recomputed slice and threshold must equal the recorded ones, the recomputed prefactor and radius must equal the recorded ones, the interval must be exactly the symmetric interval of that radius, and the recorded width must be that interval's width. A false separation bound with the genuine interval now fails here too, because the recorded bounds no longer reproduce the recorded radius.

**What the single-request check still cannot see** is stated plainly: retained fields that do not enter the radius, namely the two hulls, the residuals, the segment and history-start records and the fingerprints of the other member, and a set of bounds altered in a mutually compensating way that leaves the radius unchanged. Those are verified only by the complete-matrix comparison. The far-field fraction remains a declared input bound by the snapshot's receiver-total test against the request's own fraction.

**Claim grade: derived** for the complete-matrix rule: the certifying function is deterministic, so a supplied certificate equal in every field to a fresh certification from the actual inputs has no retained field that differs from what those inputs prove. Falsifier: a request matrix accepted by the reconstruction whose supplied certificate differs in any retained field from `certify_matched_pair_enclosure` evaluated on that matrix's own histories and tokens.

## 3. Results

The scratch tree is the read-only baseline snapshot plus the three new files plus the guarded patch, built Release with two workers under the compute supervisor with no warning or error.

**The reviewer's instruments, unchanged, rerun by the implementer.** The frozen consumer harness, SHA-256 `0434d6a128b7e2672aab1def240bedb6001de31d67447dac0e26e2bf74513c14`, passes its known control and reports both changed-scalar targets and the changed budget refused. The reviewer's matrix probe, SHA-256 `17f4bda8875fc481c289bb49d9f193345f50122dd066a12f0007e5437ac3191d`, passes its known nine-slot control with the exact static receiver vector contained, and then reports all fourteen targets refused, including `false_separation_metadata_unchanged_interval`, the R1-2 target that version 2 accepted. Both were compiled with the reviewer's stated flags against the version 3 scratch headers and library. These are the implementer's reruns; the reviewer's own are the closure evidence.

**Retained-field sweep.** After the unchanged request matrix reproduces the snapshot's receiver totals bit for bit, thirty-seven matrices each falsify exactly one retained field of the genuine certificate and leave the interval unchanged, except the one that falsifies the interval itself. All thirty-seven are refused, and thirty-four of the refusals name the falsified field itself. The three exceptions are the window start and the window end, both refused because the window differs from the root markers, and the far-field fraction, refused at the slice it changes. The fields covered are the six whole-slab bounds, the prefactor, radius, slice, threshold and width; both hulls; both members' window residuals, a prefix residual, a segment index, a segment start, a segment end and a history start; a member fingerprint and the receiver fingerprint; window coverage, source count, the fraction, the tolerance, coupling, receiver charge, wake speed and a member charge; the window start and end, the reception token, the group identity, the failure code, a member disposition and the interval.

**Other matrix and single-request controls.** The nine version 2 matrix mutations are again refused, now naming the differing field. Thirty-six single-request mutations are refused after the genuine certificate is accepted for leader, follower and equivalent token forms; ten of them are new and each falsifies one recorded bound, prefactor, radius, width or slice with the interval unchanged.

**Everything earlier, rerun.** With the policy disabled, the native, acceleration and evolution `all` outputs are byte-identical to the frozen baseline by `cmp`, and the dispersal output equal on every non-timing field. Module controls: 28 certificates, 9 enclosed, 1 absent, 18 declined. The 45 snapshot cases and 16 reviewer-input cases complete. The evolution guard refuses. The author's consistency instrument passes its known cases and eighteen further checks.

**No superseding snapshot output.** The version 3 snapshot output and reviewer-input output are byte-identical to version 2's by `cmp`, so the reviewer's containment comparison on the version 2 output applies to these bytes unchanged.

**Claim grade: measured**, by the named fixture commands over the retained version 3 outputs, with the shared-environment interpreter `"${AAA_VENV:-../.venv}/bin/python"` for every Python step. The sweep and mutation controls are the implementer's and are development evidence.

## 4. Identities and retention

| Item | Location and identity |
| --- | --- |
| Version 3 sources, patch, consistency instrument and diff | `.local-data/eom-matched-pair/2026-10-11/stage1-prepared-source-v3/`, read-only; SHA-256 list `stage1-prepared-source-v3.sha256` |
| Version 3 outputs | `stage1-scratch-outputs-v3/`; SHA-256 list `stage1-scratch-output-v3-identities.sha256` |
| Version 3 binaries, including both rebuilt reviewer instruments | SHA-256 list `stage1-scratch-binary-v3-identities.sha256` |
| Build log | `stage1-v3-scratch-build.log` |
| Versions 1 and 2, frozen | all five and all six manifest entries verify by `shasum -a 256 -c` |

At 2026-10-11T20:57Z the live solver source still hashed equal to the Stage 0 inventory, and the version 3 patch's check mode reported every preimage unique against the live checkout while writing nothing.

## 5. What is established and what is open

Established in scratch: a supplied group certificate is accepted by the reconstruction only when every retained field equals a fresh certification from the actual inputs; a single request refuses any record whose bounds, prefactor, radius, interval, width, slice and threshold are not exactly consistent with one another and with the request's scalars; and the reviewer's R1-2 target is refused.

Open: the reviewer's own reruns; the remainder of the Stage 1 review; the operator's direct authorization for this session to edit existing shared files, which has not been received; application of the patch to the live checkout and its rebuild and rerun there; the shared far-field contract correction; and all of Stages 2 and 3.
