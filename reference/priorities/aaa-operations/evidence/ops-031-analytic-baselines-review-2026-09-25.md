# OPS-031 Analytic Baselines review — 2026-09-25

Full-chapter report-only review is complete. One medium-priority scope clarification is proposed for the finite-width root-resolved accounting. Three previously recorded scientific obligations remain open; this receipt does not count them as new defects. Two accepted corrections and one explicitly retained historical claim survive independent mathematical rechecking. No corpus text was changed, and CRW-005 remains closed.

## Scope and source identity

This is the first-cycle priority-4 reservation assigned by the OPS-031 coordinator: [Analytic Baselines](../../../../content/markdown/aaa/validation/simulations/action-energy/analytic-baselines.md), all 241 lines, read in full using `cat`. Its path occurs in the live textbook TOC by exact-path `rg`; selection came from the coordinator's due list rather than an inferred alphabetical order. Coverage is one whole chapter, not certification of the action-energy directory or completion of the annual cycle. The annual coverage deadline remains 2027-09-13; the coordinator owns the next batch and remaining inventory cursor.

The review followed the live AGENTS/startup router, Corpus Review workflow, review skill owner, corpus-reviewer, periodic-document-review and theory-orientation procedures. Task-relevant style, source, mathematical notation and terminology passages were inspected. Nearby dependency reads covered the Master Equation's sharp-versus-finite-width distinction and well-posedness qualifications, and Delay-Dynamics Energy's trajectory reconstruction and root-band accounting. Those are context reads, not additional whole-chapter coverage.

Measured source identity by `shasum -a 256`:

| Source | SHA-256 |
| --- | --- |
| Reviewed chapter | `ad8e4c536735eda5c6b4d9daa5fadd16745691b18db1ebe7c36b465bd1768d55` |
| Delay-Dynamics Energy | `1bceeeea7483b1f6666b579f0a3d4c4ef33f24be6f83c86a5ed0fc4e7a3f5157` |
| Master Equation | `c06a7076562258bd3aa3e7987044535e11c07e16740dd811915531dc32f7a8ac` |
| Historical CRW-005 review and repair receipt | `4f3b9c6e02fd84161196743116b81c02bb9415340a4d40714357d276ef601d5d` |

`git rev-parse HEAD` returned `731f6d8449f20673b19f8e08149c14f9bc32a0e1`; scoped `git --no-optional-locks status --short -- content/markdown/aaa/validation/simulations/action-energy/analytic-baselines.md` returned no chapter changes. The chapter was hashed before assessment and again after writing this receipt. These instruments establish snapshot identity, not correctness. Historical before-repair bytes are identified in the [September 11 receipt](../../aaa-corpus-rewrite/evidence/crw-005-analytic-baselines-review-2026-09-11.md), whose initial chapter digest is `0edbaff421edb98b85d2fb54b960ff3da6e80bbc26232e8832ae2202fd00a75c`.

## Proposed clarification AB-20260925-01

**Medium; demonstrated missing hypothesis, conditional on interpreting the finite-width acceleration as the auxiliary history integral.** Lines 79–117 define finite-width root-resolved virial and power rows and identify the complete acceleration virial with their discrete sum. They describe the labels as source/root hits without explaining how those rows cover the finite-width emission integral. The adjacent [Delay-Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md), lines 122–159, explicitly requires a nonoverlapping band partition with the complement retained. The Master Equation, lines 411 and 2548–2556, also distinguishes a root-resolved functional from the full finite-width integral.

The independent reference is additivity of integration, not agreement between chapters. For disjoint bands $B_k$ inside an integration domain $I$, define the remaining domain $C=I\setminus\bigcup_k B_k$. Then

$$
\int_I F(u)\,du=\sum_k\int_{B_k}F(u)\,du+\int_C F(u)\,du.
$$

An exact root inventory does not by itself set the last integral to zero. As a scalar counterexample, let $I=[-1,1]$, root function $g(u)=u$, one root band $B=[-1/2,1/2]$, and $F(u)=\exp[-g(u)^2/\eta^2]$ for any $\eta>0$. There is one simple root, yet $\int_C F(u)\,du>0$. This is an elementary witness about finite-width integration, not an EOM trajectory or an assertion that a particular physical virial complement is nonzero. It proves that root completeness alone cannot establish the displayed finite-width decomposition.

**Consequence:** a reader implementing the stated finite-width ledger could omit off-band support, or treat sharp root values as the whole mollified acceleration. The source/provenance accounting is useful and should be retained.

**Smallest proposed correction:** immediately before the root-resolved rows, state that at finite width each label denotes an integrated emission band in a declared disjoint partition of the modeled history integral; the displayed sum is exact only when those bands exhaust that integral, otherwise retain the complement contribution. Alternatively, explicitly declare a separately defined root-resolved model and its limited comparison authority. Link the existing band definition in Delay-Dynamics Energy; no new validator or ledger is needed.

**Falsifier:** a local definition or incorporated contract that already identifies these exact rows with an exhaustive partition, including off-band support, would reduce this finding to optional exposition. A sharp-limit theorem alone would not establish an exact identity at nonzero width. Disposition: proposed for the existing corpus-review owner; no edit accepted or implemented by this review. Causal attribution to a particular prior editor or repair is not established.

## Historical repair and no-change rechecks

The historical receipt explicitly retains the stationary-transmitter weight, restricted factor 8, once-only delta Jacobian and conditional potential-virial statement. It is not a prior whole-chapter no-change verdict. The following check uses its explicit retained Jacobian disposition as the required previous no-change sample.

1. **Accepted repair D1, history transport, survives.** Current line 226 defines $Y(T,\theta)=X(T+\theta)$ and prints $\partial_TY-\partial_\theta Y=0$. The independent chain rule gives both partial derivatives equal to $X'(T+\theta)$. For the prescribed smooth history $X(T)=T/2$, both equal $1/2$; their difference vanishes while the former sum does not. The negative history coordinate therefore retrieves the past. This is a kinematic identity, not an EOM solution.
2. **Accepted repair D4, circular member sum, survives.** Current line 33 retains $\mu_{\mathrm{arch}}s_b\sum_i\langle A_{i,b}^{\mathrm{tan}}\rangle$ and the equal-member factor of two. Independently, $\mathbf V_i=s_b\hat{\mathbf t}_i$ implies $\mathbf A_i\cdot\mathbf V_i=s_b A_i^{\mathrm{tan}}$. Two equal nonzero diagnostic contributions add to twice either contribution even when the Cartesian tangents oppose. This verifies normalization, not existence of a constant-speed solution with nonzero tangential acceleration.
3. **Previous retained/no-change claim, delta weight, survives.** Lines 202–213 retain the single-simple-partner-root integral and warn against multiplying by the weight twice. With $g(\Delta)=|X_1(T)-X_2(T-\Delta)|-c_f\Delta$, differentiation gives $g'=\hat{\mathbf r}\cdot\mathbf V_2-c_f=-D_t$. The simple-root substitution rule gives $\int c_f f(\Delta)\delta(g(\Delta))\,d\Delta=c_f f(\Delta_*)/|D_t(\Delta_*)|$. Thus the integral already supplies exactly one weight. The stationary-transmitter specialization has $D_t=c_f$ and weight one. This proof concerns isolated simple roots with positive separation and excludes degenerate roots. It does not validate replacing a finite-width integral by its root values.

Each recheck is falsified by a counterexample within its stated hypotheses or an algebraic failure of the displayed derivative/dot-product calculation. No substantive regression was demonstrated in these two repaired claims. The full current text also retains the single-root/no-self restrictions, full-interval speed qualification, separation/core controls, and narrower closed-form status introduced by the historical repairs.

## Remaining scope and no-change dispositions

The fixed-source radial attraction sign and the restricted symmetric relative-coordinate factor are consistent: delayed distance $d=[r(T)+r(T_t)]/2$ and reflection symmetry give $\ddot r=2(-\kappa\epsilon^2W/d^2)=-8\kappa\epsilon^2W/[r(T)+r(T_t)]^2$. The self-hit exclusion requires the whole emission-to-reception interval, as the current chapter now says. The independent triangle inequality is $\|X(T)-X(T_t)\|\le\int_{T_t}^{T}\|V(u)\|du<c_f(T-T_t)$ under that strict interval-wide bound. These are valid local no-change dispositions.

Historical O1–O3 remain scientific/application obligations rather than newly counted findings. The work reconstruction is trajectory-local; independently constructed total and interaction energies require matched components, references and external-work conventions. The kinematic virial identity requires actual acceleration: for a numerical or prescribed candidate with $R_i=\ddot X_i-A_i$, its endpoint identity gains $\langle\sum_i\mu_{\mathrm{arch}}X_i\cdot R_i\rangle$. A bounded virial diagnostic gives a long-window endpoint bound, not arbitrary finite-window zero. A homogeneous-potential reduction additionally needs a generating potential on the same scale/history domain. Newton tracking, contraction frameworks and stability tools remain methods awaiting their applicable hypotheses, complete roots and solved branches. These points already have explicit historical O1–O3 dispositions; this scan does not silently promote them to closure or open duplicate tasks.

The remaining introductory/toolbox/deliverable prose was read in full. Optional restructuring, additional definitions, replacing the remaining primitive-level words “charges” and “particle,” and softening the imperative moving-boundary phrasing are editorial opportunities, not demonstrated dynamical errors or grounds for a broad rewrite. The absence-of-general-closed-form statement was assessed only as the treatment's bounded status, not independently established by a literature survey. No external source attribution in this chapter required verification; the decisive support here consists of explicit local mathematical identities.

## Limits and completion

Reviewer: Codex, same available model lineage as the ongoing OPS-031 work; no materially different model adoption or superiority claim is made. The independent evidence is the calculus, integration and geometric argument above, not another model's agreement. No solver, empirical computation, new checker, rendered-page inspection, publication or generator was run. Exact wall time and operator burden were not measured.

The only write is this receipt. The scoped whitespace command `git diff --no-index --check -- /dev/null reference/priorities/aaa-operations/evidence/ops-031-analytic-baselines-review-2026-09-25.md` emitted no whitespace diagnostics. Repeated native hashing returned the same chapter digest above. The coordinator should record this one completed priority-4 path, retain the remaining annual inventory, and route AB-20260925-01 for adjudication under the existing owner without reopening CRW-005. This sample does not establish a corpus-wide defect rate or scientific closure.
