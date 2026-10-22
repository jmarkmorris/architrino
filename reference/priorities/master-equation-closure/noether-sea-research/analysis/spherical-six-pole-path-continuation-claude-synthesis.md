# Six-pole path continuation and bracket repair: Claude PI synthesis

*Living document of the Claude PI until closeout. Its earlier states are snapshots; dated corrections are made in place.*

## 1. Launch receipt

- **Selection.** On 2026-10-20 the operator replied "do items 1 thru 3" to the Claude PI's closing list from the October 14 correlated-continuation campaign. The reading and its limits are in [plan section 1](spherical-six-pole-path-continuation-plan.md#1-selection-and-its-reading).
- **Item 1 was already done.** The certificate was moved into the manuscript before this selection: [section 5.14](../manuscript.md#514-the-first-strict-minimum-of-signed-support) keeps the broader bracket final and the narrower one conditional (commit `4e17f9aff`, 2026-10-18). It was verified by reading section 5.14 on 2026-10-20, not redone.
- **Plan.** [spherical-six-pole-path-continuation-plan.md](spherical-six-pole-path-continuation-plan.md), sha256 `e963f8aa1924e910294f8c15aeed592f236d55c8a767095d3e6a4534ad3c8134` at launch.
- **Clock.** Start 20:54:49 UTC; stop new exploration 23:39:49; hard closeout 23:54:49 (2026-10-20); never extended.
- **Communication.** Directly with the operator in the Claude chat. No Codex thread was named for this campaign, so no Codex oversight is engaged.
- **Pre-launch census.** At 20:52:38 UTC one foreign Python process was running: PID 82438, started 20:49:45 UTC, another session's lattice staggered-cell driver (`staggered_cell_driver_v6.py`). It is untouched.
- **Venv.** `../.venv/bin/python` resolves to Python 3.13.2 with mpmath 1.3.0.

## 2. Roster

| role | lens | question | launched |
| --- | --- | --- | --- |
| continuation | jack-k-hale | Q2: like-root bracket repair, then continued slices toward a path turn | just after 20:54:49 UTC (clock read before dispatch), background |
| support | emmy-noether | Q3: end-instant cover repair, ends 412 and 431; later the partner account | just after 20:54:49 UTC (clock read before dispatch), background |
| independent review | ramon-e-moore | own frozen reference, then adjudications of both questions | just after 20:54:49 UTC (clock read before dispatch), background |

Briefs (scratch, PI-owned): `.tmp/six-pole-path-continuation/pi/brief-common.md` and the three role briefs.

## 3. Findings

### F1. Q3: the narrower bracket of the first support turn is CERTIFIED (derived from measured enclosures; independently adjudicated)

The first strict minimum of the outward-positive signed support $l=-w^2-r$ is the moment of strongest inward support, since $l\approx-0.11<0$ there. It lies in

$$
t_c\in(5.986684593623649597167959,\,6.176684709182828044891367),\qquad T\in(59.8668459,\,61.7668471),
$$

and it is the unique, strict zero of $l'$ after the accepted step 275 through the step-491 end. The ruling is review [adjudication 7](spherical-six-pole-path-continuation-claude-review-adjudication-7.md) (`05a0a810…`).

**How it was closed.** October adjudication 14 had left this bracket conditional on an uncovered rounding sliver in the support's end-instant cover. Two further read-premise gaps were found during this campaign. The repair has three parts:

1. **Cover.** The support's evaluator, receval v5 and then v6, splits the end box into pieces whose outer edges are exactly the box ends and whose internal edges are shared. A check refuses the evaluation unless the pieces cover the box (review adjudication 1). The diagnostics show that the October sliver never occurred on the real boxes.
2. **End-string reading.** The recorded end strings are now read outward. The October nearest-rounding reading had placed the evaluated boxes up to about $10^{-31}$ inside the recorded boxes at 412 $w$ and 431 $q$, $w$ (measured in S2).
3. **History reading.** Every stored history field is read outward with a $10^{-23}$ pad (review adjudications 3 and 5). The history writer rounds to nearest at 25 digits without padding, so an unpadded reader can sit inside the proved enclosure by up to $5\times10^{-25}$. The review's own and the subject's readers already padded, so the broader bracket never had this exposure.

**Evidence.**
- **Controls first.** S3 (`d92c9336…`, 17 of 17 pass) includes a constructed inward rounding that the padded reader contains and the unpadded reader misses.
- **Target.** S4 (`d00b5dd0…`) gives $l'(412)\in[-0.0024918,\,-0.0000899]<0$ and $l'(431)\in[0.0000876,\,0.0032853]>0$ on the reconstructed records r1–r5.
- **Strictness.** The review's October $l''>0$ on every whole step 374–437 makes the crossing strict and unique.
- **No second turn.** October adjudication 15 keeps $l'>0$ through the step-491 end.

**Endpoints.** The bracket uses the conservative padded reading of the end times, $10^{-23}$ wider at each end than the October-printed $(5.986684593623649597167969,\,6.176684709182828044891357)$. The printed form is exact under the frozen exact-decimal time-origin premise.

**Independence.** The end signs come from the support's code and the strictness from the review's code. They share the stored-rate, frozen-step, v4.4-inclusion and intersection premises, so their agreement is cross-code consistency, not independent evidence.

**Falsifier.** Any listed enclosure that misses its true value on re-audit; a proved $l'\ge0$ at the step-412 end or $l'\le0$ at the step-431 end; or a failure of $l''>0$ on any whole step 412–431.

### F2. Q2: the first PATH TURN is CERTIFIED, unique and strict (derived from measured enclosures; independently adjudicated)

The common coordinate $q$ of the six poles reaches its first maximum since release, and the signed speed $w$ passes from positive to negative, at a single instant

$$
t^*\in(7.426684593623649597167959,\,7.446684709182828044891367),\qquad T^*\in(74.2668459,\,74.4668471),
$$

with $q(t^*)\in[1.810754,\,1.817731]$. The ruling is review [adjudication 11](spherical-six-pole-path-continuation-claude-review-adjudication-11.md) (`a1e34ae8…`).

**What a path turn is here.** The poles move along great circles of the sphere with common signed speed $w=dq/dt$. A path turn is the instant at which they stop moving forward and start back: $q$ has a maximum, the speed magnitude $|w|$ is zero, and it is not another speed maximum. It is the first path turn since the rest release, because $w>0$ at every earlier instant.

**Certificate.**
- **Positive side.** $w>0$ at every instant through the step-556 end. This rests on October adjudication 15, the step-492 velocity box, and $a<0$ on every whole step 493–556 together with $w(556)\in[0.0005506,\,0.0074357]>0$.
- **Negative side.** $w<0$ is proved at the step-558 end, $w\in[-0.0074382,\,-0.0003443]$. It stays negative at every end through 570.
- **Uniqueness and strictness.** The tangent acceleration $a$ is proved negative on whole steps 557 and 558 on both of the review's readings ($[-0.41536,-0.37248]$ and $[-0.41761,-0.37419]$), and indeed on every whole step 493–570. So $w$ decreases strictly through the bracket and has exactly one zero there.
- **Times.** The bracket uses the earlier end's lower time and the later end's upper time, both in the conservative padded reading.

**How it was reached.** The October run stopped at step 493 because the like pair's delay-root search bracket had a fixed lower end that the falling root reached.
- **Repair.** The new step instrument cm471 (v4.7.1, `05abecc0…`) first tries the frozen bracket and returns its result unchanged when it works. Otherwise it widens the bracket down a ladder of lower ends, each above the history bound. Its upper end is $\max(\mathrm{chord}+0.90,\,2.05)$, which always lies above the root because chords on the unit sphere are at most 2. In every case it re-proves the sign change and the root's uniqueness, and it refuses rather than clamps.
- **Admission.** The review admitted the design (adjudications 2, 4 and 6) after its controls passed, 68 of 68 in K2 (`8583831a…`). Its first controls run caught a name collision in the role's own control harness.
- **Continuation.** Three slices continued the identical history from the certified step-492 strings: P1 to step 515, P2 to 550 and P3 to 570. Every step was certified with no refusal. The unlike pair's upper end first needed the repair at step 510, as the review had predicted from the measured root drift. Each slice was audited by the review's frozen audit10 with 0 fails and 0 sign disagreements (adjudications 9–11).
- **Domain.** The trajectory stays inside the admitted signed-geometry chart: receiver $q\le1.8177$, source $q'\le1.7667$ (margin 0.033 to the 1.80 edge), source $w'\in[0.171,\,0.376]$. Delayed source speeds stay positive through 570, so the transmitter factors are unchanged at the turn.

**Account at the turn** (measured, review end evaluations at the 556–558 ends; physical acceleration is the displayed value divided by 10):
- $a\approx-0.41$ to $-0.37$, dominated by the like pair's tangent contribution of about $-0.40$ to $-0.36$; the unlike pair gives about $-0.019$ and the antipode about $+0.005$.
- The canonical radial acceleration is $r\approx[0.0970,\,0.1035]$, and $l=-w^2-r\approx-r\approx[-0.1036,-0.0970]$.
- **Mechanism (inferred).** The like partners' backward tangent pull, which has grown steadily since step 409, decelerates the poles to rest and reverses them.

**Canonical radial peak** (derived, existence only). $r'>0$ at the 557 end ($[0.00051,\,0.01674]$) and $r'<0$ at the 566 end ($[-0.018276,\,-0.000644]$), so $r$ has a local maximum in $t\in(7.436684593623649597167959,\,7.526684709182828044891367)$. Its uniqueness and its order relative to $t^*$ are not decided.

**Independence.** The step records come from the continuation's cm471. The certificate uses the review's separately written audit10 end evaluations and whole-step laws, on the same stored-rate, frozen-step, v4.4-inclusion and intersection premises. Their agreement is cross-code, not independent evidence.

**Falsifier.** Any enclosure that misses its true value on re-audit; a proved $w\le0$ at an instant before the step-556 end; a proved $w\ge0$ at the step-558 end; or a proved $a\ge0$ anywhere on whole steps 557–558.

### F3. A second support turn, a local MAXIMUM of the signed support, precedes the path turn (existence and order derived; uniqueness open)

After its first minimum, the signed support $l$ rises, then turns down again before the poles stop. The inward support therefore passes through a minimum of its magnitude before the path turn. Review [adjudication 15](spherical-six-pole-path-continuation-claude-review-adjudication-15.md) (`5b9b491e…`) places this local maximum of $l$ at

$$
t_{s2}\in(7.176684593623649597167959,\,7.426684709182828044891367),\qquad T\in(71.7668459,\,74.2668471),
$$

strictly before the path turn $t^*$ of F2.

**Positive side** ($l'>0$ at every instant from the step-437 end to the step-531 end). Three pieces cover it:
- October adjudication 15 covers the steps through 491.
- The subject's whole-step boxes cover 492–493 (cross-code).
- The review's lower-bound lemma covers 494–531. The lemma is $l'(t)\ge A+\min(L,0)\,\Delta$, where $A$ is the review's own lower end of $l'$ at the previous step end and $L$ is the lower end of its refined $l''$ on the step. It holds with margins from 0.0064 down to 0.0002 (ddl10, grants G4a2 and G4b′; adjudication 12).

**Negative side.** $l'(556)\in[-0.0135501,\,-0.000666]<0$ at the actual step-556 end instant. This comes from the support's receval v7 with a $6\times24$ end cover (S8, `86beeb59…`, all controls passing first). The coarser $3\times3$ cover left it undecided; the step-557 end was already negative at $3\times3$.

**Order.** At the same actual step-556 end instant, $w>0$ is proved (F2), and $a<0$ on whole steps 557–558. Both events refer to one history with one clock, so $t_{s2}<t_{556}<t^*$.

**Mechanism (inferred).** $l'=-2wa-r'$. As the poles slow, $-2wa$ shrinks, to $[0.0004,\,0.0061]$ at the 556 end, while the growing outward canonical radial contribution keeps $r'\in[0.0052,\,0.0156]$. So $l'$ turns negative just before $w$ reaches zero.

**Open.** Uniqueness and strictness. The refined $l''$ enclosures straddle zero on every step 494–533, with widths 0.10–0.20, so several maxima of $l$ with minima between them are not excluded inside the bracket.

**Canonical radial maximum** (review adjudications 11 and 13; existence only). $r$ has a local maximum in $(7.446684593623649597167959,\,7.526684709182828044891367)$, after the path turn as instants. A maximum between the 557 and 558 ends is not excluded.

**Falsifier.** Any enclosure that misses its true value on re-audit; a proved $l'\le0$ at an instant before the step-531 end; or a proved $l'\ge0$ at the step-556 end.

## 4. Oversight record
- 20:55:53 UTC (actual save): Launch: plan published (`e963f8aa…`), three roles dispatched in the background just after the 20:54:49 clock read, with briefs `brief-common.md` (`9690404c…`), continuation (`7a1e86a3…`), review (`41673f81…`) and support (`9b6ff9bf…`). The selection was recorded in the lane's priorities.md (Current) and work-queue.md (new "Selected" section). No grants have been issued yet.
- 21:01:14 UTC (actual save): Census 21:01:03 UTC: a second foreign Python process appeared. PID 88007, started 21:00:55 UTC, runs `ccor_implicit2.py k2` with cwd `.local-data/master-equation-closure/ceiling-contact-open-research-20261011`, which is another session's ceiling-contact work and not a role of this campaign. PID 82438 (lattice driver) is still running. Both are untouched and will be named in grants while present. The support has created `…-support-receval-v5.py` (design phase; no run).
- 21:02:02 UTC (actual save): Review freeze received and hash-checked: `…-review-reference.md` `91751abc1c547a29…`, saved 21:01:39 UTC by its own clock read, with no Python run and no subject file opened. Its frozen points (derived unless marked):
- **Root uniqueness.** $h'(\tau)=D_t=1-k\,w'M/r$ with $|dr/dq'|\le1$, so sub-wake motion gives a unique delay root on $(0,\infty)$, lying in $(r_{\min},2]$. A global bracket $[t_{hi}-t_G+\varepsilon,\,2+\varepsilon]$ is a valid non-adaptive repair.
- **Cover.** Exact outer edges and shared internal edges. A Lipschitz route needs a rigorous finite bound that includes the delayed-root and history chain rule; an inferred order-one constant does not suffice.
- **Path-turn certificate.** Its bracket runs from the lower END time of step $k$ to the upper time of step $m$, with whole-step $a<0$ throughout. Every delayed source speed stays positive until about $t^*+0.95$, so the transmitter domain is unchanged at the turn.
- **Conditional prediction (derived).** At the path turn $l'=-r'$. If $r'>0$ there, a SECOND support turn (a maximum of $l$) lies between the step-491 end and the path turn.
- **Distance to the turn (inferred, rough).** The path turn is about 0.75 in $t$ past step 492 (near step 565), and the like source coordinate may pass the chart edge 1.80 a few steps after it. This contradicts the PI's October rough figure of "roughly 40 more steps" (correlated-continuation synthesis 5.5). That figure is now treated as wrong, pending measurement.
- 21:04:43 UTC (actual save): Review adjudication 1 (`94503261…`, 21:04:15 UTC) ADMITS the DESIGN of the support's receval v5 (`2756db62…`) by code reading only.
- **Diff.** Against v4, exactly the changes C1–C5: exact outer edges with shared internal edges (cover_1d); a refusing full-union check (cover_ok); and an outward decimal-to-binary parse with an exact rational check. The parse closes a second one-ulp route that the October review had not named.
- **Conditions before certifying the narrower bracket:** a saved controls record with P1–P9 and V0–V4 all passing before any target; then rows 412 and 431 on the reconstruction records, with no override, proving $l'(412)<0$ and $l'(431)>0$ with the cover check passed.
- **Receipt item.** The receipt must record the sha256 of the exec'd base chain486-iv.py (`4d22a785…`).
- **Slice audits.** The review proposes to audit the slices with the frozen audit10 (`b2b90c7a…`) unchanged, and ddl10 for a second support turn, with no new code. The PI accepts this on a scope condition, sent to the review: Codex's October audit10 note found its chart flag limited to receiver 1.04–1.80, source $\le1.20$ and source velocity $[-0.05,0.45]$, plus a stale event seed. The new slices may pass receiver 1.80 near the turn, so each ruling must state how its evaluations are qualified on the actual domain and must not use the event-summary seed.
- 21:05:25 UTC (actual save): Support checkpoint 1: receval v5 (`2756db62…`), controls spec (`d295c0f9…`), wave1 (`7a4c2361…`) and commands (`c24accf2…`, verified). Accepted:
- C2, the outward decimal parse, beyond the brief.
- C3, the full end account.
- C5, the controls V0–V4.

The support flagged that history slabs are still read round-to-nearest, a premise shared by all earlier adjudications. That premise goes to the review for a ruling.

**SLOT GRANT S1** to the support (census 21:05:11 UTC; the foreign PIDs 82438 and 88007 are named). One invocation, the controls-only command, outputs under the S1-receval-v5-controls stem, 110 s alarm. The sha256 of receval-v5.py and of the exec'd chain486-iv.py are to be recorded before launch. S2 (ends 412 and 431) is not yet granted.
- 21:08:07 UTC (actual save): **S1 returned by the support.** PID 90318, 21:07:07–21:07:11Z, exit 0, 4.15 s, peak RSS 90.8 MB. The census before and after showed only the named foreign PIDs. Pre-launch hashes: receval-v5 `2756db62…`, chain486-iv `4d22a785fe85fe68…`. Record `d9e10f25…` (verified; controls_all_pass true). Results:
- The chain, slice and P1–P9 controls pass.
- V1: the image is $[0.7,1.02]$, exact to $10^{-25}$.
- V2: refused at the last edge. With the check bypassed, the image $[0.7,1.01968]$ misses 1.02, so the negative control has teeth.
- V3 and V4 are refused.

**SLOT GRANT S2** to the support (census 21:07:53 UTC; foreign PIDs 82438 and 88007 named): ends 412 and 431 only, launch no earlier than 21:08:41 UTC.

**PI INCIDENT.** In the same shell command as that census, the PI ran an ungranted `../.venv/bin/python -I -c 1` no-op at about 21:07:53 UTC. It was a stray line of a hash-check command, it computed nothing, and it fell between S1 (ended 21:07:11) and S2 (not yet launched), so there was no overlap. It still breaks the one-grant-per-invocation rule, which binds the PI as well, and it is disclosed here.
- 21:09:50 UTC (actual save): The support correctly BLOCKED S2. Its census at 21:09:24 UTC found PID 91373 (started 21:09:22 UTC, `ccor_implicit2.py k2`), which the grant did not name; PID 88007 had ended. The PI census at 21:09:40 confirmed that 91373's cwd is `.local-data/master-equation-closure/ceiling-contact-open-research-20261011`.

**S2 RE-GRANTED**, with a standing foreign class defined by working directory and script, not by name alone: PID 82438, plus any `ccor_implicit2.py` Python process whose cwd (checked with lsof) is that ceiling-contact directory. The class applies to all later grants of this campaign until the PI withdraws it. Any other Python blocks a launch.
- 21:10:34 UTC (actual save): Review adjudication 2 (`05864a5f…`, 21:10:06 UTC) ADMITS on conditions the continuation's v4.6 lower-end bracket repair, cm46.py (`a48ec4e6…`). The design meets the review's reference 1.3:
- the frozen path is tried first;
- an adaptive rung is admissible only above the history bound;
- the straddle is re-proved by the frozen routine;
- sub-wake uniqueness is proved over the exact read range;
- refusal, never a clamp.

The controls B1–B6 include an independent direct-vector root and a rising-root case. The identity checks B4/B5 are consistency only.

**PREDICTED OBSTRUCTION** (inferred from measured r5 values). The unlike root rises about 0.0022 per step, from 1.6428–1.6455 at 491 to 1.6450–1.6478 at 492. Its fixed upper end $\mathrm{chord}_U+0.90\approx1.679$ rises only about 0.0003 per step, so the straddle fails near step 507–509, about 55 steps before the path turn.

**Recommended repair** (derived): an upper end of $2+\varepsilon$ for every class, since $h(b)\ge b-2>0$ on the unit sphere. It needs one known control (a rising root above the old end) and one negative.

**Q3 history premise, preview** (derived). History fields are written by `nstr(…,25)` round-to-nearest without padding. The subject's reader and the review's audit reader pad every field by $10^{-23}$, so the broader certified bracket is NOT exposed. The support's v5 reader does not pad, so its 412/431 enclosures are formally exposed by up to about $5\times10^{-25}$ in history inputs. The fix is a $10^{-23}$ read pad.

**PI decisions** (sent to both roles):
- The continuation folds the upper-end repair into ONE version (v4.7) before its controls run, so a single controls record serves both ends; the review admits the v4.7 diff.
- The support writes receval v6 with padded history reads after S2 returns, then controls (S3) and a rerun of ends 412 and 431 (S4). S2's result stays informative but cannot certify.
- 21:10:57 UTC (actual save): The support again correctly blocked S2. Its census at 21:10:39 UTC found PID 91812 (started 21:10:12 UTC, `ccor_spike.py target 3600 0.01`, cwd in the ceiling-contact folder), which is outside the script-specific class. The standing foreign class is WIDENED for all later grants: PID 82438 plus any Python process whose lsof-checked cwd is `.local-data/master-equation-closure/ceiling-contact-open-research-20261011`. S2 stands under it. The continuation's cm46.py now hashes `4f685bc0…`, not the `a48ec4e6…` that adjudication 2 admitted; the continuation was asked to explain the change and to fold the review's upper-end repair into a new v4.7.
- 21:13:24 UTC (actual save): **S2 returned by the support.** PID 92610, 21:11:56–21:12:28Z, exit 0, 32.42 s, peak RSS 91.7 MB. The census before and after found only the granted foreign class. Record `ffee4590…` (verified).

**Results (measured, receval v5, end instants only).**
- On the reconstructed records, with every cover check passing: $l'(412)\in[-0.00249176,-0.0000898978]$, NEGATIVE; $l'(431)\in[0.0000876046,0.00328526]$, POSITIVE. These are the same 25-digit strings as C24, which is consistency, not independence.
- On the frozen records alone, both ends stay undecided.
- **Diagnostic (a):** v4's edge formula reached up(x) EXACTLY on all eight real boxes. So the sliver that October adjudication 14 identified did NOT occur in C24.
- **Diagnostic (b):** v4's nearest decimal reading did NOT contain the recorded end box at 412 $w$ (reconstructed and frozen), 431 $q$ and $w$ (reconstructed) and 431 $q$ (frozen). So C24 evaluated binary boxes up to about one unit at $10^{-31}$ inside the recorded end boxes. That is a real October gap, different from the one adjudication 14 named, and C2 closes it.
- **End account.** The full account at 412 and 431 is in the support report. $r>0$ with $r'\approx0.054$–$0.061>0$, and $l\approx-0.11$. The smallest root margins are about $4.5\times10^{-5}$ (antipode, 412) and $9.1\times10^{-5}$ (like, 412).
- **Status.** These values still cannot certify the narrower bracket, because v5 reads history unpadded (adjudication 2 preview). The support is writing v6.
- 21:14:54 UTC (actual save): Continuation checkpoint 1 received and hash-checked (21:14 UTC):
- v4.7 `cm47.py` `a85c2648…`; diff from cm46 `9b429ea6…`; report `a4c7fad7…`.
- The admitted state is restored as `cm46-v1.py` (`a48ec4e6…`). After the review's read, cm46 was edited in controls only (B1 rung, B2 tolerance and guard, class-sign negative, JSON serialization, a B6 diagnostic) to `4f685bc0…`, with no run.

**v4.7 changes:**
- The fallback upper end becomes $\max(\mathrm{chord}+0.90,\,2.05)$ for every class.
- The ladder starts at rung 0.
- The frozen routine is tried first and returned unchanged when it straddles (byte-identical where v4.4 worked; derived from the code path).
- New controls: B7 (rising unlike roots, 1.888 and about 1.83, with direct-vector checks) and B8 (a forced upper end 1.80 refuses; class mix detected).

**SLOT GRANT K1** to the continuation (census 21:14:37 UTC, standing foreign class: 82438, 91373, 91812): one invocation, the cm47 controls record. The equivalence replay is not yet granted. v4.7 was sent to the review for an adjudication.
- 21:15:03 UTC (actual save): Review adjudication 3 (`be702609…`, 21:14:32 UTC): Q3 ruling.
- **Cover gap CLOSED (measured).** All 14 controls pass in S1 and S2, and the cover check passes on the real boxes. $l'(412)<0$ and $l'(431)>0$, identical to C24 at the printed digits. The October sliver never occurred on these boxes.
- **Narrower bracket stays CONDITIONAL on one named premise (derived).** The frozen step writer stores the history fields S, VS, a0 and ap by `nstr(…,25)` with no write pad. A stored bound can therefore lie inside the proved enclosure by up to $5\times10^{-25}$, and v5 reads them unpadded. The sign effect is surely tiny against margins of about $9\times10^{-5}$, but the review will not certify on an inferred derivative bound.
- **Broader certified bracket NOT exposed (derived).** The review's audit readers and the subject's readers pad every field by $10^{-23}$.
- **To close (proposal, matching the PI direction already sent to the support):** receval v6 with padded history reads, a known control (a constructed value $4\times10^{-25}$ outside its nearest-written decimal), then a rerun of ONLY 412 and 431. Unchanged signs certify $(5.986684593623649597167969,\,6.176684709182828044891357)$.
- **cm46 ruling.** The post-read edits touch only control expectations; the bracket rule is byte-identical, so adjudication 2 applies to `4f685bc0…`.
- 21:16:20 UTC (actual save): Review adjudication 4 (`5201ad62…`, 21:16:01 UTC) ADMITS the cm47 (v4.7) design at both bracket ends.
- **Why (derived).** The upper end $\max(\mathrm{chord}+0.90,\,2.05)$ gives $h(b)\ge0.05>0$ for every history, because unit-sphere chords are at most 2. That removes the predicted unlike obstruction.
- **Controls.** B7 and B8 are adequate together with B1–B6.
- **cm46.** The post-read edits do not matter: cm46 was never run, and its bracket rule is byte-identical.
- **Conditions.** The K1 controls record must pass all inherited v4.4 controls and B1–B8. The replay is consistency only. Slices start from the r5 step-492 strings.
- **Slice audits.** These will use the frozen audit10 unchanged, one grant per slice, under the PI's scope condition on the actual domain.
- 21:16:44 UTC (actual save): **K1 returned by the continuation.** PID 95250, 21:15:09–21:15:42Z, exit 2 (the instrument's own controls-failed exit), 33.40 s, peak RSS 124 MB. The census found only the foreign class. Record `634d6f3d…` (verified).
- **Passes.** 68 controls ran: all 60 inherited ones plus B1–B5, B7 and B8.
- **B6 FAILED** on its last item: the step-492 end evaluation raised `KeyError('steps')`. Cause, found by code reading: the B3 control's module-global dict `b3` shadowed the frozen steps6 global `b3` that `end_eval` reads. That defect in the role's own control harness would have crashed every reconstruction-step end evaluation. The controls caught it before any target.
- **Measured inside B6 at the step-492 end.** The frozen like bracket refuses: $h(a)$ straddles zero at the frozen lower end 0.9419. The v4.7 fallback (rung 1) encloses the like root at $[0.94058,0.94883]$, with uniqueness proved ($\sup|w'|\le0.3896$). The delayed like source is at $q'\in[1.4848,1.4904]$, $w'\in[0.3200,0.3221]$, inside the chart. The unlike and antipode roots are unchanged.
- **PI decision.** The repair goes in a NEW file `cm471.py` (v4.7.1). Every inserted top-level name gets a unique suffix; the frozen chain is grepped for collisions, with the scope stated; the bracket logic stays byte-identical. The diff against cm47 goes to the review, then one controls rerun K2 under fresh names. cm47.py stays as run.
- 21:17:59 UTC (actual save): Support receval v6 received and hash-checked: `bd3baea8…`; diff from v5 `cd6b740d…`; commands `5441fd6e…`. Changes:
- After the frozen exec, iv_of is rebound to an outward read plus a $10^{-23}$ pad, refusing $|x|\ge100$.
- The laws, slabs, window premises and reconstructed chain are rebuilt padded.
- New controls: D1 (unpadded rebuild equals the frozen chain; consistency only), D2, and W1 (constructed inward rounding).
- The V1 tolerance moves to $10^{-22}$.

**SLOT GRANT S3** to the support (census 21:17:45 UTC; foreign class present: 82438, 91373, and 97843 started 21:17:38 UTC, ceiling-contact cwd): the v6 controls only. The v6 diff was sent to the review. S4 waits for that ruling and for S3.
- 21:18:38 UTC (actual save): Review adjudication 5 (`7018a061…`, 21:18:24 UTC) ADMITS the receval v6 design, closing adjudication 3's history-read premise.
- **Why (derived).** The $10^{-23}$ pad exceeds the writer's half-unit (at most $5\times10^{-24}$ for $|x|<100$), and the guard covers the rest. Because of call-time name resolution, the rebinding reaches every history field on the end-instant route; the only other parse, `t_end_of`, is never called.
- **Controls.** D1, D2 and W1 are adequate.
- **Next.** S4 may be granted once S3 shows every control passing. Unchanged signs then certify the narrower bracket.
- 21:19:10 UTC (actual save): **S3 returned by the support.** PID 99211, 21:18:14–21:18:20Z, exit 0, 5.85 s. Record `d92c9336…` (verified; controls_all_pass true): D1 identity, D2 containment and W1 (an inward-rounded nstr pair, contained when padded and missed when unpadded; the guard refuses), with P1–P9 and V0–V4 passing.

**SLOT GRANT S4** to the support (census 21:18:53 UTC; foreign class 82438, 91373, 99079): v6, ends 412 and 431, launch no earlier than 21:19:50 UTC.

**The continuation's cm471** (`05abecc0…`, diff `58b92ca1…`, name grep `d31d6636…`) moves the control code into function scope. The reported PART1 hash is identical to cm47's (`65e0edd0…`), and the 46 module-level names were grepped over the eight-file chain. It was sent to the review. K2 (cm471 controls) follows S4.
- 21:19:45 UTC (actual save): Review adjudication 6 (`26156623…`, 21:19:31 UTC): adjudication 4 CARRIES OVER to cm471, since its bracket rule is byte-identical and the controls were moved verbatim into functions. cm47 is BARRED from targets (derived: its module-level controls would shadow `b3` in every end evaluation). Condition: a new cm471 controls record (K2) passing all inherited controls and B1–B8, including B6's completed step-492 end evaluation; targets only from cm471.
- 21:22:07 UTC (actual save): **S4 returned by the support.** PID 1137, 21:20:56–21:21:21Z, exit 0, 24.96 s. The census found only the foreign class (82438; 593 and 99079 with ceiling-contact cwd). Record `d00b5dd0…` (verified). Results (measured, receval v6: padded history reads, exact cover):
- $l'(412)\in[-0.00249176,\,-0.0000898978]$, NEGATIVE.
- $l'(431)\in[0.0000876046,\,0.00328526]$, POSITIVE.
- All controls pass and both cover checks pass. The enclosures differ from v5 only by about $2\times10^{-29}$.
- The padded end times are $[5.986684593623649597167959,\,5.986684709182828044891367]$ and $[6.176684593623649597167959,\,6.176684709182828044891367]$, $10^{-23}$ wider than the recorded strings.

The support corrected its own diagnostic: in v6 the v4-reading flag reports the padded reader, so the valid v4-reading measurement is the S2 one. The certification ruling now rests with the review.
- 21:22:35 UTC (actual save): Review adjudication 7 (`05a0a810…`, 21:22:05 UTC) CERTIFIES the narrower bracket (Q3 closed); finding F1 recorded. **SLOT GRANT K2** issued to the continuation (census 21:22:07 UTC; foreign class 82438, 593, 99079): one invocation, the cm471 controls record.
- 21:24:11 UTC (actual save): **K2 returned by the continuation.** PID 2420, 21:22:35–21:23:13Z, exit 0, 37.72 s. Record `8583831a…` (verified): 68 of 68 controls pass, including B6's completed step-492 end evaluation.
- **Like root.** The fallback on rung 1 gives $[0.94058,0.94883]$, with uniqueness proved.
- **Unlike root.** $[1.64726,1.64998]$, about 0.029 below the old upper end, as predicted.
- **Step-492 end** (a controls output, not an admitted record): $w\in[0.19751,0.19979]>0$, $a\in[-0.21654,-0.20872]$, $l'\in[0.00636,0.01970]>0$, $r'\in[0.0668,0.0761]$.

**Review adjudication 8** (`84868ffe…`, 21:23:46 UTC) ADMITS cm471 for targets. It also rules on the endpoints: adjudication 7 certifies the reader-padded form, because the recorded t_int strings are written without a write pad. The October decimal form is exact only under the exact-decimal origin premise, and agrees with the padded form to 22 significant digits.

**SLOT GRANT K3** to the continuation (census 21:23:57 UTC; foreign class 82438, 593, 99079): the cm471 equivalence replay, steps 435–492 from r4. It is consistency only. P1 follows on its own grant.
- 21:27:56 UTC (actual save): **K3 returned by the continuation, with an alarm incident.** PID 3688, 21:24:57–21:26:47Z, exit 142 (110 s alarm), user time 91 s. The partial record `b1f9958f…` (verified) saved through step 476.
- **Equivalence (consistency only, shared code).** By the role's jq checker, which first passed a known case and two negatives: 42 of 42 steps (435–476) are EQUAL to r5 in every field except the recording keys and timing. Steps 477–492 were not compared.
- **Cost.** Measured about 2.2 times slower than r5 throughout, frozen code included. The role infers machine contention from three foreign Python jobs. The fallback never engaged on these steps.
- **Bracket margins on the frozen path.** The like lower margin falls 0.309 → 0.201 → 0.087 and the unlike upper margin 0.162 → 0.111 → 0.064 over steps 435 → 455 → 476.
- **PI disposition.** The partial equivalence 435–476 is accepted as consistency and not rerun; a full replay cannot fit under the alarm at this load. P1 is resized to 25 steps (492 → 517) for margin under the alarm, because an alarmed slice cannot be resumed.
- 21:28:08 UTC (actual save): **SLOT GRANT P1** to the continuation (census 21:27:56 UTC; foreign class 82438, 593, 99079; load average 12.54): cm471 resuming r5 at step 492 through step 515, launch no earlier than 21:28:17 UTC.
- 21:30:32 UTC (actual save): P1 output written 21:29:58 UTC (file times): record `e19aac94…`, steps 493–515 (23 of 23 certified, as reported by the review); the continuation's receipt is pending. **SLOT GRANT G1** to the review (census 21:30:22 UTC; only 99079, with ceiling-contact cwd, present, after PID 82438 ended): audit10, unchanged, on P1, launch no earlier than 21:31:28 UTC. P2 is held until G1's receipt.
- 21:31:12 UTC (actual save): **P1 returned by the continuation.** PID 7209, 21:28:51–21:29:58Z, exit 0, 66.79 s (1.15 s per step). Record `e19aac94…` (partial false, controls_all_pass true). Measured results (cm471):
- **Reach.** Steps 493–515 are certified with no refusal, up to $t\in[7.016684593623649597167969,\,7.016684709182828044891357]$ ($T\approx70.17$).
- **Speed.** $w>0$ proved at every end: lower bound 0.19536 at 493, 0.16996 at 504, 0.14110 at 515, falling 0.0022 to 0.0028 per step.
- **Acceleration.** Whole-step $a<0$ on every step; at 515 it is $[-0.2887,-0.2636]$.
- **Support rate.** $l'>0$ at every end. The whole-step $l'$ spans zero on 513–515.
- **Brackets.** The like fallback holds on rung 1; its lower margin falls 0.144 → 0.045, so rung 2 is expected near 525. The unlike fallback took over at step 510, when the frozen upper margin had fallen to 0.0003, as review adjudication 2 predicted. There were 146 fallback calls out of 363 and no refusals.
- **Chart.** The binding margin is the like source $q'$: 1.5952 at 515 against the edge 1.80, shrinking about 0.0045 per step.
- **Step-515 end.** $q\in[1.7822,1.7851]$; $a\in[-0.2845,-0.2700]$; $r\in[0.0812,0.0848]$; $l\in[-0.1055,-0.1011]$; $l'\in[0.0053,0.0247]$. The like class dominates: tangent $[-0.2699,-0.2558]$, radial $[0.1552,0.1585]$.

**Inferred.** The path turn is near steps 560–565 ($t\approx7.47$), at $q_{\max}\approx1.82$. The like $q'$ edge should hold through the turn. A second support turn (a maximum of $l$) looks imminent, since the whole-step $l'$ already spans zero; that fits the review's conditional prediction. P2 (515 → 550) waits for G1.
- 21:31:52 UTC (actual save): The review correctly blocked G1 at its 21:31:30 census. PID 9947 (started 21:30:50 UTC, cwd checkout root) runs another session's lattice staggered-cell driver under `lattice-research/evidence/staggered-cell-independent-2026-10-14/`; PID 82438 had ended. The standing foreign class is EXTENDED to (a) any Python with the ceiling-contact cwd, checked by lsof, and (b) any Python running a script under that lattice staggered-cell evidence directory, checked by full command line. G1 is re-granted. Continuation checkpoint 2: wave1 `fd1de59f…`; no proved-negative $l'$ end in P1.
- 21:32:59 UTC (actual save): **G1 returned by the review.** PID 10808, 21:32:18–21:32:29Z, exit 0, 10.80 s. Record `2a2a16dd…` (verified); 66 of 66 controls pass. All 23 P1 steps are audited with 0 fails and 0 sign disagreements:
- the review's own roots meet the subject's;
- its own end evaluations give $w>0$, $a<0$ and $l'>0$ at every end;
- both whole-step $a$ signs are negative on 493–515.

The resume-string flag is a known artifact of placing the target in `--own`; the own-append continuity assertion passed. The `new_box_violations` list covering all of 493–515 is the stale audit8 box, and the review will rule on its scope.
- 21:33:07 UTC (actual save): **SLOT GRANT P2** to the continuation (census 21:32:59 UTC; foreign class (a) 9251, 99079): cm471, resuming P1 through step 550, launch no earlier than 21:33:59 UTC.
- 21:34:24 UTC (actual save): Review adjudication 9 (`f3f69c2a…`, 21:34:09 UTC) ACCEPTS slice P1 (493–515), with no event.
- **Scope.** The actual domain is receiver $q\in[1.7407,1.7851]$, source $q'\in[1.1468,1.5952]$, $w'\in[0.2891,0.3756]$, with $D_t\ge0.7447$. It lies inside the support's admitted G1 chart, and the review's kernels are closed-form intervals that need no chart. No event is taken from audit10's summary.
- **No path turn through the step-515 end** (derived). This follows from October adjudication 15, the step-492 VS box and whole-step $a<0$.
- **No second support turn claimed.** $l'>0$ at every end (margin at least 0.0059), but $l''$ is undecided at K = 1 between ends.
- **Mechanism (measured centres).** $-2wa$ falls from 0.0846 to 0.0790 and $r'$ from 0.0714 to 0.0641 over 493 → 515.
- **Next.** A second-support-turn certificate will need a ddl10 lemma run, at about 1 s per step at K = 4.
- 21:36:12 UTC (actual save): P2 output written 21:35:30 UTC: record `08683e84…`, steps 516–550, all 35 certified as the review reports. The continuation's receipt is pending.

**Review preview** (subject values, not yet audited): $w\in[0.02398,0.03029]>0$ at the step-550 end, with whole-step $a\approx-0.36$ to $-0.40$, so $w$ should reach zero near step 556–558. The $l'$ end enclosures straddle zero from about step 531, because their widths have grown. $r'\in[0.0111,0.0315]$ at 550.

**SLOT GRANT G2** to the review (census 21:36:00 UTC; class (a) 9251 and 99079; class (b) 12278, `staggered_propagation.py`, started 21:33:52 UTC): audit10 on P2, launch no earlier than 21:37:00 UTC.
- 21:36:37 UTC (actual save): **P2 returned by the continuation.** PID 12496, 21:34:07–21:35:30Z, exit 0, 82.67 s (1.12 s per step). Record `08683e84…` (partial false, controls pass). Measured results (cm471):
- **Reach.** Steps 516–550 are certified with no refusal, up to $t\in[7.366684593623649597167969,\,7.366684709182828044891357]$ ($T\approx73.67$).
- **Speed.** $w>0$ proved at every end; the lower bound first drops below 0.1 at the step-529 end. At 550, $w\in[0.02398,0.03029]$, falling about 0.0038 per step.
- **Acceleration.** Whole-step $a<0$ on every step; at 550 it is $[-0.4010,-0.3561]$.
- **Support rate.** $l'>0$ is proved at ends 516–530 only. Every end 531–550 spans zero; at 550 the enclosure is $[-0.0141,0.0128]$. The whole-step $l'$ spans zero on every step. No proved-negative end.
- **Brackets.** The like fallback moved to rung 2 at step 526 (margin 0.0705 at 550). The unlike fallback holds on rung 0 (margin 0.295). The antipode stays on the frozen bracket. There were 350 fallback calls out of 543 and no refusals.
- **Chart.** The like source $q'$ is 1.7190 at 550, margin 0.081 to the 1.80 edge, falling about 0.003 per step (holds to about step 575, inferred). Source $w'\in[0.222,0.366]$.
- **Step-550 end.** $q\in[1.8100,1.8165]$; $r\in[0.0962,0.1021]$; $l\in[-0.1030,-0.0968]$. The like tangent contribution is $[-0.3819,-0.3501]$, the like radial $[0.1697,0.1753]$.

**Inferred.** The first proved-negative $w$ end should come near step 558–559. A maximum of $l$ cannot be decided at end resolution here, since the $l'$ end width is about 0.027.

P3 (550 → 570) is requested and is held until G2 returns.
- 21:36:54 UTC (actual save): Support Phase B answer: receval v6 can evaluate P1, P2 and later slices as further reconstructed records with no code change. It admits only consecutive certified records with end strings, and the reads and fields match. Joins will be checked by exact-string jq before launch. Planned: S5 (end-instant $l'$ on ends where the subject is undecided, to try to bracket a maximum of $l$) and S6 (the account at the path-turn ends). Both are held until the slot frees after G2 and P3.
- 21:37:39 UTC (actual save): **G2 returned by the review.** PID 16070, 21:37:09–21:37:22Z, exit 0, 12.42 s. Record `99e5b873…` (verified); 66 of 66 controls pass. All 35 P2 steps are audited with 0 fails and 0 sign disagreements; frozen consistency is 282 of 282. The adjudication will follow.
- 21:37:46 UTC (actual save): **SLOT GRANT P3** to the continuation (census 21:37:39 UTC; class (a) 9251, 99079; class (b) 12278): cm471, resuming P2 through step 570, launch no earlier than 21:38:52 UTC.
- 21:39:03 UTC (actual save): Review adjudication 10 (`a3ec1018…`, 21:38:39 UTC) ACCEPTS P2 (516–550), with no event.
- **Measured.** The review's own end $l'$ is positive through the 533 end ($[0.0000629,0.02194]$) and undecided at 534–550. At 550, $l'\in[-0.0122,0.0107]$, $r'\in[0.0133,0.0296]$, $-2wa\in[0.0174,0.0240]$. The domain lies inside G1, with the like $q'$ margin at 0.081. No path turn through the 550 end.
- **Route to a second support turn (derived).**
  - (i) At the first certified end $m$ with $w<0$ proved, $-2wa=-2|w||a|<0$, so $l'<0$ follows from a proved $r'>0$ there.
  - (ii) The positive side is $l'(533)>0$.
  - (iii) Uniqueness and strictness need $l''<0$ on every whole step 534..$m$, from ddl10 unchanged.
  - (iv) The lower-bound lemma covers 437–533.
  - The result would be a strict local MAXIMUM of $l$, and its order relative to the path turn follows from $l'(t^*)=-r'(t^*)$ when $r'>0$ is proved on the path-turn bracket.
- **Cost.** One ddl10 run at K = 4 over about 492..$m$ (about 70 steps, 65–75 s; split if needed), plus an optional K = 8 rerun.
- **PI plan after P3:** G3 (audit10 on P3) → G4 (ddl10) → S6 (the support's account at the path-turn ends) → S5, if useful, as a cross-code check of the $l'$ ends.
- 21:41:01 UTC (actual save): P3 output written 21:40:02 UTC: record `e6b7fbb6…`, steps 551–570, 20 of 20 certified. The PI read the end $w$ strings with node, without Python: $w>0$ is proved through the 556 end ($[0.00055,0.00744]$), straddles at 557, and is proved NEGATIVE from the 558 end ($[-0.00744,-0.00034]$) through 570.

**Review preview** (subject values, not yet audited):
- Whole-step $a<0$ on 557 and 558. The expected path-turn bracket with padded times is $(7.426684593623649597167959,\,7.446684709182828044891367)$, about $T\in(74.267,74.467)$.
- $r'$ turns undecided by 556 and is proved NEGATIVE from 568: the canonical radial acceleration peaks near the path turn. The free negative side for $l'$ in adjudication 10's route therefore FAILS. The subject first proves $l'<0$ at 562.
- The second support turn would then lie in roughly (533, 562), overlapping the path-turn bracket, so their order would be undecided by this route.

**SLOT GRANT G3** to the review (census 21:40:49 UTC; class (a) 9251, 99079; class (b) 12278): audit10 on P3, launch no earlier than 21:41:32 UTC. G4a and G4b (ddl10, K = 4, 492–530 and 531–570) come next on their own grants.
- 21:41:13 UTC (actual save): **P3 returned by the continuation.** PID 18367, 21:39:00–21:40:02Z, exit 0, 61.85 s, no refusal. The continuation STOPS here under its brief.
- **Speed (measured).** The last proved $w>0$ end is 556; 557 straddles; the first proved $w<0$ end is 558; every end 559–570 has $w<0$.
- **Acceleration.** Whole-step $a<0$ on every step 551–570; on 557 $[-0.4188,-0.3696]$, on 558 $[-0.4211,-0.3713]$.
- **Candidate path-turn bracket:** $t\in(7.426684593623649597167969,\,7.446684709182828044891357)$.
- **Step-558 end.** $q\in[1.81069,1.81771]$, $r\in[0.0971,0.1035]$, $l\in[-0.1036,-0.0971]$; $l'$ spans zero. The like class dominates: tangent $[-0.4017,-0.3652]$, radial $[0.1705,0.1767]$.
- **Support rate.** The first proved-negative $l'$ end is 562; every end 562–570 is negative. With $l'(530)>0$, a zero of $l'$ (a maximum of $l$) lies in $(7.1667,7.4867)$. Its uniqueness and its order relative to the path turn are not decided.
- **Chart.** Like source $q'\le1.7667$ (margin 0.033 at 570); source $w'\ge0.171$. No chart extension was needed.
- **Code reading.** The chain treats the receiver's $w$ as signed. The only built-in $w\ge0$ is the analytic release window for source times $s\le T^*\approx1.367$, which is not a receiver assumption.
- 21:41:47 UTC (actual save): Continuation checkpoints 3 and 4: the living report `4b3031dd…` (21:41:34 UTC) is complete through P3 and adds section 8, the bracket history. The role corrected its own size estimate: its evidence files total 4,873,397 bytes (by ls), not "about 9 MB"; its scratch is about 4.2 MiB, mostly two r5 copies for the jq negatives; nothing is in .local-data. It is holding.
- 21:42:39 UTC (actual save): **G3 returned by the review.** PID 21618, 21:42:09–21:42:20Z, exit 0, 10.57 s. Record `8b6e4dd0…` (verified); 66 of 66 controls pass. All 20 P3 steps are audited with 0 fails and 0 sign disagreements, reaching $[7.566684593623649597167969,\,7.566684709182828044891357]$. The path-turn adjudication will follow.
- 21:42:47 UTC (actual save): **SLOT GRANT G4a** to the review (census 21:42:39 UTC; class (a) 9251, 99079; class (b) 12278, cwd checkout root): ddl10, unchanged, K = 4, steps 492–530, launch no earlier than 21:43:50 UTC.
- 21:44:45 UTC (actual save): **G4a returned by the review: a COMPUTE INCIDENT.** PID 23703, 21:43:51–21:44:01Z, EXIT 1. Every audit9, refinement and insertion control passed. The run then crashed with `KeyError 'end_classes'`: ddl10 evaluates its own end $l'$ from step K1−1, and step 492 in r5 has no end classes because the frozen end evaluation refused there. The range was chosen wrongly; the instrument is not at fault. The failed record is kept (`6c34b316…`; no band record was written). Steps 492–512 are covered by the subject's admitted whole-step $l'>0$ boxes (cross-code). Re-request G4a2 over 494–530.
- 21:44:53 UTC (actual save): **SLOT GRANT G4a2** to the review (census 21:44:45 UTC; only 9251 and 99079, class (a), present): ddl10, K = 4, steps 494–530, launch no earlier than 21:45:31 UTC.
- 21:47:33 UTC (actual save): **G4a2 returned by the review.** PID 25703, 21:45:37–21:46:34Z, exit 0, 56.63 s. Band record `aa8c5061…` (verified); all controls pass and every row reads reconstructed history only. Results:
- **Measured.** The refined $l''$ hulls at K = 4 straddle zero on every step 494–530, with widths about 0.10–0.19 against about 0.03 in October. Uniqueness or strictness of a second support turn by ddl10 is therefore out of reach in this campaign; K = 8 cannot close it (inferred).
- **Derived** (lower-bound lemma $l'\ge A+\min(L,0)\Delta$ on the review's own end bounds): $l'>0$ at every instant on 494–530, with margins 0.0064 down to 0.0006. Steps 492–493 are covered cross-code by the subject's whole-step boxes. So $l'>0$ at every instant from the 437 end to the 530 end.
- **Next.** G4b′ (ddl10 on 531–533 only, about 15 s) replaces G4b, to extend the lemma.
- **Planned ruling.** EXISTENCE of a local maximum of $l$ (the second support turn) in about (530–531 end, 560 end), with uniqueness and strictness open and its order relative to the path turn undecided.
- 21:47:42 UTC (actual save): **SLOT GRANT G4b′** to the review (census 21:47:33 UTC; only 9251 and 99079, class (a)): ddl10, K = 4, steps 531–533, launch no earlier than 21:48:04 UTC.
- 21:48:05 UTC (actual save): Review adjudication 11 (`a1e34ae8…`, 21:47:23 UTC) ACCEPTS P3 and CERTIFIES the first PATH TURN, unique and strict, in $(7.426684593623649597167959,\,7.446684709182828044891367)$; a local canonical-radial maximum exists in $(7.4367,7.5267)$. Finding F2 recorded. Q2's closing condition is MET. Remaining: G4b′ and the second-support-turn ruling, then the support's S6 and S5, then closeout.
- 21:50:21 UTC (actual save): **G4b′ returned by the review.** PID 28240, 21:48:56–21:49:12Z, exit 0, 16.30 s. Band record `ceaf4d64…`; all controls pass. The $l''$ hulls straddle zero at 531–533.

**Review adjudication 12** (`145d1875…`, 21:49:58 UTC): the SECOND SUPPORT TURN, a local MAXIMUM of $l$ (a minimum of inward-support magnitude), is certified as to EXISTENCE in $(7.176684593623649597167959,\,7.466684709182828044891367)$, $T\in(71.767,74.667)$.
- **Negative side.** The review's own end evaluation at 560: $l'\in[-0.023992,-0.000566]$.
- **Positive side.** It holds at every instant from the 437 end to the 531 end: October adjudication 15; the subject's whole-step boxes on 492–493 (cross-code); and the review's lemma on 494–531, with margins 0.00635 down to 0.00017.
- **Scope.** Every local maximum of $l$ after the first support turn up to $t_{560}$ lies in the bracket.
- **Open.** Uniqueness and strictness, since the $l''$ hulls are 0.10–0.20 wide. The order relative to the path turn is UNDECIDED, because the path-turn bracket lies inside this one.

The completion ruling to the 570 end is in adjudication 12, section 5.
- 21:50:30 UTC (actual save): **SLOT GRANT S6** to the support (census 21:50:21 UTC; only 9251 and 99079, class (a)): receval v6 at ends 556, 557 and 558, with P1–P3 appended, launch no earlier than 21:50:42 UTC.
- 21:56:40 UTC (actual save): S6 had not launched by 21:56:26 UTC. The grant was repeated at 21:54. Census 21:56:26 UTC: a new foreign process, PID 34472 (started 21:56:12 UTC, cwd checkout root, `.tmp/rotating-ladder/codex-review/raw_reference.py`, another session's rotating-ladder review). Standing foreign class (c) is added: any Python whose full command line runs a script under `.tmp/rotating-ladder/`. S6 stands under it.
- 21:58:58 UTC (actual save): S6 launched (PID 35791, started 21:57:35 UTC; the support's receipt is pending). Census 21:58:50 UTC: more foreign processes from another session's rotating-ladder work. PID 35095 runs `.tmp/rotating-ladder/codex-review/high_precision.py` (class (c)). PID 37528 runs `controls.py`, started 21:58:43 UTC, with cwd `reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-claude-2026-10-20/delayed-growth`. Standing class (d) is added: any Python whose lsof-checked cwd lies under `…/lattice-research/evidence/rotating-ladder-claude-2026-10-20/`.
- 22:00:51 UTC (actual save): **S6 returned by the support.** PID 35791, 21:57:35–21:59:19Z, exit 0, 104.70 s wall against only 34.2 s of user CPU (foreign load). Record `3ec77e74…` (verified). All joins pass and all controls pass. Results (measured, receval v6, end instants; physical: $l'$ and $r'$ divided by 100):
- **End 556:** $l'\in[-0.01456,+0.00033]$, undecided; $r'\in[0.0047,0.0161]$.
- **End 557:** $l'\in[-0.01587,-0.00099]$, NEGATIVE, with $w$ straddling zero.
- **End 558:** $l'\in[-0.01728,-0.00224]$, NEGATIVE.
- **Classes.** At all three ends the like class dominates: tangent about $-0.37$ to $-0.40$, radial about $+0.171$ to $+0.176$; $r\approx[0.0976,0.1028]$, $l\approx-r$.
- **Root note.** The like root's upper margin inside the recorded source range is 0.0 at all three ends. It is still proved inside by v6's residual-sign check, but the review is asked to look.

**Consequence (inferred; for the review).** The proved negative $l'$ at the 557 end would tighten the upper end of the second-support-turn bracket from the 560 end to the 557 end ($t\le7.436684709182828044891367$). The order relative to the path turn stays undecided unless $l'<0$ is proved at an end at or before 556.

S5 is resized for load into two two-row invocations.
- 22:01:13 UTC (actual save): Review adjudication 13 (`d4d372e8…`, 22:00:31 UTC) ADMITS S6.
- **Second support turn (derived).** It exists in $(7.176684593623649597167959,\,7.436684709182828044891367)$, $T\in(71.767,74.367)$, with the negative end now the support's 557 (cross-code). Uniqueness is open.
- **Canonical-radial maximum.** A local maximum exists in (558 end, 566 end) = $(7.4467,7.5267)$, after the path turn as instants. Another between 557 and 558 is not excluded.
- **Order.** The events overlap only between the 556 and 557 ends, so the order is still undecided. A proved $l'<0$ at the 556 end would place the support maximum strictly BEFORE the path turn.
- **PI decision.** S5 is deferred. The support prepares receval v7, changing only the end-cover count (as a parameter) plus an optional cost flag that skips the whole-step parts, with controls at the new count. Then a single end-556 run, sized to fit the alarm under load.
- 22:07:38 UTC (actual save): Support receval v7 received and hash-checked: `b0d1462e…`; diff from v6 `d7de3575…`; commands `923a0aa5…`. Changes:
- E1: end-cover counts as a parameter.
- E2: an `--end-only` cost flag.
- E3: per-q-piece reuse of the source contraction and lookup, claimed to depend only on $(t,q)$; sent to the review for verification.
- E4: diagnostics.

The cover is planned at 6×24, refining along $w$, through which $l'$ depends on $w$ via $-2wa$ and the law. S8 is estimated at about 45 s wall under load.

Foreign classes BROADENED at 22:07:20 UTC, after a census showing nine foreign Python processes from three other sessions: (c) and (d) now match cwd OR script path under `.tmp/rotating-ladder/` and under `…/lattice-research/evidence/rotating-ladder-claude-2026-10-20/`.

**SLOT GRANT S7** to the support: v7 controls at 6×24 with `--end-only`. S8 waits for the review's ruling on v7.
- 22:07:47 UTC (actual save): Review adjudication 14 (`a3ad4494…`, 22:07:23 UTC) ADMITS receval v7.
- **E3 is valid** by code reading: the contraction and lookup depend only on the end time, the $q$ piece and the proved range, and the law reads only the states.
- **The like root's zero upper margin is SOUND** (derived). $g(s)$ is strictly decreasing, and the check proves the sign at both ends of the recorded range over the whole box, else it refuses. So the root lies in the closed range; it is not a refusal in disguise.
- **Conditions for S8:** all controls pass first in the same invocation; the cover check passes; the counts are recorded.

**The continuation handed back its final report** (`c7ca598b…`, 38,833 bytes, with a manifest of its 25 files totalling 4,873,397 bytes; scratch 4316 KiB; no .local-data; no Git writes).
- Compute record: K1 (exit 2, the shadowing defect), K2, K3 (alarm 142, partial accepted), P1, P2 and P3, all on grants with censuses.
- No background processes; final check at 22:06 UTC.
- 22:09:10 UTC (actual save): **S7 returned by the support.** PID 47600, 22:08:04–22:08:23Z, exit 0, 19.48 s. Record `9ea3f2f2…` (verified; controls_all_pass true). V1 is exact on all 144 pieces at 6×24; V2–V4 refuse as designed, and the bypassed V2 misses the known end.

The support's first census at 22:07:51 still applied the old class rules and correctly blocked on PID 44095, a rotating-ladder script run from the checkout root. It rewrote its census to the broadened classes (cwd by lsof, script by `ps -ww`). **SLOT GRANT S8** follows: v7 at end 556, 6×24, `--end-only`.
- 22:15:33 UTC (actual save): S8 output written at about 22:14:51 UTC (file times; the support's receipt is pending). Record `…-support-S8-receval-v7-end556-6x24.json`, read by the PI with node: controls_all_pass true; cover counts $6\times24$. Results:
- **$l'(556)\in[-0.01355014,\,-0.00066607]$: NEGATIVE.** Every $q$-piece hull's upper end is negative; the largest is $-0.000666$ at piece (5, 23).
- **Inferred, for the review.** At the actual step-556 end instant, $w>0$ and $l'<0$. The local maximum of $l$ therefore lies strictly before that instant, and the path turn strictly after it. So the second support turn precedes the path turn. The review rules.
- 22:15:47 UTC (actual save): **S8 returned by the support.** PID 51939, 22:14:20–22:14:51Z, exit 0, 31.08 s wall, 11.78 s user. Record `86beeb59…` (matches the PI's hash).
- **Result (measured).** $l'(556)\in[-0.01355014,\,-0.00066607]<0$ at 6×24, against $[-0.01456,+0.00033]$ at 3×3 (S6). The upper end is set at the top corner of the box (maximum $q$, maximum $w$), where $-2wa\le0.0060$ nearly balances $r'\ge0.0052$.
- **PI decision.** S5 (narrowing the lower end of the second-support-turn bracket) is NOT run. Both questions have met their closing conditions; it would only narrow a bracket whose existence and order are already settled, so it is recorded as an optional follow-up. The PI proceeds to closeout after the review's order ruling.
- 22:16:06 UTC (actual save): Review adjudication 15 (`5b9b491e…`, 22:15:35 UTC): the local maximum of $l$ lies STRICTLY BEFORE the path turn, in $(7.176684593623649597167959,\,7.426684709182828044891367)$; uniqueness is OPEN. Finding F3 recorded. All compute is complete: the continuation and support are closed for compute; the review is asked for its final report. Closeout begins.
- 22:21:52 UTC (actual save): **The review handed back its final report** (`d373316d…`, 22:21:19 UTC): reference, adjudications 1–15, the G1–G4b′ receipts with the G4a incident, the completion ruling and the endpoint rule.
- **Files.** 17 analysis and 25 evidence files under its prefix; evidence 3,047,353 bytes; scratch 20 KiB; no .local-data.
- **Processes.** No background processes.
- **Follow-ups it proposes** (not granted): a correlated $l''$ instrument for the second support turn's uniqueness; a whole-step $r''$ sign for the radial maximum; a chart extension beyond $q'=1.80$.

## 5. Account (written at closeout)

### 5.1 The answer in plain words

Both selected questions are answered on the identical radius-10 six-pole rest history.

- **Item 3, the narrower first-support-turn bracket: certified (F1).** It was conditional because the October evaluator's end cover might have missed a rounding sliver. Repairing that also exposed two quiet reading gaps, and all three were closed. The October sliver never actually occurred, but the October reading of the recorded end strings had shrunk some evaluated boxes by about $10^{-31}$. The first support turn, the moment of strongest inward support, lies in $t\in(5.9867,\,6.1767)$, $T\approx59.87$–$61.77$.
- **Item 2, the path turn: certified (F2).** The October run stopped at step 493 because a delay-root search window was fixed and the root had moved out of it. A repaired window was proved correct, and the review predicted the second window failure for steps 507–509 from the measured root drift; the frozen window held through 509 with margin 0.0003 and first needed the repair at 510. The history then continued for 78 more steps with no refusal. The poles stop and reverse at a single instant $t^*\in(7.4267,\,7.4467)$, $T^*\approx74.27$–$74.47$, at $q_{\max}\approx1.81$. The like partners' backward pull does it.
- **Beyond the question (F3).** The signed support has a local maximum, a minimum of inward-support magnitude, strictly before the path turn, in $t\in(7.1767,\,7.4267)$. Its uniqueness is open. The canonical radial acceleration peaks just after the turn.
- **Grade.** Derived from measured interval enclosures: mpmath interval arithmetic at 30 digits, method of steps with $N=4000$ and $\Delta=0.01$, on the history from the step-154 anchor to step 570. Every ruling comes from the independent review's own instruments. The narrower bracket and the second-turn negative side also use the support's separately written evaluator. All share the stored-rate, step-instrument, inclusion and intersection premises, so their agreement is a cross-check between codes, not independent evidence.

### 5.2 Settled account

| item | status | interval | grade | ruling |
| --- | --- | --- | --- | --- |
| First support turn, narrower bracket | CERTIFIED, unique, strict | $(5.986684593623649597167959,\,6.176684709182828044891367)$ | derived from measured | review 7 |
| First path turn ($w$ from $+$ to $-$, max of $q$) | CERTIFIED, unique, strict | $(7.426684593623649597167959,\,7.446684709182828044891367)$ | derived from measured | review 11 |
| Second support turn (local max of $l$) | EXISTS, strictly before $t^*$; uniqueness open | $(7.176684593623649597167959,\,7.426684709182828044891367)$ | derived from measured | reviews 12, 13, 15 |
| Canonical radial local max | EXISTS; uniqueness and full order open | $(7.446684593623649597167959,\,7.526684709182828044891367)$ | derived from measured | reviews 11, 13 |
| Certified reach | steps 493–570, no refusal | to $t\in[7.566684593623649597167969,\,7.566684709182828044891357]$ | measured | reviews 9–11 |
| Signs on 493–570 | $a<0$ on every whole step; $w>0$ through 556, $w<0$ from 558 | — | measured | reviews 9–11 |
| Domain | inside the admitted chart; like $q'\le1.7667$ against edge 1.80 | — | measured | reviews 9–11 |

**Endpoint reading.** All brackets use the conservative padded reading of the uncertain end times (review 8). The recorded time strings have no write pad, so the October decimal form ($\ldots969$, $\ldots357$) is exact only under the exact-decimal origin premise. It agrees with the padded form to 22 significant digits.

### 5.3 Instruments and admissions

- **Support evaluator.** receval v5 → v6 → v7, each a new file.
  - v5 brought the exact shared-edge cover and the outward end-string read (review 1).
  - v6 added padded history reads (reviews 3 and 5).
  - v7 added a variable cover count and an end-only cost path (review 14).
  - Controls: S1, S3 and S7 each passed everything, with known images, a dropped-edge negative with teeth, gap and outside negatives, and a constructed inward-rounding case.
- **Step instrument.** cm46 → cm47 → cm471, each a new file.
  - cm46 repaired the lower end (review 2).
  - cm47 added the upper end (review 4); its harness defect caught by K1 means it is barred from targets (review 6).
  - cm471 moved the controls into function scope (review 6) and passed 68 of 68 controls (K2; review 8).
  - The equivalence replay is consistency only, 42 of 42 equal on 435–476 (K3, partial).
- **Review instruments.** The review's frozen audit10 and ddl10 were used unchanged under the PI's scope condition: each ruling states the qualification of the actual domain, and nothing is taken from audit10's stale event summary.

### 5.4 Falsifiers

- An enclosure that misses its true value on re-audit.
- For the narrower bracket: a proved $l'\ge0$ at the 412 end or $l'\le0$ at the 431 end.
- For the path turn: a proved $w\le0$ before the 556 end, a proved $w\ge0$ at the 558 end, or a proved $a\ge0$ on whole steps 557–558.
- For the second support turn: a proved $l'\le0$ before the 531 end or $l'\ge0$ at the 556 end.
- For the equivalence: a byte difference in a replay on states where the frozen bracket straddles.
- A fallback root disjoint from the review's own root on the same state.

### 5.5 Incidents and process findings

- **Overlap.** No compute overlap occurred. Every invocation had a PI grant naming it, a census, and a receipt. The 90 s idle rule was in the briefs from launch and was kept between target invocations.
- **PI incident.** An ungranted `../.venv/bin/python -I -c 1` no-op ran at about 21:07:53 UTC, inside a hash-check command, between S1 and S2. There was no overlap. It is disclosed in section 4.
- **K1** (continuation): a control harness global `b3` shadowed the frozen `b3`. The controls failed (exit 2) before any target, and the defect was fixed in cm471.
- **K3** (continuation): the consistency replay hit the 110 s alarm (exit 142) under machine load about 2.2 times slower than October. Its partial result was accepted as consistency only.
- **G4a** (review): ddl10 was started at step 492, which has no end classes, and crashed with KeyError (exit 1) after its controls passed. It was rerun as G4a2 over 494–530.
- **Foreign processes.** Python work from four other sessions (ceiling-contact, lattice staggered-cell, two rotating-ladder efforts) started and stopped throughout. The roles correctly blocked launches on unnamed processes several times (S2 twice, G1 twice, S7 once). The PI replaced per-PID naming with standing foreign classes (a)–(d), each defined by working directory or script path and checked with lsof and `ps -ww`. No foreign process was touched.
- **Corrections by roles.**
  - The continuation corrected its evidence-size estimate ("about 9 MB" to the measured 4.87 MB).
  - The support corrected a v6 diagnostic flag that reported the padded reader.
  - The review corrected its own census note on 12278's working directory.
- **PI corrections.**
  - Several grant texts carried round minute times. Where written in records, they were clock-read.
  - The October "about 40 steps to the path turn" guess was wrong; the measured distance was about 65 steps (the turn lies between the 556 and 558 ends).
- **Load.** Wall-to-user time ratios reached 3.1 under foreign load. Slice sizes were reduced to keep every target under the alarm, since an alarmed slice cannot be resumed.

### 5.6 Grant ledger

| grant | holder | PID | UTC | exit | purpose |
| --- | --- | --- | --- | --- | --- |
| S1 | support | 90318 | 21:07:07–21:07:11 | 0 | v5 controls |
| S2 | support | 92610 | 21:11:56–21:12:28 | 0 | v5 ends 412, 431 (informative) |
| S3 | support | 99211 | 21:18:14–21:18:20 | 0 | v6 controls |
| S4 | support | 1137 | 21:20:56–21:21:21 | 0 | v6 ends 412, 431 (certifying) |
| K1 | continuation | 95250 | 21:15:09–21:15:42 | 2 | cm47 controls (B6 harness defect) |
| K2 | continuation | 2420 | 21:22:35–21:23:13 | 0 | cm471 controls 68/68 |
| K3 | continuation | 3688 | 21:24:57–21:26:47 | 142 | equivalence replay (alarm; partial) |
| P1 | continuation | 7209 | 21:28:51–21:29:58 | 0 | steps 493–515 |
| G1 | review | 10808 | 21:32:18–21:32:29 | 0 | audit10 on P1 |
| P2 | continuation | 12496 | 21:34:07–21:35:30 | 0 | steps 516–550 |
| G2 | review | 16070 | 21:37:09–21:37:22 | 0 | audit10 on P2 |
| P3 | continuation | 18367 | 21:39:00–21:40:02 | 0 | steps 551–570 |
| G3 | review | 21618 | 21:42:09–21:42:20 | 0 | audit10 on P3 |
| G4a | review | 23703 | 21:43:51–21:44:01 | 1 | ddl10 492–530 (range error) |
| G4a2 | review | 25703 | 21:45:37–21:46:34 | 0 | ddl10 494–530 |
| G4b′ | review | 28240 | 21:48:56–21:49:12 | 0 | ddl10 531–533 |
| S6 | support | 35791 | 21:57:35–21:59:19 | 0 | v6 ends 556–558 |
| S7 | support | 47600 | 22:08:04–22:08:23 | 0 | v7 controls 6×24 |
| S8 | support | 51939 | 22:14:20–22:14:51 | 0 | v7 end 556 at 6×24 |
| S5 | support | — | — | — | NOT run (optional follow-up) |

### 5.7 Limits and open questions

- **Second support turn.** Its uniqueness and strictness need $l''<0$ proved on whole steps in the bracket. At K = 4 the refined enclosures are 0.10–0.20 wide, so a finer or correlated second-rate evaluation would be needed.
- **Radial maximum.** Its uniqueness, and whether another maximum lies between the 557 and 558 ends, are open.
- **Continuation past step 570.** The like source coordinate approaches the qualified edge 1.80, and the like search would need its next rung within about 10 steps. A separately controlled chart extension must come first.
- **Correlation.** Delayed reads and the clock origin are still carried as independent boxes, a stated loss inherited from October.

## 6. Closeout (written 22:24:17 UTC, clock-read; early, before the 23:39:49 stop and the 23:54:49 hard close; no clock extended)

- **Closing conditions met.**
  - Q3: the narrower bracket was certified by the review (adjudication 7).
  - Q2: the path turn was independently adjudicated with both sides attained and a full account (adjudication 11).
  - Extra: the second support turn's existence and order were ruled (adjudications 12, 13 and 15).
- **Last compute.** S8 ended at 22:14:51 UTC. S5 was not run; it is recorded as an optional follow-up.
- **Roles.** All three handed back with full return contracts and stopped. ListAgents at 22:23 UTC lists no running agent of this campaign.
  - Continuation: final report `c7ca598b…`; 25 files, 4,873,397 bytes; scratch 4,316 KiB.
  - Support: wave-1 report `3df0af2d…`; self-excluded manifest `…-support-manifest-20261020T222238Z.txt` (`b0d565ea…`, 52 files, filed under analysis); prefix total 412,758 bytes; scratch 1,220 KiB.
  - Review: final report `d373316d…`; 42 files; evidence 3,047,353 bytes; scratch 20 KiB.
  - The PI timer was stopped with TaskStop.
- **Final census** (22:23:35 UTC, read-only). No Python process of this campaign is running. Present are other sessions' processes only: ceiling-contact (9251), lattice staggered-cell (40617), rotating-ladder work (57879, 58755, 58863, 59443, 59444, 59665, 59728) and an EOM unit-test run (58196). None is touched.
- **Storage** (`du -sk`, 22:23 UTC):
  - evidence: 9,800 KiB in 96 files;
  - analysis: 332 KiB in 23 files;
  - scratch `.tmp/six-pole-path-continuation`: 5,656 KiB;
  - `.local-data/…/six-pole-path-continuation`: 0 KiB, no files;
  - total about 15.4 MiB, within the 50 MiB budget.
  - Storage is local only; nothing is committed and there is no remote backup.
- **Integration.**
  - [Manuscript 5.14](../manuscript.md#514-the-first-strict-minimum-of-signed-support): the narrower bracket paragraph is updated from conditional to certified.
  - [Manuscript 5.15](../manuscript.md#515-the-first-path-turn-and-a-second-support-turn): the path turn and second support turn are new.
  - The lane's priorities.md and work-queue.md are marked closed, and work-log.md has a 2026-10-20 entry.
  - No corpus, `src/`, generated-file, Git or publication change.
- **Manifest.** A dated, self-excluded final manifest of every campaign-prefix file in analysis and evidence, plus the retained-local tree. It is generated to scratch, copied under its dated name, and verified row by row. Its sha256 is reported to the operator in chat.
- **Mutable files** at manifest time are snapshots: this synthesis and the plan.
