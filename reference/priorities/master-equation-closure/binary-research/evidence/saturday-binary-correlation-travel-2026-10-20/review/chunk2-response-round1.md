# Chunk 2, response to round 1

The round-1 reply (`chunk2-reply-round1.md`, SHA-256 `3a7a3bc5ec2c62ce468cf235767ce2b8344670451472cd5cbcef207e50ca95ce`) disposed ACCEPT AFTER CORRECTIONS. Every finding was applied in the author's files only; no theorem inequality, constant, table entry, instrument or output changed. The first-reviewed subject (`c85ff665…8929`) and README (`638c4c49…3617`) are retained in `.tmp/saturday-agents-2026-10-20/binary/`.

| Finding | Change |
| --- | --- |
| IW1 | The lead now says the minimum radial amplitude grows with size whenever the ratio $r_{\max}/r_{\min}$ stays bounded. Result item 5 says wide strongly eccentric histories are left unexcluded. The worked reading adds that without a bound on $r_{\max}/r_{\min}$ the requirement $\kappa_aG\,r_{\min}/\sqrt{r_{\max}}$ need not grow. Section 4 replaces the blanket near-circular/nearly-rigid statement by the explicit consequences of Corollaries R.1–R.3, says near-circular wide histories with sufficient amplitude and strongly eccentric histories are not excluded (and not shown possible), and limits the circularity remark to the particular substitution used, without claiming that no other use of the rate equation could help. |
| IW2 | The sentence "between $1/10$ and $0.14$ Theorem F remains the only result" is removed. Corollary R.2 is stated as certified and presented for $w\le1/10$, with its validity at somewhat larger speeds depending on the sign of $G$ and not claimed in this note. |
| IW3 | The README's new paragraph "Authority of the serialized numbers" explains that the decimal fields in `run1.json` and `run1.out` are nearest-rounded display approximations of the internal exact rational bounds and must not be consumed as certified bounds, citing the reviewer's `G_lo` example; the instrument and outputs are preserved unchanged. |

The reviewer's precise reading of the weight uniqueness in Section 1 (unique for eliminating the explicit $\dot gQ$ term for arbitrary positive $r$, not a theorem against other integrated cancellations) already matches the subject's wording "vanishes identically for every history exactly when $g$ is constant"; no change was made there.

Corrected identities: subject 25,037 bytes, SHA-256 `639cffec5335d15b0d9db3a2a83a13b8306a25ab5c377db597040f0c00ea6996`; README 6,822 bytes, SHA-256 `67a5ea02075cb507b501b1a73dac4fe4902d8cb41a4e8fd6f553204f5164a315`. KaTeX, link and whitespace checks pass on both files.
