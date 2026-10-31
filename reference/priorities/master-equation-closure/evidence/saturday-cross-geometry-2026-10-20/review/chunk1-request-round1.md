You are an independent reviewer (Codex, gpt-6.1-sol) for the Architrino repository at /Users/markmorris/vibe/architrino. Do not edit any file. Read AGENTS.md's physics rules and the canonical Master Equation passages you need. Read the files under review in full and the cited accepted sources. Reconstruct every derivation and every numerical claim independently; do not trust the author's statements or instruments. Report: (a) what you read; (b) for each claim, supported / not supported / needs correction, with the reason; (c) a numbered list of actionable corrections, each labelled with a short ID; (d) an overall disposition: ACCEPT, ACCEPT AFTER CORRECTIONS, or REJECT. Be specific about scope: what is derived, what is only sampled, what is conditional.

## Chunk 1, round 1: fixed-past field control for the infinite alternating lattice

### File under review

- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20.md`, SHA-256 `8521157ab13eecdf4a4c5d3fd071315c069e229552756e3adec30f1d7a9120a6`, 44,570 bytes. Review all of Sections Result and 1 to 10.

Supporting (not itself under review in this chunk, but its existence and the instrument description should be consistent):

- `reference/priorities/master-equation-closure/evidence/saturday-cross-geometry-2026-10-20/derivative_constants_check.py`, SHA-256 `fff060f05079d9139ef7851b01e6972536ed3a5099669c594a2f5a28f3fd0dcf`; outputs in `.local-data/aaa-work-threads/saturday-agents-2026-10-20/crossgeom/run1.out` (known cases) and `run2.out` (sampled target). This is a sampled check only; no claim of the subject rests on it.
- The companion `saturday-cross-geometry-continuation-2026-10-20-sharpness.md` is chunk 2 and is reviewed separately; here only check that the main subject's statements about it are not stronger than what it claims.

### Accepted sources the reviewer must read

- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-comparison-2026-10-10.md`, Sections 4 and 6 (the finite-population Lemma 1, Theorems 1 and 2, and conditions (F1) to (F3)).
- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-comparison-codex-review-2026-10-10.md` (final disposition, G1, G2, G5).
- `reference/priorities/master-equation-closure/lattice-research/analysis/staggered-lattice-first-event.md` (equation (6) prescription, Sections 1, 6, 9) and `staggered-lattice-first-event-independent-adjudication.md` (Sections 7, 13, 14).
- `reference/priorities/master-equation-closure/analysis/population-independent-adjudication.md`, section "Independent reconstruction of stationary block convergence"; `population-delayed-summation.md`.
- `reference/priorities/master-equation-closure/analysis/curved-path-wake-speed-obstructions.md` (hypotheses U1, U2, continuation class) and `curved-path-wake-speed-jump-exclusion.md` (hypotheses U1, P, measure form M1 to M5, corrections (7)).
- `content/markdown/aaa/dynamics/master-equation.md`, section "The Master Equation (Canonical Form)" and "Definition of Causal Emission Times".

### Specific claims to check

1. Section 3, Lemma R: the derivative formulas for $\partial_{\mathbf R}\Psi$ and $\partial_{\mathbf v}\Psi$; the bounds with $c_v(w)$ and $1/(1-w)^2$; the convexity argument that keeps the range floor $\rho_j$ along the interpolation segments; the assembled constants $\Lambda_j^x$, $\Lambda_j^t$; the use of the implicit-function theorem for the root map with only $C^1$ source paths and Lipschitz velocity.
2. Section 4, Theorem A: (a) the root census, including the claim that every root lies in $W_j\subset(-\infty,T_*-\gamma]$ using only (H1), the strict monotonicity on $(-\infty,T_*-\gamma]$ using (H2), and the sign at $T_*-\gamma$; (b) uniform convergence and continuity; (c) the Lipschitz statement; (d) the post-event root exclusion for continuations in the uniform anchor ball.
3. Section 5, Theorem A′: whether the "population reading" of the continuation class, of (M2) and of (P) is legitimate, i.e. whether the proofs of Theorems U, J, S, BV use the partner sum only through a bounded field continuous at the event; whether (U1), (U2) and (P) are actually verified; whether the restriction to continuations in a uniform anchor ball is correctly stated as a limitation.
4. Section 6: the stationary block bounds with $C_3\le204$ (reconstructed from the adjudication) and the new $C_4\le2220$; the counting and the coefficients $128\pi$ and $1536\pi/7$; the condition $R\ge\max\{2\sqrt3,2(\beta+a)\}$; the near-block bounds; the statement that the anchor value of $\mathbf S_i$ is not claimed because reflection through an anchor does not preserve the block partition. Corollary A.2 (shell count, $c_N$, geometric sum, the $(N+1)$ powers) and Corollary A.3 (the reduction to $k+p>3$).
5. Section 7, Proposition C (a) and the explicit example in (b); the two bullet points on what does not transfer, in particular that the uniform-norm persistence fails because of the accepted delayed-summation obstruction.
6. Section 8: whether the coherent branch indeed satisfies (H1)-(H3) and an envelope of Corollary A.2 type, with the stated caveat that $w=q'(t_*-1/6)<1$ has no numerical value claimed; whether any certified number is misquoted.
7. Grades and falsifiers throughout; any overclaim about the localized lattice family, about solutions versus prescribed histories, or about the ring or global fate. Check $c_f=1$ and acceleration-only language.
