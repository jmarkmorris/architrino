You are an independent reviewer (Codex, gpt-6.1-sol) for the Architrino repository at /Users/markmorris/vibe/architrino. Do not edit any file. Read AGENTS.md's physics rules and the canonical Master Equation passages you need. Read the files under review in full and the cited accepted sources. Reconstruct every derivation and every numerical claim independently; do not trust the author's statements or instruments. Report: (a) what you read; (b) for each claim, supported / not supported / needs correction, with the reason; (c) a numbered list of actionable corrections, each labelled with a short ID; (d) an overall disposition: ACCEPT, ACCEPT AFTER CORRECTIONS, or REJECT. Be specific about scope: what is derived, what is only sampled, what is conditional.

## Chunk 4, round 1: passage through a transverse fold in a fixed-past window (Proposition F)

### File under review

- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-fold-passage.md`, SHA-256 `57faf275337257319fa1766d46bfbaf928732642be4fa2f6962123a76d9b2311`, 22219 bytes. Review all of it.

### Sources the reviewer must read

- `reference/priorities/master-equation-closure/analysis/mec-008-self-complement-independent-adjudication.md`: the verdict table and the section "Independent transverse-fold reconstruction" (residual, $a_f$, $b_f$, two-root count, coefficient).
- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-comparison-2026-10-10.md`: Section 3 (fold control and what it does not establish), Section 5 (ring fold along the rigid direction, $a_f=0$), Section 7; and its review, finding G3.
- The accepted field theorem `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20.md`, Section 3 (derivative formulas, convexity device), for the regular rows and the lattice case.
- `reference/priorities/master-equation-closure/analysis/curved-path-wake-speed-obstructions.md` (continuation class) for comparison of classes.
- `content/markdown/aaa/dynamics/master-equation.md`, canonical form.
- `reference/priorities/app-solver/contracts/evolution-contract-v1.md`, section "Regularization And Caustics", only to check the scope remark.

### Specific claims to check

1. Section 1: the residual $F(T,\mathbf x,s)$ with free receiver position and its partial derivatives; consistency of $a_f$ with the reconstruction ($a_f=F_T$ along the path $=\mathbf n_f\cdot\mathbf V_r-1$).
2. Section 2: whether (W1) to (W4) are coherent, whether (W1) is correctly verified from the separation and speed conditions (chord bounds), and whether any hypothesis is circular.
3. Section 3, Lemma F1: the implicit-function construction of the critical emission and fold function $H$ with $\partial_TH=-1$, $\nabla_{\mathbf x}H=\mathbf n$; the two-sided bounds on $\lvert s_\pm-s_c\rvert$ and $\lvert D_\pm\rvert$; $\lvert\mathbf S\rvert\le C_0\lvert H\rvert^{-1/2}$ with $C_0=4K/(r_0^2\sqrt\beta)$; the gradient bound $C_1\lvert H\rvert^{-3/2}$; agreement of the leading coefficient with the reconstruction's boxed formula.
4. Section 3, transversality along every path of the class $\mathcal C$ and the bound $\tfrac12\lvert a_f\rvert\lvert T-T_c\rvert\le\lvert H\rvert\le\tfrac32\lvert a_f\rvert\lvert T-T_c\rvert$; which side carries the pair.
5. Section 4, case (i): the weighted metric space, the self-map estimate (including the constants $C_2$, $\sqrt2C_2$, $3C_2$, $\tfrac43\sqrt2<2$), the segment estimate $\lvert H\rvert\ge\lvert a_f\rvert\sigma/8$, the contraction factor $\tfrac12L_{\rm reg}\tau_1^2+\tfrac12C_3\tau_1^{1/2}$, the converse that every path of $\mathcal C$ is a fixed point, and continuation beyond $T_c+\tau_1$. Case (ii): uniqueness of the incoming path, existence of limits, ordinary continuation.
6. Section 5: whether the ring statements are correctly conditional; whether the ring numbers quoted (speeds $1.826$, $2.974$; smallest delay $0.1479$; $0.875$ and $0.088$ percent; nine tenths) match the comparison; whether the claim about rules keyed to small $D$ is supported.
7. Scope: sharp equation only, no regularization; no claim that an evolved ring reaches a fold; grades and falsifiers; $c_f=1$; acceleration-only language.
