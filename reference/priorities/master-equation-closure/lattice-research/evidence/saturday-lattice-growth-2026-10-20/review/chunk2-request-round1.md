You are an independent reviewer (Codex, gpt-6.1-sol) for the Architrino repository at /Users/markmorris/vibe/architrino. Do not edit any file. Read AGENTS.md's physics rules and the canonical Master Equation passages you need (content/markdown/aaa/dynamics/master-equation.md: "Per-Hit Acceleration", "Total Acceleration (Sum Over All Causal Hits)", "Conventions and Exclusions"). Read the files under review in full and the cited accepted sources. Reconstruct every derivation and every numerical claim independently; do not trust the author's statements or instruments. Report: (a) what you read; (b) for each claim, supported / not supported / needs correction, with the reason; (c) a numbered list of actionable corrections, each labelled with a short ID; (d) an overall disposition: ACCEPT, ACCEPT AFTER CORRECTIONS, or REJECT. Be specific about scope: what is derived, what is only sampled, what is conditional.

You may run read-only commands, including the shared venv Python `/Users/markmorris/vibe/.venv/bin/python` with scripts passed on stdin (numpy, mpmath and the standard library work; SciPy is broken). Do not run system python3 and do not write files. An independent check should not import the author's instruments.

# Chunk 2, round 1: the signed receiver cubic and a further barrier

## Files under review

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20-receiver-cubic.md` (subject) | 20,670 | `804930608aefdd82e86ad1d0f64f38281fd88dedef0fd084ff6cb275b0aeacd8` |
| `reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-growth-2026-10-20/receiver_cubic.py` | 10,898 | `ee37eb8f4414e70e9d2771b840945dbda9d086c1c0709b6f4e6936190becd3ca` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/rc_run1.json` | 8,679 | `d50df29f18375c76520aed922e6b4eaddc91a6844924fbd7d3f07f4c1d8685bf` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/rc_run1.out` | 5,157 | `9d2d693fab5a83b68f9b9100b0a7b0c3a00b0821db8fe0b444bea740ade3d84a` |
| `reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-growth-2026-10-20/README.md`, section "The receiver-cubic instrument (chunk 2)" | 14,307 | `cca0dbee273b0fda4615abca6d60cf9014f652a0bdde410aff10446406051313` |

The instrument imports, unchanged, `band_barrier.py` in the same folder (SHA-256 `1a581dca4db57e1358356a75d0cb7c8704402414fd9e1f9ea5d1cf8f7533bdd6`), which you reviewed in chunk 1, and through it the frozen `signed_barrier.py` of the October 18 note.

## Sources to read

- The chunk-1 subject `analysis/saturday-lattice-growth-2026-10-20.md` (current SHA-256 `8e2fcdcfec2c6735b8cf46062336f5ab461514d8951cba3367bc748959003d28`), on which chunk 2 builds (Lemma B.2, Corollary B.3, Theorem B.5, Proposition B.8), and its round-1 review `review/chunk1-reply-round1.md`.
- In `reference/priorities/master-equation-closure/lattice-research/analysis/`: the accepted `saturday-localized-forward-quantification-2026-10-11.md`, Lemma Q2 (the receiver remainder, its Taylor argument and the norm of symmetric forms) and Section 1; `saturday-localized-nonlinear-preparation-2026-10-10.md`, the reduction of the equation (the block cancellations of the resting and receiver-linear rows and the definition of E) and its float measurement of |E(alpha)|/|alpha|^3; `saturday-localized-forward-extension-2026-10-12.md`, Lemma X3's receiver substitution; `saturday-summed-signed-lattice-remainder-2026-10-18.md`, Theorem L.4 and the role of c_{E3} in F_sgn.

## Claims to check

1. **Lemma R.1.** (i) The Taylor expansion of f_d to order four with fifth-order remainder bounded by 6|alpha|^5/((1-rho)r)^7, using |d^5 G| <= 720/|x|^7. (ii) The vanishing of the second- and fourth-order sums by oddness and absolute convergence. (iii) The cubic tensor H_{ijkl}: full symmetry, invariance under the 48 signed permutations, vanishing of components with an index of odd multiplicity, harmonicity h + 2h' = 0, and the resulting form E_3(alpha) = (H_1111/12)(3|alpha|^2 alpha - 5 alpha^{o3}); check the sign carefully, including the sign convention -d_i d_j d_k d_l (1/r) for the components of d^3 G. (iv) The bound |3|alpha|^2 alpha - 5 alpha^{o3}| <= 2|alpha|^3 via s_3 <= s_2^{3/2} and the maximum of 9 - 30u^2 + 25u^3 on [3^{-1/2}, 1]. (v) Whether the use of E in the absolutely convergent form is consistent with the original eight-source block prescription for the resting and receiver-linear rows.
2. **Lemma R.2.** The enclosure -86.0810 <= H_1111 <= -85.6909 (cube of half-width 40, tail 312/40^2 from at most 26 m^2 sites with largest coordinate m and |d_1^4(1/r)| <= 24/r^5), Z_7 <= 7.46706, c_3 <= 14.3469, c_5 = 6 Z_7 (16/15)^7 <= 70.389, c_3 + c_5/256 <= 14.622. Please give an independent enclosure or at least an independent high-precision evaluation of H_1111 and Z_7.
3. **Replacement of c_{E3} in Theorem L.4.** The argument that wherever L.4 is applied d + 2y <= rho implies A <= rho, so |E| <= X^2 (c_3 + c_5 rho^2) A^3; and that every other coefficient of F is unchanged and nonnegative.
4. **Theorem R.3.** Exact conditions (a)-(c) for (1/16, 0.033, 12.5) with d_0 = 0.0006351; the ladder (0.020, 5.5), (0.025, 7), (0.030, 9.5); the items, including all-label bounds (displacement <= 0.046613, speed <= 0.16233, acceleration <= 0.63530, transmitter >= 0.83767, separation >= 0.906775, delay within 0.093225), and the time differences T^ - T~ >= 0.0281 and T^ >= T_N + 0.1576.
5. **Proposition R.4.** The growth table at T^ (outward rounding of every entry), positivity on [1e-37, 0.00646], the time-zero bound with the smallest ladder coefficient 5.5, and the ladder values at Delta~ = 0.025.
6. **Section 4.** The three parts at the endpoint, the chart slack 0.002275, the certificate at d = 0.0362 on the chart 1/16 and its monotone extension to larger d, and that the text does not claim more than was computed about charts above 1/16.
7. **Scope.** That nothing beyond the receiver constant changes; that the same complete-past solution is continued; no growth uniform in eps, order-one motion, fate or arrival is claimed; and that the README's account of the instrument (known cases before targets, the KC6 label caveat, scratch scripts as exploration) is accurate.
