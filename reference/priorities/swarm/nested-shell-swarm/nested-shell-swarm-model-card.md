# Nested Shell Braid Model Card

Terminology status: `quarantined-priority-history`. This packet is inherited architecture source, not terminology authority. Its disputed labels may remain here for git history and mathematical source mining, but they are not accepted reader-facing taxonomy. Route any reuse through [Braid](../swarm.md), whose active reader-facing triad is `neutral braid`, `shell braid`, and `nested shell braid`.

Promotion status: `priority-only`. This packet records the proposed relation between the nested shell braid and shell braid cases. It does not authorize migration into `content/markdown/aaa`, simulations, scene assets, or app copy. It defines a branch-family target in which those cases are mathematical cases of one bounded-speed Noether braid model with explicit shell rows. After [Neutral Braid Model](../neutral-swarm/neutral-swarm-model.md), this packet is a binary-partition case of the broader neutral braid branch family. The partition-indexed radius shorthand $R_a$ is derived in [Nested Shell Braid Radial Support Functional](nested-shell-swarm-radial-support-functional.md).

The working decision is not to replace the old layer picture immediately. The safer mathematical move is to demote strict radial nesting and exact binaries from ontology to explicitly stated case conditions. The general base branch is six labeled architrinos with three positive and three negative sites. The three-binary description remains available only when an optional partition into three binaries is declared and certified. In a nested shell braid, each shell contains one binary, so the shell may also be called a binary when the nested shell context is clear. Their shell rows, speeds, causal-root ledgers, and event rows decide whether a retained branch lies in a nested shell braid case, a shell braid case, a transition case, or outside the binary-partition case altogether. The ideal case with variation set to zero is a simplifying limit inside the shell model, not a separate braid type.

---

## 1. Merge Hypothesis

The general base branch uses site labels $i\in I=\{1,\ldots,6\}$ with $\sum_i\sigma_i=0$ and no required binary relation. This nested shell braid case adds a partition

$$
\mathcal{P}=\{P_1,P_2,P_3\},
\qquad
|P_a|=2,
\qquad
\sum_{i\in P_a}\sigma_i=0.
$$

Only after $\mathcal{P}$ is declared may one write $i=(a,\sigma)$, with $a\in\{1,2,3\}$ indexing the three binaries and $\sigma\in\{+,-\}$ indexing the two architrinos in each binary. In a nested shell braid, these are the three binaries, one in each shell. The branch is a set of closed arclength curves in $\mathbb{R}^3$ with a declared support descriptor:

$$
\mathbf{x}_{a,\sigma}(t)
=
\mathbf{Y}_{a,\sigma}(\Lambda_{a,\sigma}(u)),
\qquad
\mathcal{D}_{\mathrm{supp}}
=
\left(
\mathbf{C},
R_{a,\sigma}^-,
R_{a,\sigma}^+,
\delta_{a,\sigma},
\text{case labels}
\right).
$$

A packet may use the shorthand

$$
\mathbf{x}_{a,\sigma}
=
\mathbf{C}
+
R_a\mathbf{U}_{a,\sigma}
$$

only after it declares how $R_a$ is extracted from $\mathcal{D}_{\mathrm{supp}}$. That shorthand is a local parametrization, not the base geometry. The branch velocity is checked directly:

$$
\mathbf{u}_{a,\sigma}(t)
=
\dot{\mathbf{x}}_{a,\sigma}(t)-\dot{\mathbf{C}}(t),
\qquad
\|\mathbf{u}_{a,\sigma}(t)\|
=
c_f\nu_{a,\sigma}(t),
$$

with positive bounded speed factors

$$
0<\nu_- \le \nu_{a,\sigma}(t)\le \nu_+.
$$

The old fixed-speed row is recovered when $\nu_{a,\sigma}\equiv1$. The shell braid row is recovered when the three radii share one support band. The nested shell braid row is recovered when the three radii remain ordered and separated on the retained window.

Define the mean partition-indexed radius

$$
\bar R(t)=\frac{1}{3}\sum_{a=1}^3 R_a(t),
$$

and the radius-spread residual

$$
\mathcal{R}_{\mathrm{spread}}(W)
=
\sup_{t\in W}
\max_a
\frac{|R_a(t)-\bar R(t)|}{\bar R(t)}.
$$

Here $R_a(t)$ may be an arclength average, a causal-time average, a support-band midpoint, or a certified interval center, but the retained branch packet must declare which convention it uses and emit the derivative rows of [Nested Shell Braid Radial Support Functional](nested-shell-swarm-radial-support-functional.md). The point of $\mathcal{R}_{\mathrm{spread}}$ is to separate two questions:

1. whether the branch has a common support descriptor case;
2. whether the branch has closed causal-root, action, event, and observer-export rows.

A small $\mathcal{R}_{\mathrm{spread}}$ is therefore not a branch proof. It is only a case label.

---

## 2. Branch Sectors

### 2.1 Nested Shell Case

The nested shell case is the retained region in which the three partition-indexed radii are persistently ordered:

$$
R_{I}(t)<R_{M}(t)<R_{O}(t)
$$

or the corresponding accepted binary-label convention, with certified radius gaps

$$
\mathcal{G}_{ab}^{R}(W)
=
\inf_{t\in W}
\frac{R_b(t)-R_a(t)}{\bar R(t)}
>
\epsilon_R
$$

for each declared adjacent ordering row. In this case, `inner`, `middle`, and `outer` may remain useful as weak-stress or continuation labels, but they are not allowed to override the causal-root ledger, speed row, or action row.

### 2.2 Shell Braid Case

The shell braid case is the retained region in which

$$
\mathcal{R}_{\mathrm{spread}}(W)\le\epsilon_{\mathrm{same}},
$$

with a common support band and declared phase/topology data. A shell braid branch may be fixed-speed,

$$
\nu_{a,\sigma}\equiv1,
$$

or bounded-speed,

$$
0<\nu_-\le\nu_{a,\sigma}\le\nu_+.
$$

The bounded-speed case inherits the center-time chart, causal-time roots, speed-weighted Jacobian, speed-ODE solvability, normal reconstruction, self-hit hinge, return certificate, support descriptor, action, event, Krawczyk, and stability rows from [variable-speed-factor-extension.md](../shell-swarm/variable-speed-factor-extension.md), [bounded-speed-factor-center-time-dynamics.md](../shell-swarm/bounded-speed-factor-center-time-dynamics.md), [bounded-speed-factor-speed-ode-solvability.md](../shell-swarm/bounded-speed-factor-speed-ode-solvability.md), [bounded-speed-factor-normal-reconstruction-theorem.md](../shell-swarm/bounded-speed-factor-normal-reconstruction-theorem.md), [free-support-bounded-speed-dynamics.md](../shell-swarm/free-support-bounded-speed-dynamics.md), [free-support-action-compatibility-theorem.md](../shell-swarm/free-support-action-compatibility-theorem.md), [bounded-speed-factor-self-hit-return-lemma.md](../shell-swarm/bounded-speed-factor-self-hit-return-lemma.md), [bounded-speed-factor-executable-solver-protocol.md](../shell-swarm/bounded-speed-factor-executable-solver-protocol.md), and [bounded-speed-factor-master-retention-theorem.md](../shell-swarm/bounded-speed-factor-master-retention-theorem.md).

### 2.3 Transition Case

The transition case is the region in which one or more radius gaps approach zero, change ordering, or fail to remain separated:

$$
0\le
\mathcal{G}_{ab}^{R}(W)
\le
\epsilon_R.
$$

This transition case is the mathematical home for the operator question: the old `I/M/O` or `I/M/L` labels may continue as branch-history labels while the geometry approaches a common support band. A transition packet must declare whether the labels are:

| Label use | Meaning |
| --- | --- |
| `geometric-order` | binary labels are still radius ordered on $W$ |
| `continuation-history` | binary labels name the branch case from which the current row was continued |
| `weak-stress-role` | binary labels name a dynamical role, such as near-field-speed hinge or self-hit-prone binary |
| `rejected-label` | the old labels no longer have a ledger-consistent meaning |

No user-facing corpus merge should begin until this label-use row has an accepted status.

---

## 3. Nested Shell Dynamics Row

The retained equation must be computed from the actual path acceleration. In a normalized arclength chart, the bounded-speed shell braid equation was

$$
\nu_i^2\mathbf{K}_i+\nu_i\nu_i'\mathbf{T}_i
=
\Gamma\widetilde{\mathbf{F}}_i.
$$

In the shell chart, radial breathing and binary-indexed radial drift add acceleration terms. Write the direct acceleration residual as

$$
\mathcal{R}_{\mathrm{dyn},a,\sigma}^{\mathrm{hyb}}
=
\ddot{\mathbf{x}}_{a,\sigma}
-
\Gamma_{\mathrm{phys}}\widetilde{\mathbf{F}}_{a,\sigma},
$$

or, after projection into tangent, normal, and radial-support rows,

$$
\mathcal{R}_{\mathrm{dyn}}^{\mathrm{hyb}}
=
\left(
\mathcal{R}_{\parallel}^{\nu},
\mathcal{R}_{\perp}^{\nu},
\mathcal{R}_{\mathrm{supp},r}^{\nu},
\mathcal{R}_{\mathrm{mix}}
\right).
$$

Here $\mathcal{R}_{\mathrm{supp},r}^{\nu}$ is the radial support equation and $\mathcal{R}_{\mathrm{mix}}$ records terms coupling radial change to phase, tangent, curvature, and causal-root motion. A solver may use a simplified case equation only after it declares the dropped terms and proves they are below the retained tolerance.

The nested shell braid residual should therefore include at least

$$
\mathcal{R}_{\mathrm{hyb}}
=
\left(
\mathcal{R}_{\mathrm{spread}},
\mathcal{R}_{\mathrm{gap}}^{R},
\mathcal{R}_{H}^{\nu},
\mathcal{R}_{\mathrm{root}}^{\nu},
\mathcal{R}_{\mathrm{dyn}}^{\mathrm{hyb}},
\mathcal{R}_{\mathrm{self}},
\mathcal{R}_{E},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{export}}
\right),
$$

with every row computed on one active causal-root ledger and one source-index policy.

---

## 4. Self-Hit And Field-Speed Boundary

The nested shell braid model keeps the current bounded-speed discipline. Near $c_f$ motion is not by itself a self-hit proof. A same-source ordinary root can enter only when the speed-factor hinge condition is crossed:

$$
\mathcal{A}_i(\lambda^-,\lambda)
=
\mathcal{D}_i(\lambda^-,\lambda),
$$

with a positive same-source Jacobian floor and a short, ledgered event interval. If a binary is called `inner`, `middle`, `outer`, `I`, `M`, `O`, or `L`, that label does not exempt it from the same self-hit rows:

$$
J_{\mathrm{self}}^{\nu}\ge J_{\mathrm{self},0}>0,
\qquad
\operatorname{dur}_u(\mathcal{H}_i)\le\tau_{\mathrm{hit}}^u,
\qquad
\int_{\mathcal{H}_i}(\nu_i-1)_+\,d\lambda\le B_{\mathrm{hit}}.
$$

Here $\operatorname{dur}_u(\mathcal{H}_i)=|\chi_i(\mathcal{H}_i)|$ is the dimensionless center-time duration, with $\operatorname{dur}_t=(R_*/c_f)\operatorname{dur}_u$ when a physical-time report is required.

If those rows are absent, the branch status remains

$$
\texttt{self-hit-mode-unledgered}.
$$

---

## 5. Merge Decision Gate

The user-facing corpus merge begins only after a nested shell braid merge review packet answers `yes` to every row below.

| Gate | Required object | Current status |
| --- | --- | --- |
| Nested shell branch definition | explicit variables for partition-indexed radii, speed factors, phase/topology data, inventory, causal roots, action, event rows, and observer exports | open |
| Case map | nested shell braid, shell braid, and transition cases stated as residual conditions using the radial support functional, not competing ontologies | staged here |
| Label-use decision | accepted meaning for `I/M/O`, `I/M/L`, `inner`, `middle`, and `outer` inside the nested shell family | open |
| Retained branch candidate | at least one branch packet with finite active roots, positive Jacobian floors, finite memory depth, noncollision, closed dynamics residuals, action/event closure, and stability data | open |
| Nested shell braid comparison | explicit comparison against the nested shell braid causal-closure packet set, naming preserved assumptions, replaced assumptions, and fallback source material | open |
| Shell braid comparison | explicit comparison against the shell braid and bounded-speed packets in this directory, naming which rows survive unchanged and which must be recomputed for the shell rows | open |
| User-facing corpus merge plan | reviewable edit-batch sequence for `content/markdown/aaa`, simulations, and app/assets, with rollback route and validation commands | deferred |
| Operator approval | explicit approval to start the first user-facing corpus merge batch after the review packet is complete | not requested |

The gate separates mathematical success from editorial migration. A retained branch candidate may justify a strong theory statement, but corpus-wide language changes still require the merge plan and operator approval row.

---

## 6. Current Capture Decision

This packet changes the priority-side decision surface:

1. Do not treat shell braid geometry as a forced replacement for the nested shell braid model.
2. Treat nested shell braid, shell braid, and transition geometries as cases of one shell-braid branch family.
3. Keep fixed-speed shell braid evidence as the $\nu_i\equiv1$ and small-radius-spread subcase.
4. Keep bounded-speed self-hit rows as the only admissible route for ordinary self-hit intervals.
5. Do not begin user-facing corpus merge until the nested shell braid merge decision gate passes.

No material in this packet is ready for direct promotion into `content/markdown/aaa` until the retained branch, label-use, nested shell braid comparison, and user-facing merge-plan rows are populated.
