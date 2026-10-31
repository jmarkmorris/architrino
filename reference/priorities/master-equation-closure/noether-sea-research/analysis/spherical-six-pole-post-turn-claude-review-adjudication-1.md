# Six-pole post-turn campaign, review: adjudication 1 (S9, refined ends 539 and 541: what they narrow and what they do not)

Written 2026-10-21 by the review role. Record reading only; no Python run. Rules against my [post-turn reference](spherical-six-pole-post-turn-claude-review-reference.md) (`09e6130e…`).

## 1. Record (measured)

**Subject.** [S9](../evidence/spherical-six-pole-post-turn-claude-support-S9-receval-v7-ends-539-541-6x24.json), sha256 `ba6dd05cdd935b66e3a1a6b5c50efe8621c306f4315b25f11ef0da3475d3e20d`.
- Companion files: out `11e6bbfa…`; out.time `06541c7b…` (12.10 s, peak RSS 104,955,904 B).
- Instrument: receval v7 (`b0d1462e…`, admitted in path-continuation adjudication 14). Run with a 6×24 cover and `--end-only`.
- Controls: 17 of 17 pass before the targets.

The support's commands file records that the request was revised from ends 533 and 537 to 539 and 541 before it was sent, after the support read the subject's end centres with `jq`. That is a choice of where to look, not a selection of results; both evaluated rows are reported.

| end | end time $t$ | $l'$ | sign |
|---|---|---|---|
| 539 | $[7.256684593623649597167969,\,7.256684709182828044891357]$ | $[+0.0016698698,\,+0.014436366]$ | POSITIVE |
| 541 | $[7.276684593623649597167969,\,7.276684709182828044891357]$ | $[+0.00030436071,\,+0.013271009]$ | POSITIVE |

## 2. What this narrows (derived)

**Existence bracket.** Take $l'(t_{541})>0$ together with $l'(t_{556})<0$ (path-continuation adjudication 15). By the same interior-maximum argument, a local maximum of $l$ exists in $(t_{541},t_{556})$. With the padded reading that is $(7.276684593623649597167959,\,7.426684709182828044891367)$, which still lies strictly before the path turn.

**What it does NOT narrow.** These two ends do not exclude other local maxima of $l$ in $(t_{531},t_{541})$. Between the 531 end and 539, and between 539 and 541, $l'$ is not proved positive at every instant. So the bracket that contains EVERY local maximum after the first support turn stays $(7.176684593623649597167959,\,7.426684709182828044891367)$. Narrowing that bracket from below is Q4 proper. It needs instant-wise positivity, not end signs (my reference, section 3, first-event conditions).

## 3. What would narrow it from below (route; proposal)

Use the lower lemma $l'\ge A_{k-1}+\min(L_k,0)\Delta$ step by step from the 531 end, where:
- $A_{k-1}$ is the refined end lower bound at EVERY consecutive end 531, 532, …;
- $L_k$ is my ddl10 lower $l''$ bound on each step.

**Measured inputs so far.**
- $L_{531..533}\approx-0.134$ to $-0.142$, so $|L|\Delta\approx0.0014$ per step.
- My unrefined $A_{531}=0.00103$ fails at 532.

**What is needed.**
- Refined ends 531–540: the support's v7 at 6×24, about 2 s per end after about 8 s of controls (inferred from S9), so about 30 s.
- My ddl10 rows for 534–541, about 10 s plus about 10 s of controls.

**Expected reach (inferred).** The chain can hold while $A_{k-1}>|L_k|\Delta\approx0.0014$–$0.0016$. On S9's values that is about through the 540 end; at 541, $A=0.0003$ is below the step loss. The lower end of the all-maxima bracket would then move from 531 to about 540, and the bracket would become about $(7.2667,\,7.4267)$.

**For Q2 uniqueness (reference 2.2).** The mirror upper lemma, $\sup l'\le\min(A_u+\max(U,0)\Delta,\;B_u+\max(-L,0)\Delta)$, needs refined upper ends below about $-0.0006$ to $-0.0015$. On present values ($l'(t_{556})\le-0.00067$, $l'(t_{557})\le-0.00099$), the negative-at-every-instant region starts near step 557–558 (inferred). That leaves roughly 541–557, about 16 steps, where only a proved $l''<0$ (a sharper instrument) or a sub-interval delimitation can decide.

## 4. Ruling

**S9 ADMITTED** as measured end values: $l'(t_{539})>0$ and $l'(t_{541})>0$, on an admitted instrument with its controls passed.

**Effects on the second support turn.**
- Existence of a local maximum of $l$ in $(t_{541},t_{556})$ is added.
- The all-maxima bracket is unchanged.
- Uniqueness is still open.

**Falsifiers.** A rerun of end 539 or 541 that gives $l'\le0$ anywhere on its box; a proved $l'\le0$ at an instant before the 531 end.
