# Chunk 3, response to round 1

Reply read in full: `review/chunk3-reply-round1.md` (SHA-256 `2f6e5522c086b726791399b99c7f57a48c1befb7d44bacbb465e456cab685d32`), disposition ACCEPT AFTER CORRECTIONS with SW-DOM, SW-SIGN and SW-LIMIT. All three are accepted and applied. No lemma bound, constant, table entry, instrument or output changed. The reviewed bytes are retained at `.local-data/aaa-work-threads/saturday-agents-2026-10-21/binary/reviewed-copies/chunk3-round1-subject.md` (`06430ded…d0f8`).

| Finding | Change |
| --- | --- |
| SW-DOM | Lemma Y.8 now states the numerator identity for any root with $|\mathbf v|<1$, and states the strength relation $a_i=1/(\tau E)$, $a_i-a_i^0=(TE^0-\tau E)/(\tau ETE^0)$ only when the transmitter factor at the emission root is positive, $D>0$, which holds whenever $|\mathbf v_j(s)|<1$ and so on $\mathcal C_w$ ($D\ge1-w$); without it only the numerator identity is claimed. |
| SW-SIGN | The paragraph after the table now says the instrument computes lower enclosures only, that a non-positive lower enclosure does not prove negativity, and that the bracket for the end of the positive range rests on the review's two-sided enclosure $-0.01354<\Gamma_{\rm new}(119/1000)<-0.01353$ together with continuity and strict decrease. The evidence README's chunk-3 section states the same. |
| SW-LIMIT | The remark after Lemma Y.9 now calls $w=0$ a formal endpoint evaluation, distinguishes the example's exact numerator $\tfrac14g^2\tau^4$ from its strength error (which carries the denominator $\tau ETE^0$), and compares leading large-$r$ coefficients ($3/4$ against $1/4$). The Limits passage is qualified in the same way. |

New identities:

- Subject: 25,349 bytes, SHA-256 `05ed11ffcf7375338abb3f68a697169c5eb042dc8363295e06cde515c9b95e69`
- README: 14,676 bytes, SHA-256 `0d469a2854efe3bcf663957bad29678cfcfdc5164eedff54f118db214cb356c7`. Since round 1 it gained the review rows for chunk 1 round 3 and chunk 3 round 1, the lower-enclosure sentence in the chunk-3 section, and a new section "The third instrument (chunk 4)", which belongs to chunk 4 and is under separate review.

The same three points were applied in advance to the chunk-4 note, which is submitted for its first review at the same time.

Checks on the subject: KaTeX (345 spans render), links resolve, `git diff --no-index --check` clean, no control characters.
