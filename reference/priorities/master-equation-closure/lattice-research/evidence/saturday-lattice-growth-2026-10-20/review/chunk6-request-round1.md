You are an independent reviewer (Codex, gpt-6.1-sol) for the Architrino repository at /Users/markmorris/vibe/architrino. Do not edit any file. Read AGENTS.md's physics rules and the canonical Master Equation passages you need (content/markdown/aaa/dynamics/master-equation.md: "Per-Hit Acceleration", "Total Acceleration (Sum Over All Causal Hits)", "Conventions and Exclusions"). Read the files under review in full and the cited accepted sources. Reconstruct every derivation and every numerical claim independently; do not trust the author's statements or instruments. Report: (a) what you read; (b) for each claim, supported / not supported / needs correction, with the reason; (c) a numbered list of actionable corrections, each labelled with a short ID; (d) an overall disposition: ACCEPT, ACCEPT AFTER CORRECTIONS, or REJECT. Be specific about scope: what is derived, what is only sampled, what is conditional.

You may run read-only commands, including the shared venv Python `/Users/markmorris/vibe/.venv/bin/python` with scripts passed on stdin (numpy, mpmath and the standard library work; SciPy is broken). Do not run system python3 and do not write files. An independent check should not import the author's instruments.

# Chunk 6, round 1: row constants for slow sources, and barriers at seed sizes 0.047 and 0.052

The central new mathematics is Lemma H.1: bounds on all second and third derivatives of the canonical row Psi(R, v) = R / (|R|^2 (|R| - R.v)) of the form "exact or near-exact value at rest plus explicit multiples of the source speed". Please verify it independently and in detail; in particular check the factorization Psi = G f(w) with G = R/|R|^3, w = n.v, f(w) = 1/(1 - w); the velocity derivatives partial_v Psi[k] = P_k f'(w) and partial_v^2 Psi[k,l] = P_k (n.l) f''(w) with P_k = n (n.k)/|R|^2; the norms |d^j G| = (j+1)!/rho^{j+2}; the identity n_i n_j / rho^2 = (delta_ij rho^{-2} - d_i d_j log rho)/2 and the resulting bounds |P_k| <= 1/rho^2, |dP_k| <= 2/rho^3, |d^2 P_k| <= 6/rho^4; the bounds |d^j n| = |d^{j+1} rho| <= 1/rho, 2/(sqrt3 rho^2), 3/rho^3; the Faa di Bruno bounds for f(w) and f'(w); and the Leibniz assembly for each of c20, c11, c02, c30, c21, c12, c03. Please also run an independent numerical test of the seven bounds (for example by sampling directions and small velocities, or by exact symbolic differentiation at sampled points), making clear what is sampled.

## Files under review

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20-sharp.md` (subject) | 17,659 | `2181ba6c2c80292bbf0785e74014a4023feb6ec29c6271d490a5668add700dd9` |
| `reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-growth-2026-10-20/sharp_barrier.py` | 11,979 | `ff44e809c2b201c8c6a59d9dc554d1ca7dc97ede5ada5291402c1a15911dc9cc` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/sh_run1.json` | 11,313 | `8457f9fe339f18a0fbfd6157801d066dde025fd5ee1b7e25696fba632e53398b` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/sh_run1.out` | 7,239 | `774c7e01ab43b2b96296c5f7f2a28d457d9dd1a5453846e6220141dc6f78e617` |
| README section "The small-source-speed instrument (chunk 6)" in `.../evidence/saturday-lattice-growth-2026-10-20/README.md` | 25,639 | `b319bf17bd88c4ff8eb341ccd70c171286d98818b02e019a57b802a6fbb7ef44` |

The instrument imports, unchanged, `tube_chart.py` (SHA-256 `74be72c6…ceb`, chunk 5, under review) and through it `tube_barrier.py` (chunk 4, accepted), `band_barrier.py` (chunk 1, accepted) and the frozen accepted instruments.

## Sources to read

- The accepted tube-constant subject `analysis/saturday-lattice-growth-2026-10-20-tube.md` (SHA-256 `fc9adcb0511b6c0a07a7622db77b962920c85887023c107614cf653b88028f58`): Lemma T.1, Proposition T.2, Theorem T.3, Proposition T.5.
- The larger-chart subject `analysis/saturday-lattice-growth-2026-10-20-tube-chart.md` (current SHA-256 `bae24692868254e7a48d93fb5b3cc30cf0c95c4f441822cc641c3bd348658508`, under review): Lemma G.1, the receiver-lemma extension, Lemma G.2, Theorem G.3, Proposition G.4.
- The accepted band-envelope subject `analysis/saturday-lattice-growth-2026-10-20.md` (Proposition B.7, Proposition B.8) and receiver-cubic subject `analysis/saturday-lattice-growth-2026-10-20-receiver-cubic.md`.
- In `reference/priorities/master-equation-closure/lattice-research/analysis/`: `saturday-localized-forward-quantification-2026-10-11.md` (Lemma Q1 and its proof; Proposition Q4's partial-derivative bounds); `saturday-summed-signed-lattice-remainder-2026-10-18.md` (Lemma L.1 and its proof; Lemmas L.2–L.3; Theorem L.4).

## Claims to check

1. **Lemma H.1** as described above, for all |v| <= v < 1, including that each constant is nondecreasing in v and that the constants at rest are 6, 2, 2, 24, 6, 6, 6.
2. **Substitution.** That Lemma H.1 may replace Lemma Q1 and Lemma L.1 everywhere they enter Lemmas L.2–L.3 (including through Proposition Q4's partial bounds), with the velocity bound v_* of the tube sizes, and that every coefficient of the resulting polynomial is nonnegative.
3. **Theorem H.2** (accepted chart): exact conditions (a)–(c) for (0.047, 5) with the declared tube sizes and constants (C_L F_H <= 0.0107939 < 0.011045; caps 0.058045 <= 1/16 and 0.186218277 <= 3/16); the pair (0.044, 4.5); all-label bounds; T_H - T_U >= 0.0317; T_H >= T_N + 0.2837 at eps = 0.00646.
4. **Theorem H.3** (chart caps (1/12, 0.3)): exact conditions for (0.052, 8) and (0.050, 6.5); bounds; T_H' >= T_N + 0.3198. Please give an independent reconstruction of C_L F_H at both endpoints.
5. **Growth table** (outward rounding) and positivity at 1e-37 (0.011415 and 0.003202); the time-zero coefficient 4.5.
6. **Proposition H.4:** the lower envelopes with the exact Lemma H.1 formulas at the lower source speed, and the certificates at 0.0482 (accepted chart, bound below -8.34e-6) and 0.0592 (all charts, bound below -1.23e-4), with their monotone extension.
7. **Scope and evidence:** the same complete-past solution; the declared pairs are passing choices; the certificates bound this estimate only; no growth uniform in eps, order-one motion, fate or arrival is claimed; the README's account (known cases, the finite-difference sample described as a sample, the exploration chronology) is accurate.
