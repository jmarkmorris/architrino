You are an independent reviewer (Codex, gpt-6.1-sol) for the Architrino repository at /Users/markmorris/vibe/architrino. Do not edit any file. Read AGENTS.md's physics rules and the canonical Master Equation passages you need (content/markdown/aaa/dynamics/master-equation.md: "Per-Hit Acceleration", "Total Acceleration (Sum Over All Causal Hits)", "Conventions and Exclusions", "Self-Hit Regime"). Read the files under review in full and the cited accepted sources. Reconstruct every derivation and every numerical claim independently; do not trust the author's statements or instruments. Report: (a) what you read; (b) for each claim, supported / not supported / needs correction, with the reason; (c) a numbered list of actionable corrections, each labelled with a short ID; (d) an overall disposition: ACCEPT, ACCEPT AFTER CORRECTIONS, or REJECT. Be specific about scope: what is derived, what is only sampled, what is conditional.

You may run read-only commands, including the shared venv Python `/Users/markmorris/vibe/.venv/bin/python` for arithmetic checks (numpy, mpmath and the standard library work; SciPy is broken on this machine). Do not run system python3. Do not write files; if you need a script, pass it on stdin (for example `/Users/markmorris/vibe/.venv/bin/python - <<'EOF' ... EOF`). An independent check should not import the author's instrument.

# Chunk 1, round 1: the band envelope of the seed, a barrier from the origin, central growth and an obstruction

## Files under review (exact identities)

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20.md` (subject) | 41,088 | `a233044e8c8a48a179604255056a130b0d7634730b5a08ef562c852ce8a9aeb0` |
| `reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-growth-2026-10-20/README.md` | 9,602 | `8a7c52a5a87f8516d12924de72e22bae95d1f3976760754a4b7567093c531c18` |
| `reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-growth-2026-10-20/band_barrier.py` (v3) | 21,004 | `1a581dca4db57e1358356a75d0cb7c8704402414fd9e1f9ea5d1cf8f7533bdd6` |
| `.../saturday-lattice-growth-2026-10-20/history/band_barrier.v1.py` | 15,209 | `836493d065a180f941701c43043f2652230b30094080753d3036af6627ec2f9d` |
| `.../saturday-lattice-growth-2026-10-20/history/band_barrier.v2.py` | 17,892 | `faa042772421b2b98a2dcab6c8b29b36cd48140677c1114b145e3224e667f4ba` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/run3.json` (output of v3) | 41,344 | `4c48b194396b028dc79bbccc2289cfedaed577483b6fde287f232615b62bf17c` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/lattice/run3.out` | 7,810 | `94f12910dc775552d2db99e4910535077ebcd016a175c24bee2332429429e3ed` |

The instrument imports, unchanged, the frozen `reference/priorities/master-equation-closure/lattice-research/evidence/saturday-summed-signed-lattice-remainder-2026-10-18/signed_barrier.py` (SHA-256 `267a234e5e68c84d764e95ad0479465f1e6c3e32c871a42f792f5defb9699c82`).

## Accepted sources the reviewer must read (all in `reference/priorities/master-equation-closure/lattice-research/analysis/` unless stated)

- `saturday-summed-signed-lattice-remainder-2026-10-18.md` (accepted SHA-256 `9dbdc4d555bb5dd01107e11acdfceda456606657151f1e947f295d72d1f8f0f3`), in full, especially Section 1 (inputs and forward-profile seed bounds), Lemmas L.2–L.3, Theorem L.4 and Theorem L.5; and its final review `saturday-summed-signed-lattice-remainder-codex-review-2026-10-18.md`.
- `saturday-localized-forward-quantification-2026-10-11.md`: Proposition Q6 (contour margins, the perturbation coefficient 31.854, the seed bound) and Proposition Q8 with its proof (reality of the zeros inside the contour, positive semidefinite residues, slope 10.021, P(k) bounds, p0).
- `saturday-localized-forward-extension-2026-10-12.md`: Lemma X1 and Theorem X5 (the bound y(0) <= 31.9 |eps phi|_a^2 and the matching).
- `saturday-localized-evolved-history-continuation-2026-10-12.md`: Lemma E.1, Lemma E.2, Theorem E.3.
- `saturday-localized-beyond-evolved-endpoint-2026-10-14.md`: Lemma S.1, Lemma S.3, Proposition S.4.
- `saturday-localized-forward-evolution-2026-10-11.md`: Theorem 1, the maximal-continuation remark, Proposition 4.
- `saturday-localized-nonlinear-preparation-2026-10-10.md`: the seed construction (Lemma 3) and the residue verdict.

## Claims to check

1. **Lemma B.1 (growth band).** For |k-Q| <= 1/20 every zero of det F(k, .) inside the contour lies within delta_r = 31.854/(400 x 10.021) < 0.0079469 of lambda_g, so in [2.7872, 2.8033]. Check the use of Weyl's inequality on the real symmetric F(k, lambda) for real lambda in [a, lambda_+], the slope bound, and that Q8(1) supplies reality of every zero inside the contour.
2. **Lemma B.2 (band envelope).** The residue representation hat phi(k,tau) = b(k) sum_i e^{lambda_i tau} R_i(k) e for every real tau; the PSD-order argument |sum c_i R_i e| <= max c_i |P(k)|; |P(k)| <= 1/(2.7952 x 4.2797) + 0.00725 <= 0.09085; the bounds on M_n for tau >= 0 and tau <= 0, n = 0..3; and the translated-seed bound |psi_j^{(n)}(T)| <= a^n Delta~(t) e^{aT} with Lambda~ = 0.0983 >= 0.09085 (2.8033/2.6952)^2. Is anything about multiplicity, the pole order, or the normalization of the seed class overlooked?
3. **Corollary B.3 (forward source factor from the origin).** mu~ = e^{-(lambda_lo - a)(1 - 2 rho)} <= 0.92274 on chart 1/16, valid for every t >= 0 and T' <= -(1 - 2 rho), with the third-derivative factor lambda_hi/a <= 1.0402 <= 1.0743. Check both time cases. Check the claim that Lemmas L.2, L.3 and Theorem L.4 use mu only through the forward-profile seed bounds at sources, so Theorem L.4 holds with mu~ (and with d replaced by Delta~(t)) for every t >= 0.
4. **Proposition B.4.** e . eps phi_0(tau) >= eps p0 e^{2.7872 tau} for tau >= 0.
5. **Theorem B.5.** Exact conditions (a)-(c) for (rho, d, K) = (1/16, 0.0305, 15.5), d0 = 0.0006351; the start at t = 0 from y(0) <= 31.9 |eps phi|_a^2 <= 31.9 Delta~(0)^2 plus concavity; the first-crossing barrier on [0, T~]; items 1-5 including all-label bounds (displacement <= 0.044919, speed <= 0.15994, acceleration <= 0.64057, transmitter >= 0.84006, separation >= 0.910162, delay within 0.089838), and the gain T~ - T_N >= 0.1295 with its monotonicity in ln(1/eps). Confirm that no part of the past is replaced, that the correction's third derivative is never used, and that the same solution (not a restart) is continued.
6. **Corollary B.6.** Ladder (0.020, 6) and (0.025, 8.5); the time table; the correction at the accepted T_N.
7. **Proposition B.7.** The central lower bound, its monotonicity in eps, positivity on [1e-37, 0.00646], the table at T~, the ladder values and the values at the accepted T_N; the time-zero upper bound eps P + 15.5 (Lambda~ eps)^2. Check outward rounding of every displayed decimal.
8. **Proposition B.8 (obstruction).** The concave-maximum certificate and its exact values; the monotonicity in d; case 2 (charts rho >= 1/16 with the same formulas: every constant nondecreasing in rho and entering every coefficient with a nonnegative sign; lower-rounded constants at 1/16); case 3 (charts rho <= 1/16 via the radius-zero envelope and y <= (1/16 - d)/2). Is any constant of the estimate in fact decreasing in rho, or entering with a negative sign? Is the statement scoped correctly as a property of the estimate, not of the solution? Are the hypothetical part-deletion values (0.0383, 0.0377, 0.0478) correctly labelled as orientation?
9. **Scope and wording.** Claim grades, falsifiers, that no growth uniform in eps, order-one motion, fate or wake-speed arrival is claimed, the distinction between proof thresholds and measured displacements, and the evidence README's account of the instrument, versions and runs. Check that the instrument's known cases precede its targets and that its use of the frozen instrument changes only the mu entry.

Please also give an independent exact or interval recomputation of at least: delta_r, Pbar, Lambda~, mu~(1/16), condition (b) of Theorem B.5 (the value C_L F^{mu~}_sgn(0.0305, 15.5 x 0.0305^2), which needs the per-offset polynomials of Lemmas L.2–L.3 summed with the declared lattice sums), the gain at eps = 0.00646, the central lower bound at eps = 1e-4 and at eps = 1e-37, and the obstruction certificate at d = 0.0317 on chart 1/16.
