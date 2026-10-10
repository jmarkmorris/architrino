# Codex review of the Darwin pair stability claims

## Status and scope

The operator selected this review with the overnight reciprocal campaign on October 9, 2026. Codex reconstructs Sections 13.5(i) and 13.5(ii)(a) of the [frozen investigation](darwin-overnight-investigation.md), using its Sections 2, 4, 9 and 13.1 for definitions, and checks their use in the living comparison summaries. Subject and reference files remain unchanged. Findings await Claude's assessment and correction disposition. The [shared conversation](../../../../op/agent-chats/2026-10-09-closure-review-plan/chat.md) records delivery and decisions.

The law is the instantaneous Section 10 quadratic functional with opposite polarity, unit weights and $K=c_f=1$. No historical Darwin law, delayed law, physical mass or conserved physical account enters the proof. The quantities below are mathematical invariants of the selected comparison.

Independence is limited and explicit. Codex read the subject proof and reconstructed its load-bearing estimates; this is an adversarial proof review, not a blind derivation. The [pair reference](darwin-overnight-independent-adjudication.md) independently derived the mirror reduction, and the [ring reference's separate reading](../../braid-program/analysis/darwin-overnight-ring-independent-adjudication.md#independent-reading-of-the-mirror-subspace-orbital-stability-theorem-135i) already accepted the mirror theorem. The drift-aligned theorem had no independent assessment in the cited checkpoint. No campaign, integration or reference instrument was rerun.

## Mirror confinement reconstructed

Write $\boldsymbol\rho=\mathbf X_1-\mathbf X_2=r\mathbf e$, with $r>0$ and $|\mathbf e|=1$. For opposite polarity the full acceleration Hessian has common eigenvalues $1-1/r$ and $1-1/(2r)$ and relative eigenvalues $a=1+1/r$ and $b=1+1/(2r)$. Its singular separations are $1$ and $1/2$, both in common modes. Full regularity remains necessary although the restricted mirror velocity form is positive at every positive separation.

In the mirror subspace the reduced functional and conserved quantities are

$$
L_{\rm red}=\frac14a\dot r^2+\frac14D|\dot{\mathbf e}|^2+\frac1r,\qquad D=br^2=r^2+\frac r2,
$$

$$
\mathbf L=\frac12b\boldsymbol\rho\times\dot{\boldsymbol\rho},\qquad E=\frac14a\dot r^2+U(r;\ell),\qquad U(r;\ell)=\frac{\ell^2}{D}-\frac1r,\qquad \ell=|\mathbf L|.
$$

Here $D$ is the angular velocity coefficient, $\ell$ the conserved relative angular invariant and $E$ the energy-like invariant. Nonzero $\mathbf L$ fixes the relative plane. A circle at $r_0$ has $\ell_0^2=g(r_0)$, where

$$
g(r)=\frac{(2r+1)^2}{2(4r+1)},\qquad g'(r)=\frac{4r(2r+1)}{(4r+1)^2}>0,\qquad U_{rr}(r_0;\ell_0)=\frac8{r_0(4r_0+1)(2r_0+1)}>0.
$$

Choose a closed interval about $r_0$ excluding zero, $1/2$ and $1$. For $\ell$ near $\ell_0$, the unique critical radius $r_c(\ell)$ remains inside and varies continuously. On a smaller fixed neighborhood, continuity supplies a common lower bound $m>0$ on $U_{rr}$. Taylor's theorem gives

$$
\Lambda=E-U(r_c(\ell);\ell)\ge\frac14\dot r^2+\frac m2(r-r_c(\ell))^2.
$$

This conserved excess tends to zero with the initial radial and angular deviations. A positive barrier at the interval endpoints prevents exit, giving small radial displacement and velocity. The identity $|\dot{\mathbf e}|=2\ell/D$ controls the angular rate. Positions and velocities lie in a compact subset of full regular phase space: the centre is fixed, separation avoids the excluded values, directions lie on the unit sphere and velocities are bounded. Smooth ordinary differential equation continuation gives global existence. This is stability of the family modulo phase and plane orientation.

**Claim grade: derived proof-review conclusion.** The mirror theorem survives with its regular-radius and mirror-data restrictions. Falsifier: failure of the displayed local lower bound or full regularity, or arbitrarily small mirror data escaping the chosen neighborhood under the frozen equations.

## Drift-aligned circles and their actual balance

Let $\mathbf R=(\mathbf X_1+\mathbf X_2)/2$, $\mathbf U=\dot{\mathbf R}$ and $M=-(I+\mathbf e\mathbf e^{\mathsf T})/(2r)$. Translation invariance gives constant $\mathbf P=2(I+M)\mathbf U$. Eliminating $\mathbf U$ at fixed $\mathbf P$ gives a positive relative velocity form for $r>1$ and amended potential $V_{\mathbf P}=-1/r+\mathbf P^{\mathsf T}(I+M)^{-1}\mathbf P/4$.

Take nonzero $\mathbf P$ as polar axis, latitude $\chi$ and azimuth $\phi$, and fix the conserved azimuthal invariant $j=\ell_{\mathbf P}$. Set $q=|\mathbf P|^2$, $\beta_1=r/(r-1)$ and $\beta_2=2r/(2r-1)$. The second reduction yields

$$
V_{\rm am}(r,\chi;j,q)=\frac{j^2}{D\cos^2\chi}-\frac1r+\frac q4\left[\beta_2+(\beta_1-\beta_2)\sin^2\chi\right].
$$

A genuine aligned rotating circle has $\chi=0$, $\dot r=\dot\chi=0$ and $V_{{\rm am},r}=0$. Its angular invariant must satisfy

$$
j^2=g(r_c)\left[1-\frac{q r_c^2}{2(2r_c-1)^2}\right]>0.
$$

An arbitrary momentum and radius need not supply a real rotating circle. The polar direction is undefined at $\mathbf P=0$; that case belongs to the mirror theorem.

At a genuine circle the mixed derivative vanishes and the latitude curvature is $2j^2/D+q(\beta_1-\beta_2)/2>0$. The radial curvature uses the new $j^2$, held fixed during differentiation. Put $f=1/D$. Direct differentiation gives

$$
k_r=j^2f''-\frac2{r_c^3}+\frac q4\beta_2''
=\frac8{r_c(4r_c+1)(2r_c+1)}
+\frac q4\left(\beta_2''-\beta_2'\frac{f''}{f'}\right),
$$

$$
\beta_2'=-\frac2{(2r-1)^2},\qquad \beta_2''=\frac8{(2r-1)^3},\qquad
\frac{f''}{f'}=\frac2{2r+1/2}-\frac{2(2r+1/2)}{r^2+r/2}.
$$

The additional term containing $\beta_2'$ reflects the changed angular invariant. Adding only $q\beta_2''/4$ to the zero-drift circle curvature misses that change.

The positive radial curvature can also be proved throughout the real-circle domain, rather than assumed as an extra restriction. Its upper momentum boundary is $q_{\max}=2(2r-1)^2/r^2$, where $j=0$. At fixed $r>1$, $k_r$ is affine in $q$, with endpoint values $k_r(0)=8/[r(4r+1)(2r+1)]>0$ and $k_r(q_{\max})=2/[r^3(2r-1)]>0$. Thus every $0\le q<q_{\max}$ has $k_r>0$. This is a derived algebraic interpolation argument; it does not admit the nonrotating endpoint as a rotating circle.

For fixed nonzero $\mathbf P$, a genuine rotating circle with $r_c>1$ and $k_r>0$ is a strict local minimum of the twice-reduced potential. In a neighborhood avoiding $\cos\chi=0$, its positive velocity form and conserved energy excess bound radial and latitude positions and velocities. Perturbations may change $j$: the implicit function theorem and uniform minimum bounds handle nearby values. The same argument handles $\mathbf P$ near a fixed nonzero vector when real-circle and positive-curvature conditions persist, with the polar axis varying continuously. It gives no uniform direction-dependent assertion across zero momentum. Reconstruction controls relative data modulo azimuth; the centre can drift. Continuation uses compact reduced variables, translation invariance and bounded reconstructed velocities, not compact full positions.

**Claim grade: derived conditional reconstruction.** The minimum argument survives on this corrected equilibrium domain. Falsifier: a real regular circle satisfying the stated curvature conditions but failing the local conserved-energy bound, or arbitrarily small reduced data escaping a fixed neighborhood.

## Findings for Claude's assessment

| ID | Exact target and finding | Consequence and requested correction | Grade and falsifier |
| --- | --- | --- | --- |
| D-01 | Investigation 13.5(ii)(a): radial stiffness examples do not enforce the changed $j$ at the drifting critical point. At $r_c=100$, $|\mathbf P|=0.1$, the balanced curvature is $9.913030263553666\times10^{-7}$ rather than printed $9.989\times10^{-7}$; at $r_c=20$ it is $1.2029570098181352\times10^{-4}$ rather than $1.213\times10^{-4}$. | Supply a governing algebra addendum with balance, corrected derivative and numbers. Preserve stability at the real-circle/positive-curvature domain; this arithmetic defect does not refute the cited small-drift stability. | Derived differentiation, floating evaluation by the isolated review calculation. Falsifier: differentiation at fixed actually balanced $j$ reproducing the printed values. |
| D-02 | 13.5(ii)(a), checkpoint aligned-circle class and retained 50-period test: DC-100 plus common normal velocity retains the old tangential speed, so is not exactly balanced. At unchanged $r,j^2=g(r)$, amended radial derivative is $q\beta_2'/4<0$. | Distinguish a near-circle perturbation test from an exact aligned circle; adjust tangential speed or select the equilibrium radius at unchanged $j$. No run requested. | Derived. Falsifier: zero radial residual for the unchanged DC-100 tangential speed with nonzero normal common velocity. |
| D-03 | The phrase “for every $\mathbf P$ and $r_c>1$” omits real rotating balance; varying-$\mathbf P$ omits a local nonzero base point and regular parameter neighborhood. | State $j^2>0$, $k_r>0$, fixed nonzero base $\mathbf P$ and local continuation. At $r=100,q=9$, the alleged circle needs $j^2=-6.867915153153956$ and is not real. Keep zero momentum separate. | Derived algebra. Falsifier: a real rotating circle with this negative required square, or a proved uniform polar-axis continuation through zero momentum. |
| D-04 | Section 9 asserts every nonzero angular invariant in the declared domain has $\ell^2\gg1/2$. Retained DL-100 is initially in the domain with $\ell=0.5025$, $\ell^2=0.25250625<1/2$. Upper velocity bounds supply no lower angular bound. | Clarify in an addendum; the mirror theorem obtains $\ell^2>1/2$ from proximity to a circle. Binary GO and that theorem do not need the erroneous inference. | Derived counterexample. Falsifier: a different declared domain excluding DL-100 initially, or its stated data giving $\ell^2>1/2$. |
| D-05 | Frozen checkpoint pair class rows interchange mode labels at $r=1/2$: opposite polarity is common transverse; same polarity is relative transverse, as Section 2 correctly says. | Add a governing checkpoint clarification while preserving frozen bytes. Current living determinant/domain summaries avoid the wrong labels. | Derived diagonalization. Falsifier: action of $H$ on common/relative transverse eigenvectors giving the frozen labels. |

The living variant and binary summaries bound ring instability to examined radii, deny a continuous-radius certificate, retain preregistered binary GO and leave general drift open. The ledger/registry retain finite windows. These measured source-review conclusions concern the named passages below, not a new ring theorem or trajectory validation. Normal-aligned theorem and unlaunched-test wording need D-01–D-03. Broader frozen ring wording should be read through the already bounded living summaries.

## Arithmetic and source receipts

The isolated Node calculation at [codex-darwin-review-algebra.cjs](../evidence/codex-darwin-review-algebra.cjs) imports no subject code and performs no integration. Its zero-momentum known control at $r=2,20,100$ reproduced the independently differentiated mirror curvature and angular invariant before drift targets; exit 0, control PASS printed first. At DG-100 momentum norm squared $q=0.0001019701$, $r=100$, it returned $j^2=50.37466315430174$, radial residual $2.414\times10^{-21}$ and curvature $9.925308675360434\times10^{-7}$. At $q=0.01$, $r=100,20$, residual magnitudes were below $6\times10^{-20}$. These are floating algebra checks, not interval certificates or evolution.

Exact source coverage: investigation Sections 1–10, 13.1–13.5 and checkpoint; pair reference reduction and recorded adjudication; ring reference's 13.5(i) reading; variant Section 10; binary Section 7; binary priorities Darwin entries; ledger F-D-I rows; registry Darwin preparations. Other source proofs/instruments are outside this review. Candidate whole-file hashes used Node SHA-256 before corrections; paths are relative to the parent owner.

| Source | SHA-256 |
| --- | --- |
| binary-research/analysis/darwin-overnight-investigation.md | 640ef664e67ef0ff1538efc22d91500b6ee804ac8afb62ee211ca5ce39ee4ce1 |
| binary-research/analysis/darwin-overnight-independent-adjudication.md | 7a9f27c34253e8766cd03e30d0e59513fbd6ba5f4ddec5978ccf7aef9f32839b |
| braid-program/analysis/darwin-overnight-ring-independent-adjudication.md | 248c9cc14b9c2d44505dfed5c7b9bb295322081a03b7dfe46815044717c3f3df |
| equation-variants/manuscript.md | c3c0215bb8850f5c24b013c264a99255d60d4b3840aafddeb8da43f65dd9ce8c |
| binary-research/manuscript.md | 1b48f04d00e0dafac24a12594d5427534ce90c60a912cd08aac295fed521fc3d |
| binary-research/priorities.md | 3a8aff0a8ff29d6da45a42983e20edd6b40729e33dc9f74d20a37d793f6c391f |
| configurations/findings-ledger.md | 5fcb8e0ef6ac6295ec496187f44f0df85dc116816f99832d9464885a0d4ae0fb |
| configurations/geometry-configuration-registry.md | a06a5479ec71ce68957f65d66b26cb22631c594ae516088d089be0a891e1db5c |

The final assessment and separate verification below complete D-01–D-05. General drift/KAM, long controls, physical accounts and delayed comparison remain scientific obligations outside this review.

## Final assessment and separate verification

Claude accepted all five findings after deriving the amended potential and balance from the frozen definitions. Its [governing addendum](darwin-overnight-addendum-2026-10-10.md), at SHA-256 `18bfc22cb5f07eee357690e7ba040bb4fb707cde680e78f69fe394eabefb000f`, is accepted by Codex after the following separate checks. The mirror confinement argument and preregistered binary GO survive; the ring statement retains its examined-radius and finite-run boundaries. No general-drift theorem or physical conserved account is added.

The amended curvature's drift coefficient has the exact form

$$
\beta_2''-\beta_2'\frac{f''}{f'}
=-\frac{8r^3-12r^2-6r-1}{(2r-1)^3D(r)(2r+\tfrac12)}.
$$

Putting $x=2r-1$ reduces its zero to $x^3-6x-6=0$, with $x=2^{1/3}+2^{2/3}$. Thus the drift raises curvature for $1<r<(1+2^{1/3}+2^{2/3})/2$, and lowers it above that threshold, including both tabulated radii and the declared low-speed comparison domain. This derived check repairs the addendum's initially unrestricted lowering claim. The endpoint proof of positive curvature for every real rotating aligned circle remains valid on both sides of the threshold.

The addendum now distinguishes holding radius, angular invariant or tangential speed fixed. I independently solved its three balances at fixed inherited $q=9.90025\times10^{-5}$, after the known $q=0$ controls returned radius $100$ and the mirror speed in all three cases. The resulting radii are $100$, $100.00125940620808$ and $99.99874687484217$; tangential speeds agree with its printed values within rounding. These are measured floating algebra results, not enclosures. The common velocity must be reconstructed from fixed momentum when radius changes: its norm is $\sqrt q/[2(1-1/(2r))]$, approximately $0.00499999968357$ in the fixed-$j$ case and $0.00500000031486$ in the fixed-speed case. The quoted $0.005$ defines the inherited momentum at the original preparation; it is not held independently fixed in these amended-potential comparisons.

I reran Claude's unchanged [separate arithmetic file](../evidence/darwin-addendum-aligned-circle-check.mjs), SHA-256 `b7b129ec8e959f5e58810f5717874013b07e45eb59ad4a86f0abfc4d6031aec2`: exit 0, three known controls passed before targets, and its direct derivative and finite-difference routes reproduce the corrected decimal curvatures. Both sides share the frozen potential definition; the check establishes algebraic consistency from that definition, not trajectory correctness. The addendum's remaining finite-preparation interpretation is explicitly inferred and its membership in the local stability neighbourhood unchecked.

Claude separately verified the corrected variant Section 10, binary Section 7, aligned follow-up tracker and ledger F-D-I-5 at the hashes recorded in the [review plan](../../analysis/reciprocal-review-plan-2026-10-09.md). The frozen investigation, pair reference and ring reference still match this review's original SHA-256 values by Node crypto comparison. The review is complete as a bounded reconstruction and summary assessment; no simulation, new law or publication was performed. A contradictory derivative, failed real-circle positivity proof or escaping arbitrarily small reduced perturbation would overturn the associated accepted result.
