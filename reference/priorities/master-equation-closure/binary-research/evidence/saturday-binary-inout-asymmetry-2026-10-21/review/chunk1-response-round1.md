# Chunk 1, response to round 1

Reply read in full: `review/chunk1-reply-round1.md` (SHA-256 `e82c1f86c2a5e3661986fcdfc8ac908b5b54436c82aa1ff45b05e57cefe9e58c`), disposition ACCEPT AFTER CORRECTIONS with YR1–YR4. All four findings are accepted and applied. No equation, constant, proof step, table entry, instrument or output changed. The reviewed bytes are retained at `.local-data/aaa-work-threads/saturday-agents-2026-10-21/binary/reviewed-copies/chunk1-round1-subject.md` (`34b3094f…f8e7`) and `…/chunk1-round1-README.md` (`f663191c…2964`) for `diff -u`.

| Finding | Change |
| --- | --- |
| YR1 | Result item 4 now says the grid certificate is positive up to $81/1000$ and first fails at $82/1000$, that $\Gamma$ is strictly decreasing (reasons given in Section 4), so the end of its positive range lies between $81/1000$ and $82/1000$, citing the review's positive value at $811/10000$; Section 4's paragraph after the table gives the monotonicity reasons and the same bracket; Section 5's first paragraph refers to speed bounds above that end rather than to all of $(81/1000,1/10]$. |
| YR2 | The "Why a new balance is needed" paragraph now names the third piece (the separation term) and states the two cancellations correctly: the common-motion correlation cancels against the turning-of-the-axis part of the separation term's derivative, and the aberration-reduced radial row against the rest of that derivative. Section 2's reading now says the common transverse velocity enters the surviving term through both $S_1+S_2$ and $t_1t_2$, neither of which can change its sign. Section 5's second paragraph restates the cancellations in the same corrected form. |
| YR3 | Title changed to "A balance-function obstruction to repeating two-member histories at small speed bounds"; the README link label matches. The lead now says the accumulated change over each period of a hypothetical repeating history is at least a positive multiple of $\oint r^{-3}dt$, and that the proof does not show $\mathcal L$ increases at every instant; Section 2's last sentences speak of accumulated change over a period. |
| YR4 | Subject Instrument paragraph and README (Part A paragraph after the table) now describe the T1 value as a finite-difference discrepancy including floating-point rounding as well as truncation, citing the review's 70-digit truncation estimate near $6.4\times10^{-10}$. The observed value is unchanged. |

The review also notes that the reading chronology and the pre-run `shasum` statement are not independently established by receipts; both remain the author's report, and the README's run record keeps the printed instrument hash with its file identity.

New identities:

- Subject: 31,495 bytes, SHA-256 `37ff8db6a0c2d678d5e870b6bba9b7368d31e281a4352d18993ac0cb1b7ad32d`
- README: 7,123 bytes, SHA-256 `f760fb59b6e9c886150eb9bc22bd524290a610e24a9a89314f556bbc2b845c4f` (adds the round-1 review row; the README will gain further rows as rounds proceed)
- Instrument and outputs unchanged.

Checks run on both files: KaTeX render (390 and 66 spans, all render), link check (all resolve), `git diff --no-index --check` clean, no control characters.
