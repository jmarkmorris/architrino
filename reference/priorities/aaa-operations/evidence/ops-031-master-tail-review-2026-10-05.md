# OPS-031 — Master Equation tail review, October 5

## Disposition and scope

Report-only review of [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), all contiguous source lines 4647–5882, from “Effective Continuum Limits” through the reference list. Reading used `sed` in overlapping bounded ranges against a frozen complete-file copy in `.tmp/ops031-oct05-tail/master-equation.snapshot.md`; `wc -l` measured 5882 source lines, and `shasum -a 256` measured source/snapshot SHA-256 `8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f`. This receipt covers that tail only. The coordinator owns the preceding spiral block, chapter-coverage aggregation, queue routing and shared records.

Two proposed corrections are recorded below, neither accepted or applied: the explicit candidate wake-charge formula fails its displayed residual balance, and the analytic summary presents a continuum target as an available solution. Most of the tail correctly preserves conditional action, conservation and effective-recovery boundaries. The October 4 circular-root referrals remain unaccepted and are outside this tail's adjudication scope. No source, generator, solver, publication or shared control record was changed.

Preparation used live AGENTS, startup router, architrino-review skill/owner, corpus-reviewer, periodic-document-review, theory orientation, operator explanation standard, About Architrino and task-relevant style/terminology passages. Bounded dependency reads inspected Architrino's transmitter-side weighting, Absolute Timespace, Energy's kinetic reconstruction and conservation limits, and Causal Action Functional's distinction between causal statistics and independent charges. These reads establish context, not additional whole-chapter coverage. The October 4 work log supplies current model-calibration provenance; no new model adoption or superiority claim is made. A quick memory registry lookup supplied prior-review routing only; live files supplied task state and formulas.

## ME-T1 — The displayed candidate wake charge does not satisfy its claimed action-residual balance

**Severity:** High mathematical correction within a candidate scaffold; it does not invalidate the Master Equation. **Grade:** Derived counterexample to the explicit functional/balance pairing. **Location:** lines 4839–4932, especially the functional at 4850–4855 and the residual balance below it. The labels “proposed” and “candidate” correctly prevent promotion to canonical conservation, but the displayed off-shell residual identity still requires mathematical compatibility with this explicit functional.

**Exact before:**

$$
E_{\text{wake}}(T)
=
-\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_t
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}(T_1,T_t).
$$

The prose then says: “For proof and simulation, the same statement can be written as a residual balance,” followed by

$$
\frac{d}{dT}(K_\mu+E_{\text{wake}}^{(\eta)})
=\sum_i\mu_{\text{arch}}\mathbf V_i\cdot\mathbf R_{A,i}^{(\eta)}+\mathcal B_E^{(\eta)},
\qquad
\mathbf R_{A,i}^{(\eta)}=\mathbf A_i-\mathbf A_{i,\mathrm{act}}^{(\eta)}.
$$

**Independent reference:** Ordinary differentiation of the displayed composed two-time kernel, simple-root delta collapse, and the complete ordered-pair variation of the static scalar scaffold. No EOM solver, fitted wake account, implementation oracle or external physics premise is used.

Let $C=\mu_{\mathrm{arch}}\kappa\sigma_{12}|q_1q_2|\ne0$, set $c_f=1$, and take a pair with no self roots. On a positive-delay chart with vanishing upper-time kernel boundary, integration of the displayed derivative gives

$$
E_{\mathrm{wake}}(T)=\frac12\sum_{i,j}\int_{-\infty}^T\mathcal K_{ij}(T,s)\,ds.
$$

Thus this functional reduces to half the ordered reception-time interaction density; it does not retain an independent future-reception contribution. The reduction is valid for the sharp delta distribution and for compact surface mollifiers on the stated separated chart.

First check the known static case: $\mathbf X_1=R\mathbf e_x$, $\mathbf X_2=0$, $R>0$. Both ordered causal roots have delay $R$ and unit transmitter Jacobian. Each ordered interaction contributes $C/R$, hence the displayed functional is $C/R$. Its static sign and pair normalization pass. Static normalization alone does not establish a dynamical charge.

Now perturb only worldline 1:

$$
\mathbf X_1(T)=[R+\epsilon y(T)]\mathbf e_x,
\qquad
\mathbf X_2(T)=0,
\qquad
y(T)=(T-R)\chi(T-R),
$$

where $\chi$ is a smooth compact cutoff equal to one near zero and supported in $|T-R|<R/4$. At the cut $T=R$, $y=0$, $y'=1$, $y''=0$, while the neighborhood of the incoming emission time $s=0$ remains unperturbed. Choose $|\epsilon|$ small enough that all velocities remain strictly below one, separations stay positive and both partner roots stay transversal; no self roots or excluded-coincidence endpoint contributes.

For order $(1,2)$, the receiver moves but the transmitter remains static, so the collapsed density near the cut is $C/[R+\epsilon y(T)]$. For order $(2,1)$, the incoming transmitter history near $s=0$ remains static, so the density is $C/R$. Therefore

$$
\left.\frac{dE_{\mathrm{wake}}}{dT}\right|_{T=R}
=-\frac{C\epsilon}{2R^2}+O(\epsilon^2).
$$

At the unperturbed static pair, the full scalar-action Euler derivative has receiver and transmitter appearances. Each contributes half of the same radial scale term; their derivative-of-delta terms integrate to zero because the static separation and direction are constant in the integrated time. Consequently

$$
\mathbf A_{1,\mathrm{act}}^{(0)}=\frac{C}{\mu_{\mathrm{arch}}R^2}\mathbf e_x,
\qquad
\mathbf A_{2,\mathrm{act}}^{(0)}=-\frac{C}{\mu_{\mathrm{arch}}R^2}\mathbf e_x.
$$

The power required by the displayed residual identity is therefore

$$
-\sum_i\mu_{\mathrm{arch}}\mathbf V_i\cdot\mathbf A_{i,\mathrm{act}}
=-\frac{C\epsilon}{R^2}+O(\epsilon^2),
$$

which disagrees with the derivative of the proposed wake functional by $C\epsilon/(2R^2)+O(\epsilon^2)$. Actual acceleration cancels when the residual balance is rearranged using $dK_\mu/dT=\sum\mu\mathbf V\cdot\mathbf A$; the discrepancy is therefore an off-shell identity failure, not an assertion that the prescribed perturbation solves either dynamical model. Taking a compact mollifier sufficiently narrow compared with $R$ preserves the separated roots and avoids coincidence/history-window flux; its sharp-limit discrepancy remains nonzero. There is no fold or singular-chart loophole in this example.

**Smallest proposed after:** Retain the displayed functional only as an unverified candidate interaction statistic, explicitly state that it does not satisfy the general action-residual balance above, and use a distinct symbol $E_{\mathrm{Noether}}^{(\eta)}$ for the independently derived time-translation boundary charge in any conditional conservation/residual identity. Replace “the same statement can be written as a residual balance” with: “Once the complete action variation supplies a time-translation boundary charge $E_{\mathrm{Noether}}^{(\eta)}$, that charge must satisfy the following residual balance; the explicit candidate integral above has not supplied this charge.” Replace the earlier conservation implication's $E_{\mathrm{wake}}$ by that derived charge, and preserve the limitation that no charge is established for the canonical Master Equation. A complete localized-time variation may later supply the correct nonlocal formula; this review does not invent one or add a repair term by fitting power.

**Falsifier/reopening condition:** Exhibit a complete time-translation variation of this exact scalar action, including both ordered appearances and all cut terms, that makes the displayed explicit integral pass the compact perturbation above without adding an undeclared history flux. If $\partial_{T_1}$ was intended to exclude the time dependence through worldlines, define that different derivative explicitly and derive its charge; the displayed kernel as a two-time function currently gives the ordinary partial derivative used here. This finding does not prove that no causal wake-state action exists, that the canonical acceleration is inconsistent, or that an actual solution runs away.

## ME-T2 — Analytic summary promotes a continuum target to an available solution

**Severity:** Medium claim-level repair. **Grade:** Measured textual inconsistency by bounded `sed` reading of lines 4647–4706, with a derived distinction between a specified equation and an unsupplied recovery target.

**Exact before:** “**Idealized / symmetric cases:** Yes, in several important classes:” followed by “continuum/wave limits of the Noether sea.”

The preceding continuum section says “The targets are to: derive an effective wave equation” and requires explicitly derived continuum variables. The preceding foothold list likewise says to “coarse-grain the master equation around a homogeneous Noether sea and extract the linear response and dispersion relation.” The summary does not provide that missing equation or derivation; it answers the analytic-solution question affirmatively at a stronger grade than its own body.

**Independent reference:** The definitions and obligations stated in those live neighboring paragraphs. A plane wave is a solution of a specified continuum equation, not a substitute for deriving that equation from the delayed microscopic law. The conclusion does not depend on assuming standard Maxwell or acoustic laws at substrate level.

**Smallest proposed after:** Replace the affirmative introductory clause by “**Idealized / symmetric cases:** Explicit geometric reductions and diagnostic checks are available in several important classes:” and remove the continuum item from that available-results list; append “**Effective continuum target:** derive the Noether sea response equation and its wave solutions from a declared coarse-graining limit.” Preserve the circular and maximum-curvature items at their existing diagnostic/algebraic grades rather than implying retained EOM orbits.

**Falsifier:** A supplied, independently checked continuum reduction and response equation within this chapter's accepted scope would permit an affirmative wave-solution summary. Merely naming plane waves, Maxwell-like behavior or an emergent propagation speed does not supply it.

## Valid no-change dispositions and explicit limits

- **Derived, no change:** The kernel dimensions are correct: the inverse-square acceleration coupling has units $L^3/T^2$ after charge bookkeeping, hence $\mu\kappa\delta(\tilde g)/r$ has energy/time units. Static ordered-pair normalization also gives $C/R$ as shown above. Those checks do not rescue the dynamical charge formula.
- **Derived, no change:** Differentiating the causal constraint yields $dT_t/dT_r=D_r/D_t$, while delta collapse supplies $1/|J|=c_f/|D_t|$ once. The body correctly separates playback from acceleration weighting.
- **Derived, no change:** Receiver variation gives $\delta r=\hat{\mathbf r}\cdot\delta\mathbf X_i$ and $\delta\tilde g=-\delta r/c_f$. The displayed derivative-of-delta integration by parts is valid on a transversal chart with its declared endpoint term; the scalar scaffold correctly remains unpromoted. Full transmitter variation, self sector and normalization remain separate obligations.
- **Derived, no change:** For a radial receiver variation, $\delta\hat{\mathbf r}=0$ and $\delta J=0$. Thus adding $a(r,J)\delta(g)$ cannot cancel the radial derivative-of-delta coefficient for all receiver variations without $a=-1/r$, which also cancels/changes the scale term. The finite delta-jet no-go is valid for the displayed coefficient class: highest-order derivative cancellation forces the top coefficient to zero, descending to the same scalar obstruction. This is a local, same-support class result, not a universal action no-go.
- **Derived, no change:** $D=\partial_r-c_f^{-1}\partial_g$ preserves $u=g+r/c_f$. Differentiating the characteristic-tail integral's upper limit gives $DK_{\mathrm{eff}}=-\delta_\eta(g)/r^2$ wherever the integral is defined and finite. The chapter correctly labels this as a receiver-gradient identity and does not promote it to an action principle. Singular characteristic domains require the stated controlled-history interpretation.
- **Derived, no change:** The trajectory reconstructions for work, momentum and angular momentum are constant by chain rule, using $\mathbf V\times\mathbf V=0$ for angular momentum. These identities establish bookkeeping only. The body mostly makes that independence boundary explicit; they do not certify Noether charges.
- **Derived, no change:** The no-runaway target follows from an independently conserved $E=K+E_{\mathrm{wake}}$ and a uniform lower bound on the wake charge. The chapter correctly confines it to where solutions exist and does not infer it from a finite local acceleration alone.
- **Derived with declared scope, no change:** Euclidean isometries and common time shifts preserve delays, transmitter weights and radial acceleration directions when complete histories and branch conventions transform together. The effective electromagnetic gauge shift is a total derivative by the chain rule and is expressly comparison/recovery material. No standard-physics law was imported as a substrate premise.

The symplectic residual is valid when $(Q^a,\Pi_a)$ are canonical reduced coordinates and the matrix is constant. If the intended pulled-back form is coordinate-dependent, the general test is $M^T\Omega(\mathcal P(z))M-\Omega(z)$, and coordinate volume need not have determinant one. Because the passage uses canonical-pair notation and says “canonical return map,” this review records a scope clarification opportunity rather than an additional demonstrated error. Its falsifier is a declared non-Darboux reduced chart used with the constant-matrix diagnostic.

The terminal common-center inter-layer stationarity specialization was read, but its underlying chart definitions and retained derivation were not reconstructed in this bounded tail pass; no independent certification of that specialization is claimed. The constrained multiplier equations were checked as formal variations of the displayed scaffold with no root-velocity dependence, not as a completed equivalence proof or physical law. The generic Noether history-balance target remains conditional on a complete action and endpoint derivation. The comparison citations were not externally reverified; no bibliographic correctness or source-inspection claim is made.

## Completion evidence

This pass completed the assigned tail's prose/equation reading and the analytical checks above. The source snapshot is a local scratch witness; the durable mathematical argument is contained in this receipt. Review wall time, resource use and operator burden were not measured. No model superiority, numerical correctness, full-chapter independent theorem certification or corpus-wide correctness is claimed. The coordinator must independently adjudicate ME-T1 and ME-T2 before routing any accepted repair. Shared records and current due dates remain its responsibility.

Final `shasum -a 256` measured identical live-source and snapshot hashes as recorded above. `git diff --no-index --check /dev/null` on this new receipt emitted no whitespace diagnostic; its exit status 1 denotes the expected nonempty new-file difference. No Markdown renderer or link-fragment checker was run.
