# Six-pole path continuation, review: adjudication 14 (design of receval v7; the zero like-root margin in S6)

Written 2026-10-20 by the review role. Code reading only; no Python run.

## 1. receval v7 design (derived from the diff)

**Subjects.** [receval v7](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v7.py), sha256 `b0d1462e629e634f20d67281f791de840b3fb3454590f25222cf892fd7c745a8`. [The v6 → v7 diff](../evidence/spherical-six-pole-path-continuation-claude-support-receval-v6-to-v7.diff), sha256 `d7de35753cfea66d12d0c6199724359c7108cd7366746e2709190bf1b9626acf`. I read the diff in full and checked that it matches a direct diff of the two files (72 lines). The base, v6 `bd3baea8…`, is unchanged.

- **E1, cover counts.** The command line now takes the cover counts as `<NQ>x<NW>`, each at least 3. The cover is still built by the same `cover_1d`, with exact outer edges and edges shared between neighbours, and checked by the same `cover_ok` on each axis. The product of the two covers covers the end box, as in [adjudication 1](spherical-six-pole-path-continuation-claude-review-adjudication-1.md). V1–V4 now run at the chosen counts, and V1's piece count becomes $NQ\cdot NW$. Validity is unchanged; only the resolution rises.
- **E2, cost flag.** `--end-only` skips v4's whole-step and sub-step parts. The end-instant route is untouched.
- **E3, hoisting.** The per-class source contraction and history lookup are hoisted out of the $w$ loop. Both depend only on the end time, the $q$ piece and the proved whole-box range: `contractX(te, qs, c, Sx[c])` and `lookup2`. Neither takes the $w$ piece. The law reads the shared `states` dictionary without writing to it; I read `contributions` in the frozen dlambda3 chain, which only unpacks `states[c]`. So each piece gets the same inputs as in v6. This is cost only.
- **E4.** Diagnostics and progress lines only.

**Ruling: DESIGN ADMITTED.** The single run at end 556 may be granted on two conditions:
- (a) all inherited controls and V0–V4 pass at the new counts in the same invocation, before the target;
- (b) the row shows the cover check passed, and the account records the counts.

A proved $l'(t_{556})<0$ would put every local maximum of $l$ after the first support turn strictly BEFORE the path turn (see [adjudication 13](spherical-six-pole-path-continuation-claude-review-adjudication-13.md), section 4).

## 2. The like-root upper margin of 0.0 in S6 is sound, not a refusal in disguise (derived)

In source time $s$, the root function is $g(s)=(t-s)-r_c(q,q(s))=\tau-r_c$. Its derivative is $dg/ds=-D_t<0$, so $g$ is strictly decreasing.

`contractX` with `check=True` evaluates $g$ at the two ends of the recorded range $S_0$. Each evaluation uses the whole end-time box, the whole end $q$ box and the padded history at that single source time. The check requires $\inf g(\underline{S_0})\ge0$ and $\sup g(\overline{S_0})\le0$. For every parameter in the box, monotonicity then places the unique root $s^\*$ in $[\underline{S_0},\overline{S_0}]$; equality at an end is allowed because the interval is closed. A failed check returns `None` with "start interval not proved to contain the root", and the end evaluation refuses.

Contraction keeps the root: $s^\*=t-r_c(q,q(s^\*))$ lies in $t_e-r_c(q_e,q(S))$ whenever $s^\*\in S$, so intersecting that image with $S$ never loses it. A zero upper margin means only that the interval image reached above $\overline{S_0}$, so the intersection kept the recorded end. It does not mean the root lies outside.

A read at $\overline{S_0}$ beyond guaranteed coverage would refuse in the lookup. So the check passing proves that the read was covered.

The per-piece contractions (`check=False`) start from this proved whole-box range, so they are valid by inclusion.

**Ruling: SOUND.** The zero margin signals only that the subject's recorded whole-step range is tight at its upper end for the like class at the end instant. It is not a refusal and does not weaken the S6 enclosures.

**Falsifiers.** A `contractX` code path that skips the check when `check=True`. A lookup that answers beyond guaranteed coverage. A law that writes into `states`.
