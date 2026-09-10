# Regulator assessment of the quintic mirror continuation

## Result and scope

The existing contract does not specify a regulated evolution of `CWB-rho5-lineage/v2` on the accepted stationary mirror history. It therefore does not yet define a candidate transition-limit problem whose regulator independence can be proved or refuted. The missing object is the parameterized candidate acceleration operator, together with the way its declared regulator class approaches the already accepted integral equation. This is a specification obstruction, not a counterexample showing that two admitted regulators select different histories.

The [accepted mirror construction](quintic-mirror-boundary-assessment.md) and its [independent adjudication](quintic-mirror-boundary-independent-adjudication.md) determine a unique local regular mirror history germ for the fixed, unadopted candidate. They also supply a concrete topology and conditional operator-defect estimate. The present assessment establishes exactly why the currently named smoothing families do not supply that estimate or an alternative passage-to-the-limit theorem. The conditional impulse result in the existing dominated class survives. No new regulator, maturity function, boundary update, history restriction, or numerical evolution is introduced.

Claim grades: **measured** for the contract inventory by full reads and the scoped `rg` searches recorded below; **derived** for the distinctions, conditional bounds, and regular-domain incompatibility; **inferred** for the disposition `Not advanced` at regulator-transition scope. The constitutive candidate itself remains **guessed**. A declared, applicable regulated candidate operator in the inspected sources would overturn the specification finding. Two admissible regulated solutions with different limiting histories would establish a different, stronger negative result; none is asserted here.

## 1. What the existing contract actually declares

The following sources were read before deciding whether there was a smoothing problem to solve. Section names identify the mathematical scope; the retained input manifest identifies the inspected bytes.

| Source | Declared content | What it supplies for this assessment |
| --- | --- | --- |
| [Candidate](diagonal-birth-lineage-causal-wake-candidate.md), Sections 1–5 and 8 | Cached incoming velocity and one-sided acceleration; a root-stratum origin and event owner; quintic weighting on an active diagonal-born lineage; uniform bounded-variation compactness and convergence to one limiting integral equation as acceptance obligations; a shrinking-bump falsification item. | An exact sharp candidate rule and acceptance requirements. No parameterized smoothed candidate equation or smoothing action on lineage is given. |
| [Causal-wake analysis](analysis-independent-causal-wake-state.md), Section 3.1 | Nonnegative maturity, weighted integrability, a declared uniformly dominated regulator class, and uniqueness of the post-birth limiting equation. Compact-bump multiplicative cutoff, Gaussian mollification, and hard cutoff are named. | A conditional impulse theorem. The source explicitly conditions the named families on a shared dominator in the declared protocol. It gives no candidate-specific evolution operator for them. |
| [Closure owner](independent-causal-wake-state-closure.md), First Executable Packet and Falsifiers | A finite, regulator-independent complete transition; rejection if two families inside the declared dominated class give different birth impulses. | The obligation is complete evolution, not merely a finite integral on a prescribed path. |
| [Research input](../../../office-of-research/research-history/review-packets/terence-tao-wake-reception-transfer-and-maturity-2026-07-28.md), regulator-path discussion | The three family names, an impulse argument, and a separate continuation-uniqueness burden. | Research provenance, not a definition of their action on this later quintic candidate. Its broad wording about automatic domination is read subject to the explicit protocol qualification in the live analysis. |
| [Mirror assessment](quintic-mirror-boundary-assessment.md), Sections 5–8 | A contraction in a closed subset of continuous acceleration functions with the uniform norm; a conditional uniform operator-defect bound. | A sufficient topology is available. No approximation family is defined, and confinement of approximations in that set is not asserted. |
| [Candidate analyzer](../../../../scripts/equation-mapping/analyze-causal-wake-birth-lineage-candidate.mjs) and [focused tests](../../../../tests/causal-wake-birth-lineage-candidate.test.mjs) | Algebraic birth powers, lineage gates, release behavior, quarantine, and a failed account control. | Full reads of these two files show no regulated evolution, regulator parameter, or convergence test. The argument named `topology` classifies root strata; it is not a topology for convergence of histories or measures. |

The explicit shrinking-bump formula in Section 3.1 of the causal-wake analysis is a prescribed scalar counterexample outside the dominated class. It explains why the class matters. It neither defines an admitted regulator for the quintic candidate nor establishes failure within the declared dominated class. Reusing it as a counterexample to the accepted mirror continuation would change the question.

The audit used `rg -n 'regulat|smooth|mollif|family|families|topolog|variation|shrinking'` on the frozen candidate, analyzer, and focused tests, followed by full-file inspection; the linked analysis and owner passages were read with `sed`. A wider `rg -l` search for the candidate identity and shrinking-bump wording under `reference/`, `scripts/`, `tests/`, and `content/markdown/aaa/`, restricted to Markdown, MJS, JSON, and JSON-LD, located the candidate, its analyzer, the mirror assessment, and work-log references. This is an inventory of the candidate's declared and linked contract, not a claim that no unrelated regularization exists anywhere in the repository.

## 2. The fixed equation and the topology already available

Use $c_f=1$ and the exact incoming history from the [stationary mirror ledger](../evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md). Translate the first speed-one event to $T=0$. With the notation of the accepted construction, $q_-(0)=q_*>0$, $u_-(0)=1$, and the incoming acceleration $a_-=u_-'$ is positive and continuously differentiable near zero. Define

$$
\alpha(y)=a_-(-y),\qquad
w(y)=\int_0^y\alpha(v)\,dv,\qquad
\phi(y)=\int_0^y w(v)\,dv.
$$

For the outgoing half-separation $q(T)=q_*-T-z(T)$, the exact incoming self root is $s=-y$ with $y=\phi^{-1}(z)$. The old partner root $p<0$ solves

$$
q_*-2T-z+q_-(p)+p=0.
$$

On the short chart before release, set $R=T-p$, $d=1-u_-(p)$, and let $K>0$ be the fixed coefficient of an ordered row. The complete inward acceleration is

$$
A(T,z)=P(T,z)+S(T,z),\qquad
P(T,z)=\frac{K}{R^2d},\qquad
S(T,z)=\frac{K(T+y)^3\alpha(y)^5}{w(y)}.
$$

These are the exact candidate expressions; no regularization parameter occurs. Write $a_*=P(0,0)>0$. For a sufficiently short fixed interval $[0,h]$, the accepted construction uses

$$
\mathcal B=\left\{b\in C[0,h]:b(0)=a_*,\quad
\frac{a_*}{2}\le b(T)\le\frac{3a_*}{2}\right\},
\qquad
z_b(T)=\int_0^T(T-r)b(r)\,dr,
$$

and

$$
(\mathcal T b)(T)=A(T,z_b(T)),\qquad
(\mathcal T b)(0)=a_*.
$$

The uniform norm on acceleration functions makes $\mathcal T$ a contraction on $\mathcal B$ with some $\theta<1$. Along its fixed point $b$, the accepted asymptotics give

$$
y=T+O(T^2),\qquad
\delta=T+y=2T+O(T^2),\qquad
D_t=w(y)=a_*T+O(T^2),
$$

$$
\varrho=\delta\alpha(y)=2a_*T+O(T^2),\qquad
S(T,z_b(T))=8Ka_*^4T^2+O(T^3).
$$

The accepted uniqueness upgrade covers every mirror continuation with continuous endpoint velocity, velocity locally absolutely continuous on the open side, the complete candidate equation almost everywhere, and no added singular update. Such a continuation enters the contraction region after its interval is shortened. This is uniqueness of a local history germ; it does not provide a common lifespan for an unspecified regulator family. A bounded-variation limit with an event impulse is not automatically a member of this regular class.

Claim grade: **derived**, inherited from the independently adjudicated fixed-equation construction. A regular mirror solution satisfying those hypotheses but disagreeing with the fixed point on every common interval would falsify the uniqueness used here. The present report does not extend the proof to asymmetric histories, release, or general event incidence.

## 3. What follows conditionally from domination and uniqueness

### 3.1 A fixed-history impulse is well defined

On the accepted outgoing history, $A_b(T)=A(T,z_b(T))$ has a continuous extension to $T=0$, with $A_b(0)=a_*$. Its self part is $O(T^2)$, so the accumulated self contribution in $[0,\ell]$ is $O(\ell^3)$; the complete contribution there is $a_*\ell+O(\ell^2)$. There is no event atom in this fixed candidate acceleration measure.

The existing dominated-class condition has a precise consequence if a member of that class supplies reception-time densities $f_\nu$ on this *fixed* history, with

$$
f_\nu(T)\longrightarrow A_b(T)\quad\text{for almost every }T,
\qquad |f_\nu(T)|\le D(T),\qquad D\in L^1[0,h].
$$

Dominated convergence then gives

$$
\|f_\nu-A_b\|_{L^1[0,h]}\longrightarrow0,
$$

and hence

$$
\sup_{0\le T\le h}\left|\int_0^T(f_\nu-A_b)(r)\,dr\right|
\le\|f_\nu-A_b\|_{L^1[0,h]},
$$

$$
\sup_{0\le T\le h}\left|\int_0^T(T-r)(f_\nu-A_b)(r)\,dr\right|
\le h\|f_\nu-A_b\|_{L^1[0,h]}.
$$

Thus this already-declared conditional framework would give a common fixed-history impulse and uniform convergence of its first two time primitives. The symbol $f_\nu$ represents the density that an actual declared family would have to supply; this paragraph does not construct one. Applying a smoothing operation to a known path and then integrating its acceleration is not yet a self-consistent regulated solution, because the path used to evaluate the acceleration may differ from the resulting path.

Claim grade: **derived conditional theorem**. Failure of these bounds under the displayed domination and almost-everywhere convergence hypotheses would falsify it. Neither nonnegativity alone nor a family name establishes those hypotheses.

### 3.2 The existing operator-defect estimate selects the history if its premises hold

Suppose a specified family actually supplies candidate acceleration operators $\mathcal T_\nu$ and solutions $b_\nu=\mathcal T_\nu b_\nu$ in the same $\mathcal B$, with the same incoming history and event data. Put

$$
e_\nu=\sup_{c\in\mathcal B}
\|\mathcal T_\nu c-\mathcal T c\|_\infty.
$$

The triangle inequality and the accepted contraction imply

$$
\|b_\nu-b\|_\infty
\le e_\nu+\theta\|b_\nu-b\|_\infty,
\qquad
\|b_\nu-b\|_\infty\le\frac{e_\nu}{1-\theta}.
$$

Consequently, $e_\nu\to0$ implies uniform acceleration convergence and

$$
\|u_\nu-u\|_\infty\le\frac{h e_\nu}{1-\theta},\qquad
\|q_\nu-q\|_\infty\le\frac{h^2 e_\nu}{2(1-\theta)}.
$$

This is a **derived conditional theorem** in the topology already supplied by the mirror assessment, not a newly imposed acceptance standard. A family whose acceleration differs at the exact endpoint might fail the uniform-norm premise and still converge in an appropriate weaker sense. The declared bounded-variation route is not ruled out: it would require compactness and identification of each limit as a regular solution of the same integral equation, as the candidate already states. Compactness alone does not identify a nonlinear limit equation or exclude an event atom. The fixed-equation uniqueness theorem applies once those facts are established.

The unresolved quantity is now explicit: no inspected declaration defines $\mathcal T_\nu$ for this candidate, so $e_\nu$ cannot be evaluated or bounded. Nor does it define an alternative regulated evolution for which the weaker limit-identification argument can be made. A family satisfying the displayed premises but violating the conclusion would falsify this conditional theorem.

## 4. Why the canonical smoothing model does not fill the gap

The [Master Equation's finite-width section](../../../../content/markdown/aaa/dynamics/master-equation.md#mollified-causal-wake-regularization) defines Gaussian smoothing of the causal-surface delta. Its conditional local theorem assumes finite root count together with uniform positive separation and transmitter-transversality floors. The accepted self branch above has $\delta\to0$ and $D_t\to0$. Those hypotheses therefore do not cover any closed interval containing this birth, although a localized simple-root chart at a fixed positive time can have both floors.

The [auxiliary dual-mollified model](../../../../content/markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) also specifies a core scale and the softened vector kernel $\mathbf r/(r^2+\epsilon_c^2)^{3/2}$. This is a real parameterized model, but its declared recovery target is the canonical sharp row. Its equation contains no quintic maturity or lineage gate.

There is a direct regular-domain incompatibility with treating that existing equation, unchanged, as an approximation of the quintic rule. Fix a sufficiently small $T_0>0$ on the accepted candidate history. Localize to its isolated incoming self root, away from other emission times. At this one root the separation and transmitter factor are strictly positive. Under the auxiliary model's declared regular-domain recovery, the localized limiting magnitude is

$$
A_{\mathrm{sharp}}(T_0)=\frac{K}{\delta(T_0)^2w(y(T_0))}.
$$

The candidate magnitude at the identical history and root is

$$
S(T_0,z_b(T_0))
=\varrho(T_0)^5 A_{\mathrm{sharp}}(T_0),\qquad
0<\varrho(T_0)<1.
$$

These are unequal. This is an open-side, positive-delay difference, not a convention at the diagonal. It proves that the auxiliary equation's unchanged local recovery target is not the candidate's local operator. It does not assume that the entire unlocalized finite-width self integral is well posed, and it does not assert a global limit theorem for that model.

Inserting $M_5$ into a finite-width emission integral would require an additional definition. The candidate assigns its gate through a certified root stratum and event owner on exact causal support. A broadened causal surface samples emissions off that support. The current declarations do not say whether smoothing acts before or after root extraction, how the gate is assigned to those sampled contributions, or how the two regulator scales interact with that operation. Several such operations may be mathematically conceivable, but selecting one would be new work outside this assessment. If smoothing instead acts only on the extracted sharp row or on its time measure, off-support lineage need not be introduced; that operation still has to be specified. No universal off-support requirement is imposed here.

Claim grade: **derived regular-domain incompatibility**, conditional on the auxiliary family's stated sharp recovery, and **measured specification gap** by reading its equation and the candidate's state and reception definitions. A quintic term and applicable lineage prescription in that declared auxiliary equation, or equality of the two displayed rows with $0<\varrho<1$, would overturn the respective conclusion.

## 5. The precise unresolved declaration

The candidate has fixed the maturity law, the incoming history, and the sharp short-interval equation. It has also stated the type of convergence evidence acceptance will require. The following missing specifications prevent that requirement from referring to an actual regulated transition here; they are not additional physical assumptions or a proposed regulator protocol.

| Missing declaration | Why it is needed to define the existing question |
| --- | --- |
| The operation performed by each admitted smoothing family on the candidate equation. | “Gaussian,” “hard cutoff,” and “compact-bump” do not say whether the object being changed is maturity, the weighted acceleration density, the causal-surface delta, or a core kernel. These objects have different integration variables and endpoint behavior. |
| The regulated candidate evolution and its retained input at each parameter value. | A fixed-history impulse calculation does not define a solution $b_\nu$. This task fixes the complete incoming history; it does not authorize replacing it by arbitrary approaching histories or by histories sharing only an endpoint jet. If a specified smoothing operation necessarily changes stored input, its relation to this same retained state must be stated. |
| The admitted refinement parameters and their convergence meaning for the claimed transition. | A one-parameter cutoff and a two-scale wake/core smoothing are different limits. The existing uniform acceleration topology is sufficient when its premises hold; a weaker history or measure topology would need the candidate's already-required limit-equation identification. No arbitrary class of refinement paths is added. |

In particular, the fixed formula samples $\alpha(y)^5$ and the inverse coordinate $\phi^{-1}(z)$. If a future protocol smooths the incoming history, merely reporting convergence of positions and velocities does not establish convergence of that sampled acceleration factor. This is a dependence visible in the existing equation, not a reason to vary the fixed input now or to impose a new history class. If the input is held exactly fixed, that particular approximation issue does not arise.

Timestep refinement is a separate statement. For a declared regulator parameter $\nu$ and numerical step $\Delta T$, convergence as $\Delta T\to0$ can at most establish convergence to the fixed regulated evolution. The candidate-transition question concerns the subsequent or controlled joint regulator limit. The algebraic candidate analyzer defines neither of these numerical limits, by full inspection of its exports and tests. No EOM solver convergence claim is made.

## 6. Disposition and verification

The bounded assessment is complete at **precise underdetermination**. Retain the accepted regular mirror existence-and-uniqueness result and the conditional dominated-impulse statement. Leave regulator-independent transition acceptance unresolved until a candidate-specific smoothing operation and its convergence interpretation are declared. The appropriate next decision is to specify that mathematical object, or explicitly defer the regulator question; running a timestep sweep or importing the unchanged canonical regulator would not make the missing object defined.

No finding here adopts the candidate, changes the incoming record, supplies a singular event update, crosses release, proves general lineage, closes conserved accounts, or weakens the accepted unchanged-law obstruction. The report stops before designing a regulator.

Input preservation is checked against the twelve-path SHA-256 manifest in `.tmp/quintic-mirror-regulator-assessment/input-digests.sha256`; frozen copies are retained in the same scratch directory. The manifest includes the candidate, both mirror proofs, the causal-wake owners, the incoming ledger and machine record, the linked research input, the Master Equation, and the candidate analyzer and tests. Only this report and its assigned scratch directory are written by this assessment.

Before target validation, `node .tmp/quintic-mirror-regulator-assessment/check.mjs known` passed the known case of two formulas and one existing file link, ignored an unmatched dollar inside fenced code, and rejected an invalid macro and trailing whitespace. This control establishes the reach of the focused markup instrument before it is applied to this report. Its file-target check does not resolve link anchors or inspect browser layout. These checks concern syntax, relative file targets, and retained input bytes; the displayed arguments carry the mathematical conclusions.

Measured validation: `node .tmp/quintic-mirror-regulator-assessment/check.mjs target` passed 61 KaTeX expressions, twelve relative file targets, balanced dollar delimiters, and no trailing whitespace. `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings, and 30 notes. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/quintic-mirror-regulator-assessment.md` emitted no whitespace diagnostic and returned 1 for the new-file difference. `shasum -a 256 -c .tmp/quintic-mirror-regulator-assessment/input-digests.sha256` returned `OK` for all twelve inspected live inputs. No regulator experiment or EOM solver run was performed because the candidate-specific regulated evolution is the object not yet defined.
