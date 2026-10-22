# Six-pole path continuation, independent review: final report (ramon-e-moore lens)

The review role wrote this report on 2026-10-20 after the PI closed it for compute (clock read 22:19:57 UTC); it ran no compute after G4b′ ended at 21:49:12 UTC. Campaign clock: start 20:54:49, stop of new exploration 23:39:49, hard closeout 23:54:49 UTC. No clock was extended.

## 1. Answer in brief

On the identical radius-10 six-pole rest history, continued from the certified step 492 to the step-570 end:

- **The path turn exists and is certified (Q2).** The signed speed $w$ crosses zero exactly once, strictly, from positive to negative, at $t_\star\in(7.426684593623649597167959,\,7.446684709182828044891367)$, that is $T\approx74.27$–$74.47$. There the common coordinate reaches its maximum, $q\in[1.810754,1.817731]$, and the speed magnitude is zero.
- **The narrower bracket of the first support turn is certified (Q3).**
- **Before the path turn, the signed support passes a local MAXIMUM.** This second support turn is certified to exist and to come strictly before the path turn; its uniqueness is open.
- **The canonical radial acceleration has a local maximum after the path turn.** Only its existence is certified.

## 2. Frozen reference and adjudications (paths relative to this file; sha256 by `shasum -a 256`)

| file | sha256 | ruling |
|---|---|---|
| [reference](spherical-six-pole-path-continuation-claude-review-reference.md) | `91751abc1c547a29f6bbe8d3f4d1562bc868162169f25b6d09e1355a843d69ea` | Phase A freeze, 21:01:39 UTC, before any other role's file was opened |
| [adj. 1](spherical-six-pole-path-continuation-claude-review-adjudication-1.md) | `94503261c0a936df1a2fad050d126f46c86e5ff254088ed5fe0f97df4581ca4a` | receval v5 cover design admitted |
| [adj. 2](spherical-six-pole-path-continuation-claude-review-adjudication-2.md) | `05864a5f00d39dcfc5b280b092e94a5a937afb96d42ff49496f0708c345be8a2` | cm46 lower-end repair admitted; unlike upper-end obstruction predicted near step 507–509 |
| [adj. 3](spherical-six-pole-path-continuation-claude-review-adjudication-3.md) | `be70260978af90e8cf3ef033a8f1cbcef6d2218e44b3b3f2c288efc35322819b` | S2 results; cover gap closed; history-read premise found; Q3 conditional |
| [adj. 4](spherical-six-pole-path-continuation-claude-review-adjudication-4.md) | `5201ad6258e0c60e47667b28fda3a89b3d9e2063868229418ee2b667f62f5bd1` | cm47 admitted at both bracket ends |
| [adj. 5](spherical-six-pole-path-continuation-claude-review-adjudication-5.md) | `7018a0610bb3d9b07debb3b4baf24584f16d79c061a26b3bbb06c94d2ac164e0` | receval v6 (padded reads) admitted |
| [adj. 6](spherical-six-pole-path-continuation-claude-review-adjudication-6.md) | `26156623ac613475af79be5e06bed4aeeb2f6d0967119206310a178e90c67825` | K1 failure diagnosed; cm47 barred from targets; admission carried over to cm471 |
| [adj. 7](spherical-six-pole-path-continuation-claude-review-adjudication-7.md) | `05a0a8101cf6ebdb64f8ee5f4fa2c9fdb58e7ccf33a0bb7c98444bcc7d63e640` | Q3 narrower bracket certified |
| [adj. 8](spherical-six-pole-path-continuation-claude-review-adjudication-8.md) | `84868ffe7e7875f4e0e74a3fcf8d8935533bb0bc3a6624c4aedbae9ccdea8347` | K2 passes and cm471 admitted for targets; endpoint-reading rule |
| [adj. 9](spherical-six-pole-path-continuation-claude-review-adjudication-9.md) | `f3f69c2a922939d5a4123beca50759f19922b723803141b5266f82c71c2acbf9` | P1 (493–515) accepted |
| [adj. 10](spherical-six-pole-path-continuation-claude-review-adjudication-10.md) | `a3ec10189cadce73901bd4609dcbf38aeb61fbaeeab48ef32458d2a834370738` | P2 (516–550) accepted; route to a second support turn |
| [adj. 11](spherical-six-pole-path-continuation-claude-review-adjudication-11.md) | `a1e34ae842760e4a4538c11a2eb53c05ee07403dc49a4ea3b6c5516773a1dccf` | P3 (551–570) accepted; PATH TURN certified; radial maximum exists |
| [adj. 12](spherical-six-pole-path-continuation-claude-review-adjudication-12.md) | `145d1875b62a159d8c45fd91673ee2fcce9f662b53f8d366ef8ce70fffaf6691` | second support turn exists; completion ruling (first form) |
| [adj. 13](spherical-six-pole-path-continuation-claude-review-adjudication-13.md) | `d4d372e8b5cd9ff078df9be2efb8b639a3b7bf3596fe4c67594e42aecd9dff17` | S6 admitted; second-turn bracket narrowed; radial maximum after the path turn; route to the order |
| [adj. 14](spherical-six-pole-path-continuation-claude-review-adjudication-14.md) | `a3ad44948e3eacae40686726c87de2384800c8eca99817bb496c6df5154a22d9` | receval v7 admitted; zero like-root margin is sound |
| [adj. 15](spherical-six-pole-path-continuation-claude-review-adjudication-15.md) | `5b9b491e6b6dfc2dac1d21a66aaa16506b34d10a1f6a34fe5e30b9ecc5cea602` | $l'(t_{556})<0$; second support turn strictly BEFORE the path turn |

## 3. My compute (each run on an explicit PI grant; census before every launch)

| grant | instrument | PID | UTC | exit | wall | peak RSS (B) | main output (sha256) |
|---|---|---|---|---|---|---|---|
| G1 | audit10 `b2b90c7a…` on P1 | 10808 | 21:32:18–21:32:29 | 0 | 10.80 s | 86,982,656 | json `2a2a16dd…` |
| G2 | audit10 on P2 | 16070 | 21:37:09–21:37:22 | 0 | 12.42 s | 90,750,976 | json `99e5b873…` |
| G3 | audit10 on P3 | 21618 | 21:42:09–21:42:20 | 0 | 10.57 s | 91,389,952 | json `8b6e4dd0…` |
| G4a | ddl10 `67a82d34…`, 492–530 | 23703 | 21:43:51–21:44:01 | **1** | 10.43 s | 117,456,896 | controls json `6c34b316…` only |
| G4a2 | ddl10, 494–530, $K=4$ | 25703 | 21:45:37–21:46:34 | 0 | 56.63 s | 117,309,440 | band `aa8c5061…` |
| G4b′ | ddl10, 531–533, $K=4$ | 28240 | 21:48:56–21:49:12 | 0 | 16.30 s | 118,931,456 | band `ceaf4d64…` |

**Incidents.**
- **G4a.** It crashed with `KeyError('end_classes')`. The step range included 492, whose r5 record has no end account (the frozen v4.4 end evaluation refused there). The instrument is fine; I chose the range wrongly. The record is kept as a failed record. Its controls json is byte-identical to the G4a2 and G4b′ ones.
- **First G1 attempt (not a run).** At 21:31:30 the census found PID 9947, another session's lattice staggered-cell job started at 21:30:50, outside the standing class at that time. I did not launch. The PI extended the class and re-granted.

## 4. Completion ruling to the step-570 end ($t\le7.566684709182828044891357$)

**Certified (derived from measured enclosures):**
- **First signed-support turn (Q3)**, a strict minimum of $l$ (a maximum of the inward magnitude), unique, in $(5.986684593623649597167959,\,6.176684709182828044891367)$, $T\in(59.8668459,61.7668471)$. This rests on:
  - receval v6 ends 412 (negative) and 431 (positive), padded and exactly covered (the support's instrument);
  - $l''>0$ on every whole step 374–437 (my October C23 and C25).
  It supersedes the October conditional status. The October broader bracket stays certified.
- **Path turn (Q2)**, the first since release, unique and strict: $w$ goes from positive to negative, $q$ reaches its maximum, $|w|=0$, and it is not a speed maximum. It lies in $(7.426684593623649597167959,\,7.446684709182828044891367)$, $T\in(74.2668459,74.4668471)$. The basis:
  - my own ends: $w>0$ at 556, $w<0$ at 558;
  - $a<0$ on every whole step 493–570.
  - At the turn every delayed source speed is positive, $w'\in[0.17,0.35]$, so the transmitter factors keep their pre-turn side ($D_t\ge0.81$).

**Existence only (certified to exist; uniqueness open):**
- **Second support turn**, a local maximum of $l$ (a local minimum of the inward magnitude), in $(7.176684593623649597167959,\,7.426684709182828044891367)$, and STRICTLY BEFORE the path turn as instants on the one history. The basis:
  - $l'>0$ at every instant from the 437 end to the 531 end: my lemma on 494–531, the subject's whole-step boxes on 492–493 (cross-code), and October adjudication 15;
  - $l'(t_{556})<0$ (receval v7, 6×24, the support's instrument).
- **Canonical radial acceleration maximum** in $(7.446684593623649597167959,\,7.526684709182828044891367)$, after the path turn. The basis: $r'>0$ at the 558 end (S6) and $r'<0$ at the 566 end (mine).

**Open:**
- **Uniqueness and strictness of the second support turn.** My $K=4$ $l''$ hulls straddle zero, with widths 0.10–0.20, on every step 494–533.
- **Uniqueness of the radial maximum, and so its exact order.** Another local maximum of $r$ between the 557 and 558 ends is not excluded.

**Endpoint-reading rule (adjudication 8).** Certified brackets are stated with the READER-PADDED times: each `t_int` string is read outward and then widened by $10^{-23}$. That form is fully derived. The recorded-string forms (ending …969/…357) are exact only under the frozen exact-decimal origin premise and agree with the padded forms to 22 significant digits. The reason is that `t_int`, `S`, `VS`, `a0` and `ap` are written by `nstr(·,25)` with no write pad; only the $q$ and $w$ end strings carry a $10^{-23}$ write pad.

## 5. Shared premises and independence

Every ruling shares these premises:
- the stored-rate premise;
- the frozen step instrument;
- the admitted v4.4 correlated inclusion;
- the intersection premise;
- the G1 chart for the subject's steps (the source $q'$ reached 1.7667, a margin of 0.033).

Agreement among the continuation, the support and the review is cross-code consistency, not independent evidence of these premises. My instruments, audit10 and ddl10, were run unchanged. The delay bracket in audit10 is valid by my reference 1.1 for any centre.

## 6. Manifest (self-excluded: this report is not listed)

Analysis, 16 files, 107,612 bytes: the reference and adjudications 1–15, with hashes as in section 2.

Evidence, 25 files, 3,047,353 bytes (3,028 KiB allocated):

| file | bytes | sha256 |
|---|---|---|
| review-audit10-G1-P1.json | 399303 | `2a2a16dd969490f6e92962d2893069c9c6b67b8d3c41a3bc35ed717c38ffad6f` |
| review-audit10-G1-P1.json.consistency.json | 451649 | `6d9c296cb49d549cbacf252e2afe67ff0d424a5366cce1d6cbd6fe7688d687ef` |
| review-audit10-G1-P1.out | 21014 | `82eccd494a80f15d6293c1305d5b0cb027ad954953f6901d8e54f852e543c902` |
| review-audit10-G1-P1.out.time | 777 | `54b6d7c2338cf760716197156e9df0bddf2df9bb59124db50146c151ebf4e1a2` |
| review-audit10-G2-P2.json | 597576 | `99e5b87329c171760bc5d9d3d65cf255528caa2bbf0240fa2c4137f1f132e733` |
| review-audit10-G2-P2.json.consistency.json | 649922 | `14c8e3aa33123fbe82ec4b479c527c334f1cec3b7268b3d9d0df7ac0dea5395c` |
| review-audit10-G2-P2.out | 28057 | `9a3fcae740826edceaf6476487df5620346aee1dad20964cdaa8376012d179af` |
| review-audit10-G2-P2.out.time | 777 | `cc661e314029f31d7f0880fe8e7d951dbc9faa221ce3d8f612f399096e7a92f5` |
| review-audit10-G3-P3.json | 352289 | `8b6e4dd04196847817f2e135e6e1e4dcda9cafb35d4475a9e4195f52178fd6e8` |
| review-audit10-G3-P3.json.consistency.json | 404635 | `a178c320bdf2804257c7887e8a72c3395c4eaee766a8874c596c1fd168889d6d` |
| review-audit10-G3-P3.out | 19194 | `bb4b501a1c552b4394aedbf6f8ec554b21ef35bea94a00e04d6438b693e318d5` |
| review-audit10-G3-P3.out.time | 777 | `dbd0a80efa7f6da65631ce1c500818a8cd86d62fe086197443fd2b13fccaee3f` |
| review-ddl10-G4a-492-530.json | 20416 | `6c34b3162f5e6b286e240a7cca3b9279355dc2627972182c6f7ee068987dde9f` |
| review-ddl10-G4a-492-530.out | 4249 | `67df1c32d55804ff3114b027ca176b29bbcb807e292f05efa1af396d1ee89def` |
| review-ddl10-G4a-492-530.out.time | 1335 | `1bb1dea6e950f2cf340ada27550ba1453726c3a49af0196f8f73cc67f9cc0c6b` |
| review-ddl10-G4a2-494-530.json | 20416 | `6c34b3162f5e6b286e240a7cca3b9279355dc2627972182c6f7ee068987dde9f` |
| review-ddl10-G4a2-494-530.json.ddl10.json | 35037 | `aa8c50614ded419772123b93602cf787d8564fe9c672b8e3196ea1c5d1d7e118` |
| review-ddl10-G4a2-494-530.out | 8216 | `87a1b203b8bd05d867389367a3b40df4d1d91230fda0e05c598b214476465175` |
| review-ddl10-G4a2-494-530.out.time | 777 | `3fc92f203b1999e1315188a57ab6ffa1da45200434b77a6ece12d76f13d72ce7` |
| review-ddl10-G4b-531-533.json | 20416 | `6c34b3162f5e6b286e240a7cca3b9279355dc2627972182c6f7ee068987dde9f` |
| review-ddl10-G4b-531-533.json.ddl10.json | 4998 | `ceaf4d6499dea7e05bcf6a0590a7b03710ce4f53406a03864798049d84c96b1c` |
| review-ddl10-G4b-531-533.out | 4746 | `1e1b90ca3b898587fa4b89f2c682cf547f08b49a5238cfe5d16396797419930f` |
| review-ddl10-G4b-531-533.out.time | 777 | `6f21f17d53f010743c0e8daadc1291fc31b8cbd5d83334602f44dec74b3685e1` |

All names carry the prefix `spherical-six-pole-path-continuation-claude-` and live in `../evidence/`.

**Scratch.** `.tmp/six-pole-path-continuation/review/` holds 20 KiB (one file, the freeze copy of the reference). No `.local-data` was used.

## 7. Falsifiers

- Any listed enclosure that misses its true value.
- A rerun of end 556, 557, 412 or 431 that changes its sign.
- A proved $a\ge0$ on any part of steps 557–558.
- A proved $l'\le0$ at an instant before the 531 end.
- A record in r1–r5 or P1–P3 that contradicts its padded boxes.
