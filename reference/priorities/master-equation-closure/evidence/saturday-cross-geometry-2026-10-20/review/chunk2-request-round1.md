You are an independent reviewer (Codex, gpt-6.1-sol) for the Architrino repository at /Users/markmorris/vibe/architrino. Do not edit any file. Read AGENTS.md's physics rules and the canonical Master Equation passages you need. Read the files under review in full and the cited accepted sources. Reconstruct every derivation and every numerical claim independently; do not trust the author's statements or instruments. Report: (a) what you read; (b) for each claim, supported / not supported / needs correction, with the reason; (c) a numbered list of actionable corrections, each labelled with a short ID; (d) an overall disposition: ACCEPT, ACCEPT AFTER CORRECTIONS, or REJECT. Be specific about scope: what is derived, what is only sampled, what is conditional.

## Chunk 2, round 1: sharpness of the light-cone condition (Theorem B)

### File under review

- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-sharpness.md`, SHA-256 `3eac79a39587dbe46c9b90773852c103207ef41c4a3502de4ee38dc49bb93269`, 15,811 bytes. Review all of it.

Context (under separate review as chunk 1; read Sections 2 to 4 and Corollary A.3 of Section 6 for the definitions the companion uses, but do not review chunk 1 here):

- `reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20.md`. Its live bytes may change during chunk 1 corrections; the definitions used by the companion (setting, (H1), (H2), light-cone windows $W_j$, quantities $E_j$, $V_j$, $L_j$, sums $\Sigma_0$, $\Sigma_1^x$, $\Sigma_1^t$, Theorem A(a), Corollary A.3) are what matter.

### Accepted sources the reviewer must read

- `reference/priorities/master-equation-closure/analysis/population-delayed-summation.md` (the accepted obstruction whose mechanism is extended) and `population-summation-independent-adjudication.md` (its acceptance and scope table).
- `reference/priorities/master-equation-closure/analysis/population-independent-adjudication.md`, section "Independent reconstruction of stationary block convergence" (absolute convergence of the stationary block series; here used with unit spacing).
- `reference/priorities/master-equation-closure/lattice-research/analysis/staggered-lattice-first-event.md`, equation (6), for the lattice prescription.
- `content/markdown/aaa/dynamics/master-equation.md`, "The Master Equation (Canonical Form)".

### Specific claims to check

1. The pulse shapes: $C^3$ regularity of both extensions; $\lVert\psi\rVert_\infty\le16$, $\lVert\psi'\rVert_\infty\le80$; the plateau step $P(u)=35u^4-84u^5+70u^6-20u^7$ with $P'(u)=140u^3(1-u)^3$, its endpoint conditions, and $\lVert\phi'\rVert_\infty=140/64$.
2. The uniform bounds giving (H1) with $b=1/64$ and (H2) with $w=5/64$ for both families, and the statement that all pulses end before time $-7$.
3. Exactness of the roots at reception $(0,\mathbf 0)$: $s=-d_j$ for family (V) with $D=1-\nu_j\sigma_j$; $s=s_j^*=-(d_j-\nu_j\sigma_j)$ for family (E) with $D=1$; uniqueness via Theorem A(a).
4. The window statements: for (V), $\nu_j\le V_j\le80\nu_j$; for (E) with $h\le1/4$, $W_j$ inside the plateau so $E_j=\nu_j$ and $V_j=L_j=0$.
5. The common-sign identities in Section 3 and their lower bounds ($\mathbf e$-projections at least $\nu_j/(3d_j^2)$ in (V) and $\nu_j/(2d_j^3)$ in (E) on the cone), including the treatment of $\sigma_j=-1$ in (E).
6. Section 4: the divergence argument along every complete-block exhaustion (not necessarily nested), using nonnegative corrections and the absolute convergence of the stationary block series; the box $Q_m$ (union of complete blocks, $4m^3$ labels, cone inclusion via $\mathbf n_j\cdot\mathbf e\ge1/\sqrt3$, $d_j\le\sqrt6m$); the two box lower bounds $\frac{4\nu}{3}6^{-1-k/2}m^{1-k}$ and $\frac{2\nu}{6\sqrt6}6^{-k/2}m^{-k}$; divergence for $0\le k\le1$ (V) and $k=0$ (E).
7. The converse paragraph: for $k>1$ (V) and $k>0$ (E, $h\le1/4$) the light-cone sums converge, so the dividing exponents $k_1=1$, $k_0=0$ are sharp within power profiles. Check whether "sharp" is stated at the right scope (prescribed histories, receiver $0$, power profiles).
8. Scope statements: prescribed pasts only, not solutions; one receiver; no statement about the Lipschitz part; relation to the accepted obstruction correctly described. Check grades, falsifiers, $c_f=1$, acceleration-only language.
