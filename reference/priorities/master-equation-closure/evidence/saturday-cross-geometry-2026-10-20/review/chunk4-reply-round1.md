**Disposition: ACCEPT AFTER CORRECTIONS.**

The fold estimates and weighted contraction support a local continuation theorem for an explicitly defined old-emission field. **Proposition F is not yet established as the advertised Master Equation result:** literal (W1) cannot hold on an open reception neighbourhood containing the receiver’s own path. This is repairable without changing the physical equation.

No files were edited. `shasum -a 256` and `wc -c` verified the reviewed [fold-passage file](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-fold-passage.md) against the supplied digest and 22,219-byte size; the digest remained unchanged at closeout.

**What I read**

- The complete file under review, AGENTS.md, the startup router, and the live theorem-review procedure.
- The self-complement adjudication’s verdict table and complete “Independent transverse-fold reconstruction.”
- The cross-geometry comparison, including Sections 3, 5 and 7, and its review, especially G3 and the final disposition.
- The field theorem, including Section 3’s derivative formulas and convexity argument, its lattice hypotheses and summation prescription.
- The curved-path wake-speed obstruction and its continuation class.
- The canonical Master Equation’s causal-root definition, per-hit acceleration, complete sum and exclusions; the evolution contract’s “Regularization And Caustics.”
- Supporting ring parameter passages and the comparison’s retained numerical ledger. I independently recomputed the quoted ring quantities; I did not execute the author’s instruments.

**Claim-by-claim assessment**

1. **Section 1: residual and derivatives — supported, derived.**

   With \(P=I-\mathbf n\mathbf n^{\mathsf T}\),
   \[
   \partial_s\mathbf n=-P\mathbf V_j/r
   \]
   gives
   \[
   F_s=D,\quad F_T=-1,\quad \nabla_{\mathbf x}F=\mathbf n^{\mathsf T},
   \quad
   F_{ss}=\frac{\lvert\mathbf V_j\rvert^2-(\mathbf n\cdot\mathbf V_j)^2}{r}
   -\mathbf n\cdot\mathbf A_j.
   \]
   Along the receiver path,
   \[
   \frac{d}{dT}F(T,\mathbf x(T),s_f)
   =-1+\mathbf n_f\cdot\mathbf V_c=a_f.
   \]
   Thus the reconstruction’s reception derivative agrees with the note. It must remain distinguished from the free-position partial derivative \(F_T=-1\).

2. **Section 2: hypotheses — needs correction.**

   The partner-separation argument is valid: a recent partner emission would require a range below \(\gamma_0+\tau_0\).

   The self-chord argument is also valid **along the receiver path**, provided the stated incoming velocity bound holds throughout \((T_c-\gamma_0,T_c)\). For super-wake-speed motion, projection on \(\mathbf V_c/\lvert\mathbf V_c\rvert\) gives a chord longer than its time span; for sub-wake-speed motion, the triangle inequality gives a shorter chord.

   **It does not verify (W1) at every free reception point in \(U\).** For any continuous incoming receiver history, choose
   \[
   s=T_c-\varepsilon,\qquad
   \mathbf x_\varepsilon=\mathbf X_i(s)+\varepsilon\boldsymbol\omega,
   \qquad \lvert\boldsymbol\omega\rvert=1.
   \]
   Then
   \[
   F(T_c,\mathbf x_\varepsilon,s)=0.
   \]
   As \(\varepsilon\downarrow0\), \(\mathbf x_\varepsilon\to\mathbf x_c\), so these receptions lie in \(U\), while their emissions are later than \(T_c-\gamma_0\). This directly defeats literal (W1).

   There is also an existence circularity: “considered continuations” are defined using \(\mathcal C\), which already requires solving the equation. That cannot establish the field needed to construct the first solution.

   W2’s bounded Lipschitz remainder is an adequate assumption. Its assertion that finite population implies a finite root sum is unsupported: finitely many sources can have infinitely many old roots.

3. **Lemma F1 — estimates supported; endpoint argument needs correction.**

   The implicit-function construction requires only the stated \(C^2\) transmitter and positive range. Since \(F_s=0\) at the critical emission,
   \[
   H_T=-1,\qquad \nabla_{\mathbf x}H=\mathbf n^{\mathsf T}.
   \]

   Independently integrating the curvature bounds gives
   \[
   \frac{\beta}{4}\delta^2
   \le |F(s_c+\delta)-H|
   \le\beta\delta^2.
   \]
   At either root this yields exactly
   \[
   \sqrt{|H|/\beta}\le|\delta_\pm|\le2\sqrt{|H|/\beta}.
   \]
   Integrating \(F_{ss}\) once gives
   \[
   \tfrac12\sqrt{\beta|H|}
   \le |D_\pm|
   \le4\sqrt{\beta|H|}.
   \]
   Summing the two row bounds therefore gives the stated
   \[
   C_0=\frac{4K}{r_0^2\sqrt\beta}.
   \]

   The gradient exponent is also supported. Direct differentiation of
   \(\widetilde\Psi=\mathbf n/(r^2|D|)\) gives
   \[
   \|\partial_{\mathbf R}\widetilde\Psi\|
   \le\frac{2}{r^3|D|}
      +\frac{M}{r^3D^2},
   \qquad
   \|\partial_{\mathbf v}\widetilde\Psi\|
   \le\frac1{r^2D^2},
   \]
   where \(M\) bounds source speed. Together with
   \[
   ds_\pm=(dT-\mathbf n\cdot d\mathbf x)/D_\pm,
   \]
   this proves \(C_1|H|^{-3/2}\). No third transmitter derivative is needed.

   The leading pair coefficient is
   \[
   \mathbf S=
   \frac{\sqrt2\,\sigma K\mathbf n_f}
        {r_f^2\sqrt{\beta|H|}}
   +o(|H|^{-1/2}),
   \]
   which becomes the adjudication’s boxed coefficient when \(H=a_fh+o(h)\). Both branches add; opposite signs of \(D\) do not cancel them.

   **Proof defect:** the points \(s_c\pm\sigma_0\) need not lie inside the assumed interval \(s_f\pm\sigma_0\). Use fixed endpoints, or \(s_c\pm\sigma_0/2\) after ensuring \(|s_c-s_f|<\sigma_0/2\). The latter works with \(|H|<\beta\sigma_0^2/16\). The root-count assertion in W3 is then unnecessary as a premise.

4. **Transversality along \(\mathcal C\) — supported, conditional.**

   Uniformly shrinking \(U\) makes
   \[
   |(\mathbf n-\mathbf n_f)\cdot\mathbf V_c|\le|a_f|/4.
   \]
   The velocity bound supplies the other \(|a_f|/4\), proving that \(dH/dT\) retains the sign of \(a_f\), with magnitude between \(|a_f|/2\) and \(3|a_f|/2\). Integration gives the displayed two-sided bound.

   The pair is present precisely when \(b_fH<0\): after the crossing for \(a_fb_f<0\), before it for \(a_fb_f>0\).

5. **Section 4: continuation proof — supported for the old-emission field, conditional on repairing W1.**

   The weighted space is complete. Its paths need not initially be differentiable: the position estimate alone gives the uniform expansion
   \[
   H(T,\mathbf x(T))=a_f\tau+o(\tau)+O(\tau^{3/2}).
   \]
   Hence the asserted root-side bound and \(\sqrt2C_2\tau^{-1/2}\) envelope follow for sufficiently small \(\tau_1\).

   All listed constants check:
   \[
   C_2=C_0\sqrt{2/|a_f|},\qquad
   \int_0^\tau(\tau-\sigma)\sigma^{-1/2}d\sigma
   =\tfrac43\tau^{3/2},
   \]
   and \(\tfrac43\sqrt2=1.885618\ldots<2\), leaving the stated \(3C_2\) self-map bound.

   The segment estimate is valid after another uniform shrink. Indeed, the position ball defining \(X_\tau\) is convex, so every segment point already satisfies the same displacement bound; the note’s \(6C_2\) argument is conservative.

   The contraction factor is valid. The exact regular integral is
   \[
   \int_0^\tau(\tau-\sigma)\sigma^{3/2}d\sigma
   =\tfrac4{35}\tau^{7/2},
   \]
   so the note’s coefficient \(1/2\) is a permissible upper bound. The singular part integrates to \(C_3\tau^2/2\), yielding the claimed factor.

   The converse also works: the integrable acceleration envelope, local absolute continuity away from \(T_c\), and continuous endpoint velocity justify integration from \(T_c\). Every solution in \(\mathcal C\) therefore satisfies the integral equation and belongs to \(X_\tau\).

   Case (ii) is supported for the supplied incoming solution. Its integrable acceleration gives finite position and velocity limits; W4 already assumes the velocity limit, so this is a consistency argument rather than an independent derivation of W4. The outgoing regular ODE stays on the pair-free side initially by transversality.

   Beyond the constructed interval, uniqueness is **local while \(H\ne0\)**. Remaining on the open root side does not supply one uniform positive lower bound for \(|H|\) over an arbitrary later interval.

6. **Section 5: ring claims — numerical values supported; applicability needs qualification.**

   My separate binary64 calculation used the direct circular reception equation
   \[
   \left|(R,0)-R(\cos(\phi_j-\Omega d),\sin(\phi_j-\Omega d))\right|=d.
   \]
   I partitioned the delay interval at its analytic critical points and used bisection, after a known stationary-source case returned its exact delay.

   | Quantity | T02 | T04 |
   |---|---:|---:|
   | Reference speed | 1.8264309647 | 2.9743071761 |
   | Minimum positive delay | 0.3608622635 | 0.1479033790 |
   | Fold threshold speed | 1.8104512383 | 2.9716938707 |
   | Percentage below reference | 0.87491543% | 0.08786266% |
   | Top-pair share of signed radial sum | 93.072993% | 91.120832% |

   These support the quoted rounded numbers and “about nine tenths.” They are independent floating recomputations, **not interval certificates or evolved trajectories**.

   Direct circular geometry gives \(\mathbf n\cdot\mathbf V_t=\mathbf n\cdot\mathbf V_r\); consequently \(a_f=-D_t=0\) at the rigid-family fold. Its exclusion from Proposition F is correct.

   The reference delay floor supports choosing a sufficiently small neighbourhood. It does not by itself certify every window shorter than \(0.1479\); \(\gamma_0,\tau_0,\rho_0\) and the recent-source separation must satisfy the actual inequalities.

   The small-\(D\) statement is supported **within the corrected theorem’s conditions**: \(D_\pm\to0\) along a passable transverse fold, so such an indicator alone cannot identify an arrival obstruction. This supplies no general prohibition on numerical refinement or separately declared event rules.

   Finally, the proof continues **one receiver**. A complete six-member continuation requires corresponding control for every member; the conditional ring paragraph should say this explicitly.

7. **Scope and grading — largely supported, with a lattice qualification.**

   The derivations retain the sharp transmitter-weighted acceleration law, all actual positive-delay roots, \(c_f=1\), and acceleration-first language. No standard-physics premise or regularization is introduced. The solver-contract remark accurately distinguishes this theorem from finite-width computation.

   The result is an almost-everywhere passage with continuous velocity. It assigns no finite pointwise acceleration at \(T_c\).

   The lattice extension needs narrower wording. The field theorem’s H2 requires every **partner** source to have speed below one on the relevant old emissions, whereas a partner fold requires \(\mathbf n\cdot\mathbf V_j=1\). Thus its unchanged hypotheses cannot justify a lattice partner fold. An old **self-fold** is not excluded by H2. For partner folds, isolate finitely many exceptional folding sources and prove the remaining prescribed field is Lipschitz. Also retain the lattice’s block-sum interpretation explicitly; it is not literally the obstruction class’s absolute partner-row sum.

**Next possible actions — actionable corrections**

1. **○ F-W1 — Reformulate fixed past. Recommended first; this blocks acceptance.** Define the mathematical field on \(U\) using emissions before a fixed cutoff. State recent-root exclusion along a kinematic path class that does not already require solving the equation. Include the incoming velocity bound explicitly. After constructing the fixed point, prove its full Master Equation sum equals that old-emission field. This is an off-path field extension, not permission to discard actual roots.
2. **○ F-END — Repair Lemma F1’s endpoints.** Keep the sign-test points inside the curvature-controlled interval and remove W3’s redundant assumption of the lemma’s root count.
3. **○ F-LAT — Narrow or prove the lattice extension.** Distinguish self-folds from exceptional partner folds, and state the prescribed summation class.
4. **○ F-FIN — Correct the finite-sum sentence.** Assume finitely many regular roots, or rely directly on W2’s bounded Lipschitz sum; finite population alone is insufficient.
5. **○ F-RING — Tighten ring applicability.** Replace the numerical-window implication by an existential sufficiently-small-window statement, and distinguish one receiver’s continuation from complete ring evolution.
6. **○ F-SCOPE — Clarify endpoint and later continuation.** State that the equation holds almost everywhere through the fold, acceleration is undefined there, and later uniqueness holds locally until another boundary.

