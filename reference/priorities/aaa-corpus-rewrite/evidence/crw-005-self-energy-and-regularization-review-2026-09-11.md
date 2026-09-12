# CRW-005 Self-Energy and Regularization Review — 2026-09-11

## Scope and Source Identity

This is the implementation-owner assurance record for CRW-005 item 14, [Self-Energy and Regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/self-energy.md). The assignment authorizes review and immediate safe repair in the chapter and this report only. HQ owns shared status integration. The review follows the [maintained review skill](../../../op/skills/skill-architrino-review.md), [corpus-reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), and [CRW-005 owner](../work-queue.md#crw-005--independent-post-conversion-assurance-review); the explicit implementation assignment supersedes the procedure's default report-only boundary.

Measured source identity: nl -ba read all 41 original chapter lines; shasum -a 256 returned e73bb57100339d156c5dccf985e628a310f44e46f300c3e058bf25285f6860be; git rev-parse HEAD returned 4a8e760bae44dbc868714e579ba60779ae0be9d2. Scoped git diff was empty, git --no-optional-locks status --short contained neither authorized path, and test ! -e confirmed the report destination absent before creation. These instruments establish the inspected snapshot, not exclusive ownership of the checkout.

The conversion ledger's edition-1.0 row is at line 152. The chapter diff at c973402b96d50e45b9bdac0da2bd680e6c26116f and complete preceding source, inspected with git show, establish that the conversion changed the title, integrated the closing explanation into the opening, and changed one self-acceleration label. The preceding source's SHA-256 is 94a740d875ac0b1e30375e24daaa718a5e955a2989fa9e2dc3f54fa99f97dab0 by git show piped to shasum -a 256. The later chapter diff at d8370991f84f57eadb9a7a8d4672f79fcfea07c5 changes the causal-surface term only. The mathematical scope problems identified below are present in the pre-conversion body; neither commit subject nor last-editor identity is used to assign their origin. The present review checks preservation against that source and applies the live edition-1.1 exposition standard.

## Findings and Dispositions

The original line references below refer to the source hash above. Five demonstrated mathematical or claim-boundary defects and one explanatory improvement are identified. Final dispositions and validation are recorded in the closeout below; no physical acceptance follows from a repaired explanation.

| ID | Severity and kind | Original lines | Finding and smallest repair |
| --- | --- | --- | --- |
| SE-1 | High; normalization and inference defect | 3, 7, 11–14, 25 | A single emission surface is conflated with a continuously emitted history, and the signed measure per emission interval is unspecified. Supply the canonical measure $d\mu_j=c_fq_j\,dT_t$, distinguish surface support from the integrated stationary inverse-square representation, and preserve the valid local inverse-distance scalar while excluding an imported field-energy density. |
| SE-2 | High; endpoint-domain defect | 16–17, 31 | The exact sharp-root observation $r=0\Rightarrow T_t=T_r$ is extended to every occurrence of zero separation. Implement strict positive delay and distinguish an omitted point from a controlled neighborhood; a pointwise $H(0)$ value cannot define a singular distribution product or cure a divergent improper integral. |
| SE-3 | High; regularization defect | 19–20, 23–25, 29 | Gaussian smoothing of the distance gap does not regularize inverse-distance amplitudes. Require separation on the actual integration domain or the owner's independent core regulator, retain Gaussian complement and boundary contributions, and distinguish the two regulator limits. |
| SE-4 | Medium; work-energy domain defect | 20, 29–30 | A stationary transmitter alone does not establish $\Delta E_k=-\Delta U$. Declare the quadratic kinetic proxy and units, prove or test gradient matching for the same kernel, and require a time-independent scalar and fixed branch/boundary convention. Retain the time-dependent chain-rule term and distinguish trajectory reconstruction from independent conservation. |
| SE-5 | Medium; undefined energy and claim-level defect | 1–3, 35–41 | The chapter never specifies what its native self-energy would mean and treats an internal “action budget” and polarity cancellation as energy diagnostics without an accepted map. Define same-identity self-work separately from candidate self-history energy; retain sign-resolved diagnostics while removing the inference to stored energy, physical mass, or stability. |
| SE-6 | Low; explanatory improvement | 3, 14, 20, 23, 29–41 | Symbols and branch floors are insufficiently explained locally. Define event roles, width units, transmitter Jacobian and weight; give the finite-root bound and the interval-speed argument. These sharpen an already conditional per-root statement rather than refute it. |

## Independent Mathematical References

### Emission Measure and Stationary History

The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#autonomous-emission-labeled-wake-transport) and [Background and Simple Action](../../../../content/markdown/aaa/validation/simulations/action-energy/background-and-simple-action.md#continuous-emission-and-acceleration) use $d\mu_j=c_fq_j\,dT_t$. Integrating its density over one sphere gives $d\mu_j$, whereas integrating all stationary emissions over the retained interval gives $q_j/(4\pi r^2)$ for $0<r<c_fh$. This follows from $\int\delta(r-c_f\Delta)\,d\Delta=1/c_f$, with the root strictly inside the window. Thus single-surface support does not establish that the history has no near-source inverse-square representation.

Claim grade: derived from the emission convention and change of variables. Falsifier: a different result for this single interior root with the same measure and dimensions. The source-dependent density is not a material energy density. [Energy](../../../../content/markdown/aaa/dynamics/energy.md#net-causal-wake-potential) separately gives a local scalar on regular roots; its existence does not license integrating its gradient squared as substrate energy.

### Endpoint and Gaussian Counterexample

Use normalized wake-speed units $c_f=1$, prescribed self-history $\mathbf X_i(T)=(T/2,0,0)$, and reception time $T_r=0$. For positive age $\Delta=-T_t$, $r=\Delta/2$ and $g=r-\Delta=-\Delta/2$. There is no strict-delay sharp self-root. Nevertheless, the Gaussian-only inverse-square self integral has positive scalar magnitude

$$
\int_0^h \frac{4}{\Delta^2}\delta_\eta(-\Delta/2)\,d\Delta
$$

with $\delta_\eta(0)=1/(\sqrt{2\pi}\eta)>0$. Its integrand is asymptotic to $4/(\sqrt{2\pi}\eta\Delta^2)$, so the improper integral diverges. Setting its endpoint value to zero changes no integral. This prescribed history is a mathematical diagnostic, not a claimed coupled EOM solution.

The [dual-mollified regulator](../../../../content/markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) replaces the vector amplitude by $\mathbf r/(r^2+\epsilon_c^2)^{3/2}$. At fixed $\epsilon_c>0$ this is $O(\Delta)$ in the same example. More generally, differentiating $r/(r^2+\epsilon_c^2)^{3/2}$ gives its maximum $2/(3\sqrt3\,\epsilon_c^2)$ at $r=\epsilon_c/\sqrt2$. Together with the Gaussian height bound and finite memory, this proves a finite auxiliary acceleration bound. It supplies no bound uniform as either regulator vanishes and no physical coincidence rule.

Claim grade: derived. Falsifier: convergence of the stated positive improper integral without a changed domain or radial kernel, or violation of the displayed core-kernel maximum at fixed positive core scale. A Gaussian root-band approximation must also account for the nonzero complement; sharp-root separation alone does not bound all finite-width sampled separations.

### Regular Roots and Work

For a continuously differentiable history, the [self-hit interval-speed lemma](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-regime) follows from chord length being no larger than path length. If the speed never exceeds $c_f$, equality requires straight field-speed motion, whose self-root is not simple. Exceeding $c_f$ is necessary somewhere in the interval for a simple self-root, but the prescribed straight history $\mathbf X(T)=2T\hat{\mathbf e}$, $c_f=1$, has $r=2\Delta$ and no positive-delay self-root. Here $\hat{\mathbf e}$ is a fixed unit vector. Current speed alone is not the criterion.

For at most $M_i$ retained self-roots with $r\ge d>0$ and $|D_t|\ge\nu_t>0$, the triangle inequality bounds the canonical self-acceleration by $M_i\kappa q_i^2c_f/(\nu_t d^2)$. Bounded receiver speed then bounds finite-window absolute self-work in any fixed quadratic conversion chart. Each ordered root is counted once; no reciprocal-pair halving is applied to a receiver's self-acceleration or delivered work.

The energy reference is the chain rule, not a fitted energy residual. For $K_\mu=\mu_{\mathrm{arch}}\|\mathbf V\|^2/2$ and $\mu_{\mathrm{arch}}\mathbf A=-\nabla U$, one obtains $d(K_\mu+U)/dT=\partial_TU$. A time-dependent additive offset $U\mapsto U+aT$ preserves every gradient while adding $a(T_b-T_a)$ to the endpoint difference. The endpoint-only identity requires the explicit-time integral to vanish; a time-independent scalar with fixed reference zero is sufficient, but stationary transmitter position alone is not. A finite emission history or moving history cut can also break stationarity. The [work-integral route](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md#work-integral-route) produces a constant sum by construction; independent conservation still requires an action or wake-balance derivation with the same history and boundaries.

Claim grade: derived on the stated domains. Falsifiers: a regular self-root on an everywhere strictly sub-field-speed interval, a root sum exceeding the stated uniform bound, or a failure of the chain-rule identity with its exact hypotheses satisfied. These references do not establish root completeness for a numerical history, an energy functional, or EOM stability.

### Sign Cancellation and Energy Meaning

For signed contributions $a$ and $-a$, the net is zero while the sum of absolute magnitudes is $2|a|$. This elementary counterexample supports keeping separate signed and magnitude diagnostics; it establishes no energy content. The [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md#core-functional-definitions) is explicitly a sign-blind, coupling-normalized inverse-area history statistic. Its name supplies no units of physical action or energy. A polarity sector also does not determine a work sign: receiver polarity and the scalar product with velocity enter the power.

Claim grade: derived for the cancellation example and dimensional distinction; guessed for the existence of an assembly with large independently defined internal energy and small far-wake response. A disagreement with the arithmetic would refute the cancellation example. A magnitude-to-energy inference would fail if two admitted histories had the same magnitude statistic but different independently constructed energies; the current scalar definition supplies no such energy map.

## Sources and Review Limits

The live foundation, dynamics, style, terminology, and local regulator owners were read at the scope needed for these claims. Where compact guide wording suggests that mollification automatically makes all quantities regular, the explicit Master Equation and Energy domains control the narrower statement. The local [Well-posedness and Regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) supplies continuation and refinement requirements; its summary language is not a substitute for the independent core prescription. No guide or neighboring chapter is edited by this assignment.

The classical comparison was checked against Feynman, Leighton, and Sands, *The Feynman Lectures on Physics*, volume II, chapter 8, especially §8-6 and equation (8.35), in the [Caltech online edition](https://www.feynmanlectures.caltech.edu/II_08.html). It supports only the classical field-energy comparison. The chapter's cutoff integral is shown explicitly; no classical law is used to derive the substrate response.

A read-only auxiliary reviewer, **Self-energy mathematical audit**, stable tool ID /root/self_energy_math_audit, inspected the same subject while the implementation owner developed the repair. Agent agreement is not independent evidence; the explicit emission calculation, endpoint counterexample, core maximum, root bound, and chain rule are the separately checkable mathematical references. No solver run, empirical test, or independent certification of a physical trajectory is claimed.

## Open Scientific Obligations

| ID | Status and obligation | Evidence required to reopen or resolve |
| --- | --- | --- |
| O-1 | ○ Open — coincident self birth and singular continuation | A finite event rule preserving identity, strict causality, admitted root counts, and the same work/action/boundary accounts. Regulator-dependent post-event continuation or missing accounts rejects the proposed rule. |
| O-2 | ○ Open — regulator removal and finite self-energy | An independently defined self-history energy, a common retained-history domain, controlled $\eta$ and $\epsilon_c$ limits, uniform integrability, and explicit order of limits. Divergent or regulator/order-dependent values prevent a finite intrinsic claim. |
| O-3 | ○ Open — complete history and population limits | Certified roots and complement bounds, controlled endpoint and old-history contributions, and summable population tails. A missed root, nonvanishing omitted tail, or lost separation/Jacobian floor invalidates the corresponding completeness or uniform-bound claim. |
| O-4 | ○ Open — conservation, lower bounds, and stability | An independently derived energy and compatible acceleration on the same regularization and boundary convention, an interaction lower bound for no-runaway claims, and separate dynamical stability evidence. A compensating work integral or bounded auxiliary kernel alone cannot resolve this. |
| O-5 | ○ Open — physical energy, renormalized quantities, and mass recovery | A declared subtraction/reference prescription where relevant, regulator-independent predictions, and an assembly response map. A source-polarity cancellation or adjustable energy zero is not that map; failure across independently admitted branches rejects the proposed identification. |

## Owner-Authorized Closeout

**Disposition: ✓ Done at the bounded review, repair, and finding-disposition level for CRW-005 item 14.** Five demonstrated defects, SE-1 through SE-5, and one explanatory improvement, SE-6, are implemented. The severity inventory is three high, two medium, and one low. No demonstrated finding remains awaiting local implementation. O-1 through O-5 remain open scientific obligations, not unresolved wording repairs. The complete chapter was reread after editing; this is implementation-owner self-review supported by explicit mathematical references, not an independent certification of the theory.

The only files written by this owner are the [canonical chapter](../../../../content/markdown/aaa/validation/simulations/action-energy/self-energy.md) and this evidence report. No shared board, priority, work queue, work log, other chapter, generated artifact, or Git publication state was changed by this owner. HQ retains responsibility for shared-record integration.

Measured final chapter identity: shasum -a 256 returned bd669ef58444026ba518fcbfd0c77513ae1624c2f9f2588c97d097380a5e6592, and wc -l returned 127 lines. The final full read and repeated digest checks agree on this chapter identity. The auxiliary reviewer confirmed both final narrow corrections at that same hash: retained work notation and the sufficient, rather than necessary, role of time independence.

| Finding | Final chapter lines | Disposition and reopening condition |
| --- | --- | --- |
| SE-1 | 9–37 | ✓ Repaired — classical comparison is sourced, continuous emission is normalized, and the stationary-history counterexample prevents confusing one surface with the full history. Reopen if the emission convention changes or the interior-root integral disagrees with the stated measure. |
| SE-2 | 39–56 | ✓ Repaired — strict sharp delay and the uncontrolled near-endpoint domain are distinguished. Reopen only against a specified event rule or an actual counterexample to the sharp positive-delay implication. |
| SE-3 | 45–68, 90, 115 | ✓ Repaired — the separate core, finite-width complement, normalization, and limit order are explicit. Reopen on a failed core bound, an omitted Gaussian contribution, or an attempted regulator-independent claim without a uniform convergence argument. |
| SE-4 | 92–115 | ✓ Repaired — the kinetic proxy, retained self-work, gradient matching, explicit-time integral, and independent conservation boundary are stated. Reopen if the proposed potential fails matching or its time/history/boundary contribution is omitted. |
| SE-5 | 3–5, 101, 113–123 | ✓ Repaired — self-energy is a construction target, while self-work and the inverse-area statistic retain their own definitions. Reopen if a physical energy, mass, or shielding claim relies only on polarity cancellation or that statistic. |
| SE-6 | 17–86, 92–111 | ✓ Implemented — event roles, units, finite-root bound, and interval-speed proof are supplied. The original speed-necessity claim is retained with its continuously differentiable domain; it was not a demonstrated error. |

### Validation Receipt

| Instrument and scope | Result and limitation |
| --- | --- |
| git diff --check over the shared tracked diff | Pass, exit 0. The additional git diff --no-index --check against /dev/null emitted no whitespace diagnostic for the new report; its exit 1 is the no-index difference status. These checks are not mathematical or repository-health evidence. |
| node scripts/validate-content.mjs --check --strict | First run: exit 1, eight errors, zero warnings. Later run after observed shared-tree changes: exit 1, six errors, zero warnings across 199 corpus Markdown files and 1,637 audited repository Markdown files. Every reported error is outside this assignment's two files; exact remaining paths follow. This is a failed repository-wide check, not an overall pass or a causal attribution to prior work. |
| Focused Node math/link checker, after synthetic controls | Chapter: 105 KaTeX expressions including seven displays, 21 local links including 16 anchor links, one external link; no focused errors. Final report including this closeout: 44 expressions including one display, 13 local links including eight anchor links, one external link; no focused errors. This is syntax and target-existence evidence, not visual-browser or mathematical certification. |
| node scripts/validate-equation-mapping-links.mjs | Pass: 23 registered equation links resolve from canonical sources. Its global curated-link population is distinct from the seven chapter displays checked by the focused parser. |
| node scripts/build-equation-mapping-corpus.mjs --check | First run reported stale content/generated/equation-mapping/corpus-equations.json. Later check passed with 4,684 equations and zero errors after external shared-tree changes; this owner ran no write command. The deferred remedy for the observed stale snapshot was node scripts/build-equation-mapping-corpus.mjs --write, reserved to authorized regeneration/publication. It is recorded, not executed. |
| Normalized mathematical witness evaluations, c_f=1 | Core maximum 0.38490017945975047 at unit core; finite-difference derivative residual 5.828670879282072e-11; Gaussian endpoint asymptotic coefficient 4; simple prescribed self-root with distance and delay 1 and transmitter Jacobian -1; chain-rule kinetic change 0.5 with explicit-time correction 3, rejecting the endpoint-only identity in that example. These are arithmetic/transcription checks against the displayed proofs, not EOM simulations. |

The six remaining strict-validation errors identify the following referencing locations and missing targets. They are literal evidence paths, not links to absent files:

| Referencing file and line under reference/priorities/ | Missing target under reference/priorities/ |
| --- | --- |
| braid-program/analysis/manuscript-source-coverage.md:367 | braid-program/evidence/2026-08-28-f5-unattended-certification-session.md |
| braid-program/evidence/2026-08-28-f5-observation-blocker-successor-prompt.md:17 | braid-program/evidence/2026-08-28-f5-unattended-certification-session.md |
| development-process-review/analysis/f5-current-handoff.md:3 | development-process-review/evidence/f5-current-handoff/admission.json |
| development-process-review/analysis/full-root-cover-current-migration.md:7 | development-process-review/evidence/full-root-cover-migration/run-f6c-cached-root-cover-full.mjs.20c8d44ee55f.source |
| development-process-review/analysis/root-cover-current-migration.md:11 | development-process-review/evidence/root-cover-migration/prepare-current-plans.mjs |
| development-process-review/work-log.md:115 | development-process-review/evidence/variable-cell-migration/validation-runs.json |

The first strict run also reported development-process-review/analysis/f5-remaining-callers.md:46 and :56 pointing to missing evidence/f5-remaining-callers/current-api-independent-review.md and current-build-admission.json within that directory. The later run no longer reports those two references. Their disappearance is a measured change in validator output; this owner did not investigate or assign its cause.

The bounded completion above does not establish finite physical self-energy, a renormalized intrinsic quantity, regulator independence, complete infinite history, conservation, no-runaway behavior, stability, physical mass/energy recovery, theory closure, solver certification, or empirical acceptance. HQ can integrate this disposition while keeping the separate global validation failures visible.

### Dependency Snapshot

The following SHA-256 values were measured with shasum -a 256 at closeout. They identify the live dependency snapshot, not a claim that every dependency was unchanged throughout the review.

| Owner | SHA-256 |
| --- | --- |
| dynamics/master-equation.md | bb7357868a4f900aa566b8a43107d111dcd435cab677361f9bba3dceaadb384b |
| dynamics/energy.md | 0916f6bf30d4944b41b0c02b55dc1403740ef46a4f9263a32d2b15bcf82c59b2 |
| dynamics/causal-action-functional.md | 7e585c26bd6702dcb01efbf329431ae17295d3293d19d373816c7c28657d62dd |
| validation/simulations/action-energy/background-and-simple-action.md | 765331fc396e7fc88ce3c4ee7763a8c0fc7de6e08435648014d88510cfdc6542 |
| validation/simulations/action-energy/delay-dynamics-energy.md | 1bceeeea7483b1f6666b579f0a3d4c4ef33f24be6f83c86a5ed0fc4e7a3f5157 |
| validation/simulations/action-energy/well-posedness-and-regularization.md | 03a51b12941bfb33a55ce1d87d2dd4cfb9f2d95c09388158ad2c8bf9182a8004 |

### Known-Case Check Before Target Validation

Before running the session-built focused checker on either authorized file, its synthetic known case passed: exactly two math expressions, including one display, and two Markdown links were extracted; fenced-code and inline-code decoys were ignored; one deliberately missing link was reported; a valid heading anchor was accepted; an invalid KaTeX command was rejected. The Node checker uses the existing display parser from scripts/build-equation-mapping-corpus.mjs, the inline parser from src/runtime/InlineMathRuntime.js, and the vendored KaTeX runtime loaded by index.html, with throwOnError enabled and strict errors. It checks local file existence and literal heading slugs, not browser navigation or external URL availability. This pass was recorded before its target invocation.

During validation, seven equation-viewer links appeared in the live chapter after the implementation patch; this owner ran no generator write command and preserves those additions. The initial focused checker treated those dynamic HTML routes as Markdown headings and reported seven false positives. That output is an instrument-scope failure, not a broken-link finding. Before rerunning the targets, the extended checker passed a synthetic case accepting one known equation-registry ID and rejecting one unknown ID, while retaining the earlier controls. It now checks those routes against the generated registry's semantic identifiers.

Before evaluating the chapter's mathematical witnesses numerically, the centered finite-difference instrument passed its known case: the derivative of the cubic at 2 was 12 within an absolute tolerance of 1e-8, using step 1e-5. The analytic proofs above remain the independent references; the numerical evaluations check transcription and arithmetic only.
