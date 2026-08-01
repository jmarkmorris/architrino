# Random finite configuration contract

## Scope

The `Simple Cubic Random 50/50` gallery case is one finite, nonperiodic simple-cubic configuration containing every simple-cubic site center within a spherical radius of $2.75d$. It has 88 displayed sites. Each generated configuration contains exactly 44 positrinos and 44 electrinos. Equal population is a configuration fact only; it does not establish acceleration cancellation or balance.

The Ledger calculation for a selected receiver includes each of the other 87 displayed sites exactly once. It reports the normalized stationary acceleration residual for that finite configuration only. It supplies no repeating-pattern, all-space, motion, stability, energy, or conservation claim.

## Reproducible assignment rule

The assignment identifier is `splitmix32-score-rank-fifty-fifty-v1`.

1. Interpret the recorded seed as an unsigned 32-bit integer.
2. Sort the displayed sites by ascending UTF-16 code-unit order of their stable site ids, using direct `<` and `>` comparisons rather than locale-sensitive collation. Let the resulting zero-based ordinal be $i$.
3. Form $u_i = \operatorname{uint32}(s \mathbin{\mathtt{xor}} \operatorname{imul}(i+1,\mathtt{0x9e3779b9}))$.
4. Score each site with the declared 32-bit SplitMix sequence:

   - $z=\operatorname{uint32}(u_i+\mathtt{0x9e3779b9})$;
   - $z=\operatorname{imul}(z\mathbin{\mathtt{xor}}(z\!\gg\!16),\mathtt{0x21f0aaad})$;
   - $z=\operatorname{imul}(z\mathbin{\mathtt{xor}}(z\!\gg\!15),\mathtt{0x735a2d97})$;
   - the score is $\operatorname{uint32}(z\mathbin{\mathtt{xor}}(z\!\gg\!15))$.

5. Rank by unsigned score, breaking a score tie by the original ordinal.
6. Assign the first 44 ranked sites as positrinos and the remaining 44 as electrinos.

The default seed is `20260801`. A recalculation chooses the smallest succeeding uint32 seed whose assignment fingerprint differs from the current fingerprint. The runtime contract records the seed, algorithm id, assignment fingerprint, and both population counts; those provenance fields are not exposed in the explanatory panels.

## Verification

`scripts/verify-lattice-lab-random-finite.mjs` independently reimplements the score/rank assignment and the finite residual sum. It checks the live default gallery record against those independent paths. Focused tests also pin known seed fingerprints and verify that the recalculation rule changes the assignment rather than merely redrawing it.
