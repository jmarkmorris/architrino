# Independent adjudication of the allocation obstruction

## Disposition and scope

The finite-sharing obstruction in [the subject, Sections 2.5–2.9](analysis-independent-causal-wake-state.md#25-receiver-dependent-sharing-with-a-uniformly-controlled-observation) is **accepted as a derived conditional theorem**. One finite nonnegative budget cannot fund arbitrarily many unchanged nonzero channel observations if each observation has a common bound that tends to zero with its allocated share. Receiver-dependent fractions, overlapping fractional patches, and nonlocal sharing do not evade that proof. The observation bound and arbitrary finite compatibility are additional architecture assumptions; the canonical acceleration row does not establish them.

The playback-zero throughput obstruction, retained-boundary partition identity, and complete-past accumulation result are also **accepted at their stated conditional scope**, with the precise assumptions reconstructed below. They select no account values, conservation law, singular continuation, or admitted population evolution. Nondepleting acceleration observation and independently derived separate account channels remain unresolved alternatives. This adjudication completes current effort 3's bounded review object; it does not close MEC-002, MEC-003, or MEC-004.

The reviewed subject was frozen read-only before the reconstruction. This document is the exclusive durable output. The queue, priorities, brainstorming, work log, and both shared synthesis files belong to the coordinator. No population class, moment constraint, or history norm from efforts 1–2 is changed or used as a hidden hypothesis here.

## 1. Independent reference and canonical input

All calculations use $c_f=1$. Let $T$ be reception time, $s$ emission time, $\mathbf X_r(T)$ the receiver position, and $\mathbf X_t(s)$ the retained transmitter position. Put $r=\|\mathbf X_r(T)-\mathbf X_t(s)\|>0$ and let $\mathbf n$ be the corresponding unit direction. The [canonical simple-root law](../../../../content/markdown/aaa/dynamics/master-equation.md) uses

$$
F(T,s)=r-(T-s)=0,
\qquad
D_t=1-\mathbf n\cdot\mathbf V_t(s)\ne0,
\qquad
D_r=1-\mathbf n\cdot\mathbf V_r(T).
$$

Differentiating the root equation gives $F_s=D_t$, $F_T=-D_r$, and hence

$$
s'(T)=\frac{D_r}{D_t},
\qquad
\mathbf A(T)=\frac{\kappa\sigma_{tr}|q_tq_r|}{r^2|D_t|}\mathbf n.
$$

Thus receiver velocity changes playback, not the instantaneous acceleration weight. This direct differentiation and substitution into the canonical row are the independent mathematical reference for this review. The allocation subject and the implementation outputs are not used as their own oracle. The earlier shell-account candidate is a frozen comparison instrument, not a selected physical account.

Reuse the subject's stationary control: one source at the origin and stationary receivers at distinct points $R\boldsymbol\omega_k$, with fixed $R>0$ and identical nonzero charge magnitudes. For an emission interval $I$ of length $L>0$, the receiver interval is $B=I+R$. Direct substitution yields

$$
s(T)=T-R,\qquad D_t=D_r=1,
\qquad A_* = \frac{|\kappa q_tq_r|}{R^2}>0.
$$

The vector observation measure is $\boldsymbol\eta_k(E)=\int_E\mathbf A_k(T)\,dT$ for measurable $E\subseteq B$. Its total variation uses the Euclidean vector norm and equals

$$
\|\boldsymbol\eta_k\|_{\mathrm{TV},B}=\int_B\|\mathbf A_k(T)\|\,dT=LA_*=:a_I>0.
$$

Total variation is taken separately on each ordered source-to-receiver channel. It is not the norm of the sum over receivers, and it is not an energy or momentum cost. No opposite-direction cancellation changes $a_I$.

These are supplied-history channel tests. The stationary receiver paths are not asserted to solve the interacting EOM. Arbitrarily many distinct directions are geometrically available for these tests, but their compatibility with any separately constrained physical population class or common EOM future is an extra premise. In particular, no bounded-density or moment-constrained population is silently replaced by a densely packed sphere.

**Grade and falsifier.** The identities are derived on positive-range simple roots. Direct root differentiation or substitution contradicting them within that chart would refute the reference. A physical compatibility theorem excluding arbitrarily large such receiver sets would narrow the application of the no-go, not overturn its finite-budget arithmetic.

## 2. Finite aggregate capacity: reconstructed proof

Let $\Lambda_I=I\times S^2$ and let $\mu_I$ be a nonnegative measure of finite total $C_I$. For every finite compatible receiver set $F$, assign nonnegative measures $\nu_k^F$ with

$$
\sum_{k\in F}\nu_k^F\leq\mu_I,
\qquad d_k^F=\nu_k^F(\Lambda_I),
\qquad\sum_{k\in F}d_k^F\leq C_I.
$$

Supports and fractional weights may depend on all receivers and may be nonlocal. The fixed total budget must include any replenishment claimed for this control; it cannot acquire an unbounded receiver-count dependence. Only the final scalar inequality is needed in the proof, so even more general allocation representations with the same aggregate bound are covered.

Assume the **whole canonical observation being tested** is the part declared funded by that allocation, and that one nonnegative nondecreasing function $\Omega$ obeys

$$
\|\boldsymbol\eta_k^F\|_{\mathrm{TV},B}\leq\Omega(d_k^F),
\qquad\Omega(0)=0,
\qquad\lim_{x\downarrow0}\Omega(x)=0.
$$

The same $\Omega$ must work for every compatible receiver set, direction, and ordering at these fixed source parameters. This is uniform continuity at zero of the proposed funding bound, not a consequence of the EOM. If only an arbitrarily small portion of the canonical observation is funded, the proof applies to that portion only when it has a population-independent positive lower bound. It cannot be applied to an unfunded baseline.

For $C_I>0$, choose $\delta>0$ such that $\Omega(x)<a_I$ for $0\leq x<\delta$. Choose a compatible set with $N>C_I/\delta$. If all shares exceeded $C_I/N$, their sum would exceed $C_I$, so some $k$ has $d_k^F\leq C_I/N<\delta$. That receiver would have to satisfy

$$
a_I\leq\Omega(d_k^F)<a_I,
$$

a contradiction. If $C_I=0$, every share is zero and one nonzero row suffices for the contradiction. The receiver attaining the minimum may change with $N$; no common receiver, limiting direction, rotational covariance, allocation continuity, or infinite compatible configuration is required.

For a linear observation bound with gain $G$, summing $a_I\leq Gd_k^F$ gives $Na_I\leq GC_I$. A gain allowed to depend on population therefore requires $G_N\geq Na_I/C_I$ when $C_I>0$. Equal shares with compensating growing gain illustrate a failure of the uniform hypothesis, not an accepted account construction.

**Verdict: accepted, derived conditional impossibility.** Fractional overlap and nonlocal redistribution preserve the sum constraint and cannot change the proof. The falsifier would be allocations satisfying all displayed hypotheses and reproducing every canonical row for arbitrary finite compatible $N$. A finite compatibility ceiling, receiver-dependent growing total capacity, nonvanishing zero-share response, or gain without a common zero limit changes a hypothesis rather than refuting the theorem.

The earlier receiver-independent point-debit theorem has a different proof. Positive direction-specific debits bounded in every finite sum form at most a countable set: for $C_I>0$, each set of debits at least $C_I/n$ has at most $n$ members, and their countable union contains every positive debit. Section 2.5 properly avoids relying on that countability argument after shares are permitted to change with the receiver set. Its new uniform observation assumption is load-bearing and must remain explicit in any integration.

## 3. Playback-zero throughput: reconstructed neighborhood test

Use the existing fixed-root receiver-velocity diagnostic. Fix positive range and a simple transmitter root. Changing $\mathbf V_r$ until $\mathbf n\cdot\mathbf V_r=1$ makes $D_r=0$ without changing the nonzero canonical row. This is not a transmitter fold, root birth, or coordinate contact.

For an interval statement, assume a local $C^1$ root map $s(T)$ with $s'(T_0)=0$, and a continuous canonical acceleration with $\|\mathbf A(T_0)\|=A_0>0$. Let $M_b$ bound the nonnegative source-clock capacity density after angular allocation and let $M_g$ bound output gain per account unit. Assume output is funded **only by newly traversed source-clock capacity**, with no stored-capacity residence spending, atom release, or independent baseline. Counting repeated traversals generously gives the upper bound

$$
Q_h\leq M_b\int_{T_0-h}^{T_0+h}|s'(T)|\,dT
\leq 2hM_b\sup_{|T-T_0|\leq h}|s'(T)|=o(h).
$$

Counting only first traversals cannot increase that bound. Continuity of $s'$ at its zero supplies the last limit; differentiability at one instant alone would not justify the total-traversal estimate. The funded output has variation at most $M_gQ_h=o(h)$. Continuity of the canonical row gives

$$
\int_{T_0-h}^{T_0+h}\|\mathbf A(T)\|\,dT
=2hA_0+o(h),
$$

which contradicts the funded-output bound for sufficiently small $h$. A one-sided neighborhood has the same proof with $hA_0$ in place of $2hA_0$. The argument therefore does not depend on assigning physical significance to a mismatch at a single measure-zero instant. If $s'=0$ throughout an interval, the newly traversed capacity is zero throughout it.

**Verdict: accepted, derived conditional throughput obstruction.** Section 2.6 explicitly includes continuity of $s'$ for this estimate. Local bounds on density and gain must hold uniformly while approaching the playback zero. At nonzero playback, any gain-density product funding a row bounded below must grow at least as a constant times $1/|s'|=|D_t/D_r|$ if it attempts to survive this limit. An atom or spending during residence requires another reception-time law; its mere presence supplies no rate, duration, or exhaustion rule.

The existing executable playback control, with source coefficient $1$, patch-vector magnitude $0.2$, $D_r=0$, $D_t=0.4$, distance $2$, and unit remaining coefficients, has shell rate $0$ and conditional motion-account rate $1/(4\cdot0.4)=0.625$. This is an algebraic check of the earlier candidate's formulas, not independent evidence of a physical momentum account. The neighborhood proof above supplies the measure-level obstruction missing from a pointwise comparison.

The falsifier is a bounded-density, bounded-gain rule satisfying the stated exclusive-throughput premise that supplies order-$h$ variation despite the displayed $o(h)$ traversal bound. A derived restriction preventing such a playback-zero chart narrows applicability; no EOM reachability claim for the diagnostic is made here.

## 4. Retained-boundary additivity

For one finite source cohort, let $D_T$ be its consumed submeasure with $0\leq D_T\leq\mu_I$. Set $U_T=\mu_I-D_T$ and let $K_T$ be a measurable retained subset of the original emission-label space. For every measurable $E$,

$$
\mu_I(E)=D_T(E)+U_T(E\cap K_T)+U_T(E\setminus K_T).
$$

This stronger measure identity proves the subject's total-capacity equation by taking $E=\Lambda_I$. It requires unique label ownership, not a physical energy interpretation.

During free propagation without spending, $U_T=U$ in original labels. For nested retained sets $K_2\subseteq K_1\subseteq K_0$, the disjoint union identity

$$
K_0\setminus K_2=(K_0\setminus K_1)\mathbin{\dot\cup}(K_1\setminus K_2)
$$

gives direct export $U(K_0\setminus K_2)=U(K_0\setminus K_1)+U(K_1\setminus K_2)$. An atom on a boundary must be assigned to one side by the declared set convention. Simultaneous consumption and export require an event-ordering or ownership rule; this static partition identity does not select that rule. For nonnested windows, influx as well as export must be represented.

**Verdict: accepted, derived conditional additivity.** Export does not restore the consumed budget or erase the exterior account from a complete state. Signed or vector accounts require finite total variation for the finite, unrestricted partition interpretation invoked here. Cancellation in a small signed net value cannot replace the nonnegative budget of Section 2. The falsifier is differing direct and staged exports for one fixed measure and the same nested retained sets; implementation discrepancies would expose violated ownership or partition assumptions. No physical flux, momentum closure, or angular closure follows from this identity.

## 5. Complete-past accumulation

Reuse the isolated stationary source. Assume uniform positive account emission rate $\varepsilon>0$, normalized angular measure $d\boldsymbol\omega/(4\pi)$, no reception or sink, and amount-preserving free propagation. On emission ages $0\leq a<H$, the exact total is

$$
C_H=\int_0^H\int_{S^2}\varepsilon\,\frac{d\boldsymbol\omega}{4\pi}\,da=\varepsilon H.
$$

A nonnegative complete-past measure agreeing with every truncated cohort must therefore have infinite total: for every finite proposed bound, a sufficiently large $H$ exceeds it. This is continuity from below of measures, or simply monotonicity against all finite truncations. It does not preclude a locally finite measure on the noncompact label space.

For a retention horizon $h_0\leq H$, retained amount is $\varepsilon h_0$ and exterior amount is $\varepsilon(H-h_0)$. Their sum remains $\varepsilon H$. Export changes location or representation, not complete-state total.

More generally, let $w(a)\geq0$ be a declared measurable fraction of the original account still present **anywhere in the counted system** at age $a$. For the uniform source with that age rule,

$$
C_\infty=\varepsilon\int_0^\infty w(a)\,da.
$$

Finiteness is equivalent to integrability of $w$. If the account merely moves to another counted sector, it has not disappeared from $w$. If additional account is created elsewhere, its amount must also be counted; the formula is not permission to omit it. An acceleration-suppression factor is not automatically an account-survival fraction. Homogeneous amount-preserving transport has $w=1$.

**Verdict: accepted, derived conditional accumulation.** Uniform positive emission, undiminished transport, and finite global capacity cannot all hold for the complete past. Infinite global accounts with finite local balances remain possible mathematical representations and owe their own observation and flux laws. This conclusion concerns even one source; it supplies no infinite-population EOM tail estimate or population admissibility theorem. Its falsifier is a finite nonnegative complete-past measure with all truncated masses $\varepsilon H$ under these same assumptions.

## 6. Accepted, rejected, and unresolved scope

| Claim or use | Adjudication |
| --- | --- |
| Finite nonnegative sharing plus a common vanishing observation bound reproduces arbitrary finite unchanged stationary channel rows | Rejected by the independently reconstructed contradiction. The corresponding conditional no-go is accepted. |
| Receiver dependence, nonlocality, or fractional overlap alone evades that theorem | Rejected while the aggregate bound and uniform observation hypothesis remain. |
| Bounded newly traversed source-clock capacity funds a continuous nonzero row through playback zero | Rejected under the local regularity and exclusive-funding assumptions in Section 3. |
| Unique retained/exterior restrictions preserve one finite cohort and nested export additivity | Accepted as a measure identity, not a physical conservation law. |
| Boundary export cures infinite complete-past uniform positive accumulation | Rejected for the complete accounted state; local finite accounts are not excluded. |
| The canonical primitives imply the uniform funding bound, finite source capacity, or arbitrary finite physical receiver compatibility | Not established; reject their use as canonical premises. |
| Nondepleting acceleration observation, or independent account sectors with another derived transfer law | Unresolved and outside the excluded class. |
| These results determine energy, momentum, angular momentum, maturity, a boundary event map, or singular continuation | Rejected as an inference from this evidence. |

The subject's broad status phrases about a minimum state and a route closed under the current primitive set are not promoted to a universal impossibility theorem by this review. The accepted result is the explicitly quantified allocation obstruction. Likewise, the account examples, maturity estimates, and uniqueness discussion outside the assigned allocation sections are context, not newly independently certified closure objects here.

The precise constitutive dependency is a predeclared account architecture that says whether canonical acceleration observation consumes account content. If it does, it must derive which excluded premise is replaced: finite receiver-independent aggregate budget, common small-share output bound, unbounded finite receiver compatibility, or exclusive newly traversed source-clock spending. Playback residence and complete-past accumulation impose separate obligations; avoiding one does not solve the other. If observation does not consume content, independently derived motion, wake, and boundary account maps must supply their own dynamics on the same accepted update. Defining them as the negative motion residual is not that derivation. Neither alternative is selected here.

## 7. Evidence and preservation record

The snapshot manifest is `.tmp/allocation-independent-adjudication/input-manifest.json`; the frozen files are in its `frozen/` sibling. The following SHA-256 identities bind the reviewed subject and mathematical/code references. Hashes in this operational record identify bytes, not mathematical truth.

Freeze time: 2026-09-09T22:13:35.270Z.

| Input | SHA-256 |
| --- | --- |
| `reference/priorities/master-equation-closure/work-queue.md` | `afcb56cbb29813a86584d0bfb13fde970b5c7c38c83a9b2fd2c383874a585c56` |
| `reference/priorities/master-equation-closure/analysis/analysis-independent-causal-wake-state.md` | `12a0a6944d16912a666a4aa29ce8d019e8037347a67ecb8aa9d842cacfba2426` |
| `reference/priorities/master-equation-closure/analysis/independent-causal-wake-state-closure.md` | `a515330bdb2d475e9ae6614f1acd38a5c5a0d5db8eda3e1d36f5f78296804b66` |
| `reference/priorities/master-equation-closure/analysis/diagonal-birth-lineage-causal-wake-candidate.md` | `172be639eabfa186ee30403511ba5a641f50a6968db9c5c6528e726c80b18978` |
| `reference/priorities/master-equation-closure/analysis/receiver-wake-gradient-closure.md` | `b570f79f1c276a8ff3652c5d1d31885e213ff6128759886db411faccfb071339` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |
| `scripts/equation-mapping/derive-causal-wake-update-law.mjs` | `3775ec07ee429428a6b2d7f4ebaace2737bd515ba119fd1d2938e47104c173fe` |
| `scripts/equation-mapping/analyze-causal-wake-birth-lineage-candidate.mjs` | `831f88063d28fe36f64c2600741401c51b513b78156692e4111c9527d6f67d95` |
| `tests/causal-wake-update-law.test.js` | `b3bd916077751b73df6364b25107845e27092ff4720f9fccf6b5d1469321ceb7` |
| `tests/causal-wake-birth-lineage-candidate.test.mjs` | `5988eaccf6225ffb7a18e6272d5009359b381c24f9c90f84c78e852cd7a0cc52` |

The subject's Section 10 historical manifests and receipt were inspected with `cat`, and its prior test summary with `tail`. They report the recorded thirteen-test pass and the syntax/preservation checks; the manifest hashes agree with the table printed in Section 10. The current queue and shared synthesis have different hashes from that earlier run. Those differences are not treated as defects or assigned to an author: the historical snapshot and this review's snapshot bind different states. A stored receipt does not independently prove that a reference was never transiently edited, and this adjudication does not make that stronger claim.

**Measured validation.** `node --test tests/causal-wake-update-law.test.js tests/causal-wake-birth-lineage-candidate.test.mjs` passed 13 tests with zero failures in this review; output is retained at `.tmp/allocation-independent-adjudication/existing-tests.tap`. The two implementation files import only Node built-ins by inspection of their import statements. Their hashes and the test hashes were frozen before this rerun. These tests establish the bounded kinematic and candidate diagnostics asserted in those tests, not the new allocation theorem, all-order continuation, or account conservation. In particular, the test labeled a receiver fold computes a playback-zero algebraic diagnostic, not a transmitter-root singularity or an EOM trajectory.

Mathematical acceptance in Sections 2–5 comes from independently reconstructed minimum-share arithmetic, direct differentiation of the canonical root equation, disjoint measure restriction, and the exact truncated emission integral. No numerical EOM run or invented trajectory was needed. No Python, generator write, Git index write, publication, or downstream dispatch was performed.

**Measured validation.** The known control passed before the output check; the checker then accepted all 106 mathematical expressions under KaTeX 0.16.11, verified the authored local links and subject heading, and found every manifest input unchanged by SHA-256 comparison. Both the scoped `git diff --check` and direct trailing-whitespace assertion returned no errors. The local syntax/preservation checker is `.tmp/allocation-independent-adjudication/validate.mjs`, with receipt `validation.txt`. It is required to pass a known two-expression Markdown input, a fenced-code exclusion, and an invalid-TeX rejection before reading this output. It checks KaTeX syntax, local document links, and current SHA-256 identity of the frozen subject and references. Those checks establish only the listed syntax and byte-preservation scope. The queue and coordinator synthesis are observed separately because they may change concurrently. `git diff --check -- reference/priorities/master-equation-closure/analysis/allocation-independent-adjudication.md` supplies the scoped whitespace check; direct trailing-whitespace inspection also covers the new untracked output.

Falsifiers for the measured claims are a failed corresponding rerun, mismatched frozen test or implementation bytes, an invalid output expression or link, or a subject/reference hash mismatch. Changes to unrelated files are outside this preservation claim.

## 8. Proposed coordinator integration

“Current effort 3 independently accepts the finite-sharing no-go in allocation Sections 2.5–2.9 at conditional supplied-history channel scope. The proof requires a finite nonnegative aggregate budget, arbitrary finite compatible receiver sets, and a population-independent funded-observation bound vanishing at zero share. Receiver-dependent and nonlocal fractions do not evade it. The canonical Master Equation supplies none of those account assumptions. Playback-zero newly traversed source-clock funding fails under bounded density and gain; retained-boundary additivity is a measure identity; uniform undiminished positive emission has infinite complete-past total. Nondepleting observation and independently derived separate account channels remain open. No reviewed population class, history norm, or moment constraint changes, and no conserved account or singular continuation is accepted. The bounded adjudication effort is complete; the account architecture remains the constitutive dependency.”

The coordinator can remove the completed bounded effort from the live execution sequence while retaining that dependency and the current strategic MEC statuses. This proposal does not mutate any shared tracking or synthesis file.
