# Chunk 2, round 1: response to the Codex review

The reply `chunk2-reply-round1.md` (SHA-256 `3690b774ede9cbd22f55cf31d17df5a9746e12d2d6c84d7ff09a4a0e017e0cde`) gives ACCEPT AFTER CORRECTIONS with RC1–RC3. All three are accepted and corrected in the subject only; the instrument, its run and its outputs are unchanged. The round-1 subject bytes (20,670 bytes, SHA-256 `804930608aefdd82e86ad1d0f64f38281fd88dedef0fd084ff6cb275b0aeacd8`) are retained at `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/reviewed/subject-chunk2-round1.md` for comparison.

- **RC1 (chart conclusion).** Section 4's second paragraph no longer calls $0.033$ chart-limited and no longer says only a larger chart could use the remaining room. It now states that $0.033$ is a passing choice, cites the review's witness $d=0.0331$, $K=12.5$ ($d+2Kd^2=0.06049025$, $C_LF^{\rm s}<0.013695125$), says the largest chart-constrained seed size on the chart $1/16$ is not established and lies below $0.0362$, and bounds the unused time on this chart by $\ln(0.0362/0.033)/2.8033<0.034$. The sentence on charts above $1/16$ is kept as an explicit non-claim. Result item 5 was changed in the same way: "At the declared pair the chart condition on the chart $1/16$ leaves slack $0.002275$, and the largest chart-constrained seed size is not established, while ...".
- **RC2 (shell wording).** The mechanism paragraph after Lemma R.1 now gives the aggregate statement: the nearest shell gives $-84$ exactly; the next two shells contribute about $-7.42$ ($r^2=2$) and $+4.79$ ($r^2=3$), about $8.8$ and $5.7$ percent of $84$, and partly cancel; all shells beyond the nearest together change $-84$ by about $2.2$ percent. The per-shell "few percent" claim is removed.
- **RC3 (KC5 error).** Section 5 now says the two forms agree "to a relative difference of about $6.1\times10^{-15}$".

Other changes to the README since round 1, outside chunk 2: sections on the chunk-3 and chunk-4 instruments and the review-record rows; the README's chunk-2 section is unchanged.

## Corrected identities

| File | Bytes | SHA-256 |
| --- | --- | --- |
| subject `analysis/saturday-lattice-growth-2026-10-20-receiver-cubic.md` | 21,090 | `a5ead2dc0e4e43a9e7b8ea22fa4e917716979a1d2e160ccf0b7162ea9133bdcb` |
| `receiver_cubic.py` (unchanged) | 10,898 | `ee37eb8f4414e70e9d2771b840945dbda9d086c1c0709b6f4e6936190becd3ca` |
| README (current) | 19,492 | `b8800c66b404a7ef3ad385971c9c999381d55a4ec60ce4e362676cc417cb53a7` |

Checks: KaTeX renders all 362 spans of the subject; its links resolve; `git diff --no-index --check` reports nothing.
