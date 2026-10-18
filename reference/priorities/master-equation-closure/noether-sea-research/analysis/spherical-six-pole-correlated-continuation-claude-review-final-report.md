# Six-pole correlated continuation review: final report

Written 2026-10-14T13:14:31Z by the review role (ramon-e-moore lens), for the operator-selected three-hour campaign (start 11:36:29 UTC; this report is written after the PI's closing instruction, with no further compute).

## 1. Result in plain words

The continuation rebuilt the six-pole history from the accepted step-154 state. Its correlated (affine) form keeps $q$ and $w$ linked instead of boxing them independently. By step 434 its proved boxes are 7 times narrower in $q$ and 19 times narrower in $w$ than the frozen ones. On those boxes, my own instruments prove the signed support's rate $\dot l$ negative at every instant through step 409, prove $\ddot l > 0$ on every step from 374 to 437, and prove $\dot l > 0$ at the step-437 end.

**The FIRST support turn is therefore CERTIFIED.** It is a strict minimum of $l$ with $l < 0$, and it is the only zero of $\dot l$ from step 275 to step 491.
- On my own evaluations, it lies in $t \in (5.956684593623649597167969,\ 6.236684709182828044891357)$.
- With the support's end evaluations (cross-code), it lies in $(5.986684593623649597167969,\ 6.176684709182828044891357)$, that is $T \in (59.8668459, 61.7668471)$.
- There is no second support turn through the step-491 end.
- The path turn is not reached.
- The speed maximum and a radial-acceleration zero are certified, each unique.

Every claim rests on the stored-rate premise, the frozen step instrument and the admitted correlated inclusion. Agreement among the subject, the support and the review shares those premises and records, so it is cross-code agreement, not independent evidence.

## 2. Adjudications and references (all in `analysis/`, prefix `spherical-six-pole-correlated-continuation-claude-review-`)

| file | sha256 | ruling in one line |
|---|---|---|
| [reference](spherical-six-pole-correlated-continuation-claude-review-reference.md) | bca8dedec0cc8458cf40378cb6dda77b0ac790693d4f72959076ef75dd0b0d1b | my inclusion theorem, chart duties, centred evaluator, first-turn condition (frozen at 11:48) |
| [companion 1](spherical-six-pole-correlated-continuation-claude-review-reference-companion-1.md) | adccee785642525552072f8a75767d903887adcbc17cbd7a7841dffd111373d2 | 486-record chain measured, guaranteed end 6.2266845936… |
| [companion 2](spherical-six-pole-correlated-continuation-claude-review-reference-companion-2.md) | fe3e79ae670cd098f5975936c86cd3c527796ec289567081551ac8d75d0fb68d | lost C4/C6 streams; naming rule |
| [companion 3](spherical-six-pole-correlated-continuation-claude-review-reference-companion-3.md) | c7684a8214076cad55c5fc7478e3e35945d74669b7e4398f21c201f2d91e4813 | K2 range derived exactly; C4/C6 sizes UNKNOWN (earlier figures were estimates) |
| [adjudication 1](spherical-six-pole-correlated-continuation-claude-review-adjudication-1.md) | d1c8e7697d9a07891954e6c9a4098887c3de941df19d5e9766882171f06aeb3f | the three references are consistent and admitted |
| [adjudication 2](spherical-six-pole-correlated-continuation-claude-review-adjudication-2.md) | 695aee4af44381783bf32391b0f1cf43321409e0f33c3d9ff2093c75165fd03c | latent blocks; end-state Jacobian; Clarke mean value; G1 admitted |
| [adjudication 3](spherical-six-pole-correlated-continuation-claude-review-adjudication-3.md) | 8f4bb6c81617cb86f94c5f88effa36f1ec9849de1ec245b969446f26e3633b92 | continuation design admissible; add N-R and N-H |
| [adjudication 4](spherical-six-pole-correlated-continuation-claude-review-adjudication-4.md) | 5ac937e06cdb5d06508e133c27fcbed6801362a83d438855e15d2963915efc49 | integral end remainders admitted with a control; E10 chart adequate |
| [adjudication 5](spherical-six-pole-correlated-continuation-claude-review-adjudication-5.md) | a2528cc0e11d889313486bafa1ea48f283a7adb293109d61ebf85a1d162c832b | shared-column repair correct and complete; certified versus relaxed membership; E16 |
| [adjudication 6](spherical-six-pole-correlated-continuation-claude-review-adjudication-6.md) | 73b032923ac1e69da0c432d3df83d68a9c538ad540a9368ded37743056c88e10 | v4.3 directed-interval membership admitted; E17 construction defect found before the run |
| [adjudication 7](spherical-six-pole-correlated-continuation-claude-review-adjudication-7.md) | 58d17237a197363578d85b9bb21f0eee79ff198f66ae44ddbf6d4d47bb5ef4ec | C14 not admitting; E4 corners inside by derivation; v4.4 diff clean |
| [adjudication 8](spherical-six-pole-correlated-continuation-claude-review-adjudication-8.md) | 9160f181b991516807d2422da7295847b61fdef631f0595f45a26190f6cc53ec | support sub-interval route valid but provisional; end plus $\ddot l$ lemma proves 371 to 380 on frozen records |
| [adjudication 9](spherical-six-pole-correlated-continuation-claude-review-adjudication-9.md) | 4272bfaca213246f7215f35ed1f74f7894e6b61b102b6ff0aaf84ec91ee9056e | C15 passes; C16 gain real on matched inputs; slices admitted |
| [adjudication 10](spherical-six-pole-correlated-continuation-claude-review-adjudication-10.md) | c5036197d38aaefb5366f0b4d3582b6402e531e6652322ea4fe848dd18a75f6b | support route qualified from C17 (371 to 377) |
| [adjudication 11](spherical-six-pole-correlated-continuation-claude-review-adjudication-11.md) | 819228cd7e020cc7d181e1a8d0e13fe0935b21c65d646b0c8560cc9e66f4fc68 | r1 (155 to 224) accepted |
| [adjudication 12](spherical-six-pole-correlated-continuation-claude-review-adjudication-12.md) | 5e9863159485c65ede7c9054cf544ac8b5adee11119459a349443ba33553f5dc | r2 to r4 accepted; whole-step $\dot l<0$ to 409; speed maximum and $a_r$ zero certified |
| [adjudication 13](spherical-six-pole-correlated-continuation-claude-review-adjudication-13.md) | 92f033099097775425902f387cc11891875a7d1f60390df9414addecc267a166 | r5 accepted; first support turn certified to exist; cm45 design admitted (not used) |
| [adjudication 14](spherical-six-pole-correlated-continuation-claude-review-adjudication-14.md) | 21150542484aafe0fae309b7434f6b1091c965dcf4dae49fae628dffc10f914c | K = 8 gives $\ddot l>0$ on 435 to 437; support C24 admitted; narrowed bracket |
| [adjudication 15](spherical-six-pole-correlated-continuation-claude-review-adjudication-15.md) | 09f6df7532e0a77b0d177b636b7fe65b9b000813fede8a19521b540c758c9aaf | no second turn to 491; completion ruling |

## 3. Key measured results of my final runs

**C23 (a): audit10 on r5.**
- PID 62823, about 12:59:03 to 12:59:15 UTC, exit 0, 12.24 s.
- My end $\dot l$ at the 437 end is $[0.000135755,\ 0.005267197]$, POSITIVE; that is the smallest positive end.
- It is $[-0.000000292,\ 0.005043018]$ at 436 and $[-0.000119736,\ 0.004840832]$ at 435.
- The event logic of my audit independently brackets a support minimum in steps 435 to 437.

**C23 (b): ddl10 on 410 to 491 at $K = 4$.**
- PID 62927, 12:59:29 to 13:00:42 UTC, exit 0, 73.00 s.
- Refined $\ddot l > 0$ on every step 374 to 435 (with C21); undecided on 436 and 437.
- End lower bounds positive from 437 on.

**C25: ddl10 on 435 to 437 at $K = 8$.**
- PID 65498, about 13:08:45 to 13:08:54 UTC, exit 0, 9.55 s.
- $\ddot l$: $[0.001294, 0.03279]$, $[0.001027, 0.03321]$, $[0.000870, 0.03358]$, all positive.

**Brackets for the first support turn.**
- Own evaluations only: $(5.956684593623649597167969,\ 6.236684709182828044891357)$, from my whole-step proofs to the 409 end and my positive 437 end.
- Cross-code: $(5.986684593623649597167969,\ 6.176684709182828044891357)$, using the support's C24 end-412 negative and end-431 positive.
- On both brackets the crossing is unique and strict, because $\ddot l>0$ on every step from 374 to 437.

## 4. Compute record (all under explicit PI grants; census before each; foreground; 110 s alarm)

| run | PID | exit | note |
|---|---|---|---|
| C1 chain486 | 29316 | 0 | |
| C4 centred v1 | 33537 | 1 | point plus interval sum in K0; streams lost |
| C6 centred v2 | 35701 | 1 | point times interval in K0; streams lost |
| C8 centred v3 | 38296 | 1 | binary-float $10^{-6}$ against an exact decimal at tolerance $10^{-25}$; streams kept |
| C10 centred v4 | 41530 | 0 | all pass |
| C19 audit10 r1 | 56739 | 0 | 12:42:06 to 12:42:19 |
| C21 (1) audit10 r2 to r4 | 60445 | 0 | |
| C21 (2) ddl10 band | 60556 | 0 | |
| C23 (a) | 62823 | 0 | |
| C23 (b) | 62927 | 0 | |
| C25 | 65498 | 0 | |

No background process, watcher or polling loop was started. Waiting used only shell foreground loops on file state. No foreign process was touched.

## 5. Incidents (measured from my receipt)

1. **System-python no-op (about 12:13:00 UTC).** A stray `python3 -c "1" 2>/dev/null` inside a file-writing shell command invoked the SYSTEM python3 without a grant, for a fraction of a second, with its output discarded. It was reported at once, and the PI checked that it did not overlap any run. It broke the grant rule and the never-system-python rule. After it, no shell command invoked any interpreter other than the granted venv runs. Text tools (grep, sed, awk for column printing) were used only for reading.
2. **Lost C4/C6 streams.** Generic output names caused the C8 run's streams to overwrite theirs. Their sizes are UNKNOWN: the figures in companion 2 were estimates, corrected in companion 3. From C10 on, every name carries its grant id.
3. **Control-construction failures.**
   - C4, C6 and C8 failed on point-versus-interval mixes and on a binary-float versus decimal-string comparison in my own controls. None affected a target.
   - I also predicted (inferred) a similar defect in the continuation's E17 draft ($10^{-35}$ below the 30-digit spacing). It was fixed before any run.
4. **Late launch of C19.** C19 started about 3.5 minutes after the PI's preferred finish time (12:38:48), because my file-watch loop delayed my reading of the grant. There was no overlap with any other run.
5. **Imprecise start times in receipts.** My receipt lines for C19 and C23 give start times as "12:41:5x" and "12:59:0x". The exact START lines are 12:42:06 (C19) and the census times shown. The C25 receipt line omits the PID, which is 65498 in its .out.
6. **Provenance (others' runs, recorded as findings).** The support's C13 and C17 records and the continuation's records before C18 do not embed the script hash. Their identity is inferred from grants, current hashes and modification times. ddl10 writes its own hash into its output.

## 6. Self-excluded manifest

Every file I wrote is under my exclusive prefix: 19 analysis files (this report makes 20) and 41 evidence files. In total they are about 12.1 MB, within the 50 MiB budget; the scratch directory is empty. I edited no frozen file, plan, coordination, synthesis, manuscript, tracker, corpus, src/ or generated file, and no closed-campaign file. I made no git write and deleted, moved or overwrote no output. Two exceptions, both recorded: the generic `centred-controls.out` and `.out.time` were overwritten by later runs (incident 2), and my scripts were copied to -vN.py before each edit after a run.

**Evidence files (sha256 prefix):**
- Scripts: audit10.py b2b90c7a, ddl10.py 67a82d34, centred.py b6ffe100, centred-v1 15dc710a, centred-v2 a7f784e9, centred-v3 1c30c2cb.
- Chain: chain486 .json 6ed0c14b, .out 46560e05, .time be7354a5.
- Centred controls: C10 .json 7bdd0979, .out 4c79f8c4, .time 5cccb9f6; C8 copies .out 2d1bb2c7, .time aed0b028; generic .out and .time, identical to C8.
- audit10-C19-r1: .json d9fff34a, .consistency 63b68b93, .out ebbd8130, .time 4a280e41.
- audit10-C21-r2r4: .json f8c1ce68, .consistency 56552abd, .out 5db47a28, .time a774a99a.
- audit10-C23-r5: .json 8e2d0ca5, .consistency 9c5f5a40, .out 6f4a612a, .time 23abe5fb.
- ddl10-C21-band: .json 8bfd7b66, .ddl10 fe3b259c, .out d68770f7, .time f8cee6d2.
- ddl10-C23-r5band: .json c898a326, .ddl10 d0f72dc7, .out 76f15113, .time 64dac34d.
- ddl10-C25-k8: .json c898a326, .ddl10 db2840c0, .out a4f7daab, .time 85cf54fd.
- Receipt: commands.txt.

**Excluded from my claims:**
- the cm45 cover file: design admitted, never run;
- the support's C12 and C13 sub-interval results: provisional, superseded by C17;
- the subject's "midpoint crossing near 421": guessed;
- any step beyond 491;
- any extrapolation.

## 7. Next possible actions

1. **Promote the certificate into the subject owner.** Recommended: it is the campaign's main finding. Its premises and falsifiers are stated in adjudications 12 to 15, and it should survive this thread.
2. **Embed script hashes in every output (subject, support, review).** Recommended: it closes the only provenance gap found, at negligible cost.
3. **Run cm45 to narrow the bracket.** Optional: the turn is already certified and unique, and a narrower bracket would refine its time, not its existence.
4. **Fix the support's sub-box last edge (use $\overline{x}$).** Recommended as hygiene: it removes a $10^{-30}$ sliver that did not affect any sign.

## 8. Addenda (PI relay of Codex contribution 7; the prior state of this report is kept in scratch, sha256 155aee89…)

1. **Endpoints.** Wherever this report or adjudications 8, 12, 13 and 15 say a property holds "to $t \le$" the upper endpoint of a step end, the proof reaches the ACTUAL end, which lies in [lower, upper]. The uniform guaranteed prefix is the LOWER endpoint:
   - $\dot l<0$ is guaranteed for $t \le 5.956684593623649597167969$ (the 409 end);
   - the completion horizon is guaranteed to $t = 6.776684593623649597167969$ (the 491 end).

   See the dated [endpoints companion](spherical-six-pole-correlated-continuation-claude-review-adjudication-companion-endpoints.md). The turn brackets (earlier end's lower time, later end's upper time) are correct as written.
2. **Chart flag.** The per-row "box" flag in my audit10 outputs is the turning-point chart test (receiver $q$ from 1.04 to 1.80). It does not match the reconstructed receiver range early in r1 ($q \approx 0.59$ to $0.85$), so its False values there are scope information only, not failures. Those steps lie in the earlier campaigns' domains and inside the continuation's E10 chart $[0.55, 2.10]$.
3. **Stale event seed.** My audit9 v5 event logic seeds its sign chain with a fixed step-274 entry from the turning-point campaign. In C19 (steps 155 to 224), the resulting `dl_end_signs_agreed` entry for 274, and any event boundary at step 274, are an instrument artifact, not an event. The same seed appears as the first boundary (274) of the support-minimum event listed by my C23 audit. The bracket I rule on comes from adjudications 13 to 14, not from that field.
