# Six-pole correlated continuation review: dated companion on step-end endpoints (adjudications 8, 12, 13, 14 and 15)

Written 2026-10-14T13:14:48Z by the review role, on the PI relay of Codex contribution 7 (12:37). The adjudications themselves stay byte-frozen; this companion corrects their wording only.

1. **The correction.** A step end is an uncertain instant: the true end of step $k$ lies in $[\underline{t}_k,\ \overline{t}_k]$, where $\underline{t}_k = 1.866684593623649597167969 + 0.01k$ and $\overline{t}_k$ is the stored upper end. When an adjudication says a property holds "to $t \le \overline{t}_k$", the proof reaches the ACTUAL end of step $k$, which lies in that interval. The time up to which the property is guaranteed uniformly, for every admissible origin, is the LOWER endpoint $\underline{t}_k$.

2. **Corrected statements.**
   - [Adjudication 8](spherical-six-pole-correlated-continuation-claude-review-adjudication-8.md), sections 3 and 4: $\dot l < 0$ at every instant up to the actual step-380 end, which lies in $[5.666684593623649597167969,\ 5.666684709182828044891357]$. The guaranteed prefix is $t \le 5.666684593623649597167969$.
   - [Adjudication 12](spherical-six-pole-correlated-continuation-claude-review-adjudication-12.md), sections 2, 3 and 5: $\dot l < 0$ up to the actual step-409 end, in $[5.956684593623649597167969,\ 5.956684709182828044891357]$. Guaranteed prefix: $t \le 5.956684593623649597167969$. The "reached" time of section 5 ($t = 6.206684709182828044891357$) is likewise the upper end of the actual 434 end; its guaranteed value is $6.206684593623649597167969$.
   - [Adjudication 13](spherical-six-pole-correlated-continuation-claude-review-adjudication-13.md), section 3: the exclusion reaches the actual 409 end, as above.
   - [Adjudication 15](spherical-six-pole-correlated-continuation-claude-review-adjudication-15.md), sections 1 and 2: $\dot l > 0$ from the actual 437 end to the actual 491 end, which lies in $[6.776684593623649597167969,\ 6.776684709182828044891357]$. The completion ruling's horizon is the actual 491 end; its guaranteed value is $t = 6.776684593623649597167969$.
   - The same reading applies to "the step-380 end" and "the step-409 end" in my messages to the PI, and in the [final report](spherical-six-pole-correlated-continuation-claude-review-final-report.md).

3. **Unchanged (derived).** Every turn bracket is written as (the earlier end's LOWER time, the later end's UPPER time), so it contains the true crossing for every admissible origin. They are correct as written:
   - $(5.956684593623649597167969,\ 6.236684709182828044891357)$, from my own evaluations;
   - $(5.986684593623649597167969,\ 6.176684709182828044891357)$, cross-code;
   - the speed-maximum bracket and the $a_r$-zero bracket.

   Because the steps join exactly, the actual end of step $k$ is the actual start of step $k+1$. Every chained whole-step argument (the lemma of adjudication 8, the uniqueness from $\ddot l > 0$) applies on the actual step intervals and needs no change.

4. **Falsifier.** A statement in these adjudications that uses an upper endpoint as a uniform guarantee and is not corrected above.
