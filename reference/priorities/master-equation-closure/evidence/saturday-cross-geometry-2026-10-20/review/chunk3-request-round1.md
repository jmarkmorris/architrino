You are an independent reviewer (Codex, gpt-6.1-sol) for the Architrino repository at /Users/markmorris/vibe/architrino. Do not edit any file. Read AGENTS.md's physics rules and the canonical Master Equation passages you need. Read the files under review in full and the cited accepted sources. Reconstruct every derivation and every numerical claim independently; do not trust the author's statements or instruments. Report: (a) what you read; (b) for each claim, supported / not supported / needs correction, with the reason; (c) a numbered list of actionable corrections, each labelled with a short ID; (d) an overall disposition: ACCEPT, ACCEPT AFTER CORRECTIONS, or REJECT. Be specific about scope: what is derived, what is only sampled, what is conditional.

## Chunk 3, round 1: persistence of a lattice arrival under weighted perturbations (Theorem P)

### File under review

- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-persistence.md`, SHA-256 `9f2f67cb0cad3bc5374cd0a2fc300f19b700702c30b1d47ebed4b78e674c0520`, 23,355 bytes. Review all of it.

### Sources the reviewer must read

- The accepted field theorem `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20.md` (SHA-256 `4ab0726d2dca9e4a62e2f0bb9e245b71bf40d252f84ec2a87fb09ddb4b167f1f`; accepted in chunk 1 round 2): Sections 2 to 6, Theorem A, Lemma R, Theorem A′, Corollary A.2.
- The accepted sharpness companion `...-2026-10-20-sharpness.md` (chunk 2), for the statement that uniform neighbourhoods fail.
- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-comparison-2026-10-10.md`, Section 4, Theorem 2 and its proof; and the review `saturday-cross-geometry-comparison-codex-review-2026-10-10.md`, finding G2 and the reconstruction of Theorem 2.
- `reference/priorities/master-equation-closure/analysis/population-delayed-summation.md` (uniform-norm obstruction).
- `reference/priorities/master-equation-closure/lattice-research/analysis/staggered-lattice-first-event.md` (Sections 1, 9) and its adjudication (Sections 13, 14), for Corollary P.1.
- `reference/priorities/master-equation-closure/analysis/curved-path-wake-speed-obstructions.md` and `curved-path-wake-speed-jump-exclusion.md` as needed for Theorem A′'s classes.

### Specific claims to check

1. Section 2: whether (P1)-(P6) suffice for uniform constants in Theorem A at every member and reception time up to $T_*+\delta$ (finitely many sources with windows after time zero; envelope for the rest), and the derivation of the uniform $\kappa_1$.
2. Section 3, Lemma D: the root-shift estimate $\lvert s^X-s^Y\rvert\le H_j/(1-w)$; the position and velocity differences at the roots; the use of $c_R(w)$ and $1/((1-w)^2\rho^2)$ on a convex set; the weighted form and the constant $K_\mu$ (note the window offset $h$).
3. Section 4, Steps 1 to 6: decoupling within steps shorter than the emission gap; the weighted Gronwall step $N(t_k+\tau)\le C_{\rm step}N(t_k)$ including the acceleration component; the fixed-tube construction from the known prefix (Step 2, windows $W_j^Q$); comparison paths; identification with the actual solution; uniform transverse crossings for infinitely many arriving members; and especially Step 6, the population-level conclusion when the infimum $T^\eta$ is not attained.
4. Section 5: whether the coherent branch satisfies (P1)-(P6) from the accepted certificate (displacement bound, envelope with $\mu\in(0,\lambda]$, supplied speeds below $10^{-10}$, bounded acceleration on cells, $\beta_0=5.9711$ for every label, monotone $q'$).
5. Scope: no numerical $\varepsilon_0$; nothing about localized preparations; no zero-rate arrivals; continuations restricted to a uniform anchor ball; grades, falsifiers, $c_f=1$, acceleration-only language, prescribed pasts not solutions.
