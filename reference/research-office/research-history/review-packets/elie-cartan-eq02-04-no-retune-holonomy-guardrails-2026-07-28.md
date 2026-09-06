Closure goal: Replace drift-only holonomy language with a source-identified, frozen-source held-out transport test whose quantitative margin can be evaluated only after point-first retained-branch existence is established.

# Research Findings And Proposed Changes: No-Retune Transport Beyond Drift-Only Holonomy

## Research Framing And Status

- **Date:** 2026-07-28
- **Artifact type:** research findings and proposed changes
- **Review lens:** Elie Cartan-style principal bundles, associated bundles, moving frames, connections, curvature, torsion, and holonomy
- **Research basis:** four rounds of mathematical analysis are synthesized by result; prompts, replies, and round-by-round dialogue are superseded and omitted
- **Claim authority:** conditional mathematical analysis and proposed proof target
- **Promotion classification:** priority-only
- **Not established:** a source-backed translating branch, an accepted connection, no-hidden-retune, Lorentz recovery, or an effective observer-spacetime geometry

Plainly: this document records what the research established mathematically and what should change in the proof program. It does not claim that the required retained branch or transport law already exists.

## Overall Finding

The one-dimensional-holonomy concern is correct. Let the drift base be

$$
I_u=\{u:-c_f<u<c_f\}
$$

and let a connection restricted to that base be

$$
\omega=A(u)\,du
$$

Its curvature vanishes identically:

$$
\Omega
=
d\omega+\omega\wedge\omega
=
0
$$

because every two-form on a one-dimensional base vanishes. The interval has no noncontractible loops, exact forward-and-back transport is the identity, and the cocycle law

$$
P(u_2,u_0)
=
P(u_2,u_1)P(u_1,u_0)
$$

is satisfied by the parallel transport of every connection.

Plainly: drift alone supplies only one direction. Zero drift curvature, trivial drift loops, and exact composition are automatic mathematical properties, so they cannot show that the connection was built without tuning to the desired outputs.

This does **not** make transport over $I_u$ wholly vacuous. A connection constructed only from declared source-side retained data can predict an independently extracted section:

$$
s_\alpha^{\mathrm{pred}}(u)
=
P_{\rho_\alpha}(u,0)s_\alpha^{\mathrm{ind}}(0)
$$

where $\rho_\alpha$ is the source-derived action of the common structure group on row family $\alpha$. Comparison with $s_\alpha^{\mathrm{ind}}(u)$ has evidential content only when the independent section did not enter the construction of $\omega$, $\rho_\alpha$, the gauge choice, the norm, or the tolerance.

Plainly: an interval can still host a real prediction. The evidence comes from freezing one source-built rule and then testing it against rows computed independently, not from calling the result drift holonomy.

The source-identifiability analysis sharpens this conclusion. Construction noninterference is necessary but insufficient. The permitted source record must also identify the connection uniquely modulo one declared gauge stabilizer, the structure group and associated actions must be reduced from source geometry rather than merely announced in advance, and the test must include an unused drift block. Otherwise an invisible Lie-algebra direction or an overexpressive source constructor can still tune held-out behavior.

Plainly: hiding the answer from the connection builder is only the first safeguard. The source data must leave no unseen connection knob that can affect a tested row, and the final test must predict behavior over drift values that did not shape the construction.

The quantitative analysis makes the source-identification condition numerical. Exact kernel equality is replaced by a validated positive lower bound for the smallest quotient singular value after source, finite-memory, discretization, derivative, action, solver, and arithmetic errors are included. The bound is required on each constant-orbit-type stratum. An enhanced-symmetry point such as $u=0$ is handled by bounded one-sided continuation and a junction match modulo one predeclared stabilizer subgroup that acts trivially on all tested fibers.

Plainly: floating-point full rank is not enough. The calculation must prove that numerical uncertainty cannot hide a connection direction, and extra symmetry at rest must not permit an undeclared reset between the two sides of the drift family.

## Claim Map

- **Derived result:** shared retained support is weaker than shared transport.
- **Derived result:** drift-only curvature, loop holonomy, and cocycle checks cannot certify no-retune.
- **Derived result:** a connection post-fitted from desired rows can pass every endpoint and cocycle check on $I_u$.
- **Derived result:** the displayed torsion expression is Cartan torsion only on a declared soldered base.
- **Derived result:** a flat phase connection can have nontrivial global holonomy.
- **Derived result:** source noninterference does not imply source identifiability.
- **Derived result:** numerical source identifiability requires a validated positive quotient singular-value margin, not computed rank alone.
- **Derived result:** an isolated symmetry enhancement is a separate orbit-type stratum whose one-sided transports must match modulo common harmless gauge.
- **Derived result:** nonlinear associated fibers require covariant tangent residuals or invariant endpoint distances rather than coordinate subtraction.
- **Derived result:** pointwise coframe extraction requires a validated full-history point, while drift transport requires a separately validated continuation family.
- **Proposed innovation:** use frozen-source held-out parallelism as the primary no-retune witness.
- **Proposed innovation:** select the structure group through source-side automorphism reduction and require source-equivariant associated actions.
- **Proposed innovation:** require row holdout, a blocked drift interval, and at least one analytic or genuinely independent correctness reference.
- **Proposed innovation:** derive phase-holonomy targets from source-frame monodromy rather than winding number alone.
- **Proposed innovation:** propagate the complete connection enclosure into every held-out endpoint uncertainty and require refinement-stable positivity on each stratum.
- **Proposed innovation:** bind no-retune transport to a point-first L1–L3 dependency ladder and preserve negative controls by intended theorem stage.
- **Plausible inference:** a mixed drift–relative-phase or drift–physical-modulus rectangle can later support a genuine curvature or loop-holonomy test.
- **Unresolved implementation burden:** the retained source structures, invariant metrics, error enclosures, orbit-type strata, and independent endpoint projections have not yet been constructed or certified.

Plainly: the three reviews now resolve the mathematical form of the test, including its quantitative certificate. They do not supply the retained data or demonstrate that a real branch passes that certificate.

## Finding 1: The Minimum Honest Geometric Object

For the first no-retune test, use the base

$$
B_1=I_u
$$

Let $V$ be the source-extracted feature space that carries the gamma-free frame or coframe. Let $\mathcal Q_{\mathrm{src}}$ be the complete declared collection of source-derived structures on $V$, including the distinguished subspaces, pairings, orientations, incidence relations, source tensors, and admissible coframe reductions. The initial source automorphism group is

$$
G_{\mathrm{aut}}
=
\operatorname{Aut}
\left(
V;
\mathcal Q_{\mathrm{src}}
\right)
=
\left\{
g\in GL(V):
g\mathbin{\cdot}Q=Q
\text{ for every }
Q\in\mathcal Q_{\mathrm{src}}
\right\}
$$

The admissible structure group is the smallest closed subgroup

$$
G_{\min}
\subseteq
G_{\mathrm{aut}}
$$

that contains the source-identified transition maps and transport generators and satisfies the source-identification condition in Finding 7. A normal subgroup may be quotiented away only when it acts trivially on both the source structures and every tested associated fiber.

Plainly: the group is determined by transformations that preserve the source geometry and are actually required to transport it. It is not selected because it has enough dimensions to reproduce the desired observer rows.

Use one principal bundle

$$
P\longrightarrow B_1
$$

and one associated bundle for each observable family:

$$
E_\alpha
=
P\times_{\rho_\alpha}F_\alpha,
\qquad
\alpha\in
\{
\mathrm{clk},
\mathrm{env},
\mathrm{tw},
E,
\mathbf p,
\mathrm{phase},
\mathrm{sea}
\}
$$

Each associated action must arise from a source-defined equivariant construction

$$
\mathcal E_\alpha:
\left(
V,
\mathcal Q_{\mathrm{src}}
\right)
\longmapsto
F_\alpha
$$

with

$$
\mathcal E_\alpha
\left(
g\mathbin{\cdot}Q
\right)
=
\rho_\alpha(g)
\mathcal E_\alpha(Q)
$$

The rest branch supplies an anchored frame $p_0\in P_0$ and anchored row values $s_\alpha(0)$. The construction $\mathcal E_\alpha$ and action $\rho_\alpha$ must be fixed before the corresponding held-out row is inspected. A freely chosen representation parameter introduced only for one observer row is inadmissible.

Plainly: every row must be a fixed geometric construction from the same source frame. Declaring separate transformation knobs in advance would still be separate tuning; advance paperwork does not create a common mechanism.

Permissible gauge transformations are common maps

$$
g:B_1\longrightarrow G_{\min}
$$

that act simultaneously on $P$, $\omega$, and every $E_\alpha$, preserve the declared reduction of $G_{\min}$, and obey the reference anchor

$$
g(0)=1
$$

They must not depend on which target row is being tested.

Plainly: coordinates may change, but they must change together for the connection and every row. A row-specific reset is hidden retuning, not harmless gauge freedom.

This object is a principal connection over a branch-parameter family. It is not yet a Cartan connection on effective observer spacetime. A coframe indexed by drift does not by itself provide a solder form that identifies a spacetime tangent bundle with an associated vector bundle.

Plainly: moving-frame language is appropriate, but observer-spacetime geometry has not been reconstructed merely because coframes and connections appear in the notation.

## Finding 2: Replace The Informal Holonomy Witness

The primary full-interval witness should be the failure of independently extracted sections to be parallel under one frozen source-derived connection:

$$
W_{\parallel}^{\,2}
=
\sum_\alpha
\int_{I_u}
\frac{
\left\|
D^{\rho_\alpha}_{\omega}
s_\alpha^{\mathrm{ind}}(u)
\right\|_\alpha^2
}{
\sigma_\alpha(u)^2
}
\,du
$$

Here $D^{\rho_\alpha}_{\omega}$ is the covariant derivative induced by $\omega$ through the declared action $\rho_\alpha$, $\|\cdot\|_\alpha$ is a predeclared invariant fiber norm, and $\sigma_\alpha$ is the predeclared uncertainty or acceptance scale for row family $\alpha$.

Plainly: this witness measures how far each independently computed moving row departs from the differential equation predicted by the frozen connection. The group action, yardstick, and tolerance must all be fixed before the test.

When only endpoint data are available, use

$$
W_{\mathrm{end}}
=
\max_\alpha
\frac{
d_\alpha\!\left(
s_\alpha^{\mathrm{ind}}(u_1),
P_{\rho_\alpha}(u_1,0)s_\alpha^{\mathrm{ind}}(0)
\right)
}{
\sigma_\alpha
}
$$

where $d_\alpha$ is invariant under the one common anchored gauge action.

Plainly: the endpoint test compares the moving row obtained independently with the row predicted by transporting the rest value. It is non-vacuous only when the endpoint extractor and transport constructor are evidentially separated.

Row-family holdout alone is not enough. The minimum within-family test also reserves a nonempty connected drift interval

$$
J_{\mathrm{test}}
\subset
I_u
$$

that was not used to choose constructor parameters, the source reduction, representations, gauge conventions, regularization, or stopping rules. On that block, use

$$
W_{\alpha,J}
=
\sup_{u\in J_{\mathrm{test}}}
\frac{
d_\alpha
\left(
s_\alpha^{\mathrm{ind}}(u),
P_{\rho_\alpha}(u,u_0)
s_\alpha^{\mathrm{ind}}(u_0)
\right)
}{
\sigma_\alpha(u)
}
$$

Plainly: the frozen rule must predict an unused row over an unused region of drift. If every drift point influenced the construction choices, a flexible source map could encode an interpolation or lookup rule without directly reading the final test column.

The minimum holdout obligation follows the scope of the claim:

- one-branch common transport requires every claimed observer row to be excluded from construction and one blocked drift interval;
- a phase-modulus claim additionally requires a held-out phase sector;
- a cross-branch constructor claim additionally requires a separate retained branch or source perturbation.

Plainly: a theorem about one retained family does not require a second family, but it cannot be advertised as a constructor that generalizes across families.

The proposed replacement for the old witness split is:

$$
W_{\mathrm{supp}}
\quad\text{for shared support}
$$

$$
W_{\parallel}
\ \text{or}\
W_{\mathrm{end}}
\quad\text{for primary no-retune prediction}
$$

$$
W_{\mathrm{loop}}
\quad\text{only for a genuine two-parameter base}
$$

If a combined label is needed, define

$$
W_{\mathrm{NR}}
=
\max
\left\{
W_{\parallel},
W_{\mathrm{loop}}
\right\}
$$

with the loop term omitted when no legitimate second retained modulus exists.

Plainly: shared support, successful prediction, and loop behavior are different obligations. The old name $W_{\mathrm{hol}}$ should not hide those distinctions or imply that a one-dimensional loop test exists.

The logical hierarchy is not an implication chain:

$$
W_{\mathrm{supp}}=0
\;\not\Rightarrow\;
W_{\parallel}=0
$$

and, when a two-dimensional base exists,

$$
W_{\parallel}=0
\;\not\Rightarrow\;
W_{\mathrm{loop}}=0
$$

Loop agreement alone also does not establish correct endpoints or shared support.

Plainly: rows can share one carrier yet fail one transport rule; they can satisfy one drift prediction yet disagree around a two-direction loop; and a correct loop can still live over the wrong data.

## Finding 3: A Genuine Loop Requires A Genuine Second Retained Modulus

If a path-comparison theorem is later required, the minimum enlarged base is a two-dimensional retained-family patch

$$
B_2
=
I_u\times J_\lambda
$$

where $\lambda$ labels physically distinct retained states produced by the same microscopic rule. For a small rectangle $C=\partial R$,

$$
\operatorname{Hol}_{C}(\omega)
=
P_{\lambda}^{-1}
P_u^{-1}
P_\lambda
P_u
=
1
-
\Omega_{u\lambda}
\Delta u
\Delta\lambda
+
o(\Delta u\,\Delta\lambda)
$$

up to the declared orientation and transport convention.

Plainly: the loop compares “change drift, then change the second branch parameter” with the reverse order. Their leading disagreement measures mixed curvature, which cannot exist on the drift interval alone.

The candidate second directions have different authority:

- **Relative phase on $T^2$:** conditionally legitimate when relative phase labels physically distinct retained histories and both continuation directions are source-defined.
- **Transverse retained-branch perturbation:** legitimate when it is an independently controlled direction inside a certified local solution family.
- **Additional physical continuation parameter:** strongest in principle when a source state, Noether sea state, or boundary parameter generates another retained branch through the same microscopic rule.
- **Section relocation:** a covariance test for the return construction, not ordinarily a physical curvature direction.
- **Refinement depth or memory depth:** a numerical convergence control, not a geometric direction.

Plainly: phase or another physical branch parameter may supply a real second route. Changing the numerical resolution or the bookkeeping section cannot be promoted into geometry to manufacture a loop.

If no genuine second modulus exists, the program should retain $B_1=I_u$, use the held-out parallel-section test, and make no loop-holonomy claim.

## Finding 4: Phase Holonomy Need Not Vanish

On the relative phase torus, flatness means

$$
\Omega_{\mathrm{phase}}=0
$$

but a flat connection may still define a nontrivial representation

$$
\operatorname{Hol}_{\omega}:
\pi_1(T^2)
\longrightarrow
G_{\min}
$$

Therefore, zero connection coefficients are gauge-dependent, and identity holonomy may be too strong. The correct target is a source-derived conjugacy class for each generator of $\pi_1(T^2)$.

Plainly: a phase connection can be locally flat while still transforming a frame after one complete phase cycle. Local flatness and globally trivial transport are different facts.

Assume relative phase is a genuine retained modulus and use the universal cover

$$
p:
\mathbb R^2
\longrightarrow
T^2
$$

Let $\widetilde{\mathcal F}(\phi)$ be the source-extracted frame along the lifted retained family. Each deck transformation $n\in\mathbb Z^2$ must have a source-defined return map

$$
\widetilde{\mathcal F}
\left(
\phi+2\pi n
\right)
=
\widetilde{\mathcal F}(\phi)
h_{\mathrm{src}}(n),
\qquad
h_{\mathrm{src}}(n)
\in
G_{\min}
$$

Repeated continuation must satisfy

$$
h_{\mathrm{src}}(n+m)
=
h_{\mathrm{src}}(n)
h_{\mathrm{src}}(m)
$$

up to the declared right- or left-action convention. A periodic common gauge transformation conjugates $h_{\mathrm{src}}$, so the intrinsic phase target is

$$
\left[
H_{C_n}^{\mathrm{src}}
\right]
=
\left[
h_{\mathrm{src}}(n)
\right]
$$

Plainly: the winding vector $n$ records which phase cycles were traversed. The source-frame return map $h_{\mathrm{src}}(n)$ records how the common frame changed during those cycles, and only its conjugacy class is independent of the chosen common frame.

The minimum phase theorem is conditional:

> If source continuation around $C_n$ is horizontal for the frozen connection $\omega$, and the lifted source frame returns by $h_{\mathrm{src}}(n)$, then
>
> $$
> \left[
> \operatorname{Hol}_{C_n}(\omega)
> \right]
> =
> \left[
> h_{\mathrm{src}}(n)
> \right]
> $$
>
> and every associated row returns under the common action $\rho_\alpha(h_{\mathrm{src}}(n))$.

Plainly: identity holonomy is required only when the source-derived frame return is itself the identity. A nonzero phase winding may carry nontrivial but common frame and row monodromy.

The current zero phase-holonomy field should therefore remain a diagnostic guardrail. It cannot become accepted no-retune evidence until the retained phase modulus, phase-loop continuation, common gauge action, and source-derived target conjugacy class are defined.

## Finding 5: The Current Torsion Row Is Not Yet Cartan Torsion

The expression

$$
T^A
=
de^A
+
\omega^A{}_{B}\wedge e^B
$$

has the meaning of Cartan torsion only if all of the following exist:

1. a declared differentiable base manifold $M$;
2. a frame bundle or appropriate reduction $P\to M$;
3. a nondegenerate solder coframe $e^A$ identifying $TM$ with an associated vector bundle;
4. a connection $\omega^A{}_{B}$ on that same frame bundle;
5. the exterior derivative $d$ on $M$;
6. a common transformation law under which $T^A$ is covariant.

Plainly: torsion is a specific geometric failure of a solder form to close. A wake asymmetry or row mismatch is not torsion until a reconstructed geometry proves that identification.

If $e^A_u$ is only a family of feature covectors indexed by drift, then its variation on $I_u$ is parameter transport, not observer-spacetime torsion. A wake-tail or self-hit asymmetry should instead remain a source-side defect observable, for example

$$
Q_{\mathrm{wake}}(u)
=
\mathcal A
\left(
\mathcal L_{\mathrm{root}},
\mathcal L_{\mathrm{wake}},
\mathcal L_{\mathrm{path}}
\right)
$$

Any later relation from $Q_{\mathrm{wake}}$ to $T^A$ requires a separately derived constitutive map on a genuine soldered geometry.

Plainly: the wake defect may later help explain a torsion-like effective response, but it must not be relabeled as torsion before that map is derived.

The current torsion bound should therefore remain a producer diagnostic and negative-control guardrail, not an accepted geometric component of the no-retune theorem.

## Finding 6: Explicit Post-Fit Counterexample

Let the desired nonzero scalar rows be $y_1(u),\ldots,y_m(u)$ and define

$$
S(u)
=
\operatorname{diag}
\left(
y_1(u),
\ldots,
y_m(u)
\right)
$$

Choose

$$
A(u)
=
S'(u)S(u)^{-1},
\qquad
\omega
=
-A(u)\,du
$$

using the convention $D=d+\omega$. Then

$$
DS=0
$$

and

$$
P(u_1,u_0)
=
S(u_1)S(u_0)^{-1}
$$

This connection exactly reproduces every fitted row, has zero curvature on $I_u$, and obeys every cocycle identity.

Plainly: all separately desired curves can be placed on the diagonal of one matrix, and that matrix can be used to manufacture a perfect connection afterward. Perfect transport residuals then show only that the fitted construction is self-consistent.

This counterexample rejects all of the following as standalone no-retune evidence:

- zero drift curvature;
- identity drift-loop holonomy;
- exact transport composition;
- zero endpoint residuals when the endpoint rows constructed $\omega$;
- one matrix-valued connection whose row actions were chosen after the outputs were known.

Plainly: none of these checks can distinguish a prediction from a connection manufactured after the desired curves were already available.

## Finding 7: Construction Independence Requires Factorization And Source Identifiability

Split the retained record into permitted source-side data and held-out test rows:

$$
\pi_{\mathrm{src}}\Theta
\qquad\text{and}\qquad
\pi_{\mathrm{test}}\Theta
$$

Require the connection to factor only through the source projection:

$$
\omega
=
F
\left(
\pi_{\mathrm{src}}\Theta
\right)
$$

The constructor must satisfy noninterference:

$$
\pi_{\mathrm{src}}\Theta
=
\pi_{\mathrm{src}}\widetilde\Theta
\quad\Longrightarrow\quad
F
\left(
\pi_{\mathrm{src}}\Theta
\right)
=
F
\left(
\pi_{\mathrm{src}}\widetilde\Theta
\right)
$$

even when

$$
\pi_{\mathrm{test}}\Theta
\neq
\pi_{\mathrm{test}}\widetilde\Theta
$$

Plainly: if clock, signal, energy, momentum, phase, or Noether sea answers are changed while all allowed source data stay fixed, the connection must remain unchanged.

Noninterference does not ensure that the source determines the connection. Let $q_j(u)$ be the permitted source-side frame, tensor, or retained-record sections in declared actions $\sigma_j$. Define the pointwise source-identification map

$$
\mathcal I_u:
\mathfrak g_{\min}
\longrightarrow
\bigoplus_j
T_{q_j(u)}F_j
$$

by

$$
\mathcal I_u(B)
=
\left(
\sigma_{j*}(B)
q_j(u)
\right)_j
$$

The source transport equations

$$
q_j'(u)
+
\sigma_{j*}
\left(
A(u)
\right)
q_j(u)
=
0
$$

must determine $A(u)\in\mathfrak g_{\min}$ uniquely modulo one predeclared gauge stabilizer $K_{\mathrm{gauge}}$. Equivalently, for almost every tested drift value,

$$
\ker\mathcal I_u
=
\mathfrak k_{\mathrm{gauge}}
$$

together with the anchored gauge condition at $u=0$.

Plainly: every connection direction that can change a tested row must already be visible in the source records. The only permitted ambiguity is a declared gauge direction that changes no tested content.

The decisive hidden-direction counterexample is

$$
\mathfrak g_{\min}
=
\mathfrak g_{\mathrm{seen}}
\oplus
\mathfrak g_{\mathrm{hidden}}
$$

when every source action annihilates $\mathfrak g_{\mathrm{hidden}}$ but some held-out action $\rho_\alpha$ does not. Then

$$
A(u)
=
A_{\mathrm{seen}}(u)
+
B_{\mathrm{hidden}}(u)
$$

fits the same source record for arbitrary $B_{\mathrm{hidden}}(u)$ while changing the held-out row.

Plainly: a connection component invisible to the source becomes a concealed adjustment knob even though the constructor never reads the test answer directly.

The source-identifiability falsifier is any nonzero class

$$
0
\neq
B(u)
\in
\ker\mathcal I_u
/
\mathfrak k_{\mathrm{gauge}}
$$

that acts nontrivially on a tested section:

$$
\rho_{\alpha*}(B)
s_\alpha
\neq
0
$$

Plainly: finding one unseen nongauge generator that changes a tested row defeats the no-retune theorem before endpoint residuals are considered.

The operational evidence separation should additionally freeze, before held-out extraction:

- the constructor $F$;
- the source reduction $G_{\min}$;
- every action $\rho_\alpha$;
- the gauge anchor;
- the fiber norms or distances;
- the uncertainty and acceptance scales;
- the blocked drift interval.

A source-preserving negative control should then perturb or permute held-out rows. The connection must remain unchanged and the held-out residual must become nonzero by more than the declared uncertainty.

Plainly: mathematical factorization blocks direct access to the answers, while the negative control checks that the implemented workflow really respects that separation.

The source constructor and endpoint extractor may consume the same frozen primitive retained record, but they must not share derived transformations, fitted coefficients, representation-selection logic, gauge choices, or row-facing helper routines. Every claimed row requires a construction-independent held-out projection. At least one representative action class additionally requires an analytic case or genuinely independent implementation.

Plainly: separate dataflow shows that the answer did not leak into the constructor. An analytic or independently derived reference is still needed to show that the shared mathematical specification is correct rather than merely reproduced.

Same-implementation replay is parity evidence only when both sides share the mathematical path whose correctness is at issue. Independent root or path-history recomputation can check the primitive ledger, but it does not independently validate an associated-row projection unless that projection is also recomputed independently.

## Finding 8: Quantitative Source Identifiability Uses A Quotient Margin

Equip $\mathfrak g_{\min}$ with a source-declared inner product $h_{\mathfrak g}$ and each source tangent space with a source-declared invariant metric $h_j(u)$. Let

$$
\mathfrak k(u)
=
\mathfrak k_{\mathrm{gauge}}(u)
\subseteq
\ker\mathcal I_u
$$

be the declared harmless gauge algebra. The intrinsic quotient norm is

$$
\lVert[B]\rVert_{\mathfrak g/\mathfrak k}
=
\inf_{K\in\mathfrak k(u)}
\lVert B+K\rVert_{\mathfrak g}
$$

and the pointwise identifiability margin is

$$
\lambda_{\mathrm{id}}(u)
=
\inf_{\substack{
[B]\in\mathfrak g_{\min}/\mathfrak k(u)\\
\lVert[B]\rVert_{\mathfrak g/\mathfrak k}=1
}}
\left(
\sum_j
\left\lVert
\sigma_{j*}(B)q_j(u)
\right\rVert_{h_j(u)}^2
\right)^{1/2}.
$$

Plainly: this number measures the weakest source-visible nongauge connection direction. A positive lower bound means every connection change that could matter is detected by the source record by at least a known amount.

If a declared orthogonal complement $H_u$ represents the quotient, then $\lambda_{\mathrm{id}}(u)$ is the smallest singular value of $\mathcal I_u|_{H_u}$. The certificate, however, is the quotient quantity rather than a basis-dependent matrix rank.

Let $\widehat{\mathcal I}_u$ be the computed identification operator and require a validated enclosure

$$
\left\lVert
\mathcal I_u-\widehat{\mathcal I}_u
\right\rVert_{\mathrm{op}}
\leq
\varepsilon_{\mathcal I}(u).
$$

If $\widehat\lambda_{\min}(u)$ is the computed smallest quotient singular value and $\varepsilon_{\mathrm{sv}}(u)$ encloses the singular-value computation error, define

$$
\underline\lambda_{\mathrm{id}}(u)
=
\widehat\lambda_{\min}(u)
-
\varepsilon_{\mathcal I}(u)
-
\varepsilon_{\mathrm{sv}}(u).
$$

For every closed constant-orbit-type block $J_r$, require

$$
\underline\lambda_r
:=
\inf_{u\in J_r}
\underline\lambda_{\mathrm{id}}(u)
>
0.
$$

Plainly: all known numerical errors are subtracted before the margin is called positive, and positivity is certified over the whole drift block rather than only at sampled points.

The operator error budget must expose its components:

$$
\varepsilon_{\mathcal I}
\leq
\varepsilon_{\mathrm{disc}}
+
\varepsilon_{\mathrm{mem}}
+
\varepsilon_q
+
\varepsilon_{\mathrm{action}}
+
\varepsilon_{\mathrm{arith}}.
$$

Derivative and solve errors enter the reconstructed connection separately. On one stratum, a representative enclosure has the form

$$
\left\lVert
[A-\widehat A]
\right\rVert_{\mathfrak g/\mathfrak k}
\leq
\frac{
\varepsilon_{q'}
+
\varepsilon_{\mathcal I}\lVert\widehat A\rVert
+
\varepsilon_{\mathrm{solve}}
}{
\underline\lambda_r
}.
$$

Plainly: the certificate distinguishes uncertainty in the source action from uncertainty in source derivatives and the connection solve. A small singular value amplifies all of them, so the final transport tolerance must include that amplification.

Computed full rank is not enough. For example,

$$
\widehat{\mathcal I}
=
\operatorname{diag}(1,\epsilon)
$$

has exact rank two for every $\epsilon\neq0$, while its second direction becomes indistinguishable from a hidden tuning direction once the total error exceeds $\epsilon$.

Plainly: an exact algebraic statement can be numerically useless. The lower bound must remain positive after the entire error budget is charged against it.

Across a declared refinement sequence $r=1,2,\ldots$, require on each orbit-type block $J_s$

$$
\inf_r
\underline\lambda_{s,r}
>
0
$$

and a connection enclosure

$$
[A(u)]
\subseteq
[\widehat A_r(u)]
\oplus
\mathcal B_{\eta_{A,r}(u)}
$$

whose radius converges to a predeclared acceptable floor. Any nonzero floor from finite-memory truncation must be propagated into the held-out transport residuals.

Plainly: refinement may not reveal that the apparent gap was a grid artifact. The certificate survives only if finer histories, drift subdivisions, and arithmetic preserve the gap and control the connection uncertainty.

The operator-checkable falsifier is any block with $\underline\lambda_r\leq0$, any unresolved interval dip under subdivision, or any propagated connection uncertainty that exceeds the predeclared transport budget.

## Finding 9: Enhanced Symmetry Requires A Stratum Junction Certificate

Partition the drift interval into maximal connected orbit-type strata $S_r$ on which the stabilizers

$$
K_u
=
\operatorname{Stab}_{G_{\min}}
\left(
\mathcal Q_{\mathrm{src}}(u)
\right)
$$

are conjugate. Uniform identifiability margins are required only on compact closed subblocks of each stratum. An isolated enhanced-symmetry point $u_*$, especially the rest point $u_*=0$, is a separate stratum rather than a point at which a fixed-rank certificate is forced to remain regular.

Plainly: extra symmetry can legitimately enlarge the gauge kernel at rest. The proof should isolate that point and show that transport from nearby identifiable regions joins uniquely across it.

For the smallest crossing certificate, require:

1. positive quotient margins on punctured blocks to the left and right of $u_*$;
2. bounded one-sided connection classes;
3. convergent one-sided parallel transports;
4. a common junction match

$$
\lim_{u\uparrow u_*}
P(u,u_-)
=
k_*
\lim_{u\downarrow u_*}
P(u,u_+),
\qquad
k_*\in K_*,
$$

in one declared local trivialization; and 5. exclusion of singular or impulsive connection terms at $u_*$.

Plainly: the two sides may differ only by one declared symmetry of the special point. They may not be connected by an undeclared finite reset that later changes a tested row.

The rest anchor is sufficient only if the residual $K_*$ freedom acts trivially on every tested associated fiber. Otherwise it must be fixed by a source-derived transverse slice or source jet, such as the first nonvanishing one-sided derivative of $\mathcal Q_{\mathrm{src}}$.

The resulting removable-stratum statement is:

> If $A$ is bounded on both punctured sides of $u_*$, the quotient margins are positive there, both one-sided parallel transports converge, and their junction mismatch lies in a predeclared subgroup acting trivially on every tested fiber, then the associated transport extends uniquely across $u_*$ modulo harmless gauge.

Plainly: an isolated rank loss does not create a tuning channel when the identifiable neighboring regions determine the same observable continuation.

The operator-checkable falsifier is a nonconjugate one-sided limit, an unbounded connection norm, a junction element outside the harmless stabilizer, or any residual stabilizer element that changes a held-out row.

## Finding 10: Nonlinear Fibers Need Intrinsic Residuals

For a nonlinear associated bundle

$$
E_\alpha
=
P\times_{\rho_\alpha}F_\alpha,
$$

assume $F_\alpha$ has a source-declared $G_{\min}$-invariant Riemannian metric $h_\alpha$, or a declared invariant Finsler norm. The connection gives the intrinsic differential residual

$$
r_\alpha(u)
=
\left\lVert
\nabla^\omega_u
s_\alpha^{\mathrm{ind}}(u)
\right\rVert_{h_\alpha}.
$$

Plainly: values on a nonlinear fiber cannot generally be subtracted. The covariant derivative produces a tangent error whose norm respects the declared fiber geometry.

For blocked-interval endpoint comparison, use the common-gauge quotient distance

$$
R_\alpha(u)
=
\inf_{k\in K_{\mathrm{harmless}}}
d_{F_\alpha}
\left(
s_\alpha^{\mathrm{ind}}(u),
\rho_\alpha(k)
P_{\rho_\alpha}(u,u_0)
s_\alpha^{\mathrm{ind}}(u_0)
\right).
$$

The subgroup $K_{\mathrm{harmless}}$ must be fixed before testing and proven to act harmlessly on every tested fiber. A separate minimizing reset $k_\alpha(u)$ for each row or drift point is forbidden.

Plainly: the residual may remove one shared gauge freedom, but it may not move each prediction independently onto its answer.

Invariant Riemannian distance is the preferred general endpoint comparison. Horizontal lifts define and diagnose connection transport. A logarithm-map residual is admissible only within a validated injectivity-radius neighborhood with a unique logarithm. Representation-specific invariants are negative controls unless they are proven to separate the relevant orbits.

Let $\sigma_\alpha(u)$ be an independently established gauge-invariant uncertainty radius, or use an equivariantly transported positive-definite covariance form for anisotropic uncertainty. A predeclared combined statistic is

$$
W_{\mathrm{NL}}
=
\max_\alpha
\sup_{u\in J_{\mathrm{test}}}
\frac{
R_\alpha(u)
}{
\sigma_{\alpha,\mathrm{tot}}(u)
},
$$

where $\sigma_{\alpha,\mathrm{tot}}$ includes endpoint-extraction error and propagated transport uncertainty.

Plainly: heterogeneous rows are compared in their own invariant geometries and scaled by independently justified uncertainty. The worst standardized residual controls acceptance.

For a Lipschitz associated action, connection uncertainty can be enclosed schematically by

$$
d_{F_\alpha}
\left(
P_A(u,u_0)x,
P_{\widehat A}(u,u_0)x
\right)
\leq
C_\alpha
\exp
\left(
L_\alpha
\int_{u_0}^{u}
\lVert A(v)\rVert\,dv
\right)
\int_{u_0}^{u}
\eta_A(v)\,dv.
$$

Plainly: local uncertainty accumulates along transport. It must be included in the final residual rather than leaving the predicted curve falsely exact.

The operator-checkable falsifier is gauge dependence under a permitted common transformation, an independently chosen row reset, a distance enclosure crossing the acceptance threshold, or use of a logarithm outside its certified injectivity domain.

## Finding 11: First Quantitative Theorem And First Obstruction

The first theorem should be a quantitative common-parallelism theorem, not a holonomy theorem:

> **Conditional quantitative no-hidden-retune theorem.** Let the retained drift family be divided into finitely many constant-orbit-type strata. Assume:
>
> 1. $\mathcal Q_{\mathrm{src}}$ determines the source-reduced group $G_{\min}$ and source-equivariant actions $\rho_\alpha$;
> 2. on every closed test subblock away from symmetry junctions, the validated quotient margin obeys
>
> $$
> \underline\lambda_{\mathrm{id}}
> \geq
> \lambda_*
> >
> 0
> $$
>
> after all validated source, memory, discretization, derivative, action, solver, and arithmetic errors are included; 3. the resulting connection enclosure is refinement-stable and remains within a predeclared transport-error budget; 4. every isolated stabilizer enhancement has bounded one-sided connection classes whose transports match modulo one declared stabilizer subgroup acting trivially on all tested fibers; 5. $\omega=F(\pi_{\mathrm{src}}\Theta)$ satisfies source noninterference, and $F$, $G_{\min}$, $\rho_\alpha$, the gauge reduction, fiber metrics, uncertainty scales, tolerances, and blocked interval are source-derived and frozen before held-out extraction; 6. construction-independent endpoint projections on $J_{\mathrm{test}}$ satisfy
>
> $$
> W_{\mathrm{NL}}
> \leq
> 1;
> $$
>
> 7. a source-preserving permutation leaves the connection enclosure unchanged but satisfies
>
> $$
> W_{\mathrm{NL}}^{\mathrm{perm}}
> >
> 1;
> $$
>
> 8. every claimed row has construction-independent extraction, and at least one representative action class has an analytic or genuinely independent correctness reference.
>
> Then, on the declared retained branch, orbit-type strata, blocked drift interval, associated fibers, and tolerance envelope, the held-out sections are quantitatively identified as common parallel transports of one source-determined connection. No unresolved nongauge connection direction is large enough to retune the tested rows within the certified uncertainty.

Plainly: the theorem establishes one narrow fact. The source data determine the connection with a positive numerical margin, the symmetry junction introduces no hidden reset, unused nonlinear rows agree intrinsically, and deliberately wrong row associations fail without changing the connection. It does not prove the retained branch, an effective metric, or a wider recovery claim.

The quantitative inverse step is: if two admissible connection generators $A_1$ and $A_2$ fit the same enclosed source equations on one stratum, then

$$
\lambda_*
\left\lVert
[A_1-A_2]
\right\rVert
\leq
\left\lVert
\mathcal I(A_1-A_2)
\right\rVert
\leq
2\varepsilon_{\mathrm{src}},
$$

and therefore

$$
\left\lVert
[A_1-A_2]
\right\rVert
\leq
\frac{
2\varepsilon_{\mathrm{src}}
}{
\lambda_*
}.
$$

Plainly: a positive source-identification margin converts source uncertainty into a bounded connection uncertainty. That bound is then propagated through the associated transport equations and matched across symmetry strata.

The first proof step is uniqueness for the associated initial-value problem:

$$
\frac{d s_\alpha}{du}
+
\rho_{\alpha *}
\left(
A(u)
\right)
s_\alpha
=
0,
\qquad
s_\alpha(0)
=
s_{\alpha,0}
$$

Plainly: the generator $A(u)$ and starting row $s_{\alpha,0}$ determine the transported row. Uniqueness of this differential equation is the last proof step only after the source-identification and independence hypotheses have removed the hidden tuning freedoms.

Before constructing a source-derived connection, test pointwise compatibility:

$$
\mathcal A(u)
=
\bigcap_\alpha
\left\{
A\in\mathfrak g_{\min}:
s_\alpha'(u)
+
\rho_{\alpha *}(A)
s_\alpha(u)
=
0
\right\}
$$

If $\mathcal A(u)=\varnothing$ at any drift value, no common $G_{\min}$-connection can transport all declared rows there. If $\mathcal A(u)$ is nonempty only because $A$ was inferred from the test rows, compatibility has been shown but construction independence has not.

Plainly: incompatible row derivatives can disprove common transport immediately. Compatible derivatives are only a feasibility check until one generator is derived from source data without using those rows.

The first decisive negative control is a preregistered, source-preserving permutation between compatible held-out drift blocks or row instances:

1. freeze the primitive source record, $G_{\min}$, the actions, and $\omega$;
2. replace only the endpoint association by the declared permutation;
3. require

$$
\omega_{\mathrm{control}}
=
\omega_{\mathrm{original}}
$$

and

$$
W_{\mathrm{NL}}^{\mathrm{perm}}
>
1
$$

4. separately reject the theorem if the identifiability kernel contains an active nongauge direction or if an unpermuted held-out residual remains nonzero outside the declared uncertainty.

Plainly: changing only the supposed answer must not change the connection, and the deliberately wrong answer must fail. If the connection moves, there is leakage; if the wrong answer still passes, the test is too insensitive.

The smallest independently checkable evidence object is a provenance-bound validated enclosure containing, for each orbit-type block,

$$
\left(
[\underline\lambda_{\mathrm{id}},\overline\lambda_{\mathrm{id}}],
\varepsilon_{\mathcal I},
\varepsilon_{q'},
\eta_A,
[K_u],
\text{junction mismatch class},
[W_{\mathrm{NL}}],
[W_{\mathrm{NL}}^{\mathrm{perm}}]
\right),
$$

together with the construction-independent endpoint projection and at least one correctness reference independent of the connection constructor.

Plainly: the certificate records the positive identifiability gap, every error that can consume it, the symmetry-junction match, the held-out residual, and the failing negative control.

The decisive theorem falsifiers are

$$
\underline\lambda_{\mathrm{id}}
\leq
0,
\qquad
\text{non-harmless junction mismatch},
\qquad
W_{\mathrm{NL}}
>
1,
\qquad
W_{\mathrm{NL}}^{\mathrm{perm}}
\leq
1,
$$

or any change in the frozen connection enclosure under the source-preserving permutation.

Plainly: loss of margin, an unexplained symmetry reset, failed held-out transport, or an insensitive or leaky negative control is sufficient for rejection.

## Proposed Changes

**Readiness gate.** The items retained here are safe claim-boundary and evidence-design corrections that can be applied without asserting that a retained branch, complete wake state, source-derived connection, or physical transport law exists. The construction and certificate items that need those objects are preserved under [Disposition of Open Questions](#disposition-of-open-questions).

**Applied disposition, 2026-07-29.** C1–C5 and C13 now live in the translating shared-record, equation detail, score-ladder, and work-log owners at their stated priority-only authority. Every deferred item and open question is recorded in the canonical [July 28 translating-binary review action register](../../../priorities/mapping-equations/work-queue.md#july-28-translating-binary-review-action-register). This packet is reference evidence only and owns no outstanding action.

1. **C1 — retain $W_{\mathrm{supp}}$ unchanged in role.** It remains the set-level witness that all rows use one accepted retained carrier and domain.
2. **C2 — retire drift-only loop holonomy as the primary meaning of $W_{\mathrm{hol}}$.** Zero curvature, trivial loops, and cocycle composition on $I_u$ are implementation facts, not no-retune evidence.
3. **C3 — state frozen-source held-out parallelism as a conditional no-retune target.** Use $W_{\parallel}$ for full-interval sections or $W_{\mathrm{end}}$ for independently extracted endpoints only after the source constructor and retained branch are independently fixed.
4. **C4 — use $W_{\mathrm{NR}}$ only as a composite label.** It may combine primary parallelism with $W_{\mathrm{loop}}$ after a genuine second retained modulus exists.
5. **C5 — keep torsion and zero phase-holonomy fields diagnostic.** They remain negative-control guardrails until a soldered geometry and a source-derived phase-return conjugacy class are defined.
6. **C13 — separate leakage evidence from correctness evidence.** Give every claimed row an independent held-out projection and give at least one representative action class an analytic or genuinely independent reference.

Plainly: the apply-now corrections prevent trivial one-dimensional holonomy, shared implementation paths, or diagnostic torsion fields from being presented as physical transport evidence. They do not choose the missing geometry or certify a branch.

### Point-First Dependency For The EQ-02 Through EQ-04 Proof Program

The no-retune certificate must consume the theorem stage that matches the strength of its claim. The proposed upstream order is:

| Stage | Upstream claim | What this document may consume |
|---|---|---|
| L1 | one validated finite-memory relative-periodic point $x_\ast$ in a validation box, solving the slice-reduced square residual $F_{N,u}(x)=P_{N,u}(x)-g\mathbin{\cdot}x$ | no family-level transport claim |
| L2 | persistence of that point to one full delayed history under a declared vanishing tail bound, compactness, consistency, and uniform root-chart margins | pointwise coframe extraction at the certified drift only |
| L3 | validated continuation of the L2 history over a declared drift interval, with one certified event itinerary or validated event transitions | construction and testing of the drift connection proposed here |
| L4 | separate stability, trapping-region, or basin results | not required by the no-retune theorem unless a later claim explicitly invokes them |

Plainly: a point can support a coframe at one drift value after the full-history lift is proved. It cannot support a connection over drift until the same solution has been validated as a family over a drift interval.

The upstream point certificate should carry four explicit geometric records:

1. a `validation_box`, whose width is only enclosure width and never invariant-set width or basin measure;
2. a `section_chart`, including solution-manifold compatibility and a positive transversality margin;
3. a `root_chart`, including one validated event itinerary, inactive-root gaps, fold margins, denominator margins, and collision margins;
4. a `symmetry_quotient`, with one neutrality certificate per quotiented generator against the complete delayed state, including wake tails and boundary memory.

The Krawczyk operator belongs to the square residual $F_{N,u}$ with the augmented unknowns and one pinning condition per quotiented generator. It does not act on $P_{N,u}$ alone, and its inclusion proves a unique relative-periodic point in the declared slice, not a forward-invariant cell.

Plainly: the upstream record must say which equation was solved, which roots remain smooth throughout the box, and which neutral directions were genuinely removed. Renaming an old interval field does not supply those proofs.

The full-history lift must not assume a fixed $O(W^{-2})$ tail law or uniform contraction unless those properties are derived independently for the actual delayed dynamics. Its minimum honest obligation is a declared tail-bound sequence tending to zero, together with refinement-stable consistency and uniform root, fold, denominator, transversality, and collision margins. Stability remains a separate downstream theorem.

Plainly: a convenient asymptotic rate or contraction estimate cannot be inserted as a premise. The evidence must establish whatever decay and compactness the actual delayed system provides, while existence and stability remain distinct claims.

For the no-retune program, the fail-closed interface is:

$$
\text{L2 pointwise coframe}
\;\not\Rightarrow\;
\text{L3 drift transport},
$$

and

$$
\text{L3 drift continuation}
+
\text{source-identified connection}
+
\text{held-out parallelism}
\;\not\Rightarrow\;
\text{stability or basin}.
$$

Plainly: coframe extraction, continuation, no-hidden-retune, stability, trapping, and basin evidence are different theorems. None should be inferred from another by shared identifiers, positive interval width, or zero-looking residuals.

The migration should preserve negative controls by intended failure stage:

- a saddle analogue passes L1 but fails the separate stability stage;
- a fake-symmetry control fails the neutrality proof before Krawczyk inclusion;
- an itinerary-straddle control fails the root chart before a Jacobian enclosure is accepted;
- a truncation artifact passes the base finite-memory point check but fails L2 persistence;
- a legacy-field control rejects old invariant-cell or $K_{P_N}$ vocabulary rather than silently ignoring it;
- the no-retune permutation control leaves the source-derived connection unchanged while the deliberately wrong held-out association fails.

Plainly: a migration is correct only when each deliberately bad case still fails for the mathematical reason it was designed to expose. Merely retaining an overall red status is insufficient.

The expected first blocker remains L1: no source-backed validated relative-periodic point has been established at any drift, and the existing $u/c_f=0.6$ row remains diagnostic-only. This is a plausible inference until the owning validator measures the migrated contract; it does not advance a branch, coframe, connection, Lorentz, or score claim.

Plainly: the transport design is now sharper, but it still waits on the first validated orbit. The document changes proof order and claim boundaries; it creates no physical result.

## Evidence And Claim Boundary

Passing the proposed theorem would establish common parallelism for the tested rows on the declared retained branch family under the declared connection. It would not by itself establish:

- that the retained translating branch exists;
- that the chosen source reduction is the uniquely correct geometric model of the microscopic dynamics;
- that all possible observer-facing rows use the same transport;
- that the phase torus is a physical retained modulus;
- that wake asymmetry is Cartan torsion;
- Lorentz symmetry or the Lorentz factor;
- a Minkowski or curved effective metric;
- physical realization or independent acceptance.

Plainly: the theorem can close one precise no-retune question without carrying the much larger burden of proving the branch, spacetime recovery, or the full observer-level theory.

## Resolved Research Questions: Construction And Identifiability

1. The structure group must be the smallest closed source-reduced subgroup $G_{\min}$, and every associated action must arise from a source-equivariant construction.
2. Row-family holdout is insufficient; the minimum one-family claim also requires a blocked connected drift interval.
3. Shared primitive retained data are permissible, but source and endpoint branches must not share derived transformations; at least one representative action class needs an analytic or genuinely independent correctness reference.
4. Phase-holonomy targets come from source-frame monodromy classes $[h_{\mathrm{src}}(n)]$, not from winding number or identity holonomy alone.

Plainly: these findings close the conceptual construction questions and supply the quantitative form needed to make the conditions numerically testable.

## Resolved Research Questions: Quantitative Certification

1. Replace exact kernel equality with a validated positive lower bound for the smallest quotient singular value on each constant-orbit-type block.
2. Subtract the full source-action and singular-value error enclosure from the computed margin, then propagate derivative and solve errors through a separate connection enclosure.
3. Require refinement-stable interval positivity over whole drift blocks rather than computed full rank at sampled points.
4. Treat $u=0$ and any other stabilizer enhancement as separate strata joined by bounded one-sided transport modulo one common harmless stabilizer.
5. On nonlinear fibers, use covariant tangent norms and invariant endpoint distance, with only one predeclared common gauge minimization.
6. Scale heterogeneous endpoint residuals by independently established gauge-invariant total uncertainty, including accumulated transport uncertainty.

Plainly: the remaining work is an implementation and evidence campaign against an actual retained branch, not more definition-level review.

## Disposition of Open Questions

### Deferred Proposed Changes

| Deferred item | Live owner and status | Reason it is not apply-now | Next acceptance test and backlink |
| --- | --- | --- | --- |
| C6 — derive $G_{\mathrm{aut}}$, $G_{\min}$, and every associated action from source geometry | [`EQ-02` through `EQ-04` translating-binary shared-record instantiation](../../../priorities/mapping-equations/analysis/eq-02-04-translating-binary-shared-record-instantiation.md), status `draft`; work-queue owner `EQM-001`, status `Queued` | The source reduction is a construction choice, not an editorial correction. Where the claimed source includes evolving wake variables or root-labeled actions, it also depends respectively on `MEC-002` complete wake representation and `MEC-005` provenance; this does not block source-independent algebraic research. | Freeze one complete source object, prove its automorphisms and source-equivariant actions without target-row input, and retain the existing review-packet backlink in the shared-record owner. |
| C7–C10 — quotient margin, connection enclosure, refinement stability, and stratum-junction certificate | Same `EQM-001` owner, status `Queued` | These are executable certificate obligations over a validated full-history drift family. No such family or complete error budget exists. Any receiver/self acceleration derivative used in the enclosure must also satisfy `MEC-006`, status `Awaiting verification`; root identity and no-double-booking used by the certificate must satisfy `MEC-005`, status `Queued`. | Establish the L1–L3 point/full-history/continuation ladder, then validate positive margins and junction transport with independent derivative and root-provenance checks. |
| C11–C12 — intrinsic nonlinear-fiber residuals and blocked holdout construction | Same `EQM-001` owner, status `Queued` | The residual, gauge, norm, and holdout block cannot be frozen before the actual retained fiber and source constructor exist. | On the accepted L3 branch, predeclare the metric, harmless gauge, injectivity radius, constructor inputs, and excluded connected drift block before evaluating any held-out row. |
| C14 — source-preserving permutation control | Same `EQM-001` owner, status `Queued` | The negative control needs the frozen connection enclosure that C6–C10 have not yet produced. | Hold the accepted source-side enclosure fixed, permute only the declared association, and require $W_{\mathrm{NL}}^{\mathrm{perm}}>1$ while the unpermuted holdout passes. |
| C15 — source-frame monodromy target | Same `EQM-001` owner, status `Queued` | Selecting $[h_{\mathrm{src}}(n)]$ requires a source-derived phase-return conjugacy class; winding number or identity holonomy cannot supply it. | Derive the phase-return class from the same accepted retained history and show that it is invariant under the predeclared harmless gauge. |
| C16 — two-path holonomy on a drift–phase or drift–physical-modulus rectangle | Same `EQM-001` owner, status `Queued` | A second retained continuation direction has not been certified. Adding one now would select an unsupported modulus. | Certify both directions under the same microscopic update and compare the closed rectangle without refitting the connection, actions, gauge, norms, or tolerances. |

Plainly: the deferred items remain valuable research designs. They are not invalidated by the missing closures; they are simply ineligible for application until their actual inputs and independent checks exist.

| Open question | Live owner and status | Next acceptance test | Routing disposition |
| --- | --- | --- | --- |
| Does a source-backed retained translating object exist at one drift and persist to a full delayed history? | [`EQ-02` through `EQ-04` `S_eq` retained-domain evidence object](../../../priorities/mapping-equations/analysis/eq-02-04-s-eq-retained-domain-evidence-object.md), status `draft`; work-queue owner `EQM-001`, status `Queued` | Produce one source-backed positive-width return object whose accepted `raw_labeled_rows_preserved_on_retained_history` row and support share `domainId`, `commonCarrierId`, `supportId`, and `retainedRowSetId: "S_eq"`, then pass the producer and same-branch checker without changing their acceptance rules. | Remains upstream. This packet supplies no retained point, branch, or acceptance evidence. |
| Does the same full-history solution continue over a drift interval with one certified event itinerary? | [`EQ-02` through `EQ-04` translating-binary shared-record instantiation](../../../priorities/mapping-equations/analysis/eq-02-04-translating-binary-shared-record-instantiation.md), status `draft`; work-queue owner `EQM-001`, status `Queued` | Validate the L3 drift continuation with bounded root, fold, denominator, transversality, collision, and tail errors before constructing any drift connection. | Remains blocked by the point-first L1/L2 ladder. |
| Is the frozen source-side constructor identifiable and predictive on unused rows and an unused drift block? | Same translating-binary shared-record owner, status `draft`; work-queue owner `EQM-001`, status `Queued` | Prove $\underline\lambda_{\mathrm{id}}>0$ after the complete error budget, propagate the resulting connection enclosure, require $W_{\mathrm{NL}}\leq1$ on the blocked interval, and require the source-preserving permutation control to leave the enclosure unchanged while giving $W_{\mathrm{NL}}^{\mathrm{perm}}>1$. | This is the first no-hidden-retune acceptance test proposed by the packet; it has not been implemented or accepted. |
| Can a genuine loop-holonomy or curvature claim be made? | Same translating-binary shared-record owner; deferred within the queued `EQM-001` lane | First certify a second retained continuation modulus under the same microscopic rule, then compare the two directions or a closed rectangle without refitting the connection, actions, gauge, norms, or tolerances. | Deferred. Drift-only curvature, loop composition, and endpoint agreement do not answer this question. |

Plainly: all open questions remain in the existing `EQM-001` equation-mapping lane. The routing adds no queue, changes no status, and does not turn this research design into retained evidence or an accepted transport law.

## Remaining Evidence Burden

The first certificate should attempt two punctured closed blocks adjacent to $u=0$. It must provide:

- source-declared metrics and the complete $\mathcal Q_{\mathrm{src}}$;
- validated interval lower bounds for $\underline\lambda_{\mathrm{id}}$;
- a decomposed identification, derivative, solve, and transport error budget;
- bounded one-sided connection classes and a common junction-match enclosure;
- construction-independent nonlinear endpoint projections;
- $W_{\mathrm{NL}}\leq1$ on the blocked interval;
- an unchanged connection enclosure and $W_{\mathrm{NL}}^{\mathrm{perm}}>1$ under a source-preserving permutation;
- at least one analytic or genuinely independent correctness reference.

Plainly: the next decisive work is to build the smallest provenance-bound certificate and let any failed margin, junction, endpoint, independence, or negative-control condition reject the claim.

Closure goal: First establish a source-backed L1 relative-periodic point, lift it through L2 full-history persistence, and validate its L3 drift continuation; then construct the refinement-stable quantitative no-hidden-retune certificate on two orbit-type blocks adjacent to $u=0$, close their junction modulo harmless gauge, and require intrinsic held-out transport to pass while a source-preserving permutation fails.
