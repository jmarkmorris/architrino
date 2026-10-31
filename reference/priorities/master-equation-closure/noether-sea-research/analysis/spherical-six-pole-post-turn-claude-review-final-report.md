# Six-pole post-turn campaign, independent review: final report (ramon-e-moore lens)

Written 2026-10-21 by the review role after the PI closed compute; the clock read 04:02:41 UTC before writing. The campaign ran from 02:26:53 UTC, with new exploration stopping at 04:41:53 and hard closeout at 04:56:53. No clock was extended.

## 1. Answer in brief

**The defect.** The campaign found a sign-dropping defect in the affine-form serializer used at every slice resume since October: v4.4 line 390, `x.man` is the unsigned mantissa. Every certificate resting on steps 225–570 was therefore suspended.

**The rebuild.** The continuation rebuilt the chain from the step-154 anchor with a signed serializer (cm49). I audited the rebuilt chain end to end, and every event was re-derived on it. All of the following are DERIVED from measured enclosures on the rebuilt chain R1′–R6′ and P4′–P6′:

- **Speed maximum:** unique, in $(4.246684593623649597167959,\,4.266684709182828044891367)$ (adj. 19).
- **Canonical radial zero:** unique, in $(5.686684593623649597167959,\,5.706684709182828044891367)$ (adj. 19).
- **First support turn, a strict minimum of $l$:** unique.
  - On my own evaluations, in $(5.956684593623649597167959,\,6.226684709182828044891367)$, one step narrower than October (adj. 17).
  - With the support's end signs, narrower still, in $(5.986684593623649597167959,\,6.176684709182828044891367)$ (adj. 18).
- **Second support turn, a strict local maximum of $l$:** unique, in $(7.276684593623649597167959,\,7.426684709182828044891367)$, and strictly before the path turn (adj. 16).
- **Path turn, a strict maximum of $q$ with $|w|=0$:** unique and the first since release, in $(7.426684593623649597167959,\,7.446684709182828044891367)$, with $q(t_\star)\in[1.8109107,1.8175687]$ (adj. 15).
- **Canonical radial maximum after the turn:** existence only, in $(7.436684593623649597167959,\,7.526684709182828044891367)$; its order relative to the path turn is open (adj. 19).
- **Like partner's source-speed sign change, and the factor $D_L$ crossing 1:** unique, in $(8.116684593623649597167959,\,8.186684709182828044891367)$ (adj. 20).
- **Antipode tangent-contribution sign change from positive to negative:** existence only, in $(8.346684593623649597167959,\,8.386684709182828044891367)$ (adj. 20).
- **Return path from 571 to 688:** no speed extremum, no support turn, and no radial turn on 581–688. The certified history reaches the step-688 end, $t\le8.746684709182828044891357$ (adj. 20, 21).

All brackets above use the padded time reading.

## 2. Reference and adjudications (sha256 by `shasum -a 256`)

| file | sha256 | subject |
|---|---|---|
| reference | `09e6130e1e6d82bf6887d425640e9b9b552a15707ebaa782d6d0076798fcfb4b` | chart extension, $l''$ route, return-path event criteria |
| adj. 1 | `e91ee3cc49adb07baf488b35c542a045a68bf7c022709fe04627dba2f4a539ec` | S9 (suspended) |
| adj. 2 | `3fd79b6b06fbe515e0d6cc107f1f5b782cc598d1aa5141cd6fab6467c784d29f` | Q4 on the old chain (suspended); geomx design admitted |
| adj. 3 | `979dd679d686c312729a0e7dbe244c5499eb134b6a388b314511701ebad653bf` | cm48 design |
| adj. 4 | `2de7e71d9b4efaf53b1bfa8f92739c89a482d816a51bc27f3c82e6ded87d0097` | ddl-jet design |
| adj. 5 | `1018a55da79d69ea0973fbe3afef471dee9e4127b67f6cfdd37ea62c3b4a14c2` | G1x chart admitted |
| adj. 6 | `e3528bf7d921dd9f6fd064eff77b9af33286bd755db9ecfd07de0493d6d182e5` | Kc48 |
| adj. 7 | `cb24003e4f88739706f8e94d0580ea6a11fd42ed42214b83411389d2a784eb96` | J1 |
| adj. 8 | `8a55627cddf23e4329dd826ae1cc443523b930f3726496325772436779ff3c0b` | Q2 on the old chain (suspended; superseded by 16) |
| adj. 9 | `29649d2c1b92676c9c39457ddefbb503761e9f70de40efd713c34aca180b061f` | P4 contradiction at 571 (its §3 back-up argument is withdrawn) |
| adj. 10 | `9eead36a396bdfdd16e0188ac395b2f101a7b72099d68d0a4b7aec863e85d1d2` | cause: the serializer drops signs |
| adj. 11 | `dde768ba43b3865f6facd0f04ec99d014dc6b52e382f94158aeba899fcbe490f` | dependency map; rebuild criteria |
| adj. 12 | `e9943fa63a6b7052d4aab4b756defcd0541d7d4e2a009506fb85ceb3ca3b6112` | cm49 design |
| adj. 13 | `e6139c99b3b545021f91ffb1c29cdfdf966b1985b22b69a4e74ab4b63be6f157` | cm49 fix and K49b |
| adj. 14 | `12800117ab73c09c82cd3c5f3199b076e87c122a4cd7cb0cc7b582acb2493b5e` | R1′–R3′ accepted |
| adj. 15 | `342062ff2b7fe56d4730915adc969c056951d9049f3b3a1e4a574dc1da1e091e` | R4′–R6′; PATH TURN re-certified; ddl-jet v2 |
| adj. 16 | `fcfcd0a7eff18dae80ba814da5d614a16390d17058d900edec1fcf3fd549834a` | SECOND SUPPORT TURN re-certified |
| adj. 17 | `4c7ecb77845f2ebe499883993e478b2bee9e658fbb97b0ca4032617db37782d3` | FIRST SUPPORT TURN re-certified |
| adj. 18 | `28cb55dccb0659d1a42425166c16bb59efcf6945d35982974885b9144d1c7005` | narrower first-turn bracket re-certified |
| adj. 19 | `1c10a6ade5bf4b8a9dac5f893788610faba11bfab72a056153da04c42057c2fb` | radial zero, speed maximum, radial maximum; $v'<0$ note |
| adj. 20 | `5dd97ef5607c2139973b51c66b827c7e8c7e2714652a6c8d30b838389663ad01` | P4′ and P5′; return-path events |
| adj. 21 | `6e7882a5315753725e0efadcd96cf110a9ba66298c2b65f152d2001f6d53668e` | P6′ |

## 3. The defect (derived; measured confirmation)

**Mechanism.**
- The serializer is `ser(x) = [str(int(x.man)), int(x.exp)]` (v4.4 line 390).
- In the venv's mpmath, `man = property(lambda self: self._mpf_[1])` (`ctx_mp_python.py` line 124), which is unsigned.
- So every saved `affine_last` was stored entrywise in absolute value.
- Measured: there were zero negative entries in r1, r2, r5, P1, P2 or P3. After the fix, R1′ has negative entries in 66 of its 200 columns.

**Consequence.** Each resume restored a reflected zonotope: the same hull but a different set. The certified ends after step 224 were therefore intersections with an unproved set. The defect came to light when a negative centre at step 571 produced an empty intersection.

**Evidence that it mattered.** At step 225 the old $w$ enclosure was narrower than the rebuilt one and did not contain it.

**Repair.** cm49 serializes signed values, refuses untagged resumes and passes S-ser (i)–(iii). The rebuild ran from the anchor.

## 4. Re-certification status

| event | status on the rebuilt chain |
|---|---|
| path turn | RE-CERTIFIED (adj. 15) |
| second support turn | RE-CERTIFIED, unique and strict (adj. 16) |
| first support turn, own bracket | RE-CERTIFIED, narrower top (adj. 17) |
| first support turn, narrower bracket | RE-CERTIFIED (adj. 18) |
| speed maximum; radial zero | RE-CERTIFIED (adj. 19) |
| radial maximum after the turn | existence only; uniqueness and order open (adj. 19) |
| like source sign change, $D_L$ crossing 1 | CERTIFIED, unique (adj. 20) |
| antipode tangent sign change | existence only (adj. 20) |
| all old-chain values (October 12–15; path-continuation 3, 7–13, 15; post-turn 1, 2 for Q4, 8) | remain SUSPENDED as records, superseded by the re-certifications above |

## 5. Compute (each run on an explicit PI grant; census before every launch)

| run | instrument | PID | UTC | exit | wall |
|---|---|---|---|---|---|
| GP1 | ddl10 534–541, OLD chain | 73596 | 02:33:53–02:34:12 | 0 | 19.24 s |
| GP2 | audit10 R1′–R3′ | 94690 | 03:18:13–03:18:50 | 0 | 37.40 s |
| GP3 | audit10 R4′–R6′ | 97243 | 03:28:51–03:29:29 | 0 | 37.49 s |
| GP4b | ddl10 494–541 | 99724 | 03:36:57–03:37:43 | 0 | 46.50 s |
| GP4a | ddl10 438–493 | 227 | 03:39:49–03:40:45 | 0 | 55.21 s |
| GP5b | ddl10 406–437 | 762 | 03:43:28–03:44:03 | 0 | 34.43 s |
| GP5a | ddl10 371–405 | 1101 | 03:46:11–03:46:46 | 0 | 35.70 s |
| GP6 | audit10 P4′ + P5′ | 3056 | 03:56:00–03:56:19 | 0 | 19.16 s |
| GP7 | audit10 P6′ | 4178 | 04:02:06–04:02:13 | 0 | 7.31 s |

Peak RSS was 120–135 MB per run. GP1's rows rest on the old chain and are superseded.

**Incident (mine).** Near 02:54:58 I mistakenly invoked `python3 -` (system python3, empty stdin, no grant) at the head of a shell edit command. It executed nothing and produced no output. It was reported to the PI at once.

No background process was started. A final check at 04:02:41 found no audit10 or ddl10 process.

## 6. Limitations and premises

- **No known control with $v'<0$.** None of my audit's known controls covers a negative source speed. My rulings on steps 626–688, where the like source speed is straddling or negative, rest on the signed closed forms (inferred correct) and on cross-code agreement.
- **Stored-rate premise.** The stored `ap` boxes supply the source jerk. That jerk dominates the ddl-jet widths, so the uniqueness of the second support turn depends on this premise.
- **Cross-code results.** The $l''<0$ sign on 532–557 comes from the continuation's ddl-jet. The end signs at 412, 431, 541 and 556 come from the support's receval v7. My ddl10 could not decide $l''$ there; it serves as a consistency check, and the hulls intersect.
- **Frozen-record premise.** The first support turn's negative side before step 371 rests on the earlier turning-point campaign's frozen box records, which have no affine form. I did not re-read them this session.
- **Q3 continuation.** It is expected to refuse at the chart edge $w'=-0.20$ for the like source near steps 692–697 (inferred).

## 7. Manifest (self-excluded: this report is not listed)

**Analysis.** 22 files, 101,237 bytes: the reference and adjudications 1–21, hashes as in §2.

**Evidence.** 36 files, 18,627,474 bytes, 18,348 KiB allocated. All carry the prefix `spherical-six-pole-post-turn-claude-review-`.

| file | sha256 |
|---|---|
| audit10-GP2-R1R2R3.json | `47f11448c741c8345314c00137555e93308e5dced77c20fba61569acf2ae9229` |
| audit10-GP2-R1R2R3.json.consistency.json | `2f6d0ef363594d4ecab30a9fc6ae42edaa1f790b1f3790fc34d45f64b99162f3` |
| audit10-GP2-R1R2R3.out | `595a3008d0c6effc2c3f6d95d2039299e800c7f0abc54f37540ebf2596a670cc` |
| audit10-GP2-R1R2R3.out.time | `081914c019b20a0a82883304f24e7d4aeb45efb30a04692bdc2ae332961cf88e` |
| audit10-GP3-R4R5R6.json | `89f6e7a04809c577446a1e78ee817da513eb068d85f1b0d0266dca29d8cfe5d3` |
| audit10-GP3-R4R5R6.json.consistency.json | `06ed4ff617f36d89de1e84b1ac331fe449c676b1e0d1d4dd79cbcb659528cfd2` |
| audit10-GP3-R4R5R6.out | `1e3cf11754939224858642c700b2a855b493804cd5ce3d0fd649636406d26221` |
| audit10-GP3-R4R5R6.out.time | `d7eeaa29bd58fa271d8a39cca2d96aea8813795b0feec19667d9f8475cde61f5` |
| audit10-GP6-P4P5.json | `319cd95b45984b868bc82498e486c8e6150da3e3a4a9e0ca499a66ddbb211be7` |
| audit10-GP6-P4P5.json.consistency.json | `d6208a1ea0073d4a88d88a4b77d837914f0516dae91aa97a2845c44281c014ea` |
| audit10-GP6-P4P5.out | `5c54e7adedf5806b16f905ad0ce023b2673a7ef772330af9ca359ec83248785a` |
| audit10-GP6-P4P5.out.time | `fd261d72aa643464263f7b38658a8655da069f06c0cd4b84017db416fc0f7528` |
| audit10-GP7-P6.json | `94b5eba3f03264ec6ad0e8ed17eda060a1f40afd827f0e4b1f6a17500682077c` |
| audit10-GP7-P6.json.consistency.json | `8071dd1ff4cc3336819cff522415c794d1322b4d8288b6161db19b015256dec0` |
| audit10-GP7-P6.out | `34d6cd9b25d5def9faeb6133c6f1b7e554bb8df07503a3c77a6691f6ad4505f7` |
| audit10-GP7-P6.out.time | `33a82df94c3093f8b6f4db1b623aac5f46a1ebdac7d34c08d5268590f5699f04` |
| ddl10-GP1-534-541.json | `6c34b3162f5e6b286e240a7cca3b9279355dc2627972182c6f7ee068987dde9f` |
| ddl10-GP1-534-541.json.ddl10.json | `3564273e3a53596b3b61e2ed6c4e7802eff4320fcc0dbc15f7839cf5f3fc6bdd` |
| ddl10-GP1-534-541.out | `b6dfc1575ddeba2623bca17f82922ed91383796de8c37eb579f38d85d9e1d71a` |
| ddl10-GP1-534-541.out.time | `ad2f681d2228822962f61404c28912305113d9c0e1b7f1ac40e099b9efd609e6` |
| ddl10-GP4a-438-493.json | `db51eadf9f997b7183f1b4272e35929a8449d82635d66f4b6cd126bebedabfcb` |
| ddl10-GP4a-438-493.json.ddl10.json | `bcce55884741c11f40aaeaf75f5eacd09bd7e3f3d1502688024ae12b7c2e9573` |
| ddl10-GP4a-438-493.out | `8acdce98231fcc657e9490487c26ad254d6b17bdff024874f9448ac613de4082` |
| ddl10-GP4a-438-493.out.time | `f87a78f1ddb37e160271893b5feed203e9cdea98886d20822fe9906a3913046b` |
| ddl10-GP4b-494-541.json | `db51eadf9f997b7183f1b4272e35929a8449d82635d66f4b6cd126bebedabfcb` |
| ddl10-GP4b-494-541.json.ddl10.json | `b54018aa3b63ea91070e872bf0ca4f16bb098dc6846cf381a3cdecbbac63bbe7` |
| ddl10-GP4b-494-541.out | `b1add30d066abbcf5d2353f0cbffd76d303fba1955bae85dfd3dc80f75030100` |
| ddl10-GP4b-494-541.out.time | `106464a1a26ebd077f29147aa6aa2617cd15bac07ed7f3082970ca15fb6b5754` |
| ddl10-GP5a-371-405.json | `db51eadf9f997b7183f1b4272e35929a8449d82635d66f4b6cd126bebedabfcb` |
| ddl10-GP5a-371-405.json.ddl10.json | `d1d583aeab5612a49805e34d8d818297b28f8e5de0f2371e566753c35550b33c` |
| ddl10-GP5a-371-405.out | `c9a873ffd0ed5e8cce2f2c013446ac98d57087f0007a618c15a47fa3007b2dc7` |
| ddl10-GP5a-371-405.out.time | `50dbd3d5f709ae2517c59813c7bf3cd7585b31c4db922278b12bd34e6744e8d5` |
| ddl10-GP5b-406-437.json | `db51eadf9f997b7183f1b4272e35929a8449d82635d66f4b6cd126bebedabfcb` |
| ddl10-GP5b-406-437.json.ddl10.json | `2faa0c4d2c184e93927cf5cb1c8bb8ab559d12045c421b33b8c21ab5ed98a6eb` |
| ddl10-GP5b-406-437.out | `bcd67925b057ffccdb317280a56dad3926c091e84c04741e8638991e46edb6b2` |
| ddl10-GP5b-406-437.out.time | `2e7e4fe7cb6c561886789229ba36488933f322a51e6df9e050346b5818dbee49` |

GP1's controls json, `6c34b316…`, differs from the rebuilt runs' `db51eadf…` because GP1 appended the old chain.

**Scratch.** `.tmp/six-pole-post-turn/review/` holds 12 KiB: the freeze copy of the reference.
