# Independent event cells: event extraction from the 31 reviewed cells

Date: 2026-10-12. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`), under Codex's release entry of 21:24:38.820Z in the [event-cells conversation](../../../../op/agent-chats/2026-10-12-residuals-event-cells/chat.md). Status: arithmetic reviewed by Codex (entry of 21:34:55.242Z); report corrected for REX-01 to REX-04 in Sections 1, 3, 5, 6 and the new Section 9, **pending Codex review of the corrections**; no instrument, output or receipt changed. Written under a twelve-minute cap, so it is brief. The cells it reads are documented in the [chain report](event-cell-independent-chain-2026-10-12.md).

## 1. Outcome

All extraction predicates hold on the 31 reviewed cells. In words: under the shared assumptions of Section 6, some receiver's actual speed first equals the field speed ($c_f=1$) at a time in $(87/16,\,351/64]$; only twelve named receivers can be the one; each of them would cross with strictly positive rate; and the vertical-velocity, domain and separation bounds in the table hold for the auxiliary comparison on every cell through $351/64$. For the actual solution of the full Master Equation those three bounds, like everything else here, are asserted only up to the actual first event time $\tau$, with $87/16<\tau\le351/64$: both selected targets keep positive vertical velocity, every one of the 1,502 receivers stays inside the displacement domain, and distinct receivers stay apart, for $5\le t\le\tau$. No continuation of the full law beyond $\tau$ is selected or claimed.

| Predicate | Result | Margin (rounded outward) |
| --- | --- | --- |
| Safe prefix: cells, consecutive from cell 0, whose whole-cell speed upper bound plus velocity majorant is strictly below one | cells 0 to 27, through $87/16$ | largest value on cell 27 at most $0.94507$; cell 28 has $1.0545$ |
| First raw endpoint whose speed lower bound (norm of the archive velocity minus that endpoint's velocity majorant) is strictly above one | endpoint 31, time $351/64$, receiver $(-1,0,1)$ | lower bound at least $1.0107$; endpoints 28, 29, 30 have $0.7815$, $0.8499$, $0.9262$ |
| Bracket for the first speed-one event | $(87/16,\,351/64]$ | width $3/64$ |
| Possible identities (whole-cell upper bound plus majorant at least one), cells 0 to 30 | 12, all in cells 28 to 30 | none in cells 0 to 27 |
| Transversality lower estimate $\hat v\cdot\hat a - V|\hat a| - A$ positive for every candidate on its whole cell | yes, all 30 cell-candidate pairs | smallest at least $1.6329$ |
| Vertical velocity of targets $(0,0,0)$ and $(1,0,0)$ positive on cells 0 to 30 | yes | smallest lower bound at least $0.1320$, on cell 0; rises to $0.8566$ on cell 30 |
| Displacement with error inside $7/20$ on cells 0 to 30 | yes | largest at most $0.26502$ |
| Distinct labels apart on cells 0 to 30 | yes | separation at least $0.4699$ (smallest site distance 1, minus twice the largest displacement) |

Candidates by cell. Cell 28, $[87/16,\,349/64]$: $(-1,0,1)$, $(0,-1,1)$, $(0,1,1)$, $(1,-1,1)$, $(1,1,1)$, $(2,0,1)$; smallest transversality estimate $2.2678$. Cells 29 and 30, $[349/64,\,351/64]$: those six and $(0,-1,0)$, $(0,1,0)$, $(1,-1,0)$, $(1,1,0)$, $(0,0,0)$, $(1,0,0)$; smallest estimates $1.6329$ and $1.7732$.

Scope of the last three rows. They are computed on cells 0 to 30, that is through $351/64$, as bounds on the auxiliary comparison plus its error majorants. Their physical reading stops at $\tau$, because the auxiliary equation is known to equal the full law only until then (Section 2, last item).

Grade: derived from the saved boxes and majorants by outward-rounded arithmetic, conditional on the accepted premises of Section 6. The witness margin is small ($0.0107$ above one), and the witness is at the last endpoint the chain has.

## 2. Derivation

Write the actual path as $x=\hat x+e$, with $\hat x$ the comparison path and $|e|\le P$, $|e'|\le V$, $|e''|\le A$ on a cell, where $P$, $V$, $A$ are that cell's saved outgoing majorants (they are nondecreasing within the cell, so the outgoing value bounds the whole cell).

- Speed. $|v|\le|\hat v|+V$ on the cell, and at an endpoint $|v|\ge|\hat v(t_j)|-V(t_j)$.
- Forcing. If every receiver has speed below one on cells $0..s-1$ and one receiver has speed above one at endpoint $j>s$, continuity puts the first time any speed equals one in $(5+s/64,\,5+j/64]$.
- Identity. A receiver whose speed is one at a time in cell $k$ has whole-cell upper bound plus $V$ at least one on cell $k$.
- Transversality. $\tfrac{d}{dt}\tfrac12|v|^2=v\cdot a=\hat v\cdot\hat a+e'\cdot\hat a+v\cdot e''\ge\hat v\cdot\hat a-V|\hat a|-|v|A$, and $|v|=1$ at the event.
- Why the bounds may be used up to the event. The majorants are proved for the auxiliary comparison equation, which equals the full Master Equation only up to the actual first global event. Suppose no event occurs through $351/64$; then the bounds hold through $351/64$ and give a speed above one there, an event. So an event occurs by $351/64$; before it the bounds hold, and they exclude it on the safe prefix. Nothing is claimed after the event.

## 3. Instrument and known controls

`reference/priorities/master-equation-closure/lattice-research/evidence/event-cell-independent-2026-10-12/event_cell_independent_extraction.py`, SHA-256 `c5455f3938edb17e6bee3892a4c0bf9cdedcdbb95d3361488e3c832b34083102`. It imports numpy and the standard library only, and no other instrument of this campaign or of the frozen subject. Sums and products are rounded to nearest then moved one step outward; comparisons with one are exact in floating point; the comparison with $7/20$ is in rationals.

Ten controls, run before the target: exact 3-4-5 and zero norms (the 3-4-5 enclosure is five units in the last place wide; the control's own label says two, which is wrong, see Section 9); $\sqrt2$ enclosed strictly, checked in rationals; interval dot product with crossed signs against the exact $-7$, and a box straddling zero; a positive and a deliberately failed transversality estimate; strict against equality thresholds for both the safe prefix and the witness; a cell below one after a cell above one (prefix must not extend); missing, duplicate, out-of-order cells and permuted identities refused; endpoint and cell indexing; an exact synthetic two-cell case with known bracket, witness, candidate union, estimate, vertical velocity and separation, through the same function as the target; and three failure cases that must report inconclusive.

- Run 1: **failed**, 9 of 10. The failing control was mine: I required the $\sqrt2$ enclosure to be narrower than $10^{-15}$; it is five units in the last place wide, $1.11\times10^{-15}$, and both strict inequalities held. Retained with its source (`known-run1.json`, `sources-run1/`).
- Run 2: passed, 10 of 10, after changing that tolerance to $10^{-14}$ and nothing else (`known-run2.json`, `sources-run2/`). The target refuses to run without a passing receipt for its exact bytes.

## 4. Authentication done by the target run

Every entry of the four chain packets' output manifests (24, 25, 25, 25) rehashed and equal; the final chain state `504f1c37…af83`; cells exactly 0 to 30 once each and in order; the 1,502 receiver identities equal in every cell file and in the receiver archive; archive nodes $16j$ equal to $5+j/64$ exactly for $j=0..31$; cell 0's incoming arrays equal to the accepted time-five table by identity; every later cell's incoming arrays equal to its predecessor's outgoing arrays; each cell's raw endpoint position, velocity and acceleration, at both ends, inside that cell's saved boxes; majorants nondecreasing across each cell and strictly inside the saved tube. All passed; the run would have stopped otherwise.

## 5. Declared comparison with the frozen subject

Read after the run from `next-event/continuation/event-comparison.json` only: its row through $349/64$ lists the same six labels as my cell 28, and its witness receiver is the same $(-1,0,1)$. Its final witness value ($1.0879$) is at its own last endpoint, later than mine, so the two are not the same quantity. I did not open `event_extract2.py`. Before writing the instrument I ran two searches for the word "target" over the frozen folder and saw single matching lines of `event_comparison.py` and of `next-event/independent/event-reference.py`; from the latter I took the two target identities $(0,0,0)$ and $(1,0,0)$ and nothing else. Those identities are part of the supplied two-target scenario, so this is a declared shared scenario input read from a frozen historical file. It is not the newly authored Codex exact-rational predicate reference, which I did not open, import or copy. Agreement with the frozen labels is not independent evidence: the boxes, archive and census are shared.

## 6. Accepted premises and shared inputs

This extraction adds no assumption of its own. It checks arithmetic predicates on saved boxes and majorants; the physical reading rests on premises already derived and independently accepted elsewhere, which I read for this correction and cite without re-proving or changing them.

1. **Fixed past, unique cross roots, and agreement with the full law before the event** ([continuation](smooth-two-particle-next-event-continuation.md), Section 1). With $H=11/2$ and $B=7/20$: for a receiver with $|y_i(t)|\le B$, the unique cross-source root lies before five; if the full solution is stopped at its first global speed-one event, no later cross root is possible; before that event every self-root set is empty, so the auxiliary equation and the Master Equation agree.
2. **Complete supplied-pulse census** (continuation Section 1; [independent adjudication](smooth-two-particle-next-event-independent-adjudication.md), Section 9). 1,502 potentially affected receivers by $H$, 1,350 incoming histories, 149,046 generated relationships with no omitted actual relationship. The infinitely many other architrinos remain stationary by the independently audited actual first-front census. It is this census, not the separation predicate, that accounts for the complement; my earlier wording was wrong on that point.
3. **Existence and uniqueness of the finite continuation, finite rows and finite stationary sum** (continuation Section 5.1; adjudication Sections 11 and 13). While displacement stays inside $B$, the fixed-history roots are simple, the acceleration is locally Lipschitz in receiver position, every causal cross range and source denominator is bounded below, and the stationary sum and its derivative stay finite.
4. **This campaign's reviewed cells**: the comparison paths and their polynomial boxes, the accepted histories through five and their error table, the stationary input, and the per-cell $\rho$, $\lambda$, $q$, tubes and tails, under the unchanged Master Equation with numerical $c_f=1$ and $g=16$.

The conditional contradiction route. Let $\tau$ be the first time any architrino reaches speed one, allowing a priori that it never does. On $[5,\min(\tau,351/64))$ premises 1 to 3 make the auxiliary equation the full law, so premise 4's majorants bound the actual error there. On that interval this report's predicates then exclude each earlier obstruction in turn: displacement with error at most $0.26502<B$ keeps premise 1's root statement in force, so there is no cross-root obstruction and no departure from the domain; the separation bound of at least $0.4699$ excludes contact between distinct labels; premise 3 keeps every row and the infinite sum finite; premise 2 keeps the complement stationary. So the only event that can end the interval is a speed-one event. If $\tau>351/64$, all bounds would hold at $351/64$ itself and give the receiver $(-1,0,1)$ a speed above one there, which contradicts $\tau>351/64$ by continuity from the safe prefix. Hence $\tau\le351/64$, and the safe prefix gives $\tau>87/16$. Which receiver is first is not determined; the twelve candidates enclose the possibilities.

Outside this result: cell 31, anything after $\tau$, and any event update or non-smooth continuation.

## 7. What would show this wrong

A receiver outside the twelve reaching speed one in the bracket; any receiver reaching it at or before $87/16$; an archive velocity at $351/64$ for $(-1,0,1)$, less its majorant, not above one; a candidate with $v\cdot a\le0$ at speed one; or a failure of any Section 4 check on the saved files.

## 8. Run and retention

Supervisor run `b4826660-e713-4c84-90d4-fc099dde9bcc`: 21:30:25.525Z to 21:30:50.264Z (24.8 s), completed, exit 0, process group closed; closeout clear. The two known runs were under a second each and unsupervised. Owner `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-extraction/`: `known-run1.json` (FAIL) and `known-run2.json` (PASS) with outputs and sources as run; `extraction-run1.json` (SHA-256 `9cad72adb7d19b7d8665df59ecf7871adec26fa7afafd43daca0a235cd660985`) with outputs; supervisor records, token redacted; `closeout.json`; `commands.txt`; `outputs.sha256`; `sources.sha256`. No earlier owner, frozen file or Codex folder was written to.

## 9. Corrections after review

Codex's review entry of 21:34:55.242Z accepted the arithmetic (its separately authored exact-rational reference agrees on the bracket, safe prefix, witness, all twelve candidates and all thirty cell-candidate lower bounds, with these floating bounds outward) and raised four report comments. They are resolved in the text above; this section records what changed. No instrument, known receipt, output or manifest of the extraction owner was changed, and nothing was rerun. The bytes Codex reviewed (`9a5f7a70…9643`) are retained in `.local-data/master-equation-closure/event-cell-independent-2026-10-12/claude-extraction-supplement-1/`.

- **REX-01, physical scope.** Section 1 said the targets, domain and separation statements held "up to that endpoint" without separating the auxiliary comparison from the actual solution. It now says: the bounds are computed for the auxiliary comparison through $351/64$; their physical conclusions hold only for $5\le t\le\tau$; no continuation of the full law beyond $\tau$ is selected.
- **REX-02, premises.** Section 6 wrongly said the domain and separation predicates were what excluded the other receivers, and listed "the first global event is a speed-one event" as an assumption. The complement is covered by the accepted actual first-front census, and that the first event is a speed-one event is a conclusion of the contradiction route, given the accepted fixed-past, root and existence results. Section 6 now cites those results as accepted premises and sets out the route. For this correction I read continuation Sections 1, 5 and 5.1 in full; the independent adjudication I read in full earlier today and cite by section heading.
- **REX-03, target identities.** The speculative sentence is replaced by the precise scope in Section 5: a declared shared scenario input from a frozen historical file, not Codex's new predicate reference. The bounded disclosure of what I searched and what I took stays.
- **REX-04, control K1.** The label of control K1 in the instrument and in both known receipts reads "3-4-5 norm enclosed within two ulps". The assertion it actually makes is enclosure of 5 with width below $10^{-14}$. Codex's direct evaluation gives lower $4.999999999999998$, upper $5.000000000000003$, width $4.440892098500626\times10^{-15}$, which is five units in the last place at 5; I report those figures as Codex's and did not rerun. The enclosure is valid and the control's verdict stands; the label overstates its tightness. The instrument and receipts are left as run, with this correction as the record.

A reading added while resolving REX-02, not a new result: continuation Section 5 states the accepted certificate as $87/16<\tau\le351/64$, the same twelve candidates, target vertical velocity above $0.1320962439$, transversality above $1.4630814180$, displacement below $0.265391$, separation above $0.469218$ and a witness speed above $1.0014633$ for $(-1,0,1)$. This report's corresponding bounds are $0.1320$, $1.6329$, $0.26502$, $0.4699$ and $1.0107$. The comparison is shared-input agreement, as Section 5 says, and it corrects that section's remark about the value $1.0879$: that figure is a field of the frozen comparison file for a later endpoint and is not the accepted certificate's witness.
