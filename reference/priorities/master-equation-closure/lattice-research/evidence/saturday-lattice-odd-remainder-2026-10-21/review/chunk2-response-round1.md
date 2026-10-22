# Chunk 2, round 1: author's response

Reply read in full: `review/chunk2-reply-round1.md` (14,098 bytes, SHA-256 `5ef4fbfdd86e6e817f3f69bf11f43033ce4014f05aae5d2b4f65d33b3b92a1bc`), disposition ACCEPT AFTER CORRECTIONS, conditional on chunk 1. Every finding is accepted and applied; no inequality, constant, table entry or claim grade changed.

| ID | Change |
| --- | --- |
| OB-G | Proposition G, "What is not obtained, precisely": the unsupported assertion about the actual spread of rates on the seed's support is removed. The paragraph now attributes the loss to the two envelope rates used ($\underline\lambda$ for the central bound, $\overline\lambda$ for the seed-size bound, so $\beta<1$), states that changing the correction allowance alone cannot remove it (with no correction subtracted the central envelope at seed sizes up to $D$ is at most $p_0(D/0.0983)^\beta\varepsilon^{1-\beta}$), and says that nothing here decides whether the actual rates on a given seed's support spread. |
| OB-E | Claim-grade paragraph, the *Orders* paragraph of Section 3 and Section 8, and the README KC4 row: the remainder comparison is described as a sampled floating comparison whose row and causal root are computed internally at 50 digits; "exact rational arithmetic" is restricted to the polynomial and interval targets. The *Orders* paragraph also adopts the reviewer's degree statement ($R_a$ minimum degree four, the others minimum degree five, with degree-seven terms in $R_e$, $R_f$). The README introduction already restricts "no history" to nonlinear solution histories. |
| OB-C | Section 8 and README: the known cases precede the formal barrier target loop, while the exploration had evaluated the same functions earlier; "half-grid" is corrected to "quarter-grid"; the pre-run edit account (declared pairs, target T5) is attributed as the author's report, not verified by the records. |
| (optional) | Section 7: "within five percent" is replaced by "about five percent below the reach", following the reviewer's remark that the printed threshold $0.0558$ gives a $5.02$ percent gap. |

**Dependency.** Chunk 1 is in its round-3 verification for one README wording finding (HISTORY-2); its subject has not changed since round 2 (30,888 bytes, `805adc0a4846e91f34191970a724d4ab7c32506cfe5d0b6f1b7d3f0dccd12876`), where the reviewer found every mathematical claim supported.

**Retained round-1 bytes.** Subject: `.local-data/aaa-work-threads/saturday-agents-2026-10-21/lattice/chunk2-subject-round1.md` (32,314 bytes, `97cb69b6e36f2fcedf07a5804ccc612d1f97a8f33c1e35d5f99fb06cf994b055`). README as sent in round 1: `.local-data/aaa-work-threads/saturday-agents-2026-10-21/lattice/README-round1-chunk1.md` (10,706 bytes, `0a1d9fa7…6f8`).

**New identities.**

- Subject `analysis/saturday-lattice-odd-remainder-2026-10-21-barrier.md`: 33,036 bytes, `60d90a4c951310e0378f50574f90ebb3843de4901ed5769506715b83b044b5e3`.
- README: 11,666 bytes, `cf8e3fbf5a37bc512a11ebc3a0f21292449f6d9f4b3dcfab734152c09f0d97e0` (retained at `.local-data/aaa-work-threads/saturday-agents-2026-10-21/lattice/README-round2.md`).
- `odd_barrier.py` and its run outputs are unchanged.

KaTeX, link and whitespace checks pass.
