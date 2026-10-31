# Six-pole post-turn campaign: second-turn uniqueness, lower bracket and continuation past step 570 (Claude PI)

*Status: active from 02:26:53 UTC on 2026-10-21; the PI's living plan until closeout.*

## 1. Selection and its reading

On 2026-10-21 the operator replied "do 1 2 3 4" to the Claude PI's closing list from the [path-continuation campaign](spherical-six-pole-path-continuation-claude-synthesis.md). That list was:

1. commit the campaign files on a branch;
2. prove the second support turn happens only once;
3. continue past step 570;
4. narrow the start of the second-support-turn bracket.

The operator also noted that the Staggered lattice thread is making a scoped commit of its own.

**Item 1** is a publication action. It is handled under [pr-lifecycle](../../../../op/git/pr-lifecycle.md) and is not part of this research plan. Its current blocker is recorded in the synthesis.

**Items 2–4** are this campaign. They continue on the identical radius-10 six-pole rest history under the law fixed in the [path-continuation plan, section 3](spherical-six-pole-path-continuation-plan.md#3-fixed-law-and-starting-point). If this reading was not intended, the results are unapproved evidence.

## 2. Questions

- **Q2: uniqueness of the second support turn.** The local maximum of $l=-w^2-r$ exists in $(7.176684593623649597167959,\,7.426684709182828044891367)$; see path-continuation review adjudication 15. Prove it is unique and strict by showing $l''<0$ at every instant of the band between the last proved-positive and the first proved-negative $l'$, or by an equivalent rigorous argument. Otherwise state the strongest delimitation. The review's K = 4 refinement left $l''$ hulls 0.10–0.20 wide, so a sharper or correlated evaluation of $l''=-2a^2-2wa'-r''$ is needed.
- **Q4: lower end of that bracket.** Use the support's admitted receval v7 (end-only, refined cover) on ends between 531 and 555 to prove $l'>0$ at later ends, and so narrow the bracket from below.
- **Q3: continuation past step 570.** The like source coordinate is at $q'\le1.7667$, against the qualified chart edge 1.80, with the like ladder near its next rung. First derive and control a signed-geometry chart extension beyond source $q'=1.80$, admitted by the review. Then continue the identical history from the certified P3 step-570 strings in slices. Report every certified event: a speed extremum on the return path, support turns, canonical-radial turns, partner-class sign changes, and refusals. The review adjudicates every slice and event.

## 3. Roles

The three roles of the path-continuation campaign are resumed with their context:

| role | lens | owns |
| --- | --- | --- |
| continuation | jack-k-hale | Q3 slices; Q2 correlated or sharper $l''$ instrument (design and controls) |
| support | emmy-noether | Q4 end evaluations; Q3 chart extension (geometry instrument and controls); account at new joins |
| independent review | ramon-e-moore | rulings on every new or repaired instrument, slice and event; its own evaluations |

## 4. Rules

The compute, evidence and file rules of the [path-continuation plan, sections 5–6](spherical-six-pole-path-continuation-plan.md#5-compute-rules-binding-on-every-role) apply unchanged, with these additions:

- **Prefix.** The new prefix is `spherical-six-pole-post-turn-claude-<role>-*`.
- **Standing foreign classes.** Python processes in these classes do not block a launch:
  - (a) cwd under `.local-data/master-equation-closure/ceiling-contact-open-research-20261011`;
  - (b) script under `reference/priorities/master-equation-closure/lattice-research/evidence/staggered-cell-independent-2026-10-14/`;
  - (c) cwd or script under `.tmp/rotating-ladder/`;
  - (d) cwd or script under `…/lattice-research/evidence/rotating-ladder-claude-2026-10-20/`.

  Any other Python process blocks a launch. The PI may add classes in writing.
- **Freeze before targets.** The review freezes a short reference addendum for the chart extension and the $l''$ question before opening the new subject files.

## 5. Clock (never extended)

Start 02:26:53 UTC; stop NEW exploration 04:41:53 UTC; hard closeout 04:56:53 UTC (2026-10-21). Early closeout follows when every question has a ruling or an adjudicated obstruction.
